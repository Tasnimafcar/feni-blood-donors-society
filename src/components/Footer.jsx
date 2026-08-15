import { Phone, Mail, Clock } from 'lucide-react'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  )
}

function Footer() {
  return (
    <footer className="bg-rose-950 text-white px-6 py-12 mt-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-4 text-rose-200 text-base font-medium">
          <Clock size={18} />
          <span>২৪/৭ সবসময় পাশে আছি</span>
        </div>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-base font-medium">
          <a href="tel:+8801585045382" className="flex items-center gap-3 text-rose-100 hover:text-white">
            <Phone size={18} className="flex-shrink:0" />
            <span>01585045382</span>
          </a>
          <a href="https://facebook.com/yourpage" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-rose-100 hover:text-white">
            <span className="font-bold text-lg w-4.5 text-center flex-shrink:0">f</span>
            <span>Feni blood donners society</span>
          </a>
          <a href="mailto:feniblooddonnerssociety@gmail.com" className="flex items-center gap-3 text-rose-100 hover:text-white text-base">
            <Mail size={18} className="flex-shrink:0" />
            <span className="break-all">feniblooddonnerssociety@gmail.com</span>
          </a>
          <a href="https://instagram.com/yourhandle" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-rose-100 hover:text-white">
            <InstagramIcon />
            <span>Feni Blood donners society</span>
          </a>
        </div>

        <div className="border-t border-rose-800 mt-10 pt-6">
          <p className="text-base text-rose-300">
            © ২০২৬ ফেনী ব্লাড ডোনার্স সোসাইটি
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer