import React, { useEffect, useRef, useState } from 'react';
import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'


export default function LogupPage(){
    const [error, setError] = useState("");
    const {getHTML, csrfPost} = useQueryDjangoBackendContext()

    const sendSignup = async (e) => {
        e.preventDefault();
        
        await csrfPost("/usrs/signup/", {"email": e.target.elements["email"].value,
                "password1": e.target.elements["password1"].value,
                "password2": e.target.elements["password2"].value
            }
        );
    } 

    useEffect(() => {
        async function loadLogup(){
            setError("");
            try{
                getHTML("/usrs/signup/")
            }catch(err){
                setError(String(err));
            }
        }
        loadLogup();
    }, []);

    return (
    <>
        <div className="logup-page">
            <h2>Sign Up</h2>
            {error ? (
                <div className="error">{error}</div>
            ) : null}
            <form className="logup-form" onSubmit={sendSignup} > 
                <label htmlFor="email">E-mail</label>
                <input id="email" name="email" type="email" required />
                <br/>
                <label htmlFor="password1">Password</label>
                <input id="password1" name="password1" type="password"  required />
                <br/>
                <label htmlFor="password2">Confirm Password</label>
                <input id="password2" name="password2" type="password"  required />
                <br/>

                <button type="submit">Sign Up</button>
            </form>
            <h3 className = "error">{error}</h3>
        </div>
    </>
    );
}
