import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, KeyRound, Eye, EyeOff, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';

interface AdminLoginProps {
  onBackToSite: () => void;
  isDark: boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite, isDark }) => {
  const { login } = usePortfolio();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError('Username atau Email wajib diisi.');
      return;
    }
    if (!password) {
      setError('Password wajib diisi.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = login(username, password);
      setLoading(false);
      if (!res.success) {
        setError(res.error || 'Login gagal.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Decorative background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDark ? 'bg-indigo-600/40' : 'bg-indigo-400/30'
        }`} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className={`relative w-full max-w-md p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-xl ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 shadow-indigo-500/5'
            : 'bg-white/95 border-slate-200 shadow-slate-200'
        }`}
      >
        {/* Back button */}
        <button
          onClick={onBackToSite}
          type="button"
          className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-6 transition-colors cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Website</span>
        </button>

        {/* Lock Icon & Title */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 mb-3">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className={`text-2xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Autentikasi Admin Panel
          </h2>
          <p className={`text-xs sm:text-sm mt-1.5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Masuk untuk mengelola proyek, keahlian, dan informasi portofolio Anda.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username / Email */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Username atau Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin atau dindafika686@gmail.com"
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={`block text-xs font-semibold mb-1.5 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 ${
                  isDark
                    ? 'bg-slate-950/80 border-slate-700 text-white focus:border-indigo-500 focus:ring-indigo-500/20'
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500 focus:ring-indigo-500/20'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 transition-all duration-200 shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Masuk ke Panel Admin</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick Fill */}
        <div className={`mt-6 pt-5 border-t text-center ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <p className="text-xs text-slate-400 mb-2">Kredensial Default:</p>
          <button
            type="button"
            onClick={handleFillDemo}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 border-slate-700 text-indigo-300 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-300 text-indigo-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Isi Otomatis: admin / admin123</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
