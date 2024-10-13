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

const getAllStates = async () => {
  try {
    const response = await apiClient.get("/turno/listaestadosturnos");
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
const getAllTurnos = async () => {
  try {
    const response = await apiClient.get(`turno/todos`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const registerTurno = async ({
  date,
  datein,
  dateout,
  pet,
  scheduleFrom,
  scheduleUntil,
  service,
  state,
  typeturno,
}) => {
  try {
    const response = await apiClient.post("/turno/registroturno", {
      fechaturno: date,
      fechaingreso: datein,
      fechaegreso: dateout,
      idmascota: pet,
      horarioturnodesde: scheduleFrom,
      horarioturnohasta: scheduleUntil,
      senia: null,
      idtipoturno: typeturno,
      idestado: state,
      detalleturno:service ,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando turno:", error);
    throw error;
  }
};

export { getAllServices, getAllDservices, registerTurno , getAllTurnos ,getAllStates };
