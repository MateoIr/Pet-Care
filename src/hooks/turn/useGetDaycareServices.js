import { useQuery } from "@tanstack/react-query";
import { getAllDservices } from "../../api/turn";
import {getAllTurnos} from "../../api/turn";
const useGetDaycareServices = () => {
  const {
    data: turnos,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["turnos"],
    queryFn: () => getAllTurnos(),
  });

  return {
    turnos,
    isLoading,
    error,
  };
};

export default useGetDaycareServices;
