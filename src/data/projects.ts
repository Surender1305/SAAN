export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  longDescription: string;
  category: string;
  targetAudience?: string;
  platforms?: string;
  highlights?: string[];
  iconName?: string;
  accentTheme?: 'blue' | 'emerald' | 'cyan' | 'orange';
  technologies?: string[];
  status: 'completed' | 'in-progress' | 'mvp';
  image: string;
  clientName: string;
  year: string;
  liveUrl?: string;
}

export const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'Mobi Asset',
    tagline: 'Enterprise Device Lifecycle Management',
    description:
      'Unifies device inventory tracking, multi-site distribution, guided handovers with photos and digital signatures, defect tracking, and overdue alerts in one mobile and web platform—even offline.',
    longDescription:
      'Mobi Asset replaces spreadsheets with real-time device control across every location and department. Scan barcodes or QR codes to identify hardware, dispatch stock across sites within department quotas, collect condition photos and digital signatures on issue and return, and export instant PDF receipts and monthly audit reports—even without internet access.',
    category: 'Device Management',
    targetAudience: 'Multi-Site Enterprises · Hospitality & Venues · Retail · Healthcare & Field',
    platforms: 'Android & iOS App · Web Admin Portal · Offline Ready',
    highlights: [
      'Barcode & QR scanning with instant brand and model lookup',
      '4-step employee handovers with photos, accessories & digital signatures',
      'Multi-site stock dispatch, department quotas & overdue alerts',
      'Offline-ready mobile capture with auto-sync & PDF audit reports',
    ],
    iconName: 'Smartphone',
    accentTheme: 'blue',
    technologies: [],
    status: 'completed',
    image: '/MobiAsset.png',
    clientName: 'Reliant Enterprise Suite',
    year: '2026',
    liveUrl: 'https://mobiasset.reliantsoftwaresolutions.com/',
  },
  {
    id: '2',
    title: 'Inspectra',
    tagline: 'Safety Inspection, Incident & Compliance Platform',
    description:
      'Standardize facility safety checklists, automate recurring audits, and track hazards through verified resolution—working online or offline with instant PDF and Excel reports.',
    longDescription:
      'Inspectra replaces paper clipboards and spreadsheet trackers across 4 role workspaces—from field inspectors to head office managers. Run zone-matched checklists with required failure photos, schedule daily, weekly, or monthly audits, assign and verify hazard fixes, and export branded PDFs or 5-tab Excel workbooks in seconds.',
    category: 'Safety Management',
    targetAudience: 'Manufacturing · Warehouses · Kitchens & Hospitality · Corporate Sites',
    platforms: 'Android & iOS App · Web Portal · Offline Ready',
    highlights: [
      'Facility and zone-matched checklists for production, storage, kitchens & offices',
      'One-time & recurring audit schedules with live pass-rate scores',
      'Hazard reporting & follow-up tracking through verified closure',
      'True offline field audits with 1-click PDF & 5-tab Excel exports',
    ],
    iconName: 'ShieldCheck',
    accentTheme: 'emerald',
    technologies: [],
    status: 'completed',
    image: '/Inspectra.png',
    clientName: 'Reliant Enterprise Suite',
    year: '2026',
    liveUrl: 'https://inspectra.reliantsoftwaresolutions.com/',
  },
  {
    id: '3',
    title: 'Asset Guard',
    tagline: 'Multi-Venue Asset Control & Custody Platform',
    description:
      'Track high-value equipment, beverages, linens, and luggage from central storage to venues, staff, and guests—with QR/barcode scanning, signatures, photo proof, and offline sync.',
    longDescription:
      'Asset Guard enforces clear custody across Organization, Venue, and Department tiers. Transfer stock between headquarters and sites with arrival re-scan verification, check items out to staff or guest rooms with condition photos and digital signatures, quarantine damaged gear, and export PDF or CSV shift reports—even in no-signal zones.',
    category: 'Asset Management',
    targetAudience: 'Hotels & Resorts · Event Venues · Corporate Campuses · Facilities',
    platforms: 'Android & iOS App · Web Command Center · Offline Ready',
    highlights: [
      'Single & bulk QR/barcode scanning for gear, beverages, linens & bags',
      'HQ-to-venue stock transfers with mandatory arrival re-scan checks',
      'Staff badge & guest room checkouts with signatures and photo proof',
      'High-value manager approvals, quarantine & PDF/CSV shift reports',
    ],
    iconName: 'PackageCheck',
    accentTheme: 'cyan',
    technologies: [],
    status: 'completed',
    image: '/asset guard.png',
    clientName: 'Reliant Enterprise Suite',
    year: '2026',
    liveUrl: 'https://assetguard.reliantsoftwaresolutions.com/',
  },
];
