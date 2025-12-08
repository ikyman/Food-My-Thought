import React, { useEffect, useRef, useState } from 'react';
import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'

export default function LoginPage(){
    const [error, setError] = useState("");
    const {getHTML, csrfPost} = useQueryDjangoBackendContext();


    const sendSignin = async (e) => {
        e.preventDefault();
        
        const signupResponse = await csrfPost("/usrs/signin/", {"email": e.target.elements["email"].value,
                "password": e.target.elements["password"].value}
        );
        if (signupResponse.ok){

        }else{
            console.log(signupResponse);
            const errorText = await signupResponse.text();
            setError( errorText );
        }
        
    } 

    useEffect(() => {
        async function loadLogin(){
            setError("");
            try{
                getHTML("/usrs/signin/")
            }catch(err){
                setError(String(err));
            }
        }
        loadLogin();
    }, []);

    return (
    <>
        <div className="login-page">
            <h2>Log in</h2>
            <form className="login-form" onSubmit={sendSignin}>
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" required />

                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password"  required />

                <button type="submit">Log in</button>
            </form>
            <h3 className = "error">{error}</h3>
            <a href = "/logup"> New User? Sign up!</a>
        </div>
    </>
    );
}
