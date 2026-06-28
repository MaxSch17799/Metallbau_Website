import {
  BadgeCheck,
  DraftingCompass,
  Cpu,
  Hammer,
  MapPin,
  PenTool,
  Ruler,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

export type Lang = "de" | "en";

export const brand = {
  name: "Metallbau Schimmel",
  shortName: "Schimmel",
  owner: "Maximilian Schimmel",
  phone: "+49 176 98472569",
  whatsapp: "4917698472569",
  email: "",
  location: "Sitz in Seeheim",
};

export const routes = {
  home: "/",
  projects: "/projekte",
  request: "/anfrage",
  about: "/profil",
  ideas: "/ideen-generator",
  legal: "/impressum",
  privacy: "/datenschutz",
};

export const copy = {
  de: {
    nav: {
      services: "Leistungen",
      projects: "Projekte",
      request: "Anfrage",
      about: "Über mich",
      planning: "Planung & CAD",
      contact: "Kontakt",
      call: "Anrufen",
    },
    hero: {
      kicker: "Metallbau aus Seeheim",
      title: "Sonderanfertigungen aus Metall und Holz.",
      text:
        "Individuelle Metallarbeiten für innen und außen - präzise geplant, sauber gefertigt und persönlich abgestimmt.",
      primary: "Projekt anfragen",
      secondary: "Arbeiten ansehen",
      stats: ["Metall & Holz", "CAD-Planung", "Innen & Außen"],
      line: "Planung. Fertigung. Montage.",
    },
    sections: {
      services: "Leistungen",
      servicesText: "Von der ersten Idee bis zur fertigen Konstruktion.",
      featured: "Ausgewählte Arbeiten",
      process: "Ablauf",
      about: "Direkt vom Macher",
      request: "Anfrage stellen",
      contact: "Kontakt",
      projects: "Projekte & Fähigkeiten",
      planning: "Planung, CAD & Embedded",
      soon: "Coming soon",
    },
    serviceCta: "Anfragen",
    process: [
      ["01", "Beratung", "Ziel, Ort, Funktion und Stil werden geklärt."],
      ["02", "Planung", "Bei Bedarf mit CAD, Skizzen und technischen Details."],
      ["03", "Fertigung", "Metall, Holz und Zukaufteile werden passend umgesetzt."],
      ["04", "Montage", "Vor Ort montiert, geliefert oder versendet nach Absprache."],
    ],
    aboutTeaser:
      "Ich verbinde praktische Metallbauerfahrung, unter anderem aus meiner Zeit bei Metallbau Wendt, mit CAD, Elektrotechnik und Engineering. Dadurch kann ich nicht nur schweißen und bauen, sondern auch unklare Ideen in belastbare Konzepte übersetzen.",
    requestTeaser:
      "Beschreiben Sie Ihr Vorhaben und fügen Sie Fotos, Skizzen oder Maße hinzu. Ich melde mich mit einer realistischen Einschätzung.",
    contactHours: "Mo-Fr 08:00-17:00",
    flexibleHours:
      "Sollten Sie mich außerhalb dieser Zeiten erreichen wollen, melden Sie sich gern trotzdem. Wenn es passt, nehme ich Ihren Anruf entgegen oder rufe zeitnah zurück.",
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
      success: "Anfrage vorbereitet. Der echte Versand und die Datenbank-Anbindung folgen im nächsten Schritt.",
    },
    ideas: {
      teaser: "Ideen-Generator",
      password: "Passwort",
      unlock: "Öffnen",
      wrong: "Passwort prüfen",
    },
    legal: {
      title: "Impressum",
      text: "Die rechtlichen Angaben werden ergänzt, sobald die Pflichtangaben final feststehen. Bis dahin werden keine falschen oder unvollständigen Adress- oder Unternehmensdaten veröffentlicht.",
    },
    privacy: {
      title: "Datenschutz",
      text: "Die Datenschutzerklärung wird vor dem Livegang finalisiert, besonders für Kontaktformular, Datei-Uploads, Datenbank-Speicherung und spätere KI-Funktionen.",
    },
  },
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      request: "Request",
      about: "About",
      planning: "Planning & CAD",
      contact: "Contact",
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
      line: "Planning. Fabrication. Installation.",
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
      planning: "Planning, CAD & embedded",
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
    de: ["Metallbau", "Tore, Treppen, Balkone, Geländer und individuelle Konstruktionen."],
    en: ["Metalwork", "Gates, stairs, balconies, railings and custom structures."],
  },
  {
    icon: Ruler,
    de: ["Möbel & Interieur", "Tische, Regale, Gestelle und Einzelstücke aus Metall und Holz."],
    en: ["Furniture & interiors", "Tables, shelves, frames and one-off pieces in metal and wood."],
  },
  {
    icon: Wrench,
    de: ["Schweißen & Reparatur", "Reparaturen, Anpassungen und praktische Lösungen für Metallteile."],
    en: ["Welding & repair", "Repairs, adjustments and practical solutions for metal parts."],
  },
  {
    icon: DraftingCompass,
    de: ["CAD & Planung", "Skizzen, technische Zeichnungen und saubere Vorbereitung."],
    en: ["CAD & planning", "Sketches, technical drawings and structured preparation."],
  },
  {
    icon: Cpu,
    de: ["Embedded & Prototyping", "Platzhalter für Elektronik, Sensorik und funktionale Sonderlösungen."],
    en: ["Embedded & prototyping", "Placeholder for electronics, sensors and functional custom solutions."],
  },
  {
    icon: PenTool,
    de: ["Sonderlösungen", "Breite Engineering-Erfahrung für Projekte außerhalb des Standards."],
    en: ["Custom solutions", "Broad engineering experience for projects outside the standard range."],
  },
];

export const proofPoints = [
  { icon: DraftingCompass, de: "Planung & CAD", en: "Planning & CAD" },
  { icon: ShieldCheck, de: "Fertigung", en: "Fabrication" },
  { icon: Sparkles, de: "Individuell", en: "Individual" },
  { icon: MapPin, de: "Aus Seeheim", en: "From Seeheim" },
  { icon: Wrench, de: "Reparatur & Service", en: "Repair & service" },
  { icon: BadgeCheck, de: "Innen & Außen", en: "Indoor & outdoor" },
];

export const serviceTiles = [
  {
    image: "/projects/aussentreppe-gelaender.webp",
    de: "Treppen & Geländer",
    en: "Stairs & railings",
  },
  {
    image: "/projects/balkon-gelaender.webp",
    de: "Balkone & Anbauten",
    en: "Balconies & structures",
  },
  {
    image: "/projects/metall-holz-tisch.webp",
    de: "Möbel & Interieur",
    en: "Furniture & interiors",
  },
  {
    image: "/generated/welding-placeholder.webp",
    de: "Schweißarbeiten",
    en: "Welding work",
    generated: true,
  },
  {
    image: "/generated/embedded-prototype-placeholder.webp",
    de: "CAD & Embedded",
    en: "CAD & embedded",
    generated: true,
  },
];

export const projects = [
  {
    image: "/projects/balkon-gelaender.webp",
    category: { de: "Außenbereich", en: "Exterior" },
    title: { de: "Balkon- und Geländeranlage", en: "Balcony and railing system" },
    text: {
      de: "Metallkonstruktion für ein Wohnhaus mit klarer Linienführung.",
      en: "Metal construction for a residential building with clean lines.",
    },
  },
  {
    image: "/projects/metall-holz-schreibtisch.webp",
    category: { de: "Möbel", en: "Furniture" },
    title: { de: "Schreibtisch aus Metall und Holz", en: "Metal and wood desk" },
    text: {
      de: "Massiver Rahmen mit heller Holzplatte für einen funktionalen Arbeitsplatz.",
      en: "Solid frame with a light wood top for a functional workspace.",
    },
  },
  {
    image: "/projects/metall-holz-regal.webp",
    category: { de: "Innenraum", en: "Interior" },
    title: { de: "Regal- und Bettlösung", en: "Shelf and bed solution" },
    text: {
      de: "Kombination aus Stahlrahmen und Holzflächen für den Innenraum.",
      en: "Combination of steel frame and wood surfaces for an interior space.",
    },
  },
  {
    image: "/projects/aussentreppe-gelaender.webp",
    category: { de: "Außenbereich", en: "Exterior" },
    title: { de: "Außentreppe mit Geländer", en: "Outdoor stairs with railing" },
    text: {
      de: "Robuste Treppen- und Geländerkonstruktion für den Alltag.",
      en: "Robust stair and railing construction for everyday use.",
    },
  },
  {
    image: "/projects/leuchtobjekt.webp",
    category: { de: "Designobjekt", en: "Design object" },
    title: { de: "Leuchtobjekt", en: "Light object" },
    text: {
      de: "Einzelstück mit Metallform, Licht und dekorativer Wirkung.",
      en: "One-off piece combining metal form, light and decorative effect.",
    },
  },
  {
    image: "/projects/tor-werkstatt.webp",
    category: { de: "Fertigung", en: "Fabrication" },
    title: { de: "Tor in Fertigung", en: "Gate in fabrication" },
    text: {
      de: "Werkstattarbeit mit Rahmen, Gitterstruktur und Beschlägen.",
      en: "Workshop fabrication with frame, grid structure and fittings.",
    },
  },
  {
    image: "/projects/metallblume.webp",
    category: { de: "Objekt", en: "Object" },
    title: { de: "Metallblume", en: "Metal flower" },
    text: {
      de: "Dekoratives Einzelstück mit geschweißten und geformten Details.",
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
    de: "Portraitfoto für die Über-mich-Seite",
    en: "Portrait photo for the About page",
  },
  {
    de: "Logo oder Wortmarke",
    en: "Logo or wordmark",
  },
  {
    de: "Sauber fotografierte Möbel in fertigen Räumen",
    en: "Clean photos of finished furniture in finished rooms",
  },
  {
    de: "Detailfotos von Schweißnähten, Oberflächen und Material",
    en: "Detail photos of welds, surfaces and material",
  },
  {
    de: "CAD-, Embedded- oder technische Zeichnungsbeispiele",
    en: "CAD or technical drawing examples",
  },
];
