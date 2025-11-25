"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Menu, ChevronRight } from "lucide-react"
import { BankLogo } from "@/components/bank-logo"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"
import { useUser } from "@/contexts/UserContext"

export default function LoginPage() {
  const router = useRouter()
  const { setUser } = useUser()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(true)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await api.login(username, password)

      if (result.success) {
        setUser(result.user)
        router.push("/dashboard")
      } else {
        setError(result.message || "Usuario o contraseña incorrectos")
      }
    } catch (err) {
      console.error("Error en login:", err)
      setError("Error al conectar con el servidor")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#e8f0ea]">
      {/* Header with mountain background */}
      <div className="relative h-[45vh] bg-gradient-to-b from-[#1a5235] to-[#2d7a4f] overflow-hidden">
        {/* Mountain background image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{
            backgroundImage: `url('/snowy-mountain-landscape-bolivia-illimani.jpg')`,
          }}
        />

        {/* Menu button */}
        <button className="absolute top-12 left-4 z-10 text-white">
          <Menu className="w-8 h-8" />
        </button>

        {/* Logo centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <BankLogo size="lg" />
          
        </div>
      </div>

      {/* Register button */}
      <div className="bg-[#d9e8dc] py-4 px-6">
        <button className="flex items-center justify-center gap-3 w-full text-[#1a5235] font-semibold text-lg">
          <div className="w-10 h-10 rounded-full border-2 border-[#1a5235] flex items-center justify-center">
            <ChevronRight className="w-6 h-6" />
          </div>
          REGÍSTRATE
        </button>
      </div>

      {/* Login form */}
      <div className="flex-1 px-6 py-6 space-y-4">
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username field */}
          <div className="relative">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-14 bg-white rounded-xl border-0 pr-12 text-[#1a5235] placeholder:text-gray-400"
              placeholder="Usuario"
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <EyeIcon />
            </button>
          </div>

          {/* Password field */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full h-14 bg-white rounded-xl border-0 pr-12 text-[#1a5235] placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <EyeIcon />
            </button>
          </div>

          {/* Remember me toggle */}
          <div className="flex items-center gap-3 py-2">
            <Switch
              checked={rememberMe}
              onCheckedChange={setRememberMe}
              className="data-[state=checked]:bg-[#1a5235]"
            />
            <span className="text-[#1a5235]">Recuérdame</span>
          </div>

          {/* Forgot password link */}
          <div className="text-center py-2">
            <a href="#" className="text-[#1a5235] underline">
              Recupera tu contraseña de acceso
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Login button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-gray-400 hover:bg-[#1a5235] text-white rounded-xl text-lg font-semibold disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Acceder"}
          </Button>
        </form>

        {/* Face ID option */}
        <div className="flex items-center justify-center gap-3 py-4">
          <FaceIdIcon />
          <span className="text-[#1a5235]">Accede con Face ID</span>
        </div>
      </div>
    </div>
  )
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
      <path d="M3 3l18 18" strokeLinecap="round" />
    </svg>
  )
}

function FaceIdIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1a5235" strokeWidth="1.5">
      <path d="M7 3H5a2 2 0 0 0-2 2v2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M17 21h2a2 2 0 0 0 2-2v-2" />
      <circle cx="9" cy="9" r="1" fill="#1a5235" />
      <circle cx="15" cy="9" r="1" fill="#1a5235" />
      <path d="M9 15c.5 1 1.5 2 3 2s2.5-1 3-2" />
    </svg>
  )
}
