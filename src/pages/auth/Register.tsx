import Trade from "@/assets/trading.jpg";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="bg-blue-100 h-screen  flex justify-center items-center flex-col">
      <div className=" w-[70%]  flex items-center justify-center ">
        <img
          src={Trade}
          alt="trading"
          className=" w-[300px] h-[400px] object-cover"
        />
        <div className="w-[300px] h-[400px] p-5 bg-white/80 flex flex-col justify-center">
          <h2 className=" text-2xl font-semibold  text-center mb-5 text-purple-500">
            Login
          </h2>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
