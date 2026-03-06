import "./globals.css";

export const metadata = {
  title: "Mario Kart World Combo Finder",
  description: "Find best kart combos by character and course.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}