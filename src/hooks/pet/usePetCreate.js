import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerAnimal } from "../../api/cliets";

const usePetCreate = ({ setPetExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createPet,
  } = useMutation({
    mutationFn: registerAnimal,
    onSuccess: (data) => {
      if (data?.error) {
        setPetExist(data.error);
      } else {
        navigate("/home");
      }
    },
  });
  return { isLoading, error, createPet };
};

export default usePetCreate;
