"use client"

import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const transferencias = [
  {
    id: 1,
    estado: "Orden Aceptada",
    nombre: "BALDIVIEZO MORON JULIO CESAR",
    cuenta: "4072432644",
    monto: "Bs 1,000.00",
    fecha: "03/11/2025 12:05:40",
  },
  {
    id: 2,
    estado: "Orden Aceptada",
    nombre: "BALDIVIEZO MORON JULIO CESAR",
    cuenta: "4072432644",
    monto: "Bs 150.00",
    fecha: "02/11/2025 10:24:49",
  },
  {
    id: 3,
    estado: "Orden Aceptada",
    nombre: "FABRICA DE HELADOS BITS AND CREAM SA",
    cuenta: "4072432644",
    monto: "Bs 55.00",
    fecha: "01/11/2025 15:15:37",
  },
  {
    id: 4,
    estado: "Orden Aceptada",
    nombre: "YOLANDA CLEMENTE HUARACHI",
    cuenta: "4072432644",
    monto: "Bs 38.00",
    fecha: "01/11/2025 15:09:17",
  },
  {
    id: 5,
    estado: "Orden Aceptada",
    nombre: "VARGAS FELIPE ALEX EDUARDO",
    cuenta: "4072432644",
    monto: "Bs 40.00",
    fecha: "01/11/2025 03:02:01",
  },
  {
    id: 6,
    estado: "Orden Aceptada",
    nombre: "JUAN MANUEL RIBERA FLORES",
    cuenta: "4072432644",
    monto: "Bs 80.00",
    fecha: "31/10/2025 23:10:18",
  },
  {
    id: 7,
    estado: "Orden Aceptada",
    nombre: "REYNALDO MENDOZA MAMANI",
    cuenta: "4072432644",
    monto: "Bs 36.00",
    fecha: "31/10/2025 21:50:11",
  },
  {
    id: 8,
    estado: "Orden Aceptada",
    nombre: "UNIVERSIDAD PRIVADA BOLIVIANA",
    cuenta: "4072432644",
    monto: "Bs 4,312.00",
    fecha: "30/10/2025 14:22:05",
  },
]

export default function TransferenciasRecientesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-[#e8ebe8] flex flex-col">
      {/* Header */}
      <div className="bg-[#1a5235] text-white px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/transferencias">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-medium">Transferencias recientes</h1>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Buscar transferencias"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white">
        <p className="text-center text-gray-600 py-4 bg-[#e8ebe8]">Selecciona una transferencia</p>

        {/* Transfers List */}
        <div className="divide-y divide-gray-200">
          {transferencias.map((t) => (
            <div key={t.id} className="px-4 py-4">
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-gray-900">{t.estado}</span>
                <span className="font-bold text-gray-900">{t.monto}</span>
              </div>
              <p className="text-gray-700 font-medium">{t.nombre}</p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span>{t.cuenta}</span>
                </div>
                <span className="text-gray-500 text-sm">{t.fecha}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
