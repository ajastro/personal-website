import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("Loading...");
  const [activeSection, setActiveSection] = useState("about");

  // Call your backend /api/hello
  useEffect(() => {
    const apiBase =
      process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api";

    fetch(`${apiBase}/hello`)
      .then((res) => res.text())
      .then((text) => setGreeting(text))
      .catch((err) => {
        console.error(err);
        setGreeting("Could not reach backend. Is it running?");
      });
  }, []);

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

  // Track which section is active for nav highlight
  useEffect(() => {
    const sectionIds = ["about", "experience", "projects", "contact"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      {/* TOP NAV BAR */}
      <header className="top-nav">
        <div className="top-nav-inner">
          <div
            className="top-nav-logo"
            onClick={() => scrollToSection("about")}
          >
            Your Name
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
            <a
              href="/resume.pdf"
              className="top-nav-resume"
              target="_blank"
              rel="noreferrer"
            >
              Download Résumé
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="page-shell">
        {/* LEFT COLUMN – Intro */}
        <section className="intro-column">
          <p className="intro-eyebrow">Hi, my name is</p>
          <h1 className="intro-name">Your Name</h1>
          <p className="intro-role">I build things for the web.</p>
          <p className="intro-text">
            I&apos;m a backend-leaning engineer who enjoys designing and building
            clean, reliable systems with Java, Spring Boot, React, and AWS.
          </p>
          <p className="intro-text">
            Right now I&apos;m focused on learning cloud architecture, improving my
            frontend skills, and building projects that showcase my journey.
          </p>

          <div className="intro-backend">
            <span className="intro-backend-label">Backend status</span>
            <span className="intro-backend-value">{greeting}</span>
          </div>

          <div className="intro-links">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="mailto:you@example.com">Email</a>
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
              Write a short bio here about who you are and what you&apos;re
              interested in. Mention your background, what you&apos;re learning,
              and what kinds of problems you like to solve.
            </p>
            <p>
              Example: I enjoy working across the stack but I&apos;m especially
              interested in backend APIs, data flows, and deploying services to
              AWS. I like taking ideas from &quot;rough sketch&quot; to something
              real that people can use.
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
                    <h3>Senior Engineer · Company Name</h3>
                    <span className="timeline-meta">2023 – Present</span>
                  </header>
                  <p>
                    Briefly describe what you did here: designed and maintained
                    backend services, improved reliability and performance, and
                    collaborated with frontend and product teams.
                  </p>
                  <div className="tag-row">
                    <span className="tag">Java</span>
                    <span className="tag">Spring Boot</span>
                    <span className="tag">AWS</span>
                  </div>
                </div>
              </article>

              <article className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <header className="timeline-header">
                    <h3>Engineer / Internship · Other Company</h3>
                    <span className="timeline-meta">2021 – 2023</span>
                  </header>
                  <p>
                    Another short summary: built features, fixed bugs, and
                    shipped code that improved user experience. Mention any
                    specific stack or tools you used.
                  </p>
                  <div className="tag-row">
                    <span className="tag">React</span>
                    <span className="tag">TypeScript</span>
                    <span className="tag">PostgreSQL</span>
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
                  React on the frontend and a Spring Boot API on the backend,
                  hosted on AWS.
                </p>
                <div className="tag-row">
                  <span className="tag">React</span>
                  <span className="tag">Spring Boot</span>
                  <span className="tag">AWS</span>
                </div>
              </article>

              <article className="project-item">
                <header className="project-header">
                  <h3>Example Project 2</h3>
                  <span className="project-meta">Side project</span>
                </header>
                <p>
                  Replace this with a real project. Describe what problem it
                  solves and what you learned while building it.
                </p>
                <div className="tag-row">
                  <span className="tag">Java</span>
                  <span className="tag">REST API</span>
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
              I&apos;m open to hearing about roles, projects, or collaborations.
              The form below is a placeholder—you can later wire it up to your
              backend.
            </p>
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("In the future, this will send a message to your backend!");
              }}
            >
              <div className="form-row">
                <label htmlFor="name">Name</label>
                <input id="name" type="text" required />
              </div>
              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required />
              </div>
              <div className="form-row">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="4" required />
              </div>
              <button type="submit">Send (placeholder)</button>
            </form>
          </section>

          <footer className="page-footer reveal">
            <p>
              © {new Date().getFullYear()} Your Name · Built with React &amp;
              Spring Boot
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
