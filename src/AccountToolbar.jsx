import React, {useState} from 'react';
import { useAuth } from "react-oidc-context";

export default function AccountToolbar(){



    return (
    <div className="toolbar">
        {<AccountButtons/>}
    </div>
    );
}

function AccountButtons(){
    const auth = useAuth();
    const signOutRedirect = () => {
        const clientId = "5m2eg7uhvc36iubggemlqul7rp";
        const logoutUri = "<logout uri>";
        const cognitoDomain = "https://us-east-2ogxlfv3xw.auth.us-east-2.amazoncognito.com";
        window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
    };
    if (auth.isLoading) {
        return <>Loading...</>;
    }

    if (auth.error) {
        return <>Encountering error... {auth.error.message}</>;
    }

    if (auth.isAuthenticated) {
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
            <button id="signin" onClick={() => auth.signinRedirect()}>&#62;Log in</button>
            <button id="signout" onClick={() => signOutRedirect()}>&#62;Log out</button>
        </>
    );

}