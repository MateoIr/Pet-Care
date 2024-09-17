import { useMutation } from "@tanstack/react-query";
import { deleteVeterinarian } from "../../api/veterinarian";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useDeleteVeterinarian = () => {
  const {
    isPending: isLoading,
    status,
    error,
    mutate: dropVeterinarian,
  } = useMutation({
    mutationFn: deleteVeterinarian,
    onSuccess: () => {
      Toastify({
        text: "¡Veterinario eliminado correactamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
    },
  });

  return {
    status,
    dropVeterinarian,
    isLoading,
    error,
  };
};

export default useDeleteVeterinarian;
