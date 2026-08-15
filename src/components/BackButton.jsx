import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

function BackButton() {
  const navigate = useNavigate()

  return (
    <motion.button
      onClick={() => navigate(-1)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      className="flex items-center gap-2 text-base md:text-lg font-bold text-rose-950 hover:text-rose-700 px-6 pt-4"
    >
      <ArrowLeft size={20} className="md:w-6 md:h-6" />
      ফিরে যান
    </motion.button>
  )
}

export default BackButton