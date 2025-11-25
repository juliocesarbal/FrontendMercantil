"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useUser } from "@/contexts/UserContext"
import { api } from "@/lib/api"

function TransferenciasContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [fromAccount, setFromAccount] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fromAccountId = searchParams.get('from')

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (!fromAccountId) {
      // Load first account
      loadUserAccounts()
    } else {
      loadAccount()
    }
  }, [fromAccountId, user])

  const loadUserAccounts = async () => {
    try {
      if (!user) return
      const accounts = await api.getUserAccounts(user.id)
      if (accounts && accounts.length > 0) {
        setFromAccount(accounts[0])
      }
    } catch (err) {
      console.error('Error loading accounts:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadAccount = async () => {
    try {
      const account = await api.getAccount(Number(fromAccountId))
      setFromAccount(account)
    } catch (err) {
      console.error('Error loading account:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleNavigateToTransfer = (path: string) => {
    if (fromAccount) {
      router.push(`${path}?from=${fromAccount.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#1a5235]">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#1a5235] pt-12 pb-4 px-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <h1 className="text-white font-medium text-lg">Cuenta destino</h1>
          <button onClick={() => router.back()} className="text-white font-medium">
            Cancelar
          </button>
        </div>
      </div>

      {/* From account info */}
      {fromAccount && (
        <div className="bg-gray-100 px-4 py-3 border-b">
          <p className="text-gray-600 text-sm">Transferir desde</p>
          <p className="text-[#1a5235] font-semibold">{fromAccount.type} - {fromAccount.accountNumber}</p>
          <p className="text-gray-600 text-sm">Saldo disponible: Bs {fromAccount.balance.toFixed(2)}</p>
        </div>
      )}

      {/* Select account type */}
      <div className="bg-gray-200 py-3 px-4">
        <p className="text-center text-gray-600">Selecciona el tipo de cuenta</p>
      </div>

      {/* Account type options */}
      <div className="divide-y divide-gray-200">
        <button
          onClick={() => handleNavigateToTransfer("/transferencias/nuevo/terceros")}
          className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50"
        >
          <div>
            <p className="text-[#1a5235] font-semibold text-left">Cuentas de terceros</p>
            <p className="text-gray-500 text-sm">Transferencia a una cuenta en el mismo banco</p>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>

        <button onClick={() => {}} className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50">
          <div>
            <p className="text-[#1a5235] font-semibold text-left">Cuentas de otros bancos</p>
            <p className="text-gray-500 text-sm">Transferencia a una cuenta de otro banco</p>
          </div>
          <ChevronRight className="w-6 h-6 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default function NuevoDestinatarioPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="text-[#1a5235]">Cargando...</div></div>}>
      <TransferenciasContent />
    </Suspense>
  )
}
