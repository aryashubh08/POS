import React, { useState } from "react";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* LEFT SECTION (hidden on mobile) */}
      <div
        className="hidden md:flex w-1/2 relative items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/restro.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <blockquote className="relative px-8 text-2xl italic text-white text-center">
          "Serve customers the best food with prompt and friendly service in a
          welcoming atmosphere, and they'll keep coming back."
          <span className="block mt-4 text-yellow-400">Founder of Restro</span>
        </blockquote>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-1/2 min-h-screen  bg-slate-50 px-6 md:px-20 flex flex-col justify-center">
        <h2 className="text-2xl text-center font-semibold text-yellow-400 mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* FORM */}
        {isRegister ? <Register setIsRegister={setIsRegister} /> : <Login />}

        {/* TOGGLE */}
        <div className="flex justify-center mt-6">
          <p className="text-sm text-slate-500">
            {isRegister ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-yellow-400 font-semibold hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
