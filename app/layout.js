import "./globals.css";

export const metadata = {
  title: "Mario Kart World Combo Finder",
  description: "Find best kart combos by character and course for Switch 2.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d0b1e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
