import { useQuery } from "@tanstack/react-query";
import { getReportYearTurno } from "../../api/turn";

export const useGetReportYearTurnos = (anio) => {
  const {
    data: turnos,
    isLoading,
    error,
    refetch, // Exponer `refetch`
  } = useQuery({
    queryKey: ["turnos"], // Clave genérica, no depende de `anio`
    queryFn: () => getReportYearTurno(anio),
    enabled: false, // Deshabilitar consulta automática
  });

  return { isLoading, error, turnos, refetch };
};

export default useGetReportYearTurnos;
