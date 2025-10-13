import React, { useEffect, useRef, useState } from 'react';

export default function LoginPage(){
    const containerRef = useRef(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadLogin(){
            setError("");
            try{
                const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;
                const response = await fetch(`${backendOrigin}/usrs/signin`, { mode:'cors',credentials: 'include' });
                if (!response.ok){
                    throw new Error(`Failed to load login page: ${response.status}`);
                }
                const html = await response.text();
                if (containerRef.current){    
                    containerRef.current.innerHTML = html;
                    let htmlForm=containerRef.current.getElementsByTagName("form");
                    htmlForm.action = `${backendOrigin}/usrs/signin`;
                    htmlForm.method = "POST";
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
            {error ? (
                <div className="error">{error}</div>
            ) : null}
            <div ref={containerRef} className="login-html" />
        </div>
    </>
    );
}
