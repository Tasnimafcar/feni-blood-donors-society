const SESSION_KEY = 'currentUser'

// লগইন/রেজিস্ট্রেশনের পর সেশন সেভ করা — কোনো মেয়াদ নাই, একবার লগইন করলে লগআউট না করা পর্যন্ত থাকবে
export function saveSession(userData) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData))
}

// বর্তমান সেশন পড়া
export function getSession() {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null

    try {
        return JSON.parse(raw)
    } catch {
        localStorage.removeItem(SESSION_KEY)
        return null
    }
}

// লগআউট বা অ্যাকাউন্ট ডিলিটের সময় সেশন মুছে ফেলা
export function clearSession() {
    localStorage.removeItem(SESSION_KEY)
}