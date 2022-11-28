import React from "react";
import Img from "../../assets/img/7636ecffdd07709ebdb5d501f0f6e34d.png";
import { useGetUsersQuery } from "../../features/users/usersSlice";

export const UserBar = () => {
    const { data } = useGetUsersQuery();

    return (
        <div className="">
            {data?.map((user) => (
                <div
                    className=" container mx-auto flex items-center gap-x-3"
                    key={user.id}
                >
                    <div>
                        <img className="w-16 h-16" src={Img} alt="" />
                    </div>
                    <p>{user.username}</p>
                </div>
            ))}
        </div>
    );
};
