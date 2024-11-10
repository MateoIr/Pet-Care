import "toastify-js/src/toastify.css";
import { getVentasByDate } from "../../api/products";
import { useQuery } from "@tanstack/react-query";

const useGetVentasByDate = (fechaDesde, fechaHasta) => {
  const {
    data: ventas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ventasPorFecha", fechaDesde, fechaHasta], // Clave única que incluye las fechas
    queryFn: () => getVentasByDate({ fechaDesde, fechaHasta }),
    enabled: !!fechaDesde && !!fechaHasta, // Habilitar la consulta solo si las fechas están presentes
  });

  return {
    ventas,
    isLoading,
    error,
  };
};

export default useGetVentasByDate;