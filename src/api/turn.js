import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getAllServices = async ({ id }) => {
  try {
    const response = await apiClient.post(
      `/turno/listatiposervicioportipoturno/${id}`
    );
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El producto con ese código ya se encuentra registrado" });
  }
};

const getAllDservices = async () => {
  try {
    const response = await apiClient.get("/producto/listaproductos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

export { getAllServices, getAllDservices };
