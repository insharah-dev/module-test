import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, FileText, LayoutDashboard, Search, Settings, Upload, Users } from "lucide-react";
import { client } from "../../config/supabase";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchStudents = async () => {
    const { data, error } = await client.from("students").select("*");
    if (!error) setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formattedData = jsonData.map((item) => ({
        name: item.Name,
        cnic: item.CNIC,
        roll_number: item["Roll Number"],
        email: item.Email,
      }));

      const { error } = await client.from("students").insert(formattedData);

      if (!error) {
        alert("Students Uploaded Successfully");
        fetchStudents();
      } else {
        alert("Error uploading students");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-serif font-bold text-black">
              Student Management
            </h2>
            <p className="text-black/60 font-serif">
              Manage all registered students
            </p>
          </div>

          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-black/10
    bg-black text-white font-serif font-medium cursor-pointer
    hover:bg-gray-900 transition-all duration-300">
            <Upload className="h-4 w-4" />
            Upload Excel
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>


        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />

          <input
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-xl border border-black/10
    bg-white text-black font-serif outline-none
    focus:border-black transition"
          />
        </div>


        {/* Table */}
        <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-serif">

              {/* HEADER */}
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">CNIC</th>
                  <th className="p-4 text-left">Roll No</th>
                  <th className="p-4 text-left">Email</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className="border-b border-black/5 hover:bg-black/5 transition"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4 text-black/70">{student.cnic}</td>
                    <td className="p-4 text-black/70">{student.roll_number}</td>
                    <td className="p-4 text-black/70">{student.email}</td>
                  </tr>
                ))}

                {/* EMPTY STATE */}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-black/50 font-serif"
                    >
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}