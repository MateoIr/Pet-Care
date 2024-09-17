import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";
import { registerProduct } from "../../api/products";

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
        Toastify({
          text: "¡El producto se ha creado correctamente!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#805454",
        }).showToast();
        navigate("/product/catalogView");
      }
    },
  });

  return { isLoading, error, createProduct };
};

export default useRegisterProduct;
