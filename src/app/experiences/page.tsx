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

import {Reel} from "@/components/experience/reel";

import { WavyBackground } from "@/components/ui/wavy-background";


export default function Experiences() {

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
                           <div className="bg-[#ff687e] h-5/12 border-1 border-white rounded-3xl">
                               <Image
                                   className="z-90 h-full border-1 border-white opacity-80  object-cover rounded-3xl w-full"
                                   src="/matcha/projectsMatcha.jpeg"
                                   alt="coffee cup"
                                   width={3000}
                                   height={3000}
                               />
       
                           </div>
                           
                           <div className="-translate-y-280 self-center text-center justify-center place-self-center flex flex-col text-white"><div className="text-[#ffffff] font-[display-font] text-6xl hover:text-7xl transition-all duration-300">EXPERIENCES</div>
                       
                           <div className="text-white flex-wrap text-lg font-[body-font] hover:text-xl transition-all duration-300">
                          two sentences about experiences
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

                           <div className="-translate-y-270">
                                <Reel></Reel>

                           </div>

                            <div className="bg-black h-40 px-10 ">

                            </div>
                           
                        </div>  


{/* 
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
                </div> */}
                
                {/* <div className="flex flex-row p-20">
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

                </div> */}

            </div>
        </div>
    );
}