import { useMutation } from "@tanstack/react-query";
import { updateUserSelected } from "../../api/users";
import { useNavigate } from "react-router-dom";
import "toastify-js/src/toastify.css";
import Toastify from "toastify-js";

const useUpdateUser = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateUser,
  } = useMutation({
    mutationFn: updateUserSelected,
    onSuccess: () => {
      Toastify({
        text: "¡El usuario se ha modificado correctamente!",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#805454",
      }).showToast();
      navigate("/user/userList");
    },
  });

  return { isLoading, error, updateUser };
};

export default useUpdateUser;
