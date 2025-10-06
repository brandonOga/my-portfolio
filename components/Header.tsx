'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, Variants } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('banner');
  const [isOpen, setIsOpen] = useState(false);

  // Scroll handler to track active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['banner', 'work', 'contact', 'resume'];
      let current = 'banner';
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 100) current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // ✅ Updated navLinks (use "/#id" for all sections)
  const navLinks = [
    { href: '/#banner', label: 'Home', id: 'banner' },
    { href: '/about', label: 'About', id: 'about' },
    { href: '/#work', label: 'Work', id: 'work' },
    { href: '/#contact', label: 'Contact', id: 'contact' },
    { href: '/#resume', label: 'Resume', id: 'resume' },
  ];

  // ✅ Handle in-page + cross-page navigation
  const handleNavClick = (e, link) => {
    if (link.href.startsWith('/#')) {
      e.preventDefault();
      const sectionId = link.id;

      if (pathname === "/") {
        // Already on homepage → smooth scroll
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to homepage with hash
        router.push(link.href);
      }
    }

    setIsOpen(false);
  };

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };

  const menuVars: Variants = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0] as [number, number, number, number],
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        when: "afterChildren",
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const linkVars: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    },
    exit: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <div className="w-full fixed top-0 left-o z-50">
      <div className="w-full mx-auto py-4 px-[1.5vw] z-[100] flex items-center lg:items-start justify-between ">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo-light-bg.svg" alt="Logo" width={40} height={40} />
        </Link>

        {/* Desktop nav */}
        <nav 
          
          className="hidden xl:flex xl:flex-col items-end gap-3">
          {navLinks.map((link) => {
            const isActive =
              link.href.startsWith('/#')
                ? activeSection === link.id
                : pathname === link.href;

            return (
              <motion.div key={link.href} initial="initial" whileHover="-100%">
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`transition-all duration-200 text-base md:text-lg xl:text-xl uppercase ${
                    isActive
                      ? 'text-[var(--foreground)] font-semibold'
                      : 'text-[var(--offblack)] hover:text-[var(--foreground)] hover:font-semibold'
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
              
            );
          })}
        </nav>

        {/* Hamburger menu */}
        <div
          onClick={toggleNavBar}
          className="xl:hidden cursor:pointer bg-[var(--accent)] text-[var(--text-white)] p-[10px] rounded-[15px]"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="m7 7l10 10M7 17L17 7"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M16 5H0V4h16zm0 8H0v-1h16zm0-4.008H0V8h16z"
              />
            </svg>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 origin-top flex flex-col items-center justify-center gap-6 bg-[var(--accent)] xl:hidden"
          >
            <div
              onClick={toggleNavBar}
              className="absolute self-end top-4 right-[10px] cursor-pointer bg-[var(--text-white)] text-[var(--accent)] p-[10px] rounded-[15px]"
            >
              {/* Close icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m7 7l10 10M7 17L17 7"
                />
              </svg>
            </div>
            {navLinks.map((link) => {
              const isActive =
                link.href.startsWith('/#')
                  ? activeSection === link.id
                  : pathname === link.href;

              return (
                <motion.div key={link.href} variants={linkVars}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`transition-all duration-200 text-4xl uppercase ${
                      isActive
                        ? 'text-[var(--text-white)] font-semibold'
                        : 'text-[var(--off-white)] hover:text-[var(--foreground)] hover:font-semibold'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
