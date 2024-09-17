import { useMutation } from "@tanstack/react-query";
import { updatePetSelected } from "../../api/cliets";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useUpdatePet = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updatePet,
  } = useMutation({
    mutationFn: updatePetSelected,
    onSuccess: () => {
      Toastify({
        text: "¡La mascota se ha modificado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/pet/PetList");
    },
  });

  return { isLoading, error, updatePet };
};

export default useUpdatePet;