import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { client } from "../config/Supabase";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function DashboardLayout({ children, navItems, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await client.auth.signOut();

    if (error) {
      toast.error("Logout failed");
      console.log(error);
      return;
    }

    const student = localStorage.getItem("student");
    const admin = localStorage.getItem("admin");

    // clear storage
    localStorage.removeItem("student");
    localStorage.removeItem("admin");

    // role based toast
    if (admin) {
      toast.success("Admin logout successful");
    } else if (student) {
      toast.success("Student logout successful");
    } else {
      toast.success("Logout successful");
    }

    // redirect after short delay (for toast visibility)
    setTimeout(() => {
      navigate("/");
    }, 800);
  };




  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-white flex font-serif">

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}
        <aside
          className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64
          bg-white border-r border-black/10
          flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >

          {/* Logo */}
          <div className="flex items-center gap-2 h-16 px-5 border-b border-black/10">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <GraduationCap className="h-5 w-5" />
            </div>

            <span className="font-bold text-sm tracking-wide text-black">
              {title}
            </span>

            <button
              className="ml-auto lg:hidden text-black"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* NAV */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">

            {navItems.map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${active
                      ? "bg-black text-white"
                      : "text-black/70 hover:bg-black/5 hover:text-black"
                    }
                `}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl
  text-black/70 hover:bg-black/5 hover:text-black transition"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>

        </aside>

        {/* MAIN */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* TOP BAR */}
          <header className="sticky top-0 z-30 flex items-center h-16 px-4
        border-b border-black/10 bg-white/80 backdrop-blur-md">

            <button
              className="lg:hidden mr-3 text-black"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>

          </header>

          {/* CONTENT */}
          <main className="flex-1 p-4 md:p-6 bg-gray-50/40 overflow-auto">
            {children}
          </main>

        </div>
      </div>
    </>
  );
}
