import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Image as ImageIcon,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Upload,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { brand, copy, Lang, missingImageSlots, projects, proofPoints, routes, services, serviceTiles } from "./content";

type PageKey = "home" | "projects" | "request" | "about" | "ideas" | "legal" | "privacy";

const pathToPage: Record<string, PageKey> = {
  [routes.home]: "home",
  [routes.projects]: "projects",
  [routes.request]: "request",
  [routes.about]: "about",
  "/ueber-mich": "about",
  [routes.ideas]: "ideas",
  [routes.legal]: "legal",
  [routes.privacy]: "privacy",
};

const projectTypes = [
  "Metall- und Holzmöbel",
  "Tor / Geländer / Zaun",
  "Treppe / Balkon",
  "Reparatur",
  "CAD / technische Zeichnung",
  "Sonderanfertigung",
];

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = window.localStorage.getItem("lang");
    return stored === "en" ? "en" : "de";
  });
  const [page, setPage] = useState<PageKey>(() => pathToPage[window.location.pathname] ?? "home");
  const t = copy[lang];

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onPop = () => setPage(pathToPage[window.location.pathname] ?? "home");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (path: string, targetId?: string) => {
    window.history.pushState({}, "", path);
    setPage(pathToPage[path] ?? "home");
    if (targetId) {
      window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" }), 40);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Header lang={lang} setLang={setLang} navigate={navigate} page={page} />
      <main>
        {page === "home" && <HomePage lang={lang} navigate={navigate} />}
        {page === "projects" && <ProjectsPage lang={lang} navigate={navigate} />}
        {page === "request" && <RequestPage lang={lang} />}
        {page === "about" && <AboutPage lang={lang} navigate={navigate} />}
        {page === "ideas" && <IdeasPage lang={lang} />}
        {page === "legal" && <SimplePage title={t.legal.title} text={t.legal.text} />}
        {page === "privacy" && <SimplePage title={t.privacy.title} text={t.privacy.text} />}
      </main>
      <Footer lang={lang} navigate={navigate} />
    </>
  );
}

function Header({
  lang,
  setLang,
  navigate,
  page,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  navigate: (path: string, targetId?: string) => void;
  page: PageKey;
}) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const nav = [
    [routes.home, t.nav.services, "leistungen"],
    [routes.projects, t.nav.projects],
    [routes.about, t.nav.about],
    [routes.home, t.nav.planning, "planung-cad"],
    [routes.request, t.nav.contact],
  ] as const;

  const onNav = (path: string, targetId?: string) => {
    navigate(path, targetId);
    setOpen(false);
  };

  return (
    <header className="site-header">
      <div className="topline">
        <span>{brand.location}</span>
        <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>
          <Phone size={14} />
          {brand.phone}
        </a>
      </div>
      <div className="nav-shell">
        <button className="brand-lockup" onClick={() => onNav(routes.home)} aria-label={brand.name}>
          <span className="brand-mark">MS</span>
          <span>
            <strong>{brand.name}</strong>
            <small>{lang === "de" ? "Metall. Holz. Planung." : "Metal. Wood. Planning."}</small>
          </span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([path, label, targetId]) => (
            <button className={pathToPage[path] === page ? "active" : ""} key={`${path}-${label}`} onClick={() => onNav(path, targetId)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="lang-toggle" onClick={() => setLang(lang === "de" ? "en" : "de")}>
            <Globe2 size={16} />
            {lang === "de" ? "EN" : "DE"}
          </button>
          <button className="outline-btn desktop-only" onClick={() => onNav(routes.request)}>
            {t.nav.request}
            <ArrowRight size={16} />
          </button>
          <button className="icon-btn mobile-menu" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {nav.map(([path, label, targetId]) => (
            <button key={`${path}-${label}`} onClick={() => onNav(path, targetId)}>
              {label}
              <ChevronRight size={18} />
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function HomePage({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  const t = copy[lang];
  const featured = projects.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">{t.hero.kicker}</span>
          <h1>
            {lang === "de" ? (
              <>
                <span>
                  Sonder<span className="mobile-title-break" aria-hidden="true" />anfertigungen
                </span>
                <span>aus Metall und Holz.</span>
              </>
            ) : (
              t.hero.title
            )}
          </h1>
          <span className="hero-accent-line" />
          <strong className="hero-line">{t.hero.line}</strong>
          <p>{t.hero.text}</p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => navigate(routes.request)}>
              {lang === "de" ? "Anfrage starten" : "Start request"}
              <ArrowRight size={18} />
            </button>
            <button className="text-btn" onClick={() => navigate(routes.projects)}>
              {lang === "de" ? "Projekte ansehen" : "View projects"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-media">
            <img src="/projects/balkon-gelaender.webp" alt="" />
          </div>
          <div className="hero-badge">
            <strong>{lang === "de" ? "Handwerk aus Seeheim" : "Craft from Seeheim"}</strong>
            <span>{lang === "de" ? "persönlich" : "personal"}</span>
          </div>
          <div className="quick-request-card">
            <strong>{lang === "de" ? "Ihr Projekt. Unsere Lösung." : "Your project. A practical solution."}</strong>
            <p>{lang === "de" ? "Kurz beschreiben - ich melde mich schnellstmöglich." : "Describe it briefly and I will get back to you."}</p>
            <input readOnly placeholder={lang === "de" ? "Ihr Name" : "Your name"} />
            <input readOnly placeholder={lang === "de" ? "Telefon oder E-Mail" : "Phone or email"} />
            <button onClick={() => navigate(routes.request)}>
              {lang === "de" ? "Anfrage starten" : "Start request"}
              <ArrowRight size={16} />
            </button>
            <a href={`https://wa.me/${brand.whatsapp}`}>
              <MessageCircle size={16} />
              WhatsApp / {brand.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="service-image-strip" aria-label={t.sections.services}>
        {serviceTiles.map((tile) => (
          <article className={tile.generated ? "generated-tile" : undefined} key={tile.de}>
            <img src={tile.image} alt="" />
            <span>{tile[lang]}</span>
          </article>
        ))}
      </section>

      <section className="proof-strip" id="leistungen" aria-label="Highlights">
        {proofPoints.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.de}>
              <Icon size={18} />
              <span>{item[lang]}</span>
            </div>
          );
        })}
      </section>

      <section className="section-band capabilities-band">
        <SectionIntro title={t.sections.services} text={t.sections.servicesText} />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            const [title, text] = service[lang];
            return (
              <article className="service-card" key={title}>
                <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
                <Icon size={22} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="planning-section" id="planung-cad">
        <div className="planning-copy">
          <span className="eyebrow">{t.sections.planning}</span>
          <h2>{lang === "de" ? "Technische Planung, CAD und funktionale Prototypen." : "Technical planning, CAD and functional prototypes."}</h2>
          <p>
            {lang === "de"
              ? "Für Sonderanfertigungen kann ich Ideen in Skizzen, CAD-Modelle, technische Zeichnungen und einfache Funktionsprototypen übersetzen. Embedded-Systeme und Elektronik bleiben als Spezialfähigkeit sichtbar, bis echte Beispielarbeiten ergänzt werden."
              : "For custom work, I can translate ideas into sketches, CAD models, technical drawings and simple functional prototypes. Embedded systems and electronics remain visible as a specialist capability until real examples are added."}
          </p>
        </div>
        <div className="planning-media">
          <img src="/generated/cad-railing-placeholder.webp" alt="" />
          <img src="/generated/embedded-prototype-placeholder.webp" alt="" />
        </div>
      </section>

      <section className="split-section">
        <div className="sticky-intro">
          <SectionIntro
            title={t.sections.featured}
            text={lang === "de" ? "Echte Arbeiten statt generischer Stockbilder." : "Real work instead of generic stock imagery."}
          />
          <p>
            {lang === "de"
              ? "Die aktuelle Galerie nutzt Ihre erste Bildauswahl. Mit besseren finalen Fotos wird die Seite sofort hochwertiger wirken."
              : "The current gallery uses your first image selection. Better final photos will immediately make the site feel more premium."}
          </p>
        </div>
        <div className="featured-grid">
          {featured.map((project) => (
            <ProjectCard key={project.image} project={project} lang={lang} />
          ))}
        </div>
        <div className="section-action">
          <button className="outline-btn" onClick={() => navigate(routes.projects)}>
            {t.nav.projects}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="process-section">
        <SectionIntro title={t.sections.process} text={lang === "de" ? "Strukturiert genug für komplexe Details, pragmatisch genug für schnelle Lösungen." : "Structured enough for complex details, pragmatic enough for fast solutions."} />
        <div className="process-grid">
          {t.process.map(([step, title, text]) => (
            <article key={step}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-teaser">
        <div className="portrait-placeholder">
          <ImageIcon size={24} />
          <span>{lang === "de" ? "Portrait / Werkstattfoto" : "Portrait / workshop photo"}</span>
        </div>
        <div>
          <span className="eyebrow">{t.sections.about}</span>
          <h2>{brand.owner}</h2>
          <p>{t.aboutTeaser}</p>
          <button className="text-btn" onClick={() => navigate(routes.about)}>
            {t.nav.about}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="request-band">
        <div>
          <span className="eyebrow">{t.sections.request}</span>
          <h2>{t.requestTeaser}</h2>
        </div>
        <button className="primary-btn" onClick={() => navigate(routes.request)}>
          {t.hero.primary}
          <Send size={18} />
        </button>
      </section>
    </>
  );
}

function ProjectsPage({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  const t = copy[lang];

  return (
    <section className="page-shell">
      <PageHero
        eyebrow={t.sections.projects}
        title={lang === "de" ? "Metallbau, Möbel, Objekte und Werkstattpräzision." : "Metalwork, furniture, objects and workshop precision."}
        text={
          lang === "de"
            ? "Die Galerie nutzt aktuell Ihre erste Bildauswahl. Final sollten wir die besten Bilder sortieren, beschriften und für SEO umbenennen."
            : "The gallery currently uses the first image selection. Before launch, the strongest images should be sorted, captioned and renamed for SEO."
        }
      />
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.image} project={project} lang={lang} />
        ))}
      </div>
      <MissingImages lang={lang} />
      <div className="section-action">
        <button className="primary-btn" onClick={() => navigate(routes.request)}>
          {t.hero.primary}
          <Send size={18} />
        </button>
      </div>
    </section>
  );
}

function RequestPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [files, setFiles] = useState<File[]>([]);
  const [sent, setSent] = useState(false);
  const [consent, setConsent] = useState(false);

  const fileSummary = useMemo(() => files.map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`), [files]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      createdAt: new Date().toISOString(),
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      location: form.get("location"),
      type: form.get("type"),
      message: form.get("message"),
      files: fileSummary,
    };
    window.localStorage.setItem("metallbau-last-request", JSON.stringify(payload));
    setSent(true);
  };

  return (
    <section className="page-shell request-layout">
      <PageHero eyebrow={t.sections.request} title={t.requestTeaser} text={t.flexibleHours} />
      <aside className="contact-panel">
        <h2>{t.sections.contact}</h2>
        <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>
          <Phone size={18} />
          {brand.phone}
        </a>
        <a href={`https://wa.me/${brand.whatsapp}`}>
          <MessageCircle size={18} />
          WhatsApp
        </a>
        {brand.email && (
          <a href={`mailto:${brand.email}`}>
            <Mail size={18} />
            {brand.email}
          </a>
        )}
        <p>{t.contactHours}</p>
        <p>{lang === "de" ? "Sitz in Seeheim, Projekte nach Absprache." : "Based in Seeheim, projects by agreement."}</p>
      </aside>
      <form className="request-form" onSubmit={submit}>
        <div className="form-row">
          <label>
            {t.form.name}
            <input name="name" required autoComplete="name" />
          </label>
          <label>
            {t.form.email}
            <input name="email" required type="email" autoComplete="email" />
          </label>
        </div>
        <div className="form-row">
          <label>
            {t.form.phone}
            <input name="phone" autoComplete="tel" />
          </label>
          <label>
            {t.form.location}
            <input name="location" autoComplete="postal-code" />
          </label>
        </div>
        <label>
          {t.form.type}
          <select name="type" defaultValue={projectTypes[0]}>
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label>
          {t.form.message}
          <textarea name="message" required rows={7} />
        </label>
        <label className="upload-zone">
          <Upload size={22} />
          <span>{t.form.files}</span>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={(event) => setFiles(Array.from(event.currentTarget.files ?? []))}
          />
        </label>
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file) => (
              <span key={`${file.name}-${file.size}`}>{file.name}</span>
            ))}
          </div>
        )}
        <label className="consent-line">
          <input checked={consent} onChange={(event) => setConsent(event.currentTarget.checked)} type="checkbox" />
          <span>{t.form.consent}</span>
        </label>
        <button className="primary-btn" disabled={!consent} type="submit">
          {t.form.submit}
          <Send size={18} />
        </button>
        {sent && (
          <p className="success-message">
            <CheckCircle2 size={18} />
            {t.form.success}
          </p>
        )}
      </form>
    </section>
  );
}

function AboutPage({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  const t = copy[lang];

  return (
    <section className="page-shell about-page">
      <PageHero
        eyebrow={t.nav.about}
        title={brand.owner}
        text={
          lang === "de"
            ? "Metallbaupraxis, CAD, Elektrotechnik und Aerospace Engineering treffen auf handwerkliche Umsetzung für reale Projekte."
            : "Hands-on metalwork, CAD, electrical engineering and aerospace engineering meet practical execution for real projects."
        }
      />
      <div className="about-grid">
        <div className="portrait-placeholder large">
          <ImageIcon size={28} />
          <span>{lang === "de" ? "Portrait oder Werkstattbild" : "Portrait or workshop image"}</span>
        </div>
        <div className="about-copy">
          <h2>{lang === "de" ? "Präzision mit breitem technischem Hintergrund." : "Precision with a broad technical background."}</h2>
          <p>
            {lang === "de"
              ? "Ich bin in Seeheim verwurzelt und habe praktische Metallbauerfahrung gesammelt, unter anderem bei Metallbau Wendt. Dazu kommen internationale Stationen in den Niederlanden und Schweden sowie ein technischer Hintergrund in Elektrotechnik, CAD, Prototyping und Aerospace Engineering."
              : "I am rooted in Seeheim and gained hands-on metalworking experience in a local workshop. That is combined with international experience in the Netherlands and Sweden and a technical background in electrical engineering, CAD, prototyping and aerospace engineering."}
          </p>
          <p>
            {lang === "de"
              ? "Wichtig ist: Wenn ein Projekt unklar, ungewöhnlich oder technisch anspruchsvoll ist, kann ich es strukturiert planen und praktisch umsetzen. Jedes Vorhaben wird individuell besprochen."
              : "On the website this should not feel like a CV. The important point is: when a project is unclear, unusual or technically demanding, I can plan it clearly and build it practically."}
          </p>
          <button className="primary-btn" onClick={() => navigate(routes.request)}>
            {t.hero.primary}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function IdeasPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(window.sessionStorage.getItem("ideas-unlocked") === "true");
  const [wrong, setWrong] = useState(false);

  const unlock = (event: FormEvent) => {
    event.preventDefault();
    if (password === "MAX") {
      window.sessionStorage.setItem("ideas-unlocked", "true");
      setUnlocked(true);
      setWrong(false);
      return;
    }
    setWrong(true);
  };

  if (unlocked) {
    return <section className="generator-blank" aria-label="Generator preview" />;
  }

  return (
    <section className="page-shell gate-page">
      <form className="password-panel" onSubmit={unlock}>
        <LockKeyhole size={28} />
        <h1>{t.ideas.teaser}</h1>
        <label>
          {t.ideas.password}
          <input value={password} onChange={(event) => setPassword(event.currentTarget.value)} type="password" />
        </label>
        <button className="primary-btn" type="submit">
          {t.ideas.unlock}
          <ArrowRight size={18} />
        </button>
        {wrong && <p>{t.ideas.wrong}</p>}
      </form>
    </section>
  );
}

function Footer({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  const t = copy[lang];
  return (
    <footer className="site-footer">
      <div>
        <strong>{brand.name}</strong>
        <p>{lang === "de" ? "Sonderanfertigungen aus Metall und Holz." : "Custom work in metal and wood."}</p>
      </div>
      <div className="footer-links">
        <button onClick={() => navigate(routes.request)}>{t.nav.request}</button>
        <button onClick={() => navigate(routes.legal)}>{t.legal.title}</button>
        <button onClick={() => navigate(routes.privacy)}>{t.privacy.title}</button>
        <button className="subtle-link" onClick={() => navigate(routes.ideas)}>
          {t.sections.soon}: {t.ideas.teaser}
        </button>
      </div>
    </footer>
  );
}

function SectionIntro({ title, text }: { title: string; text: string }) {
  return (
    <div className="section-intro">
      <span className="eyebrow">{title}</span>
      <h2>{text}</h2>
    </div>
  );
}

function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="page-hero">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  );
}

function ProjectCard({ project, lang }: { project: (typeof projects)[number]; lang: Lang }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={project.image} alt={project.title[lang]} />
      </div>
      <div>
        <span>{project.category[lang]}</span>
        <h3>{project.title[lang]}</h3>
        <p>{project.text[lang]}</p>
      </div>
    </article>
  );
}

function MissingImages({ lang }: { lang: Lang }) {
  return (
    <section className="missing-section">
      <h2>{lang === "de" ? "Bildplätze für die finale Version" : "Image slots for the final version"}</h2>
      <div className="missing-grid">
        {missingImageSlots.map((slot) => (
          <div className="missing-card" key={slot.de}>
            <ImageIcon size={20} />
            <span>{slot[lang]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function SimplePage({ title, text }: { title: string; text: string }) {
  return (
    <section className="page-shell">
      <PageHero eyebrow={title} title={title} text={text} />
    </section>
  );
}
