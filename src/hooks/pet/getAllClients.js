import { useQuery } from "@tanstack/react-query";
import { getAllClients } from "../../api/cliets";

const useGetClient = () => {
  const {
    data: client,
    isLoading,
    error: error,
    refetch,
  } = useQuery({
    queryKey: ["Pets"],
    queryFn: () => getAllClients(),
  });

  return {
    refetch,
    client,
    isLoading,
    error,
  };
};

export default useGetClient;
