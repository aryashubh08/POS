import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signin = async () => {
    try {
      setLoading(true);

      const { data } = await api.post("/v1/auth/login", formData);

      if (data.success) {
        toast.success("Login successful!");
        console.log(data);
        dispatch(setUser(data.user));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(); // ✅ now it runs
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-slate-400 mb-2 text-sm font-medium">
            Employee Email
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter employee email"
              name="email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-400 mb-2 mt-4 text-sm font-medium">
            Employee Password
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
            <input
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter employee password"
              name="password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 py-2 text-lg bg-yellow-400 rounded-lg text-gray-900 font-bold disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
