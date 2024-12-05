import { useQuery } from "@tanstack/react-query";
import { getReportYearPedido } from "../../api/turn";

export const useGetReportYearPedido = () => {
  const {
    data: pedidos,
    isPending: isLoadingp,
    error:errorp,
  } = useQuery({
    queryKey: ["pedidos"],
    queryFn: () => getReportYearPedido(),
  });

  return { isLoadingp, errorp,  pedidos};
};

export default useGetReportYearPedido;
