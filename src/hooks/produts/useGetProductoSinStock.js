import { useQuery } from "@tanstack/react-query";
import { getProductsSinStock} from "../../api/products";

const useGetProductoSinStock= () => {
  const {
    refetch,
    data: products,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["productos"],
    queryFn: () => getProductsSinStock(),
  });

  return {
    refetch,
    products,
    isLoading,
    error,
  };
};

export default useGetProductoSinStock;