import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export function AdminRoute({ children }) {

    const { admin } = useSelector((state) => state.auth)

    if (!admin) {
        return <Navigate to="/admin/AdminLogin" replace />
    }

    return children
}
