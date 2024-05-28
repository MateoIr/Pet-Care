import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";

export const useUserCreate = (setUserExist) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createUser,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data?.error) {
        setUserExist(data.error);
      } else {
        navigate("/home");
      }
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });

  return { isLoading, error, createUser };
};
