import { useMutation } from "@tanstack/react-query";
import { getAllServices } from "../../api/turn";

export const useGetServices = () => {
  const {
    data,
    isPending: isLoading,
    error,
    mutate: createProduct,
  } = useMutation({
    mutationFn: getAllServices,
  });

  return { isLoading, error, createProduct, data };
};

export default useGetServices;
