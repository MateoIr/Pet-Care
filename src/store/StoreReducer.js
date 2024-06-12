const types = {
  productDeleteAll: "product - delete all",
  productChangue: "product - changue",
  productAdd: "product - add",
};

const initialStore = {
  products: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.productDeleteAll: {
      return {
        ...state,
        products: [],
      };
    }
    case types.productChangue: {
      return {
        ...state,
        products: [{ id: 3, title: "prod 3" }],
      };
    }
    case types.productAdd: {
      // New case for adding a product
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    default:
      return state;
  }
};
export { initialStore, types };
export default storeReducer;
