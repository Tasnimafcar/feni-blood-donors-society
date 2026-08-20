import { useState, useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import Footer from '../components/Footer'
import BloodGroupFilter from '../components/BloodGroupFilter'
import DonorCard from '../components/DonorCard'
import MedicalBackground from '../components/MedicalBackground'
import DonorDetailsModal from '../components/DonorDetailsModal'
import { supabase } from '../supabaseClient'


function DonorSearch() {
    const [search, setSearch] = useState('')
    const [selectedGroup, setSelectedGroup] = useState('সব')
    const [selectedDonor, setSelectedDonor] = useState(null)
    const [registeredDonors, setRegisteredDonors] = useState([])
    const [loading, setLoading] = useState(true)

    const layerStack = useRef([])
    const filterLayerActive = useRef(false)

    
    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('donors')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Supabase fetch error:', error)
                setRegisteredDonors([])
            } else {
                
                const mapped = data.map((donor) => ({
                    id: `real-${donor.id}`,
                    name: donor.name,
                    englishName: donor.english_name || donor.name,
                    phone: donor.phone,
                    bloodGroup: donor.blood_group,
                    location: donor.location,
                    club: donor.club,
                    lastDonation: donor.last_donation || 'নতুন ডোনার',
                    photo: donor.photo,
                }))
                setRegisteredDonors(mapped)
            }
            setLoading(false)
        }

        fetchDonors()
    }, [])

    useEffect(() => {
        const handlePopState = () => {
            const topLayer = layerStack.current.pop()
            if (topLayer === 'modal') {
                setSelectedDonor(null)
            } else if (topLayer === 'filter') {
                setSearch('')
                setSelectedGroup('সব')
                filterLayerActive.current = false
            }
        }
        window.addEventListener('popstate', handlePopState)
        return () => window.removeEventListener('popstate', handlePopState)
    }, [])

    useEffect(() => {
        const isFilterActive = search.trim() !== '' || selectedGroup !== 'সব'
        if (isFilterActive && !filterLayerActive.current) {
            filterLayerActive.current = true
            layerStack.current.push('filter')
            window.history.pushState({ layer: 'filter' }, '')
        } else if (!isFilterActive && filterLayerActive.current) {
            filterLayerActive.current = false
            layerStack.current = layerStack.current.filter((l) => l !== 'filter')
        }
    }, [search, selectedGroup])

    const openDonorModal = (donor) => {
        setSelectedDonor(donor)
        layerStack.current.push('modal')
        window.history.pushState({ layer: 'modal' }, '')
    }

    const closeDonorModal = () => {
        if (layerStack.current[layerStack.current.length - 1] === 'modal') {
            window.history.back()
        } else {
            setSelectedDonor(null)
        }
    }

    const allDonors = [...registeredDonors ]

    const filteredDonors = allDonors.filter((donor) => {
        const query = search.trim().toLowerCase()
        const matchesSearch =
            donor.name.toLowerCase().includes(query) ||
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

                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-10 text-center px-4">
                        <p className="text-sm font-semibold text-rose-800">লোড হচ্ছে...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {filteredDonors.map((donor) => (
                                <DonorCard key={donor.id} donor={donor} onViewDetails={openDonorModal} />
                            ))}
                        </div>

                        {filteredDonors.length === 0 && (
                            <div className="flex-1 flex items-center justify-center py-10 text-center px-4">
                                <p className="text-lg font-bold">
                                    <span className="text-rose-950">কোনো ডোনার্স </span>
                                    <span className="text-rose-500">পাওয়া যায়নি</span>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>

            <Footer />
            <DonorDetailsModal donor={selectedDonor} onClose={closeDonorModal} />
        </div>
    )
}

export default DonorSearch