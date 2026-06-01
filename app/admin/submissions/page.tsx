"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Mail,
  Phone,
  Search,
  RefreshCw,
  MessageSquare,
  Users,
  Trash2,
  Eye,
  Calendar,
} from "lucide-react"

type ContactSubmission = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  created_at: string
}

type ConsultationRequest = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  status: string
  created_at: string
}

export default function AdminSubmissionsPage() {
  const [contacts, setContacts] = useState<ContactSubmission[]>([])
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectedItem, setSelectedItem] = useState<ContactSubmission | ConsultationRequest | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("contacts")

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    setIsLoading(true)
    const [{ data: contactData }, { data: consultationData }] =
      await Promise.all([
        supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("consultation_requests")
          .select("*")
          .order("created_at", { ascending: false }),
      ])

    setContacts(contactData || [])
    setConsultations(consultationData || [])
    setIsLoading(false)
  }

  const handleDeleteContact = async (id: string) => {
    if (!confirm("Delete this submission?")) return
    await supabase.from("contact_submissions").delete().eq("id", id)
    await loadSubmissions()
    setShowDialog(false)
  }

  const handleDeleteConsultation = async (id: string) => {
    if (!confirm("Delete this consultation request?")) return
    await supabase.from("consultation_requests").delete().eq("id", id)
    await loadSubmissions()
    setShowDialog(false)
  }

  const updateConsultationStatus = async (id: string, status: string) => {
    await supabase
      .from("consultation_requests")
      .update({ status })
      .eq("id", id)
    await loadSubmissions()
    if (selectedItem && "status" in selectedItem) {
      setSelectedItem({ ...selectedItem, status } as ConsultationRequest)
    }
  }

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const filteredConsultations = consultations.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const parseConsultationMessage = (message: string) => {
    if (!message) return {}
    const parts: Record<string, string> = {}
    message.split(" | ").forEach((part) => {
      const [key, ...rest] = part.split(": ")
      if (key && rest.length) parts[key.trim()] = rest.join(": ").trim()
    })
    return parts
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl text-espresso">Submissions</h2>
          <p className="text-warm-taupe text-sm">
            View contact messages and consultation requests
          </p>
        </div>
        <Button
          onClick={loadSubmissions}
          variant="outline"
          className="border-espresso text-espresso gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-taupe" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="pl-10 border-blush-pink"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-gray-100">
          <TabsTrigger
            value="contacts"
            className="gap-2 data-[state=active]:bg-rose-gold data-[state=active]:text-white"
          >
            <MessageSquare className="w-4 h-4" />
            Contact ({contacts.length})
          </TabsTrigger>
          <TabsTrigger
            value="consultations"
            className="gap-2 data-[state=active]:bg-rose-gold data-[state=active]:text-white"
          >
            <Users className="w-4 h-4" />
            Consultations ({consultations.length})
          </TabsTrigger>
        </TabsList>

        {/* Contact Submissions */}
        <TabsContent value="contacts" className="space-y-3 mt-4">
          {filteredContacts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-blush-pink mx-auto mb-3" />
                <p className="text-warm-taupe">No contact submissions yet.</p>
              </CardContent>
            </Card>
          ) : (
            filteredContacts.map((contact) => (
              <Card
                key={contact.id}
                className="border-blush-pink/30 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => {
                  setSelectedItem(contact)
                  setShowDialog(true)
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-espresso">{contact.name}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-warm-taupe mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {contact.email}
                        </span>
                        {contact.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {contact.phone}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(contact.created_at).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-warm-taupe mt-2 line-clamp-2">
                        {contact.message}
                      </p>
                    </div>
                    <Eye className="w-4 h-4 text-warm-taupe flex-shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Consultation Requests */}
        <TabsContent value="consultations" className="space-y-3 mt-4">
          {filteredConsultations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-blush-pink mx-auto mb-3" />
                <p className="text-warm-taupe">No consultation requests yet.</p>
              </CardContent>
            </Card>
          ) : (
            filteredConsultations.map((consultation) => {
              const details = parseConsultationMessage(consultation.message)
              return (
                <Card
                  key={consultation.id}
                  className="border-blush-pink/30 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedItem(consultation)
                    setShowDialog(true)
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-espresso">
                            {consultation.name}
                          </p>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              consultation.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : consultation.status === "cancelled"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {consultation.status || "pending"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-warm-taupe">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {consultation.email}
                          </span>
                          {consultation.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {consultation.phone}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(consultation.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        {details["Student Type"] && (
                          <p className="text-xs text-warm-taupe mt-1">
                            Student: {details["Student Type"]} •{" "}
                            {details["Experience"]}
                          </p>
                        )}
                      </div>
                      <Eye className="w-4 h-4 text-warm-taupe flex-shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>

      {/* Detail Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-serif text-espresso">
              {activeTab === "contacts"
                ? "Contact Message"
                : "Consultation Request"}
            </DialogTitle>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 mt-2">
              <div>
                <h3 className="font-serif text-xl text-espresso">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-warm-taupe">
                  {new Date(selectedItem.created_at).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-warm-taupe">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${selectedItem.email}`}
                    className="hover:text-rose-gold"
                  >
                    {selectedItem.email}
                  </a>
                </div>
                {selectedItem.phone && (
                  <div className="flex items-center gap-2 text-warm-taupe">
                    <Phone className="w-4 h-4" />
                    {selectedItem.phone}
                  </div>
                )}
              </div>

              {/* Message or consultation details */}
              {"message" in selectedItem && activeTab === "contacts" && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-medium text-espresso mb-2">
                    Message
                  </p>
                  <p className="text-sm text-warm-taupe leading-relaxed">
                    {selectedItem.message}
                  </p>
                </div>
              )}

              {activeTab === "consultations" && "message" in selectedItem && (
                <div className="space-y-2">
                  {Object.entries(
                    parseConsultationMessage(selectedItem.message)
                  ).map(([key, value]) => (
                    <div key={key} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-medium text-espresso mb-1">
                        {key}
                      </p>
                      <p className="text-sm text-warm-taupe">{value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Consultation status actions */}
              {activeTab === "consultations" &&
                "status" in selectedItem && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-espresso">
                      Update Status
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          updateConsultationStatus(selectedItem.id, "confirmed")
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs"
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateConsultationStatus(selectedItem.id, "pending")
                        }
                        className="flex-1 border-yellow-400 text-yellow-700 hover:bg-yellow-50 text-xs"
                      >
                        Pending
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateConsultationStatus(selectedItem.id, "cancelled")
                        }
                        className="flex-1 border-red-300 text-red-600 hover:bg-red-50 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

              {/* Reply and Delete */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  className="flex-1 border-champagne-gold text-espresso hover:bg-champagne-gold/10 gap-2"
                  onClick={() => window.open(`https://mail.google.com/mail/?view=cm&to=${selectedItem.email}&su=Re: Your inquiry to Ultimate Music Academy`, '_blank')}
                >
                  <Mail className="w-4 h-4" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    activeTab === "contacts"
                      ? handleDeleteContact(selectedItem.id)
                      : handleDeleteConsultation(selectedItem.id)
                  }
                  className="border-red-300 text-red-600 hover:bg-red-50 gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>
                <Button
                  onClick={() => setShowDialog(false)}
                  className="flex-1 bg-rose-gold hover:bg-rose-gold/90 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}