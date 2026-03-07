"use client";

import { useState } from "react";
import { BiUpArrow } from "react-icons/bi";
import { CiMenuBurger } from "react-icons/ci";

type NavbarProps = {
    page?: string;
};

export default function Navbar({ page }: NavbarProps) {
    const [showBar, setShowBar] = useState(false);

    const navLinks = [
        { label: "Home", href: "/", key: "Home" },
        { label: "Art", href: "/Art", key: "Art" },
        { label: "Narratives", href: "/Narratives", key: "Narratives" },
        { label: "About Me", href: "/About", key: "About Me" },
    ];

    return (
        <nav className="sticky top-0 z-1000 w-full border-b border-[#c8bfb3] bg-[#f8edfe]">

            {/* Top Bar */}
            <div className="flex h-14 items-center justify-between px-10">

                {/* Logo */}
                <a href="/" className="font-glacial text-base font-light italic tracking-[0.25em] text-[#1a1a18] transition-colors duration-300 hover:text-[#6b5c4e]">
                    Alexandra Bradley
                </a>

                {/* Right side */}
                <div className="flex items-center gap-10">


                    {/* Divider */}
                    <div className="h-4 w-px bg-[#c8bfb3]" />

                    <button
                        onClick={() => setShowBar(prev => !prev)}
                        className="flex flex-col gap-[5px] cursor-pointer group"
                        aria-label="Toggle menu"
                    >
                        {/* Animated hamburger lines */}
                        <span className={`block h-px w-5 bg-[#1a1a18] transition-all duration-300 ${showBar ? "translate-y-[7px] -rotate-45" : ""}`} />
                        <span className={`block h-px w-5 bg-[#1a1a18] transition-all duration-300 ${showBar ? "opacity-0 scale-x-0" : ""}`} />
                        <span className={`block h-px w-5 bg-[#1a1a18] transition-all duration-300 ${showBar ? "-translate-y-[7px] rotate-45" : ""}`} />
                    </button>

                </div>
            </div>

            {/* Dropdown */}
            <div
                className={`absolute left-0 top-full w-full bg-[#f8edfe] border-b border-[#c8bfb3] overflow-hidden transition-all duration-500 ease-in-out ${showBar ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {/* Nav items */}
                <div className="flex flex-col">
                    {navLinks.map((link, i) => (
                        <a
                            key={link.key}
                            href={link.href}
                            className="group relative flex items-center justify-between px-10 py-6 border-b border-[#c8bfb3] bg-[#f8edfe] hover:bg-black/20 transition-all duration-300"
                        >
                            {/* Index number */}
                            <span className="font-glacial text-xs font-light italic text-[#c8bfb3] transition-colors duration-300">
                                0{i + 1}
                            </span>

                            {/* Label */}
                            <span className="font-glacial text-2xl font-light italic tracking-widest text-[#1a1a18] group-hover:text-[#6b5c4e] transition-colors duration-300">
                                {link.label}
                            </span>

                            {/* Arrow line — appears on hover */}
                            <span className="flex items-center gap-2 font-glacial text-[0.6rem] tracking-[0.3em] uppercase text-[#c8bfb3] opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <span className="block h-px w-4 bg-[#c8bfb3] group-hover:w-8 transition-all duration-500" />
                                Go
                            </span>
                        </a>
                    ))}
                </div>

                {/* Footer row */}
                <div className="flex items-center justify-between px-10 py-4 bg-[#f8edfe]">
                    <span className="font-glacial text-[0.6rem] font-light tracking-[0.35em] uppercase text-[#c8bfb3]">
                        Sustainability · Policy · Editorial
                    </span>
                    <button
                        onClick={() => setShowBar(false)}
                        className="flex items-center gap-2 font-glacial text-[0.6rem] font-light tracking-[0.3em] uppercase text-[#8a7e72] hover:text-[#1a1a18] transition-colors duration-300 cursor-pointer"
                    >
                        Close
                        <BiUpArrow className="text-xs" />
                    </button>
                </div>
            </div>

        </nav>
    );
}