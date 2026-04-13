import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-md border-b border-black/10 font-serif">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-black text-white rounded-xl flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h1 className="font-bold text-lg">SMIT Connect Portal</h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-bold text-black/60 hover:text-black transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
        {/* Buttons */}
        <div className="flex gap-3">
          <Link to="/auth" className="px-4 py-2 text-sm border border-black rounded-xl hover:bg-black hover:text-white transition">
            Student Login
          </Link>

          <Link to="/admin/AdminLogin" className="px-4 py-2 text-sm bg-black text-white rounded-xl hover:opacity-80 transition">
            Admin Login
          </Link>
        </div>


        {/* Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white px-6 py-4 space-y-4">

          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block text-sm text-black/70 hover:text-black transition"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-3">

            <Link to="/auth">
              <button className="w-full py-2.5 rounded-xl border border-black/20 text-sm hover:bg-black/5 transition">
                Student Login
              </button>
            </Link>

            <Link to="/admin/AdminLogin">
              <button className="w-full py-2.5 rounded-xl bg-black text-white text-sm hover:bg-gray-800 transition">
                Admin Login
              </button>
            </Link>

          </div>

        </div>
      )}
    </nav>
  );
}
