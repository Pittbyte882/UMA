// Mock data for the site - will be replaced with Supabase data once connected

export const mockTestimonials = [
  {
    id: "1",
    name: "Sarah Mitchell",
    role: "Adult Student",
    image: "/images/Adults.png",
    quote: "Samantha transformed my relationship with singing. Her patience and expertise helped me overcome years of self-doubt. Now I perform confidently at my church every Sunday.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Parent of Emma, Age 10",
    image: "/images/mc.jpg",
    quote: "My daughter was shy and hesitant about singing lessons. Within weeks, Samantha had her singing joyfully and building real confidence. The transformation has been remarkable.",
    rating: 5,
  },
  {
    id: "3",
    name: "Jessica Thompson",
    role: "Professional Singer",
    image: "/images/steph.jpg",
    quote: "As a working vocalist, I needed advanced technique refinement. Samantha's expertise in breath control and vocal health has elevated my performances to a new level.",
    rating: 5,
  },
  {
    id: "4",
    name: "David Rodriguez",
    role: "Adult Beginner",
    image: "/images/Rod.png",
    quote: "I always thought I couldn't sing. Samantha showed me that everyone has a voice worth developing. Her warm teaching style made lessons something I looked forward to every week.",
    rating: 5,
  },
  {
    id: "5",
    name: "Amanda Foster",
    role: "Parent of twins, Age 8",
    image: "/images/AF.jpg",
    quote: "Both my children take lessons with Samantha. She has an incredible ability to adapt her teaching to each child's personality. They've both grown so much as singers and performers.",
    rating: 5,
  },
]

export const mockEvents = [
  {
    id: "1",
    title: "Spring Recital 2024",
    type: "Recital",
    description:
      "Join us for our annual spring recital featuring performances by students of all ages and levels. A celebration of growth, dedication, and the joy of music.",
    date: "2024-05-15",
    time: "6:00 PM",
    location: "The Grand Concert Hall, Downtown",
    capacity: 150,
    registrations: 89,
    image: "/images/events/recital.jpg",
  },
  {
    id: "2",
    title: "Summer Vocal Workshop",
    type: "Workshop",
    description:
      "An intensive 3-day workshop focusing on breath control, stage presence, and performance techniques. Perfect for intermediate to advanced students.",
    date: "2024-07-20",
    time: "9:00 AM",
    location: "Ultimate Music Academy Studio",
    capacity: 20,
    registrations: 12,
    image: "/images/events/recital.jpg",
  },
  {
    id: "3",
    title: "Masterclass: Musical Theatre",
    type: "Masterclass",
    description:
      "Special guest instructor from Broadway joins Samantha for an exclusive masterclass on musical theatre performance techniques.",
    date: "2024-08-10",
    time: "2:00 PM",
    location: "Community Arts Center",
    capacity: 30,
    registrations: 18,
    image: "/images/events/recital.jpg",
  },
  {
    id: "4",
    title: "Open House & Info Session",
    type: "Open House",
    description:
      "Tour our studio, meet Samantha, and learn about our programs. Perfect for prospective students and parents.",
    date: "2024-06-01",
    time: "11:00 AM",
    location: "Ultimate Music Academy Studio",
    capacity: 25,
    registrations: 8,
    image: "/images/events/recital.jpg",
  },
]

export const mockBlogPosts = [
  {
    id: "1",
    title: "5 Vocal Warm-Up Exercises for Beginners",
    slug: "vocal-warm-up-exercises-beginners",
    excerpt:
      "Start your vocal journey with these essential warm-up exercises that will prepare your voice for singing and help prevent strain.",
    content: "",
    image: "/images/blog/warm-up.jpg",
    category: "Vocal Technique",
    published: true,
    date: "March 1, 2024",
  },
  {
    id: "2",
    title: "How to Help Your Child Develop a Love for Singing",
    slug: "help-child-develop-love-singing",
    excerpt:
      "Discover practical tips for parents on nurturing their child's musical interests and creating a supportive environment for vocal development.",
    content: "",
    image: "/images/blog/child-singing.jpg",
    category: "Practice Tips",
    published: true,
    date: "February 15, 2024",
  },
  {
    id: "3",
    title: "Understanding Your Vocal Range",
    slug: "understanding-vocal-range",
    excerpt:
      "Learn about the different voice types, how to identify your vocal range, and why understanding it is crucial for your singing development.",
    content: "",
    image: "/images/blog/vocal-range.jpg",
    category: "Music Theory",
    published: true,
    date: "February 1, 2024",
  },
  {
    id: "4",
    title: "Overcoming Stage Fright: Tips for Confident Performances",
    slug: "overcoming-stage-fright",
    excerpt:
      "Stage fright affects singers at all levels. Learn practical strategies to manage performance anxiety and deliver your best performances.",
    content: "",
    image: "/images/blog/stage-fright.jpg",
    category: "Performance",
    published: false,
    date: "January 20, 2024",
  },
]

export const mockServices = [
  {
    id: "1",
    title: "Private Vocal Lessons",
    description:
      "One-on-one instruction tailored to your unique voice and goals. Perfect for all ages and skill levels.",
    duration: "30, 45, or 60 minutes",
    forWho: ["Children", "Adults"],
    features: [
      "Personalized curriculum",
      "Technique development",
      "Song interpretation",
      "Performance preparation",
    ],
    image: "/images/services/privatelessons.png",
  },
  {
    id: "2",
    title: "Youth Vocal Program",
    description:
      "Age-appropriate lessons designed to develop young voices while building confidence and a lifelong love of music.",
    duration: "30 minutes",
    forWho: ["Children Ages 5-12"],
    features: [
      "Fun, engaging lessons",
      "Proper vocal technique",
      "Music theory basics",
      "Performance opportunities",
    ],
    image: "/images/services/youth-program.jpg",
  },
  {
    id: "3",
    title: "Teen Vocal Training",
    description:
      "Specialized training for teenagers navigating voice changes while preparing for auditions, competitions, or personal growth.",
    duration: "45 minutes",
    forWho: ["Teens Ages 13-18"],
    features: [
      "Voice change guidance",
      "Audition preparation",
      "Genre exploration",
      "Stage confidence building",
    ],
    image: "/images/services/teen-training.jpg",
  },
  {
    id: "4",
    title: "Adult Voice Development",
    description:
      "Whether you're a complete beginner or returning to singing, develop your voice in a supportive, judgment-free environment.",
    duration: "60 minutes",
    forWho: ["Adults All Levels"],
    features: [
      "No experience needed",
      "Flexible scheduling",
      "Genre of your choice",
      "Performance optional",
    ],
    image: "/images/services/adult-development.png",
  },
  {
  id: "5",
  title: "UMA Gospel Choir & Vocal Ensemble",
  description:
    "Join our vibrant gospel choir community and experience the power of singing together. Open to all current UMA students, this add-on program combines weekly ensemble rehearsals with harmony training, stage presence coaching, and quarterly showcase performances. Sing Together. Shine Together.",
  duration: "90 minutes",
  forWho: ["All Students", "Add-On"],
  features: [
    "Weekly ensemble rehearsals",
    "Vocal harmony training",
    "Stage presence coaching",
    "Quarterly showcase performances",
  ],
  image: "/images/gospel.png",
},
]

export const mockAvailability = [
  { id: "1", day_of_week: 1, start_time: "09:00", end_time: "18:00", is_active: true }, // Monday
  { id: "2", day_of_week: 2, start_time: "09:00", end_time: "18:00", is_active: true }, // Tuesday
  { id: "3", day_of_week: 3, start_time: "09:00", end_time: "18:00", is_active: true }, // Wednesday
  { id: "4", day_of_week: 4, start_time: "09:00", end_time: "18:00", is_active: true }, // Thursday
  { id: "5", day_of_week: 5, start_time: "09:00", end_time: "15:00", is_active: true }, // Friday
  { id: "6", day_of_week: 6, start_time: "10:00", end_time: "14:00", is_active: true }, // Saturday
]

export const mockBookings = [
  {
    id: "1",
    date: "2024-05-20",
    time: "10:00 AM",
    studentName: "Sarah Mitchell",
    email: "sarah@example.com",
    phone: "(555) 123-4567",
    service: "Private Lesson",
    status: "confirmed",
  },
  {
    id: "2",
    date: "2024-05-20",
    time: "2:00 PM",
    studentName: "Emma Chen",
    email: "emma.chen@example.com",
    phone: "(555) 234-5678",
    service: "Youth Program",
    status: "confirmed",
  },
  {
    id: "3",
    date: "2024-05-21",
    time: "11:00 AM",
    studentName: "David Rodriguez",
    email: "david.r@example.com",
    phone: "(555) 345-6789",
    service: "Adult Beginner",
    status: "pending",
  },
  {
    id: "4",
    date: "2024-05-22",
    time: "3:00 PM",
    studentName: "Jessica Thompson",
    email: "jessica.t@example.com",
    phone: "(555) 456-7890",
    service: "Professional Coaching",
    status: "confirmed",
  },
  {
    id: "5",
    date: "2024-05-23",
    time: "9:00 AM",
    studentName: "Michael Foster",
    email: "michael.f@example.com",
    phone: "",
    service: "Teen Training",
    status: "confirmed",
  },
]
