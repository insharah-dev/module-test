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

      <div className="flex flex-col gap-5 font-serif bg-white text-black">

        {/* WELCOME */}
        <section>
          <h2 className="text-3xl font-semibold tracking-wide">
            My Learning Dashboard
          </h2>
          <p className="text-black/60 mt-1">
            Overview of your courses, leaves and activity
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
              className="rounded-2xl border border-black/10 bg-white p-5 
      shadow-sm hover:shadow-lg transition hover:scale-103 duration-300"
            >
              <div className="flex items-center justify-between mb-3">

                <div className="h-10 w-10 rounded-lg bg-black text-white flex items-center justify-center">
                  {s.icon}
                </div>

              </div>

              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-sm text-black/60">{s.label}</p>
            </div>
          ))}

        </section>

        {/* COURSES */}
        <section>
          <h3 className="text-2xl font-semibold mb-5">
            My Courses
          </h3>

          {enrolledCourses.length === 0 ? (
            <p className="text-center text-2xl text-black/50 mt-10">
              No courses enrolled yet 📚
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

              {enrolledCourses.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-black/10 bg-white p-5 
          shadow-sm hover:shadow-lg transition duration-300 hover:scale-103"
                >

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-2xl text-black">
                        {c.courseName}
                      </h4>
                      <p className="text-xs text-black/40 mt-1">
                        Enrolled Course
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-black text-white">
                      Active
                    </span>
                  </div>



                  {/* INFo */}
                  <div className="grid grid-cols-1 gap-2 text-sm text-black/60">

                    <div className="flex justify-between border-b border-black/5 pb-2">
                      <span className="text-black/40">CNIC</span>
                      <span>{c.cnic}</span>
                    </div>

                    <div className="flex justify-between border-b border-black/5 pb-2">
                      <span className="text-black/40">Email</span>
                      <span>{c.email}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-black/40">Roll No</span>
                      <span className="font-medium text-black">{c.roll_no}</span>
                    </div>

                  </div>


                </div>
              ))}

            </div>
          )}
        </section>
      </div >

    </DashboardLayout >
  );
}
