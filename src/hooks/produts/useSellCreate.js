import { registerSell } from "../../api/products";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useSellCreate = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createSell,
  } = useMutation({
    mutationFn: registerSell,
    onSuccess: () => {
      navigate("/home");
    },
  });
  return { isLoading, error, createSell };
};

export default useSellCreate;
