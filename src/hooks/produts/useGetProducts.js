import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../api/products";

const useGetProducts = () => {
  const {
    data: products,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: () => getAllProducts(),
  });

  return {
    products,
    isLoading,
    error,
  };
};

export default useGetProducts;
