import { useQuery } from "@tanstack/react-query";
import { getClient } from "../../api/cliets";
import { useNavigate } from "react-router-dom";

const useSelectedClient = (id) => {
  const navigate = useNavigate();
  const {
    data: clientSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["client", id],
    queryFn: () => getClient(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    clientSelected,
    isLoading,
    error,
  };
};

export default useSelectedClient;