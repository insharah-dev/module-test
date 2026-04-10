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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl font-serif font-bold">Student Management</h2>
            <p className="text-md font-light">Manage all registered students</p>
          </div>

          <label className="px-5 py-2.5 rounded-xl border border-gray-200 bg-blue-500 text-lg font-bold font-serif hover:scale-105 flex items-center gap-2 text-white cursor-pointer transition duration-300">
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
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input size={50}
            placeholder="Search students by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-4  shadow-sm rounded-3xl font-serif border border-gray-100 py-3 outline-none"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 transition duration-300 hover:scale-102 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border-b border-gray-100 font-serif tracking-wide text-xl text-left ">ID</th>
                  <th className="p-3 border-b border-gray-100 font-serif tracking-wide text-xl text-left ">Name</th>
                  <th className="p-3 border-b border-gray-100 font-serif tracking-wide text-xl text-left ">CNIC</th>
                  <th className="p-3 border-b border-gray-100 font-serif tracking-wide text-xl text-left ">Roll No</th>
                  <th className="p-3 border-b border-gray-100 font-serif tracking-wide text-xl text-left ">Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b border-gray-100 text-lg font-serif">{index + 1}</td>
                    <td className="p-3 border-b border-gray-100 text-lg font-serif">{student.name}</td>
                    <td className="p-3 border-b border-gray-100 text-lg font-serif">{student.cnic}</td>
                    <td className="p-3 border-b border-gray-100 text-lg font-serif">{student.roll_number}</td>
                    <td className="p-3 border-b border-gray-100 text-lg font-serif">{student.email}</td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center font-serif text-2xl font-bold py-5 text-gray-500">
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