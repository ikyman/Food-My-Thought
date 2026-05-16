import React from 'react';
import { useNavigate } from "react-router-dom";

export default function ReturnToOwnLarderButton(){
    const navigate = useNavigate();
    
    return (
    <>
        <button id="own-larder-button" onClick = { () => { navigate("/login") } }>List your Larder</button>
    </>
    );
}

