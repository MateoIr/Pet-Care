import { useQuery } from "@tanstack/react-query";
import { getAllCustomers } from "../../api/cliets";

const useGetAllCustomer = () => {
  const {
    data: clientes,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["cliente"],
    queryFn: () => getAllCustomers(),
  });

  return {
    clientes,
    isLoading,
    error,
  };
};

export default useGetAllCustomer;
