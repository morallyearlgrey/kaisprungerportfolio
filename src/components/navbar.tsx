"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Linkedin, Github, Paperclip } from "lucide-react";

const routes: { title: string; href: string; image: string }[] = [
  { title: "Experiences", href: "/experiences", image: "/iconography/navbarabout.png" },
  { title: "Projects", href: "/projects", image: "/iconography/navbarevents.png" },
  { title: "Skills", href: "/skills", image: "/iconography/navbarprojects.png" },
];

const glassButton = `
  relative flex items-center justify-center gap-2.5
  bg-white/10 hover:bg-[#ecf8e0]/30
  backdrop-blur-sm border border-white/70 backdrop-saturate-400
  shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
  duration-300 ease-out transition-all
  rounded-full cursor-pointer
  before:absolute before:inset-0 before:rounded-full before:p-[2px]
  before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
  before:opacity-30 before:-z-10
`.trim();

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="relative flex items-center justify-between h-30 w-full">
        <div className="flex w-full m-6">
          {/* Logo */}
          <div className="flex justify-start items-center w-1/3 hover:scale-110 duration-300 transition-all">
            <Link
              href="/"
              className="text-white font-[body-font] flex-row flex align-middle justify-center items-center gap-x-5 text-xl"
            >
              <Image
                className="object-fill w-[100] h-auto"
                src="/decor/kaisprungericon.png"
                alt="Kai Sprunger icon"
                width={2000}
                height={2000}
              />
              KAI SPRUNGER
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="lg:flex hidden items-center justify-center gap-5 w-3/5 rounded-full
            p-5 z-100 my-5
            bg-white/10 hover:bg-[#ecf8e0]/30
            backdrop-blur-sm border border-white/85 backdrop-saturate-250
            shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
            duration-300 ease-out transition-all
            before:absolute before:inset-0 before:rounded-full before:p-[2px]
            before:bg-[linear-gradient(to_right,white,transparent_20%,transparent_80%,white),linear-gradient(to_bottom,white,transparent_40%,transparent_60%,white)]
            before:opacity-50 before:-z-10">
            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                className="font-[subheading-font] text-base items-center inline-flex text-white hover:text-xl transition-all duration-300 z-100 opacity-100"
              >
                {route.title.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Desktop social icons */}
          <div className="cursor-pointer items-center w-1/3 justify-end gap-x-3 flex-row lg:flex hidden">
            <Link href="https://www.linkedin.com/in/kaisprunger/">
              <Linkedin className="scale-110 text-white hover:scale-140 duration-300 transition-all cursor-pointer" />
            </Link>
            <Link href="https://github.com/morallyearlgrey">
              <Github className="scale-110 text-white hover:scale-140 duration-300 transition-all cursor-pointer" />
            </Link>
            <Link href="/resume/kai-sprunger-resume.pdf">
              <Paperclip className="scale-110 text-white hover:scale-140 duration-300 transition-all cursor-pointer" />
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden mr-5 z-100 p-2 hover:scale-110 ${glassButton}`}
        >
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>

      {menuOpen && <MobileMenu toggleMenu={toggleMenu} />}
    </>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  return (
    <div className="fixed inset-0 z-95 flex flex-col">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-md"
        onClick={toggleMenu}
      />

      <div className="relative z-50 mt-24 mx-4 flex flex-col gap-3 animate-in slide-in-from-top-4 duration-300">

        {/* Nav card */}
        <div className="
          rounded-3xl overflow-hidden
          bg-white/10 backdrop-blur-xl backdrop-saturate-400
          border border-white/70
          shadow-[0_16px_48px_0_rgba(0,0,0,0.25)]
        ">
          {/* Header */}
          <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-white/20">
            <Image
              className="object-fill rounded-full"
              src="/decor/kaisprungericon.png"
              alt="Kai Sprunger"
              width={44}
              height={44}
            />
            <span className="text-white font-[body-font] text-lg tracking-wide">KAI SPRUNGER</span>
          </div>

          {/* Links */}
          <div className="flex flex-col p-3 gap-1">
            <Link
              href="/"
              onClick={toggleMenu}
              className={`px-4 py-3.5 text-white font-[subheading-font] text-base tracking-wide hover:scale-[1.02] ${glassButton}`}
            >
              <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0">
                <Image src="/iconography/navbarhome.png" alt="" width={20} height={20} className="object-contain" />
              </div>
              HOME
            </Link>

            {routes.map((route, index) => (
              <Link
                key={index}
                href={route.href}
                onClick={toggleMenu}
                className={`px-4 py-3.5 text-white font-[subheading-font] text-base tracking-wide hover:scale-[1.02] ${glassButton}`}
              >
                <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/40 flex items-center justify-center flex-shrink-0">
                  <Image src={route.image} alt="" width={20} height={20} className="object-contain" />
                </div>
                {route.title.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>

        {/* Social links card */}
        <div className="
          rounded-3xl
          bg-white/10 backdrop-blur-xl backdrop-saturate-400
          border border-white/70
          shadow-[0_16px_48px_0_rgba(0,0,0,0.25)]
          p-4 flex flex-row gap-3
        ">
          <Link
            href="https://www.linkedin.com/in/kaisprunger/"
            className={`flex-1 py-3 text-white font-[subheading-font] text-sm hover:scale-[1.02] ${glassButton}`}
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </Link>
          <Link
            href="https://github.com/morallyearlgrey"
            className={`flex-1 py-3 text-white font-[subheading-font] text-sm hover:scale-[1.02] ${glassButton}`}
          >
            <Github className="w-4 h-4" />
            GitHub
          </Link>
          <Link
            href="/resume/kai-sprunger-resume.pdf"
            className={`flex-1 py-3 text-white font-[subheading-font] text-sm hover:scale-[1.02] ${glassButton}`}
          >
            <Paperclip className="w-4 h-4" />
            Resume
          </Link>
        </div>

      </div>
    </div>
  );
};

export { Navbar };