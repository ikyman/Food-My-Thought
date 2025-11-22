import {useState} from 'react'
import { QueryDjangoBackendContext } from './QueryDjangoBackendContext'

export const QueryDjangoBackendContextProvider = ({children}) => {
    const backendOrigin = process.env.REACT_APP_DJANGO_ORIGIN;

	const [csrfInputToken, setCsrfInputToken] = useState("");


	const getHTML = async (endpoint) => {
		const getResponseText = getNonHTML(endpoint)

        var htmlPlacer = document.createElement('div');
        htmlPlacer.innerHTML = getResponseText;
        const csrfInputField = document.querySelector('[name=csrfmiddlewaretoken]');
        if (csrfInputField){
        	setCsrfInputToken(csrfInputField.value);
        	csrfInputField.remove();
        }
        return htmlPlacer
	}


	const getNonHTML = async (endpoint) => {
		const getResponse = await fetch(`${backendOrigin}${endpoint}`, { mode:'cors',credentials: 'include' });
        if (!getResponse.ok){
            throw new Error(`Failed to load login page: ${getResponse.status}`);
        }
        return await getResponse.text();
	}


	const csrfPost = async (endpoint, requestBody) => {
    let postBody = new FormData();

    Object.entries(requestBody).map(entry => {
      let key = entry[0];
      let value = entry[1];
      postBody.append(key, value);
    });

		const postResponse = await fetch(`${backendOrigin}${endpoint}`, {
            method : "POST",
            headers: {'X-CSRFToken': csrfInputToken},
            body: postBody,
            credentials: 'include'  
        })
    return postResponse;
	}

	return (
    <QueryDjangoBackendContext.Provider
      value={{ getHTML, getNonHTML, csrfPost }}
    >
      {children}
    </QueryDjangoBackendContext.Provider>
  );
}