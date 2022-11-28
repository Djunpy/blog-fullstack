import { useState } from "react";
import { RiArrowUpSLine, RiArrowDownSLine, RiRssFill } from "react-icons/ri";
import { StreamBtn } from "./StreamBtn";

export const Streams = () => {
    const [filterMenu, setFilterMenu] = useState(false);
    const handelFilter = () => {
        setFilterMenu(!filterMenu);
    };

    return (
        <section className="stream bg-white mb-5">
            <div className="stream__box p-2">
                <div>
                    <div className="stream__head pb-14">
                        <h1 className="text-3xl font-bold">Все потоки</h1>
                    </div>
                    <ul className="flex items-center space-x-5 border-solid border-gray-200 border-b-2 border-t-0 border-r-0 border-l-0 ">
                        <li className="group cursor-pointer p-2 relative">
                            <p className="text-2xl text-gray-500 absolute left-0 -top-4 uppercase flex items-center justify-center gap-x-2 border-t-0 border-l-0 border-r-0 group-hover:border-solid border-b-[2px] hover:text-cyan-800 transition-all">
                                Stream{" "}
                                <span className="text-green-400">+45</span>
                            </p>
                        </li>
                        <li className="group cursor-pointer p-2 relative">
                            <p className="text-2xl text-gray-500 absolute -top-4 left-40 uppercase flex items-center justify-center gap-x-2 border-t-0 border-l-0 border-r-0 group-hover:border-solid border-b-[2px] hover:text-cyan-800 transition-all">
                                Stream{" "}
                                <span className="text-green-400">+45</span>
                            </p>
                        </li>
                    </ul>
                    <div className="pt-5 pb-2">
                        <div className="pb-2 flex items-center justify-between">
                            <button
                                className="flex items-center justify-center text-xl"
                                onClick={handelFilter}
                            >
                                Все подряд{" "}
                                <span>
                                    {!filterMenu ? (
                                        <RiArrowDownSLine className="text-2xl" />
                                    ) : (
                                        <RiArrowUpSLine className="text-2xl" />
                                    )}
                                </span>
                            </button>
                            <RiRssFill className="text-2xl" />
                        </div>
                    </div>
                </div>

                <div
                    className={`${
                        filterMenu ? "max-h-70 " : "max-h-0 "
                    }p-1 overflow-hidden transition-all flex flex-col gap-y-5 `}
                >
                    <div className="flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Сначала показывать</p>
                        <div className="flex gap-x-3">
                            <StreamBtn>Новые</StreamBtn>
                            <StreamBtn>Лучшие</StreamBtn>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-y-3">
                        <p className="text-xl font-bold">Порог рейтинга</p>
                        <div className="flex gap-x-3">
                            <StreamBtn>0</StreamBtn>
                            <StreamBtn>10</StreamBtn>
                            <StreamBtn>20</StreamBtn>
                            <StreamBtn>30</StreamBtn>
                        </div>
                    </div>
                    <div>
                        <button className="p-2 bg-green-600 text-xl text-white rounded-md hover:bg-green-700 transition-all">
                            Применить
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
