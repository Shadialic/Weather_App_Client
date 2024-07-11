import React, { useState } from "react";
import bg from "../../../public/bg image.jpg";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../../Api/Apis";
import toast, { Toaster } from "react-hot-toast";

function LoginFprm() {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const userData = await LoginData({
        formData,
      });
      toast(userData.message);
      localStorage.setItem("token", userData.token);
      if (userData.status && userData.token) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again.");
    }
    console.log("Form submitted", formData);
  
  };

  return (
    <div
      className="relative min-h-screen flex justify-center bg-center bg-gray-50 sm:px-8 lg:px-8 bg-no-repeat bg-cover items-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0 z-0 px-8"></div>
      <div
        style={{
          border: "2px solid white",
          backdropFilter: "blur(10px)",
        }}
        className="w-[90%] sm:w-[33%] space-y-8 p-10 rounded-xl shadow-lg z-10 my-4"
      >
        <form onSubmit={handleSubmit} className="grid gap-10 grid-cols-1">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-[#fff] text-2xl text-center">
                Login
              </h2>
            </div>
            <div className="mt-5">
              <div className="form">
                <div className="mb-3 space-y-2 w-full text-xs">
                  <div className="flex text-[#fff] flex-col items-stretch w-full mb-4 gap-4 relative">
                  
                    <Input
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border-b-2 "
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailOutlinedIcon className="text-white" />
                        </InputAdornment>
                      }
                    />
                    <Input
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="border-b-2 "
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <LockOutlinedIcon className="text-white" />
                        </InputAdornment>
                      }
                    />

                    <div className="w-full bg-white rounded-md mt-5 text-center">
                      <button
                        type="submit"
                        className="text-[#000] p-4 text-[15px]"
                      >
                        Login
                      </button>
                    </div>
                    <div className="w-full flex justify-center">
                      <p>
                        Already have an account?{" "}
                        <span onClick={()=>navigate('/signup')} className="text-[15px] cursor-pointer">Signup</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Toaster/>
    </div>
  );
}

export default LoginFprm;
