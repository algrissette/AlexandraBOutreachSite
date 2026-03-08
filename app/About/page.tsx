import Navbar from "@/components/navbar";

export default function About() {
    return (
        <>
            <div>
                <Navbar />

                {/* ── HERO ── */}
                <section className="hero">
                    <div className="overflow-hidden absolute w-100 h-100 bg-black left-10 top-10 sm:hidden lg:block rounded-full opacity-60">

                        <img className="w-full object-fit" src={"/About/Instagram.jfif"} alt="Image of Alex" />
                    </div>

                    <div className="hero-bg-text" aria-hidden="true">Alexandra</div>
                    <div className="hero-inner">
                        <div className="hero-left">
                            <p className="hero-label">Portfolio · 2025</p>
                            <h1 className="hero-name">
                                Alexandra<br />
                                <em>Bradley</em>
                            </h1>
                            <p className="hero-role">
                                Sustainability Leader<br />
                                Policy Advocate<br />
                                Circular Economy
                            </p>
                        </div>
                        <div className="hero-right">
                            <p className="hero-bio">
                                BA in <strong>International Relations</strong> with a minor in Economics from Boston University. Currently pursuing a Graduate Certificate in <strong>Corporate Sustainability & Innovation</strong> at Harvard Extension School.
                            </p>
                            <p className="hero-bio" style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)', color: '#5a5249' }}>
                                Bridging the gap between global climate policy and local community action — from municipal zero waste planning in Cambridge to youth advocacy at the UNFCCC.
                            </p>
                            <div className="hero-tags">
                                {["Circular Economy", "Climate Policy", "Textile Recovery", "ESG", "Stakeholder Engagement", "Strategic Communications", "Data Analysis", "Event Management"].map(t => (
                                    <span key={t} className="tag">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="scroll-hint" aria-hidden="true">
                        <div className="scroll-line" />
                        <span>Scroll</span>
                    </div>
                </section>

                {/* ── SKILLS TICKER ── */}
                <div className="skills-strip">
                    <div className="ticker-track">
                        {[
                            "Project Management", "Event Management", "Strategic Communications",
                            "Data Analysis", "Circular Economy", "Climate Policy", "Life Cycle Assessment",
                            "Stakeholder Engagement", "Policy Research", "Photography", "Editorial",
                            "ESG Investing", "Zero Waste", "Building Decarbonization",
                            "Project Management", "Event Management", "Strategic Communications",
                            "Data Analysis", "Circular Economy", "Climate Policy", "Life Cycle Assessment",
                            "Stakeholder Engagement", "Policy Research", "Photography", "Editorial",
                            "ESG Investing", "Zero Waste", "Building Decarbonization",
                        ].map((s, i) => (
                            <span key={i} className="ticker-item">
                                {s}
                                <span className="ticker-dot">·</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* ── EXPERIENCE ── */}
                <section className="section">
                    <div className="section-inner">
                        <div className="section-label-col">
                            <span className="section-label">Experience</span>
                        </div>
                        <div className="section-content">
                            <div className="exp-list">

                                <div className="exp-item">
                                    <div className="exp-date">May 2025 –<br />Dec 2025</div>
                                    <div>
                                        <p className="exp-org">Run On Climate</p>
                                        <h3 className="exp-title">Policy Fellow</h3>
                                        <p className="exp-desc">Mentored a cohort of first-time policy interns, advised staff on task assignments by matching intern strengths to project needs, and delivered program-level feedback contributing to improvements in internship structure. Supported outreach events and community engagement.</p>
                                        <div className="exp-skills">
                                            {["Leadership", "Team Coordination", "Program Development"].map(s => <span key={s} className="skill-pill">{s}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="exp-item">
                                    <div className="exp-date">Aug 2024 –<br />May 2025</div>
                                    <div>
                                        <p className="exp-org">Run On Climate · Cambridge, MA</p>
                                        <h3 className="exp-title">Policy Research Intern</h3>
                                        <p className="exp-desc">Partnered with Cambridge City Councillor Patty Nolan to advance municipal climate goals. Contributed to the Zero Waste Master Plan, Climate Action Plan, and Building Energy Use Disclosure Ordinance. Conducted policy analysis on plastic waste reduction, building decarbonization, renewable energy, and sustainable transportation.</p>
                                        <div className="exp-skills">
                                            {["Climate Policy", "Stakeholder Engagement", "Policy Analysis", "Municipal Government"].map(s => <span key={s} className="skill-pill">{s}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="exp-item">
                                    <div className="exp-date">Aug 2025<br />(1 month)</div>
                                    <div>
                                        <p className="exp-org">YOUNGO · Miami, FL</p>
                                        <h3 className="exp-title">LCOY USA Youth Delegate</h3>
                                        <p className="exp-desc">Drafted key climate policy demands for the National Youth Statement, incorporated into the Global Youth Statement at the UNFCCC's Conference of Youth (COY) and COP. Participated in panels and debates on climate justice, adaptation, and resilience.</p>
                                        <div className="exp-skills">
                                            {["UNFCCC", "Climate Justice", "Youth Policy", "International Relations"].map(s => <span key={s} className="skill-pill">{s}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="exp-item">
                                    <div className="exp-date">Oct 2024 –<br />Jun 2025</div>
                                    <div>
                                        <p className="exp-org">CT Recreation & Parks Association · Newington, CT</p>
                                        <h3 className="exp-title">Administrative Assistant</h3>
                                        <p className="exp-desc">Provided daily operational support, managed membership services, coordinated event logistics including vendor communication and on-site setup, and maintained website updates and internal communications.</p>
                                        <div className="exp-skills">
                                            {["Event Management", "Office Administration", "Member Relations"].map(s => <span key={s} className="skill-pill">{s}</span>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="exp-item">
                                    <div className="exp-date">Jun – Aug<br />2023</div>
                                    <div>
                                        <p className="exp-org">Investment & Pensions Europe</p>
                                        <h3 className="exp-title">Economics & Finance Intern</h3>
                                        <p className="exp-desc">Gained cross-functional experience across Events, Editorial, and Real Assets units. Supported the IPE 2023 Expert Forum on ESG investing and Net-Zero transitions. Authored finance news articles on pension schemes and investment strategies for publication.</p>
                                        <div className="exp-skills">
                                            {["ESG", "Financial Research", "Editorial", "Data Analysis"].map(s => <span key={s} className="skill-pill">{s}</span>)}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>

                {/* ── EDUCATION ── */}
                <section className="section">
                    <div className="section-inner">
                        <div className="section-label-col">
                            <span className="section-label">Education</span>
                        </div>
                        <div className="section-content">
                            <div className="edu-grid">
                                <div className="edu-card">
                                    <p className="edu-degree">Graduate Certificate</p>
                                    <h3 className="edu-school">Harvard Extension School</h3>
                                    <p className="edu-dates">Sep 2025 – May 2026</p>
                                    <p className="edu-notes">Corporate Sustainability & Innovation<br />Circular & Regenerative Economics · Life Cycle Assessment & Supply Chains</p>
                                </div>
                                <div className="edu-card">
                                    <p className="edu-degree">BA International Relations · Minor: Economics</p>
                                    <h3 className="edu-school">Boston University</h3>
                                    <p className="edu-dates">Sep 2020 – May 2024</p>
                                    <p className="edu-notes">BU International Affairs Association · Charcoal Magazine · Fabrio Magazine · The Buzz Magazine</p>
                                </div>
                            </div>

                            <div className="cert-badge">
                                <div className="cert-icon">
                                    <svg viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                                </div>
                                <div>
                                    <p className="cert-title">GRI Certified Sustainability Professional</p>
                                    <p className="cert-issuer">Global Reporting Initiative · Issued Jan 2026 · ID 172278534</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── VOLUNTEERING & ACTIVITIES ── */}
                <section className="section">
                    <div className="section-inner">
                        <div className="section-label-col">
                            <span className="section-label">Involvement</span>
                        </div>
                        <div className="section-content">
                            <div className="vol-list">

                                {[
                                    {
                                        date: "Aug 2025 – Present",
                                        org: "California Product Stewardship Council",
                                        title: "Statewide Textile Recovery Act Taskforce Member",
                                        desc: "Contributing to statewide policy efforts around textile recovery and extended producer responsibility."
                                    },
                                    {
                                        date: "Aug 2025 – Present",
                                        org: "YOUNGO — UN Children & Youth Constituency",
                                        title: "Member",
                                        desc: "The official children and youth constituency of the UNFCCC, advocating for ambitious climate action in international negotiations."
                                    },
                                    {
                                        date: "Jan 2025 – Present",
                                        org: "Sierra Club",
                                        title: "Communications Committee",
                                        desc: "Monitor and analyze engagement across Instagram, Facebook, and Bluesky. Develop social media content promoting the monthly newsletter to increase visibility and reach."
                                    },
                                    {
                                        date: "Jan 2021 – May 2024",
                                        org: "BU International Affairs Assoc. · BarMUN",
                                        title: "Junior Crisis Staff Member",
                                        desc: "Worked in crisis debate committees, answering delegate notes and assisting with crisis updates. Assisted dais members for General Assembly and Specialized committees."
                                    },
                                    {
                                        date: "Sep 2022 – May 2024",
                                        org: "Charcoal Magazine · Boston University",
                                        title: "Photographer / Editor / Producer",
                                        desc: "Pitched, designed, and shot concept ideas for the magazine's quarterly publications."
                                    },
                                    {
                                        date: "Sep 2023 – May 2024",
                                        org: "Fabrio Sustainable Fashion Magazine · BU",
                                        title: "Photographer / Editor",
                                        desc: "Photographer and shoot designer on the Visuals Team. Assisted with set design, concept creation, and digital media production."
                                    },
                                    {
                                        date: "Sep 2021 – May 2022",
                                        org: "The Buzz Magazine · Boston University",
                                        title: "Writer",
                                        desc: "Authored online news articles for the magazine's digital publication."
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="vol-item">
                                        <div className="exp-date">{item.date}</div>
                                        <div>
                                            <p className="exp-org">{item.org}</p>
                                            <h3 className="exp-title" style={{ fontSize: '1.3rem' }}>{item.title}</h3>
                                            <p className="exp-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className="footer">
                    <p className="footer-name">Alexandra Bradley · She/Her · 2025</p>
                    <a href="https://www.linkedin.com/in/alexandra-bradley" className="footer-link" target="_blank" rel="noreferrer">
                        <span className="footer-arrow" />
                        LinkedIn
                    </a>
                </footer>

            </div>
        </>
    )
}