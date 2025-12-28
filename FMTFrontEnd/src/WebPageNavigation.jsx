import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom"

import HomeScreen from "./components/HomeScreen"
import ListerProposerScreen from "./components/ListerProposerScreen"
import LoginPage from "./userManagement/LoginPage"
import LogupPage from "./userManagement/LogupPage"
import TestPost from './components/TestPost';

import { LarderFooditemsContextProvider} from './context/LarderFooditemsContext/LarderFooditemsContextProvider'


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
                    element={<LarderFooditemsContextProvider>
                                <ListerProposerScreen/>
                            </LarderFooditemsContextProvider>
                            }
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
