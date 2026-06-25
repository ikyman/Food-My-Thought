import React from 'react';
import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'
import { useNavigate } from "react-router-dom";
import AdSlot from '../components/AdSlot';
import "./Account.css"

export default function AccountToolbar(){
    return (
    <div className='fixed-bottom'>
        {<AdSlot/>}
        <div id="account-toolbar" className="toolbar">
            {<AccountButtons/>}
        </div>
    </div>
    );
}

function AccountButtons(){
    const {getNonHTML} = useQueryDjangoBackendContext()

    const navigate = useNavigate();

    return (
        <>
            <button id="signin" className="account-button" onClick={() => navigate('/login')}>&#62;Log in</button>
            <button id="signout" className="account-button"  onClick={() => getNonHTML('/usrs/signout/')}>&#62;Log out</button>
        </>
    );

}