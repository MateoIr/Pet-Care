import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { registerTurno } from "../../api/turn";

export const useRegisterTurno = ({ setUserExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createTurno,
  } = useMutation({
    mutationFn: registerTurno,
    onSuccess: (data) => {
      console.log("data" + data);
      if (data?.error) {
        setUserExist(error.data);
      } else {
        Toastify({
            text: "¡El turno se ha creado correctamente!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "right",
            backgroundColor: "#805454",
          }).showToast();
        navigate("/home");
      }
    },
  });

  return { isLoading, error, createTurno };
};