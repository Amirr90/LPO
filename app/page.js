"use client";

import { useState } from "react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#about", label: "About Us" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" }
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formMessage, setFormMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const closeMenu = () => setMenuOpen(false);

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

  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#home" className="brand">
            LPO Legal Solutions
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
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Trusted LPO Partner</p>
              <h1>Scale legal operations with secure, high-quality outsourcing.</h1>
              <p className="lead">
                We help law firms and legal departments reduce turnaround time, improve delivery
                quality, and control costs with dedicated legal support teams.
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary">
                  Book Consultation
                </a>
                <a href="#services" className="btn btn-secondary">
                  Explore Services
                </a>
              </div>
            </div>
            <aside className="hero-card">
              <h2>Why teams choose us</h2>
              <ul>
                <li>24-48 hour delivery options</li>
                <li>Strict confidentiality standards</li>
                <li>Skilled legal and compliance professionals</li>
                <li>Transparent pricing and predictable outcomes</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="trust-bar">
          <div className="container trust-items">
            <p>Confidential workflows</p>
            <p>Domain-trained legal teams</p>
            <p>US-focused legal standards</p>
            <p>Dedicated delivery manager</p>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <h2>Core Services</h2>
            <p className="section-intro">
              End-to-end support built for legal teams that need speed, precision, and consistency.
            </p>
            <div className="card-grid">
              <article className="card">
                <h3>Contract Review</h3>
                <p>Review, summarize, and flag key obligations, liabilities, and negotiation points.</p>
              </article>
              <article className="card">
                <h3>Legal Research</h3>
                <p>Jurisdiction-focused legal research with concise briefs and citation support.</p>
              </article>
              <article className="card">
                <h3>Document Review</h3>
                <p>Large-scale review for due diligence, eDiscovery, and compliance-driven audits.</p>
              </article>
              <article className="card">
                <h3>Compliance Support</h3>
                <p>Policy checks, risk mapping, and periodic compliance review for regulated sectors.</p>
              </article>
              <article className="card">
                <h3>Litigation Support</h3>
                <p>Chronologies, evidence indexing, and draft-ready legal documentation support.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="industries" className="section section-alt">
          <div className="container">
            <h2>Industries We Support</h2>
            <div className="chip-row">
              <span>Banking & Finance</span>
              <span>Healthcare</span>
              <span>Technology</span>
              <span>Insurance</span>
              <span>Real Estate</span>
              <span>Manufacturing</span>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container split">
            <div>
              <h2>About Us</h2>
              <p>
                LPO Legal Solutions is built around process excellence and legal rigor. We combine
                experienced professionals, quality controls, and secure delivery practices to support
                your legal function as an extension of your in-house team.
              </p>
            </div>
            <div className="process">
              <h3>Our Delivery Process</h3>
              <ol>
                <li>Scope and intake alignment</li>
                <li>Team assignment and kickoff</li>
                <li>Quality checkpoints and review</li>
                <li>Delivery, feedback, and continuous optimization</li>
              </ol>
            </div>
          </div>
        </section>

        <section id="case-studies" className="section section-alt">
          <div className="container">
            <h2>Case Studies</h2>
            <div className="card-grid two-col">
              <article className="card">
                <h3>Contract Turnaround Reduced by 40%</h3>
                <p>
                  A midsize law firm improved negotiation cycles by standardizing review workflows
                  with our dedicated contracts team.
                </p>
              </article>
              <article className="card">
                <h3>Compliance Backlog Cleared in 6 Weeks</h3>
                <p>
                  A healthcare client resolved delayed policy audits through structured review,
                  reporting, and escalations.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="faq" className="section">
          <div className="container">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              <details>
                <summary>How do you ensure confidentiality?</summary>
                <p>We use secure systems, role-based access, and strict handling protocols.</p>
              </details>
              <details>
                <summary>Can you support high-volume projects?</summary>
                <p>Yes, we scale teams based on timelines, complexity, and quality targets.</p>
              </details>
              <details>
                <summary>Do you provide dedicated teams?</summary>
                <p>Yes, dedicated teams are available for ongoing legal operations support.</p>
              </details>
            </div>
          </div>
        </section>

        <section id="contact" className="section cta">
          <div className="container split">
            <div>
              <h2>Ready to streamline legal delivery?</h2>
              <p>Request a proposal and we will get back to you within one business day.</p>
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
                Request Proposal
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
          <p>&copy; 2026 LPO Legal Solutions. All rights reserved.</p>
          <nav aria-label="Footer links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#contact">Contact Info</a>
            <a href="#">LinkedIn</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
