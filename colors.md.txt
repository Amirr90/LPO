# 🎨 Classic Trust Color System (LPO / Legal - US Style)

A complete, production-ready color system for Legal Process Outsourcing (LPO) platforms, inspired by modern US law firm design standards.

---

## 🔵 1. Primary Brand Colors

| Purpose              | Color Code |
|---------------------|-----------|
| Primary (Navy)      | #0B3C5D   |
| Primary Hover       | #082C44   |
| Primary Light       | #1D70B8   |
| Primary Soft BG     | #E6F0F8   |

---

## ⚪ 2. Background Colors

### 🏠 Main Pages (Landing / Website)
| Type                | Color Code |
|---------------------|-----------|
| Main Background     | #FFFFFF   |
| Alternate Section   | #F5F7FA   |
| Hero Gradient       | linear-gradient(135deg, #0B3C5D 0%, #1D70B8 100%) |

---

### 📊 Dashboard / Admin Panel
| Type                | Color Code |
|---------------------|-----------|
| Main BG             | #F8FAFC   |
| Card BG             | #FFFFFF   |
| Sidebar BG          | #0B3C5D   |

---

### 📄 Forms / Inputs
| Type                | Color Code |
|---------------------|-----------|
| Page BG             | #F9FBFD   |
| Input BG            | #FFFFFF   |
| Disabled BG         | #E5E7EB   |

---

## 📝 3. Text Colors

| Type                | Color Code |
|---------------------|-----------|
| Primary Text        | #0F172A   |
| Secondary Text      | #475569   |
| Muted Text          | #94A3B8   |
| White Text          | #FFFFFF   |
| Link Text           | #1D70B8   |

---

## 🔲 4. Borders & Dividers

| Type                | Color Code |
|---------------------|-----------|
| Light Border        | #E2E8F0   |
| Medium Border       | #CBD5E1   |
| Dark Border         | #94A3B8   |

---

## 🟢🔴🟡 5. Status Colors

| Status              | Color | Background |
|---------------------|-------|------------|
| Success             | #22C55E | #ECFDF5 |
| Error               | #EF4444 | #FEF2F2 |
| Warning             | #F59E0B | #FFFBEB |
| Info                | #3B82F6 | #EFF6FF |

---

## 🔘 6. Buttons

### Primary Button
| State     | Color |
|-----------|------|
| BG        | #0B3C5D |
| Text      | #FFFFFF |
| Hover     | #082C44 |
| Disabled  | #94A3B8 |

---

### Secondary Button
| State     | Color |
|-----------|------|
| BG        | #FFFFFF |
| Border    | #1D70B8 |
| Text      | #1D70B8 |
| Hover BG  | #E6F0F8 |

---

### CTA Button (High Conversion)
| State     | Color |
|-----------|------|
| BG        | #22C55E |
| Hover     | #16A34A |

---

## 🧾 7. Cards

| Type            | Value |
|-----------------|-------|
| Background      | #FFFFFF |
| Border          | #E2E8F0 |
| Shadow          | rgba(0,0,0,0.05) |

---

## 📊 8. Tables

| Element         | Color |
|-----------------|-------|
| Header BG       | #F1F5F9 |
| Row BG          | #FFFFFF |
| Row Hover       | #F9FBFD |
| Border          | #E2E8F0 |

---

## 📌 9. Sidebar

| Element         | Color |
|-----------------|-------|
| Background      | #0B3C5D |
| Active Item     | #1D70B8 |
| Text            | #FFFFFF |
| Hover           | rgba(255,255,255,0.1) |

---

## 🌙 10. Dark Mode (Optional)

| Element         | Color |
|-----------------|-------|
| Background      | #0F172A |
| Card            | #1E293B |
| Text            | #E2E8F0 |
| Primary         | #3B82F6 |

---

## 🚀 11. CSS Variables (Ready to Use)

```css
:root {
  --primary: #0B3C5D;
  --primary-hover: #082C44;
  --primary-light: #1D70B8;

  --bg-main: #FFFFFF;
  --bg-alt: #F5F7FA;

  --text-primary: #0F172A;
  --text-secondary: #475569;
  --text-muted: #94A3B8;

  --border-light: #E2E8F0;

  --success: #22C55E;
  --error: #EF4444;
  --warning: #F59E0B;
}