var initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_DETAILS":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
