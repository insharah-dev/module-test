import { useState, useEffect } from "react";
import { client } from "../config/supabase";
import { MdAccessTime } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import { PublicNavbar } from "../component/PublicNavbar";

export default function AdminCourses() {
    const [modalOpen, setModalOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [name, setName] = useState("")
    const [rollNo, setRollNo] = useState("")
    const [email, setEmail] = useState("")
    const [cnic, setCnic] = useState("")



    // Fetch courses
    useEffect(() => {
        const fetchCourses = async () => {
            const { data, error } = await client.from("AdminCourse").select("*");
            if (!error) setCourses(data);
            else console.log(error);
        };
        fetchCourses();
    }, []);

    const handleApply = (course) => {
        setSelectedCourse(course);
        setModalOpen(true);
    };

    const handleSubmit = async () => {
        if (!name || !email || !cnic || !rollNo) {
            toast.error("Please fill all fields");
            return;
        }
        const normalizedEmail = email.trim().toLowerCase();
        const { data: existing } = await client
            .from("applications")
            .select("*")
            .eq("email", normalizedEmail)
            .eq("course_id", selectedCourse.id);

        if (existing && existing.length > 0)
            return toast.error("Already applied for this course ");



        // 🔥 Insert into Supabase
        const { data, error } = await client.from("applications").insert([
            {
                name: name,
                email: email,
                cnic: cnic,
                roll_no: rollNo,
                courseName: selectedCourse.name,
                course_id: selectedCourse.id,
            }
        ]);

        if (error) {
            console.log(error);
            toast.error("Something went wrong");
        } else {
            toast.success("Application submitted successfully ");

            // reset fields
            setName("");
            setEmail("");
            setCnic("");
            setRollNo("");

            // close modal
            setModalOpen(false);
        }

    }

    return (
        <>
            <Toaster position="top-right" />
            <PublicNavbar />
            <div className="space-y-6 px-6 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                        <h2 className="text-3xl font-serif font-bold">Explore Courses</h2>
                        <p className="text-md font-light ">Browse available courses and apply to start your learning journey.</p>
                    </div>

                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3">
                    {courses.map((allCourse, i) => (
                        <div
                            key={i}
                            className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-serif"
                        >
                            {/* Title + Status */}
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold truncate text-black tracking-wide">
                                    {allCourse.name}
                                </h2>

                                <span
                                    className={`px-3 py-1 text-xs rounded-full border font-medium ${allCourse.status
                                        ? "border-black text-black"
                                        : "border-black/40 text-black/50"
                                        }`}
                                >
                                    {allCourse.status ? "OPEN" : "CLOSED"}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-black/60 text-sm mb-4 line-clamp-3">
                                {allCourse.description}
                            </p>

                            {/* Info */}
                            <div className="flex justify-between text-sm text-black/60 mb-5">
                                <p className="flex items-center gap-1">
                                    <MdAccessTime /> {allCourse.duration}
                                </p>
                                <p className="flex items-center gap-1">
                                    <PiStudent /> {allCourse.instructor}
                                </p>
                            </div>

                            {/* Button */}
                            <button
                                onClick={() => handleApply(allCourse)}
                                disabled={!allCourse.status}
                                className={`w-full py-2.5 rounded-xl font-medium transition border ${allCourse.status
                                    ? "bg-black text-white hover:bg-gray-800 border-black"
                                    : "bg-white text-black/40 border-black/20 cursor-not-allowed"
                                    }`}
                            >
                                {allCourse.status ? "Apply Now" : "Not Available"}
                            </button>
                        </div>

                    ))}


                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 font-serif">

                    <div className="bg-white w-[90%] md:w-[500px] rounded-3xl p-6 shadow-2xl border border-black/10 relative">

                        {/* Close */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-black/40 hover:text-black text-xl"
                        >
                            ✕
                        </button>

                        {/* Title */}
                        <h2 className="text-2xl font-semibold text-black mb-1">
                            Apply for Course
                        </h2>

                        <p className="text-black/50 text-sm mb-5">
                            {selectedCourse?.name}
                        </p>

                        {/* Inputs */}
                        <div className="space-y-3">

                            <input
                                type="text"
                                value={name}
                                placeholder="Full Name"
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black transition"
                            />

                            <input
                                type="email"
                                value={email}
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black transition"
                            />

                            <input
                                type="text"
                                value={cnic}
                                placeholder="CNIC"
                                onChange={(e) => setCnic(e.target.value)}
                                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black transition"
                            />

                            <input
                                type="text"
                                value={rollNo}
                                placeholder="Roll Number"
                                onChange={(e) => setRollNo(e.target.value)}
                                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black transition"
                            />

                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-5">

                            <button
                                onClick={handleSubmit}
                                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
                            >
                                Submit
                            </button>

                            <button
                                onClick={() => setModalOpen(false)}
                                className="w-full border border-black/20 text-black py-3 rounded-xl hover:bg-black/5 transition"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>
                </div>


            )}

        </>
    )

}