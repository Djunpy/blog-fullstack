import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

export const Pagination = ({ page, setPage, total_pages, previous, next }) => {
    // const lastPostIndex = page * 5;
    // const firstPostIndex = lastPostIndex - page;

    let pages = [];
    for (let i = 0; i <= total_pages; i++) {
        pages.push(i);
    }
    const nexPage = () => {
        if (next) {
            setPage((page += 1));
        }
    };
    const prevPage = () => {
        if (previous) {
            setPage((page -= 1));
        }
    };

    return (
        <div className="pagination">
            <div className="pagination__box flex items-center justify-between pt-3">
                <div className="">
                    <button
                        className="flex items-center justify-center"
                        onClick={prevPage}
                    >
                        <RiArrowLeftSLine className="text-4xl" />{" "}
                        <span>Назад</span>
                    </button>
                </div>
                <ul className="flex gap-x-3">
                    {pages.slice(1).map((currPage) => (
                        <li
                            className=""
                            key={currPage}
                            onClick={() => setPage(currPage)}
                        >
                            <button
                                className={`${
                                    page === currPage
                                        ? "ring-1 ring-cyan-800"
                                        : ""
                                } p-2 text-xl rounded-sm`}
                            >
                                {currPage}
                            </button>
                        </li>
                    ))}
                </ul>
                <div>
                    <button
                        className="flex items-center justify-center"
                        onClick={nexPage}
                    >
                        <span>Вперед</span>
                        <RiArrowRightSLine className="text-4xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};
