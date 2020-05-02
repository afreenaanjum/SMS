var initialState = {
  loggedIn: localStorage.getItem("token") ? true : false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_REGISTERED":
      return { ...state, loggedIn: false };

    case "USER_LOGGEDIN":
      return { ...state, loggedIn: true };

    case "USER_LOGOUT":
      return { ...state, loggedIn: false };

    default:
      return state;
  }
};
