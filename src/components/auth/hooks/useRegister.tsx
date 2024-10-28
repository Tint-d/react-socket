import { useRegisterMutation } from "@/services/auth/auth.mutation";
import { SignUpPayload } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
  username: z.string().min(3, {
    message: "Password must be at least 8 characters.",
  }),
});

const useRegister = () => {
  const { mutate, isPending } = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload: SignUpPayload = {
      username: values.username,
      email: values.email,
      password: values.password,
      role: "guest",
    };
    mutate(payload, {
      onSuccess: () => {
        navigate("/login");
      },
      onError: (err) => {
        console.error("Register failed:", err);
      },
    });
  }
  return { onSubmit, form, isPending };
};

export default useRegister;
