import React, { useEffect, useRef, useState } from 'react';

export default function LoginPage(){
    const containerRef = useRef(null);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadLogin(){
            setError("");
            try{
                const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;
                const response = await fetch(`${backendOrigin}/usrs/signin`, { credentials: 'include' });
                if (!response.ok){
                    throw new Error(`Failed to load login page: ${response.status}`);
                }
                const html = await response.text();
                console.log(html);
                if (containerRef.current){
                    containerRef.current.innerHTML = html;
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
