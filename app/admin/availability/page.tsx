"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Save, Clock, CheckCircle } from "lucide-react"

const DAYS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
  { label: "Tuesday", value: 2 },
  { label: "Wednesday", value: 3 },
  { label: "Thursday", value: 4 },
  { label: "Friday", value: 5 },
  { label: "Saturday", value: 6 },
]

type DayAvailability = {
  id?: string
  day_of_week: number
  start_time: string
  end_time: string
  is_active: boolean
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
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    loadAvailability()
  }, [])

  const loadAvailability = async () => {
    setIsLoading(true)
    const { data } = await supabase
      .from("availability")
      .select("*")
      .order("day_of_week")

    if (data && data.length > 0) {
      // Merge with all days so every day shows
      const merged = DAYS.map((d) => {
        const existing = data.find((a) => a.day_of_week === d.value)
        return existing || {
          day_of_week: d.value,
          start_time: "09:00",
          end_time: "17:00",
          is_active: false,
        }
      })
      setAvailability(merged)
    }
    setIsLoading(false)
  }

  const updateDay = (dayOfWeek: number, field: string, value: string | boolean) => {
    setAvailability((prev) =>
      prev.map((d) =>
        d.day_of_week === dayOfWeek ? { ...d, [field]: value } : d
      )
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaved(false)

    try {
      for (const day of availability) {
        if (day.id) {
          // Update existing
          await supabase
            .from("availability")
            .update({
              start_time: day.start_time,
              end_time: day.end_time,
              is_active: day.is_active,
            })
            .eq("id", day.id)
        } else {
          // Check if exists first
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
      }

      await loadAvailability()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving availability:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-gold" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Availability</h2>
          <p className="text-warm-taupe text-sm">
            Set your available days and hours for lesson bookings
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-rose-gold hover:bg-rose-gold/90 text-white gap-2"
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </>
          )}
        </Button>
      </div>

      <Card className="border-blush-pink/30">
        <CardHeader className="border-b border-blush-pink/20">
          <CardTitle className="font-serif text-lg text-espresso flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-gold" />
            Weekly Schedule
          </CardTitle>
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
                {/* Day toggle */}
                <div className="flex items-center gap-3 w-36 flex-shrink-0">
                  <Switch
                    checked={dayData.is_active}
                    onCheckedChange={(checked) =>
                      updateDay(day.value, "is_active", checked)
                    }
                    className="data-[state=checked]:bg-rose-gold"
                  />
                  <Label
                    className={`font-medium text-sm ${
                      dayData.is_active ? "text-espresso" : "text-warm-taupe"
                    }`}
                  >
                    {day.label}
                  </Label>
                </div>

                {/* Time inputs */}
                {dayData.is_active ? (
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-warm-taupe whitespace-nowrap">
                        Start
                      </Label>
                      <Input
                        type="time"
                        value={dayData.start_time}
                        onChange={(e) =>
                          updateDay(day.value, "start_time", e.target.value)
                        }
                        className="border-blush-pink w-32 text-sm"
                      />
                    </div>
                    <span className="text-warm-taupe">—</span>
                    <div className="flex items-center gap-2">
                      <Label className="text-xs text-warm-taupe whitespace-nowrap">
                        End
                      </Label>
                      <Input
                        type="time"
                        value={dayData.end_time}
                        onChange={(e) =>
                          updateDay(day.value, "end_time", e.target.value)
                        }
                        className="border-blush-pink w-32 text-sm"
                      />
                    </div>
                    <span className="text-xs text-warm-taupe hidden sm:block">
                      {(() => {
                        const start = parseInt(dayData.start_time.split(":")[0])
                        const end = parseInt(dayData.end_time.split(":")[0])
                        const hours = end - start
                        return `${hours} hour${hours !== 1 ? "s" : ""} available`
                      })()}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-warm-taupe italic">
                    Unavailable — no bookings allowed
                  </span>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Info card */}
      <Card className="border-champagne-gold/30 bg-champagne-gold/5">
        <CardContent className="p-4">
          <p className="text-sm text-espresso font-medium mb-1">How this works</p>
          <ul className="text-sm text-warm-taupe space-y-1">
            <li>• Toggle days on/off to control which days students can book</li>
            <li>• Set start and end times for each available day</li>
            <li>• Changes take effect immediately on the booking calendar</li>
            <li>• Existing bookings are not affected when you change availability</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}