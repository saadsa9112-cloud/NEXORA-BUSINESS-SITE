import nexoraIconMark from '../../assets/nexora-icon-mark.png'

export default function NexoraBrand({ variant = 'navbar', isScrolled = false, className = '' }) {
  const isFooter = variant === 'footer'
  const isDarkNavbar = isFooter || isScrolled

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Standalone N Icon */}
      <img
        src={nexoraIconMark}
        alt="NEXORA DIGITAL by HMS"
        className={`w-auto object-contain flex-shrink-0 ${
          isFooter ? 'h-12 sm:h-14' : 'h-[38px]'
        }`}
        loading="eager"
        decoding="sync"
      />

      {/* Official HTML/CSS Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5">
          {/* NEXORA - Uppercase Text */}
          <span
            className={`font-black tracking-wider uppercase font-sans transition-colors duration-300 ${
              isDarkNavbar ? 'text-white' : 'text-[#0B1020]'
            } ${
              isFooter ? 'text-2xl sm:text-3xl' : 'text-[19px] sm:text-[20px]'
            }`}
            style={{ letterSpacing: '0.05em' }}
          >
            NEXORA
          </span>

          {/* BY HMS Tag */}
          <span
            className={`font-extrabold uppercase px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] tracking-wider transition-colors duration-300 ${
              isDarkNavbar
                ? 'bg-[#1F90FF]/15 text-[#1F90FF] border border-[#1F90FF]/30'
                : 'bg-blue-50 text-[#0066FF] border border-blue-500/20'
            }`}
          >
            BY HMS
          </span>
        </div>

        {/* DIGITAL - Uppercase Electric Blue Spaced Text */}
        <span
          className={`font-bold uppercase text-[#1F90FF] ${
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
