"use client"

import { ChevronLeft, Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function TransferenciasAgendadasPage() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-[#e8ebe8] flex flex-col">
      {/* Header */}
      <div className="bg-[#1a5235] text-white px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/transferencias">
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-lg font-medium">Agendamiento</h1>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <input
            type="text"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pr-12 bg-white rounded-xl text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start justify-center pt-8">
        <p className="text-gray-600">No se han encontrado transacciones.</p>
      </div>
    </div>
  )
}
