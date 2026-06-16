import { useState, useEffect } from "react";
import {
  Heart, Phone, Menu, X, Star, MapPin, Mail, Clock, ChevronRight,
  Shield, Zap, Users, Award, Microscope, Baby, Smile, Activity,
  AlertCircle, Stethoscope, Calendar, CheckCircle, Facebook,
  Twitter, Instagram, Linkedin, ArrowRight, ChevronDown, ArrowLeft,
  GraduationCap, Clock3, MessageSquare, ThumbsUp
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE = "+919876543210";
const PHONE_DISPLAY = "+91 98765 43210";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Doctors", id: "doctors" },
  { label: "About Us", id: "about" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "general",
    icon: Stethoscope,
    label: "General Consultation",
    tagline: "Whole-person primary care for every life stage",
    desc: "Comprehensive primary care for all ages and conditions.",
    color: "#1A6FBA",
    overview: "Our general consultation service provides thorough, unhurried assessments by experienced internists. From managing chronic conditions to annual wellness exams, we are your first point of contact for all health concerns.",
    benefits: ["Personalised health plans", "Chronic disease management", "Preventive screenings", "Medication reviews", "Referrals to specialists"],
    process: ["Step 1 — Book a slot online or by phone", "Step 2 — Complete a brief pre-visit health questionnaire", "Step 3 — Consult with your assigned physician (30–45 min)", "Step 4 — Receive a digital care summary and next steps", "Step 5 — Follow-up scheduled if required"],
    faqs: [
      { q: "How long is a typical consultation?", a: "30–45 minutes for a new patient; 15–20 minutes for follow-ups." },
      { q: "Do I need to bring previous records?", a: "Helpful but not required. Our team can request records from prior providers." },
      { q: "Is telemedicine available?", a: "Yes, video consultations are available for non-emergency concerns." },
    ],
    relatedDoctors: ["Dr. Sarah Mitchell", "Dr. James Okafor"],
  },
  {
    id: "dental",
    icon: Smile,
    label: "Dental Care",
    tagline: "Full-spectrum dentistry from prevention to restoration",
    desc: "Full-spectrum dental services from cleanings to implants.",
    color: "#0FA37F",
    overview: "Our dental clinic offers everything from routine hygiene appointments to complex restorative work. Using digital X-rays, intra-oral cameras, and CAD/CAM technology, we deliver precise, comfortable treatment.",
    benefits: ["Pain-free modern techniques", "Cosmetic and restorative options", "Orthodontic consultations", "Emergency dental care", "Child-friendly environment"],
    process: ["Step 1 — Schedule an initial exam and X-rays", "Step 2 — Receive a personalised treatment plan", "Step 3 — Complete recommended treatments at your pace", "Step 4 — Regular hygiene check-ups every 6 months", "Step 5 — Cosmetic refinements if desired"],
    faqs: [
      { q: "How often should I visit the dentist?", a: "Every 6 months for most patients; quarterly for those with active gum disease." },
      { q: "Do you handle dental emergencies?", a: "Yes, same-day emergency slots are reserved daily." },
      { q: "Is teeth whitening safe?", a: "Our professionally supervised whitening is safe and delivers lasting results." },
    ],
    relatedDoctors: ["Dr. Priya Nair"],
  },
  {
    id: "pediatrics",
    icon: Baby,
    label: "Pediatrics",
    tagline: "Expert, gentle care for children from birth to 18",
    desc: "Dedicated care for infants, children, and adolescents.",
    color: "#7C5CBF",
    overview: "Our paediatric team provides developmentally sensitive care from newborn check-ups to adolescent health. We create a calm, child-friendly environment so visits are reassuring rather than stressful.",
    benefits: ["Newborn and infant assessments", "Vaccination schedules", "Growth and developmental tracking", "Nutrition guidance", "Adolescent mental health support"],
    process: ["Step 1 — Register your child and share health history", "Step 2 — Well-child visit with developmental screening", "Step 3 — Vaccinations per national schedule", "Step 4 — Nutritional and behavioural counselling", "Step 5 — School and sports clearance letters if needed"],
    faqs: [
      { q: "At what age should the first visit be?", a: "Within the first 2–3 days after discharge from hospital, then at 1, 2, 4, 6, 9, and 12 months." },
      { q: "Do you see teenagers?", a: "Yes, up to age 18, including confidential adolescent consultations." },
      { q: "What vaccinations do you offer?", a: "All government-scheduled vaccines plus optional travel and flu vaccines." },
    ],
    relatedDoctors: ["Dr. Priya Nair"],
  },
  {
    id: "dermatology",
    icon: Activity,
    label: "Dermatology",
    tagline: "Science-backed skin, hair, and nail care",
    desc: "Skin health, cosmetic treatments, and allergy testing.",
    color: "#E05A2B",
    overview: "Our dermatology department treats the full range of medical and cosmetic skin conditions. From acne and eczema to mole mapping and laser procedures, we combine clinical rigour with aesthetic sensitivity.",
    benefits: ["Medical and cosmetic dermatology", "Patch testing for allergies", "Mole mapping and skin cancer screening", "Laser and light therapies", "Prescription-grade skincare plans"],
    process: ["Step 1 — Book a skin assessment appointment", "Step 2 — Dermatoscopy and visual examination", "Step 3 — Biopsy or patch testing if indicated", "Step 4 — Personalised treatment protocol", "Step 5 — Follow-up to review progress"],
    faqs: [
      { q: "How do I know if a mole needs checking?", a: "Use the ABCDE rule (Asymmetry, Border, Colour, Diameter, Evolution). When in doubt, book an assessment." },
      { q: "Are cosmetic procedures covered by insurance?", a: "Medical conditions may be covered; cosmetic procedures are typically self-pay." },
      { q: "How many laser sessions will I need?", a: "This depends on the condition. Most hair removal courses require 6–8 sessions." },
    ],
    relatedDoctors: ["Dr. Marcus Chen"],
  },
  {
    id: "diagnostics",
    icon: Microscope,
    label: "Diagnostics",
    tagline: "Rapid, accurate results from an accredited lab",
    desc: "Advanced lab tests, imaging, and pathology services.",
    color: "#1A6FBA",
    overview: "Our in-house diagnostic centre offers blood panels, urinalysis, ECG, ultrasound, and digital X-ray. Results are uploaded to your patient portal within hours, enabling same-day clinical decisions.",
    benefits: ["Same-day routine blood results", "Digital X-ray and ultrasound", "ECG and spirometry", "Home sample collection available", "Direct integration with your care team"],
    process: ["Step 1 — Receive a test requisition from your doctor", "Step 2 — Walk in or book a diagnostic slot", "Step 3 — Sample collection by certified phlebotomists", "Step 4 — Results uploaded to patient portal", "Step 5 — Physician review and interpretation call"],
    faqs: [
      { q: "Do I need to fast before blood tests?", a: "Fasting (8–12 hours) is required for lipid panels and fasting glucose. Other tests do not require fasting." },
      { q: "How quickly are results available?", a: "Routine panels: 4–6 hours. Specialised tests may take 24–72 hours." },
      { q: "Can I walk in without an appointment?", a: "Yes, walk-ins are welcome Monday–Saturday, 7 AM–2 PM." },
    ],
    relatedDoctors: ["Dr. James Okafor", "Dr. Sarah Mitchell"],
  },
  {
    id: "emergency",
    icon: AlertCircle,
    label: "Emergency Care",
    tagline: "24/7 rapid response for urgent medical needs",
    desc: "24/7 urgent medical attention with rapid response teams.",
    color: "#D4183D",
    overview: "Our emergency unit operates around the clock with triage nurses, emergency physicians, and resuscitation equipment. Minor to moderate emergencies are assessed and treated without the long waits of a hospital ER.",
    benefits: ["Open 24 hours, 365 days a year", "Trained emergency physicians on site", "Paediatric emergency capability", "Direct hospital admission pathway", "Fully equipped resuscitation bay"],
    process: ["Step 1 — Walk in or call ahead; triage begins immediately", "Step 2 — Vital signs and rapid assessment", "Step 3 — Diagnostics and treatment initiated", "Step 4 — Observation period if required", "Step 5 — Discharge with clear follow-up plan or hospital transfer"],
    faqs: [
      { q: "What counts as a medical emergency?", a: "Chest pain, difficulty breathing, severe bleeding, loss of consciousness, suspected fractures, or any condition that feels life-threatening." },
      { q: "Should I call 999/112 instead?", a: "For life-threatening emergencies always call emergency services. Our unit handles urgent but non-life-threatening cases faster than a hospital ER." },
      { q: "Is emergency care covered by insurance?", a: "Most insurers cover emergency consultations. We will help verify your coverage on arrival." },
    ],
    relatedDoctors: ["Dr. Sarah Mitchell", "Dr. James Okafor"],
  },
];

const DOCTORS = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Internal Medicine",
    years: 18,
    img: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?w=400&h=480&fit=crop&auto=format",
    qualifications: ["MBBS, University of London", "MD Internal Medicine, Johns Hopkins", "Fellow, American College of Physicians"],
    specializations: ["Diabetes & Endocrinology", "Hypertension", "Preventive Medicine", "Women's Health"],
    timings: ["Mon, Wed, Fri — 9 AM to 1 PM", "Tue, Thu — 2 PM to 7 PM", "Saturday — 9 AM to 12 PM"],
    bio: "Dr. Mitchell has spent 18 years delivering evidence-based internal medicine care. She is known for her methodical diagnostic approach and her ability to catch conditions that other clinicians miss. She takes particular interest in preventive medicine and long-term wellness planning.",
    reviews: [
      { name: "Emily R.", text: "Dr. Mitchell caught something three other clinics had missed. I cannot recommend her enough.", rating: 5 },
      { name: "Kavya S.", text: "She listened carefully for a full 40 minutes. Felt genuinely heard for the first time.", rating: 5 },
    ],
  },
  {
    name: "Dr. James Okafor",
    specialty: "Cardiology",
    years: 22,
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=480&fit=crop&auto=format",
    qualifications: ["MBBS, University of Lagos", "MD Cardiology, Harvard Medical School", "Fellow, European Society of Cardiology"],
    specializations: ["Interventional Cardiology", "Heart Failure", "Cardiac Imaging", "Preventive Cardiology"],
    timings: ["Mon, Tue, Thu — 10 AM to 3 PM", "Wednesday — 8 AM to 1 PM", "Fri — 10 AM to 2 PM"],
    bio: "Dr. Okafor brings 22 years of cardiology expertise from leading hospitals across three continents. He is a pioneer in non-invasive cardiac imaging at HealthFirst and is regularly sought for second opinions on complex cardiac cases.",
    reviews: [
      { name: "David K.", text: "Dr. Okafor explained my ECG results in plain language and set a clear plan. Brilliant doctor.", rating: 5 },
      { name: "Rajan M.", text: "After two misdiagnoses elsewhere, Dr. Okafor correctly identified my condition within one visit.", rating: 5 },
    ],
  },
  {
    name: "Dr. Priya Nair",
    specialty: "Paediatrics",
    years: 14,
    img: "https://images.unsplash.com/photo-1673865641073-4479f93a7776?w=400&h=480&fit=crop&auto=format",
    qualifications: ["MBBS, AIIMS New Delhi", "MD Paediatrics, Great Ormond Street Hospital", "Diploma in Child Mental Health"],
    specializations: ["Newborn Care", "Childhood Vaccinations", "Developmental Paediatrics", "Adolescent Health"],
    timings: ["Mon–Fri — 9 AM to 1 PM", "Tuesday & Thursday — 4 PM to 7 PM", "Saturday — 10 AM to 1 PM"],
    bio: "Dr. Nair is celebrated for her ability to connect with young patients and put anxious parents at ease. Her background in child mental health adds a dimension few paediatricians offer, allowing her to address both physical and emotional development.",
    reviews: [
      { name: "Amara T.", text: "Our whole family comes here. Dr. Nair is phenomenal — patient, thorough, and great with nervous kids.", rating: 5 },
      { name: "Neha P.", text: "She remembered every detail from our last visit. My daughter actually looks forward to seeing her.", rating: 5 },
    ],
  },
  {
    name: "Dr. Marcus Chen",
    specialty: "Dermatology",
    years: 11,
    img: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=480&fit=crop&auto=format",
    qualifications: ["MBBS, NUS Singapore", "MD Dermatology, Stanford University", "Fellowship in Dermatopathology"],
    specializations: ["Medical Dermatology", "Skin Cancer Screening", "Laser Therapies", "Cosmetic Dermatology"],
    timings: ["Mon, Wed, Fri — 11 AM to 5 PM", "Tuesday — 9 AM to 1 PM", "Thursday — 2 PM to 7 PM"],
    bio: "Dr. Chen combines deep dermatopathology knowledge with a keen aesthetic eye. He is one of few dermatologists in the region offering both medical and cosmetic services with the same clinical rigour, and is a key opinion leader in skin cancer prevention.",
    reviews: [
      { name: "Lena W.", text: "Dr. Chen identified a suspicious lesion that turned out to need early treatment. He may have saved my life.", rating: 5 },
      { name: "Arjun K.", text: "Incredible results with the laser treatment. Professional, painless, and worth every rupee.", rating: 5 },
    ],
  },
];

const TESTIMONIALS = [
  { name: "Emily R.", text: "The team at HealthFirst genuinely listens. Dr. Mitchell caught something three other clinics had missed. I cannot recommend them enough.", rating: 5, role: "Patient since 2021", avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&auto=format" },
  { name: "David K.", text: "Same-day appointment, no wait, and the lab results were back in hours. This is what healthcare should feel like.", rating: 5, role: "Patient since 2022", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format" },
  { name: "Amara T.", text: "Our whole family comes here. The pediatrics team with Dr. Nair is phenomenal — patient, thorough, and great with nervous kids.", rating: 5, role: "Patient since 2020", avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=80&h=80&fit=crop&auto=format" },
  { name: "Rajan M.", text: "After two misdiagnoses elsewhere Dr. Okafor correctly identified my condition within one visit. Exceptional cardiology care.", rating: 5, role: "Patient since 2023", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
  { name: "Lena W.", text: "Dr. Chen identified a suspicious lesion at my first visit. I am so grateful for HealthFirst's thoroughness.", rating: 5, role: "Patient since 2022", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format" },
  { name: "Neha P.", text: "The booking system is effortless and the staff are warm and professional. Best clinic experience we have ever had.", rating: 5, role: "Patient since 2021", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" },
];

const CREDENTIALS = [
  { label: "Joint Commission Accredited", type: "cert" },
  { label: "Best Clinic Award 2024", type: "award" },
  { label: "City General Hospital Partner", type: "partner" },
  { label: "Blue Cross Blue Shield", type: "insurance" },
  { label: "ISO 9001 Certified", type: "cert" },
  { label: "Aetna Network Provider", type: "insurance" },
];

const WHY_US = [
  { icon: Award, title: "Experienced Specialists", desc: "Board-certified physicians with decades of combined practice." },
  { icon: Zap, title: "Modern Equipment", desc: "State-of-the-art diagnostic tools and treatment technology." },
  { icon: Calendar, title: "Same-Day Appointments", desc: "Flexible scheduling that fits your life, often same day." },
  { icon: Heart, title: "Affordable Care", desc: "Transparent pricing and flexible payment plans available." },
  { icon: Users, title: "Personalized Treatment", desc: "Care plans built around your unique health profile." },
  { icon: Clock, title: "24/7 Support", desc: "Round-the-clock nurse line and emergency coverage." },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ n, size = "sm" }: { n: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className={`${cls} fill-amber-400 text-amber-400`} />
      ))}
    </div>
  );
}

function BookingForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSuccess(); };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {[
        { key: "name", label: "Full Name", type: "text", placeholder: "Jane Smith" },
        { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 00000 00000" },
        { key: "email", label: "Email Address", type: "email", placeholder: "jane@example.com" },
        { key: "date", label: "Preferred Date", type: "date", placeholder: "" },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0D2137", fontFamily: "'Inter', sans-serif" }}>{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={form[key as keyof typeof form]}
            onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
            required
            className="w-full px-4 py-3 rounded-xl text-sm border outline-none transition-all focus:ring-2"
            style={{ borderColor: "rgba(26,111,186,0.2)", background: "#F8FAFD", color: "#0D2137", fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      ))}
      <button type="submit" className="mt-2 w-full py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 hover:shadow-lg flex items-center justify-center gap-2" style={{ background: "#1A6FBA" }}>
        Confirm Appointment <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}

// ─── Service Detail Page ──────────────────────────────────────────────────────

function ServiceDetail({ service, onBack, onBook, onDoctorClick }: {
  service: typeof SERVICES[0];
  onBack: () => void;
  onBook: () => void;
  onDoctorClick: (name: string) => void;
}) {
  const Icon = service.icon;
  const relDoctors = DOCTORS.filter(d => service.relatedDoctors.includes(d.name));
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero */}
      <div className="pt-24 pb-16" style={{ background: `linear-gradient(135deg, ${service.color}12 0%, #F0FAFF 100%)` }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium mb-8 hover:gap-3 transition-all" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="flex items-start gap-5 mb-6">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${service.color}18` }}>
              <Icon className="w-8 h-8" style={{ color: service.color }} />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: service.color, fontFamily: "'Inter', sans-serif" }}>{service.label}</p>
              <h1 className="font-extrabold leading-tight" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>{service.tagline}</h1>
            </div>
          </div>
          <p className="text-base leading-relaxed max-w-2xl mb-8" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{service.overview}</p>
          <div className="flex flex-wrap gap-4">
            <button onClick={onBook} className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: "#1A6FBA" }}>
              <Calendar className="w-4 h-4" /> Book Appointment
            </button>
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA] transition-all" style={{ borderColor: "#1A6FBA" }}>
              <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-12">
            {/* Benefits */}
            <div>
              <h2 className="font-bold text-xl mb-5" style={{ color: "#0D2137" }}>Key Benefits</h2>
              <ul className="flex flex-col gap-3">
                {service.benefits.map(b => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#0FA37F" }} />
                    <span className="text-sm" style={{ color: "#3D5A72", fontFamily: "'Inter', sans-serif" }}>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment Process */}
            <div>
              <h2 className="font-bold text-xl mb-5" style={{ color: "#0D2137" }}>Treatment Process</h2>
              <ol className="flex flex-col gap-4">
                {service.process.map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ background: "#EBF4FF", color: "#1A6FBA" }}>{i + 1}</div>
                    <span className="text-sm mt-1.5" style={{ color: "#3D5A72", fontFamily: "'Inter', sans-serif" }}>{step.replace(/^Step \d+ — /, "")}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="font-bold text-xl mb-5" style={{ color: "#0D2137" }}>Frequently Asked Questions</h2>
              <div className="flex flex-col gap-3">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(26,111,186,0.12)" }}>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-sm"
                      style={{ color: "#0D2137" }}
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`} style={{ color: "#1A6FBA" }} />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 text-sm" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{faq.a}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Related doctors */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(26,111,186,0.12)", background: "#FAFCFF" }}>
              <h3 className="font-bold text-sm mb-4" style={{ color: "#0D2137" }}>Specialists for this service</h3>
              <div className="flex flex-col gap-4">
                {relDoctors.map(doc => (
                  <div key={doc.name} className="flex items-center gap-3">
                    <img src={doc.img} alt={doc.name} className="w-12 h-12 rounded-xl object-cover object-top bg-blue-50" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs truncate" style={{ color: "#0D2137" }}>{doc.name}</div>
                      <div className="text-xs" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{doc.specialty}</div>
                    </div>
                    <button onClick={() => onDoctorClick(doc.name)} className="text-xs font-semibold whitespace-nowrap" style={{ color: "#1A6FBA" }}>View →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick book CTA */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1A6FBA, #0D4A8A)" }}>
              <h3 className="font-bold mb-2">Ready to get started?</h3>
              <p className="text-sm mb-4 text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>Same-day slots available for {service.label}.</p>
              <button onClick={onBook} className="w-full py-3 rounded-xl font-semibold bg-white text-sm transition-all hover:bg-blue-50" style={{ color: "#1A6FBA" }}>
                Book Appointment
              </button>
              <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 mt-3 text-sm text-white/80 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Phone className="w-3.5 h-3.5" /> Or call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Doctor Profile Page ──────────────────────────────────────────────────────

function DoctorProfile({ doctor, onBack, onBook }: {
  doctor: typeof DOCTORS[0];
  onBack: () => void;
  onBook: () => void;
}) {
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero */}
      <div className="pt-24 pb-0" style={{ background: "linear-gradient(135deg, #EBF4FF 0%, #F0FFF8 100%)" }}>
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <button onClick={onBack} className="flex items-center gap-2 text-sm font-medium mb-8 hover:gap-3 transition-all" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <div className="grid md:grid-cols-3 gap-8 pb-12 items-start">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl bg-blue-100" style={{ aspectRatio: "3/4" }}>
                <img src={doctor.img} alt={doctor.name} className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 border" style={{ background: "#EBF4FF", color: "#1A6FBA", borderColor: "rgba(26,111,186,0.2)", fontFamily: "'Inter', sans-serif" }}>
                {doctor.specialty}
              </div>
              <h1 className="font-extrabold mb-2" style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>{doctor.name}</h1>
              <div className="flex items-center gap-3 mb-5">
                <StarRating n={5} size="md" />
                <span className="text-sm font-medium" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{doctor.years} Years Experience</span>
              </div>
              <p className="text-base leading-relaxed mb-6" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{doctor.bio}</p>

              <div className="flex flex-wrap gap-4">
                <button onClick={onBook} className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg hover:opacity-90 transition-all" style={{ background: "#1A6FBA" }}>
                  <Calendar className="w-4 h-4" /> Book Consultation
                </button>
                <a href={`tel:${PHONE}`} className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border-2 text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA] transition-all" style={{ borderColor: "#1A6FBA" }}>
                  <Phone className="w-4 h-4" /> Call Clinic
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-12">
            {/* Qualifications */}
            <div>
              <h2 className="font-bold text-xl mb-5 flex items-center gap-2" style={{ color: "#0D2137" }}>
                <GraduationCap className="w-5 h-5" style={{ color: "#1A6FBA" }} /> Qualifications
              </h2>
              <ul className="flex flex-col gap-3">
                {doctor.qualifications.map(q => (
                  <li key={q} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: "#1A6FBA" }} />
                    <span className="text-sm" style={{ color: "#3D5A72", fontFamily: "'Inter', sans-serif" }}>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specializations */}
            <div>
              <h2 className="font-bold text-xl mb-5 flex items-center gap-2" style={{ color: "#0D2137" }}>
                <ThumbsUp className="w-5 h-5" style={{ color: "#0FA37F" }} /> Areas of Specialization
              </h2>
              <div className="flex flex-wrap gap-2">
                {doctor.specializations.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "#EBF4FF", color: "#1A6FBA" }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Patient Reviews */}
            <div>
              <h2 className="font-bold text-xl mb-5 flex items-center gap-2" style={{ color: "#0D2137" }}>
                <MessageSquare className="w-5 h-5" style={{ color: "#7C5CBF" }} /> Patient Reviews
              </h2>
              <div className="flex flex-col gap-4">
                {doctor.reviews.map(rev => (
                  <div key={rev.name} className="p-5 rounded-2xl border" style={{ borderColor: "rgba(26,111,186,0.1)", background: "#FAFCFF" }}>
                    <StarRating n={rev.rating} />
                    <p className="mt-3 text-sm leading-relaxed" style={{ color: "#3D5A72", fontFamily: "'Inter', sans-serif" }}>"{rev.text}"</p>
                    <p className="mt-2 text-xs font-semibold" style={{ color: "#0D2137" }}>— {rev.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Availability */}
            <div className="rounded-2xl border p-6" style={{ borderColor: "rgba(26,111,186,0.12)", background: "#FAFCFF" }}>
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: "#0D2137" }}>
                <Clock3 className="w-4 h-4" style={{ color: "#1A6FBA" }} /> Available Timings
              </h3>
              <ul className="flex flex-col gap-3">
                {doctor.timings.map(t => (
                  <li key={t} className="text-xs leading-relaxed" style={{ color: "#3D5A72", fontFamily: "'Inter', sans-serif" }}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Book CTA */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #1A6FBA, #0D4A8A)" }}>
              <h3 className="font-bold mb-2">Book with {doctor.name.split(" ")[1]}</h3>
              <p className="text-sm mb-4 text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>Slots are filling fast. Reserve yours today.</p>
              <button onClick={onBook} className="w-full py-3 rounded-xl font-semibold bg-white text-sm transition-all hover:bg-blue-50" style={{ color: "#1A6FBA" }}>
                Book Consultation
              </button>
              <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 mt-3 text-sm text-white/80 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                <Phone className="w-3.5 h-3.5" /> Or call {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Booking Modal ────────────────────────────────────────────────────────────

function BookingModal({ onClose }: { onClose: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(13,33,55,0.6)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10">
          <X className="w-4 h-4" style={{ color: "#5A7A9A" }} />
        </button>

        <div className="p-2 pb-0" style={{ background: "linear-gradient(135deg, #1A6FBA, #0D4A8A)" }}>
          <div className="p-6">
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#7EC8FF", fontFamily: "'Inter', sans-serif" }}>Easy Scheduling</p>
            <h2 className="font-extrabold text-white text-xl">Book Your Appointment</h2>
            <p className="text-sm mt-1" style={{ color: "#B8D9F5", fontFamily: "'Inter', sans-serif" }}>We will confirm within 30 minutes.</p>
          </div>
        </div>

        <div className="p-6">
          {done ? (
            <div className="flex flex-col items-center text-center gap-4 py-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#F0FFF8" }}>
                <CheckCircle className="w-8 h-8" style={{ color: "#0FA37F" }} />
              </div>
              <h3 className="font-bold text-lg" style={{ color: "#0D2137" }}>Appointment Requested!</h3>
              <p className="text-sm" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>We will call you to confirm your slot shortly.</p>
              <button onClick={onClose} className="mt-2 px-6 py-2.5 rounded-xl font-semibold text-white text-sm" style={{ background: "#1A6FBA" }}>Done</button>
            </div>
          ) : (
            <BookingForm onSuccess={() => setDone(true)} />
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Shared Nav ───────────────────────────────────────────────────────────────

function Navbar({ scrolled, onHomeClick, onNavClick, onBookClick }: {
  scrolled: boolean;
  onHomeClick: () => void;
  onNavClick: (id: string) => void;
  onBookClick: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <button onClick={() => { onHomeClick(); setMenuOpen(false); }} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#1A6FBA" }}>
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-bold" style={{ color: "#0D2137", letterSpacing: "-0.02em" }}>
              Health<span style={{ color: "#1A6FBA" }}>First</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, id }) => (
              <button key={label} onClick={() => onNavClick(id)} className="text-sm font-medium transition-colors hover:text-primary" style={{ color: "#0D2137", fontFamily: "'Inter', sans-serif" }}>
                {label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm font-medium" style={{ color: "#0D2137", fontFamily: "'Inter', sans-serif" }}>
              <Phone className="w-4 h-4" style={{ color: "#1A6FBA" }} />
              {PHONE_DISPLAY}
            </a>
            <button onClick={onBookClick} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg" style={{ background: "#1A6FBA" }}>
              Book Appointment
            </button>
          </div>

          <button className="lg:hidden p-2 rounded-lg" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, id }) => (
            <button key={label} onClick={() => { onNavClick(id); setMenuOpen(false); }} className="text-sm font-medium py-1 text-left" style={{ fontFamily: "'Inter', sans-serif" }}>
              {label}
            </button>
          ))}
          <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm font-medium py-1" style={{ color: "#1A6FBA", fontFamily: "'Inter', sans-serif" }}>
            <Phone className="w-4 h-4" /> {PHONE_DISPLAY}
          </a>
          <button onClick={() => { onBookClick(); setMenuOpen(false); }} className="mt-2 px-5 py-3 rounded-lg text-sm font-semibold text-white w-full" style={{ background: "#1A6FBA" }}>
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

type View = { type: "home" } | { type: "service"; id: string } | { type: "doctor"; name: string };

export default function App() {
  const [view, setView] = useState<View>({ type: "home" });
  const [scrolled, setScrolled] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const goHome = () => { setView({ type: "home" }); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const handleNavClick = (id: string) => {
    if (view.type !== "home") { setView({ type: "home" }); setTimeout(() => scrollTo(id), 100); }
    else scrollTo(id);
  };

  const openService = (id: string) => setView({ type: "service", id });
  const openDoctor = (name: string) => setView({ type: "doctor", name });

  const currentService = view.type === "service" ? SERVICES.find(s => s.id === view.id) : null;
  const currentDoctor = view.type === "doctor" ? DOCTORS.find(d => d.name === view.name) : null;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar
        scrolled={scrolled}
        onHomeClick={goHome}
        onNavClick={handleNavClick}
        onBookClick={() => setShowBooking(true)}
      />

      {/* ── SERVICE DETAIL ── */}
      {view.type === "service" && currentService && (
        <ServiceDetail
          service={currentService}
          onBack={goHome}
          onBook={() => setShowBooking(true)}
          onDoctorClick={openDoctor}
        />
      )}

      {/* ── DOCTOR PROFILE ── */}
      {view.type === "doctor" && currentDoctor && (
        <DoctorProfile
          doctor={currentDoctor}
          onBack={goHome}
          onBook={() => setShowBooking(true)}
        />
      )}

      {/* ── HOMEPAGE ── */}
      {view.type === "home" && (
        <>
          {/* HERO */}
          <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(135deg, #EBF4FF 0%, #F0FFF8 100%)" }}>
            <div className="absolute top-20 right-0 w-[640px] h-[640px] rounded-full opacity-20" style={{ background: "radial-gradient(circle, #1A6FBA 0%, transparent 70%)" }} />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ background: "#0FA37F" }} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 w-full">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6 border" style={{ background: "#EBF4FF", color: "#1A6FBA", borderColor: "rgba(26,111,186,0.2)", fontFamily: "'Inter', sans-serif" }}>
                    <CheckCircle className="w-3.5 h-3.5" /> Trusted by 10,000+ Patients
                  </div>
                  <h1 className="font-extrabold leading-tight mb-6" style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)", letterSpacing: "-0.03em", color: "#0D2137" }}>
                    Trusted Healthcare<br /><span style={{ color: "#1A6FBA" }}>for You</span> and Your Family
                  </h1>
                  <p className="text-lg mb-8 leading-relaxed max-w-lg" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>
                    HealthFirst Clinic brings together experienced specialists, modern diagnostics, and compassionate care — all under one roof. Same-day appointments available.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <button onClick={() => setShowBooking(true)} className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:opacity-95" style={{ background: "#1A6FBA" }}>
                      <Calendar className="w-5 h-5" /> Book Appointment
                    </button>
                    <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold border-2 transition-all text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA]" style={{ borderColor: "#1A6FBA" }}>
                      <Phone className="w-5 h-5" /> Call Now — {PHONE_DISPLAY}
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-6 mb-6">
                    {[{ val: "10,000+", label: "Patients Served" }, { val: "15+", label: "Experienced Doctors" }, { val: "4.9", label: "Star Rating" }].map(({ val, label }) => (
                      <div key={label}>
                        <div className="text-2xl font-bold" style={{ color: "#1A6FBA" }}>{val}</div>
                        <div className="text-xs font-medium mt-0.5" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => scrollTo("services")} className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline" style={{ color: "#1A6FBA" }}>
                      View Services <ChevronRight className="w-4 h-4" />
                    </button>
                    <span style={{ color: "#CBD5E1" }}>|</span>
                    <button onClick={() => scrollTo("doctors")} className="flex items-center gap-1.5 text-sm font-semibold transition-colors hover:underline" style={{ color: "#1A6FBA" }}>
                      Meet Our Doctors <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="order-1 lg:order-2 relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-blue-100" style={{ aspectRatio: "4/5", maxHeight: "580px" }}>
                    <img src="https://images.unsplash.com/photo-1758691461935-202e2ef6b69f?w=800&h=1000&fit=crop&auto=format" alt="Doctor consulting with a patient in a modern clinic" className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,33,55,0.3) 0%, transparent 60%)" }} />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#EBF4FF" }}>
                      <Shield className="w-5 h-5" style={{ color: "#1A6FBA" }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#0D2137" }}>Joint Commission</div>
                      <div className="text-xs" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>Accredited Clinic</div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-border">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#F0FFF8" }}>
                      <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold" style={{ color: "#0D2137" }}>4.9 / 5.0</div>
                      <div className="text-xs" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>Patient Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section id="services" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#0FA37F", fontFamily: "'Inter', sans-serif" }}>What We Offer</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>Comprehensive Medical Services</h2>
                <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>
                  From routine check-ups to specialised care, we cover every aspect of your family's health needs.
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map(({ id, icon: Icon, label, desc, color }) => (
                  <div key={id} className="group p-7 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-1" style={{ borderColor: "rgba(26,111,186,0.1)", background: "#FAFCFF" }}>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all group-hover:scale-110" style={{ background: `${color}15` }}>
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <h3 className="font-bold text-base mb-2" style={{ color: "#0D2137" }}>{label}</h3>
                    <p className="text-sm leading-relaxed mb-5" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                    <div className="flex items-center gap-3">
                      <button onClick={() => openService(id)} className="flex items-center gap-1 text-xs font-semibold transition-all hover:gap-2" style={{ color }}>
                        Learn More <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <span style={{ color: "#CBD5E1" }}>|</span>
                      <button onClick={() => openService(id)} className="text-xs font-semibold transition-colors" style={{ color: "#5A7A9A" }}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button onClick={() => scrollTo("services")} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 transition-all text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA]" style={{ borderColor: "#1A6FBA" }}>
                  Explore All Services <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section className="py-24" style={{ background: "linear-gradient(135deg, #0D2137 0%, #1A3A5C 100%)" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#0FA37F", fontFamily: "'Inter', sans-serif" }}>Our Difference</p>
                <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em" }}>Why Thousands Choose HealthFirst</h2>
                <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "#8BABC8", fontFamily: "'Inter', sans-serif" }}>We set a higher standard — combining clinical excellence with genuine human care.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {WHY_US.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="p-6 rounded-2xl border transition-all hover:border-blue-400/40" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(26,111,186,0.3)" }}>
                      <Icon className="w-5 h-5" style={{ color: "#60AEFF" }} />
                    </div>
                    <h3 className="font-bold text-white mb-2">{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#8BABC8", fontFamily: "'Inter', sans-serif" }}>{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DOCTORS */}
          <section id="doctors" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#0FA37F", fontFamily: "'Inter', sans-serif" }}>Our Team</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>Meet Our Specialists</h2>
                <p className="mt-4 text-base max-w-2xl mx-auto" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>Board-certified, compassionate, and committed to your long-term wellbeing.</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {DOCTORS.map(({ name, specialty, years, img }) => (
                  <div key={name} className="group rounded-2xl overflow-hidden border transition-all hover:shadow-xl hover:-translate-y-1" style={{ borderColor: "rgba(26,111,186,0.1)" }}>
                    <div className="relative overflow-hidden bg-blue-50" style={{ aspectRatio: "4/5" }}>
                      <img src={img} alt={`${name}, ${specialty}`} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,33,55,0.6) 0%, transparent 50%)" }} />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-xs font-semibold text-white/80 mb-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>{specialty}</div>
                        <div className="font-bold text-white text-sm">{name}</div>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs font-medium" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>Experience</div>
                          <div className="font-bold text-sm" style={{ color: "#1A6FBA" }}>{years} Years</div>
                        </div>
                        <StarRating n={5} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openDoctor(name)} className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border-2 text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA]" style={{ borderColor: "#1A6FBA" }}>
                          View Profile
                        </button>
                        <button onClick={() => openDoctor(name)} className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all" style={{ background: "#EBF4FF", color: "#1A6FBA" }}>
                          Check Availability
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button onClick={() => scrollTo("doctors")} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-lg" style={{ background: "#1A6FBA" }}>
                  Meet Our Specialists <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section id="testimonials" className="py-24" style={{ background: "#F0F7FF" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#0FA37F", fontFamily: "'Inter', sans-serif" }}>Patient Stories</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>What Our Patients Say</h2>
                <p className="mt-4 text-base max-w-xl mx-auto" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>Real experiences from real patients — unedited and unprompted.</p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {TESTIMONIALS.map(({ name, text, rating, role, avatar }) => (
                  <div key={name} className="bg-white p-7 rounded-2xl border shadow-sm" style={{ borderColor: "rgba(26,111,186,0.1)" }}>
                    <StarRating n={rating} />
                    <p className="mt-4 mb-6 text-sm leading-relaxed" style={{ color: "#3D5A72", fontFamily: "'Inter', sans-serif" }}>"{text}"</p>
                    <div className="flex items-center gap-3">
                      <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover bg-blue-100" />
                      <div>
                        <div className="font-bold text-sm" style={{ color: "#0D2137" }}>{name}</div>
                        <div className="text-xs" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12">
                <button onClick={() => scrollTo("testimonials")} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold border-2 transition-all text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA]" style={{ borderColor: "#1A6FBA" }}>
                  Read More Reviews <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* BOOK CTA */}
          <section id="book" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #1A6FBA 0%, #0D4A8A 100%)" }}>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="p-10 lg:p-14 flex flex-col justify-center">
                    <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#7EC8FF", fontFamily: "'Inter', sans-serif" }}>Easy Scheduling</p>
                    <h2 className="font-extrabold text-white mb-4" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", letterSpacing: "-0.025em" }}>Book Your Appointment Today</h2>
                    <p className="text-base mb-8" style={{ color: "#B8D9F5", fontFamily: "'Inter', sans-serif" }}>Same-day slots available. Our team will confirm your booking within 30 minutes.</p>
                    <div className="flex flex-col gap-3 mb-8">
                      {["No long waiting times", "Flexible morning & evening slots", "Insurance accepted", "Free first consultation"].map(pt => (
                        <div key={pt} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: "#0FA37F" }} />
                          <span className="text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>{pt}</span>
                        </div>
                      ))}
                    </div>
                    <a href={`tel:${PHONE}`} className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors" style={{ fontFamily: "'Inter', sans-serif" }}>
                      <Phone className="w-4 h-4" /> Or call us directly: {PHONE_DISPLAY}
                    </a>
                  </div>
                  <div className="bg-white p-10 lg:p-14">
                    <h3 className="font-bold text-lg mb-5" style={{ color: "#0D2137" }}>Fill in your details</h3>
                    <BookingForm onSuccess={() => {}} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ABOUT / CREDENTIALS */}
          <section id="about" className="py-20" style={{ background: "#F8FAFD" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#0FA37F", fontFamily: "'Inter', sans-serif" }}>Recognized Excellence</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>Certifications & Partners</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {CREDENTIALS.map(({ label, type }) => (
                  <div key={label} className="bg-white rounded-xl p-5 text-center border shadow-sm transition-all hover:shadow-md" style={{ borderColor: "rgba(26,111,186,0.1)" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3" style={{ background: type === "cert" ? "#EBF4FF" : type === "award" ? "#FFF8EB" : type === "partner" ? "#F0FFF8" : "#F5F0FF" }}>
                      {type === "cert" && <Shield className="w-5 h-5" style={{ color: "#1A6FBA" }} />}
                      {type === "award" && <Award className="w-5 h-5" style={{ color: "#D97706" }} />}
                      {type === "partner" && <Heart className="w-5 h-5" style={{ color: "#0FA37F" }} />}
                      {type === "insurance" && <CheckCircle className="w-5 h-5" style={{ color: "#7C5CBF" }} />}
                    </div>
                    <p className="text-xs font-semibold leading-snug" style={{ color: "#0D2137", fontFamily: "'Inter', sans-serif" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "#0FA37F", fontFamily: "'Inter', sans-serif" }}>Find Us</p>
                <h2 className="font-extrabold" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", letterSpacing: "-0.025em", color: "#0D2137" }}>Get in Touch</h2>
              </div>
              <div className="grid lg:grid-cols-2 gap-10">
                <div className="flex flex-col gap-4">
                  {[
                    { icon: MapPin, label: "Address", value: "142 Wellness Avenue, Suite 300\nNew York, NY 10001", color: "#1A6FBA", href: null },
                    { icon: Phone, label: "Phone", value: `${PHONE_DISPLAY}\n+91 76543 21098 (Emergency)`, color: "#0FA37F", href: `tel:${PHONE}` },
                    { icon: Mail, label: "Email", value: "hello@healthfirst.com\nbooking@healthfirst.com", color: "#7C5CBF", href: "mailto:hello@healthfirst.com" },
                    { icon: Clock, label: "Hours", value: "Mon–Fri: 7:00 AM – 8:00 PM\nSat–Sun: 8:00 AM – 5:00 PM", color: "#D97706", href: null },
                  ].map(({ icon: Icon, label, value, color, href }) => (
                    <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border" style={{ borderColor: "rgba(26,111,186,0.1)", background: "#FAFCFF" }}>
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}>
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs font-semibold mb-1" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{label}</div>
                        {value.split("\n").map((line, i) => (
                          href && i === 0
                            ? <a key={i} href={href} className="text-sm font-medium hover:underline block" style={{ color: "#0D2137", fontFamily: "'Inter', sans-serif" }}>{line}</a>
                            : <div key={i} className="text-sm font-medium" style={{ color: "#0D2137", fontFamily: "'Inter', sans-serif" }}>{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setShowBooking(true)} className="flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all hover:opacity-90 shadow-lg" style={{ background: "#1A6FBA" }}>
                    <Calendar className="w-4 h-4" /> Contact Clinic — Book an Appointment
                  </button>
                </div>
                <div className="rounded-2xl overflow-hidden border relative bg-blue-50 min-h-72" style={{ borderColor: "rgba(26,111,186,0.15)" }}>
                  <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&h=500&fit=crop&auto=format" alt="Clinic interior" className="w-full h-full object-cover" style={{ minHeight: "300px" }} />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(13,33,55,0.35)" }}>
                    <div className="text-center text-white">
                      <MapPin className="w-10 h-10 mx-auto mb-3 drop-shadow" />
                      <p className="font-bold text-lg drop-shadow">View on Google Maps</p>
                      <p className="text-sm mt-1 text-white/80" style={{ fontFamily: "'Inter', sans-serif" }}>142 Wellness Avenue, New York</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer style={{ background: "#0D2137" }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-14 pb-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#1A6FBA" }}>
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <span className="text-xl font-bold text-white" style={{ letterSpacing: "-0.02em" }}>Health<span style={{ color: "#60AEFF" }}>First</span></span>
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "#8BABC8", fontFamily: "'Inter', sans-serif" }}>Compassionate, expert-led healthcare for every stage of life. Your health is our mission.</p>
                  <div className="flex gap-3">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-blue-700" style={{ background: "rgba(255,255,255,0.08)" }}>
                        <Icon className="w-4 h-4 text-white" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-4 text-sm">Quick Links</h4>
                  <ul className="flex flex-col gap-2.5">
                    {[{ label: "Home", id: "home" }, { label: "About Us", id: "about" }, { label: "Our Doctors", id: "doctors" }, { label: "Testimonials", id: "testimonials" }, { label: "Contact", id: "contact" }].map(({ label, id }) => (
                      <li key={label}><button onClick={() => scrollTo(id)} className="text-sm transition-colors hover:text-white text-left" style={{ color: "#8BABC8", fontFamily: "'Inter', sans-serif" }}>{label}</button></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-4 text-sm">Services</h4>
                  <ul className="flex flex-col gap-2.5">
                    {SERVICES.map(({ id, label }) => (
                      <li key={id}><button onClick={() => openService(id)} className="text-sm transition-colors hover:text-white text-left" style={{ color: "#8BABC8", fontFamily: "'Inter', sans-serif" }}>{label}</button></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-4 text-sm">Health Newsletter</h4>
                  <p className="text-sm mb-4" style={{ color: "#8BABC8", fontFamily: "'Inter', sans-serif" }}>Get wellness tips and clinic news in your inbox.</p>
                  <div className="flex gap-2">
                    <input type="email" placeholder="your@email.com" className="flex-1 px-3 py-2.5 rounded-lg text-sm border-0 outline-none" style={{ background: "rgba(255,255,255,0.08)", color: "white", fontFamily: "'Inter', sans-serif" }} />
                    <button className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90" style={{ background: "#1A6FBA" }}>Join</button>
                  </div>
                  <a href={`tel:${PHONE}`} className="flex items-center gap-2 mt-5 text-sm font-semibold" style={{ color: "#60AEFF", fontFamily: "'Inter', sans-serif" }}>
                    <Phone className="w-4 h-4" /> Contact Clinic: {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
              <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="text-xs" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>© 2024 HealthFirst Clinic. All rights reserved.</p>
                <div className="flex gap-6">
                  {["Privacy Policy", "Terms of Service", "Accessibility"].map(l => (
                    <a key={l} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#5A7A9A", fontFamily: "'Inter', sans-serif" }}>{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* MOBILE STICKY BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 border-t" style={{ background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderColor: "rgba(26,111,186,0.15)" }}>
        <div className="flex gap-3">
          <a href={`tel:${PHONE}`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm border-2 transition-colors text-[#1A6FBA] hover:bg-[#1A6FBA] hover:text-white hover:border-[#1A6FBA]" style={{ borderColor: "#1A6FBA" }}>
            <Phone className="w-4 h-4" /> Call Now
          </a>
          <button onClick={() => setShowBooking(true)} className="flex-[2] flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg" style={{ background: "#1A6FBA" }}>
            <Calendar className="w-4 h-4" /> Book Appointment
          </button>
        </div>
      </div>
      <div className="h-20 lg:hidden" />

      {/* BOOKING MODAL */}
      {showBooking && <BookingModal onClose={() => setShowBooking(false)} />}
    </div>
  );
}
