import React from 'react';
import {
  Globe,
  Smartphone,
  Cloud,
  Brain,
  Shield,
  Gauge,
  Zap,
  Code,
  Cpu,
  Target,
  Lightbulb,
  Rocket,
  Heart,
  Sparkles,
  Database,
  Layers,
  Monitor,
  Server,
  CheckCircle,
  Lock,
  Workflow,
  LineChart,
  Wrench,
  HelpCircle,
} from 'lucide-react';

export const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Smartphone,
  Cloud,
  Brain,
  Shield,
  Gauge,
  Zap,
  Code,
  Cpu,
  Target,
  Lightbulb,
  Rocket,
  Heart,
  Sparkles,
  Database,
  Layers,
  Monitor,
  Server,
  CheckCircle,
  Lock,
  Workflow,
  LineChart,
  Wrench,
};

export const AVAILABLE_ICONS = Object.keys(ICON_MAP);

export function DynamicIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
  const IconComponent = ICON_MAP[name] || HelpCircle;
  return <IconComponent className={className} />;
}

