import React from "react";
import { Link } from "react-router-dom";

export const Bookmarks = ({ bookmarks }) => {
    console.log(bookmarks);
    return (
        <div>
            {bookmarks &&
                bookmarks?.map((bookmark) => (
                    <div className="flex items-center gap-x-2 shadow-md ">
                        <div className="shrink-0">
                            <img
                                className="w-52"
                                src={bookmark.image}
                                alt={bookmark.title}
                            />
                        </div>
                        <Link to={`/post/${bookmark.id}/`}></Link>
                        <p className="text-xl">{bookmark.title}</p>
                    </div>
                ))}
        </div>
    );
};
