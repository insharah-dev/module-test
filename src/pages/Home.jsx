import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, BookOpen, User, Shield } from "lucide-react";
import { PublicNavbar } from "../component/PublicNavbar";

export default function Home() {

    const posts = [
        {
            id: 1,
            author: "SMIT Official",
            time: "2 hours ago",
            content: "🚀 We’re Hiring in Karachi! Are you passionate, creative, and ready to make an impact? Join our dynamic team at Saylani I.T and be part of a mission that empowers youth through technology. 📌 Open Positions: • Campus Manager(Male / Female) • Assistant Manager(Male / Female) • Network Administrator(Female) ✨ If you’re driven, dedicated, and eager to grow in a professional environment, we’d love to hear from you! 📧 Send your resume to: smit.edu@saylaniwelfare.com📍 Location: Karachi",
            likes: 42,
            comments: 8,
            img: "https://scontent.fkhi16-1.fna.fbcdn.net/v/t39.30808-6/668591108_122284397318153270_6801304540625203917_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHZ9nLaAYVomA3_uEJG0CQIW3Qzo8O17p5bdDOjw7XunpIS6xiEyL2deTambycrjSrvNcHu8L1Sr1yvqGtwnaAo&_nc_ohc=UFdnDQwbHIQQ7kNvwHpTca1&_nc_oc=AdpI-dxV1WrCQS4rD_McOzN6clBNMyJauHXEWO0klnKsHTsipBMJaExxxuAbA13B-tI&_nc_zt=23&_nc_ht=scontent.fkhi16-1.fna&_nc_gid=gTNtp6JisAVIudLCEJWjvg&_nc_ss=7a3a8&oh=00_Af1i8PfoeOHYugoRthcIUFjTcf1FHIaSQQcZG1nGGFw1-w&oe=69E3115F",
        },
        {
            id: 2,
            author: "SMIT Official",
            time: "1 day ago",
            content: "Congratulations to our students who completed the AI & Machine Learning course! 🎓",
            likes: 128,
            comments: 23,
            img: "",
        },
        {
            id: 3,
            author: "SMIT Official",
            time: "3 days ago",
            content: "Workshop on Mobile App Development this Saturday. Don't miss out! 📱",
            likes: 67,
            comments: 12,
            img: "",
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="border border-black/10 rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
                        >

                            {/* HEADER */}
                            <div className="flex items-center gap-2 mb-2">

                                <div className="h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                                    SM
                                </div>

                                <div>
                                    <p className="text-xs font-semibold">{post.author}</p>
                                    <p className="text-[10px] text-black/50">{post.time}</p>
                                </div>

                            </div>

                            {/* CONTENT */}
                            <p className="text-xs text-black/70 mb-2 leading-snug">
                                {post.content.length > 100
                                    ? post.content.slice(0, 100) + "..."
                                    : post.content}
                            </p>

                            {/* IMAGE (small) */}
                            {post.img && (
                                <img
                                    src={post.img}
                                    alt="post"
                                    className="w-full h-32 object-cover rounded-lg mb-2"
                                />
                            )}

                            {/* ACTIONS */}
                            <div className="flex justify-between text-[10px] text-black/50 border-t border-black/10 pt-2">

                                <div className="flex gap-3">

                                    <span className="flex items-center gap-1 cursor-pointer hover:text-black">
                                        <Heart className="h-3 w-3" /> {post.likes}
                                    </span>

                                    <span className="flex items-center gap-1 cursor-pointer hover:text-black">
                                        <MessageCircle className="h-3 w-3" /> {post.comments}
                                    </span>

                                </div>

                                <span className="flex items-center gap-1 cursor-pointer hover:text-black">
                                    <Share2 className="h-3 w-3" />
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
