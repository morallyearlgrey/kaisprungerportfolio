"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { Linkedin, Github, Paperclip, } from 'lucide-react';


// import { AvatarMenu } from "@/components/avatarmenu";

const routes: { title: string; href: string; image: string}[] = [
  { title: "Experiences", href: "/experiences", image: "/iconography/navbarabout.png"},
  { title: "Projects", href: "/projects", image: "/iconography/navbarevents.png"},
  { title: "Skills", href: "/skills", image: "/iconography/navbarprojects.png"},
  // { title: "Features", href: "/skills", image: "/iconography/navbarprojects.png"},
  // { title: "Recipes", href: "/recipes", image: "/iconography/navbarsponsorships.png"},
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className="relative flex items-center justify-between h-30 w-full">
			<div className="flex w-full m-6">
				<div className="flex justify-start items-center w-1/3 hover:scale-110 duration-300 transition-all">
					<Link href={"/"} className="text-white font-[body-font] flex-row flex align-middle justify-center items-center gap-x-5 text-xl">
						 <Image
                    className="object-fill w-[100] h-auto"
                    src="/decor/kaisprungericon.png"
                    alt="pouring coffee"
                    width={2000}
                    height={2000}
                  />
                        
                        KAI SPRUNGER
					</Link>
				</div>
        
        <div className="lg:flex hidden items-center justify-center gap-5 w-3/5 rounded-4xl 
        p-5 
        rounded-full 
        z-100
        my-5 
        flex 
        flex-row 
        justify-between
        gap-2 
        bg-white/10 
        hover:bg-[#ecf8e0]/30
        backdrop-blur-sm
        border-1
        border-white/85
        backdrop-saturate-250
        shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
        duration-300 
        ease-out
        transition-all 
        rounded-full
        before:absolute
        before:inset-0
        before:rounded-full
        before:p-[2px]
        before:bg-[linear-gradient(to_right,white,transparent_20%,transparent_80%,white),linear-gradient(to_bottom,white,transparent_40%,transparent_60%,white)]
        before:opacity-50
        before:-z-10

        
        ">
        {routes.map((route, index) => (
            <Link
            key={index}
            href={route.href}
            className={
                "font-[subheading-font] text-base items-center inline-flex text-white hover:text-xl transition-all duration-300 z-100 opacity-100"
            }
            >
            {route.title.toUpperCase()}

            </Link>
        ))}


        </div>

        <div className="cursor-pointer items-center w-1/3 justify-end gap-x-3 flex-row lg:flex hidden lg:display">
            <Link href="https://www.linkedin.com/in/kaisprunger/"><Linkedin className="scale-110 text-white hover:scale-140 duration-300 transition-all cursor-pointer"></Linkedin></Link>
            <Link href="https://github.com/morallyearlgrey"><Github className="scale-110 text-white hover:scale-140 duration-300 transition-all cursor-pointer"></Github></Link>
            <Link href="/resume/kai-sprunger-resume.pdf"><Paperclip  className="scale-110 text-white hover:scale-140 duration-300 transition-all cursor-pointer"></Paperclip></Link>

        </div>
        
      </div>

      

			{menuOpen && <MobileMenu toggleMenu={toggleMenu} />}

    <button onClick={toggleMenu} className="lg:hidden bg-white mr-5 z-50 cursor-pointer">
        {menuOpen ? (
          <XMarkIcon className="h-7 w-7 fixed bg-white -translate-x-7 -translate-y-3.5 z-50" />
        ) : (
          <Bars3Icon className="h-7 w-7" />
        )}
      </button>
       

    </div>
  );
};

const MobileMenu: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {

  return (
    <div className="fixed inset-0 flex flex-col z-40 bg-white h-fit max-w-screen">
      <div className="flex w-full grow flex-col mt-5 mb-5">
          <div className="text-white font-[body-font] flex-row flex  gap-x-5 text-xl lg:text-2xl items-center gap-5 m-6 px-5">
            <Image className="object-contain" src="/iconography/ieeeucficon.png" alt="IEEE UCF Logo" width={70} height={70} />IEEE @ UCF Student Chapter
          </div>


          <div className="flex flex-col p-5">
            <div className="text-[var(--ieee-dark-yellow)] font-[heading-font] ml-6 text-xl">CLUB</div>
            <div className="ml-6">
              <Link
                href="/"
                onClick={toggleMenu}
                className={"hover:text-[var(--ieee-bright-yellow)] font-[subheading-font] text-white inline-flex h-10 w-full items-center text-md transition-colors gap-3"}
              >
                 <Image
                              className="object-cover h-7 w-7"
                              src="/iconography/navbarhome.png"
                              alt="Profile"
                              width={2000}
                              height={2000}
                          />
                Home

              </Link>

              {routes.map((route, index) => (
                
                        <Link
                          key={index}
                          href={route.href}
                          onClick={toggleMenu}
                          className={"hover:text-[var(--ieee-bright-yellow)] font-[subheading-font] text-white inline-flex h-10 w-full items-center text-md transition-colors gap-3"}
                        >
                          <Image
                              className="object-cover h-7 w-7"
                              src={route.image}
                              alt="Profile"
                              width={2000}
                              height={2000}
                          />

                          {route.title}
                        </Link>
              ))}
            </div>

          </div>
        

        
        </div>
    </div>
  );
};

export { Navbar };