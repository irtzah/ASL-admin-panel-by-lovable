import type { Application, CmsResources, Row } from "./types";

// Mock seed data, taken from the live site audit. Used only when VITE_API_BASE_URL is not set.
const SITE = "https://aslservice.vercel.app";
const img = (name: string) => `${SITE}/images/photos/${name}`;
const id = (p: string, i: number) => `${p}-${i + 1}`;
const rows = <T extends Record<string, unknown>>(p: string, items: T[]): Row[] =>
  items.map((it, i) => ({ id: id(p, i), ...it }));

const services = rows("svc", [
  { slug: "hospitality", title: "Hospitality Staff", shortName: "Hospitality", tagline: "Front and back of house, covered", summary: "Waiting staff, chefs, kitchen porters and bar teams.", image: img("lobby.webp"), icon: "UtensilsCrossed", body: ["We supply trained hospitality professionals to hotels, restaurants and venues across London."], listTitle: "Roles we supply", listItems: ["Waiting staff", "Chefs", "Kitchen porters", "Bar staff"], isActive: true },
  { slug: "wedding-and-events", title: "Wedding & Event Staff", shortName: "Events", tagline: "Flawless service on the big day", summary: "Event hosts, waiters and set-up crews.", image: img("staff-team.webp"), icon: "PartyPopper", body: ["Experienced event teams for weddings, galas and stadium events."], listTitle: "Roles we supply", listItems: ["Event hosts", "Banqueting staff", "Set-up crew"], isActive: true },
  { slug: "security", title: "Security Staff", shortName: "Security", tagline: "Reliable security for all", summary: "BS 7858 vetted, SIA licensed officers.", image: img("staff-team.webp"), icon: "ShieldCheck", body: ["SIA licensed officers vetted to BS 7858."], listTitle: "Roles we supply", listItems: ["Door supervisors", "Static guards", "CCTV operators"], isActive: true },
  { slug: "it", title: "IT Staff", shortName: "IT", tagline: "Technical talent on demand", summary: "Technical support and project placements.", image: img("meeting.webp"), icon: "Monitor", body: ["From helpdesk to project delivery."], listTitle: "Roles we supply", listItems: ["IT support", "Project engineers"], isActive: true },
  { slug: "construction", title: "Construction Staff", shortName: "Construction", tagline: "CSCS qualified site teams", summary: "Labourers and skilled trades, CSCS qualified.", image: img("staff-team.webp"), icon: "HardHat", body: ["Site-ready, CSCS carded operatives."], listTitle: "Roles we supply", listItems: ["Labourers", "Skilled trades"], isActive: true },
  { slug: "food-packing", title: "Food Packing", shortName: "Food Packing", tagline: "GLAA licensed labour", summary: "Food production and packing operatives.", image: img("staff-team.webp"), icon: "Package", body: ["GLAA licensed supply for food production."], listTitle: "Roles we supply", listItems: ["Packers", "Line operatives"], isActive: true },
  { slug: "warehouse", title: "Warehouse Operatives", shortName: "Warehouse", tagline: "Keep your stock moving", summary: "Pickers, packers and forklift drivers.", image: img("staff-team.webp"), icon: "Warehouse", body: ["Flexible warehouse teams at short notice."], listTitle: "Roles we supply", listItems: ["Pickers", "Packers", "Forklift drivers"], isActive: true },
  { slug: "housekeeping", title: "Housekeeping", shortName: "Housekeeping", tagline: "Spotless rooms, every time", summary: "Room attendants and housekeeping supervisors.", image: img("lobby.webp"), icon: "BedDouble", body: ["Trained room attendants for hotels."], listTitle: "Roles we supply", listItems: ["Room attendants", "Supervisors"], isActive: true },
  { slug: "cleaning", title: "Residential & Commercial Cleaning", shortName: "Cleaning", tagline: "Clean spaces, happy people", summary: "Domestic and commercial cleaning teams.", image: img("lobby.webp"), icon: "Sparkles", body: ["Reliable cleaners for homes and offices."], listTitle: "What you can expect", listItems: ["Vetted cleaners", "Flexible schedules"], isActive: true },
]);

const jobs = rows("job", [
  { slug: "room-attendant-heathrow", title: "Room Attendant / Housekeeper", sector: "housekeeping", location: "Heathrow, London", postcode: "TW6", type: "Temporary", pay: "12.71", payFrequency: "Hourly", hours: "Flexible shifts, weekdays & weekends", summary: "Join our hotel housekeeping teams near Heathrow.", description: "We are looking for reliable room attendants for 4-star hotels around Heathrow.", responsibilities: ["Clean and prepare guest rooms", "Restock amenities"], requirements: ["Right to work in the UK", "Attention to detail"], benefits: ["Weekly pay", "Uniform provided"], status: "Active", postedDate: "2026-10-12" },
  { slug: "chef-de-partie-heathrow", title: "Chef de Partie - Heathrow", sector: "hospitality", location: "Heathrow, London", postcode: "TW6", type: "Permanent", pay: "32000", payFrequency: "Annual", hours: "5 days, 45 hours", summary: "Busy hotel kitchen seeks experienced CDP.", description: "Run your own section in a high-volume hotel kitchen.", responsibilities: ["Run a section", "Maintain food safety"], requirements: ["2 years CDP experience", "Level 2 food hygiene"], benefits: ["Meals on duty", "28 days holiday"], status: "Active", postedDate: "2026-10-08" },
  { slug: "door-supervisor-wembley", title: "Door Supervisor", sector: "security", location: "Wembley, London", postcode: "HA9", type: "Temporary", pay: "13.50", payFrequency: "Hourly", hours: "Event days", summary: "Stadium event security.", description: "Event security at Wembley Stadium.", responsibilities: ["Search and screen guests"], requirements: ["Valid SIA licence"], benefits: ["Weekly pay"], status: "Active", postedDate: "2026-10-02" },
  { slug: "forklift-driver-hounslow", title: "Forklift Driver", sector: "warehouse", location: "Hounslow", postcode: "TW4", type: "Temp to perm", pay: "13.00", payFrequency: "Hourly", hours: "Night shifts", summary: "Counterbalance FLT driver.", description: "Night shift FLT driver for a distribution centre.", responsibilities: ["Load and unload"], requirements: ["Counterbalance licence"], benefits: ["Overtime available"], status: "Draft", postedDate: "2026-09-28" },
  { slug: "kitchen-porter-london", title: "Kitchen Porter", sector: "hospitality", location: "Central London", postcode: "W1", type: "Temporary", pay: "12.21", payFrequency: "Hourly", hours: "Evenings", summary: "Restaurant KP role.", description: "Support a busy restaurant kitchen.", responsibilities: ["Wash up"], requirements: ["Team player"], benefits: ["Free meals"], status: "Closed", postedDate: "2026-09-10" },
]);

const people = [
  ["Aisha", "Khan", "room-attendant-heathrow"], ["Daniel", "Okoro", "chef-de-partie-heathrow"], ["Maria", "Silva", "room-attendant-heathrow"], ["Tom", "Hughes", "door-supervisor-wembley"],
  ["Priya", "Patel", "chef-de-partie-heathrow"], ["Jakub", "Nowak", "forklift-driver-hounslow"], ["Grace", "Mensah", "room-attendant-heathrow"], ["Liam", "O'Brien", "door-supervisor-wembley"],
];
const statuses: Application["status"][] = ["Submitted", "Under Review", "Shortlisted", "Hired", "Rejected"];

const applications: Application[] = people.map(([first, last, slug], i) => {
  const job = jobs.find((j) => j.slug === slug)!;
  const day = String(26 - i * 2).padStart(2, "0");
  return {
    id: `app-${1001 + i}`,
    jobId: String(job.id),
    jobTitle: String(job.title),
    sector: String(job.sector),
    status: statuses[i % statuses.length],
    appliedAt: `2026-10-${day}T10:${String(10 + i).padStart(2, "0")}:00Z`,
    notes: "",
    personal: { firstName: first, lastName: last, email: `${first.toLowerCase()}.${last.toLowerCase().replace("'", "")}@example.com`, phone: `07700 90${String(1000 + i * 37).slice(-4)}`, town: "Hounslow", postcode: `TW${3 + (i % 4)} ${i + 1}AB`, dob: "1994-05-14", linkedin: "", contactPref: "WhatsApp", bestTime: "Morning (8-12)" },
    role: { appType: "Specific job", jobRef: slug, contract: String(job.type), salaryExpected: "", salaryMin: "", rate: "13", notice: "Available now", startDate: "2026-11-03", travel: "Up to 10 mi", availability: "Mon–Sat", workedFor: "No", patterns: ["Weekdays", "Weekends"] },
    experience: { currentTitle: "Housekeeper", currentEmployer: "Park Hotel", tenure: "2 years", leaveReason: "Seeking more hours", skills: "Room servicing, linen handling", qualifications: "Level 2 Health & Safety", languages: "English, Polish", source: "Indeed", lookingFor: "Steady weekly hours", employers: [{ employer: "Park Hotel", title: "Housekeeper", fromMonth: "2024-01", toMonth: "2026-09" }], gaps: "" },
    licences: { licences: i % 2 ? ["SIA", "First Aid"] : ["DBS Basic"], otherLicences: "", referees: [{ name: "Sarah Lee", relation: "Manager", email: "sarah@example.com", phone: "07700 900111" }], refConsent: true, niNumber: `QQ12345${i}C` },
    rightToWork: { rtw: i % 3 ? "British/Irish citizen" : "Settled/pre-settled status", shareCode: i % 3 ? "" : "W12ABC345", idType: "Passport", cvFile: `${SITE}/files/cv-${1001 + i}.pdf`, idFile: `${SITE}/files/id-${1001 + i}.pdf`, adjustments: "" },
    compliance: { consent: true, keepOnFile: true, jobAlerts: i % 2 === 0, textConsent: true, signature: `${first} ${last}`, signDate: `2026-10-${day}` },
  };
});

export const seed: CmsResources = {
  header: {
    logoUrl: `${SITE}/images/brand/asl-logo.png`,
    logoAlt: "ASL Staffing Solutions",
    notice: "Reliable People. Ready When You Are.",
    navItems: [
      { id: "nav-1", label: "Home", url: "/", type: "text", target: "_self", isActive: true },
      { id: "nav-2", label: "About Us", url: "/about", type: "text", target: "_self", isActive: true },
      { id: "nav-3", label: "Services", url: "/services", type: "text", target: "_self", isActive: true },
      { id: "nav-4", label: "Careers", url: "/careers", type: "text", target: "_self", isActive: true },
      { id: "nav-5", label: "Contact", url: "/contact", type: "text", target: "_self", isActive: true },
      { id: "nav-6", label: "Sign in", url: "/sign-in", type: "outline", target: "_self", isActive: true },
      { id: "nav-7", label: "Hire Staff", url: "/contact?type=staff", type: "gold", target: "_self", isActive: true },
    ],
  },
  footer: {
    motto: "Excellence Uncompromised",
    description: "Staffing and recruitment across the UK — temporary and permanent.",
    columns: [
      { id: "col-1", title: "Company", links: [{ id: "l1", label: "About Us", url: "/about" }, { id: "l2", label: "Careers", url: "/careers" }, { id: "l3", label: "Contact", url: "/contact" }] },
      { id: "col-2", title: "Sectors", links: [{ id: "l4", label: "Hospitality", url: "/services/hospitality" }, { id: "l5", label: "Security", url: "/services/security" }, { id: "l6", label: "Warehouse", url: "/services/warehouse" }] },
      { id: "col-3", title: "Legal", links: [{ id: "l7", label: "Privacy Policy", url: "/privacy" }, { id: "l8", label: "Terms", url: "/terms" }] },
    ],
    phones: ["0203 105 2759", "07 500 020 157", "07 568 567 157", "07 804 746 257"],
    emails: ["info@aslservices.co.uk", "accounts@aslservices.co.uk"],
    addressLines: ["Jolyon House, Amberley Way", "Cranford, Hounslow", "TW4 6BH, UK"],
    hours: "Open 24/7",
    whatsapp: "447500020157",
    linkedin: "https://www.linkedin.com/company/aslstaffing/",
    copyright: "© 2017–2026 ASL Services and Management Limited.",
    registration: "Company registered in England & Wales.",
  },
  heroes: {
    home: { eyebrow: "ASL Staffing Solutions", line1: "Connecting Talent", line2: "with Opportunity", subtitle: "ASL Staffing Solutions expertly connects top talent with leading companies.", tagline: "Reliable People. Ready When You Are.", images: [{ id: "hi-1", label: "Arch image", url: img("lobby.webp") }, { id: "hi-2", label: "Team box image", url: img("staff-team.webp") }], buttons: [{ id: "hb-1", label: "Contact Us", url: "/contact", variant: "gold", icon: "Phone" }, { id: "hb-2", label: "Our Services", url: "/services", variant: "outline", icon: "ArrowRight" }] },
    about: { eyebrow: "About us", line1: "People-first", line2: "staffing since 2017", subtitle: "A London agency built on reliability.", tagline: "", images: [{ id: "ha-1", label: "Header image", url: img("meeting.webp") }], buttons: [] },
    services: { eyebrow: "Our services", line1: "Eight sectors,", line2: "one trusted partner", subtitle: "Temporary and permanent staff across the UK.", tagline: "", images: [{ id: "hs-1", label: "Header image", url: img("staff-team.webp") }], buttons: [{ id: "hs-b1", label: "Hire Staff", url: "/contact?type=staff", variant: "gold", icon: "Users" }] },
    careers: { eyebrow: "Careers", line1: "Find your", line2: "next role", subtitle: "Browse live vacancies across London.", tagline: "", images: [{ id: "hc-1", label: "Header image", url: img("lobby.webp") }], buttons: [] },
    contact: { eyebrow: "Contact", line1: "Let's talk", line2: "staffing", subtitle: "We're open 24/7.", tagline: "", images: [{ id: "hct-1", label: "Header image", url: img("meeting.webp") }], buttons: [] },
    apply: { eyebrow: "Job application", line1: "Apply for", line2: "{jobTitle}", subtitle: "Six short steps — your answers are kept as you move between them. Fields marked * are required.", tagline: "", images: [], buttons: [] },
  },
  home: {
    workWithUs: {
      eyebrow: "Work with us",
      title: "Top-tier talent and business solutions for exceptional companies",
      body: "We provide temporary and permanent recruitment across eight sectors.",
      image: img("meeting.webp"),
      facts: rows("fact", [{ value: "Since 2017", label: "Growing every year" }, { value: "24/7", label: "Always available" }, { value: "8 sectors", label: "One trusted partner" }, { value: "GLAA", label: "Licensed for labour" }]),
    },
    whyAsl: rows("why", [
      { title: "Reduced work overload", description: "Extra hands when you need them.", icon: "Layers" },
      { title: "Increased productivity", description: "Skilled staff from day one.", icon: "TrendingUp" },
      { title: "Decreased payroll costs", description: "Pay only for hours worked.", icon: "PoundSterling" },
      { title: "Saving time and resources", description: "We handle sourcing and vetting.", icon: "Clock" },
      { title: "Fully screened, trained and inducted candidates", description: "Compliance checked.", icon: "BadgeCheck" },
      { title: "Speeding up the time to getting hired", description: "Shortlists in hours.", icon: "Zap" },
    ]),
    clients: rows("client", ["Marriott", "Hyatt Place", "Crowne Plaza", "Holiday Inn", "Sofitel", "Wembley Stadium"].map((name) => ({ name, logoUrl: "" }))),
    accreditations: rows("acc", [{ name: "GLAA", imageUrl: "" }, { name: "RoSPA", imageUrl: "" }, { name: "SIA Approved", imageUrl: "" }]),
  },
  about: {
    story: ["ASL was founded in 2017 to bring reliable people to London's busiest businesses.", "Today we supply hundreds of shifts every week across eight sectors."],
    values: rows("val", [
      { number: "01", title: "Reliability", description: "We show up, every time.", image: "" },
      { number: "02", title: "Integrity", description: "Honest, compliant, transparent.", image: "" },
      { number: "03", title: "Care", description: "People-first in everything.", image: "" },
      { number: "04", title: "Speed", description: "Fast response, day or night.", image: "" },
      { number: "05", title: "Excellence", description: "Excellence uncompromised.", image: "" },
    ]),
    team: rows("team", [
      { name: "Muhammad Amir", role: "CEO", photo: "", bio: "Founded ASL with a mission to put people first." },
      { name: "Muhammad Mohsin Bhatti", role: "General Manager", photo: "", bio: "Leads day-to-day operations across all sectors." },
    ]),
  },
  services,
  jobs,
  applications,
  messages: rows("msg", [
    { name: "James Carter", email: "james@example.com", phone: "07700 900222", subject: "Partnership", message: "Do you cover Reading?", createdAt: "2026-10-26T09:12:00Z", status: "New" },
    { name: "Fatima Ali", email: "fatima@example.com", phone: "07700 900333", subject: "Job question", message: "Is the room attendant role still open?", createdAt: "2026-10-25T15:40:00Z", status: "Read" },
    { name: "Oliver Brown", email: "oliver@example.com", phone: "", subject: "Invoice", message: "Please resend October invoice.", createdAt: "2026-10-24T11:05:00Z", status: "New" },
  ]),
  quotes: rows("quote", [
    { name: "Helen Ward", company: "Riverside Hotel", email: "helen@riverside.co.uk", phone: "020 7946 0001", sector: "housekeeping", headcount: "6", startDate: "2026-11-01", details: "Weekend room attendants.", createdAt: "2026-10-26T08:00:00Z", status: "New" },
    { name: "Ravi Shah", company: "Northgate Logistics", email: "ravi@northgate.com", phone: "020 7946 0002", sector: "warehouse", headcount: "12", startDate: "2026-11-10", details: "Peak season pickers.", createdAt: "2026-10-23T13:20:00Z", status: "Quoted" },
  ]),
};
