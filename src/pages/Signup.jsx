import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { client } from "../config/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [cnic, setCnic] = useState("");
    const [rollNumber, setRollNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [studentsDB, setStudentsDB] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await client.from("students").select("*");
            if (!error) setStudentsDB(data || []);
        };
        fetchStudents();
    }, []);

    const validate = () => {
        if (!cnic.trim() || !rollNumber.trim() || !password) {
            toast.error("All fields required!");
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

        const studentExists = studentsDB.find(
            (s) => s.cnic === cnic && s.roll_number === rollNumber
        );

        if (!studentExists) {
            toast.error("You are not added by Admin");
            setLoading(false);
            return;
        }

        const { data: existing } = await client
            .from("student_accounts")
            .select("*")
            .eq("cnic", cnic);

        if (existing && existing.length > 0) {
            toast.error("Account already exists. Please login");
            setLoading(false);
            return;
        }

        const { error } = await client.from("student_accounts").insert([
            {
                cnic,
                roll_number: rollNumber,
                password,
            },
        ]);

        if (!error) {
            toast.success("Signup successful");

            setCnic("");
            setRollNumber("");
            setPassword("");

            navigate("/student/dashboard");
        } else {
            toast.error("Error creating account");
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100">

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-10 rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-xl space-y-6"
            >
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Create Account</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Sign up to get started
                    </p>
                </div>

                {/* CNIC */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        CNIC
                    </label>
                    <input
                        type="text"
                        placeholder="1234512345671"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        className="w-full mt-2 h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-black transition"
                    />
                </div>

                {/* Roll Number */}
                <div>
                    <label className="text-sm font-medium text-gray-600">
                        Roll Number
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your Roll Number"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
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
                            placeholder="Create a password"
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
                            Creating account...
                        </>
                    ) : (
                        "Sign Up"
                    )}
                </button>
            </form>
        </div>
    );
};

export default Signup;
