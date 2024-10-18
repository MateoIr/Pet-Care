import { useQuery } from "@tanstack/react-query";
import { getTurnServices} from "../../api/turn";
import { useNavigate } from "react-router-dom";

const useSelectedTurnServices = (id) => {
  const navigate = useNavigate();
  const {
    data: servicesSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services", id],
    queryFn: () => getTurnServices(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    servicesSelected,
    isLoading,
    error,
  };
};

export default useSelectedTurnServices