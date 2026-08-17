import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { supabase } from '../supabaseClient'

const inputClass =
    'w-full rounded-xl border-2 border-rose-950 px-4 py-3 text-sm font-medium text-rose-950 outline-none focus:ring-2 focus:ring-rose-950/40 bg-white transition-all'

function ForgotPassword() {
    const navigate = useNavigate()
    const [phone, setPhone] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        const { data, error: fetchError } = await supabase
            .from('donors')
            .select('*')
            .eq('phone', phone)
            .maybeSingle()

        setSubmitting(false)

        if (fetchError || !data) {
            setError('এই ফোন নাম্বার দিয়ে কোনো ডোনার খুঁজে পাওয়া যায়নি।')
            return
        }

        if (data.father_name?.trim() !== fatherName.trim()) {
            setError('দুঃখিত, বাবার নাম মিলছে না। বাবার নাম ছাড়া পাসওয়ার্ড রিসেট করা সম্ভব নয় — দয়া করে আবার রেজিস্ট্রেশন করুন।')
            return
        }

        // যাচাই সফল — পাসওয়ার্ড বদলানোর পেজে পাঠানো, ডোনারের id সাথে নিয়ে
        navigate('/reset-password', { state: { donorId: data.id, phone: data.phone } })
    }

    return (
        <div className="min-h-screen bg-rose-50 relative flex flex-col">
            <MedicalBackground />
            <Navbar />
            <BackButton />

            <div className="max-w-md mx-auto px-6 py-8 flex-1 w-full">
                <h1 className="text-xl font-bold text-rose-950 mb-2 text-center">
                    পাসওয়ার্ড ভুলে গেছেন?
                </h1>
                <p className="text-sm font-medium text-rose-800 mb-6 text-center">
                    আপনার পরিচয় যাচাই করতে ফোন নাম্বার ও বাবার নাম দিন
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">ফোন নাম্বার</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            type="tel"
                            placeholder="017XXXXXXXX"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">বাবার নাম</label>
                        <input
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            required
                            placeholder="রেজিস্ট্রেশনের সময় দেওয়া বাবার নাম"
                            className={inputClass}
                        />
                    </div>

                    {error && (
                        <p className="text-sm font-semibold text-rose-700 bg-rose-100 border border-rose-300 rounded-xl px-4 py-3 text-center">
                            {error}
                        </p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-rose-950 text-white rounded-xl py-3 font-bold mt-2 disabled:opacity-60"
                    >
                        {submitting ? 'যাচাই হচ্ছে...' : 'যাচাই করুন'}
                    </motion.button>

                    <p className="text-sm font-medium text-rose-800 text-center">
                        মনে পড়ে গেছে?{' '}
                        <Link to="/login" className="font-bold text-rose-950 underline">
                            লগইন করুন
                        </Link>
                    </p>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default ForgotPassword