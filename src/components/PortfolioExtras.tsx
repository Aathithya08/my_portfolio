import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight, FiChevronLeft, FiChevronRight, FiDownload, FiMail, FiMonitor, FiSearch, FiSmartphone, FiX, FiZoomIn } from "react-icons/fi";
import { config } from "../config";
import "./styles/PortfolioExtras.css";

export function QuickNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const items = [
    ...["Home", "About", "Skills", "Services", "Projects", "Experience", "Showcase", "Gallery", "Contact"].map(label => ({ label, href: `/#${label.toLowerCase()}`, hint: "Jump to section" })),
    { label: "All projects", href: "/myworks", hint: "Explore my work" },
    { label: "Play chess", href: "/play", hint: "Take a break" },
    { label: "Download CV", href: "/cv/Aathithya.pdf", hint: "Open PDF" },
  ].filter(item => `${item.label} ${item.hint}`.toLowerCase().includes(query.toLowerCase()));
  const open = () => { setQuery(""); if (!dialog.current?.open) dialog.current?.showModal(); };
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close(); else open();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  const visit = (href: string) => {
    dialog.current?.close();
    if (href.endsWith(".pdf")) { window.open(href, "_blank", "noopener,noreferrer"); return; }
    navigate(href);
  };
  return <>
    <button type="button" className="quick-nav-trigger" onClick={open} aria-label="Open quick navigation"><FiSearch /><span>Quick access</span><kbd>Ctrl K</kbd></button>
    <dialog className="quick-dialog" ref={dialog} aria-labelledby="quick-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="quick-dialog-inner"><div className="dialog-heading"><h2 id="quick-title">Where would you like to go?</h2><button type="button" onClick={() => dialog.current?.close()} aria-label="Close quick navigation"><FiX /></button></div>
        <label className="quick-search"><FiSearch /><input autoFocus aria-label="Search pages and sections" placeholder="Search sections, projects, CV…" value={query} onChange={event => setQuery(event.target.value)} onKeyDown={event => { if (event.key === "ArrowDown") { event.preventDefault(); dialog.current?.querySelector<HTMLButtonElement>(".quick-results button")?.focus(); } if (event.key === "Enter" && items[0]) visit(items[0].href); }} /></label>
        <div className="quick-results" aria-label="Search results">{items.map(item => <button type="button" key={item.label} onClick={() => visit(item.href)}><span>{item.label}<small>{item.hint}</small></span><FiArrowUpRight /></button>)}{!items.length && <p role="status">No matches. Try “skills”, “gallery”, or “CV”.</p>}</div><p className="dialog-hint">Type to search · Tab to navigate · Enter to select · Esc to close</p>
      </div>
    </dialog>
  </>;
}

const photos = [
  { src: "/images/img.jpeg", title: "Aathithya at SLGTI", category: "Personal", caption: "A moment from my technical learning journey." },
  { src: "/images/mypic.jpeg", title: "Aathithya Kanapathy", category: "Personal", caption: "My professional portrait." },
  { src: "/images/Aathy.jpeg", title: "My creative side", category: "Illustration", caption: "An illustrated technology workspace from my portfolio." },
];
export function PortfolioGallery() {
  const [selected, setSelected] = useState(0);
  const [category, setCategory] = useState("All");
  const dialog = useRef<HTMLDialogElement>(null);
  const photo = photos[selected];
  return <section id="gallery" className="section shell">
    <div className="section-heading"><span className="eyebrow">Behind the scenes</span><h2>A little more <span className="gradient-text">of me.</span></h2><p>Snapshots and illustrations from my world, beyond the technical details.</p></div>
    <div className="filter-pills" aria-label="Gallery filters">{["All", "Personal", "Illustration"].map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
    <div className="gallery-grid">{photos.map((item, index) => (category === "All" || category === item.category) && <button type="button" className="gallery-tile" key={item.src} onClick={() => { setSelected(index); dialog.current?.showModal(); }} aria-label={`Enlarge ${item.title}`}><img src={item.src} alt={item.title} loading="lazy" /><span className="gallery-caption"><span><small>{item.category}</small><strong>{item.title}</strong></span><FiZoomIn /></span></button>)}</div>
    <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }} onKeyDown={event => { if (event.key === "ArrowRight") setSelected(value => (value + 1) % photos.length); if (event.key === "ArrowLeft") setSelected(value => (value + photos.length - 1) % photos.length); }}>
      <div className="gallery-dialog-inner"><div className="dialog-heading"><h2 id="gallery-title">{photo.title}</h2><button type="button" onClick={() => dialog.current?.close()} aria-label="Close image preview"><FiX /></button></div><img src={photo.src} alt={photo.title} /><div className="gallery-dialog-footer"><button type="button" aria-label="Previous image" onClick={() => setSelected(value => (value + photos.length - 1) % photos.length)}><FiChevronLeft /></button><p aria-live="polite">{photo.caption}<small>{selected + 1} / {photos.length}</small></p><button type="button" aria-label="Next image" onClick={() => setSelected(value => (value + 1) % photos.length)}><FiChevronRight /></button></div></div>
    </dialog>
  </section>;
}

export function ContactForm() {
  const [status, setStatus] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = String(data.get("subject")).trim();
    const body = `Hi Aathithya,\n\n${String(data.get("message")).trim()}\n\nFrom: ${String(data.get("name")).trim()}\nReply to: ${String(data.get("email")).trim()}`;
    window.location.href = `mailto:${config.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app was requested. Review the draft and send it there. If it didn’t open, copy your message and email me directly.");
  };
  return <div className="contact-form glass"><span className="eyebrow">Have something in mind?</span><h3>Let’s start a conversation.</h3><p>Write a message below to prepare an email in your email app.</p><form onSubmit={submit} aria-label="Prepare a message to Aathithya"><div className="form-pair"><label>Your name<input name="name" autoComplete="name" placeholder="Your name" minLength={2} maxLength={100} required /></label><label>Your email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required /></label></div><label>Subject<input name="subject" placeholder="What do you have in mind?" minLength={3} maxLength={160} required /></label><label>Your message<textarea name="message" placeholder="Tell me a little about your idea or opportunity…" minLength={10} maxLength={3000} rows={5} required /></label><button type="submit" className="button button-primary">Prepare email <FiArrowRight /></button><p className="form-status" role="status">{status || "You’ll review and send the message in your email app."}</p></form><a className="text-link" href={`mailto:${config.contact.email}`}><FiMail /> Or email me directly <FiArrowUpRight /></a></div>;
}

export function PortfolioShowcase() {
  const [mobile, setMobile] = useState(false);
  return <section id="showcase" className="section section-tinted"><div className="shell"><div className="showcase-grid"><div className="section-heading"><span className="eyebrow">Made for every screen</span><h2>A digital home.<br /><span className="gradient-text">Built around me.</span></h2><p>This portfolio brings my hardware skills, learning journey, and creative interests together in one place.</p><a className="text-link" href="#home">Explore the portfolio <FiArrowUpRight /></a><a className="text-link" href="/cv/Aathithya.pdf" download><FiDownload /> Get my CV</a></div><div className="showcase-preview"><div className="showcase-toolbar"><span>THIS PORTFOLIO / RESPONSIVE PREVIEW</span><div><button type="button" aria-label="Show desktop preview" aria-pressed={!mobile} onClick={() => setMobile(false)}><FiMonitor /></button><button type="button" aria-label="Show mobile preview" aria-pressed={mobile} onClick={() => setMobile(true)}><FiSmartphone /></button></div></div><div className={`preview-device ${mobile ? "preview-mobile" : ""}`}><div className="preview-browser" aria-hidden="true"><i /><i /><i /><span>aathithya / portfolio</span></div><div className="preview-content"><div className="preview-nav">AATHITHYA<span>ABOUT · WORK · CONTACT</span></div><div className="preview-hero"><div><small>HELLO, I’M</small><strong className="gradient-text">Aathithya<br />Kanapathy.</strong><p>Connecting people and technology.</p><span className="preview-cta">Get in touch ↗</span></div><div className="preview-portrait"><img src="/images/mypicnbg.png" alt="" loading="lazy" /></div></div><div className="preview-cards"><span>HARDWARE</span><span>NETWORKING</span><span>CREATIVITY</span></div></div></div><p className="preview-note">Illustrative layout preview · Switch between desktop and mobile</p></div></div><div className="workflow-steps">{[{title:"Understand",text:"Start with the problem and the people who need a solution."},{title:"Build",text:"Bring practical skills and careful attention to the details."},{title:"Improve",text:"Test, learn, and keep finding ways to make things work better."}].map((step,index) => <div key={step.title}><span>0{index + 1}</span><h3>{step.title}<FiArrowRight /></h3><p>{step.text}</p></div>)}</div></div></section>;
}
