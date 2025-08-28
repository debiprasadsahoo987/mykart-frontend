import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeholderImg } from "../utils/constant";
import { fetchProducts } from "../store/actions/index";
import ProductCard from "./shared/ProductCard";
import Loader from "./shared/Loader";

const About = () => {
  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
        About Us
      </h1>
      <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-4">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-lg mb-4">
            MyKart makes everyday shopping simple and reliable. Discover curated
            products, fair prices, and fast delivery - all in one seamless
            experience. With trusted brands, transparent details, and responsive
            support, MyKart turns browsing into confident buying and helps every
            home feel a little better, every day.
          </p>
        </div>
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <img
            src={placeholderImg}
            alt="About Us"
            className="w-full rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-102"
          />
        </div>
      </div>
      <div className="py-7 space-y-8">
        <h1 className="text-slate-800 text-4xl font-bold text-center mb-12">
          Our Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <div className="flex justify-center items-center h-[200px]">
              <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
              <span className="textslate-800 text-lg font-medium">
                {errorMessage}
              </span>
            </div>
          ) : (
            products &&
            products
              ?.slice(0, 3)
              .map((item, i) => <ProductCard key={i} {...item} about />)
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
