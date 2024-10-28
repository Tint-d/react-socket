import { useLoginMutation } from "@/services/auth/auth.mutation";
import { SignInPayload } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Please enter a valid email address",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const useLogin = () => {
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: SignInPayload = {
      email: values.email,
      password: values.password,
    };
    mutate(payload, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.accessToken);
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.response?.data.message || "Something wrong");
        console.error("Login failed:", err);
      },
    });
  }
  return { onSubmit, form, isPending };
};

export default useLogin;
