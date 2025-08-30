import toast from "react-hot-toast";
import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/public/products?${queryString}`);
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch products",
    });
  }
};

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch({ type: "CATEGORY_LOADER" });
    const { data } = await api.get(`/public/categories`);
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: data.content,
      pageNumber: data.pageNumber,
      pageSize: data.pageSize,
      totalElements: data.totalElements,
      totalPages: data.totalPages,
      lastPage: data.lastPage,
    });
    dispatch({ type: "IS_ERROR" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload: error?.response?.data?.message || "Failed to fetch categories",
    });
  }
};

export const addToCart =
  (data, qty = 1, toast) =>
  (dispatch, getState) => {
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    const isQuantityExist = getProduct.productQuantity >= qty;

    if (isQuantityExist) {
      dispatch({ type: "ADD_CART", payload: { ...data, quantity: qty } });
      toast.success(`${data?.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out of Stock");
    }
  };

export const increaseCartQty =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
    console.log(data);
    const { products } = getState().products;
    const getProduct = products.find(
      (item) => item.productId === data.productId
    );

    const isQuantityExist = getProduct.productQuantity >= currentQuantity + 1;

    if (isQuantityExist) {
      const newQuantity = currentQuantity + 1;
      setCurrentQuantity(newQuantity);
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: newQuantity + 1 },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity reached the maximum available units");
    }
  };
