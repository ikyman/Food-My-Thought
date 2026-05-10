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

        const foodItemTextareas = Array.from(currentRow.querySelectorAll("textarea"));
        const currentFoodItemIndex = foodItemTextareas.indexOf(textareaCalled);

        let selectedTextArea = undefined;
        if (keyInput.key === "ArrowUp" || keyInput.key === "ArrowDown") {
            const textSelectionStart = textareaCalled.selectionStart;
            const textSelectionEnd = textareaCalled.selectionEnd;

            const foodItemRows = Array.from(document.getElementById("fooditem-table").querySelectorAll("tr"));
            const currentIndex = foodItemRows.indexOf(currentRow);

            const fromCategoryNameRow = textareaCalled.classList.contains("category-header")

            let nextIndex = undefined;

            if (keyInput.key === "ArrowUp"){
                nextIndex = Math.max(0, currentIndex-1);
                if (nextIndex == 0 && currentFoodItemIndex < 2){
                    nextIndex = Math.max(0, 1);
                }
                if (ctrlKeyed && currentIndex > 1){
                    nextIndex = Math.max(0, 1);
                }
            }
            if (keyInput.key === "ArrowDown"){
                nextIndex = Math.min(foodItemRows.length - 1, currentIndex+1);
                if (ctrlKeyed &&  !fromCategoryNameRow){
                    nextIndex = foodItemRows.length - 1;
                }
            }
            if (nextIndex === undefined){
                return;
            }
            if (keyInput.key === "ArrowDown" && fromCategoryNameRow){
                selectedTextArea = foodItemRows[nextIndex].querySelectorAll("textarea")[currentFoodItemIndex+2];
            }else if(nextIndex == 0 && !fromCategoryNameRow){
                selectedTextArea = foodItemRows[nextIndex].querySelectorAll("textarea")[currentFoodItemIndex-2];       
            }else{
                selectedTextArea = foodItemRows[nextIndex].querySelectorAll("textarea")[currentFoodItemIndex];
            }
        }

        if (keyInput.key === "ArrowLeft" || keyInput.key === "ArrowRight") {
            const atTextAreaStart = (textareaCalled.selectionStart === 0 && textareaCalled.selectionEnd === 0);
            const atTextAreaEnd = (textareaCalled.selectionStart === textareaCalled.textLength && textareaCalled.selectionEnd === textareaCalled.textLength);

            let nextIndex = undefined;
            if (keyInput.key === "ArrowLeft" && atTextAreaStart){
                nextIndex = Math.max(0, currentFoodItemIndex-1);
                if (ctrlKeyed){
                    nextIndex = 0;
                }
            }
            if (keyInput.key === "ArrowRight" && atTextAreaEnd){
                nextIndex = Math.min(foodItemTextareas.length - 1, currentFoodItemIndex+1);
                if (ctrlKeyed){
                    nextIndex = foodItemTextareas.length - 1;
                }
            }
            if (nextIndex === undefined){
                return;
            }
            selectedTextArea = foodItemTextareas[nextIndex];
        }
        selectedTextArea.focus();
        keyInput.preventDefault();
    }

    return (
        <div id="fooditem-list">
            <table id="fooditem-table" onKeyDown={onFoodTableArrowNav}>
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Estimated Expiration date</th>
                        <th><textarea className='category-header'>{categoryNames[0]}</textarea></th>
                        <th><textarea className='category-header'>{categoryNames[1]}</textarea></th>
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


