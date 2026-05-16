import React, {useEffect, useState} from 'react';
import LPToolbar from './LPToolbar'
import AccountToolbar from './AccountToolbar'
import FooditemTable from './FooditemTable';
import AdSlot from './AdSlot'


import { useLarderContext } from '../context/LarderContext/LarderContext'



export default function ListerProposerScreen(){
    const larderContext = useLarderContext();
    const [viewAsOwner, setViewAsOwner] = useState(false);
    const [larderOverview, setLarderOverview] = useState("This box can only be edited by listers. It is a general description of the larder.")


    useEffect(() => {
        larderContext.loadLarder();
    }, []);


    return (
     <div className="green-bkg whole-page">
        <LPToolbar/>

        <div className="larder-seperation">
            <div id="general-larder-info">
                <textarea id="user-summary" defaultValue={larderOverview}/>
                <FooditemTable  loadedCategoryNames = {["Cat 1", "Cat 2"]} viewAsOwner = {viewAsOwner}/>
            </div>

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

        <AdSlot/>
        
        <AccountToolbar/>
    </div>
    );
}
