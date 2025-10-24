import React, { useEffect, useRef, useState } from 'react';
import getCookie from '../utilities/csrfCookie'


export default function LoginPage(){
    const containerRef = useRef(null);
    const [error, setError] = useState("");
    const [csrfToken, setCsrfToken] = useState("");

    const sendSignin = (e) => {
        e.preventDefault();
        const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;

        //var csrftoken = getCookie('csrftoken')
        console.log(this);
        console.log(e.target.elements["email"].value);
        console.log(e.target.elements["password"].value);

        console.log(Object.prototype.toString.call(e.target));
        console.log(csrfToken);

        fetch(`${backendOrigin}/usrs/signin/`, {
            method : "POST",
            headers: {'X-CSRFToken': csrfToken},
            body:{"email": e.target.elements["email"].value,
                "password": e.target.elements["password"].value
            },
            credentials: 'include'  
        })
    } 

    useEffect(() => {
        async function loadLogin(){
            setError("");
            try{
                const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;
                const response = await fetch(`${backendOrigin}/usrs/signin`, { mode:'cors',credentials: 'include' });
                if (!response.ok){
                    throw new Error(`Failed to load login page: ${response.status}`);
                }

                var htmlPlacer = document.createElement('div');
                htmlPlacer.innerHTML = await response.text();
                console.log(htmlPlacer.getElementsByTagName("input")[0].value);
                setCsrfToken(htmlPlacer.getElementsByTagName("input")[0].value);
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
        </div>
    </>
    );
}
