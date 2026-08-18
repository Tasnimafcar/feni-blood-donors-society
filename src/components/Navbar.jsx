import { useState, useEffect } from 'react'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import { getSession, saveSession, clearSession } from '../utils/session'
import { supabase } from '../supabaseClient'

function Navbar() {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const syncSession = async () => {
            const session = getSession()
            if (!session) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('donors')
                .select('*')
                .eq('phone', session.phone)
                .maybeSingle()

            if (error || !data) {
                // ডোনার আর ডাটাবেজে নেই (অন্য ডিভাইস থেকে মুছে ফেলা হয়েছে) — সেশন মুছে ফেলো
                clearSession()
                setCurrentUser(null)
            } else {
                const freshUser = {
                    phone: data.phone,
                    password: data.password,
                    name: data.name,
                    bloodGroup: data.blood_group,
                    photo: data.photo,
                }
                saveSession(freshUser)
                setCurrentUser(freshUser)
            }
            setLoading(false)
        }

        syncSession()
    }, [])

    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/30 backdrop-blur-xl border-b border-white/40 shadow-lg">
            <div className="flex items-center gap-2">
                <Logo size={32} />
                <span className="text-base font-semibold">
                    <span className="text-rose-950">ফেনী ব্লাড </span>
                    <span className="text-rose-500">ডোনার্স সোসাইটি</span>
                </span>
            </div>
            {!loading && (
                currentUser ? (
                    <Link to="/account" className="w-9 h-9 rounded-full bg-rose-950 text-white flex items-center justify-center font-bold text-sm overflow-hidden">
                        {currentUser.photo ? (
                            <img src={currentUser.photo} alt="প্রোফাইল" className="w-full h-full object-cover" />
                        ) : (
                            currentUser.name?.charAt(0)
                        )}
                    </Link>
                ) : (
                    <Link to="/login" className="text-sm font-bold text-rose-950 underline">
                        লগইন
                    </Link>
                )
            )}
        </nav>
    )
}

export default Navbar