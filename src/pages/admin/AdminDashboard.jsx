import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, FileText, Settings, Users, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "../../config/Supabase";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function AdminDashboard() {

  const [stats, setStats] = useState([
    { label: "Total Students", value: 0, icon: <Users className="h-5 w-5" /> },
    { label: "Active Courses", value: 0, icon: <BookOpen className="h-5 w-5" /> },
    { label: "Pending Leaves", value: 0, icon: <FileText className="h-5 w-5" /> },
    { label: "New Admissions", value: 0, icon: <LayoutDashboard className="h-5 w-5" /> },
  ]);

  useEffect(() => {
    fetchData();
    fetchActivities();
  }, []);

  const fetchData = async () => {
    try {
      const { count: studentsCount } = await client
        .from("students")
        .select("*", { count: "exact", head: true });

      const { count: coursesCount } = await client
        .from("AdminCourse")
        .select("*", { count: "exact", head: true })
        .eq("status", true);

      const { count: leavesCount } = await client
        .from("leaves")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending");

      const { count: applicationsCount } = await client
        .from("applications")
        .select("*", { count: "exact", head: true });

      setStats([
        {
          label: "Total Students",
          value: studentsCount ?? 0,
          icon: <Users className="h-5 w-5" />,
        },
        {
          label: "Active Courses",
          value: coursesCount ?? 0,
          icon: <BookOpen className="h-5 w-5" />,
        },
        {
          label: "Pending Leaves",
          value: leavesCount ?? 0,
          icon: <FileText className="h-5 w-5" />,
        },
        {
          label: "New Admissions",
          value: applicationsCount ?? 0,
          icon: <LayoutDashboard className="h-5 w-5" />,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const [activities, setActivities] = useState([]);

  const fetchActivities = async () => {
    try {
      // Latest students
      const { data: students } = await client
        .from("students")
        .select("name, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      // Latest leaves
      const { data: leaves } = await client
        .from("leaves")
        .select("fullName, status, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      // Latest applications
      const { data: apps } = await client
        .from("applications")
        .select("name, created_at")
        .order("created_at", { ascending: false })
        .limit(3);

      let allActivities = [];

      students?.forEach(s => {
        allActivities.push({
          text: `${s.name} joined as student`,
          time: s.created_at
        });
      });

      leaves?.forEach(l => {
        allActivities.push({
          text: `Leave request by ${l.fullName} (${l.status})`,
          time: l.created_at
        });
      });

      apps?.forEach(a => {
        allActivities.push({
          text: `New admission by ${a.name}`,
          time: a.created_at
        });
      });

      // sort latest first
      allActivities.sort((a, b) => new Date(b.time) - new Date(a.time));

      setActivities(allActivities.slice(0, 6));

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <div className="space-y-8 bg-white text-black min-h-screen">

        {/* Heading */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Admin Dashboard
          </h2>
          <p className="text-sm text-black/60 mt-1">
            Overview of SMIT Connect Portal
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group rounded-2xl border border-black/10 bg-white p-5 
            shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">

                {/* Icon */}
                <div className="h-11 w-11 rounded-xl bg-black text-white flex items-center justify-center 
              group-hover:scale-110 transition">
                  {s.icon}
                </div>

              </div>

              {/* Value */}
              <p className="text-2xl font-bold">{s.value}</p>

              {/* Label */}
              <p className="text-sm text-black/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Activity */}
        <div>
          <h3 className="font-semibold text-xl mb-4">
            Recent Activity
          </h3>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">

            <div className="space-y-4">

              {activities.length === 0 ? (
                <p className="text-sm text-black/50 text-center py-6">
                  No activity yet 📭
                </p>
              ) : (
                activities.map((a, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b border-black/10 pb-3 last:border-none"
                  >
                    <p className="text-sm text-black/80">
                      {a.text}
                    </p>

                    <span className="text-xs text-black/40">
                      {new Date(a.time).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}

            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}








// return (
//   <DashboardLayout navItems={navItems} title="Admin Panel">
//     <div className="space-y-8 bg-[#0f0f0f] text-white min-h-screen p-6">

//       {/* Heading */}
//       <div>
//         <h2 className="text-2xl font-bold tracking-wide">Dashboard Overview</h2>
//         <p className="text-sm text-gray-400">Welcome to SMIT Admin Panel</p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {stats.map((s) => (
//           <div
//             key={s.label}
//             className="group rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111] p-5 shadow-lg hover:shadow-xl hover:-translate-y-1 transition duration-300"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <div className="h-11 w-11 rounded-xl bg-white text-black flex items-center justify-center shadow">
//                 {s.icon}
//               </div>

//               <span className="text-xs text-gray-400 group-hover:text-white transition">
//                 Stats
//               </span>
//             </div>

//             <p className="text-3xl font-bold">{s.value}</p>
//             <p className="text-sm text-gray-400 mt-1">{s.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Recent Activity */}
//       <div>
//         <h3 className="font-semibold text-xl mb-4">Recent Activity</h3>

//         <div className="rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#111] p-6 shadow-lg">

//           {activities.length === 0 ? (
//             <p className="text-sm text-gray-400">No activity yet</p>
//           ) : (
//             <div className="space-y-5">
//               {activities.map((a, i) => (
//                 <div key={i} className="flex items-start gap-4">

//                   {/* timeline dot */}
//                   <div className="mt-1 h-3 w-3 rounded-full bg-white"></div>

//                   <div className="flex-1 border-b border-gray-800 pb-3">
//                     <p className="text-sm">{a.text}</p>
//                     <span className="text-xs text-gray-500">
//                       {new Date(a.time).toLocaleString()}
//                     </span>
//                   </div>

//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </div>

//     </div>
//   </DashboardLayout>
// );
