import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
} from 'firebase/firestore';
import { Project, Skill, PersonalInfo, ContactMessage } from '../types.ts';
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  skills as defaultSkills,
} from '../data/portfolioData.ts';
import {
  db,
  auth,
  googleProvider,
  handleFirestoreError,
  OperationType,
  testConnection,
} from '../lib/firebase.ts';

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
    message:
      'Halo Dinda, kami sangat terkesan dengan portofolio Anda khususnya proyek Nexus AI Dashboard. Apakah Anda bersedia untuk diskusi freelance pembuatan MVP kami?',
    createdAt: '2026-09-12T10:30:00Z',
    read: false,
  },
  {
    id: 'msg-2',
    name: 'Sarah Amanda',
    email: 'sarah.amanda@creativemedia.com',
    subject: 'Kolaborasi Desain & Coding UI/UX',
    message:
      'Selamat siang, saya ingin mengajak Anda berkolaborasi untuk proyek redesign landing page klien kami bulan depan. Mohon informasi rate dan ketersediaan waktu Anda.',
    createdAt: '2026-09-14T14:15:00Z',
    read: true,
  },
];

export interface PortfolioContextType {
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: PersonalInfo) => Promise<void>;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  skills: Skill[];
  addSkill: (skill: Skill) => Promise<void>;
  updateSkill: (name: string, skill: Partial<Skill>) => Promise<void>;
  deleteSkill: (name: string) => Promise<void>;
  messages: ContactMessage[];
  addMessage: (msg: { name: string; email: string; subject: string; message: string }) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;
  unreadCount: number;
  isAdminLoggedIn: boolean;
  firebaseUser: User | null;
  isFirebaseConnected: boolean;
  isFirebaseSyncing: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  loginWithGoogle: () => Promise<{ success: boolean; error?: string; email?: string }>;
  logout: () => Promise<void>;
  changePassword: (oldPass: string, newPass: string) => { success: boolean; error?: string };
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => { success: boolean; error?: string };
  syncToFirebase: () => Promise<{ success: boolean; error?: string }>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const getSkillDocId = (name: string): string => {
  const slug = name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  return `skill_${slug}`;
};

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

  // Auth states
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);
  const [isFirebaseSyncing, setIsFirebaseSyncing] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Credentials for password-based local fallback
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

  // Test Firebase connection on mount
  useEffect(() => {
    testConnection().then((connected) => {
      setIsFirebaseConnected(connected);
    });
  }, []);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        setIsAdminLoggedIn(true);
        localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      }
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore Listeners
  useEffect(() => {
    // 1. Projects listener
    const unsubProjects = onSnapshot(
      collection(db, 'projects'),
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedProjects: Project[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              title: data.title || '',
              subtitle: data.subtitle || '',
              category: data.category || 'Web App',
              description: data.description || '',
              fullDescription: data.fullDescription || '',
              features: Array.isArray(data.features) ? data.features : [],
              tags: Array.isArray(data.tags) ? data.tags : [],
              image: data.image || '',
              liveUrl: data.liveUrl || '',
              githubUrl: data.githubUrl || '',
              featured: Boolean(data.featured),
            };
          });
          setProjectsState(fetchedProjects);
          localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(fetchedProjects));
        }
      },
      (error) => {
        console.warn('Firestore projects listener fallback:', error.message);
      }
    );

    // 2. Skills listener
    const unsubSkills = onSnapshot(
      collection(db, 'skills'),
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedSkills: Skill[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              name: data.name || '',
              category: data.category || 'frontend',
              icon: data.icon || 'Code2',
              level: typeof data.level === 'number' ? data.level : 80,
              experience: data.experience || '',
              tagline: data.tagline || '',
            };
          });
          setSkillsState(fetchedSkills);
          localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(fetchedSkills));
        }
      },
      (error) => {
        console.warn('Firestore skills listener fallback:', error.message);
      }
    );

    // 3. Profile listener
    const unsubProfile = onSnapshot(
      doc(db, 'profile', 'main'),
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as PersonalInfo;
          setPersonalInfoState(data);
          localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(data));
        }
      },
      (error) => {
        console.warn('Firestore profile listener fallback:', error.message);
      }
    );

    return () => {
      unsubProjects();
      unsubSkills();
      unsubProfile();
    };
  }, []);

  // Listen to messages only if Admin is logged in (to adhere to Firestore rules)
  useEffect(() => {
    if (!isAdminLoggedIn) return;

    const unsubMessages = onSnapshot(
      collection(db, 'messages'),
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedMessages: ContactMessage[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              name: data.name || '',
              email: data.email || '',
              subject: data.subject || '',
              message: data.message || '',
              createdAt: data.createdAt || new Date().toISOString(),
              read: Boolean(data.read),
            };
          });
          fetchedMessages.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setMessagesState(fetchedMessages);
          localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(fetchedMessages));
        }
      },
      (error) => {
        console.warn('Firestore messages listener note:', error.message);
      }
    );

    return () => unsubMessages();
  }, [isAdminLoggedIn]);

  // Mutations
  const updatePersonalInfo = async (info: PersonalInfo) => {
    setPersonalInfoState(info);
    localStorage.setItem(STORAGE_KEYS.PERSONAL_INFO, JSON.stringify(info));

    try {
      await setDoc(doc(db, 'profile', 'main'), info, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, 'profile/main');
    }
  };

  const addProject = async (newProjectData: Omit<Project, 'id'>) => {
    const newId = `proj-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newProject: Project = {
      ...newProjectData,
      id: newId,
    };
    const updated = [newProject, ...projects];
    setProjectsState(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'projects', newId), newProject);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `projects/${newId}`);
    }
  };

  const updateProject = async (id: string, updatedFields: Partial<Project>) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjectsState(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    try {
      await updateDoc(doc(db, 'projects', id), updatedFields);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `projects/${id}`);
    }
  };

  const deleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjectsState(updated);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  const addSkill = async (newSkill: Skill) => {
    const updated = [newSkill, ...skills];
    setSkillsState(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

    const docId = getSkillDocId(newSkill.name);
    try {
      await setDoc(doc(db, 'skills', docId), newSkill);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `skills/${docId}`);
    }
  };

  const updateSkill = async (name: string, updatedFields: Partial<Skill>) => {
    const updated = skills.map((s) => (s.name === name ? { ...s, ...updatedFields } : s));
    setSkillsState(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

    const docId = getSkillDocId(name);
    try {
      await updateDoc(doc(db, 'skills', docId), updatedFields);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `skills/${docId}`);
    }
  };

  const deleteSkill = async (name: string) => {
    const updated = skills.filter((s) => s.name !== name);
    setSkillsState(updated);
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));

    const docId = getSkillDocId(name);
    try {
      await deleteDoc(doc(db, 'skills', docId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `skills/${docId}`);
    }
  };

  const addMessage = async (msg: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const newId = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMessage: ContactMessage = {
      ...msg,
      id: newId,
      createdAt: new Date().toISOString(),
      read: false,
    };
    const updated = [newMessage, ...messages];
    setMessagesState(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'messages', newId), newMessage);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `messages/${newId}`);
    }
  };

  const markMessageRead = async (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m));
    setMessagesState(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

    try {
      await updateDoc(doc(db, 'messages', id), { read: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `messages/${id}`);
    }
  };

  const deleteMessage = async (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessagesState(updated);
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(updated));

    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `messages/${id}`);
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  // Sign in with Google (Firebase Auth)
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setFirebaseUser(user);
      setIsAdminLoggedIn(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return { success: true, email: user.email || undefined };
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return { success: false, error: msg };
    }
  };

  // Password-based login fallback
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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('Sign out error:', err);
    }
    setFirebaseUser(null);
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

  // Synchronize local dataset to Firebase Firestore
  const syncToFirebase = useCallback(async () => {
    setIsFirebaseSyncing(true);
    try {
      // 1. Sync Profile
      await setDoc(doc(db, 'profile', 'main'), personalInfo, { merge: true });

      // 2. Sync Projects
      for (const proj of projects) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }

      // 3. Sync Skills
      for (const sk of skills) {
        const docId = getSkillDocId(sk.name);
        await setDoc(doc(db, 'skills', docId), sk);
      }

      setIsFirebaseSyncing(false);
      return { success: true };
    } catch (error) {
      setIsFirebaseSyncing(false);
      const msg = error instanceof Error ? error.message : String(error);
      return { success: false, error: msg };
    }
  }, [personalInfo, projects, skills]);

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
        firebaseUser,
        isFirebaseConnected,
        isFirebaseSyncing,
        login,
        loginWithGoogle,
        logout,
        changePassword,
        resetToDefaults,
        exportData,
        importData,
        syncToFirebase,
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
