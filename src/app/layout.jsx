import "../styles/App.css";
import { Mona_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const monasansFont = Mona_Sans({
  subsets: ["latin"],
  // weight: ["400", "700", "800"],
  variable: "--font-mona-sans",
  display: "swap",
});

export const metadata = {
  title: "TW | Blog Template",
  description: "A blog built with Next.js",
  keywords: "next.js, blog, template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen`}>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
