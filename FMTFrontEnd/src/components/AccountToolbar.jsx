import React from 'react';
import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'
import { useNavigate } from "react-router-dom";

export default function AccountToolbar(){
    return (
    <div className="toolbar">
        {<AccountButtons/>}
    </div>
    );
}

function AccountButtons(){
    const {getNonHTML} = useQueryDjangoBackendContext()

    const navigate = useNavigate();

    return (
        <>
            <button id="signin" onClick={() => navigate('/login')}>&#62;Log in</button>
            <button id="signout" onClick={() => getNonHTML('/usrs/signout/')}>&#62;Log out</button>
        </>
    );

}