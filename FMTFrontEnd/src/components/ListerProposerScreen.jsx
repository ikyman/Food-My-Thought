import React, {useEffect, useState} from 'react';
import LPToolbar from './LPToolbar'
import AccountToolbar from './AccountToolbar'
import FooditemTable from './FooditemTable';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'



export default function ListerProposerScreen(){
    const { url_exten } = useParams();
    const {getNonHTML} = useQueryDjangoBackendContext()
    const [viewAsOwner, setViewAsOwner] = useState(false);
    const [larderOverview, setLarderOverview] = useState("This box can only be edited by listers. It is a general description of the larder.")
    const [larder, setLarder] = useState(null);

    let loadedFoodItems = []

    const navigate = useNavigate()

    useEffect(() => {
        async function loadLarder(){
            try{
                const larderResponse = await getNonHTML(`/larder/${url_exten}/`);
                const larderJson = await larderResponse.json();
                setViewAsOwner(larderJson["display_as_owner"] )
                setLarder(larderJson);
                setLarderOverview(larderJson["user_description"])


            }catch(err){
                console.error(String(err));
                navigate(`/home/`);
            }
        }
        loadLarder();
    }, []);


    return (
     <>
        <LPToolbar/>

        <div className="green-bkg">
            <div id="general-larder-info">
                <textarea defaultValue={larderOverview}/>
            </div>
            <FooditemTable loadedFoodItems = { [ ] } loadedCategoryNames = {["Cat 1", "Cat 2"]} viewAsOwner = {viewAsOwner}/>

            <div id="fooditem-specifics">
                <div>
                    <div>
                        <div id="fooditem-name">
                            Wild Rice
                        </div>
                        <div id = "recipe-name">
                            Wild Rice pudding
                        </div>
                    </div>
                    <textarea id="recipe-description" className="lgrey-bkg" defaultValue="Rice pudding, but with wild rice"/>
                    <div id="recipe-table">
                        <div id="accepted-recipes" className="lgreen-bkg">
                            Wild Rice pudding
                        </div>
                        <div id="rejected-recipes" className="red-bkg">
                            Bleach: Tada! Now white rice
                        </div>
                    </div>
                </div>
                <div>
                    <button id="propose-recipe">Propose Recipe</button>
                    <button id="sort-recipe" className="lister-only">Reject Recipe</button>
                    <button id="delete-recipe">Delete Recipe</button>
                </div>
            </div>
        </div>

        <AccountToolbar/>

        <div className="advertisement">
            Buy some stuff!
        </div>
    </>
    );
}
