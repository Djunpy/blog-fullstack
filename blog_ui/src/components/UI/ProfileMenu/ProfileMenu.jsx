import React from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../features/users/authSlice";
import { useSelector } from "react-redux";
import Img from "../../../assets/img/85447c10f44c8c4f5579fa6e31a50a51.png";

const ProfileMenu = () => {
    const currentUser = useSelector(selectCurrentUser);

    return (
        <div>
            {!currentUser ? (
                <div>
                    <div className="space-x-2 flex items-center justify-center">
                        <Link to="login">
                            <button className="p-2 ring-1 ring-cyan-800 text-xl hover:bg-cyan-800 hover:text-white transition-all">
                                Войти
                            </button>
                        </Link>
                        <Link to="register">
                            <button className="p-2 ring-1 ring-cyan-800 text-xl hover:bg-cyan-800 hover:text-white transition-all">
                                Регистрация
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between flex-col h-full p-3">
                    <div className=" space-y-10">
                        <div className="flex  items-center gap-x-5 text-xl">
                            <div className="">
                                <div>
                                    <img className="w-16" src={Img} alt="" />
                                </div>
                            </div>
                            <span>@{currentUser}</span>
                        </div>
                        <div>
                            <ul className="text-xl">
                                <Link to="/author-info">
                                    <li className="hover:bg-cyan-100 pl-5 p-3 cursor-pointer transition-all">
                                        Статьи
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-1 pt-5 pl-5 text-xl font-bold ">
                        <RiLoginBoxLine size={25} /> <button>Выход</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
