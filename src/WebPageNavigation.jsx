import React, {useState} from 'react';
import HomeScreen from "./components/HomeScreen"
import ListerProposerScreen from "./components/ListerProposerScreen"

import {
    BrowserRouter,
    Routes,
    Route,
    Naviagate
} from "react-router-dom"


export default function WebPageNavigation(){


    return (
     <>
        <BrowserRouter>
            <Routes>
                <Route
                    path="/larder"
                    element={<ListerProposerScreen/>}
                />
                <Route
                    path="*"
                    element={<HomeScreen/>}
                />
            </Routes>
        </BrowserRouter>
    </>
    );
}
