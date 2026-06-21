"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PageHeader } from "@/components/shared/section-heading"
import { WavyDivider } from "@/components/layout/wavy-divider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Calendar, CheckCircle, Gift, Clock, MessageCircle } from "lucide-react"
import { MarbleAccent } from "@/components/shared/marble-accent"
import { supabase } from "@/lib/supabase"

const benefits = [
  {
    icon: MessageCircle,
    title: "Discuss Your Goals",
    description: "Share your musical aspirations and what you hope to achieve.",
  },
  {
    icon: Clock,
    title: "15 Minutes Free",
    description: "A no-pressure conversation to explore if we're the right fit.",
  },
  {
    icon: Gift,
    title: "No Obligation",
    description: "Learn about our programs with zero commitment required.",
  },
]

const improvementAreas = [
  "Confidence",
  "Pitch",
  "Breath Control",
  "Stage Presence",
  "Riffing/Runs",
  "Range",
  "Rhythm",
  "Songwriting",
  "Performance Skills",
  "Audition Preparation",
  "Public Speaking",
]

const musicStyles = [
  "Pop",
  "R&B",
  "Gospel/Christian",
  "Musical Theater",
  "Jazz",
  "Country",
  "Rock",
  "Classical",
  "Rap/Hip-Hop",
  "Disney",
]

export default function ConsultationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isQuestionnaireSubmitting, setIsQuestionnaireSubmitting] = useState(false)
  const [isQuestionnaireSubmitted, setIsQuestionnaireSubmitted] = useState(false)
  const [questionnaireError, setQuestionnaireError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    // Student Info (shortened consultation form)
    studentName: "",
    parentName: "",
    email: "",
    phone: "",
  })

  const [questionnaireData, setQuestionnaireData] = useState({
    whyLessons: "",
    singingExperience: "",
    favoriteArtists: "",
    previousLessons: "",
    previousLessonsDetails: "",
    hopingToGain: "",
    improvementAreas: [] as string[],
    otherImprovement: "",
    goals: "",
    playsInstruments: "",
    instrumentDetails: "",
    songsToStudy: "",
    musicStyles: [] as string[],
    otherStyle: "",
    greatSingerMeans: "",
    lovesAboutVoice: "",
    anythingElse: "",
    parentHopes: "",
    learningNeeds: "",
    preferredDate: "",
    lessonFormat: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleQuestionnaireChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestionnaireData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleQuestionnaireSelectChange = (name: string, value: string) => {
    setQuestionnaireData((prev) => ({ ...prev, [name]: value }))
  }

  const handleQuestionnaireCheckbox = (
    field: "improvementAreas" | "musicStyles",
    value: string,
    checked: boolean
  ) => {
    setQuestionnaireData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((v) => v !== value),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const message = `
Student Name: ${formData.studentName} | 
Parent/Guardian: ${formData.parentName} | 
Email: ${formData.email} | 
Phone: ${formData.phone}
      `.trim()

      const { error: supabaseError } = await supabase
        .from("consultation_requests")
        .insert([{
          name: formData.studentName,
          email: formData.email,
          phone: formData.phone,
          message,
          status: "pending",
        }])

      if (supabaseError) throw supabaseError

      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.studentName,
          email: formData.email,
          phone: formData.phone,
          message,
        }),
      })

      setIsSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuestionnaireSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsQuestionnaireSubmitting(true)
    setQuestionnaireError(null)

    try {
      const message = `
Student Name: ${formData.studentName} | 
Parent/Guardian: ${formData.parentName} | 
Email: ${formData.email} | 
Phone: ${formData.phone} | 
Why Lessons: ${questionnaireData.whyLessons} | 
Singing Experience: ${questionnaireData.singingExperience} | 
Favorite Artists: ${questionnaireData.favoriteArtists} | 
Previous Lessons: ${questionnaireData.previousLessons} | 
Previous Lessons Details: ${questionnaireData.previousLessonsDetails} | 
Hoping to Gain: ${questionnaireData.hopingToGain} | 
Improvement Areas: ${questionnaireData.improvementAreas.join(", ")} ${questionnaireData.otherImprovement ? `+ ${questionnaireData.otherImprovement}` : ""} | 
Goals: ${questionnaireData.goals} | 
Plays Instruments: ${questionnaireData.playsInstruments} | 
Instrument Details: ${questionnaireData.instrumentDetails} | 
Songs to Study: ${questionnaireData.songsToStudy} | 
Music Styles: ${questionnaireData.musicStyles.join(", ")} ${questionnaireData.otherStyle ? `+ ${questionnaireData.otherStyle}` : ""} | 
What Makes Great Singer: ${questionnaireData.greatSingerMeans} | 
Loves About Voice: ${questionnaireData.lovesAboutVoice} | 
Anything Else: ${questionnaireData.anythingElse} | 
Parent Hopes: ${questionnaireData.parentHopes} | 
Learning Needs: ${questionnaireData.learningNeeds} | 
Preferred Date: ${questionnaireData.preferredDate} | 
Lesson Format: ${questionnaireData.lessonFormat}
      `.trim()

      const { error: supabaseError } = await supabase
        .from("consultation_requests")
        .insert([{
          name: formData.studentName,
          email: formData.email,
          phone: formData.phone,
          message,
          status: "pending",
        }])

      if (supabaseError) throw supabaseError

      await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.studentName,
          email: formData.email,
          phone: formData.phone,
          preferredDate: questionnaireData.preferredDate,
          goals: questionnaireData.goals,
          message,
        }),
      })

      setIsQuestionnaireSubmitted(true)
    } catch (err) {
      console.error(err)
      setQuestionnaireError("Something went wrong. Please try again.")
    } finally {
      setIsQuestionnaireSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-pearl-white">
      <Header />
      <main>
        <PageHeader
          title="Free Consultation"
          subtitle="Take the first step toward discovering your voice. Complete this form to schedule your complimentary 15-minute consultation."
        />

        <section className="py-20 md:py-28 relative overflow-hidden">
          <MarbleAccent variant="blob-center" size="xl" opacity={0.15} />
          <div className="container mx-auto px-4 relative z-10">

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-blush-pink/30"
                >
                  <div className="w-14 h-14 rounded-full bg-champagne-gold/20 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-rose-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-espresso mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-warm-taupe text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              {isSubmitted ? (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="font-serif text-2xl text-espresso mb-2">
                      Request Received!
                    </h3>
                    <p className="text-warm-taupe mb-4">
                      Thank you for your interest in Ultimate Music Academy.
                      We&apos;ll review your request and contact you within 24
                      hours to schedule your free consultation.
                    </p>
                    <p className="text-warm-taupe mb-2">
                      To help us make the most of your consultation, please{" "}
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-rose-gold hover:text-champagne-gold underline font-medium"
                      >
                        click here to fill out the full Questionnaire
                      </button>
                      .
                    </p>
                    <p className="text-sm text-warm-taupe">
                      Check your email for confirmation.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card className="border-blush-pink/50 shadow-lg">
                    <CardContent className="p-8">
                      <h2 className="font-serif text-2xl text-espresso mb-2 text-center">
                        Free Consultation Request
                      </h2>
                      <p className="text-warm-taupe text-sm text-center mb-8">
                        Fill out your info below and we&apos;ll be in touch to
                        schedule your free consultation.
                      </p>

                      {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-espresso">Student Name *</Label>
                          <Input
                            name="studentName"
                            value={formData.studentName}
                            onChange={handleChange}
                            required
                            placeholder="Full name"
                            className="border-blush-pink"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-espresso">
                            Parent/Guardian Name (if applicable)
                          </Label>
                          <Input
                            name="parentName"
                            value={formData.parentName}
                            onChange={handleChange}
                            placeholder="Parent or guardian name"
                            className="border-blush-pink"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-espresso">Email Address *</Label>
                          <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your@email.com"
                            className="border-blush-pink"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-espresso">Phone Number</Label>
                          <Input
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className="border-blush-pink"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-rose-gold hover:bg-rose-gold/90 text-white w-full"
                          size="lg"
                        >
                          {isSubmitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              <Calendar className="w-4 h-4 mr-2" />
                              Submit Request
                            </>
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  <p className="text-center text-warm-taupe text-sm mt-6">
                    After submitting, please{" "}
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="text-rose-gold hover:text-champagne-gold underline font-medium"
                    >
                      click here to fill out the full Questionnaire
                    </button>
                    .
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <WavyDivider variant="gradient" />

        <section className="py-16 bg-blush-pink/20">
          <div className="container mx-auto px-4 text-center">
            <h3 className="font-serif text-2xl text-espresso mb-4">
              What to Expect
            </h3>
            <p className="text-warm-taupe max-w-2xl mx-auto">
              During your free 15-minute consultation, we&apos;ll review your
              questionnaire together, discuss your musical background and goals,
              and determine the best program and placement for you or your
              student.
            </p>
          </div>
        </section>
      </main>
      <Footer />

      {/* Full Questionnaire Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-espresso">
              Vocal Student Questionnaire
            </DialogTitle>
          </DialogHeader>

          {isQuestionnaireSubmitted ? (
            <div className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-espresso mb-2">
                Questionnaire Received!
              </h3>
              <p className="text-warm-taupe mb-4">
                Thank you for completing the questionnaire. We&apos;ll review
                your answers before your consultation.
              </p>
            </div>
          ) : (
            <>
              <p className="text-warm-taupe text-sm mb-6">
                Please complete this questionnaire prior to your free
                consultation. Your answers will help us get to know you and
                make the most of our time together.
              </p>

              {questionnaireError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {questionnaireError}
                </div>
              )}

              <form onSubmit={handleQuestionnaireSubmit} className="space-y-10">

                {/* About You & Your Voice */}
                <div>
                  <h3 className="font-serif text-lg text-espresso mb-4 pb-2 border-b border-blush-pink/30">
                    About You & Your Voice
                  </h3>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-espresso">
                        Why do you want to take voice lessons? *
                      </Label>
                      <p className="text-xs text-warm-taupe">
                        Examples: confidence, fun, performance, worship,
                        songwriting, auditions, artist development, etc.
                      </p>
                      <Textarea
                        name="whyLessons"
                        value={questionnaireData.whyLessons}
                        onChange={handleQuestionnaireChange}
                        required
                        rows={3}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        How long have you been singing?
                      </Label>
                      <p className="text-xs text-warm-taupe">
                        At home, church, school, choir, performances, etc.
                      </p>
                      <Textarea
                        name="singingExperience"
                        value={questionnaireData.singingExperience}
                        onChange={handleQuestionnaireChange}
                        rows={2}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        Who are some singers, artists, or musicians you enjoy
                        listening to?
                      </Label>
                      <Textarea
                        name="favoriteArtists"
                        value={questionnaireData.favoriteArtists}
                        onChange={handleQuestionnaireChange}
                        rows={2}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-espresso">
                        Have you taken voice lessons or music lessons before?
                      </Label>
                      <RadioGroup
                        value={questionnaireData.previousLessons}
                        onValueChange={(v) =>
                          handleQuestionnaireSelectChange("previousLessons", v)
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="yes" id="prev-yes" />
                          <Label htmlFor="prev-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="no" id="prev-no" />
                          <Label htmlFor="prev-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                      {questionnaireData.previousLessons === "yes" && (
                        <Input
                          name="previousLessonsDetails"
                          value={questionnaireData.previousLessonsDetails}
                          onChange={handleQuestionnaireChange}
                          placeholder="When and with whom?"
                          className="border-blush-pink"
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        What are you hoping to gain from voice lessons?
                      </Label>
                      <p className="text-xs text-warm-taupe">
                        Examples: confidence, stronger vocals, stage presence,
                        better pitch, riffing, breathing techniques, etc.
                      </p>
                      <Textarea
                        name="hopingToGain"
                        value={questionnaireData.hopingToGain}
                        onChange={handleQuestionnaireChange}
                        rows={3}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-espresso">
                        What are some areas you would like to improve?
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {improvementAreas.map((area) => (
                          <div key={area} className="flex items-center gap-2">
                            <Checkbox
                              id={`improve-${area}`}
                              checked={questionnaireData.improvementAreas.includes(area)}
                              onCheckedChange={(checked) =>
                                handleQuestionnaireCheckbox(
                                  "improvementAreas",
                                  area,
                                  checked as boolean
                                )
                              }
                              className="border-blush-pink data-[state=checked]:bg-rose-gold data-[state=checked]:border-rose-gold"
                            />
                            <Label
                              htmlFor={`improve-${area}`}
                              className="font-normal text-sm cursor-pointer"
                            >
                              {area}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <Input
                        name="otherImprovement"
                        value={questionnaireData.otherImprovement}
                        onChange={handleQuestionnaireChange}
                        placeholder="Other (please specify)"
                        className="border-blush-pink"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        What are your goals as a singer? *
                      </Label>
                      <p className="text-xs text-warm-taupe">
                        Examples: singing for fun, church, school performances,
                        recording music, auditions, professional career, etc.
                      </p>
                      <Textarea
                        name="goals"
                        value={questionnaireData.goals}
                        onChange={handleQuestionnaireChange}
                        required
                        rows={3}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-espresso">
                        Do you play any instruments?
                      </Label>
                      <RadioGroup
                        value={questionnaireData.playsInstruments}
                        onValueChange={(v) =>
                          handleQuestionnaireSelectChange("playsInstruments", v)
                        }
                        className="flex gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="yes" id="inst-yes" />
                          <Label htmlFor="inst-yes" className="font-normal cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="no" id="inst-no" />
                          <Label htmlFor="inst-no" className="font-normal cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                      {questionnaireData.playsInstruments === "yes" && (
                        <Input
                          name="instrumentDetails"
                          value={questionnaireData.instrumentDetails}
                          onChange={handleQuestionnaireChange}
                          placeholder="Which instrument(s)?"
                          className="border-blush-pink"
                        />
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        What songs or artists would you love to study during
                        lessons?
                      </Label>
                      <Textarea
                        name="songsToStudy"
                        value={questionnaireData.songsToStudy}
                        onChange={handleQuestionnaireChange}
                        rows={2}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-espresso">
                        What styles of music do you enjoy singing?
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {musicStyles.map((style) => (
                          <div key={style} className="flex items-center gap-2">
                            <Checkbox
                              id={`style-${style}`}
                              checked={questionnaireData.musicStyles.includes(style)}
                              onCheckedChange={(checked) =>
                                handleQuestionnaireCheckbox(
                                  "musicStyles",
                                  style,
                                  checked as boolean
                                )
                              }
                              className="border-blush-pink data-[state=checked]:bg-rose-gold data-[state=checked]:border-rose-gold"
                            />
                            <Label
                              htmlFor={`style-${style}`}
                              className="font-normal text-sm cursor-pointer"
                            >
                              {style}
                            </Label>
                          </div>
                        ))}
                      </div>
                      <Input
                        name="otherStyle"
                        value={questionnaireData.otherStyle}
                        onChange={handleQuestionnaireChange}
                        placeholder="Other (please specify)"
                        className="border-blush-pink"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        What do YOU think makes someone a great singer?
                      </Label>
                      <Textarea
                        name="greatSingerMeans"
                        value={questionnaireData.greatSingerMeans}
                        onChange={handleQuestionnaireChange}
                        rows={2}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        What is something you already love about your voice?
                      </Label>
                      <Textarea
                        name="lovesAboutVoice"
                        value={questionnaireData.lovesAboutVoice}
                        onChange={handleQuestionnaireChange}
                        rows={2}
                        className="border-blush-pink resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-espresso">
                        Is there anything you&apos;d like me to know about you,
                        your learning style, or your musical interests?
                      </Label>
                      <Textarea
                        name="anythingElse"
                        value={questionnaireData.anythingElse}
                        onChange={handleQuestionnaireChange}
                        rows={3}
                        className="border-blush-pink resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Parent Questions */}
                <div>
                  <h3 className="font-serif text-lg text-espresso mb-1 pb-2 border-b border-blush-pink/30">
                    Parent Questions
                  </h3>
                  <p className="text-xs text-warm-taupe mb-4">
                    Optional — for younger students
                  </p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-espresso">
                        What are you hoping your child gains from voice
                        lessons?
                      </Label>
                      <Textarea
                        name="parentHopes"
                        value={questionnaireData.parentHopes}
                        onChange={handleQuestionnaireChange}
                        rows={3}
                        className="border-blush-pink resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-espresso">
                        Are there any learning needs, personality traits, or
                        challenges I should be aware of to best support your
                        child?
                      </Label>
                      <Textarea
                        name="learningNeeds"
                        value={questionnaireData.learningNeeds}
                        onChange={handleQuestionnaireChange}
                        rows={3}
                        className="border-blush-pink resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Scheduling */}
                <div>
                  <h3 className="font-serif text-lg text-espresso mb-4 pb-2 border-b border-blush-pink/30">
                    Scheduling Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-espresso">
                        Preferred Consultation Date
                      </Label>
                      <Input
                        name="preferredDate"
                        type="date"
                        value={questionnaireData.preferredDate}
                        onChange={handleQuestionnaireChange}
                        className="border-blush-pink"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-espresso">
                        Preferred Lesson Format
                      </Label>
                      <Select
                        value={questionnaireData.lessonFormat}
                        onValueChange={(v) =>
                          handleQuestionnaireSelectChange("lessonFormat", v)
                        }
                      >
                        <SelectTrigger className="border-blush-pink">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-person">
                            In-Person (Lake Elsinore, CA)
                          </SelectItem>
                          <SelectItem value="virtual">
                            Virtual (Zoom)
                          </SelectItem>
                          <SelectItem value="both">
                            Open to Both
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isQuestionnaireSubmitting}
                  className="bg-rose-gold hover:bg-rose-gold/90 text-white w-full"
                  size="lg"
                >
                  {isQuestionnaireSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      Submit Questionnaire
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
