import { useState, useEffect } from "react";
import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, ClipboardList, FileText } from "lucide-react";
import { client } from "../../config/supabase";

const navItems = [
  { label: "My Courses", to: "/student/dashboard", icon: <BookOpen /> },
  { label: "Apply for Course", to: "/courses", icon: <ClipboardList /> },
  { label: "Leave Requests", to: "/student/leaves", icon: <FileText /> },
];

export default function StudentDashboard() {

  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [approvedLeaves, setApprovedLeaves] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("student") || "{}");

        if (!storedUser?.cnic) return;

        setUser(storedUser);

        const student_id = storedUser.id;

        const cnic = storedUser.cnic;

        const { data: courses, error } = await client
          .from("applications")
          .select("*")
          .eq("cnic", cnic);

        console.log("cnic:", cnic);
        console.log("COURSES:", courses, error);

        if (!error) {
          setEnrolledCourses(courses || []);
        }

        // ✅ PENDING LEAVES
        const { data: pending, error: pendingError } = await client
          .from("leaves")
          .select("id")
          .eq("student_id", student_id)
          .eq("status", "Pending");

        console.log("Pending:", pending, pendingError); // DEBUG

        setPendingLeaves(pending?.length || 0);

        // ✅ APPROVED LEAVES
        const { data: approved, error: approvedError } = await client
          .from("leaves")
          .select("id")
          .eq("student_id", student_id)
          .eq("status", "Approved");

        console.log("Approved:", approved, approvedError); // DEBUG

        setApprovedLeaves(approved?.length || 0);

      } catch (err) {
        console.log("Dashboard Error:", err);
      }
    };

    fetchData();
  }, []);


  return (
    <DashboardLayout navItems={navItems} title="Student Dashboard">

      <div className="flex flex-col gap-10 p-6 font-serif bg-white text-black">

        {/* WELCOME */}
        <section className="border-b pb-5">
          <h2 className="text-3xl font-semibold tracking-wide">
            Welcome back, {user?.name || "Student"}
          </h2>
          <p className="text-black/60 mt-1">
            Your learning progress and activity overview
          </p>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          {[
            {
              label: "Enrolled Courses",
              value: enrolledCourses.length,
              icon: <BookOpen className="h-5 w-5" />
            },
            {
              label: "Pending Leaves",
              value: pendingLeaves,
              icon: <FileText className="h-5 w-5" />
            },
            {
              label: "Approved Leaves",
              value: approvedLeaves,
              icon: <FileText className="h-5 w-5" />
            },
          ].map((s, i) => (
            <div
              key={i}
              className="group border border-black/10 rounded-2xl py-8 px-5 flex items-center gap-4
             bg-black hover:scale-[1.03] hover:shadow-xl transition-all duration-300">

              <div className="p-3 border rounded-xl 
              border-white/20 transition">
                <span className="text-white transition">
                  {s.icon}
                </span>
              </div>

              <div>
                <p className="text-2xl font-bold transition text-white">
                  {s.value}
                </p>

                <p className="text-sm transition text-white/70">
                  {s.label}
                </p>
              </div>
            </div>
          ))}

        </section>

        {/* COURSES */}
        <section>
          <h3 className="text-xl font-semibold mb-5 border-b pb-2">
            My Courses
          </h3>

          {enrolledCourses.length === 0 ? (
            <p className="text-center text-black/50 mt-10">
              No courses enrolled yet 📚
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

              {enrolledCourses.map((c) => {
                const courseStatus = "Active";

                return (
                  <div
                    key={c.id}
                    className="group relative border border-black/10 rounded-2xl p-5 
            bg-gradient-to-br from-white to-gray-50
            hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >

                    {/* STATUS BADGE */}
                    <span className="absolute top-4 right-4 text-xs px-3 py-1 rounded-full 
              bg-black text-white">
                      {courseStatus}
                    </span>

                    {/* ICON */}
                    <div className="mb-4 w-12 h-12 flex items-center justify-center 
              rounded-xl bg-black text-white">
                      <BookOpen className="w-5 h-5" />
                    </div>

                    {/* TITLE */}
                    <h4 className="font-semibold text-lg mb-1">
                      {c.courseName}
                    </h4>

                    {/* SUB INFO */}
                    <p className="text-sm text-black/60 mb-3">
                      CNIC: {c.cnic}
                    </p>

                    {/* EMAIL */}
                    <p className="text-xs text-black/50">
                      Email: {c.email}
                    </p>

                    {/* Roll no */}
                    <p className="text-xs text-black/50">
                      Roll: {c.roll_no}
                    </p>


                  </div>
                );
              })}

            </div>
          )}
        </section>

      </div >

    </DashboardLayout >
  );
}
