import React from "react";

export const CategoryItem = ({ category }) => {
    return (
        <li className="text-gray-500  transition hover:text-cyan-800 font-bold sm:font-normal sm:text-xl  cursor-pointer">
            {category?.name}
        </li>
    );
};
