import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./home.css";

// Premium SVGs for inline icons
const CheckIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const LocationIcon = () => (
  <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // Counter states
  const [counters, setCounters] = useState({ professionals: 0, courses: 0, certs: 0, events: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters({
        professionals: Math.floor((10000 / steps) * currentStep),
        courses: Math.floor((300 / steps) * currentStep),
        certs: Math.floor((150 / steps) * currentStep),
        events: Math.floor((500 / steps) * currentStep),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters({ professionals: 10000, courses: 300, certs: 150, events: 500 });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      quote: "CHAMP has transformed how we train our healthcare administrators. The real scenario-based certifications prepare our teams for daily clinical complexities in a way that standard courses never could.",
      author: "Dr. Rajesh Kurup",
      role: "Chief Medical Officer",
      org: "City General Hospital",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop"
    },
    {
      quote: "The community discussion boards are an absolute goldmine. I got real-world advice from senior executives on handling patient escalation paths within hours of posting.",
      author: "Priya Sharma",
      role: "Operations Manager",
      org: "MedLife Care Solutions",
      avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=100&h=100&fit=crop"
    },
    {
      quote: "As a student of Healthcare Administration, earning my CHAMP digital credential gave me a validated edge during hospital recruitment. The verification check actually works!",
      author: "Ankit Roy",
      role: "Postgraduate Student",
      org: "Institute of Health Sciences",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop"
    }
  ];

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="home-container bg-surface-50 overflow-x-hidden pt-16">
      {/* SaaS Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-16 px-4 md:px-8 bg-gradient-to-b from-primary-50/40 via-white to-surface-50/50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-primary-200/20 rounded-full blur-[140px]" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent-100/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100/60 border border-primary-200/50 text-primary-700 text-xs font-black uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              The Healthcare Professional Ecosystem
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-surface-900 leading-[1.08] lg:max-w-xl"
            >
              Healthcare Learning. <br />
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">Professional Certification.</span> <br />
              Career Growth.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-surface-600 max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Advance your healthcare career through professional certifications, expert-led courses, industry events, and a thriving community of healthcare professionals.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/join" className="btn-primary w-full sm:w-auto text-center font-bold px-8 py-4 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all hover:scale-[1.02]">
                Join CHAMP
              </Link>
              <Link to="/certification" className="btn-outline-dark w-full sm:w-auto text-center font-bold px-8 py-4 border-2 border-surface-800 text-surface-900 rounded-2xl hover:bg-surface-900 hover:text-white transition-all hover:scale-[1.02]">
                Explore Certifications
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual: Overlapping Glass Mockup Cards */}
          <div className="lg:col-span-6 relative h-[500px] w-full hidden sm:block">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Card 1: Course Page (Left Top) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -25 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute top-8 left-4 w-72 p-5 rounded-[2rem] bg-white border border-surface-200 shadow-xl z-20 hover:scale-[1.03] transition-transform"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 text-lg font-bold">
                    📖
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-surface-900 leading-tight">Patient Safety & Quality</h4>
                    <p className="text-[10px] text-surface-400 font-bold">Course • 12 Modules</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-1.5 w-full bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary-500 rounded-full" />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-surface-400">
                    <span>75% Completed</span>
                    <span>1.5h left</span>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: Community Feed Post (Right Top) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: -40 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-4 right-8 w-80 p-5 rounded-[2rem] bg-white/90 backdrop-blur-md border border-white/50 shadow-2xl z-30 hover:scale-[1.03] transition-transform"
              >
                <div className="flex items-center gap-2 mb-3">
                  <img src="https://images.unsplash.com/photo-1594824813573-246434de83fb?w=50&h=50&fit=crop" className="w-6 h-6 rounded-full object-cover" alt="" />
                  <div>
                    <h5 className="text-[10px] font-black text-surface-900">Dr. Sarah Jacob</h5>
                    <p className="text-[8px] text-accent-600 font-bold uppercase tracking-widest">Operations Committee</p>
                  </div>
                </div>
                <h4 className="text-xs font-black text-surface-900 mb-2">How do we optimize OPD workflow during peak hours?</h4>
                <div className="flex gap-4 text-[9px] font-bold text-surface-400">
                  <span>👍 42 Likes</span>
                  <span>💬 18 Replies</span>
                </div>
              </motion.div>

              {/* Card 3: Dashboard Analytics Mockup (Center Big) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-1/4 left-10 right-10 p-6 rounded-[2.5rem] bg-white border border-surface-200/80 shadow-2xl z-10 bg-gradient-to-tr from-white to-primary-50/10"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-surface-400">CHAMP Workspace</span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-wider">L2 Verified</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-100">
                    <span className="text-[8px] text-surface-400 font-bold block uppercase tracking-widest">Score</span>
                    <span className="text-lg font-black text-surface-900">92%</span>
                  </div>
                  <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-100">
                    <span className="text-[8px] text-surface-400 font-bold block uppercase tracking-widest">Certs</span>
                    <span className="text-lg font-black text-primary-600">3 Active</span>
                  </div>
                  <div className="bg-surface-50 p-3.5 rounded-2xl border border-surface-100">
                    <span className="text-[8px] text-surface-400 font-bold block uppercase tracking-widest">Credits</span>
                    <span className="text-lg font-black text-accent-600">45 CPE</span>
                  </div>
                </div>
                <div className="h-28 bg-surface-50 rounded-2xl border border-surface-100 flex items-center justify-center text-[10px] text-surface-400 font-bold">
                  [Interactive Analytics Feed]
                </div>
              </motion.div>

              {/* Card 4: Certificate Preview (Left Bottom) */}
              <motion.div
                initial={{ opacity: 0, x: -40, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-6 left-2 w-72 p-4 rounded-[2rem] bg-surface-900 text-white shadow-2xl z-30 border border-surface-800 hover:scale-[1.03] transition-transform"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-[8px] text-primary-400 font-black uppercase tracking-widest">CHAMP Credentials</p>
                    <h4 className="text-xs font-black mt-1">Healthcare Administrator</h4>
                  </div>
                  <span className="text-lg">🏅</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[7px] text-surface-400 font-bold">VERIFICATION ID</p>
                    <p className="text-[9px] font-mono text-primary-200">CHMP-9832-AX</p>
                  </div>
                  <span className="text-[8px] px-2 py-0.5 rounded bg-white/10 text-white font-bold">VERIFIED</span>
                </div>
              </motion.div>

              {/* Card 5: Upcoming Event (Right Bottom) */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 25 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-8 right-6 w-72 p-5 rounded-[2rem] bg-white border border-surface-200 shadow-xl z-20 hover:scale-[1.03] transition-transform"
              >
                <span className="text-[8px] font-black text-accent-600 uppercase tracking-widest bg-accent-50 px-2 py-1 rounded-full">Workshop</span>
                <h4 className="text-xs font-black text-surface-900 mt-2">Hospital Revenue Cycle Leadership</h4>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-surface-500">
                  <span className="text-xs">📅</span>
                  <span className="font-bold">July 15, 2026</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-surface-400 mb-3">Built for Modern Healthcare Professionals</h2>
            <div className="h-1 w-12 bg-primary-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { title: "Learning", desc: "Expert-led practical courses", icon: "📚" },
              { title: "Certifications", desc: "Rigorous competency test", icon: "🏅" },
              { title: "Community", desc: "Interactive peer network", icon: "🤝" },
              { title: "Events", desc: "Conferences & workshops", icon: "📅" },
              { title: "Career Growth", desc: "Talent pool & positioning", icon: "🚀" }
            ].map((card, i) => (
              <div key={i} className="p-5 rounded-2xl bg-surface-50 border border-surface-100 hover:border-primary-300 hover:bg-white transition-all text-center">
                <span className="text-3xl mb-3 block">{card.icon}</span>
                <h4 className="text-sm font-black text-surface-900 mb-1">{card.title}</h4>
                <p className="text-[10px] text-surface-400 font-semibold leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">The Ecosystem Built for Professional Impact</h2>
            <p className="text-surface-500 font-medium mt-4">We are moving away from passive learning to create a coordinated professional growth network for healthcare managers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Learning",
                desc: "Learn from experienced healthcare professionals via bootcamps and simulations.",
                icon: "📖",
                link: "/engagement"
              },
              {
                title: "Certifications",
                desc: "Earn industry-recognized digital credentials that demonstrate real competency.",
                icon: "🏅",
                link: "/certification"
              },
              {
                title: "Community",
                desc: "Participate in healthcare discussions, troubleshoot issues, and share outcomes.",
                icon: "💬",
                link: "/community"
              },
              {
                title: "Contributor Platform",
                desc: "Share knowledge with the next generation. L2 & L3 experts can publish specialized modules.",
                icon: "✍️",
                link: "/contributor"
              },
              {
                title: "Events",
                desc: "Attend virtual workshops, local meetups, and leadership roundtables.",
                icon: "📅",
                link: "/events"
              }
            ].map((feat, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-white border border-surface-200 hover:border-primary-500 transition-all flex flex-col justify-between hover:shadow-xl">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-black text-surface-900 mb-3">{feat.title}</h3>
                  <p className="text-sm text-surface-500 font-medium leading-relaxed mb-8">{feat.desc}</p>
                </div>
                <Link to={feat.link} className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest group-hover:text-primary-700">
                  Explore <ArrowRightIcon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How CHAMP Works */}
      <section className="py-24 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">How CHAMP Works</h2>
            <p className="text-surface-500 font-medium mt-4">A simple 4-step path to validate your skills and advance your career.</p>
          </div>

          <div className="relative">
            {/* Timeline connector line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface-100 -translate-y-1/2 hidden lg:block z-0">
              <div className="h-full bg-primary-600 transition-all duration-1000" style={{ width: `${(activeStep / 3) * 100}%` }} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { title: "Join", desc: "Create your profile and verify your current experience level.", icon: "🧑‍💻" },
                { title: "Learn", desc: "Gain practical insights through simulated modules & expert bootcamps.", icon: "📚" },
                { title: "Get Certified", desc: "Pass our multi-level competency assessment.", icon: "🏅" },
                { title: "Advance Your Career", desc: "Access the verified talent pool and network with top hospitals.", icon: "🚀" }
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-[2rem] border border-surface-200/80 shadow-sm cursor-pointer transition-all hover:border-primary-500 text-center"
                  onMouseEnter={() => setActiveStep(i)}
                >
                  <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center text-xl mb-6 transition-all ${activeStep === i ? "bg-primary-600 text-white" : "bg-primary-50 text-primary-600"}`}>
                    {step.icon}
                  </div>
                  <h4 className="text-lg font-black text-surface-900 mb-2">{step.title}</h4>
                  <p className="text-xs text-surface-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certification Section */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Professional Certifications</h2>
              <p className="text-surface-500 font-medium mt-3">Validate your professional capability through verified scenario-based examinations.</p>
            </div>
            <Link to="/certification" className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest hover:text-primary-700">
              All Certifications <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "CHAMP-Certified Healthcare Manager (CHM)",
                domain: "Operations & Administration",
                questions: 60,
                duration: "90 Mins",
                difficulty: "Intermediate",
                badge: "Popular"
              },
              {
                title: "CHAMP-Certified Patient Safety Officer (CPSO)",
                domain: "Quality Assurance & Patient Safety",
                questions: 50,
                duration: "75 Mins",
                difficulty: "Advanced",
                badge: "Specialized"
              },
              {
                title: "CHAMP-Certified Clinical Operations Director (CCOD)",
                domain: "Clinical Leadership",
                questions: 80,
                duration: "120 Mins",
                difficulty: "Expert",
                badge: "Executive"
              }
            ].map((cert, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-surface-200 flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden">
                {cert.badge && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-[9px] font-black uppercase tracking-wider">
                    {cert.badge}
                  </span>
                )}
                <div>
                  <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest block mb-4">{cert.domain}</span>
                  <h3 className="text-lg font-black text-surface-900 mb-6 leading-snug">{cert.title}</h3>
                  
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-surface-100 py-4 mb-8">
                    <div>
                      <span className="text-[9px] text-surface-400 font-bold block uppercase tracking-wider">Questions</span>
                      <span className="text-sm font-black text-surface-800">{cert.questions}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-surface-400 font-bold block uppercase tracking-wider">Duration</span>
                      <span className="text-sm font-black text-surface-800">{cert.duration}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-surface-400 font-bold block uppercase tracking-wider">Difficulty</span>
                      <span className="text-sm font-black text-surface-800">{cert.difficulty}</span>
                    </div>
                  </div>
                </div>

                <Link to="/certification" className="w-full py-4 bg-surface-900 text-white rounded-2xl hover:bg-surface-800 font-black text-xs uppercase tracking-widest text-center transition-all">
                  Explore Assessment
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Learn from Healthcare Experts</h2>
              <p className="text-surface-500 font-medium mt-3">Interactive courses led by industry veterans to solve real hospital problems.</p>
            </div>
            <Link to="/engagement" className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest hover:text-primary-700">
              Browse Course Catalog <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Hospital Operations & Workflow Optimization",
                instructor: "Dr. Rajesh Kurup, MHA",
                modules: 12,
                duration: "8 hours",
                price: "Free",
                thumbnail: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=400&h=250&fit=crop"
              },
              {
                title: "Healthcare Compliance, Quality Audits & NABH Preparation",
                instructor: "Priya Sharma, Quality Director",
                modules: 15,
                duration: "10 hours",
                price: "₹4,999",
                badge: "Premium",
                thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop"
              },
              {
                title: "Digital Health Systems & Electronic Medical Records Integration",
                instructor: "Amit Verma, CIO MedHealth",
                modules: 8,
                duration: "6 hours",
                price: "Free",
                thumbnail: "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=400&h=250&fit=crop"
              }
            ].map((course, i) => (
              <div key={i} className="group rounded-[2.5rem] bg-surface-50 border border-surface-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <span className={`absolute top-4 left-4 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${course.price === "Free" ? "bg-emerald-500 text-white" : "bg-primary-600 text-white"}`}>
                      {course.price === "Free" ? "Free" : "Premium"}
                    </span>
                  </div>
                  <div className="p-8">
                    <h4 className="text-[10px] text-surface-400 font-bold uppercase tracking-widest mb-2">{course.instructor}</h4>
                    <h3 className="text-base font-black text-surface-900 mb-4 leading-snug">{course.title}</h3>
                    <div className="flex gap-4 text-xs font-bold text-surface-500">
                      <span>📚 {course.modules} Modules</span>
                      <span>⏱️ {course.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0 flex justify-between items-center border-t border-surface-200/50 mt-4">
                  <span className="text-lg font-black text-surface-900">{course.price}</span>
                  <Link to="/engagement" className="px-4 py-2.5 bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-700 transition-colors">
                    Enroll
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Active Discussions in Community</h2>
              <p className="text-surface-500 font-medium mt-3">Learn from peer experiences and contribute solutions to daily challenges.</p>
            </div>
            <Link to="/community" className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest hover:text-primary-700">
              Join Discussions <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop",
                user: "Dr. Jacob Varghese",
                community: "c/QualityAssurance",
                flair: "NABH Audit",
                title: "How are you preparing entry-level managers for the upcoming NABH 5th edition audits?",
                replies: 24,
                likes: 89
              },
              {
                avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?w=100&h=100&fit=crop",
                user: "Priya Sharma",
                community: "c/HospitalOps",
                flair: "Patient Escalation",
                title: "Drafting a standardized escalation matrix for night shift operations. Sharing draft for feedback.",
                replies: 15,
                likes: 42
              },
              {
                avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=100&h=100&fit=crop",
                user: "Amit Verma",
                community: "c/DigitalHealth",
                flair: "EMR Systems",
                title: "Moving from physical records to EMR. What are the best practices for staff coordination during transition?",
                replies: 31,
                likes: 112
              }
            ].map((post, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-surface-200 hover:border-primary-300 hover:shadow-lg transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <img src={post.avatar} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <div>
                        <h4 className="text-[10px] font-black text-surface-900">{post.user}</h4>
                        <span className="text-[9px] text-surface-400 font-bold">{post.community}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-primary-50 text-primary-600 text-[8px] font-black uppercase tracking-widest">
                      {post.flair}
                    </span>
                  </div>
                  <h3 className="text-sm font-black text-surface-800 leading-snug mb-6 hover:text-primary-600 cursor-pointer">
                    "{post.title}"
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-black text-surface-400 border-t border-surface-100 pt-4">
                  <span>👍 {post.likes} Likes</span>
                  <span>💬 {post.replies} Replies</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-24 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Upcoming Events</h2>
              <p className="text-surface-500 font-medium mt-3">Register for virtual conferences, local city meetups, and panel discussions.</p>
            </div>
            <Link to="/events" className="inline-flex items-center gap-2 text-xs font-black text-primary-600 uppercase tracking-widest hover:text-primary-700">
              All Events <ArrowRightIcon />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Global Digital Health Summit 2026",
                date: "July 12, 2026",
                type: "Virtual",
                location: "Online (Zoom)",
                poster: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop"
              },
              {
                title: "Hospital Operations Roundtable: Post-Pandemic Scaling",
                date: "July 28, 2026",
                type: "In-Person",
                location: "Bengaluru, India",
                poster: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=250&fit=crop"
              },
              {
                title: "Clinical Leadership Seminar & Networking",
                date: "August 10, 2026",
                type: "Virtual",
                location: "Online (Microsoft Teams)",
                poster: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop"
              }
            ].map((evt, i) => (
              <div key={i} className="group rounded-[2.5rem] bg-surface-50 border border-surface-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={evt.poster} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-primary-600 text-white text-[9px] font-black uppercase tracking-wider">
                      {evt.type}
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-1.5 mb-2">
                      <CalendarIcon />
                      <span className="text-[10px] text-surface-400 font-bold uppercase tracking-widest">{evt.date}</span>
                    </div>
                    <h3 className="text-base font-black text-surface-900 mb-4 leading-snug">{evt.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-surface-500">
                      <LocationIcon />
                      <span className="font-bold">{evt.location}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 pt-0 mt-4">
                  <Link to="/events" className="w-full block py-4 bg-surface-900 text-white rounded-2xl hover:bg-surface-800 font-black text-xs uppercase tracking-widest text-center transition-all">
                    Register Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributor Section */}
      <section className="py-24 bg-surface-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-surface-900 text-white p-12 md:p-20 rounded-[4rem] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="lg:col-span-7 space-y-6">
              <span className="px-3 py-1.5 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 text-[10px] font-black uppercase tracking-widest inline-block">
                Ecosystem Co-Creation
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Become a CHAMP Contributor</h2>
              <p className="text-sm text-surface-300 font-medium leading-relaxed max-w-xl">
                L2 and L3 certified healthcare professionals have the opportunity to author coursework, case studies, clinical videos, and research papers, sharing practical knowledge with thousands of administrators.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-black uppercase tracking-wider text-primary-300">
                <span>✓ Courses</span> • <span>✓ Articles</span> • <span>✓ Case Studies</span> • <span>✓ Research</span>
              </div>
            </div>
            <div className="lg:col-span-5 text-center lg:text-right">
              <Link to="/contributor" className="inline-block px-8 py-5 bg-white text-surface-900 rounded-3xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/5">
                Join as Contributor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-24 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">The Professional Learning Journey</h2>
            <p className="text-surface-500 font-medium mt-4">A complete pathway to master clinical management, gain verification, and network with leading hospital brands.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              { num: "01", step: "Join CHAMP", desc: "Access the learning platform & verify your background." },
              { num: "02", step: "Take Courses", desc: "Gain credits through simulation-based coursework." },
              { num: "03", step: "Pass Certification", desc: "Complete rigorous, scenario-driven test challenges." },
              { num: "04", step: "Earn Credential", desc: "Get a secure, verifiable digital certificate." },
              { num: "05", step: "Advance Career", desc: "Be positioned in the network talent pool for healthcare brands." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-surface-50 border border-surface-100 hover:border-primary-400 hover:bg-white transition-all text-center">
                <span className="text-3xl font-extrabold text-primary-600/30 block mb-4">{item.num}</span>
                <h4 className="text-sm font-black text-surface-900 mb-2">{item.step}</h4>
                <p className="text-[10px] text-surface-500 font-semibold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Certificate Showcase */}
      <section className="py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight leading-tight">Secure, Verifiable Digital Credentials</h2>
            <p className="text-surface-600 font-medium leading-relaxed">
              Every certification earned on CHAMP comes with a cryptographically verifiable digital certificate. Recruits, hospitals, and HR admins can verify credentials instantly in our institutional registry.
            </p>
            <ul className="space-y-4">
              {[
                "Unique Verification ID registered in CHAMP Registry",
                "Verifiable URLs with live checking pathways",
                "Industry-recognized standards of healthcare competence",
                "Downloadable PDFs with high-resolution sharing"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-xs font-black text-surface-700 uppercase tracking-wide">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            {/* Certificate UI Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full max-w-md p-10 bg-white rounded-[3rem] border border-surface-200/80 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white to-primary-50/5"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-bl-[4rem] -mr-8 -mt-8 pointer-events-none opacity-40" />
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white font-bold text-xs">C</div>
                  <span className="text-xs font-black text-surface-900 tracking-tighter">CHAMP Registry</span>
                </div>
                <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Verifiable</span>
              </div>

              <div className="space-y-6 mb-8 text-center lg:text-left">
                <div>
                  <span className="text-[9px] text-surface-400 font-black uppercase tracking-widest block mb-1">RECIPIENT NAME</span>
                  <p className="text-2xl font-black text-surface-900 uppercase tracking-tighter">JANE DOE, MHA</p>
                </div>
                <div>
                  <span className="text-[9px] text-surface-400 font-black uppercase tracking-widest block mb-1">CERTIFICATION AWARDED</span>
                  <p className="text-sm font-black text-primary-600">CHAMP-Certified Healthcare Manager (CHM)</p>
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-surface-100 pt-4">
                  <div>
                    <span className="text-[9px] text-surface-400 font-black uppercase tracking-widest block mb-1">Verification ID</span>
                    <p className="text-xs font-mono font-bold text-surface-800">CHMP-8392-L2</p>
                  </div>
                  <div>
                    <span className="text-[9px] text-surface-400 font-black uppercase tracking-widest block mb-1">Issue Date</span>
                    <p className="text-xs font-bold text-surface-800">June 29, 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-white border-y border-surface-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-surface-400">Trusted Healthcare Partners</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-40 grayscale">
            {["AHERF", "Apollo Hospitals", "Max Healthcare", "Fortis Health", "Manipal Hospitals"].map((partner, i) => (
              <span key={i} className="text-lg md:text-xl font-black tracking-widest uppercase text-surface-900">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-900 tracking-tight">Ecosystem Feedback</h2>
            <p className="text-surface-500 font-medium mt-3">What our members, educators, and partner hospitals say.</p>
          </div>

          <div className="max-w-4xl mx-auto relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white p-10 md:p-16 rounded-[4rem] border border-surface-200/60 shadow-xl text-center relative"
              >
                <span className="text-5xl text-primary-200 absolute top-6 left-8 font-serif leading-none">“</span>
                <p className="text-base md:text-lg text-surface-700 font-semibold italic leading-relaxed mb-8 relative z-10">
                  {testimonials[activeTestimonial].quote}
                </p>
                <div className="flex flex-col items-center gap-3">
                  <img src={testimonials[activeTestimonial].avatar} className="w-12 h-12 rounded-full object-cover shadow-md" alt="" />
                  <div>
                    <h4 className="text-sm font-black text-surface-900">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-[10px] text-surface-400 font-bold uppercase tracking-widest">
                      {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].org}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${activeTestimonial === i ? "bg-primary-600 w-6" : "bg-surface-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-20 bg-surface-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-950/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white block mb-2">
              {counters.professionals.toLocaleString()}+
            </span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Healthcare Professionals</span>
          </div>
          <div>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white block mb-2">
              {counters.courses}+
            </span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Expert Courses</span>
          </div>
          <div>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white block mb-2">
              {counters.certs}+
            </span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Certifications</span>
          </div>
          <div>
            <span className="text-4xl md:text-5xl font-extrabold tracking-tight text-white block mb-2">
              {counters.events}+
            </span>
            <span className="text-[10px] text-surface-400 font-black uppercase tracking-widest">Live Events</span>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-28 bg-white border-t border-surface-200/50 relative overflow-hidden text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-100/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-surface-900">
            Ready to Elevate Your Healthcare Career?
          </h2>
          <p className="text-base text-surface-500 font-medium max-w-xl mx-auto leading-relaxed">
            Gain verified competency credentials, connect with clinical leaders, and learn hospital workflow optimization today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/join" className="btn-primary w-full sm:w-auto text-center font-bold px-10 py-5 bg-primary-600 text-white rounded-2xl shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all hover:scale-[1.02]">
              Join CHAMP
            </Link>
            <Link to="/certification" className="btn-outline-dark w-full sm:w-auto text-center font-bold px-10 py-5 border-2 border-surface-800 text-surface-900 rounded-2xl hover:bg-surface-900 hover:text-white transition-all hover:scale-[1.02]">
              Explore Certifications
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
