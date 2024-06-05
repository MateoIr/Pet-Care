import { useQuery } from "@tanstack/react-query";
import { getAllAnimals } from "../../api/cliets";

const useGetAnimal = () => {
  const {
    data: animal,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["animal"],
    queryFn: () => getAllAnimals(),
  });

  return {
    animal,
    isLoading,
    error,
  };
};

export default useGetAnimal;
