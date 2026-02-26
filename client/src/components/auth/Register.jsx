import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const Register = ({ setIsRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const signup = async () => {
    try {
      if (!formData.role) {
        return toast.error("Please select a role");
      }

      setLoading(true);

      const { data } = await api.post("/v1/auth/signup", formData);

      if (data.success) {
        toast.success("Registration successful!");
        console.log(data);
        dispatch(setUser(data.user));
        setIsRegister(false);
        navigate("/auth");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-slate-400 mb-2 text-sm font-medium">
            Employee Name
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter employee name"
              name="name"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-slate-400 mb-2 mt-2 text-sm font-medium">
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

        {/* Phone */}
        <div>
          <label className="block text-slate-400 mb-2 mt-2 text-sm font-medium">
            Employee Phone
          </label>
          <div className="flex items-center rounded-lg p-2 px-4 bg-slate-700">
            <input
              value={formData.phone}
              onChange={handleChange}
              type="number"
              placeholder="Enter employee phone"
              name="phone"
              className="bg-transparent flex-1 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-slate-400 mb-2 mt-2 text-sm font-medium">
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

        {/* Role */}
        <div>
          <label className="block text-slate-400 mb-2 mt-2 text-sm font-medium">
            Choose your role
          </label>
          <div className="flex items-center gap-2 mt-2">
            {["Waiter", "Cashier", "Admin"].map((role) => (
              <button
                type="button"
                onClick={() => handleRoleSelection(role)}
                key={role}
                className={`px-3 py-2 w-full rounded-lg text-white 
                  ${
                    formData.role === role
                      ? "bg-yellow-400 text-black"
                      : "bg-[#cb131e]"
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full mt-6 py-2 text-lg bg-yellow-400 rounded-lg text-gray-900 font-bold disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
    </div>
  );
};

export default Register;
