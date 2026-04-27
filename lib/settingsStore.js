import fs from "node:fs/promises";
import path from "node:path";

const SITE_SETTINGS_KEY = "site_settings";
const dataDirectory = path.join(process.cwd(), "data");
const settingsFilePath = path.join(dataDirectory, "site-settings.json");

const DEFAULT_SITE_SETTINGS = {
  brandName: "LPO Legal Solutions",
  navItems: [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#industries", label: "Industries" },
    { href: "#about", label: "About Us" },
    { href: "#case-studies", label: "Case Studies" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" }
  ],
  heroEyebrow: "Trusted LPO Partner",
  heroHeading: "Scale legal operations with secure, high-quality outsourcing.",
  heroSubheading:
    "We help law firms and legal departments reduce turnaround time, improve delivery quality, and control costs with dedicated legal support teams.",
  heroSupportText:
    "Free consultation, no obligation, and secure communication tailored for law firms.",
  heroCtaPrimary: "Book Free Consultation",
  heroCtaSecondary: "Get a Quote",
  heroQuickPoints: ["Free 30-min consultation", "No obligation"],
  heroTrustPoints: [
    "Trusted by legal teams in US & UK",
    "Confidential & secure communication",
    "Get a response within 24 hours"
  ],
  heroCardTitle: "Why teams choose us",
  heroCardItems: [
    "24-48 hour delivery options",
    "Strict confidentiality standards",
    "Skilled legal and compliance professionals",
    "Transparent pricing and predictable outcomes"
  ],
  trustItems: [
    "Confidential workflows",
    "Domain-trained legal teams",
    "US-focused legal standards",
    "Dedicated delivery manager"
  ],
  servicesTitle: "Expanded LPO Services",
  servicesIntro:
    "End-to-end legal operations support designed for speed, compliance, and measurable outcomes.",
  services: [
    {
      title: "Contract Drafting and Review",
      description: "Draft, review, and redline agreements to reduce negotiation cycles and legal risk."
    },
    {
      title: "Legal Research and Memo Support",
      description: "Jurisdiction-specific research with concise memo outputs for faster legal decisions."
    },
    {
      title: "eDiscovery and Document Review",
      description: "Scalable review support for litigation, diligence, and internal investigations."
    },
    {
      title: "Deposition and Case Chronology Support",
      description: "Build clear timelines and deposition summaries to strengthen case preparation."
    },
    {
      title: "Compliance and Regulatory Monitoring",
      description: "Track obligations and policy changes to keep compliance programs audit-ready."
    },
    {
      title: "IP Docketing and Portfolio Support",
      description: "Maintain filing calendars and portfolio records with process-driven accuracy."
    }
  ],
  servicesCtaPrimary: "Request Service Proposal",
  servicesCtaSecondary: "Ask on WhatsApp",
  industriesTitle: "Industries We Support",
  industries: ["Banking & Finance", "Healthcare", "Technology", "Insurance", "Real Estate", "Manufacturing"],
  aboutTitle: "About Us",
  aboutDescription:
    "LPO Legal Solutions is built around process excellence and legal rigor. We combine experienced professionals, quality controls, and secure delivery practices to support your legal function as an extension of your in-house team.",
  processTitle: "Our Delivery Process",
  processSteps: [
    "Scope and intake alignment",
    "Team assignment and kickoff",
    "Quality checkpoints and review",
    "Delivery, feedback, and continuous optimization"
  ],
  caseStudiesTitle: "Case Studies",
  caseStudies: [
    {
      title: "Contract Turnaround Reduced by 40%",
      description:
        "A midsize law firm improved negotiation cycles by standardizing review workflows with our dedicated contracts team."
    },
    {
      title: "Compliance Backlog Cleared in 6 Weeks",
      description:
        "A healthcare client resolved delayed policy audits through structured review, reporting, and escalations."
    }
  ],
  faqTitle: "Frequently Asked Questions",
  faqs: [
    {
      question: "How do you ensure confidentiality?",
      answer: "We use secure systems, role-based access, and strict handling protocols."
    },
    {
      question: "Can you support high-volume projects?",
      answer: "Yes, we scale teams based on timelines, complexity, and quality targets."
    },
    {
      question: "Do you provide dedicated teams?",
      answer: "Yes, dedicated teams are available for ongoing legal operations support."
    }
  ],
  whatsappNumber: "0000000000",
  whatsappMessage:
    "Hello, I am interested in LPO services. Please share details and pricing.",
  contactWhatsappLabel: "Chat on WhatsApp",
  contactHeading: "Ready to streamline legal delivery?",
  contactDescription:
    "Request a proposal and we will get back to you within one business day. For urgent requirements, use WhatsApp for faster response.",
  contactFormButtonText: "Request Proposal",
  footerLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Contact Info", href: "#contact" },
    { label: "LinkedIn", href: "#" }
  ],
  floatingWhatsappLabel: "WhatsApp",
  footerCopyright: "2026 LPO Legal Solutions. All rights reserved."
};

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeWithDefaults(defaultValue, inputValue) {
  if (Array.isArray(defaultValue)) {
    return Array.isArray(inputValue) ? inputValue : defaultValue;
  }

  if (isPlainObject(defaultValue)) {
    if (!isPlainObject(inputValue)) {
      return defaultValue;
    }

    const merged = { ...defaultValue };
    for (const key of Object.keys(defaultValue)) {
      merged[key] = mergeWithDefaults(defaultValue[key], inputValue[key]);
    }
    return merged;
  }

  if (typeof defaultValue === "string") {
    return typeof inputValue === "string" ? inputValue : defaultValue;
  }

  return defaultValue;
}

function parseSiteSettings(value) {
  try {
    const parsed = JSON.parse(value);
    if (isPlainObject(parsed)) {
      return mergeWithDefaults(DEFAULT_SITE_SETTINGS, parsed);
    }
  } catch {
    // Fall through to defaults for malformed persisted values.
  }

  return DEFAULT_SITE_SETTINGS;
}

async function readSettingsFromFile() {
  try {
    const raw = await fs.readFile(settingsFilePath, "utf8");
    return parseSiteSettings(raw);
  } catch {
    await fs.mkdir(dataDirectory, { recursive: true });
    await fs.writeFile(settingsFilePath, JSON.stringify(DEFAULT_SITE_SETTINGS, null, 2), "utf8");
    return DEFAULT_SITE_SETTINGS;
  }
}

async function writeSettingsToFile(settings) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(settingsFilePath, JSON.stringify(settings, null, 2), "utf8");
}

async function readSettingsFromSqlite() {
  const { getDb } = await import("./db");
  const db = await getDb();
  const row = await db.get("SELECT value FROM site_settings WHERE key = ?", SITE_SETTINGS_KEY);

  if (!row?.value) {
    await db.run(
      "INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
      SITE_SETTINGS_KEY,
      JSON.stringify(DEFAULT_SITE_SETTINGS)
    );
    return DEFAULT_SITE_SETTINGS;
  }

  return parseSiteSettings(row.value);
}

async function writeSettingsToSqlite(settings) {
  const { getDb } = await import("./db");
  const db = await getDb();
  await db.run(
    "INSERT OR REPLACE INTO site_settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP)",
    SITE_SETTINGS_KEY,
    JSON.stringify(settings)
  );
}

export async function getSiteSettings() {
  try {
    return await readSettingsFromSqlite();
  } catch {
    return readSettingsFromFile();
  }
}

export async function updateSiteSettings(settings) {
  const normalized = mergeWithDefaults(DEFAULT_SITE_SETTINGS, settings);
  try {
    await writeSettingsToSqlite(normalized);
  } catch {
    await writeSettingsToFile(normalized);
  }

  return normalized;
}
