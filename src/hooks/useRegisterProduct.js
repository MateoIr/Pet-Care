import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerProduct } from "../api/products";

export const useRegisterProduct = ({ setUserExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createProduct,
  } = useMutation({
    mutationFn: registerProduct,
    onSuccess: (data) => {
      if (data?.error) {
        setUserExist(error.data);
      } else {
        //aca se deberia agregar un mensajito de exito
        navigate("/home");
      }
    },
  });

  return { isLoading, error, createProduct };
};

export default useRegisterProduct;