"use client"

import { useState, useEffect, useMemo } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Save,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  CalendarX,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const DAYS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
]

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

type DayAvailability = {
  id?: string
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
}

type Override = {
  id?: string
  date: string
  start_time: string
  end_time: string
  is_blocked: boolean
  note: string
}

export default function AdminAvailabilityPage() {
  const [availability, setAvailability] = useState<DayAvailability[]>(
    DAYS.map((d) => ({
      day_of_week: d.value,
      start_time: "09:00",
      end_time: "17:00",
      is_active: d.value >= 1 && d.value <= 5,
    }))
  )
  const [overrides, setOverrides] = useState<Override[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showOverrideDialog, setShowOverrideDialog] = useState(false)
  const [editingOverride, setEditingOverride] = useState<Override | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [newOverride, setNewOverride] = useState<Override>({
    date: "",
    start_time: "09:00",
    end_time: "17:00",
    is_blocked: false,
    note: "",
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setIsLoading(true)
    const [{ data: avData }, { data: ovData }] = await Promise.all([
      supabase.from("availability").select("*").order("day_of_week"),
      supabase.from("availability_overrides").select("*").order("date"),
    ])

    if (avData && avData.length > 0) {
      const merged = DAYS.map((d) => {
        const existing = avData.find((a) => a.day_of_week === d.value)
        return existing || {
          day_of_week: d.value,
          start_time: "09:00",
          end_time: "17:00",
          is_active: false,
        }
      })
      setAvailability(merged)
    }

    setOverrides(ovData || [])
    setIsLoading(false)
  }

  const updateDay = (dayOfWeek: number, field: string, value: string | boolean) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.day_of_week === dayOfWeek ? { ...d, [field]: value } : d
      )
    )
  }

  const handleSaveSchedule = async () => {
    setIsSaving(true)
    setSaved(false)
    try {
      for (const day of availability) {
        const { data: existing } = await supabase
          .from("availability")
          .select("id")
          .eq("day_of_week", day.day_of_week)
          .single()

        if (existing) {
          await supabase
            .from("availability")
            .update({
              start_time: day.start_time,
              end_time: day.end_time,
              is_active: day.is_active,
            })
            .eq("id", existing.id)
        } else {
          await supabase.from("availability").insert([{
            day_of_week: day.day_of_week,
            start_time: day.start_time,
            end_time: day.end_time,
            is_active: day.is_active,
          }])
        }
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving availability:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveOverride = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = editingOverride || newOverride
    try {
      if (editingOverride?.id) {
        await supabase
          .from("availability_overrides")
          .update({
            start_time: data.start_time,
            end_time: data.end_time,
            is_blocked: data.is_blocked,
            note: data.note,
          })
          .eq("id", editingOverride.id)
      } else {
        await supabase.from("availability_overrides").insert([{
          date: data.date,
          start_time: data.is_blocked ? null : data.start_time,
          end_time: data.is_blocked ? null : data.end_time,
          is_blocked: data.is_blocked,
          note: data.note,
        }])
      }
      await loadData()
      setShowOverrideDialog(false)
      setEditingOverride(null)
      setNewOverride({ date: "", start_time: "09:00", end_time: "17:00", is_blocked: false, note: "" })
    } catch (error) {
      console.error("Error saving override:", error)
    }
  }

  const handleDeleteOverride = async (id: string) => {
    if (!confirm("Remove this date override?")) return
    await supabase.from("availability_overrides").delete().eq("id", id)
    await loadData()
  }

  const openAddOverride = (date?: string) => {
    setEditingOverride(null)
    setNewOverride({
      date: date || "",
      start_time: "09:00",
      end_time: "17:00",
      is_blocked: false,
      note: "",
    })
    setShowOverrideDialog(true)
  }

  const openEditOverride = (override: Override) => {
    setEditingOverride(override)
    setShowOverrideDialog(true)
  }

  // Calendar logic
  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days: (Date | null)[] = []
    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))
    return days
  }, [currentMonth])

  const getOverrideForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return overrides.find((o) => o.date === dateStr)
  }

  const getDayAvailability = (date: Date) => {
    return availability.find((a) => a.day_of_week === date.getDay())
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold" />
      </div>
    )
  }

  const formData = editingOverride || newOverride
  const setFormData = editingOverride
    ? (fn: (p: Override) => Override) => setEditingOverride((prev) => fn(prev!))
    : (fn: (p: Override) => Override) => setNewOverride((prev) => fn(prev))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl text-espresso">Availability</h2>
        <p className="text-warm-taupe text-sm">
          Set your weekly schedule and manage date-specific overrides
        </p>
      </div>

      {/* SECTION 1 — Weekly Schedule */}
      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20 flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-lg text-espresso flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-gold" />
            Weekly Default Schedule
          </CardTitle>
          <Button
            onClick={handleSaveSchedule}
            disabled={isSaving}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
          >
            {saved ? (
              <><CheckCircle className="w-4 h-4" />Saved!</>
            ) : (
              <><Save className="w-4 h-4" />{isSaving ? "Saving..." : "Save Schedule"}</>
            )}
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {DAYS.map((day, index) => {
            const dayData = availability.find((a) => a.day_of_week === day.value)
            if (!dayData) return null
            return (
              <div
                key={day.value}
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6 ${
                  index < DAYS.length - 1 ? "border-b border-blush-pink/20" : ""
                } ${dayData.is_active ? "bg-white" : "bg-gray-50"}`}
              >
                <div className="flex items-center gap-3 w-36 flex-shrink-0">
                  <Switch
                    checked={dayData.is_active}
                    onCheckedChange={(checked) => updateDay(day.value, "is_active", checked)}
                    className="data-[state=checked]:bg-rose-gold"
                  />
                  <Label className={`font-medium text-sm ${dayData.is_active ? "text-espresso" : "text-warm-taupe"}`}>
                    {day.label}
                  </Label>
                </div>
                {dayData.is_active ? (
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-warm-taupe whitespace-nowrap">Start</Label>
                      <Input
                        type="time"
                        value={dayData.start_time}
                        onChange={(e) => updateDay(day.value, "start_time", e.target.value)}
                        className="border-blush-pink w-32 text-sm"
                      />
                    </div>
                    <span className="text-warm-taupe">—</span>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-warm-taupe whitespace-nowrap">End</Label>
                      <Input
                        type="time"
                        value={dayData.end_time}
                        onChange={(e) => updateDay(day.value, "end_time", e.target.value)}
                        className="border-blush-pink w-32 text-sm"
                      />
                    </div>
                    <span className="text-xs text-warm-taupe hidden sm:block">
                      {(() => {
                        const start = parseInt(dayData.start_time.split(":")[0])
                        const end = parseInt(dayData.end_time.split(":")[0])
                        const hours = end - start
                        return `${hours} hour${hours !== 1 ? "s" : ""}`
                      })()}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-warm-taupe italic">Unavailable</span>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* SECTION 2 — Calendar with overrides */}
      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20 flex flex-row items-center justify-between">
          <CardTitle className="font-serif text-lg text-espresso flex items-center gap-2">
            <CalendarClock className="w-5 h-5 text-rose-gold" />
            Date Overrides & Blocked Dates
          </CardTitle>
          <Button
            onClick={() => openAddOverride()}
            className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Override
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-warm-taupe">Regular available day</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-champagne-gold" />
              <span className="text-warm-taupe">Custom hours override</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <span className="text-warm-taupe">Blocked / unavailable</span>
            </div>
          </div>

          {/* Month nav */}
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth((prev) => { const d = new Date(prev); d.setMonth(d.getMonth() - 1); return d })}
              className="text-espresso hover:text-rose-gold"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <p className="font-serif text-lg text-espresso">
              {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentMonth((prev) => { const d = new Date(prev); d.setMonth(d.getMonth() + 1); return d })}
              className="text-espresso hover:text-rose-gold"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-warm-taupe py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              if (!date) return <div key={`empty-${index}`} className="h-12" />
              const override = getOverrideForDate(date)
              const dayAvail = getDayAvailability(date)
              const isToday = new Date().toDateString() === date.toDateString()
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0))

              let dotColor = ""
              if (override?.is_blocked) dotColor = "bg-red-400"
              else if (override) dotColor = "bg-champagne-gold"
              else if (dayAvail?.is_active) dotColor = "bg-green-400"

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    if (override) openEditOverride(override)
                    else openAddOverride(date.toISOString().split("T")[0])
                  }}
                  className={`h-12 p-1 rounded-lg text-xs font-medium transition-all hover:bg-blush-pink/20 flex flex-col items-center justify-center gap-0.5 ${
                    isPast ? "opacity-40" : ""
                  } ${isToday ? "ring-2 ring-champagne-gold" : ""}`}
                >
                  <span className={`${override?.is_blocked ? "text-red-500" : "text-espresso"}`}>
                    {date.getDate()}
                  </span>
                  {dotColor && (
                    <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                  )}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3 — Overrides list */}
      {overrides.length > 0 && (
        <Card className="border-blush-pink/30">
          <CardHeader className="border-b border-blush-pink/20">
            <CardTitle className="font-serif text-lg text-espresso">
              Active Overrides
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {overrides.map((override, index) => (
              <div
                key={override.id}
                className={`flex items-center justify-between p-4 ${
                  index < overrides.length - 1 ? "border-b border-blush-pink/20" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    override.is_blocked ? "bg-red-100" : "bg-champagne-gold/20"
                  }`}>
                    {override.is_blocked
                      ? <CalendarX className="w-4 h-4 text-red-500" />
                      : <CalendarClock className="w-4 h-4 text-champagne-gold" />
                    }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-espresso">
                      {new Date(override.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "long", month: "long", day: "numeric", year: "numeric"
                      })}
                    </p>
                    <p className="text-xs text-warm-taupe">
                      {override.is_blocked
                        ? "🚫 Blocked — no bookings"
                        : `🕐 Custom hours: ${override.start_time} — ${override.end_time}`
                      }
                      {override.note && ` · ${override.note}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditOverride(override)}
                    className="border-champagne-gold text-espresso hover:bg-champagne-gold/10 text-xs"
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteOverride(override.id!)}
                    className="border-red-300 text-red-600 hover:bg-red-50 text-xs gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Info card */}
      <Card className="border-champagne-gold/30 bg-champagne-gold/5">
        <CardContent className="p-4">
          <p className="text-sm text-espresso font-medium mb-2">How overrides work</p>
          <ul className="text-sm text-warm-taupe space-y-1">
            <li>• <strong>Custom hours</strong> — override the default hours for a specific date only (e.g. June 5th 2pm–6pm instead of 9am–5pm)</li>
            <li>• <strong>Blocked dates</strong> — mark a date as fully unavailable (vacation, holiday, etc.)</li>
            <li>• Overrides take priority over the weekly schedule</li>
            <li>• Click any date on the calendar to add or edit an override</li>
          </ul>
        </CardContent>
      </Card>

      {/* Override Dialog */}
      <Dialog open={showOverrideDialog} onOpenChange={(open) => {
        setShowOverrideDialog(open)
        if (!open) setEditingOverride(null)
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">
              {editingOverride ? "Edit Date Override" : "Add Date Override"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveOverride} className="space-y-4 mt-2">
            {!editingOverride && (
              <div className="space-y-2">
                <Label className="text-espresso">Date *</Label>
                <Input
                  type="date"
                  value={newOverride.date}
                  onChange={(e) => setNewOverride((p) => ({ ...p, date: e.target.value }))}
                  required
                  className="border-blush-pink"
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            )}

            {editingOverride && (
              <div className="p-3 bg-gray-50 rounded-lg text-sm text-espresso font-medium">
                {new Date(editingOverride.date + "T12:00:00").toLocaleDateString("en-US", {
                  weekday: "long", month: "long", day: "numeric", year: "numeric"
                })}
              </div>
            )}

            {/* Block toggle */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-espresso">Block this date entirely</p>
                <p className="text-xs text-warm-taupe">No bookings allowed on this day</p>
              </div>
              <Switch
                checked={formData.is_blocked}
                onCheckedChange={(checked) => setFormData((p) => ({ ...p, is_blocked: checked }))}
                className="data-[state=checked]:bg-red-500"
              />
            </div>

            {!formData.is_blocked && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-espresso">Start Time</Label>
                  <Input
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData((p) => ({ ...p, start_time: e.target.value }))}
                    className="border-blush-pink"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-espresso">End Time</Label>
                  <Input
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData((p) => ({ ...p, end_time: e.target.value }))}
                    className="border-blush-pink"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-espresso">Note (optional)</Label>
              <Textarea
                value={formData.note}
                onChange={(e) => setFormData((p) => ({ ...p, note: e.target.value }))}
                placeholder="e.g. Holiday hours, vacation, special event..."
                rows={2}
                className="border-blush-pink resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => { setShowOverrideDialog(false); setEditingOverride(null) }}
                className="flex-1 border-espresso text-espresso"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
              >
                <Save className="w-4 h-4" />
                {formData.is_blocked ? "Block Date" : "Save Hours"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}