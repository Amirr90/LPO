"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Icon({ name }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true };

  if (name === "general") {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "navigation") {
    return (
      <svg {...common}>
        <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "hero") {
    return (
      <svg {...common}>
        <path d="M7 3h10a2 2 0 0 1 2 2v14l-7-3-7 3V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "trust") {
    return (
      <svg {...common}>
        <path d="M12 3 20 6v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="m9 12 2 2 4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "services") {
    return (
      <svg {...common}>
        <path d="M8 7h8M8 12h8M8 17h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (name === "industries") {
    return (
      <svg {...common}>
        <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 4h4M16 4h4M4 20h4M16 20h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "about") {
    return (
      <svg {...common}>
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "caseStudies") {
    return (
      <svg {...common}>
        <path d="M7 4h10a2 2 0 0 1 2 2v14H5V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "faq") {
    return (
      <svg {...common}>
        <path d="M12 17h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M8.5 9a3.5 3.5 0 0 1 7 0c0 2-2 2.5-2 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M7 20h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "whatsapp") {
    return (
      <svg {...common}>
        <path
          d="M12 3a8 8 0 0 0-6.9 12L4 21l6.2-1.6A8 8 0 1 0 12 3Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M9.2 9.5c.2-.6 1-1 1.6-.9 1.1.2 2.1 1.2 2.3 2.3.1.6-.3 1.4-.9 1.6-.4.1-.8 0-1.1-.2l-.6-.3c-.2-.1-.4 0-.5.1l-.3.4c-.5-.3-.9-.7-1.2-1.2l.4-.3c.1-.1.2-.3.1-.5l-.3-.6c-.2-.3-.3-.7-.2-1.1Z"
          fill="currentColor"
          opacity="0.18"
        />
      </svg>
    );
  }

  if (name === "contact") {
    return (
      <svg {...common}>
        <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.6" />
        <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "footer") {
    return (
      <svg {...common}>
        <path d="M6 18h12M8 18V8h8v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10 12h4M10 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "users") {
    return (
      <svg {...common}>
        <path d="M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 8h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M6 6h12v12H6z" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const sections = [
  { id: "general", label: "General", icon: "general", group: "site" },
  { id: "navigation", label: "Navigation", icon: "navigation", group: "site" },
  { id: "hero", label: "Hero", icon: "hero", group: "content" },
  { id: "trust", label: "Trust Bar", icon: "trust", group: "content" },
  { id: "services", label: "Services", icon: "services", group: "content" },
  { id: "industries", label: "Industries", icon: "industries", group: "content" },
  { id: "about", label: "About & Process", icon: "about", group: "content" },
  { id: "caseStudies", label: "Case Studies", icon: "caseStudies", group: "content" },
  { id: "faq", label: "FAQ", icon: "faq", group: "content" },
  { id: "whatsapp", label: "WhatsApp", icon: "whatsapp", group: "messaging" },
  { id: "contact", label: "Contact", icon: "contact", group: "messaging" },
  { id: "footer", label: "Footer", icon: "footer", group: "messaging" },
  { id: "users", label: "Team Users", icon: "users", group: "administration" }
];

const navGroups = [
  { id: "site", label: "Site" },
  { id: "content", label: "Content" },
  { id: "messaging", label: "Messaging" },
  { id: "administration", label: "Administration" }
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
    const newItem = Object.fromEntries(
      fields.map((field) => [field.key, field.defaultValue ?? ""])
    );
    onChange([...items, newItem]);
  };

  const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

  return (
    <div className="admin-list-block">
      <p className="admin-list-title">{label}</p>
      {items.map((item, index) => (
        <div className="admin-object-card" key={`${label}-${index}`}>
          {fields.map((field) => (
            <div className="admin-object-field" key={`${field.key}-${index}`}>
              <label>{field.label}</label>
              {field.type === "textarea" ? (
                <textarea
                  rows={field.rows || 3}
                  value={item[field.key]}
                  onChange={(event) => updateItem(index, field.key, event.target.value)}
                />
              ) : field.type === "select" ? (
                <select
                  value={item[field.key]}
                  onChange={(event) => updateItem(index, field.key, event.target.value)}
                >
                  {(field.options || []).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
  const [settings, setSettings] = useState(() => ({
    ...initialSettings,
    teamUsers: Array.isArray(initialSettings.teamUsers) ? initialSettings.teamUsers : []
  }));
  const [activeSection, setActiveSection] = useState("general");
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");
  const [statusSection, setStatusSection] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [savingSection, setSavingSection] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(navGroups.map((group) => [group.id, true]))
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "users") {
      setActiveSection("users");
      setOpenGroups((prev) => ({ ...prev, administration: true }));
    }
  }, []);

  const updateField = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const persistSettings = async (sectionId) => {
    setStatus("");
    setStatusType("");
    setStatusSection("");
    setIsSaving(true);
    setSavingSection(sectionId);

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
        setStatusSection(sectionId);
        return;
      }

      setSettings(payload.settings);
      setStatusType("success");
      setStatus("Saved successfully.");
      setStatusSection(sectionId);
      router.refresh();
    } catch {
      setStatusType("error");
      setStatus("Save failed. Please try again.");
      setStatusSection(sectionId);
    } finally {
      setIsSaving(false);
      setSavingSection("");
    }
  };

  const handleSaveSection = async (sectionId) => {
    await persistSettings(sectionId);
  };

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    setStatus("");
    setStatusType("");
    setStatusSection("");
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
          {navGroups.map((group) => {
            const groupSections = sections.filter((section) => section.group === group.id);
            const isOpen = openGroups[group.id];

            return (
              <div className="admin-nav-group" key={group.id}>
                <button
                  type="button"
                  className="admin-nav-group-toggle"
                  onClick={() => toggleGroup(group.id)}
                  aria-expanded={isOpen}
                >
                  <span>{group.label}</span>
                  <span className="admin-nav-chevron" aria-hidden="true">
                    {isOpen ? "▾" : "▸"}
                  </span>
                </button>
                {isOpen && (
                  <div className="admin-nav-group-items">
                    {groupSections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        className={`admin-nav-item ${activeSection === section.id ? "active" : ""}`}
                        onClick={() => handleSelectSection(section.id)}
                      >
                        <span className="admin-nav-item-icon" aria-hidden="true">
                          <Icon name={section.icon} />
                        </span>
                        <span className="admin-nav-item-label">{section.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <button type="button" className="admin-nav-item admin-logout-btn" onClick={handleLogout} disabled={isLoggingOut}>
            {isLoggingOut ? "Signing out..." : "Logout"}
          </button>
        </aside>

        <div className="admin-main">
          <div className="admin-main-header">
            <div>
              <h2>{sections.find((section) => section.id === activeSection)?.label || "Settings"}</h2>
              <p>Manage website content and structure from one place.</p>
            </div>
            <div className="admin-main-header-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSaveSection(activeSection)}
                disabled={isSaving}
              >
                {isSaving && savingSection === activeSection ? "Saving..." : "Save"}
              </button>
            </div>
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

            {activeSection === "users" && (
              <>
                <p className="admin-help-text">
                  Add team or portal contacts here. This list is stored with site settings and is only editable while
                  signed in as admin. Only users with role <strong>Admin</strong> should be treated as full-control users.
                </p>
                <ObjectListEditor
                  label="Users"
                  items={settings.teamUsers}
                  onChange={(items) => updateField("teamUsers", items)}
                  fields={[
                    { key: "email", label: "Email" },
                    { key: "name", label: "Name" },
                    {
                      key: "role",
                      label: "Role",
                      type: "select",
                      defaultValue: "viewer",
                      options: [
                        { value: "admin", label: "Admin (Full Control)" },
                        { value: "content_manager", label: "Content Manager" },
                        { value: "editor", label: "Editor" },
                        { value: "analyst", label: "Analyst" },
                        { value: "support", label: "Support" },
                        { value: "viewer", label: "Viewer (Read-only)" }
                      ]
                    }
                  ]}
                  addLabel="Add User"
                />
              </>
            )}
          </div>

          <p className={`form-message ${statusType}`} aria-live="polite">
            {status && (!statusSection || statusSection === activeSection) ? status : ""}
          </p>
        </div>
      </section>
    </div>
  );
}
