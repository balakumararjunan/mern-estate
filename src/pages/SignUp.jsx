import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RegisterUser } from "../apis/auth";
import { validateEmail } from "../apis";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      return message.error("All fields are required");
    }

    if (password.length < 6) {
      return message.error("Password must be up to 6 characters");
    }

    if (!validateEmail(formData.email)) {
      return message.error("Please enter a valid email");
    }

    try {
      setLoading(true);
      const response = await RegisterUser(formData);
      setLoading(false);
      if (response.success) {
        message.success(response.message);
        navigate('/sign-in');
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading...." : "Sign Up"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>     
    </div>
  );
};

export default SignUp;
