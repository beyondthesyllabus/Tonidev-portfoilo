import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";

    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (formData.whatsapp.trim() && !/^\+?[0-9\s\-()]{7,20}$/.test(formData.whatsapp.trim())) {
      tempErrors.whatsapp = "Please enter a valid WhatsApp number";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitSuccess(false);

    // Clear previous generic submit errors
    if (errors.submit) {
      setErrors(prev => {
        const { submit, ...rest } = prev;
        return rest;
      });
    }

    const apiUrl = import.meta.env.VITE_API_URL || '';

    try {
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
          message: formData.message
        })
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response from server:", text);
        throw new Error("Server returned an invalid response.");
      }

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', whatsapp: '', message: '' });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        setErrors(prev => ({
          ...prev,
          submit: data.message || "Failed to submit form. Please try again."
        }));
      }
    } catch (err) {
      console.error("Backend submission failed:", err);
      setErrors(prev => ({
        ...prev,
        submit: "Unable to connect to the backend server. Please try again later."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-[120px] bg-surface-container-lowest dark:bg-[#1e293b] transition-colors duration-300"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

          {/* Left Column: Information */}
          <div className="space-y-8 text-left">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-[48px] font-bold text-on-surface dark:text-white leading-tight tracking-tight">
                Let's Connect
              </h2>
              <div className="w-16 h-1.5 bg-primary dark:bg-blue-600 rounded-full"></div>
            </div>
            <p className="text-lg text-outline dark:text-slate-400 leading-relaxed max-w-xl">
              Have a project idea or want to talk about Web3, system architecture, or full stack development? I’m always open to new opportunities and meaningful tech discussions.
            </p>

            <div className="space-y-6 pt-4">
              {/* Email Contact Item */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-outline dark:text-slate-500 uppercase tracking-widest">
                    Email
                  </div>
                  <a
                    href="mailto:tonifavouretim@gmail.com"
                    className="text-base font-bold text-on-surface dark:text-white hover:text-primary dark:hover:text-blue-400 transition-colors"
                  >
                    tonifavouretim@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp Contact Item */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 dark:bg-green-950/20 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 2c-5.506 0-9.972 4.471-9.972 9.974 0 1.758.459 3.477 1.334 4.994l-1.42 5.19 5.302-1.391c1.462.798 3.109 1.218 4.752 1.219h.004c5.505 0 9.971-4.473 9.971-9.976 0-2.663-1.037-5.166-2.922-7.053C17.202 3.037 14.7 2 12.031 2zm6.99 14.079c-.285.803-1.43 1.457-1.982 1.514-.503.053-1.15.281-3.328-.621-2.784-1.155-4.577-4.004-4.716-4.189-.139-.185-1.109-1.478-1.109-2.82 0-1.343.702-2.003.953-2.274.25-.272.551-.34.737-.34h.528c.186 0 .438-.071.688.528.25.602.853 2.083.928 2.235.076.151.126.328.026.529-.1.201-.151.328-.302.503-.151.175-.316.39-.452.522-.151.151-.31.316-.134.619.176.302.78 1.282 1.674 2.079.882.787 1.627 1.029 1.854 1.139.227.11.36.092.493-.062.133-.154.572-.667.725-.893.153-.226.306-.188.513-.113.208.075 1.321.622 1.547.737.227.115.378.172.434.269.057.098.057.566-.228 1.369z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-semibold text-outline dark:text-slate-500 uppercase tracking-widest">
                    WhatsApp
                  </div>
                  <a
                    href={import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/qr/656J2WECIZUCH'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-bold text-on-surface dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors"
                  >
                    Direct Chat
                  </a>
                </div>
              </div>

              {/* Location Contact Item */}
              <div className="flex items-center gap-4 opacity-80 hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-primary/5 dark:bg-slate-800/60 flex items-center justify-center text-outline dark:text-slate-400 shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-outline dark:text-slate-500 uppercase tracking-widest">
                    Location
                  </div>
                  <div className="text-sm font-medium text-on-surface-variant dark:text-slate-400">
                    Nigeria (GMT+1) • Remote Friendly
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
            <div className="glass-card p-8 sm:p-10 rounded-xl border border-outline-variant/60 dark:border-slate-800 card-shadow">

              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800/50 rounded-lg flex items-start gap-3 text-green-800 dark:text-green-300 text-sm font-semibold animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500" />
                  <div>
                    <p className="font-bold">Message sent successfully!</p>
                    <p className="font-normal text-xs text-green-700 dark:text-green-400/90 mt-0.5">I'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 rounded-lg flex items-start gap-3 text-red-800 dark:text-red-300 text-sm font-semibold animate-fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                  <div>
                    <p className="font-bold">Submission failed</p>
                    <p className="font-normal text-xs text-red-700 dark:text-red-400/90 mt-0.5">{errors.submit}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant dark:text-slate-400 mb-2">
                    Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Your Name"
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${errors.name
                      ? 'border-red-500 focus:ring-red-500/25'
                      : 'border-outline-variant/60 dark:border-slate-800 focus:ring-primary focus:border-transparent'
                      }`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant dark:text-slate-400 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${errors.email
                      ? 'border-red-500 focus:ring-red-500/25'
                      : 'border-outline-variant/60 dark:border-slate-800 focus:ring-primary focus:border-transparent'
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* WhatsApp Input */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant dark:text-slate-400 mb-2">
                    WhatsApp Number <span className="text-xs font-normal text-slate-400 dark:text-slate-500"></span>
                  </label>
                  <input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    type="tel"
                    placeholder="+234..."
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${errors.whatsapp
                      ? 'border-red-500 focus:ring-red-500/25'
                      : 'border-outline-variant/60 dark:border-slate-800 focus:ring-primary focus:border-transparent'
                      }`}
                  />
                  {errors.whatsapp && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-semibold text-on-surface-variant dark:text-slate-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="How can I help you?"
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 transition-all ${errors.message
                      ? 'border-red-500 focus:ring-red-500/25'
                      : 'border-outline-variant/60 dark:border-slate-800 focus:ring-primary focus:border-transparent'
                      }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-500 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary dark:bg-blue-600 text-white py-4 rounded-lg font-bold hover-lift transition-standard flex items-center justify-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
