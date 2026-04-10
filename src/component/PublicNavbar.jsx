import { Link } from "react-router-dom";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";


export function PublicNavbar() {
  const [open, setOpen] = useState(false);


  return (
    <nav className="sticky top-0 z-50 border-b shadow-lg border-gray-200 backdrop-blur-md">
      <div className="container flex px-6 h-16 items-center justify-between">
        <Link to="/home" className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-bold font-serif">SMIT Connect</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to={'/home'}
            className="text-md font-bold text-gray-500 hover:text-red-500">
            Home
          </Link>
          <Link to={'/courses'}
            className="text-md font-bold text-gray-500 hover:text-red-500">
            Courses
          </Link>

          <Link to="/student/dashboard">
            <button className='px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 text-md font-medium'>Student Login</button>
          </Link>
          <Link to="/admin/dashboard">
            <button className='px-3 py-1.5 text-white rounded-lg border bg-red-500 text-md font-medium'>Admin Login</button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t bg-card p-4 space-y-3 animate-fade-in">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="block text-sm font-medium text-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/student/dashboard" className="flex-1">
              <button className="w-full px-5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-md font-medium">Student Login</button>
            </Link>
            <Link to="/admin/dashboard" className="flex-1">
              <button size="sm" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Admin</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
