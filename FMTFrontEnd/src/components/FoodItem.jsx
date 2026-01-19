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

    return (<tr className="fooditem-entry" tabIndex="0" key={foodItem.id} onBlur = {(e) => {foodItemToBackEnd(e);} }>
                <td> <textarea value = {foodItem.name} onChange = { (e) => {foodItem.name = e.target.value;}} ></textarea></td>
                <td><textarea>{foodItem.estimated_expiration}</textarea></td>
                <td><textarea>{foodItem.category1}</textarea></td>
                <td><textarea>{foodItem.category2}</textarea></td>
            </tr>)
}