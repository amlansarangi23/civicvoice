'use client';
import React from "react";
import { Mail, Info, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Hero Section
const HeroSection = () => {
  const router = useRouter(); // Move the hook inside the component body

  return (
    <motion.section
      className="flex flex-col items-center justify-center text-center p-10 bg-gradient-to-r from-blue-600 to-purple-700"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-5xl font-extrabold text-white mb-4">
        Civic Voice – Empowering Communities
      </h1>
      <p className="text-lg text-gray-200 mb-6 max-w-3xl mx-auto">
        Empower your voice and take action. Report issues that matter, track real-time progress, and engage with local authorities. Let's build a better, more connected community.
      </p>
      <motion.button
        onClick={() => router.push('/signup')} // Move the routing logic here
        className="bg-blue-600 text-white text-lg px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
      >
        Get Started
      </motion.button>
    </motion.section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    {
      icon: <ShieldCheck />,
      title: "Secure & Anonymous",
      desc: "Report your grievances without the fear of exposure, in a safe and anonymous environment.",
    },
    {
      icon: <Info />,
      title: "Real-time Updates",
      desc: "Stay informed with live updates as your grievances are being addressed.",
    },
    {
      icon: <Mail />,
      title: "Community Support",
      desc: "Collaborate with your local administrators and fellow residents to find solutions.",
    },
  ];

  return (
    <motion.section
      className="p-10 bg-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8">Our Features</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-700 text-center rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="mb-4 text-primary">{feature.icon}</div>
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
    className="p-10 bg-gray-700 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-3xl font-bold text-white mb-4">About Civic Voice</h2>
    <p className="text-lg text-gray-200 max-w-3xl mx-auto">
      Civic Voice is committed to making a positive change in society by providing a platform for residents to voice their concerns and grievances. Together, we can create a safe, supportive, and responsive community for all.
    </p>
  </motion.section>
);

// Contact Section
const ContactSection = () => (
  <motion.section
    className="p-10 bg-gray-800 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2 className="text-3xl font-bold text-white mb-4">Get in Touch</h2>
    <p className="text-lg text-gray-200">
      We’re here to help! Reach out to us anytime at{" "}
      <a
        href="mailto:support@civicvoice.com"
        className="text-blue-500 hover:text-blue-600 transition"
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
