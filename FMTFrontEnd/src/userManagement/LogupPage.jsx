import React, { useEffect, useRef, useState } from 'react';
import CSRFToken from '../utilities/csrfCookie'

export default function LogupPage(){
    const questionsRef = useRef(null);
    const [error, setError] = useState("");

    const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;

    useEffect(() => {
        async function loadLogup(){
            setError("");
            try{
                const response = await fetch(`${backendOrigin}/usrs/signup/`, { mode:'cors',credentials: 'include' });
                if (!response.ok){
                    throw new Error(`Failed to load signup page: ${response.status}`);
                }
                const html = await response.text();
                if (questionsRef.current){    
                    questionsRef.current.innerHTML = html;

                }
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
            <form className="logup-form" method = "POST" action = {backendOrigin + "/usrs/signup/" } > 
                <CSRFToken/>
                <div ref = {questionsRef}></div>
            </form>
        </div>
    </>
    );
}
