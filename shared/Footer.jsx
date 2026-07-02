import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import FooterLogo from '@/assets/footerlogo.png';

const Footer = () => {
  return (
    <footer className="w-full relative bg-[#050505] border-t border-white/5 pt-16 pb-[20vw] md:pb-[16vw] flex flex-col justify-between overflow-hidden">
      {/* Top Section */}
      <div className="section-padding-x grid grid-cols-1 md:grid-cols-12 gap-5 relative z-10">
        {/* Info Column */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link href="/" className="flex items-center">
            <Image 
              src={Logo} 
              alt="Pariah Logo" 
              height={45} 
              className="h-10 w-auto object-contain self-start"
              priority 
            />
          </Link>
          <p className="text-secondary-gray font-outfit text-[16px] leading-relaxed max-w-sm">
            Pariah Design House is a London-based experiential studio specialising in Art Bar pop-up events.
          </p>
        </div>

        {/* Links Grid */}
        <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
          {/* Quick Link */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-outfit text-[18px] font-semibold tracking-wide">Quick Link</h4>
            <ul className="flex flex-col gap-3 text-secondary-gray text-[15px] font-medium font-outfit">
              <li><Link href="/" className="hover:text-white transition-colors duration-200">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors duration-200">About</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors duration-200">Events</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors duration-200">Contract</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-outfit text-[18px] font-semibold tracking-wide">Social</h4>
            <ul className="flex flex-col gap-3 text-secondary-gray text-[15px] font-medium font-outfit">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Facebook</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">You tube</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Likening</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-outfit text-[18px] font-semibold tracking-wide">Legal</h4>
            <ul className="flex flex-col gap-3 text-secondary-gray text-[15px] font-medium font-outfit">
              <li><Link href="/terms" className="hover:text-white transition-colors duration-200">Terms & condition</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Big Logo Section (Bottom) */}
      <div className="w-full select-none pointer-events-none absolute bottom-0 left-0 right-0 z-0">
        <Image 
          src={FooterLogo} 
          alt="Pariah Big Logo" 
          className="w-full h-auto object-cover object-bottom scale-y-105"
          priority 
        />
      </div>
    </footer>
  );
};

export default Footer;