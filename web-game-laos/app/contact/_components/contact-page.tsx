import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-[#0b0c2a] pt-32 pb-20">
      <div className="container mx-auto max-w-7xl px-4 lg:px-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="text-[12px] text-[#e53637] font-black uppercase tracking-[0.4em] mb-3">
            Get In Touch
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Contact <span className="text-[#e53637]">Us</span>
          </h1>
          <div className="w-20 h-1 bg-[#e53637] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* 1. Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#151639] p-8 rounded-2xl border border-white/5 shadow-xl">
              <h3 className="text-xl font-bold text-white uppercase italic mb-8 border-l-4 border-[#e53637] pl-4">
                Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-[#e53637]/10 rounded-xl flex items-center justify-center text-[#e53637]">
                    <Icon icon="mdi:map-marker" width={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                      Our Location
                    </p>
                    <p className="text-white text-sm leading-relaxed">
                      123 Gaming Street, Vientiane, Laos <br />
                      (Near Patuxay Monument)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-[#e53637]/10 rounded-xl flex items-center justify-center text-[#e53637]">
                    <Icon icon="mdi:phone" width={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                      Phone Number
                    </p>
                    <p className="text-white text-sm">+856 20 XXXX XXXX</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 bg-[#e53637]/10 rounded-xl flex items-center justify-center text-[#e53637]">
                    <Icon icon="mdi:email" width={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">
                      Email Support
                    </p>
                    <p className="text-white text-sm">
                      support@nocturastudio.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {["facebook", "instagram", "twitter", "discord"].map(
                    (social) => (
                      <button
                        key={social}
                        className="w-10 h-10 rounded-lg bg-[#0b0c2a] flex items-center justify-center text-white hover:bg-[#e53637] transition-all"
                      >
                        <Icon icon={`mdi:${social}`} width={20} />
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#151639] p-8 md:p-10 rounded-2xl border border-white/5 shadow-xl">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full bg-[#0b0c2a] border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#e53637] transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full bg-[#0b0c2a] border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#e53637] transition-colors"
                      placeholder="Email@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#0b0c2a] border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#e53637] transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full bg-[#0b0c2a] border border-white/10 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#e53637] transition-colors resize-none"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <Button className="w-full md:w-auto bg-[#e53637] hover:bg-[#c42d2d] text-white font-black uppercase tracking-widest py-7 px-10 rounded-xl shadow-lg shadow-[#e53637]/20 transition-all active:scale-95">
                  Send Message
                  <Icon icon="mdi:send" className="ml-2" width={18} />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* 3. Map Section (Mockup) */}
        <div className="mt-16 h-[400px] w-full rounded-2xl overflow-hidden grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 border border-white/5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60742.44199126233!2d102.57655162167969!3d17.960249500000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3124686fe4995555%3A0xc3910c28340d0f28!2sPatuxay%20Monument!5e0!3m2!1sen!2sla!4v1707000000000!5m2!1sen!2sla"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
