import React, { useState, useRef, useEffect } from 'react'
import { Music, Pause, SkipForward } from "lucide-react";
import { trpc } from "@/trpc/client";

export const MusicPlayer = (() => {
    const { data: Songs } = trpc.music.getAllSongs.useQuery();
    
    const [trackIndex, setTrackIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(()=> {
        if (audioRef.current && Songs?.[trackIndex]) {
            audioRef.current.src = Songs[trackIndex].url;
            if(isPlaying) {
                audioRef.current.play();
            }
        }

    }, [trackIndex, Songs]);

    const toggle = () => {
        if(audioRef.current) {
            if(isPlaying) {
                setIsPlaying(false);
                audioRef.current.pause();

            } else {
                if(audioRef.current.src) {
                    setIsPlaying(true);
                    audioRef.current.play();

                }
               
            }

        }

    };

    const skip = () => {
        if(Songs && audioRef.current) {
            setTrackIndex((trackIndex+1)%Songs.length);
            setIsPlaying(true); 
            audioRef.current.play();

        }
       
    }

    const handleEnded = () => {
        skip();
    }

    return (
        <div 
        className="
        p-3
        rounded-full 
        z-100
        my-5 
        flex 
        flex-row 
        justify-between
        gap-2 
        bg-white/10
        hover:bg-[#ecf8e0]/30
        backdrop-blur-sm
        border-1
        border-white
        backdrop-saturate-200
        shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
        hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
        duration-300 
        ease-out
        transition-all 
        rounded-full
        before:absolute
        before:inset-0
        before:rounded-full
        before:p-[2px]
        before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
        before:opacity-60
        before:-z-10

        ">
            <audio ref={audioRef} onEnded={handleEnded} />
            <div className="flex flex-row gap-3">
            <div className="
            w-fit 
            h-fit
            self-center
            p-2
            bg-[#a0d963]/80
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
            ">
                <Music className="text-[#eeffe7]"></Music>
            </div>

            {Songs &&
                <div className="self-center text-[#eeffe7] font-[subheading-font] lg:text-xl text-sm">{Songs[trackIndex]?.songName.toUpperCase()} by {Songs[trackIndex]?.artistName.toUpperCase()} playing...</div>
            }
            </div>

            <div className="flex flex-row gap-3">
            <div className="
            w-fit 
            h-fit
            self-center
            p-2
            bg-[#a0d963]/80
            hover:bg-[#a0d963]/40
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
            before:p-[2px]
            before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
            before:opacity-50
            before:-z-10
            hover:scale-115
            cursor-pointer
            " onClick={() => toggle()}>
                <Pause className="text-[#eeffe7] "></Pause>
            </div>
            
            <div className="
            w-fit 
            h-fit
            self-center
            p-2
            bg-[#a0d963]/80
            hover:bg-[#a0d963]/40
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
            before:p-[2px]
            before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]
            before:opacity-50
            before:-z-10
            hover:scale-115
            cursor-pointer
            " onClick={() => skip()}>
                <SkipForward className="text-[#eeffe7]"></SkipForward>
            </div>
            </div>

        </div>


    )

});