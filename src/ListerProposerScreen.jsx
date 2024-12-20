import React, {useState} from 'react';
import LPToolbar from './LPToolbar'
import AccountToolbar from './AccountToolbar'


export default function ListerProposerScreen(){
    const [userCode, setUserCode] = useState("The Default")


    return (
     <>
        <LPToolbar/>

        <div class="green-bkg">
            <div id="general-larder-info">
                <textarea>This box can only be edited by listers. It is a general description of the larder.</textarea>
            </div>
            <div id="fooditem-list">
                <table id="fooditem-table">
                  <tr>
                    <th>Food Name</th>
                    <th>Estimated Expiration date</th>
                    <th>Category 1</th>
                    <th>Category 2</th>

                  </tr>
                  <tr class="fooditem-entry">
                    <td>Wild Rice</td>
                    <td>14-Jul-2027</td>
                    <td>Vegan</td>
                    <td>Hufflepuff</td>
                  </tr>
                </table>
                <div class="lister-only">
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
                    <textarea id="recipe-description" class="lgrey-bkg" >
                        Rice pudding, but with wild rice
                    </textarea>
                    <div id="recipe-table">
                        <div id="accepted-recipes" class = "lgreen-bkg">
                            Wild Rice pudding
                        </div>
                        <div id="rejected-recipes" class = "red-bkg">
                            Bleach: Tada! Now white rice
                        </div>
                    </div>
                </div>
                <div>
                    <button id="propose-recipe">Propose Recipe</button>
                    <button id="sort-recipe" class="lister-only">Reject Recipe</button>
                    <button id="delete-recipe">Delete Recipe</button>
                </div>
            </div>
        </div>
        
        <AccountToolbar/>

        <div class="advertisement">
            Buy some stuff!
        </div>
    </>
    );
}
