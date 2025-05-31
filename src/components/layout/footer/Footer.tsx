import { Facebook, FacebookIcon, LucideFacebook, LucideInstagram, LucideTwitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations();

  const overview = [
    {
      title: "Overview",
      links: [
        {
          title: t("footer.overview.links.about"),
          href: "/about",
        },
        {
          title: t("footer.overview.links.helpCenter"),
          href: "/help",
        },
        {
          title: t("footer.overview.links.careers"),
          href: "/careers",
        },
        {
          title: t("footer.overview.links.privacyPolicy"),
          href: "/privacy",
        },
        {
          title: t("footer.overview.links.termsOfService"),
          href: "/terms",
        },
      ],
    },
  ];

  const followUs = [
    {
      title: t("footer.followUs.title"),
      links: [
        {
          icon: LucideFacebook,
          href: "/facebook",
        },
        {
          icon: LucideInstagram,
          href: "/instagram",
        },
      ],
    },
  ];

  const recommended = [
    {
      title: t("footer.recommended.movies"),
      href: "/movies",
    },
    {
      title: t("footer.recommended.series"),
      href: "/series",
    },
  ];

  return (
    <footer className="bg-white w-full mt-8 border-t-8 border-primary">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center  gap-8">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">{t("footer.logo")}</span>
            </div>
          </div>
          {/* Columns */}
          <div className="grid grid-cols-3 gap-24 justify-center">
            {/* Overview */}
            <div>
              <h4 className="font-bold mb-2">Overview</h4>
              <ul className="space-y-1 text-sm">
                {overview.map((item) => {
                  return item.links.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href} className="hover:underline">
                        {link.title}
                      </Link>
                    </li>
                  ));
                })}
              </ul>
            </div>
            {/* Follow Us */}
            <div>
              <h4 className="font-bold mb-2">{t("footer.followUs.title")}</h4>
              <div className="flex gap-4 text-2xl">
                {followUs.map((item) => {
                  return item.links.map((link) => (
                    <Link href={link.href} className="hover:text-primary cursor-pointer">
                      <link.icon className="hover:text-primary cursor-pointer" />
                    </Link>
                  ));
                })}
              </div>
            </div>
            {/* Explore Other Brands */}
            <div className="flex-1">
              <h4 className="font-bold mb-2">{t("footer.recommended.title")}</h4>
              <div className="flex flex-col gap-2">
                <ul className="space-y-1 text-sm">
                  {recommended.map((item) => {
                    return (
                      <li key={item.title}>
                        <Link href={item.href} className="hover:underline">
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Legal */}
        <div className="mt-8 text-xs text-center text-gray-500">{t("footer.allRightsReserved")}</div>
      </div>
    </footer>
  );
};

export default Footer;
