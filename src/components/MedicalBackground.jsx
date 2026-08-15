import { motion } from 'framer-motion'

const icons = [
    { type: 'cross', top: '6%', left: '10%', delay: 0 },
    { type: 'drop', top: '12%', left: '80%', delay: 0.5 },
    { type: 'heartbeat', top: '20%', left: '35%', delay: 1 },
    { type: 'cross', top: '15%', left: '55%', delay: 1.5 },
    { type: 'drop', top: '30%', left: '5%', delay: 0.3 },
    { type: 'heartbeat', top: '38%', left: '70%', delay: 0.8 },
    { type: 'cross', top: '45%', left: '25%', delay: 1.2 },
    { type: 'drop', top: '50%', left: '90%', delay: 0.6 },
    { type: 'cross', top: '58%', left: '60%', delay: 0.2 },
    { type: 'drop', top: '65%', left: '15%', delay: 1.4 },
    { type: 'heartbeat', top: '70%', left: '45%', delay: 0.9 },
    { type: 'cross', top: '80%', left: '80%', delay: 0.4 },
    { type: 'drop', top: '85%', left: '30%', delay: 1.1 },
    { type: 'heartbeat', top: '90%', left: '8%', delay: 0.7 },
    { type: 'cross', top: '25%', left: '90%', delay: 1.3 },
    { type: 'drop', top: '5%', left: '45%', delay: 0.1 },
]

function CrossIcon() {
    return (
        <svg width="38" height="38" viewBox="0 0 24 24">
            <rect x="10" y="3" width="4" height="18" rx="1" fill="#6E1F1F" />
            <rect x="3" y="10" width="18" height="4" rx="1" fill="#6E1F1F" />
        </svg>
    )
}

function DropIcon() {
    return (
        <svg width="34" height="40" viewBox="0 0 22 26">
            <path
                d="M11 2 L18 12 Q20 15 20 18 Q20 24 11 25 Q2 24 2 18 Q2 15 4 12 Z"
                fill="#8A2C2C"
            />
        </svg>
    )
}

function HeartbeatIcon() {
    return (
        <svg width="90" height="36" viewBox="0 0 60 24">
            <polyline
                points="0,12 15,12 20,4 26,20 32,12 60,12"
                fill="none"
                stroke="#6E1F1F"
                strokeWidth="2.5"
            />
        </svg>
    )
}

function MedicalBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
            {icons.map((icon, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{ top: icon.top, left: icon.left }}
                    animate={{
                        y: [0, -28, 0],
                        rotate: [-10, 10, -10],
                    }}
                    transition={{
                        duration: 2.5 + (i % 3),
                        repeat: Infinity,
                        delay: icon.delay,
                        ease: 'easeInOut',
                    }}
                >
                    {icon.type === 'cross' && <CrossIcon />}
                    {icon.type === 'drop' && <DropIcon />}
                    {icon.type === 'heartbeat' && <HeartbeatIcon />}
                </motion.div>
            ))}
        </div>
    )
}

export default MedicalBackground