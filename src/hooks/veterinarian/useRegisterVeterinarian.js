import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { registerVeterinarian } from "../../api/veterinarian";

const useRegisterVeterinarian = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createVeterinarian,
  } = useMutation({
    mutationFn: registerVeterinarian,
    onSuccess: () => {
      Toastify({
        text: "¡Veterinario creado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/home");
    },
  });

  return { isLoading, error, createVeterinarian };
};

export default useRegisterVeterinarian;
