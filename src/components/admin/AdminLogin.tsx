import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, User, KeyRound, Eye, EyeOff, ArrowLeft, ShieldAlert, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';

interface AdminLoginProps {
  onBackToSite: () => void;
  isDark: boolean;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite, isDark }) => {
  const { login, loginWithGoogle, isFirebaseConnected } = usePortfolio();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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

  const handleGoogleLogin = async () => {
    setError(null);
    setGoogleLoading(true);
    const res = await loginWithGoogle();
    setGoogleLoading(false);
    if (!res.success) {
      setError(res.error || 'Gagal login dengan akun Google.');
    }
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

        {/* Firebase Status Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
            isFirebaseConnected
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Firebase Firestore & Auth {isFirebaseConnected ? 'Aktif' : 'Terhubung'}</span>
          </span>
        </div>

        {/* Google Firebase Sign In */}
        <button
          type="button"
          id="admin-google-login-btn"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className={`w-full py-3 px-4 mb-5 rounded-xl text-sm font-semibold border transition-all flex items-center justify-center gap-3 cursor-pointer shadow-sm ${
            isDark
              ? 'bg-slate-800/90 border-slate-700 hover:bg-slate-700 text-white hover:border-slate-600'
              : 'bg-white border-slate-300 hover:bg-slate-50 text-slate-800 hover:border-slate-400'
          }`}
        >
          {googleLoading ? (
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Masuk dengan Google (Firebase Auth)</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center mb-5">
          <div className={`w-full border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`} />
          <span className={`absolute px-3 text-[11px] uppercase tracking-wider font-medium ${
            isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-slate-400'
          }`}>
            atau kredensial
          </span>
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
