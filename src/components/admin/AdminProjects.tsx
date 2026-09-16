import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Search,
  Check,
  X,
  AlertTriangle,
  Layers,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { Project } from '../../types.ts';

interface AdminProjectsProps {
  isDark: boolean;
}

const DEFAULT_CATEGORIES: Project['category'][] = [
  'Web App',
  'E-Commerce',
  'Dashboard',
  'Landing Page',
];

const PRESET_IMAGES = [
  { label: 'Web App Code', url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80' },
  { label: 'Dashboard Tech', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80' },
  { label: 'E-Commerce Store', url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80' },
  { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80' },
  { label: 'Finance & Charts', url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=900&q=80' },
  { label: 'Healthcare & Mobile', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80' },
];

export const AdminProjects: React.FC<AdminProjectsProps> = ({ isDark }) => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    subtitle: '',
    category: 'Web App',
    description: '',
    fullDescription: '',
    features: [''],
    tags: ['React', 'Tailwind CSS'],
    image: PRESET_IMAGES[0].url,
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/dindafika',
    featured: false,
  });

  const [rawTags, setRawTags] = useState('React, Tailwind CSS, TypeScript');
  const [rawFeatures, setRawFeatures] = useState('Fitur pencarian real-time\nManajemen state efisien\nDesain responsif mobile & desktop');
  const [formError, setFormError] = useState<string | null>(null);

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProjectId(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'Web App',
      description: '',
      fullDescription: '',
      features: [],
      tags: [],
      image: PRESET_IMAGES[0].url,
      liveUrl: 'https://example.com/demo',
      githubUrl: 'https://github.com/dindafika/project',
      featured: false,
    });
    setRawTags('React, Tailwind CSS, TypeScript');
    setRawFeatures('Antarmuka responsif\nPencarian real-time\nArsitektur modular');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (project: Project) => {
    setEditingProjectId(project.id);
    setFormData({
      title: project.title,
      subtitle: project.subtitle,
      category: project.category,
      description: project.description,
      fullDescription: project.fullDescription,
      features: project.features || [],
      tags: project.tags || [],
      image: project.image,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: !!project.featured,
    });
    setRawTags((project.tags || []).join(', '));
    setRawFeatures((project.features || []).join('\n'));
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim()) {
      setFormError('Judul proyek wajib diisi.');
      return;
    }
    if (!formData.description.trim()) {
      setFormError('Deskripsi singkat proyek wajib diisi.');
      return;
    }
    if (!formData.image.trim()) {
      setFormError('URL gambar proyek wajib diisi.');
      return;
    }

    const processedTags = rawTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const processedFeatures = rawFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      tags: processedTags.length ? processedTags : ['Web Development'],
      features: processedFeatures.length ? processedFeatures : ['Antarmuka responsif'],
      fullDescription: formData.fullDescription || formData.description,
    };

    if (editingProjectId) {
      updateProject(editingProjectId, payload);
    } else {
      addProject(payload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProject(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Manajemen Proyek Portofolio
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Total {projects.length} proyek tersimpan. Anda dapat menambah, mengubah, atau menghapus proyek secara langsung.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, tag, atau deskripsi..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-all focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-xs'
            }`}
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
          {['all', ...DEFAULT_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Semua' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects List / Table */}
      <div className={`rounded-2xl border overflow-hidden shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="divide-y divide-slate-800/40">
          {filteredProjects.length === 0 ? (
            <div className="py-12 text-center">
              <Layers className="w-10 h-10 mx-auto text-slate-500 mb-2" />
              <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Tidak ada proyek yang sesuai
              </p>
              <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau kategori filter.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${
                  isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                }`}
              >
                {/* Media and Text Details */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-700/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    {project.featured && (
                      <span className="absolute top-1 right-1 p-0.5 rounded-md bg-indigo-600 text-white">
                        <Sparkles className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className={`text-sm sm:text-base font-bold leading-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {project.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-semibold border border-indigo-500/20">
                        {project.category}
                      </span>
                    </div>

                    <p className={`text-xs line-clamp-1 ${
                      isDark ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions: Edit, Delete, Live Links */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo"
                    className="p-2 rounded-lg border border-slate-700/60 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleOpenEditModal(project)}
                    type="button"
                    title="Edit Proyek"
                    className="p-2 rounded-lg border border-slate-700/60 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(project.id)}
                    type="button"
                    title="Hapus Proyek"
                    className="p-2 rounded-lg border border-slate-700/60 text-slate-400 hover:text-red-400 hover:border-red-500/40 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    {editingProjectId ? 'Edit Data Proyek' : 'Tambah Proyek Baru'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Data akan langsung tersinkronisasi ke website portofolio utama.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body Form */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Title and Subtitle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Judul Proyek <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Contoh: FinTrack App"
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Kategori <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    >
                      {DEFAULT_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Subjudul / Tagline Singkat
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Contoh: Modern Web App & Analytics Dashboard"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Deskripsi Singkat (Tampil di Kartu) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Jelaskan ringkasan proyek dalam 1-2 kalimat..."
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                {/* Full Description */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Deskripsi Lengkap (Tampil di Modal Detail)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.fullDescription}
                    onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                    placeholder="Jelaskan alur, arsitektur, dan solusi yang diimplementasikan secara rinci..."
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                {/* Features (one per line) */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Fitur Utama (Satu per baris)
                  </label>
                  <textarea
                    rows={3}
                    value={rawFeatures}
                    onChange={(e) => setRawFeatures(e.target.value)}
                    placeholder="Fitur 1&#10;Fitur 2&#10;Fitur 3"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border font-mono transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                {/* Tags (comma-separated) */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Tag Teknologi (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={rawTags}
                    onChange={(e) => setRawTags(e.target.value)}
                    placeholder="React, Tailwind CSS, TypeScript, Vite"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border font-mono transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                {/* Image URL & Preset Selection */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    URL Gambar Thumbnail <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>

                  {/* Preset Quick Image Buttons */}
                  <div className="mt-2 flex flex-wrap gap-1.5 items-center">
                    <span className="text-[11px] text-slate-400 mr-1">Pilih Cepat:</span>
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`text-[10px] px-2 py-1 rounded border transition-colors cursor-pointer ${
                          formData.image === preset.url
                            ? 'bg-indigo-600 text-white border-indigo-500'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Demo & GitHub URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      URL Live Demo
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      placeholder="https://myproject.com"
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      URL GitHub Repo
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      placeholder="https://github.com/dindafika/project"
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                {/* Featured checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-indigo-600 border-slate-700 focus:ring-indigo-500"
                  />
                  <label htmlFor="featured-checkbox" className="text-xs font-medium cursor-pointer">
                    Tandai sebagai Proyek Unggulan (Featured)
                  </label>
                </div>

                {/* Submit button inside form */}
                <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    {editingProjectId ? 'Simpan Perubahan' : 'Tambahkan Proyek'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative w-full max-w-sm p-6 rounded-2xl border shadow-2xl z-10 text-center ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 mx-auto flex items-center justify-center mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold">Hapus Proyek Ini?</h4>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Tindakan ini akan menghapus proyek dari database portofolio lokal Anda.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-700 text-xs font-semibold hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/30"
                >
                  Ya, Hapus
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
