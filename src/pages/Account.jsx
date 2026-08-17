import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MapPin, Clock, Camera, Pencil, Save, Trash2, CheckCircle2, LogOut } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'
import { supabase } from '../supabaseClient'
import { getSession, saveSession, clearSession } from '../utils/session'

const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']
const UPAZILAS = ['ফেনী সদর', 'ছাগলনাইয়া', 'সোনাগাজী', 'দাগনভূঞা', 'পরশুরাম', 'ফুলগাজী']

const inputClass =
  'w-full rounded-xl border-2 border-rose-950 px-4 py-3 text-sm font-medium text-rose-950 outline-none focus:ring-2 focus:ring-rose-950/40 bg-white transition-all'

// Supabase row (snake_case) -> app-এর ব্যবহার করা shape (camelCase)
const mapFromDb = (row) => ({
  id: row.id,
  name: row.name,
  phone: row.phone,
  bloodGroup: row.blood_group,
  location: row.location,
  fatherName: row.father_name,
  motherName: row.mother_name,
  club: row.club,
  lastDonation: row.last_donation,
  photo: row.photo,
})

function Account() {
  const navigate = useNavigate()
  const [donor, setDonor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [fatherNameInput, setFatherNameInput] = useState('')
  const [deleteError, setDeleteError] = useState('')
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)

  useEffect(() => {
    const fetchMyDonor = async () => {
      const currentUser = getSession()
      if (!currentUser) {
        navigate('/login')
        return
      }

      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .eq('phone', currentUser.phone)
        .maybeSingle()

      if (error || !data) {
        console.error('Supabase fetch error:', error)
        navigate('/login')
        return
      }

      const myDonor = mapFromDb(data)
      setDonor(myDonor)
      setForm(myDonor)
      setLoading(false)
    }

    fetchMyDonor()
  }, [navigate])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setForm({ ...form, photo: reader.result })
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    const { error } = await supabase
      .from('donors')
      .update({
        name: form.name,
        blood_group: form.bloodGroup,
        location: form.location,
        last_donation: form.lastDonation || null,
        club: form.club,
        photo: form.photo,
      })
      .eq('id', form.id)

    if (error) {
      console.error('Supabase update error:', error)
      alert('দুঃখিত, সেভ করা যায়নি। আবার চেষ্টা করুন।')
      return
    }

    const currentUser = getSession()
    saveSession({ ...currentUser, name: form.name, bloodGroup: form.bloodGroup, photo: form.photo })

    setDonor(form)
    setIsEditing(false)
  }

  const handleDeleteAttempt = async () => {
    if (fatherNameInput.trim() !== donor.fatherName?.trim()) {
      setDeleteError('বাবার নাম মিলছে না। সঠিক নাম লিখুন।')
      return
    }
    setDeleteError('')

    const { error } = await supabase
      .from('donors')
      .delete()
      .eq('id', donor.id)

    if (error) {
      console.error('Supabase delete error:', error)
      setDeleteError('মুছতে সমস্যা হয়েছে, আবার চেষ্টা করুন।')
      return
    }

    clearSession()

    setShowDeleteConfirm(false)
    setShowDeleteSuccess(true)
  }

  const handleLogout = () => {
    clearSession()
    navigate('/')
  }

  if (loading || !donor) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center">
        <p className="text-rose-950 font-semibold">লোড হচ্ছে...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-rose-50 relative flex flex-col">
      <MedicalBackground />
      <Navbar />
      <BackButton />

      <div className="max-w-md mx-auto px-6 py-8 flex-1 w-full">
        {!isEditing ? (
          <div className="bg-white rounded-2xl border-2 border-rose-100 overflow-hidden">
            <div className="flex items-center gap-4 p-5 border-b border-rose-100">
              <div className="w-20 h-20 rounded-full bg-rose-950 text-white flex items-center justify-center font-bold text-2xl overflow-hidden flex-shrink:0">
                {donor.photo ? (
                  <img src={donor.photo} alt="প্রোফাইল" className="w-full h-full object-cover" />
                ) : (
                  donor.name?.charAt(0)
                )}
              </div>
              <div>
                <h1 className="text-lg font-bold text-rose-950">{donor.name}</h1>
                <span className="inline-block mt-1 bg-rose-100 text-rose-950 font-bold text-sm px-3 py-1 rounded-lg">
                  {donor.bloodGroup}
                </span>
              </div>
            </div>

            <div className="p-5 flex flex-col gap-3 text-sm font-semibold text-rose-900">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-rose-500 flex-shrink:0" />
                {donor.phone}
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-rose-500 flex-shrink:0" />
                {donor.location}
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-rose-500 flex-shrink:0" />
                শেষ রক্তদান: {donor.lastDonation || 'নতুন ডোনার'}
              </div>
            </div>

            <div className="flex border-t border-rose-100">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsEditing(true)}
                className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold text-rose-950 border-r border-rose-100"
              >
                <Pencil size={16} />
                এডিট করুন
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setFatherNameInput('')
                  setDeleteError('')
                  setShowDeleteConfirm(true)
                }}
                className="flex-1 py-4 flex items-center justify-center gap-2 text-sm font-bold text-rose-700"
              >
                <Trash2 size={16} />
                অ্যাকাউন্ট মুছুন
              </motion.button>
            </div>

            <div className="border-t border-rose-100">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-rose-500"
              >
                <LogOut size={16} />
                লগআউট করুন
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
              <label className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-rose-950 flex items-center justify-center cursor-pointer overflow-hidden">
                {form.photo ? (
                  <img src={form.photo} alt="প্রোফাইল" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={24} className="text-rose-950" />
                )}
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </label>
              <span className="text-xs font-semibold text-rose-950">ছবি বদলান</span>
            </div>

            <div>
              <label className="text-sm font-bold text-rose-950 mb-1 block">নাম</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-rose-950 mb-2 block">ব্লাড গ্রুপ</label>
              <div className="flex flex-wrap gap-2">
                {BLOOD_GROUPS.map((group) => (
                  <button
                    key={group}
                    type="button"
                    onClick={() => setForm({ ...form, bloodGroup: group })}
                    className={`px-4 py-2 rounded-full border-2 text-sm font-bold ${
                      form.bloodGroup === group
                        ? 'bg-rose-950 text-white border-rose-950'
                        : 'bg-white text-rose-950 border-rose-300'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-rose-950 mb-1 block">এলাকা</label>
              <select
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className={inputClass}
              >
                {UPAZILAS.map((upazila) => (
                  <option key={upazila} value={upazila}>{upazila}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-bold text-rose-950 mb-1 block">শেষ রক্তদানের তারিখ</label>
              <input
                value={form.lastDonation || ''}
                onChange={(e) => setForm({ ...form, lastDonation: e.target.value })}
                type="date"
                className={inputClass}
              />
            </div>

            <div>
              <label className="text-sm font-bold text-rose-950 mb-1 block">রক্তদাতা ক্লাব</label>
              <input
                value={form.club === '—' ? '' : form.club}
                onChange={(e) => setForm({ ...form, club: e.target.value || '—' })}
                placeholder="ক্লাবের নাম"
                className={inputClass}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="bg-rose-950 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2"
            >
              <Save size={16} />
              সেভ করুন
            </motion.button>
          </div>
        )}
      </div>

      {/* ডিলিট কনফার্মেশন - বাবার নাম যাচাই */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(false)}
            className="fixed inset-0 bg-black/60 flex items-center justify-center px-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
            >
              <Trash2 size={40} className="text-rose-700 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-rose-950 mb-2">
                আপনি কি নিশ্চিত?
              </h2>
              <p className="text-sm font-medium text-rose-800 mb-4">
                নিশ্চিত করতে আপনার বাবার নাম লিখুন। এটা স্থায়ীভাবে মুছে যাবে, ফিরিয়ে আনা যাবে না।
              </p>
              <input
                value={fatherNameInput}
                onChange={(e) => setFatherNameInput(e.target.value)}
                placeholder="বাবার নাম লিখুন"
                className={`${inputClass} mb-2 text-center`}
              />
              {deleteError && (
                <p className="text-xs font-semibold text-rose-700 mb-3">{deleteError}</p>
              )}
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 bg-rose-50 text-rose-950 border border-rose-200 py-3 rounded-xl font-semibold"
                >
                  বাতিল করুন
                </button>
                <button
                  onClick={handleDeleteAttempt}
                  className="flex-1 bg-rose-700 text-white py-3 rounded-xl font-semibold"
                >
                  মুছে ফেলুন
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ডিলিট সফল হওয়ার এলার্ট */}
      <AnimatePresence>
        {showDeleteSuccess && (
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
                অ্যাকাউন্ট মুছে ফেলা হয়েছে
              </h2>
              <p className="text-sm font-medium text-rose-800 mb-6">
                আপনার অ্যাকাউন্ট ও সব তথ্য সফলভাবে মুছে ফেলা হয়েছে।
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
                className="bg-rose-950 text-white rounded-xl py-3 px-8 font-bold"
              >
                হোমে ফিরে যান
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}

export default Account