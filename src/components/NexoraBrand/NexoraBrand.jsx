import nexoraIconHd from '../../assets/nexora-icon-hd.png'

export default function NexoraBrand({ variant = 'navbar', isScrolled = false, className = '' }) {
  const isFooter = variant === 'footer'

  return (
    <div className={`group inline-flex items-center gap-2.5 sm:gap-3 select-none cursor-pointer transition-all duration-300 ${className}`}>
      {/* Enhanced Official 3D Origami 'N' Icon Mark */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        {/* Subtle dynamic ambient glow aura */}
        <div
          className={`absolute inset-0 rounded-2xl blur-md opacity-40 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none ${
            isFooter
              ? 'bg-blue-500/30'
              : 'bg-blue-500/20 dark:bg-cyan-400/25'
          }`}
          aria-hidden="true"
        />

        <img
          src={nexoraIconHd}
          alt="NEXORA DIGITAL 3D Logo Mark"
          className={`relative z-10 w-auto object-contain flex-shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 ${
            isFooter
              ? 'h-11 sm:h-13 drop-shadow-[0_4px_12px_rgba(0,102,255,0.4)]'
              : 'h-[34px] sm:h-[38px] drop-shadow-[0_2px_8px_rgba(0,102,255,0.25)] dark:drop-shadow-[0_0_12px_rgba(0,210,255,0.45)]'
          }`}
          loading="eager"
          decoding="sync"
        />
      </div>

      {/* Official Stylized Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* NEXORA - With Stylized Hero Gradient 'X' */}
          <div className="flex items-center tracking-[0.06em] font-black uppercase font-sans">
            <span
              className={`transition-colors duration-300 ${
                isFooter
                  ? 'text-white text-2xl sm:text-3xl'
                  : 'text-[#0B1020] dark:text-white text-[19px] sm:text-[21px]'
              }`}
            >
              NE
            </span>
            {/* Signature Electric-Cyan/Blue Stylized 'X' */}
            <span
              className={`mx-[0.5px] font-black uppercase font-sans bg-gradient-to-br from-[#00F0FF] via-[#0066FF] to-[#0042A5] dark:from-[#38BDF8] dark:via-[#00E5FF] dark:to-[#0070FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,102,255,0.55)] transition-all duration-300 group-hover:drop-shadow-[0_0_14px_rgba(0,229,255,0.8)] ${
                isFooter ? 'text-2xl sm:text-3xl' : 'text-[19px] sm:text-[21px]'
              }`}
            >
              X
            </span>
            <span
              className={`transition-colors duration-300 ${
                isFooter
                  ? 'text-white text-2xl sm:text-3xl'
                  : 'text-[#0B1020] dark:text-white text-[19px] sm:text-[21px]'
              }`}
            >
              ORA
            </span>
          </div>

          {/* BY HMS Authority Credential Pill */}
          <span
            className={`font-black uppercase px-1.5 py-0.5 rounded-md text-[8px] sm:text-[9px] tracking-wider transition-all duration-300 shadow-2xs ${
              isFooter
                ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-[#38BDF8] border border-blue-400/30'
                : 'bg-blue-50/90 text-[#0066FF] border border-blue-500/25 dark:bg-blue-500/15 dark:text-[#38BDF8] dark:border-blue-400/30 group-hover:border-blue-400'
            }`}
          >
            BY HMS
          </span>
        </div>

        {/* DIGITAL - Premium Spaced Electric Sub-Brand */}
        <div className="flex items-center gap-1.5">
          <span
            className={`font-extrabold uppercase tracking-[0.28em] transition-all duration-300 ${
              isFooter
                ? 'text-[11px] sm:text-[12px] mt-1 bg-gradient-to-r from-[#38BDF8] via-[#00E5FF] to-[#60A5FA] bg-clip-text text-transparent'
                : 'text-[9px] sm:text-[10px] mt-0.5 bg-gradient-to-r from-[#0052CC] via-[#0066FF] to-[#00A3FF] dark:from-[#38BDF8] dark:via-[#00E5FF] dark:to-[#67E8F9] bg-clip-text text-transparent'
            }`}
          >
            DIGITAL
          </span>
          <span
            className={`w-1 h-1 rounded-full transition-colors duration-300 mt-0.5 ${
              isFooter
                ? 'bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]'
                : 'bg-[#0066FF] dark:bg-[#38BDF8] shadow-[0_0_6px_rgba(0,102,255,0.6)] dark:shadow-[0_0_6px_#38BDF8]'
            }`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  )
}
