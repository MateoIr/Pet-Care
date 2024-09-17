import { useMutation } from "@tanstack/react-query";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { useNavigate } from "react-router-dom";
import { updateVeterinarianApi } from "../../api/veterinarian";

const useUpdateVeterinarian = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateVeterinarian,
  } = useMutation({
    mutationFn: updateVeterinarianApi,
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

  return { isLoading, error, updateVeterinarian };
};

export default useUpdateVeterinarian;
