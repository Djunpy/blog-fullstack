import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import { HomePage } from "../pages/HomePage";
import { Profile } from "../pages/Profile";
import { NotFoundPage } from "../pages/NotFoundPage";
import { AuthorInfo } from "../pages/AuthorInfo";
import { MemoizedPostDetail } from "../pages/PostDetail";
import { SearchPage } from "../pages/SearchPage";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { CreatePost } from "../pages/CreatePost";
import { RequireAuth } from "../components/Hoc/RequireAuth";
import { CreatePost2 } from "../pages/CreatePost2";

export const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route index element={<HomePage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="author-info" element={<AuthorInfo />} />
            <Route path="post/:id" element={<MemoizedPostDetail />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route
                path="create-post"
                element={
                    <RequireAuth>
                        <CreatePost />
                    </RequireAuth>
                }
            />
            <Route
                path="create-post-2"
                element={
                    <RequireAuth>
                        <CreatePost2 />
                    </RequireAuth>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};
