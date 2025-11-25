"use client"

import { ChevronLeft, MoreVertical, Search, Copy, CheckCircle } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { api } from "@/lib/api"
import { useUser } from "@/contexts/UserContext"

function CuentaContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()
  const [copied, setCopied] = useState(false)
  const [account, setAccount] = useState<any>(null)
  const [transactions, setTransactions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Obtener el ID de la cuenta desde la URL
  const accountId = searchParams.get('id')

  useEffect(() => {
    if (!user) {
      router.push('/')
      return
    }

    if (!accountId) {
      router.push('/menu')
      return
    }

    loadAccountData()
  }, [accountId, user])

  const loadAccountData = async () => {
    try {
      setLoading(true)
      // Obtener datos de la cuenta
      const accountData = await api.getAccount(Number(accountId))
      setAccount(accountData)

      // Obtener transacciones de la cuenta
      const txData = await api.getAccountTransactions(Number(accountId))
      setTransactions(txData)
    } catch (error) {
      console.error('Error cargando datos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (account) {
      navigator.clipboard.writeText(account.accountNumber)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e8f0ea] flex items-center justify-center">
        <div className="text-[#1a5235] text-lg">Cargando...</div>
      </div>
    )
  }

  if (!account) {
    return (
      <div className="min-h-screen bg-[#e8f0ea] flex items-center justify-center">
        <div className="text-[#1a5235] text-lg">Cuenta no encontrada</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#e8f0ea]">
      {/* Header */}
      <div className="bg-[#e8f0ea] pt-12 pb-4 px-4">
        <div className="flex items-center justify-between">
          <button onClick={() => router.back()} className="text-[#1a5235]">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <h1 className="text-[#1a5235] font-semibold text-lg">{account.type}</h1>
          <button className="text-[#1a5235]">
            <MoreVertical className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Balance card */}
      <div className="px-4 pb-4">
        <div className="bg-[#d9e8dc] rounded-b-3xl p-4">
          <p className="text-[#1a5235] text-sm">Saldo disponible</p>
          <p className="text-[#1a5235] text-4xl font-bold">Bs {account.balance.toFixed(2)}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[#1a5235] text-sm">Saldo total</p>
            <p className="text-[#1a5235] font-medium">Bs {account.balance.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Account info */}
      <div className="px-4 py-4 bg-white mx-4 rounded-2xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm">Número de cuenta</p>
            <p className="text-[#1a5235] font-semibold text-lg">{account.accountNumber}</p>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 text-gray-600"
          >
            {copied ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <div className="mt-3">
          <p className="text-gray-500 text-sm">Alias de la cuenta</p>
          <p className="text-[#1a5235]">{account.alias || account.type}</p>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-4 py-4 mt-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#1a5235] font-semibold">Últimos movimientos</h2>
          <button className="w-10 h-10 bg-[#1a5235] rounded-full flex items-center justify-center">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>

        {transactions.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No hay transacciones registradas
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-start">
                  <p className="text-[#1a5235] font-medium">{tx.type}</p>
                  <p className={`font-semibold ${tx.type === 'Crédito' ? "text-green-600" : "text-[#1a5235]"}`}>
                    {tx.type === 'Crédito' ? "+" : "-"}Bs {Math.abs(tx.amount).toFixed(2)}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mt-1 line-clamp-1">{tx.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">{tx.status}</span>
                  </div>
                  <span className="text-gray-400 text-sm">
                    {new Date(tx.date).toLocaleDateString('es-BO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CuentaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#e8f0ea] flex items-center justify-center"><div className="text-[#1a5235] text-lg">Cargando...</div></div>}>
      <CuentaContent />
    </Suspense>
  )
}
