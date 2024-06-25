import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout as LogoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: Logout, isLoading } = useMutation({
    mutationFn: LogoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
  });

  return { Logout, isLoading };
}
