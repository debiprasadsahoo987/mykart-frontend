import {
  FaBuilding,
  FaCheckCircle,
  FaStreetView,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { MdLocationCity, MdPinDrop, MdPublic } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { selectUserCheckoutAddress } from "../../store/actions";

const AddressList = ({
  addresses = [],
  setSelectedAddress,
  setOpenAddressModal,
  setOpenDeleteModal,
}) => {
  const dispatch = useDispatch();
  const list = Array.isArray(addresses) ? addresses : [];
  const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

  const onEditButtonHandler = (list) => {
    setSelectedAddress(list);
    setOpenAddressModal(true);
  };
  const onDeleteButtonHandler = (list) => {
    setSelectedAddress(list);
    setOpenDeleteModal(true);
  };
  const handleAddressSelection = (list) => {
    dispatch(selectUserCheckoutAddress(list));
  };
  return (
    <div className="space-y-4">
      {list.map((address) => (
        <div
          className={`p-4 border rounded-md cursor-pointer relative ${
            selectedUserCheckoutAddress?.addressId === address.addressId
              ? "bg-green-100"
              : "bg-white"
          }`}
          key={address.addressId}
          onClick={() => handleAddressSelection(address)}
        >
          <div className="flex items-start">
            <div className="space-y-1">
              <div className="flex items-center">
                <FaBuilding size={14} className="text-gray-600 mr-2" />
                <p className="font-semibold">{address.buildingName}</p>
                {selectedUserCheckoutAddress?.addressId ===
                  address.addressId && (
                  <FaCheckCircle className="text-green-500 ml-2" />
                )}
              </div>
              <div className="flex items-center">
                <FaStreetView size={17} className="text-gray-600 mr-2" />
                <p className="">{address.street}</p>
              </div>
              <div className="flex items-center">
                <MdLocationCity size={17} className="text-gray-600 mr-2" />
                <p className="">
                  {address.city}, {address.state}
                </p>
              </div>
              <div className="flex items-center">
                <MdPinDrop size={17} className="text-gray-600 mr-2" />
                <p className="">{address.pincode}</p>
              </div>
              <div className="flex items-center">
                <MdPublic size={17} className="text-gray-600 mr-2" />
                <p className="">{address.country}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 absolute top-4 right-2">
            <button onClick={() => onEditButtonHandler(address)}>
              <FaEdit size={18} className="text-teal-700" />
            </button>
            <button onClick={() => onDeleteButtonHandler(address)}>
              <FaTrash size={17} className="text-rose-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddressList;
