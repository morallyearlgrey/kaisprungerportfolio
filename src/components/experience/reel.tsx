import React from "react"
import ReactDOM from "react-dom"
import {Swipe} from "react-swipe-component"
import { useState, useEffect, useRef, useMemo } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/router";
import { trpc } from "@/trpc/client";

interface Experience {
    id: string;
    name: string;
    company: string;
    dateRange: string;
    location: string | null;
    description: string | null;
    responsibilities: string | null;
    numberLikes: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ExperienceWithVideo extends Experience {
    videoUrl: string;
}


const Reel: React.FC = () => {
    const { data: experiences } = trpc.experiences.getAllExperiences.useQuery();
    const { data: experienceVideos } = trpc.experiences.getAllExperienceVideos.useQuery();

    const experiencesWithVideos = useMemo(() => {
        if (!experiences || !experienceVideos) return [];

        return experiences
            .map((exp) => {
                const firstVideo = experienceVideos.find(
                    (video) => video.experienceId === exp.id
                );

                if (!firstVideo) return null;

                return {
                    ...exp,
                    videoUrl: firstVideo.videoUrl,
                } as ExperienceWithVideo;
            })
            .filter((item): item is ExperienceWithVideo => item !== null);
    }, [experiences, experienceVideos]);


    
    const [curReelIndex, setCurReelIndex] = useState<number>(0);

    // const reelArr: string[] = ["/experiences/reels/testmp4-1.mp4", "/experiences/reels/testmp4-2.mp4"];
    

    const onSwipeEnd = () => {
        setCurReelIndex((curReelIndex+1)%experiencesWithVideos.length);
    }
  
    const onSwipeUpListener = () => {
        console.log("Swiped Up")
    }
 
    return (

        <Swipe
            nodeName="div"
            className="w-full h-screen "
            onSwipeEnd={onSwipeEnd}
            onSwipedUp={onSwipeUpListener}
        >
            <div className="flex flex-col place-self-center md:place-self-start  gap-3">

                <div className="text-center md:text-left p-5">
                    <div className="font-[display-font] text-white text-5xl hover:text-6xl transition-all duration-300">{experiencesWithVideos[curReelIndex]?.name}</div>
                    <div className="font-[display-font] text-white text-3xl hover:text-4xl transition-all duration-300">{experiencesWithVideos[curReelIndex]?.company}</div>
                </div>
                <video autoPlay loop playsInline controls={false} className="z-90 border-1 border-white object-cover rounded-3xl place-self-center h-3/4 w-5/6" src={experiencesWithVideos[curReelIndex]?.videoUrl}>
                </video>

                
           
            </div>
        </Swipe>

    );
    
};



export { Reel };
