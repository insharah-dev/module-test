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
        <h1 className="text-3xl font-bold font-serif">Admin Control Center</h1>
        <p className="text-gray-500 text-md font-light mt-1">
          Secure your account by updating password and manage system admins easily.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-5  ">
        {/* Change Password */}
        <div className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:scale-102 transition duration-300 p-5 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 font-serif">Change Password</h2>
          <div className="space-y-4">
            <div className="space-y-2">

              <input
                type="password"
                placeholder="Current Password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                className="w-full border-gray-300 outline-0 p-3 border rounded-lg font-serif text-sm"
              />
            </div>
            <div className="space-y-2">

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full border-gray-300 outline-0 p-3 border rounded-lg font-serif text-sm"
              />
            </div>
            <div className="space-y-2">

              <input
                type="password"
                placeholder="Confirm Password"
                value={confrmPass}
                onChange={e => setConfrmPass(e.target.value)}
                className="w-full border-gray-300 outline-0 p-3 border rounded-lg font-serif text-sm"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="w-full bg-green-600 text-white p-3 rounded-lg font-bold text-xl font-serif hover:bg-green-700"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Add Admin */}
        <div className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:scale-102 transition duration-300 p-5 border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 font-serif">Add New Admin</h2>
          <div className="space-y-4">
            <div className="space-y-2">

              <input
                placeholder="Admin name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border-gray-300 outline-0 p-3 border rounded-lg font-serif text-sm"
              />
            </div>
            <div className="space-y-2">

              <input
                placeholder="admin_username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full border-gray-300 outline-0 p-3 border rounded-lg font-serif text-sm"
              />
            </div>
            <div className="space-y-2">

              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full border-gray-300 outline-0 p-3 border rounded-lg font-serif text-sm"
              />
            </div>
            <button
              onClick={handleAddAdmin}
              className="w-full bg-green-600 text-white p-3 rounded-lg font-bold text-xl font-serif hover:bg-green-700"
            >
              Add Admin
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}