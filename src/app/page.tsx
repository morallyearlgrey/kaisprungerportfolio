"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Navbar } from "../components/navbar";


import { useRouter } from "next/navigation";

import {useState, useEffect} from "react";

import { trpc } from "@/trpc/client";

import { MusicPlayer } from "@/components/home/musicplayer";

import { WavyBackground } from "@/components/ui/wavy-background";


import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Footer } from "@/components/footer";

type Event = {
  id: string;
  headline: string;
  date: string;
  location: string | null;
  description: string;
  photoUrl: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
};

const aboutScript: {id: number; title: string; paragraph: string; highlight: string[]; image: string}[] = [
  { id: 1, title: "INTRODUCTION", paragraph: 
   "Hello, my name is Kai Sprunger and I am a Software Engineer studying Computer Science at the University of Central Florida. No matter what challenge I face, I always embrace it with optimism. Throughout being the IEEE @ UCF Software Chair, the Knight Hacks Hackathon Lead, a NVIDIA Software Engineer, and a BNY Software Engineer, I've completed my work thoroughly with a smile. Just as my community has helped me in my lowest times, I hope that I can uplift others too and inspire them to keep on pursuing their goals.",
   highlight: ["Kai Sprunger", "Software Engineer", "University of Central Florida", "IEEE @ UCF Software Chair", "Knight Hacks Hackathon Lead", "NVIDIA", "BNY", "Computer Science"],
   image: "/home/introduction.JPG",
  },

  { id: 2, title: "COMMUNITY", paragraph: 
    "This portfolio is not here to exclusively display who I am. Several wonderful people at the University of Central Florida (UCF) have played significant roles in passing down technical knowledge, professional advice, and most importantly, a strong work ethic. Because I would not be who I am today without them, I hope that I can give back by being a heavily active student in UCF's EECS community. As the Software Chair of IEEE @ UCF, I am leading a team of incredible SWEs in developing the organization's website/member dashboard, Discord bot, and resume website. Additionally, within Knight Hacks, I worked as a Hackathon Organizer, where I had the amazing opportunity to co-lead volunteers and co-organize for Knight Hacks VIII. I am so grateful for every core memory and skill boost I've gained through IEEE @ UCF and Knight Hacks. They are my second family and I owe everything to them.", 
   highlight: ["This portfolio is not here to exclusively display who I am.", "strong work ethic", "Software Chair of IEEE @ UCF", "Hackathon Organizer"],
   image: "/home/community.png",
  },

  { id: 3, title: "CAREER", paragraph: 
    "For me, the most fulfilling part of working as a Software Engineer is the moment when you finally feel proud of what you've developed. This feeling, built upon hours of parsing through Stack Overflow and programming on 400 mg of caffeine, is irreplaceable. I've experienced this sense of accomplishment through the projects I've completed within NVIDIA, BNY, and software development hackathons. As a former and returning Software Engineer Intern at NVIDIA, I increased the coverage of a RISC-V OS microkernel library from 77.7% to 97.1% and uncovered bugs, improving the reliability of the system. Within hackathons, I've worked on projects ranging from a tariff rate API/chrome extension, a networking application with a vector-based recommendation system, a hackathon organization website, and more. No matter the project, I'm driven by the satisfaction of solving difficult problems and the pride that comes with seeing your work come to life.",
   highlight: ["For me, the most fulfilling part of working as a Software Engineer is the moment when you finally feel proud of what you've developed.", "Software Engineer Intern at NVIDIA", "hackathons"],
   image: "/home/career.jpeg",
  },

  { id: 4, title: "END NOTE", paragraph: 
    "For every low moment, there is still a high ahead, and even on the hardest days, showing up with a positive attitude makes all the difference. Pursuing Computer Science has taught me this valuable lesson, showing me how to stay composed under pressure and to continue persevering even if nothing has gone to plan. Every obstacle is an opportunity to grow.",
   highlight: ["Every obstacle is an opportunity to grow."],
   image: "/home/endnote.png",

  },

];


const highlightText = (text:string, wordsToHighlight:string[], isHovered:boolean) => {
  if(!isHovered || wordsToHighlight.length<1) {
    return text;
  }

    const pattern = wordsToHighlight
      .map(word => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    
    const regex = new RegExp(`(${pattern})`, 'gi');
    
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      const isHighlighted = wordsToHighlight.some(
        word => part.toLowerCase() === word.toLowerCase()
      );
      
      return isHighlighted ? (
        <span key={index} className="text-[#9aff72] font-[heading-font] transition-all duration-300">
          {part}
        </span>
      ) : (
        <span key={index} className=" transition-all duration-300">{part}</span>
      );
    });
  };


// crafted this entire page by hand practically, kms
export default function Home() {
  const router = useRouter();
 
  const { data: Events } = trpc.events.getAllEvents.useQuery();

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  const handleEventSelect = (event: Event) => {
    setCurrentEvent(event);
  }

  const [strawberryMilk, setStrawberryMilk] = useState<string>("/decor/strawberrymilk/3.png");
  const [highlight, setHighlight] = useState<boolean>(false);


  useEffect(() => {
    if (Events && Events.length > 0 && Events[0]) {
      setCurrentEvent(Events[0]);
    }
}, [Events]);
// [background:radial-gradient(125%_125%_at_50%_10%,#9AA48F_40%,#DDDDDD_70%)] 
// bg-[#eeb7b7]
// animated-background
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

          <div className="lg:gap-10 lg:grid lg:px-10 lg:max-w-full py-10">

            <div className="lg:z-100 lg:p-10 flex-col lg:gap-y-2 flex lg:translate-x-50 ">
                <div className="text-[#ffffff] font-[display-font] text-6xl hover:text-7xl lg:text-7xl lg:hover:text-8xl transition-all duration-300 text-center justify-center place-self-center lg:text-left lg:justify-start lg:place-self-start">KAI SPRUNGER</div>
                <div className="lg:typewriter text-3xl hover:text-4xl lg:text-4xl font-[subheading-font] max-w-fit text-white lg:hover:text-5xl transition-all duration-300 text-center justify-center place-self-center lg:text-left lg:justify-start lg:place-self-start">SOFTWARE ENGINEER</div>
                <div className="text-white flex-wrap text-lg font-[body-font] hover:text-xl transition-all duration-300 text-center justify-center place-self-center lg:text-left lg:justify-start lg:place-self-start">
                  Sophomore majoring in Computer Science at the University of Central Florida.
                </div>

                <Button 
                className="relative z-90 w-fit p-10 font-[subheading-font] 
                  bg-white/10 
                  hover:bg-[#ecf8e0]/30
                  backdrop-blur-sm
                  border-1
                  border-white/70
                  backdrop-saturate-400
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                  hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                  duration-300 
                  ease-out
                  text-base
                  hover:text-lg
                  hover:scale-[1.02] 
                  transition-all 
                  -translate-x-3
                  translate-y-3
                  cursor-pointer 
                  rounded-full
                  before:absolute
                  before:inset-0
                  before:rounded-full
                  before:p-[2px]
                  before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                  before:opacity-30
                  before:-z-10
                  lg:self-start
                  self-center
                  " onClick={() => router.push("/experiences")}
              >
                  <span>LEARN ABOUT WHO I AM...</span>
                 
                </Button>
             

              </div>

            <div className="absolute  left-1/2 -translate-x-1/2  lg:w-3/4 lg:py-0 py-20 max-w-full pl-10 pr-10 h-full">
                  
              <div className="bg-[#ff687e] border-1 border-white rounded-3xl h-8/12 
              ">
                <video autoPlay loop muted playsInline controls={false} className="z-90 border-1 border-white opacity-80 object-cover rounded-3xl  h-full w-full" src="/home/matcha.mp4">
                </video>
                <div className="flex flex-row justify-between translate-x-15">
                   <Image
                    className="object-fill place-self-end  -translate-y-100 z-100 -translate-x-30 hover:scale-110 transition-all duration-300"
                    src="/iconography/heartleft.png"
                    alt="pouring coffee"
                    width={120}
                    height={120}
                  />
                  <Image
                    className="object-fill place-self-end -translate-y-50 z-100  hover:scale-110 transition-all duration-300"
                    src="/iconography/heartright.png"
                    alt="pouring coffee"
                    width={100}
                    height={100}
                  />
                </div>  
               
              </div>

              
              <MusicPlayer></MusicPlayer>

              <div className="w-full my-20
                bg-[#ff687e]/80
                  hover:bg-[#ff687e]/50
                  backdrop-blur-sm
                  border
                  border-white/90
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
              
              "
              
              >
                <div className="bg-[#ff687e]  rounded-t-4xl">
              <Image
                  className="object-cover rounded-t-4xl h-70 opacity-80 w-full"
                  src="/home/aboutme.jpg"
                  alt=""
                  width={1000}
                  height={1000}
               />
                  </div>

               <div className="-translate-y-20 text-white font-[display-font] tracking-wide text-4xl hover:text-5xl lg:text-5xl duration-300 transition-all text-center lg:hover:text-6xl">
                    ABOUT ME
              </div>


             
                <div className="place-self-center -translate-y-5">
                  <Carousel className="w-full max-w-3xl">
                  <CarouselContent className="">
                    {aboutScript.map((item, index)=> (
                      <CarouselItem className="flex flex-col lg:flex-row place-content-center place-self-center self-center justify-center transition-all duration-300  gap-6 text-left" key={index}>
                        <div className="flex flex-col self-center text-left">
                            <div className="text-center lg:text-left font-[subheading-font] text-white text-2xl hover:text-3xl transition-all duration-300">{item.title}</div>
                            <div className="self-center md:pl-10 md:pr-10 pl-40 pr-40 lg:p-0 text-center lg:text-justify text-white text-base leading-relaxed max-w-2xl transition-all duration-300" onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}>
                              {highlightText(item.paragraph, item.highlight, highlight)}
                            </div>
                        </div>
                        <div className="border-1 border-white/80 bg-[#ff687e] rounded-3xl lg:w-2/3 w-1/2 self-center lg:self-start transition-all duration-300 hover:scale-100 scale-95">
                           <Image
                              className="object-cover  border-1 border-white/80 rounded-3xl h-full w-full opacity-80"
                              src={item.image}
                              alt="pouring coffee"
                              width={1000}
                              height={1000}
                        />


                        </div>
                       
                       
                      </CarouselItem>

                    ))}
                  </CarouselContent>

                  <CarouselPrevious className="hidden lg:flex bg-white/10 text-white hover:text-white
                  hover:bg-[#ecf8e0]/30
                  backdrop-blur-sm
                  scale-150
                  border-1
                  border-white/70
                  backdrop-saturate-400
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                  hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                  duration-300 
                  ease-out
                  text-base
                  hover:text-lg
                  hover:scale-180
                  transition-all 
                  cursor-pointer 
                  rounded-full
                  before:absolute
                  before:inset-0
                  before:rounded-full
                  before:p-[2px]
                  before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                  before:opacity-30
                  before:-z-10"
                   />
                  <CarouselNext className="hidden lg:flex bg-white/10 text-white hover:text-white
                  hover:bg-[#ecf8e0]/30
                  scale-150
                  backdrop-blur-sm
                  border-1
                  border-white/70
                  backdrop-saturate-400
                  shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                  hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                  duration-300 
                  ease-out
                  text-base
                  hover:text-lg
                  hover:scale-180 
                  transition-all 
                  cursor-pointer 
                  rounded-full
                  before:absolute
                  before:inset-0
                  before:rounded-full
                  before:p-[2px]
                  before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                  before:opacity-30
                  before:-z-10" />

                  <div className="flex lg:hidden justify-center items-center gap-8 mt-4 pb-2">
                    <CarouselPrevious className="static translate-x-0 translate-y-0
                      bg-white/10 text-white hover:text-white
                      hover:bg-[#ecf8e0]/30
                      backdrop-blur-sm
                      border-1
                      border-white/70
                      backdrop-saturate-400
                      shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                      hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                      duration-300 
                      ease-out
                      hover:scale-110
                      transition-all 
                      cursor-pointer 
                      rounded-full
                      w-10 h-10
                      before:absolute
                      before:inset-0
                      before:rounded-full
                      before:p-[2px]
                      before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                      before:opacity-30
                      before:-z-10" />
                    <CarouselNext className="static translate-x-0 translate-y-0
                      bg-white/10 text-white hover:text-white
                      hover:bg-[#ecf8e0]/30
                      backdrop-blur-sm
                      border-1
                      border-white/70
                      backdrop-saturate-400
                      shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                      hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                      duration-300 
                      ease-out
                      hover:scale-110
                      transition-all 
                      cursor-pointer 
                      rounded-full
                      w-10 h-10
                      before:absolute
                      before:inset-0
                      before:rounded-full
                      before:p-[2px]
                      before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                      before:opacity-30
                      before:-z-10" />
                  </div>

                  
                </Carousel>

                </div>
                

              
              <div className="flex flex-col lg:flex-row py-10 -translate-y-5">

                 <div className="w-2/3 lg:place-self-start place-self-center">
                  <Image
                    className="object-fill w-full transition-all duration-300 hover:scale-107"
                    src={strawberryMilk}
                    alt="pouring coffee"
                    width={2000}
                    height={2000}
                    onMouseEnter={() => setStrawberryMilk("/iconography/strawberrymilk/3.png")}
                  />
                </div>
                
                <div className="flex flex-col text-white gap-2 self-center w-full pl-20 pr-20 lg:pl-0 lg:pr-15 ">
                  <div className="text-white text-center lg:text-start text-2xl font-[subheading-font] hover:text-3xl transition-all duration-300">THIS IS WHAT I&apos;M MOST PROUD OF</div>
                 <div className="text-sm lg:text-base font-[subheading-font]  hover:text-lg hover:scale-105 transition-all duration-300  text-left lg:justify-start
                 bg-white/10 
                 p-3
                 w-full
                 hover:bg-[#ecf8e0]/30
                 backdrop-blur-sm
                 border-1
                 border-white/70
                 backdrop-saturate-400
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                 duration-300 
                 ease-out
                 transition-all 
                 rounded-full
                 flex items-center justify-center
                 text-center
                 before:absolute
                 before:inset-0
                 before:rounded-full
                 before:p-[2px]
                 before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                 before:opacity-30
                 before:-z-10
                 relative
                 " onMouseEnter={() => setStrawberryMilk("/decor/strawberrymilk/1.png")}>
                    Returning Embedded Software Engineer Intern at NVIDIA
                  </div>
                  <div className="text-sm lg:text-base font-[subheading-font] hover:text-lg hover:scale-105 transition-all duration-300  text-left lg:justify-start
                 bg-white/10 
                 p-3
                 w-full
                 hover:bg-[#ecf8e0]/30
                 backdrop-blur-sm
                 border-1
                 border-white/70
                 backdrop-saturate-400
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                 duration-300 
                 ease-out
                 transition-all 
                 rounded-full
                 flex items-center justify-center
                 text-center
                 before:absolute
                 before:inset-0
                 before:rounded-full
                 before:p-[2px]
                 before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                 before:opacity-30
                 before:-z-10
                 relative
                 " onMouseEnter={() => setStrawberryMilk("/decor/strawberrymilk/2.png")}>
                    Current Software Engineer Intern at BNY
                  </div>
                  <div className="text-sm lg:text-base font-[subheading-font] hover:text-lg hover:scale-105 transition-all duration-300  text-left lg:justify-start
                 bg-white/10 
                 p-3
                 w-full
                 hover:bg-[#ecf8e0]/30
                 backdrop-blur-sm
                 border-1
                 border-white/70
                 backdrop-saturate-400
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                 duration-300 
                 ease-out
                 transition-all 
                 rounded-full
                 flex items-center justify-center
                 text-center
                 before:absolute
                 before:inset-0
                 before:rounded-full
                 before:p-[2px]
                 before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                 before:opacity-30
                 before:-z-10
                 relative
                 " onMouseEnter={() => setStrawberryMilk("/decor/strawberrymilk/3.png")}>
                   Hackathon Lead at Knight Hacks
                  </div>
                  <div className="text-sm lg:text-base font-[subheading-font]  hover:text-lg hover:scale-105 transition-all duration-300  text-left lg:justify-start
                 bg-white/10 
                 p-3
                 w-full
                 hover:bg-[#ecf8e0]/30
                 backdrop-blur-sm
                 border-1
                 border-white/70
                 backdrop-saturate-400
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                 duration-300 
                 ease-out
                 transition-all 
                 rounded-full
                 flex items-center justify-center
                 text-center
                 before:absolute
                 before:inset-0
                 before:rounded-full
                 before:p-[2px]
                 before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                 before:opacity-30
                 before:-z-10
                 relative
                 " onMouseEnter={() => setStrawberryMilk("/decor/strawberrymilk/4.png")}>
                    Software Chair at IEEE
                  </div>
                  <div className="text-sm lg:text-base font-[subheading-font]  hover:text-lg hover:scale-105 transition-all duration-300  text-left lg:justify-start
                 bg-white/10 
                 p-3
                 w-full
                 hover:bg-[#ecf8e0]/30
                 backdrop-blur-sm
                 border-1
                 border-white/70
                 backdrop-saturate-400
                 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
                 hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                 duration-300 
                 ease-out
                 transition-all 
                 rounded-full
                 flex items-center justify-center
                 text-center
                 before:absolute
                 before:inset-0
                 before:rounded-full
                 before:p-[2px]
                 before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
                 before:opacity-30
                 before:-z-10
                 relative
                 " onMouseEnter={() => setStrawberryMilk("/decor/strawberrymilk/5.png")}>
                    7x Hackathon Winner
                </div>
               
                  
                </div>

               

              </div>

       
              <div className=" flex flex-row justify-between bottom-0 left-0 -mb-[180px] ">
                    <Image
                      className="object-fill place-self-end -translate-y-120 z-100 -translate-x-35 hover:scale-110 transition-all duration-300"
                      src="/iconography/heartleft.png"
                      alt="pouring coffee"
                      width={200}
                      height={200}
                    />
                    <Image
                      className="object-fill place-self-end -translate-y-60 z-100 translate-x-25 hover:scale-110 transition-all duration-300"
                      src="/iconography/heartright.png"
                      alt="pouring coffee"
                      width={150}
                      height={150}
                    />
                 
              </div>  
               

              </div>

              <div className="w-full my-20
                bg-[#ff687e]/80
                  hover:bg-[#ff687e]/50
                  backdrop-blur-sm
                  border
                  border-white/90
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

               <div className="bg-[#ff687e]  rounded-t-4xl">
              <Image
                  className="object-cover rounded-t-4xl h-70  opacity-80 w-full"
                  src="/home/recentevents.jpg"
                  alt=""
                  width={1000}
                  height={1000}
               />
                  </div>
               <div className="-translate-y-20 text-white font-[display-font] tracking-wide text-4xl hover:text-5xl lg:text-5xl duration-300 transition-all text-center lg:hover:text-6xl">
                    RECENT EVENTS
              </div>

              <div className="hidden lg:flex flex-row h-130 pr-10 pl-10 pb-10 gap-5 w-full">
                <div className="w-2/3 bg-white/20 border-1 border-white/40 rounded-3xl">
                  <div className="bg-[#ff687e] rounded-t-3xl h-1/2 border-white">
                    <Image
                      className="object-cover h-full rounded-t-3xl opacity-80"
                      src={currentEvent?.photoUrl ?? "/iconography/kaisprungericon.png"}
                      alt=""
                      width={2000}
                      height={2000}
                    />
                  </div>
                  <div className="p-2">
                    <div className="font-[subheading-font] text-white text-2xl hover:text-3xl transition-all duration-300">{currentEvent?.headline}</div>
                    <div className="font-[body-font] text-white/80 text-lg">{currentEvent?.date} in {currentEvent?.location}</div>
                    <div className="font-[body-font] text-white text-base">{currentEvent?.description}</div>
                  </div>
                </div>
                <div className="flex flex-col w-1/3 overflow-y-scroll overflow-x-hidden">
                  <div className="text-white font-[subheading-font] text-2xl hover:text-3xl transition-all duration-300">HIGHLIGHTS</div>
                  {Events?.map((item, index) => (
                    <div key={index} onClick={() => handleEventSelect(item)}>
                      <div className="p-2 flex flex-row gap-3 hover:scale-105 transition-all duration-300 cursor-pointer">
                        <div className="bg-[#ff687e] rounded-lg w-1/4 border-white">
                          <Image
                            className="object-cover h-full w-full rounded-lg opacity-80"
                            src={item.photoUrl}
                            alt=""
                            width={2000}
                            height={2000}
                          />
                        </div>
                        <div className="text-left flex flex-col w-3/4">
                          <div className="font-[subheading-font] text-base text-white">{item.headline}</div>
                          <div className="font-[body-font] text-white/80 text-sm">{item.location}</div>
                          <div className="font-[body-font] text-white/80 text-sm">{item.date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex lg:hidden flex-col px-4 pb-10 gap-4">

                <div className="w-full bg-white/20 border-1 border-white/40 rounded-3xl overflow-hidden">
                  <div className="bg-[#ff687e] rounded-t-3xl h-48 w-full">
                    <Image
                      className="object-cover h-full w-full rounded-t-3xl opacity-80"
                      src={currentEvent?.photoUrl ?? "/iconography/kaisprungericon.png"}
                      alt=""
                      width={2000}
                      height={2000}
                    />
                  </div>
                  <div className="p-3">
                    <div className="font-[subheading-font] text-white text-xl">{currentEvent?.headline}</div>
                    <div className="font-[body-font] text-white/80 text-sm">{currentEvent?.date} in {currentEvent?.location}</div>
                    <div className="font-[body-font] text-white text-sm mt-1">{currentEvent?.description}</div>
                  </div>
                </div>

                <div className="text-white font-[subheading-font] text-xl">HIGHLIGHTS</div>
                <div className="flex flex-row gap-3 overflow-x-auto pb-2">
                  {Events?.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleEventSelect(item)}
                      className="flex-shrink-0 w-40 bg-white/20 border-1 border-white/40 rounded-2xl overflow-hidden cursor-pointer hover:scale-105 transition-all duration-300"
                    >
                      <div className="bg-[#ff687e] h-24 w-full">
                        <Image
                          className="object-cover h-full w-full opacity-80"
                          src={item.photoUrl}
                          alt=""
                          width={400}
                          height={400}
                        />
                      </div>
                      <div className="p-2">
                        <div className="font-[subheading-font] text-white text-xs leading-snug line-clamp-2">{item.headline}</div>
                        <div className="font-[body-font] text-white/70 text-xs mt-0.5">{item.date}</div>
                        <div className="font-[body-font] text-white/70 text-xs">{item.location}</div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              </div>
              <div className="pb-10">
                <Footer ></Footer>

              </div>


            </div>
            


              

          </div>

      
          
        </div>



      
      </div>
  );
}