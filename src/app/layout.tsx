import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import CustomCursor from "@/components/CustomCursor";
import { STORE_NAME, TAGLINE, ADDRESS } from "@/data/config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${STORE_NAME} | ${TAGLINE}`,
    template: `%s | ${STORE_NAME}`,
  },
  description: `Discover luxury eyewear, Japanese titanium frames, Zeiss & Essilor progressive lenses, and complimentary 14-step eye tests at ${STORE_NAME} showroom in Indiranagar, Bengaluru.`,
  keywords: [
    "luxury optical showroom",
    "titanium eyeglasses Bangalore",
    "Zeiss progressive lenses",
    "Essilor Crizal lenses",
    "Ray-Ban sunglasses Indiranagar",
    "Maui Jim polarized sunglasses",
    "Gucci optical frames",
    "Silhouette rimless titanium",
    "free eye test Bangalore",
  ],
  authors: [{ name: STORE_NAME }],
  creator: STORE_NAME,
  metadataBase: new URL("https://demooptics.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://demooptics.vercel.app",
    title: `${STORE_NAME} | ${TAGLINE}`,
    description: `Ultra-clean, boutique optical showroom showcasing curated international eyewear, precision German optometry, and bespoke fittings at ${ADDRESS}.`,
    siteName: STORE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: `${STORE_NAME} | ${TAGLINE}`,
    description: `Haute eyewear and bespoke optometry in Indiranagar, Bengaluru. Book your complimentary 14-step eye examination.`,
  },
};

import { TryOnProvider } from "@/context/TryOnContext";
import { NavbarThemeProvider } from "@/context/NavbarThemeContext";
import Setup3DTryOnModal from "@/components/tryon/Setup3DTryOnModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F3EC] text-[#14110F] font-sans">
        <NavbarThemeProvider>
          <TryOnProvider>
            <CustomCursor />
            <Header />
            <main className="flex-1 pb-16 sm:pb-0">{children}</main>
            <Footer />
            <FloatingWhatsApp />
            <MobileStickyBar />
            <Setup3DTryOnModal />
          </TryOnProvider>
        </NavbarThemeProvider>
      </body>
    </html>
  );
}
