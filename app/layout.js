import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { Cormorant_Garamond } from "next/font/google";
import ToastProvider from "@/provider/ToastProvider";

// Fonts
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${cormorant.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ToastProvider />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}


