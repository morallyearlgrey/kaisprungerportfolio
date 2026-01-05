"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

import { Navbar } from "../components/navbar";

import { RabbitIcon, Music, Pause, SkipForward } from "lucide-react";

import { useRouter } from "next/navigation";

import {useState, useEffect, useRef} from "react";

import { trpc } from "@/trpc/client";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


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

export default function Home() {
  const [trackIndex, setTrackIndex] = useState<Number>(0);
  const [isPlaying, setIsPlaying] = useState<Boolean>(false);
  const audioRef = useRef(null);

  const router = useRouter();
  const [artistName, setArtistName] = useState<String>("");
  const [songName, setSongName] = useState<String>("");

  const { data: Events } = trpc.events.getAllEvents.useQuery();

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  
  const handleEventSelect = (event: Event) => {
    setCurrentEvent(event);
  }


  useEffect(()=> {


  }, [])

  return (
      
      <div className="bg-black flex w-full flex-col max-w-screen ">
        <div className="relative w-full h-[120vh]">
          <div className="z-4 w-full h-fit inset-0 items-center px-5">
            <Navbar />
          </div>

          <div className="gap-10 grid px-10 max-w-full">

            <div className="z-100 p-10 flex-col gap-y-2 flex">
                <div className="text-[var(--beige)] font-[display-font] text-7xl">KAI SPRUNGER</div>
                <div className="typewriter text-4xl font-[subheading-font] max-w-fit text-white">SOFTWARE ENGINEER</div>
                <div className="text-white flex-wrap font-[body-font]">
                  Sophomore majoring in Computer Science at the University of Central Florida.
                </div>

                 <Button 
                  className="z-100 w-fit p-5 font-[subheading-font] bg-amber-400 hover:bg-amber-500 hover:scale-110 transition-all duration-200 cursor-pointer lg:translate-y-1/2" 
                  onClick={() => router.push("/about")}
                >
                  <span>LEARN ABOUT MY <i><s>CAFE</s></i> PORTFOLIO...</span>
                  <RabbitIcon />
                </Button>
             

              </div>

            <div className="absolute  left-1/2 -translate-x-1/2  w-full h-auto max-w-full pl-10 pr-10">
              <video autoPlay loop muted playsInline controls={false} className="opacity-50 object-cover rounded-3xl border-1 border-amber-300" src="/coffee/matcha.mp4">
              </video>
              
              <div className="p-5 rounded-3xl bg-amber-500 z-100 my-5 flex flex-row gap-2 ">
                <div className="bg-amber-700 w-fit p-2 rounded-lg ">
                  <Music className="text-white scale-120"></Music>
                </div>
                <div className="self-center">{songName} by {artistName} is playing...</div>
                <div className="bg-amber-700 w-fit p-2 rounded-lg ">
                  <Pause className="text-white scale-120"></Pause>
                </div>
                <div className="bg-amber-700 w-fit p-2 rounded-lg ">
                  <SkipForward className="text-white scale-120"></SkipForward>
                </div>

              </div>

              <div className="flex items-center gap-6">
                <div className="flex-grow h-px bg-amber-400"></div>

                <h2 className="text-white font-semibold tracking-wide">
                  ABOUT ME
                </h2>

                <div className="flex-grow h-px bg-amber-400"></div>
              </div>
              
              <div className="flex flex-row gap-5">
                <div className="w-1/3 bg-amber-300">
    {/* rotating coffee cup */}
                </div>
                <div className="flex flex-col text-white gap-3 w-full">
                  <div className="bg-amber-300">5+ hackathon wins</div>
                  <div className="bg-amber-300">Internships at NVIDIA and BNY</div>
                  <div className="bg-amber-300">Hackathon organizer at Knight Hacks</div>
                  <div className="bg-amber-300">Software Chair at IEEE</div>

                </div>

              </div>

              <div className="">
                <div className="text-blue-500 translate-y-70">killmyselfkillmyselfkillmyselfkillmyselfkillmyselfkillmyselfkillmyself</div>
                  <Image
                    className="object-fill"
                    src="/coffee/pouring.png"
                    alt="pouring coffee"
                    width={3000}
                    height={3000}
                  />
                <div className="text-blue-500 -translate-y-70 text-right">killmyselfkillmyselfkillmyselfkillmyselfkillmyselfkillmyselfkillmyself</div>

              </div>

               <div className="flex items-center gap-6">
                <div className="flex-grow h-px bg-amber-400"></div>

                <h2 className="font-semibold tracking-wide text-black">
                  RECENT EVENTS
                </h2>

                <div className="flex-grow h-px bg-amber-400"></div>
              </div>

              <div className="flex flex-row h-full">
                <div className="overflow-scroll w-1/3 bg-amber-400 flex flex-col">
                {Events?.map((item, index) => (
                  
                <Card className="w-full max-w-sm" onClick={()=> handleEventSelect(item)}>
                  <CardHeader>
                  {item.headline}
                  {item.location}
                  {item.date}
                  </CardHeader>
                  <CardContent>
                    <Image
                      className="object-cover"
                      src={item.photoUrl}
                      alt="pouring coffee"
                      width={2000}
                      height={2000}
                    />
                    {item.caption}
                    {item.description}
                  </CardContent>
                </Card>
              )

                )}
                </div>
                <div className="w-full bg-amber-400">
                 <Image
                    className="object-cover"
                    src={currentEvent?.photoUrl ? currentEvent.photoUrl : "/coffee/lofi-girl.jpeg" }
                    alt="pouring coffee"
                    width={2000}
                    height={2000}
                  />

                  <div className="">{currentEvent?.headline}</div>
                  <div className="">{currentEvent?.location}</div>
                  <div className="">{currentEvent?.date}</div>
                  <div className="">{currentEvent?.description}</div>

                </div>

              </div>


            </div>


            

              
           
            <div className="relative flex -translate-y-1/8">
              {/* <Image
                className="object-fill"
                src="/coffee/pouring.png"
                alt="pouring coffee"
                width={3000}
                height={3000}
              /> */}
            </div>

            <div className="flex flex-col -translate-y-180 pl-10 items-end flex-wrap w-full">
              <div className="text-blue-600">killmyselfkillmyselfkillmyselfkillmyselfkillmyselfkillmyselfkillmyself</div>
            </div>


          </div>
          
          <div className="flex flex-row w-full lg:pr-36 lg:pl-36 gap-x-10">
              <div className="w-1/3">
                
              </div>

          </div>

          
        </div>
      </div>
  );
}