import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getAllCategory = async () => {
  try {
    const response = await apiClient.get("/producto/categorias");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};
const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/producto/listaproductos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getVentasByDate = async ({
  fechaDesde,
  fechaHasta,
}) => {
  try {
    const response = await apiClient.post("/pedido/pedidosporfecha", {
      fechaInicio:fechaDesde,
      fechaFinal:fechaHasta,
    });
    return response.data;
  } catch (error) {
    console.error("Error recuperando info de ventas:", error);
    throw error;
  }
};

const getProductsSinStock = async () => {
  try {
    const response = await apiClient.get("/producto/productosSinStock");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getProductosMasVendidos = async ({
  fechaDesde,
  fechaHasta,
}) => {
  try {
    const response = await apiClient.post("/pedido/productosMasVendidos", {
      fechaInicio:fechaDesde,
      fechaFinal:fechaHasta,
    });
    return response.data;
  } catch (error) {
    console.error("Error recuperando info de ventas:", error);
    throw error;
  }
};


const registerProduct = async ({
  nombre,
  codigoproducto,
  precio,
  stock,
  idcategoria,
}) => {
  try {
    const response = await apiClient.post("/producto/registrar", {
      nombre: nombre,
      precio: precio,
      stock: stock,
      codigoproducto: codigoproducto,
      idcategoria: idcategoria,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El producto con ese código ya se encuentra registrado" });
  }
};

const updateProductSelected = async ({
  id,
  nombre,
  codigoproducto,
  precio,
  stock,
  idcategoria,
}) => {
  try {
    const response = await apiClient.post(`/producto/actualizarproducto`, {
      id: id,
      nombre: nombre,
      precio: precio,
      stock: stock,
      codigoproducto: codigoproducto,
      idcategoria: idcategoria,
    });
    return response.data;
  } catch (error) {
    
    console.log("Entró al catch:", error); // Ver el error completo en consola

    // Puedes devolver el error como un objeto, no usar .status() y .json() en el frontend
    return {
      status: error.response ? error.response.status : 500,
      message:
        error.response && error.response.data
          ? error.response.data.error
          : "Ocurrió un error desconocido.",
    };
  }
};

const getProduct = async (id) => {
  try {
    const response = await apiClient.post(`/producto/idproducto`, {
      id,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "..Producto con ese id no encontrado.." });
  }
};

const registerSell = async ({
  fechadepedido: fechapedido,
  observaciones,
  owner: idcliente,
  formadepago,
  idestado,
  detalleVenta,
}) => {
  try {
    const response = await apiClient.post("/pedido/registro", {
      fechapedido,
      observaciones,
      formadepago,
      idcliente,
      idestado,
      detalleVenta,
    });

    return response.data;
  } catch (error) {
    console.error("Error registrando usuario:", error);
    throw error;
  }
};


const dropProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/producto/delete/${id}`, {
      id,
    });
    return response.data;
  } catch (error) {
    
      console.error("Error al eliminar cliente:", error);
      throw error;
  }
};
export { registerProduct,getVentasByDate, getProductosMasVendidos, getAllCategory, getProductsSinStock,getAllProducts, registerSell,  updateProductSelected , dropProduct, getProduct};
