import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      data,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    window.localStorage.setItem("token", response.data.access_token);
    window.localStorage.setItem("user", JSON.stringify(response.data.user));
    setLoading(false);
    navigate("/users");
  };

  return (
    <div className="w-1/2 border-2 border-gray-400 my-4 mx-auto p-4 rounded-md">
      <h1 className="text-gray-700 text-center font-bold text-3xl">Login</h1>
      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <div className="form-control mt-4">
            <label htmlFor="email">
              <input
                className="p-2 w-full"
                type="text"
                name="email"
                id="email"
                autoFocus={true}
                placeholder="Enter your email..."
                value={data.email}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </label>
          </div>

          <div className="form-control mt-4">
            <label htmlFor="password">
              <input
                className="p-2 w-full"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password..."
                value={data.password}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
            </label>
          </div>
          <button
            type="submit"
            className="font-medium mt-4 border-2 border-gray-300 bg-gray-700 p-1.5 w-full text-yellow-100 rounded-md"
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
