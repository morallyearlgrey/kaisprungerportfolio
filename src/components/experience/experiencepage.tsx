"use client";

import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Reel } from "@/components/experience/reel";
import { WavyBackground } from "@/components/ui/wavy-background";
import { Footer } from "@/components/footer";

export default function Experiences() {
    return (
        <div className="relative flex w-full flex-col max-w-screen overflow-x-hidden">
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

            <div className="relative w-full z-10">
                <div className="w-full h-fit px-4 md:px-5">
                    <Navbar />
                </div>

                <div className="w-full px-4 sm:px-8 md:px-12 max-w-5xl mx-auto mt-6">
                    <div className="relative rounded-3xl overflow-hidden bg-[#ff687e] border border-white">
                        <Image
                            className="w-full h-48 sm:h-64 md:h-80 object-cover opacity-80"
                            src="/experiences/photos/header.jpeg"
                            alt="experiences header"
                            width={3000}
                            height={3000}
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
                            <h1 className="text-[#ffffff] font-[display-font] text-4xl sm:text-5xl md:text-6xl hover:text-5xl sm:hover:text-6xl md:hover:text-7xl transition-all duration-300">
                                EXPERIENCES
                            </h1>
                            <p className="text-white font-[body-font] text-sm sm:text-base md:text-lg hover:text-base sm:hover:text-lg md:hover:text-xl transition-all duration-300 mt-2 max-w-md ">
                                Explore my career experiences through short reels that highlight the internship positions and organization roles I&apos;ve taken on. Each one captures a different snapshot of my journey.
                            </p>
                        </div>

                        {/* <Image
                            className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 w-16 sm:w-24 md:w-28 hover:scale-110 transition-all duration-300"
                            src="/decor/heartleft.png"
                            alt="heart left"
                            width={150}
                            height={150}
                        />
                        <Image
                            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-16 sm:w-24 md:w-28 hover:scale-110 transition-all duration-300"
                            src="/decor/heartright.png"
                            alt="heart right"
                            width={200}
                            height={200}
                        /> */}
                    </div>
                </div>

                <div className="relative mt-10">
                    <div className="sticky top-0 w-full min-h-screen flex items-center px-4 md:px-10 py-6">
                        <div className="w-full max-w-5xl mx-auto">
                            <Reel />
                        </div>
                    </div>
                </div>

                <div className="pb-24 self-center justify-center">
                    <Footer />
                </div>
            </div>
        </div>
    );
}