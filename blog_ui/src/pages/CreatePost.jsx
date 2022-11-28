import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Img from "../assets/img/85447c10f44c8c4f5579fa6e31a50a51.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/users/authSlice";
import { Helmet } from "../components/Helmet/Helmet";
import { useData } from "../Hoc/DataContext";

export const CreatePost = () => {
    const { setValues } = useData();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isValid },
    } = useForm({
        mode: "onBlur",
    });
    const onSubmit = (data) => {
        setValues(data);
        reset();
        navigate("/create-post-2");
    };
    return (
        <Helmet title="Добавить публикацию">
            <div className="container mx-auto space-y-5 bg-white mb-5 w-[400px] md:w-[600px] xl:w-[800px]">
                <div className="flex items-center gap-x-4 p-2">
                    <div>
                        <img className="w-10" src={Img} alt="" />
                    </div>
                    <span className="font-bold">{user}</span>
                </div>
                <form action="" className="" onSubmit={handleSubmit(onSubmit)}>
                    <div className=" space-y-3 border-solid  border-l-0 border-t-0 border-r-0 border-gray-200">
                        <p>
                            <input
                                {...register("title", {
                                    required: "Поле обязательно к заполнению",
                                })}
                                className="w-full indent-2 p-2 text-3xl placeholder:uppercase"
                                type="text"
                                placeholder="Заголовок"
                            />
                        </p>
                        <p>
                            <textarea
                                {...register("content", {
                                    required: true,
                                    minLength: {
                                        value: "50",
                                    },
                                })}
                                className="p-2 text-xl resize-none w-full indent-2 tracking-wide italic"
                                placeholder="Содержание статьи "
                                // cols="30"
                                rows="20"
                            ></textarea>
                        </p>
                    </div>
                    <div className="p-4">
                        <button
                            className="p-2 font-bold ring-1 ring-gray-200"
                            disabled={!isValid}
                        >
                            Далее к настройкам
                        </button>
                    </div>
                </form>
            </div>
        </Helmet>
    );
};
