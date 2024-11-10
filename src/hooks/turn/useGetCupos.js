import { useMutation } from "@tanstack/react-query";
import { checkCupos } from "../../api/turn";

export const useGetCupos = () => {
  const {
    isPending: isLoading,
    error,
    data: cupos,

    mutate: updateCupos,
  } = useMutation({
    mutationFn: checkCupos,
  });

  return { isLoading, error, cupos, updateCupos };
};
