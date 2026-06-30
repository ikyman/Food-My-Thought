import React from 'react';
import AccountToolbar from '../userManagement/AccountToolbar'
import { useNavigate } from "react-router-dom";
import RandomLarderForm from './RandomLarderForm/RandomLarderForm'
import ReturnToOwnLarderButton from './ReturnToOwnLarderButton'
import AdSlot from './AdSlot'

export default function HomeScreen(){
    const navigate = useNavigate();
    
    return (
     <>
        <div className="green-bkg whole-page homescreen">
            <div className='homescreen-center'>
                <h1 id="homescreen-error-header"></h1>
                <RandomLarderForm displayMode = {"Homescreen"} />
                <ReturnToOwnLarderButton/>
            </div>

            <AccountToolbar/>
        </div>
    </>
    );
}

