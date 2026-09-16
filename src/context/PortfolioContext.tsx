import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Skill, PersonalInfo, ContactMessage } from '../types.ts';
import { personalInfo as defaultPersonalInfo, projects as defaultProjects, skills as defaultSkills } from '../data/portfolioData.ts';

const STORAGE_KEYS = {
  PERSONAL_INFO: 'portfolio_personal_info_v1',
  PROJECTS: 'portfolio_projects_v1',
  SKILLS: 'portfolio_skills_v1',
  MESSAGES: 'portfolio_messages_v1',
  ADMIN_AUTH: 'portfolio_admin_auth_v1',
  ADMIN_CRED: 'portfolio_admin_credentials_v1',
};

const initialSampleMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Rian Hidayat',
    email: 'rian.h@techstartup.id',
    subject: 'Tawaran Proyek Frontend Web App',
    message: 'Halo Dinda, kami sangat terkesan dengan portofolio Anda khususnya proyek Nexus AI Dashboard. Apakah Anda bersedia untuk diskusi freelance pembuatan MVP kami?',
    createdAt: '2026-09-12T10:30:00Z',
    read: false,
  },
  {
    id: 'msg-2',
    name: 'Sarah Amanda',
    email: 'sarah.amanda@creativemedia.com',
    subject: 'Kolaborasi Desain & Coding UI/UX',
    message: 'Selamat siang, saya ingin mengajak Anda berkolaborasi untuk proyek redesign landing page klien kami bulan depan. Mohon informasi rate dan ketersediaan waktu Anda.',
    createdAt: '2026-09-14T14:15:00Z',
    read: true,
  },
];

interface PortfolioContextType {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  skills: Skill[];
  addSkill: (skill: Skill) => void;
  updateSkill: (name: string, skill: Partial<Skill>) => void;
  deleteSkill: (name: string) => void;
  messages: ContactMessage[];
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;
  unreadCount: number;
  isAdminLoggedIn: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => { success: boolean; error?: string };
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Personal Info state
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PERSONAL_INFO);
      return saved ? JSON.parse(saved) : defaultPersonalInfo;
    } catch {
      return defaultPersonalInfo;
    }
  });

  // Projects state
  const [projects, setProjectsState] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : defaultProjects;
    } catch {
      return defaultProjects;
    }
  });

  // Skills state
  const [skills, setSkillsState] = useState<Skill[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
      return saved ? JSON.parse(saved) : defaultSkills;
    } catch {
      return defaultSkills;
    }
  });

  // Messages state
  const [messages, setMessagesState] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : initialSampleMessages;
    } catch {
      return initialSampleMessages;
    }
  });

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Admin credentials (default: username 'admin' or 'dindafika686@gmail.com', pass 'admin123')
  const getCredentials = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_CRED);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      username: 'admin',
      email: 'dindafika686@gmail.com',
      password: 'admin123',
    };
  };

  // Sync states to LocalStorage
  const updatePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfoState(info);
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(info));
  };

  const addProject = (newProjectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    const updated = [newProject, ...projects];
    setProjectsState(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjectsState(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjectsState(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
  };

  const addSkill = (newSkill: Skill) => {
    const updated = [newSkill, ...skills];
    setSkillsState(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
  };

  const updateSkill = (name: string, updatedFields: Partial<Skill>) => {
    const updated = skills.map((s) => (s.name === name ? { ...s, ...updatedFields } : s));
    setSkillsState(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
  };

  const deleteSkill = (name: string) => {
    const updated = skills.filter((s) => s.name !== name);
    setSkillsState(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
  };

  const addMessage = (msg: { name: string; email: string; subject: string; message: string }) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [newMessage, ...messages];
    setMessagesState(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const markMessageRead = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessagesState(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessagesState(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const login = (usernameInput: string, passwordInput: string) => {
    const cred = getCredentials();
    const cleanUser = usernameInput.trim().toLowerCase();
    const cleanPass = passwordInput.trim();

    if (
      (cleanUser === cred.username.toLowerCase() || cleanUser === cred.email.toLowerCase()) &&
      cleanPass === cred.password
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return { success: true };
    }

    return {
      success: false,
      error: 'Username/Email atau Password salah. (Petunjuk: admin / admin123)',
    };
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const changePassword = (oldPass: string, newPass: string) => {
    const cred = getCredentials();
    if (oldPass !== cred.password) {
      return { success: false, error: 'Password lama tidak cocok.' };
    }
    if (newPass.length < 5) {
      return { success: false, error: 'Password baru minimal 5 karakter.' };
    }
    const updated = { ...cred, password: newPass };
    localStorage.setItem(STORAGE_KEYS.ADMIN_CRED, JSON.stringify(updated));
    return { success: true };
  };

  const resetToDefaults = () => {
    setPersonalInfoState(defaultPersonalInfo);
    setProjectsState(defaultProjects);
    setSkillsState(defaultSkills);
    setMessagesState(initialSampleMessages);
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(defaultPersonalInfo));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(defaultSkills));
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(initialSampleMessages));
  };

  const exportData = () => {
    const payload = {
      personalInfo,
      projects,
      skills,
      messages,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  };

  const importData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.personalInfo) updatePersonalInfo(parsed.personalInfo);
      if (Array.isArray(parsed.projects)) {
        setProjectsState(parsed.projects);
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(parsed.projects));
      }
      if (Array.isArray(parsed.skills)) {
        setSkillsState(parsed.skills);
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(parsed.skills));
      }
      if (Array.isArray(parsed.messages)) {
        setMessagesState(parsed.messages);
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(parsed.messages));
      }
      return { success: true };
    } catch {
      return { success: false, error: 'Format file JSON tidak valid.' };
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        personalInfo,
        updatePersonalInfo,
        projects,
        addProject,
        updateProject,
        deleteProject,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        messages,
        addMessage,
        markMessageRead,
        deleteMessage,
        unreadCount,
        isAdminLoggedIn,
        login,
        logout,
        changePassword,
        resetToDefaults,
        exportData,
        importData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
