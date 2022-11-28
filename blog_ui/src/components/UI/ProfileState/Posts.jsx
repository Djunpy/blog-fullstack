import React from "react";
import { Link } from "react-router-dom";
import { useGetAuthorPostQuery } from "../../../features/posts/postsSlice";

export const Posts = () => {
    const { data, isSuccess } = useGetAuthorPostQuery();
    console.log(data);
    return (
        <div className="space-y-3">
            {isSuccess &&
                data?.map((post) => (
                    <div className="flex items-center gap-x-2 shadow-md ">
                        <div className="shrink-0">
                            <img
                                className="w-52 object-contain"
                                src={post.image}
                                alt={post.title}
                            />
                        </div>
                        <Link to={`/post/${post.id}/`}>
                            <p className="text-xl">{post.title}</p>
                        </Link>
                    </div>
                ))}
        </div>
    );
};
