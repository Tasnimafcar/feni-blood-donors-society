import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Lock, Eye, EyeOff, X, CheckCircle2 } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { supabase } from '../supabaseClient'
import { getSession, saveSession } from '../utils/session'

const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']
const UPAZILAS = ['ফেনী সদর', 'ছাগলনাইয়া', 'সোনাগাজী', 'দাগনভূঞা', 'পরশুরাম', 'ফুলগাজী']

const inputClass =
    'w-full rounded-xl border-2 border-rose-950 px-4 py-3 text-sm font-medium text-rose-950 outline-none focus:ring-2 focus:ring-rose-950/40 bg-white transition-all'

function Register() {
    const navigate = useNavigate()
    const [photoPreview, setPhotoPreview] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [bloodGroup, setBloodGroup] = useState('')
    const [location, setLocation] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [isNewDonor, setIsNewDonor] = useState(false)
    const [lastDonation, setLastDonation] = useState('')
    const [club, setClub] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPhotoPreview, setShowPhotoPreview] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [alreadyRegistered, setAlreadyRegistered] = useState(false)
    const [shake, setShake] = useState(false)

    useEffect(() => {
        const currentUser = getSession()
        if (currentUser) setAlreadyRegistered(true)
    }, [])

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => setPhotoPreview(reader.result)
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (alreadyRegistered) {
            setShake(true)
            setTimeout(() => setShake(false), 500)
            return
        }

        setSubmitting(true)

        const newDonor = {
            name: name.trim(),
            phone: phone.trim(),
            blood_group: bloodGroup,
            location,
            father_name: fatherName,
            mother_name: motherName,
            club: club.trim() || '—',
            last_donation: isNewDonor ? null : lastDonation,
            photo: photoPreview,
            password: password.trim(),
        }

        const { error } = await supabase.from('donors').insert([newDonor])

        setSubmitting(false)

        if (error) {
            console.error('Supabase insert error:', error)
            alert('দুঃখিত, রেজিস্ট্রেশন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
            return
        }

        saveSession({ phone, password, name, bloodGroup, photo: photoPreview })

        setShowSuccess(true)
    }

    return (
        <div className="min-h-screen bg-rose-50 relative flex flex-col">
            <MedicalBackground />
            <Navbar />
            <BackButton />

            <div className="max-w-md mx-auto px-6 py-8 flex-1 w-full">
                <h1 className="text-xl font-bold text-rose-950 mb-6 text-center">
                    ডোনার রেজিস্ট্রেশন
                </h1>

                {alreadyRegistered && (
                    <p className="text-sm font-semibold text-rose-700 bg-rose-100 border border-rose-300 rounded-xl px-4 py-3 mb-6 text-center">
                        আপনি ইতিমধ্যে রেজিস্ট্রেশন করে ফেলেছেন
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col items-center gap-2">
                        {photoPreview ? (
                            <button
                                type="button"
                                onClick={() => setShowPhotoPreview(true)}
                                className="w-24 h-24 rounded-full border-2 border-rose-950 overflow-hidden"
                            >
                                <img src={photoPreview} alt="প্রোফাইল প্রিভিউ" className="w-full h-full object-cover pointer-events-none" />
                            </button>
                        ) : (
                            <motion.label
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-rose-950 flex items-center justify-center cursor-pointer overflow-hidden focus-within:border-4 transition-all"
                            >
                                <Camera size={24} className="text-rose-950" />
                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                            </motion.label>
                        )}
                        {!photoPreview && (
                            <span className="text-xs font-semibold text-rose-950">প্রোফাইল ছবি (ঐচ্ছিক)</span>
                        )}
                        {photoPreview && (
                            <label className="text-xs font-semibold text-rose-950 underline cursor-pointer">
                                ছবি বদলান
                                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                            </label>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">নাম</label>
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.03 }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="আপনার পূর্ণ নাম"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">ফোন নাম্বার</label>
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.03 }}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            type="tel"
                            placeholder="017XXXXXXXX"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-2 block">ব্লাড গ্রুপ</label>
                        <div className="flex flex-wrap gap-2">
                            {BLOOD_GROUPS.map((group) => (
                                <motion.button
                                    key={group}
                                    type="button"
                                    onClick={() => setBloodGroup(group)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`px-4 py-2 rounded-full border-2 text-sm font-bold ${bloodGroup === group
                                        ? 'bg-rose-950 text-white border-rose-950'
                                        : 'bg-white text-rose-950 border-rose-300'
                                        }`}
                                >
                                    {group}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">এলাকা</label>
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className={inputClass}
                        >
                            <option value="" disabled>উপজেলা সিলেক্ট করুন</option>
                            {UPAZILAS.map((upazila) => (
                                <option key={upazila} value={upazila}>{upazila}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">বাবার নাম</label>
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.03 }}
                            value={fatherName}
                            onChange={(e) => setFatherName(e.target.value)}
                            required
                            placeholder="বাবার নাম"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">মায়ের নাম</label>
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.03 }}
                            value={motherName}
                            onChange={(e) => setMotherName(e.target.value)}
                            required
                            placeholder="মায়ের নাম"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">শেষ রক্তদানের তারিখ</label>
                        <motion.input
                            whileHover={{ scale: isNewDonor ? 1 : 1.02 }}
                            whileFocus={{ scale: isNewDonor ? 1 : 1.03 }}
                            value={lastDonation}
                            onChange={(e) => setLastDonation(e.target.value)}
                            type="date"
                            disabled={isNewDonor}
                            className={`${inputClass} disabled:bg-rose-100 disabled:text-rose-300 disabled:border-rose-200`}
                        />
                        <label className="flex items-center gap-2 mt-2 text-sm font-semibold text-rose-800">
                            <input
                                type="checkbox"
                                checked={isNewDonor}
                                onChange={(e) => {
                                    setIsNewDonor(e.target.checked)
                                    if (e.target.checked) setLastDonation('')
                                }}
                                className="w-4 h-4 accent-rose-950"
                            />
                            আমি এর আগে কখনো রক্ত দেইনি (নতুন ডোনার)
                        </label>
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 block">রক্তদাতা ক্লাব</label>
                        <p className="text-xs font-medium text-rose-800 mb-2">
                            আপনি যদি কোনো রক্তদাতা সংগঠন বা ক্লাবের সদস্য হয়ে থাকেন তার নাম এখানে লিখুন। এটা ঐচ্ছিক — না থাকলে ফাঁকা রাখতে পারেন।
                        </p>
                        <motion.input
                            whileHover={{ scale: 1.02 }}
                            whileFocus={{ scale: 1.03 }}
                            value={club}
                            onChange={(e) => setClub(e.target.value)}
                            placeholder="ক্লাবের নাম এখানে লিখুন"
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-bold text-rose-950 mb-1 flex items-center gap-2">
                            <Lock size={14} />
                            পাসওয়ার্ড
                        </label>
                        <div className="relative">
                            <motion.input
                                whileHover={{ scale: 1.02 }}
                                whileFocus={{ scale: 1.03 }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type={showPassword ? 'text' : 'password'}
                                placeholder="পরে লগইন করতে এই পাসওয়ার্ড লাগবে"
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

                    <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className="bg-rose-950 text-white rounded-xl py-3 font-bold mt-2 disabled:opacity-60"
                    >
                        {submitting ? 'সেভ হচ্ছে...' : 'রেজিস্ট্রেশন করুন'}
                    </motion.button>
                </form>
            </div>

            <AnimatePresence>
                {showPhotoPreview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPhotoPreview(false)}
                        className="fixed inset-0 bg-black/70 flex items-center justify-center px-6 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative"
                        >
                            <img
                                src={photoPreview}
                                alt="প্রোফাইল ছবি বড় প্রিভিউ"
                                className="max-w-xs max-h-[70vh] rounded-2xl border-4 border-white"
                            />
                            <button
                                onClick={() => setShowPhotoPreview(false)}
                                className="absolute -top-3 -right-3 bg-white text-rose-950 rounded-full p-2"
                            >
                                <X size={18} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            className="bg-white rounded-2xl p-8 w-full max-w-sm text-center"
                        >
                            <CheckCircle2 size={56} className="text-rose-950 mx-auto mb-4" />
                            <h2 className="text-xl font-bold text-rose-950 mb-3">
                                শুভেচ্ছা ও অভিনন্দন!
                            </h2>
                            <p className="text-sm font-medium text-rose-800 mb-6">
                                আপনি এখন ফেনী ব্লাড ডোনার্স সোসাইটির একজন সম্মানিত সদস্য। আপনার এই উদ্যোগ কারো জীবন বাঁচাতে সাহায্য করবে।
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate('/')}
                                className="bg-rose-950 text-white rounded-xl py-3 px-8 font-bold"
                            >
                                ঠিক আছে
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </div>
    )
}

export default Register