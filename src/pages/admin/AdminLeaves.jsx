import { useState, useEffect } from "react";
import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, Check, Eye, FileText, LayoutDashboard, Settings, Users, X } from "lucide-react";
import { client } from "../../config/Supabase";
import toast, { Toaster } from "react-hot-toast";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

const statusColor = {
  Approved: "bg-green-500 text-white px-2 py-1 rounded",
  Pending: "bg-yellow-500 text-white px-2 py-1 rounded",
  Rejected: "bg-red-500 text-white px-2 py-1 rounded",
};

export default function AdminLeaves() {
  const [leaves, setLeaves] = useState([]);
  const [viewing, setViewing] = useState(null);

  // ✅ fetch all leaves
  const fetchLeaves = async () => {
    const { data, error } = await client
      .from("leaves")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setLeaves(data);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // ✅ update status
  const updateStatus = async (id, status) => {
    const { error } = await client
      .from("leaves")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update");
      return;
    }

    toast.success(`Leave ${status}`);
    fetchLeaves();
    setViewing(null);
  };

  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <Toaster position="top-right" />

      <div>
        <h2 className="text-3xl mb-2 font-serif font-bold">Leave Management</h2>
        <p className="text-md text-gray-800 mb-8 font-light">Review and manage student leave requests</p>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="p-4 text-left font-serif text-xl font-semibold">Name</th>
                  <th className="p-4 text-left font-serif text-xl font-semibold">Reason</th>
                  <th className="p-4 text-left font-serif text-xl font-semibold">From</th>
                  <th className="p-4 text-left font-serif text-xl font-semibold">To</th>
                  <th className="p-4 text-left font-serif text-xl font-semibold">Status</th>
                  <th className="p-4 text-left font-serif text-xl font-semibold">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {leaves.map((l, index) => (
                  console.log(l, "all leaves"),

                  <tr
                    key={l.id}
                    className={`border-b border-gray-200 transition duration-200 
              hover:bg-gray-50 hover:shadow-sm
              ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}
            `}
                  >
                    <td className="p-4 text-gray-600 text-lg font-serif">{l.fullName}</td>

                    <td className="p-4 text-gray-600 text-lg font-serif truncate">
                      {l.reason}
                    </td>

                    <td className="p-4 text-lg font-serif text-gray-500">{l.from}</td>
                    <td className="p-4 text-lg font-serif text-gray-500">{l.to}</td>

                    {/* STATUS */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full shadow-sm
                  ${l.status === "Approved" && "border border-green-700 text-green-700"}
                  ${l.status === "Pending" && "border border-yellow-700 text-yellow-700"}
                  ${l.status === "Rejected" && "border border-red-700 text-red-700"}
                `}
                      >
                        {l.status}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="p-4">
                      <div className="flex items-center gap-2">

                        {/* VIEW */}
                        <button
                          onClick={() => setViewing(l)}
                          className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition"
                        >
                          <Eye size={16} />
                        </button>

                        {l.status === "Pending" && (
                          <>
                            {/* APPROVE */}
                            <button
                              onClick={() => updateStatus(l.id, "Approved")}
                              className="p-2 rounded-lg hover:bg-green-100 text-green-600 transition"
                            >
                              <Check size={16} />
                            </button>

                            {/* REJECT */}
                            <button
                              onClick={() => updateStatus(l.id, "Rejected")}
                              className="p-2 rounded-lg hover:bg-red-100 text-red-600 transition"
                            >
                              <X size={16} />
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

      {/* VIEW MODAL */}
      {viewing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white w-[90%] sm:w-[380px] rounded-2xl shadow-2xl p-6 space-y-5 animate-scaleIn">

            {/* HEADER */}
            <div className="flex justify-between items-center border-gray-200 border-b pb-2">
              <h3 className="text-lg font-semibold">Leave Details</h3>
              <button
                onClick={() => setViewing(null)}
                className="text-gray-400 hover:text-red-500 text-lg"
              >
                ✕
              </button>
            </div>

            {/* CONTENT */}
            <div className="space-y-3 text-sm">

              <div className="flex justify-between">
                <span className="text-gray-500">Reason</span>
                <span className="font-medium text-gray-800 text-right max-w-[200px] truncate">
                  {viewing.reason}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">From</span>
                <span className="font-medium text-gray-800">{viewing.from}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">To</span>
                <span className="font-medium text-gray-800">{viewing.to}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500">Status</span>

                <span
                  className={`px-3 py-1 text-xs font-semibold font-serif rounded-full
              ${viewing.status === "Approved" && "bg-green-100 text-green-700"}
              ${viewing.status === "Pending" && "bg-yellow-100 text-yellow-700"}
              ${viewing.status === "Rejected" && "bg-red-100 text-red-700"}
            `}
                >
                  {viewing.status}
                </span>
              </div>

            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 pt-2">

              {viewing.status === "Pending" && (
                <>
                  <button
                    className="flex-1 font-serif font-bold bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                    onClick={() => updateStatus(viewing.id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="flex-1 font-serif font-bold bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    onClick={() => updateStatus(viewing.id, "Rejected")}
                  >
                    Reject
                  </button>
                </>
              )}

              <button
                className="flex-1 border font-serif font-bold border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
                onClick={() => setViewing(null)}
              >
                Close
              </button>

            </div>

          </div>
        </div>
      )}



    </DashboardLayout>
  );
}
