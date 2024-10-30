import "toastify-js/src/toastify.css";
import { getProductosMasVendidos} from "../../api/products";
import { useQuery } from "@tanstack/react-query";

const useGetProductoMasVendido = (fechaDesde, fechaHasta) => {
  const {
    data: masVendidos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productosVendidos", fechaDesde, fechaHasta], // Clave única que incluye las fechas
    queryFn: () => getProductosMasVendidos({ fechaDesde, fechaHasta }),
    enabled: !!fechaDesde && !!fechaHasta, // Habilitar la consulta solo si las fechas están presentes
  });

  return {
    masVendidos,
    isLoading,
    error,
  };
};

export default useGetProductoMasVendido;