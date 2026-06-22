import React, { useState } from 'react';

export default function RandomLarderHomeScreen({submitAction}) {
    const liveliness_options = ["only-live", "total-random", "only-dead"]
    const [livelinessIndex, setLivelinessIndex] = useState(0);

    const cycle_liveliness = () => {
        setLivelinessIndex((livelinessIndex + 1) % liveliness_options.length)
    }

    return (
        <>
            <button id="random-larder" onClick = {()=>submitAction(liveliness_options[livelinessIndex])}>Go to a Random Larder</button>
            <button id="cycle-liveliness" onClick={cycle_liveliness}>{"Cycle Liveliness: " + liveliness_options[livelinessIndex]}</button>
        </>
    );
}
