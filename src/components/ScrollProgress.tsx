import { useScrollProgress } from '../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left transition-[width] duration-150 ease-out"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #078C49, #12A65B 55%, #D7192D)',
        }}
      />
    </div>
  )
}
