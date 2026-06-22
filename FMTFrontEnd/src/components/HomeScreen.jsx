import React from 'react';
import AccountToolbar from './AccountToolbar'
import { useNavigate } from "react-router-dom";
import RandomLarderForm from './RandomLarderForm/RandomLarderForm'
import ReturnToOwnLarderButton from './ReturnToOwnLarderButton'
import AdSlot from './AdSlot'

export default function HomeScreen(){
    const navigate = useNavigate();
    
    return (
     <>
        <div className="green-bkg whole-page">
            <div>
                <h1></h1>
                <RandomLarderForm displayMode = {"Homescreen"} />
                <ReturnToOwnLarderButton/>
            </div>

            <AccountToolbar/>
        </div>
    </>
    );
}

