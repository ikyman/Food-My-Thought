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

    const onFoodTableArrowNav = (keyInput) => {
        if (!keyInput.key.startsWith("Arrow")) {
            return;
        }
        const textareaCalled = document.activeElement;
        const currentRow = keyInput.target.closest("tr");
        const ctrlKeyed = keyInput.ctrlKey;

        if (!textareaCalled || textareaCalled.tagName !== "TEXTAREA") {
            return;
        }

        if (keyInput.key === "ArrowUp" || keyInput.key === "ArrowDown") {
            console.log("Current fooditem-entry row:", currentRow);

            return;
        }

        if (keyInput.key === "ArrowLeft" || keyInput.key === "ArrowRight") {
            const atTextAreaStart = (textareaCalled.selectionStart === 0 && textareaCalled.selectionEnd === 0);
            const atTextAreaEnd = (textareaCalled.selectionStart === textareaCalled.textLength && textareaCalled.selectionEnd === textareaCalled.textLength);

            const foodItemTextareas = Array.from(currentRow.querySelectorAll("textarea"));
            const currentIndex = foodItemTextareas.indexOf(textareaCalled);

            let nextIndex = undefined;
            if (keyInput.key === "ArrowLeft" && atTextAreaStart){
                nextIndex = Math.max(0, currentIndex-1);
                if (ctrlKeyed){
                    nextIndex = 0;
                }
            }
            if (keyInput.key === "ArrowRight" && atTextAreaEnd){
                nextIndex = Math.min(foodItemTextareas.length - 1, currentIndex+1);
                if (ctrlKeyed){
                    nextIndex = foodItemTextareas.length - 1;
                }
            }
            if (nextIndex === undefined){
                return;
            }
            const selectedTextArea = foodItemTextareas[nextIndex];
            selectedTextArea.focus();
            keyInput.preventDefault();

            console.log("Current DOM textbox:", textareaCalled);
        }
    }

    return (
        <div id="fooditem-list">
            <table id="fooditem-table" onKeyDown={onFoodTableArrowNav}>
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


