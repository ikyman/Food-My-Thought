import React, {useState} from 'react';
import AccountToolbar from './AccountToolbar'


export default function HomeScreen(){
    const [userCode, setUserCode] = useState("The Default")


    return (
     <>
        <div className="green-bkg">
            <h1></h1>
            <div>
                <button id="recipe-reccomend">Recommend Recipes to Randos</button>
                <div>
                    <input name="liveliness" type="radio" value="only-live"/>
                    <input name="liveliness" type="radio" value="total-random"/>
                    <input name="liveliness" type="radio" value="only-dead"/>
                </div>
            </div>

            <button id="recipe-reccomend">List your Larder</button>

        </div>

        <AccountToolbar/>

        <div className="advertisement">
            Buy some stuff!
        </div>
    </>
    );
}
