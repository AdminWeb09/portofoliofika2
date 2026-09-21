import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  FileText,
  CheckCircle2,
  Sparkles,
  Save,
  Clock,
  Phone,
  Globe,
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  ExternalLink,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link2,
  Eye,
  RefreshCw,
  AlertCircle,
  Check,
  Upload,
  UploadCloud,
  FileCheck,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { PersonalInfo, SocialLink } from '../../types.ts';

interface AdminProfileProps {
  isDark: boolean;
}

type ProfileTab = 'biodata' | 'media' | 'links';

const AVATAR_PRESETS = [
  {
    name: 'Modern Tech (Default)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Developer Casual',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'UI/UX Professional',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Minimalist Studio',
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
  },
];

const ABOUT_PRESETS = [
  {
    name: 'Workspace Coding',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Modern Laptop Desk',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Creative Studio',
    url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
  },
];

const PLATFORM_PRESETS = [
  'GitHub',
  'LinkedIn',
  'Instagram',
  'WhatsApp',
  'Twitter',
  'YouTube',
  'Behance',
  'Dribbble',
  'Medium',
  'Telegram',
  'Website',
];

export const AdminProfile: React.FC<AdminProfileProps> = ({ isDark }) => {
  const { personalInfo, updatePersonalInfo, isFirebaseConnected } = usePortfolio();
  const [activeTab, setActiveTab] = useState<ProfileTab>('biodata');
  const [formData, setFormData] = useState<PersonalInfo>({ ...personalInfo });
  const [isSaved, setIsSaved] = useState(false);
  const [newCustomLink, setNewCustomLink] = useState<{ platform: string; url: string; label: string }>({
    platform: 'Twitter',
    url: '',
    label: '',
  });
  const [showAddLinkForm, setShowAddLinkForm] = useState(false);
  const [avatarUploadError, setAvatarUploadError] = useState<string | null>(null);
  const [aboutUploadError, setAboutUploadError] = useState<string | null>(null);
  const [cvUploadError, setCvUploadError] = useState<string | null>(null);
  const [cvFileName, setCvFileName] = useState<string>('');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const aboutInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state when external context updates
  useEffect(() => {
    setFormData({ ...personalInfo });
  }, [personalInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare updated socialLinks synchronized with individual link fields
    const updatedSocialLinks: SocialLink[] = [...(formData.socialLinks || [])];

    // Helper to upsert a platform
    const upsertPlatform = (platform: string, url: string, defaultIcon: string, label: string) => {
      const idx = updatedSocialLinks.findIndex(
        (s) => s.platform.toLowerCase() === platform.toLowerCase()
      );
      if (url.trim()) {
        const item: SocialLink = {
          platform,
          url: url.trim(),
          icon: defaultIcon,
          label: label || url.trim(),
        };
        if (idx >= 0) {
          updatedSocialLinks[idx] = item;
        } else {
          updatedSocialLinks.push(item);
        }
      } else if (idx >= 0) {
        // remove if emptied
        updatedSocialLinks.splice(idx, 1);
      }
    };

    if (formData.githubUrl !== undefined) {
      upsertPlatform('GitHub', formData.githubUrl, 'Github', formData.githubUrl ? 'github.com/profile' : '');
    }
    if (formData.linkedinUrl !== undefined) {
      upsertPlatform('LinkedIn', formData.linkedinUrl, 'Linkedin', formData.linkedinUrl ? 'linkedin.com/profile' : '');
    }
    if (formData.instagramUrl !== undefined) {
      upsertPlatform('Instagram', formData.instagramUrl, 'Instagram', formData.instagramUrl ? '@profile' : '');
    }
    if (formData.whatsappUrl !== undefined) {
      upsertPlatform('WhatsApp', formData.whatsappUrl, 'MessageCircle', formData.phone || formData.whatsappUrl);
    }
    if (formData.websiteUrl !== undefined) {
      upsertPlatform('Website', formData.websiteUrl, 'Globe', formData.websiteUrl ? 'Website Pribadi' : '');
    }

    const payload: PersonalInfo = {
      ...formData,
      socialLinks: updatedSocialLinks,
    };

    await updatePersonalInfo(payload);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const handleAddCustomLink = () => {
    if (!newCustomLink.url.trim()) return;

    let iconName = 'Link2';
    const lower = newCustomLink.platform.toLowerCase();
    if (lower.includes('git')) iconName = 'Github';
    else if (lower.includes('link')) iconName = 'Linkedin';
    else if (lower.includes('insta')) iconName = 'Instagram';
    else if (lower.includes('whats') || lower.includes('wa')) iconName = 'MessageCircle';
    else if (lower.includes('web') || lower.includes('site') || lower.includes('blog')) iconName = 'Globe';
    else if (lower.includes('mail')) iconName = 'Mail';

    const newItem: SocialLink = {
      platform: newCustomLink.platform.trim(),
      url: newCustomLink.url.trim(),
      icon: iconName,
      label: newCustomLink.label.trim() || newCustomLink.platform.trim(),
    };

    const currentLinks = formData.socialLinks || [];
    const updated = [...currentLinks, newItem];

    setFormData({
      ...formData,
      socialLinks: updated,
    });

    setNewCustomLink({ platform: 'Twitter', url: '', label: '' });
    setShowAddLinkForm(false);
  };

  const handleRemoveCustomLink = (index: number) => {
    const current = [...(formData.socialLinks || [])];
    current.splice(index, 1);
    setFormData({
      ...formData,
      socialLinks: current,
    });
  };

  const handleUpdateSocialLinkField = (index: number, field: keyof SocialLink, value: string) => {
    const current = [...(formData.socialLinks || [])];
    current[index] = {
      ...current[index],
      [field]: value,
    };
    setFormData({
      ...formData,
      socialLinks: current,
    });
  };

  // Helper to process uploaded image file and convert to optimized base64
  const processImageFile = (
    file: File,
    onSuccess: (dataUrl: string) => void,
    onError: (err: string | null) => void,
    maxDimension: number = 800
  ) => {
    onError(null);
    if (!file.type.startsWith('image/')) {
      onError('File yang dipilih harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      onError('Ukuran gambar terlalu besar. Maksimal 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
          onSuccess(compressedDataUrl);
        } else {
          onSuccess(event.target?.result as string);
        }
      };
      img.onerror = () => {
        onError('Gagal memproses gambar. Format file mungkin rusak.');
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      onError('Gagal membaca file dari perangkat.');
    };
    reader.readAsDataURL(file);
  };

  // Helper to process CV document file (PDF, Word, or Document)
  const processCvFile = (file: File) => {
    setCvUploadError(null);
    if (file.size > 8 * 1024 * 1024) {
      setCvUploadError('Ukuran dokumen CV maksimal 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setFormData((prev) => ({ ...prev, cvUrl: dataUrl }));
      setCvFileName(file.name);
    };
    reader.onerror = () => {
      setCvUploadError('Gagal membaca dokumen file.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Edit Profil, Informasi Personal & Tautan Link
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Atur biodata manual, foto profil/avatar, tautan dokumen CV, serta seluruh link sosial media portofolio.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${
            isFirebaseConnected
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Firestore Sync Aktif</span>
          </span>
        </div>
      </div>

      {/* Profile Live Card Preview Banner */}
      <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center gap-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shrink-0 bg-slate-800">
            <img
              src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
              alt={formData.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`text-base font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {formData.name || 'Nama Anda'}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                {formData.yearsOfExperience || '3+ Thn'}
              </span>
            </div>
            <p className="text-xs text-indigo-400 font-medium mt-0.5">
              {formData.role || 'Frontend Developer'}
            </p>
            <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{formData.location || 'Indonesia'}</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium truncate max-w-[200px] sm:max-w-xs">{formData.availability}</span>
            </p>
          </div>
        </div>

        <div className="md:ml-auto flex items-center gap-2 flex-wrap">
          {formData.cvUrl && (
            <a
              href={formData.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download={formData.cvUrl.startsWith('data:') ? 'CV_Document.pdf' : undefined}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Lihat CV</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {formData.email && (
            <span className={`text-xs px-3 py-1.5 rounded-xl border ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
            }`}>
              {formData.email}
            </span>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('biodata')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'biodata'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>1. Biodata & Teks Manual</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('media')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'media'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>2. Foto Profil & Avatar</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('links')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
            activeTab === 'links'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Link2 className="w-4 h-4" />
          <span>3. Tautan Link & Dokumen</span>
          {formData.socialLinks && formData.socialLinks.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {formData.socialLinks.length}
            </span>
          )}
        </button>
      </div>

      {/* Success Notification */}
      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2.5 font-medium shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>Perubahan profil dan tautan berhasil disimpan ke Firebase Firestore & diterapkan langsung ke website!</span>
        </motion.div>
      )}

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className={`p-6 sm:p-8 rounded-3xl border space-y-6 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}
      >
        {/* TAB 1: BIODATA & TEKS MANUAL */}
        {activeTab === 'biodata' && (
          <div className="space-y-5">
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Informasi Biodata & Teks Deskripsi
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Edit seluruh konten teks manual yang tampil di Hero Section, About Section, dan kartu profil.
              </p>
            </div>

            {/* Name & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Nama Lengkap (Tampil di Hero & Footer)</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Dinda Fika"
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
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Contoh: Frontend Developer & UI/UX Enthusiast"
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
                <span>Tagline / Slogan Ringkas</span>
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="Contoh: Membangun pengalaman web yang modern, interaktif, dan performan tinggi."
                className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Email, Phone, Location & Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Email Publik</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contoh@gmail.com"
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Nomor Telepon / WhatsApp</span>
                </label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
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
                  placeholder="Contoh: Jakarta, Indonesia"
                  className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Lama Pengalaman</span>
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

            {/* Availability Status */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Status Ketersediaan Bekerja</span>
              </label>
              <input
                type="text"
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                placeholder="Contoh: Tersedia untuk proyek freelance & kesempatan kerja penuh waktu"
                className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-all ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Short Bio (Hero) */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-indigo-500" />
                <span>Bio Ringkas (Tampil di Hero Utama)</span>
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
          </div>
        )}

        {/* TAB 2: MEDIA & FOTO PROFIL */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Foto Profil Utama & Gambar Section (Upload Manual / Link)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Pilih foto langsung dari laptop/HP Anda secara manual (drag & drop / pilih file) atau gunakan tautan URL gambar eksternal.
              </p>
            </div>

            {/* Hidden File Inputs */}
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  processImageFile(
                    file,
                    (dataUrl) => {
                      setFormData((prev) => ({ ...prev, avatarUrl: dataUrl }));
                    },
                    setAvatarUploadError,
                    800
                  );
                }
              }}
            />

            <input
              ref={aboutInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  processImageFile(
                    file,
                    (dataUrl) => {
                      setFormData((prev) => ({ ...prev, aboutImageUrl: dataUrl }));
                    },
                    setAboutUploadError,
                    1000
                  );
                }
              }}
            />

            {/* 1. Main Avatar / Hero Image */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex flex-col md:flex-row gap-5 items-start">
                {/* Image Preview */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-lg bg-slate-900 relative group">
                    <img
                      src={formData.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
                      alt="Preview Avatar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Ganti Foto</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Preview Foto Hero</span>
                </div>

                {/* Upload & Link Controls */}
                <div className="flex-1 min-w-0 space-y-4 w-full">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Foto Profil Utama (Avatar Hero)</span>
                      </label>
                      {formData.avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, avatarUrl: '' })}
                          className="text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer"
                        >
                          Hapus / Reset Foto
                        </button>
                      )}
                    </div>

                    {/* Manual File Upload Drag & Drop Box */}
                    <div
                      onClick={() => avatarInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          processImageFile(
                            file,
                            (dataUrl) => setFormData((prev) => ({ ...prev, avatarUrl: dataUrl })),
                            setAvatarUploadError,
                            800
                          );
                        }
                      }}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center group ${
                        isDark
                          ? 'border-slate-700 hover:border-indigo-500 bg-slate-900/60 hover:bg-slate-900'
                          : 'border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
                        <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-indigo-400 group-hover:underline">
                            Klik untuk upload foto dari galeri/laptop Anda
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Atau seret & taruh (drag and drop) file gambar di sini (JPG, PNG, WebP • Maks. 5MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    {avatarUploadError && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{avatarUploadError}</span>
                      </p>
                    )}
                  </div>

                  {/* Option B: Direct URL Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Atau input URL Link Gambar (Opsional):
                    </label>
                    <input
                      type="text"
                      value={formData.avatarUrl?.startsWith('data:') ? 'Foto dari perangkat lokal (Base64 tersimpan)' : (formData.avatarUrl || '')}
                      disabled={formData.avatarUrl?.startsWith('data:')}
                      onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/... atau URL gambar online"
                      className={`w-full px-4 py-2 rounded-xl text-xs border font-mono transition-all ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Presets */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      Atau pilih cepat contoh foto preset:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {AVATAR_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, avatarUrl: preset.url })}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            formData.avatarUrl === preset.url
                              ? 'bg-indigo-600 text-white border-indigo-500'
                              : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Secondary Photo (About Section) */}
            <div className={`p-5 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex flex-col md:flex-row gap-5 items-start">
                {/* Image Preview */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-28 h-36 sm:w-32 sm:h-40 rounded-2xl overflow-hidden border-2 border-indigo-500/40 shadow-lg bg-slate-900 relative group">
                    <img
                      src={formData.aboutImageUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'}
                      alt="Preview About Photo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => aboutInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[11px] font-semibold gap-1 cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Ganti Foto</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Preview Foto About</span>
                </div>

                {/* Upload & Link Controls */}
                <div className="flex-1 min-w-0 space-y-4 w-full">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-purple-500" />
                        <span>Foto Sekunder (Section Tentang Saya / About)</span>
                      </label>
                      {formData.aboutImageUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, aboutImageUrl: '' })}
                          className="text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer"
                        >
                          Hapus / Reset Foto
                        </button>
                      )}
                    </div>

                    {/* Manual File Upload Drag & Drop Box */}
                    <div
                      onClick={() => aboutInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) {
                          processImageFile(
                            file,
                            (dataUrl) => setFormData((prev) => ({ ...prev, aboutImageUrl: dataUrl })),
                            setAboutUploadError,
                            1000
                          );
                        }
                      }}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center group ${
                        isDark
                          ? 'border-slate-700 hover:border-purple-500 bg-slate-900/60 hover:bg-slate-900'
                          : 'border-slate-300 hover:border-purple-500 bg-white hover:bg-purple-50/20'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
                        <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-semibold text-purple-400 group-hover:underline">
                            Klik untuk upload foto section About dari galeri/laptop Anda
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Atau seret & taruh (drag and drop) foto potret/workspace (JPG, PNG, WebP • Maks. 5MB)
                          </p>
                        </div>
                      </div>
                    </div>

                    {aboutUploadError && (
                      <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{aboutUploadError}</span>
                      </p>
                    )}
                  </div>

                  {/* Option B: Direct URL Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Atau input URL Link Gambar (Opsional):
                    </label>
                    <input
                      type="text"
                      value={formData.aboutImageUrl?.startsWith('data:') ? 'Foto dari perangkat lokal (Base64 tersimpan)' : (formData.aboutImageUrl || '')}
                      disabled={formData.aboutImageUrl?.startsWith('data:')}
                      onChange={(e) => setFormData({ ...formData, aboutImageUrl: e.target.value })}
                      placeholder="https://images.unsplash.com/... atau URL foto workspace"
                      className={`w-full px-4 py-2 rounded-xl text-xs border font-mono transition-all ${
                        isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  {/* Presets */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">
                      Atau pilih cepat contoh foto preset:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {ABOUT_PRESETS.map((preset) => (
                        <button
                          key={preset.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, aboutImageUrl: preset.url })}
                          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                            formData.aboutImageUrl === preset.url
                              ? 'bg-purple-600 text-white border-purple-500'
                              : isDark
                              ? 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TAUTAN LINK & DOKUMEN CV */}
        {activeTab === 'links' && (
          <div className="space-y-6">
            <div>
              <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Kelola Tautan Dokumen & Link Sosial Media
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Masukkan link CV / Resume, tautan profil GitHub, LinkedIn, Instagram, WhatsApp, website, serta tautan kustom tambahan.
              </p>
            </div>

            {/* Hidden CV File Input */}
            <input
              ref={cvInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  processCvFile(file);
                }
              }}
            />

            {/* 1. CV / Resume Link & Manual Upload */}
            <div className={`p-4 sm:p-5 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between gap-4 mb-2">
                <label className="block text-xs font-semibold flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>Dokumen CV / Resume (Upload Manual / Link Tautan)</span>
                </label>
                {formData.cvUrl && (
                  <div className="flex items-center gap-2">
                    {formData.cvUrl.startsWith('data:') ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        <FileCheck className="w-3 h-3" />
                        <span>File Terunggah</span>
                      </span>
                    ) : (
                      <a
                        href={formData.cvUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300"
                      >
                        <span>Uji Buka Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, cvUrl: '' });
                        setCvFileName('');
                      }}
                      className="text-[11px] text-red-400 hover:text-red-300 font-medium cursor-pointer ml-1"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>

              {/* Manual File Upload Box for CV */}
              <div
                onClick={() => cvInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    processCvFile(file);
                  }
                }}
                className={`p-3.5 rounded-xl border-2 border-dashed transition-all cursor-pointer text-center group mb-3 ${
                  isDark
                    ? 'border-slate-700 hover:border-indigo-500 bg-slate-900/60 hover:bg-slate-900'
                    : 'border-slate-300 hover:border-indigo-500 bg-white hover:bg-indigo-50/20'
                }`}
              >
                <div className="flex items-center justify-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-500">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-semibold text-indigo-400 group-hover:underline">
                      {cvFileName ? `Ganti Dokumen (${cvFileName})` : 'Klik atau seret file CV Anda ke sini'}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Format PDF, DOC, DOCX • Maksimal 8MB
                    </p>
                  </div>
                </div>
              </div>

              {cvUploadError && (
                <p className="text-xs text-red-400 mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{cvUploadError}</span>
                </p>
              )}

              {/* Link Input */}
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                Atau masukkan link URL dokumen (Google Drive, Dropbox, Cloud):
              </label>
              <input
                type="text"
                value={formData.cvUrl?.startsWith('data:') ? 'Dokumen file PDF/Doc dari perangkat lokal tersimpan' : (formData.cvUrl || '')}
                disabled={formData.cvUrl?.startsWith('data:')}
                onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
                placeholder="Contoh: https://drive.google.com/file/d/... atau https://my-portfolio.com/cv.pdf"
                className={`w-full px-4 py-2 rounded-xl text-xs border font-mono transition-all ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
              <p className="text-[11px] text-slate-400 mt-1.5">
                Pengunjung dapat langsung mengunduh atau membuka CV ini dari tombol di Hero Section.
              </p>
            </div>

            {/* 2. Core Social Links Form */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                Tautan Media Sosial Utama
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* GitHub */}
                <div>
                  <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tautan GitHub</span>
                  </label>
                  <input
                    type="url"
                    value={formData.githubUrl || ''}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono text-xs transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                    <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                    <span>Tautan LinkedIn</span>
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono text-xs transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5 text-pink-500" />
                    <span>Tautan Instagram</span>
                  </label>
                  <input
                    type="url"
                    value={formData.instagramUrl || ''}
                    onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                    placeholder="https://instagram.com/username"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono text-xs transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Tautan WhatsApp / wa.me</span>
                  </label>
                  <input
                    type="text"
                    value={formData.whatsappUrl || ''}
                    onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
                    placeholder="https://wa.me/6281234567890"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono text-xs transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                {/* Website / Blog */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Website Pribadi / Blog Eksternal</span>
                  </label>
                  <input
                    type="url"
                    value={formData.websiteUrl || ''}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                    placeholder="https://domain-anda.com"
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border font-mono text-xs transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 3. Daftar Tautan Tambahan (Custom Dynamic Links) */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                    Daftar Tautan Terdaftar ({formData.socialLinks?.length || 0})
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Tautan-tautan ini otomatis tampil di kartu kontak, Hero, dan Footer.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddLinkForm(!showAddLinkForm)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Link Baru</span>
                </button>
              </div>

              {/* Add New Link Drawer */}
              <AnimatePresence>
                {showAddLinkForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-2xl border ${
                      isDark ? 'bg-slate-950 border-indigo-500/40' : 'bg-indigo-50/70 border-indigo-200'
                    }`}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Platform / Layanan
                        </label>
                        <select
                          value={newCustomLink.platform}
                          onChange={(e) => setNewCustomLink({ ...newCustomLink, platform: e.target.value })}
                          className={`w-full px-3 py-2 rounded-xl text-xs border ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        >
                          {PLATFORM_PRESETS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          URL Tautan
                        </label>
                        <input
                          type="url"
                          required
                          value={newCustomLink.url}
                          onChange={(e) => setNewCustomLink({ ...newCustomLink, url: e.target.value })}
                          placeholder="https://..."
                          className={`w-full px-3 py-2 rounded-xl text-xs border font-mono ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Label Tampilan (Opsional)
                        </label>
                        <input
                          type="text"
                          value={newCustomLink.label}
                          onChange={(e) => setNewCustomLink({ ...newCustomLink, label: e.target.value })}
                          placeholder="Contoh: @username"
                          className={`w-full px-3 py-2 rounded-xl text-xs border ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => setShowAddLinkForm(false)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleAddCustomLink}
                        disabled={!newCustomLink.url.trim()}
                        className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
                      >
                        Tambahkan ke Profil
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Items List */}
              <div className="space-y-2">
                {formData.socialLinks && formData.socialLinks.length > 0 ? (
                  formData.socialLinks.map((item, idx) => (
                    <div
                      key={`${item.platform}-${idx}`}
                      className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                          <Link2 className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{item.platform}</span>
                            <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 truncate block max-w-[280px] sm:max-w-md">
                            {item.url}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1 ${
                            isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Tes</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleRemoveCustomLink(idx)}
                          className="p-2 rounded-lg border border-red-500/30 text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-all cursor-pointer"
                          title="Hapus Link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500 border border-dashed rounded-xl border-slate-800">
                    Belum ada tautan sosial media tambahan yang didaftarkan.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Perubahan otomatis tersinkronisasi ke Firebase Firestore & LocalStorage</span>
          </div>

          <button
            type="submit"
            id="admin-save-profile-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/40 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Perubahan Profil</span>
          </button>
        </div>
      </form>
    </div>
  );
};
