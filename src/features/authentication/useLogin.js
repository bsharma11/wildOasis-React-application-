import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Login as LoginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: Login, isLoading: isLoggingin } = useMutation({
    mutationFn: ({ email, password }) => LoginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Successfully Logged in");
      queryClient.setQueryData(["user"], user.user); // this helps store data in the cache as soon as the user logs in
      navigate("/dashboard", { replace: true });
    },
    onError: () => toast.error("Provided email or password are incorrect"),
  });

  return { Login, isLoggingin };
}
