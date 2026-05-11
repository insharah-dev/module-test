import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, BookOpen, User, Shield } from "lucide-react";
import { PublicNavbar } from "../component/PublicNavbar";

export default function Home() {

    const posts = [
        {
            id: 1,
            author: "SMIT Official",
            time: "21 hours ago",
            content: "Saylani IT Summer Camp 2026 is here to transform students into future tech creators 👨‍💻",
            likes: 42,
            comments: 8,
            img: "https://scontent.fkhi16-2.fna.fbcdn.net/v/t39.30808-6/687035851_122290393394153270_5424161066642036730_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeEL7pkEXBPO87PtdgnNUWTnbWedbT0TLkttZ51tPRMuS8hZLgvR9w1CithL1cXve5-TLOn6nmCKrCTUCsl91VDF&_nc_ohc=a3ankk5_je4Q7kNvwFs04xB&_nc_oc=AdoJ8lXKAI4P45IAubq4Yg-xUSO28mzfgDVeUs_0rYJNDuc12PJtkRLmFMgLWH2nLM8&_nc_zt=23&_nc_ht=scontent.fkhi16-2.fna&_nc_gid=RiYy1BBUpf-ExGc1LK2t3w&_nc_ss=7b2a8&oh=00_Af4QuEuXhVaIAl_sg90u4keQLsMxX44v6m-QEys8vAeD7Q&oe=6A08312A",
        },
        {
            id: 2,
            author: "SMIT Official",
            time: "2 day ago",
            content: "🚀 Online Admissions Open – Saylani IT Training Program! Great news for the youth of Pakistan! 💻✨",
            likes: 128,
            comments: 23,
            img: "https://scontent.fkhi16-2.fna.fbcdn.net/v/t39.30808-6/681363512_122289160616153270_2423284892799458240_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHh5IqihbxveMynrRdf4eFv4NO583JNUMzg07nzck1QzAfbd6JJVt31_5GwB6ORqz9vDNgeT9LcLdaFJKXtQTlG&_nc_ohc=1BHLd9anN0wQ7kNvwF4R4A3&_nc_oc=AdqlwDspe-XK_s3VMPVPHbjHpgXp5rbStHVAd0vgbno3dxkV_RZUtC8iVQTepVtrpQ0&_nc_zt=23&_nc_ht=scontent.fkhi16-2.fna&_nc_gid=iWO2_kNbf59Y6Az3mJa7Dg&_nc_ss=7b2a8&oh=00_Af4Qw2wIhmA1kQsKDLQNi5gV6qeJcSGMdqujx7UkP3pQHg&oe=6A080303",
        },
        {
            id: 3,
            author: "SMIT Official",
            time: "5 days ago",
            content: "Saylani IT Entrance Exam 2026 \n 📍 Test Locations: Islamabad & Rawalpindi 🕒 Rawalpindi Timings: 👩 Female: 10:00 AM 👨 Male: 02:00 PM",
            likes: 67,
            comments: 12,
            img: "https://scontent.fkhi16-1.fna.fbcdn.net/v/t39.30808-6/690673090_122290499726153270_3870506723472317542_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHkntq0T2W0R6r2B4v0ySz_qLDE7wZZv3yosMTvBlm_fH5UZe08yjdPXV1NgpDBNoyrXlNShrH7oUNa1uQLxYd4&_nc_ohc=oGLGBDGOQU0Q7kNvwG9vZyn&_nc_oc=Adr1pXArP6IOCLfkgjkhmOaSbSKALqy3OiEoG2P8cTWoN7VBjix72lQgs12RI9vm1Io&_nc_zt=23&_nc_ht=scontent.fkhi16-1.fna&_nc_gid=lYkx481JnGZbqNsHHWPetA&_nc_ss=7b2a8&oh=00_Af6JzqHAvWtAXcf32vDGhDoLW64_nM6Lxk8bcWnU1-njag&oe=6A0827ED",
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
