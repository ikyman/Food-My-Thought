import React, {useState} from 'react';
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

export default function AccountToolbar(){
    return (
    <div className="toolbar">
        {<AccountButtons/>}
    </div>
    );
}

function AccountButtons(){
    const auth = useAuth();
    const navigate = useNavigate();

    if (auth.isLoading) {
        return <>Loading...</>;
    }

    if (auth.error) {
        return <>Encountering error... {auth.error.message}</>;
    }

    if (auth.isAuthenticated) {
        console.log(auth.user?.profile.sub);
        return (
        <>
            <pre> Hello: {auth.user?.profile.email} </pre>
            <pre> ID Token: {auth.user?.id_token} </pre>
            <pre> Access Token: {auth.user?.access_token} </pre>
            <pre> Refresh Token: {auth.user?.refresh_token} </pre>

            <button id="signout" onClick={() => auth.removeUser()}>Log out</button>

        </>
        );
    }

    return (
        <>
            <button id="signin" onClick={() => navigate('/login')}>&#62;Log in</button>
            <button id="signout" onClick={() => console.log("Not Yet Implimented!")}>&#62;Log out</button>
        </>
    );

}