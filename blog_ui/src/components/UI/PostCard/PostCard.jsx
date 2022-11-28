import React from "react";
import { Link } from "react-router-dom";
import { RiBookmarkLine, RiChat3Line } from "react-icons/ri";
import { RiArrowRightLine } from "react-icons/ri";
import { nanoid } from "@reduxjs/toolkit";
import { useToBookmarksMutation } from "../../../features/posts/postsSlice";

export const PostCard = ({ post }) => {
    const [toBookmarks] = useToBookmarksMutation();
    const {
        id,
        author,
        content,
        image,
        published,
        tags_name,
        title,
        total_bookmarks,
        total_comments,
    } = post;
    const d = new Date(published);
    const handleToBookmark = () => {
        toBookmarks(id);
    };
    return (
        <div className="product bg-white p-10">
            <div className="card__box space-y-4">
                <div className="user flex items-center gap-x-2 ">
                    <div className="">
                        <img
                            className="w-10 h-10 rounded-full"
                            src={image}
                            alt={title}
                        />
                    </div>
                    <span>{author}</span>
                    <span>{d.toLocaleDateString()}</span>
                </div>
                <div>
                    <h4 className="text-3xl font-bold">{title}</h4>
                    <ul className="flex items-center gap-x-2">
                        {tags_name.map((name) => (
                            <li key={nanoid()}>{name}</li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <img src={image} alt="title" />
                </div>
                <p>{content}</p>
                <div>
                    <Link to={`post/${id}/`}>
                        <button className="p-2 flex  items-center gap-x-1 ring-1 ring-cyan-800 text-xl hover:bg-cyan-800 hover:text-white transition-all">
                            Читать дальше <RiArrowRightLine />
                        </button>
                    </Link>
                </div>
                <div className="flex space-x-6">
                    <p className="relative text-2xl flex items-center">
                        <RiChat3Line className="" />
                        <span>{total_comments} </span>
                    </p>
                    <p className="relative text-2xl flex items-center cursor-pointer">
                        <RiBookmarkLine onClick={handleToBookmark} />
                        <span>{total_bookmarks}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
