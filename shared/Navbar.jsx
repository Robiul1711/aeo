"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { removeUser } from "@/redux/slices/authSlice";
import { GlowButton } from "@/components/common/GlowButton";
import Logo from "@/assets/logo.png";
import { FiChevronDown } from "react-icons/fi";
import { useGetFooterCMSQuery } from "@/redux/api/apiSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: response, isLoading } = useGetFooterCMSQuery();
  const header_image = response?.data?.content?.header_image;
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [isDropdownHovered, setIsDropdownHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

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

  const handleLogout = () => {
    dispatch(removeUser());
    toast.success("Logged out successfully");
    router.push("/");
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Events", href: "/events" },
    {
      name: "Contact",
      href: "/contact",
      dropdown: [
        { name: "Collaborate", href: "/contact/collaborate" },
        { name: "Careers", href: "/contact/careers" },
      ],
    },
    { name: "Shop", href: "/shop" },
  ];

  const checkIsActive = (href) => {
    if (href.includes("#")) {
      const hash = href.substring(href.indexOf("#"));
      return pathname === "/" && currentHash === hash;
    }
    if (href === "/contact") {
      return pathname.startsWith("/contact");
    }
    return pathname === href && (pathname === "/" ? !currentHash : true);
  };

  return (
    <>
      <header className="w-full bg-[#0D0D0D]/40 backdrop-blur-md border-b border-white/5 sticky md:py-2 top-0 z-50">
        <div className="section-padding-x h-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {isLoading ? (
              <div className="w-20 md:w-24 lg:w-28 h-10 md:h-12 lg:h-14 xl:h-20 bg-white/10 rounded-[8px] animate-pulse" />
            ) : (
              <Image
                src={header_image || Logo}
                alt="Pariah Logo"
                width={200}
                height={50}
                className="h-12 lg:h-14 xl:h-20 w-auto object-contain"
                priority
              />
            )}
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              if (item.dropdown) {
                const isActive = checkIsActive(item.href);
                return (
                  <div
                    key={item.name}
                    className="relative group py-2"
                    onMouseEnter={() => setIsDropdownHovered(true)}
                    onMouseLeave={() => setIsDropdownHovered(false)}
                  >
                    <button className="flex items-center gap-1 text-white/80 hover:text-white font-outfit text-[17px] font-medium tracking-wide transition-colors duration-200 cursor-pointer bg-transparent border-none outline-none">
                      {item.name}
                      <FiChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownHovered ? "rotate-180 text-white" : "text-white/60"}`}
                      />
                    </button>
                    {/* Active / Hover indicator line with dot */}
                    <span
                      className={`absolute bottom-[-4px] left-0 h-[1.5px] bg-white transition-all duration-300 origin-left
                        ${isActive ? "w-full scale-x-100 opacity-100" : "w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}
                      `}
                    >
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[5px] h-[5px] rounded-full bg-white" />
                    </span>

                    {/* Dropdown Menu */}
                    {isDropdownHovered && (
                      <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
                        <div className="bg-white border border-white/10 rounded-[12px] p-1.5 shadow-2xl min-w-[140px] flex flex-col gap-1">
                          {item.dropdown.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className={`px-4 py-2 rounded-[8px] font-outfit text-[15px] font-medium transition-colors text-center block
                                  ${
                                    isSubActive
                                      ? "bg-[#33221B] text-white"
                                      : "text-[#0D0D0D] hover:bg-[#33221B]/10 hover:text-[#33221B]"
                                  }
                                `}
                              >
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

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
            {mounted && isAuthenticated ? (
              <GlowButton onClick={handleLogout}>Log Out</GlowButton>
            ) : (
              <GlowButton href="/auth/login">Login</GlowButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 md:hidden w-8 h-8 bg-transparent border-none outline-none z-50 cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 translate-y-[-8px]" : ""}`}
            />
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
          {isLoading ? (
            <div className="w-20 h-8 bg-white/10 rounded-[6px] animate-pulse" />
          ) : (
            <Image
              src={header_image || Logo}
              alt="Pariah Logo"
              width={160}
              height={40}
              className="h-8 w-auto object-contain"
            />
          )}
        </div>

        <nav className="flex flex-col gap-6">
          {navItems.map((item) => {
            if (item.dropdown) {
              const isActive = pathname.startsWith("/contact");
              return (
                <div key={item.name} className="flex flex-col gap-2">
                  <span className="text-white/85 font-outfit text-[20px] font-medium tracking-wide py-1 select-none">
                    Contact
                  </span>
                  <div className="pl-4 flex flex-col gap-3 border-l border-white/10 ml-2">
                    {item.dropdown.map((subItem) => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`relative font-outfit text-[17px] font-medium tracking-wide py-1 transition-colors duration-200 self-start
                            ${isSubActive ? "text-primary" : "text-white/60 hover:text-white"}
                          `}
                        >
                          {subItem.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

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
          {mounted && isAuthenticated ? (
            <GlowButton onClick={handleLogout} className="w-full text-center">
              Log Out
            </GlowButton>
          ) : (
            <GlowButton href="/auth/login" className="w-full text-center">
              Login
            </GlowButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
