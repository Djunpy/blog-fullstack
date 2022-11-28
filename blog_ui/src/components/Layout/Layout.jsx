import React from "react";
import { Header } from "../Header/Header";
import { RightBar } from "../RightBar/RightBar";
import { Footer } from "../Footer/Footer";

import { Routers } from "../../routes/Routers";

export const Layout = () => {
    return (
        <>
            <Header />

            <div className="grid xl:grid-cols-4 gap-x-5 container mx-auto">
                <div className="col-span-3">
                    <Routers />
                </div>
                <div>
                    <RightBar />
                </div>
            </div>

            <Footer />
        </>
    );
};
