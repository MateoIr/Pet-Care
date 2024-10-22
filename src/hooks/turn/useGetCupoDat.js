import { useQuery } from "@tanstack/react-query";
import { getCupoDay } from "../../api/turn";
const useGetCupoDay = (day) => {
  const {
    data: cupo,
    isLoading,
    error: error,
  } = useQuery({
    
    queryFn: () => getCupoDay(day),
  });

  return {
    cupo,
    isLoading,
    error,
  };
};

export default useGetCupoDay;
