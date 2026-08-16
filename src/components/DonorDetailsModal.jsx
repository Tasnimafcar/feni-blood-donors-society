import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, MapPin, Clock } from 'lucide-react'

function DonorDetailsModal({ donor, onClose }) {
    return (
        <AnimatePresence>
            {donor && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-6 w-full max-w-sm"
                    >
                        <div className="relative flex justify-center mb-4">
                            <div className="w-16 h-16 rounded-full bg-rose-950 text-white flex items-center justify-center font-bold text-2xl overflow-hidden">
                                {donor.photo ? (
                                    <img src={donor.photo} alt={donor.name} className="w-full h-full object-cover" />
                                ) : (
                                    donor.name.charAt(0)
                                )}
                            </div>
                            <span className="absolute left-0 top-0 bg-rose-100 text-rose-950 font-bold px-3 py-1.5 rounded-lg">
                                {donor.bloodGroup}
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-rose-950 mb-4 text-center">{donor.name}</h2>

                        <div className="flex flex-col items-center gap-3 text-sm font-semibold text-rose-900 mb-6">
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
                                শেষ রক্তদান: {donor.lastDonation}
                            </div>
                        </div>

                        {donor.club && donor.club !== '—' && (
                            <div className="text-sm font-semibold text-rose-900 mb-4 border-t-2 border-rose-300 pt-4 text-center">
                                <p>{donor.club}-</p>
                                <p>এর একজন সম্মানিত সদস্য</p>
                            </div>
                        )}
                        <div className="flex gap-3">
                            <motion.a
                                href={`tel:${donor.phone}`}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-rose-950 text-white text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                            >
                                <Phone size={16} />
                                কল করুন
                            </motion.a>
                            <motion.button
                                onClick={onClose}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 bg-rose-50 text-rose-950 border border-rose-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                            >
                                <X size={16} />
                                বন্ধ করুন
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DonorDetailsModal