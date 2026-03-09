"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WavyBackground } from "@/components/ui/wavy-background";
import { trpc } from "@/trpc/client";
import { useMemo } from "react";

interface Skill {
    id: string;
    name: string;
    category: string;
    icon: string | null;
    createdAt: Date;
}

const CATEGORY_CONFIG: Record<string, { label: string; image: string; color: string }> = {
    languages: {
        label: "Programming & HDL Languages",
        image: "/experiences/NVIDIA.jpeg",
        color: "#ff687e",
    },
    frameworks: {
        label: "Libraries & Frameworks",
        image: "/experiences/NVIDIA.jpeg",
        color: "#e3816f",
    },
    tools: {
        label: "Dev Tools",
        image: "/experiences/NVIDIA.jpeg",
        color: "#c97bb0",
    },
};

const CATEGORY_ORDER = ["languages", "frameworks", "tools"];

const SkillCube: React.FC<{ skill: Skill }> = ({ skill }) => {
    return (
        <div className="group relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 cursor-default">
            <div className="w-full h-full rounded-2xl overflow-hidden border border-white/60
                shadow-[0_4px_24px_0_rgba(0,0,0,0.18)]
                hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.28)]
                hover:scale-110 hover:-translate-y-1
                transition-all duration-300 ease-out
                bg-white/10 backdrop-blur-sm flex flex-col">

                <div className="relative bg-white/15 border-b border-white/20" style={{ flex: "2 2 0%" }}>
                    {skill.icon ? (
                        <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            sizes="(max-width: 640px) 96px, (max-width: 768px) 112px, 128px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/60 text-2xl font-[display-font] select-none">
                                {skill.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-center px-1 bg-white/5" style={{ flex: "1 1 0%" }}>
                    <span className="text-white font-[subheading-font] text-[10px] sm:text-xs text-center leading-tight line-clamp-2 drop-shadow">
                        {skill.name}
                    </span>
                </div>

            </div>
        </div>
    );
};

const CategorySection: React.FC<{ category: string; skills: Skill[] }> = ({ category, skills }) => {
    const normalizedKey = category.trim().toLowerCase();
    const config = CATEGORY_CONFIG[normalizedKey] ?? CATEGORY_CONFIG[category] ?? {
        label: category.charAt(0).toUpperCase() + category.slice(1),
        image: "/decor/recentevents.jpg",
        color: "#ff687e",
    };

    return (
        <div className="w-full rounded-4xl overflow-hidden
            bg-[#ff687e]/80 hover:bg-[#ff687e]/50
            backdrop-blur-sm border border-white backdrop-saturate-400
            shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
            hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
            transition-all duration-300">

            <div className="relative w-full h-40 sm:h-52 rounded-t-4xl overflow-hidden" style={{ backgroundColor: config.color }}>
                <Image
                    className="object-cover w-full h-full opacity-80"
                    src={config.image}
                    alt={config.label}
                    fill
                    sizes="100vw"
                />
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                    <span className="text-white font-[display-font] tracking-wide
                        text-2xl sm:text-3xl md:text-4xl
                        hover:text-3xl sm:hover:text-4xl md:hover:text-5xl
                        transition-all duration-300 drop-shadow-lg">
                        {config.label.toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="p-6 sm:p-8 md:p-10">
                {skills.length === 0 ? (
                    <p className="text-white/50 font-[body-font] text-sm text-center py-8">
                        No skills added yet.
                    </p>
                ) : (
                    <div className="flex flex-wrap gap-4 sm:gap-5 md:gap-6 justify-center sm:justify-start">
                        {skills.map((skill) => (
                            <SkillCube key={skill.id} skill={skill} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function SkillsPage() {
    const { data: skills } = trpc.skills.getAllSkills.useQuery();

    const grouped = useMemo(() => {
        if (!skills) return {};
        return skills.reduce<Record<string, Skill[]>>((acc, skill) => {
            const cat = (skill.category ?? "other").trim().toLowerCase();
            acc[cat] ??= [];
            acc[cat].push(skill);
            return acc;
        }, {});
    }, [skills]);

    const sortedCategories = useMemo(() => {
        const allCats = Object.keys(grouped);
        const known = CATEGORY_ORDER.filter((c) => allCats.includes(c));
        const unknown = allCats.filter((c) => !CATEGORY_ORDER.includes(c)).sort();
        return [...known, ...unknown];
    }, [grouped]);

    return (
        <div className="relative flex w-full flex-col min-h-screen max-w-screen overflow-x-hidden">
            <WavyBackground
                colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
                waveWidth={10}
                blur={5}
                speed="fast"
                waveOpacity={0.9}
                backgroundFill="#eeb7b7"
                className="text-center px-4 fixed"
                containerClassName="fixed inset-0 w-full h-screen"
            />
            <div className="z-0 fixed -top-20 -right-20 w-96 h-96 bg-[#9aff72] rounded-full mix-blend-multiply filter blur-3xl animate-grow-shrink pointer-events-none" />
            <div className="z-0 fixed -bottom-20 -left-20 w-96 h-96 bg-[#e3816f] rounded-full mix-blend-multiply filter blur-3xl animate-grow-shrink-delayed pointer-events-none" />

            <div className="relative z-10 flex flex-col min-h-screen">
                <div className="w-full px-5">
                    <Navbar />
                </div>

                <div className="w-full px-4 sm:px-8 md:px-12 max-w-5xl mx-auto mt-6">
                    <div className="relative rounded-3xl overflow-hidden bg-[#ff687e] border border-white">
                        <Image
                            className="w-full h-48 sm:h-64 md:h-80 object-cover opacity-80"
                            src="/matcha/projectsMatcha.jpeg"
                            alt="skills header"
                            width={3000}
                            height={3000}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                            <h1 className="text-[#ffffff] font-[display-font]
                                text-4xl sm:text-5xl md:text-6xl
                                hover:text-5xl sm:hover:text-6xl md:hover:text-7xl
                                transition-all duration-300 drop-shadow-lg">
                                SKILLS
                            </h1>
                            <p className="text-white font-[body-font] text-sm sm:text-base md:text-lg
                                hover:text-base sm:hover:text-lg md:hover:text-xl
                                transition-all duration-300 mt-2 max-w-md drop-shadow">
                                Explore my skills in languages, frameworks, and technologies that I have developed across the span of my career.
                            </p>
                        </div>
                        {/* <Image
                            className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-16 sm:w-24 md:w-28 hover:scale-110 transition-all duration-300"
                            src="/decor/heartleft.png"
                            alt=""
                            width={150}
                            height={150}
                        />
                        <Image
                            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-16 sm:w-24 md:w-28 hover:scale-110 transition-all duration-300"
                            src="/decor/heartright.png"
                            alt=""
                            width={200}
                            height={200}
                        /> */}
                    </div>
                </div>

                <div className="w-full px-4 sm:px-8 md:px-12 max-w-5xl mx-auto mt-10 mb-10 flex flex-col gap-10">
                    {sortedCategories.map((category) => (
                        <CategorySection
                            key={category}
                            category={category}
                            skills={grouped[category] ?? []}
                        />
                    ))}
                </div>

                <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pb-10 self-center justify-center">
                    <Footer />
                </div>
            </div>
        </div>
    );
}