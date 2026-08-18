import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/content/site";
import { AppProviders } from "@/components/providers/AppProviders";
import { themeInitScript } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Faria Idrees",
    "Web Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Frontend Developer Lahore",
    "Junior Developer Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} — Portfolio`,
    title,
    description: site.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#07080c" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Structured data so search engines read the page as a person, not a blob. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  email: `mailto:${site.email}`,
  sameAs: [site.socials.github.href, site.socials.linkedin.href],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "KIPS College Kasur (affiliated with GCUF)",
  },
  description: site.description,
  url: site.siteUrl,
  knowsAbout: [
    "Web Development",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful API Design",
    "API Integration",
    "Tailwind CSS",
    "Responsive Web Design",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Applies the stored theme before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <AppProviders>
            <a
              href="#home"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-accent-fg"
            >
              Skip to content
            </a>

            <ScrollProgress />
            <CustomCursor />
            <Navbar />

            <main className="flex-1">{children}</main>

            <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
