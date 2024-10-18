import { useMutation } from "@tanstack/react-query";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { registerTurno, updateCostService } from "../../api/turn";

export const useUpdateCostService = () => {
  const {
    isPending: isLoading,
    error,
    isSuccess: completeUpdate,
    mutate: updateCost,
  } = useMutation({
    mutationFn: updateCostService,
    onSuccess: () => {
      Toastify({
        text: "¡Costo actualizado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
    },
  });

  return { isLoading, error, completeUpdate, updateCost };
};
