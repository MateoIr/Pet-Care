import { useQuery } from "@tanstack/react-query";
import {
    getAllCategory
  } from "../api/products";

const useGetCategory = () => {

  const {
    data: categorias,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["categorias"],
    queryFn: () => getAllCategory(),
  });

  return {
    categorias,
    isLoading,
    error,
  };
};

export default useGetCategory;
