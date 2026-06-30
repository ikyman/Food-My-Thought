import React, {useEffect, useState} from 'react';
import LPToolbar from './LPToolbar'
import AccountToolbar from '../userManagement/AccountToolbar'
import FooditemTable from './FooditemTable';
import AdSlot from './AdSlot'


import { useLarderContext } from '../context/LarderContext/LarderContext'



export default function ListerProposerScreen(){
    const {viewLive, viewAsOwner, loadLarder} = useLarderContext();
    const [larderOverview, setLarderOverview] = useState("This box can only be edited by listers. It is a general description of the larder.")


    useEffect(() => {
        loadLarder();
    }, []);


    return (
    <>
     <div className={"whole-page " + (viewLive? "green-bkg" : "grey-bkg")} >
        <LPToolbar/>
        <div className="larder-seperation">
            <div id="general-larder-info">
                {
                    (!viewLive || viewAsOwner)? 
                    <div id="user-summary">{(!viewLive? <a className='grey-text'>[expired]</a> : <></>)} {larderOverview} </div>:
                    <textarea id="user-summary" defaultValue={larderOverview}/>

                }
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
        
        <AccountToolbar/>
    </div>
    </>
    );
}
