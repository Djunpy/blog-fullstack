import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { Helmet } from "../components/Helmet/Helmet";
import Img from "../assets/img/85447c10f44c8c4f5579fa6e31a50a51.png";
import { useGetPostDetailQuery } from "../features/posts/postsSlice";

const PostDetail = () => {
    const { id } = useParams();
    const { data, isLoading, isSuccess } = useGetPostDetailQuery(id);
    const {
        author,
        category,
        comments,
        content,
        image,
        tags_name,
        title,
        total_bookmarks,
        total_comments,
    } = data ?? {};
    let contentComp;
    if (isSuccess) {
        contentComp = (
            <div className="product pb-5 h-full">
                <div className="space-y-5">
                    <div className="card__box space-y-4 bg-white p-10">
                        <div className="user flex items-center gap-x-2 ">
                            <div className="">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={image}
                                    alt={title}
                                />
                            </div>
                            <span>{author}</span>
                            <span></span>
                        </div>
                        <div>
                            <h4 className="text-3xl font-bold">{title}</h4>
                            <ul className="flex items-center gap-x-2">
                                {tags_name.map((name, index) => (
                                    <li key={index}>{name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="">
                            <img src={image} alt={title} />
                        </div>
                        <p>{content}</p>
                    </div>
                    <div>
                        <div className="w-full h-24 p-3 bg-white flex gap-x-5 items-center">
                            <img className="w-16" src={Img} alt="" />
                            <span className="text-xl font-bold">{author}</span>
                        </div>
                    </div>
                    <div className="bg-white">
                        {comments?.map((comment) => (
                            <div key={comment.id} className="flex flex-col p-3">
                                <div>
                                    <div>
                                        <img
                                            className="w-20"
                                            src={Img}
                                            alt=""
                                        />
                                    </div>
                                    <span>{comment.author}</span>
                                </div>
                                <p>{comment.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else if (isLoading) {
        contentComp = (
            <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
            />
        );
    }
    return <Helmet title={title}>{contentComp}</Helmet>;
};

export const MemoizedPostDetail = React.memo(PostDetail);
