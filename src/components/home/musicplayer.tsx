import React, { useState, useRef, useEffect } from 'react'
import { RabbitIcon, Music, Pause, SkipForward } from "lucide-react";
import { trpc } from "@/trpc/client";

export const MusicPlayer = (() => {
    const { data: Music } = trpc.music.getAllSongs.useQuery();
    
    const [trackIndex, setTrackIndex] = useState<Number>(0);
    const [isPlaying, setIsPlaying] = useState<Boolean>(false);
    const audioRef = useRef(null);

    return (
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

    )

});