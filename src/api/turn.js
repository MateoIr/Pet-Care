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

const createTrun = async ({
  date: fechaturno,
  scheduleFrom: horarioturnodesde,
  scheduleUntil: horarioturnohasta,
  pet: idmascota,
  state,
  cost: costototal,
  service: detalleturno,
  idtipoturno,
}) => {
  try {
    const response = await apiClient.post(`/turno/registroturno`, {
      fechaturno,
      horarioturnodesde,
      horarioturnohasta,
      idmascota,
      state,
      costototal,
      detalleturno,
      idtipoturno,
    });
    return response.data;
  } catch (error) {
    return error
      .status(400)
      .json({ error: "El producto con ese código ya se encuentra registrado" });
  }
};

export { getAllServices, createTrun };
