"use client";

import { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";

type NavbarProps = {
    page?: string;
};

export default function Navbar({ page }: NavbarProps) {
    const [showBar, setShowBar] = useState(false);

    const selectedBarStyles =
        "h-20 w-full bg-black text-[#FFFFF0] border-b-2 border-black flex justify-center items-center";

    const defaultBarStyles =
        "h-20 w-full bg-[#FFFFF0] text-black border-b-2 border-black flex justify-center items-center";

    return (
        <nav className="sticky top-0 z-50 w-full bg-black text-white">

            {/* Top Bar */}
            <div className="flex h-20 px-10 justify-between items-center">

                <h1 className="cursor-pointer text-xl">
                    Alexandra Bradley
                </h1>

                <div className="flex gap-10 items-center">

                    <a className="cursor-pointer">
                        Get in Touch
                    </a>

                    <button
                        className="text-[25px] cursor-pointer"
                        onClick={() => setShowBar(prev => !prev)}
                    >
                        <CiMenuBurger />
                    </button>

                </div>
            </div>

            {/* Dropdown Menu */}
            {showBar && (
                <div className="absolute top-full left-0 w-full flex flex-col z-50">

                    <div className={selectedBarStyles}>
                        <div className="flex items-center gap-10">
                            <h1>Alexandra Bradley</h1>

                            <BiUpArrow
                                className="cursor-pointer"
                                onClick={() => setShowBar(false)}
                            />
                        </div>
                    </div>

                    <div className={page === "Home" || !page ? selectedBarStyles : defaultBarStyles}>
                        <a href="/">Home</a>
                    </div>

                    <div className={page === "Art" ? selectedBarStyles : defaultBarStyles}>
                        <a href="/Art">Art</a>
                    </div>

                    <div className={page === "Narratives" ? selectedBarStyles : defaultBarStyles}>
                        <a href="/Narratives">Narratives</a>
                    </div>

                    <div className={page === "About Me" ? selectedBarStyles : defaultBarStyles}>
                        <a href="/About">About Me</a>
                    </div>

                </div>
            )}
        </nav>
    );
}
