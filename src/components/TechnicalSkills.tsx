import { useState, type CSSProperties } from "react";
import { FaCss3Alt, FaHtml5, FaJava, FaLinux, FaPython, FaWindows } from "react-icons/fa";
import { SiAdobephotoshop, SiJavascript } from "react-icons/si";
import { FiCheckCircle, FiCode, FiCpu, FiDatabase, FiGlobe, FiLayout, FiMessageCircle, FiMonitor, FiSettings, FiShield, FiTool, FiUsers, FiVideo, FiWifi } from "react-icons/fi";
import type { IconType } from "react-icons";
import { config } from "../config";
import "./styles/TechnicalSkills.css";

const categories = ["All", "Hardware & networking", "Software & web", "People & leadership"];
const icons: Record<string, IconType> = {
  "Computer Hardware": FiCpu, Networking: FiWifi, "LAN/WAN": FiGlobe, CCTV: FiVideo,
  Troubleshooting: FiTool, Windows: FaWindows, Linux: FaLinux, "Mac OS": FiMonitor,
  "Router Configuration": FiSettings, "IP Setup": FiGlobe, "PC Assembly": FiCpu,
  Maintenance: FiTool, "MS Office": FiLayout, "Adobe Photoshop": SiAdobephotoshop,
  Python: FaPython, JAVA: FaJava, HTML: FaHtml5, CSS: FaCss3Alt, JavaScript: SiJavascript,
  "Database Management": FiDatabase, "ICT Support": FiMonitor, "Graphic Design": FiLayout,
  "User Training": FiUsers, Management: FiUsers, Creativity: FiLayout,
  "Digital Marketing": FiGlobe, Communication: FiMessageCircle,
  "Critical Thinking": FiCode, Leadership: FiShield, "Problem Solving": FiCheckCircle,
};

export default function TechnicalSkills() {
  const [category, setCategory] = useState("All");
  const groups = Object.values(config.skills);
  const skills = groups.flatMap((group, index) => group.tools.map(name => ({ name, category: categories[index + 1], index })));
  const visible = skills.filter(skill => category === "All" || category === skill.category);
  return <section id="skills" className="section section-tinted">
    <div className="shell technical-skills">
      <div className="section-heading"><span className="eyebrow"><i />My expertise</span><h2>Technical <span className="gradient-text">Skills.</span></h2><p>The tools and practical skills I use to solve problems and bring ideas to life.</p></div>
      <div className="filter-pills" aria-label="Skill categories">{categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="skill-cloud" key={category} aria-label={`${category} skills`}>{visible.map((skill, index) => {
        const Icon = icons[skill.name] || FiCode;
        return <div className={`skill-pill skill-tone-${skill.index}`} key={skill.name} style={{ "--skill-delay": `${Math.min(index * .025, .45)}s` } as CSSProperties}><span className="skill-pill-fill" aria-hidden="true" /><Icon aria-hidden="true" /><span>{skill.name}</span></div>;
      })}</div>
      <p className="skill-result" role="status">{visible.length} skills · {category === "All" ? "Explore a category above" : category}</p>
      <div className="skill-notes">{groups.map((group, index) => (category === "All" || category === categories[index + 1]) && <details key={group.title}><summary>{categories[index + 1]}<span aria-hidden="true">+</span></summary><p>{group.details}</p></details>)}</div>
    </div>
  </section>;
}
