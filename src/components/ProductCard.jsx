import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";

const ProductCard = ({
  productId,
  productName,
  productImage,
  productDescription,
  productDiscount,
  productPrice,
  productQuantity,
  specialPrice,
}) => {
  const [openProductViewModal, setOpenProductViewModal] = useState(false);
  const btnLoader = false;
  const [selectedViewProduct, setSelectedViewProduct] = useState("");
  const isAvailable = productQuantity && Number(productQuantity) > 0;

  const handleProductView = (product) => {
    setSelectedViewProduct(product);
    setOpenProductViewModal(true);
  };
  return (
    <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
      <div
        onClick={() => {
          handleProductView({
            id: productId,
            productName,
            productImage,
            productDescription,
            productDiscount,
            productPrice,
            productQuantity,
            specialPrice,
          });
        }}
        className="w-full overflow-hidden aspect-[3/2]"
      >
        <img
          className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"
          src={productImage}
          alt={productName}
        ></img>
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2
            onClick={() => {
              handleProductView({
                id: productId,
                productName,
                productImage,
                productDescription,
                productDiscount,
                productPrice,
                productQuantity,
                specialPrice,
              });
            }}
            className="text-lg font-semibold mb-2 cursor-pointer"
          >
            {productName}
          </h2>
          <div className="min-h-12 max-h-20">
            <p className="text-gray-600 text-sm line-clamp-3">
              {productDescription}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            {specialPrice ? (
              <div className="flex flex-col">
                <span className="text-[12px] text-gray-700 line-through">
                  ₹ {Number(productPrice).toFixed(2)}
                </span>
                <span className="text-[15px] font-bold text-slate-700">
                  ₹ {Number(specialPrice).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-gray-700 line-through">
                {"  "}₹ {Number(productPrice).toFixed(2)}
              </span>
            )}
            <button
              disabled={!isAvailable || btnLoader}
              onClick={() => {}}
              className={`bg-blue-500 ${
                isAvailable
                  ? "opacity-100 hover:bg-blue-600 cursor-pointer"
                  : "opacity-70 bg-red-400 cursor-not-allowed pointer-events-none"
              }
            text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}
            >
              <FaShoppingCart className="mr-2" />
              {isAvailable ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
        <ProductViewModal
          open={openProductViewModal}
          setOpen={setOpenProductViewModal}
          product={selectedViewProduct}
          isAvailable={isAvailable}
        />
      </div>
    </div>
  );
};

export default ProductCard;
