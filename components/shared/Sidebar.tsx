"use client";
import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import gsap from "gsap";

const Sidebar = () => {
  const pathname = usePathname();
  const menuItemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    const item = menuItemRefs.current[index];
    if (item) {
      const icon = item.querySelector("img");
      const text = item.querySelector("span");

      gsap.to(icon, { scale: 1.1, duration: 0.2, ease: "power1.inOut" });
      gsap.to(text, { y: -3, opacity: 0.8, duration: 0.2, ease: "power1.inOut" });
    }
  };

  const handleMouseLeave = (index: number) => {
    const item = menuItemRefs.current[index];
    if (item) {
      const icon = item.querySelector("img");
      const text = item.querySelector("span");

      gsap.to(icon, { scale: 1, duration: 0.2, ease: "power1.inOut" });
      gsap.to(text, { y: 0, opacity: 1, duration: 0.2, ease: "power1.inOut" });
    }
  };

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image src="/assets/images/logo-text.svg" alt="logo" width={180} height={28} />
        </Link>
        <nav className="sidebar-nav">
          <SignedIn>
            <ul className="sidebar-nav_elements">
              {navLinks.slice(0, 6).map((link, index) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    ref={(el) => (menuItemRefs.current[index] = el)}
                    className={`sidebar-nav_element group ${
                      isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <Link className="sidebar-link flex items-center gap-2" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <ul>
              {navLinks.slice(6).map((link, index) => {
                const isActive = link.route === pathname;

                return (
                  <li
                    key={link.route}
                    ref={(el) => (menuItemRefs.current[index + 6] = el)}
                    className={`sidebar-nav_element group ${
                      isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                    }`}
                    onMouseEnter={() => handleMouseEnter(index + 6)}
                    onMouseLeave={() => handleMouseLeave(index + 6)}
                  >
                    <Link className="sidebar-link flex items-center gap-2" href={link.route}>
                      <Image
                        src={link.icon}
                        alt="icon"
                        width={24}
                        height={24}
                        className={`${isActive && "brightness-200"}`}
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                );
              })}
              <li className="cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </ul>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
