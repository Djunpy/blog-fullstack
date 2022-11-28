import React from "react";

export const Helmet = ({ title, children }) => {
    document.title = `Djunpy - ${title}`;
    return <div>{children}</div>;
};
