import { useMutation } from "@tanstack/react-query";
import { dropUser } from "../../api/users";

const useDropUser = () => {
  const {
    isPending: isLoading,
    status,
    error,
    mutate: deleteUser,
  } = useMutation({
    mutationFn: dropUser,
  });

  return {
    status,
    deleteUser,
    isLoading,
    error,
  };
};

export default useDropUser;
