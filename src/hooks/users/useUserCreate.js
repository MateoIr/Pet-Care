import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

export const useUserCreate = ({ setUserExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createUser,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.error) {
        setUserExist(error.data);
      } else {
        Toastify({
          text: "¡El usuario se ha creado correctamente!",
          duration: 3000,
          close: true,
          gravity: "top",
          position: "right",
          backgroundColor: "#805454",
        }).showToast();
        navigate("/user/userList");
      }
    },
  });

  return { isLoading, error, createUser };
};
