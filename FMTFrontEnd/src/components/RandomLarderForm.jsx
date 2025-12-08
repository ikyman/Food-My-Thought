import React from 'react';
import { useNavigate } from "react-router-dom";
import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'



export default function RandomLarderForm() {
    const navigate = useNavigate();
    const {getNonHTML} = useQueryDjangoBackendContext()

    const navigateToRandomLarder = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        try {
            const response = await getNonHTML("/larders/url-extension?randomness-level=" + formData.get('liveliness'));

            if (response.status == 404){
                navigate("/home")
            }
            if (response.ok){
                const jsonResponse = response.json();
                navigate("/larder/" + jsonResponse.url_exten)
            }
           
        } catch (error) {
            console.error('Error fetching random Larder:', error);
        }
    };

    return (
        <form onSubmit={navigateToRandomLarder}>
            <button type="submit">Recommend Recipes to Randos</button>
            <div>
                <label>
                    <input 
                        name="liveliness" 
                        type="radio" 
                        value="only-live"
                        defaultChecked
                    />
                    Only Alive
                </label>
                <label>
                    <input 
                        name="liveliness" 
                        type="radio" 
                        value="total-random"
                    />
                    Total Random
                </label>
                <label>
                    <input 
                        name="liveliness" 
                        type="radio" 
                        value="only-dead"
                    />
                    Only Dead
                </label>
            </div>
        </form>
    );
}
