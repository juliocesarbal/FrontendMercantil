"use client"

import type React from "react"

import { Menu, CheckCircle, X } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { BankLogo } from "@/components/bank-logo"
import { useUser } from "@/contexts/UserContext"
import { api } from "@/lib/api"

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [totalBalance, setTotalBalance] = useState(0)
  const [accounts, setAccounts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (searchParams.get('transfer') === 'success') {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 4000)
      router.replace('/dashboard')
    }

    loadUserData()
  }, [searchParams, user])

  const loadUserData = async () => {
    try {
      if (!user) return
      const accountsData = await api.getUserAccounts(user.id)
      setAccounts(accountsData)

      // Calcular balance total
      const total = accountsData.reduce((sum: number, acc: any) => sum + acc.balance, 0)
      setTotalBalance(total)
    } catch (err) {
      console.error('Error loading user data:', err)
    } finally {
      setLoading(false)
    }
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

      {/* Green header */}
      <div className="bg-[#1a5235] pt-12 pb-8 px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push("/menu")}>
            <Menu className="w-8 h-8 text-white" />
          </button>
          <BankLogo size="md" />
          <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-white">
            {balanceVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </button>
        </div>

        {/* Balance section */}
        <div className="text-white space-y-4">
          <div>
            <p className="text-gray-300 text-sm">Ahorros</p>
            <p className="text-3xl font-bold">
              {loading ? 'Cargando...' : balanceVisible ? `Bs ${totalBalance.toFixed(2)}` : 'Bs ********'}
            </p>
          </div>
          <div>
            <p className="text-gray-300 text-sm">Préstamos</p>
            <p className="text-3xl font-bold">Bs 0.00</p>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex justify-center gap-6 mt-6">
          <QuickActionButton icon={<ServiciosIcon />} label="Servicios" onClick={() => {}} />
          <QuickActionButton icon={<QRIcon />} label="QR" onClick={() => router.push("/dashboard/qr")} />
          <QuickActionButton
            icon={<TransferIcon />}
            label="Transferencias"
            onClick={() => router.push("/transferencias")}
          />
        </div>
      </div>

      {/* Promotional banner */}
      <div className="px-4 py-4">
        <div className="bg-[#1a5235] rounded-2xl overflow-hidden">
          <div className="relative p-4">
            <span className="bg-yellow-500 text-xs text-white px-2 py-1 rounded">Banca Móvil</span>
            <div className="flex items-center">
              <div className="flex-1">
                <h3 className="text-yellow-400 text-xl font-bold mt-2">Nos renovamos para ti.</h3>
                <p className="text-white text-sm">
                  Disfruta la nueva experiencia
                  <br />
                  en nuestra app.
                </p>
              </div>
              <div className="w-32 h-40">
                <img
                  src="/mobile-banking-app-mockup-green.jpg"
                  alt="App preview"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-3">
          <div className="w-3 h-1 bg-[#1a5235] rounded-full" />
          <div className="w-3 h-1 bg-gray-300 rounded-full" />
          <div className="w-3 h-1 bg-gray-300 rounded-full" />
          <div className="w-3 h-1 bg-gray-300 rounded-full" />
          <div className="w-3 h-1 bg-gray-300 rounded-full" />
        </div>
      </div>

      {/* Account cards */}
      <div className="px-4 mt-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[#1a5235] font-semibold">Cuentas</h3>
          <span className="text-gray-500 text-sm">Saldo disponible</span>
        </div>
        {loading ? (
          <div className="text-center text-[#1a5235] py-4">Cargando cuentas...</div>
        ) : accounts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No hay cuentas disponibles</div>
        ) : (
          <div className="space-y-3">
            {accounts.map((account) => (
              <button
                key={account.id}
                onClick={() => router.push(`/cuenta?id=${account.id}`)}
                className="w-full bg-white rounded-2xl p-4 flex justify-between items-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-left">
                  <p className="text-[#1a5235] font-medium">{account.accountNumber}</p>
                  <p className="text-gray-500 text-sm">{account.type}</p>
                </div>
                <p className="text-[#1a5235] font-medium">
                  {balanceVisible ? `Bs ${account.balance.toFixed(2)}` : 'Bs * * * * *'}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuickActionButton({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 bg-[#2d5a3f] rounded-2xl flex items-center justify-center">{icon}</div>
      <span className="text-white text-sm">{label}</span>
    </button>
  )
}

function EyeOpenIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeClosedIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <path d="M3 3l18 18" strokeLinecap="round" />
    </svg>
  )
}

function ServiciosIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
    </svg>
  )
}

function QRIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
    </svg>
  )
}

function TransferIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M7 10L3 14L7 18" />
      <path d="M17 6L21 10L17 14" />
      <line x1="3" y1="14" x2="16" y2="14" />
      <line x1="8" y1="10" x2="21" y2="10" />
    </svg>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e8f0ea] flex items-center justify-center"><div className="text-[#1a5235]">Cargando...</div></div>}>
      <DashboardContent />
    </Suspense>
  )
}
