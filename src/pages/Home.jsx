import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { Users, UserPlus } from 'lucide-react'
import Navbar from '../components/Navbar'
import Logo from '../components/LogoTemp'

function Home() {
    return (
        <div className="min-h-screen bg-rose-50 relative">
            <MedicalBackground />
            <Navbar />

            <section className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-snug">
                        <span className="text-rose-950">একটা রক্তদান বাঁচাতে পারে </span>
                        <span className="text-rose-500">একটা জীবন</span>
                    </h1>
                    <p className="text-base text-rose-800/70 mb-8">
                        জরুরি প্রয়োজনে খুঁজে নিন উপযুক্ত রক্তদাতা, অথবা নিজে রক্তদাতা হয়ে যোগ দিতে আজই রেজিস্ট্রেশন করুন
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/donors" className="bg-rose-950 text-white rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2">
                                <Users size={18} />
                                ডোনার দেখুন
                            </Link>
                        </motion.div>
                        <button className="bg-white text-rose-950 border-2 border-rose-950 rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2">
                            <UserPlus size={18} />
                            রেজিস্ট্রেশন করুন
                        </button>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Logo size={220} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home