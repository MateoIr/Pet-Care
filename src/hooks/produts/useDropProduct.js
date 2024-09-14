import { useMutation } from "@tanstack/react-query";
import { dropProduct } from "../../api/products";

const useDropProduct = () => {
  const {
    isPending: isLoading,
    status,
    error,
    mutate: deleteProduct,
  } = useMutation({
    mutationFn: dropProduct,
  });

  return {
    status,
    deleteProduct,
    isLoading,
    error,
  };
};

export default useDropProduct;