import { BrowserRouter, Routes, Route } from "react-router-dom"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminStudents from "../pages/admin/AdminStudents"
import AdminCourses from "../pages/admin/AdminCourses"
import AdminLeaves from "../pages/admin/AdminLeaves"
import AdminSettings from "../pages/admin/AdminSettings"
import StudentDashboard from "../pages/students/StudentDashboard"
import Courses from "../pages/Courses"
import AuthCard from "../pages/AuthCArd"
import AdminLogin from "../pages/admin/AdminLogin"
import Home from "../pages/Home"
import StudentLeaves from "../pages/students/StudentsLeaves"
import { AdminRoute } from "../component/AdminRoute"
import ProtectedRoute from "../component/ProtectedRoute"

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* admin */}
                    <Route path="/admin/adminLogin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                    <Route path="/admin/students" element={<AdminRoute><AdminStudents /></AdminRoute>} />
                    <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
                    <Route path="/admin/leaves" element={<AdminRoute><AdminLeaves /></AdminRoute>} />
                    <Route path="/admin/settings" element={<AdminRoute> <AdminSettings /></AdminRoute>} />
                    {/* Student */}
                    <Route path="/auth" element={<AuthCard />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/student/dashboard" element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>} />
                    <Route path="/student/leaves" element={<ProtectedRoute><StudentLeaves /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter >
        </>
    )
}

export default Routing