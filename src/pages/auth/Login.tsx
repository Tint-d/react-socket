import Trade from "@/assets/trading.jpg";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="md:bg-blue-100 h-screen  flex justify-center items-center flex-col">
      <div className="w-full md:w-[70%]  flex items-center justify-center ">
        <div className="w-full md:w-[300px] h-[400px] p-5 bg-white/80 flex flex-col justify-center">
          <h2 className=" text-2xl font-semibold  md:text-center mb-5 text-purple-500">
            Login
          </h2>
          <LoginForm />
        </div>
        <img
          src={Trade}
          alt="trading"
          className="hidden md:block w-[300px] h-[400px] object-cover"
        />
      </div>
    </div>
  );
};

export default Login;
