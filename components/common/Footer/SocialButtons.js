"use client";

import Link from "next/link";
import { FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";

const socialLinks = [
  { href: "https://www.facebook.com/30mmministries", icon: FaFacebookF },
  { href: "https://www.youtube.com/@ThirtyMightyMen", icon: FaYoutube },
  { href: "https://www.tiktok.com/@thirtymightymen", icon: FaTiktok },
  { href: "https://linktr.ee/30mmm", icon: SiLinktree },
];

export default function SocialButtons() {
  return (
    <div className="flex flex-row items-center justify-center gap-4 sm:justify-end">
      {socialLinks.map((link, index) => (
        <SocialButton key={index} href={link.href} Icon={link.icon} />
      ))}
    </div>
  );
}

function SocialButton({ href, Icon }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 text-gray-400 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-600"
    >
      <Icon className="w-5 h-5" />
    </Link>
  );
}
