import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { setAccessToken, logOut } from "../users/authSlice";
import { Mutex } from "async-mutex";

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8000/",
    prepareHeaders: (headers, { getState }) => {
        const tokenAccess = getState().auth.tokenAccess;
        if (tokenAccess) {
            headers.set("authorization", `Bearer ${tokenAccess}`);
        }
        return headers;
    },
});

const mutex = new Mutex();

const baseQueryWithReauth = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    const tokenRefresh = api.getState().auth.tokenRefresh;
    if (result.error) {
        // checking whether the mutex is locked
        if (
            result.error.status === 401 ||
            result.error.status === 500 ||
            result.error.status === 403
        ) {
            if (!mutex.isLocked()) {
                const release = await mutex.acquire();
                try {
                    const refreshResult = await baseQuery(
                        {
                            url: "api/token/refresh/",
                            method: "POST",
                            body: { refresh: tokenRefresh },
                        },
                        api,
                        extraOptions
                    );
                    console.log(refreshResult);
                    if (refreshResult.data) {
                        api.dispatch(
                            setAccessToken(refreshResult.data["access"])
                        );
                        // retry the initial query
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch(logOut());
                    }
                } finally {
                    // release must be called once the mutex should be released again.
                    release();
                }
            } else {
                // wait until the mutex is available without locking it
                await mutex.waitForUnlock();
                result = await baseQuery(args, api, extraOptions);
            }
        }
    }
    return result;
};

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: retry(baseQueryWithReauth, { maxRetries: 8 }),
    tagTypes: ["Post", "Category", "User"],
    endpoints: (builder) => ({}),
});
