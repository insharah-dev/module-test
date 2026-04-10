// import { useState } from "react";
// import { Eye, EyeOff, Loader2 } from "lucide-react";

// const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

// const Signup = () => {
//     const [cnic, setCnic] = useState("");
//     const [rollNumber, setRollNumber] = useState("");
//     const [password, setPassword] = useState("");
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [errors, setErrors] = useState({});

//     const formatCnic = (value) => {
//         const digits = value.replace(/\D/g, "").slice(0, 13);
//         if (digits.length <= 5) return digits;
//         if (digits.length <= 12) return `${digits.slice(0, 5)}-${digits.slice(5)}`;
//         return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
//     };

//     const handleCnicChange = (e) => {
//         setCnic(formatCnic(e.target.value));
//         if (errors.cnic) setErrors((prev) => ({ ...prev, cnic: undefined }));
//     };

//     const validate = () => {
//         const newErrors = {};

//         if (!cnic.trim()) newErrors.cnic = "CNIC is required";
//         else if (!CNIC_REGEX.test(cnic)) newErrors.cnic = "Invalid CNIC format";

//         if (!rollNumber.trim())
//             newErrors.rollNumber = "Roll Number is required";
//         else if (rollNumber.length > 50)
//             newErrors.rollNumber = "Roll Number too long";

//         if (!password) newErrors.password = "Password is required";
//         else if (password.length < 6)
//             newErrors.password = "Password must be at least 6 characters";

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         setLoading(true);
//         await new Promise((r) => setTimeout(r, 1500));
//         setLoading(false);
//     };

//     return (
//         <>

//             <h2 className="text-2xl mt-5 font-serif font-semibold text-center">Create Account</h2>

//             {/* CNIC */}
//             <div >
//                 <label className="text-sm font-serif font-bold">CNIC</label>
//                 <input
//                     type="text"
//                     placeholder="1234512345671"
//                     value={cnic}
//                     onChange={handleCnicChange}
//                     maxLength={15}
//                     className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
//                 />


//             </div>

//             {/* Roll Number */}
//             <div className="space-y-1">
//                 <label className="text-sm font-serif font-bold">Roll Number</label>
//                 <input
//                     type="text"
//                     placeholder="Enter your Roll Number"
//                     value={rollNumber}
//                     onChange={(e) => {
//                         setRollNumber(e.target.value);
//                         if (errors.rollNumber)
//                             setErrors((prev) => ({ ...prev, rollNumber: undefined }));
//                     }}
//                     maxLength={50}
//                     className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
//                 />

//             </div>

//             {/* Password */}
//             <div className="space-y-1">
//                 <label className="text-sm font-serif font-bold">Password</label>
//                 <div className="relative">
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         placeholder="Create a password"
//                         value={password}
//                         onChange={(e) => {
//                             setPassword(e.target.value);
//                             if (errors.password)
//                                 setErrors((prev) => ({ ...prev, password: undefined }));
//                         }}
//                         className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
//                     />
//                     <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//                     >
//                         {showPassword ? (
//                             <EyeOff size={18} />
//                         ) : (
//                             <Eye size={18} />
//                         )}
//                     </button>
//                 </div>

//             </div>

//             {/* Button */}
//             <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-11 bg-blue-600 mt-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
//             >
//                 {loading ? (
//                     <>
//                         <Loader2 className="animate-spin" size={18} />
//                         Creating account...
//                     </>
//                 ) : (
//                     "Sign Up"
//                 )}
//             </button>

//         </>
//     );
// };

// export default Signup;


import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { client } from "../config/supabase";

const CNIC_REGEX = /^\d{5}-\d{7}-\d{1}$/;

const Signup = () => {
    const [cnic, setCnic] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [studentsDB, setStudentsDB] = useState([]);

    // Fetch students added by admin
    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await client.from("students").select("*");
            if (!error) setStudentsDB(data || []);
        };
        fetchStudents();
    }, []);

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
            newErrors.cnic = "Invalid CNIC format";

        if (!rollNumber.trim())
            newErrors.rollNumber = "Roll Number is required";

        if (!password) newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 🔥 Signup Logic (from your old code)
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);

        // Check if student exists in admin list
        const studentExists = studentsDB.find(
            (s) => s.cnic === cnic && s.roll_number === rollNumber
        );

        if (!studentExists) {
            alert("You are not added by Admin. Cannot signup.");
            setLoading(false);
            return;
        }

        // Check if already registered
        const { data: existing } = await client
            .from("student_accounts")
            .select("*")
            .eq("cnic", cnic);

        if (existing && existing.length > 0) {
            alert("Account already exists. Please login.");
            setLoading(false);
            return;
        }

        // Insert new account
        const { error } = await client.from("student_accounts").insert([
            {
                cnic,
                roll_number: rollNumber,
                password,
            },
        ]);

        if (!error) {
            alert("Signup successful. Please login.");
            setCnic("");
            setRollNumber("");
            setPassword("");
        } else {
            alert("Error creating account");
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="text-2xl mt-5 font-serif font-semibold text-center">
                Create Account
            </h2>

            {/* CNIC */}
            <div>
                <label className="text-sm font-serif font-bold">CNIC</label>
                <input
                    type="text"
                    placeholder="12345-1234567-1"
                    value={cnic}
                    onChange={handleCnicChange}
                    maxLength={15}
                    className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
                />
                {errors.cnic && (
                    <p className="text-xs text-red-500">{errors.cnic}</p>
                )}
            </div>

            {/* Roll Number */}
            <div>
                <label className="text-sm font-serif font-bold">Roll Number</label>
                <input
                    type="text"
                    placeholder="Enter your Roll Number"
                    value={rollNumber}
                    onChange={(e) => {
                        setRollNumber(e.target.value);
                        if (errors.rollNumber)
                            setErrors((prev) => ({ ...prev, rollNumber: undefined }));
                    }}
                    className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
                />
                {errors.rollNumber && (
                    <p className="text-xs text-red-500">
                        {errors.rollNumber}
                    </p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className="text-sm font-serif font-bold">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password)
                                setErrors((prev) => ({ ...prev, password: undefined }));
                        }}
                        className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                )}
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 mt-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
                {loading ? (
                    <>
                        <Loader2 className="animate-spin" size={18} />
                        Creating account...
                    </>
                ) : (
                    "Sign Up"
                )}
            </button>
        </form>
    );
};

export default Signup;