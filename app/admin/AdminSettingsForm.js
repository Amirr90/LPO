"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const sections = [
  { id: "general", label: "General" },
  { id: "navigation", label: "Navigation" },
  { id: "hero", label: "Hero" },
  { id: "trust", label: "Trust Bar" },
  { id: "services", label: "Services" },
  { id: "industries", label: "Industries" },
  { id: "about", label: "About & Process" },
  { id: "caseStudies", label: "Case Studies" },
  { id: "faq", label: "FAQ" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "contact", label: "Contact Section" },
  { id: "footer", label: "Footer" }
];

function StringListEditor({ label, items, onChange, placeholder }) {
  const updateItem = (index, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const addItem = () => onChange([...items, ""]);
  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div className="admin-list-block">
      <p className="admin-list-title">{label}</p>
      {items.map((item, index) => (
        <div className="admin-inline-row" key={`${label}-${index}`}>
          <input
            type="text"
            value={item}
            placeholder={placeholder}
            onChange={(event) => updateItem(index, event.target.value)}
          />
          <button type="button" className="admin-small-btn danger" onClick={() => removeItem(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="admin-small-btn" onClick={addItem}>
        Add Item
      </button>
    </div>
  );
}

function ObjectListEditor({ label, items, onChange, fields, addLabel }) {
  const updateItem = (index, field, value) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  };

  const addItem = () => {
    const newItem = Object.fromEntries(fields.map((field) => [field.key, ""]));
    onChange([...items, newItem]);
  };

  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div className="admin-list-block">
      <p className="admin-list-title">{label}</p>
      {items.map((item, index) => (
        <div className="admin-object-card" key={`${label}-${index}`}>
          {fields.map((field) => (
            <div key={`${field.key}-${index}`}>
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  rows={field.rows || 3}
                  value={item[field.key]}
                  onChange={(event) => updateItem(index, field.key, event.target.value)}
                />
              ) : (
                <input
                  type="text"
                  value={item[field.key]}
                  onChange={(event) => updateItem(index, field.key, event.target.value)}
                />
              )}
            </div>
          ))}
          <button type="button" className="admin-small-btn danger" onClick={() => removeItem(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="admin-small-btn" onClick={addItem}>
        {addLabel || "Add Item"}
      </button>
    </div>
  );
}

export default function AdminSettingsForm({ initialSettings }) {
  const router = useRouter();
  const [settings, setSettings] = useState(initialSettings);
  const [activeSection, setActiveSection] = useState("general");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const updateField = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setStatus("");
    setStatusType("");
    setIsSaving(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatusType("error");
        setStatus(payload?.error || "Unable to save settings.");
        return;
      }

      setSettings(payload.settings);
      setStatusType("success");
      setStatus("Settings saved successfully.");
      router.refresh();
    } catch {
      setStatusType("error");
      setStatus("Save failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="admin-page">
      <section className="admin-console">
        <aside className="admin-nav" aria-label="Admin menu">
          <h1>Admin Center</h1>
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`admin-nav-item ${activeSection === section.id ? "active" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
          <button type="button" className="admin-nav-item admin-logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </aside>

        <form className="admin-main" onSubmit={handleSave} noValidate>
          <div className="admin-main-header">
            <h2>{sections.find((section) => section.id === activeSection)?.label || "Settings"}</h2>
            <p>Manage website content and structure from one place.</p>
          </div>

          <div className="admin-section-panel">
            {activeSection === "general" && (
              <>
                <label htmlFor="brandName">Brand Name</label>
                <input id="brandName" type="text" value={settings.brandName} onChange={(event) => updateField("brandName", event.target.value)} required />
              </>
            )}

            {activeSection === "navigation" && (
              <ObjectListEditor
                label="Navigation Items"
                items={settings.navItems}
                onChange={(items) => updateField("navItems", items)}
                fields={[
                  { key: "label", label: "Label" },
                  { key: "href", label: "Href (example: #services)" }
                ]}
                addLabel="Add Navigation Item"
              />
            )}

            {activeSection === "hero" && (
              <>
                <label htmlFor="heroEyebrow">Hero Eyebrow</label>
                <input id="heroEyebrow" type="text" value={settings.heroEyebrow} onChange={(event) => updateField("heroEyebrow", event.target.value)} required />
                <label htmlFor="heroHeading">Hero Heading</label>
                <input id="heroHeading" type="text" maxLength={140} value={settings.heroHeading} onChange={(event) => updateField("heroHeading", event.target.value)} required />
                <label htmlFor="heroSubheading">Hero Subheading</label>
                <textarea id="heroSubheading" rows={4} value={settings.heroSubheading} onChange={(event) => updateField("heroSubheading", event.target.value)} required />
                <label htmlFor="heroSupportText">Hero Support Text</label>
                <textarea id="heroSupportText" rows={3} value={settings.heroSupportText} onChange={(event) => updateField("heroSupportText", event.target.value)} required />
                <label htmlFor="heroCtaPrimary">Primary CTA Label</label>
                <input id="heroCtaPrimary" type="text" value={settings.heroCtaPrimary} onChange={(event) => updateField("heroCtaPrimary", event.target.value)} />
                <label htmlFor="heroCtaSecondary">Secondary CTA Label</label>
                <input id="heroCtaSecondary" type="text" value={settings.heroCtaSecondary} onChange={(event) => updateField("heroCtaSecondary", event.target.value)} />
                <StringListEditor label="Quick Points" items={settings.heroQuickPoints} onChange={(items) => updateField("heroQuickPoints", items)} placeholder="Add quick point" />
                <StringListEditor label="Hero Trust Points" items={settings.heroTrustPoints} onChange={(items) => updateField("heroTrustPoints", items)} placeholder="Add trust point" />
                <label htmlFor="heroCardTitle">Hero Card Title</label>
                <input id="heroCardTitle" type="text" value={settings.heroCardTitle} onChange={(event) => updateField("heroCardTitle", event.target.value)} />
                <StringListEditor label="Hero Card Items" items={settings.heroCardItems} onChange={(items) => updateField("heroCardItems", items)} placeholder="Add hero card item" />
              </>
            )}

            {activeSection === "trust" && (
              <StringListEditor label="Trust Bar Items" items={settings.trustItems} onChange={(items) => updateField("trustItems", items)} placeholder="Add trust item" />
            )}

            {activeSection === "services" && (
              <>
                <label htmlFor="servicesTitle">Services Section Title</label>
                <input id="servicesTitle" type="text" value={settings.servicesTitle} onChange={(event) => updateField("servicesTitle", event.target.value)} />
                <label htmlFor="servicesIntro">Services Intro</label>
                <textarea id="servicesIntro" rows={3} value={settings.servicesIntro} onChange={(event) => updateField("servicesIntro", event.target.value)} />
                <ObjectListEditor
                  label="Services"
                  items={settings.services}
                  onChange={(items) => updateField("services", items)}
                  fields={[
                    { key: "title", label: "Service Title" },
                    { key: "description", label: "Service Description", type: "textarea", rows: 3 }
                  ]}
                  addLabel="Add Service"
                />
                <label htmlFor="servicesCtaPrimary">Services CTA Primary Label</label>
                <input id="servicesCtaPrimary" type="text" value={settings.servicesCtaPrimary} onChange={(event) => updateField("servicesCtaPrimary", event.target.value)} />
                <label htmlFor="servicesCtaSecondary">Services CTA Secondary Label</label>
                <input id="servicesCtaSecondary" type="text" value={settings.servicesCtaSecondary} onChange={(event) => updateField("servicesCtaSecondary", event.target.value)} />
              </>
            )}

            {activeSection === "industries" && (
              <>
                <label htmlFor="industriesTitle">Industries Title</label>
                <input id="industriesTitle" type="text" value={settings.industriesTitle} onChange={(event) => updateField("industriesTitle", event.target.value)} />
                <StringListEditor label="Industries" items={settings.industries} onChange={(items) => updateField("industries", items)} placeholder="Add industry" />
              </>
            )}

            {activeSection === "about" && (
              <>
                <label htmlFor="aboutTitle">About Title</label>
                <input id="aboutTitle" type="text" value={settings.aboutTitle} onChange={(event) => updateField("aboutTitle", event.target.value)} />
                <label htmlFor="aboutDescription">About Description</label>
                <textarea id="aboutDescription" rows={4} value={settings.aboutDescription} onChange={(event) => updateField("aboutDescription", event.target.value)} />
                <label htmlFor="processTitle">Process Title</label>
                <input id="processTitle" type="text" value={settings.processTitle} onChange={(event) => updateField("processTitle", event.target.value)} />
                <StringListEditor label="Process Steps" items={settings.processSteps} onChange={(items) => updateField("processSteps", items)} placeholder="Add process step" />
              </>
            )}

            {activeSection === "caseStudies" && (
              <>
                <label htmlFor="caseStudiesTitle">Case Studies Title</label>
                <input id="caseStudiesTitle" type="text" value={settings.caseStudiesTitle} onChange={(event) => updateField("caseStudiesTitle", event.target.value)} />
                <ObjectListEditor
                  label="Case Studies"
                  items={settings.caseStudies}
                  onChange={(items) => updateField("caseStudies", items)}
                  fields={[
                    { key: "title", label: "Case Study Title" },
                    { key: "description", label: "Case Study Description", type: "textarea", rows: 3 }
                  ]}
                  addLabel="Add Case Study"
                />
              </>
            )}

            {activeSection === "faq" && (
              <>
                <label htmlFor="faqTitle">FAQ Title</label>
                <input id="faqTitle" type="text" value={settings.faqTitle} onChange={(event) => updateField("faqTitle", event.target.value)} />
                <ObjectListEditor
                  label="FAQ Items"
                  items={settings.faqs}
                  onChange={(items) => updateField("faqs", items)}
                  fields={[
                    { key: "question", label: "Question" },
                    { key: "answer", label: "Answer", type: "textarea", rows: 3 }
                  ]}
                  addLabel="Add FAQ"
                />
              </>
            )}

            {activeSection === "whatsapp" && (
              <>
                <label htmlFor="whatsappNumber">WhatsApp Number</label>
                <input id="whatsappNumber" type="text" value={settings.whatsappNumber} onChange={(event) => updateField("whatsappNumber", event.target.value)} required />
                <label htmlFor="whatsappMessage">WhatsApp Default Message</label>
                <textarea id="whatsappMessage" rows={3} value={settings.whatsappMessage} onChange={(event) => updateField("whatsappMessage", event.target.value)} required />
                <label htmlFor="floatingWhatsappLabel">Floating WhatsApp Label</label>
                <input id="floatingWhatsappLabel" type="text" value={settings.floatingWhatsappLabel} onChange={(event) => updateField("floatingWhatsappLabel", event.target.value)} />
              </>
            )}

            {activeSection === "contact" && (
              <>
                <label htmlFor="contactHeading">Contact Section Heading</label>
                <input id="contactHeading" type="text" value={settings.contactHeading} onChange={(event) => updateField("contactHeading", event.target.value)} required />
                <label htmlFor="contactDescription">Contact Section Description</label>
                <textarea id="contactDescription" rows={4} value={settings.contactDescription} onChange={(event) => updateField("contactDescription", event.target.value)} required />
                <label htmlFor="contactWhatsappLabel">Contact WhatsApp Button Label</label>
                <input id="contactWhatsappLabel" type="text" value={settings.contactWhatsappLabel} onChange={(event) => updateField("contactWhatsappLabel", event.target.value)} />
                <label htmlFor="contactFormButtonText">Contact Form Button Text</label>
                <input id="contactFormButtonText" type="text" value={settings.contactFormButtonText} onChange={(event) => updateField("contactFormButtonText", event.target.value)} />
              </>
            )}

            {activeSection === "footer" && (
              <>
                <label htmlFor="footerCopyright">Footer Copyright</label>
                <input id="footerCopyright" type="text" value={settings.footerCopyright} onChange={(event) => updateField("footerCopyright", event.target.value)} required />
                <ObjectListEditor
                  label="Footer Links"
                  items={settings.footerLinks}
                  onChange={(items) => updateField("footerLinks", items)}
                  fields={[
                    { key: "label", label: "Label" },
                    { key: "href", label: "Href" }
                  ]}
                  addLabel="Add Footer Link"
                />
              </>
            )}
          </div>

          <div className="admin-actions">
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <p className={`form-message ${statusType}`} aria-live="polite">{status}</p>
        </form>
      </section>
    </div>
  );
}
