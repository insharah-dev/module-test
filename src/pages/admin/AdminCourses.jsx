import { useState, useEffect } from "react";
import { DashboardLayout } from "../../component/DashboardLayout";
import { BookOpen, FileText, LayoutDashboard, Plus, Settings, Users } from "lucide-react";
import { client } from "../../config/supabase";
import { MdAccessTime } from "react-icons/md";
import { PiStudent } from "react-icons/pi";
import { FaRegEdit } from "react-icons/fa";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: "Students", to: "/admin/students", icon: <Users className="h-4 w-4" /> },
  { label: "Courses", to: "/admin/courses", icon: <BookOpen className="h-4 w-4" /> },
  { label: "Leave Requests", to: "/admin/leaves", icon: <FileText className="h-4 w-4" /> },
  { label: "Settings", to: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
];

export default function AdminCourses() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [instructor, setInstructor] = useState("");
  const [courseStatus, setCourseStatus] = useState(true); // true = Open, false = Closed
  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await client.from("AdminCourse").select("*");
      if (!error) setCourses(data);
      else console.log(error);
    };
    fetchCourses();
  }, []);

  // Open Add Modal
  const handleAddCourse = () => {
    setCourseName("")
    setCourseStatus(true)
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleEditCourse = (id, course, status) => {
    setEditId(id);
    setCourseName(course);
    setCourseStatus(status);
    setEditModal(true);
  };

  // Edit course
  const handleEdit = async () => {
    const { data, error } = await client
      .from("AdminCourse")
      .update({ name: courseName, status: courseStatus })
      .eq("id", editId)
      .select();

    if (!error) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editId ? { ...course, name: courseName, status: courseStatus } : course
        )
      );
      setEditModal(false);
      alert("Course updated successfully!");
    } else {
      console.log(error);
    }
  };

  // Save/Add course
  const handleSaveCourse = async () => {
    if (!courseName || !description || !instructor || !duration) return alert("All fields are required");

    const { data, error } = await client
      .from("AdminCourse")
      .insert({ name: courseName, description, instructor, duration, status: courseStatus })
      .select();

    if (error) {
      console.log(error.message);
    } else {
      alert("Course added successfully!");
      setModalOpen(false);
      setCourseName("");
      setCourseStatus(true);
      setDescription("");
      setDuration("");
      setInstructor("");
    }
  };

  return (
    <DashboardLayout navItems={navItems} title="Admin Panel">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-3xl font-serif font-bold">Course Management</h2>
            <p className="text-md font-light ">Manage available courses</p>
          </div>
          <button
            className="px-5 py-2.5 rounded-xl bordeer border-gray-200 bg-blue-500 text-lg font-bold font-serif hover:scale-103 flex items-center gap-2 text-white transition duration-300"
            onClick={handleAddCourse}
          >
            <Plus className="h-6 w-6" /> Add Course
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3">
          {courses.map((allCourse, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-102 transition duration-300 p-5 border border-gray-100"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-md lg:text-lg font-extrabold font-serif text-[#003b46] ">
                  {allCourse.name}
                </h2>
                <span
                  className={`px-3 py-1 font-serif text-xs font-bold tracking-wide rounded-full ${allCourse.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {allCourse.status ? "Open" : "Closed"}
                </span>
              </div>

              <p className="text-gray-600 text-sm font-serif mb-3 line-clamp-3">{allCourse.description}</p>

              <div className="text-sm flex gap-2.5 items-center justify-between text-gray-700 space-y-1">
                <p className="font-semibold text-xs flex items-center font-serif gap-1 ">
                  <MdAccessTime /> {allCourse.duration}
                </p>
                <p className="font-semibold text-xs flex items-center font-serif gap-1">
                  <PiStudent />{allCourse.instructor}
                </p>
              </div>

              <button
                onClick={() => handleEditCourse(allCourse.id, allCourse.name, allCourse.status)}
                className="px-3 py-1.5 text-red-700 hover:bg-red-700 hover:text-white transition duration-300 border rounded-lg mt-3 text-sm font-serif font-semibold flex items-center gap-1"
              >
                <FaRegEdit className="mb-0.5" />Edit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl px-3 pt-5 pb-3 w-full max-w-sm">
            <h3 className="text-xl font-serif font-semibold mb-4"> Add Course</h3>

            <div className="space-y-2.5">
              <input
                type="text"
                className="px-2 py-2 border border-gray-200 rounded-md text-sm font-serif font-medium outline-0 w-full"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course name"
              />

              <input
                type="text"
                className="px-2 py-2 border border-gray-200 rounded-md text-sm font-serif font-medium outline-0 w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />

              <input
                type="text"
                className="px-2 py-2 border border-gray-200 rounded-md text-sm font-serif font-medium outline-0 w-full"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration (e.g. 4 Months)"
              />
              <input
                type="text"
                className="px-2 py-2 border border-gray-200 rounded-md text-sm font-serif font-medium outline-0 w-full"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Instructor (e.g: sir Ghous)"
              />

              <select
                className="px-2 py-2 border border-gray-200 rounded-lg text-sm font-serif font-medium outline-0 w-full"
                value={courseStatus.toString()}
                onChange={(e) => setCourseStatus(e.target.value === "true")}
              >
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={handleSaveCourse}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl px-3 pt-5 pb-3 w-full max-w-sm">
            <h3 className="text-xl font-serif font-semibold mb-4">Edit Course</h3>

            <div className="space-y-2.5">
              <input
                type="text"
                className="px-2 py-2 border border-gray-200 rounded-md text-sm font-serif font-medium outline-0 w-full"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course name"
              />

              <select
                className="px-2 py-2 border border-gray-200 rounded-lg text-sm font-serif font-medium outline-0 w-full"
                value={courseStatus.toString()}
                onChange={(e) => setCourseStatus(e.target.value === "true")}
              >
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
              >
                Save
              </button>
              <button
                onClick={() => setEditModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}