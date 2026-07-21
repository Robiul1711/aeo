import "./globals.css";
import ReduxProvider from "@/provider/ReduxProvider";
import { Cormorant_Garamond } from "next/font/google";
import ToastProvider from "@/provider/ToastProvider";
import ScrollToTop from "@/components/common/ScrollToTop";

// Fonts
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Metadata
export const metadata = {
  title: "Pariah Design House",
  description: "Pariah Design House is a London-based experiential studio specialising in Art Bar pop-up events.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ReduxProvider>
          <ToastProvider />
          <ScrollToTop />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}


