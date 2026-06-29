import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Image as ImageIcon,
  LockKeyhole,
  Maximize2,
  Mail,
  Menu,
  MessageCircle,
  Minimize2,
  Phone,
  Send,
  Upload,
  X,
} from "lucide-react";
import { FormEvent, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { brand, copy, Lang, missingImageSlots, projects, routes, services, serviceShowcases } from "./content";

type PageKey = "home" | "projects" | "serviceDetail" | "projectDetail" | "request" | "about" | "ideas" | "legal" | "privacy";
type HomeSection = "leistungen" | "projekte-home" | "ueber-mich-home" | "kontakt-home";
type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const homeSectionIds: HomeSection[] = ["leistungen", "projekte-home", "ueber-mich-home", "kontakt-home"];

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

type RequestStatus = "idle" | "submitting" | "success" | "error";

export function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const stored = window.localStorage.getItem("lang");
    return stored === "en" ? "en" : "de";
  });
  const [page, setPage] = useState<PageKey>(() => getPageFromPath(window.location.pathname));
  const [slug, setSlug] = useState(() => getSlugFromPath(window.location.pathname));
  const [activeSection, setActiveSection] = useState<HomeSection | null>(null);
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

  useEffect(() => {
    if (page !== "home") return;

    const updateActiveSection = () => {
      let current: HomeSection | null = null;
      const anchor = window.innerHeight * 0.38;

      for (const id of homeSectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= anchor) {
          current = id;
        }
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [page]);

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
      <Header lang={lang} setLang={setLang} navigate={navigate} page={page} activeSection={activeSection} />
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
  activeSection,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  navigate: (path: string, targetId?: string) => void;
  page: PageKey;
  activeSection: HomeSection | null;
}) {
  const [open, setOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<Record<string, boolean>>({
    services: false,
    projects: false,
    legal: false,
  });
  const t = copy[lang];
  const nav = [
    { section: "leistungen", label: t.nav.services, subPath: routes.home },
    { section: "projekte-home", label: t.nav.projects, subPath: routes.projects },
    { section: "ueber-mich-home", label: t.nav.about, subPath: routes.about },
    { section: "kontakt-home", label: t.nav.contact, subPath: routes.request },
  ] as const;
  const subpageItems = [
    {
      id: "services",
      label: t.nav.services as string,
      path: routes.home,
      targetId: "leistungen" as HomeSection,
      children: serviceShowcases.map((item) => ({ label: item.title[lang], path: servicePath(item.slug) })),
    },
    {
      id: "projects",
      label: t.nav.projects as string,
      path: routes.projects,
      children: projects.map((item) => ({ label: item.title[lang], path: projectPath(item.slug) })),
    },
    {
      id: "request",
      label: t.nav.request as string,
      path: routes.request,
    },
    {
      id: "about",
      label: t.nav.about as string,
      path: routes.about,
    },
    {
      id: "ideas",
      label: t.ideas.teaser as string,
      path: routes.ideas,
    },
    {
      id: "legal",
      label: lang === "de" ? "Rechtliches" : "Legal",
      children: [
        { label: t.legal.title as string, path: routes.legal },
        { label: t.privacy.title as string, path: routes.privacy },
      ],
    },
  ];

  const onNav = (path: string, targetId?: string) => {
    navigate(path, targetId);
    setOpen(false);
  };

  const toggleMenuItem = (id: string) => {
    setExpandedMenu((current) => ({ ...current, [id]: !current[id] }));
  };

  const onSectionNav = (item: (typeof nav)[number]) => {
    if (page === "home") {
      onNav(routes.home, item.section);
      return;
    }
    onNav(item.subPath, item.subPath === routes.home ? item.section : undefined);
  };

  const onMobileSectionNav = (section: HomeSection) => {
    onNav(routes.home, section);
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
          {nav.map((item) => (
            <button
              className={(page === "home" && activeSection === item.section) || (page !== "home" && pathToPage[item.subPath] === page) ? "active" : ""}
              key={item.section}
              onClick={() => onSectionNav(item)}
            >
              {item.label}
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
          <button className="icon-btn subpage-menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={lang === "de" ? "Unterseiten öffnen" : "Open subpages"}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <nav className="mobile-section-tabs" aria-label={lang === "de" ? "Bereiche" : "Sections"}>
        {nav.map((item) => (
          <button className={activeSection === item.section ? "active" : ""} key={`mobile-${item.section}`} onClick={() => onMobileSectionNav(item.section)}>
            {item.label}
          </button>
        ))}
      </nav>
      {open && (
        <nav className="subpage-menu-panel" aria-label={lang === "de" ? "Unterseiten" : "Subpages"}>
          <span className="subpage-menu-kicker">{lang === "de" ? "Unterseiten" : "Subpages"}</span>
          {subpageItems.map((item) => (
            <section className={item.children && expandedMenu[item.id] ? "menu-branch is-expanded" : "menu-branch"} key={item.id}>
              <div className="menu-branch-row">
                {item.path ? (
                  <button className="menu-branch-main" onClick={() => onNav(item.path, item.targetId)}>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <span className="menu-branch-main menu-branch-label">{item.label}</span>
                )}
                {item.children && (
                  <button
                    className="menu-branch-toggle"
                    onClick={() => toggleMenuItem(item.id)}
                    aria-expanded={Boolean(expandedMenu[item.id])}
                    aria-label={lang === "de" ? `${item.label} öffnen` : `Open ${item.label}`}
                  >
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
              {item.children && expandedMenu[item.id] && (
                <div className="menu-branch-children">
                  {item.children.map((link) => (
                    <button key={link.path} onClick={() => onNav(link.path)}>
                      <span>{link.label}</span>
                      <ChevronRight size={15} />
                    </button>
                  ))}
                </div>
              )}
            </section>
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
                <span>Sonderanfertigungen</span>
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
            <button className="text-btn" onClick={() => navigate(routes.home, "projekte-home")}>
              {lang === "de" ? "Projekte ansehen" : "View projects"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-media">
            <img src="/projects/balkon-gelaender.webp" alt="" />
          </div>
          <button className="hero-badge" onClick={() => navigate(routes.about)}>
            <strong>{lang === "de" ? "Handwerk aus Seeheim" : "Craft from Seeheim"}</strong>
            <span>{lang === "de" ? "Seit 2012" : "Since 2012"}</span>
          </button>
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
        <div className="showcase-actions">
          <button className="text-btn" onClick={() => navigate(routes.request)}>
            {t.hero.primary}
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <section className="section-band capabilities-band">
        <SectionIntro title={t.nav.services} text={lang === "de" ? "Schwerpunkte, die sich je nach Projekt kombinieren lassen." : "Focus areas that can be combined depending on the project."} />
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

      <section className="about-teaser" id="ueber-mich-home">
        <div className="portrait-placeholder">
          <ImageIcon size={24} />
          <span>{lang === "de" ? "Portrait / Werkstattfoto" : "Portrait / workshop photo"}</span>
        </div>
        <div>
          <span className="eyebrow">{t.nav.about}</span>
          <h2>{brand.owner}</h2>
          <p>{t.aboutTeaser}</p>
          <button className="text-btn" onClick={() => navigate(routes.about)}>
            {t.nav.about}
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      <section className="contact-home-section" id="kontakt-home">
        <div className="request-band">
          <div>
            <span className="eyebrow">{t.nav.contact}</span>
            <h2>{t.requestTeaser}</h2>
          </div>
          <button className="primary-btn" onClick={() => navigate(routes.request)}>
            {t.hero.primary}
            <Send size={18} />
          </button>
        </div>
        <div className="process-section contact-process">
          <SectionIntro title={t.sections.process} text={lang === "de" ? "So läuft eine Anfrage typischerweise ab." : "How a request usually moves forward."} />
          <div className="process-grid">
            {t.process.map(([step, title, text]) => (
              <article key={step}>
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
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
  const baseSpeed = variant === "services" ? 34 : 28;
  const boostSpeed = variant === "services" ? 158 : 132;
  const baseDirection = useRef(1);
  const targetVelocity = useRef(baseSpeed);
  const currentVelocity = useRef(baseSpeed);
  const position = useRef(0);
  const frame = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);
  const dragState = useRef<{ pointerId: number; pointerType: string; startX: number; startPosition: number; lastX: number; lastTime: number; velocity: number; dragging: boolean } | null>(null);
  const suppressClick = useRef(false);
  const trackHovering = useRef(false);
  const controlHoverDirection = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const repeated = useMemo(() => [...items, ...items, ...items], [items]);

  const normalizePosition = (loopWidth: number) => {
    if (loopWidth <= 0) return;
    while (position.current <= -loopWidth) position.current += loopWidth;
    while (position.current > 0) position.current -= loopWidth;
  };

  const applyTransform = () => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${position.current}px, 0, 0)`;
    }
  };

  const setTarget = (direction: number, speed: number) => {
    targetVelocity.current = direction * speed;
  };

  const syncTarget = () => {
    if (controlHoverDirection.current !== null) {
      setTarget(controlHoverDirection.current, boostSpeed);
      return;
    }
    if (trackHovering.current) {
      targetVelocity.current = 0;
      return;
    }
    setTarget(baseDirection.current, baseSpeed);
  };

  const pause = () => {
    trackHovering.current = true;
    targetVelocity.current = 0;
  };

  const resume = () => {
    trackHovering.current = false;
    syncTarget();
  };

  const boost = (direction: number) => {
    controlHoverDirection.current = direction;
    setTarget(direction, boostSpeed);
  };

  const releaseBoost = () => {
    controlHoverDirection.current = null;
    syncTarget();
  };

  const chooseDirection = (direction: number) => {
    baseDirection.current = direction;
    controlHoverDirection.current = null;
    trackHovering.current = false;
    setTarget(direction, baseSpeed);
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const tick = (time: number) => {
      const track = trackRef.current;
      if (!track) return;

      const delta = lastTime.current === null ? 0 : Math.min((time - lastTime.current) / 1000, 0.05);
      lastTime.current = time;

      const loopWidth = track.scrollWidth / 3;
      if (!dragState.current?.dragging) {
        currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.058;
        position.current -= currentVelocity.current * delta;
      }

      normalizePosition(loopWidth);
      track.style.transform = `translate3d(${position.current}px, 0, 0)`;
      frame.current = window.requestAnimationFrame(tick);
    };

    frame.current = window.requestAnimationFrame(tick);
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  const onViewportPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const now = performance.now();
    dragState.current = {
      pointerId: event.pointerId,
      pointerType: event.pointerType,
      startX: event.clientX,
      startPosition: position.current,
      lastX: event.clientX,
      lastTime: now,
      velocity: 0,
      dragging: false,
    };
    pause();
  };

  const onViewportPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== event.pointerId) return;

    const movement = event.clientX - state.startX;
    if (!state.dragging && Math.abs(movement) > 9) {
      state.dragging = true;
      suppressClick.current = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }

    if (!state.dragging) return;

    const track = trackRef.current;
    if (!track) return;

    const now = performance.now();
    const elapsed = Math.max(now - state.lastTime, 12);
    const instantVelocity = ((event.clientX - state.lastX) / elapsed) * 1000;
    state.velocity = state.velocity * 0.35 + instantVelocity * 0.65;
    state.lastX = event.clientX;
    state.lastTime = now;

    currentVelocity.current = 0;
    targetVelocity.current = 0;
    position.current = state.startPosition + movement;
    normalizePosition(track.scrollWidth / 3);
    applyTransform();
  };

  const finishViewportPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const state = dragState.current;
    if (!state || state.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragState.current = null;
    setDragging(false);

    if (state.dragging) {
      const momentum = Math.max(-430, Math.min(430, -state.velocity));
      currentVelocity.current = momentum;
      if (state.pointerType !== "mouse") {
        trackHovering.current = false;
      }
      syncTarget();
      window.setTimeout(() => {
        suppressClick.current = false;
      }, 90);
    } else {
      resume();
    }
  };

  const onCardClick = (event: ReactMouseEvent<HTMLButtonElement>, item: T) => {
    if (suppressClick.current) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onSelect(item);
  };

  const directionLabel = (direction: number) => {
    if (direction < 0) return lang === "de" ? "Richtung links" : "Scroll left";
    return lang === "de" ? "Richtung rechts" : "Scroll right";
  };

  return (
    <div className={`smooth-scroller ${variant}`}>
      <button
        className="scroller-control scroller-control-left"
        aria-label={directionLabel(-1)}
        onClick={() => chooseDirection(-1)}
        onPointerCancel={releaseBoost}
        onPointerDown={() => boost(-1)}
        onPointerEnter={() => boost(-1)}
        onPointerLeave={releaseBoost}
        onPointerUp={() => chooseDirection(-1)}
        type="button"
      >
        <ChevronLeft size={28} />
      </button>
      <div
        className={dragging ? "scroller-viewport is-dragging" : "scroller-viewport"}
        onPointerCancel={finishViewportPointer}
        onPointerDown={onViewportPointerDown}
        onPointerLeave={() => {
          if (!dragState.current) resume();
        }}
        onPointerMove={onViewportPointerMove}
        onPointerUp={finishViewportPointer}
      >
        <div className="scroller-track" onBlurCapture={resume} onFocusCapture={pause} onPointerEnter={pause} onPointerLeave={resume} ref={trackRef}>
          {repeated.map((item, index) => (
            <button className="showcase-card" key={`${item.slug}-${index}`} onClick={(event) => onCardClick(event, item)}>
              <img src={item.image} alt="" />
              <span>{("category" in item ? item.category[lang] : variant === "services" ? copy[lang].sections.services : copy[lang].sections.projects) as string}</span>
              <strong>{item.title[lang]}</strong>
              <p>{("short" in item ? item.short[lang] : item.text[lang]) as string}</p>
              {"generated" in item && item.generated && <em>{lang === "de" ? "Platzhalter" : "Placeholder"}</em>}
            </button>
          ))}
        </div>
      </div>
      <button
        className="scroller-control scroller-control-right"
        aria-label={directionLabel(1)}
        onClick={() => chooseDirection(1)}
        onPointerCancel={releaseBoost}
        onPointerDown={() => boost(1)}
        onPointerEnter={() => boost(1)}
        onPointerLeave={releaseBoost}
        onPointerUp={() => chooseDirection(1)}
        type="button"
      >
        <ChevronRight size={28} />
      </button>
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

function ProjectsPage({ lang, navigate }: { lang: Lang; navigate: (path: string) => void }) {
  const t = copy[lang];

  return (
    <section className="page-shell">
      <PageHero
        eyebrow={t.nav.projects}
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
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileSiteKey, setTurnstileSiteKey] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<HTMLDivElement | null>(null);
  const turnstileWidgetRef = useRef<string>("");

  const fileSummary = useMemo(() => files.map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`), [files]);
  const resetTurnstile = () => {
    if (turnstileWidgetRef.current && window.turnstile?.reset) {
      window.turnstile.reset(turnstileWidgetRef.current);
    }
    setTurnstileToken("");
  };

  useEffect(() => {
    let cancelled = false;
    fetch("/api/config")
      .then((response) => (response.ok ? response.json() : null))
      .then((config) => {
        if (!cancelled && config?.turnstileSiteKey) {
          setTurnstileSiteKey(config.turnstileSiteKey);
        }
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileRef.current || turnstileWidgetRef.current) return;

    const renderTurnstile = () => {
      if (!window.turnstile || !turnstileRef.current || turnstileWidgetRef.current) return;
      turnstileWidgetRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: setTurnstileToken,
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });
    };

    const existingScript = document.getElementById("turnstile-script");
    if (existingScript) {
      renderTurnstile();
      return;
    }

    const script = document.createElement("script");
    script.id = "turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", renderTurnstile);
    document.head.appendChild(script);
  }, [turnstileSiteKey]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (files.length > 5 || files.some((file) => file.size > 10 * 1024 * 1024)) {
      setStatus("error");
      setMessage(t.form.fileLimit);
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    form.set("sourceLanguage", lang);
    form.set("fileSummary", JSON.stringify(fileSummary));
    if (turnstileSiteKey) {
      form.set("cf-turnstile-response", turnstileToken);
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/request", {
        method: "POST",
        body: form,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.code === "backend_not_configured" ? t.form.backendMissing : result.message || t.form.error);
      }

      window.localStorage.setItem(
        "metallbau-last-request",
        JSON.stringify({
          createdAt: new Date().toISOString(),
          requestId: result.requestId,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          location: form.get("location"),
          type: form.get("type"),
          files: fileSummary,
        }),
      );
      setStatus("success");
      setMessage(t.form.success);
      setFiles([]);
      setConsent(false);
      formElement.reset();
      resetTurnstile();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : t.form.error);
      resetTurnstile();
    }
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
        <label className="visually-hidden" aria-hidden="true">
          Firma
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
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
            name="files"
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
          <input checked={consent} name="consent" onChange={(event) => setConsent(event.currentTarget.checked)} required type="checkbox" />
          <span>{t.form.consent}</span>
        </label>
        {turnstileSiteKey && (
          <div className="turnstile-field">
            <div ref={turnstileRef} />
          </div>
        )}
        <button className="primary-btn" disabled={!consent || status === "submitting" || Boolean(turnstileSiteKey && !turnstileToken)} type="submit">
          {status === "submitting" ? t.form.sending : t.form.submit}
          <Send size={18} />
        </button>
        {message && (
          <p className={status === "error" ? "form-message error-message" : "form-message success-message"}>
            <CheckCircle2 size={18} />
            {message}
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
