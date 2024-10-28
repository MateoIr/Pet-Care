import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const registerSignature = async ({ signature, id }) => {
  try {
    const base64Data = signature.split(",")[1];
    const formData = new FormData();
    formData.append("firma", base64Data);

    // Envía la solicitud POST con FormData
    const response = await apiClient.post(
      `/guarderia/registrarfirma/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al guardar la firma:", error);
    throw error;
  }
};

const getSignature = async (id) => {
  try {
    const response = await apiClient.get(`/guarderia/consentimiento/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

export { registerSignature, getSignature };
