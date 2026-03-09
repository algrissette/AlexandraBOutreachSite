"use client";

import { Image, Photograph, Year } from "@/app/hooks/apicall";
import Navbar from "@/components/navbar";
import axios from "axios";
import Masonry from "masonry-layout";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import imagesLoaded from "imagesloaded";
import Link from "next/link";

export default function ShowPhotography() {
    const apiKey = process.env.NEXT_PUBLIC_KEY;

    const { index } = useParams()
    const API_TOKEN = apiKey;
    const AUTH_HEADERS = { Authorization: `Bearer ${API_TOKEN}` };

    const [parent, setParent] = useState<Photograph>()
    const [year, setYear] = useState<Year>()
    const [photos, setPhotos] = useState<Image[]>([])
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const gridRef = useRef<HTMLDivElement | null>(null)
    const msnryRef = useRef<Masonry>(undefined as unknown as Masonry)

    useEffect(() => {
        if (!parent) {
            const getParent = async () => {
                try {
                    const res = await axios.get(
                        `https://alexandraboutreachsite-backend-production.up.railway.app/api/photographies/${index}?populate=*`,
                        { headers: AUTH_HEADERS }
                    )
                    const { data } = res.data
                    setParent(data as Photograph)
                } catch (err) {
                    console.log(err)
                }
            }
            getParent()
        }

        if (parent != undefined && photos.length === 0) {
            const getYear = async () => {
                try {
                    const res = await axios.get(
                        `https://alexandraboutreachsite-backend-production.up.railway.app/api/years/${parent.year.documentId}?populate=*`,
                        { headers: AUTH_HEADERS }
                    )
                    const { data } = res.data
                    setYear(data as Year)
                } catch (err) {
                    console.log(err)
                }
            }
            getYear()
            setPhotos(parent?.Photos)
        }
    }, [parent])

    useEffect(() => {
        if (!gridRef.current || photos.length === 0) return

        const grid = gridRef.current
        const imgLoad = imagesLoaded(grid)
        msnryRef.current = new Masonry(grid, {
            itemSelector: ".grid-item",
            columnWidth: 300,
            gutter: 5,
            fitWidth: true,
        })

        imgLoad.on("done", () => {
            if (msnryRef.current) (msnryRef.current as any).destroy()
            msnryRef.current = new Masonry(grid, {
                itemSelector: ".grid-item",
                columnWidth: 300,
                gutter: 5,
                fitWidth: true,
            })
        })

        return () => {
            if (msnryRef.current) (msnryRef.current as any).destroy()
        }
    }, [photos])

    return (
        <section className="h-[100dvh] w-full overflow-hidden bg-black">
            <Navbar />
            <section className="flex h-full w-full">

                {/* Grid Panel */}
                <section
                    className="w-full md:w-[75%] h-full overflow-y-scroll p-5"
                    style={{ scrollbarWidth: "none" }}
                >
                    <div ref={gridRef} className="w-full">
                        {photos.length > 0 ? (
                            photos.map((photo, i) => (
                                <img
                                    key={photo.url ?? i}
                                    className="grid-item transition-all duration-300 hover:brightness-110 hover:scale-[1.01]"
                                    src={photo.url}
                                    alt={photo.alternativeText}
                                    style={{
                                        width: `${Math.min(Math.max(photo.width > 800 ? photo.width / 5 : photo.width, 200), 600)}px`,
                                        height: `${Math.min(Math.max(photo.height > 800 ? photo.height / 5 : photo.height, 200), 400)}px`,
                                        margin: "5px",
                                        objectFit: "cover",
                                    }}
                                />
                            ))
                        ) : (
                            <p className="text-white-600 text-xs tracking-[0.3em] uppercase mt-20 ml-5">
                                Loading
                            </p>
                        )}
                    </div>
                </section>

                {/* Sidebar */}
                <aside
                    style={{ scrollbarWidth: "none" }}
                    className={`
                        overflow-y-scroll h-full bg-black border-l border-neutral-800
                        flex flex-col text-white
                        fixed md:relative top-0 right-0 z-40
                        w-[85vw] max-w-[320px] md:w-[25%] md:max-w-none
                        transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"}
                    `}
                >
                    <div className="border-b border-neutral-800 flex flex-col place-items-center p-10 md:p-20 text-center gap-2">

                        <p className="text-[9px] uppercase tracking-[0.3em] text-white mb-6">
                            Current Gallery
                        </p>

                        <h1 className="text-white text-6xl md:text-8xl font-glacial leading-none">
                            {parent?.Title ?? "—"}
                        </h1>

                        <p className="text-white text-sm mt-4 leading-relaxed font-glacial hover:underline">
                            {parent?.Description ?? ""}
                        </p>

                        <div className="flex gap-4 mt-6 text-[10px] tracking-widest uppercase text-neutral-100">
                            {parent?.Location && <span>{parent.Location}</span>}
                            {parent?.createdAt && (
                                <span>
                                    {new Date(parent.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric", month: "long", day: "numeric"
                                    })}
                                </span>
                            )}
                        </div>

                        <div className="w-8 h-px bg-neutral-700 my-8" />

                        <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 mb-4">
                            Other Galleries
                        </p>

                        <div className="flex flex-col w-full gap-1">
                            {year?.photographies.map((item) => (
                                <Link
                                    key={item.documentId}
                                    href={`/Photography/${item.documentId}`}
                                    onClick={() => setSidebarOpen(false)}
                                    className="font-glacial text-xl text-neutral-400 hover:text-white text-sm py-2 border-b border-neutral-900 hover:border-neutral-700 transition-all duration-200 hover:tracking-wider"
                                >
                                    {item.Title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link
                        href={`/Gallery/${year?.documentId}`}
                        className="text-[16px] uppercase tracking-[0.2em] text-neutral-200 italic hover:text-white mx-8 my-6 transition-colors duration-200"
                    >
                        ← Back to {year?.Year}
                    </Link>
                </aside>

                {/* Mobile sidebar toggle button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="fixed bottom-6 right-6 z-50 md:hidden bg-white text-black w-12 h-12 rounded-full flex items-center justify-center text-xs tracking-widest font-medium shadow-xl"
                >
                    {sidebarOpen ? "✕" : "i"}
                </button>

                {/* Mobile backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/60 md:hidden backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

            </section>
        </section>
    )
}