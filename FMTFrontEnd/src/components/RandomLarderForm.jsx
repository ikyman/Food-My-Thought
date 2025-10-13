import React from 'react';

export default function RandomLarderForm() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        try {
            const response = await fetch(`/getrandom/?chosenrandomness=${formData.get('liveliness') }`, {
                method: 'GET',
            });
            console.log(await response.text());
            // (Currently incestuiously points to self, returns the index/root/public html page of the react.)
            
        } catch (error) {
            console.error('Error fetching random Larder:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
