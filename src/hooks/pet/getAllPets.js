import { useQuery } from "@tanstack/react-query";
import { getAllPets } from "../../api/cliets";

const useGetAnimal = () => {
  const {
    data: pet,
    isLoading,
    error: error,
    refetch,
  } = useQuery({
    queryKey: ["Pets"],
    queryFn: () => getAllPets(),
  });

  return {
    pet,
    isLoading,
    error,
    refetch,
  };
};

export default useGetAnimal;
