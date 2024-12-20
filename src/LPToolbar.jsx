import React, {useState} from 'react';

export default function LPTpplbar(){
    const [userCode, setUserCode] = useState("The Default")

    return (
    <div className="toolbar">
        <button id="own-larder-return" className="logged-in-only has-larder-only">Return to Own Larder</button>
        <button id="random-larder">Go to a Random Larder</button>
        <button id="cycle-liveliness">Cycle Liveliness</button>
        <button id="wipe-larder" className="lister-only">Wipe Larder</button>
        <button id="undo" className="lister-only">Undo</button>
        <button id="redo" className="lister-only">Redo</button>
        <button id="get-larder-link" className="lister-only">Get Larder Link</button>


    </div>
    );
}