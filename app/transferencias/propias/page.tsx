"use client"

import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const cuentas = [
  {
    id: 1,
    numero: "4072432644",
    tipo: "Caja de Ahorro",
    titular: "JULIO CESAR BALDIVIEZO MORON",
    banco: "Banco Mercantil Santa Cruz",
    saldo: "Bs 3.54",
  },
]

export default function CuentasPropiasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-[#e8ebe8] flex flex-col">
      {/* Header */}
      <div className="bg-[#1a5235] text-white px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/transferencias">
              <ChevronLeft className="h-6 w-6" />
            </Link>
            <h1 className="text-lg font-medium">Cuenta destino</h1>
          </div>
          <Link href="/transferencias" className="text-white">
            Cancelar
          </Link>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Buscar por nombre o número de cuenta"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-center text-gray-600 py-4">Selecciona la cuenta destino</p>

        {/* Account Type Header */}
        <div className="bg-[#d4d8d4] px-4 py-3 flex justify-between text-sm">
          <span className="text-[#1a5235] font-medium">Caja de Ahorro</span>
          <span className="text-[#1a5235]">Saldo disponible</span>
        </div>

        {/* Accounts List */}
        {cuentas.map((cuenta) => (
          <Link key={cuenta.id} href="/transferencias/confirmar" className="bg-white block border-b border-gray-200">
            <div className="px-4 py-4 flex items-center justify-between">
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-gray-900">{cuenta.numero}</span>
                  <span className="text-gray-700">{cuenta.saldo}</span>
                </div>
                <p className="text-gray-900 font-medium">{cuenta.tipo}</p>
                <p className="text-gray-500 text-sm">{cuenta.titular}</p>
                <p className="text-gray-500 text-sm">{cuenta.banco}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 ml-2" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
