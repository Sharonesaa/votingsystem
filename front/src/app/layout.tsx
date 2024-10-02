import type { Metadata } from "next";
import "./globals.css";

import NavBar from "@/components/navBar/NavBar";
import Footer from "@/components/footer/Footer";
import { AuthProvider } from "@/context/Authontext";

export const metadata: Metadata = {
  title: "Voting System",
  description: "Generated by Group 1",
  icons: "https://res.cloudinary.com/dgexsgnid/image/upload/v1727442964/Logo%20solo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
        <div className="containerPrincipal">
          <header>
            <NavBar />
          </header>
          <main className="mt-14">
            {children}
          </main>
          <footer>
            <Footer/>
          </footer>
        </div>
      </AuthProvider>
      </body>
    </html>
  );
}