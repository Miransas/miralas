export function DecorativeBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Large 3D cube/box shape - top right */}
      <svg
        className="absolute -top-10 right-0 h-[500px] w-[600px] text-indigo-500/12 dark:text-indigo-500/30"
        viewBox="0 0 300 250"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Isometric cube */}
        <path d="M150 30 L230 80 L230 180 L150 230 L70 180 L70 80 Z" />
        <path d="M150 30 L150 130 L230 80" />
        <path d="M150 130 L150 230" />
        <path d="M150 130 L70 80" />
        {/* Inner details */}
        <path d="M110 55 L190 105" />
        <path d="M190 55 L110 105" />
      </svg>

      {/* Mint/document shape with folded corner - center left */}
      <svg
        className="absolute left-[10%] top-10 h-[350px] w-[350px] text-indigo-500/10 dark:text-indigo-500/25"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Document outline with fold */}
        <path d="M40 30 L140 30 L160 50 L160 170 L40 170 Z" />
        <path d="M140 30 L140 50 L160 50" />
        {/* Mint leaf shape inside */}
        <ellipse cx="100" cy="100" rx="35" ry="50" />
        <path d="M100 50 L100 150" />
        <path d="M75 80 Q100 100 75 120" />
        <path d="M125 80 Q100 100 125 120" />
      </svg>

      {/* Terminal/CLI shape - far right */}
      <svg
        className="absolute -right-20 top-[30%] h-[300px] w-[300px] text-indigo-500/8 dark:text-indigo-500/20"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Terminal window */}
        <rect x="30" y="40" width="140" height="120" rx="8" />
        <path d="M30 60 L170 60" />
        {/* Cursor/prompt */}
        <path d="M50 85 L70 100 L50 115" />
        <path d="M80 115 L130 115" />
      </svg>

      {/* Component/blocks shape - bottom center-right */}
      <svg
        className="absolute bottom-0 right-[20%] h-[400px] w-[400px] text-indigo-500/8 dark:text-indigo-500/20"
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
      >
        {/* Stacked blocks - isometric */}
        <path d="M100 60 L140 80 L140 120 L100 140 L60 120 L60 80 Z" />
        <path d="M100 60 L100 100 L140 80" />
        <path d="M100 100 L60 80" />
        {/* Second block */}
        <path d="M100 100 L140 120 L140 160 L100 180 L60 160 L60 120" />
        <path d="M100 140 L100 180" />
      </svg>

      {/* Small decorative elements */}
      <svg
        className="absolute left-[5%] top-[40%] h-[150px] w-[150px] text-indigo-500/6 dark:text-indigo-500/15"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
      >
        <circle cx="50" cy="50" r="30" />
        <circle cx="50" cy="50" r="15" />
        <path d="M50 20 L50 80" />
        <path d="M20 50 L80 50" />
      </svg>
    </div>
  )
}
