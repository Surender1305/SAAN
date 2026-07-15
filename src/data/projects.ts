export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  technologies: string[];
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
    description: 'Device Manager Product Website for seamless asset tracking and management.',
    longDescription: 'Mobi Asset provides a comprehensive device management solution, ensuring real-time tracking, maintenance scheduling, and lifecycle management for all your corporate assets.',
    category: 'Device Management',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    status: 'completed',
    image: '/MobiAsset.png',
    clientName: 'Internal Product',
    year: '2024',
    liveUrl: '/DeviceManagerProductWebsite-main/index.html',
  },
  {
    id: '2',
    title: 'Inspectra',
    description: 'Safety Monitor Product Website for advanced workplace safety and compliance.',
    longDescription: 'Inspectra is our cutting-edge safety monitoring platform designed to ensure compliance, track incidents, and maintain a secure working environment through real-time analytics and reporting.',
    category: 'Safety Management',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    status: 'completed',
    image: '/Inspectra.png',
    clientName: 'Internal Product',
    year: '2024',
    liveUrl: '/SafetyMonitorProductWebsite-main/index.html',
  },
  {
    id: '3',
    title: 'Asset Guard',
    description: 'Asset Manager Product Website for robust asset protection and tracking.',
    longDescription: 'Asset Guard offers unparalleled protection and tracking for high-value assets, featuring advanced security protocols, real-time alerts, and comprehensive audit trails.',
    category: 'Asset Management',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    status: 'completed',
    image: '/asset guard.png',
    clientName: 'Internal Product',
    year: '2024',
    liveUrl: '/AssetManagerProductWebsite-main/index.html',
  }
];
