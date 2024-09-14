import { useMutation } from "@tanstack/react-query";
import { updateProductSelected } from "../../api/products";
import { useNavigate } from "react-router-dom";

const useUpdateProduct = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateProduct,
  } = useMutation({
    mutationFn: updateProductSelected,
    onSuccess: () => {
      navigate("/product/catalogView");
    },
  });

  return { isLoading, error, updateProduct };
};

export default useUpdateProduct;