import React, {useState} from 'react';
import ReturnToOwnLarderButton from "./ReturnToOwnLarderButton"

export default function LPTpplbar(){
    const [userCode, setUserCode] = useState("The Default")

    return (
    <div id = "lp-top-toolbar" className="toolbar">
        <div id="navigation-tools">
            <ReturnToOwnLarderButton/>
            <button id="random-larder">Go to a Random Larder</button>
            <button id="cycle-liveliness">Cycle Liveliness</button>
        </div>
        <button id="wipe-larder" className="lister-only">Wipe Larder</button>

        <div className="utilTools">
            <button id="undo" className="lister-only">Undo</button>
            <button id="redo" className="lister-only">Redo</button>
            <button id="get-larder-link" className="lister-only">Get Larder Link</button>
        </div>
    </div>
    );
}