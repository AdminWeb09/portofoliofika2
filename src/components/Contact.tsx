import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Send,
  MapPin,
  Clock,
  Github,
  Linkedin,
  Instagram,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Phone,
  Globe,
  MessageCircle,
  Link2,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';
import { ContactFormData } from '../types.ts';

interface ContactProps {
  isDark: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDark }) => {
  const { personalInfo, addMessage, socialLinks } = usePortfolio();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nama minimal 2 karakter.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Format alamat email tidak valid.';
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subjek pesan wajib diisi.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Isi pesan wajib diisi.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Pesan minimal 10 karakter agar lebih informatif.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Save message to context & Firebase Firestore
      await addMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setErrors({});
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getSocialIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('git')) return <Github className="w-4 h-4" />;
    if (p.includes('link')) return <Linkedin className="w-4 h-4" />;
    if (p.includes('insta')) return <Instagram className="w-4 h-4" />;
    if (p.includes('whats') || p.includes('wa')) return <MessageCircle className="w-4 h-4" />;
    if (p.includes('web') || p.includes('site') || p.includes('blog')) return <Globe className="w-4 h-4" />;
    if (p.includes('mail')) return <Mail className="w-4 h-4" />;
    return <Link2 className="w-4 h-4" />;
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className={`absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDark ? 'bg-indigo-600/30' : 'bg-indigo-300/40'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hubungi Saya</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Mari Bekerja Sama Mewujudkan Ide Hebat Anda
          </h2>
          <p className={`mt-3 text-base sm:text-lg ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Punya ide proyek, tawaran kolaborasi, atau sekadar ingin menyapa? Pintu saya selalu terbuka untuk berdiskusi.
          </p>
        </div>

        {/* 2-Column Content: Left Contact Info, Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Informasi Kontak Langsung
              </h3>
              <p className={`text-sm leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Silakan kirim pesan melalui formulir di samping, atau hubungi saya langsung melalui kanal komunikasi berikut:
              </p>

              {/* Direct Info Cards */}
              <div className="space-y-3.5">
                {/* Email */}
                <a
                  id="contact-direct-email"
                  href={`mailto:${personalInfo.email}`}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                    isDark
                      ? 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-indigo-500/40 text-slate-200'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-sm text-slate-800'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Email</h4>
                    <p className="text-sm font-semibold mt-0.5 text-indigo-500 hover:underline break-all">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                {/* Phone / WhatsApp if provided */}
                {personalInfo.phone && (
                  <a
                    id="contact-direct-phone"
                    href={personalInfo.whatsappUrl || `https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-emerald-500/40 text-slate-200'
                        : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-sm text-slate-800'
                    }`}
                  >
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Telepon / WhatsApp</h4>
                      <p className="text-sm font-semibold mt-0.5 hover:text-emerald-500 transition-colors">
                        {personalInfo.phone}
                      </p>
                    </div>
                  </a>
                )}

                {/* Location */}
                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl border ${
                    isDark
                      ? 'bg-slate-800/70 border-slate-700/80 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Lokasi</h4>
                    <p className="text-sm font-semibold mt-0.5">
                      {personalInfo.location}
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div
                  className={`flex items-start gap-4 p-4 rounded-2xl border ${
                    isDark
                      ? 'bg-slate-800/70 border-slate-700/80 text-slate-200'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Status</h4>
                    <p className="text-sm font-semibold mt-0.5 text-emerald-500">
                      {personalInfo.availability}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h4 className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Kanal Sosial Media:
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    id={`contact-social-${social.platform.toLowerCase()}`}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                      isDark
                        ? 'bg-slate-800/50 border-slate-700/80 text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800'
                        : 'bg-white border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-xs'
                    }`}
                  >
                    <span className="text-indigo-500">{getSocialIcon(social.platform)}</span>
                    <span className="font-semibold">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${
              isDark
                ? 'bg-slate-800/80 border-slate-700/80'
                : 'bg-white border-slate-200'
            }`}>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    Pesan Anda Berhasil Terkirim!
                  </h3>
                  <p className={`text-sm max-w-md mx-auto mb-6 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Terima kasih telah menghubungi saya. Saya akan meninjau pesan Anda dan segera memberikan tanggapan melalui email dalam waktu 1x24 jam.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    type="button"
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md shadow-indigo-600/30"
                  >
                    Kirim Pesan Lainnya
                  </button>
                </motion.div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-700/30">
                    <h3 className={`text-xl font-bold ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      Kirim Pesan Langsung
                    </h3>
                    <span className="text-xs text-indigo-500 font-medium flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Respons Cepat
                    </span>
                  </div>

                  {/* Name and Email Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className={`block text-xs font-semibold mb-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Contoh: Budi Pratama"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-red-500/80 focus:ring-red-500/30'
                            : isDark
                            ? 'bg-slate-900/90 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className={`block text-xs font-semibold mb-1.5 ${
                          isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                      >
                        Alamat Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@email.com"
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-red-500/80 focus:ring-red-500/30'
                            : isDark
                            ? 'bg-slate-900/90 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                            : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Subjek Pesan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Misal: Penawaran Kolaborasi Proyek Website"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.subject
                          ? 'border-red-500/80 focus:ring-red-500/30'
                          : isDark
                          ? 'bg-slate-900/90 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}
                    >
                      Pesan Anda <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ceritakan gambaran singkat kebutuhan atau ide proyek Anda..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-y ${
                        errors.message
                          ? 'border-red-500/80 focus:ring-red-500/30'
                          : isDark
                          ? 'bg-slate-900/90 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition-all duration-200 shadow-md shadow-indigo-600/30 cursor-pointer text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Mengirim Pesan...</span>
                      </>
                    ) : (
                      <>
                        <span>Kirimkan Pesan</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
