/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowUpRight,
  Copy,
  Check,
  Mail,
  ExternalLink,
  Shield,
  FileText,
  Trash2,
  Smartphone,
} from 'lucide-react';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { DeleteAccount } from './pages/DeleteAccount';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';

interface Project {
  title: string;
  tagline: string;
  url: string;
  badge?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Gamura',
    tagline: 'The home of the ecosystem: a gaming and tech hub with a single brand system across every product.',
    url: 'https://gamura.vercel.app/',
    badge: 'Flagship Hub',
  },
  {
    title: 'Gamura Galaxy',
    tagline: 'The wider universe of Gamura, where every app and feature connects.',
    url: 'https://gamuragalaxy.vercel.app/',
    badge: 'Ecosystem',
  },
  {
    title: 'BuBuBai',
    tagline: 'An AI chat product with a tuned system prompt and a dual-API setup.',
    url: 'https://bububai.vercel.app/',
    badge: 'AI Assistant',
  },
  {
    title: 'Gamura Rollout',
    tagline: 'File sharing for images, video, audio and apps, in the style of an airdrop.',
    url: 'https://gamuraro.vercel.app/',
    badge: 'File Share',
  },
  {
    title: 'Gamura Code Preview',
    tagline: 'Write code and see the result live, right in the browser.',
    url: 'https://gamuracp.vercel.app/',
    badge: 'Developer Tool',
  },
  {
    title: 'GTrade',
    tagline: 'A trading experience built to learn how markets feel.',
    url: 'https://gamuratrade.netlify.app/',
    badge: 'Simulated Market',
  },
  {
    title: 'GJava',
    tagline: 'A Java IDE that runs entirely in the browser, in a single file.',
    url: 'https://gamura.vercel.app/',
    badge: 'Browser IDE',
  },
];

const SKILLS = [
  'Next.js',
  'Firebase',
  'Vercel',
  'Gemini API',
  'JavaScript',
  'HTML & CSS',
  'Python',
  'Java',
  'C++',
  'PHP',
  'SQL',
  'Prompt engineering',
];

const JOURNEY = [
  {
    period: 'Now',
    role: 'Founder & CEO, Gamura.',
    detail: 'Building and shipping new features across the whole ecosystem.',
  },
  {
    period: 'College',
    role: 'BCA, DDGD Vaishnav College.',
    detail: 'Data Structures & Algorithms, Operating Systems, Computer Graphics, Digital Systems. Class Representative.',
  },
  {
    period: 'Internship',
    role: 'Web development, Cognifyz IT Solutions.',
    detail: 'Real client-style work in the industry.',
  },
  {
    period: 'School',
    role: '100/100 in Computer Applications.',
    detail: 'Class Leader, where the habit of leading started.',
  },
];

const ABOUT_TEXT =
  'I’m a BCA student at DDGD Vaishnav College in Chennai who builds a whole ecosystem of live web products. Solo. From idea to deploy, with AI as my accelerator.';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms' | 'delete-account'>('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeNav, setActiveNav] = useState('top');
  const [openProjectIndex, setOpenProjectIndex] = useState<number | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [spotlightPos, setSpotlightPos] = useState({ x: '70%', y: '30%' });

  // Animated counters
  const [stats, setStats] = useState({ products: 0, score: 0, languages: 0 });
  const [hasCounted, setHasCounted] = useState(false);

  // Lit words ratio for about text
  const [litWordsCount, setLitWordsCount] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const aboutWords = ABOUT_TEXT.split(' ');

  // Parse current route on mount and on popstate
  useEffect(() => {
    const checkRoute = () => {
      const params = new URLSearchParams(window.location.search);
      const pageParam = params.get('page');
      const pathname = window.location.pathname.replace(/^\/+/g, '');

      if (pageParam === 'privacy' || pathname === 'privacy') {
        setCurrentPage('privacy');
      } else if (pageParam === 'terms' || pathname === 'terms') {
        setCurrentPage('terms');
      } else if (pageParam === 'delete-account' || pathname === 'delete-account' || pathname === 'delete') {
        setCurrentPage('delete-account');
      } else {
        setCurrentPage('home');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const navigateTo = (page: 'home' | 'privacy' | 'terms' | 'delete-account' | string) => {
    if (page === 'privacy' || page === 'terms' || page === 'delete-account') {
      setCurrentPage(page);
      window.history.pushState({}, '', `/?page=${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      window.history.pushState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Pointer move spotlight in hero
  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = `${e.clientX - rect.left}px`;
    const y = `${e.clientY - rect.top}px`;
    setSpotlightPos({ x, y });
  };

  // Scroll listener
  useEffect(() => {
    if (currentPage !== 'home') return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Section tracking for nav
      const sections = ['top', 'about', 'work', 'skills', 'journey', 'contact'];
      let current = 'top';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            current = id;
          }
        }
      }
      setActiveNav(current);

      // About text lighting effect calculation
      if (aboutRef.current) {
        const rect = aboutRef.current.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const enterProgress = (viewportH * 0.85 - rect.top) / (rect.height + viewportH * 0.35);
        const clamped = Math.min(1, Math.max(0, enterProgress));
        const litCount = Math.round(clamped * aboutWords.length);
        setLitWordsCount(litCount);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [aboutWords.length, currentPage]);

  // Observer for stats count up
  useEffect(() => {
    if (currentPage !== 'home' || !statsRef.current || hasCounted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted) {
            setHasCounted(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasCounted, currentPage]);

  const animateCounts = () => {
    const duration = 1400;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 4);

      setStats({
        products: Math.round(7 * ease),
        score: Math.round(100 * ease),
        languages: Math.round(8 * ease),
      });

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setStats({ products: 7, score: 100, languages: 8 });
      }
    };

    requestAnimationFrame(frame);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('selva6ranjan@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const toggleProject = (index: number) => {
    setOpenProjectIndex((prev) => (prev === index ? null : index));
  };

  // Route sub-views
  if (currentPage === 'privacy') {
    return <PrivacyPolicy onBack={() => navigateTo('home')} onNavigate={navigateTo} />;
  }
  if (currentPage === 'terms') {
    return <TermsOfService onBack={() => navigateTo('home')} onNavigate={navigateTo} />;
  }
  if (currentPage === 'delete-account') {
    return <DeleteAccount onBack={() => navigateTo('home')} onNavigate={navigateTo} />;
  }

  return (
    <div className="min-h-screen text-[#000000] bg-[#F3EDE0] relative selection:bg-black selection:text-[#F3EDE0]">
      {/* Top scroll progress indicator */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-black z-50 transition-all duration-75 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Pill Navigation + PWA Install Hook */}
      <header className="fixed top-[calc(env(safe-area-inset-top,0px)+12px)] left-1/2 -translate-x-1/2 z-40 max-w-[calc(100%-1.25rem)] w-auto flex items-center gap-2">
        <nav
          aria-label="Portfolio sections"
          className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#F3EDE0]/85 backdrop-blur-xl border border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] overflow-x-auto no-scrollbar"
        >
          {[
            { id: 'top', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'work', label: 'Work' },
            { id: 'skills', label: 'Skills' },
            { id: 'journey', label: 'Journey' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-[#F3EDE0] shadow-sm'
                    : 'text-[#000000]/80 hover:text-black hover:bg-black/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* In-app PWA install button */}
        <PWAInstallButton />
      </header>

      {/* Live Offline connectivity indicator */}
      <OfflineIndicator />

      <main>
        {/* ========================================================
            HERO SECTION
            ======================================================== */}
        <section
          id="top"
          ref={heroRef}
          onPointerMove={handlePointerMove}
          className="relative min-h-[100svh] flex flex-col justify-center px-5 sm:px-8 md:px-[6vw] pt-28 sm:pt-32 pb-16 overflow-hidden"
        >
          {/* Cursor Spotlight Gradient */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(560px circle at ${spotlightPos.x} ${spotlightPos.y}, rgba(0,0,0,0.08), transparent 65%)`,
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full">
            {/* Massive Editorial Headline */}
            <h1
              aria-label="Selvaranjan G"
              className="text-[clamp(44px,13.5vw,220px)] leading-[0.88] tracking-[-0.055em] font-bold text-black select-none break-words"
            >
              <span className="block overflow-hidden pb-1">
                <span className="inline-block animate-hero-up">Selvaranjan</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="inline-block font-serif-italic font-normal tracking-[-0.03em] animate-hero-up-delay">
                  G.
                </span>
              </span>
            </h1>

            {/* Subtitle & Action CTAs */}
            <div className="mt-8 sm:mt-12 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 animate-fade-in">
              <p className="max-w-xl text-[clamp(18px,2.2vw,24px)] leading-snug font-medium text-black/90 tracking-[-0.015em]">
                Founder &amp; CEO of Gamura. I design, build and ship full stack web products on my own.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base bg-black text-[#F3EDE0] transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 group"
                >
                  See my work
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="https://gamura.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm sm:text-base text-black bg-transparent border-[1.5px] border-black transition-all duration-300 hover:bg-black hover:text-[#F3EDE0] hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  Open Gamura
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Cue Mouse Indicator */}
          <a
            href="#about"
            aria-label="Scroll down to About section"
            className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-black/60 hover:text-black transition-colors"
          >
            <div className="w-[22px] h-[36px] border-[1.5px] border-black rounded-[12px] relative">
              <div className="w-[3px] h-[7px] bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-1.5 animate-scroll-dot" />
            </div>
          </a>
        </section>

        {/* ========================================================
            INFINITE TICKER / MARQUEE BANNER
            ======================================================== */}
        <div
          className="bg-black text-[#F3EDE0] overflow-hidden py-5 sm:py-7 select-none border-y border-black"
          aria-hidden="true"
        >
          <div className="animate-marquee text-[clamp(26px,4.5vw,56px)] font-semibold tracking-[-0.03em] flex items-center">
            {[0, 1, 2, 3].map((loopIdx) => (
              <div key={loopIdx} className="inline-flex items-center gap-8 sm:gap-14 px-4 sm:px-7 shrink-0">
                <span>Gamura</span>
                <span className="font-serif-italic font-normal">Galaxy</span>
                <span>BuBuBai</span>
                <span className="font-serif-italic font-normal">GRO</span>
                <span>GTrade</span>
                <span className="font-serif-italic font-normal">GJava</span>
                <span>Next.js</span>
                <span className="font-serif-italic font-normal">Firebase</span>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================
            ABOUT SECTION
            ======================================================== */}
        <section
          id="about"
          ref={aboutRef}
          className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-[6vw] max-w-7xl mx-auto"
        >
          {/* Scroll-driven word lighting effect */}
          <p
            id="big"
            className="text-[clamp(28px,4.8vw,74px)] leading-[1.1] tracking-[-0.04em] font-semibold text-black max-w-5xl"
          >
            {aboutWords.map((word, idx) => {
              const isLit = idx < litWordsCount;
              return (
                <span
                  key={idx}
                  className={`inline-block mr-[0.25em] transition-opacity duration-300 ${
                    isLit ? 'opacity-100' : 'opacity-15'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mt-16 sm:mt-24"
          >
            <div className="p-7 sm:p-9 rounded-[28px] bg-[#E8E0CE] border border-black/5 flex flex-col justify-between group hover:border-black/20 transition-all">
              <span className="text-[clamp(48px,6.5vw,84px)] font-bold tracking-[-0.05em] leading-none text-black">
                {stats.products}
              </span>
              <span className="mt-4 text-[#6b6557] font-medium text-base sm:text-lg tracking-tight">
                Live products in the Gamura ecosystem
              </span>
            </div>

            <div className="p-7 sm:p-9 rounded-[28px] bg-[#E8E0CE] border border-black/5 flex flex-col justify-between group hover:border-black/20 transition-all">
              <span className="text-[clamp(48px,6.5vw,84px)] font-bold tracking-[-0.05em] leading-none text-black">
                {stats.score}
              </span>
              <span className="mt-4 text-[#6b6557] font-medium text-base sm:text-lg tracking-tight">
                Out of 100 in 12th-grade Computer Applications
              </span>
            </div>

            <div className="p-7 sm:p-9 rounded-[28px] bg-[#E8E0CE] border border-black/5 flex flex-col justify-between group hover:border-black/20 transition-all">
              <span className="text-[clamp(48px,6.5vw,84px)] font-bold tracking-[-0.05em] leading-none text-black">
                {stats.languages}
              </span>
              <span className="mt-4 text-[#6b6557] font-medium text-base sm:text-lg tracking-tight">
                Languages: Python, C++, PHP, Java, HTML, CSS, JS, SQL
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================
            SELECTED WORK (DARK SECTION)
            ======================================================== */}
        <section
          id="work"
          className="bg-black text-[#F3EDE0] rounded-t-[36px] sm:rounded-t-[48px] py-24 sm:py-32 px-5 sm:px-8 md:px-[6vw] relative -mt-4 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 pb-4 border-b border-white/15">
              <h2 className="text-[clamp(38px,6.5vw,96px)] tracking-[-0.05em] leading-[0.95] font-bold m-0 text-[#F3EDE0]">
                Selected{' '}
                <span className="font-serif-italic font-normal tracking-[-0.03em] text-[#a69f8e]">
                  work
                </span>
              </h2>
              <p className="text-[#a69f8e] text-sm sm:text-base font-medium mt-3 sm:mt-0">
                Click any project to explore live
              </p>
            </div>

            <div className="divide-y divide-white/15">
              {PROJECTS.map((proj, idx) => {
                const isOpen = openProjectIndex === idx;

                return (
                  <div
                    key={proj.title}
                    tabIndex={0}
                    onClick={() => toggleProject(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleProject(idx);
                      }
                    }}
                    role="button"
                    aria-expanded={isOpen}
                    className="group py-7 sm:py-8 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3EDE0] rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                        <h3 className="text-[clamp(28px,4.8vw,60px)] tracking-[-0.04em] font-semibold text-[#F3EDE0] transition-transform duration-500 ease-out group-hover:translate-x-3 sm:group-hover:translate-x-4">
                          {proj.title}
                        </h3>
                        {proj.badge && (
                          <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-medium tracking-tight bg-white/10 text-[#a69f8e]">
                            {proj.badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-lg sm:text-xl transition-all duration-400 ease-out group-hover:bg-[#F3EDE0] group-hover:text-black group-hover:border-[#F3EDE0] group-hover:rotate-45"
                          title={`Open ${proj.title}`}
                          aria-label={`Open ${proj.title}`}
                        >
                          →
                        </a>
                      </div>
                    </div>

                    {/* Smooth expanding description */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isOpen ? 'max-h-56 opacity-100 mt-4' : 'max-h-0 sm:group-hover:max-h-56 opacity-0 sm:group-hover:opacity-100 sm:group-hover:mt-4'
                      }`}
                    >
                      <p className="text-[#a69f8e] text-base sm:text-xl leading-relaxed max-w-2xl">
                        {proj.tagline}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold bg-[#F3EDE0] text-black hover:bg-white transition-colors"
                        >
                          Launch {proj.title}
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            SKILLS SECTION
            ======================================================== */}
        <section id="skills" className="py-24 sm:py-32 px-5 sm:px-8 md:px-[6vw] max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-[clamp(38px,6.5vw,96px)] tracking-[-0.05em] leading-[0.95] font-bold text-black m-0">
              What I{' '}
              <span className="font-serif-italic font-normal tracking-[-0.03em] text-[#6b6557]">
                build with
              </span>
            </h2>
            <p className="text-[#6b6557] font-medium text-base sm:text-lg mt-3">
              Technologies, runtime stacks, languages, and modern AI toolchains I leverage daily.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 sm:gap-3.5">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-[clamp(16px,1.9vw,22px)] font-semibold tracking-[-0.02em] text-black border-[1.5px] border-black transition-all duration-300 hover:bg-black hover:text-[#F3EDE0] hover:-translate-y-1.5 hover:-rotate-1 active:scale-95 cursor-default select-none shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ========================================================
            JOURNEY SECTION
            ======================================================== */}
        <section id="journey" className="py-16 sm:py-24 px-5 sm:px-8 md:px-[6vw] max-w-7xl mx-auto">
          <div className="mb-10 sm:mb-14">
            <h2 className="text-[clamp(38px,6.5vw,96px)] tracking-[-0.05em] leading-[0.95] font-bold text-black m-0">
              My{' '}
              <span className="font-serif-italic font-normal tracking-[-0.03em] text-[#6b6557]">
                journey
              </span>
            </h2>
          </div>

          <div className="divide-y-[1.5px] divide-black">
            {JOURNEY.map((item) => (
              <div
                key={item.period}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] lg:grid-cols-[260px_1fr] gap-2 md:gap-8 py-7 sm:py-8 items-start"
              >
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-black">
                  {item.period}
                </div>
                <div className="text-lg sm:text-xl leading-relaxed text-[#6b6557]">
                  <strong className="text-black font-semibold mr-1.5">{item.role}</strong>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            CONTACT / LET'S BUILD SOMETHING (DARK SECTION)
            ======================================================== */}
        <section
          id="contact"
          className="bg-black text-[#F3EDE0] rounded-t-[36px] sm:rounded-t-[48px] pt-24 sm:pt-36 pb-16 sm:pb-20 px-5 sm:px-8 md:px-[6vw] text-center relative -mt-4 shadow-2xl"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="text-[clamp(44px,10vw,150px)] tracking-[-0.055em] leading-[0.92] font-bold text-[#F3EDE0] m-0 mb-8 sm:mb-12">
              Let’s build{' '}
              <span className="font-serif-italic font-normal tracking-[-0.03em] text-[#a69f8e]">
                something
              </span>
            </h2>

            {/* Main Portfolio Site CTA Button */}
            <a
              href="https://selvaranjan.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 sm:px-12 py-4 sm:py-5 rounded-full bg-[#F3EDE0] text-black text-lg sm:text-xl font-semibold tracking-tight transition-transform duration-400 hover:scale-105 active:scale-95 shadow-lg group"
            >
              <span>Visit my portfolio site</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            {/* Email quick copy button */}
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="mailto:selva6ranjan@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#F3EDE0] text-sm font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-[#a69f8e]" />
                selva6ranjan@gmail.com
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 text-xs font-medium text-[#a69f8e] hover:text-[#F3EDE0] transition-colors"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    Copied to clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Email
                  </>
                )}
              </button>
            </div>

            {/* Ecosystem Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-12 sm:mt-16 text-base sm:text-lg text-[#a69f8e]">
              <a
                href="https://gamura.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F3EDE0] transition-colors underline-offset-4 hover:underline"
              >
                Gamura
              </a>
              <span className="text-white/20">•</span>
              <a
                href="https://gamuragalaxy.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F3EDE0] transition-colors underline-offset-4 hover:underline"
              >
                Gamura Galaxy
              </a>
              <span className="text-white/20">•</span>
              <a
                href="https://bububai.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F3EDE0] transition-colors underline-offset-4 hover:underline"
              >
                BuBuBai
              </a>
            </div>

            {/* Legal, Play Store & Compliance Footer Navigation */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#a69f8e] pb-6 border-b border-white/10 w-full max-w-xl">
              <button
                onClick={() => navigateTo('privacy')}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Privacy Policy
              </button>
              <span className="text-white/20">•</span>
              <button
                onClick={() => navigateTo('terms')}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-400" />
                Terms of Service
              </button>
              <span className="text-white/20">•</span>
              <button
                onClick={() => navigateTo('delete-account')}
                className="hover:text-rose-400 transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                Delete Account
              </button>
            </div>

            {/* Footer Sign-off */}
            <footer className="mt-8 pt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#8d8676]">
              <p className="m-0">
                &copy; 2026 Selvaranjan G. Designed and built by me, with AI.
              </p>
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1 text-emerald-500 text-xs font-semibold">
                  <Smartphone className="w-3 h-3" />
                  PWA Ready
                </span>
                <a
                  href="#top"
                  className="hover:text-[#F3EDE0] transition-colors flex items-center gap-1.5"
                >
                  Back to top &uarr;
                </a>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
