import { useQuery } from "@tanstack/react-query";
import { getAllServicesList } from "../../api/turn";
const useGetAllServices = () => {
  const {
    data: services,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["servicios"],
    queryFn: () => getAllServicesList(),
  });

  return {
    services,
    refetch,
    isLoading,
    error,
  };
};

export default useGetAllServices;
