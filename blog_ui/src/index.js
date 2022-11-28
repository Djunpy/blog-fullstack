import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { DataProvide } from "./Hoc/DataContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <BrowserRouter>
                    <DataProvide>
                        <App />
                    </DataProvide>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
