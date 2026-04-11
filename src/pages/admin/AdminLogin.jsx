import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { client } from "../../config/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/authSlice";
import { PublicNavbar } from "../../component/PublicNavbar";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        if (!username.trim() || !password.trim()) {
            toast.error("Please fill all fields");
            return false;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return false;
        }

        return true;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        try {
            const { data, error } = await client
                .from("admins_login")
                .select("*")
                .eq("username", username)
                .eq("password", password)
                .single();

            if (error || !data) {
                toast.error("Invalid username or password");
                return;
            }

            // ✅ Redux store
            dispatch(setAdmin(data));

            // ✅ LocalStorage
            localStorage.setItem("admin", JSON.stringify(data));

            toast.success("Admin login successful");

            setTimeout(() => {
                navigate("/admin/dashboard");
            }, 1000);

        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section>
                <PublicNavbar/>
                <form
                    onSubmit={handleLogin}
                    className="space-y-5 bg-white p-6 mt-20 rounded-2xl shadow-md w-full max-w-md mx-auto"
                >
                    <h2 className="text-xl font-semibold text-center">Admin Login</h2>

                    {/* Username */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Username</label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                        <label className="text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-11 px-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
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
            </section>
        </>
    );
};

export default AdminLogin;