import React from "react";
import "./Add-prop.css"

const AddProperty = (/* { isOpen, onClose, onSubmit, propertyData, handlePropertyChange, handleAddressChange } */) => {
    return (
        <div className="add-property">
            <div className="relative w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow max-h-500">
                    <div className="flex items-start justify-center p-4 border-b rounded-t">
                        <h2 className="text-xl font-semibold text-gray-900">Add Property</h2>

                    </div>
                    <div className="p-6 space-y-4">
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Home Type</label>
                            <input
                                className="w-full h-8 border border-gray-300 rounded-md px-3"
                                type="text"
                                name="name"
                            /*  value={propertyData.name}
                             onChange={handlePropertyChange} */
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label className="block text-sm font-medium mb-1">Number of rooms</label>
                                <input
                                    className="w-full h-8 border border-gray-300 rounded-md px-3"
                                    type="number"
                                    name="bedNo"
                                /*  value={propertyData.bedNo}
                                 onChange={handlePropertyChange} */
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    className="w-full h-8 border border-gray-300 rounded-md px-3"
                                    type="text"
                                    name="bathNo"
                                /* value={propertyData.bathNo}
                                onChange={handlePropertyChange} */
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium mb-1">Sale Type</label>
                            <input
                                className="w-full h-8 border border-gray-300 rounded-md px-3"
                                type="text"
                                name="sqft"
                            /*  value={propertyData.sqft}
                             onChange={handlePropertyChange} */
                            />
                        </div>
                    </div>
                    <form>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Insert photo    </label>
                            <input type="file" class="form-control-file" id="exampleFormControlFile1" />
                        </div>
                    </form>
                    <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
                        <button type="button" class="btn btn-primary btn-lg">Add</button>
                        <button type="button" class="btn btn-secondary btn-lg">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;