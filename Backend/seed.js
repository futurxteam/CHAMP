import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Blog from "./models/Blog.js";
import Event from "./models/Event.js";
import News from "./models/News.js";

dotenv.config();

const blogs = [
  {
    title: "Case Study: Managing Patient Flow Bottlenecks in Tier-II Cities",
    excerpt: "Analyzing real-world operational delays in specialty hospitals and how adaptability saved the quarter.",
    content: "In this case analysis, we explore a 200-bed hospital facing severe peak-hour congestion. By applying 21st-century management frameworks—moving beyond simple queue theory to dynamic resource allocation—the management reduced patient wait times by 35% within 60 days. This study highlights the importance of situational judgment over textbook solutions.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&auto=format&fit=crop",
    category: "Case Study",
    author: "Senior Administrator, CHAMP 21",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71f1536780?w=100&h=100&fit=crop",
    readTime: "12 min read",
    likes: 245,
    comments: [],
    isPremium: true,
  },
  {
    title: "The Psychology of Decision-Making for Hospital Managers",
    excerpt: "Why traditional frameworks fail during crises and how to develop clarity under pressure.",
    content: "Healthcare decisions today must be faster and more accountable. This article delves into the cognitive biases that affect mid-level managers during operational crises. We discuss tools for developing clarity and the 'CHAMP 21' approach to structured problem solving.",
    image: "https://images.unsplash.com/photo-1454165833222-d1d64319088?w=800&auto=format&fit=crop",
    category: "Leadership",
    author: "Dr. Ananya Rao",
    authorAvatar: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop",
    readTime: "8 min read",
    likes: 182,
    comments: [],
    isPremium: false,
  },
  {
    title: "Why Traditional Accreditation Readiness is No Longer Enough",
    excerpt: "Moving from meeting standards to ensuring consistent quality and transparency in real-time.",
    content: "Accreditation is often seen as a periodic event. However, the 21st-century hospital requires continuous readiness. We explore how technology and culture can maintain quality standards every single day, not just during audit months.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    category: "Quality Assurance",
    author: "Michael Sterling",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    readTime: "10 min read",
    likes: 156,
    comments: [],
    isPremium: true,
  }
];

const events = [
  {
    title: "Hospital Immersion Visit: Advanced Operational Excellence",
    date: new Date("2026-06-12"),
    time: "08:00 AM - 04:00 PM",
    description: "A deep-dive on-site visit to a leading multi-specialty hospital to see 21st-century systems in action.",
    fullDetails: "Experience real-world operations. Schedule includes: 8 AM - Infrastructure Walkthrough. 10 AM - Digital Registry & Flow Analysis. 1 PM - Interaction with CXOs. 3 PM - Peer Discussion on observed bottlenecks.",
    location: "Kochi, India",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
    category: "Immersion",
    speakers: ["Chief Operating Officer, Aster Medcity", "CHAMP 21 Mentors"],
    attendees: 40,
    price: "$150 (Premium Members Only)",
    isPremium: true,
  },
  {
    title: "Leadership Roundtable: Future of Transparent Healthcare",
    date: new Date("2026-05-20"),
    time: "04:00 PM - 07:00 PM",
    description: "Conversations with senior leaders on evolving demands of accountability and transparency.",
    fullDetails: "An intimate virtual session with top-tier administrators. We will discuss the impact of price transparency and outcome reporting on modern hospital reputation management.",
    location: "Virtual (Invite Only)",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    category: "Roundtable",
    speakers: ["Dr. Vikram Shah", "Sarah Thompson"],
    attendees: 100,
    price: "Invite Only",
    isPremium: true,
  },
  {
    title: "City-Level Meetup: Mid-Level Management Challenges",
    date: new Date("2026-05-05"),
    time: "06:00 PM - 09:00 PM",
    description: "Connect with local peers to share real-world solutions for daily operational hurdles.",
    fullDetails: "Join us at the central hub for networking and facilitated case discussions. No trainers—only real practitioners solving real problems.",
    location: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop",
    category: "Networking",
    speakers: ["Community Leads"],
    attendees: 80,
    price: "Free for Members",
    isPremium: false,
  }
];

const news = [
  {
    title: "New National Standards for Hospital Digital Continuity Released",
    summary: "The Ministry of Health outlines new guidelines for data interoperability and recovery across large networks.",
    category: "Policy",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033442?w=800&auto=format&fit=crop",
    date: new Date("2026-04-10"),
    source: "Health Policy Watch",
  },
  {
    title: "CHAMP 21 Assessment Sees Record Enrollment for Q2",
    summary: "Over 2,000 professionals have signed up for the new situational-judgment based certification.",
    category: "Community",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop",
    date: new Date("2026-04-15"),
    source: "CHAMP Network",
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    await Blog.deleteMany();
    await Event.deleteMany();
    await News.deleteMany();
    
    await Blog.insertMany(blogs);
    await Event.insertMany(events);
    await News.insertMany(news);

    // Seed Admin
    const adminExists = await User.findOne({ email: "admin@example.com" });
    if (!adminExists) {
      await User.create({
        name: "Platform Admin",
        email: "admin@example.com",
        password: "password123",
        role: "admin",
        status: "approved"
      });
      console.log("Admin account seeded successfully!");
    }
    
    console.log("Database successfully cleaned and seeded with CHAMP 21 data!");
    process.exit();
  } catch (error) {
    console.error(`Error seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedData();
