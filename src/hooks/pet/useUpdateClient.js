import { useMutation } from "@tanstack/react-query";
import { updateClientSelected } from "../../api/cliets";
import { useNavigate } from "react-router-dom";

const useUpdateClient = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateClient,
  } = useMutation({
    mutationFn: updateClientSelected,
    onSuccess: () => {
      navigate("/clientList/ClientList");
    },
  });

  return { isLoading, error, updateClient };
};

export default useUpdateClient;