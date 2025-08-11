import "./globals.css";
import Providers from "@/components/Providers";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "Smart Playlist App",
  description: "Auto-generate Spotify playlists with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans bg-background text-foreground min-h-screen antialiased transition-colors">
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
