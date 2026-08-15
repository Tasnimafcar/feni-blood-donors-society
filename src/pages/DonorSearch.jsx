import MedicalBackground from '../components/MedicalBackground'
import { useState } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import BloodGroupFilter from '../components/BloodGroupFilter'
import DonorCard from '../components/DonorCard'

const fakeDonors = [
    { id: 1, name: 'রহিম উদ্দিন', englishName: 'Rahim Uddin', phone: '০১৭xxxxxxxx', bloodGroup: 'O+' },
    { id: 2, name: 'সাবরিনা আক্তার', englishName: 'Sabrina Akter', phone: '০১৮xxxxxxxx', bloodGroup: 'A+' },
    { id: 3, name: 'কামাল হোসেন', englishName: 'Kamal Hossain', phone: '০১৯xxxxxxxx', bloodGroup: 'O+' },
    { id: 4, name: 'নাজমুল হক', englishName: 'Nazmul Haque', phone: '০১৬xxxxxxxx', bloodGroup: 'B+' },
    { id: 5, name: 'ফারজানা ইসলাম', englishName: 'Farzana Islam', phone: '০১৭xxxxxxxx', bloodGroup: 'AB+' },
    { id: 6, name: 'তানভীর আহমেদ', englishName: 'Tanvir Ahmed', phone: '০১৫xxxxxxxx', bloodGroup: 'O−' },
]
function DonorSearch() {
    const [search, setSearch] = useState('')
    const [selectedGroup, setSelectedGroup] = useState('সব')

    const filteredDonors = fakeDonors.filter((donor) => {
        const query = search.trim().toLowerCase()
        const matchesSearch =
            donor.name.includes(query) ||
            donor.englishName.toLowerCase().includes(query)
        const matchesGroup = selectedGroup === 'সব' || donor.bloodGroup === selectedGroup
        return matchesSearch && matchesGroup
    })

    return (
        <div className="min-h-screen bg-rose-50 relative flex flex-col">
            <MedicalBackground />
            <Navbar />
            <BackButton />

            <div className="max-w-3xl mx-auto px-6 py-8 flex-1 w-full">
                <div className="relative mb-4">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="ডোনার খুঁজুন"
                        className="w-full rounded-xl border border-rose-200 pl-11 pr-4 py-3 text-sm outline-none focus:border-rose-950"
                    />
                </div>

                <div className="mb-6">
                    <BloodGroupFilter selected={selectedGroup} onSelect={setSelectedGroup} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    {filteredDonors.map((donor) => (
                        <DonorCard key={donor.id} donor={donor} />
                    ))}
                </div>

                {filteredDonors.length === 0 && (
                    <div className="flex-1 flex items-center justify-center py-10">
                        <p className="text-lg font-bold whitespace-nowrap">
                            <span className="text-rose-950">কোনো ডোনার্স </span>
                            <span className="text-rose-500">পাওয়া যায়নি</span>
                        </p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default DonorSearch