import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'

function DonorCard({ donor, onViewDetails }) {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-rose-100 p-4 flex flex-col gap-3 shadow-sm hover:shadow-lg"
        >
            <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-rose-950 text-white flex items-center justify-center font-semibold text-lg flex-shrink:0">
                    {donor.name.charAt(0)}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-rose-950 truncate">{donor.name}</p>
                    <p className="text-sm text-rose-700/70 flex items-center gap-1">
                        <Phone size={13} />
                        {donor.phone}
                    </p>
                </div>
                <span className="ml-auto bg-rose-100 text-rose-950 text-sm font-bold px-3 py-1 rounded-lg flex-shrink:0">
                    {donor.bloodGroup}
                </span>
            </div>
            <motion.button
                onClick={() => onViewDetails(donor)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-center bg-rose-950 text-white text-sm font-semibold py-3 rounded-xl"
            >
                বিস্তারিত দেখুন
            </motion.button>
        </motion.div>
    )
}

export default DonorCard