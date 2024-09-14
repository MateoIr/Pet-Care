import { useQuery } from "@tanstack/react-query";
import { getAllClinics } from "../../api/veterinarian";
const useGetAllClinics = () => {
  const {
    data: clinics,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["cliente"],
    queryFn: () => getAllClinics(),
  });

  return {
    clinics,
    isLoading,
    error,
  };
};

export default useGetAllClinics;
