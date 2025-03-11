import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaApple, FaTimes } from "react-icons/fa";

export default function LoginPage({ onClose, setShowSignupModal }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            });
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            valid = false;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        setApiError("");

        try {

            const response = await fetch("http://localhost:4000/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            console.log("Raw response:", response);

            const data = await response.json();
            console.log("Response data:", data);

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            console.log("Login successful! Token:", data.token);

            alert("Login successful!");
            onClose();

        } catch (error) {
            console.error("Login error:", error);
            setApiError(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-96 max-w-3xl bg-white rounded-lg shadow-xl p-9 relative animate-fadeIn">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
            >
                <FaTimes size={20} />
            </button>

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className="text-gray-600">Sign in to your account</p>
            </div>

            <div className="space-y-4">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-50">
                        <FaApple className="text-black" />
                        Apple
                    </button>
                    <button className="flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-50">
                        <FaGoogle className="text-blue-600" />
                        Google
                    </button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>

                {apiError && <p className="text-xs text-red-500">{apiError}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                                } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                    <div className="relative mt-1">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`block w-full rounded-md border ${errors.password ? "border-red-500" : "border-gray-300"
                                } px-3 py-2 pr-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">Remember me</label>
                        </div>
                        <div className="text-sm">
                            <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button onClick={() => { onClose(); setShowSignupModal(true); }} className="text-blue-600 hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
}
