import React from "react";

const AddPropertyModal = (/* { isOpen, onClose, onSubmit, propertyData, handlePropertyChange, handleAddressChange } */) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75 `}>
      <div className="relative w-full max-w-2xl">
        <div className="relative bg-white rounded-lg shadow max-h-500">
          <div className="flex items-start justify-between p-4 border-b rounded-t">
            <h2 className="text-xl font-semibold text-gray-900">Add Property</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Name</label>
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
                <label className="block text-sm font-medium mb-1">Bedrooms</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="number"
                  name="bedNo"
                /*  value={propertyData.bedNo}
                 onChange={handlePropertyChange} */
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bathrooms</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="number"
                  name="bathNo"
                /* value={propertyData.bathNo}
                onChange={handlePropertyChange} */
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Square Footage</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="sqft"
              /*  value={propertyData.sqft}
               onChange={handlePropertyChange} */
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Garage</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="garageNo"
              /* value={propertyData.garageNo}
              onChange={handlePropertyChange} */
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="number"
                name="price"
              /*  value={propertyData.price}
               onChange={handlePropertyChange} */
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                className="w-full h-8 border border-gray-300 rounded-md px-3"
                type="text"
                name="state"
              /*  value={propertyData.address.state}
               onChange={handleAddressChange} */
              />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="text"
                  name="city"
                /*  value={propertyData.address.city}
                 onChange={handleAddressChange} */
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  className="w-full h-8 border border-gray-300 rounded-md px-3"
                  type="text"
                  name="street"
                /* value={propertyData.address.street}
                onChange={handleAddressChange} */
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Zipcode</label>
              <input
                className="w-full h-10 border border-gray-300 rounded-md px-3"
                type="text"
                name="zipcode"
              /*  value={propertyData.address.zipcode}
               onChange={handleAddressChange} */
              />
            </div>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-gray-200 rounded-b">
            <button type="button" class="btn btn-primary btn-lg">Add</button>
            <button type="button" class="btn btn-secondary btn-lg">Cancel</button>
          </div>
          <form>
            <div class="form-group">
              <label for="exampleFormControlFile1">Insert photo    </label>
              <input type="file" class="form-control-file" id="exampleFormControlFile1" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyModal;