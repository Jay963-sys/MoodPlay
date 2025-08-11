import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Menu } from "lucide-react";

export default function Navbar({ session }: { session: any }) {
  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-black/20 backdrop-blur-lg fixed top-0 left-0 w-full z-50">
      <Link href="/" className="text-2xl font-bold">
        PlaylistGen
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/about" className="hover:text-green-400">
          About
        </Link>
        <Link href="/contact" className="hover:text-green-400">
          Contact
        </Link>
        {!session ? (
          <button
            onClick={() => signIn("spotify")}
            className="px-4 py-2 rounded-full bg-green-500 hover:bg-green-400 font-semibold"
          >
            Sign in with Spotify
          </button>
        ) : (
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-400 font-semibold"
          >
            Sign Out
          </button>
        )}
      </div>

      <button className="md:hidden">
        <Menu size={28} />
      </button>
    </nav>
  );
}
