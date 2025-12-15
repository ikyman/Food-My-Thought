import React from 'react';
import HomeScreen from "./components/HomeScreen"
import ListerProposerScreen from "./components/ListerProposerScreen"
import LoginPage from "./userManagement/LoginPage"
import LogupPage from "./userManagement/LogupPage"
import TestPost from './components/TestPost';

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
                    path="/larder/:url_exten"
                    element={<ListerProposerScreen/>}
                />
                <Route
                    path="/login"
                    element={<LoginPage/>}
                />
                <Route
                    path="/logup"
                    element={<LogupPage/>}
                />
                <Route
                    path="/home"
                    element={<HomeScreen/>}
                />
                <Route
                    path = "testpost"
                    element = {<TestPost/>}
                />
            </Routes>
        </BrowserRouter>
    </>
    );
}
