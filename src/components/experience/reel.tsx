"use client";

import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { trpc } from "@/trpc/client";
import { Heart, Volume2, VolumeX, Pause, Play, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import Image from "next/image";

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

const glassButton = [
    "relative flex items-center justify-center",
    "bg-white/10 hover:bg-white/30",
    "backdrop-blur-sm backdrop-saturate-400",
    "border border-white/70",
    "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_0_rgba(0,0,0,0.25)]",
    "rounded-full p-2.5",
    "transition-all duration-300 ease-out hover:scale-[1.18] active:scale-95",
    "cursor-pointer text-white",
    "before:absolute before:inset-0 before:rounded-full before:p-[2px]",
    "before:bg-[linear-gradient(to_right,white,transparent_25%,transparent_75%,white),linear-gradient(to_bottom,white,transparent_25%,transparent_75%,white)]",
    "before:opacity-30 before:-z-10",
].join(" ");

const Reel: React.FC = () => {
    const { data: experiences } = trpc.experiences.getAllExperiences.useQuery();
    const { data: experienceVideos } = trpc.experiences.getAllExperienceVideos.useQuery();
    const likeMutation = trpc.experiences.likeExperience.useMutation();
    const unlikeMutation = trpc.experiences.unlikeExperience.useMutation();

    const experiencesWithVideos = useMemo(() => {
        if (!experiences || !experienceVideos) return [];
        return experiences
            .map((exp) => {
                const firstVideo = experienceVideos.find((v) => v.experienceId === exp.id);
                if (!firstVideo) return null;
                return { ...exp, videoUrl: firstVideo.videoUrl } as ExperienceWithVideo;
            })
            .filter((item): item is ExperienceWithVideo => item !== null);
    }, [experiences, experienceVideos]);

    const [curReelIndex, setCurReelIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isPaused, setIsPaused] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
    const [localLikes, setLocalLikes] = useState<Record<string, number>>({});
    const videoRef = useRef<HTMLVideoElement>(null);

    const touchStartX = useRef<number>(0);
    const touchStartY = useRef<number>(0);
    const SWIPE_THRESHOLD = 50;

    useEffect(() => {
        try {
            const stored = sessionStorage.getItem("likedExperiences");
            if (stored) setLikedIds(new Set(JSON.parse(stored) as string[]));
        } catch {}
    }, []);

    useEffect(() => {
        if (!experiencesWithVideos.length) return;
        setLocalLikes((prev) => {
            const merged: Record<string, number> = {};
            experiencesWithVideos.forEach((e) => { merged[e.id] = e.numberLikes; });
            Object.keys(prev).forEach((k) => { merged[k] = prev[k] ?? 0; });
            return merged;
        });
    }, [experiencesWithVideos]);

    const goToNext = useCallback(() => {
        setShowMore(false);
        setIsPaused(false);
        setCurReelIndex((i) => (i + 1) % Math.max(experiencesWithVideos.length, 1));
    }, [experiencesWithVideos.length]);

    const goTo = (i: number) => {
        setCurReelIndex(i);
        setShowMore(false);
        setIsPaused(false);
    };

    const togglePause = () => {
        if (!videoRef.current) return;
        if (isPaused) { void videoRef.current.play(); setIsPaused(false); }
        else { videoRef.current.pause(); setIsPaused(true); }
    };

    const onVideoTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        if (!touch) return;
        touchStartX.current = touch.clientX;
        touchStartY.current = touch.clientY;
    };

    const onVideoTouchEnd = (e: React.TouchEvent) => {
        const touch = e.changedTouches[0];
        if (!touch) return;
        const dx = touch.clientX - touchStartX.current;
        const dy = touch.clientY - touchStartY.current;
        if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
            togglePause();
        } else {
            goToNext();
        }
    };

    const onVideoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        togglePause();
    };

    const handleLike = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        if (likedIds.has(id)) {
            const newLiked = new Set(likedIds);
            newLiked.delete(id);
            setLikedIds(newLiked);
            try { sessionStorage.setItem("likedExperiences", JSON.stringify([...newLiked])); } catch {}
            setLocalLikes((prev) => ({ ...prev, [id]: Math.max((prev[id] ?? 1) - 1, 0) }));
            unlikeMutation.mutate({ id });
        } else {
            const newLiked = new Set(likedIds);
            newLiked.add(id);
            setLikedIds(newLiked);
            try { sessionStorage.setItem("likedExperiences", JSON.stringify([...newLiked])); } catch {}
            setLocalLikes((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
            likeMutation.mutate({ id });
        }
    };

    const current = experiencesWithVideos[curReelIndex];
    const liked = current ? likedIds.has(current.id) : false;
    const likeCount = current ? (localLikes[current.id] ?? current.numberLikes) : 0;

    const responsibilityLines = current?.responsibilities
        ? current.responsibilities
            .split(/[•]/g)
            .map((s) => s.trim())
            .filter(Boolean)
        : [];

    if (!current) return null;

    return (
        <div className="w-full
            bg-[#ff687e]/80
            hover:bg-[#ff687e]/50
            backdrop-blur-sm
            border border-white/90
            backdrop-saturate-400
            shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]
            hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
            duration-300
            ease-out
            transition-all
            rounded-4xl
            before:absolute before:inset-0 before:rounded-4xl
            before:bg-[linear-gradient(to_right,white,transparent_20%,transparent_80%,white),linear-gradient(to_bottom,white,transparent_20%,transparent_80%,white)]
            before:opacity-70 before:-z-10
        ">
            <div className="bg-[#ff687e] rounded-t-4xl">
                <Image
                    className="object-cover rounded-t-4xl h-70 opacity-80 w-full"
                    src="/experiences/photos/header2.png"
                    alt=""
                    width={1000}
                    height={1000}
                />
            </div>

            <div className="-translate-y-20 text-white font-[display-font] tracking-wide text-4xl hover:text-5xl lg:text-5xl duration-300 transition-all text-center lg:hover:text-6xl">
                CAREER EXPERIENCES
            </div>

            <div className="px-5 md:px-7 pb-7 ">
                <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-stretch w-full">

                    <div className="relative flex-shrink-0 flex justify-center">
                        <div className="relative">
                            <video
                                ref={videoRef}
                                key={current.id}
                                autoPlay
                                loop
                                muted={isMuted}
                                playsInline
                                controls={false}
                                onClick={onVideoClick}
                                onTouchStart={onVideoTouchStart}
                                onTouchEnd={onVideoTouchEnd}
                                className="border border-white opacity-80 object-cover rounded-3xl cursor-pointer block"
                                style={{
                                    height: "65vh",
                                    width: "auto",
                                    maxWidth: "min(340px, calc(100vw - 3rem))",
                                }}
                                src={current.videoUrl}
                            />

                            {isPaused && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/30 pointer-events-none">
                                    <Pause className="text-white w-14 h-14 opacity-80" />
                                </div>
                            )}

                            <div className="absolute bottom-4 right-3 flex flex-col items-center gap-3 z-10">
                                <button
                                    type="button"
                                    className={glassButton}
                                    onClick={(e) => { e.stopPropagation(); setIsMuted((m) => !m); }}
                                >
                                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                </button>

                                <div className="flex flex-col items-center gap-0.5">
                                    <button
                                        type="button"
                                        className={`${glassButton} ${liked ? "!bg-red-400/50 !border-red-300/70" : ""}`}
                                        onClick={(e) => handleLike(e, current.id)}
                                    >
                                        <Heart className={`w-5 h-5 transition-all ${liked ? "fill-white text-white" : "text-white"}`} />
                                    </button>
                                    <span className="text-white text-xs font-[body-font] drop-shadow">{likeCount}</span>
                                </div>

                                <button
                                    type="button"
                                    className={glassButton}
                                    onClick={(e) => { e.stopPropagation(); togglePause(); }}
                                >
                                    {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="absolute bottom-4 left-3 md:hidden z-10">
                                <button
                                    type="button"
                                    className={`${glassButton} !rounded-full !px-3 !py-1.5 gap-1 flex-row text-sm font-[subheading-font]`}
                                    onClick={(e) => { e.stopPropagation(); setShowMore((s) => !s); }}
                                >
                                    <span>{showMore ? "less" : "more"}</span>
                                    {showMore ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
                                </button>
                            </div>

                            <div
                                className={`absolute bottom-14 left-2 right-2 md:hidden z-20
                                    bg-white/10 backdrop-blur-md backdrop-saturate-400
                                    border border-white/60
                                    shadow-[0_8px_32px_0_rgba(0,0,0,0.18)]
                                    rounded-2xl p-4 text-white
                                    before:absolute before:inset-0 before:rounded-2xl
                                    before:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.15),transparent)]
                                    before:pointer-events-none before:-z-10
                                    transition-all duration-500 ease-out
                                    ${showMore ? 'scale-100 opacity-100' : 'scale-75 opacity-0 pointer-events-none'}
                                `}
                                style={{ transformOrigin: 'bottom center' }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <p className="font-[subheading-font] text-base hover:text-lg transition-all duration-300 leading-tight">{current.name}</p>
                                <p className="font-[subheading-font] text-sm hover:text-base transition-all duration-300 text-white/70 mb-2">{current.company} · {current.dateRange}</p>
                                {responsibilityLines.length > 0 && (
                                    <div>
                                        <p className="font-[subheading-font] text-xs uppercase tracking-widest text-white/50 mb-1">Responsibilities</p>
                                        <ul className="space-y-1">
                                            {responsibilityLines.map((line, i) => (
                                                <li key={i} className="font-[body-font] text-xs hover:text-sm transition-all duration-300 flex gap-2">
                                                    <span className="text-white/50 flex-shrink-0">•</span>
                                                    <span>{line}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col justify-between gap-4 text-white flex-1 min-w-0 py-2">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p className="font-[heading-font]  text-2xl lg:text-3xl hover:text-3xl lg:hover:text-4xl transition-all duration-300 leading-tight">{current.name}</p>
                                <p className=" font-[heading-font] text- text-xl hover:text-2xl transition-all duration-300  mt-1">{current.company}</p>
                                <p className="font-[body-font] text-lg hover:text-2xl transition-all duration-300  mt-0.5">
                                    {current.dateRange}{current.location ? ` · ${current.location}` : ""}
                                </p>
                            </div>

                            {responsibilityLines.length > 0 && (
                                <div>
                                    <p className="font-[subheading-font] text-xs hover:text-base duration-300 transition-all uppercase tracking-widest  mb-2">Responsibilities</p>
                                    <ul className="space-y-2">
                                        {responsibilityLines.map((line, i) => (
                                            <li key={i} className="font-[body-font] text-sm hover:text-base transition-all duration-300 flex gap-2 ">
                                                <span className="text-white/40 flex-shrink-0 mt-0.5">•</span>
                                                <span>{line}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <div className="flex gap-2">
                                {experiencesWithVideos.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => goTo(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === curReelIndex ? "bg-white scale-125" : "bg-white/30 hover:bg-white/60"}`}
                                    />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                                className={`${glassButton} !px-4 !py-2 gap-2 flex-row font-[subheading-font] text-sm ml-2`}
                            >
                                <span>next</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex md:hidden justify-center items-center gap-3 mt-4">
                    <div className="flex gap-2">
                        {experiencesWithVideos.map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => goTo(i)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === curReelIndex ? "bg-white scale-125" : "bg-white/30"}`}
                            />
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); goToNext(); }}
                        className={`${glassButton} !px-4 !py-2 gap-2 flex-row font-[subheading-font] text-sm`}
                    >
                        <span>next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { Reel };