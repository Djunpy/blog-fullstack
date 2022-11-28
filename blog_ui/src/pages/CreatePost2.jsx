import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RiImageAddFill } from "react-icons/ri";
import { Helmet } from "../components/Helmet/Helmet";
import { useGetCategoryQuery } from "../features/posts/postsSlice";
import { useData } from "../Hoc/DataContext";
import { useAddPostMutation } from "../features/posts/postsSlice";

export const CreatePost2 = () => {
    const [addPost] = useAddPostMutation();
    const { currentData } = useData();
    const { data, isSuccess } = useGetCategoryQuery();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({
        mode: "onBlur",
    });
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", currentData.title);
        formData.append("content", currentData.content);
        formData.append("category", data.category);
        formData.append("image", data.image[0]);
        formData.append("tags", data.tags);
        await addPost(formData).unwrap();
        reset();
        navigate("/");
    };
    return (
        <Helmet title="Создание статьи шаг 2">
            <div className="container mx-auto h-screen flex justify-center  pt-10">
                <div className="bg-white w-[600px] h-[450px] p-5">
                    <form
                        encType="multipart/form-data"
                        onSubmit={handleSubmit(onSubmit)}
                        action="post"
                        className="flex flex-col gap-y-5 justify-center items-center "
                    >
                        <div>
                            <label htmlFor="img" className="cursor-pointer">
                                <RiImageAddFill size={150} className="" />
                            </label>
                            <input
                                {...register("image", {
                                    require: true,
                                })}
                                id="img"
                                hidden
                                type="file"
                            />
                        </div>
                        <div>
                            <div>
                                <select
                                    id="category"
                                    className="p-3 text-2xl rounded-md cursor-pointer"
                                >
                                    <option value="default">
                                        Выбрать категорию
                                    </option>
                                    {isSuccess &&
                                        data?.map((cat) => (
                                            <option
                                                {...register("category", {
                                                    require: true,
                                                })}
                                                key={cat.id}
                                                value={cat.name}
                                            >
                                                {cat.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <p className="w-[47%] ">
                            <input
                                {...register("tags", {
                                    required: true,
                                })}
                                className="p-3 w-[100%] rounded-md bg-gray-200"
                                type="text"
                                placeholder="Добавить теги"
                            />
                        </p>
                        <p className="w-[47%] pt-10">
                            <button
                                className="bg-cyan-600 p-2 w-full font-bold text-white hover:bg-cyan-700 transition-all"
                                disabled={!isValid}
                            >
                                Войти
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </Helmet>
    );
};
