import { registerSell } from "../../api/products";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../store/StoreProvider";
import { clearBill, clearProducts } from "../../store/StoreReducer";

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
      navigate("/home");
    },
  });
  return { isLoading, error, createSell };
};

export default useSellCreate;
