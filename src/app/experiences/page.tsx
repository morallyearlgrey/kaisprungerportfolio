"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Navbar } from "@/components/navbar";

import { RabbitIcon } from "lucide-react";

import { useRouter } from "next/navigation";

import Autoplay from "embla-carousel-autoplay";

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { trpc } from "@/trpc/client";
import React, { useState, useEffect, useRef, useMemo } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface Experience {
    id: string;
    name: string;
    company: string;
    dateRange: string;
    location: string | null;
    description: string | null;
    responsibilities: string | null;
}

interface ExperienceWithPhoto extends Experience {
    photoUrl: string;
    caption: string;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
    </>
  );
}


export default function Experiences() {
    const router = useRouter();

    const { data: experiences } = trpc.experiences.getAllExperiences.useQuery();
    const { data: experiencePhotos } = trpc.experiences.getAllExperiencePhotos.useQuery();

    const [isFlipped, flip] = useState<Boolean>();

	const carouselRef = useRef(null);

    const experiencesWithPhotos = useMemo(() => {
        if (!experiences || !experiencePhotos) return [];

        return experiences
            .map((exp) => {
                const firstPhoto = experiencePhotos.find(
                    (photo) => photo.experienceId === exp.id
                );

                if (!firstPhoto) return null;

                return {
                    ...exp,
                    photoUrl: firstPhoto.photoUrl,
                    caption: firstPhoto.caption,
                } as ExperienceWithPhoto;
            })
            .filter((item): item is ExperienceWithPhoto => item !== null);
    }, [experiences, experiencePhotos]);

    useEffect(() => {
        if (typeof window !== "undefined" && carouselRef.current) {
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
				},
			);
		}
    }, [experiencesWithPhotos]);

    return (
        <div className="flex flex-col max-w-screen">
            <div className="relative w-full h-[120vh]">
                <div className="z-4 w-full h-fit inset-0 items-center px-5 bg-black">
                    <Navbar />
                </div>

                
                <div className="flex flex-row justify-between pl-20 pr-20 bg-black">
                     <div className="text-left flex flex-col w-1/3 ">
                        <span className="font-[display-font] text-white">title</span> 
                        <span className="font-[subheading-font] text-white">gibberish description ig</span> 
                    </div>

                    <div className="relative flex w-2/5">
                        <Image
                            className="object-center -translate-y-20"
                            src="/coffee/coffeecup.png"
                            alt="coffee cup"
                            width={3000}
                            height={3000}
                        />
                    </div>
                </div>

                <div className="bg-black h-40"></div>

                <div
                    ref={carouselRef}
                    className=" z-100 flex justify-center w-full"
                >
                    <Carousel
                        opts={{ align: "center" }}
                        plugins={[Autoplay({ delay: 2000 })]}
                        className="w-full -translate-y-1/2"
                    >
                        <CarouselContent>
                        {experiencesWithPhotos.map((item, index) => (
                            <CarouselItem
                                key={item.id}
                                className=" flex w-full justify-center items-center cursor-grab py-3"
                            >
                                <div className="p-2">
                                    <div className="cursor-grab group relative w-full overflow-hidden p-[3px] bg-transparent transition-transform hover:scale-102 rounded-sm">
                                        <div
                                            className="animated-border absolute inset-0 p-20 bg-[conic-gradient(var(--ieee-bright-yellow)_20deg,transparent_120deg)] transition-all duration-300 animate-spin -z-10 rounded-sm"
                                            style={{ animationDuration: "6s" }}
                                        />
                                        <Card className="relative z-10 p-0 rounded-sm border-none h-90 w-200 transition shadow-md overflow-hidden group" onClick={()=> flip(!isFlipped)}>
                                            {!isFlipped ? (
                                                
                                                <CardContent className="flex flex-col justify-end h-full w-full p-0">
                                                <div className="relative h-full w-full">
                                                    <Image
                                                        src={item.photoUrl}
                                                        alt={item.caption || item.name}
                                                        fill
                                                        className="object-cover object-bottom rounded-none"
                                                        priority
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                                    <span className="absolute w-full h-fit bottom-0 left-1/2 -translate-x-1/2 p-2 text-white text-lg font-[body-font] bg-black/60">
                                                        {item.name} - {item.company}
                                                    </span>
                                                </div>
                                            </CardContent>

                                            ) : (
                                                <CardContent className="flex flex-col justify-end h-full w-full p-0">
                                                <div className="relative h-full w-full">
                                                   <span className="">{item.description}</span>
                                                </div>
                                            </CardContent>


                                            )
                                            
                                            }
                                            
                                        </Card>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                
                <div className="flex flex-row p-20">
                    <div className="flex flex-col">
                        <span className="">1 gibberish</span>
                        <span className="">2 gibberish</span>
                    </div>
                    <Canvas>
                        <Scene />
                    </Canvas>
                    <div className="flex flex-col">
                        <span className="">3 gibberish</span>
                        <span className="">4 gibberish</span>
                    </div>

                </div>

            </div>
        </div>
    );
}