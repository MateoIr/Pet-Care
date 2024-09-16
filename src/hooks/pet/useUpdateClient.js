import { useMutation } from "@tanstack/react-query";
import { updateClientSelected } from "../../api/cliets";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useUpdateClient = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateClient,
  } = useMutation({
    mutationFn: updateClientSelected,
    onSuccess: () => {
      Toastify({
        text: "¡El cliente se ha modificado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/client/clienteList");
    },
  });

  return { isLoading, error, updateClient };
};

export default useUpdateClient;