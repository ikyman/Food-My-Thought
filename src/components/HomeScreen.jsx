import React, {useState} from 'react';
import AccountToolbar from './AccountToolbar'
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import RandomLarderForm from './RandomLarderForm'


export default function HomeScreen(){
    const [userCode, setUserCode] = useState("The Default")
    const auth = useAuth();
    const navigate = useNavigate();

    console.log(auth.signinRedirect);

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

function goToOwnLarder(auth){

    if (!auth.isAuthenticated) {
        auth.signinRedirect( );
    }
    

}
