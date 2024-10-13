import { useQuery } from "@tanstack/react-query";
import { getAllStates } from "../../api/turn";

const useGetStates = () => {
  const {
    data: estados,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["estados"],
    queryFn: () => getAllStates(),
  });

  return {
    estados,
    isLoading,
    error,
  };
};

export default useGetStates;