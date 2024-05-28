import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/users";

const useGetAllUsers = () => {
  const {
    data: user,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  return {
    user,
    isLoading,
    error,
  };
};

export default useGetAllUsers;
