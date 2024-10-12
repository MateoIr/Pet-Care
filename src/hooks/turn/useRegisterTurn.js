import { useMutation } from "@tanstack/react-query";
import { getAllServices } from "../../api/turn";

export const useRegisterTurn = () => {
  const {
    data,
    isPending: isLoading,
    error,
    mutate: registerTurn,
  } = useMutation({
    mutationFn: getAllServices,
  });

  return { isLoading, error, registerTurn, data };
};

export default useRegisterTurn;
