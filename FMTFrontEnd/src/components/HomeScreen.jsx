import React from 'react';
import AccountToolbar from './AccountToolbar'
import { useNavigate } from "react-router-dom";
import RandomLarderForm from './RandomLarderForm'
import AdSlot from './AdSlot'

export default function HomeScreen(){
    const navigate = useNavigate();
    
    return (
     <>
        <div className="green-bkg whole-page">
            <div>
                <h1></h1>
                <RandomLarderForm />
                <button id="recipe-reccomend" onClick = { () => { navigate("/login") } }>List your Larder</button>
            </div>

            <AdSlot/>

            <AccountToolbar/>
        </div>
    </>
    );
}

