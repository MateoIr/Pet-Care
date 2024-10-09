import { useQuery } from "@tanstack/react-query";
import { getAllVservices } from "../../api/turn";

const useGetVeterinarianServices = () => {
  const {
    data: VServices,
    isLoading: loadingVServices,
    error: errorVServices,
  } = useQuery({
    queryKey: ["VServices"],
    queryFn: () => getAllVservices(),
  });

  return {
    VServices,
    loadingVServices,
    errorVServices,
  };
};

export default useGetVeterinarianServices;
