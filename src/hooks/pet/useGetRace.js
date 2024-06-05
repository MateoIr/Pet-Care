import { useQuery } from "@tanstack/react-query";
import { getAllRace } from "../../api/cliets";

const useGetRace = () => {
  const {
    data: raza,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["raza"],
    queryFn: () => getAllRace(),
  });

  return {
    raza,
    isLoading,
    error,
  };
};

export default useGetRace;
