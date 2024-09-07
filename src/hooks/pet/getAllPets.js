import { useQuery } from "@tanstack/react-query";
import { getAllPets } from "../../api/cliets";

const useGetAnimal = () => {
  const {
    data: pet,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["Pets"],
    queryFn: () => getAllPets(),
  });

  return {
    pet,
    isLoading,
    error,
  };
};

export default useGetAnimal;
