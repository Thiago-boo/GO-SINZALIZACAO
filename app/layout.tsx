import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "GO Sinalização | Segurança para cada caminho", description: "Soluções em sinalização viária, vertical e para obras em Aparecida de Goiânia e região.", robots: { index: true, follow: true }, icons: { icon: "/favicon.svg" } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="pt-BR"><body>{children}</body></html>; }
