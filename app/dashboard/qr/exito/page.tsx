"use client"

import Link from "next/link"
import { CheckCircle, Download } from "lucide-react"
import BankLogo from "@/components/bank-logo"

export default function QRExitoPage() {
  return (
    <div className="min-h-screen bg-[#1a5235]">
      <div className="bg-white rounded-t-3xl mt-4 min-h-[calc(100vh-1rem)] p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-20 h-20 text-[#1a5235]" strokeWidth={1.5} />
        </div>

        <p className="text-center text-gray-700 mb-6">Se generó con éxito el código QR</p>

        {/* Detalles */}
        <div className="space-y-4 border-t border-dashed border-gray-300 pt-4">
          <div className="flex justify-between border-b border-dashed border-gray-300 pb-4">
            <div>
              <p className="text-gray-500 text-sm">Cuenta destino</p>
              <p className="font-semibold">JULIO CESAR BALDIVIEZO MORON</p>
              <p className="text-sm text-gray-600">Banco Mercantil Santa Cruz</p>
            </div>
            <p className="font-semibold">4072432644</p>
          </div>

          <div className="flex justify-between border-b border-dashed border-gray-300 pb-4">
            <span className="text-gray-500">Fecha de vencimiento</span>
            <span className="font-semibold">02/12/2025</span>
          </div>

          <div className="flex justify-between border-b border-dashed border-gray-300 pb-4">
            <span className="text-gray-500">Monto</span>
            <span className="font-semibold">Bs 50.00</span>
          </div>

          <div className="border-b border-dashed border-gray-300 pb-4">
            <p className="text-gray-500">Concepto</p>
            <p className="font-semibold">wasaaaa</p>
          </div>
        </div>

        {/* Logo y QR */}
        <div className="flex flex-col items-center mt-6">
          <div className="flex items-center gap-2 mb-4">
            <BankLogo size="sm" />
            <span className="text-[#1a5235] text-xl font-semibold">Mercantil Santa Cruz</span>
          </div>

          {/* QR Code placeholder */}
          <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
            <div className="w-56 h-56 bg-[url('/qr-code-pattern.jpg')] bg-contain bg-center bg-no-repeat relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#1a5235]">
                  <span className="text-[#1a5235] text-lg font-bold">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guardar QR */}
          <Link href="/dashboard" className="flex items-center gap-2 mt-4 text-gray-600">
            <Download className="w-5 h-5" />
            <span>Guardar QR</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
