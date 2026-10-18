import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiArrowDown, FiArrowRight, FiArrowUpRight, FiCheck, FiCode, FiCopy, FiCpu, FiDownload, FiMail, FiMapPin, FiMenu, FiMonitor, FiPhone, FiTool, FiWifi, FiX } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedinIn, FaPython, FaWindows } from "react-icons/fa";
import { config } from "../config";
import TechnicalSkills from "./TechnicalSkills";
import PortfolioFooter from "./PortfolioFooter";
import { ContactForm, PortfolioGallery, PortfolioShowcase, QuickNavigation } from "./PortfolioExtras";

const sections = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];
const services = [
  { Icon: FiCpu, title: "Hardware & repair", text: "PC assembly, fault diagnosis, upgrades, and maintenance to keep computers working at their best.", tags: ["PC assembly", "Troubleshooting", "Maintenance"] },
  { Icon: FiWifi, title: "Networks & security", text: "Practical network setup and CCTV installation for connected, dependable spaces.", tags: ["LAN / WAN", "Router configuration", "CCTV"] },
  { Icon: FiCode, title: "Digital & web", text: "Foundational web development, graphic design, and everyday ICT support with a focus on people.", tags: ["Web development", "Photoshop", "ICT support"] },
];
function SectionTitle({ label, title, accent, text, level = "h2" }: { label: string; title: string; accent: string; text?: string; level?: "h1" | "h2" }) {
  const Heading = level;
  return <div className="section-heading"><span className="eyebrow"><i />{label}</span><Heading>{title} <span className="gradient-text">{accent}</span></Heading>{text && <p>{text}</p>}</div>;
}
function ProjectCard() {
  const [expanded, setExpanded] = useState(false);
  const project = config.projects[0];
  return <article className="project-feature glass">
    <div className="project-art">
      <span className="art-label">HARDWARE / ENGINEERING</span>
      <svg viewBox="0 0 560 360" role="img" aria-label="Concept illustration of a mini CNC machine">
        <defs><linearGradient id="machine-gradient" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#67e8f9" /><stop offset="1" stopColor="#a78bfa" /></linearGradient><pattern id="machine-grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#67e8f9" strokeOpacity=".08" /></pattern></defs>
        <rect width="560" height="360" fill="url(#machine-grid)" />
        <g fill="#111626" stroke="url(#machine-gradient)" strokeWidth="2" strokeLinejoin="round">
          <path d="M95 249 320 306 470 227 244 172Z" /><path d="M95 249v24l225 57 150-79v-24L320 306Z" />
          <path d="m130 233 10-135 27 7-9 136M385 242l10-135 27 7-9 136" /><path d="m140 98 255 9 27 7-255-9Z" /><path d="m140 98 255 9v31l-255-9Z" />
          <path d="m258 104 47 2v65l-47-2Z" /><path d="m271 169 20 1v34l-20-1Z" /><path d="m278 204 6 1v26l-6-2Z" /><path d="m183 245 120 30 86-45-120-30Z" />
        </g><g stroke="#67e8f9" strokeWidth="1" opacity=".4"><path d="m118 264 211 53M340 300l107-56M154 85V57h260v36" /><path d="m149 62 5-5 5 5m250-5 5 5 5-5" /></g>
        <g fill="#a4a8c2" fontFamily="monospace" fontSize="10"><text x="235" y="49">PRECISION IN MOTION</text><text x="369" y="300">X / Y / Z</text></g>
      </svg><span className="art-footnote">CONCEPT ILLUSTRATION <span>01 / CNC</span></span>
    </div>
    <div className="project-copy"><span className="eyebrow">Featured project <span>01</span></span><h3>{project.title}</h3><p>A hands-on exploration of how hardware, electronics, and precision engineering come together.</p><div className="tags">{project.technologies.split(", ").map(tag => <span key={tag}>{tag}</span>)}</div>
      <button className="text-link" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls="cnc-details">{expanded ? "Close project details" : "Explore the project"}<FiArrowUpRight /></button>
      {expanded && <div id="cnc-details" className="project-details"><p>{project.description}</p><p>This project brings together component assembly and electronics for precision cutting and engraving applications.</p></div>}
    </div>
  </article>;
}
export default function Portfolio({ projectsOnly = false }: { projectsOnly?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [role, setRole] = useState(0);
  const [progress, setProgress] = useState(0);
  const menuButton = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();
  useEffect(() => {
    const items = document.querySelectorAll(".section-heading, .skill-card, .service-card, .project-feature, .journey-item, .gallery-tile, .workflow-steps>div");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    items.forEach(item => { item.classList.add("reveal-item"); reveal.observe(item); });
    return () => { reveal.disconnect(); items.forEach(item => item.classList.remove("reveal-item")); };
  }, [location.pathname]);
  useEffect(() => {
    if (location.hash) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
    else window.scrollTo(0, 0);
    const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }); }, { rootMargin: "-20% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    const onScroll = () => { const height = document.documentElement.scrollHeight - window.innerHeight; setProgress(height > 0 ? window.scrollY / height : 0); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [location.pathname, location.hash]);
  useEffect(() => { if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; const timer = setInterval(() => setRole(current => (current + 1) % 3), 3800); return () => clearInterval(timer); }, []);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusFrame = requestAnimationFrame(() => document.querySelector<HTMLAnchorElement>("#mobile-nav a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
      if (event.key !== "Tab") return;
      const links = document.querySelectorAll<HTMLAnchorElement>("#mobile-nav a");
      const first = menuButton.current, last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 960) setMenuOpen(false); };
    document.addEventListener("keydown", onKey); window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(focusFrame); document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [menuOpen]);
  const copyEmail = async () => { try { await navigator.clipboard.writeText(config.contact.email); setCopied(true); setCopyError(false); clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 3000); } catch { setCopyError(true); } };
  const sectionHref = (section: string) => `${projectsOnly ? "/" : ""}#${section.toLowerCase()}`;
  const roles = ["Hardware & Network Technician", "Creative Problem Solver", "Technology Enthusiast"];
  const orbitIcons = [FiCpu, FiWifi, FaPython, FiMonitor, FaWindows, FiTool];
  return <div className="portfolio">
    <a className="skip-link" href="#main-content">Skip to content</a><div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
    <header className="site-header"><div className="shell nav-inner"><Link to="/" className="wordmark" aria-label="Aathithya home">AATH<span>ITHYA</span><b>.</b></Link><nav aria-label="Main navigation" className="desktop-nav">{sections.map(item => <a key={item} href={sectionHref(item)} aria-current={!projectsOnly && active === item.toLowerCase() ? "location" : undefined}>{item}</a>)}</nav><QuickNavigation /><a className="nav-contact" href={sectionHref("Contact")}>Let’s talk <FiArrowUpRight /></a><button ref={menuButton} className="menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <FiX /> : <FiMenu />}</button></div>{menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{sections.map(item => <a key={item} href={sectionHref(item)} onClick={() => setMenuOpen(false)}>{item}<FiArrowUpRight /></a>)}<a href={sectionHref("Services")} onClick={() => setMenuOpen(false)}>Services<FiArrowUpRight /></a><a href={sectionHref("Gallery")} onClick={() => setMenuOpen(false)}>Gallery<FiArrowUpRight /></a><Link to="/play" onClick={() => setMenuOpen(false)}>Play chess<FiArrowUpRight /></Link></nav>}</header>
    <main id="main-content">
      {projectsOnly ? <section className="shell project-page" id="projects"><Link className="text-link" to="/">← Back to home</Link><SectionTitle level="h1" label="Portfolio" title="Ideas made" accent="tangible." text="A closer look at my hands-on work in hardware and engineering." /><ProjectCard /></section> : <>
      <section id="home" className="hero shell"><div className="hero-copy"><span className="availability"><i />Let’s build something together</span><p className="hero-hello">Hi, I’m</p><h1 className="gradient-text">Aathithya<br />Kanapathy<span className="name-dot">.</span></h1><div className="hero-role">I’m a <span key={role}>{roles[role]}</span><b aria-hidden="true">|</b></div><p className="hero-description">Connecting people and technology.<br />From reliable hardware to smarter networks, I bring a practical approach to every technical challenge.</p><div className="hero-actions"><a className="button button-primary" href="#contact">Get in touch <FiArrowUpRight /></a><a className="button button-outline" href="#projects">View my work <FiArrowRight /></a><a className="cv-link" href="/cv/Aathithya.pdf" download><FiDownload /> Download CV</a></div><div className="hero-social"><a href={config.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href={config.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a><a href={config.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a><span /><p><FiMapPin />{config.social.location}</p></div></div>
      <div className="hero-visual"><div className="orbit-system"><div className="orbit-ring ring-one" /><div className="orbit-ring ring-two" /><div className="orbit-ring ring-three" /><div className="portrait"><img src="/images/mypic.jpeg" alt="Aathithya Kanapathy wearing a suit" /></div>{orbitIcons.map((Icon, index) => <span className={`orbit-icon orbit-icon-${index}`} key={index} style={{ "--delay": `${index * -.7}s` } as CSSProperties}><Icon /></span>)}<span className="orbit-spark spark-one" /><span className="orbit-spark spark-two" /></div><div className="portrait-caption glass"><span className="caption-icon"><FiCpu /></span><div><strong>Built on curiosity.</strong><span>Driven by real-world solutions.</span></div><i /></div></div>
      <div className="hero-bottom"><span>HARDWARE. NETWORKS. POSSIBILITIES.</span><a href="#about">Scroll to explore <FiArrowDown /></a><span className="hero-number">01 — 06</span></div></section>
      <div className="expertise-strip"><div className="shell">{["Computer Hardware", "Networking", "CCTV Systems", "Web Technologies", "ICT Support"].map(item => <span key={item}><i />{item}</span>)}</div></div>
      <section id="about" className="section shell"><SectionTitle label="A little about me" title="Curious mind." accent="Practical hands." /><div className="about-grid"><figure className="about-photo"><img src="/images/Aathy.jpeg" alt="Illustrated portrait of Aathithya at a technology workspace" loading="lazy" /><figcaption><span>BEHIND THE TECHNOLOGY</span><strong>Aathithya Kanapathy</strong></figcaption></figure><div className="about-copy"><span className="mini-label">01 / THE PERSON BEHIND THE WORK</span><h3>I enjoy understanding how things work.<br /><span>And making them work better.</span></h3><p>{config.developer.description}</p><p>My interests extend into web development, graphic design, and entrepreneurship. I’m eager to bring my technical skills to education, training, and technology-driven environments.</p><div className="about-facts"><div><strong>NVQ 4</strong><span>Hardware & networking</span></div><div><strong>Hands-on</strong><span>Practical technical skills</span></div><div><strong>Sri Lanka</strong><span>Based in Kilinochchi</span></div></div><a href="#contact" className="text-link">Let’s connect <FiArrowRight /></a></div></div></section>
      <TechnicalSkills />
      <section id="services" className="section shell"><SectionTitle label="What I do" title="Everyday problems." accent="Thoughtful solutions." text="Practical support, from the components inside a computer to the networks that connect us." /><div className="services-grid">{services.map(({ Icon, title, text, tags }, index) => <article className="service-card" key={title}><div className="service-top"><Icon /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p><ul>{tags.map(tag => <li key={tag}><FiCheck />{tag}</li>)}</ul></article>)}</div></section>
      <section id="projects" className="section section-tinted"><div className="shell"><div className="section-title-row"><SectionTitle label="Selected work" title="Learning by" accent="building." text="Turning technical curiosity into something you can put to work." /><Link className="text-link" to="/myworks">All projects <FiArrowUpRight /></Link></div><ProjectCard /></div></section>
      <section id="experience" className="section shell"><SectionTitle label="Education & training" title="Every chapter." accent="A step forward." text="The learning and training that shape my approach to technology." /><div className="journey">{config.experiences.map((experience, index) => <article className="journey-item" key={experience.period}><div className="journey-year">{experience.period}<span>{index === 0 ? "LATEST STUDIES" : "EDUCATION & TRAINING"}</span></div><div className="journey-dot" /><div className="journey-content"><span className="mini-label">{experience.company}</span><h3>{experience.position}</h3><p>{experience.description}</p><div className="tags">{experience.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div></article>)}</div></section>
      <PortfolioShowcase /><PortfolioGallery /><section className="play-invitation shell"><div><span className="eyebrow">A little break?</span><h3>Good conversations start with a move.</h3><p>Step into the chess room and try a game.</p></div><Link className="button button-outline" to="/play">Let’s play chess <FiArrowUpRight /></Link></section>
      <section id="contact" className="section contact-section"><div className="shell"><SectionTitle label="Get in touch" title="Let’s make" accent="it work." text="Have a technical challenge, an opportunity, or an idea? I’d love to hear from you." /><div className="contact-grid"><div className="contact-details-column"><div className="contact-message"><span className="mini-label">YOUR NEXT CONNECTION STARTS HERE</span><h3>A conversation.<br />A new possibility.</h3><p>Whether it’s hardware, networking, or a new collaboration, let’s talk about what you have in mind.</p><a className="button button-primary" href={`mailto:${config.contact.email}`}>Say hello <FiArrowUpRight /></a></div><div className="contact-methods glass"><div className="contact-method"><span className="method-icon"><FiMail /></span><div><span>Email me</span><a href={`mailto:${config.contact.email}`}>{config.contact.email}</a></div><button className="copy-button" onClick={copyEmail} aria-label="Copy email address">{copied ? <FiCheck /> : <FiCopy />}</button></div><div className="contact-method"><span className="method-icon"><FiPhone /></span><div><span>Give me a call</span><a href="tel:+94743842935">{config.contact.phone}</a></div><FiArrowUpRight /></div><div className="contact-method"><span className="method-icon"><FiMapPin /></span><div><span>Based in</span><strong>{config.social.location}</strong></div></div><p className="copy-status" role="status">{copied ? "Email address copied." : copyError ? "Copy unavailable. Select the email address above or open your email app." : "Let’s turn a hello into something great."}</p></div></div><ContactForm /></div></div></section>
      </>}
    </main><PortfolioFooter />
  </div>;
}
