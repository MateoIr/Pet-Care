import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const registerSignature = async ({ signature }) => {
  try {
    // Extrae el contenido base64 del dataURL
    const base64Data = signature.split(",")[1];

    // Crea un objeto FormData
    const formData = new FormData();

    // Agrega el campo 'firma' con el contenido base64 al FormData
    formData.append("firma", base64Data);

    // Envía la solicitud POST con FormData
    const response = await apiClient.post(
      "/guarderia/registrarfirma",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Asegúrate de que el Content-Type sea multipart/form-data
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error al guardar la firma:", error);
    throw error; // Propaga el error para que `useMutation` pueda manejarlo
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
