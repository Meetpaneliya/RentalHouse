import React, { useState } from "react";
import toast from "react-hot-toast";
import { useForgetpasswordMutation } from "../../redux/APi/api";
import { useAsyncMutation } from "../../hooks/useError";

const ForgotPassword = () => {
  const [ForgetPasswordLink, isForgetPasswordLoading] = useAsyncMutation(
    useForgetpasswordMutation
  );

  const handleChange = (e) => {
    setState({ ...state, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await ForgetPasswordLink("Redirecting to Reset Password", {
      email: state.email,
    });
  };

  return (
    <main id="content" role="main" className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <a
                className="text-blue-600 decoration-2 hover:underline font-medium"
                href="/"
              >
                Login here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div>
                  <label className="block text-sm font-bold ml-1 mb-2 dark:text-white">
                    Enter your Recovery Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={state.email}
                      onChange={handleChange}
                      className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isForgetPasswordLoading}
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                >
                  {isForgetPasswordLoading ? "Sending..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <p className="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700">
        <a
          className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="#"
        >
          View Github
        </a>
        <a
          className="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
          href="#"
        >
          Contact us!
        </a>
      </p>
    </main>
  );
};

export default ForgotPassword;
