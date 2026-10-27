// Shared CMS content types. These mirror the JSON your REST API should return.
export interface Identified {
  id: string;
}

export interface LinkItem extends Identified {
  label: string;
  url: string;
}

export interface NavItem extends LinkItem {
  type: "text" | "gold" | "outline";
  target: "_self" | "_blank";
  isActive: boolean;
}

export interface HeaderContent {
  logoUrl: string;
  logoAlt: string;
  notice: string;
  navItems: NavItem[];
}

export interface FooterColumn extends Identified {
  title: string;
  links: LinkItem[];
}

export interface FooterContent {
  motto: string;
  description: string;
  columns: FooterColumn[];
  phones: string[];
  emails: string[];
  addressLines: string[];
  hours: string;
  whatsapp: string;
  linkedin: string;
  copyright: string;
  registration: string;
}

export interface HeroButton extends LinkItem {
  variant: "gold" | "outline" | "ink";
  icon: string;
}

export interface HeroContent {
  eyebrow: string;
  line1: string;
  line2: string;
  subtitle: string;
  tagline: string;
  images: (Identified & { label: string; url: string })[];
  buttons: HeroButton[];
}

export type HeroesContent = Record<string, HeroContent>;

export type Row = Identified & Record<string, unknown>;

export interface HomeContent {
  workWithUs: { eyebrow: string; title: string; body: string; image: string; facts: Row[] };
  whyAsl: Row[];
  clients: Row[];
  accreditations: Row[];
}

export interface AboutContent {
  story: string[];
  values: Row[];
  team: Row[];
}

export type ApplicationStatus = "Submitted" | "Under Review" | "Shortlisted" | "Hired" | "Rejected";

export interface Application extends Identified {
  jobId: string;
  jobTitle: string;
  sector: string;
  status: ApplicationStatus;
  appliedAt: string;
  notes: string;
  personal: Record<string, unknown>;
  role: Record<string, unknown>;
  experience: Record<string, unknown>;
  licences: Record<string, unknown>;
  rightToWork: Record<string, unknown>;
  compliance: Record<string, unknown>;
}

export interface CmsResources {
  header: HeaderContent;
  footer: FooterContent;
  heroes: HeroesContent;
  home: HomeContent;
  about: AboutContent;
  services: Row[];
  jobs: Row[];
  applications: Application[];
  messages: Row[];
  quotes: Row[];
}

export type ResourceKey = keyof CmsResources;
