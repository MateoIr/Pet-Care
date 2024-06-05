import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../api/users";

const useGetAllUsers = () => {
  const {
    refetch,
    data: user,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  return {
    refetch,
    user,
    isLoading,
    error,
  };
};

export default useGetAllUsers;
