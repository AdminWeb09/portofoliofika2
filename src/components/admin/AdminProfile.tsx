import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Briefcase, FileText, CheckCircle2, Sparkles, Save, Clock } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { PersonalInfo } from '../../types.ts';

interface AdminProfileProps {
  isDark: boolean;
}

export const AdminProfile: React.FC<AdminProfileProps> = ({ isDark }) => {
  const { personalInfo, updatePersonalInfo } = usePortfolio();
  const [formData, setFormData] = useState<PersonalInfo>({ ...personalInfo });
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Edit Profil & Informasi Personal
        </h2>
        <p className={`text-xs sm:text-sm mt-0.5 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Ubah nama, peran, deskripsi bio, lokasi, dan status ketersediaan kerja yang tampil pada website.
        </p>
      </div>

      {/* Success Notification */}
      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5 font-medium"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Perubahan profil berhasil disimpan dan langsung diterapkan ke website!</span>
        </motion.div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {/* Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-500" />
              <span>Nama Lengkap</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-indigo-500" />
              <span>Headline / Peran Pekerjaan</span>
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tagline Singkat (Di Atas Nama Hero)</span>
          </label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
              isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Short Bio (Hero) */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Bio Ringkas (Tampil di Hero Section)</span>
          </label>
          <textarea
            rows={2}
            value={formData.bioShort}
            onChange={(e) => setFormData({ ...formData, bioShort: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
              isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Long Bio (About) */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Bio Narasi Lengkap (Tampil di About Section)</span>
          </label>
          <textarea
            rows={4}
            value={formData.bioLong}
            onChange={(e) => setFormData({ ...formData, bioLong: e.target.value })}
            className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
              isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Email & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-500" />
              <span>Email Publik</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-500" />
              <span>Domisili / Lokasi</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Availability & Experience */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Status Ketersediaan</span>
            </label>
            <input
              type="text"
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="Contoh: Terbuka untuk Proyek Baru & Full-time"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Pengalaman Kerja (Tahun)</span>
            </label>
            <input
              type="text"
              value={formData.yearsOfExperience}
              onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
              placeholder="Contoh: 3+ Tahun"
              className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* CV Link */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-indigo-500" />
            <span>Link Tautan CV / Resume</span>
          </label>
          <input
            type="text"
            value={formData.cvUrl}
            onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
            placeholder="# atau link Google Drive / URL file PDF"
            className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
              isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
