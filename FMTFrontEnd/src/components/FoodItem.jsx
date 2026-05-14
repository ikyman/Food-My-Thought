import React, { useEffect, useRef} from 'react';

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

export function FoodItemRow({foodItem}){  
    const {backEndSave} = useLarderContext();

    const nameRef = useRef( foodItem.name); 
    const dateRef = useRef( foodItem.estimated_expiration);
    const cat1Ref = useRef( foodItem.category1 );
    const cat2Ref = useRef( foodItem.category2 );


    const foodItemToBackEnd = async (e) => {
        const savedFoodItemProps = new FoodItem({
            "id" : foodItem.id,
            "name" : nameRef.current.value,
            "estimated_expiration_date" : dateRef.current.value,
            "cat1_value" : cat1Ref.current.value,
            "cat2_value" : cat2Ref.current.value
        })
        backEndSave(savedFoodItemProps)
    }

    useEffect(() => {
        nameRef.current.value = foodItem.name;
    }, []);

    return (<tr className="fooditem-entry" 
                tabIndex="0"
                key={foodItem.id}
                onBlur = {(e) => {foodItemToBackEnd(e);} }
                >
                <td><textarea className = "name-textarea" ref = {nameRef} ></textarea></td>
                <td><textarea className = "date-textarea" ref = {dateRef} ></textarea></td>
                <td><textarea className = "cat-textarea"  ref = {cat1Ref} ></textarea></td>
                <td><textarea className = "cat-textarea"  ref = {cat2Ref} ></textarea></td>
            </tr>)
}