//! Currently not in use

const reducer = (state, action) => {
  if (action.type === "RESET_TRUCK_VALUES") {
    return { ...state };
  }
};



export default reducer;
