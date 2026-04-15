import mongoose from "mongoose";
import dotenv from "dotenv";
import Blog from "./models/Blog.js";
import Event from "./models/Event.js";
import News from "./models/News.js";

dotenv.config();

const blogs = [
  {
    title: "The Future of Digital Health 2026",
    excerpt: "Exploring the intersection of AI, telemedicine, and personalized patient care in the coming years.",
    content: "Digital health is evolving at an unprecedented pace. By 2026, we expect AI to be deeply integrated into clinical workflows. This article explores the key trends in data privacy, wearable integration, and patient outcomes.\n\nFull content reveals that AI will reduce administrative burden by 40%. Specialized models like MedLM are leading the way in diagnostic assistance.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    category: "Technology",
    author: "Dr. Sarah Mitchell",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71f1536780?w=100&h=100&fit=crop",
    readTime: "8 min read",
    likes: 124,
    comments: [
      { user: "Dr. James Carter", avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=40&h=40&fit=crop", text: "Excellent insights on the integration of MedLM.", date: new Date() }
    ],
    isPremium: true,
  },
  {
    title: "Mental Health Strategies for Practitioners",
    excerpt: "Practical tips for maintaining wellbeing while providing high-quality care in high-stress environments.",
    content: "Healthcare practitioners often face burnout. It is essential to implement self-care routines. Our research shows that mindfulness, peer support groups, and structural shifts in scheduling are the most effective interventions.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop",
    category: "Wellness",
    author: "Dr. Robert Wilson",
    authorAvatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop",
    readTime: "5 min read",
    likes: 89,
    comments: [],
    isPremium: false,
  }
];

const events = [
  {
    title: "Global Digital Health Summit 1.0",
    date: new Date("2026-05-15"),
    time: "09:00 AM - 05:00 PM",
    description: "Join international leaders to discuss the next wave of healthcare technology.",
    fullDetails: "Full schedule: 9 AM - Keynote by Dr. Aris. 11 AM - Digital Twins workshop. 2 PM - Ethics in Medical AI panel. 4 PM - Networking session.",
    location: "Virtual & Boston, MA",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop",
    category: "Conference",
    speakers: ["Dr. Aris", "Dr. Sarah Mitchell", "Prof. Michael Chen"],
    attendees: 500,
    price: "$299 (Member Exclusive)",
    isPremium: true,
  },
  {
    title: "Community Networking Mixer",
    date: new Date("2026-04-20"),
    time: "06:30 PM - 09:00 PM",
    description: "A casual evening for medical professionals to connect and share experiences.",
    fullDetails: "Location: Skyline Lounge, 5th Floor. Drinks and appetizers served. Special announcement at 7 PM regarding the new research grant program.",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop",
    category: "Networking",
    speakers: ["Community Board members"],
    attendees: 120,
    price: "Free",
    isPremium: false,
  }
];

const news = [
  {
    title: "Breakthrough in Alzheimer's Research",
    summary: "New clinical trials show promising results for early-stage intervention using targeted protein therapy.",
    category: "Medical Research",
    image: "https://images.unsplash.com/photo-1579165466511-739054796db7?w=800&auto=format&fit=crop",
    date: new Date("2026-03-25"),
    source: "Medical Journal",
  },
  {
    title: "Global Health Policy Update: Q2 2026",
    summary: "New regulations regarding digital health records and data interoperability across European hospitals.",
    category: "Policy",
    image: "https://images.unsplash.com/photo-1454165833222-d1d64319088?w=800&auto=format&fit=crop",
    date: new Date("2026-04-01"),
    source: "Health Policy Watch",
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
    
    console.log("Data Seeded Successfully with News!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
