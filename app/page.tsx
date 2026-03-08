"use client";

import ImageSlideshow from "@/components/imageslideshow";
import Navbar from "@/components/navbar";
import { useReveal, useRevealSelf } from "@/app/hooks/useReveal.js"; // adjust path if needed
import Collage from "@/components/imageCollage";
import { useEffect, useRef, useState } from "react";

export default function Home() {



    // One ref per section — observer scoped to each container
    const heroTextRef = useReveal();
    const sustainRef = useReveal();
    const sustainBlockRef = useReveal();
    const darkSectionRef = useReveal();
    const soWhatRef = useReveal();
    const photographyRef = useReveal();
    const marqueeRef = useRevealSelf({ threshold: 0.05 });
    const projectsRef = useReveal();

    const sliderRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const scrollStartX = useRef(0);

    function handleMouseDown(e: React.MouseEvent) {
        setIsDragging(true);
        dragStartX.current = e.pageX;
        scrollStartX.current = sliderRef.current?.scrollLeft ?? 0;
    }

    function handleMouseMove(e: React.MouseEvent) {
        if (!isDragging || !sliderRef.current) return;
        const delta = e.pageX - dragStartX.current;
        sliderRef.current.scrollLeft = scrollStartX.current - delta;
    }

    function handleMouseUp() {
        setIsDragging(false);
    }

    const [pages, setPages] = useState([0, 1, 2]);

    function handleNext(int: number, e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();

        const element = document.getElementById(`page${int}`);
        console.log(element)
        element?.classList.add("pageturn");
        element?.classList.remove("reveal-scale");


        setTimeout(() => {
            element?.classList.remove("pageturn");
            setPages(prev => prev.map(p => (p + 1) % 3));
        }, 700); // must match animation duration above
    }

    return (
        <div className="">

            <section className="flex justify-center">
                <ImageSlideshow />
            </section>
            <Navbar page="Home" />

            {/* ── SUSTAINABILITY / PROGRESS ── */}
            <section ref={heroTextRef} className="py-20 px-6 bg-white">
                <div className="max-w-6xl mx-auto">

                    <div className="flex   items-center justify-between mb-16 gap-30">
                        <div className="reveal-line h-px bg-black/40" style={{ animationDelay: "0s" }} />
                        <p className=" font-glacial reveal reveal-fade text-xs tracking-[0.4em] uppercase text-black/60 text-center"
                            style={{ animationDelay: "0.2s" }}>
                            Photographer with an interest in
                        </p>
                        <div className="reveal-line h-px bg-black/40" style={{ animationDelay: "0.1s" }} />
                    </div>

                    <div className="text-center leading-[0.9]">
                        <h2 className="reveal text-[clamp(3rem,7vw,6rem)] font-glacial font-bold tracking-[-0.03em] text-green-800"
                            style={{ animationDelay: "0.3s" }}>
                            Sustainability
                        </h2>

                        <div className="reveal-fade text-sm tracking-[0.6em] uppercase text-black/40 my-6"
                            style={{ animationDelay: "0.45s" }}>
                            and
                        </div>

                        <h2 className="reveal text-[clamp(3rem,7vw,6rem)] font-glacial font-bold tracking-[-0.03em] italic"
                            style={{ animationDelay: "0.55s" }}>
                            Progress
                        </h2>
                    </div>

                </div>
            </section>

            {/* ── RIPPLE TEXT + IMAGE BLOCK ── */}
            <section ref={sustainRef} className=" mb-20 2xl:px-12 bg-white font-glacial">
                <div className="flex xl:justify-around items-center  2xl:max-w-full 2xl:flex-row flex-col">

                    {/* LEFT: ripple text stack */}
                    <div className="xl:w-[45%] xl:h-[800px] shrink-1  ">
                        {Array.from({ length: 8 }).map((_, index) => {
                            const offset = Math.sin(index * 0.6) * 40;
                            const isPrimary = index === 2;
                            return (
                                <p
                                    key={index}
                                    className={`

                                        p-5
                                        reveal
                                        text-[clamp(2.5rem,5vw,4rem)]
                                        leading-[0.9]
                                        tracking-[0.2em]
                                        uppercase 
                                        ${isPrimary
                                            ? " font-black italic text-black "
                                            : "font-bold text-black/20 "}
                                         ripple-text
                                    `}
                                    style={{
                                        marginLeft: `${offset}px`,
                                        animationDelay: `${index * 0.06}s`,
                                        /* ripple-text infinite uses this too */
                                    }}
                                >
                                    SUS·TAIN·ABIL·ITY
                                </p>
                            );
                        })}
                    </div>

                    {/* RIGHT: image + copy */}
                    <div className=" relative top-[50px] md:w-[80%] flex flex-col xl:w-[35%]  shrink-2">

                        <div className="reveal-scale relative  mb-12 overflow-hidden border-r-4 border-black "
                            style={{ animationDelay: "0.2s" }}>
                            <div className="absolute inset-0 h-full" />
                            <img className="w-full object-fit h-full" src="/HomePage/conferenceImage.png" />
                            <div className="absolute right-0 top-0 h-full w-[15%] flex items-center justify-center border-l border-black bg-purple-200">
                                <p className="rotate-90 tracking-[0.4em] text-xs uppercase ">
                                    Sustainability Conference 2025
                                </p>
                            </div>
                        </div>

                        <div className="max-w-full ml-auto  ">
                            <p className="reveal text-[1em] leading-relaxed tracking-wide text-neutral-700 mb-6"
                                style={{ animationDelay: "0.35s" }}>
                                By attending many conferences pertaining to sustainability, I have been honing the skills to spearhead a new generation of eco-friendly and caring individuals.
                            </p>
                            <button className="reveal border border-black px-6 py-2 text-xs tracking-[0.25em] uppercase transition-all hover:bg-black hover:text-white"
                                style={{ animationDelay: "0.45s" }}>
                                <a href="/Narratives"> Explore  </a>
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── DARK SECTION ── */}
            <section ref={darkSectionRef} className="py-32 xl:px-20 bg-black text-[#F5F3EE]">
                <div className="flex justify-center  md:justify-between items-start sm:gap-20 lg:gap-0">

                    {/* LEFT — IMAGE */}
                    <div className="reveal-left relative w-[52%] ml-10 hidden md:block" style={{ animationDelay: "0s" }}>
                        <div className="relative aspect-[4/5] overflow-hidden">
                            <img
                                src="HomePage/graphic1.jpg"
                                alt="Alexandra Bradley"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="reveal absolute bottom-0 right-[-2rem] text-[clamp(4rem,8vw,8rem)] font-black italic tracking-tight text-white leading-none"
                            style={{ animationDelay: "0.4s" }}>
                            WOW.
                        </h2>
                    </div>

                    {/* RIGHT — TEXT */}
                    <div className="max-w-[38%] mr-16 relative mt-20">
                        <p className="reveal-fade text-[1em] tracking-[0.6em] uppercase text-white/40 mb-8"
                            style={{ animationDelay: "0.1s" }}>
                            Sustainable Vision
                        </p>
                        <h1 className="reveal-right text-[clamp(2.8rem,4vw,4.5rem)] leading-[0.9] tracking-tight font-light"
                            style={{ animationDelay: "0.2s" }}>
                            Sustainability
                            <br />
                            <span className="font-bold italic">as Progress</span>
                        </h1>
                        <div className="reveal-line bg-white/30 my-10 ml-4 h-px" style={{ animationDelay: "0.35s" }} />
                        <p className="reveal text-lg leading-relaxed text-white/70 max-w-md"
                            style={{ animationDelay: "0.45s" }}>
                            Alexandra Bradley approaches sustainability not as a trend, but as a practice rooted in responsibility and design intelligence. A 2024 graduate of Boston University, she believes that thoughtful systems — whether in fashion, branding, or digital spaces — should leave as little excess behind as possible.

                            Her work explores how aesthetics and ethics can coexist: selecting materials with intention, prioritizing long-term impact over short-term spectacle, and building processes that value transparency. For Alexandra, sustainability is less about perfection and more about iteration — refining ideas, reducing waste, and designing with the awareness that every choice carries weight.

                            Through her projects, she aims to create work that feels considered, enduring, and conscious of the world it enters.
                        </p>
                        <div className="absolute -top-8 -right-8 w-28 h-28 border-t border-r border-white/20 pointer-events-none" />
                    </div>

                </div>
            </section>

            {/* ── SO WHAT ── */}
            <section ref={soWhatRef} className="relative py-32 px-20 bg-[#F5F3EE] text-black">
                <div className="flex justify-center xl:justify-between items-start">



                    {/* LEFT — GIF */}
                    <div className="max-w-[55%] hidden xl:block h-full p-1">
                        <h1 className=" text-8xl italic border-l-10 border-l-purple-200 px-5 skew-x-180 font-glacial  relative top-[-60px] "> Mindful Practices </h1>
                        <Collage />
                    </div>






                    {/* RIGHT — TEXT + STACK */}
                    <div className="relative max-w-[40%] flex flex-col items-center items-end pr-12">

                        <div className="text-right max-w-md mb-16">
                            <p className="reveal-fade text-md tracking-wide text-black/60 mb-4"
                                style={{ animationDelay: "0.1s" }}>
                                The consumerist mindset has lasting and tangible impact
                            </p>
                            <h2 className="reveal text-[clamp(3rem,6vw,6rem)] font-black italic leading-[0.9] tracking-tight"
                                style={{ animationDelay: "0.25s" }}>
                                SO WHAT?
                            </h2>
                        </div>

                        {/* Stacked Cards */}
                        <div className="relative min-w-[520px] h-[650px] ">

                            {/* CARD 0 — black */}
                            <div
                                className="reveal-scale absolute inset-0 bg-black text-[#F5F3EE] page0 flex flex-col justify-between p-10 cursor-pointer"
                                style={{ animationDelay: "0s", zIndex: `${pages[0]}` }}
                                id="page0"
                                onClick={(e) => handleNext(0, e)}
                            >
                                {/* top label */}
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">01 / Fast Fashion</span>
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Tap to continue →</span>
                                </div>

                                {/* center stat */}
                                <div>
                                    <p className="font-glacial text-[clamp(4rem,9vw,7rem)] font-bold leading-none text-white">
                                        92M
                                    </p>
                                    <p className="text-[10px] tracking-[0.5em] uppercase text-white/40 mt-1 mb-8">
                                        Tonnes of textile waste per year
                                    </p>
                                    <p className="text-sm leading-relaxed text-white/70 max-w-xs">
                                        The fashion industry produces more waste annually than the entire airline industry.
                                        Each second, the equivalent of one garbage truck of textiles is burned or buried in landfill.
                                    </p>
                                </div>

                                {/* bottom quote */}
                                <div className="border-t border-white/20 pt-6">
                                    <p className="font-glacial italic text-lg text-white/60 leading-snug">
                                        "We don't need a handful of people doing sustainability perfectly —
                                        we need millions doing it imperfectly."
                                    </p>
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mt-3">
                                        — Anne-Marie Bonneau
                                    </p>
                                </div>
                            </div>

                            {/* CARD 1 — neutral */}
                            <div
                                className="reveal-scale absolute bottom-6 left-6 w-full h-full border border-black bg-neutral-200 text-black page1 flex flex-col justify-between p-10 cursor-pointer"
                                style={{ animationDelay: "0.12s", zIndex: `${pages[1]}` }}
                                id="page1"
                                onClick={(e) => handleNext(1, e)}
                            >
                                {/* top label */}
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] tracking-[0.4em] uppercase text-black/40">02 / Overconsumption</span>
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/40">Tap to continue →</span>
                                </div>

                                {/* center content */}
                                <div>
                                    <p className="font-glacial text-[clamp(4rem,9vw,7rem)] font-bold leading-none text-black">
                                        $0.14
                                    </p>
                                    <p className="text-[10px] tracking-[0.5em] uppercase text-black/40 mt-1 mb-8">
                                        Cost per wear of the average garment
                                    </p>

                                    {/* two column facts */}
                                    <div className="grid grid-cols-2 gap-6 border-t border-black/20 pt-6">
                                        <div>
                                            <p className="font-glacial text-2xl font-bold">60%</p>
                                            <p className="text-xs text-black/50 mt-1 leading-snug">
                                                more clothing bought today vs. 15 years ago
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-glacial text-2xl font-bold">50%</p>
                                            <p className="text-xs text-black/50 mt-1 leading-snug">
                                                less time kept before being discarded
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* bottom quote */}
                                <div className="border-t border-black/20 pt-6">
                                    <p className="font-glacial italic text-lg text-black/60 leading-snug">
                                        "The most sustainable garment is the one already in your wardrobe."
                                    </p>
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 mt-3">
                                        — Orsola de Castro
                                    </p>
                                </div>
                            </div>

                            {/* CARD 2 — white */}
                            <div
                                className="reveal-scale absolute bottom-12 left-12 w-full h-full border border-black bg-white text-black page2 flex flex-col justify-between p-10 cursor-pointer"
                                style={{ animationDelay: "0.24s", zIndex: `${pages[2]}` }}
                                id="page2"
                                onClick={(e) => handleNext(2, e)}
                            >
                                {/* top label */}
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] tracking-[0.4em] uppercase text-black/40">03 / The Path Forward</span>
                                    <span className="text-[10px] tracking-[0.3em] uppercase text-black/40">Tap to continue →</span>
                                </div>

                                {/* center content */}
                                <div>
                                    <p className="font-glacial text-[clamp(4rem,9vw,7rem)] font-bold leading-none text-black">
                                        2050
                                    </p>
                                    <p className="text-[10px] tracking-[0.5em] uppercase text-black/40 mt-1 mb-8">
                                        Net-zero target for global fashion
                                    </p>
                                    <p className="text-sm leading-relaxed text-black/60 max-w-xs">
                                        Brands committing to circular design, deadstock fabrics, and
                                        carbon-neutral supply chains are proving that style and conscience
                                        are not opposites — they are the future.
                                    </p>

                                    {/* action pills */}
                                    <div className="flex flex-wrap gap-2 mt-6">
                                        {["Buy Less", "Buy Better", "Rewear", "Repair", "Recycle"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-[10px] tracking-[0.3em] uppercase border border-black/30 px-3 py-1"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* bottom quote */}
                                <div className="border-t border-black/20 pt-6">
                                    <p className="font-glacial italic text-lg text-black/60 leading-snug">
                                        "Fashion is not something that exists in dresses only —
                                        it is in the sky, in the street, in ideas."
                                    </p>
                                    <p className="text-[10px] tracking-[0.3em] uppercase text-black/30 mt-3">
                                        — Coco Chanel
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* ── PROJECTS ── */}
            <section ref={projectsRef} className="relative w-full overflow-hidden">

                {/* SPLIT BACKGROUND */}
                <div className="grid grid-cols-2 h-[100vh]">
                    <div className="bg-[#0e0e0e]" />
                    <div className="bg-[#F5F3EE]" />
                </div>

                {/* CONTENT OVERLAY */}
                <div className="absolute inset-0 flex flex-col justify-center lg:px-20">

                    {/* HEADER */}
                    <div className="mb-20">
                        <p className="reveal-fade text-[10px] tracking-[0.6em] uppercase text-white/90 mb-4"
                            style={{ animationDelay: "0s" }}>
                            Selected Works
                        </p>
                        <div className="flex justify-around gap-6 w-full">
                            <h1 className="reveal font-glacial text-[clamp(3.5rem,7vw,7rem)] font-bold italic leading-none text-white"
                                style={{ animationDelay: "0.1s" }}>
                                Projects  I'm
                            </h1>
                            <h1 className="reveal font-glacial text-[clamp(3.5rem,7vw,7rem)] font-bold italic leading-none text-[#0e0e0e]"
                                style={{ animationDelay: "0.2s" }}>
                                Proud Of.
                            </h1>
                        </div>

                        {/* divider line */}
                        <div className="reveal-line h-px bg-white/20 mt-8 w-[45%]"
                            style={{ animationDelay: "0.3s" }} />
                    </div>

                    {/* PROJECT LINKS */}
                    <div className="space-y-0 max-w-full">
                        {[
                            {
                                href: "/pdf1.pdf",
                                number: "01",
                                title: "Sustainable Futures",
                                category: "Brand Strategy · 2024",
                                delay: "0.2s",
                            },
                            {
                                href: "/pdf2.pdf",
                                number: "02",
                                title: "Circular By Design",
                                category: "Editorial · 2024",
                                delay: "0.3s",
                            },
                            {
                                href: "/pdf3.pdf",
                                number: "03",
                                title: "Worn Again",
                                category: "Photography · 2023",
                                delay: "0.4s",
                            },
                        ].map((project, i) => (
                            <a
                                key={i}
                                href={project.href}
                                target="_blank"
                                className="reveal group flex items-center justify-between border-t border-white/10 py-8 transition-all duration-300 hover:px-4"
                                style={{ animationDelay: project.delay }}
                            >
                                {/* LEFT — number + title */}
                                <div className="flex items-center md:gap-10">
                                    <span className="font-glacial text-[11px] tracking-[0.4em] text-white group-hover:text-white/60 transition ">
                                        {project.number}
                                    </span>
                                    <span className="font-glacial text-[clamp(1.8rem,3vw,3rem)] font-bold italic text-white leading-none group-hover:text-white transition">
                                        {project.title}
                                    </span>
                                </div>

                                {/* RIGHT — category + arrow */}
                                <div className="flex items-center gap-8">
                                    <span className="text-[10px] tracking-[0.4em] uppercase text-black group-hover:text-black/60 transition hidden md:block">
                                        {project.category}
                                    </span>
                                    <span className="text-white/20 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 text-xl">
                                        →
                                    </span>
                                </div>

                                {/* hover underline */}
                                <div className="absolute left-0 bottom-0 h-px w-0 bg-white/40 group-hover:w-full transition-all duration-500" />
                            </a>
                        ))}

                        {/* closing border */}
                        <div className="border-t border-white/10" />
                    </div>



                </div>
            </section>





            {/* ── MARQUEE NAME ── */}
            <section ref={marqueeRef} className="reveal py-32 overflow-hidden bg-white text-black">
                <div className="space-y-12">
                    <div className="whitespace-nowrap overflow-hidden">
                        <div className="marquee-track flex gap-16 text-5xl tracking-[0.4em] uppercase">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <span key={i}>Alexandra Bradley</span>
                            ))}
                        </div>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden rotate-180">
                        <div className="marquee-track--reverse marquee-track flex gap-16 text-5xl tracking-[0.4em] uppercase">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <span key={i}>Alexandra Bradley</span>
                            ))}
                        </div>
                    </div>
                    <div className="whitespace-nowrap overflow-hidden">
                        <div className="marquee-track flex gap-16 text-5xl tracking-[0.4em] uppercase">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <span key={i}>Alexandra Bradley</span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PHOTOGRAPHY ── */}
            <section ref={photographyRef} className="px-20 py-32 bg-[#F8F6F2] text-black">

                <div className="flex items-end justify-between mb-16">
                    <div>
                        <p className="reveal-fade text-[10px] tracking-[0.6em] uppercase text-black/40 mb-4"
                            style={{ animationDelay: "0s" }}>
                            Selected Works
                        </p>
                        <h1 className="reveal text-[clamp(3rem,6vw,6rem)] italic leading-none"
                            style={{ animationDelay: "0.15s" }}>
                            Photography
                        </h1>
                    </div>
                    <button className="reveal-right text-sm tracking-widest uppercase border-b border-black pb-1 hover:opacity-50 transition"
                        style={{ animationDelay: "0.25s" }}>
                        See More
                    </button>
                </div>

                <div
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    className={`flex gap-12 overflow-x-auto no-scrollbar select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                    style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
                >
                    {/* Image 1 */}
                    <div
                        className="reveal-scale flex-shrink-0 w-[38vw] aspect-[4/5] bg-black"
                        style={{ animationDelay: "0s", pointerEvents: "none" }}
                    >
                        <img className="object-cover w-full h-full" src="Homepage/image1.jpg" alt="Image 1" />
                    </div>

                    {/* Image 2 */}
                    <div
                        className="reveal-scale flex-shrink-0 w-[38vw] aspect-[4/5] bg-black"
                        style={{ animationDelay: "0.1s", pointerEvents: "none" }}
                    >
                        <img className="object-cover w-full h-full" src="Homepage/image2.jpg" alt="Image 2" />
                    </div>

                    {/* Image 3 */}
                    <div
                        className="reveal-scale flex-shrink-0 w-[38vw] aspect-[4/5] bg-black"
                        style={{ animationDelay: "0.2s", pointerEvents: "none" }}
                    >
                        <img className="object-cover w-full h-full" src="Homepage/image3.jpg" alt="Image 3" />
                    </div>

                    {/* Image 4 */}
                    <div
                        className="reveal-scale flex-shrink-0 w-[38vw] aspect-[4/5] bg-black"
                        style={{ animationDelay: "0.3s", pointerEvents: "none" }}
                    >
                        <img className="object-cover w-full h-full" src="Homepage/image4.jpg" alt="Image 4" />
                    </div>
                </div>
            </section>
            {/* BOTTOM TAG */}
            <p className="pb-10 px-2 text-[10px] tracking-[0.5em] uppercase text-black mt-16"
                style={{ animationDelay: "0.6s" }}>
                Alexandra Bradley · Boston University 2024
            </p>
        </div>
    );
}