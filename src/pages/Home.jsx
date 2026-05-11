import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, BookOpen, User, Shield } from "lucide-react";
import { PublicNavbar } from "../component/PublicNavbar";
import post1 from '../assets/post1.jpg'
import post2 from '../assets/post2.jpg'
import post3 from '../assets/post3.jpg'
export default function Home() {

    const posts = [
        {
            id: 1,
            author: "SMIT Official",
            time: "21 hours ago",
            content: "Saylani IT Summer Camp 2026 is here to transform students into future tech creators 👨‍💻",
            likes: 42,
            comments: 8,
            img: post1,
        },
        {
            id: 2,
            author: "SMIT Official",
            time: "2 day ago",
            content: "🚀 Online Admissions Open – Saylani IT Training Program! Great news for the youth of Pakistan! 💻✨",
            likes: 128,
            comments: 23,
            img: post2,
        },
        {
            id: 3,
            author: "SMIT Official",
            time: "5 days ago",
            content: "Saylani IT Entrance Exam 2026 \n 📍 Test Locations: Islamabad & Rawalpindi 🕒 Rawalpindi Timings: 👩 Female: 10:00 AM 👨 Male: 02:00 PM",
            likes: 67,
            comments: 12,
            img: post3,
        },
    ];

    return (
        <div className="min-h-screen text-black font-serif">

            {/* NAVBAR */}
            <PublicNavbar />


            <section className="flex items-center justify-center border-b border-gray-200 min-h-screen px-6">

                <div className="text-center ">


                    <div className="flex justify-center mb-4">
                        <span className="inline-block text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full bg-black text-white border border-black shadow-sm">
                            Welcome to SMIT Platform
                        </span>

                    </div>


                    <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                        SMIT Connect Portal
                    </h2>


                    <p className="mt-5 text-black/60">
                        A smart platform for managing <span className="font-semibold text-black">student admissions</span>,
                        <span className="font-semibold text-black"> courses</span>, and
                        <span className="font-semibold text-black"> leave requests</span>.
                    </p>


                    <p className="mt-2 text-sm text-black/50">
                        Built for both students and admins to simplify daily operations with ease and efficiency.
                    </p>

                    <div className="mt-8 flex justify-center gap-4 flex-wrap">

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
            <section className="px-10 py-15">

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
                    <div className="border bg-gray-50 border-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-lg duration-300 hover:scale-105 transition">

                        <div className="h-10 w-10 flex items-center justify-center text-white rounded-xl border border-black bg-black mb-3">
                            <User className="h-5 w-5" />
                        </div>

                        <h3 className="font-semibold text-lg">Student System</h3>
                        <p className="text-sm text-black/60 mt-2">
                            Apply for courses, submit leave requests, and track your progress.
                        </p>
                    </div>

                    {/* CARD 2 */}
                    <div className="border bg-gray-50 border-gray-50 shadow-sm p-6 rounded-2xl hover:shadow-lg duration-300 hover:scale-105 transition">

                        <div className="h-10 w-10 flex items-center justify-center text-white rounded-xl border border-black bg-black mb-3">
                            <BookOpen className="h-5 w-5" />
                        </div>

                        <h3 className="font-semibold text-lg">Course Management</h3>
                        <p className="text-sm text-black/60 mt-2">
                            Explore available courses and apply with a simple form system.
                        </p>
                    </div>

                    {/* CARD 3 */}
                    <div className="border bg-gray-50 border-gray-50 shadow-sm p-6 rounded-2xl hover:shadow-lg duration-300 hover:scale-105 transition">

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
            <section className="px-6 md:px-10 py-8 bg-gray-50">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8">

                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
                            Latest Updates
                        </h2>
                        <p className="text-black/50 text-sm mt-1">
                            From SMIT community feed
                        </p>
                    </div>

                    <Link to={'https://www.facebook.com/saylani.smit'}>
                        <button className="px-5 py-2 text-sm rounded-full border border-black hover:bg-black hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                            Facebook Feed
                        </button>
                    </Link>

                </div>

                {/* POSTS GRID */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="group border border-black/10 rounded-2xl p-4 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >

                            {/* HEADER */}
                            <div className="flex items-center gap-3 mb-3">

                                <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                                    SM
                                </div>

                                <div>
                                    <p className="text-sm font-semibold leading-none">{post.author}</p>
                                    <p className="text-[11px] text-black/50">{post.time}</p>
                                </div>

                            </div>

                            {/* IMAGE */}
                            {post.img && (
                                <div className="overflow-hidden rounded-xl mb-3">
                                    <img
                                        src={post.img}
                                        alt="post"
                                        className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>
                            )}

                            {/* CONTENT */}
                            <p className="text-xs text-black/70 mb-3 line-clamp-2 leading-relaxed">
                                {post.content}
                            </p>

                            {/* ACTIONS */}
                            <div className="flex justify-between items-center text-xs text-black/50 border-t border-black/10 pt-2">

                                <div className="flex gap-4">

                                    <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                                        <Heart className="h-4 w-4" /> {post.likes}
                                    </span>

                                    <span className="flex items-center gap-1 cursor-pointer hover:text-black transition">
                                        <MessageCircle className="h-4 w-4" /> {post.comments}
                                    </span>

                                </div>

                                <span className="cursor-pointer hover:text-black transition">
                                    <Share2 className="h-4 w-4" />
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
