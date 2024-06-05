import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerCustomer } from "../api/users";

export const useRegisterCustomer = ({ setUserExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createUser,
  } = useMutation({
    mutationFn: registerCustomer,
    onSuccess: (data) => {
      console.log("data" + data);
      if (data?.error) {
        setUserExist(error.data);
      } else {
        navigate("/home");
      }
    },
  });

  return { isLoading, error, createUser };
};
