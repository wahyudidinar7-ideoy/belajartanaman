import React from 'react';

interface IllustrationProps {
  name: string;
  className?: string;
  size?: number | string;
}

export const CharacterAvatar: React.FC<{
  character: 'bimo' | 'ayu';
  className?: string;
  size?: number;
  isDancing?: boolean;
}> = ({ character, className = '', size = 80, isDancing = false }) => {
  if (character === 'bimo') {
    // Boy with farmer straw hat & overalls
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${isDancing ? 'animate-bounce' : ''} ${className}`}
      >
        <circle cx="50" cy="50" r="48" fill="#ecfdf5" stroke="#10b981" strokeWidth="3" />
        {/* Straw Farmer Hat */}
        <ellipse cx="50" cy="30" rx="36" ry="10" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
        <path d="M28 28C28 16 38 12 50 12C62 12 72 16 72 28Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
        <path d="M30 26C40 28 60 28 70 26" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
        
        {/* Face */}
        <circle cx="50" cy="48" r="22" fill="#fed7aa" />
        {/* Hair bangs */}
        <path d="M34 38C38 34 46 38 50 35C54 38 62 34 66 38" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
        {/* Rosy Cheeks */}
        <ellipse cx="36" cy="53" rx="4" ry="2.5" fill="#f87171" opacity="0.6" />
        <ellipse cx="64" cy="53" rx="4" ry="2.5" fill="#f87171" opacity="0.6" />
        {/* Smiling Eyes */}
        <path d="M37 46C39 44 43 44 45 46" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M55 46C57 44 61 44 63 46" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        {/* Big Happy Smile */}
        <path d="M42 54C46 59 54 59 58 54" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" />
        {/* Body / Overalls */}
        <path d="M32 70C32 63 40 62 50 62C60 62 68 63 68 70V94H32V70Z" fill="#15803d" />
        <path d="M42 63V85" stroke="#fef08a" strokeWidth="2" />
        <path d="M58 63V85" stroke="#fef08a" strokeWidth="2" />
        {/* Little badge leaf */}
        <circle cx="50" cy="74" r="5" fill="#fbbf24" />
        <path d="M49 71C52 72 53 75 50 76C48 76 47 73 49 71Z" fill="#16a34a" />
      </svg>
    );
  }

  // Ayu: Girl with floral ribbon & sunny smile
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isDancing ? 'animate-bounce' : ''} ${className}`}
    >
      <circle cx="50" cy="50" r="48" fill="#fdf2f8" stroke="#ec4899" strokeWidth="3" />
      {/* Hair Behind */}
      <path d="M24 40C20 60 22 75 30 80C34 76 34 55 35 45Z" fill="#78350f" />
      <path d="M76 40C80 60 78 75 70 80C66 76 66 55 65 45Z" fill="#78350f" />

      {/* Flower Ribbon on Hair */}
      <circle cx="68" cy="24" r="7" fill="#f43f5e" />
      <circle cx="63" cy="21" r="5" fill="#fda4af" />
      <circle cx="73" cy="21" r="5" fill="#fda4af" />
      <circle cx="68" cy="17" r="5" fill="#fda4af" />
      <circle cx="68" cy="24" r="3.5" fill="#fef08a" />

      {/* Face */}
      <circle cx="50" cy="48" r="22" fill="#fed7aa" />
      {/* Front bangs */}
      <path d="M30 40C38 32 62 32 70 40" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
      {/* Rosy Cheeks */}
      <ellipse cx="36" cy="53" rx="4.5" ry="3" fill="#fb7185" opacity="0.7" />
      <ellipse cx="64" cy="53" rx="4.5" ry="3" fill="#fb7185" opacity="0.7" />
      {/* Sparkly Eyes */}
      <circle cx="41" cy="46" r="3.5" fill="#451a03" />
      <circle cx="42" cy="45" r="1.2" fill="#ffffff" />
      <circle cx="59" cy="46" r="3.5" fill="#451a03" />
      <circle cx="60" cy="45" r="1.2" fill="#ffffff" />
      {/* Big Joyful Smile */}
      <path d="M42 54C46 60 54 60 58 54" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" />
      {/* Dress with floral apron */}
      <path d="M30 70C30 63 38 62 50 62C62 62 70 63 70 70V94H30V70Z" fill="#ec4899" />
      <path d="M38 64H62V88C62 88 56 90 50 90C44 90 38 88 38 88V64Z" fill="#ffffff" />
      <circle cx="50" cy="74" r="4" fill="#fbbf24" />
      <path d="M46 74H54" stroke="#f43f5e" strokeWidth="1.5" />
    </svg>
  );
};

export const GameArt: React.FC<IllustrationProps> = ({ name, className = '', size = 56 }) => {
  const s = typeof size === 'number' ? `${size}px` : size;

  switch (name) {
    case 'seed':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#ecfdf5" stroke="#10b981" strokeWidth="3" />
          {/* Earth pot */}
          <path d="M30 65H70L64 85H36L30 65Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <ellipse cx="50" cy="65" rx="20" ry="5" fill="#92400e" />
          {/* Little green seed with sprout */}
          <ellipse cx="50" cy="62" rx="12" ry="9" fill="#84cc16" stroke="#4d7c0f" strokeWidth="2" />
          <path d="M50 54C50 42 62 38 65 30C52 32 46 42 48 54" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <path d="M48 48C42 42 34 44 32 38C38 38 45 42 47 48" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
          {/* Smiling face on seed */}
          <circle cx="46" cy="60" r="1.5" fill="#14532d" />
          <circle cx="54" cy="60" r="1.5" fill="#14532d" />
          <path d="M47 64C49 66 52 66 54 64" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'water-can':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f0f9ff" stroke="#0ea5e9" strokeWidth="3" />
          {/* Blue watering can */}
          <rect x="32" y="44" width="36" height="32" rx="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
          {/* Spout */}
          <path d="M68 56L82 42" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="83" cy="41" rx="4" ry="7" transform="rotate(30 83 41)" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
          {/* Handle */}
          <path d="M32 50C22 50 20 70 32 72" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Water drops */}
          <path d="M85 54C85 57 88 57 88 54C88 51 85 49 85 54Z" fill="#0284c7" />
          <path d="M78 64C78 68 82 68 82 64C82 60 78 58 78 64Z" fill="#38bdf8" />
          <path d="M86 70C86 74 90 74 90 70C90 66 86 64 86 70Z" fill="#0284c7" />
        </svg>
      );

    case 'sun':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fefce8" stroke="#facc15" strokeWidth="3" />
          {/* Rays */}
          <g stroke="#f59e0b" strokeWidth="4" strokeLinecap="round">
            <line x1="50" y1="16" x2="50" y2="24" />
            <line x1="50" y1="76" x2="50" y2="84" />
            <line x1="16" y1="50" x2="24" y2="50" />
            <line x1="76" y1="50" x2="84" y2="50" />
            <line x1="26" y1="26" x2="32" y2="32" />
            <line x1="68" y1="68" x2="74" y2="74" />
            <line x1="26" y1="74" x2="32" y2="68" />
            <line x1="68" y1="32" x2="74" y2="26" />
          </g>
          {/* Smiling Center */}
          <circle cx="50" cy="50" r="22" fill="#fde047" stroke="#eab308" strokeWidth="2.5" />
          <circle cx="43" cy="46" r="3" fill="#713f12" />
          <circle cx="57" cy="46" r="3" fill="#713f12" />
          <circle cx="44" cy="45" r="1" fill="#fff" />
          <circle cx="58" cy="45" r="1" fill="#fff" />
          <ellipse cx="38" cy="53" rx="3" ry="1.5" fill="#f87171" />
          <ellipse cx="62" cy="53" rx="3" ry="1.5" fill="#f87171" />
          <path d="M43 54C47 59 53 59 57 54" stroke="#c2410c" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'leaf':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f0fdf4" stroke="#22c55e" strokeWidth="3" />
          <path
            d="M30 70C30 70 32 45 55 30C78 45 80 70 55 74C38 77 30 70 30 70Z"
            fill="#22c55e"
            stroke="#15803d"
            strokeWidth="2.5"
          />
          <path d="M30 70C46 64 56 46 55 30" stroke="#bbf7d0" strokeWidth="3" strokeLinecap="round" />
          <path d="M46 54C54 52 64 54 68 50" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
          <path d="M42 62C48 60 56 64 62 60" stroke="#bbf7d0" strokeWidth="2" strokeLinecap="round" />
          {/* Dew drop */}
          <circle cx="62" cy="42" r="3" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
        </svg>
      );

    case 'flower':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fdf2f8" stroke="#ec4899" strokeWidth="3" />
          {/* Stem & leaf */}
          <path d="M50 56V82" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 70C42 68 36 74 36 74C36 74 42 78 50 74" fill="#4ade80" />
          <path d="M50 66C58 64 64 70 64 70C64 70 58 74 50 70" fill="#4ade80" />
          {/* 5 Petals */}
          <g fill="#f43f5e" stroke="#be123c" strokeWidth="1.5">
            <circle cx="50" cy="34" r="11" />
            <circle cx="36" cy="45" r="11" />
            <circle cx="64" cy="45" r="11" />
            <circle cx="42" cy="60" r="11" />
            <circle cx="58" cy="60" r="11" />
          </g>
          {/* Flower Center */}
          <circle cx="50" cy="49" r="10" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          <circle cx="47" cy="47" r="1.5" fill="#713f12" />
          <circle cx="53" cy="47" r="1.5" fill="#713f12" />
          <path d="M48 51C49 53 51 53 52 51" stroke="#713f12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );

    case 'tomato':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fef2f2" stroke="#ef4444" strokeWidth="3" />
          {/* Tomato Body */}
          <ellipse cx="50" cy="56" rx="28" ry="24" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
          <ellipse cx="44" cy="48" rx="8" ry="5" fill="#f87171" />
          {/* Green Calyx / Leaves */}
          <path d="M50 34V24" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 34C44 28 36 32 36 32C38 38 48 36 50 34Z" fill="#22c55e" />
          <path d="M50 34C56 28 64 32 64 32C62 38 52 36 50 34Z" fill="#22c55e" />
          <path d="M50 34C48 42 42 44 42 44C44 42 50 38 50 34Z" fill="#16a34a" />
          <path d="M50 34C52 42 58 44 58 44C56 42 50 38 50 34Z" fill="#16a34a" />
          {/* Cute Smile */}
          <circle cx="43" cy="56" r="2.5" fill="#450a0a" />
          <circle cx="57" cy="56" r="2.5" fill="#450a0a" />
          <path d="M46 63C48 66 52 66 54 63" stroke="#450a0a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'carrot':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fff7ed" stroke="#f97316" strokeWidth="3" />
          {/* Soil line */}
          <path d="M22 45C35 48 65 42 78 45" stroke="#78350f" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="50" cy="46" rx="24" ry="4" fill="#92400e" opacity="0.3" />
          {/* Carrot Body under soil */}
          <path d="M40 45C40 45 42 75 50 86C58 75 60 45 60 45Z" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
          <line x1="44" y1="54" x2="52" y2="54" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" />
          <line x1="48" y1="64" x2="56" y2="64" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" />
          <line x1="46" y1="74" x2="52" y2="74" stroke="#fdba74" strokeWidth="2" strokeLinecap="round" />
          {/* Carrot Green Tops sticking out of ground */}
          <path d="M50 45C46 32 38 24 34 22C42 24 48 32 50 45Z" fill="#22c55e" />
          <path d="M50 45C50 30 50 18 50 16C52 24 52 34 50 45Z" fill="#16a34a" />
          <path d="M50 45C54 32 62 24 66 22C58 24 52 32 50 45Z" fill="#22c55e" />
        </svg>
      );

    case 'bee':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fefce8" stroke="#f59e0b" strokeWidth="3" />
          {/* Wings */}
          <ellipse cx="44" cy="34" rx="10" ry="15" transform="rotate(-20 44 34)" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          <ellipse cx="58" cy="34" rx="10" ry="15" transform="rotate(20 58 34)" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
          {/* Bee Body */}
          <ellipse cx="50" cy="56" rx="22" ry="18" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          {/* Black Stripes */}
          <path d="M44 40V72" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />
          <path d="M56 40V72" stroke="#1c1917" strokeWidth="4" strokeLinecap="round" />
          {/* Little stinger */}
          <polygon points="72,56 78,54 78,58" fill="#1c1917" />
          {/* Face */}
          <circle cx="34" cy="54" r="2.5" fill="#1c1917" />
          <path d="M30 60C32 63 36 63 38 60" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
          {/* Antennae */}
          <path d="M34 40C30 32 26 32 24 34" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />
          <circle cx="24" cy="34" r="2" fill="#ca8a04" />
        </svg>
      );

    case 'broom':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#ecfdf5" stroke="#10b981" strokeWidth="3" />
          {/* Broom stick */}
          <line x1="32" y1="22" x2="62" y2="62" stroke="#92400e" strokeWidth="5" strokeLinecap="round" />
          {/* Broom bristles */}
          <path d="M60 60L78 74C80 82 72 86 64 80L54 66Z" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          <line x1="62" y1="68" x2="72" y2="78" stroke="#d97706" strokeWidth="2" />
          {/* Clean sparkles */}
          <path d="M30 50L32 44L38 42L32 40L30 34L28 40L22 42L28 44Z" fill="#38bdf8" />
          <path d="M68 30L69 26L73 25L69 24L68 20L67 24L63 25L67 26Z" fill="#38bdf8" />
        </svg>
      );

    case 'basket':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fff1f2" stroke="#f43f5e" strokeWidth="3" />
          {/* Woven Basket */}
          <path d="M26 50H74L68 84H32L26 50Z" fill="#d97706" stroke="#92400e" strokeWidth="2.5" />
          <path d="M36 50C36 34 64 34 64 50" stroke="#b45309" strokeWidth="4" fill="none" />
          {/* Veggies & Fruits inside */}
          <circle cx="42" cy="46" r="9" fill="#ef4444" />
          <circle cx="58" cy="46" r="9" fill="#f97316" />
          <circle cx="50" cy="40" r="8" fill="#22c55e" />
          {/* Golden Trophy on top right */}
          <path d="M70 30H84V40C84 46 78 48 74 48V54H80V58H68V54H74V48C70 48 64 46 64 40V30H70Z" fill="#fbbf24" stroke="#b45309" strokeWidth="1.5" />
          <circle cx="74" cy="38" r="3" fill="#fef08a" />
        </svg>
      );

    // Distractor items
    case 'shoe':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fee2e2" stroke="#f87171" strokeWidth="3" />
          <path d="M26 62C26 52 38 52 46 56L68 56C76 56 80 64 80 68H26V62Z" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          <rect x="22" y="68" width="60" height="8" rx="3" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
          <circle cx="36" cy="80" r="5" fill="#3b82f6" />
          <circle cx="68" cy="80" r="5" fill="#3b82f6" />
        </svg>
      );

    case 'balloon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fef3c7" stroke="#fbbf24" strokeWidth="3" />
          <ellipse cx="50" cy="44" rx="20" ry="24" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
          <ellipse cx="44" cy="36" rx="5" ry="8" fill="#fde68a" />
          <polygon points="48,68 52,68 50,72" fill="#d97706" />
          <path d="M50 72C50 78 54 80 48 88" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'rock':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="3" />
          <path d="M30 65L38 42L60 38L74 52L68 70L44 72Z" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
          <path d="M38 42L52 54L68 70" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'fire':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fff7ed" stroke="#fb923c" strokeWidth="3" />
          <path d="M50 20C58 35 68 45 68 60C68 74 58 80 50 80C42 80 32 74 32 60C32 45 42 35 50 20Z" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          <path d="M50 45C54 52 58 58 58 66C58 72 54 75 50 75C46 75 42 72 42 66C42 58 46 52 50 45Z" fill="#fde047" />
        </svg>
      );

    case 'flashlight':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f5f3ff" stroke="#a78bfa" strokeWidth="3" />
          <rect x="25" y="44" width="35" height="14" rx="4" fill="#8b5cf6" stroke="#6d28d9" strokeWidth="2" />
          <polygon points="60,40 76,32 76,68 60,60" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
          <line x1="78" y1="36" x2="88" y2="30" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <line x1="78" y1="50" x2="90" y2="50" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <line x1="78" y1="64" x2="88" y2="70" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'umbrella':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fdf2f8" stroke="#f472b6" strokeWidth="3" />
          <path d="M24 54C24 35 36 28 50 28C64 28 76 35 76 54H24Z" fill="#ec4899" stroke="#be185d" strokeWidth="2.5" />
          <line x1="50" y1="28" x2="50" y2="72" stroke="#475569" strokeWidth="3" />
          <path d="M50 72C50 78 44 80 40 76" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'gray-leaf':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="3" />
          <path d="M30 68C30 68 35 45 55 35C72 45 76 68 55 72C40 75 30 68 30 68Z" fill="#71717a" stroke="#3f3f46" strokeWidth="2" />
        </svg>
      );

    case 'paint-leaf':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#faf5ff" stroke="#c084fc" strokeWidth="3" />
          <path d="M30 68C30 68 35 45 55 35C72 45 76 68 55 72C40 75 30 68 30 68Z" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
          <circle cx="48" cy="52" r="4" fill="#fbbf24" />
          <circle cx="60" cy="60" r="3" fill="#38bdf8" />
        </svg>
      );

    case 'tire':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <circle cx="50" cy="50" r="26" fill="#334155" stroke="#0f172a" strokeWidth="3" />
          <circle cx="50" cy="50" r="12" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <circle cx="50" cy="50" r="4" fill="#334155" />
        </svg>
      );

    case 'spoon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#eef2ff" stroke="#818cf8" strokeWidth="3" />
          <ellipse cx="50" cy="36" rx="12" ry="16" fill="#94a3b8" stroke="#475569" strokeWidth="2" />
          <line x1="50" y1="52" x2="50" y2="82" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'marble':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#ecfeff" stroke="#22d3ee" strokeWidth="3" />
          <circle cx="50" cy="50" r="24" fill="#06b6d4" stroke="#0891b2" strokeWidth="2" />
          <path d="M38 42C44 56 58 56 62 48" stroke="#a5f3fc" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'water-balloon':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#eff6ff" stroke="#60a5fa" strokeWidth="3" />
          <ellipse cx="50" cy="54" rx="22" ry="20" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <polygon points="46,34 54,34 50,38" fill="#1d4ed8" />
          <circle cx="42" cy="48" r="4" fill="#bfdbfe" />
        </svg>
      );

    case 'cloud':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f0f9ff" stroke="#38bdf8" strokeWidth="3" />
          <path
            d="M32 60C26 60 22 55 22 49C22 43 27 39 33 39C35 32 42 28 50 28C58 28 65 33 67 40C73 40 78 45 78 51C78 56 73 60 67 60H32Z"
            fill="#e0f2fe"
            stroke="#0284c7"
            strokeWidth="2.5"
          />
        </svg>
      );

    case 'fridge':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
          <rect x="32" y="24" width="36" height="54" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2.5" />
          <line x1="32" y1="46" x2="68" y2="46" stroke="#475569" strokeWidth="2" />
          <line x1="62" y1="34" x2="62" y2="40" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="54" x2="62" y2="64" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'lion':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fffbeb" stroke="#f59e0b" strokeWidth="3" />
          {/* Mane */}
          <circle cx="50" cy="50" r="28" fill="#d97706" />
          {/* Face */}
          <circle cx="50" cy="52" r="18" fill="#fde047" />
          <circle cx="43" cy="48" r="2.5" fill="#78350f" />
          <circle cx="57" cy="48" r="2.5" fill="#78350f" />
          <polygon points="50,54 46,58 54,58" fill="#78350f" />
        </svg>
      );

    case 'whale':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f0f9ff" stroke="#0284c7" strokeWidth="3" />
          <path d="M22 56C22 42 36 38 52 38C68 38 78 48 78 56C78 64 64 68 52 68C36 68 22 64 22 56Z" fill="#0284c7" />
          <path d="M78 54L86 44V64L78 56" fill="#0284c7" />
          <circle cx="34" cy="52" r="2.5" fill="#ffffff" />
        </svg>
      );

    case 'trash':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
          <rect x="34" y="44" width="32" height="34" rx="3" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          <line x1="30" y1="40" x2="70" y2="40" stroke="#991b1b" strokeWidth="3" strokeLinecap="round" />
          <line x1="42" y1="52" x2="42" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="50" y1="52" x2="50" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="58" y1="52" x2="58" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'stomp':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
          <rect x="30" y="32" width="22" height="30" rx="4" fill="#78350f" />
          <path d="M30 62H70L66 74H30V62Z" fill="#451a03" />
          <line x1="68" y1="78" x2="76" y2="84" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="78" x2="50" y2="86" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'sleep':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f1f5f9" stroke="#64748b" strokeWidth="3" />
          <circle cx="50" cy="50" r="24" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <path d="M40 48C42 50 46 50 48 48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <path d="M54 48C56 50 60 50 62 48" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <text x="64" y="34" fill="#6366f1" fontSize="16" fontWeight="bold">Z</text>
          <text x="74" y="24" fill="#818cf8" fontSize="12" fontWeight="bold">z</text>
        </svg>
      );

    case 'cry':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#eff6ff" stroke="#3b82f6" strokeWidth="3" />
          <circle cx="50" cy="50" r="24" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
          <path d="M40 46L46 50" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M60 46L54 50" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 62C46 58 54 58 58 62" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="38" cy="58" rx="2" ry="4" fill="#2563eb" />
          <ellipse cx="62" cy="58" rx="2" ry="4" fill="#2563eb" />
        </svg>
      );

    default:
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="46" fill="#f0fdf4" stroke="#22c55e" strokeWidth="3" />
          <circle cx="50" cy="50" r="16" fill="#facc15" />
        </svg>
      );
  }
};

// Grand Tree & Greenhouse
export const GrandTreeIllustration: React.FC<{
  isGlowing: boolean;
  className?: string;
  onClick?: () => void;
}> = ({ isGlowing, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 ${className} ${
        isGlowing ? 'scale-105 filter drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]' : ''
      }`}
    >
      <svg width="130" height="130" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Glow halo if completed 10 suns */}
        {isGlowing && (
          <circle
            cx="80"
            cy="75"
            r="65"
            fill="url(#glowGrad)"
            className="animate-pulse"
          />
        )}
        <defs>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tree Trunk */}
        <path
          d="M65 145C65 105 55 95 55 85H105C105 95 95 105 95 145H65Z"
          fill="#78350f"
          stroke="#451a03"
          strokeWidth="3"
        />
        <path d="M75 110V135" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
        <path d="M85 118V140" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />

        {/* Foliage Canopy (Layers of lush green) */}
        <circle cx="48" cy="72" r="30" fill="#15803d" />
        <circle cx="112" cy="72" r="30" fill="#15803d" />
        <circle cx="80" cy="45" r="36" fill="#16a34a" />
        <circle cx="56" cy="55" r="26" fill="#22c55e" />
        <circle cx="104" cy="55" r="26" fill="#22c55e" />
        <circle cx="80" cy="62" r="28" fill="#4ade80" />

        {/* Hanging ripe fruits and colorful flowers */}
        <circle cx="55" cy="50" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
        <circle cx="102" cy="52" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
        <circle cx="75" cy="40" r="5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
        <circle cx="68" cy="70" r="5" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
        <circle cx="92" cy="68" r="5" fill="#ec4899" stroke="#be185d" strokeWidth="1" />

        {/* Crown Star or Golden Sun on Top */}
        <polygon
          points="80,10 84,22 96,22 86,30 90,42 80,34 70,42 74,30 64,22 76,22"
          fill="#facc15"
          stroke="#ca8a04"
          strokeWidth="2"
          className={isGlowing ? 'animate-spin origin-[80px_26px]' : ''}
        />
        
        {/* Cute Greenhouse base / picket fence */}
        <path d="M40 145H120" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {isGlowing && (
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 bg-yellow-400 text-amber-950 text-[11px] font-black px-2 py-0.5 rounded-full shadow-md whitespace-nowrap animate-bounce">
          ✨ Pohon Raya Menyala!
        </span>
      )}
    </div>
  );
};
