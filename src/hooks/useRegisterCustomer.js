import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../api/users";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

export const useRegisterCustomer = ({ setUserExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createUser,
  } = useMutation({
    mutationFn: registerCustomer,
    onSuccess: () => {
      Toastify({
        text: "¡Se registro el cliente correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/home");
    },
  });

  return { isLoading, error, createUser };
};
