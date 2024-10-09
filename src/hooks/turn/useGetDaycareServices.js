import { useQuery } from "@tanstack/react-query";
import { getAllDservices } from "../../api/turn";
const useGetDaycareServices = () => {
  const {
    data: DServices,
    isLoading: loadingDServices,
    error: errorDServices,
  } = useQuery({
    queryKey: ["VServices"],
    queryFn: () => getAllDservices(),
  });

  return {
    DServices,
    loadingDServices,
    errorDServices,
  };
};

export default useGetDaycareServices;
