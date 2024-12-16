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

const getAllServicesList = async () => {
  try {
    const response = await apiClient.get("/turno/listaservicios");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
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

const getCupoDay = async (day) => {
  //console.log(day);
  try {
    const response = await apiClient.post(
      `/turno/contarPorFechaparacupo?fecha=${day}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getContarTurnos = async ({ fechaDesde, fechaHasta }) => {
  try {
    const response = await apiClient.post("/turno/contarturnos", {
      fechaInicio: fechaDesde,
      fechaFinal: fechaHasta,
    });
    return response.data;
  } catch (error) {
    console.error("Error recuperando info de turnos:", error);
    throw error;
  }
};

const getContarCuposPorRango = async ({ fechaDesde, fechaHasta }) => {
  try {
    const response = await apiClient.post("/turno/contarPorRangoDeFechaCupo", {
      fechaInicio: fechaDesde,
      fechaFinal: fechaHasta,
    });
    return response.data;
  } catch (error) {
    console.error("Error recuperando info de cupos:", error);
    throw error;
  }
};

const getTurn = async (id) => {
  try {
    const response = await apiClient.get(`/turno/idturno/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getTurnServices = async (id) => {
  try {
    const response = await apiClient.get(`/turno/detallesdeturno/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getReportYearTurno = async (anio) => {
  try {
    const response = await apiClient.get(`turno/reporteturnosporanio/${anio}`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getReportYearPedido = async (anio) => {
  try {
    const response = await apiClient.get(`turno/reporteventasporanio/${anio}`);
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
  formadepago,
  descripcion,
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
      detalleturno: service,
      formadepago,
      descripcion,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando turno:", error);
    throw error;
  }
};
const updateCostService = async ({ idtiposervico, precio }) => {
  try {
    const response = await apiClient.post("/turno/actualizarprecioservicio", {
      idtiposervico,
      precio,
    });
    return response.data;
  } catch (error) {
    return error
      .status(500)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

const updateTurnSelected = async ({
  id,
  date,
  datein,
  dateout,
  pet,
  scheduleFrom,
  scheduleUntil,
  service,
  state,
  typeturno,
  formadepago,
  descripcion,
}) => {
  try {
    const response = await apiClient.post("/turno/modificarturno", {
      idturno: id,
      fechaturno: date,
      fechaingreso: datein,
      fechaegreso: dateout,
      idmascota: pet,
      horarioturnodesde: scheduleFrom,
      horarioturnohasta: scheduleUntil,
      senia: null,
      idtipoturno: typeturno,
      idestado: state,
      detalleturno: service,
      formadepago,
      descripcion,
    });
    return response.data;
  } catch (error) {
    console.error("Error registrando turno:", error);
    throw error;
  }
};

const checkCupos = async ({ fechaingreso, fechaegreso }) => {
  try {
    const response = await apiClient.post("/turno/contarentodaslasfechas", {
      fechaingreso,
      fechaegreso,
    });
    return response.data;
  } catch (error) {
    return error
      .status(500)
      .json({ error: "El ususario con ese correo ya se encuentra registrado" });
  }
};

export {
  getAllServices,
  updateTurnSelected,
  getTurnServices,
  getTurn,
  getAllDservices,
  registerTurno,
  getAllTurnos,
  getAllStates,
  getAllServicesList,
  updateCostService,
  getCupoDay,
  getContarTurnos,
  checkCupos,
  getReportYearPedido,
  getReportYearTurno,
  getContarCuposPorRango,
};
