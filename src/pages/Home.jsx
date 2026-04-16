import { Link } from "react-router-dom";
import { Heart, MessageCircle, Share2, BookOpen, User, Shield } from "lucide-react";
import { PublicNavbar } from "../component/PublicNavbar";

export default function Home() {

    const posts = [
        {
            id: 1,
            author: "SMIT Official",
            time: "2 hours ago",
            content: "We are Hiring in Karachi! Are you passionate, creative, and ready to make an impact? Join our dynamic team at Saylani I.T and be part of a mission that empowers youth through technology. 📌 Open Positions: • Campus Manager(Male / Female) • Assistant Manager(Male / Female) • Network Administrator(Female) ✨ If you’re driven, dedicated, and eager to grow in a professional environment, we’d love to hear from you! 📧 Send your resume to: smit.edu@saylaniwelfare.com📍 Location: Karachi",
            likes: 42,
            comments: 8,
            img: "https://scontent.fkhi16-1.fna.fbcdn.net/v/t39.30808-6/668591108_122284397318153270_6801304540625203917_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHZ9nLaAYVomA3_uEJG0CQIW3Qzo8O17p5bdDOjw7XunpIS6xiEyL2deTambycrjSrvNcHu8L1Sr1yvqGtwnaAo&_nc_ohc=UFdnDQwbHIQQ7kNvwHpTca1&_nc_oc=AdpI-dxV1WrCQS4rD_McOzN6clBNMyJauHXEWO0klnKsHTsipBMJaExxxuAbA13B-tI&_nc_zt=23&_nc_ht=scontent.fkhi16-1.fna&_nc_gid=gTNtp6JisAVIudLCEJWjvg&_nc_ss=7a3a8&oh=00_Af1i8PfoeOHYugoRthcIUFjTcf1FHIaSQQcZG1nGGFw1-w&oe=69E3115F",
        },
        {
            id: 2,
            author: "SMIT Official",
            time: "1 day ago",
            content: "Admissions Open 2026 – Techno Kids Web Development Empowering the youth of Karachi with future-ready tech skills! Join Saylani I.T and start your journey into the world of Web & Mobile App Development",
            likes: 128,
            comments: 23,
            img: "https://scontent.fkhi16-2.fna.fbcdn.net/v/t39.30808-6/669849129_122284880720153270_8956990915436851042_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeG2zzcTgSKcaPTjMw4SmNQdzE2XkVeYbjvMTZeRV5huO0vmKSRgPT1HV0PXKy5gEws4Hwz390Axm2h_NmSO_aEa&_nc_ohc=7T1-TuMhv_oQ7kNvwGZIC5C&_nc_oc=Adrmm6DrmRHmtz74y2X7-gPV6qYZ2Fbw1cMZTun20VL_O9EqcTqCq6GpalcqrlIx2-w&_nc_zt=23&_nc_ht=scontent.fkhi16-2.fna&_nc_gid=0_AT1fxnCQgJrgAqCvuYaw&_nc_ss=7a3a8&oh=00_Af1q85DmPaPtSVB4IPUq_CLXqm8-Bl25P0S6ko41sK_I-A&oe=69E6D1DA",
        },
        {
            id: 3,
            author: "SMIT Official",
            time: "3 days ago",
            content: "Saylani IT Entrance Exam 2026 \n 📍 Test Locations: Islamabad & Rawalpindi 🕒 Rawalpindi Timings: 👩 Female: 10:00 AM 👨 Male: 02:00 PM",
            likes: 67,
            comments: 12,
            img: "https://scontent.fkhi16-1.fna.fbcdn.net/v/t39.30808-6/672051119_122285596274153270_8381180479011596489_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGWWgyoUHHAV3oeunkk4BFgzDL1lmcNWjPMMvWWZw1aM_xxJp3zzNwKQ9LE-Vy2LbYXFroYOI6USZVoQtaSUa9J&_nc_ohc=fz1vyRbxiZsQ7kNvwEJXY50&_nc_oc=AdqPP5dSsSYlq7aIX2Zb2nORsmh5iFx585bhMJ0P93KOEugtwOoaMmfdr6P1LdaqRpo&_nc_zt=23&_nc_ht=scontent.fkhi16-1.fna&_nc_gid=3Jz8-2uGA5kdV2rytg8EBw&_nc_ss=7a3a8&oh=00_Af2ME0Ch1bBe8YEiUXSLs-onMEutUlPQcVu8w26asm6lLA&oe=69E69FF2",
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
                                        className="w-full h-40 object-cover group-hover:scale-105 transition duration-300"
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
