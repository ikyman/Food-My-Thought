import React, {useState} from 'react';

export default function LPTpplbar(){
    const [userCode, setUserCode] = useState("The Default")

    return (
    <div class="toolbar">
    <button id="own-larder-return" class="logged-in-only has-larder-only">Return to Own Larder</button>
    <button id="random-larder">Go to a Random Larder</button>
    <button id="cycle-liveliness">Cycle Liveliness</button>
    <button id="wipe-larder" class="lister-only">Wipe Larder</button>
    <button id="undo" class="lister-only">Undo</button>
    <button id="redo" class="lister-only">Redo</button>
    <button id="get-larder-link" class="lister-only">Get Larder Link</button>


    </div>
    );
}