import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { supabase } from '../supabaseClient'
import { saveSession } from '../utils/session'

const inputClass =
    'w-full rounded-xl border-2 border-rose-950 px-4 py-3 text-sm font-medium text-rose-950 outline-none focus:ring-2 focus:ring-rose-950/40 bg-white transition-all'

function Login() {
    const navigate = useNavigate()
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
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

        if (data.password !== password) {
            setError('পাসওয়ার্ড সঠিক নয়।')
            return
        }

        saveSession({
            phone: data.phone,
            password: data.password,
            name: data.name,
            bloodGroup: data.blood_group,
            photo: data.photo,
        })

        navigate('/account', { replace: true })
    }

    return (
        <div className="min-h-screen bg-rose-50 relative flex flex-col">
            <MedicalBackground />
            <Navbar />
            <BackButton />

            <div className="max-w-md mx-auto px-6 py-8 flex-1 w-full">
                <h1 className="text-xl font-bold text-rose-950 mb-6 text-center">
                    লগইন করুন
                </h1>

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
                        <label className="text-sm font-bold text-rose-950 mb-1 flex items-center gap-2">
                            <Lock size={14} />
                            পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={showPassword ? 'text' : 'password'}
                                placeholder="আপনার পাসওয়ার্ড"
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
                        <Link
                            to="/forgot-password"
                            className="text-xs font-semibold text-rose-700 underline mt-2 inline-block"
                        >
                            পাসওয়ার্ড ভুলে গেছেন?
                        </Link>
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
                        {submitting ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
                    </motion.button>

                    <p className="text-sm font-medium text-rose-800 text-center">
                        নতুন ডোনার?{' '}
                        <Link to="/register" className="font-bold text-rose-950 underline">
                            রেজিস্ট্রেশন করুন
                        </Link>
                    </p>
                </form>
            </div>

            <Footer />
        </div>
    )
}

export default Login