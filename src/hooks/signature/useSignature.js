import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerSignature } from "../../api/services";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
const useSignature = ({ id }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: saveSignature,
  } = useMutation({
    mutationFn: registerSignature,
    onSuccess: () => {
      Toastify({
        text: "¡Consentimiento guardado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/client/pet/petList");
    },
    onError: (error) => {
      console.error("Error al guardar la firma:", error);
    },
  });

  return { isLoading, error, saveSignature };
};

export default useSignature;
