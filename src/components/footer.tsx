
"use client";
import React from "react";

// import { Github, Instagram, Linkedin, Youtube, Facebook } from 'lucide-react';

// const socials: { title: string; href: string; icon: React.ReactNode }[] = [
//     { title: "instagram", href: "https://www.instagram.com/ieeeucf/?hl=en", icon: <Instagram className="w-5 h-5 text-white hover:text-[var(--ieee-bright-yellow)]" /> },
//     { title: "linkedin", href: "https://www.linkedin.com/company/ieee-ucf/", icon: <Linkedin className="w-5 h-5 text-white hover:text-[var(--ieee-bright-yellow)]" /> },
//     { title: "youtube", href: "https://www.youtube.com/@ieeeucf2287", icon: <Youtube className="w-5 h-5 text-white hover:text-[var(--ieee-bright-yellow)]" /> },
//     { title: "facebook", href: "https://www.facebook.com/ieeeatucf/", icon: <Facebook className="w-5 h-5 text-white hover:text-[var(--ieee-bright-yellow)]" /> },
//     { title: "github", href: "https://github.com/IEEE-UCF", icon: <Github className="w-5 h-5 text-white hover:text-[var(--ieee-bright-yellow)]" /> },
    
// ]; 

const Footer: React.FC = () => {
    return (
        <div className="
          items-center 
        place-self-center justify-center gap-1 w-3/5 rounded-4xl 
        p-5 
        rounded-full 
        z-100
        flex 
        flex-col 
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
            
        <div className="text-white text-center font-[body-font]">
            Fueled by a cup of strawberry matcha.
        </div>
        <div className="text-white/80 text-sm font-[body-font]">
            © 2026 Kai Sprunger
        </div>
        </div>
                    
                   
    );
};

export { Footer };
