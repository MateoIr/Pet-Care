import "toastify-js/src/toastify.css";
import { getContarTurnos } from "../../api/turn";
import { useQuery } from "@tanstack/react-query";

const useGetContarTurnos = (fechaDesde, fechaHasta) => {
  const {
    data: reporte,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["contarTurnos", fechaDesde, fechaHasta], // Clave única que incluye las fechas
    queryFn: () => getContarTurnos({ fechaDesde, fechaHasta }),
    enabled: !!fechaDesde && !!fechaHasta, // Habilitar la consulta solo si las fechas están presentes
  });

  return {
    reporte,
    isLoading,
    error,
  };
};

export default useGetContarTurnos;