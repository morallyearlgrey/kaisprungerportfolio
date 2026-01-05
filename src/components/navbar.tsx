"use client";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";
import { trpc } from "@/trpc/client";
import { RabbitIcon, Linkedin, Github, Paperclip, } from 'lucide-react';


// import { AvatarMenu } from "@/components/avatarmenu";

const routes: { title: string; href: string; image: string}[] = [
  { title: "Experiences", href: "/experiences", image: "/iconography/navbarabout.png"},
  { title: "Projects", href: "/projects", image: "/iconography/navbarevents.png"},
  { title: "Skills", href: "/skills", image: "/iconography/navbarprojects.png"},
  { title: "Features", href: "/skills", image: "/iconography/navbarprojects.png"},
  { title: "Recipes", href: "/recipes", image: "/iconography/navbarsponsorships.png"},
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className="relative flex items-center justify-between h-40 w-full">
			<div className="flex w-full m-6">
				<div className="flex justify-start items-center w-1/3">
					<Link href={"/"} className="text-white font-[body-font] flex-row flex align-middle justify-center items-center gap-x-5 text-xl  hover:text-[var(--ieee-dark-yellow)] transition">
						<RabbitIcon className="scale-110 text-white"></RabbitIcon>
                        
                        KAI SPRUNGER
					</Link>
				</div>
        
        <div className="lg:flex hidden items-center justify-center gap-5 w-3/5 rounded-4xl bg-[var(--blue)] p-5 ">
        {routes.map((route, index) => (
            <Link
            key={index}
            href={route.href}
            className={
                "font-[body-font] text-sm items-center inline-flex text-white hover:text-[var(--ieee-dark-yellow)] transition z-100 opacity-100"
            }
            >
            {route.title.toUpperCase()}

            </Link>
        ))}


        </div>

        <div className="items-center w-1/3 justify-end gap-x-3 flex-row lg:flex hidden lg:display">
            <Linkedin className="scale-110 text-white"></Linkedin>
            <Github className="scale-110 text-white"></Github>
            <Paperclip className="scale-110 text-white"></Paperclip>

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