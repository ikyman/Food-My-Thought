import React, { useState} from 'react';

import { useLarderContext } from '../context/LarderContext/LarderContext'

import { FoodItem, renderFoodItem } from "./FoodItem"

/**
 * Renders the table of food items for a larder.
 * 
 * Props:
 * - fooditems: array of objects, each with at least
 *   { id?, name, estimated_expiration, category1, category2 }
 */
export default function FooditemTable({loadedCategoryNames, viewAsOwner}) {
    const [categoryNames, setCategoryNames] = useState(loadedCategoryNames)
    const larderContext = useLarderContext();

    const addFoodItem = () =>{
        larderContext.addFoodItem()
    }

    return (
        <div id="fooditem-list">

            <table id="fooditem-table">
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Estimated Expiration date</th>
                        <th>{categoryNames[0]}</th>
                        <th>{categoryNames[1]}</th>
                    </tr>
                </thead>
                <tbody>
                    {larderContext.getFoodItems().length === 0 ? (
                        <tr className="fooditem-entry">
                            <td colSpan={4}>No food items in this larder yet.</td>
                        </tr>
                    ) : (
                        larderContext.getFoodItems().map((item) => (
                            renderFoodItem(item)
                        ))
                    )}
                </tbody>
            </table>
            <div className="lister-only">
                <button id="add-fooditem" onClick={addFoodItem}>Add Footitem</button>
                <button id="delete-fooditem">Delete Fooditem</button>
    
            </div>
        </div>
    );
}


