export default function ResumeAvatar({
  src,
  size = 48,
  className = '',
}: {
  src: string
  size?: number
  className?: string
}) {
  if (!src) return null

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={`rounded-full object-cover shrink-0 ${className}`}
      onError={(e) => {
        (e.currentTarget).style.display = 'none'
      }}
    />
  )
}
