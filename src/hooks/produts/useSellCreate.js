import { registerSell } from "../../api/products";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import { clearBill, clearProducts } from "../../store/StoreReducer";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useSellCreate = () => {
  const navigate = useNavigate();
  const [store, dispatch] = useContext(StoreContext);
  const {
    isPending: isLoading,
    error,

    mutate: createSell,
  } = useMutation({
    mutationFn: registerSell,
    onSuccess: () => {
      dispatch(clearBill());
      dispatch(clearProducts());
      Toastify({
        text: "¡Se creado la venta correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/home");
    },
  });
  return { isLoading, error, createSell };
};

export default useSellCreate;
