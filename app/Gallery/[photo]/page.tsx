"use client";

import { Photograph, Year } from "@/app/hooks/apicall";
import { useReveal } from "@/app/hooks/useReveal";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, } from "lucide-react";
import Link from "next/link";

const apiKey = process.env.NEXT_PUBLIC_KEY;

const API_TOKEN =
    apiKey;

const AUTH_HEADERS = { Authorization: `Bearer ${API_TOKEN}` };
const BACKEND_URL = "https://alexandraboutreachsite-backend-production.up.railway.app";


export default function Gallery() {
    const { photo } = useParams();
    const [photography, setPhotography] = useState<Photograph[]>([]);
    const [year, setYear] = useState<string>();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const imageRef = useReveal();



    useEffect(() => {
        if (!photo) return;

        async function populateInfo() {
            try {
                // 1. Fetch the /parent
                const yearRes = await axios.get(
                    `${BACKEND_URL}/api/years/${photo}?populate=*`,
                    { headers: AUTH_HEADERS }
                );
                const parent = yearRes.data.data as Year;
                setYear(parent.Year.toString());

                // 2. Get photography document IDs
                const ids = parent.photographies.map((p) => p.documentId);

                // 3. Fetch all photos in parallel
                const results = await Promise.all(
                    ids.map((id) =>
                        axios
                            .get(
                                `${BACKEND_URL}/api/photographies?filters[documentId][$eq]=${id}&populate=*`,
                                { headers: AUTH_HEADERS }
                            )
                            .then((r) => r.data.data[0] as Photograph)
                            .catch(() => null)
                    )
                );
                console.log("results", results)

                setPhotography(results.filter(Boolean) as Photograph[]);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        populateInfo();
        console.log(year)
    }, [photo]);

    function navigate(direction: "left" | "right") {
        if (isAnimating || photography.length === 0) return;
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 400);

        setActiveIndex((prev) => {
            if (direction === "right") return (prev + 1) % photography.length;
            return (prev - 1 + photography.length) % photography.length;
        });
    }

    // Compute visible indices: show up to 5 items centered on activeIndex
    console.log(photography)
    const visibleCount = Math.min(5, photography.length);
    const visibleItems = Array.from({ length: visibleCount }, (_, i) => {
        const offset = i - Math.floor(visibleCount / 2);
        const index = (activeIndex + offset + photography.length) % photography.length; //movement + current position + fix for negatives % binding 
        return { item: photography[index], offset };
    });

    return (
        <div
            className="w-full min-h-[100dvh] overflow-hidden bg-[#f5f3ef]  font-glacial italic"

        >
            <Navbar />

            {/* Header */}
            <header className="w-full px-16 pt-16 pb-8 flex items-end justify-between border-b border-stone-200">
                <div>
                    <p
                        className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-2"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                        Collection
                    </p>
                    <h1
                        className="text-7xl font-light text-stone-800 italic leading-none"
                        style={{ letterSpacing: "-0.02em" }}
                    >
                        {isLoading ? "—" : year}
                    </h1>
                </div>
                <p
                    className="text-sm text-stone-400 tracking-widest uppercase pb-2"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                >
                    {photography.length > 0 && `${activeIndex + 1} / ${photography.length}`}
                </p>
            </header>

            {/* Gallery Stage */}
            <main className="relative w-full" style={{ height: "calc(100dvh - 260px)" }}>
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex gap-2">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-1.5 h-1.5 rounded-full bg-stone-400"
                                    style={{
                                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div
                        ref={imageRef}
                        className="flex items-center justify-center h-full gap-6 px-20"
                    >
                        {visibleItems.map(({ item, offset }, i) => {
                            const isCenter = offset === 0;
                            const absOffset = Math.abs(offset);
                            const scale = isCenter ? 1 : 1 - absOffset * 0.1;
                            const opacity = isCenter ? 1 : 1 - absOffset * 0.25;
                            const zIndex = visibleCount - absOffset;

                            return (
                                isCenter ? <Link
                                    href={`/Photography/${item.documentId}`}
                                    key={item?.documentId ?? i}
                                    className="relative flex-shrink-0 cursor-pointer group"
                                    style={{
                                        transform: `scale(${scale})`,
                                        opacity,
                                        zIndex,
                                        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                        width: isCenter ? "32%" : `${28 - absOffset * 4}%`,
                                    }}
                                    onClick={() => !isCenter && navigate(offset > 0 ? "right" : "left")}
                                >
                                    {/* Image container */}
                                    <div
                                        className="w-full overflow-hidden bg-stone-100"
                                        style={{
                                            aspectRatio: "3/4",
                                            boxShadow: isCenter
                                                ? "0 25px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)"
                                                : "0 8px 24px rgba(0,0,0,0.08)",
                                        }}
                                    >
                                        {item?.Photos?.[1] && (
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                src={BACKEND_URL + item.Photos[1].url}
                                                alt={item.Photos[1].alternativeText ?? item.Title}
                                            />
                                        )}
                                    </div>

                                    {/* Caption — only on center */}
                                    {isCenter && (
                                        <div className="mt-4 text-center">
                                            <p
                                                className="text-sm tracking-[0.15em] uppercase text-stone-500"
                                                style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem" }}
                                            >
                                                {item?.Title}
                                            </p>
                                        </div>
                                    )}
                                </Link>
                                    :
                                    <div
                                        key={item?.documentId ?? i}
                                        className="relative flex-shrink-0 cursor-pointer group"
                                        style={{
                                            transform: `scale(${scale})`,
                                            opacity,
                                            zIndex,
                                            transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                                            width: isCenter ? "32%" : `${28 - absOffset * 4}%`,
                                        }}
                                        onClick={() => !isCenter && navigate(offset > 0 ? "right" : "left")}
                                    >
                                        {/* Image container */}
                                        <div
                                            className="w-full overflow-hidden bg-stone-100"
                                            style={{
                                                aspectRatio: "3/4",
                                                boxShadow: isCenter
                                                    ? "0 25px 60px rgba(0,0,0,0.15), 0 8px 20px rgba(0,0,0,0.08)"
                                                    : "0 8px 24px rgba(0,0,0,0.08)",
                                            }}
                                        >
                                            {item?.Photos?.[1] && (
                                                <img
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    src={BACKEND_URL + item.Photos[1].url}
                                                    alt={item.Photos[1].alternativeText ?? item.Title}
                                                />
                                            )}
                                        </div>

                                        {/* Caption — only on center */}
                                        {isCenter && (
                                            <div className="mt-4 text-center">
                                                <p
                                                    className="text-sm tracking-[0.15em] uppercase text-stone-500"
                                                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem" }}
                                                >
                                                    {item?.Title}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                            );
                        })}
                    </div>
                )}
            </main>

            {/* Navigation */}
            <footer className="flex items-center justify-center gap-8 py-10">
                {/* Prev */}
                <button
                    onClick={() => navigate("left")}
                    disabled={isLoading || photography.length === 0}
                    className="flex items-center gap-2 px-6 py-3 text-stone-500 hover:text-stone-900 transition-colors duration-200 disabled:opacity-30 group"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                    <ChevronLeft
                        size={16}
                        className="transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    <span className="uppercase tracking-widest">Prev</span>
                </button>

                {/* Dot indicators */}
                <div className="flex gap-2 items-center">
                    {photography.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="transition-all duration-300"
                            style={{
                                width: i === activeIndex ? "24px" : "6px",
                                height: "6px",
                                borderRadius: "3px",
                                background: i === activeIndex ? "#44403c" : "#d6d3d1",
                            }}
                        />
                    ))}
                </div>

                {/* Next */}
                <button
                    onClick={() => navigate("right")}
                    disabled={isLoading || photography.length === 0}
                    className="flex items-center gap-2 px-6 py-3 text-stone-500 hover:text-stone-900 transition-colors duration-200 disabled:opacity-30 group"
                    style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.15em" }}
                >
                    <span className="uppercase tracking-widest">Next</span>
                    <ChevronRight
                        size={16}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                </button>
            </footer>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
}