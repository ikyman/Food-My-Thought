import React from 'react';
import HomeScreen from "./components/HomeScreen"
import ListerProposerScreen from "./components/ListerProposerScreen"
import LoginPage from "./userManagement/LoginPage"

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom"


export default function WebPageNavigation(){
    return (
     <>
        <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={<Navigate  to="/home" />}
                />
                <Route
                    path="/larder"
                    element={<ListerProposerScreen/>}
                />
                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
                <Route
                    path="/home"
                    element={<HomeScreen/>}
                />
            </Routes>
        </BrowserRouter>
    </>
    );
}
