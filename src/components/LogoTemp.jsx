function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" aria-hidden="true">
      <circle cx="45" cy="45" r="38" fill="#3D0E0E" />
      <path
        d="M36 20 L48 38 Q53 45 53 51 Q53 65 36 68 Q19 65 19 51 Q19 45 24 38 Z"
        fill="#8A2C2C"
        opacity="0.85"
      />
      <path
        d="M54 30 L66 48 Q71 55 71 61 Q71 75 54 78 Q37 75 37 61 Q37 55 42 48 Z"
        fill="#EBC5C5"
      />
    </svg>
  )
}

export default Logo