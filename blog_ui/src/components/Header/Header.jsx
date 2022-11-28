import { useState } from "react";
import { Link } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { RiUserLine, RiSearchLine, RiEdit2Line } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { Category } from "../UI/Category/Category";
import ProfileMenu from "../UI/ProfileMenu/ProfileMenu";

export const Header = () => {
    const [mobileMenu, setMenu] = useState(false);
    const [auth, setAuth] = useState(false);

    const handleMobileMenu = () => {
        setMenu(!mobileMenu);
    };
    const handleAuth = () => {
        setAuth(!auth);
    };
    return (
        <header className="mb-5 relative">
            <div className="flex flex-col">
                <div className="bg-gray-700 w-full h-14">
                    <div className="p-3">
                        <div className="logo container mx-auto flex items-center justify-between">
                            <div className="flex items-center justify-center gap-x-2">
                                <FiMenu
                                    className="menu__icon text-white text-3xl block sm:hidden transition-all cursor-pointer"
                                    onClick={handleMobileMenu}
                                />
                                <Link to="/">
                                    <h1 className="text-2xl font-bold text-white">
                                        DjunPy
                                    </h1>
                                </Link>
                                <span className="text-xl text-white opacity-20 hidden sm:inline">
                                    |
                                </span>{" "}
                                <button className="ring-1 p-[2px] hidden sm:block  ring-gray-400  hover:ring-white text-gray-400 transition-all hover:text-white ">
                                    Как стать автором
                                </button>
                            </div>
                            <p className="text-green-300 hidden md:block">
                                Свежий рейтинг IT-брендов работодателей{" "}
                            </p>
                            <div className="flex items-center gap-x-5 md:hidden">
                                <Link to="search">
                                    <RiSearchLine className="header__icon" />
                                </Link>
                                <Link to="create-post">
                                    <RiEdit2Line className="header__icon" />
                                </Link>
                                <RiUserLine
                                    className="header__icon"
                                    onClick={handleAuth}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header__sticky w-full bg-white p-4 z-30 hidden sm:block">
                    <div className="container mx-auto flex items-center justify-between ">
                        <div className="top-0">
                            <Category />
                        </div>
                        <div className="hidden items-center gap-x-5 md:flex">
                            <Link to="search">
                                <RiSearchLine className="header__icon" />
                            </Link>
                            <Link to="create-post">
                                <RiEdit2Line className="header__icon" />
                            </Link>
                            <RiUserLine
                                className="header__icon"
                                onClick={handleAuth}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        mobileMenu ? "mobile__menu active " : "mobile__menu"
                    }`}
                >
                    <div
                        className="absolute right-2 top-2 rounded-full bg-gray-700 hover:bg-red-600 transition-all cursor-pointer"
                        onClick={handleMobileMenu}
                    >
                        <RiCloseLine className="text-3xl font-bold" />
                    </div>
                    <div className="absolute flex items-center text-2xl flex-col justify-center left-[50%] -translate-x-2/4 top-[20%] -translate-y-2/4">
                        <Category />
                    </div>
                </div>
            </div>
            <div
                className={`${
                    auth ? "block" : "hidden"
                } absolute right-[100px] md:right-[184px]  bg-white w-[367px] h-52 z-30 top-32 `}
            >
                <ProfileMenu />
            </div>
        </header>
    );
};
