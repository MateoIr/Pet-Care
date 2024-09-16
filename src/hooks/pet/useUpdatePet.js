import { useMutation } from "@tanstack/react-query";
import { updatePetSelected } from "../../api/cliets";
import { useNavigate } from "react-router-dom";

const useUpdatePet = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updatePet,
  } = useMutation({
    mutationFn: updatePetSelected,
    onSuccess: () => {
      navigate("/petList/PetList");
    },
  });

  return { isLoading, error, updatePet };
};

export default useUpdatePet;