import { useQuery } from "@tanstack/react-query";
import { getPetByOwner } from "../../api/cliets";

const useGetPetByOwner = (id) => {
  const {
    data: pet,
    isLoading,
    error: error,
    refetch,
  } = useQuery({
    queryKey: ["Pets"],
    queryFn: () => getPetByOwner(id),
  });

  return {
    pet,
    isLoading,
    error,
    refetch,
  };
};

export default useGetPetByOwner;