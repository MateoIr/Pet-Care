import { useMutation } from "@tanstack/react-query";
import { deleteVeterinarian } from "../../api/veterinarian";

const useDeleteVeterinarian = () => {
  const {
    isPending: isLoading,
    status,
    error,
    mutate: dropVeterinarian,
  } = useMutation({
    mutationFn: deleteVeterinarian,
  });

  return {
    status,
    dropVeterinarian,
    isLoading,
    error,
  };
};

export default useDeleteVeterinarian;
