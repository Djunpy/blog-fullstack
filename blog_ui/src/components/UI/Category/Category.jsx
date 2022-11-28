import React from "react";
import { CategoryItem } from "./CategoryItem";
import { useGetCategoryQuery } from "../../../features/posts/postsSlice";

export const Category = () => {
    const { data, isSuccess } = useGetCategoryQuery();

    return (
        <ul className="category flex flex-col sm:flex-row items-center sm:gap-x-5 gap-y-5">
            {isSuccess &&
                data?.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))}
        </ul>
    );
};
