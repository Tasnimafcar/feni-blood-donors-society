import Logo from './LogoTemp'

function Navbar() {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-white/30 backdrop-blur-xl border-b border-white/40 shadow-lg">
            <div className="flex items-center gap-2">
                <Logo size={32} />
                <span className="text-xl font-semibold">
                    <span className="text-rose-950">ফেনী ব্লাড </span>
                    <span className="text-rose-500">ডোনার্স সোসাইটি</span>
                </span>
            </div>
        </nav>
    )
}

export default Navbar