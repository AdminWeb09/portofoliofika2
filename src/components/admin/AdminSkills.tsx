import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Edit2,
  Trash2,
  Cpu,
  Search,
  AlertTriangle,
  X,
  Atom,
  FileCode2,
  Code,
  LayoutGrid,
  Globe,
  FileText,
  Server,
  Database,
  Network,
  Figma,
  GitBranch,
  Sparkles,
  CheckCircle2,
  Activity,
  Code2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { Skill } from '../../types.ts';

interface AdminSkillsProps {
  isDark: boolean;
}

const CATEGORIES: { id: Skill['category']; label: string }[] = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'tools', label: 'Tools' },
  { id: 'design', label: 'Design & UI/UX' },
];

const AVAILABLE_ICONS = [
  { name: 'Atom', label: 'React / Atom' },
  { name: 'FileCode2', label: 'TypeScript / Code' },
  { name: 'Code', label: 'JavaScript' },
  { name: 'LayoutGrid', label: 'Tailwind / CSS' },
  { name: 'Globe', label: 'Next.js / Web' },
  { name: 'FileText', label: 'HTML5' },
  { name: 'Server', label: 'Node.js / Express' },
  { name: 'Database', label: 'Database / SQL' },
  { name: 'Network', label: 'API / Network' },
  { name: 'Figma', label: 'Figma' },
  { name: 'GitBranch', label: 'Git / GitHub' },
  { name: 'Sparkles', label: 'Vite / Build' },
  { name: 'Activity', label: 'Motion' },
  { name: 'CheckCircle2', label: 'Testing' },
  { name: 'Code2', label: 'General Code' },
];

export const AdminSkills: React.FC<AdminSkillsProps> = ({ isDark }) => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkillName, setEditingSkillName] = useState<string | null>(null);
  const [deleteConfirmName, setDeleteConfirmName] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState<Skill>({
    name: '',
    category: 'frontend',
    icon: 'Atom',
    level: 85,
    experience: '2+ Tahun',
    tagline: 'Deskripsi penguasaan konsep & implementasi',
  });

  const [formError, setFormError] = useState<string | null>(null);

  const filteredSkills = skills.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingSkillName(null);
    setFormData({
      name: '',
      category: 'frontend',
      icon: 'Atom',
      level: 85,
      experience: '2+ Tahun',
      tagline: 'Penguasaan konsep dan implementasi arsitektur',
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (skill: Skill) => {
    setEditingSkillName(skill.name);
    setFormData({ ...skill });
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.name.trim()) {
      setFormError('Nama keahlian wajib diisi.');
      return;
    }

    if (!formData.tagline.trim()) {
      setFormError('Ringkasan / tagline keahlian wajib diisi.');
      return;
    }

    if (editingSkillName) {
      updateSkill(editingSkillName, formData);
    } else {
      // Check duplicate name
      if (skills.some((s) => s.name.toLowerCase() === formData.name.trim().toLowerCase())) {
        setFormError('Keahlian dengan nama ini sudah ada.');
        return;
      }
      addSkill({
        ...formData,
        name: formData.name.trim(),
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (name: string) => {
    deleteSkill(name);
    setDeleteConfirmName(null);
  };

  const renderIcon = (iconName: string) => {
    const cls = 'w-4 h-4';
    switch (iconName) {
      case 'Atom': return <Atom className={cls} />;
      case 'FileCode2': return <FileCode2 className={cls} />;
      case 'Code': return <Code className={cls} />;
      case 'LayoutGrid': return <LayoutGrid className={cls} />;
      case 'Globe': return <Globe className={cls} />;
      case 'FileText': return <FileText className={cls} />;
      case 'Server': return <Server className={cls} />;
      case 'Database': return <Database className={cls} />;
      case 'Network': return <Network className={cls} />;
      case 'Figma': return <Figma className={cls} />;
      case 'GitBranch': return <GitBranch className={cls} />;
      case 'Sparkles': return <Sparkles className={cls} />;
      case 'Activity': return <Activity className={cls} />;
      case 'CheckCircle2': return <CheckCircle2 className={cls} />;
      default: return <Code2 className={cls} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Manajemen Keahlian Teknis
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Total {skills.length} keahlian terdaftar. Anda dapat menambah, mengedit persentase, atau menghapus keahlian.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          type="button"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Keahlian</span>
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
            placeholder="Cari keahlian..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-all focus:outline-none focus:ring-2 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20 shadow-xs'
            }`}
          />
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              type="button"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : isDark
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className={`p-4 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg ${
                  isDark ? 'bg-slate-800 text-indigo-400' : 'bg-slate-100 text-indigo-600'
                }`}>
                  {renderIcon(skill.icon)}
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {skill.name}
                  </h4>
                  <span className="text-[10px] font-mono text-indigo-500 uppercase font-semibold">
                    {skill.category} • {skill.experience}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleOpenEditModal(skill)}
                  type="button"
                  title="Edit Keahlian"
                  className="p-1.5 rounded-md text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmName(skill.name)}
                  type="button"
                  title="Hapus Keahlian"
                  className="p-1.5 rounded-md text-slate-400 hover:text-red-400 hover:bg-slate-800"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className={`text-xs mb-3 line-clamp-2 min-h-[32px] ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {skill.tagline}
            </p>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="text-slate-400">Tingkat Penguasaan</span>
                <span className="font-bold text-indigo-500">{skill.level}%</span>
              </div>
              <div className={`w-full h-1.5 rounded-full overflow-hidden ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}>
                <div
                  style={{ width: `${skill.level}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Skill Modal */}
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
              className={`relative w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    {editingSkillName ? 'Edit Keahlian' : 'Tambah Keahlian Baru'}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Data keahlian akan langsung diperbarui di halaman utama.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
                {formError && (
                  <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Name & Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Nama Keahlian <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Misal: React.js, Docker, Python"
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
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Skill['category'] })}
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Experience & Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1">
                      Pengalaman Waktu
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="Misal: 3+ Tahun"
                      className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                        isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                      }`}
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold">Tingkat Penguasaan</label>
                      <span className="text-xs font-mono font-bold text-indigo-500">{formData.level}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                      className="w-full accent-indigo-600 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Icon Selector */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Pilih Ikon Representatif
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1">
                    {AVAILABLE_ICONS.map((icon) => (
                      <button
                        key={icon.name}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon: icon.name })}
                        className={`flex flex-col items-center p-2 rounded-xl border text-[10px] gap-1 transition-all cursor-pointer ${
                          formData.icon === icon.name
                            ? 'border-indigo-500 bg-indigo-500/20 text-indigo-400 font-bold'
                            : 'border-slate-700/60 bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {renderIcon(icon.name)}
                        <span className="truncate w-full text-center">{icon.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-xs font-semibold mb-1">
                    Ringkasan Kemampuan / Tagline <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="Contoh: Hooks, Context API, arsitektur modular dan optimasi render"
                    className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                      isDark ? 'bg-slate-950 border-slate-700' : 'bg-slate-50 border-slate-300'
                    }`}
                  />
                </div>

                {/* Submit button */}
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
                    {editingSkillName ? 'Simpan Perubahan' : 'Tambahkan Keahlian'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmName && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmName(null)}
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
              <h4 className="text-base font-bold">Hapus Keahlian "{deleteConfirmName}"?</h4>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Keahlian ini akan dihapus dari daftar skill portofolio Anda.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmName(null)}
                  className="flex-1 py-2 rounded-xl border border-slate-700 text-xs font-semibold hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmName)}
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
