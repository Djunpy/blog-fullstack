import { apiSlice } from "../api/apiSlice";

const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "api/user-list/",
            providesTags: [{ type: "User", id: "LIST" }],
        }),
        userRegister: builder.mutation({
            query: (credentials) => ({
                url: "api/register/",
                method: "POST",
                body: credentials,
                headers: { "Content-Type": "application/json" },
            }),
            transformResponse: (responseData) => {
                console.log(responseData);
                return responseData;
            },
        }),
        userLogin: builder.mutation({
            query: (credentials) => ({
                url: "api/login/",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (responseData) => {
                return responseData;
            },
        }),
        getUserProfile: builder.query({
            query: () => "api/profile/",
        }),
    }),
});

export const {
    useGetUsersQuery,
    useUserRegisterMutation,
    useUserLoginMutation,
    useGetUserProfileQuery,
} = userSlice;
