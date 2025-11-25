"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NuevoDestinatarioPage() {
  const router = useRouter()

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

      {/* Select account type */}
      <div className="bg-gray-200 py-3 px-4">
        <p className="text-center text-gray-600">Selecciona el tipo de cuenta</p>
      </div>

      {/* Account type options */}
      <div className="divide-y divide-gray-200">
        <button
          onClick={() => router.push("/transferencias/nuevo/terceros")}
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
