"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CobrarQRPage() {
  const router = useRouter()
  const [concepto, setConcepto] = useState("")

  const handleConfirmar = () => {
    router.push("/dashboard/qr/exito")
  }

  return (
    <div className="min-h-screen bg-[#e8ebe4]">
      {/* Header */}
      <header className="bg-[#1a5235] text-white px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/qr">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg">Detalle de cobro QR</h1>
        </div>
        <Link href="/dashboard/qr" className="text-white">
          Cancelar
        </Link>
      </header>

      {/* Cuenta destino header */}
      <div className="bg-[#d1d5c9] px-4 py-3 flex justify-between text-sm">
        <span className="text-gray-600">Cuenta destino</span>
        <span className="text-gray-600">Saldo disponible</span>
      </div>

      {/* Cuenta seleccionada */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <div>
          <p className="font-semibold text-gray-900">4072432644</p>
          <p className="text-sm text-gray-900">Caja de Ahorro</p>
          <p className="text-sm text-gray-500">JULIO CESAR BALDIVIEZO MORON</p>
          <p className="text-sm text-gray-500">Banco Mercantil Santa Cruz</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Bs 3.54</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Fecha de vencimiento */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <span className="text-gray-600">Fecha de vencimiento</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold">02/12/2025</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Monto */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b">
        <span className="text-gray-600">Monto</span>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Bs 0.00</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Concepto */}
      <div className="p-4">
        <label className="text-gray-700 mb-2 block">Concepto</label>
        <input
          type="text"
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
          placeholder="Ingresa el concepto"
          className="w-full p-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Botón Confirmar */}
      <div className="p-4 mt-4">
        <button
          onClick={handleConfirmar}
          className="w-full bg-[#9e9e9e] text-white py-4 rounded-xl text-lg font-medium"
        >
          Confirmar
        </button>
      </div>
    </div>
  )
}
