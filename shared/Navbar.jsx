'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { GlowButton } from "@/components/common/GlowButton";
import Logo from "@/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    // Set initial hash
    setCurrentHash(window.location.hash);

    // Listen for hash changes
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    
    // Also track scroll position to clear hash if scrolled to top
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setCurrentHash("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Events", href: "/#events" },
    { name: "Contact", href: "/contact" },
    { name: "Shop", href: "/shop" },
  ];

  const checkIsActive = (href) => {
    if (href.includes("#")) {
      const hash = href.substring(href.indexOf("#"));
      return pathname === "/" && currentHash === hash;
    }
    return pathname === href && (pathname === "/" ? !currentHash : true);
  };

  return (
    <>
      <header className="w-full bg-[#0D0D0D]/40 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="section-padding-x h-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image 
              src={Logo} 
              alt="Pariah Logo" 
              height={50} 
              className="h-10 md:h-12 w-auto object-contain"
              priority 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = checkIsActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-white/80 hover:text-white font-outfit text-[17px] font-medium tracking-wide py-2 transition-colors duration-200 group"
                >
                  {item.name}
                  {/* Active / Hover indicator line with dot */}
                  <span 
                    className={`absolute bottom-[-4px] left-0 h-[1.5px] bg-white transition-all duration-300 origin-left
                      ${isActive ? "w-full scale-x-100 opacity-100" : "w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}
                    `}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[5px] h-[5px] rounded-full bg-white" />
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:block">
            <GlowButton href="/auth/register">Register</GlowButton>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 md:hidden w-8 h-8 bg-transparent border-none outline-none z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
            <span className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] sm:w-[320px] bg-[#0D0D0D] border-r border-white/5 z-50 flex flex-col p-8 pt-24 gap-8 transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer Logo */}
        <div className="mb-4">
          <Image 
            src={Logo} 
            alt="Pariah Logo" 
            height={40} 
            className="h-8 w-auto object-contain"
          />
        </div>

        <nav className="flex flex-col gap-6">
          {navItems.map((item) => {
            const isActive = checkIsActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-white/80 hover:text-white font-outfit text-[20px] font-medium tracking-wide py-2 transition-colors duration-200 group self-start"
              >
                {item.name}
                <span 
                  className={`absolute bottom-[-2px] left-0 h-[1.5px] bg-white transition-all duration-300 origin-left
                    ${isActive ? "w-full scale-x-100 opacity-100" : "w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}
                  `}
                >
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[4px] h-[4px] rounded-full bg-white" />
                </span>
              </Link>
            );
          })}
        </nav>
        
        <div className="mt-auto" onClick={() => setIsMobileMenuOpen(false)}>
          <GlowButton href="/auth/register" className="w-full text-center">
            Register
          </GlowButton>
        </div>
      </div>
    </>
  );
};

export default Navbar;
