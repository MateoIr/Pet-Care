import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getAllVservices = async () => {
  try {
    const response = await apiClient.get("/producto/listaproductos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
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

export { getAllVservices, getAllDservices };
