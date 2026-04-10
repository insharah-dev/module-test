import { useState } from "react";
import { Shield } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";

const AuthCard = () => {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="w-full  py-5 max-w-md mx-auto relative z-10">
            {/* Logo */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 mb-4">
                    <Shield className="w-7 h-7 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight">
                    SMIT Connect Portal
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                    Access your student dashboard
                </p>
            </div>

            {/* Card */}
            <div className="bg-white rounded-2xl shadow-lg border p-6 sm:p-8">

                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all ${activeTab === "login"
                                ? "bg-white shadow text-blue-600"
                                : "text-gray-500"
                            }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setActiveTab("signup")}
                        className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all ${activeTab === "signup"
                                ? "bg-white shadow text-blue-600"
                                : "text-gray-500"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Content */}
                <div className="transition-all duration-300">
                    {activeTab === "login" && <Login />}
                    {activeTab === "signup" && <Signup />}
                </div>
            </div>
        </div>
    );
};

export default AuthCard;