import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { client } from "../config/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ simple validation (no regex)
    const validate = () => {
        if (!cnic.trim() || !password.trim()) {
            toast.error("Please fill all fields");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const { data, error } = await client
                .from("student_accounts")
                .select("*")
                .eq("cnic", cnic)
                .eq("password", password)
                .single();

            if (error || !data) {
                toast.error("Invalid CNIC or Password");
                return;
            }

            localStorage.setItem("student", JSON.stringify(data));
            toast.success("Login successful");

            setTimeout(() => {
                navigate("/student/dashboard");
            }, 1000);

        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
        >
            <h2 className="text-2xl font-semibold font-serif text-center">Login</h2>

            {/* CNIC */}
            <div className="space-y-1">
                <label className="text-sm font-serif font-bold">CNIC</label>
                <input
                    type="text"
                    placeholder="Enter CNIC"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    className="w-full h-11 px-3 my-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Password */}
            <div className="space-y-1">
                <label className="text-sm font-serif font-bold">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-11 px-3 my-1 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>

            {/* Forgot */}
            <div className="flex justify-end">
                <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                >
                    Forgot Password?
                </button>
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full h-11 font-serif bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={18} />
                        Signing in...
                    </>
                ) : (
                    "Login"
                )}
            </button>
        </form>
    );
};

export default Login;