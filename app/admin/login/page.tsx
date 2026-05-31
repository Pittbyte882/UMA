"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminLoginPage() {
  const [status, setStatus] = useState("idle")
  const [email, setEmail] = useState("samantha@ultimatemusicacademy.com")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting...")

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setStatus("ERROR: " + error.message)
      return
    }

    setStatus("SUCCESS! Session: " + data.session?.access_token?.slice(0, 20))
    window.location.replace("http://localhost:3000/admin")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Login Test</h1>
      <p>Status: {status}</p>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", marginBottom: 10, padding: 8, width: 300 }}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{ display: "block", marginBottom: 10, padding: 8, width: 300 }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Sign In
        </button>
      </form>
    </div>
  )
}