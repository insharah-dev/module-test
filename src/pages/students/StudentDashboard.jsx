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
        const storedUser = JSON.parse(localStorage.getItem("student"));

        if (!storedUser?.cnic) return;

        setUser(storedUser);

        const cnic = storedUser.cnic;

        // 2️⃣ Courses
        const { data: courses, error: courseError } = await client
          .from("applications")
          .select("*")
          .eq("cnic", cnic);

        if (!courseError) {
          setEnrolledCourses(courses || []);
        }

        // 3️⃣ Pending Leaves
        const { data: pending } = await client
          .from("leaves")
          .select("id")
          .eq("cnic", cnic)
          .eq("status", "Pending");

        setPendingLeaves(pending?.length || 0);

        // 4️⃣ Approved Leaves
        const { data: approved } = await client
          .from("leaves")
          .select("id")
          .eq("cnic", cnic)
          .eq("status", "Approved");

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
            Welcome back, {user ? user.name : "Student"}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {enrolledCourses.map((c) => {
              const courseStatus = c.progress >= 100 ? "Completed" : "Active";

              return (
                <div
                  key={c.id}
                  className="border border-black/10 rounded-2xl p-5 bg-white
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Title */}
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-lg">
                      {c.course_name || c.courseName}
                    </h4>

                    <span className="text-xs px-3 py-1 rounded-full border border-black/30 text-black/60">
                      {courseStatus}
                    </span>
                  </div>

                  {/* Batch */}
                  <p className="text-black/60 text-sm mb-4">
                    {c.batch || "Batch not assigned"}
                  </p>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{c.progress || 0}%</span>
                    </div>

                    <div className="h-2 bg-black/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black/70 transition-all duration-500"
                        style={{ width: `${c.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

          </div>
        </section>

      </div >

    </DashboardLayout >
  );
}
