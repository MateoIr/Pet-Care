import { useQuery } from "@tanstack/react-query";
import { getReportYearPedido } from "../../api/turn";

export const useGetReportYearPedido = (anio) => {
  const {
    data: pedidos,
    isPending: isLoadingp,
    error: errorp,
    refetch,
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => getReportYearPedido(anio),
  });

  return { isLoadingp, errorp, pedidos, refetch };
};

export default useGetReportYearPedido;
