import React from "react";

export const StreamItem = () => {
    return (
        <li className="group cursor-pointer p-2 relative">
            <p className="text-2xl text-gray-500 absolute -top-4 uppercase flex items-center justify-center gap-x-2 border-t-0 border-l-0 border-r-0 group-hover:border-solid border-b-[2px] hover:text-cyan-800 transition-all">
                Stream <span className="text-green-400">+45</span>
            </p>
        </li>
    );
};
