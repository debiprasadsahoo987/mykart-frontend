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
      dispatch({
        type: "ADD_CART",
        payload: { ...data, quantity: qty },
      });
      toast.success(`${data?.productName} added to the cart`);
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Out of Stock");
    }
  };

export const increaseCartQty =
  (data, toast, currentQuantity, setCurrentQuantity) =>
  (dispatch, getState) => {
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
        payload: { ...data, quantity: newQuantity },
      });
      localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    } else {
      toast.error("Quantity reached the maximum available units");
    }
  };

export const decreaseCartQty = (data, newQuantity) => (dispatch, getState) => {
  dispatch({
    type: "ADD_CART",
    payload: { ...data, quantity: newQuantity },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const removeFromCart = (data, toast) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CART",
    payload: data,
  });
  toast.success(`${data.productName} is removed from the cart`);
  localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};

export const authenticateSignInUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signin", sendData);
      dispatch({ type: "LOGIN_USER", payload: data });
      localStorage.setItem("auth", JSON.stringify(data));
      reset();
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoader(false);
    }
  };

export const registerNewUser =
  (sendData, toast, reset, navigate, setLoader) => async (dispatch) => {
    try {
      setLoader(true);
      const { data } = await api.post("/auth/signup", sendData);
      reset();
      toast.success(data?.message || "User registered successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoader(false);
    }
  };

export const logoutUser = (navigate) => (dispatch) => {
  dispatch({ type: "LOGOUT_USER" });
  localStorage.removeItem("auth");
  navigate("/login");
};

export const getUserAddresses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "IS_FETCHING" });
    const { data } = await api.get(`/addresses`);
    dispatch({ type: "USER_ADDRESS", payload: data });
    dispatch({ type: "IS_SUCCESS" });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "IS_ERROR",
      payload:
        error?.response?.data?.message || "Failed to fetch user addresses",
    });
  }
};

export const addUpdateUserAddress =
  (sendData, toast, addressId, setOpenAddressModal) =>
  async (dispatch, getState) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      if (!addressId) {
        const { data } = await api.post("/addresses", sendData);
      } else {
        await api.put(`/addresses/${addressId}`, sendData);
      }
      dispatch(getUserAddresses());
      toast.success("Address saved successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Internal Server Error");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenAddressModal(false);
    }
  };

export const selectUserCheckoutAddress = (address) => {
  // localStorage.setItem("CHECKOUT_ADDRESS", JSON.stringify(address));

  return {
    type: "SELECT_CHECKOUT_ADDRESS",
    payload: address,
  };
};

export const clearCheckoutAddress = () => {
  // localStorage.removeItem("CHECKOUT_ADDRESS");

  return {
    type: "REMOVE_CHECKOUT_ADDRESS",
  };
};

export const deleteUserAddress =
  (toast, addressId, setOpenDeleteModal) => async (dispatch, getState) => {
    dispatch({ type: "BUTTON_LOADER" });
    try {
      await api.delete(`/addresses/${addressId}`);
      dispatch(getUserAddresses());
      dispatch(clearCheckoutAddress());
      toast.success("Address deleted successfully");
      dispatch({ type: "IS_SUCCESS" });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Unable to delete address");
      dispatch({ type: "IS_ERROR", payload: null });
    } finally {
      setOpenDeleteModal(false);
    }
  };
