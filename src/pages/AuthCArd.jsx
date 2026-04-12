import { useState } from "react";
import { Shield } from "lucide-react";
import Login from "./Login";
import Signup from "./Signup";
import { PublicNavbar } from "../component/PublicNavbar";

const AuthCard = () => {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <>
            <PublicNavbar />

            <div className="w-full py-10 px-4 max-w-xl mx-auto">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-black text-white mb-4 shadow-md">
                        <Shield className="w-6 h-6" />
                    </div>

                    <h1 className="text-2xl font-semibold tracking-wide text-black font-serif">
                        SMIT Connect Portal
                    </h1>

                    <p className="text-black/50 text-sm mt-1">
                        Access your student dashboard
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-black/10 p-6 sm:p-8 font-serif">

                    {/* Tabs */}
                    <div className="flex border border-black/10 rounded-xl overflow-hidden mb-6">

                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-2.5 text-sm font-medium transition ${activeTab === "login"
                                ? "bg-black text-white"
                                : "bg-white text-black/60 hover:bg-black/5"
                                }`}
                        >
                            Login
                        </button>

                        <button
                            onClick={() => setActiveTab("signup")}
                            className={`flex-1 py-2.5 text-sm font-medium transition ${activeTab === "signup"
                                ? "bg-black text-white"
                                : "bg-white text-black/60 hover:bg-black/5"
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
        </>
    );
};

export default AuthCard;
