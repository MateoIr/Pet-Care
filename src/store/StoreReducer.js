const types = {
  productDeleteAll: "product - delete all",
  productAdd: "product - add",
  productDelete: "product - delete",
  productDecrement: "product - decrement",
  productIncrement: "product - increment",
  billAdd: "bill - add",
  billDeleteAll: "bill - delete all",
};

// Estado inicial de la tienda
const initialStore = {
  products: [],
  bill: [],
};

// Función para eliminar un producto
const deleteProduct = (id) => {
  return {
    type: types.productDelete,
    payload: { id },
  };
};

// Función para disminuir la cantidad de un producto
const decrementProduct = (id) => {
  return {
    type: types.productDecrement,
    payload: { id },
  };
};

// Función para aumentar la cantidad de un producto
const incrementProduct = (id) => {
  return {
    type: types.productIncrement,
    payload: { id },
  };
};

// Nueva función para agregar datos a la factura
const addToBill = (data) => {
  return {
    type: types.billAdd,
    payload: data,
  };
};

// Nueva función para vaciar la factura
const clearBill = () => {
  return {
    type: types.billDeleteAll,
  };
};

// Nueva función para vaciar productos
const clearProducts = () => {
  return {
    type: types.productDeleteAll,
  };
};

// Reducer de la tienda
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
    case types.billAdd: {
      // Manejar la nueva acción para agregar datos a la factura
      return {
        ...state,
        bill: [action.payload],
      };
    }
    case types.billDeleteAll: {
      // Manejar la nueva acción para vaciar la factura
      return {
        ...state,
        bill: [],
      };
    }
    default:
      return state;
  }
};

// Exportaciones
export {
  initialStore,
  types,
  deleteProduct,
  decrementProduct,
  incrementProduct,
  addToBill, // Exportar la nueva función para agregar datos a la factura
  clearBill, // Exportar la nueva función para vaciar la factura
  clearProducts, // Exportar la nueva función para vaciar productos
};
export default storeReducer;
