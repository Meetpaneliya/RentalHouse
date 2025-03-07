import { useState } from "react"
import { FaEye, FaEyeSlash, FaApple, FaGoogle, FaTimes } from "react-icons/fa"

export default function SignupPage({ onClose, setShowLoginModal }) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    })

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            })
        }
    }

    const validateForm = () => {
        let valid = true
        const newErrors = { ...errors }

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
            valid = false
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
            valid = false
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
            valid = false
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
            valid = false
        }

        setErrors(newErrors)
        return valid
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validateForm()) {
            // Here you would typically send the data to your backend
            console.log("Form submitted:", formData)
            // For demo purposes, show an alert
            alert("Signup successful! You can now login.")
            onClose()
        }
    }

    return (
        <div className="w-96 max-w-3xl bg-white rounded-lg shadow-xl p-9 relative animate-fadeIn">
            {/* Add close button */}
            <button
                onClick={onClose}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close"
            >
                <FaTimes size={20} />
            </button>

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Create an account</h2>
                <p className="text-gray-600">Enter your information to create an account</p>
            </div>

            <div className="space-y-4">
                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        className="flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-50"
                        onClick={() => console.log("Google signup clicked")}
                    >
                        <FaApple className="text-black" />
                        Apple
                    </button>
                    <button 
                        className="flex items-center justify-center gap-2 p-2 border rounded-md hover:bg-gray-50"
                        onClick={() => console.log("Facebook signup clicked")}
                    >
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </div>

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
                            className={`mt-1 block w-full rounded-md border ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            } px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`block w-full rounded-md border ${
                                    errors.password ? 'border-red-500' : 'border-gray-300'
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
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Sign up
                    </button>
                </form>
            </div>

            <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                        onClick={() => {
                            onClose()
                            setShowLoginModal(true)
                        }}
                        className="text-blue-600 hover:underline"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}