import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RiInformationLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Helmet } from "../components/Helmet/Helmet";
import { useUserRegisterMutation } from "../features/users/usersSlice";

export const Register = () => {
    const [sendCredentials, { isSuccess, isError }] = useUserRegisterMutation();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: "onBlur" });
    const onSubmit = async (data) => {
        console.log(data);
        await sendCredentials(data).unwrap();
        reset();
    };
    if (isSuccess) {
        navigate("/login");
    } else if (isError) {
        return (
            <div className="h-screen flex items-center justify-center text-3xl font-bold">
                <div className="flex flex-col">
                    <Link to="/">
                        <button className="font-bold tracking-wide text-cyan-800 underline inline-block">
                            Назад
                        </button>
                    </Link>
                    <p>Что то пошло не так...</p>
                </div>
            </div>
        );
    }
    return (
        <Helmet title="Регистрация">
            <div className="register container mx-auto flex items-center justify-center pt-10 pb-5">
                <div className="space-y-5">
                    <div className="register__box bg-white w-[500px] shadow-md rounded-md">
                        <form action="post" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2">
                                <h1 className="font-bold text-xl pb-4">
                                    Регистрация
                                </h1>
                                <div className="flex items-center bg-gray-300 p-1 ml-2 mr-2 justify-center relative">
                                    <p className="w-[80%]">
                                        Зарегистрируйте Хабр Аккаунт, чтобы
                                        вступить в крупнейшее русскоязычное
                                        IT-сообщество, учиться и делиться
                                        опытом, всегда быть в курсе того, что
                                        происходит в IT.
                                    </p>
                                    <span className="absolute left-2 top-1 text-xl text-cyan-800">
                                        <RiInformationLine />
                                    </span>
                                </div>
                            </div>
                            <div className="">
                                <div className=" p-5 space-y-10">
                                    <p className="w-full">
                                        <label
                                            className="font-bold"
                                            htmlFor="email"
                                        >
                                            E-mail
                                        </label>
                                        <input
                                            {...register("email", {
                                                required:
                                                    "Поле обязательно к заполнению",
                                                minLength: {
                                                    value: 8,
                                                    message:
                                                        "Минимальная длинна email 8 символов",
                                                },
                                            })}
                                            className="ring-1 ring-gray-300 w-full p-2 focus:ring-gray-500"
                                            id="email"
                                            type="email"
                                        />
                                        {errors?.email && (
                                            <span className="text-red-600 font-bold">
                                                {errors?.email?.message}
                                            </span>
                                        )}
                                    </p>

                                    <p>
                                        <label
                                            className="font-bold"
                                            htmlFor="username"
                                        >
                                            Никнейм
                                        </label>
                                        <input
                                            {...register("username", {
                                                required:
                                                    "Поле username обязательно к заполнению",
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        "Минимальное количество символов 6",
                                                },
                                            })}
                                            className="ring-1 ring-gray-300 w-full p-2 focus:ring-gray-500"
                                            id="username"
                                            type="text"
                                        />
                                        {errors?.username && (
                                            <span className="text-red-600 font-bold">
                                                {errors?.username?.message}
                                            </span>
                                        )}
                                    </p>
                                    <p>
                                        <label
                                            className="font-bold"
                                            htmlFor="password"
                                        >
                                            Пароль
                                        </label>
                                        <input
                                            {...register("password", {
                                                required:
                                                    "Поле password обязательно к заполнению",
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        "Минимальное количество символов 6",
                                                },
                                            })}
                                            className="ring-1 ring-gray-300 w-full p-2 focus:ring-gray-500"
                                            id="password"
                                            type="password"
                                        />
                                        {errors?.password && (
                                            <span className="text-red-600 font-bold">
                                                {errors?.password?.message}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="p-5">
                                <button
                                    className="bg-cyan-600 p-2 w-full font-bold text-white hover:bg-cyan-700 transition-all"
                                    disabled={!isValid}
                                >
                                    Зарегистрироваться
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-white w-[500px] h-16 flex items-center justify-center shadow-md rounded-md">
                        <p>
                            Уже зарегистрированы?{" "}
                            <Link to="/login">
                                <span className="text-cyan-600">Войдите</span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};
