// import { Link } from "react-router-dom";
// import { PublicNavbar } from "../component/PublicNavbar";
// import { ArrowRight, BookOpen, Heart, MessageCircle, Share2, UserPlus } from "lucide-react";

// const posts = [
//     {
//         id: 1,
//         author: "SMIT Official",
//         time: "2 hours ago",
//         content: "🎉 New batch of Web Development starting from April 15! Register now to secure your seat.",
//         likes: 42,
//         comments: 8,
//     },
//     {
//         id: 2,
//         author: "SMIT Official",
//         time: "1 day ago",
//         content: "Congratulations to our students who completed the AI & Machine Learning course! 🎓",
//         likes: 128,
//         comments: 23,
//     },
//     {
//         id: 3,
//         author: "SMIT Official",
//         time: "3 days ago",
//         content: "Workshop on Mobile App Development this Saturday. Don't miss out! 📱",
//         likes: 67,
//         comments: 12,
//     },
// ];

// export default function Home() {
//     return (
//         <div className="min-h-screen bg-background">
//             <PublicNavbar />

//             {/* Hero */}
//             <section className="relative overflow-hidden border-b">
//                 <div className="absolute inset-0  via-transparent to-accent/5" />
//                 <div className="container relative py-20 md:py-32 text-center">
//                     <button className="px-4 py-2.5 rounded-2xl border text-sm font-bold font-serif">
//                         Empowering Future Tech Leaders
//                     </button>
//                     <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
//                         SMIT Connect<br />
//                         <span className="text-accent">Portal</span>
//                     </h1>
//                     <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
//                         Your gateway to world-class IT education. Explore courses, track your progress, and connect with the SMIT community.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                         <Link to="/student/dashboard">
//                             <button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 w-full sm:w-auto">
//                                 Student Login <ArrowRight className="h-4 w-4" />
//                             </button>
//                         </Link>
//                         <Link to="/courses">
//                             <button className="gap-2 w-full sm:w-auto">
//                                 <BookOpen className="h-4 w-4" /> Explore Courses
//                             </button>
//                         </Link>
//                         <button className="gap-2 w-full sm:w-auto">
//                             <UserPlus className="h-4 w-4" /> Student Signup
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Feed */}
//             <section className="container py-16">
//                 <div className="flex items-center justify-between mb-8">
//                     <div>
//                         <h2 className="text-2xl font-bold">Latest Updates</h2>
//                         <p className="text-muted-foreground text-sm">From our community feed</p>
//                     </div>
//                     <button className="px-4 py-2.5 rounded-2xl border text-sm font-bold font-serif">Facebook Feed</button>
//                 </div>
//                 <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//                     {posts.map((post, i) => (
//                         <div
//                             key={post.id}
//                             className="rounded-xl border bg-card p-5 shadow-sm hover:shadow-md transition-shadow"
//                             style={{ animationDelay: `${i * 100}ms` }}
//                         >
//                             <div className="flex items-center gap-3 mb-3">
//                                 <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
//                                     SM
//                                 </div>
//                                 <div>
//                                     <p className="font-semibold text-sm">{post.author}</p>
//                                     <p className="text-xs text-muted-foreground">{post.time}</p>
//                                 </div>
//                             </div>
//                             <p className="text-sm text-foreground/90 leading-relaxed mb-4">{post.content}</p>
//                             <div className="flex items-center gap-4 text-muted-foreground text-xs">
//                                 <span className="flex items-center gap-1 hover:text-accent cursor-pointer transition-colors">
//                                     <Heart className="h-3.5 w-3.5" /> {post.likes}
//                                 </span>
//                                 <span className="flex items-center gap-1 hover:text-accent cursor-pointer transition-colors">
//                                     <MessageCircle className="h-3.5 w-3.5" /> {post.comments}
//                                 </span>
//                                 <span className="flex items-center gap-1 hover:text-accent cursor-pointer transition-colors ml-auto">
//                                     <Share2 className="h-3.5 w-3.5" /> Share
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer className="border-t py-8 text-center text-sm text-muted-foreground">
//                 © 2026 SMIT Connect Portal. All rights reserved.
//             </footer>
//         </div>
//     );
// }



import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, User, Shield } from "lucide-react";
import { PublicNavbar } from "../component/PublicNavbar";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-black font-serif">

            {/* NAVBAR */}
            <PublicNavbar />


            {/* HERO SECTION */}
            <section className="flex items-center justify-center min-h-screen px-6">

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
            <section className="grid md:grid-cols-3 gap-8 px-10 pb-20">

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

            </section>


            {/* FOOTER */}
            <footer className="border-t border-black/10 text-center py-6 text-sm text-black/50">
                © {new Date().getFullYear()} SMIT Connect Portal. All rights reserved.
            </footer>

        </div>
    );
}
