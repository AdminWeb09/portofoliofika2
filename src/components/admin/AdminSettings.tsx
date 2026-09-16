import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KeyRound,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lock,
  FileJson,
  Shield,
  Save,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';

interface AdminSettingsProps {
  isDark: boolean;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ isDark }) => {
  const { changePassword, exportData, importData, resetToDefaults } = usePortfolio();

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ success?: boolean; msg?: string } | null>(null);

  // Import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; msg?: string } | null>(null);

  // Reset confirmation
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ success: false, msg: 'Konfirmasi password baru tidak cocok.' });
      return;
    }

    const res = changePassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordStatus({ success: true, msg: 'Password admin berhasil diubah!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordStatus({ success: false, msg: res.error });
    }
  };

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setImportStatus(null);
    if (!importJsonText.trim()) {
      setImportStatus({ success: false, msg: 'Silakan masukkan teks JSON data cadangan.' });
      return;
    }

    const res = importData(importJsonText);
    if (res.success) {
      setImportStatus({ success: true, msg: 'Data portofolio berhasil dipulihkan!' });
      setImportJsonText('');
    } else {
      setImportStatus({ success: false, msg: res.error });
    }
  };

  const handleReset = () => {
    resetToDefaults();
    setShowResetConfirm(false);
    setResetDone(true);
    setTimeout(() => setResetDone(false), 3500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
          isDark ? 'text-white' : 'text-slate-900'
        }`}>
          Pengaturan & Keamanan Admin
        </h2>
        <p className={`text-xs sm:text-sm mt-0.5 ${
          isDark ? 'text-slate-400' : 'text-slate-600'
        }`}>
          Ubah kata sandi admin, unduh cadangan data portofolio, atau pulihkan data kapan saja.
        </p>
      </div>

      {resetDone && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs sm:text-sm flex items-center gap-2.5 font-medium">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>Semua data portofolio berhasil di-reset ke kondisi awal (default).</span>
        </div>
      )}

      {/* 1. Ganti Password */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ganti Kata Sandi Admin
            </h3>
            <p className="text-xs text-slate-400">
              Perbarui kata sandi untuk mengamankan akses ke panel admin.
            </p>
          </div>
        </div>

        {passwordStatus && (
          <div className={`mb-4 p-3 rounded-xl border text-xs flex items-center gap-2 ${
            passwordStatus.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {passwordStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{passwordStatus.msg}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold mb-1">Kata Sandi Lama</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Masukkan password saat ini (default: admin123)"
              className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Kata Sandi Baru</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 5 karakter"
              className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1">Konfirmasi Kata Sandi Baru</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Ulangi kata sandi baru"
              className={`w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm border transition-all ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Kata Sandi Baru</span>
          </button>
        </form>
      </div>

      {/* 2. Backup & Export */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ekspor Cadangan Data (JSON)
            </h3>
            <p className="text-xs text-slate-400">
              Unduh seluruh konfigurasi proyek, keahlian, pesan, dan profil Anda ke dalam berkas JSON.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 my-3">
          Berkas ini dapat Anda simpan secara lokal dan dipulihkan kembali kapan saja di masa mendatang.
        </p>

        <button
          onClick={handleExport}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
        >
          <FileJson className="w-4 h-4 text-cyan-400" />
          <span>Unduh File Backup JSON</span>
        </button>
      </div>

      {/* 3. Pulihkan Data */}
      <div className={`p-6 sm:p-8 rounded-3xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Pulihkan Data dari JSON
            </h3>
            <p className="text-xs text-slate-400">
              Tempelkan isi file cadangan JSON untuk memulihkan seluruh data portofolio Anda.
            </p>
          </div>
        </div>

        {importStatus && (
          <div className={`my-3 p-3 rounded-xl border text-xs flex items-center gap-2 ${
            importStatus.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}>
            {importStatus.success ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{importStatus.msg}</span>
          </div>
        )}

        <form onSubmit={handleImportSubmit} className="space-y-3 mt-3">
          <textarea
            rows={3}
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            placeholder='Tempelkan teks JSON cadangan di sini (misal: {"personalInfo": ...})'
            className={`w-full p-3 rounded-xl text-xs font-mono border transition-all ${
              isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}
          />
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Terapkan Pemulihan Data</span>
          </button>
        </form>
      </div>

      {/* 4. Reset to Default */}
      <div className={`p-6 sm:p-8 rounded-3xl border border-red-500/20 ${
        isDark ? 'bg-red-950/10' : 'bg-red-50/50'
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-red-500/15 text-red-400">
            <RotateCcw className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-red-400">
              Reset ke Data Bawaan (Default Awal)
            </h3>
            <p className="text-xs text-slate-400">
              Kembalikan semua proyek, keahlian, dan informasi profil ke kondisi template asli bawaan sistem.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400 my-3">
          Peringatan: Tindakan ini tidak dapat dibatalkan kecuali Anda memiliki cadangan berkas JSON.
        </p>

        <button
          onClick={() => setShowResetConfirm(true)}
          type="button"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Semua Data Sekarang</span>
        </button>
      </div>

      {/* Reset Confirmation Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowResetConfirm(false)}
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
              <h4 className="text-base font-bold">Apakah Anda Yakin Ingin Mereset?</h4>
              <p className="text-xs text-slate-400 mt-1 mb-5">
                Semua proyek baru atau perubahan yang Anda buat akan dikembalikan ke data default.
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-700 text-xs font-semibold hover:bg-slate-800"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-600/30"
                >
                  Ya, Reset Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
