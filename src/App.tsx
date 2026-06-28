import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Globe2,
  Image as ImageIcon,
  LockKeyhole,
  Maximize2,
  Mail,
  Menu,
  MessageCircle,
  Minimize2,
  PencilLine,
  Phone,
  Send,
  Upload,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { brand, copy, Lang, missingImageSlots, projects, proofPoints, routes, services, serviceShowcases } from "./content";

type PageKey = "home" | "projects" | "serviceDetail" | "projectDetail" | "request" | "about" | "ideas" | "legal" | "privacy";

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

const getPageFromPath = (path: string): PageKey => {
  if (path.startsWith(`${routes.services}/`)) return "serviceDetail";
  if (path.startsWith(`${routes.projects}/`) && path !== routes.projects) return "projectDetail";
  return pathToPage[path] ?? "home";
};

const getSlugFromPath = (path: string) => decodeURIComponent(path.split("/").filter(Boolean).at(-1) ?? "");
const servicePath = (slug: string) => `${routes.services}/${slug}`;
const projectPath = (slug: string) => `${routes.projects}/${slug}`;

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
  const [page, setPage] = useState<PageKey>(() => getPageFromPath(window.location.pathname));
  const [slug, setSlug] = useState(() => getSlugFromPath(window.location.pathname));
  const t = copy[lang];

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onPop = () => {
      setPage(getPageFromPath(window.location.pathname));
      setSlug(getSlugFromPath(window.location.pathname));
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (path: string, targetId?: string) => {
    window.history.pushState({}, "", path);
    setPage(getPageFromPath(path));
    setSlug(getSlugFromPath(path));
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
        {page === "serviceDetail" && <ServiceDetailPage lang={lang} navigate={navigate} slug={slug} />}
        {page === "projectDetail" && <ProjectDetailPage lang={lang} navigate={navigate} slug={slug} />}
        {page === "request" && <RequestPage lang={lang} />}
        {page === "about" && <AboutPage lang={lang} navigate={navigate} />}
        {page === "ideas" && <IdeasPage lang={lang} />}
        {page === "legal" && <SimplePage title={t.legal.title} text={t.legal.text} />}
        {page === "privacy" && <SimplePage title={t.privacy.title} text={t.privacy.text} />}
      </main>
      <Footer lang={lang} navigate={navigate} />
      <FloatingRequestPanel lang={lang} navigate={navigate} />
      <MobileContactBar lang={lang} navigate={navigate} />
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
            <strong>
              <span className="brand-desktop">{brand.name}</span>
              <span className="brand-mobile">Schimmel</span>
            </strong>
            <small>{lang === "de" ? "Metallbau & Design" : "Metalwork & Design"}</small>
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
            <Globe2 className="lang-icon" size={16} />
            <span className={lang === "de" ? "active-lang" : undefined}>DE</span>
            <i>|</i>
            <span className={lang === "en" ? "active-lang" : undefined}>EN</span>
          </button>
          <a className="icon-btn mobile-call" href={`tel:${brand.phone.replaceAll(" ", "")}`} aria-label={t.nav.call}>
            <Phone size={21} />
          </a>
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

function HomePage({ lang, navigate }: { lang: Lang; navigate: (path: string, targetId?: string) => void }) {
  const t = copy[lang];

  return (
    <>
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">{t.hero.kicker}</span>
          <h1>
            {lang === "de" ? (
              <>
                <span>
                  Sonder<wbr />anfertigungen
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
        </div>
      </section>

      <section className="showcase-section service-showcase-section" id="leistungen">
        <div className="showcase-heading">
          <SectionIntro title={t.sections.services} text={t.sections.servicesText} />
        </div>
        <SmoothScroller
          items={serviceShowcases}
          lang={lang}
          onSelect={(item) => navigate(servicePath(item.slug))}
          variant="services"
        />
      </section>

      <section className="proof-strip" aria-label="Highlights">
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
        <SectionIntro title={t.sections.services} text={lang === "de" ? "Überblick über Leistungen und Schwerpunkte." : "Overview of services and focus areas."} />
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

      <section className="showcase-section project-showcase-section" id="projekte-home">
        <div className="showcase-heading with-action">
          <SectionIntro title={t.nav.projects} text={lang === "de" ? "Ausgewählte Arbeiten und aktuelle Bildauswahl." : "Selected work and current image selection."} />
          <button className="outline-btn" onClick={() => navigate(routes.projects)}>
            {lang === "de" ? "Projektseite öffnen" : "Open projects page"}
            <ArrowRight size={16} />
          </button>
        </div>
        <SmoothScroller
          items={projects}
          lang={lang}
          onSelect={(item) => navigate(projectPath(item.slug))}
          variant="projects"
        />
      </section>

      <section className="mobile-request-split">
        <div>
          <PenIcon />
          <h2>{lang === "de" ? "Ihr Projekt. Unsere Lösung." : "Your project. A practical solution."}</h2>
          <p>{lang === "de" ? "Ob Idee oder konkreter Plan - wir beraten Sie ehrlich und kompetent." : "Whether it is a rough idea or a concrete plan, we can discuss the next step."}</p>
        </div>
        <img src="/projects/metall-holz-tisch.webp" alt="" />
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

type SmoothItem = (typeof serviceShowcases)[number] | (typeof projects)[number];

function SmoothScroller<T extends SmoothItem>({
  items,
  lang,
  onSelect,
  variant,
}: {
  items: T[];
  lang: Lang;
  onSelect: (item: T) => void;
  variant: "services" | "projects";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const targetSpeed = useRef(34);
  const currentSpeed = useRef(34);
  const position = useRef(0);
  const frame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tick = (time: number) => {
      const track = trackRef.current;
      if (!track) return;

      const delta = lastTime.current === null ? 0 : Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      currentSpeed.current += (targetSpeed.current - currentSpeed.current) * 0.055;
      position.current -= currentSpeed.current * delta;

      const loopWidth = track.scrollWidth / 3;
      if (loopWidth > 0 && Math.abs(position.current) >= loopWidth) {
        position.current += loopWidth;
      }

      track.style.transform = `translate3d(${position.current}px, 0, 0)`;
      frame.current = window.requestAnimationFrame(tick);
    };

    frame.current = window.requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const slow = () => {
    targetSpeed.current = 0;
  };

  const resume = () => {
    targetSpeed.current = variant === "services" ? 34 : 28;
  };

  return (
    <div className={`smooth-scroller ${variant}`} onPointerEnter={slow} onPointerLeave={resume} onFocusCapture={slow} onBlurCapture={resume}>
      <div className="scroller-viewport">
        <div className="scroller-track" ref={trackRef}>
          {repeated.map((item, index) => (
            <button className="showcase-card" key={`${item.slug}-${index}`} onClick={() => onSelect(item)}>
              <img src={item.image} alt="" />
              <span>{("category" in item ? item.category[lang] : variant === "services" ? copy[lang].sections.services : copy[lang].sections.projects) as string}</span>
              <strong>{item.title[lang]}</strong>
              <p>{("short" in item ? item.short[lang] : item.text[lang]) as string}</p>
              {"generated" in item && item.generated && <em>{lang === "de" ? "Platzhalter" : "Placeholder"}</em>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingRequestPanel({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  const [open, setOpen] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const target = document.querySelector(".request-band");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setSettled(entry.isIntersecting), {
      rootMargin: "0px 0px -18% 0px",
      threshold: 0.18,
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!open) {
    return (
      <button className={settled ? "floating-request-tab is-settled" : "floating-request-tab"} onClick={() => setOpen(true)} aria-label={lang === "de" ? "Anfrage öffnen" : "Open request panel"}>
        <Maximize2 size={16} />
        <span>{lang === "de" ? "Anfrage" : "Request"}</span>
      </button>
    );
  }

  return (
    <aside className={settled ? "floating-request-panel is-open is-settled" : "floating-request-panel is-open"} aria-label={lang === "de" ? "Schnellanfrage" : "Quick request"}>
      <div className="floating-request-title">
        <strong>{lang === "de" ? "Ihr Projekt. Unsere Lösung." : "Your project. A practical solution."}</strong>
        <button onClick={() => setOpen(false)} aria-label={lang === "de" ? "Minimieren" : "Minimize"}>
          <Minimize2 size={17} />
        </button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate(routes.request);
        }}
      >
        <p>{lang === "de" ? "Kurz beschreiben - ich melde mich schnellstmöglich." : "Describe it briefly and I will get back to you."}</p>
        <input placeholder={lang === "de" ? "Ihr Name" : "Your name"} />
        <input placeholder={lang === "de" ? "Telefon oder E-Mail" : "Phone or email"} />
        <button type="submit">
          {lang === "de" ? "Anfrage starten" : "Start request"}
          <ArrowRight size={17} />
        </button>
      </form>
      <a href={`https://wa.me/${brand.whatsapp}`}>
        <MessageCircle size={18} />
        WhatsApp / {brand.phone}
      </a>
    </aside>
  );
}

function MobileContactBar({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  return (
    <div className="mobile-contact-bar">
      <a href={`tel:${brand.phone.replaceAll(" ", "")}`}>
        <Phone size={22} />
        <span>
          <strong>{brand.phone}</strong>
          <small>{lang === "de" ? "Mo-Fr 08-17" : "Mon-Fri 08-17"}</small>
        </span>
      </a>
      <button onClick={() => navigate(routes.request)}>
        <MessageCircle size={22} />
        <span>
          <strong>{lang === "de" ? "Jetzt Anfrage starten" : "Start a request"}</strong>
          <small>{lang === "de" ? "Unverbindlich & schnell" : "Quick first contact"}</small>
        </span>
      </button>
    </div>
  );
}

function PenIcon() {
  return <PencilLine size={25} />;
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
          <ProjectCard key={project.image} project={project} lang={lang} onClick={() => navigate(projectPath(project.slug))} />
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

function ServiceDetailPage({ lang, navigate, slug }: { lang: Lang; navigate: (path: string, targetId?: string) => void; slug: string }) {
  const service = serviceShowcases.find((item) => item.slug === slug);

  if (!service) {
    return <SimplePage title={lang === "de" ? "Leistung nicht gefunden" : "Service not found"} text={lang === "de" ? "Diese Leistung ist noch nicht angelegt." : "This service has not been added yet."} />;
  }

  const Icon = service.icon;

  return (
    <section className="page-shell detail-page">
      <div className="detail-hero">
        <div>
          <span className="eyebrow">{copy[lang].sections.services as string}</span>
          <h1>{service.title[lang]}</h1>
          <p>{service.detail[lang]}</p>
          <div className="detail-actions">
            <button className="outline-btn" onClick={() => navigate(routes.home, "leistungen")}>
              <ArrowRight size={16} />
              {lang === "de" ? "Zurück zu Leistungen" : "Back to services"}
            </button>
            <button className="primary-btn" onClick={() => navigate(routes.request)}>
              {copy[lang].hero.primary as string}
              <Send size={18} />
            </button>
          </div>
        </div>
        <div className="detail-main-image">
          <img src={service.image} alt="" />
          <span>
            <Icon size={18} />
            {service.title[lang]}
          </span>
        </div>
      </div>
      <div className="detail-gallery">
        {service.images.map((image) => (
          <img key={image} src={image} alt="" />
        ))}
      </div>
    </section>
  );
}

function ProjectDetailPage({ lang, navigate, slug }: { lang: Lang; navigate: (path: string, targetId?: string) => void; slug: string }) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <SimplePage title={lang === "de" ? "Projekt nicht gefunden" : "Project not found"} text={lang === "de" ? "Dieses Projekt ist noch nicht angelegt." : "This project has not been added yet."} />;
  }

  return (
    <section className="page-shell detail-page">
      <div className="detail-hero">
        <div>
          <span className="eyebrow">{project.category[lang]}</span>
          <h1>{project.title[lang]}</h1>
          <p>{project.text[lang]}</p>
          <p>
            {lang === "de"
              ? "Weitere Projektbilder und technische Details können später ergänzt werden, sobald die finale Bildauswahl steht."
              : "More project images and technical details can be added later once the final image selection is ready."}
          </p>
          <div className="detail-actions">
            <button className="outline-btn" onClick={() => navigate(routes.home, "projekte-home")}>
              <ArrowRight size={16} />
              {lang === "de" ? "Zurück zu Projekten" : "Back to projects"}
            </button>
            <button className="primary-btn" onClick={() => navigate(routes.request)}>
              {copy[lang].hero.primary as string}
              <Send size={18} />
            </button>
          </div>
        </div>
        <div className="detail-main-image">
          <img src={project.image} alt={project.title[lang]} />
          <span>{project.category[lang]}</span>
        </div>
      </div>
      <div className="detail-gallery">
        {project.images.map((image) => (
          <img key={image} src={image} alt="" />
        ))}
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

function ProjectCard({ project, lang, onClick }: { project: (typeof projects)[number]; lang: Lang; onClick?: () => void }) {
  return (
    <article
      className={onClick ? "project-card clickable-card" : "project-card"}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title[lang]} />
      </div>
      <div>
        <span>{project.category[lang]}</span>
        <h3>{project.title[lang]}</h3>
        <p>{project.text[lang]}</p>
        {onClick && (
          <button className="card-link" type="button">
            {lang === "de" ? "Ansehen" : "View"}
            <ArrowRight size={14} />
          </button>
        )}
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
