import { useState } from "react";
import { DashboardLayout } from "../../component/DashboardLayout";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { BookOpen, Check, Eye, FileText, LayoutDashboard, Settings, Users, X } from "lucide-react";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

const leavesData = [
  { id: 1, student: "Ahmed Khan", reason: "Medical appointment", from: "2026-04-07", to: "2026-04-08", status: "Pending" },
  { id: 2, student: "Sara Ali", reason: "Family emergency", from: "2026-04-01", to: "2026-04-02", status: "Approved" },
  { id: 3, student: "Usman Tariq", reason: "Personal work", from: "2026-03-20", to: "2026-03-20", status: "Rejected" },
  { id: 4, student: "Fatima Noor", reason: "Travel", from: "2026-04-10", to: "2026-04-12", status: "Pending" },
];

const statusColor = {
  Approved: "bg-success text-success-foreground",
  Pending: "bg-warning text-warning-foreground",
  Rejected: "bg-destructive text-destructive-foreground",
};

export default function AdminLeaves() {
  const [viewing, setViewing] = useState(null);

  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold">Leave Management</h2>
          <p className="text-sm text-muted-foreground">Review and manage student leave requests</p>
        </div>

        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3 font-medium">Student</th>
                  <th className="text-left p-3 font-medium hidden sm:table-cell">Reason</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">From</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">To</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leavesData.map((l) => (
                  <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-medium">{l.student}</td>
                    <td className="p-3 text-muted-foreground hidden sm:table-cell">{l.reason}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{l.from}</td>
                    <td className="p-3 text-muted-foreground hidden md:table-cell">{l.to}</td>
                    <td className="p-3">
                      <button className={statusColor[l.status]}>{l.status}</button>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <button variant="ghost" size="sm" onClick={() => setViewing(l)}>
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        {l.status === "Pending" && (
                          <>
                            <button variant="ghost" size="sm" className="text-success hover:text-success">
                              <Check className="h-3.5 w-3.5" />
                            </button>
                            <button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div open={!!viewing} onOpenChange={() => setViewing(null)}>
        <div className="sm:max-w-md">
          <div>
            <div>Leave Request Details</div>
          </div>
          {viewing && (
            <div className="space-y-3 py-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Student</span><span className="font-medium">{viewing.student}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Reason</span><span className="font-medium">{viewing.reason}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">From</span><span>{viewing.from}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">To</span><span>{viewing.to}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><Badge className={statusColor[viewing.status]}>{viewing.status}</Badge></div>
            </div>
          )}
          <div>
            {viewing?.status === "Pending" && (
              <>
                <button variant="outline" className="text-destructive" onClick={() => setViewing(null)}>Reject</button>
                <button className="bg-success text-success-foreground hover:bg-success/90" onClick={() => setViewing(null)}>Approve</button>
              </>
            )}
            {viewing?.status !== "Pending" && (
              <button variant="outline" onClick={() => setViewing(null)}>Close</button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
