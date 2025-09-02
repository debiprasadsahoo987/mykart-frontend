import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import InputField from "../shared/InputField";

const LogIn = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const logInHandler = async (data) => {
    console.log("Login form data");
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(logInHandler)}
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded"
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <AiOutlineLogin className="text-slate-800 text-5xl" />
          <h1 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h1>
        </div>
        <hr className="mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required
            id="username"
            type="text"
            register={register}
            errors={errors}
            message={"*Username is required"}
            placeholder={"Enter the username"}
          />
          <InputField
            label="Password"
            required
            id="password"
            type="password"
            register={register}
            errors={errors}
            message={"*Password is required"}
            placeholder={"Enter the password"}
          />
        </div>
        <button
          disabled={loader}
          className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
          type="submit"
        >
          {loader ? <>Loading...</> : <>Login</>}
        </button>
        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span className="ml-1">SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
