import { options } from "@/config/admin";
import type { FieldDef } from "./fields";

// Form schemas — every editor in the dashboard is rendered from these definitions.

const sectorSelect = { resource: "services", value: "slug", label: "title" } as const;
const linkFields: FieldDef[] = [
  { key: "label", label: "Title", type: "text" },
  { key: "url", label: "URL / Path", type: "text", placeholder: "/about" },
];

export const schemas = {
  navItem: [
    { key: "label", label: "Label", type: "text" },
    { key: "url", label: "URL / Path", type: "text", placeholder: "/careers" },
    { key: "type", label: "Type", type: "select", options: options.navType },
    { key: "target", label: "Target", type: "select", options: options.target },
    { key: "isActive", label: "Active", type: "switch", default: true },
  ],
  headerMeta: [
    { key: "logoUrl", label: "Header logo", type: "image" },
    { key: "logoAlt", label: "Logo alt text", type: "text" },
    { key: "notice", label: "Top notice / tagline", type: "text", full: true },
  ],
  footerBrand: [
    { key: "motto", label: "Motto", type: "text" },
    { key: "description", label: "Description", type: "textarea", full: true },
  ],
  footerColumn: [
    { key: "title", label: "Column title", type: "text", placeholder: "Quick Links", full: true },
    { key: "links", label: "Links", type: "collection", itemFields: linkFields, itemTitleKey: "label", itemSubtitleKey: "url", itemLabel: "Link" },
  ],
  footerContact: [
    { key: "phones", label: "Phone lines", type: "stringList", itemLabel: "phone" },
    { key: "emails", label: "Email addresses", type: "stringList", itemLabel: "email" },
    { key: "addressLines", label: "Office address lines", type: "stringList", itemLabel: "line" },
    { key: "hours", label: "Opening hours", type: "text" },
    { key: "whatsapp", label: "WhatsApp number", type: "text", help: "International format, digits only" },
    { key: "linkedin", label: "LinkedIn URL", type: "url" },
  ],
  footerLegal: [
    { key: "copyright", label: "Copyright", type: "text", full: true },
    { key: "registration", label: "Company registration", type: "text", full: true },
  ],
  hero: [
    { key: "eyebrow", label: "Eyebrow tagline", type: "text" },
    { key: "tagline", label: "Italic motto", type: "text" },
    { key: "line1", label: "Headline line 1", type: "text" },
    { key: "line2", label: "Headline line 2 (gold highlight)", type: "text" },
    { key: "subtitle", label: "Subtitle / description", type: "textarea", full: true },
    { key: "images", label: "Hero media", type: "collection", itemLabel: "Image", itemTitleKey: "label", itemSubtitleKey: "url", itemFields: [{ key: "label", label: "Slot name", type: "text" }, { key: "url", label: "Image", type: "image" }] },
    {
      key: "buttons", label: "Hero action buttons", type: "collection", itemLabel: "Hero Button", itemTitleKey: "label", itemSubtitleKey: "url",
      itemFields: [
        { key: "label", label: "Button text", type: "text" },
        { key: "url", label: "Button URL", type: "text" },
        { key: "variant", label: "Variant", type: "select", options: options.heroVariant },
        { key: "icon", label: "Icon", type: "icon" },
      ],
    },
  ],
  workWithUs: [
    { key: "eyebrow", label: "Eyebrow", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "body", label: "Body text", type: "textarea", full: true },
    { key: "image", label: "Meeting photo", type: "image" },
    { key: "facts", label: "Fact counters", type: "collection", itemLabel: "Fact", itemTitleKey: "value", itemSubtitleKey: "label", itemFields: [{ key: "value", label: "Value", type: "text" }, { key: "label", label: "Label", type: "text" }] },
  ],
  featureCard: [
    { key: "title", label: "Title", type: "text" },
    { key: "icon", label: "Icon", type: "icon" },
    { key: "description", label: "Description", type: "textarea", full: true },
  ],
  logo: [
    { key: "name", label: "Name", type: "text" },
    { key: "logoUrl", label: "Logo image", type: "image" },
  ],
  badge: [
    { key: "name", label: "Name", type: "text" },
    { key: "imageUrl", label: "Badge image", type: "image" },
  ],
  value: [
    { key: "number", label: "Number", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "description", label: "Description", type: "textarea", full: true },
    { key: "image", label: "Image", type: "image" },
  ],
  teamMember: [
    { key: "name", label: "Full name", type: "text" },
    { key: "role", label: "Designation / role", type: "text" },
    { key: "photo", label: "Photo", type: "image" },
    { key: "bio", label: "Quote / biography", type: "textarea", full: true },
  ],
  service: [
    { key: "title", label: "Title", type: "text" },
    { key: "slug", label: "Slug", type: "text", placeholder: "hospitality" },
    { key: "shortName", label: "Short name", type: "text" },
    { key: "icon", label: "Icon", type: "icon" },
    { key: "tagline", label: "Tagline", type: "text", full: true },
    { key: "summary", label: "Summary", type: "textarea", full: true },
    { key: "image", label: "Sector photo", type: "image" },
    { key: "isActive", label: "Active", type: "switch", default: true },
    { key: "body", label: "Description paragraphs", type: "stringList", itemLabel: "paragraph" },
    { key: "listTitle", label: "List title", type: "text", placeholder: "Roles we supply" },
    { key: "listItems", label: "Roles / highlights", type: "stringList", itemLabel: "item" },
  ],
  job: [
    { key: "title", label: "Job title", type: "text", placeholder: "Chef de Partie - Heathrow", full: true },
    { key: "slug", label: "Slug", type: "text" },
    { key: "sector", label: "Sector", type: "select", optionsFrom: sectorSelect },
    { key: "location", label: "Location", type: "text" },
    { key: "postcode", label: "Postcode", type: "text" },
    { key: "type", label: "Job type", type: "select", options: options.jobType },
    { key: "status", label: "Status", type: "select", options: options.jobStatus, default: "Draft" },
    { key: "pay", label: "Pay rate (£)", type: "number" },
    { key: "payFrequency", label: "Pay frequency", type: "select", options: options.payFrequency },
    { key: "hours", label: "Working hours / shifts", type: "text", full: true },
    { key: "summary", label: "Short summary", type: "textarea", full: true },
    { key: "description", label: "Full description", type: "textarea", full: true },
    { key: "responsibilities", label: "Responsibilities", type: "stringList", itemLabel: "responsibility" },
    { key: "requirements", label: "Requirements", type: "stringList", itemLabel: "requirement" },
    { key: "benefits", label: "Benefits & perks", type: "stringList", itemLabel: "benefit" },
    { key: "postedDate", label: "Posted date", type: "date" },
  ],
  story: [{ key: "story", label: "Story paragraphs", type: "stringList", itemLabel: "paragraph" }],
} satisfies Record<string, FieldDef[]>;

/** Application detail drawer — the 6 steps of the public form. */
export const applicationSections: { title: string; fields: { key: string; label: string; file?: boolean }[] }[] = [
  { title: "Personal details", fields: [["personal.firstName", "First name"], ["personal.lastName", "Last name"], ["personal.email", "Email"], ["personal.phone", "Phone"], ["personal.town", "Town"], ["personal.postcode", "Postcode"], ["personal.dob", "Date of birth"], ["personal.linkedin", "LinkedIn"], ["personal.contactPref", "Contact preference"], ["personal.bestTime", "Best time to call"]].map(([key, label]) => ({ key, label })) },
  { title: "Role & pay", fields: [["role.appType", "Application type"], ["role.contract", "Contract"], ["role.salaryExpected", "Expected salary"], ["role.salaryMin", "Minimum pay"], ["role.rate", "Rate (£)"], ["role.notice", "Notice period"], ["role.startDate", "Start date"], ["role.travel", "Commute"], ["role.availability", "Availability"], ["role.patterns", "Shift patterns"], ["role.workedFor", "Worked for ASL before"]].map(([key, label]) => ({ key, label })) },
  { title: "Experience", fields: [["experience.currentTitle", "Current job"], ["experience.currentEmployer", "Employer"], ["experience.tenure", "Tenure"], ["experience.leaveReason", "Reason for leaving"], ["experience.skills", "Skills"], ["experience.qualifications", "Qualifications"], ["experience.languages", "Languages"], ["experience.source", "Heard about us"], ["experience.employers", "Work history"], ["experience.gaps", "Gaps explanation"]].map(([key, label]) => ({ key, label })) },
  { title: "Licences & references", fields: [["licences.licences", "Certifications"], ["licences.otherLicences", "Other licences"], ["licences.referees", "Referees"], ["licences.refConsent", "Referee contact consent"], ["licences.niNumber", "NI number"]].map(([key, label]) => ({ key, label })) },
  { title: "Right to work & documents", fields: [{ key: "rightToWork.rtw", label: "UK right to work" }, { key: "rightToWork.shareCode", label: "Share code" }, { key: "rightToWork.idType", label: "Photo ID type" }, { key: "rightToWork.cvFile", label: "CV document", file: true }, { key: "rightToWork.idFile", label: "Photo ID document", file: true }, { key: "rightToWork.adjustments", label: "Adjustments" }] },
  { title: "Compliance", fields: [["compliance.consent", "GDPR consent"], ["compliance.keepOnFile", "Keep on file 12 months"], ["compliance.jobAlerts", "Job alerts"], ["compliance.textConsent", "SMS / WhatsApp permission"], ["compliance.signature", "Signature"], ["compliance.signDate", "Signed on"]].map(([key, label]) => ({ key, label })) },
];

export const applicationColumns = [
  { key: "name", label: "Applicant" },
  { key: "jobTitle", label: "Role / sector" },
  { key: "personal.email", label: "Email" },
  { key: "personal.phone", label: "Phone" },
  { key: "personal.postcode", label: "Postcode" },
  { key: "licences.niNumber", label: "NI number" },
  { key: "rightToWork.rtw", label: "Right to work" },
  { key: "appliedAt", label: "Applied" },
  { key: "status", label: "Status" },
];

export const inquiryTabs = [
  { key: "messages" as const, label: "General messages", titleKey: "name", statusOptions: options.messageStatus, readValue: "Read", fields: [["subject", "Subject"], ["email", "Email"], ["phone", "Phone"], ["message", "Message"], ["createdAt", "Received"]] },
  { key: "quotes" as const, label: "Staff quotations", titleKey: "company", statusOptions: options.quoteStatus, readValue: undefined, fields: [["name", "Contact"], ["email", "Email"], ["phone", "Phone"], ["sector", "Sector needed"], ["headcount", "Headcount"], ["startDate", "Start date"], ["details", "Details"], ["createdAt", "Received"]] },
];
