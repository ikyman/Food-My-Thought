import React, {useState} from 'react';
import LPToolbar from './LPToolbar'
import AccountToolbar from './AccountToolbar'


export default function ListerProposerScreen(){
    const [userCode, setUserCode] = useState("The Default")


    return (
     <>
        <LPToolbar/>

        <div className="green-bkg">
            <div id="general-larder-info">
                <textarea defaultValue="This box can only be edited by listers. It is a general description of the larder."/>
            </div>
            <div id="fooditem-list">
                <table id="fooditem-table">
                    <thead>
                        <tr>
                            <th>Food Name</th>
                            <th>Estimated Expiration date</th>
                            <th>Category 1</th>
                            <th>Category 2</th>
                        </tr>
                    </thead>
                    <tbody>
                      <tr className="fooditem-entry">
                        <td>Wild Rice</td>
                        <td>14-Jul-2027</td>
                        <td>Vegan</td>
                        <td>Hufflepuff</td>
                      </tr>
                    </tbody>
                </table>
                <div className="lister-only">
                    <button id="add-fooditem">Add Footitem</button>
                    <button id="delete-fooditem">Delete Fooditem</button>

                </div>
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

        <div className="advertisement">
            Buy some stuff!
        </div>
    </>
    );
}
