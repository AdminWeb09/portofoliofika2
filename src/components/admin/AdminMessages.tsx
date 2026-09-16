import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  User,
  Inbox,
  Send,
  ExternalLink,
  Search,
  MessageSquare,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext.tsx';
import { ContactMessage } from '../../types.ts';

interface AdminMessagesProps {
  isDark: boolean;
}

export const AdminMessages: React.FC<AdminMessagesProps> = ({ isDark }) => {
  const { messages, markMessageRead, deleteMessage } = usePortfolio();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMessages = messages.filter((m) => {
    return (
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageRead(msg.id);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Pesan Masuk & Tawaran Proyek
          </h2>
          <p className={`text-xs sm:text-sm mt-0.5 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Pesan yang dikirimkan oleh pengunjung melalui formulir kontak di website utama.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pesan..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-all focus:outline-none ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>
      </div>

      {/* Grid: Message List on Left, Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List (5 cols) */}
        <div className={`lg:col-span-5 rounded-2xl border overflow-hidden ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="p-3 border-b border-slate-800/80 bg-slate-800/30 text-xs font-semibold flex items-center justify-between">
            <span>Daftar Pesan ({filteredMessages.length})</span>
            <span className="text-[11px] text-indigo-400 font-mono">
              {messages.filter((m) => !m.read).length} Belum Dibaca
            </span>
          </div>

          <div className="divide-y divide-slate-800/40 max-h-[560px] overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center">
                <Inbox className="w-8 h-8 mx-auto text-slate-500 mb-2" />
                <p className="text-xs text-slate-400">Belum ada pesan yang masuk.</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleSelect(msg)}
                  className={`p-3.5 transition-colors cursor-pointer relative ${
                    selectedMessage?.id === msg.id
                      ? isDark ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : 'bg-indigo-50/80 border-l-4 border-indigo-500'
                      : isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className={`text-xs font-bold truncate flex items-center gap-1.5 ${
                      !msg.read ? 'text-indigo-400' : isDark ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block shrink-0" />
                      )}
                      {msg.name}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>

                  <h5 className={`text-xs font-semibold line-clamp-1 mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-900'
                  }`}>
                    {msg.subject}
                  </h5>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {msg.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail (7 cols) */}
        <div className={`lg:col-span-7 rounded-2xl border p-6 min-h-[400px] flex flex-col justify-between ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {selectedMessage ? (
            <div className="space-y-4">
              {/* Message Header */}
              <div className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
                <div>
                  <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {selectedMessage.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1 text-indigo-400 font-semibold">
                      <User className="w-3.5 h-3.5" />
                      {selectedMessage.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5" />
                      {selectedMessage.email}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Clock className="w-3.5 h-3.5" />
                      {formatDate(selectedMessage.createdAt)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    deleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  title="Hapus Pesan"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Message Body */}
              <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                isDark ? 'bg-slate-950/70 text-slate-200 border border-slate-800' : 'bg-slate-50 text-slate-800 border border-slate-200'
              }`}>
                {selectedMessage.message}
              </div>

              {/* Reply Button via mailto */}
              <div className="pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Balasan: ${encodeURIComponent(selectedMessage.subject)}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Balas Langsung via Email ({selectedMessage.email})</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="my-auto text-center py-16">
              <MessageSquare className="w-10 h-10 mx-auto text-slate-500 mb-3" />
              <h4 className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Pilih pesan untuk membaca
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Klik salah satu pesan dari daftar di samping kiri untuk melihat detail isi pesan dan membalas pengirim.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
