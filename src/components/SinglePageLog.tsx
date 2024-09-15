import React, { useEffect, useState, FormEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
} from "firebase/auth";
import { auth } from '../firebase';
import { FcGoogle } from "react-icons/fc";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";

// Define the types for props
interface SinglePageLogProps {
    title: string;
    login: boolean;
    description: string;
    navText: string;
    hidePassword?: boolean;
}

export default function SinglePageLog({
    title,
    login,
    description,
    navText,
    hidePassword = false
}: SinglePageLogProps) {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [match, setMatch] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // Use string or null
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        minValueValidation: false,
        numberValidation: false,
        capitalLetterValidation: false,
        specialCharacterValidation: false,
    });
    const navigate = useNavigate();

    // Validate password according to the criteria
    const validatePassword = (password: string) => {
        setErrors({
            minValueValidation: password.length >= 8,
            numberValidation: /\d/.test(password),
            capitalLetterValidation: /[A-Z]/.test(password),
            specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
        });
    };

    // Handle password change event
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    // Handle Google login with redirection or popup
    const googleLogin = async (isMobile: boolean) => {
        const provider = new GoogleAuthProvider();
        try {
            if (isMobile) {
                await signInWithRedirect(auth, provider);
            } else {
                await signInWithPopup(auth, provider);
            }
            navigate("/host");
        } catch (error: any) {
            setError(error.message || "An error occurred during Google login.");
        }
    };

    // Handle sign-up process
    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== match) {
            setError("Passwords do not match");
            return;
        }
        if (!Object.values(errors).every(Boolean)) {
            setError("Password does not meet the criteria");
            return;
        }
        try {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/login');
        } catch (error: any) {
            setError(error.message || "An error occurred during sign-up.");
        } finally {
            setLoading(false);
        }
    };

    // Handle login process
    const handleLogIn = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error: any) {
            setError(error.message || "An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    // Toggle password visibility
    useEffect(() => {
        const togglePassword = document.querySelector("#togglePassword") as HTMLElement;
        const pass = document.querySelector("#password") as HTMLInputElement;

        const handleTogglePassword = () => {
            const type = pass.getAttribute("type") === "password" ? "text" : "password";
            pass.setAttribute("type", type);
            togglePassword.classList.toggle("bi-eye");
        };

        togglePassword?.addEventListener("click", handleTogglePassword);

        return () => {
            togglePassword?.removeEventListener("click", handleTogglePassword);
        };
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            {error && <h3 className="text-red-500 mb-4">{error}</h3>}
            <form
                className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
                onSubmit={login ? handleLogIn : handleSignUp}
            >
                <div className="mb-4">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={handlePasswordChange}
                        required
                    />
                     {hidePassword && (
                        <i   className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
          hidePassword ? 'bi bi-eye-slash' : 'bi bi-eye'}`}
                         id="togglePassword"></i>
                     )}
                </div>
                {!login && (
                    <div className="mb-4">
                        <input
                            name="match-password"
                            type="password"
                            placeholder="Confirm Your Password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setMatch(e.target.value)}
                            required
                        />
                    </div>
                )}
                {!login && Object.entries(errors).map(([key, value]) => (
                    <div key={key} className={`flex items-center mb-2 ${value ? "text-green-500" : "text-red-500"}`}>
                        {value ? (
                            <IoMdCheckmark className="mr-2" />
                        ) : (
                            <FaXmark className="mr-2" />
                        )}
                        <p>
                            {key === 'minValueValidation' && 'Password must be at least 8 characters'}
                            {key === 'numberValidation' && 'Password must have at least one number'}
                            {key === 'capitalLetterValidation' && 'Password must have at least one capital letter'}
                            {key === 'specialCharacterValidation' && 'Password must have at least one special character'}
                        </p>
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={loading}
                >
                    {loading ? (login ? "Logging in" : "Submitting") : (login ? "Log In" : "Submit")}
                </button>
                <p className="mt-4 text-gray-600 text-center">{description}</p>
                <NavLink
                    to={login ? "/signup" : "/login"}
                    className="text-blue-500 hover:underline block text-center mt-4"
                >
                    {navText}
                </NavLink>
                {login && (
                    <div className="mt-4 text-center flex justify-center">
                        <p className="self-center mr-2">or Continue With</p>
                        <button
                            type="button"
                            className="flex sm:hidden items-center px-4 py-2 border rounded-lg bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={() => googleLogin(false)}
                        >
                            <FcGoogle className="mr-2" /> Google
                        </button>
                        <button
                            type="button"
                            className="hidden sm:flex items-center justify-center px-4 py-2 border rounded-lg bg-white shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                            onClick={() => googleLogin(true)}
                        >
                            <FcGoogle className="mr-2" /> Google
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}
