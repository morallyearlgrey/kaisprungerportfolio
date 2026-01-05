"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { trpc } from "@/trpc/client";
import React, { useState, useEffect, useRef, useMemo } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Project {
    id: string;
    name: string;
    location: string;
    shortDescription: string;
    longDescription: string;
    projectLink: string;
    winnerTags: string;
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
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    
    const projectsWithPhotos = useMemo(() => {
        if (!projects || !projectPhotos) return [];
    
        return projects
            .map((proj) => {
                const photos = projectPhotos
                    .filter((photo) => photo.projectId === proj.id)
                    .sort((a, b) => a.order - b.order);
    
                if (photos.length === 0) return null;
    
                return {
                    ...proj,
                    photos,
                } as ProjectWithPhotos;
            })
            .filter((item): item is ProjectWithPhotos => item !== null);
    }, [projects, projectPhotos]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [selectedProject]);

    const handleProjectClick = (project: ProjectWithPhotos) => {
        setSelectedProject(project);
        setCurrentPhotoIndex(0);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        setCurrentPhotoIndex(0);
    };

    const handleNextPhoto = () => {
        if (selectedProject && selectedProject.photos.length > 1) {
            setCurrentPhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
        }
    };

    const handlePrevPhoto = () => {
        if (selectedProject && selectedProject.photos.length > 1) {
            setCurrentPhotoIndex((prev) =>
                prev === 0 ? selectedProject.photos.length - 1 : prev - 1
            );
        }
    };

    return (
        <div className="flex flex-col max-w-screen bg-black">
            <div className="relative w-full h-[120vh]">
                <div className="z-4 w-full h-fit inset-0 items-center px-5 bg-black">
                    <Navbar />
                </div>
                
                <div className="w-full p-10">
                    <Image
                        className="object-cover border-1 border-amber-600 rounded-3xl"
                        src="/coffee/lofi-girl.jpeg"
                        alt="coffee cup"
                        width={3000}
                        height={3000}
                    />
                    <div className="-translate-y-100 place-self-center flex flex-col text-white">
                        <span className="font-[display-font] text-white">title</span> 
                        <span className="font-[subheading-font] text-white">gibberish description ig</span>
                    </div>

                    {projectsWithPhotos[0] && (
                        <div 
                            onClick={() => handleProjectClick(projectsWithPhotos[0])}
                            className="absolute -translate-y-10 w-2/3 place-self-center grid grid-cols-2 border-2 border-amber-700 rounded-2xl cursor-pointer hover:border-amber-500 transition-colors"
                        >
                            <div className="relative">
                                <Image
                                    className="object-cover rounded-l-2xl"
                                    src={projectsWithPhotos[0].photos[0].photoUrl}
                                    alt="coffee cup"
                                    width={3000}
                                    height={3000}
                                />

                                <div className="absolute bottom-4 right-4 z-10">
                                    <Link
                                        href={projectsWithPhotos[0].projectLink}
                                        className="flex items-center gap-1 bg-amber-600 text-black px-3 py-2 rounded-lg shadow-lg hover:bg-amber-500 transition"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View
                                        <ExternalLink size={16} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col justify-center">
                                <span className="text-white text-lg font-semibold">Featured: {projectsWithPhotos[0].name}</span>
                                <span className="text-gray-400">{projectsWithPhotos[0].location}</span>
                                <span className="text-gray-300 mt-2">{projectsWithPhotos[0].shortDescription}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-10">
                    <div className="flex items-center gap-6">
                        <div className="flex-grow h-px bg-amber-400"></div>
                        <h2 className="font-semibold tracking-wide text-white">
                            PROJECTS
                        </h2>
                        <div className="flex-grow h-px bg-amber-400"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {projectsWithPhotos.map((item, index) => (
                            <div 
                                key={item.id}
                                onClick={() => handleProjectClick(item)}
                                className="cursor-pointer group"
                            >
                                <div className="flex flex-col rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors overflow-hidden">
                                    <div className="relative h-64">
                                        <Image
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                            src={item.photos[0].photoUrl}
                                            alt={item.name}
                                            width={2000}
                                            height={2000}
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col">
                                        <div className="text-white font-semibold text-lg mb-1">{item.name}</div>
                                        <span className="text-gray-400 text-sm mb-2">{item.location}</span>
                                        <span className="text-gray-300 text-sm line-clamp-2">{item.shortDescription}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Full Screen Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
                    <div className="w-full h-full max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-8 overflow-y-auto">
                        {/* Image Carousel Section */}
                        <div className="flex-1 flex flex-col">
                            <div className="relative flex-1 bg-zinc-900 rounded-lg overflow-hidden min-h-[400px]">
                                {/* Close Button - Top Right */}
                                <button
                                    onClick={handleCloseModal}
                                    className="absolute top-4 right-4 z-20 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all"
                                >
                                    <X className="text-white" size={24} />
                                </button>

                                {/* Carousel Navigation */}
                                {selectedProject.photos.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrevPhoto}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all"
                                        >
                                            <ChevronLeft className="text-white" size={24} />
                                        </button>
                                        <button
                                            onClick={handleNextPhoto}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all"
                                        >
                                            <ChevronRight className="text-white" size={24} />
                                        </button>
                                    </>
                                )}

                                {/* Main Image */}
                                <div className="relative w-full h-full">
                                    <Image
                                        className="object-contain w-full h-full"
                                        src={selectedProject.photos[currentPhotoIndex].photoUrl}
                                        alt={selectedProject.name}
                                        width={3000}
                                        height={3000}
                                    />

                                    {/* Project Name - Bottom Left */}
                                    <div className="absolute bottom-4 left-4 z-10">
                                        <h2 className="text-white text-2xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
                                            {selectedProject.name}
                                        </h2>
                                    </div>

                                    {/* External Link - Bottom Right */}
                                    <div className="absolute bottom-4 right-4 z-10">
                                        <a
                                            href={selectedProject.projectLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 bg-amber-600 text-black px-4 py-2 rounded-lg shadow-lg hover:bg-amber-500 transition"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>

                                {/* Photo Counter */}
                                {selectedProject.photos.length > 1 && (
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                                        <span className="text-white text-sm">
                                            {currentPhotoIndex + 1} / {selectedProject.photos.length}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-96 flex flex-col gap-6 overflow-y-auto">
                            {/* Location */}
                            <div>
                                <h3 className="text-amber-500 font-semibold mb-2 text-sm uppercase tracking-wide">
                                    Location
                                </h3>
                                <p className="text-white text-lg">{selectedProject.location}</p>
                            </div>

                            {/* Long Description */}
                            <div>
                                <h3 className="text-amber-500 font-semibold mb-2 text-sm uppercase tracking-wide">
                                    Description
                                </h3>
                                <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription}</p>
                            </div>

                            {/* Winner Tags */}
                            {selectedProject.winnerTags && (
                                <div>
                                    <h3 className="text-amber-500 font-semibold mb-2 text-sm uppercase tracking-wide">
                                        Awards
                                    </h3>
                                    <span className="inline-block px-3 py-1 bg-amber-600 text-black rounded-full text-sm font-semibold">
                                        {selectedProject.winnerTags}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}