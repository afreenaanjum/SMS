function userDetails(userDetails) {
  return {
    type: "USER_DETAILS",
    payload: { ...userDetails },
  };
}

export { userDetails };
