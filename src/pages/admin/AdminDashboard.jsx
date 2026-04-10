import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, FileText, Settings, Users, LayoutDashboard } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

const stats = [
  { label: "Total Students", value: "1,248", change: "+12%", icon: <Users className="h-5 w-5 text-accent" /> },
  { label: "Active Courses", value: "24", change: "+3", icon: <BookOpen className="h-5 w-5 text-success" /> },
  { label: "Pending Leaves", value: "18", change: "-5", icon: <FileText className="h-5 w-5 text-warning" /> },
  { label: "New Admissions", value: "87", change: "+24%", icon: <LayoutDashboard className="h-5 w-5 text-accent" /> },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Admin Dashboard</h2>
          <p className="text-sm text-muted-foreground">Overview of SMIT Connect Portal</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">{s.icon}</div>
                <span className="text-xs font-medium text-success">{s.change}</span>
              </div>
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { text: "New student registered: Ahmed Khan", time: "2 mins ago" },
              { text: "Course 'AI & ML' applications closed", time: "1 hour ago" },
              { text: "Leave approved for Sara Ali", time: "3 hours ago" },
              { text: "New course 'Blockchain' added", time: "Yesterday" },
            ].map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <p className="text-sm">{a.text}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
