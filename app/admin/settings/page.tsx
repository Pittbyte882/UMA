"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Save,
} from "lucide-react"

export default function AdminSettingsPage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  })

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError(null)
    setPasswordSuccess(false)

    if (passwords.newPassword !== passwords.confirm) {
      setPasswordError("New passwords do not match.")
      return
    }

    if (passwords.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.")
      return
    }

    setIsChangingPassword(true)

    try {
      // Verify current password by re-authenticating
      const { data: { user } } = await supabase.auth.getUser()
      if (!user?.email) throw new Error("Not authenticated")

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: passwords.current,
      })

      if (signInError) {
        setPasswordError("Current password is incorrect.")
        setIsChangingPassword(false)
        return
      }

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      })

      if (updateError) throw updateError

      setPasswordSuccess(true)
      setPasswords({ current: "", newPassword: "", confirm: "" })
    } catch (error) {
      console.error("Error changing password:", error)
      setPasswordError("Something went wrong. Please try again.")
    } finally {
      setIsChangingPassword(false)
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="font-serif text-2xl text-espresso">Settings</h2>
        <p className="text-warm-taupe text-sm">
          Manage your admin account settings
        </p>
      </div>

      {/* Change Password */}
      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20">
          <CardTitle className="font-serif text-lg text-espresso flex items-center gap-2">
            <Lock className="w-5 h-5 text-rose-gold" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {passwordSuccess && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle className="w-4 h-4" />
              Password changed successfully!
            </div>
          )}

          {passwordError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4" />
              {passwordError}
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="space-y-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label className="text-espresso">Current Password</Label>
              <div className="relative">
                <Input
                  type={showCurrent ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, current: e.target.value }))
                  }
                  required
                  placeholder="••••••••"
                  className="border-blush-pink pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-taupe hover:text-espresso"
                >
                  {showCurrent ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label className="text-espresso">New Password</Label>
              <div className="relative">
                <Input
                  type={showNew ? "text" : "password"}
                  value={passwords.newPassword}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, newPassword: e.target.value }))
                  }
                  required
                  placeholder="••••••••"
                  className="border-blush-pink pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-taupe hover:text-espresso"
                >
                  {showNew ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-warm-taupe">
                Minimum 8 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label className="text-espresso">Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) =>
                    setPasswords((p) => ({ ...p, confirm: e.target.value }))
                  }
                  required
                  placeholder="••••••••"
                  className="border-blush-pink pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-taupe hover:text-espresso"
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {passwords.confirm && passwords.newPassword !== passwords.confirm && (
                <p className="text-xs text-red-500">Passwords do not match</p>
              )}
              {passwords.confirm && passwords.newPassword === passwords.confirm && (
                <p className="text-xs text-green-600">✓ Passwords match</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isChangingPassword}
              className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
            >
              <Save className="w-4 h-4" />
              {isChangingPassword ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20">
          <CardTitle className="font-serif text-lg text-espresso">
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-espresso">Email</p>
              <p className="text-sm text-warm-taupe">
                Samantha@ultimatemusicacademy.com
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-espresso">Role</p>
              <p className="text-sm text-warm-taupe">Administrator</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-espresso">Academy</p>
              <p className="text-sm text-warm-taupe">
                Ultimate Music Academy
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20">
          <CardTitle className="font-serif text-lg text-espresso">
            Payment Handles
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-warm-taupe mb-4">
            These will appear in booking confirmation emails sent to students.
          </p>
          <PaymentHandles />
        </CardContent>
      </Card>

      {/* Booking Rules */}
      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20">
          <CardTitle className="font-serif text-lg text-espresso">
            Booking Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-espresso">
                  Standard Payment Window
                </p>
                <p className="text-xs text-warm-taupe">
                  Time allowed to pay before slot is released
                </p>
              </div>
              <span className="text-sm font-medium text-rose-gold">
                24 hours
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-espresso">
                  Next-Day Payment Window
                </p>
                <p className="text-xs text-warm-taupe">
                  If lesson is tomorrow, payment required within
                </p>
              </div>
              <span className="text-sm font-medium text-rose-gold">
                1 hour
              </span>
            </div>
          </div>
          <p className="text-xs text-warm-taupe mt-4">
            To change these rules, contact your developer.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentHandles() {
  const [handles, setHandles] = useState({
    venmo: "",
    cashapp: "",
    zelle: "",
    paypal: "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const updates = Object.entries(handles).map(([key, value]) =>
        supabase
          .from("admin_settings")
          .upsert({ key: `payment_${key}`, value }, { onConflict: "key" })
      )
      await Promise.all(updates)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving payment handles:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-espresso">Venmo</Label>
          <Input
            value={handles.venmo}
            onChange={(e) =>
              setHandles((p) => ({ ...p, venmo: e.target.value }))
            }
            placeholder="@username"
            className="border-blush-pink"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-espresso">CashApp</Label>
          <Input
            value={handles.cashapp}
            onChange={(e) =>
              setHandles((p) => ({ ...p, cashapp: e.target.value }))
            }
            placeholder="$username"
            className="border-blush-pink"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-espresso">Zelle</Label>
          <Input
            value={handles.zelle}
            onChange={(e) =>
              setHandles((p) => ({ ...p, zelle: e.target.value }))
            }
            placeholder="Phone or email"
            className="border-blush-pink"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-espresso">PayPal</Label>
          <Input
            value={handles.paypal}
            onChange={(e) =>
              setHandles((p) => ({ ...p, paypal: e.target.value }))
            }
            placeholder="Email or link"
            className="border-blush-pink"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSaving}
        className="w-full bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
      >
        <Save className="w-4 h-4" />
        {saved ? "✓ Saved!" : isSaving ? "Saving..." : "Save Payment Handles"}
      </Button>
    </form>
  )
}