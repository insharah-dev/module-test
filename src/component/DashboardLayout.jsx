// import { Link, useLocation } from "react-router-dom";
// import { GraduationCap, Menu, X, LogOut } from "lucide-react";
// import { useState } from "react";


// export function DashboardLayout({ children, navItems, title }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const location = useLocation();

//   return (
//     <div className="min-h-screen bg-background flex">
//       {/* Overlay */}
//       {sidebarOpen && (
//         <div className="fixed inset-0 z-40 bg-foreground/20 lg:hidden" onClick={() => setSidebarOpen(false)} />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-card border-r flex flex-col transition-transform lg:translate-x-0 ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <div className="flex items-center gap-2 h-16 px-5 border-b">
//           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
//             <GraduationCap className="h-4 w-4" />
//           </div>
//           <span className="font-bold text-sm">{title}</span>
//           <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
//           {navItems.map((item) => {
//             const active = location.pathname === item.to;
//             return (
//               <Link
//                 key={item.to}
//                 to={item.to}
//                 onClick={() => setSidebarOpen(false)}
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                   active
//                     ? "bg-accent text-accent-foreground"
//                     : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                 }`}
//               >
//                 {item.icon}
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>

//         <div className="p-3 border-t">
//           <Link to="/">
//             <button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground text-sm">
//               <LogOut className="h-4 w-4" /> Logout
//             </button>
//           </Link>
//         </div>
//       </aside>

//       {/* Main */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-card/90 backdrop-blur-md">
//           <button className="lg:hidden mr-3" onClick={() => setSidebarOpen(true)}>
//             <Menu className="h-5 w-5" />
//           </button>
//           <h1 className="font-semibold text-lg truncate">{title}</h1>
//         </header>
//         <main className="flex-1 p-4 md:p-6 overflow-auto">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }



import { Link, useLocation } from "react-router-dom";
import { GraduationCap, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";

export function DashboardLayout({ children, navItems, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
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

        {/* LOGOUT */}
        <div className="p-3 border-t border-black/10">
          <Link to="/">
            <button
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl
              text-black/70 hover:bg-black/5 hover:text-black transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </Link>
        </div>
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

          <h1 className="font-semibold text-lg text-black truncate">
            {title}
          </h1>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50/40 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
