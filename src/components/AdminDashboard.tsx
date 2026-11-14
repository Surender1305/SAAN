import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Boxes,
  Wrench,
  Info,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Eye,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Lock,
  LogOut,
  X,
  AlertCircle,
  Mail,
  Code,
  ArrowUp,
  ArrowDown,
  Copy,
  KeyRound,
  Image as ImageIcon,
  EyeOff,
} from 'lucide-react';
import {
  useContent,
  HeroContent,
  ServiceItem,
  ServicesSectionContent,
  ProductsSectionContent,
  AboutContent,
  AboutValue,
  ContactContent,
  CompanyContent,
  SERVICE_COLOR_PRESETS,
} from '../context/ContentContext';
import { Project } from '../data/projects';
import { DynamicIcon, AVAILABLE_ICONS } from '../utils/iconMap';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabId = 'overview' | 'hero' | 'products' | 'services' | 'about' | 'contact' | 'backup';

const AUTH_SESSION_KEY = 'reliant_adminrss_auth';

export default function AdminDashboard({ onClose }: AdminDashboardProps) {
  const {
    content,
    updateHero,
    updateServicesSection,
    addService,
    updateService,
    deleteService,
    moveService,
    updateProductsSection,
    addProject,
    updateProject,
    deleteProject,
    moveProject,
    updateAbout,
    updateContact,
    updateCompany,
    resetToDefaults,
    importContent,
    exportContent,
    verifyPasscode,
    updatePasscode,
    lastUpdated,
  } = useContent();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synced local form states
  const [heroForm, setHeroForm] = useState<HeroContent>(content.hero);
  const [servicesHeaderForm, setServicesHeaderForm] = useState({
    eyebrow: content.servicesSection.eyebrow,
    headingRegular: content.servicesSection.headingRegular,
    headingGradient: content.servicesSection.headingGradient,
    subtitle: content.servicesSection.subtitle,
  });
  const [productsHeaderForm, setProductsHeaderForm] = useState<ProductsSectionContent>(content.productsSection);
  const [aboutForm, setAboutForm] = useState<AboutContent>(content.about);
  const [contactForm, setContactForm] = useState<ContactContent>(content.contact);
  const [companyForm, setCompanyForm] = useState<CompanyContent>(content.company);

  useEffect(() => {
    setHeroForm(content.hero);
  }, [content.hero]);

  useEffect(() => {
    setServicesHeaderForm({
      eyebrow: content.servicesSection.eyebrow,
      headingRegular: content.servicesSection.headingRegular,
      headingGradient: content.servicesSection.headingGradient,
      subtitle: content.servicesSection.subtitle,
    });
  }, [content.servicesSection]);

  useEffect(() => {
    setProductsHeaderForm(content.productsSection);
  }, [content.productsSection]);

  useEffect(() => {
    setAboutForm(content.about);
  }, [content.about]);

  useEffect(() => {
    setContactForm(content.contact);
  }, [content.contact]);

  useEffect(() => {
    setCompanyForm(content.company);
  }, [content.company]);

  // Product modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState<Omit<Project, 'id'>>({
    title: '',
    tagline: '',
    description: '',
    longDescription: '',
    category: 'Device Management',
    targetAudience: '',
    platforms: '',
    highlights: [],
    technologies: [],
    status: 'completed',
    image: '/MobiAsset.png',
    clientName: 'Reliant Enterprise Suite',
    year: new Date().getFullYear().toString(),
    liveUrl: '',
  });

  // Service modal state
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<Omit<ServiceItem, 'id'>>({
    title: '',
    description: '',
    iconName: 'Globe',
    color: SERVICE_COLOR_PRESETS[0].color,
    shadowColor: SERVICE_COLOR_PRESETS[0].shadowColor,
  });

  // Import JSON modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState('');

  // Passcode update state
  const [passcodeForm, setPasscodeForm] = useState({
    current: '',
    next: '',
    confirm: '',
  });
  const [passcodeError, setPasscodeError] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPasscode(passwordInput)) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      setLoginError(false);
      setPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_SESSION_KEY);
  };

  // Section saves
  const handleSaveHero = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateHero(heroForm);
    showToast('Hero section updated.');
  };

  const handleSaveProductsHeader = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateProductsSection(productsHeaderForm);
    showToast('Products section header updated.');
  };

  const handleSaveServicesHeader = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateServicesSection(servicesHeaderForm as Partial<ServicesSectionContent>);
    showToast('Services section header updated.');
  };

  const handleSaveAbout = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateAbout(aboutForm);
    showToast('About section updated.');
  };

  const handleSaveContactAndCompany = (e?: React.FormEvent) => {
    e?.preventDefault();
    updateContact(contactForm);
    updateCompany(companyForm);
    showToast('Contact & footer settings updated.');
  };

  // Product modal handlers
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      tagline: '',
      description: '',
      longDescription: '',
      category: 'Enterprise Software',
      targetAudience: 'Enterprise & Multi-Site Operations',
      platforms: 'Web · Android · iOS',
      iconName: 'Layers',
      accentTheme: 'orange',
      highlights: [],
      technologies: [],
      status: 'completed',
      image: '/MobiAsset.png',
      clientName: 'Reliant Enterprise Suite',
      year: new Date().getFullYear().toString(),
      liveUrl: '',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (project: Project) => {
    setEditingProductId(project.id);
    setProductForm({
      title: project.title,
      tagline: project.tagline || '',
      description: project.description,
      longDescription: project.longDescription,
      category: project.category,
      targetAudience: project.targetAudience || '',
      platforms: project.platforms || '',
      highlights: project.highlights ? [...project.highlights] : [],
      iconName: project.iconName,
      accentTheme: project.accentTheme,
      technologies: project.technologies ? [...project.technologies] : [],
      status: project.status,
      image: project.image,
      clientName: project.clientName,
      year: project.year,
      liveUrl: project.liveUrl || '',
    });
    setIsProductModalOpen(true);
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 600 * 1024) {
      showToast('Please choose an image under 600KB or enter an image URL.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProductForm((prev) => ({ ...prev, image: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title.trim()) return;

    const payload: Omit<Project, 'id'> = {
      ...productForm,
      title: productForm.title.trim(),
      liveUrl: productForm.liveUrl?.trim() || undefined,
      highlights: (productForm.highlights || []).map((h) => h.trim()).filter(Boolean),
      technologies: productForm.technologies || [],
    };

    if (editingProductId) {
      updateProject(editingProductId, payload);
      showToast(`Updated product "${payload.title}".`);
    } else {
      addProject(payload);
      showToast(`Added product "${payload.title}".`);
    }
    setIsProductModalOpen(false);
  };

  // Service modal handlers
  const openAddServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      title: '',
      description: '',
      iconName: 'Globe',
      color: SERVICE_COLOR_PRESETS[0].color,
      shadowColor: SERVICE_COLOR_PRESETS[0].shadowColor,
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (service: ServiceItem) => {
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      description: service.description,
      iconName: service.iconName,
      color: service.color,
      shadowColor: service.shadowColor,
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title.trim()) return;

    if (editingServiceId) {
      updateService(editingServiceId, serviceForm);
      showToast(`Updated service "${serviceForm.title}".`);
    } else {
      addService(serviceForm);
      showToast(`Added service "${serviceForm.title}".`);
    }
    setIsServiceModalOpen(false);
  };

  // About value helpers
  const handleAddAboutValue = () => {
    const newVal: AboutValue = {
      id: `val-${Date.now()}`,
      iconName: 'CheckCircle',
      title: 'New Value',
      desc: 'Describe how this pillar drives client success.',
      color: 'text-[#fd7200]',
    };
    setAboutForm((prev) => ({
      ...prev,
      values: [...prev.values, newVal],
    }));
  };

  const handleRemoveAboutValue = (id: string) => {
    setAboutForm((prev) => ({
      ...prev,
      values: prev.values.filter((v) => v.id !== id),
    }));
  };

  // Export & Import
  const handleExportDownload = () => {
    const blob = new Blob([exportContent()], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reliant-cms-content-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Downloaded CMS JSON backup.');
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(exportContent());
      showToast('Copied JSON configuration to clipboard.');
    } catch {
      showToast('Unable to copy automatically — select from preview below.');
    }
  };

  const handleCopyProjectsTs = async () => {
    const snippet = `export interface Project {\n  id: string;\n  title: string;\n  description: string;\n  longDescription: string;\n  category: string;\n  technologies: string[];\n  status: 'completed' | 'in-progress' | 'mvp';\n  image: string;\n  clientName: string;\n  year: string;\n  liveUrl?: string;\n}\n\nexport const defaultProjects: Project[] = ${JSON.stringify(content.projects, null, 2)};\n`;
    try {
      await navigator.clipboard.writeText(snippet);
      showToast('Copied projects.ts snippet to clipboard.');
    } catch {
      showToast('Unable to copy automatically.');
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImportJsonText(reader.result);
        setImportError('');
      }
    };
    reader.readAsText(file);
  };

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = importContent(importJsonText);
    if (success) {
      setIsImportModalOpen(false);
      setImportJsonText('');
      setImportError('');
      showToast('Imported CMS content successfully.');
    } else {
      setImportError('Invalid JSON structure. Please verify the file or JSON payload.');
    }
  };

  const handleUpdatePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');
    if (passcodeForm.next !== passcodeForm.confirm) {
      setPasscodeError('New passcodes do not match.');
      return;
    }
    const res = updatePasscode(passcodeForm.current, passcodeForm.next);
    if (!res.ok) {
      setPasscodeError(res.error || 'Could not update passcode.');
      return;
    }
    setPasscodeForm({ current: '', next: '', confirm: '' });
    showToast('Admin passcode updated.');
  };

  const handleReset = () => {
    if (
      window.confirm(
        'Reset all CMS content back to the original codebase defaults? Any unsaved/local edits will be reverted.'
      )
    ) {
      resetToDefaults();
      showToast('All CMS content reset to defaults.');
    }
  };

  // Auth Gate Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#00122b] via-[#011f4b] to-[#0a3678] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#fd7200]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl relative z-10">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            title="Back to Website"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-8">
            <img
              src="/logo.png"
              alt="Reliant Software Solutions"
              className="h-14 w-auto object-contain mx-auto mb-4"
            />
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#fd7200] text-xs font-semibold mb-3">
              <Lock className="w-3.5 h-3.5" />
              /adminrss CMS Portal
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sign in to manage products, services, and website copy
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Admin Passcode
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError(false);
                  }}
                  placeholder="Enter admin passcode..."
                  className="w-full px-4 py-3 pr-11 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#fd7200] focus:ring-4 focus:ring-orange-500/10 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Incorrect passcode. Please try again.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#fd7200] to-[#e06500] hover:shadow-lg hover:shadow-orange-500/25 text-white font-semibold rounded-xl transition-all"
            >
              Unlock CMS Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-[#011f4b] font-medium inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to live website
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems: { id: TabId; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero & Headlines', icon: Sparkles },
    { id: 'products', label: 'Products & Work', icon: Boxes, badge: content.projects.length },
    { id: 'services', label: 'Services', icon: Wrench, badge: content.servicesSection.items.length },
    { id: 'about', label: 'About & Values', icon: Info },
    { id: 'contact', label: 'Contact & Footer', icon: Mail },
    { id: 'backup', label: 'Backup, Sync & Security', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[120] bg-[#011f4b] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#fd7200]/40 animate-slide-up">
          <CheckCircle className="w-5 h-5 text-[#fd7200] shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img src="/icon.png" alt="Reliant" className="w-9 h-9 object-contain" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-bold text-[#011f4b] text-base leading-tight">Reliant Website CMS</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                LIVE SYNC
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono bg-gray-100 text-gray-600 border border-gray-200">
                /adminrss
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Updates reflect immediately in your browser • Last saved: {lastUpdated}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors"
            title="Open live website in new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>New Tab</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#011f4b] hover:bg-[#0a3678] text-white font-semibold text-xs transition-colors shadow-sm"
            title="Return to Live Website"
          >
            <Eye className="w-4 h-4 text-[#fd7200]" />
            <span className="hidden sm:inline">View Live Site</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-gray-600 hover:text-red-600 hover:bg-red-50 text-xs font-medium transition-colors"
            title="Reset all content to defaults"
          >
            <RotateCcw className="w-4 h-4 inline sm:mr-1" />
            <span className="hidden md:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 text-xs font-medium transition-colors"
            title="Lock CMS"
          >
            <LogOut className="w-4 h-4 inline sm:mr-1" />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-2">
            Site Sections
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? 'bg-[#011f4b] text-white shadow-md shadow-[#011f4b]/20'
                    : 'text-gray-600 hover:bg-gray-200/60 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${active ? 'text-[#fd7200]' : ''}`} />
                  <span>{item.label}</span>
                </div>
                {typeof item.badge === 'number' && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      active ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <main className="flex-1 bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-sm min-w-0">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#011f4b]">Welcome to Reliant CMS</h2>
                <p className="text-gray-600 text-sm mt-1">
                  Manage headlines, services, products, about narrative, contact settings, and footer branding from one place.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Products</span>
                    <Boxes className="w-5 h-5 text-[#fd7200]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#011f4b]">{content.projects.length}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    {content.projects.filter((p) => p.status === 'completed').length} completed •{' '}
                    {content.projects.filter((p) => p.status !== 'completed').length} active/MVP
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Services</span>
                    <Wrench className="w-5 h-5 text-[#011f4b]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#011f4b]">
                    {content.servicesSection.items.length}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Shown in Services grid & Footer</p>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Company Values</span>
                    <Sparkles className="w-5 h-5 text-[#fd7200]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#011f4b]">{content.about.values.length}</div>
                  <p className="text-xs text-gray-500 mt-1">Displayed in About Us section</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 text-base">Quick Actions</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('products')}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-[#fd7200]/40 bg-gray-50 hover:bg-white text-left transition-all group flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-[#fd7200] group-hover:bg-[#fd7200] group-hover:text-white transition-colors">
                      <Boxes className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Manage Products</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Add new products, update screenshots, tech stacks, and live links.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('hero')}
                    className="p-4 rounded-2xl border border-gray-200 hover:border-[#011f4b]/30 bg-gray-50 hover:bg-white text-left transition-all group flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-[#011f4b]/10 text-[#011f4b] group-hover:bg-[#011f4b] group-hover:text-white transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">Edit Hero Headlines</h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Update top badge, headline copy, subtitle, and action buttons.
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-amber-950 text-sm">Storage & Publishing Info</h4>
                  <p className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
                    Changes persist in your browser&apos;s local storage and update the site immediately across open tabs. To share edits across devices or publish permanently, use <strong>Backup, Sync &amp; Security</strong> to export JSON.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('backup')}
                  className="px-4 py-2.5 bg-[#011f4b] text-white text-xs font-bold rounded-xl hover:bg-[#0a3678] transition-colors shrink-0"
                >
                  Export / Sync
                </button>
              </div>
            </div>
          )}

          {/* HERO TAB */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveHero} className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#011f4b]">Hero Section</h2>
                  <p className="text-gray-500 text-sm mt-0.5">Edit your landing banner copy and CTAs.</p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Top Badge Text
                  </label>
                  <input
                    type="text"
                    value={heroForm.badge}
                    onChange={(e) => setHeroForm({ ...heroForm, badge: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Headline Line 1
                    </label>
                    <input
                      type="text"
                      value={heroForm.titleRegular}
                      onChange={(e) => setHeroForm({ ...heroForm, titleRegular: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Gradient Headline Line 2
                    </label>
                    <input
                      type="text"
                      value={heroForm.titleGradient}
                      onChange={(e) => setHeroForm({ ...heroForm, titleGradient: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Primary CTA Label
                    </label>
                    <input
                      type="text"
                      value={heroForm.primaryCtaText}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCtaText: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Primary CTA Link
                    </label>
                    <input
                      type="text"
                      value={heroForm.primaryCtaLink}
                      onChange={(e) => setHeroForm({ ...heroForm, primaryCtaLink: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Secondary CTA Label
                    </label>
                    <input
                      type="text"
                      value={heroForm.secondaryCtaText}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaText: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                      Secondary CTA Link
                    </label>
                    <input
                      type="text"
                      value={heroForm.secondaryCtaLink}
                      onChange={(e) => setHeroForm({ ...heroForm, secondaryCtaLink: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-[#fd7200] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-200 text-center">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-3">
                  Live Preview
                </span>
                <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs text-[#fd7200] font-medium mb-3">
                  {heroForm.badge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  {heroForm.titleRegular}
                  <br />
                  <span className="gradient-text-animated">{heroForm.titleGradient}</span>
                </h3>
                <p className="text-xs text-gray-600 max-w-md mx-auto mt-2">{heroForm.subtitle}</p>
              </div>
            </form>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#011f4b]">Products & Portfolio</h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Add, edit, reorder, or remove product cards shown on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddProductModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              {/* Products List */}
              <div className="grid gap-4">
                {content.projects.map((project, idx) => (
                  <div
                    key={project.id}
                    className="p-4 sm:p-5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#fd7200]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-16 h-16 rounded-xl object-cover border border-gray-200 shrink-0 bg-white"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-gray-900 text-base truncate">{project.title}</h4>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                              project.status === 'mvp'
                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                : project.status === 'in-progress'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-1 mt-0.5">{project.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          <span className="text-[10px] bg-gray-200/70 px-2 py-0.5 rounded text-gray-800 font-medium">
                            {project.category}
                          </span>
                          {project.platforms && (
                            <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
                              {project.platforms}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveProject(project.id, 'up')}
                        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#011f4b] disabled:opacity-30"
                        title="Move up"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === content.projects.length - 1}
                        onClick={() => moveProject(project.id, 'down')}
                        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#011f4b] disabled:opacity-30"
                        title="Move down"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#fd7200]"
                          title="Open live URL"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => openEditProductModal(project)}
                        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#011f4b]"
                        title="Edit product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete product "${project.title}"?`)) {
                            deleteProject(project.id);
                            showToast(`Deleted "${project.title}".`);
                          }
                        }}
                        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {content.projects.length === 0 && (
                  <div className="p-8 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500 text-sm">
                    No products yet. Click &ldquo;Add Product&rdquo; above to create one.
                  </div>
                )}
              </div>

              {/* Section Header Form */}
              <form onSubmit={handleSaveProductsHeader} className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-base">Section Heading Copy</h3>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#011f4b] text-white rounded-xl text-xs font-bold hover:bg-[#0a3678]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Heading
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={productsHeaderForm.eyebrow}
                      onChange={(e) =>
                        setProductsHeaderForm({ ...productsHeaderForm, eyebrow: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Heading Word 1
                    </label>
                    <input
                      type="text"
                      value={productsHeaderForm.headingRegular}
                      onChange={(e) =>
                        setProductsHeaderForm({ ...productsHeaderForm, headingRegular: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Gradient Word 2
                    </label>
                    <input
                      type="text"
                      value={productsHeaderForm.headingGradient}
                      onChange={(e) =>
                        setProductsHeaderForm({ ...productsHeaderForm, headingGradient: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">Subtitle</label>
                  <input
                    type="text"
                    value={productsHeaderForm.subtitle}
                    onChange={(e) =>
                      setProductsHeaderForm({ ...productsHeaderForm, subtitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </form>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#011f4b]">Services Offered</h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Customize service cards, icons, gradients, and order.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openAddServiceModal}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  Add Service
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {content.servicesSection.items.map((service, idx) => (
                  <div
                    key={service.id}
                    className="p-5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-[#fd7200]/40 flex flex-col justify-between transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-11 h-11 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-sm`}
                        >
                          <DynamicIcon name={service.iconName} className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveService(service.id, 'up')}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30"
                            title="Move up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === content.servicesSection.items.length - 1}
                            onClick={() => moveService(service.id, 'down')}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-white disabled:opacity-30"
                            title="Move down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditServiceModal(service)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-[#011f4b] hover:bg-white"
                            title="Edit service"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete service "${service.title}"?`)) {
                                deleteService(service.id);
                                showToast(`Deleted "${service.title}".`);
                              }
                            }}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-white"
                            title="Delete service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 text-base">{service.title}</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Section Header Form */}
              <form onSubmit={handleSaveServicesHeader} className="pt-6 border-t border-gray-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 text-base">Section Heading Copy</h3>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#011f4b] text-white rounded-xl text-xs font-bold hover:bg-[#0a3678]"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Heading
                  </button>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={servicesHeaderForm.eyebrow}
                      onChange={(e) =>
                        setServicesHeaderForm({ ...servicesHeaderForm, eyebrow: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Heading Word 1
                    </label>
                    <input
                      type="text"
                      value={servicesHeaderForm.headingRegular}
                      onChange={(e) =>
                        setServicesHeaderForm({ ...servicesHeaderForm, headingRegular: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Gradient Word 2
                    </label>
                    <input
                      type="text"
                      value={servicesHeaderForm.headingGradient}
                      onChange={(e) =>
                        setServicesHeaderForm({ ...servicesHeaderForm, headingGradient: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">Subtitle</label>
                  <input
                    type="text"
                    value={servicesHeaderForm.subtitle}
                    onChange={(e) =>
                      setServicesHeaderForm({ ...servicesHeaderForm, subtitle: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </form>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <form onSubmit={handleSaveAbout} className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#011f4b]">About Us &amp; Core Values</h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Edit company story, team photos, and value cards.
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Eyebrow Badge
                    </label>
                    <input
                      type="text"
                      value={aboutForm.badge}
                      onChange={(e) => setAboutForm({ ...aboutForm, badge: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Heading Line 1
                    </label>
                    <input
                      type="text"
                      value={aboutForm.headingRegular}
                      onChange={(e) => setAboutForm({ ...aboutForm, headingRegular: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Gradient Line 2
                    </label>
                    <input
                      type="text"
                      value={aboutForm.headingGradient}
                      onChange={(e) => setAboutForm({ ...aboutForm, headingGradient: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Paragraph 1
                  </label>
                  <textarea
                    rows={3}
                    value={aboutForm.paragraph1}
                    onChange={(e) => setAboutForm({ ...aboutForm, paragraph1: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Paragraph 2
                  </label>
                  <textarea
                    rows={3}
                    value={aboutForm.paragraph2}
                    onChange={(e) => setAboutForm({ ...aboutForm, paragraph2: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Primary Image URL
                    </label>
                    <input
                      type="text"
                      value={aboutForm.primaryImage}
                      onChange={(e) => setAboutForm({ ...aboutForm, primaryImage: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Secondary Image URL
                    </label>
                    <input
                      type="text"
                      value={aboutForm.secondaryImage}
                      onChange={(e) => setAboutForm({ ...aboutForm, secondaryImage: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 text-base">Core Value Cards</h3>
                    <button
                      type="button"
                      onClick={handleAddAboutValue}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Value
                    </button>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {aboutForm.values.map((val, idx) => (
                      <div key={val.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2.5">
                        <div className="flex items-center gap-2">
                          <select
                            value={val.iconName}
                            onChange={(e) => {
                              const next = [...aboutForm.values];
                              next[idx] = { ...next[idx], iconName: e.target.value };
                              setAboutForm({ ...aboutForm, values: next });
                            }}
                            className="text-xs bg-white border border-gray-200 px-2 py-1.5 rounded-lg text-gray-700"
                          >
                            {AVAILABLE_ICONS.map((icon) => (
                              <option key={icon} value={icon}>
                                {icon}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            value={val.title}
                            onChange={(e) => {
                              const next = [...aboutForm.values];
                              next[idx] = { ...next[idx], title: e.target.value };
                              setAboutForm({ ...aboutForm, values: next });
                            }}
                            className="font-bold text-sm bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg flex-1 text-gray-900"
                            placeholder="Title..."
                          />
                          {aboutForm.values.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveAboutValue(val.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                              title="Remove value"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <textarea
                          rows={2}
                          value={val.desc}
                          onChange={(e) => {
                            const next = [...aboutForm.values];
                            next[idx] = { ...next[idx], desc: e.target.value };
                            setAboutForm({ ...aboutForm, values: next });
                          }}
                          className="text-xs bg-white border border-gray-200 p-2 rounded-lg w-full text-gray-700"
                          placeholder="Description..."
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* CONTACT & FOOTER TAB */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveContactAndCompany} className="space-y-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-[#011f4b]">Contact &amp; Footer Settings</h2>
                  <p className="text-gray-500 text-sm mt-0.5">
                    Configure contact form messaging, endpoint, and footer details.
                  </p>
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">Contact Section</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">Eyebrow</label>
                    <input
                      type="text"
                      value={contactForm.eyebrow}
                      onChange={(e) => setContactForm({ ...contactForm, eyebrow: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Heading Word 1
                    </label>
                    <input
                      type="text"
                      value={contactForm.headingRegular}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, headingRegular: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Gradient Word 2
                    </label>
                    <input
                      type="text"
                      value={contactForm.headingGradient}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, headingGradient: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">Subtitle</label>
                  <input
                    type="text"
                    value={contactForm.subtitle}
                    onChange={(e) => setContactForm({ ...contactForm, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                    Support Email
                  </label>
                  <input
                    type="email"
                    value={contactForm.supportEmail || ''}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, supportEmail: e.target.value })
                    }
                    placeholder="support@reliantsoftwaresolutions.com"
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                    Form Endpoint URL
                  </label>
                  <input
                    type="url"
                    value={contactForm.formEndpoint}
                    onChange={(e) => setContactForm({ ...contactForm, formEndpoint: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200 space-y-4">
                <h3 className="font-bold text-gray-900 text-base">Company &amp; Footer Branding</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={companyForm.name}
                      onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Copyright Year
                    </label>
                    <input
                      type="text"
                      value={companyForm.copyrightYear}
                      onChange={(e) => setCompanyForm({ ...companyForm, copyrightYear: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                    Footer Tagline
                  </label>
                  <textarea
                    rows={3}
                    value={companyForm.tagline}
                    onChange={(e) => setCompanyForm({ ...companyForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Privacy Policy URL
                    </label>
                    <input
                      type="text"
                      value={companyForm.privacyUrl}
                      onChange={(e) => setCompanyForm({ ...companyForm, privacyUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                      Terms of Service URL
                    </label>
                    <input
                      type="text"
                      value={companyForm.termsUrl}
                      onChange={(e) => setCompanyForm({ ...companyForm, termsUrl: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                    />
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* BACKUP, SYNC & SECURITY TAB */}
          {activeTab === 'backup' && (
            <div className="space-y-8">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-bold text-[#011f4b]">Backup, Sync &amp; Security</h2>
                <p className="text-gray-500 text-sm mt-0.5">
                  Export or import your full website JSON configuration, copy TypeScript product code, or update your admin passcode.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#011f4b]/10 text-[#011f4b] flex items-center justify-center mb-3">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Export JSON Backup</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Download all current CMS content as a portable JSON file.
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={handleExportDownload}
                      className="flex-1 py-2 bg-[#011f4b] text-white text-xs font-bold rounded-xl hover:bg-[#0a3678] transition-colors"
                    >
                      Download
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyJson}
                      className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-100"
                      title="Copy JSON"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-[#fd7200] flex items-center justify-center mb-3">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Import JSON Config</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Upload or paste a JSON snapshot to restore or sync content.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setImportJsonText(exportContent());
                      setImportError('');
                      setIsImportModalOpen(true);
                    }}
                    className="mt-4 w-full py-2 bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white text-xs font-bold rounded-xl hover:shadow-md transition-all"
                  >
                    Open Import Editor
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                      <Code className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">Copy projects.ts</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Copy TypeScript for <code className="font-mono">src/data/projects.ts</code> to commit product changes permanently.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyProjectsTs}
                    className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Copy TypeScript
                  </button>
                </div>
              </div>

              {/* Change Passcode */}
              <form
                onSubmit={handleUpdatePasscode}
                className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-4"
              >
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-[#fd7200]" />
                  <h3 className="font-bold text-gray-900 text-sm">Change /adminrss Passcode (This Browser)</h3>
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <input
                    type="password"
                    required
                    value={passcodeForm.current}
                    onChange={(e) => setPasscodeForm({ ...passcodeForm, current: e.target.value })}
                    placeholder="Current passcode"
                    className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                  />
                  <input
                    type="password"
                    required
                    value={passcodeForm.next}
                    onChange={(e) => setPasscodeForm({ ...passcodeForm, next: e.target.value })}
                    placeholder="New passcode (min 4 chars)"
                    className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                  />
                  <input
                    type="password"
                    required
                    value={passcodeForm.confirm}
                    onChange={(e) => setPasscodeForm({ ...passcodeForm, confirm: e.target.value })}
                    placeholder="Confirm new passcode"
                    className="px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs"
                  />
                </div>
                {passcodeError && <p className="text-xs text-red-600">{passcodeError}</p>}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#011f4b] text-white text-xs font-bold rounded-xl hover:bg-[#0a3678]"
                >
                  Update Passcode
                </button>
              </form>

              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-2">Active JSON Payload</h3>
                <pre className="p-4 rounded-2xl bg-slate-900 text-orange-300 text-xs overflow-x-auto max-h-72 font-mono">
                  {exportContent()}
                </pre>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#011f4b] mb-4">
              {editingProductId ? 'Edit Product' : 'Add New Product'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.title}
                    onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                    placeholder="e.g. Mobi Asset"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Category *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    placeholder="e.g. Device Management"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Product Role / Tagline
                </label>
                <input
                  type="text"
                  value={productForm.tagline || ''}
                  onChange={(e) => setProductForm({ ...productForm, tagline: e.target.value })}
                  placeholder="e.g. Enterprise IT & Mobile Device Lifecycle Platform"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Built For (Target Teams)
                  </label>
                  <input
                    type="text"
                    value={productForm.targetAudience || ''}
                    onChange={(e) =>
                      setProductForm({ ...productForm, targetAudience: e.target.value })
                    }
                    placeholder="e.g. IT Operations · Warehouses · Multi-Site Ops"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Supported Platforms
                  </label>
                  <input
                    type="text"
                    value={productForm.platforms || ''}
                    onChange={(e) => setProductForm({ ...productForm, platforms: e.target.value })}
                    placeholder="e.g. Web Portal · Android · iOS · Offline Sync"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Release Stage</label>
                  <select
                    value={productForm.status}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        status: e.target.value as Project['status'],
                      })
                    }
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  >
                    <option value="completed">Enterprise Ready</option>
                    <option value="in-progress">In Rollout</option>
                    <option value="mvp">Early Access</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                    Client / Owner
                  </label>
                  <input
                    type="text"
                    value={productForm.clientName}
                    onChange={(e) => setProductForm({ ...productForm, clientName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Year</label>
                  <input
                    type="text"
                    value={productForm.year}
                    onChange={(e) => setProductForm({ ...productForm, year: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Image Path, URL, or Upload *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    placeholder="/MobiAsset.png or https://..."
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 cursor-pointer shrink-0">
                    <ImageIcon className="w-4 h-4" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] text-gray-500">
                  <span>Presets:</span>
                  {['/MobiAsset.png', '/Inspectra.png', '/asset guard.png'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, image: preset })}
                      className="px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-gray-700"
                    >
                      {preset.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Live Website URL (Optional)
                </label>
                <input
                  type="text"
                  value={productForm.liveUrl || ''}
                  onChange={(e) => setProductForm({ ...productForm, liveUrl: e.target.value })}
                  placeholder="https://example.reliantsoftwaresolutions.com/"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  If provided, adds an &ldquo;Explore Product&rdquo; button on the card and &ldquo;Visit Product Website&rdquo; in the modal.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Long Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={productForm.longDescription}
                  onChange={(e) => setProductForm({ ...productForm, longDescription: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Core Workflows &amp; Capabilities (One per line)
                </label>
                <textarea
                  rows={4}
                  value={(productForm.highlights || []).join('\n')}
                  onChange={(e) =>
                    setProductForm({
                      ...productForm,
                      highlights: e.target.value.split('\n'),
                    })
                  }
                  placeholder="Enter key workflows shown in the Product Details modal (one per line)"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white text-sm font-bold hover:shadow-md"
                >
                  {editingProductId ? 'Update Product' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsServiceModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#011f4b] mb-4">
              {editingServiceId ? 'Edit Service' : 'Add New Service'}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. DevOps & Automation"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">Icon</label>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${serviceForm.color} flex items-center justify-center text-white shrink-0`}
                  >
                    <DynamicIcon name={serviceForm.iconName} className="w-5 h-5" />
                  </div>
                  <select
                    value={serviceForm.iconName}
                    onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  >
                    {AVAILABLE_ICONS.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Card Color Theme
                </label>
                <select
                  value={serviceForm.color}
                  onChange={(e) => {
                    const preset = SERVICE_COLOR_PRESETS.find((p) => p.color === e.target.value);
                    setServiceForm({
                      ...serviceForm,
                      color: e.target.value,
                      shadowColor: preset?.shadowColor || 'shadow-[#011f4b]/20',
                    });
                  }}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                >
                  {SERVICE_COLOR_PRESETS.map((preset) => (
                    <option key={preset.label} value={preset.color}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#fd7200] to-[#e06500] text-white text-sm font-bold hover:shadow-md"
                >
                  {editingServiceId ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* IMPORT JSON MODAL */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative">
            <button
              type="button"
              onClick={() => setIsImportModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-[#011f4b] mb-2">Import CMS JSON</h3>
            <p className="text-xs text-gray-500 mb-4">
              Upload a <code className="font-mono">.json</code> backup file or paste JSON below to update website content.
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-4">
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 cursor-pointer">
                <Upload className="w-4 h-4" />
                <span>Choose .json file</span>
                <input type="file" accept=".json,application/json" onChange={handleImportFile} className="hidden" />
              </label>

              <textarea
                rows={12}
                required
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="Paste valid JSON here..."
                className="w-full px-4 py-3 bg-slate-900 text-orange-300 border border-gray-200 rounded-xl text-xs font-mono focus:outline-none focus:border-[#fd7200]"
              />

              {importError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs">
                  {importError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#011f4b] text-white text-sm font-bold hover:bg-[#0a3678]"
                >
                  Apply &amp; Sync JSON
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

