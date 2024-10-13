import { useQuery } from "@tanstack/react-query";
import { getTurn} from "../../api/turn";
import { useNavigate } from "react-router-dom";

const useSelectedTurn = (id) => {
  const navigate = useNavigate();
  const {
    data: turnSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["turn", id],
    queryFn: () => getTurn(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    turnSelected,
    isLoading,
    error,
  };
};

export default useSelectedTurn