import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Camera, Pencil, Save } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import MedicalBackground from '../components/MedicalBackground'

const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']
const UPAZILAS = ['ফেনী সদর', 'ছাগলনাইয়া', 'সোনাগাজী', 'দাগনভূঞা', 'পরশুরাম', 'ফুলগাজী']

const inputClass =
  'w-full rounded-xl border-2 border-rose-950 px-4 py-3 text-sm font-medium text-rose-950 outline-none focus:ring-2 focus:ring-rose-950/40 bg-white transition-all'

function Account() {
  const navigate = useNavigate()
  const [donor, setDonor] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(null)

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!currentUser) {
      navigate('/')
      return
    }
    const donors = JSON.parse(localStorage.getItem('donors') || '[]')
    const myDonor = donors.find((d) => d.phone === currentUser.phone)
    setDonor(myDonor)
    setForm(myDonor)
  }, [navigate])

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setForm({ ...form, photo: reader.result })
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    const donors = JSON.parse(localStorage.getItem('donors') || '[]')
    const updated = donors.map((d) => (d.id === form.id ? form : d))
    localStorage.setItem('donors', JSON.stringify(updated))

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
    localStorage.setItem(
      'currentUser',
      JSON.stringify({ ...currentUser, name: form.name, bloodGroup: form.bloodGroup, photo: form.photo })
    )

    setDonor(form)
    setIsEditing(false)
  }

  if (!donor) {
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
        <h1 className="text-xl font-bold text-rose-950 mb-6 text-center">
          আমার অ্যাকাউন্ট
        </h1>

        <div className="flex flex-col items-center gap-2 mb-6">
          {isEditing ? (
            <label className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-rose-950 flex items-center justify-center cursor-pointer overflow-hidden">
              {form.photo ? (
                <img src={form.photo} alt="প্রোফাইল" className="w-full h-full object-cover" />
              ) : (
                <Camera size={24} className="text-rose-950" />
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          ) : (
            <div className="w-24 h-24 rounded-full bg-rose-950 text-white flex items-center justify-center font-bold text-3xl overflow-hidden">
              {donor.photo ? (
                <img src={donor.photo} alt="প্রোফাইল" className="w-full h-full object-cover" />
              ) : (
                donor.name?.charAt(0)
              )}
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border-2 border-rose-100 p-5 flex flex-col items-center gap-3 text-sm font-semibold text-rose-900">
              <h2 className="text-lg font-bold text-rose-950">{donor.name}</h2>
              <span className="bg-rose-100 text-rose-950 font-bold px-3 py-1.5 rounded-lg">
                {donor.bloodGroup}
              </span>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-rose-500" />
                {donor.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-rose-500" />
                {donor.location}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-rose-500" />
                শেষ রক্তদান: {donor.lastDonation}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="bg-rose-950 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2"
            >
              <Pencil size={16} />
              এডিট করুন
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
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
                value={form.lastDonation === 'নতুন ডোনার' ? '' : form.lastDonation}
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

      <Footer />
    </div>
  )
}

export default Account