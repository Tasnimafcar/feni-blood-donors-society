import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { supabase } from '../supabaseClient'

const inputClass =
    'w-full rounded-xl border-2 border-rose-950 px-4 py-3 text-sm font-medium text-rose-950 outline-none focus:ring-2 focus:ring-rose-950/40 bg-white transition-all'

function ResetPassword() {
    const navigate = useNavigate()
    const location = useLocation()
    const donorId = location.state?.donorId

    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    // সরাসরি এই পেজে ঢুকলে (ForgotPassword ছাড়া) donorId পাওয়া যাবে না — নিরাপত্তার জন্য ফেরত পাঠানো
    if (!donorId) {
        return (
            <div className="min-h-screen bg-rose-50 relative flex flex-col">
                <MedicalBackground />
                <Navbar />
                <BackButton />
                <div className="max-w-md mx-auto px-6 py-8 flex-1 w-full text-center">
                    <p className="text-sm font-semibold text-rose-700 bg-rose-100 border border-rose-300 rounded-xl px-4 py-3 mb-4">
                        সরাসরি এই পেজ খোলা যাবে না। আগে আপনার পরিচয় যাচাই করুন।
                    </p>
                    <Link to="/forgot-password" className="font-bold text-rose-950 underline">
                        পাসওয়ার্ড ভুলে গেছেন পেজে যান
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (newPassword.length < 4) {
            setError('পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে।')
            return
        }
        if (newPassword !== confirmPassword) {
            setError('দুইটা পাসওয়ার্ড মিলছে না।')
            return
        }

        setSubmitting(true)
        const { error: updateError } = await supabase
            .from('donors')
            .update({ password: newPassword })
            .eq('id', donorId)

        setSubmitting(false)

        if (updateError) {
            console.error('Supabase update error:', updateError)
            setError('দুঃখিত, পাসওয়ার্ড বদলানো যায়নি। আবার চেষ্টা করুন।')
            return
        }

        setSuccess(true)
        setTimeout(() => navigate('/login'), 2000)
    }

    return (
        <div className="min-h-screen bg-rose-50 relative flex flex-col">
            <MedicalBackground />
            <Navbar />
            <BackButton />

            <div className="max-w-md mx-auto px-6 py-8 flex-1 w-full">
                {success ? (
                    <div className="bg-white rounded-2xl p-8 text-center">
                        <CheckCircle2 size={56} className="text-rose-950 mx-auto mb-4" />
                        <h2 className="text-lg font-bold text-rose-950 mb-2">পাসওয়ার্ড বদলানো হয়েছে</h2>
                        <p className="text-sm font-medium text-rose-800">লগইন পেজে নিয়ে যাওয়া হচ্ছে...</p>
                    </div>
                ) : (
                    <>
                        <h1 className="text-xl font-bold text-rose-950 mb-6 text-center">
                            নতুন পাসওয়ার্ড দিন
                        </h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="text-sm font-bold text-rose-950 mb-1 flex items-center gap-2">
                                    <Lock size={14} />
                                    নতুন পাসওয়ার্ড
                                </label>
                                <div className="relative">
                                    <input
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="নতুন পাসওয়ার্ড লিখুন"
                                        className={`${inputClass} pr-11`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-rose-950 mb-1 block">পাসওয়ার্ড আবার লিখুন</label>
                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="আবার একই পাসওয়ার্ড লিখুন"
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
                                {submitting ? 'সেভ হচ্ছে...' : 'পাসওয়ার্ড বদলান'}
                            </motion.button>
                        </form>
                    </>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default ResetPassword