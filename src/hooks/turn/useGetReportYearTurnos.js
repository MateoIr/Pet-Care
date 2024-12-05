import { useQuery } from "@tanstack/react-query";
import { getReportYearTurno } from "../../api/turn";

export const useGetReportYearTurnos = () => {
  const {
    data: turnos,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["turnos"],
    queryFn: () => getReportYearTurno(),
  });

  return { isLoading, error,  turnos};
};

export default useGetReportYearTurnos;
