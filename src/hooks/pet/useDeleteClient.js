import { useMutation } from "@tanstack/react-query";
import { deleteClient } from "../../api/cliets";

const useDeleteClient = () => {
  const {
    isPending: isLoading,
    error,
    mutate: deletedClient,
  } = useMutation({
    mutationFn: deleteClient,
  });
  return { isLoading, error, deletedClient };
};

export default useDeleteClient;
