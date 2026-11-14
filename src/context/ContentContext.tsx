import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Project, defaultProjects } from '../data/projects';

export interface HeroContent {
  badge: string;
  titleRegular: string;
  titleGradient: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  color: string;
  shadowColor: string;
}

export interface ServicesSectionContent {
  eyebrow: string;
  headingRegular: string;
  headingGradient: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface ProductsSectionContent {
  eyebrow: string;
  headingRegular: string;
  headingGradient: string;
  subtitle: string;
}

export interface AboutValue {
  id: string;
  title: string;
  desc: string;
  iconName: string;
  color: string;
}

export interface AboutContent {
  badge: string;
  headingRegular: string;
  headingGradient: string;
  paragraph1: string;
  paragraph2: string;
  primaryImage: string;
  secondaryImage: string;
  values: AboutValue[];
}

export interface ContactContent {
  eyebrow: string;
  headingRegular: string;
  headingGradient: string;
  subtitle: string;
  supportEmail?: string;
  formEndpoint: string;
}

export interface CompanyContent {
  name: string;
  tagline: string;
  copyrightYear: string;
  privacyUrl: string;
  termsUrl: string;
}

export interface SiteContent {
  hero: HeroContent;
  servicesSection: ServicesSectionContent;
  productsSection: ProductsSectionContent;
  projects: Project[];
  about: AboutContent;
  contact: ContactContent;
  company: CompanyContent;
}

export const SERVICE_COLOR_PRESETS = [
  {
    label: 'Navy Gradient',
    color: 'from-[#011f4b] to-[#0a3678]',
    shadowColor: 'shadow-[#011f4b]/20',
  },
  {
    label: 'Orange Gradient',
    color: 'from-[#fd7200] to-[#e06500]',
    shadowColor: 'shadow-orange-500/20',
  },
  {
    label: 'Ocean Blue Gradient',
    color: 'from-[#0a3678] to-[#155e75]',
    shadowColor: 'shadow-blue-900/20',
  },
  {
    label: 'Amber Orange Gradient',
    color: 'from-[#ff881a] to-[#fd7200]',
    shadowColor: 'shadow-orange-500/20',
  },
  {
    label: 'Deep Indigo Navy',
    color: 'from-[#011f4b] to-[#0f2c59]',
    shadowColor: 'shadow-[#011f4b]/20',
  },
];

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    badge: 'Trusted by 50+ Companies Worldwide',
    titleRegular: 'We Build Software',
    titleGradient: 'That Drives Growth',
    subtitle:
      'Reliant Software Solutions transforms your ideas into powerful, scalable software products. From MVPs to enterprise solutions — we deliver excellence at every stage.',
    primaryCtaText: 'View Our Work',
    primaryCtaLink: '#products',
    secondaryCtaText: 'Get In Touch',
    secondaryCtaLink: '#contact',
  },
  servicesSection: {
    eyebrow: 'What We Offer',
    headingRegular: 'Our',
    headingGradient: 'Services',
    subtitle:
      'End-to-end software solutions designed to accelerate your business growth and digital transformation.',
    items: [
      {
        id: 'srv-1',
        iconName: 'Globe',
        title: 'Web Development',
        description:
          'Full-stack web applications built with modern frameworks like React, Next.js, and Node.js. Scalable, fast, and secure.',
        color: 'from-[#011f4b] to-[#0a3678]',
        shadowColor: 'shadow-[#011f4b]/20',
      },
      {
        id: 'srv-2',
        iconName: 'Smartphone',
        title: 'Mobile Apps',
        description:
          'Cross-platform mobile applications using React Native and Flutter. Native performance with a single codebase.',
        color: 'from-[#fd7200] to-[#e06500]',
        shadowColor: 'shadow-orange-500/20',
      },
      {
        id: 'srv-3',
        iconName: 'Cloud',
        title: 'Cloud Solutions',
        description:
          'Cloud architecture design, migration, and DevOps. AWS, Azure, and GCP certified team ensuring 99.9% uptime.',
        color: 'from-[#0a3678] to-[#155e75]',
        shadowColor: 'shadow-blue-900/20',
      },
      {
        id: 'srv-4',
        iconName: 'Brain',
        title: 'AI & ML Solutions',
        description:
          'Intelligent automation, predictive analytics, NLP, and computer vision solutions tailored to your business needs.',
        color: 'from-[#e06500] to-[#fd7200]',
        shadowColor: 'shadow-orange-500/20',
      },
      {
        id: 'srv-5',
        iconName: 'Shield',
        title: 'Cybersecurity',
        description:
          'Comprehensive security audits, penetration testing, and compliance solutions. Protect your digital assets.',
        color: 'from-[#011f4b] to-[#0f2c59]',
        shadowColor: 'shadow-[#011f4b]/20',
      },
      {
        id: 'srv-6',
        iconName: 'Gauge',
        title: 'MVP Development',
        description:
          'Rapid prototyping and MVP development to validate your ideas fast. Go from concept to market in weeks, not months.',
        color: 'from-[#ff881a] to-[#fd7200]',
        shadowColor: 'shadow-orange-500/20',
      },
    ],
  },
  productsSection: {
    eyebrow: 'Enterprise Product Suite',
    headingRegular: 'Our Software',
    headingGradient: 'Products',
    subtitle:
      'Purpose-built platforms ready to deploy across your locations—giving teams real-time visibility, digital accountability, and offline reliability.',
  },
  projects: defaultProjects,
  about: {
    badge: 'About Us',
    headingRegular: 'Building the Future,',
    headingGradient: 'One Line at a Time',
    paragraph1:
      'Reliant Software Solutions is a forward-thinking software development company founded in 2019. We specialize in turning ambitious ideas into reality through cutting-edge technology and exceptional engineering talent.',
    paragraph2:
      'Our team of 40+ skilled developers, designers, and strategists has successfully delivered 50+ projects across healthcare, fintech, e-commerce, education, and IoT sectors. We pride ourselves on building long-term partnerships with our clients.',
    primaryImage:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
    secondaryImage: '/about-workspace.jpg',
    values: [
      {
        id: 'val-1',
        iconName: 'Target',
        title: 'Mission-Driven',
        desc: 'Focused on delivering measurable business impact',
        color: 'text-[#fd7200]',
      },
      {
        id: 'val-2',
        iconName: 'Lightbulb',
        title: 'Innovation First',
        desc: 'Leveraging latest technologies and best practices',
        color: 'text-amber-500',
      },
      {
        id: 'val-3',
        iconName: 'Rocket',
        title: 'Fast Delivery',
        desc: 'Agile methodology for rapid, iterative development',
        color: 'text-[#011f4b]',
      },
      {
        id: 'val-4',
        iconName: 'Heart',
        title: 'Client-Centric',
        desc: 'Your success is our primary metric',
        color: 'text-orange-500',
      },
    ],
  },
  contact: {
    eyebrow: 'Get In Touch',
    headingRegular: "Let's Build",
    headingGradient: 'Together',
    subtitle:
      "Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back within 24 hours.",
    supportEmail: 'support@reliantsoftwaresolutions.com',
    formEndpoint: 'https://formsubmit.co/ajax/support@reliantsoftwaresolutions.com',
  },
  company: {
    name: 'Reliant Software Solutions',
    tagline:
      'Transforming ideas into powerful software solutions. We build scalable, secure, and innovative digital products for businesses worldwide.',
    copyrightYear: new Date().getFullYear().toString(),
    privacyUrl: '#',
    termsUrl: '#',
  },
};

const STORAGE_KEY = 'reliant_cms_content_v1';
const PASSCODE_STORAGE_KEY = 'reliant_cms_passcode_v1';
const DEFAULT_PASSCODE = 'admin123';

const LEGACY_DESCRIPTIONS: Record<string, string[]> = {
  '1': [
    'Device Manager Product Website for seamless asset tracking and management.',
    'Enterprise device lifecycle platform for tracking, allocating, auditing, and managing mobile and IT assets across locations.',
    'Centralize corporate smartphones, laptops, and IT hardware—automating multi-site allocation, guided staff handovers, defect logging, and audits.',
    'Track, allocate, issue, and audit smartphones, laptops, and IT hardware across every location and department. Features barcode/IMEI scanning, guided 4-step handovers with photos and digital signatures, defect tracking, overdue alerts, and offline sync.',
  ],
  '2': [
    'Safety Monitor Product Website for advanced workplace safety and compliance.',
    'Multi-site workplace safety inspection, incident routing, and compliance platform with offline checklists and instant exports.',
    'Standardize facility safety checklists, route hazards from detection to verified closure, and export executive compliance packs in seconds.',
    'Standardize facility safety checklists, automate recurring audits, and route hazards from detection to verified closure. Built for production floors, warehouses, kitchens, and offices with offline execution and instant PDF and Excel exports.',
  ],
  '3': [
    'Asset Manager Product Website for robust asset protection and tracking.',
    'Multi-venue asset control and custody platform featuring QR verification, digital signatures, photo proof, and shift audits.',
    'Eliminate inventory shrinkage by tracking high-value gear, beverages, linens, and equipment from central vaults to individual venues and staff.',
    'Eliminate inventory shrinkage across venues and departments. Track electronics, beverages, linens, luggage, and custom inventory from central HQ vaults to staff and guests—with QR/barcode scanning, dispatch manifests, digital signatures, and photo proof.',
  ],
};

function normalizeProjects(projects: Project[]): Project[] {
  return projects.map((project) => {
    const legacyDescs = LEGACY_DESCRIPTIONS[project.id];
    const matchingDefault = DEFAULT_CONTENT.projects.find((d) => d.id === project.id);
    if (!matchingDefault) return project;

    if (legacyDescs && legacyDescs.includes(project.description)) {
      return matchingDefault;
    }

    return {
      ...project,
      tagline: project.tagline || matchingDefault.tagline,
      targetAudience: project.targetAudience || matchingDefault.targetAudience,
      platforms: project.platforms || matchingDefault.platforms,
      highlights: project.highlights && project.highlights.length > 0 ? project.highlights : matchingDefault.highlights,
      iconName: project.iconName || matchingDefault.iconName,
      accentTheme: project.accentTheme || matchingDefault.accentTheme,
    };
  });
}

function normalizeProductsSection(
  savedSection?: Partial<ProductsSectionContent>
): ProductsSectionContent {
  const merged = { ...DEFAULT_CONTENT.productsSection, ...(savedSection || {}) };
  if (
    savedSection?.eyebrow === 'Our Work' &&
    savedSection?.headingRegular === 'Our' &&
    savedSection?.subtitle ===
      'Explore our diverse range of projects — from MVPs to full-scale enterprise solutions.'
  ) {
    return DEFAULT_CONTENT.productsSection;
  }
  return merged;
}

function mergeWithDefaults(parsed: Partial<SiteContent>): SiteContent {
  return {
    ...DEFAULT_CONTENT,
    ...parsed,
    hero: { ...DEFAULT_CONTENT.hero, ...(parsed.hero || {}) },
    servicesSection: {
      ...DEFAULT_CONTENT.servicesSection,
      ...(parsed.servicesSection || {}),
      items:
        Array.isArray(parsed.servicesSection?.items) && parsed.servicesSection.items.length > 0
          ? parsed.servicesSection.items
          : DEFAULT_CONTENT.servicesSection.items,
    },
    productsSection: normalizeProductsSection(parsed.productsSection),
    projects: Array.isArray(parsed.projects)
      ? normalizeProjects(parsed.projects)
      : DEFAULT_CONTENT.projects,
    about: {
      ...DEFAULT_CONTENT.about,
      ...(parsed.about || {}),
      secondaryImage:
        !parsed.about?.secondaryImage ||
        parsed.about.secondaryImage ===
          'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop'
          ? DEFAULT_CONTENT.about.secondaryImage
          : parsed.about.secondaryImage,
      values:
        Array.isArray(parsed.about?.values) && parsed.about.values.length > 0
          ? parsed.about.values
          : DEFAULT_CONTENT.about.values,
    },
    contact: {
      ...DEFAULT_CONTENT.contact,
      ...(parsed.contact || {}),
      supportEmail: parsed.contact?.supportEmail || DEFAULT_CONTENT.contact.supportEmail,
      formEndpoint:
        !parsed.contact?.formEndpoint ||
        parsed.contact.formEndpoint === 'https://formspree.io/f/maqrnkqw'
          ? DEFAULT_CONTENT.contact.formEndpoint
          : parsed.contact.formEndpoint,
    },
    company: { ...DEFAULT_CONTENT.company, ...(parsed.company || {}) },
  };
}

function loadSavedContent(): SiteContent {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        return mergeWithDefaults(parsed);
      }
    }
  } catch (e) {
    console.error('Failed to parse saved CMS content:', e);
  }
  return DEFAULT_CONTENT;
}

interface ContentContextType {
  content: SiteContent;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateServicesSection: (section: Partial<ServicesSectionContent>) => void;
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  moveService: (id: string, direction: 'up' | 'down') => void;
  updateProductsSection: (section: Partial<ProductsSectionContent>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  moveProject: (id: string, direction: 'up' | 'down') => void;
  updateAbout: (about: Partial<AboutContent>) => void;
  updateContact: (contact: Partial<ContactContent>) => void;
  updateCompany: (company: Partial<CompanyContent>) => void;
  resetToDefaults: () => void;
  importContent: (jsonStr: string) => boolean;
  exportContent: () => string;
  verifyPasscode: (input: string) => boolean;
  updatePasscode: (currentPasscode: string, newPasscode: string) => { ok: boolean; error?: string };
  lastUpdated: string;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(loadSavedContent);
  const [lastUpdated, setLastUpdated] = useState<string>(() => new Date().toLocaleTimeString());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (e) {
      console.error('Failed to save CMS content to localStorage:', e);
    }
  }, [content]);

  // Real-time sync across browser tabs on the same origin
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            const parsed = JSON.parse(e.newValue);
            if (parsed && typeof parsed === 'object') {
              setContent(mergeWithDefaults(parsed));
            }
          } catch (err) {
            console.error('Failed to sync storage event:', err);
          }
        } else {
          setContent(DEFAULT_CONTENT);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const updateHero = (heroUpdates: Partial<HeroContent>) => {
    setContent((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroUpdates },
    }));
  };

  const updateServicesSection = (updates: Partial<ServicesSectionContent>) => {
    setContent((prev) => ({
      ...prev,
      servicesSection: { ...prev.servicesSection, ...updates },
    }));
  };

  const addService = (service: Omit<ServiceItem, 'id'>) => {
    const newService: ServiceItem = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    setContent((prev) => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        items: [...prev.servicesSection.items, newService],
      },
    }));
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setContent((prev) => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        items: prev.servicesSection.items.map((s) => (s.id === id ? { ...s, ...updates } : s)),
      },
    }));
  };

  const deleteService = (id: string) => {
    setContent((prev) => ({
      ...prev,
      servicesSection: {
        ...prev.servicesSection,
        items: prev.servicesSection.items.filter((s) => s.id !== id),
      },
    }));
  };

  const moveService = (id: string, direction: 'up' | 'down') => {
    setContent((prev) => {
      const items = [...prev.servicesSection.items];
      const idx = items.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= items.length) return prev;
      [items[idx], items[targetIdx]] = [items[targetIdx], items[idx]];
      return {
        ...prev,
        servicesSection: {
          ...prev.servicesSection,
          items,
        },
      };
    });
  };

  const updateProductsSection = (updates: Partial<ProductsSectionContent>) => {
    setContent((prev) => ({
      ...prev,
      productsSection: { ...prev.productsSection, ...updates },
    }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setContent((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setContent((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const moveProject = (id: string, direction: 'up' | 'down') => {
    setContent((prev) => {
      const items = [...prev.projects];
      const idx = items.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= items.length) return prev;
      [items[idx], items[targetIdx]] = [items[targetIdx], items[idx]];
      return {
        ...prev,
        projects: items,
      };
    });
  };

  const updateAbout = (aboutUpdates: Partial<AboutContent>) => {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutUpdates },
    }));
  };

  const updateContact = (contactUpdates: Partial<ContactContent>) => {
    setContent((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactUpdates },
    }));
  };

  const updateCompany = (companyUpdates: Partial<CompanyContent>) => {
    setContent((prev) => ({
      ...prev,
      company: { ...prev.company, ...companyUpdates },
    }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setContent(DEFAULT_CONTENT);
  };

  const importContent = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        setContent(mergeWithDefaults(parsed));
        return true;
      }
    } catch (e) {
      console.error('Invalid import JSON:', e);
    }
    return false;
  };

  const exportContent = (): string => {
    return JSON.stringify(content, null, 2);
  };

  const getActivePasscode = (): string => {
    return localStorage.getItem(PASSCODE_STORAGE_KEY) || DEFAULT_PASSCODE;
  };

  const verifyPasscode = (input: string): boolean => {
    return input === getActivePasscode();
  };

  const updatePasscode = (currentPasscode: string, newPasscode: string) => {
    if (currentPasscode !== getActivePasscode()) {
      return { ok: false, error: 'Current passcode is incorrect.' };
    }
    if (newPasscode.trim().length < 4) {
      return { ok: false, error: 'New passcode must be at least 4 characters.' };
    }
    localStorage.setItem(PASSCODE_STORAGE_KEY, newPasscode.trim());
    return { ok: true };
  };

  return (
    <ContentContext.Provider
      value={{
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
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}

