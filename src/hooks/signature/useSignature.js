import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerSignature } from "../../api/services";
const useSignature = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: saveSignature,
  } = useMutation({
    mutationFn: registerSignature,
    onSuccess: (data) => {
      console.log("Datos guardados:", data);
      // navigate("/home");
    },
    onError: (error) => {
      console.error("Error al guardar la firma:", error);
    },
  });

  return { isLoading, error, saveSignature };
};

export default useSignature;
