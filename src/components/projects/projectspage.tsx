"use client"

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExternalLink, X } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";

import { trpc } from "@/trpc/client";
import React, { useState, useEffect, useMemo } from "react";

import { WavyBackground } from "@/components/ui/wavy-background";

interface Project {
    id: string;
    name: string;
    location: string;
    shortDescription: string;
    longDescription: string;
    projectLink: string;
    winnerTags: string;
    projectColor: string;
}

interface ProjectPhoto {
    id: string;
    projectId: string;
    photoUrl: string;
    caption: string;
    order: number;
}

interface ProjectWithPhotos extends Project {
    photos: ProjectPhoto[];
}

export default function Projects() {
    const { data: projects } = trpc.projects.getAllProjects.useQuery();
    const { data: projectPhotos } = trpc.projects.getAllProjectPhotos.useQuery();

    const [selectedProject, setSelectedProject] = useState<ProjectWithPhotos | null>(null);

    const projectsWithPhotos = useMemo(() => {
        if (!projects || !projectPhotos) return [];
        return projects
            .map((proj) => {
                const photos = projectPhotos
                    .filter((photo) => photo.projectId === proj.id)
                    .sort((a, b) => a.order - b.order);
                if (photos.length === 0) return null;
                return { ...proj, photos } as ProjectWithPhotos;
            })
            .filter((item): item is ProjectWithPhotos => item !== null);
    }, [projects, projectPhotos]);

    useEffect(() => {
        document.body.style.overflow = selectedProject ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [selectedProject]);

    const handleProjectClick = (project: ProjectWithPhotos) => setSelectedProject(project);
    const handleCloseModal = () => setSelectedProject(null);

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
                            alt="projects header"
                            width={3000}
                            height={3000}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                            <h1 className="text-[#ffffff] font-[display-font] text-4xl sm:text-5xl md:text-6xl hover:text-5xl sm:hover:text-6xl md:hover:text-7xl transition-all duration-300 drop-shadow-lg">
                                PROJECTS
                            </h1>
                            <p className="text-white font-[body-font] text-sm sm:text-base md:text-lg hover:text-base sm:hover:text-lg md:hover:text-xl transition-all duration-300 mt-2 max-w-md drop-shadow">
                                Browse the projects I’ve created across hackathons, UCF courses, and my personal life. Each one represents a challenge solved, a skill learned, and an idea brought to life.
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

                    {projectsWithPhotos[0]?.photos[0] && (
                        <div className="mt-8 mx-auto max-w-xl grid grid-cols-1 sm:grid-cols-2 rounded-3xl overflow-hidden
                            backdrop-blur-sm bg-[#ff687e]/30 hover:bg-[#ff687e]/50
                            border border-white backdrop-saturate-250
                            shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                            hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                            transition-all duration-300 hover:scale-[1.02]"
                        >
                            <div className="relative">
                                <Image
                                    className="object-cover w-full h-48 sm:h-full"
                                    src={projectsWithPhotos[0].photos[0].photoUrl}
                                    alt={projectsWithPhotos[0].name}
                                    width={3000}
                                    height={3000}
                                />
                                <div className="absolute bottom-4 right-4 z-10">
                                    <Link
                                        href={projectsWithPhotos[0].projectLink}
                                        className="flex items-center gap-1 text-white px-3 py-2
                                        bg-[#a0d963] hover:bg-[#ecf8e0]/30 cursor-pointer
                                        backdrop-blur-sm border border-white backdrop-saturate-250
                                        shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                                        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                                        duration-300 ease-out transition-all rounded-full
                                        font-[body-font] text-sm hover:text-base"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View <ExternalLink size={16} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-5 flex flex-col justify-center gap-1">
                                <span className="text-white font-[subheading-font] text-base sm:text-lg hover:text-lg sm:hover:text-xl transition-all duration-300">
                                    Featured: {projectsWithPhotos[0].name}
                                </span>
                                <span className="text-white/80 font-[body-font] text-sm sm:text-base hover:text-base sm:hover:text-lg transition-all duration-300">
                                    {projectsWithPhotos[0].location}
                                </span>
                                <span className="text-white font-[body-font] text-xs sm:text-sm hover:text-sm sm:hover:text-base transition-all duration-300 mt-1">
                                    {projectsWithPhotos[0].shortDescription}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="w-full px-4 sm:px-8 md:px-12 max-w-5xl mx-auto mt-10 mb-10">
                    <div className="rounded-4xl overflow-hidden
                        bg-[#ff687e]/80 hover:bg-[#ff687e]/50
                        backdrop-blur-sm border border-white backdrop-saturate-400
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                        transition-all duration-300">

                        <div className="relative bg-[#ff687e] w-full">
                            <Image
                                className="object-cover w-full h-40 sm:h-56 opacity-80"
                                src="/decor/recentevents.jpg"
                                alt=""
                                width={1000}
                                height={1000}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[#ffffff] font-[display-font] tracking-wide text-3xl sm:text-4xl md:text-5xl hover:text-4xl sm:hover:text-5xl md:hover:text-6xl transition-all duration-300 drop-shadow-lg text-center px-4">
                                    RECENT PROJECTS
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-8">
                            {projectsWithPhotos.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => handleProjectClick(item)}
                                    className="cursor-pointer group"
                                >
                                    <div
                                        className="relative rounded-3xl overflow-hidden
                                        hover:scale-[1.03] border border-white
                                        shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                                        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                                        duration-300 ease-out transition-all"
                                        style={{
                                            background: `linear-gradient(135deg, ${item.projectColor}CC 0%, ${item.projectColor}55 100%)`,
                                        }}
                                    >
                                        <div className="relative h-48 sm:h-56 md:h-64">
                                            <Image
                                                className="object-cover w-full h-full transition-transform duration-300"
                                                src={item.photos[0]!.photoUrl}
                                                alt={item.name}
                                                width={2000}
                                                height={2000}
                                            />
                                            <div
                                                className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                                                style={{
                                                    background: `linear-gradient(to bottom, transparent, ${item.projectColor}DD)`,
                                                }}
                                            />
                                        </div>

                                        <div
                                            className="p-4 sm:p-5 flex flex-col"
                                            style={{ backgroundColor: `${item.projectColor}33` }}
                                        >
                                            <div className="text-white font-[subheading-font] text-base sm:text-lg hover:text-lg sm:hover:text-xl mb-1 transition-all duration-300">
                                                {item.name}
                                            </div>
                                            <span className="text-white/80 font-[subheading-font] text-xs sm:text-sm hover:text-sm sm:hover:text-base mb-2 transition-all duration-300">
                                                {item.location}
                                            </span>
                                            <span className="text-white font-[body-font] text-xs sm:text-sm hover:text-sm sm:hover:text-base line-clamp-2 transition-all duration-300">
                                                {item.shortDescription}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 md:px-12 pb-10 self-center justify-center">
                    <Footer />
                </div>
            </div>

            {selectedProject && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-md">
                    <div
                        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl
                        backdrop-blur-sm
                        border border-white backdrop-saturate-400
                        shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                        transition-all duration-300"
                        style={{
                            background: `linear-gradient(135deg, ${selectedProject.projectColor}CC 0%, ${selectedProject.projectColor}88 100%)`,
                        }}
                    >
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full cursor-pointer
                            hover:scale-110 duration-300 transition-all
                            bg-white/20 hover:bg-[#ecf8e0]/30
                            backdrop-blur-sm border border-white text-white
                            shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]"
                        >
                            <X size={18} />
                        </button>

                        <Carousel className="w-full" plugins={[Autoplay({ delay: 2000 })]}>
                            <CarouselContent>
                                {selectedProject.photos.map((photo, index) => (
                                    <CarouselItem key={index}>
                                        <Image
                                            className="w-full h-56 sm:h-72 object-cover rounded-t-3xl"
                                            src={photo.photoUrl}
                                            alt={`photo ${index + 1}`}
                                            width={3000}
                                            height={3000}
                                        />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>

                        <div className="flex justify-end px-5 -mt-8 relative z-10">
                            <Link
                                href={selectedProject.projectLink}
                                className="flex items-center gap-1 px-4 py-2 rounded-xl
                                font-[body-font] text-sm hover:text-base text-white
                                bg-[#a0d963] hover:bg-[#ecf8e0]/30 backdrop-blur-sm
                                border border-white hover:scale-105 transition-all duration-300
                                shadow-[0_4px_16px_0_rgba(0,0,0,0.12)] cursor-pointer"
                            >
                                View <ExternalLink size={14} />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3 p-5 pt-4">
                            <div className="text-white font-[subheading-font] text-lg sm:text-xl hover:text-xl sm:hover:text-2xl transition-all duration-300">
                                {selectedProject.name}
                            </div>
                            <div className="w-fit rounded-full px-3 py-1
                                font-[subheading-font] text-sm hover:text-base transition-all duration-300
                                bg-white/20 hover:bg-[#ecf8e0]/30 backdrop-blur-sm border border-white text-white
                                shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]">
                                {selectedProject.location}
                            </div>
                            <div className="text-white font-[body-font] text-sm sm:text-base transition-all duration-300 leading-relaxed">
                                {selectedProject.longDescription
                                    ?.split(/[•]/g)
                                    .map((s) => s.trim())
                                    .filter(Boolean)
                                    .length > 1
                                    ? (
                                        <ul className="space-y-1.5">
                                            {selectedProject.longDescription
                                                .split(/[•]/g)
                                                .map((s) => s.trim())
                                                .filter(Boolean)
                                                .map((line, i) => (
                                                    <li key={i} className="flex gap-2 hover:text-base sm:hover:text-lg transition-all duration-300">
                                                        <span className="text-white/50 flex-shrink-0 mt-0.5">•</span>
                                                        <span>{line}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    )
                                    : (
                                        <span className="hover:text-base sm:hover:text-lg transition-all duration-300">
                                            {selectedProject.longDescription}
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}