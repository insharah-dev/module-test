// // AdminLogin.jsx
// import { useDispatch } from "react-redux";
// import { setAdmin } from "../redux/authSlice";

// import { useState } from "react";
// import { client } from "../config/supabase";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");

//     const dispatch = useDispatch();

//     const handleLogin = async () => {
//         const { data } = await client
//             .from("admins_login")
//             .select("*")
//             .eq("username", username)
//             .eq("password", password);

//         if (data.length > 0) {
//             dispatch(setAdmin(data[0]));
//             console.log(data,"login data");

//             localStorage.setItem("admin", JSON.stringify(data[0]));
//             alert("Admin login successful");
//             navigate("/admin/dashboard");
//         } else alert("Invalid username or password");
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
//                 <h1 className="text-2xl font-bold text-center">Admin Login</h1>

//                 <input
//                     type="text"
//                     placeholder="Username"
//                     value={username}
//                     onChange={e => setUsername(e.target.value)}
//                     className="w-full p-3 border rounded-md"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     className="w-full p-3 border rounded-md"
//                 />

//                 <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
//                     Login
//                 </button>
//             </div>
//         </div>
//     );
// }















// // StudentAuth.jsx
// import { useState, useEffect } from "react";
// import { client } from "../config/supabase";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//     const navigate = useNavigate();
//     const [isLogin, setIsLogin] = useState(true);
//     const [cnic, setCnic] = useState("");
//     const [roll, setRoll] = useState("");
//     const [password, setPassword] = useState("");
//     const [studentsDB, setStudentsDB] = useState([]);

//     // Fetch pre-added students (Excel upload)

//     useEffect(() => {
//         client.from("students").select("*").then(({ data, error }) => {
//             console.log(data, error);
//             setStudentsDB(data || []);
//         });
//     }, []);

//     // Signup
//     const handleSignup = async () => {
//         const studentExists = studentsDB.find(s => s.cnic === cnic && s.roll_number === roll);
//         if (!studentExists) {
//             alert("You are not added by Admin. Cannot signup.");
//             return;
//         }

//         const { data: existing } = await client
//             .from("student_accounts")
//             .select("*")
//             .eq("cnic", cnic);
//         if (existing.length > 0) {
//             alert("Account already exists. Please login.");
//             return;
//         }

//         const { error } = await client.from("student_accounts").insert([
//             { cnic, roll_number: roll, password }
//         ]);

//         if (!error) {
//             alert("Signup successful. Please login.");
//             setIsLogin(true);
//             setCnic(""); setRoll(""); setPassword("");
//         } else alert("Error creating account");
//     };

//     // Login
//     const handleLogin = async () => {
//         const { data, error } = await client
//             .from("student_accounts")
//             .select("*")
//             .eq("cnic", cnic)
//             .eq("password", password);

//         if (error) {
//             console.log(error);
//             alert("Login failed. Check console");
//             return;
//         }

//         if (data.length > 0) {
//             alert("Login successful");
//             navigate("/student/dashboard");
//         } else alert("Invalid CNIC or Password");
//     };

//     return (
//         <div className="flex justify-center items-center min-h-screen bg-gray-50">
//             <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg space-y-6">
//                 <h1 className="text-2xl font-bold text-center">
//                     {isLogin ? "Student Login" : "Student Signup"}
//                 </h1>

//                 {!isLogin && (
//                     <input
//                         type="text"
//                         placeholder="Roll Number"
//                         value={roll}
//                         onChange={e => setRoll(e.target.value)}
//                         className="w-full p-3 border rounded-md"
//                     />
//                 )}
//                 <input
//                     type="text"
//                     placeholder="CNIC"
//                     value={cnic}
//                     onChange={e => setCnic(e.target.value)}
//                     className="w-full p-3 border rounded-md"
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     className="w-full p-3 border rounded-md"
//                 />

//                 {isLogin ? (
//                     <button onClick={handleLogin} className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
//                         Login
//                     </button>
//                 ) : (
//                     <button onClick={handleSignup} className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
//                         Signup
//                     </button>
//                 )}

//                 <p
//                     className="text-center text-sm text-gray-500 cursor-pointer"
//                     onClick={() => setIsLogin(!isLogin)}
//                 >
//                     {isLogin ? "New student? Signup" : "Already have account? Login"}
//                 </p>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

const Login = () => {
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const formatCnic = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 13);
        if (digits.length <= 5) return digits;
        if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
        return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
    };

    const handleCnicChange = (e) => {
        setCnic(formatCnic(e.target.value));
        if (errors.cnic) setErrors((prev) => ({ ...prev, cnic: undefined }));
    };

    const validate = () => {
        const newErrors = {};

        if (!cnic.trim()) newErrors.cnic = "CNIC is required";
        else if (!CNIC_REGEX.test(cnic))
            newErrors.cnic = "Invalid CNIC format (e.g. 12345-1234567-1)";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
            >
                <h2 className="text-xl font-semibold text-center">Login</h2>

                {/* CNIC */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">CNIC</label>
                    <input
                        type="text"
                        placeholder="1234512345671"
                        value={cnic}
                        onChange={handleCnicChange}
                        maxLength={15}
                        className="w-full h-11 px-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.cnic && (
                        <p className="text-xs text-red-500">{errors.cnic}</p>
                    )}

                </div>

                {/* Password */}
                <div className="space-y-1">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password)
                                    setErrors((prev) => ({ ...prev, password: undefined }));
                            }}
                            className="w-full h-11 px-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                </div>

                {/* Forgot Password */}
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
        </>
    );
};

export default Login;