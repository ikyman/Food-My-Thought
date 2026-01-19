import {useState} from 'react'
import { useParams } from 'react-router-dom';

import { LarderContext } from './LarderContext'
import { useQueryDjangoBackendContext } from '../QueryDjangoBackendContext/QueryDjangoBackendContext'
import { FoodItem } from '../../components/FoodItem'

export const LarderContextProvider = ({children}) => {
  const { getNonHTML, csrfPost } = useQueryDjangoBackendContext();
  const { url_exten } = useParams();

  const [viewAsOwner, setViewAsOwner] = useState(false);
  const [larderOverview, setLarderOverview] = useState("This box can only be edited by listers. It is a general description of the larder.")
  const [foodItems, setFoodItems] = useState([]);

  const loadLarder = async () => {
    const larderResponse = await getNonHTML(`/larder/${url_exten}/`);
    const larderJson = await larderResponse.json();
    setViewAsOwner(larderJson["display_as_owner"] )
    setLarderOverview(larderJson["user_description"])
    let lfi = [];
    for (let i = 0; i < larderJson["fooditems"].length; ++i){
        const newFoodItem = new FoodItem( larderJson["fooditems"][i]);
        lfi.push(newFoodItem);
    }
    setFoodItems(lfi);
  }

  const addFoodItem = async () => {
    setFoodItems([...foodItems, new FoodItem({})])
  }

  const backEndSave = async (foodItem) => {

    if (foodItem.name){
      const foodPostResponse = await csrfPost("/fooditems/", {
          "larder": url_exten,
          "id" : foodItem.id || "",
          "name": foodItem.name}
      );
      if (foodPostResponse.ok){
        const responseBody = await foodPostResponse.json();
        foodItem.id = responseBody["id"];
      }else{
          console.log(foodPostResponse);
      }
    }
  }

  const deleteFoodItem = async () => {

  }

  const getFoodItems = () => {
    return foodItems;
  }

	return (
    <LarderContext.Provider
      value={{ loadLarder, addFoodItem, backEndSave, deleteFoodItem, getFoodItems}}
    >
      {children}
    </LarderContext.Provider>
  );
}