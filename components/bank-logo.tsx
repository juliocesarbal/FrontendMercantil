import Image from "next/image"

export function BankLogo({ className = "", size = "lg" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <Image src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images%20%281%29-siFXbUXvM6nniyj0KDsXbAsxIhK3LU.png" alt="Mercantil Santa Cruz" fill className="object-contain" />
    </div>
  )
}

export default BankLogo
