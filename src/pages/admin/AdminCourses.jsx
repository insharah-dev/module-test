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

      <div className="space-y-8 font-serif text-black p-6 bg-white">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">

          <div>
            <h2 className="text-3xl font-semibold tracking-wide">
              Course Management
            </h2>
            <p className="text-black/60 text-sm mt-1">
              Manage and organize all available courses
            </p>
          </div>

          <button
            onClick={handleAddCourse}
            className="flex items-center font-bold gap-2 px-5 py-2.5 rounded-xl border  hover:shadow-lg  hover:border-gray-200 bg-black text-white hover:bg-white hover:text-black transition duration-500"
          >
            <Plus className="h-5 w-5" />
            Add Course
          </button>

        </div>

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((allCourse, i) => (
            <div
              key={i}
              className="bg-white border border-black/10 rounded-2xl p-6 shadow-sm
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-serif"
            >
              {/* Title + Status */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold text-black truncate">
                  {allCourse.name}
                </h2>

                <span
                  className={`px-3 py-1 text-xs rounded-full border font-medium tracking-wide
          ${allCourse.status
                      ? "border-black text-black"
                      : "border-black/30 text-black/40"
                    }`}
                >
                  {allCourse.status ? "OPEN" : "CLOSED"}
                </span>
              </div>

              {/* Description */}
              <p className="text-black/60 text-sm mb-4 line-clamp-3">
                {allCourse.description}
              </p>

              {/* Info */}
              <div className="flex justify-between text-sm text-black/60 mb-5">
                <p className="flex items-center gap-1">
                  <MdAccessTime /> {allCourse.duration}
                </p>

                <p className="flex items-center gap-1">
                  <PiStudent /> {allCourse.instructor}
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() =>
                  handleEditCourse(allCourse.id, allCourse.name, allCourse.status)
                }
                className="w-full py-2.5 rounded-xl border border-black/10
        font-bold bg-black text-white
        transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaRegEdit />
                Edit Course
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ================= ADD MODAL ================= */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-serif">

          <div className="bg-white w-[95%] max-w-xl rounded-3xl p-6 shadow-2xl border border-black/10">

            <h3 className="text-2xl font-semibold mb-5">
              Add New Course
            </h3>

            <div className="space-y-3">

              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Course Name"
                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black"
              />

              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black"
              />

              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Duration"
                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black"
              />

              <input
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
                placeholder="Instructor"
                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black"
              />

              <select
                value={courseStatus}
                onChange={(e) => setCourseStatus(e.target.value === "true")}
                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black"
              >
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={handleSaveCourse}
                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Save
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="w-full border border-black/20 py-3 rounded-xl hover:bg-black/5 transition"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= EDIT MODAL ================= */}
      {editModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-serif">

          <div className="bg-white w-[95%] max-w-xl rounded-3xl p-6 shadow-2xl border border-black/10">

            <h3 className="text-2xl font-semibold mb-5">
              Edit Course
            </h3>

            <div className="space-y-3">

              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full border border-black/20 p-3 rounded-xl focus:outline-none focus:border-black"
              />

              <select
                value={courseStatus}
                onChange={(e) => setCourseStatus(e.target.value === "true")}
                className="w-full border border-black/20 p-3 rounded-xl"
              >
                <option value="true">Open</option>
                <option value="false">Closed</option>
              </select>

            </div>

            <div className="flex gap-3 mt-6">

              <button
                onClick={handleEdit}
                className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                Update
              </button>

              <button
                onClick={() => setEditModal(false)}
                className="w-full border border-black/20 py-3 rounded-xl hover:bg-black/5 transition"
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