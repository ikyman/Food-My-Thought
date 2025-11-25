import React from 'react';
import AccountToolbar from './AccountToolbar'
import { useNavigate } from "react-router-dom";
import RandomLarderForm from './RandomLarderForm'



export default function HomeScreen(){
    const navigate = useNavigate();
    return (
     <>
        <div className="green-bkg">
            <h1></h1>
            <RandomLarderForm />

            <button id="recipe-reccomend" onClick = { () => { navigate("/login") } }>List your Larder</button>

        </div>

        <AccountToolbar/>

        <div className="advertisement">
            Buy some stuff!
        </div>
    </>
    );
}

