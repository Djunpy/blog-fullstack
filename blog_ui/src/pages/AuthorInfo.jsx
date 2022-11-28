import React, { useState } from "react";
import Img from "../assets/img/7636ecffdd07709ebdb5d501f0f6e34d.png";
import { useGetUserProfileQuery } from "../features/users/usersSlice";
import { Posts } from "../components/UI/ProfileState/Posts";
import { Bookmarks } from "../components/UI/ProfileState/Bookmarks";

export const AuthorInfo = () => {
    const { data } = useGetUserProfileQuery();
    const [category, setCategory] = useState("");
    const { bookmarks, username } = data?.profile ?? {};
    return (
        <div className="h-full">
            <div className="container mx-auto space-y-5 mb-5">
                <div className=" p-5 bg-white space-y-10">
                    <div className="">
                        <div>
                            <div>
                                <img className="w-32" src={Img} alt="" />
                            </div>
                        </div>
                        <span className="text-3xl text-cyan-800">
                            @{username}
                        </span>
                    </div>
                    <div className="pb-16 relative border-solid border-gray-200 border-t-0 border-r-0 border-l-0">
                        <div className="absolute top-5">
                            <ul className="flex items-center gap-x-5 text-2xl">
                                <li
                                    className="hover:text-cyan-800 cursor-pointer pb-3 transition-all border-solid border-[2px] border-t-0  border-r-0 border-l-0"
                                    onClick={() => setCategory("Post")}
                                >
                                    Публикации
                                </li>
                                <li
                                    className="hover:text-cyan-800 cursor-pointer pb-3 transition-all border-solid border-[2px] border-t-0  border-r-0 border-l-0"
                                    onClick={() => setCategory("Bookmarks")}
                                >
                                    Закладки
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="bg-white  p-5 ">
                    <div className="overscroll-y-contain overflow-y-auto h-[600px] ">
                        {category === "Post" ? (
                            <Posts />
                        ) : (
                            <Bookmarks bookmarks={bookmarks} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
