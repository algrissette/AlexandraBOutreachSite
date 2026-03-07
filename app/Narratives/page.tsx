"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Article } from "../hooks/apicall";
import Navbar from "@/components/navbar";
import Link from "next/link";
const API_TOKEN =
    "9557e320422e1ab0b06d5b0e6d90bf6d6fb283a88f5b78d88fe00df3d8d4f5939d4813f6aa4ef1b1db5232ca92f5e9cb433c8fb8699b274680b67843588815d51d1718e5069fcd6891f40fde50dfdfd02cd7a351c47d4f5c77f833b7c4e364f80da9f7e77c240ac84fde2bfd1c034e467f818e33dc093aee598da41edaf26dea";

const AUTH_HEADERS = { Authorization: `Bearer ${API_TOKEN}` };

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([])

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get("http://localhost:1337/api/articles?populate=*", {
                    headers: AUTH_HEADERS
                })
                const { data } = res.data
                setArticles(data as Article[])
            } catch (err) {
                console.error(err)
            }
        }
        fetchArticles()
    }, [])

    const featured = articles[0]
    const rest = articles.slice(1)

    return (
        <>


            <div className="page">
                {/* <Navbar /> */}
                <Navbar />
                {/* ── FEATURED ARTICLE ── */}
                {articles.length === 0 ? (
                    <div className="hero">
                        <div className="hero-text">
                            <div className="skeleton" style={{ height: '0.65rem', width: '8rem', marginBottom: '2rem' }} />
                            <div className="skeleton" style={{ height: '5rem', width: '90%', marginBottom: '1rem' }} />
                            <div className="skeleton" style={{ height: '5rem', width: '70%', marginBottom: '2.5rem' }} />
                            <div className="hero-divider" />
                            <div className="skeleton" style={{ height: '1rem', width: '100%', marginBottom: '0.5rem' }} />
                            <div className="skeleton" style={{ height: '1rem', width: '80%' }} />
                        </div>
                        <div className="hero-image-wrap skeleton" />
                    </div>
                ) : featured ? (
                    <Link href={`/Narratives/${featured.documentId}`}>
                        <div className="hero">
                            <div className="hero-text">
                                <p className="hero-eyebrow">Latest </p>
                                <h1 className="hero-title">{featured.Title}</h1>
                                <div className="hero-divider" />
                                <p className="hero-description">{featured.Description}</p>
                                <p className="hero-meta">
                                    {featured.Date
                                        ? new Date(featured.Date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                        : new Date(featured.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                    }
                                </p>
                            </div>
                            <div className="hero-image-wrap">
                                <img
                                    src={featured.thumbnail?.url}
                                    alt={featured.thumbnail?.alternativeText || featured.Title}
                                />
                                <div className="hero-image-overlay" />
                            </div>
                        </div>
                    </Link>
                ) : null}

                {/* ── OTHER WORKS ── */}
                {rest.length > 0 && (
                    <>
                        <div className="section-header">
                            <span className="section-title">More </span>
                            <div className="section-line" />
                        </div>

                        <div className="articles-grid">
                            {rest.map((item, i) => (
                                <Link href={`/Narratives/${item.documentId}`}>

                                    <div key={item.id} className="article-card">
                                        <div className="card-image-wrap">
                                            <img
                                                src={item.thumbnail?.url}
                                                alt={item.thumbnail?.alternativeText || item.Title}
                                            />
                                            <span className="card-number">0{i + 2}</span>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-date">
                                                {item.Date
                                                    ? new Date(item.Date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                                    : new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                                                }
                                            </p>
                                            <h2 className="card-title">{item.Title}</h2>
                                            <p className="card-desc">{item.Description}</p>
                                            <div className="read-more">
                                                <span className="read-more-line" />
                                                Read
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {articles.length === 0 && (
                    <div className="empty-state">
                        <p className="empty-title">No stories yet</p>
                        <p className="empty-sub">Check back soon</p>
                    </div>
                )}
            </div>
        </>
    )
}