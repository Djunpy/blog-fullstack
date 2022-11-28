import React from "react";

export const StreamBtn = ({ children }) => {
    return (
        <button className="p-2 ring-cyan-800 ring-1 rounded-md text-xl hover:text-white hover:bg-cyan-800 transition-all">
            {children}
        </button>
    );
};
