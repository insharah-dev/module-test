// import { useState } from "react";
// import { Eye, EyeOff, Loader2 } from "lucide-react";
// import { client } from "../../config/supabase";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setAdmin } from "../../redux/authSlice";
// import { PublicNavbar } from "../../component/PublicNavbar";

// const AdminLogin = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const validate = () => {
//         if (!username.trim() || !password.trim()) {
//             toast.error("Please fill all fields");
//             return false;
//         }

//         if (password.length < 6) {
//             toast.error("Password must be at least 6 characters");
//             return false;
//         }

//         return true;
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         setLoading(true);

//         try {
//             const { data, error } = await client
//                 .from("admins_login")
//                 .select("*")
//                 .eq("username", username)
//                 .eq("password", password)
//                 .single();

//             if (error || !data) {
//                 toast.error("Invalid username or password");
//                 return;
//             }

//             // ✅ Redux store
//             dispatch(setAdmin(data));

//             // ✅ LocalStorage
//             localStorage.setItem("admin", JSON.stringify(data));

//             toast.success("Admin login successful");

//             setTimeout(() => {
//                 navigate("/admin/dashboard");
//             }, 1000);

//         } catch (err) {
//             toast.error("Something went wrong");
//             console.log(err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <>
//             <section className="h-screen">
//                 <PublicNavbar/>
//                 <form
//                     onSubmit={handleLogin}
//                     className="space-y-5 bg-white p-6 mt-20 rounded-2xl shadow-md w-full max-w-md mx-auto"
//                 >
//                     <h2 className="text-xl font-semibold text-center">Admin Login</h2>

//                     {/* Username */}
//                     <div className="space-y-1">
//                         <label className="text-sm font-medium">Username</label>
//                         <input
//                             type="text"
//                             placeholder="Enter username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="space-y-1">
//                         <label className="text-sm font-medium">Password</label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Enter password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="w-full h-11 px-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                             >
//                                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                             </button>
//                         </div>
//                     </div>

//                     {/* Button */}
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="w-full h-11 bg-blue-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//                     >
//                         {loading ? (
//                             <>
//                                 <Loader2 className="animate-spin" size={18} />
//                                 Signing in...
//                             </>
//                         ) : (
//                             "Login"
//                         )}
//                     </button>
//                 </form>
//             </section>
//         </>
//     );
// };

// export default AdminLogin;



import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { client } from "../../config/supabase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../../redux/authSlice";
import { PublicNavbar } from "../../component/PublicNavbar";

import toast, { Toaster } from "react-hot-toast";
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

            dispatch(setAdmin(data));
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
            <PublicNavbar />

            <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
                <Toaster position="top-center" />
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-lg p-10 rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl space-y-6"
                >
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold">Admin Panel 🔐</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Login to manage dashboard
                        </p>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Username
                        </label>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full mt-2 h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <div className="relative mt-2">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-11 px-4 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-11 rounded-xl bg-black text-white font-medium flex items-center justify-center gap-2 hover:bg-gray-900 transition"
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
            </div>
        </>
    );
};

export default AdminLogin;
