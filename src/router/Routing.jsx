import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminStudents from "../pages/admin/AdminStudents"
import AdminCourses from "../pages/admin/AdminCourses"
import AdminLeaves from "../pages/admin/AdminLeaves"
import AdminSettings from "../pages/admin/AdminSettings"
import Login from "../pages/Login"
import StudentDashboard from "../pages/students/StudentDashboard"
import Courses from "../pages/Courses"
import Signup from "../pages/Signup"
import AuthCard from "../pages/AuthCArd"

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                    <Route path="/auth" element={<AuthCard />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/students" element={<AdminStudents />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/leaves" element={<AdminLeaves />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />

                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/courses" element={<Courses />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing