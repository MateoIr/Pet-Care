import { useMutation } from "@tanstack/react-query";
import { updateProductSelected } from "../../api/products";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useUpdateProduct = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateProduct,
  } = useMutation({
    mutationFn: updateProductSelected,
    onSuccess: () => {
      Toastify({
        text: "¡El producto se ha modificado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/products");
    },
  });

  return { isLoading, error, updateProduct };
};

export default useUpdateProduct;
