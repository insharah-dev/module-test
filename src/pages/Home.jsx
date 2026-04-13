import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, BookOpen, User, Shield } from "lucide-react";
import { PublicNavbar } from "../component/PublicNavbar";

export default function Home() {

    const posts = [
        {
            id: 1,
            author: "SMIT Official",
            time: "2 hours ago",
            content: "🎉 New batch of Web Development starting from April 15! Register now to secure your seat.",
            likes: 42,
            comments: 8,
        },
        {
            id: 2,
            author: "SMIT Official",
            time: "1 day ago",
            content: "Congratulations to our students who completed the AI & Machine Learning course! 🎓",
            likes: 128,
            comments: 23,
        },
        {
            id: 3,
            author: "SMIT Official",
            time: "3 days ago",
            content: "Workshop on Mobile App Development this Saturday. Don't miss out! 📱",
            likes: 67,
            comments: 12,
        },
    ];

    return (
        <div className="min-h-screen bg-white text-black font-serif">

            {/* NAVBAR */}
            <PublicNavbar />


            {/* HERO SECTION */}
            <section className="flex items-center justify-center border-b border-gray-200 min-h-screen px-6">

                <div className="text-center max-w-3xl">

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        SMIT Connect Portal
                    </h2>

                    <p className="mt-5 text-black/60">
                        A smart platform for managing student admissions, courses, and leave requests with role-based access for Students and Admins.
                    </p>

                    <div className="mt-8 flex justify-center gap-4">

                        <Link
                            to="/courses"
                            className="px-6 py-3 bg-black text-white rounded-xl hover:scale-105 transition"
                        >
                            View Courses
                        </Link>

                        <Link
                            to="/auth"
                            className="px-6 py-3 border border-black rounded-xl hover:bg-black hover:text-white transition"
                        >
                            Get Started
                        </Link>

                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="px-10 py-10">

                {/* HEADING */}
                <div className="text-center mb-12">

                    <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
                        Everything You Need in One Platform
                    </h2>

                    <p className="text-black/60 mt-3 max-w-2xl mx-auto text-sm md:text-base">
                        Manage students, courses, and leave requests with a clean and simple system designed for SMIT Portal.
                    </p>

                </div>

                {/* CARDS */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* CARD 1 */}
                    <div className="border border-black/10 p-6 rounded-2xl hover:shadow-lg duration-300 hover:scale-105 transition">

                        <div className="h-10 w-10 flex items-center justify-center text-white rounded-xl border border-black bg-black mb-3">
                            <User className="h-5 w-5" />
                        </div>

                        <h3 className="font-semibold text-lg">Student System</h3>
                        <p className="text-sm text-black/60 mt-2">
                            Apply for courses, submit leave requests, and track your progress.
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="border border-black/10 p-6 rounded-2xl hover:shadow-lg duration-300 hover:scale-105 transition">

                        <div className="h-10 w-10 flex items-center justify-center text-white rounded-xl border border-black bg-black mb-3">
                            <BookOpen className="h-5 w-5" />
                        </div>

                        <h3 className="font-semibold text-lg">Course Management</h3>
                        <p className="text-sm text-black/60 mt-2">
                            Explore available courses and apply with a simple form system.
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="border border-black/10 p-6 rounded-2xl hover:shadow-lg duration-300 hover:scale-105 transition">

                        <div className="h-10 w-10 flex items-center justify-center text-white rounded-xl border border-black bg-black mb-3">
                            <Shield className="h-5 w-5" />
                        </div>

                        <h3 className="font-semibold text-lg">Admin Control</h3>
                        <p className="text-sm text-black/60 mt-2">
                            Manage students, courses, and leave approvals efficiently.
                        </p>
                    </div>

                </div>

            </section>



            {/* LATEST UPDATE */}
            <section className="px-10 ">

                <div className="flex items-center justify-between mb-10">

                    <div>
                        <h2 className="text-3xl font-bold tracking-wide">
                            Latest Updates
                        </h2>
                        <p className="text-black/50 text-sm mt-1">
                            From SMIT community feed
                        </p>
                    </div>

                    <button className="px-4 py-2 text-sm border border-black rounded-xl hover:bg-black hover:text-white transition">
                        Facebook Feed
                    </button>

                </div>

                {/* POSTS GRID */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post, i) => (
                        <div
                            key={post.id}
                            className="border border-black/10 rounded-2xl p-6 bg-white shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
                        >

                            {/* HEADER */}
                            <div className="flex items-center gap-3 mb-4">

                                <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                                    SM
                                </div>

                                <div>
                                    <p className="font-semibold text-sm">
                                        {post.author}
                                    </p>
                                    <p className="text-xs text-black/40">
                                        {post.time}
                                    </p>
                                </div>

                            </div>

                            {/* CONTENT */}
                            <p className="text-sm text-black/70 leading-relaxed mb-5">
                                {post.content}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex items-center justify-between text-xs text-black/50">

                                <div className="flex items-center gap-4">

                                    <span className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                                        <Heart className="h-4 w-4" /> {post.likes}
                                    </span>

                                    <span className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                                        <MessageCircle className="h-4 w-4" /> {post.comments}
                                    </span>

                                </div>

                                <span className="flex items-center gap-1 hover:text-black transition cursor-pointer">
                                    <Share2 className="h-4 w-4" /> Share
                                </span>

                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="border-t border-black/10 text-center py-6 text-sm text-black/50">
                © {new Date().getFullYear()} SMIT Connect Portal. All rights reserved.
            </footer>

        </div>
    );
}
