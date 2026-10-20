import nexoraIconHd from '../../assets/nexora-icon-hd.png'

export default function NexoraBrand({ variant = 'navbar', isScrolled = false, className = '' }) {
  const isFooter = variant === 'footer'

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Standalone 3D N Icon */}
      <img
        src={nexoraIconHd}
        alt="NEXORA DIGITAL"
        className={`w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${
          isFooter ? 'h-12 sm:h-14' : 'h-[38px] sm:h-[40px]'
        }`}
        loading="eager"
        decoding="sync"
      />

      {/* Official HTML/CSS Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        {/* NEXORA - Bold, Proud, Clean Wordmark */}
        <span
          className={`font-black tracking-wider uppercase font-sans transition-colors duration-300 ${
            isFooter
              ? 'text-white text-2xl sm:text-3xl'
              : 'text-[#0B1020] dark:text-white text-[20px] sm:text-[22px]'
          }`}
          style={{ letterSpacing: '0.05em' }}
        >
          NEXORA
        </span>

        {/* DIGITAL - Uppercase Electric Blue Spaced Text */}
        <span
          className={`font-bold uppercase text-[#0066FF] dark:text-[#38BDF8] ${
            isFooter ? 'text-[11px] sm:text-[12px] mt-1' : 'text-[9px] sm:text-[10px] mt-0.5'
          }`}
          style={{ letterSpacing: '0.26em' }}
        >
          DIGITAL
        </span>
      </div>
    </div>
  )
}

