import React from "react";
import { useGetLastPostsQuery } from "../../features/posts/postsSlice";
import { ReadNow } from "./ReadNow";
import { UserBar } from "./UserBar";
export const RightBar = () => {
    const { data, isSuccess } = useGetLastPostsQuery();
    return (
        <div className="right__bar hidden xl:block">
            <div className="wrapp space-y-5">
                <div className="bg-white p-2 space-y-5">
                    <div className=" border-b-[1px] border-solid border-gray-300 border-t-0 border-r-0 border-l-0">
                        <h4 className="text-xl font-bold text-center pb-2">
                            Популярные авторы
                        </h4>
                    </div>
                    <div className="space-y-3">
                        <UserBar />
                    </div>
                </div>
                <div className="bg-white p-2 space-y-5">
                    <div className=" border-b-[1px] border-solid border-gray-300 border-t-0 border-r-0 border-l-0">
                        <h4 className="text-xl font-bold text-center pb-2">
                            Популярные авторы
                        </h4>
                    </div>
                    <div className="space-y-3">
                        <ReadNow />
                        {isSuccess
                            ? data?.map((post) => (
                                  <ReadNow key={post.id} post={post} />
                              ))
                            : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};
