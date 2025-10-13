import React, { useEffect, useRef, useState } from 'react';
import {csrftoken} from '../utilities/csrfCookie'

export default function LogupPage(){
    const containerRef = useRef(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadLogup(){
            setError("");
            try{
                const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;
                const response = await fetch(`${backendOrigin}/usrs/signup`, { mode:'cors',credentials: 'include' });
                if (!response.ok){
                    throw new Error(`Failed to load signup page: ${response.status}`);
                }
                const html = await response.text();
                if (containerRef.current){    
                    containerRef.current.innerHTML = html;
                    let htmlForm=containerRef.current.getElementsByTagName("form")[0];
                    if (htmlForm == undefined){
                        throw new Error("Sign-up form doesn't have a form")
                    }
                    htmlForm.action = `${backendOrigin}/usrs/signup`;
                    htmlForm.method = "POST";
                    console.log(htmlForm);
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
            <div ref={containerRef} className="logup-html" />
        </div>
    </>
    );
}
