"use client"

import Link from "next/link"
import { Menu, QrCode, ImageIcon, ScanLine } from "lucide-react"

export default function QRPage() {
  return (
    <div className="min-h-screen bg-[#e8ebe4]">
      {/* Header */}
      <header className="bg-[#1a5235] text-white px-4 py-6">
        <Link href="/menu" className="block mb-4">
          <Menu className="w-6 h-6" />
        </Link>
        <h1 className="text-xl">QR</h1>
        <div className="w-full h-px bg-[#2a7a4d] mt-4" />
      </header>

      <div className="p-4 space-y-6">
        {/* Cobrar QR Section */}
        <div>
          <h2 className="text-[#1a5235] font-semibold mb-3">Cobrar QR</h2>
          <Link href="/dashboard/qr/cobrar">
            <div className="bg-[#d1d5c9] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <QrCode className="w-6 h-6 text-[#1a5235]" />
              </div>
              <span className="text-[#1a5235] font-medium">Solicitud de cobro QR</span>
            </div>
          </Link>
        </div>

        {/* Pagar QR Section */}
        <div>
          <h2 className="text-[#1a5235] font-semibold mb-3">Pagar QR</h2>
          <div className="space-y-3">
            <button className="w-full bg-[#c8e6c9] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-[#1a5235]" />
              </div>
              <span className="text-[#1a5235] font-medium">Importar desde la galería</span>
            </button>

            <button className="w-full bg-[#d1d5c9] rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <ScanLine className="w-6 h-6 text-[#1a5235]" />
              </div>
              <span className="text-[#1a5235] font-medium">Escanear con la cámara</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
