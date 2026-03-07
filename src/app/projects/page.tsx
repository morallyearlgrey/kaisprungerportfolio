"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ExternalLink, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

import { WavyBackground } from "@/components/ui/wavy-background";


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
    const carouselRef = useRef(null);

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

    useEffect(() => {
        if (typeof window !== "undefined") {
        gsap.fromTo(
            carouselRef.current,
            { opacity: 0, y: 100 },
            {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: carouselRef.current,
                start: "top 80%",
            },
            }
        );

       
        }
    }, [selectedProject]);


    const handleProjectClick = (project: ProjectWithPhotos) => {
        setSelectedProject(project);
        setCurrentPhotoIndex(0);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        setCurrentPhotoIndex(0);
    };


    return (
        <div className="relative  flex w-full flex-col max-w-screen overflow-x-hidden ">
            <WavyBackground colors={["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"]}
                  waveWidth={10}
                  blur={5}
                  speed="fast"
                  waveOpacity={0.9}
                  backgroundFill="#eeb7b7"
                  className="text-center px-4 fixed" 
                  containerClassName="fixed inset-0 w-full h-screen"> 
            </WavyBackground>
            <div className="z-0 fixed -top-20 -right-20 w-96 h-96 bg-[#9aff72] rounded-full mix-blend-multiply filter blur-3xl  grow-shrink animate-grow-shrink pointer-events-none"></div>
            <div className="z-0 fixed -bottom-20 -left-20 w-96 h-96 bg-[#e3816f] rounded-full mix-blend-multiply filter blur-3xl grow-shrink animate-grow-shrink-delayed pointer-events-none"></div>
        

            <div className="relative w-full min-h-screen z-10">
                <div className=" z-4 w-full h-fit inset-0 items-center px-5">
                    <Navbar />
                </div>
                
                 <div className="gap-10 grid w-3/4 px-10 max-w-full place-self-center">
                    <div className="bg-[#ff687e] h-4/12 border-1 border-white rounded-3xl">
                        <Image
                            className="z-90 h-full border-1 border-white opacity-80  object-cover rounded-3xl w-full"
                            src="/matcha/projectsMatcha.jpeg"
                            alt="coffee cup"
                            width={3000}
                            height={3000}
                        />

                    </div>
                    
                    <div className="-translate-y-280 self-center text-center justify-center place-self-center flex flex-col text-white"><div className="text-[#ffffff] font-[display-font] text-6xl hover:text-7xl transition-all duration-300">PROJECTS</div>
                
                    <div className="text-white flex-wrap text-lg font-[body-font] hover:text-xl transition-all duration-300">
                   two sentences about projects
                    </div>

                        
                    </div>

                     <div className=" flex flex-row justify-between bottom-0 left-0 ">
                        <Image
                            className="object-fill place-self-end -translate-y-290 -translate-x-20 z-100 hover:scale-110 transition-all duration-300"
                            src="/decor/heartleft.png"
                            alt="pouring coffee"
                            width={150}
                            height={150}
                        />
                        <Image
                            className="object-fill place-self-end -translate-y-380 translate-x-30 z-100 hover:scale-110 transition-all duration-300"
                            src="/decor/heartright.png"
                            alt="pouring coffee"
                            width={200}
                            height={200}
                        />
                                     
                    </div>  

                    {projectsWithPhotos[0] && (
                        <div 
                            className="z-100 absolute -translate-y-210 w-1/2 place-self-center grid grid-cols-2 rounded-4xl  duration-300 hover:scale-105 transition-all
                            backdrop-blur-sm
                            bg-[#ff687e]/30
                            hover:bg-[#ff687e]/50
                            border-1
                            border-white
                            backdrop-saturate-250
                            shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                            hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                            duration-300 
                            ease-out
                            transition-all 
                            before:absolute
                            before:inset-0
                            before:rounded-4xl
                            before:p-[3px]
                            before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                            before:opacity-50
                            before:-z-10
                            
                            "
                        >
                            <div className="relative">
                                <Image
                                    className="object-cover rounded-l-4xl h-full"
                                    src={projectsWithPhotos[0].photos[0].photoUrl}
                                    alt="coffee cup"
                                    width={3000}
                                    height={3000}
                                />

                                <div className="absolute bottom-4 right-4 z-10">
                                    <Link
                                        href={projectsWithPhotos[0].projectLink}
                                        onClick={() => handleProjectClick(projectsWithPhotos[0])}
                                        className="flex items-center gap-1  text-white px-3 py-2
                                        bg-[#a0d963]/80
                                        hover:scale-110
                                        cursor-pointer
                                        backdrop-blur-sm
                                        border-1
                                        border-white
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
                                        before:p-[3px]
                                        before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                                        before:opacity-50
                                        before:-z-10
                                        "
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View
                                        <ExternalLink size={16} />
                                    </Link>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col justify-center">
                                <span className="text-white text-xl font-[subheading-font]">Featured: {projectsWithPhotos[0].name}</span>
                                <span className="text-white/80 text-lg font-[body-font]">{projectsWithPhotos[0].location}</span>
                                <span className="font-[body-font] text-white mt-2">{projectsWithPhotos[0].shortDescription}</span>
                            </div>
                        </div>
                    )}

                    

                     <div className=" w-full  max-w-full h-11/12 place-self-center  -translate-y-210
                bg-[#ff687e]/80
                  hover:bg-[#ff687e]/50
                  backdrop-blur-sm
                  border
                  border-white
                  backdrop-saturate-400
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                  hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                  duration-300 
                  ease-out
                  transition-all 
                  rounded-4xl
                  before:absolute
                  before:inset-0
                  before:rounded-4xl
                  before:bg-[linear-gradient(to_right,white,transparent_20%,transparent_80%,white),linear-gradient(to_bottom,white,transparent_20%,transparent_80%,white)]
                  before:opacity-70
                  before:-z-10
              
            ">

                <div className="bg-[#ff687e] w-full rounded-t-4xl">
                    <Image
                            className="object-cover rounded-t-4xl h-70  opacity-80 w-full"
                            src="/decor/recentevents.jpg"
                            alt=""
                            width={1000}
                            height={1000}
                        />
                    </div>

                <div className="-translate-y-20 text-white font-[display-font] tracking-wide text-5xl hover:text-5xl duration-300 transition-all text-center hover:text-6xl">
                        RECENT PROJECTS
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 p-10 -translate-y-20">
                            {projectsWithPhotos.map((item, index) => (
                                <div 
                                    key={item.id}
                                    onClick={() => handleProjectClick(item)}
                                    className="cursor-pointer group "
                                >
                                    
                                    <div className={`relative rounded-3xl overflow-hidden group
                                     backdrop-blur-sm
                                    hover:bg-[#ff687e]/50
                                    hover:scale-107
                                    border-1
                                    border-white
                                    backdrop-saturate-250
                                    shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                                    hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                                    duration-300 
                                    ease-out
                                    transition-all 
                                    before:absolute
                                    before:inset-0
                                    before:rounded-3xl
                                    before:p-[3px]
                                    before:bg-[linear-gradient(to_right,white,transparent_15%,transparent_85%,white),linear-gradient(to_bottom,white,transparent_15%,transparent_85%,white)]
                                    before:opacity-75
                                    before:-z-10
                                            
                                    `} style={{
                                        backgroundColor: `${item.projectColor}BF` // 4D is hex for 30% opacity
                                    }}>
                                       
                                        <div className={`
                                        `}>
                                            <div className="relative h-64">
                                                <Image
                                                    className="object-cover w-full h-full transition-transform duration-300"
                                                    src={item.photos[0].photoUrl}
                                                    alt={item.name}
                                                    width={2000}
                                                    height={2000}
                                                />
                                            </div>

                                            <div className="p-5 flex flex-col">
                                                <div className="text-white font-[subheading-font] text-lg mb-1 transition-all duration-300 hover:text-xl">{item.name}</div>
                                                <span className="text-white/80  font-[subheading-font] transition-all duration-300 hover:text-base text-sm mb-2 ">{item.location}</span>
                                                <span className="text-white font-[body-font] transition-all duration-300 hover:text-base text-sm line-clamp-2">{item.shortDescription}</span>
                                            </div>
                                        </div>

                                       

                                    </div>
                                </div>
                            ))}
                </div>
            </div>

                    
                </div>

                
                   
        </div>

            {selectedProject && (
                <div className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-md">
                    <div className="w-1/2  overflow-y-auto overflow-x-hidden
                    duration-300
                    transition-all
                    bg-[#ff687e]/70
                    hover:bg-[#ff687e]/50
                    backdrop-blur-sm
                    backdrop-saturate-400
                    shadow-[0_8px_32                
                    hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                    ease-out
                    before:absolute
                    before:inset-0
                    before:bg-[linear-gradient(to_right,white,transparent_30%,transparent_70%,white),linear-gradient(to_bottom,white,transparent_30%,transparent_70%,white)]
                    before:opacity-60
                    before:-z-10
                    ">
                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="cursor-pointer hover:scale-115 duration-300 transition-all z-100 p-2 rounded-full
                                bg-[#ff687e]/70
                                hover:bg-[#ff687e]/50
                                backdrop-blur-sm
                                border
                                border-white
                                backdrop-saturate-400
                                shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                                hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                                ease-out
                                before:absolute
                                before:inset-0
                                before:rounded-full
                                before:bg-[linear-gradient(to_right,white,transparent_40%,transparent_60%,white),linear-gradient(to_bottom,white,transparent_40%,transparent_60%,white)]
                                before:opacity-60
                                before:-z-10
                                text-white
                                translate-y-20
                                -translate-x-10
                                "
                            ><X></X></button>
                        </div>
                        <Carousel className="h-fit place-self-center" plugins={[Autoplay({ delay: 2000 })]}>
                        <CarouselContent className="p-5 h-full">
                            {selectedProject.photos.map((item, index) => (
                                <CarouselItem key={index} className="h-full">
                                    <Image
                                        className=" w-full h-fit rounded-xl"
                                        src={item.photoUrl}
                                        alt="coffee cup"
                                        width={3000}
                                        height={3000}
                                    />
                                    <Link className="hover:scale-110 duration-300 transition-all cursor-pointer w-fit pr-3 items-center justify-center pl-3 place-self-end m-3 -translate-y-20 rounded-xl p-1 text-white flex flex-col
                                    
                                    bg-[#ff687e]/70
                                    hover:bg-[#ff687e]/50
                                    backdrop-blur-sm
                                    border
                                    border-white
                                    backdrop-saturate-400
                                    shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                                    hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                                    ease-out
                                    before:absolute
                                    before:inset-0
                                    before:rounded-xl
                                    before:bg-[linear-gradient(to_right,white,transparent_30%,transparent_70%,white),linear-gradient(to_bottom,white,transparent_30%,transparent_70%,white)]
                                    before:opacity-60
                                    before:-z-10
                                    text-white
                                    " href={selectedProject.projectLink}>View <ExternalLink></ExternalLink></Link>
                                </CarouselItem>

                            ))}

                        </CarouselContent>
                        </Carousel>

                        <div className="-translate-y-37 translate-x-10 text-white font-[subheading-font] text-xl hover:text-2xl duration-300 transition-all w-fit">{selectedProject.name}</div>
                        

                        <div className="flex flex-col -translate-y-30 gap-3 p-6">
                            <div className="w-fit rounded-full pl-2 pr-2
                            bg-[#ff687e]/70
                            hover:bg-[#ff687e]/50
                            backdrop-blur-sm
                            border
                            border-white
                            backdrop-saturate-400
                            shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                            hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                            ease-out
                            before:absolute
                            before:inset-0
                            before:rounded-full
                            before:bg-[linear-gradient(to_right,white,transparent_30%,transparent_70%,white),linear-gradient(to_bottom,white,transparent_30%,transparent_70%,white)]
                            before:opacity-60
                            before:-z-10
                            text-white
                            ">{selectedProject.location}</div>

                            <div className="text-white ">{selectedProject.longDescription}</div>

                        </div>



                     </div>   

                </div>

            )}
            <div className="pb-10 w-4/6 self-center">
                            <Footer ></Footer>
            
                          </div>
        </div>
    )
}