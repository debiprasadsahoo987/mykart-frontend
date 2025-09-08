const initialState = {
  user: null,
  address: [],
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, user: action.payload };
    case "LOGOUT_USER":
      return { user: null, address: null };
    case "USER_ADDRESS":
      return { ...state, address: action.payload };
    default:
      return state;
  }
};
