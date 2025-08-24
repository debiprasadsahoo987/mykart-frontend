import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "./ProductCard";

const Products = () => {
  const isLoading = false;
  const errorMessage = "";
  const products = [
    {
      productId: 1,
      productName: "Asus VivoBook S16",
      productDescription: "Latest Asus VivoBook Laptop",
      productImage: "https://picsum.photos/600/400",
      productQuantity: 28,
      productPrice: 70000.0,
      productDiscount: 20.0,
      specialPrice: 56000.0,
    },
    {
      productId: 2,
      productName: "xxAsus VivoBook S16",
      productDescription: "xxLatest Asus VivoBook Laptop",
      productImage: "https://picsum.photos/600/400",
      productQuantity: 0,
      productPrice: 70000.0,
      productDiscount: 20.0,
      specialPrice: 56000.0,
    },
  ];
  return (
    <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
      {isLoading ? (
        <p>Products are loading...</p>
      ) : errorMessage ? (
        <div className="flex justify-center items-center h-[200px]">
          <FaExclamationTriangle className="text-slate-800 text-3xl mr-2" />
          <span className="textslate-800 text-lg font-medium">
            {errorMessage}
          </span>
        </div>
      ) : (
        <div className="min-h-[700px]">
          <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
            {products &&
              products.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
