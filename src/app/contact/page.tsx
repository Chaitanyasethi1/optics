"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  Navigation, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  Sparkles
} from "lucide-react";
import { STORE_NAME, ADDRESS, PHONE, EMAIL, TIMINGS, GOOGLE_MAPS_URL, getWhatsAppLink } from "@/data/config";

const FAQS = [
  {
    q: "How long does the Free 14-Step Eye Examination take?",
    a: "Our thorough ophthalmic examination takes approximately 35 to 45 minutes in a private diagnostic suite. We recommend booking in advance to ensure no waiting time.",
  },
  {
    q: "Do I need to carry my previous eyewear or doctor's prescription?",
    a: "While our optometrists will perform a complete fresh diagnostic refraction, carrying your existing glasses helps us analyze your lens power progression and postural habits.",
  },
  {
    q: "What is your progressive lens adaptation guarantee?",
    a: "We offer a 14-day hassle-free adaptation guarantee on all progressive lenses (Zeiss and Essilor). If your eyes take longer to adjust or require parameter refinement, we remake the lenses at zero additional cost.",
  },
  {
    q: "Can I bring my own existing frame for new prescription lenses?",
    a: "Absolutely. Our master laboratory technicians will inspect your frame structural integrity and custom-cut Zeiss, Essilor, or Hoya lenses to match your existing rim perfectly.",
  },
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Frame Inquiry & Showroom Visit");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello ${STORE_NAME},\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nTopic: ${subject}\nMessage: ${message}`;
    const link = getWhatsAppLink(text);
    setSubmitted(true);
    window.open(link, "_blank");
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 mb-2 px-3 py-1 rounded-full bg-white border border-[#EADFD2]">
            <Sparkles className="w-3.5 h-3.5 text-[#B08968]" />
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              CONCIERGE & SHOWROOM
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#2B2622] font-medium mt-2 mb-3">
            Visit & Contact Us
          </h1>
          <div className="w-12 h-[1px] bg-[#B08968] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#7C746C] leading-relaxed">
            Have questions regarding frame styles, progressive lens optics, or eye test appointments? Our optical concierge is ready to assist you.
          </p>
        </div>

        {/* 2 Column Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white border border-[#EADFD2] rounded-3xl p-6 sm:p-10 shadow-sm">
            <h2 className="font-serif text-2xl text-[#2B2622] font-medium mb-1">
              Send a Message to Our Concierge
            </h2>
            <p className="text-xs text-[#7C746C] mb-6">
              Fill in your query and click submit. We will connect you directly with our showroom team on WhatsApp.
            </p>

            {!submitted ? (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Rao"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                      Topic
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                    >
                      <option value="Frame Inquiry & Showroom Visit">Frame Inquiry & Showroom Visit</option>
                      <option value="Zeiss / Essilor Lens Consultation">Zeiss / Essilor Lens Consultation</option>
                      <option value="Eye Test Appointment Question">Eye Test Appointment Question</option>
                      <option value="Contact Lens Fitting">Contact Lens Fitting</option>
                      <option value="Corporate / Family Styling">Corporate / Family Styling</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-sans uppercase tracking-wider font-semibold text-[#B08968] mb-1.5">
                    How Can We Assist You? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what frames you like or any specific prescription questions you have..."
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADFD2] text-xs text-[#2B2622] focus:outline-none focus:border-[#B08968] bg-[#FAF7F2]/50"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send via WhatsApp Concierge</span>
                </button>
              </form>
            ) : (
              <div className="py-10 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#B08968] mx-auto" />
                <h3 className="font-serif text-2xl text-[#2B2622]">Message Formatted</h3>
                <p className="text-xs text-[#7C746C] max-w-sm mx-auto">
                  Your WhatsApp message was generated. Click below if WhatsApp did not open automatically.
                </p>
                <button
                  onClick={() => {
                    const text = `Hello ${STORE_NAME}, Name: ${name}, Topic: ${subject}, Query: ${message}`;
                    window.open(getWhatsAppLink(text), "_blank");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Open WhatsApp
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Showroom Contact Details & Timing Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF7F2] border border-[#EADFD2] rounded-3xl p-6 sm:p-8 space-y-5">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#B08968] font-bold block">
                FLAGSHIP SALON DETAILS
              </span>
              <h3 className="font-serif text-2xl text-[#2B2622] font-medium">
                {STORE_NAME} Showroom
              </h3>

              <div className="space-y-4 text-xs text-[#2B2622]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#7A5A43]">Address</span>
                    <p className="text-[#7C746C] leading-relaxed">{ADDRESS}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#7A5A43]">Hours</span>
                    <p className="text-[#7C746C]">{TIMINGS} (Open All 7 Days)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#7A5A43]">Phone</span>
                    <a href={`tel:${PHONE}`} className="text-[#7C746C] hover:text-[#2B2622]">
                      {PHONE}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[#7A5A43]">Concierge Email</span>
                    <a href={`mailto:${EMAIL}`} className="text-[#7C746C] hover:text-[#2B2622]">
                      {EMAIL}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EADFD2] flex gap-3">
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium bg-[#B08968] text-white hover:bg-[#7A5A43] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <a
                  href={getWhatsAppLink("Hello DemoOptics Concierge, I would like to visit the showroom.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-medium border border-[#B08968] text-[#7A5A43] hover:bg-[#B08968] hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Embed Section */}
        <div className="rounded-3xl overflow-hidden border border-[#EADFD2] mb-16 shadow-xs">
          <iframe
            title="DemoOptics Showroom Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.986794611684!2d77.6322896!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16a41f6789e9%3A0xb366b26d833878b!2s100%20Feet%20Rd%2C%20Indiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B08968]">
              COMMON INQUIRIES
            </span>
            <h2 className="font-serif text-3xl text-[#2B2622] font-medium mt-1">
              Frequently Asked Questions
            </h2>
            <div className="w-10 h-[1px] bg-[#B08968] mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white border border-[#EADFD2] rounded-2xl p-6 space-y-2"
              >
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#B08968] shrink-0 mt-0.5" />
                  <h4 className="font-serif text-base font-medium text-[#2B2622]">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-xs text-[#7C746C] leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
