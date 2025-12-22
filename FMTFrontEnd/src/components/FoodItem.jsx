import React, { useState, useRef} from 'react';
import { useParams } from 'react-router-dom';

import { useQueryDjangoBackendContext } from '../context/QueryDjangoBackendContext/QueryDjangoBackendContext'
import FooditemTable from './FooditemTable';


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
    const { csrfPost} = useQueryDjangoBackendContext()
    const { url_exten } = useParams();

    const foodItemToBackEnd = async (e) => {
        //lostFocus = e.target;
        //currentlyFocused = document.activeElement;

        if (foodItem.name){
            console.log(foodItem)
            const foodPostResponse = await csrfPost("/fooditems/", {
                "larder": url_exten,
                "id" : foodItem.id,
                "password": foodItem.name}
            );
            if (foodPostResponse.ok){
                if (foodPostResponse.status = 201){
                    const responseBody = await foodPostResponse.json();
                    foodItem.id = responseBody["id"];

                }
            }else{
                console.log(foodPostResponse);
            }

        }
    }

    return (<tr className="fooditem-entry" tabIndex="0" key={foodItem.id} onBlur = {(e) => {foodItemToBackEnd(e);} }>
                <td> <textarea value = {foodItem.name} onChange = { (e) => {foodItem.name = e.target.value;}} ></textarea></td>
                <td><textarea>{foodItem.estimated_expiration}</textarea></td>
                <td><textarea>{foodItem.category1}</textarea></td>
                <td><textarea>{foodItem.category2}</textarea></td>
            </tr>)
}