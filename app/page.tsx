'use client';
import React from "react";
import {  Tag, Users, CheckCircle, ThumbsUp, Bell, User, MessageCircle, Smartphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from 'lucide-react';
// Hero Section
const HeroSection = () => {
  const router = useRouter();

  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center p-10 bg-gradient-to-r from-gray-900 to-gray-800"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-extrabold text-white mb-4">
        CivicVoice – Empowering Community Voices
      </h1>
      <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
        Connect with your community to report, discuss, and resolve local issues. Together, we can build a more responsive and engaged neighborhood.
      </p>
      <motion.button
        onClick={() => router.push('/signup')}
        className="bg-green-600 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
      >
        Join Us Today
      </motion.button>
    </motion.section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <Users />,
      title: "Local Administration",
      desc: "Government and NGO admins oversee and address issues within their localities, ensuring timely resolutions.",
    },
    {
      icon: <Tag />,
      title: "Categorized Reporting",
      desc: "Users can report issues under specific tags and subtags, providing detailed descriptions and images for clarity.",
    },
    {
      icon: <CheckCircle />,
      title: "Resolution Proof",
      desc: "Admins upload images as proof upon resolving issues, maintaining transparency and accountability.",
    },
    {
      icon: <Bell />,
      title: "Email Notifications",
      desc: "Users receive email alerts when their reported issues are resolved, keeping them informed.",
    },
    {
      icon: <ThumbsUp />,
      title: "Upvote System",
      desc: "Community members can upvote issues, helping prioritize those that matter most.",
    },
    {
      icon: <User />,
      title: "User Profiles",
      desc: "Manage your reports and track the status of your submissions through personalized profiles.",
    },
    {
      icon: <MessageCircle />,
      title: "Local Community",
      desc: "View issues in your neighborhood and stay informed to form a better-informed society.",
    },
    {
      icon: <Lock />,
      title: "Secure Registration & Authentication",
      desc: "User accounts are protected with secure authentication methods to ensure privacy and safety.",
    },
    {
      icon: <Smartphone />,
      title: "Mobile Accessibility",
      desc: "Report and track issues on-the-go with our mobile-friendly platform.",
    },
  ];

  return (
    <motion.section
      className="p-10 bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8">Key Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-800 text-center rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4 text-primary mx-auto w-12 h-12 text-green-500">{feature.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};


// About Section
const AboutSection = () => (
  <motion.section
    className="p-10 bg-gray-800 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-3xl font-bold text-white mb-4">About CivicVoice</h2>
    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
      CivicVoice bridges the gap between residents and local authorities, fostering transparency and collaborative problem-solving. Our mission is to empower communities by providing a platform where every voice is heard, and collective action leads to tangible improvements.
    </p>
  </motion.section>
);

// Contact Section
const ContactSection = () => (
  <motion.section
    className="p-10 bg-gray-900 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
    <p className="text-lg text-gray-300">
      We’re here to help! Reach out to us anytime at{" "}
      <a
        href="mailto:support@civicvoice.com"
        className="text-green-500 hover:text-green-600 transition"
      >
        support@civicvoice.com
      </a>
    </p>
  </motion.section>
);

export default function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
