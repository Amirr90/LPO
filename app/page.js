"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const calendlyUrl = "https://calendly.com/aamirr-1232/30min";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [siteSettings, setSiteSettings] = useState({
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
    heroSupportText: "Free consultation, no obligation, and secure communication tailored for law firms.",
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
    whatsappMessage: "Hello, I am interested in LPO services. Please share details and pricing.",
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
  });
  const whatsappUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(siteSettings.whatsappMessage)}`;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const response = await fetch(`/api/admin/settings?t=${Date.now()}`, {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" }
        });
        if (!response.ok) {
          return;
        }

        const payload = await response.json();
        if (mounted && payload?.settings) {
          setSiteSettings(payload.settings);
        }
      } catch {
        // Keep default hero text if settings API is unavailable.
      }
    };

    loadSettings();

    const loadAdminSession = async () => {
      try {
        const response = await fetch("/api/admin/session");
        if (!response.ok) {
          return;
        }
        const payload = await response.json();
        if (mounted && payload?.isAdmin) {
          setIsAdmin(true);
        }
      } catch {
        // Ignore session errors on public page.
      }
    };

    loadAdminSession();

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!fullName || !email || !company || !message) {
      setMessageType("error");
      setFormMessage("Please fill in all fields before submitting.");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      setMessageType("error");
      setFormMessage("Please enter a valid work email address.");
      return;
    }

    setMessageType("success");
    setFormMessage("Thank you. Your request has been recorded.");
    event.currentTarget.reset();
  };

  const handleBookConsultation = (event) => {
    event.preventDefault();

    if (typeof window === "undefined") {
      return;
    }

    try {
      if (window.Calendly?.initPopupWidget) {
        window.Calendly.initPopupWidget({ url: calendlyUrl });
        return;
      }
    } catch {
      // Fallback to direct redirect when popup cannot initialize.
    }

    window.location.href = calendlyUrl;
  };

  return (
    <>
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand">
            {siteSettings.brandName}
          </a>
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            type="button"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={`site-nav ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
            {siteSettings.navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
            {isAdmin && (
              <span className="site-nav-admin" role="group" aria-label="Admin only links">
                <a href="/admin" className="site-nav-admin-link" onClick={closeMenu}>
                  Admin
                </a>
                <a href="/admin#users" className="site-nav-admin-link" onClick={closeMenu}>
                  Add user
                </a>
              </span>
            )}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">{siteSettings.heroEyebrow}</p>
              <h1>{siteSettings.heroHeading}</h1>
              <p className="lead">
                {siteSettings.heroSubheading}
              </p>
              <p className="hero-subtext">
                {siteSettings.heroSupportText}
              </p>
              <div className="hero-cta items-stretch md:items-center">
                <a
                  href={calendlyUrl}
                  className="btn btn-primary shadow-lg shadow-slate-900/20"
                  onClick={handleBookConsultation}
                >
                  {siteSettings.heroCtaPrimary}
                </a>
                <a href="#contact" className="btn btn-secondary bg-white/95 text-slate-900">
                  {siteSettings.heroCtaSecondary}
                </a>
                <a
                  href={whatsappUrl}
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-300/70 bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-500/25"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Start WhatsApp enquiry"
                  title="Quick support only - for detailed enquiries, book a consultation"
                >
                  WhatsApp Enquiry
                </a>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-200">
                {siteSettings.heroQuickPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
              <p className="mt-2 text-xs text-emerald-100/95">
                For quick queries only.
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-200">
                {siteSettings.heroTrustPoints.map((point) => (
                  <p key={point}>{point}</p>
                ))}
              </div>
            </div>
            <aside className="hero-card">
              <h2>{siteSettings.heroCardTitle}</h2>
              <ul>
                {siteSettings.heroCardItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="trust-bar">
          <div className="container trust-items">
            {siteSettings.trustItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <h2>{siteSettings.servicesTitle}</h2>
            <p className="section-intro">
              {siteSettings.servicesIntro}
            </p>
            <div className="card-grid">
              {siteSettings.services.map((service) => (
                <article className="card service-card" key={service.title}>
                  <span className="service-badge">LPO Service</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
            <div className="services-cta-row">
              <a href="#contact" className="btn btn-primary">
                {siteSettings.servicesCtaPrimary}
              </a>
              <a href={whatsappUrl} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
                {siteSettings.servicesCtaSecondary}
              </a>
            </div>
          </div>
        </section>

        <section id="industries" className="section section-alt">
          <div className="container">
            <h2>{siteSettings.industriesTitle}</h2>
            <div className="chip-row">
              {siteSettings.industries.map((industry) => (
                <span key={industry}>{industry}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container split">
            <div>
              <h2>{siteSettings.aboutTitle}</h2>
              <p>
                {siteSettings.aboutDescription}
              </p>
            </div>
            <div className="process">
              <h3>{siteSettings.processTitle}</h3>
              <ol>
                {siteSettings.processSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section id="case-studies" className="section section-alt">
          <div className="container">
            <h2>{siteSettings.caseStudiesTitle}</h2>
            <div className="card-grid two-col">
              {siteSettings.caseStudies.map((caseStudy) => (
                <article className="card" key={caseStudy.title}>
                  <h3>{caseStudy.title}</h3>
                  <p>{caseStudy.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <h2>{siteSettings.faqTitle}</h2>
            <div className="faq-list">
              {siteSettings.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section cta">
          <div className="container split">
            <div>
              <h2>{siteSettings.contactHeading}</h2>
              <p>
                {siteSettings.contactDescription}
              </p>
              <a href={whatsappUrl} className="btn btn-whatsapp" target="_blank" rel="noreferrer">
                {siteSettings.contactWhatsappLabel}
              </a>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <label htmlFor="fullName">Full Name</label>
              <input id="fullName" name="fullName" type="text" required />

              <label htmlFor="email">Work Email</label>
              <input id="email" name="email" type="email" required />

              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" required />

              <label htmlFor="message">Project Requirement</label>
              <textarea id="message" name="message" rows={4} required></textarea>

              <button type="submit" className="btn btn-cta">
                {siteSettings.contactFormButtonText}
              </button>
              <p className={`form-message ${messageType}`} aria-live="polite">
                {formMessage}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>&copy; {siteSettings.footerCopyright}</p>
          <nav aria-label="Footer links">
            {siteSettings.footerLinks.map((link) => (
              <a key={`${link.label}-${link.href}`} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>

      <a
        href={whatsappUrl}
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp enquiry"
      >
        {siteSettings.floatingWhatsappLabel}
      </a>
    </>
  );
}
