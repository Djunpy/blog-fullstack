import React, { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Helmet } from "../components/Helmet/Helmet";
import { Pagination } from "../components/UI/Pagination/Pagination";
import { PostCard } from "../components/UI/PostCard/PostCard";
import { Streams } from "../components/UI/Streams/Streams";
import { useGetPostsQuery } from "../features/posts/postsSlice";

export const HomePage = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading, isSuccess } = useGetPostsQuery(page);
    const { total_pages, results, next, previous } = data ?? {};

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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <Helmet title="Главная страница" className="home">
            <div className="home__box container  mx-auto ">
                <div>
                    <Streams />
                </div>

                <div className="space-y-5">{content}</div>
                <div className="bg-white mt-5 mb-5 h-16 relative">
                    <Pagination
                        page={page}
                        setPage={setPage}
                        total_pages={total_pages}
                        next={next}
                        previous={previous}
                    />
                </div>
            </div>
        </Helmet>
    );
};
