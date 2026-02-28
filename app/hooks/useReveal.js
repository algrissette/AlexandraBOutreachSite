"use client";

import { useEffect, useRef } from "react";

/**
 * useReveal — attaches an IntersectionObserver to a container ref.
 * Any child with a .reveal / .reveal-left / .reveal-right /
 * .reveal-scale / .reveal-fade / .reveal-line class gets .is-visible
 * when it enters the viewport.
 *
 * Usage:
 *   const sectionRef = useReveal();
 *   <section ref={sectionRef}>
 *     <h2 className="reveal" style={{ "--delay": "0s" }}>Hello</h2>
 *     <p  className="reveal" style={{ "--delay": "0.15s" }}>World</p>
 *   </section>
 */
export function useReveal(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const root = ref.current;
        if (!root) return;

        const SELECTORS = [
            ".reveal",
            ".reveal-left",
            ".reveal-right",
            ".reveal-scale",
            ".reveal-fade",
            ".reveal-line",
        ].join(", ");

        const targets = Array.from(root.querySelectorAll(SELECTORS));

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        // fire once — unobserve after reveal
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: options.threshold ?? 0.15,
                rootMargin: options.rootMargin ?? "0px 0px -60px 0px",
                ...options,
            }
        );

        targets.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return ref;
}

/**
 * useRevealSelf — attach directly to a single element ref.
 */
export function useRevealSelf(options = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("is-visible");
                    observer.disconnect();
                }
            },
            { threshold: 0.15, ...options }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return ref;
}