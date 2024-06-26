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
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
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

export { registerProduct, getAllCategory, getAllProducts, registerSell };
