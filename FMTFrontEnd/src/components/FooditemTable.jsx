import React from 'react';

/**
 * Renders the table of food items for a larder.
 * 
 * Props:
 * - fooditems: array of objects, each with at least
 *   { id?, name, estimated_expiration, category1, category2 }
 */
export default function FooditemTable({ fooditems, loadedCategoryNames, viewAsOwner}) {
    const rows = fooditems || [];

    return (
        <div id="fooditem-list">

            <table id="fooditem-table">
                <thead>
                    <tr>
                        <th>Food Name</th>
                        <th>Estimated Expiration date</th>
                        <th>Category 1</th>
                        <th>Category 2</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.length === 0 ? (
                        <tr className="fooditem-entry">
                            <td colSpan={4}>No food items in this larder yet.</td>
                        </tr>
                    ) : (
                        rows.map((item, index) => (
                            <tr className="fooditem-entry" key={item.id ?? item.name ?? index}>
                                <td>{item.name}</td>
                                <td>{item.estimated_expiration}</td>
                                <td>{item.category1}</td>
                                <td>{item.category2}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <div className="lister-only">
                <button id="add-fooditem">Add Footitem</button>
                <button id="delete-fooditem">Delete Fooditem</button>
    
            </div>
        </div>
    );
}


