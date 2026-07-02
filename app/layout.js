import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { Outfit, Playfair_Display } from "next/font/google";
import ToastProvider from "@/provider/ToastProvider";

// Fonts
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

// Metadata
export const metadata = {
  title: "Starter Next.js",
  description: "A starter template for Next.js projects with Redux",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} antialiased`}>
      <body>
        <ReduxProvider>
          <ToastProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
