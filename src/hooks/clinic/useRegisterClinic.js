import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { registerClinic } from "../../api/veterinarian";

export const useRegisterClinic = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createClinic,
  } = useMutation({
    mutationFn: registerClinic,
    onSuccess: () => {
      Toastify({
        text: "¡La clínica se ha creado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/home");
    },
  });

  return { isLoading, error, createClinic };
};
