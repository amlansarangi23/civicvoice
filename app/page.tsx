'use client'
import React from "react";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Mail, Info, ShieldCheck } from "lucide-react";
// import { useRouter } from "next/navigation";


const HeroSection = () => (
  <section className="flex flex-col items-center justify-center text-center p-10 bg-gray-700">
    <h1 className="text-4xl font-bold mb-4">
      Raise Your Voice, Make an Impact
    </h1>
    <p className="text-lg text-gray-400 mb-6 max-w-xl">
      Join our platform to report and address social grievances effectively.
    </p>
    <Button className="text-lg px-6 py-3">Sign Up</Button>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <ShieldCheck />,
      title: "Secure & Anonymous",
      desc: "Report issues safely without fear.",
    },
    {
      icon: <Info />,
      title: "Real-time Updates",
      desc: "Track grievance progress seamlessly.",
    },
    {
      icon: <Mail />,
      title: "Community Support",
      desc: "Engage with local administrators.",
    },
  ];
  return (
    <section className="p-10 bg-gray-600">
      <h2 className="text-3xl font-bold text-center mb-8">Platform Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="p-6 flex flex-col items-center text-center bg-gray-700"
          >
            <div className="mb-4 text-primary">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section className="p-10 bg-gray-700 text-center">
    <h2 className="text-3xl font-bold mb-4">About Us</h2>
    <p className="text-lg text-white max-w-2xl mx-auto">
      We are committed to bridging the gap between residents and local
      authorities, ensuring every voice is heard and every issue is addressed.
    </p>
  </section>
);

const ContactSection = () => (
  <section className="p-10 bg-gray-600 text-center">
    <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
    <p className="text-lg text-white">
      Reach out to us at support@grievanceplatform.com
    </p>
  </section>
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
