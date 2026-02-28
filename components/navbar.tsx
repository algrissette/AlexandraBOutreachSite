"use client";

import { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";

type NavbarProps = {
    page?: string;
};

export default function Navbar({ page }: NavbarProps) {
    const [showBar, setShowBar] = useState(false);

    const baseItem =
        "h-24 w-full flex items-center justify-center text-sm tracking-[0.4em] uppercase transition-all duration-300";

    const activeItem =
        "bg-black text-[#F8F6F1] border-b border-black";

    const inactiveItem =
        "bg-[#F8F6F1] text-black border-b border-black/20 hover:bg-black hover:text-[#F8F6F1]";

    return (
        <nav className="sticky top-0 z-1000 w-full bg-black text-[#F8F6F1]">

            {/* Top Bar */}
            <div className="flex h-16 px-12 items-center justify-between">

                <h1 className="text-sm tracking-[0.5em] uppercase cursor-pointer">
                    Alexandra Bradley
                </h1>

                <div className="flex items-center gap-12 text-xs tracking-[0.4em] uppercase">

                    <a className="cursor-pointer hover:opacity-70 transition ">
                        Get in Touch
                    </a>

                    <button
                        className="text-lg hover:opacity-70 transition cursor-pointer"
                        onClick={() => setShowBar(prev => !prev)}
                    >
                        <CiMenuBurger />
                    </button>

                </div>
            </div>

            {/* Dropdown */}
            {showBar && (
                <div className="absolute top-full left-0 w-full flex flex-col shadow-[0_20px_40px_rgba(0,0,0,0.25)]">

                    <div className="h-24 w-full bg-black text-[#F8F6F1] flex items-center justify-center border-b border-black">
                        <div className="flex items-center gap-10 tracking-[0.4em] uppercase text-sm">
                            <h1>Alexandra Bradley</h1>
                            <BiUpArrow
                                className="cursor-pointer hover:opacity-70 transition"
                                onClick={() => setShowBar(false)}
                            />
                        </div>
                    </div>

                    <div className={`${baseItem} ${page === "Home" || !page ? activeItem : inactiveItem}`}>
                        <a href="/">Home</a>
                    </div>

                    <div className={`${baseItem} ${page === "Art" ? activeItem : inactiveItem}`}>
                        <a href="/Art">Art</a>
                    </div>

                    <div className={`${baseItem} ${page === "Narratives" ? activeItem : inactiveItem}`}>
                        <a href="/Narratives">Narratives</a>
                    </div>

                    <div className={`${baseItem} ${page === "About Me" ? activeItem : inactiveItem}`}>
                        <a href="/About">About Me</a>
                    </div>

                </div>
            )}
        </nav>
    );
}