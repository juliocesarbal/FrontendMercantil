"use client"

import { ChevronLeft, LogOut, CheckCircle, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useUser } from "@/contexts/UserContext"
import { api } from "@/lib/api"

const menuItems = [
  { icon: <CuentasIcon />, label: "Cuentas", href: "/cuenta" },
  { icon: <OperacionesIcon />, label: "Operaciones\nsin tarjeta", href: "#" },
  { icon: <AbrirCuentaIcon />, label: "Abrir cuenta\nSolicitar crédito", href: "#" },
  { icon: <QRMenuIcon />, label: "QR\nCobrar y pagar", href: "#" },
  { icon: <PagoServiciosIcon />, label: "Pago de servicios", href: "#" },
  { icon: <TransferenciasIcon />, label: "Transferencias", href: "/transferencias" },
  { icon: <TarjetasIcon />, label: "Administrador\nde tarjetas", href: "#" },
  { icon: <PagoCreditosIcon />, label: "Pago de créditos", href: "#" },
  { icon: <AgenciasIcon />, label: "Agencias y cajeros\nCentro de ayuda", href: "#" },
  { icon: <MetodosIcon />, label: "Métodos de acceso", href: "#" },
  { icon: <ExtractosIcon />, label: "Extractos históricos\ny más opciones", href: "#" },
  { icon: <BeneficiosIcon />, label: "Beneficios", href: "#" },
]

function MenuContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, setUser } = useUser()
  const [showSuccess, setShowSuccess] = useState(false)
  const [userAccounts, setUserAccounts] = useState<any[]>([])

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (searchParams.get('transfer') === 'success') {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)

      router.replace('/menu')
    }

    loadUserAccounts()
  }, [searchParams, user])

  const loadUserAccounts = async () => {
    try {
      if (!user) return
      const accounts = await api.getUserAccounts(user.id)
      setUserAccounts(accounts)
    } catch (err) {
      console.error('Error loading accounts:', err)
    }
  }

  const handleNavigateToCuenta = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#e8f0ea]">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-green-600 text-white rounded-xl p-4 shadow-lg flex items-center gap-3">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold">Transferencia exitosa</p>
            <p className="text-sm">La transferencia se realizó correctamente</p>
          </div>
          <button onClick={() => setShowSuccess(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-[#1a5235] pt-12 pb-6 px-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="text-center text-white">
            <p className="text-sm text-gray-300">Último acceso</p>
            <p className="font-medium">{new Date().toLocaleString('es-BO')}</p>
          </div>
          <button onClick={() => {
            setUser(null)
            router.push("/")
          }} className="text-white">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menu grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (item.label === "Cuentas") {
                  handleNavigateToCuenta()
                } else {
                  router.push(item.href)
                }
              }}
              className="bg-white rounded-2xl p-4 flex flex-col items-start gap-3 min-h-[100px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-[#1a5235]">{item.icon}</div>
              <span className="text-[#1a5235] text-sm font-medium text-left whitespace-pre-line">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e8f0ea] flex items-center justify-center"><div className="text-[#1a5235]">Cargando...</div></div>}>
      <MenuContent />
    </Suspense>
  )
}

function CuentasIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}

function OperacionesIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="3" />
    </svg>
  )
}

function AbrirCuentaIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function QRMenuIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" fill="currentColor" />
      <rect x="18" y="18" width="3" height="3" />
    </svg>
  )
}

function PagoServiciosIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )
}

function TransferenciasIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 10L3 14L7 18" />
      <path d="M17 6L21 10L17 14" />
      <line x1="3" y1="14" x2="16" y2="14" />
      <line x1="8" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function TarjetasIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="10" y2="15" />
    </svg>
  )
}

function PagoCreditosIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function AgenciasIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function MetodosIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function ExtractosIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="5" cy="6" r="2" fill="currentColor" />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
      <circle cx="19" cy="6" r="2" fill="currentColor" />
      <circle cx="5" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="19" cy="12" r="2" fill="currentColor" />
      <circle cx="5" cy="18" r="2" fill="currentColor" />
      <circle cx="12" cy="18" r="2" fill="currentColor" />
      <circle cx="19" cy="18" r="2" fill="currentColor" />
    </svg>
  )
}

function BeneficiosIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
