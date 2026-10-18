import { Link } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUp, FiDownload } from "react-icons/fi";
import { config } from "../config";
import "./styles/PortfolioFooter.css";

export default function PortfolioFooter() {
  return <footer className="portfolio-footer"><div className="shell"><div className="footer-main"><div className="footer-brand"><Link className="wordmark" to="/">AATH<span>ITHYA</span><b>.</b></Link><p>Connecting people and technology through practical, thoughtful solutions.</p></div><nav aria-label="Footer navigation"><a href="/#home">Home</a><a href="/#about">About</a><a href="/#skills">Skills</a><a href="/#gallery">Gallery</a><a href="/#contact">Contact</a></nav><div className="footer-social"><a href={config.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href={config.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a><a href={config.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a><a href="#main-content" className="footer-top" aria-label="Back to top"><FiArrowUp /></a></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} {config.developer.fullName}. All rights reserved.</p><a href="/cv/Aathithya.pdf" download><FiDownload /> Download CV</a><span>{config.social.location}</span></div></div></footer>;
}
