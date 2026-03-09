"use client";

import { Article, RichImageNode, RichTextNode } from "@/app/hooks/apicall";
import Navbar from "@/components/navbar";
import axios from "axios";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";


export default function Narative() {
    const apiKey = process.env.NEXT_PUBLIC_KEY;

    const API_TOKEN =
        apiKey;
    const BACKEND_URL = "https://alexandraboutreachsite-backend-production.up.railway.app";

    const AUTH_HEADERS = { Authorization: `Bearer ${API_TOKEN}` };

    const { id } = useParams()
    console.log(id)

    const [article, setArtcle] = useState<Article>()
    const [content, setContentArray] = useState<(RichImageNode | RichTextNode)[][]>()
    const [image, setImage] = useState<string>()


    function createContentArray(): (RichTextNode | RichImageNode)[][] {

        if (!article) return [];

        // Matches everything between <Image> and </Image> (or paired <Image><Image>)
        const regex: RegExp = /<Image>(.*?)<Image>/g
        var finalArray: (RichImageNode | RichTextNode)[][] = []
        let imageIndex = 0;


        article.Content.forEach((item) => {
            item.children?.forEach((item2) => {
                const subArray: (RichTextNode | RichImageNode)[] = [];

                if (!item2.text) return;

                let remainingText = item2.text;
                let match;

                regex.lastIndex = 0; // Reset regex state before each use

                while ((match = regex.exec(item2.text)) !== null) {
                    // Text BEFORE this <Image>...<Image> block
                    const textBefore = remainingText.slice(
                        0,
                        match.index
                    );

                    if (textBefore) {
                        subArray.push({
                            text: textBefore,
                            type: item2.type,
                            bold: item2.bold,
                            italic: item2.italic,
                            underline: item2.underline,
                        } as RichTextNode);
                    }

                    const newImageText = match[1].replace(/<Image>.*?<Image>/g, "");
                    console.log("matchingggg", match)

                    // The IMAGE node, using imageIndex to get the right URL
                    subArray.push({
                        text: match[1], // text captured between the two <Image> tags
                        key: imageIndex,
                        srclink: BACKEND_URL + (article.Images[imageIndex]?.url ?? ""),
                        type: item.type,
                        bold: item2.bold,
                        italic: item2.italic,
                        underline: item2.underline,
                    } as RichImageNode);

                    if (imageIndex == article.Images.length) {
                        imageIndex = 0
                    }
                    else {
                        imageIndex++
                    }
                    remainingText = remainingText.slice(match.index + match[0].length)

                }

                console.log("match", match ? match : "")

                const trailingText = remainingText
                if (trailingText) {
                    subArray.push({
                        text: trailingText,
                        type: item.type,
                        bold: item2.bold,
                        italic: item2.italic,
                        underline: item2.underline,
                    } as RichTextNode);


                }
                finalArray.push(subArray)
            });
        });
        setContentArray(finalArray)
        console.log("final Array", content)
        return finalArray;

    }
    console.log("final Array", content)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await axios.get(`https://alexandraboutreachsite-backend-production.up.railway.app/api/articles/${id}?populate=*`, {
                    headers: AUTH_HEADERS

                })
                console.log(res.data)
                const { data } = res.data
                setArtcle(data)


            }
            catch (err) {
                console.log(err)
            }
        }
        if (!article) {
            fetchArticle()
        }
        createContentArray()
        setImage(BACKEND_URL + article?.Images[0].url)

        console.log("image", image)

        console.log("article", article)
    }, [article])


    function changeImage(link: string) {
        setImage(link)
        console.log("imageeeeee", image)

    }
    console.log("imageeeeee", image)



    return (
        <div className="w-full h-[100dvh] overflow-hidden">

            <Navbar />
            <div id="main-container" className="flex h-full sm:flex-col md:flex-row">
                <div className="sm:w-full md:w-[35%] h-full bg-black flex items-center justify-center">
                    {image == undefined
                        ? <h1 className="text-white/40 text-sm tracking-widest uppercase">Select a passage</h1>
                        : <img className="max-w-full max-h-full object-contain" src={image} alt="Image" />
                    }
                </div>
                <div className="sm:w-full md:w-[65%] overflow-y-scroll bg-white">


                    <div className="max-w-2xl mx-auto px-10 py-12">
                        {content?.map((item, i) => (
                            <p key={i} className="mb-6 leading-relaxed text-gray-800">
                                {item.map((text, j) => {
                                    const isHeading = text.type === "heading";
                                    const baseStyle: React.CSSProperties = {
                                        fontWeight: text.bold || isHeading ? "900" : "400",
                                        fontSize: isHeading ? "45px" : "17px",
                                        fontStyle: text.italic ? "italic" : "normal",
                                        fontFamily: "glacial",
                                        display: isHeading ? "block" : "inline",
                                        marginBottom: isHeading ? "8px" : undefined,
                                        letterSpacing: isHeading ? "-0.02em" : undefined,
                                        lineHeight: isHeading ? "1.2" : "1.75",
                                        color: isHeading ? "#111" : "#374151",
                                    };

                                    if ("srclink" in text) {
                                        return (
                                            <span
                                                key={j}
                                                style={{
                                                    ...baseStyle,
                                                    color: "#4F46E5",
                                                    textDecoration: "underline",
                                                    textDecorationColor: "rgba(79,70,229,0.3)",
                                                    cursor: "pointer",
                                                    transition: "color 0.15s",
                                                }}
                                                onMouseEnter={e => (e.currentTarget.style.color = "#695eff")}
                                                onMouseLeave={e => (e.currentTarget.style.color = "#b9b5fa")}
                                                onClick={() => changeImage(text.srclink)}
                                            >
                                                {text.text}
                                            </span>
                                        );
                                    }

                                    return <span key={j} style={baseStyle}>{text.text}</span>;
                                })}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>


    )

}