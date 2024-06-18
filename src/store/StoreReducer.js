const types = {
  productDeleteAll: "product - delete all",
  productAdd: "product - add",
  productDelete: "product - delete",
  productDecrement: "product - decrement",
  productIncrement: "product - increment",
};

const initialStore = {
  products: [],
};
const deleteProduct = (id) => {
  return {
    type: types.productDelete,
    payload: { id },
  };
};
const decrementProduct = (id) => {
  return {
    type: types.productDecrement,
    payload: { id },
  };
};
const incrementProduct = (id) => {
  return {
    type: types.productIncrement,
    payload: { id },
  };
};

const storeReducer = (state, action) => {
  switch (action.type) {
    case types.productDeleteAll: {
      return {
        ...state,
        products: [],
      };
    }

    case types.productAdd: {
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    }
    case types.productDelete: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    }
    case types.productDecrement: {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              cantidad: Math.max(product.cantidad - 1, 1),
            };
          }
          return product;
        }),
      };
    }
    case types.productIncrement: {
      return {
        ...state,
        products: state.products.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              cantidad: Math.min(product.cantidad + 1, product.stock),
            };
          }
          return product;
        }),
      };
    }
    default:
      return state;
  }
};
export {
  initialStore,
  types,
  deleteProduct,
  decrementProduct,
  incrementProduct,
};
export default storeReducer;
