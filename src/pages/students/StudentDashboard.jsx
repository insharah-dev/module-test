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

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1️⃣ Fetch logged-in user from users table
        const { data: usersData, error: usersError } = await client
          .from("users")
          .select("*")
          .limit(1); // assuming only one logged-in user for demo
        if (!usersError && usersData && usersData.length > 0) {
          const currentUser = usersData[0];
          setUser(currentUser);

          const userId = currentUser.user_id; // use this in queries

          // 2️⃣ Fetch enrolled courses
          const { data: coursesData, error: coursesError } = await client
            .from("applications")
            .select("course_id, course_name")

          if (!coursesError && coursesData) {
            const coursesWithRandom = coursesData.map(c => ({
              ...c,
              batch: `Batch ${getRandomInt(1, 20)}`,
              progress: getRandomInt(1, 100),
              status: "Active",
            }));
            setEnrolledCourses(coursesWithRandom);
          }

          // 3️⃣ Pending leaves
          const { data: leavesData, error: leavesError } = await client
            .from("leaves")
            .select("id")
            // .eq("user_id", userId)
            .eq("status", "Pending");
          if (!leavesError && leavesData) setPendingLeaves(leavesData.length);

          // 4️⃣ Approved leaves
          const { data: approvedData, error: approvedError } = await client
            .from("leaves")
            .select("id")
            // .eq("user_id", userId)
            .eq("status", "Approved");
          if (!approvedError && approvedData) setApprovedLeaves(approvedData.length);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <DashboardLayout navItems={navItems} title="Student Dashboard">
      <div className="flex flex-col gap-8 p-4">
        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold">
            Welcome back, {user ? user.name : "Student"}!
          </h2>
          <p className="text-gray-600">Here's your enrolled courses overview</p>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Enrolled Courses", value: enrolledCourses.length, icon: <BookOpen className="h-6 w-6 text-indigo-500" /> },
            { label: "Pending Leaves", value: pendingLeaves, icon: <FileText className="h-6 w-6 text-red-500" /> },
            { label: "Approved Leaves", value: approvedLeaves, icon: <FileText className="h-6 w-6 text-green-500" /> },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-4 p-4 border rounded-lg shadow-sm">
              <div>{s.icon}</div>
              <div>
                <p className="font-semibold text-lg">{s.value}</p>
                <p className="text-gray-500">{s.label}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Courses Section */}
        <section>
          <h3 className="text-xl font-semibold mb-4">My Courses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {enrolledCourses.map((c) => {
              const courseStatus = c.progress === 100 ? "Completed" : "Active";

              return (
                <div key={c.course_id} className="border rounded-lg p-4 flex flex-col gap-2 shadow-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{c.course_name}</h4>
                    <span className={`text-sm font-medium ${courseStatus === "Completed" ? "text-green-600" : "text-indigo-600"}`}>
                      {courseStatus}
                    </span>
                  </div>
                  <p className="text-gray-500">{c.batch}</p>

                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{c.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded transition-all duration-300 ${courseStatus === "Completed" ? "bg-green-500" : "bg-indigo-500"}`}
                        style={{ width: `${c.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
