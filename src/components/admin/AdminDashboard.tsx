import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FolderGit2,
  Wrench,
  User,
  MessageSquare,
  Settings,
  LogOut,
  ArrowLeft,
  LayoutDashboard,
  ExternalLink,
  Sparkles,
  Plus,
  Inbox,
  ShieldCheck,
  Sun,
  Moon,
  Flame,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { AdminProjects } from './AdminProjects.tsx';
import { AdminSkills } from './AdminSkills.tsx';
import { AdminProfile } from './AdminProfile.tsx';
import { AdminMessages } from './AdminMessages.tsx';
import { AdminSettings } from './AdminSettings.tsx';

interface AdminDashboardProps {
  onBackToSite: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

type TabKey = 'overview' | 'projects' | 'skills' | 'profile' | 'messages' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  isDark,
  toggleTheme,
}) => {
  const {
    logout,
    projects,
    skills,
    messages,
    unreadCount,
    personalInfo,
    firebaseUser,
    isFirebaseConnected,
    isFirebaseSyncing,
    syncToFirebase,
  } = usePortfolio();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  const handleManualSync = async () => {
    setSyncMessage(null);
    const res = await syncToFirebase();
    if (res.success) {
      setSyncMessage('Data berhasil disinkronkan ke Firebase Firestore!');
      setTimeout(() => setSyncMessage(null), 4000);
    } else {
      setSyncMessage(`Gagal sinkron: ${res.error}`);
    }
  };

  const navTabs = [
    { key: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
    { key: 'projects', label: 'Proyek', icon: FolderGit2, badge: projects.length },
    { key: 'skills', label: 'Keahlian', icon: Wrench, badge: skills.length },
    { key: 'profile', label: 'Profil Saya', icon: User },
    { key: 'messages', label: 'Pesan Masuk', icon: MessageSquare, badge: unreadCount > 0 ? unreadCount : undefined, badgeAlert: unreadCount > 0 },
    { key: 'settings', label: 'Pengaturan & Keamanan', icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Top Navigation Bar */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-xl px-4 sm:px-8 py-3.5 transition-colors ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Status */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight">Panel Admin Portofolio</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                  Terotentikasi
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Halo, {personalInfo.name.split(' ')[0]} 👋
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2">
            {/* View public portfolio */}
            <button
              onClick={onBackToSite}
              type="button"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lihat Website</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Ubah Tema"
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Logout */}
            <button
              onClick={logout}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className={`p-3 rounded-2xl border sticky top-20 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-1 md:pb-0">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as TabKey)}
                    type="button"
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label}</span>
                    </div>

                    {tab.badge !== undefined && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : tab.badgeAlert
                          ? 'bg-red-500 text-white animate-pulse'
                          : isDark
                          ? 'bg-slate-800 text-slate-300'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Firebase Cloud Sync Banner */}
              <div className={`p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark ? 'bg-indigo-950/30 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
              }`}>
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xs sm:text-sm font-bold">Database: Firebase Firestore Cloud</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
                        Real-time Sync
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {firebaseUser ? (
                        <span>Login via Google: <strong className="text-indigo-400">{firebaseUser.email}</strong></span>
                      ) : (
                        <span>Perubahan data proyek, keahlian, dan profil otomatis tersinkronisasi ke Firebase.</span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleManualSync}
                    disabled={isFirebaseSyncing}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all cursor-pointer shadow-sm shadow-indigo-600/30"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isFirebaseSyncing ? 'animate-spin' : ''}`} />
                    <span>{isFirebaseSyncing ? 'Menyinkronkan...' : 'Sinkronkan ke Firestore'}</span>
                  </button>
                </div>
              </div>

              {syncMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{syncMessage}</span>
                </div>
              )}

              <div>
                <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  Ringkasan Portofolio
                </h2>
                <p className={`text-xs sm:text-sm mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Pantau metrik utama, proyek terbaru, dan pesan masuk dari calon klien Anda.
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  onClick={() => setActiveTab('projects')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-indigo-500/40' : 'bg-white border-slate-200 shadow-xs hover:border-indigo-400'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-3">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-indigo-500">{projects.length}</div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">Total Proyek</div>
                </div>

                <div
                  onClick={() => setActiveTab('skills')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-cyan-500/40' : 'bg-white border-slate-200 shadow-xs hover:border-cyan-400'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit mb-3">
                    <Wrench className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-cyan-400">{skills.length}</div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">Total Keahlian</div>
                </div>

                <div
                  onClick={() => setActiveTab('messages')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-amber-500/40' : 'bg-white border-slate-200 shadow-xs hover:border-amber-400'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-amber-400">{messages.length}</div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">Total Pesan Masuk</div>
                </div>

                <div
                  onClick={() => setActiveTab('messages')}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-red-500/40' : 'bg-white border-slate-200 shadow-xs hover:border-red-400'
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400 w-fit mb-3">
                    <Inbox className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-black text-red-400">{unreadCount}</div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">Pesan Belum Dibaca</div>
                </div>
              </div>

              {/* Quick Actions & Recent Items */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Projects */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-indigo-500" />
                      <span>Proyek Terbaru</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs text-indigo-400 hover:underline cursor-pointer"
                    >
                      Kelola Semua
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projects.slice(0, 3).map((p) => (
                      <div key={p.id} className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-800/40">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={p.image}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-10 h-8 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-bold">{p.title}</p>
                            <span className="text-[10px] text-slate-400">{p.category}</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                          {p.tags[0] || 'Dev'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Inquiries */}
                <div className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-500" />
                      <span>Pesan Masuk Terkini</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-indigo-400 hover:underline cursor-pointer"
                    >
                      Buka Kotak Masuk
                    </button>
                  </div>

                  <div className="space-y-3">
                    {messages.slice(0, 3).map((m) => (
                      <div
                        key={m.id}
                        onClick={() => setActiveTab('messages')}
                        className="p-2.5 rounded-xl bg-slate-800/40 text-xs cursor-pointer hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-slate-200 truncate">{m.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(m.createdAt).toLocaleDateString('id-ID')}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px] line-clamp-1">{m.subject}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && <AdminProjects isDark={isDark} />}
          {activeTab === 'skills' && <AdminSkills isDark={isDark} />}
          {activeTab === 'profile' && <AdminProfile isDark={isDark} />}
          {activeTab === 'messages' && <AdminMessages isDark={isDark} />}
          {activeTab === 'settings' && <AdminSettings isDark={isDark} />}
        </main>
      </div>
    </div>
  );
};
