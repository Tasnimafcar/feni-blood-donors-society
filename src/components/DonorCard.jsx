import { Link } from 'react-router-dom'
import { Phone } from 'lucide-react'

function DonorCard({ donor }) {
    return (
        <div className="bg-white rounded-2xl border border-rose-100 p-4 flex flex-col gap-3">
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
            <Link
                to={`/donors/${donor.id}`}
                className="text-center bg-rose-900 text-white text-sm font-semibold py-3 rounded-xl"
            >
                বিস্তারিত দেখুন
            </Link>
        </div>
    )
}

export default DonorCard