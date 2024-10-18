import { useMutation } from "@tanstack/react-query";
import { updateTurnSelected } from "../../api/turn";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useUpdateTurn = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateTurn,
  } = useMutation({
    mutationFn: updateTurnSelected,
    onSuccess: () => {
      Toastify({
        text: "¡El turno se ha modificado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/calendar");
    },
  });

  return { isLoading, error, updateTurn };
};

export default useUpdateTurn;