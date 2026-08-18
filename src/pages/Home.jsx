import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { Users, UserPlus, LogIn, UserCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'
import { getSession, saveSession, clearSession } from '../utils/session'
import { supabase } from '../supabaseClient'

function Home() {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const syncSession = async () => {
            const session = getSession()
            if (!session) {
                setCurrentUser(null)
                return
            }

            const { data, error } = await supabase
                .from('donors')
                .select('*')
                .eq('phone', session.phone)
                .maybeSingle()

            if (error || !data) {
                clearSession()
                setCurrentUser(null)
            } else {
                const freshUser = {
                    phone: data.phone,
                    password: data.password,
                    name: data.name,
                    bloodGroup: data.blood_group,
                    photo: data.photo,
                }
                saveSession(freshUser)
                setCurrentUser(freshUser)
            }
        }

        syncSession()
    }, [])

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
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/donors" className="whitespace-nowrap bg-rose-950 text-white rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2">
                                <Users size={18} />
                                ডোনার দেখুন
                            </Link>
                        </motion.div>

                        {currentUser ? (
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/account" className="whitespace-nowrap bg-white text-rose-950 border-2 border-rose-950 rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2">
                                    <UserCircle size={18} />
                                    আমার অ্যাকাউন্ট
                                </Link>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to="/register" className="whitespace-nowrap bg-white text-rose-950 border-2 border-rose-950 rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2">
                                        <UserPlus size={18} />
                                        রেজিস্ট্রেশন করুন
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link to="/login" className="whitespace-nowrap bg-white text-rose-950 border-2 border-rose-200 rounded-xl px-6 py-3 font-semibold flex items-center justify-center gap-2">
                                        <LogIn size={18} />
                                        লগইন করুন
                                    </Link>
                                </motion.div>
                            </>
                        )}
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