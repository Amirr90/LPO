import "./globals.css";

export const metadata = {
  title: "LPO Legal Solutions | WhatsApp Enquiry",
  description:
    "LPO legal process outsourcing services for law firms and legal departments with quick WhatsApp enquiry support."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
