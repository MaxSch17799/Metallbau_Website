import {
  BadgeCheck,
  BriefcaseBusiness,
  Clock,
  DraftingCompass,
  Hammer,
  Lightbulb,
  MapPin,
  PenTool,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export type Lang = "de" | "en";

export const brand = {
  // Provisional public name. Change here once the final company name is chosen.
  name: "Metallbau Schimmel",
  shortName: "Schimmel",
  owner: "Maximilian Schimmel",
  phone: "+49 176 98472569",
  email: "metallbau.schimmel@gmail.com",
  location: "Seeheim, Deutschland",
};

export const routes = {
  home: "/",
  projects: "/projekte",
  request: "/anfrage",
  about: "/ueber-mich",
  ideas: "/ideen-generator",
  legal: "/impressum",
  privacy: "/datenschutz",
};

export const copy = {
  de: {
    nav: {
      projects: "Projekte",
      request: "Anfrage",
      about: "Ueber mich",
      call: "Anrufen",
    },
    hero: {
      kicker: "Metallbau aus Seeheim",
      title: "Metall & Holz nach Mass.",
      text:
        "Sonderanfertigungen fuer Moebel, Tore, Treppen, Balkone, Reparaturen und technische Planung - praezise gefertigt, sauber montiert und persoenlich abgestimmt.",
      primary: "Projekt anfragen",
      secondary: "Arbeiten ansehen",
      stats: ["Metall & Holz", "CAD-Planung", "Innen & Aussen"],
    },
    sections: {
      services: "Leistungen",
      servicesText: "Von der ersten Idee bis zur fertigen Konstruktion.",
      featured: "Ausgewaehlte Arbeiten",
      process: "Ablauf",
      about: "Direkt vom Macher",
      request: "Anfrage stellen",
      contact: "Kontakt",
      projects: "Projekte & Faehigkeiten",
      soon: "Coming soon",
    },
    serviceCta: "Anfragen",
    process: [
      ["01", "Beratung", "Ziel, Ort, Funktion und Stil werden geklaert."],
      ["02", "Planung", "Bei Bedarf mit CAD, Skizzen und technischen Details."],
      ["03", "Fertigung", "Metall, Holz und Zukaufteile werden passend umgesetzt."],
      ["04", "Montage", "Vor Ort montiert, geliefert oder versendet nach Absprache."],
    ],
    aboutTeaser:
      "Ich verbinde praktische Metallbauerfahrung mit CAD, Elektrotechnik und Engineering. Dadurch kann ich nicht nur schweissen und bauen, sondern auch unklare Ideen in belastbare Konzepte uebersetzen.",
    requestTeaser:
      "Beschreiben Sie Ihr Vorhaben und fuegen Sie Fotos, Skizzen oder Masse hinzu. Ich melde mich mit einer realistischen Einschaetzung.",
    contactHours: "Mo-Fr 08:00-17:00",
    flexibleHours:
      "Sollten Sie uns ausserhalb dieser Zeiten erreichen wollen, melden Sie sich gern trotzdem. Wenn es passt, nehmen wir Ihren Anruf entgegen oder rufen zeitnah zurueck.",
    form: {
      name: "Name",
      email: "E-Mail",
      phone: "Telefon",
      location: "Ort / PLZ",
      type: "Projektart",
      message: "Nachricht",
      files: "Bilder oder Skizzen",
      submit: "Anfrage vorbereiten",
      consent: "Ich bin mit der Kontaktaufnahme zu meiner Anfrage einverstanden.",
      success: "Anfrage vorbereitet. Der echte Versand und die Datenbank-Anbindung folgen im naechsten Schritt.",
    },
    ideas: {
      teaser: "Ideen-Generator",
      password: "Passwort",
      unlock: "Oeffnen",
      wrong: "Passwort pruefen",
    },
    legal: {
      title: "Impressum",
      text: "Die rechtlichen Angaben werden ergaenzt, sobald Name, Anschrift und weitere Pflichtangaben final feststehen.",
    },
    privacy: {
      title: "Datenschutz",
      text: "Die Datenschutzerklaerung wird vor dem Livegang finalisiert, besonders fuer Kontaktformular, Datei-Uploads und spaetere KI-Funktionen.",
    },
  },
  en: {
    nav: {
      projects: "Projects",
      request: "Request",
      about: "About",
      call: "Call",
    },
    hero: {
      kicker: "Metalwork from Seeheim",
      title: "Custom metal and woodwork.",
      text:
        "Furniture, gates, stairs, balconies, repairs and technical planning from one place - precisely made, cleanly installed and personally coordinated.",
      primary: "Start a request",
      secondary: "View work",
      stats: ["Metal & wood", "CAD planning", "Indoor & outdoor"],
    },
    sections: {
      services: "Services",
      servicesText: "From the first idea to the finished construction.",
      featured: "Selected work",
      process: "Process",
      about: "Directly from the maker",
      request: "Send a request",
      contact: "Contact",
      projects: "Projects & skills",
      soon: "Coming soon",
    },
    serviceCta: "Request",
    process: [
      ["01", "Consultation", "Goal, place, function and style are clarified."],
      ["02", "Planning", "With CAD, sketches and technical details where useful."],
      ["03", "Fabrication", "Metal, wood and bought-in parts are built to fit."],
      ["04", "Delivery", "Installed on site, delivered or shipped by agreement."],
    ],
    aboutTeaser:
      "I combine hands-on metalworking experience with CAD, electrical engineering and aerospace engineering. That helps me turn unclear ideas into practical, buildable concepts.",
    requestTeaser:
      "Describe your project and add photos, sketches or measurements. I will respond with a realistic first assessment.",
    contactHours: "Mon-Fri 08:00-17:00",
    flexibleHours:
      "You can also try outside those hours. If it fits, I will take the call or get back to you soon.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      location: "Location / postcode",
      type: "Project type",
      message: "Message",
      files: "Images or sketches",
      submit: "Prepare request",
      consent: "I agree to be contacted about my request.",
      success: "Request prepared. Real sending and database storage will be connected next.",
    },
    ideas: {
      teaser: "Idea generator",
      password: "Password",
      unlock: "Open",
      wrong: "Check password",
    },
    legal: {
      title: "Legal notice",
      text: "The legal details will be added once name, address and required business details are final.",
    },
    privacy: {
      title: "Privacy",
      text: "The privacy policy will be finalized before launch, especially for the contact form, uploads and future AI features.",
    },
  },
} satisfies Record<Lang, Record<string, unknown>>;

export const services = [
  {
    icon: Hammer,
    de: ["Metallbau", "Tore, Treppen, Balkone, Gelaender und individuelle Konstruktionen."],
    en: ["Metalwork", "Gates, stairs, balconies, railings and custom structures."],
  },
  {
    icon: Ruler,
    de: ["Moebel & Innenraum", "Tische, Regale, Gestelle und Einzelstuecke aus Metall und Holz."],
    en: ["Furniture & interiors", "Tables, shelves, frames and one-off pieces in metal and wood."],
  },
  {
    icon: Wrench,
    de: ["Schweissen & Reparatur", "Reparaturen, Anpassungen und praktische Loesungen fuer Metallteile."],
    en: ["Welding & repair", "Repairs, adjustments and practical solutions for metal parts."],
  },
  {
    icon: DraftingCompass,
    de: ["CAD & Planung", "Skizzen, technische Zeichnungen und saubere Vorbereitung."],
    en: ["CAD & planning", "Sketches, technical drawings and structured preparation."],
  },
  {
    icon: Lightbulb,
    de: ["Licht & Objekte", "Gestalterische Einzelstuecke mit Material, Licht und Funktion."],
    en: ["Lighting & objects", "Designed one-off pieces with material, light and function."],
  },
  {
    icon: PenTool,
    de: ["Sonderloesungen", "Breite Engineering-Erfahrung fuer Projekte ausserhalb des Standards."],
    en: ["Custom solutions", "Broad engineering experience for projects outside the standard range."],
  },
];

export const proofPoints = [
  { icon: MapPin, de: "Basis in Seeheim", en: "Based in Seeheim" },
  { icon: ShieldCheck, de: "Praezise Fertigung", en: "Precise fabrication" },
  { icon: BriefcaseBusiness, de: "Metallbau-Erfahrung", en: "Metalworking experience" },
  { icon: BadgeCheck, de: "Engineering-Hintergrund", en: "Engineering background" },
  { icon: Clock, de: "Mo-Fr erreichbar", en: "Available Mon-Fri" },
  { icon: Sparkles, de: "Innen & Aussen", en: "Indoor & outdoor" },
];

export const projects = [
  {
    image: "/projects/balkon-gelaender.webp",
    category: { de: "Aussenbereich", en: "Exterior" },
    title: { de: "Balkon- und Gelaenderanlage", en: "Balcony and railing system" },
    text: {
      de: "Metallkonstruktion fuer ein Wohnhaus mit klarer Linienfuehrung.",
      en: "Metal construction for a residential building with clean lines.",
    },
  },
  {
    image: "/projects/metall-holz-schreibtisch.webp",
    category: { de: "Moebel", en: "Furniture" },
    title: { de: "Schreibtisch aus Metall und Holz", en: "Metal and wood desk" },
    text: {
      de: "Massiver Rahmen mit heller Holzplatte fuer einen funktionalen Arbeitsplatz.",
      en: "Solid frame with a light wood top for a functional workspace.",
    },
  },
  {
    image: "/projects/metall-holz-regal.webp",
    category: { de: "Innenraum", en: "Interior" },
    title: { de: "Regal- und Bettloesung", en: "Shelf and bed solution" },
    text: {
      de: "Kombination aus Stahlrahmen und Holzflaechen fuer den Innenraum.",
      en: "Combination of steel frame and wood surfaces for an interior space.",
    },
  },
  {
    image: "/projects/aussentreppe-gelaender.webp",
    category: { de: "Aussenbereich", en: "Exterior" },
    title: { de: "Aussentreppe mit Gelaender", en: "Outdoor stairs with railing" },
    text: {
      de: "Robuste Treppen- und Gelaenderkonstruktion fuer den Alltag.",
      en: "Robust stair and railing construction for everyday use.",
    },
  },
  {
    image: "/projects/leuchtobjekt.webp",
    category: { de: "Designobjekt", en: "Design object" },
    title: { de: "Leuchtobjekt", en: "Light object" },
    text: {
      de: "Einzelstueck mit Metallform, Licht und dekorativer Wirkung.",
      en: "One-off piece combining metal form, light and decorative effect.",
    },
  },
  {
    image: "/projects/tor-werkstatt.webp",
    category: { de: "Fertigung", en: "Fabrication" },
    title: { de: "Tor in Fertigung", en: "Gate in fabrication" },
    text: {
      de: "Werkstattarbeit mit Rahmen, Gitterstruktur und Beschlaegen.",
      en: "Workshop fabrication with frame, grid structure and fittings.",
    },
  },
  {
    image: "/projects/metallblume.webp",
    category: { de: "Objekt", en: "Object" },
    title: { de: "Metallblume", en: "Metal flower" },
    text: {
      de: "Dekoratives Einzelstueck mit geschweissten und geformten Details.",
      en: "Decorative one-off piece with welded and formed details.",
    },
  },
  {
    image: "/projects/rahmen-fertigung.webp",
    category: { de: "Prozess", en: "Process" },
    title: { de: "Rahmenbau in der Werkstatt", en: "Frame build in the workshop" },
    text: {
      de: "Konstruktion und Abstimmung einer Metallstruktur vor der Fertigstellung.",
      en: "Construction and fitting of a metal structure before finishing.",
    },
  },
];

export const missingImageSlots = [
  {
    de: "Portraitfoto fuer die Ueber-mich-Seite",
    en: "Portrait photo for the About page",
  },
  {
    de: "Logo oder Wortmarke",
    en: "Logo or wordmark",
  },
  {
    de: "Sauber fotografierte Moebel in fertigen Raeumen",
    en: "Clean photos of finished furniture in finished rooms",
  },
  {
    de: "Detailfotos von Schweissnaehten, Oberflaechen und Material",
    en: "Detail photos of welds, surfaces and material",
  },
  {
    de: "CAD- oder technische Zeichnungsbeispiele",
    en: "CAD or technical drawing examples",
  },
];
