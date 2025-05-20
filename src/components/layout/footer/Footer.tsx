import { Facebook, FacebookIcon, LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const brands = [
  { name: "GameSpot", src: "/brands/gamespot.svg" },
  { name: "Giant Bomb", src: "/brands/giantbomb.svg" },
  { name: "TV Guide", src: "/brands/tvguide.svg" },
  { name: "GameFAQs", src: "/brands/gamefaqs.svg" },
];

const Footer = () => (
  <footer className="bg-white w-full mt-8 border-t-8 border-primary">
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center  gap-8">
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-primary">Cinecritique</span>
          </div>
        </div>
        {/* Columns */}
        <div className="grid grid-cols-3 gap-12 justify-center">
          {/* Overview */}
          <div>
            <h4 className="font-bold mb-2">Overview</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:underline">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Digital Services Act
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Do Not Sell My Personal Information
                </Link>
              </li>
            </ul>
          </div>
          {/* Follow Us */}
          <div>
            <h4 className="font-bold mb-2">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <LucideFacebook className="hover:text-primary cursor-pointer" />
              <LucideInstagram className="hover:text-primary cursor-pointer" />
            </div>
          </div>
          {/* Explore Other Brands */}
          <div className="flex-1">
            <h4 className="font-bold mb-2">Recommended</h4>
            <div className="flex flex-col gap-2">
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/about" className="hover:underline">
                    Top 100 Movies
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:underline">
                    Top 100 TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:underline">
                    Top 100 TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Top 100 TV Shows
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Legal */}
      <div className="mt-8 text-xs text-center text-gray-500">© 2025 DOE, INC. ALL RIGHTS RESERVED.</div>
    </div>
  </footer>
);

export default Footer;
