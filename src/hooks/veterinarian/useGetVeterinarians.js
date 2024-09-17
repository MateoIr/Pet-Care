import { useQuery } from "@tanstack/react-query";
import { getAllVeterinarians } from "../../api/veterinarian";

const useGetVeterinarians = () => {
  const {
    data: veterinarians,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["veterinarians"],
    queryFn: () => getAllVeterinarians(),
  });

  return {
    veterinarians,
    isLoading,
    error,
  };
};

export default useGetVeterinarians;
