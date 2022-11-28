import React from "react";
import { RiChat1Line, RiBookmarkLine } from "react-icons/ri";

export const ReadNow = ({ post }) => {
    const { title, total_bookmarks, total_comments } = post ?? {};
    return (
        <div>
            <div className="space-y-2">
                <div>
                    <h4>{title}</h4>
                </div>
                <div className="flex gap-x-5">
                    <p className="flex items-center justify-center gap-x-1">
                        <RiBookmarkLine className="text-2xl" />{" "}
                        <span>{total_bookmarks}</span>
                    </p>
                    <p className="flex items-center gap-x-1 justify-center">
                        <RiChat1Line className="text-2xl" />{" "}
                        <span>{total_comments}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};
