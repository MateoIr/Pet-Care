import "toastify-js/src/toastify.css";
import { getContarCuposPorRango } from "../../api/turn";
import { useQuery } from "@tanstack/react-query";

const useGetContarTurnosPorRango = (fechaDesde, fechaHasta) => {
  const {
    data: reporte,
    isLoading: isLoadingt,
    error: errort,
  } = useQuery({
    queryKey: ["contarTurnosPorRango", fechaDesde, fechaHasta], 
    queryFn: () => getContarCuposPorRango({ fechaDesde, fechaHasta }),
    enabled: !!fechaDesde && !!fechaHasta, 
  });

  return {
    reporte,
    isLoadingt,
    errort,
  };
};

export default useGetContarTurnosPorRango;