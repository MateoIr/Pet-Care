import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/products";
import { useNavigate } from "react-router-dom";

const useSelectedProduct = (id) => {
  const navigate = useNavigate();
  const {
    data: productSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    productSelected,
    isLoading,
    error,
  };
};

export default useSelectedProduct;
