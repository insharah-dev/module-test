import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminStudents from "../pages/admin/AdminStudents"
import AdminCourses from "../pages/admin/AdminCourses"
import AdminLeaves from "../pages/admin/AdminLeaves"
import AdminSettings from "../pages/admin/AdminSettings"
import Login from "../pages/Login"
import StudentDashboard from "../pages/students/StudentDashboard"
import Courses from "../pages/Courses"
import AuthCard from "../pages/AuthCArd"
import AdminLogin from "../pages/admin/AdminLogin"
import Home from "../pages/Home"

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth" element={<AuthCard />} />
                    <Route path="/admin/adminLogin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/students" element={<AdminStudents />} />
                    <Route path="/admin/courses" element={<AdminCourses />} />
                    <Route path="/admin/leaves" element={<AdminLeaves />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />

                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing