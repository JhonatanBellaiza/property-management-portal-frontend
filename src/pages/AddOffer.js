import React from "react";
import "./Add-prop.css"





const AddOffer = () => {
    return (
        <div className="add-property">
            <div className="relative w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow max-h-500">
                    <div className="flex items-start justify-center p-4 border-b rounded-t">
                        <h2 className="text-xl font-semibold text-gray-900">Create New Offer</h2>

                    </div>
                    <div className="p-6 space-y-4">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Price</label>
                            <input
                                className="w-full h-8 border border-gray-300 rounded-md px-3"
                                type="text"
                                name="name"
                            /*  value={propertyData.name}
                             onChange={handlePropertyChange} */
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">


                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Sale Type</label>
                            <select
                                className="w-full h-8 border border-gray-300 rounded-md px-3"
                                name="saleType"
                            /* value={propertyData.saleType} onChange={handlePropertyChange} */
                            >
                                <option value="Sale">Sale</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>

                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
                        <button type="button" class="btn btn-primary btn-lg">Add</button>
                        <button type="button" class="btn btn-secondary btn-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddOffer;