import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerAnimal } from "../../api/cliets";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

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
        Toastify({
          text: "¡La mascota se ha creado correctamente!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#805454",
        }).showToast();
        navigate("/pet/petList");
      }
    },
  });
  return { isLoading, error, createPet };
};

export default usePetCreate;
