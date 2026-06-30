import React from 'react';

export default function RandomLarderHomescreen({submitAction}) {

    const submitHomescreenRandomForm = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        submitAction(formData.get('liveliness'))
    }

    return (
        <form onSubmit={submitHomescreenRandomForm}>
            <button type="submit">Recommend Recipes to Randos</button>
            <div>
                <label>
                    <input 
                        name="liveliness" 
                        type="radio" 
                        value="only-live"
                        defaultChecked
                    />
                    Only Alive
                </label>
                <label>
                    <input 
                        name="liveliness" 
                        type="radio" 
                        value="total-random"
                    />
                    Total Random
                </label>
                <label>
                    <input 
                        name="liveliness" 
                        type="radio" 
                        value="only-dead"
                    />
                    Only Dead
                </label>
            </div>
        </form>
    );
}
