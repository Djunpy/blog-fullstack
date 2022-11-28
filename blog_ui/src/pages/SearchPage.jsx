import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

import { RiSearchLine } from "react-icons/ri";
import { useLazySearchPostsQuery } from "../features/posts/postsSlice";
import { PostCard } from "../components/UI/PostCard/PostCard";
export const SearchPage = () => {
    const [searchBox, setSearchBox] = useState("");
    const [fetchPosts, { data, isLoading, isSuccess }] =
        useLazySearchPostsQuery(searchBox);
    const { total_pages, next, previous, results } = data ?? {};
    const onSubmit = () => {
        fetchPosts(searchBox);
    };
    let content;
    if (isLoading) {
        content = (
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        );
    } else if (isSuccess) {
        content = results?.map((post) => (
            <PostCard key={post.id} post={post} />
        ));
    }
    return (
        <div className="search container mx-auto h-screen">
            <div>
                <div className="search__box relative w-full h-24 flex bg-white items-center justify-center">
                    <div className="w-[95%]">
                        <input
                            className=" ring-1 ring-gray-300 sm:w-full  p-3 text-2xl"
                            type="search"
                            value={searchBox}
                            onChange={(e) => setSearchBox(e.target.value)}
                            placeholder="Поиск"
                        />
                        <button
                            className="absolute text-4xl right-5 top-7 opacity-30"
                            onClick={onSubmit}
                        >
                            <RiSearchLine />
                        </button>
                    </div>
                </div>
                <div>{content}</div>
            </div>
        </div>
    );
};
