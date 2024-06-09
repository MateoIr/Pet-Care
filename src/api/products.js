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
      console.error("Error registrando producto:", error);
      throw error;
    }
  };
  export {
    registerProduct,
    getAllCategory,
  };
  