import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ToastContainer from "@/components/ui/ToastContainer";
import ThemeProvider from "@/components/ThemeProvider";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MetaBuild Agents | Plataforma de Agentes IA Multicanal",
  description:
    "Plataforma SaaS de agentes de inteligencia artificial multicanal. Despliega agentes IA en WhatsApp, Instagram, Facebook, Email y Web. Agent Studio, Base de Conocimiento y Dashboard integrado.",
  keywords:
    "agentes IA, inteligencia artificial, plataforma multicanal, WhatsApp, Instagram, Facebook, automatización, chatbot, Agent Studio",
  openGraph: {
    title: "MetaBuild Agents | Plataforma de Agentes IA Multicanal",
    description:
      "Despliega agentes de IA en todos tus canales: WhatsApp, Instagram, Facebook, Email y Web. Plataforma SaaS con Agent Studio, Base de Conocimiento y Dashboard integrado.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
