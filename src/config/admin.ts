import {
  Briefcase,
  FileText,
  Inbox,
  LayoutDashboard,
  Layers,
  Navigation,
  PanelTop,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ResourceKey } from "@/cms/types";

// Every piece of dashboard chrome is configured here — no navigation or buttons are hardcoded in components.

export const brand = {
  name: "ASL Staffing",
  product: "Content Studio",
  logoUrl: "https://aslservice.vercel.app/images/brand/asl-logo.png",
  liveSiteUrl: "https://aslservice.vercel.app",
  admin: { name: "Site Administrator", role: "Super admin", initials: "SA" },
};

export interface NavEntry {
  label: string;
  to: string;
  icon: LucideIcon;
  badgeFrom?: { resource: ResourceKey; field: string; value: string };
}

export const sidebarNav: { group: string; items: NavEntry[] }[] = [
  { group: "Overview", items: [{ label: "Dashboard", to: "/", icon: LayoutDashboard }] },
  {
    group: "Website",
    items: [
      { label: "Header & Footer", to: "/navigation", icon: Navigation },
      { label: "Page Heroes", to: "/heroes", icon: PanelTop },
      { label: "Page Content", to: "/content", icon: FileText },
      { label: "Services & Sectors", to: "/services", icon: Layers },
    ],
  },
  {
    group: "Recruitment",
    items: [
      { label: "Job Vacancies", to: "/jobs", icon: Briefcase },
      { label: "Applications", to: "/applications", icon: Users, badgeFrom: { resource: "applications", field: "status", value: "Submitted" } },
      { label: "Inquiries", to: "/inquiries", icon: Inbox, badgeFrom: { resource: "messages", field: "status", value: "New" } },
    ],
  },
];

export const quickActions = [
  { label: "Post New Job", to: "/jobs", search: { new: "1" }, variant: "default" as const },
  { label: "Edit Live Content", to: "/heroes", variant: "outline" as const },
];

export type Tone = "info" | "warning" | "gold" | "success" | "destructive" | "muted";

export const statusTones: Record<string, Tone> = {
  Submitted: "info",
  "Under Review": "warning",
  Shortlisted: "gold",
  Hired: "success",
  Rejected: "destructive",
  Active: "success",
  Draft: "muted",
  Closed: "destructive",
  New: "info",
  Read: "muted",
  Quoted: "gold",
  Won: "success",
  Lost: "destructive",
};

export const options = {
  applicationStatus: ["Submitted", "Under Review", "Shortlisted", "Hired", "Rejected"],
  jobStatus: ["Active", "Draft", "Closed"],
  jobType: ["Temporary", "Permanent", "Temp to perm"],
  payFrequency: ["Hourly", "Annual"],
  navType: [
    { value: "text", label: "Text link" },
    { value: "gold", label: "Gold CTA button" },
    { value: "outline", label: "Outline button" },
  ],
  target: [
    { value: "_self", label: "Same tab" },
    { value: "_blank", label: "New tab" },
  ],
  heroVariant: [
    { value: "gold", label: "Solid gold" },
    { value: "outline", label: "Outline white" },
    { value: "ink", label: "Dark navy" },
  ],
  icons: ["ArrowRight", "Phone", "Mail", "Users", "Briefcase", "ShieldCheck", "Sparkles", "Layers", "TrendingUp", "PoundSterling", "Clock", "BadgeCheck", "Zap", "HardHat", "Warehouse", "Package", "Monitor", "BedDouble", "PartyPopper", "UtensilsCrossed"],
  messageStatus: ["New", "Read"],
  quoteStatus: ["New", "Quoted", "Won", "Lost"],
};

export const heroPages = [
  { key: "home", label: "Home" },
  { key: "about", label: "About Us" },
  { key: "services", label: "Services" },
  { key: "careers", label: "Careers" },
  { key: "contact", label: "Contact" },
  { key: "apply", label: "General Apply" },
];

export const kpis: { label: string; resource: ResourceKey; filter?: { field: string; value: string }; hint: string }[] = [
  { label: "Total Applications", resource: "applications", hint: "All candidate submissions" },
  { label: "Active Vacancies", resource: "jobs", filter: { field: "status", value: "Active" }, hint: "Live on the careers page" },
  { label: "Quotation Requests", resource: "quotes", hint: "Client staff requests" },
  { label: "General Inquiries", resource: "messages", hint: "Contact form messages" },
];
