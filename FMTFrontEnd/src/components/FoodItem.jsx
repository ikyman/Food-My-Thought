import React, { useState, useRef} from 'react';

import { useLarderContext } from '../context/LarderContext/LarderContext'

export class FoodItem{
    constructor(foodItemJson){
        this.id = foodItemJson["id"]
        this.name = foodItemJson["name"]
        this.estimated_expiration_date = foodItemJson["estimated_expiration_date"]
        this.cat1_value = foodItemJson["cat1_value"]
        this.cat2_value = foodItemJson["cat2_value"]
    }
}

export function renderFoodItem(foodItem){  
    const {backEndSave} = useLarderContext();

    const foodItemToBackEnd = async (e) => {
        backEndSave(foodItem)
    }

    const foodItemNav = (keyInput) =>{
        const textareaCalled = document.activeElement;
        if (textareaCalled.tagName !== "TEXTAREA"){
            return
        }
        if (keyInput.key === "ArrowUp" || keyInput.key === "ArrowDown"){
            const rce = new CustomEvent("RowChangeEvent", 
                {detail: {callingFoodItem: foodItem.id, direction: keyInput.key}}
            )
            dispatchEvent(rce);
            return;
        }else if (keyInput.key === "ArrowLeft" && (textareaCalled.selectionStart === 0 && textareaCalled.selectionEnd === 0)){
            const foodItem_tr = textareaCalled.closest("tr");
            const textareas = Array.from(foodItem_tr.querySelectorAll("textarea"));
            console.log(textareas);
            const currentIndex = textareas.indexOf(textareaCalled);
            if (currentIndex != 0){
                console.log(currentIndex);
                let ltextArea = textareas[currentIndex - 1];
                ltextArea.focus();
                ltextArea.selectionStart = ltextArea.textLength;
                ltextArea.selectionEnd = ltextArea.textLength;
            }
        }else if (keyInput.key === "ArrowRight" && (textareaCalled.selectionStart === textareaCalled.textLength && textareaCalled.selectionEnd === textareaCalled.textLength )){
            const foodItem_tr = textareaCalled.closest("tr");
            const textareas = Array.from(foodItem_tr.querySelectorAll("textarea"));
            const currentIndex = textareas.indexOf(textareaCalled);
            if (currentIndex !== -1 && currentIndex < textareas.length - 1){
                let rtextArea = textareas[currentIndex + 1];
                rtextArea.focus();
                rtextArea.selectionStart = rtextArea.textLength;
                rtextArea.selectionEnd = rtextArea.textLength;
            }
        }
    }

    return (<tr className="fooditem-entry" 
                tabIndex="0"
                key={foodItem.id}
                onBlur = {(e) => {foodItemToBackEnd(e);} }
                onKeyDown={(e) => {foodItemNav(e);} }
                >
                <td><textarea className = "name-textarea" value = {foodItem.name} onChange = { (e) => {foodItem.name = e.target.value;}} ></textarea></td>
                <td><textarea className = "date-textarea">{foodItem.estimated_expiration}</textarea></td>
                <td><textarea className = "cat1-textarea">{foodItem.category1}</textarea></td>
                <td><textarea className = "cat2-textarea">{foodItem.category2}</textarea></td>
            </tr>)
}