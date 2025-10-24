import React, { useEffect, useRef, useState } from 'react';
import getCookie from '../utilities/csrfCookie'


export default function TestPost(){
    const [csrfToken, setCsrfToken] = useState("");
    const [error,setError] = useState ("")
    const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;


    const  sendSignin = (e) => {
        e.preventDefault();

        console.log("Saved csrf token: ");
        console.log(csrfToken);
        console.log("Cookie's csrf token: ");
        const gottenCookie = getCookie('csrftoken');
        console.log(gottenCookie);

        const savedCsrfRequest = new Request(`${backendOrigin}/testpost/`, {
            method : "POST",
            headers: {
                "HTTP_X_CSRFTOKEN": csrfToken,
                "X_CSRFTOKEN": csrfToken,
                "savedextraheader": "saveXrra"
            },
            body:{"typed texy": e.target.elements["textTestPost"].value,
                "extra body": "Used Saved CSRF Token!"
            },
            mode: 'cors',
            credentials: 'include'  
        })
        console.log("has X_CSRFTOKEN? & HTTP_X_CSRFTOKEN? (saved)")
        console.log(savedCsrfRequest.headers.get("X_CSRFTOKEN"))
        console.log(savedCsrfRequest.headers.get("HTTP_X_CSRFTOKEN"))

        const cookieCsrfRequest = new Request(`${backendOrigin}/testpost/`, {
            method : "POST",
            headers: {
                "X_CSRFTOKEN": gottenCookie,
                "HTTP_X_CSRFTOKEN": gottenCookie,
                "pointlessextra": "Dumb Extra Header"

            },
            body:{"typed texy": e.target.elements["textTestPost"].value,
                "extra body": "used Cookie's csrf Token!"
            },
            mode: 'cors',
            credentials: 'include'  
        });
        
        console.log("has X_CSRFTOKEN? & HTTP_X_CSRFTOKEN? (Cookie)")
        console.log(cookieCsrfRequest.headers.get("X_CSRFTOKEN"))
        console.log(cookieCsrfRequest.headers.get("HTTP_X_CSRFTOKEN"))

        fetch(savedCsrfRequest).then( async (response) => {console.log("Saved csrf response:"); console.log(await response.text() )});
        fetch(cookieCsrfRequest).then( async (response) => {console.log("Cookie csrf response:"); console.log(await response.text())})

    } 

    useEffect(() => {
        async function loadLogin(){
            setError("");
            try{ 
                const response = await fetch(`${backendOrigin}/testpost/`, { mode:'cors',credentials: 'include' });
                if (!response.ok){
                    throw new Error(`Failed to load login page: ${response.status}`);
                }

                var htmlPlacer = document.createElement('div');
                console.log(response)
                htmlPlacer.innerHTML = await response.text();
                console.log(htmlPlacer.getElementsByTagName("input")[0].value);
                setCsrfToken(htmlPlacer.getElementsByTagName("input")[0].value);
            }catch(err){
                setError(String(err));
                console.log(err);
            }
        }
        loadLogin();
    }, []);

    return (
    <>
        <div>
            <form className="test-csrf-post" onSubmit={sendSignin}>
                <input id="textTestPost" name="textTestPost" type="text" value = "I am currently testing How to get the right CSFR token to django such that it doesn't complain." />
                <button type="submit">Log in</button>
            </form>
        </div>
    </>
    );
}
