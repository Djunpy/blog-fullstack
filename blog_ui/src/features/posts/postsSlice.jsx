import { apiSlice } from "../api/apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: (page) => `api?page=${page}`,
            providesTags: [{ type: "Product", id: "LIST" }],
        }),
        getPostDetail: builder.query({
            query: (id) => `api/${id}/`,
            transformResponse: (responseDta) => {
                console.log(responseDta);
                return responseDta;
            },
            providesTags: (result, error, id) => [{ type: "Product", id }],
        }),
        getLastPosts: builder.query({
            query: () => "api/last-post/",
            providesTags: [{ type: "Product", id: "LIST" }],
        }),
        searchPosts: builder.query({
            query: (title) => ({
                url: "api",
                params: {
                    q: title,
                },
            }),
            providesTags: [{ type: "Product", id: "LIST" }],
        }),
        getAuthorPost: builder.query({
            query: () => "api/author-posts",
            providesTags: [{ type: "Product", id: "LIST" }],
        }),
        getCategory: builder.query({
            query: () => "api/category",
            providesTags: [{ type: "Category", id: "LIST" }],
        }),
        addPost: builder.mutation({
            query: (payload) => ({
                url: "api/",
                method: "POST",
                body: payload,
                invalidatesTags: [{ type: "Product", id: "LIST" }],
            }),
        }),
        toBookmarks: builder.mutation({
            query: (payload) => ({
                url: `api/bookmark/${payload}/`,
                method: "POST",
                body: payload,
                invalidatesTags: [{ type: "Product", id: "LIST" }],
            }),
        }),

        // updatePost: builder.mutation({
        //     query: (initialPost) => ({
        //         url: `api/${initialPost.id}`,
        //         method: "PUT",
        //         body: {
        //             ...initialPost,
        //         },
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: "Post", id: arg.id },
        //     ],
        // }),
        // deletePost: builder.mutation({
        //     query: ({ id }) => ({
        //         url: `api/${id}`,
        //         method: "DELETE",
        //         body: { id },
        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: "Post", id: arg.id },
        //     ],
        // }),
    }),
});

export const {
    useGetPostsQuery,
    useGetLastPostsQuery,
    useLazySearchPostsQuery,
    useGetCategoryQuery,
    useGetPostDetailQuery,
    useAddPostMutation,
    useGetAuthorPostQuery,
    useToBookmarksMutation,
} = extendedApiSlice;
