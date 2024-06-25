import { useMutation } from "@tanstack/react-query";
import { Signup as SignupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: SignupApi,
    onSuccess: (user) => {
      toast.success("Account Successfully created!");
    },
  });

  return { signup, isLoading };
}
