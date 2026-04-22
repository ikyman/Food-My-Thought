import React, { useEffect, useState } from 'react';
import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){
    const [error, setError] = useState("");
    const {getHTML, getNonHTML, csrfPost} = useQueryDjangoBackendContext();
    const navigate = useNavigate();


    const sendSignin = async (e) => {
        e.preventDefault();
        
        const signupResponse = await csrfPost("/usrs/signin/", {"email": e.target.elements["email"].value,
                "password": e.target.elements["password"].value}
        );
        if (signupResponse.ok){
            const responseBody = await signupResponse.json();
            getHTML("/usrs/signin/")
            navigate(`/larder/${responseBody["url_exten"]}`);
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
                const ownLarderResponse = await getNonHTML("/larder/");
                const ownURLExten = ownLarderResponse.headers.get("url_exten");
                if (ownURLExten >= 0){
                    navigate(`/larder/${ownURLExten}`);
                }
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
