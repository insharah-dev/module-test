import { useState, useEffect } from "react";
import { client } from "../config/supabase";
import { MdAccessTime } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import toast from "react-hot-toast";
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
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-102 transition duration-300 p-5 border border-gray-100"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-md lg:text-lg font-extrabold truncate font-serif text-[#003b46] ">
                                    {allCourse.name}
                                </h2>
                                <span
                                    className={`px-3 py-1 font-serif text-xs font-bold tracking-wide rounded-full ${allCourse.status
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {allCourse.status ? "Open" : "Closed"}
                                </span>
                            </div>

                            <p className="text-gray-600 text-sm font-serif mb-3 line-clamp-3">{allCourse.description}</p>

                            <div className="text-sm flex gap-2.5 items-center justify-between text-gray-700 space-y-1">
                                <p className="font-semibold text-xs flex items-center font-serif gap-1 ">
                                    <MdAccessTime /> {allCourse.duration}
                                </p>
                                <p className="font-semibold text-xs flex items-center font-serif gap-1">
                                    <PiStudent />{allCourse.instructor}
                                </p>

                            </div>
                            <button
                                onClick={() => handleApply(allCourse)}

                                disabled={!allCourse.status}
                                className={`px-5 py-2.5 border rounded-xl w-full mt-6 text-lg font-bold font-serif transition
                                  ${allCourse.status
                                        ? "border-gray-200 text-white bg-green-500 hover:bg-green-600 cursor-pointer"
                                        : "border-gray-300 text-gray-500 bg-gray-200 cursor-not-allowed opacity-70"
                                    }`}
                            >
                                {allCourse.status ? 'Apply Now' : 'Disabled'}
                            </button>



                        </div>

                    ))}


                </div>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

                    <div className="bg-white w-[90%] md:w-[500px] rounded-2xl p-6 shadow-xl relative">

                        {/* Close */}
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-3 right-4 text-gray-500 text-xl"
                        >
                            ✕
                        </button>

                        {/* Heading */}
                        <h2 className="text-2xl font-bold mb-1 font-serif">
                            Apply for Course
                        </h2>

                        <p className="text-gray-500 mb-4">
                            Apply for <span className="font-semibold">{selectedCourse?.name}</span>
                        </p>



                        <input type="text" value={name} placeholder="Full Name" onChange={(e) => setName(e.target.value)} className="w-full my-1.5 border p-2 rounded-lg" />
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full my-1.5 border p-2 rounded-lg" />
                        <input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="CNIC" className="w-full my-1.5 border p-2 rounded-lg" />
                        <input type="text" value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="Roll Number" className="w-full my-1.5 border p-2 rounded-lg" />


                        <div className="flex gap-3 pt-3">
                            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-lg w-full">
                                Submit
                            </button>

                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="bg-gray-200 px-4 py-2 rounded-lg w-full"
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