import "./globals.css";

export const metadata = {
  title: "LPO Legal Solutions",
  description: "LPO legal process outsourcing services for law firms and legal departments."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
