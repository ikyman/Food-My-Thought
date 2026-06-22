import React from 'react';
import { useNavigate } from "react-router-dom";
import { useQueryDjangoBackendContext } from '../../context/QueryDjangoBackendContext/QueryDjangoBackendContext'
import RandomLarderToolbar from './RandomLarderToolbar';
import RandomLarderHomescreen from './RandomLarderHomescreen';

export default function RandomLarderForm({displayMode}) {
    const navigate = useNavigate();
    const {getNonHTML} = useQueryDjangoBackendContext()

    const navigateToRandomLarder = async (livelinessLevel) => {
        
        try {
            const response = await getNonHTML("/larders/url-extension/?randomness-level=" + livelinessLevel );

            if (response.ok){
                const jsonResponse = await response.json();
                navigate("/larder/" + jsonResponse.url_exten)
            }else{
                navigate("/home")
            }
           
        } catch (error) {
            console.error('Error fetching random Larder:', error);
        }
    };

    if (displayMode === "Toolbar"){
        return <RandomLarderToolbar submitAction={navigateToRandomLarder} />;
    }else if (displayMode === "Homescreen"){
        return <RandomLarderHomescreen submitAction={navigateToRandomLarder} />;
    }else{
        return <></>;
    }
}
