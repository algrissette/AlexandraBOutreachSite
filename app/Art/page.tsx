"use client";

import Navbar from "@/components/navbar";
import { useEffect, useRef, useState } from "react";
import { api, Year } from "../hooks/apicall";
import axios from "axios";
import Link from "next/link";

// ── constants ─────────────────────────────────────────────────────────────────
const DOT_R = 5;
const CONN = 60;
const PAD = 12;

// ── FlipItem ─────────────────────────────────────────────────────────────────
function FlipItem({ children, animKey, delay = 0 }: {
    children: React.ReactNode;
    animKey: number;
    delay?: number;
}) {
    const [playing, setPlaying] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (animKey === 0) return;
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setPlaying(false);
            requestAnimationFrame(() => requestAnimationFrame(() => setPlaying(true)));
        }, delay);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [animKey]);

    return (
        <span className="inline-block" style={{ animation: playing ? "flipY 0.45s ease-in-out forwards" : "none" }}>
            {children}
        </span>
    );
}

// ── useWindowSize ─────────────────────────────────────────────────────────────
function useWindowSize() {
    const [size, setSize] = useState({ vw: 1280, vh: 800 });
    useEffect(() => {
        function measure() { setSize({ vw: window.innerWidth, vh: window.innerHeight }); }
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);
    return size;
}

// ── Photo circle ──────────────────────────────────────────────────────────────
function PhotoCircle({ src }: { src: string | undefined }) {
    return (
        <div className="w-25 h-25 rounded-full overflow-hidden bg-gray-200 border-2 border-black shrink-0">
            <img src={src} alt="" className="w-full h-full object-cover block" />
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Art() {
    type YearItem = {
        Year: number;
        Description: string;
        IMGArray: (string | undefined)[];
        href: string | undefined;
    };

    const sliderRef = useRef<HTMLDivElement>(null);
    const [sliderY, setSliderY] = useState(0);
    const [isSliding, setIsSliding] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const prevIndexRef = useRef(0);
    const { vw, vh } = useWindowSize();

    const [myArray, setMyArray] = useState<YearItem[]>([
        { Year: 2020, Description: "Loading...", IMGArray: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"], href: undefined },
        { Year: 2021, Description: "Loading...", IMGArray: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"], href: undefined },
        { Year: 2022, Description: "Loading...", IMGArray: ["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"], href: undefined },
    ]);

    async function getArray() {
        const res = await axios.get(
            "http://localhost:1337/api/years?populate=*",
            {
                headers: {
                    Authorization: "Bearer 9557e320422e1ab0b06d5b0e6d90bf6d6fb283a88f5b78d88fe00df3d8d4f5939d4813f6aa4ef1b1db5232ca92f5e9cb433c8fb8699b274680b67843588815d51d1718e5069fcd6891f40fde50dfdfd02cd7a351c47d4f5c77f833b7c4e364f80da9f7e77c240ac84fde2bfd1c034e467f818e33dc093aee598da41edaf26dea"
                }
            }
        );
        if (res.data.data) {
            const data = res.data.data as Year[];
            const array = data.map((item: Year) => ({
                Year: +item.Year,
                Description: item.Description,
                IMGArray: [item.thumbnail1?.url, item.thumbnail2?.url, item.thumnail3?.url],
                href: item.documentId,
            }));
            setMyArray(array.sort((a, b) => +a.Year - +b.Year));
        }
    }

    const START_YEAR = myArray[0].Year;
    const END_YEAR = new Date().getFullYear();

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }

    useEffect(() => {
        getArray();
        function onMove(e: MouseEvent) {
            if (!isSliding || !sliderRef.current) return;
            const rect = sliderRef.current.getBoundingClientRect();
            setSliderY(clamp(e.clientY - rect.top, 0, rect.height));
        }
        function onUp() { setIsSliding(false); }
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
        return () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };
    }, [isSliding]);

    const trackH = sliderRef.current?.getBoundingClientRect().height ?? 400;
    const currentYear = Math.round(START_YEAR + (sliderY / trackH) * (END_YEAR - START_YEAR));
    const lastValid = myArray.map((e, i) => (e.Year <= currentYear ? i : -1)).filter(i => i !== -1).at(-1) ?? 0;
    const displayIndex = clamp(lastValid, 0, myArray.length - 2);

    useEffect(() => {
        if (displayIndex !== prevIndexRef.current) {
            prevIndexRef.current = displayIndex;
            setAnimKey(k => k + 1);
        }
    }, [displayIndex]);

    const isMobile = vw < 1200;

    const spine = isMobile
        ? { x1: vw * 0.5, y1: vh * 0.15, x2: vw * 0.5, y2: vh * 0.85 }
        : { x1: vw * 0.05, y1: vh * 0.22, x2: vw * 0.90, y2: vh * 0.76 };

    const dot1 = { x: lerp(spine.x1, spine.x2, 0.35), y: lerp(spine.y1, spine.y2, 0.35) };
    const dot2 = { x: lerp(spine.x1, spine.x2, 0.65), y: lerp(spine.y1, spine.y2, 0.65) };

    // Available space calculations (still need to be dynamic)
    const dAvailLeft = dot1.x - CONN - PAD - vw * 0.50;
    const dAvailRight = vw * 0.95 - (dot2.x + CONN + PAD);
    const mAvailRight = vw - dot1.x - DOT_R - 10 - vw * 0.02;
    const mAvailLeft = dot2.x - DOT_R - 10 - vw * 0.02;

    const trackHeight = clamp(vh * 0.75, 200, 600);

    return (
        <div className="w-screen h-screen overflow-hidden relative bg-[#fff3dc]">
            <Navbar />

            {/* ── Archive title ── */}
            <div className="absolute top-[10%] right-[10%] flex flex-col items-center pointer-events-none z-10">
                <h1 className="font-glacial text-[50px] tracking-widest italic font-light text-black leading-normal whitespace-nowrap">
                    Archive
                </h1>
                <div className="w-full h-[10px] bg-[#BA85FF] opacity-25 skew-x-12 -mt-1" />
            </div>

            {/* ── SVG: spine + connectors + dots ── */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox={`0 0 ${vw} ${vh}`}
                preserveAspectRatio="none"
            >
                <line x1={spine.x1} y1={spine.y1} x2={spine.x2} y2={spine.y2} stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
                {!isMobile && <>
                    <line x1={dot1.x} y1={dot1.y} x2={dot1.x - CONN} y2={dot1.y} stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
                    <line x1={dot2.x} y1={dot2.y} x2={dot2.x + CONN} y2={dot2.y} stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
                </>}
                <circle cx={dot1.x} cy={dot1.y} r={DOT_R} fill="#342200" />
                <circle cx={dot2.x} cy={dot2.y} r={DOT_R} fill="#000" />
            </svg>

            {/* ══ DESKTOP ENTRIES ══ */}
            {!isMobile && <>
                {/* Entry 1 — left of dot1 */}
                <Link
                    href={`/Gallery/${myArray[displayIndex].href}`}
                    className="absolute flex flex-col items-center gap-20 hover:bg-black/10"
                    style={{
                        right: vw - dot1.x + CONN + PAD,
                        top: dot1.y,
                        transform: "translateY(-15%)",
                        maxWidth: dAvailLeft,
                    }}
                >
                    <div className="flex gap-5 shrink-0">
                        {myArray[displayIndex].IMGArray.map((src, i) => (
                            <FlipItem key={i} animKey={animKey} delay={120 + i * 55}>
                                <PhotoCircle src={src} />
                            </FlipItem>
                        ))}
                    </div>

                    <div className="text-right shrink min-w-0 flex flex-col">
                        <FlipItem animKey={animKey} delay={0}>
                            <span className="font-glacial text-8xl font-black text-black block leading-none">
                                {myArray[displayIndex].Year}
                            </span>
                        </FlipItem>
                        <FlipItem animKey={animKey} delay={60}>
                            <p className="font-glacial text-sm underline text-black/55 mt-1 leading-snug" style={{ maxWidth: dAvailLeft }}>
                                {myArray[displayIndex].Description}
                            </p>
                        </FlipItem>
                    </div>
                </Link>

                {/* Entry 2 — right of dot2 */}
                <Link
                    href={`/Gallery/${myArray[displayIndex + 1].href}`}
                    className="absolute flex flex-col items-center gap-10 right-25 hover:bg-black/10"
                    style={{
                        left: dot2.x + CONN + PAD,
                        top: dot2.y,
                        transform: "translateY(-85%)",
                        maxWidth: dAvailRight,
                    }}
                >
                    <div className="shrink min-w-0 flex flex-col">
                        <FlipItem animKey={animKey} delay={240}>
                            <span className="font-glacial text-8xl font-black text-black block leading-none">
                                {myArray[displayIndex + 1].Year}
                            </span>
                        </FlipItem>
                        <FlipItem animKey={animKey} delay={180}>
                            <p className="font-glacial max-w-[50%] text-md underline text-black/55 mt-1 leading-snug" style={{ maxWidth: dAvailRight }}>
                                {myArray[displayIndex + 1].Description}
                            </p>
                        </FlipItem>
                    </div>

                    <div className="flex gap-5 shrink-0">
                        {myArray[displayIndex + 1].IMGArray.map((src, i) => (
                            <FlipItem key={i} animKey={animKey} delay={i * 55}>
                                <PhotoCircle src={src} />
                            </FlipItem>
                        ))}
                    </div>
                </Link>
            </>}

            {/* ══ MOBILE ENTRIES ══ */}
            {isMobile && <>
                {/* Entry 1 — right of spine */}
                <Link
                    href={`/Gallery/${myArray[displayIndex].href}`}
                    className="absolute flex flex-col gap-1 hover:bg-black/10"
                    style={{
                        left: dot1.x + DOT_R + 10,
                        top: dot1.y,
                        transform: "translateY(-50%)",
                        maxWidth: mAvailRight,
                    }}
                >
                    <FlipItem animKey={animKey} delay={0}>
                        <span className="font-glacial text-2xl font-black text-black leading-none">
                            {myArray[displayIndex].Year}
                        </span>
                    </FlipItem>
                    <div className="flex gap-2">
                        {myArray[displayIndex].IMGArray.map((src, i) => (
                            <FlipItem key={i} animKey={animKey} delay={60 + i * 45}>
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border-2 border-black">
                                    <img src={src} alt="" className="w-full h-full object-cover block" />
                                </div>
                            </FlipItem>
                        ))}
                    </div>
                    <FlipItem animKey={animKey} delay={120}>
                        <p className="font-glacial text-xs underline text-black/55 leading-snug">
                            {myArray[displayIndex].Description}
                        </p>
                    </FlipItem>
                </Link>

                {/* Entry 2 — left of spine */}
                <Link
                    href={`/Gallery/${myArray[displayIndex + 1].href}`}
                    className="absolute flex flex-col items-end gap-1 hover:bg-black/10"
                    style={{
                        right: vw - dot2.x + DOT_R + 10,
                        top: dot2.y,
                        transform: "translateY(-50%)",
                        maxWidth: mAvailLeft,
                    }}
                >
                    <FlipItem animKey={animKey} delay={0}>
                        <span className="font-glacial text-2xl font-black text-black leading-none">
                            {myArray[displayIndex + 1].Year}
                        </span>
                    </FlipItem>
                    <div className="flex gap-2">
                        {myArray[displayIndex + 1].IMGArray.map((src, i) => (
                            <FlipItem key={i} animKey={animKey} delay={60 + i * 45}>
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 border-2 border-black">
                                    <img src={src} alt="" className="w-full h-full object-cover block" />
                                </div>
                            </FlipItem>
                        ))}
                    </div>
                    <FlipItem animKey={animKey} delay={120}>
                        <p className="font-glacial text-xs underline text-black/55 leading-snug text-right">
                            {myArray[displayIndex + 1].Description}
                        </p>
                    </FlipItem>
                </Link>
            </>}

            {/* ── Slider ── */}
            <div className="absolute right-[4%] top-[55%] -translate-y-1/2 flex flex-col items-center gap-2 select-none">
                <span className="font-glacial text-[0.65rem] tracking-widest text-black/35">
                    {START_YEAR}
                </span>

                <div className="relative flex justify-center">
                    {/* Track */}
                    <div
                        ref={sliderRef}
                        className="w-[10px] rounded-sm bg-gradient-to-b from-black/10 to-black/5"
                        style={{ height: trackHeight }}
                    />
                    {/* Progress fill */}
                    <div
                        className="absolute bottom-0 w-[2px] bg-black/55 rounded-sm pointer-events-none"
                        style={{ height: sliderY }}
                    />
                    {/* Knob */}
                    <div
                        onMouseDown={e => { e.preventDefault(); setIsSliding(true); }}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-black cursor-grab"
                        style={{
                            top: sliderY,
                            boxShadow: isSliding ? "0 0 0 5px rgba(0,0,0,0.1)" : "0 2px 5px rgba(0,0,0,0.18)",
                        }}
                    />
                    {/* Year readout */}
                    <span
                        className="absolute left-5 -translate-y-1/2 font-glacial text-[0.7rem] tracking-wide text-black/60 whitespace-nowrap pointer-events-none"
                        style={{ top: sliderY }}
                    >
                        {currentYear}
                    </span>
                </div>

                <span className="font-glacial text-[0.65rem] tracking-widest text-black/35">
                    Now
                </span>
            </div>
        </div>
    );
}