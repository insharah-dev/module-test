import { useState, useEffect } from "react";
import { DashboardLayout } from "../../component/DashboardLayout";
import { Upload, BookOpen, ClipboardList, FileText } from "lucide-react";
import { client } from "../../config/supabase";
import toast, { Toaster } from "react-hot-toast";

export default function StudentLeaves() {
    const navItems = [
        { label: "My Courses", to: "/student/dashboard", icon: <BookOpen className="h-4 w-4" /> },
        { label: "Apply for Course", to: "/courses", icon: <ClipboardList className="h-4 w-4" /> },
        { label: "Leave Requests", to: "/student/leaves", icon: <FileText className="h-4 w-4" /> },
    ];

    const [form, setForm] = useState({
        reason: "",
        from: "",
        to: "",
    });

    const [leaves, setLeaves] = useState([]);

    // 🔥 get current user
    const student = JSON.parse(localStorage.getItem("student"));

    // ✅ handle input
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "attachment") {
            setForm({ ...form, attachment: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    // ✅ fetch leaves
    const fetchLeaves = async () => {
        const { data, error } = await client
            .from("leaves")
            .select("*")
            .eq("student_id", student?.id)
            .order("id", { ascending: false });

        console.log(student?.id);

        if (!error) setLeaves(data);
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    // ✅ submit
    const handleSubmit = async () => {
        if (!form.reason || !form.from || !form.to) {
            return toast.error("All fields required");
        }


        try {


            // 🔥 insert leave
            const { error } = await client.from("leaves").insert([
                {
                    student_id: student?.id,
                    reason: form.reason,
                    from: form.from,
                    to: form.to,
                    status: "Pending",
                },
            ]);

            if (error) {
                toast.error("Failed to submit");
                return;
            }

            toast.success("Leave submitted");

            // reset form
            setForm({
                reason: "",
                from: "",
                to: "",
            });

            fetchLeaves();
        } catch (err) {
            toast.error("Something went wrong");
            console.log(err);
        }
    };

    return (
        <DashboardLayout navItems={navItems} title="Student Dashboard">
            <Toaster position="top-right" />

            <div className="space-y-8">

                <div className="space-y-10 font-serif">

                    {/* FORM */}
                    <div className="bg-white border border-black/10 rounded-2xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

                        <h2 className="text-2xl font-semibold mb-6 text-black tracking-wide">
                            Submit Leave Request
                        </h2>

                        <div className="grid gap-5 sm:grid-cols-2">

                            {/* Reason */}
                            <div className="sm:col-span-2">
                                <label className="text-sm text-black/70 mb-1 block">Reason</label>
                                <textarea
                                    name="reason"
                                    value={form.reason}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Write your reason..."
                                    className="w-full border border-black/20 rounded-xl p-3 bg-white
          focus:outline-none focus:border-black transition"
                                />
                            </div>

                            {/* From */}
                            <div>
                                <label className="text-sm text-black/70 mb-1 block">From Date</label>
                                <input
                                    type="date"
                                    name="from"
                                    value={form.from}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 rounded-xl p-3
          focus:outline-none focus:border-black transition"
                                />
                            </div>

                            {/* To */}
                            <div>
                                <label className="text-sm text-black/70 mb-1 block">To Date</label>
                                <input
                                    type="date"
                                    name="to"
                                    value={form.to}
                                    onChange={handleChange}
                                    className="w-full border border-black/20 rounded-xl p-3
          focus:outline-none focus:border-black transition"
                                />
                            </div>

                            {/* BUTTON */}
                            <div className="sm:col-span-2">
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-black text-white py-3 rounded-xl
          hover:bg-gray-800 transition shadow-md"
                                >
                                    Submit Request
                                </button>
                            </div>

                        </div>
                    </div>


                    {/* TABLE */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-black tracking-wide">
                            Leave History
                        </h3>

                        <div className="border border-black/10 rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm font-serif">

                                    {/* HEADER */}
                                    <thead>
                                        <tr className="bg-black text-white">
                                            <th className="p-4 text-left font-medium">Reason</th>
                                            <th className="p-4 text-left font-medium">From</th>
                                            <th className="p-4 text-left font-medium">To</th>
                                            <th className="p-4 text-left font-medium">Status</th>
                                        </tr>
                                    </thead>

                                    {/* BODY */}
                                    <tbody>
                                        {leaves.map((l, index) => (
                                            <tr
                                                key={l.id}
                                                className={`border-b border-black/10 transition
                hover:bg-black/5
                ${index % 2 === 0 ? "bg-white" : "bg-black/[0.02]"}`}
                                            >

                                                <td className="p-4 text-black/80 max-w-[200px] truncate">
                                                    {l.reason}
                                                </td>

                                                <td className="p-4 text-black/60">{l.from}</td>
                                                <td className="p-4 text-black/60">{l.to}</td>

                                                {/* STATUS */}
                                                <td className="p-4">
                                                    <span
                                                        className={`px-3 py-1 text-xs rounded-full border
                      ${l.status === "Approved" && "border-green-600 text-green-600"}
                      ${l.status === "Pending" && "border-yellow-600 text-yellow-600"}
                      ${l.status === "Rejected" && "border-red-600 text-red-600"}
                    `}
                                                    >
                                                        {l.status}
                                                    </span>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>

                        </div>
                    </div>

                </div>



            </div>
        </DashboardLayout>
    );
}