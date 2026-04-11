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

    const navigate = useNavigate()

    // Fetch students added by admin
    useEffect(() => {
        const fetchStudents = async () => {
            const { data, error } = await client.from("students").select("*");
            if (!error) setStudentsDB(data || []);
        };
        fetchStudents();
    }, []);



    const validate = () => {
        if (!cnic.trim() || !rollNumber.trim() || !password) {
            toast.error("All feild required!");
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

        // Check if student exists in admin list
        const studentExists = studentsDB.find(
            (s) => s.cnic === cnic && s.roll_number === rollNumber
        );

        if (!studentExists) {
            toast.error("You are not added by Admin");
            setLoading(false);
            return;
        }

        // Check if already registered
        const { data: existing } = await client
            .from("student_accounts")
            .select("*")
            .eq("cnic", cnic);

        if (existing && existing.length > 0) {
            toast.error("Account already exists. Please login");
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
            toast.success("Signup successful ");

            setCnic("");
            setRollNumber("");
            setPassword("");
            navigate("/login")
        } else {
            toast.error("Error creating account");
            console.log(error);
        }

        setLoading(false);
    };

    return (
        <form  onSubmit={handleSubmit}>
            <h2 className="text-2xl mt-5 font-serif font-semibold text-center">
                Create Account
            </h2>

            {/* CNIC */}
            <div>
                <label className="text-sm font-serif font-bold">CNIC</label>
                <input
                    type="text"
                    placeholder="1234512345671"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    maxLength={15}
                    className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
                />
            </div>

            {/* Roll Number */}
            <div>
                <label className="text-sm font-serif font-bold">Roll Number</label>
                <input
                    type="text"
                    placeholder="Enter your Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-0 my-2"
                />
            </div>

            {/* Password */}
            <div>
                <label className="text-sm font-serif font-bold">Password</label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
            </div>

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full h-11 font-serif bg-blue-600 mt-3 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition"
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

