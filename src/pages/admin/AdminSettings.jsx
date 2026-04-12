import { useState } from "react";
import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, FileText, LayoutDashboard, Settings, Users } from "lucide-react";
import { client } from "../../config/supabase";
import { useSelector } from "react-redux";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function AdminSettings() {

  const admin = useSelector((state) => state.auth.admin);
  const currentAdminUsername = admin?.username;

  console.log("Redux Admin:", currentAdminUsername);

  // Change Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confrmPass, setConfrmPass] = useState("");

  // Add Admin state
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle Change Password
  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) return alert("Fill fields");

    const { data } = await client
      .from("admins_login")
      .select("*")
      .eq("username", currentAdminUsername)
      .eq("password", oldPassword);

    if (!data || data.length === 0) {
      return alert("Old password incorrect");
    }
    if (newPassword !== confrmPass) return alert("New password and confirm password do not match");

    const { error } = await client
      .from("admins_login")
      .update({ password: newPassword })
      .eq("username", currentAdminUsername);

    if (!error) {
      alert("Password updated");
      setConfrmPass("")
      setNewPassword("")
      setOldPassword("")
    }
  };
  // Handle Add Admin
  const handleAddAdmin = async () => {
    if (!name || !username || !password) return alert("Fill all fields");

    const { data: existing, error: checkError } = await client
      .from("admins_login")
      .select("*")
      .eq("username", username);

    if (checkError) {
      console.log(checkError);
      return alert("Error checking username");
    }

    if (existing && existing.length > 0) {
      return alert("Username already exists");
    }

    const { error } = await client
      .from("admins_login")
      .insert([{ name, username, password }]);

    if (!error) {
      alert("New admin added successfully");
      setName("");
      setUsername("");
      setPassword("");
    } else {
      console.log(error);
      alert("Error adding admin");
    }
  };
  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-black">
          Admin Control Center
        </h1>
        <p className="text-black/60 font-serif mt-1">
          Manage password and admin accounts securely
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Change Password */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm
hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-serif">

          <h2 className="text-xl font-semibold mb-5 text-black">
            Change Password
          </h2>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-black/10
      focus:border-black outline-none transition"
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-black/10
      focus:border-black outline-none transition"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confrmPass}
              onChange={(e) => setConfrmPass(e.target.value)}
              className="w-full p-3 rounded-xl border border-black/10
      focus:border-black outline-none transition"
            />

            <button
              onClick={handleChangePassword}
              className="w-full bg-black text-white py-3 rounded-xl
      hover:bg-gray-900 transition font-medium"
            >
              Update Password
            </button>

          </div>
        </div>


        {/* Add Admin */}
        <div className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm
hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-serif">

          <h2 className="text-xl font-semibold mb-5 text-black">
            Add New Admin
          </h2>

          <div className="space-y-4">

            <input
              placeholder="Admin Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-black/10
      focus:border-black outline-none transition"
            />

            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-xl border border-black/10
      focus:border-black outline-none transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-xl border border-black/10
      focus:border-black outline-none transition"
            />

            <button
              onClick={handleAddAdmin}
              className="w-full bg-black text-white py-3 rounded-xl
      hover:bg-gray-900 transition font-medium"
            >
              Add Admin
            </button>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}