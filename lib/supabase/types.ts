// Database types for Supabase
// These match the schema defined in the plan

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          image_url: string | null
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location?: string | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string | null
          image_url?: string | null
          created_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active: boolean
        }
        Insert: {
          id?: string
          day_of_week: number
          start_time: string
          end_time: string
          is_active?: boolean
        }
        Update: {
          id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          is_active?: boolean
        }
      }
      bookings: {
        Row: {
          id: string
          date: string
          start_time: string
          end_time: string
          student_name: string
          student_email: string
          student_phone: string | null
          lesson_type: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          date: string
          start_time: string
          end_time: string
          student_name: string
          student_email: string
          student_phone?: string | null
          lesson_type?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          date?: string
          start_time?: string
          end_time?: string
          student_name?: string
          student_email?: string
          student_phone?: string | null
          lesson_type?: string | null
          status?: string
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          message?: string | null
          created_at?: string
        }
      }
      consultations: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          preferred_date: string | null
          student_type: string | null
          experience_level: string | null
          goals: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          preferred_date?: string | null
          student_type?: string | null
          experience_level?: string | null
          goals?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          preferred_date?: string | null
          student_type?: string | null
          experience_level?: string | null
          goals?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Convenience types
export type Post = Database["public"]["Tables"]["posts"]["Row"]
export type Event = Database["public"]["Tables"]["events"]["Row"]
export type Availability = Database["public"]["Tables"]["availability"]["Row"]
export type Booking = Database["public"]["Tables"]["bookings"]["Row"]
export type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"]
export type Consultation = Database["public"]["Tables"]["consultations"]["Row"]
