import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "../components/Helmet/Helmet";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/users/authSlice";
import { useUserLoginMutation } from "../features/users/usersSlice";
export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname ?? "/";
    const [sendCredentials, { isSuccess, isError, data }] =
        useUserLoginMutation();
    const {
        register,
        formState: { errors, isValid },
        reset,
        handleSubmit,
    } = useForm({ mode: "onBlur" });
    const onSubmit = async (data) => {
        await sendCredentials(data).unwrap();
        reset();
    };
    if (isSuccess) {
        dispatch(
            setCredentials({
                tokenAccess: data["token"].access,
                tokenRefresh: data["token"].refresh,
                user: data["user"],
            })
        );
        navigate(fromPage, { replace: true });
    } else if (isError) {
        return (
            <div className="h-screen flex items-center justify-center text-3xl font-bold">
                Что то пошло не так...
            </div>
        );
    }

    return (
        <Helmet title="Войти">
            <div className="register container mx-auto flex items-center justify-center pt-10 h-screen">
                <div className="space-y-5">
                    <div className="register__box bg-white w-[500px] shadow-md rounded-md">
                        <form action="post" onSubmit={handleSubmit(onSubmit)}>
                            <div className="p-2">
                                <h1 className="font-bold text-xl pb-4">
                                    Регистрация
                                </h1>
                            </div>
                            <div className="">
                                <div className=" p-5 space-y-10">
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
                                            })}
                                            className="ring-1 ring-gray-300 w-full p-2 focus:ring-gray-500"
                                            id="password"
                                            type="password"
                                        />
                                        {errors?.password && (
                                            <span className="text-red-600 font-bold">
                                                Поле password обязательно к
                                                заполнению
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
                                    Войти
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="bg-white w-[500px] h-16 flex items-center justify-center shadow-md rounded-md">
                        <p>
                            Ещё нет аккаунта?{" "}
                            <Link to="/register">
                                <span className="text-cyan-600">
                                    Зарегистрируйтесь
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};
