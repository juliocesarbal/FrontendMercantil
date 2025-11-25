"use client"

import type React from "react"
import { ChevronLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { useUser } from "@/contexts/UserContext"

function TercerosContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useUser()

  const fromAccountId = searchParams.get('from')

  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [saveAsRecipient, setSaveAsRecipient] = useState(false)
  const [recipientAlias, setRecipientAlias] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [fromAccount, setFromAccount] = useState<any>(null)
  const [targetAccount, setTargetAccount] = useState<any>(null)
  const [step, setStep] = useState(1) // 1: account number, 2: amount, 3: confirmation
  const [savedRecipients, setSavedRecipients] = useState<any[]>([])
  const [loadingRecipients, setLoadingRecipients] = useState(true)

  useEffect(() => {
    if (!user || !fromAccountId) {
      router.push('/dashboard')
      return
    }
    loadFromAccount()
    loadSavedRecipients()
  }, [fromAccountId, user])

  const loadFromAccount = async () => {
    try {
      const account = await api.getAccount(Number(fromAccountId))
      setFromAccount(account)
    } catch (err) {
      setError("Error cargando cuenta de origen")
    }
  }

  const loadSavedRecipients = async () => {
    try {
      if (!user) return
      const recipients = await api.getUserRecipients(user.id)
      setSavedRecipients(recipients)
    } catch (err) {
      console.error('Error loading recipients:', err)
    } finally {
      setLoadingRecipients(false)
    }
  }

  const handleSelectRecipient = (recipient: any) => {
    setAccountNumber(recipient.accountNumber)
  }

  const handleVerifyAccount = async () => {
    if (!accountNumber) return

    setLoading(true)
    setError("")

    try {
      const account = await api.getAccountByNumber(accountNumber)
      if (account && account.id) {
        if (account.id === Number(fromAccountId)) {
          setError("No puedes transferir a la misma cuenta")
          setLoading(false)
          return
        }
        setTargetAccount(account)
        setStep(2)
      } else {
        setError("Cuenta no encontrada")
      }
    } catch (err) {
      setError("Error verificando cuenta")
    } finally {
      setLoading(false)
    }
  }

  const handleReviewTransfer = () => {
    if (!amount || parseFloat(amount) <= 0) {
      setError("Ingresa un monto válido")
      return
    }
    if (parseFloat(amount) > fromAccount.balance) {
      setError("Saldo insuficiente")
      return
    }
    setError("")
    setStep(3)
  }

  const handleConfirmTransfer = async () => {
    setLoading(true)
    setError("")

    try {
      const transferData = {
        fromAccountId: Number(fromAccountId),
        toAccountNumber: accountNumber,
        amount: parseFloat(amount),
        description: description || 'Transferencia'
      }

      await api.transfer(transferData)

      // Save recipient if requested
      if (saveAsRecipient && recipientAlias && user) {
        await api.saveRecipient({
          userId: user.id,
          accountNumber: accountNumber,
          alias: recipientAlias,
          bankName: 'Banco Mercantil',
          accountType: targetAccount.type
        })
      }

      router.push('/dashboard?transfer=success')
    } catch (err: any) {
      setError(err.message || "Error realizando transferencia")
    } finally {
      setLoading(false)
    }
  }

  if (!fromAccount) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-[#1a5235]">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-[#1a5235] pt-12 pb-4 px-4">
        <div className="flex items-center justify-between">
          <button onClick={() => step === 1 ? router.back() : setStep(step - 1)} className="text-white">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <h1 className="text-white font-medium text-lg">
            {step === 1 && "Cuenta destino"}
            {step === 2 && "Monto a transferir"}
            {step === 3 && "Confirmar transferencia"}
          </h1>
          <button onClick={() => router.push("/transferencias")} className="text-white font-medium">
            Cancelar
          </button>
        </div>
      </div>

      {/* From account info */}
      <div className="bg-gray-100 px-4 py-3">
        <p className="text-gray-600 text-sm">Desde</p>
        <p className="text-[#1a5235] font-semibold">{fromAccount.type} - {fromAccount.accountNumber}</p>
        <p className="text-gray-600 text-sm">Saldo disponible: Bs {fromAccount.balance.toFixed(2)}</p>
      </div>

      {/* Step 1: Account number */}
      {step === 1 && (
        <div className="px-4 py-6 flex-1">
          <div className="border-b border-gray-200 pb-4 mb-6">
            <p className="text-[#1a5235] font-semibold">Cuentas de terceros</p>
            <p className="text-gray-500 text-sm">Transferencia a una cuenta en el mismo banco</p>
          </div>

          {/* Saved Recipients */}
          {!loadingRecipients && savedRecipients.length > 0 && (
            <div className="mb-6">
              <p className="text-[#1a5235] font-medium mb-3">Destinatarios frecuentes</p>
              <div className="space-y-2">
                {savedRecipients.map((recipient) => (
                  <button
                    key={recipient.id}
                    onClick={() => handleSelectRecipient(recipient)}
                    className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-center justify-between transition-colors"
                  >
                    <div className="text-left">
                      <p className="text-[#1a5235] font-semibold">{recipient.alias}</p>
                      <p className="text-gray-600 text-sm">{recipient.accountNumber}</p>
                      <p className="text-gray-500 text-xs">{recipient.accountType}</p>
                    </div>
                    <div className="w-8 h-8 bg-[#1a5235] rounded-full flex items-center justify-center">
                      <ChevronRightIcon />
                    </div>
                  </button>
                ))}
              </div>
              <div className="my-4 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-500 text-sm">O ingresa manualmente</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>
            </div>
          )}

          <label className="block text-[#1a5235] font-medium mb-2">Número de cuenta destino</label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Ingresa el número de cuenta"
            className="w-full h-14 bg-gray-100 rounded-xl border-0 text-[#1a5235] placeholder:text-gray-400 mb-4"
          />

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        </div>
      )}

      {/* Step 2: Amount */}
      {step === 2 && targetAccount && (
        <div className="px-4 py-6 flex-1">
          <div className="bg-gray-100 rounded-xl p-4 mb-6">
            <p className="text-gray-600 text-sm">Para</p>
            <p className="text-[#1a5235] font-semibold">{targetAccount.type}</p>
            <p className="text-gray-600">{targetAccount.accountNumber}</p>
            <p className="text-gray-600 text-sm mt-1">{targetAccount.User?.firstName} {targetAccount.User?.lastName}</p>
          </div>

          <label className="block text-[#1a5235] font-medium mb-2">Monto (Bs)</label>
          <Input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full h-14 bg-gray-100 rounded-xl border-0 text-[#1a5235] placeholder:text-gray-400 text-2xl font-semibold mb-4"
          />

          <label className="block text-[#1a5235] font-medium mb-2">Descripción (opcional)</label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Concepto de transferencia"
            className="w-full h-14 bg-gray-100 rounded-xl border-0 text-[#1a5235] placeholder:text-gray-400 mb-4"
          />

          <div className="flex items-start gap-3 mb-4">
            <input
              type="checkbox"
              id="saveRecipient"
              checked={saveAsRecipient}
              onChange={(e) => setSaveAsRecipient(e.target.checked)}
              className="mt-1"
            />
            <label htmlFor="saveRecipient" className="text-gray-700 text-sm">
              Guardar como destinatario frecuente
            </label>
          </div>

          {saveAsRecipient && (
            <Input
              type="text"
              value={recipientAlias}
              onChange={(e) => setRecipientAlias(e.target.value)}
              placeholder="Alias para el destinatario"
              className="w-full h-14 bg-gray-100 rounded-xl border-0 text-[#1a5235] placeholder:text-gray-400 mb-4"
            />
          )}

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && targetAccount && (
        <div className="px-4 py-6 flex-1">
          <div className="bg-gray-50 rounded-xl p-4 mb-6 space-y-4">
            <div>
              <p className="text-gray-600 text-sm">Desde</p>
              <p className="text-[#1a5235] font-semibold">{fromAccount.type}</p>
              <p className="text-gray-600">{fromAccount.accountNumber}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm">Para</p>
              <p className="text-[#1a5235] font-semibold">{targetAccount.type}</p>
              <p className="text-gray-600">{targetAccount.accountNumber}</p>
              <p className="text-gray-600 text-sm">{targetAccount.User?.firstName} {targetAccount.User?.lastName}</p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm">Monto</p>
              <p className="text-[#1a5235] font-bold text-3xl">Bs {parseFloat(amount).toFixed(2)}</p>
            </div>

            {description && (
              <div className="border-t pt-4">
                <p className="text-gray-600 text-sm">Descripción</p>
                <p className="text-[#1a5235]">{description}</p>
              </div>
            )}
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        </div>
      )}

      {/* Action buttons */}
      <div className="px-4 pb-8">
        <Button
          onClick={() => {
            if (step === 1) handleVerifyAccount()
            else if (step === 2) handleReviewTransfer()
            else if (step === 3) handleConfirmTransfer()
          }}
          disabled={loading || (step === 1 && !accountNumber) || (step === 2 && !amount)}
          className="w-full h-14 bg-[#1a5235] hover:bg-[#0f3320] disabled:bg-gray-400 text-white rounded-xl text-lg font-semibold"
        >
          {loading ? "Procesando..." : step === 3 ? "Confirmar transferencia" : "Continuar"}
        </Button>
      </div>
    </div>
  )
}

export default function TercerosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="text-[#1a5235]">Cargando...</div></div>}>
      <TercerosContent />
    </Suspense>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
