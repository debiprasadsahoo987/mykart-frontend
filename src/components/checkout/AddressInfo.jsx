import { FaAddressBook } from "react-icons/fa";
import Skeleton from "../shared/Skeleton";
import React from "react";
import AddressInfoModal from "./AddressInfoModal";
import AddAddressForm from "./AddAddressForm";

const AddressInfo = () => {
  const noAddress = true;
  const isLoading = false;
  const [openAddressModal, setOpenAddressModal] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const addNewAddressHandler = () => {
    setSelectedAddress(null);
    setOpenAddressModal(true);
  };
  return (
    <div className="pt-4">
      {noAddress ? (
        <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
          <FaAddressBook size={50} className="text-gray-500 mb-4" />
          <h1 className="text-slate-800 font-semibold text-center text-2xl mb-2">
            No address added yet
          </h1>
          <p className="mb-6 text-slate-700 text-center">
            Please add an address to proceed with your order.
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition duration-300"
            onClick={addNewAddressHandler}
          >
            Add Address
          </button>
        </div>
      ) : (
        <div className="relative p-6 rounded-lg max-w-md mx-auto">
          <h1 className="text-slate-800 text-center font-bold text-2xl">
            Select Address
          </h1>
          {isLoading ? (
            <div className="py-4 px-8">
              <Skeleton />
            </div>
          ) : (
            <div className="space-y-4 pt-6">
              <p>Address List here...</p>
            </div>
          )}
        </div>
      )}
      <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
        <AddAddressForm
          address={selectedAddress}
          setOpenAddressModal={setOpenAddressModal}
        />
      </AddressInfoModal>
    </div>
  );
};

export default AddressInfo;
