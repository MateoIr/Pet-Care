import { useQuery } from "@tanstack/react-query";
import {
    getAllCategory
  } from "../api/products";

const useGetCategory = () => {
  const {
    data: nombrecategoria,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["nombrecategoria"],
    queryFn: () => getAllCategory(),
  });

  return {
    nombrecategoria,
    isLoading,
    error,
  };
};

export default useGetCategory;
