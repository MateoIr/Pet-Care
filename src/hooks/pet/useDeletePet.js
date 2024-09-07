import { useMutation } from "@tanstack/react-query";
import { deletePet } from "../../api/cliets";

const useDeletePet = () => {
  const {
    isPending: isLoading,
    error,
    mutate: deletedPet,
  } = useMutation({
    mutationFn: deletePet,
  });
  return { isLoading, error, deletedPet };
};

export default useDeletePet;
