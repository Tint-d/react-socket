import { Form } from "@/components/ui/form";
import MyFormItem from "@/components/custom/inputs/MyFormItem";
import MyInput from "@/components/custom/inputs/MyInput";
import PasswordInput from "@/components/custom/inputs/MyPasswordInput";
import MyButton from "@/components/custom/buttons/MyButton";
import { Link } from "react-router-dom";
import useLogin from "./hooks/useLogin";

const LoginForm = () => {
  const { onSubmit, form, isPending } = useLogin();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <MyFormItem name="email" form={form}>
          {(field) => (
            <MyInput
              isEmail
              className=" bg-[#A3C1DE]"
              placeholder="Email"
              {...field}
            />
          )}
        </MyFormItem>
        <MyFormItem name="password" form={form}>
          {(field) => <PasswordInput placeholder="password" {...field} />}
        </MyFormItem>
        <div className="flex items-center gap-1 justify-between mt-2">
          <div className="flex gap-2 items-center">
            <p className=" font-medium text-gray-500 text-sm tracking-wide">
              Don't have an account?
            </p>
          </div>
          <Link
            to={"/register"}
            className="border-b border-b-gray-600 text-sm tracking-wide font-medium text-gray-600"
          >
            Signup
          </Link>
        </div>
        <MyButton
          isLoading={isPending}
          // variant={"login"}
          className=" w-full text-white"
          type="submit"
        >
          Login
        </MyButton>
      </form>
    </Form>
  );
};

export default LoginForm;
