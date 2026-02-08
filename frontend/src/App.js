import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState("about");

  // Smooth scroll helper for nav buttons with offset for fixed nav
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navHeight = 72; // adjust if you change nav height
    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY || window.pageYOffset;
    const targetY = rect.top + scrollTop - navHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  // Scroll reveal (fade + slide)
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Parallax effect for sections with .parallax
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".parallax");
      const scrollY = window.scrollY;

      items.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.1");
        const offset = scrollY * speed;
        el.style.setProperty("--parallax-offset", `${offset}px`);
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade + slight scale on hero name as you scroll
  useEffect(() => {
    const handleNameScroll = () => {
      const name = document.querySelector(".intro-name");
      if (!name) return;

      const scroll = window.scrollY;
      const fadeEnd = 200;
      const progress = Math.min(1, scroll / fadeEnd);

      const opacity = 1 - progress * 0.7;
      const scale = 1 - progress * 0.05;
      const translateY = -progress * 10;

      name.style.opacity = `${opacity}`;
      name.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    };

    window.addEventListener("scroll", handleNameScroll);
    handleNameScroll();
    return () => window.removeEventListener("scroll", handleNameScroll);
  }, []);

  // Track active section based on scroll position
useEffect(() => {
  const sectionIds = ["about", "experience", "projects", "contact"];

  const handleScroll = () => {
    const navHeight = 72; // keep in sync with scrollToSection
    const scrollPos = window.scrollY + navHeight + 10;

    let currentId = sectionIds[0];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const sectionTop = el.offsetTop;

      if (sectionTop <= scrollPos) {
        currentId = id;
      }
    });

    setActiveSection(currentId);
  };

  window.addEventListener("scroll", handleScroll);
  // run once on mount so it's correct on refresh
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  return (
    <div className="App">
      {/* Ambient animated background blobs */}
      <div className="ambient-bg">
        <div className="ambient-blob ambient-blob-1" />
        <div className="ambient-blob ambient-blob-2" />
        <div className="ambient-blob ambient-blob-3" />
      </div>

      {/* TOP NAV BAR */}
      <header className="top-nav">
        <div className="top-nav-inner">
          <div
            className="top-nav-logo"
            onClick={() => scrollToSection("about")}
          >
            Arjun Vashistha
          </div>
          <nav className="top-nav-links">
            <button
              className={activeSection === "about" ? "active" : ""}
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className={activeSection === "experience" ? "active" : ""}
              onClick={() => scrollToSection("experience")}
            >
              Experience
            </button>
            <button
              className={activeSection === "projects" ? "active" : ""}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>
            <button
              className={activeSection === "contact" ? "active" : ""}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="page-shell">
        {/* LEFT COLUMN – Intro */}
        <section className="intro-column">
          {/* Glowing hero card with gradient sweep */}
          <div className="intro-hero">
            <div className="intro-hero-glow" />
            <p className="intro-eyebrow">Hi, my name is</p>
            <h1 className="intro-name">Arjun Vashistha</h1>
            <p className="intro-role">I build things for the web.</p>
            <p className="intro-text">
              I&apos;m a backend-leaning engineer who enjoys designing and
              building clean, reliable systems with Java, Spring Boot, React,
              and AI tools.
            </p>
            <p className="intro-text">
              Right now I&apos;m focused on building AI projects,
              improving my frontend skills, and building products that showcase
              my journey.
            </p>
          </div>

          <div className="intro-links">
            <a
              href="https://github.com/ajastro"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/arjunvashistha/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </section>

        {/* RIGHT COLUMN – Content */}
        <main className="content-column">
          {/* About */}
          <section
            id="about"
            className="content-section reveal parallax"
            data-speed="0.06"
          >
            <h2>About</h2>
            <p>
              Assistant Vice President and Software Engineer specializing in large-scale database migrations, production stability, and applied AI solutions in regulated financial environments. Proven track record of delivering enterprise systems ahead of schedule while improving performance, reliability, and operational efficiency.
              I like taking ideas from &quot;rough sketch&quot; to
              something real that people can use.
            </p>
          </section>

          {/* Experience */}
          <section
            id="experience"
            className="content-section reveal parallax"
            data-speed="0.08"
          >
            <h2>Experience</h2>
            <div className="timeline stagger">
              <article className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <header className="timeline-header">
                    <h3>Software Engineer II (AVP) · Financial Services</h3>
                    <span className="timeline-meta">2025 – Present</span>
                  </header>
                  <p>
                    I am a Java-focused software engineer specializing in the end-to-end deployment of high-scale enterprise platforms and AI-driven automation tools. By combining deep expertise in data migration and SQL optimization with LLM-based RAG implementations, I bridge the gap between cutting-edge AI integration and the rigorous reliability requirements of mission-critical production environments.
                  </p>
                  <div className="tag-row">
                    <span className="tag">Java</span>
                    <span className="tag">Spring Boot</span>
                    <span className="tag">SQL</span>
                  </div>
                </div>
              </article>

              <article className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <header className="timeline-header">
                    <h3>Global Technology Analyst · Financial Services</h3>
                    <span className="timeline-meta">2023 – 2025</span>
                  </header>
                  <p>
                    I excel at hardening the operational reliability of mission-critical systems by implementing robust monitoring and Python-based automation. By streamlining CI/CD pipelines to halve deployment times and leading complex delivery cycles for large-scale data platforms, I ensure that enterprise-grade software remains resilient and high-performing under pressure.
                  </p>
                  <div className="tag-row">
                    <span className="tag">Python</span>
                    <span className="tag">SQL</span>
                    <span className="tag">Monitoring Tools</span>
                  </div>
                </div>
              </article>
            </div>
          </section>

          {/* Projects */}
          <section
            id="projects"
            className="content-section reveal parallax"
            data-speed="0.12"
          >
            <h2>Projects</h2>
            <p className="section-intro">
              A few things I&apos;ve built or am currently working on:
            </p>
            <div className="project-list stagger">
              <article className="project-item">
                <header className="project-header">
                  <h3>Personal Website</h3>
                  <span className="project-meta">2025 · In progress</span>
                </header>
                <p>
                  The site you&apos;re looking at now. A full-stack project using
                  React on the frontend and a Spring Boot API on the backend.
                </p>
                <div className="tag-row">
                  <span className="tag">React</span>
                  <span className="tag">Spring Boot</span>
                  <span className="tag">GitHub</span>
                </div>
              </article>

              <article className="project-item">
                <header className="project-header">
                  <h3>Data Base Migration</h3>
                  <span className="project-meta">2025 · Delivered</span>
                </header>
                <p>
                  Migrated a large-scale database from one system to another. Optimized the process to reduce downtime and improve performance.
                </p>
                <div className="tag-row">
                  <span className="tag">Java</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">CassandraDB</span>
                </div>
              </article>
            </div>
          </section>

          {/* Contact */}
          <section
            id="contact"
            className="content-section reveal parallax"
            data-speed="0.15"
          >
            <h2>Contact</h2>
            <p>
              You can reach out on LinkedIn.
            </p>
            <div className="intro-links">
              <a
                href="https://www.linkedin.com/in/arjunvashistha/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </section>

          <footer className="page-footer reveal">
            <p>
              © {new Date().getFullYear()} Arjun Vashistha 
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
