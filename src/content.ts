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
  email: "metallbau.schimmel@gmail.com",
  location: "Sitz in Seeheim",
};

export const routes = {
  home: "/",
  projects: "/projekte",
  services: "/leistungen",
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
      submit: "Anfrage senden",
      consent: "Ich bin mit der Kontaktaufnahme zu meiner Anfrage einverstanden.",
      success: "Anfrage wurde übertragen. Ich melde mich schnellstmöglich.",
      sending: "Anfrage wird übertragen...",
      error: "Die Anfrage konnte nicht gespeichert werden. Bitte rufen Sie an oder schreiben Sie direkt per E-Mail.",
      backendMissing: "Die Anfrage-Funktion ist vorbereitet, aber Cloudflare D1/R2 ist noch nicht fertig verbunden. Bitte nutzen Sie vorerst Telefon, WhatsApp oder E-Mail.",
      fileLimit: "Maximal 5 Dateien mit jeweils bis zu 10 MB sind möglich.",
    },
    ideas: {
      teaser: "Ideen-Generator",
      password: "Passwort",
      unlock: "Öffnen",
      wrong: "Passwort prüfen",
    },
    legal: {
      title: "Impressum",
      text:
        "Angaben nach § 5 TMG: Metallbau Schimmel, Maximilian Schimmel, Sitz in Seeheim-Jugenheim. Kontakt: +49 176 98472569, metallbau.schimmel@gmail.com. Hinweis: Eine vollständige ladungsfähige Anschrift, Umsatzsteuerangaben und weitere Pflichtangaben werden vor dem öffentlichen Launch final ergänzt.",
    },
    privacy: {
      title: "Datenschutz",
      text:
        "Diese Website verarbeitet Kontaktdaten, Projektbeschreibungen und hochgeladene Dateien nur zur Bearbeitung Ihrer Anfrage. Kontaktanfragen sollen in Cloudflare D1 gespeichert werden; Dateianhänge sollen in Cloudflare R2 gespeichert werden. Die Daten werden nicht verkauft und nicht für Werbung weitergegeben. Die finale Datenschutzerklärung muss vor dem Launch noch mit den tatsächlichen Impressumsdaten, Speicherfristen, Rechtsgrundlagen und Dienstleistern abgeglichen werden.",
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
      submit: "Send request",
      consent: "I agree to be contacted about my request.",
      success: "Request sent. I will get back to you as soon as possible.",
      sending: "Sending request...",
      error: "The request could not be stored. Please call or email directly.",
      backendMissing: "The request backend is prepared, but Cloudflare D1/R2 is not fully connected yet. Please use phone, WhatsApp or email for now.",
      fileLimit: "Maximum 5 files, up to 10 MB each.",
    },
    ideas: {
      teaser: "Idea generator",
      password: "Password",
      unlock: "Open",
      wrong: "Check password",
    },
    legal: {
      title: "Legal notice",
      text:
        "Legal notice under German law: Metallbau Schimmel, Maximilian Schimmel, based in Seeheim-Jugenheim. Contact: +49 176 98472569, metallbau.schimmel@gmail.com. Note: the full serviceable address, VAT/tax details and any further mandatory details still need to be finalized before public launch.",
    },
    privacy: {
      title: "Privacy",
      text:
        "This website processes contact details, project descriptions and uploaded files only to handle your request. Contact requests are intended to be stored in Cloudflare D1; attachments are intended to be stored in Cloudflare R2. Data is not sold or shared for advertising. The final privacy policy still needs to be checked against the real legal details, retention periods, legal bases and processors before launch.",
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

export const serviceShowcases = [
  {
    slug: "treppen-gelaender",
    icon: Hammer,
    image: "/projects/aussentreppe-gelaender.webp",
    images: ["/projects/aussentreppe-gelaender.webp", "/projects/balkon-gelaender.webp"],
    title: { de: "Treppen & Geländer", en: "Stairs & railings" },
    short: { de: "Außen- und Innenkonstruktionen für Haus, Garten und Alltag.", en: "Interior and exterior structures for homes, gardens and daily use." },
    detail: {
      de: "Treppen, Geländer und kleine Anbauten werden individuell besprochen, geplant und auf die vorhandene Situation abgestimmt. Wichtig sind klare Linien, saubere Anschlüsse und eine robuste Ausführung.",
      en: "Stairs, railings and smaller structures are discussed individually, planned for the existing situation and built with clean connections and robust details.",
    },
  },
  {
    slug: "balkone-anbauten",
    icon: ShieldCheck,
    image: "/projects/balkon-gelaender.webp",
    images: ["/projects/balkon-gelaender.webp", "/generated/exterior-metalwork-placeholder.webp"],
    title: { de: "Balkone & Anbauten", en: "Balconies & structures" },
    short: { de: "Metallkonstruktionen rund ums Haus, nach Absprache vor Ort.", en: "Metal structures around the home, discussed on site where useful." },
    detail: {
      de: "Für Balkone, Anbauten und größere Außenarbeiten steht die Abstimmung vor Ort im Vordergrund. Ziel ist eine Konstruktion, die technisch sinnvoll ist und optisch zum Haus passt.",
      en: "For balconies, extensions and larger exterior work, the on-site situation matters most. The goal is a structure that makes technical sense and fits the building visually.",
    },
  },
  {
    slug: "moebel-interieur",
    icon: Ruler,
    image: "/projects/metall-holz-tisch.webp",
    images: ["/projects/metall-holz-tisch.webp", "/projects/metall-holz-regal.webp", "/projects/metall-holz-schreibtisch.webp"],
    title: { de: "Möbel & Interieur", en: "Furniture & interiors" },
    short: { de: "Tische, Regale und Einzelstücke aus Metall und Holz.", en: "Tables, shelves and one-off pieces in metal and wood." },
    detail: {
      de: "Möbel und Interieur-Objekte verbinden Metallrahmen, Holzflächen und funktionale Details. Maße, Material und Oberfläche werden passend zum Raum und zur Nutzung festgelegt.",
      en: "Furniture and interior objects combine metal frames, wood surfaces and functional details. Dimensions, materials and finish are chosen to fit the room and use case.",
    },
  },
  {
    slug: "schweissarbeiten",
    icon: Wrench,
    image: "/generated/welding-placeholder.webp",
    images: ["/generated/welding-placeholder.webp", "/generated/fabrication-placeholder.webp"],
    generated: true,
    title: { de: "Schweißarbeiten", en: "Welding work" },
    short: { de: "Fertigung, Anpassung und praktische Metallarbeiten.", en: "Fabrication, adjustment and practical metalwork." },
    detail: {
      de: "Schweißarbeiten werden projektbezogen besprochen. Das kann eine neue Konstruktion, eine Anpassung oder eine kleine praktische Lösung sein.",
      en: "Welding work is discussed project by project. It can be a new construction, an adjustment or a small practical solution.",
    },
  },
  {
    slug: "cad-planung",
    icon: DraftingCompass,
    image: "/generated/cad-railing-placeholder.webp",
    images: ["/generated/cad-railing-placeholder.webp", "/generated/custom-design-placeholder.webp"],
    generated: true,
    title: { de: "Planung & CAD", en: "Planning & CAD" },
    short: { de: "Skizzen, technische Zeichnungen und strukturierte Vorbereitung.", en: "Sketches, technical drawings and structured preparation." },
    detail: {
      de: "Wenn ein Projekt komplexer ist, helfen Skizzen, CAD-Modelle oder technische Zeichnungen. So werden Maße, Anschlüsse und Materialfragen geklärt, bevor gebaut wird.",
      en: "For more complex projects, sketches, CAD models or technical drawings help clarify dimensions, connections and material questions before anything is built.",
    },
  },
  {
    slug: "reparatur-service",
    icon: Wrench,
    image: "/generated/repair-service-placeholder.webp",
    images: ["/generated/repair-service-placeholder.webp", "/projects/rahmen-fertigung.webp"],
    generated: true,
    title: { de: "Reparatur & Service", en: "Repair & service" },
    short: { de: "Reparaturen, Verstärkungen und Anpassungen an Metallteilen.", en: "Repairs, reinforcements and adjustments to metal parts." },
    detail: {
      de: "Bei Reparaturen geht es um eine ehrliche Einschätzung: Was ist sinnvoll, was hält langfristig und wann lohnt sich eine Neuanfertigung mehr als eine Reparatur.",
      en: "For repairs, the first step is an honest assessment: what makes sense, what will last, and when a new part is better than fixing the old one.",
    },
  },
  {
    slug: "tore-zaeune-aussen",
    icon: MapPin,
    image: "/generated/exterior-metalwork-placeholder.webp",
    images: ["/generated/exterior-metalwork-placeholder.webp", "/projects/tor-werkstatt.webp"],
    generated: true,
    title: { de: "Tore, Zäune & Außenbereich", en: "Gates, fences & exterior" },
    short: { de: "Außenlösungen für private Eigentümer und Grundstücke.", en: "Exterior solutions for private homeowners and properties." },
    detail: {
      de: "Tore, Zäune und Außenkonstruktionen werden passend zum Grundstück, zur Nutzung und zum gewünschten Erscheinungsbild geplant.",
      en: "Gates, fences and exterior structures are planned around the property, the practical use case and the desired visual appearance.",
    },
  },
  {
    slug: "embedded-prototyping",
    icon: Cpu,
    image: "/generated/embedded-prototype-placeholder.webp",
    images: ["/generated/embedded-prototype-placeholder.webp", "/generated/custom-design-placeholder.webp"],
    generated: true,
    title: { de: "Embedded & Prototyping", en: "Embedded & prototyping" },
    short: { de: "Spezialfähigkeit für ungewöhnliche technische Sonderlösungen.", en: "Special capability for unusual technical custom solutions." },
    detail: {
      de: "Embedded-Systeme und Prototyping bleiben vorerst als Spezialfähigkeit sichtbar. Sie sind vor allem relevant, wenn ein Objekt Sensorik, Steuerung, Licht oder andere technische Funktionen braucht.",
      en: "Embedded systems and prototyping are shown as a specialist capability for now. They matter most when an object needs sensors, control, lighting or other technical functions.",
    },
  },
  {
    slug: "sonderloesungen",
    icon: PenTool,
    image: "/generated/custom-design-placeholder.webp",
    images: ["/generated/custom-design-placeholder.webp", "/projects/leuchtobjekt.webp"],
    generated: true,
    title: { de: "Sonderlösungen", en: "Custom solutions" },
    short: { de: "Ungewöhnliche Ideen sauber planen und praktisch umsetzen.", en: "Plan unusual ideas clearly and turn them into practical builds." },
    detail: {
      de: "Wenn eine Idee nicht in eine Standardschublade passt, wird sie zuerst klar beschrieben, technisch sortiert und dann in machbare Schritte übersetzt.",
      en: "When an idea does not fit a standard category, it is first described clearly, structured technically and translated into practical steps.",
    },
  },
];

export const projects = [
  {
    slug: "balkon-gelaenderanlage",
    image: "/projects/balkon-gelaender.webp",
    images: ["/projects/balkon-gelaender.webp", "/projects/aussentreppe-gelaender.webp"],
    category: { de: "Außenbereich", en: "Exterior" },
    title: { de: "Balkon- und Geländeranlage", en: "Balcony and railing system" },
    text: {
      de: "Metallkonstruktion für ein Wohnhaus mit klarer Linienführung.",
      en: "Metal construction for a residential building with clean lines.",
    },
  },
  {
    slug: "metall-holz-schreibtisch",
    image: "/projects/metall-holz-schreibtisch.webp",
    images: ["/projects/metall-holz-schreibtisch.webp", "/projects/metall-holz-tisch.webp"],
    category: { de: "Möbel", en: "Furniture" },
    title: { de: "Schreibtisch aus Metall und Holz", en: "Metal and wood desk" },
    text: {
      de: "Massiver Rahmen mit heller Holzplatte für einen funktionalen Arbeitsplatz.",
      en: "Solid frame with a light wood top for a functional workspace.",
    },
  },
  {
    slug: "regal-bettloesung",
    image: "/projects/metall-holz-regal.webp",
    images: ["/projects/metall-holz-regal.webp", "/projects/metall-holz-schreibtisch.webp"],
    category: { de: "Innenraum", en: "Interior" },
    title: { de: "Regal- und Bettlösung", en: "Shelf and bed solution" },
    text: {
      de: "Kombination aus Stahlrahmen und Holzflächen für den Innenraum.",
      en: "Combination of steel frame and wood surfaces for an interior space.",
    },
  },
  {
    slug: "aussentreppe-gelaender",
    image: "/projects/aussentreppe-gelaender.webp",
    images: ["/projects/aussentreppe-gelaender.webp", "/projects/balkon-gelaender.webp"],
    category: { de: "Außenbereich", en: "Exterior" },
    title: { de: "Außentreppe mit Geländer", en: "Outdoor stairs with railing" },
    text: {
      de: "Robuste Treppen- und Geländerkonstruktion für den Alltag.",
      en: "Robust stair and railing construction for everyday use.",
    },
  },
  {
    slug: "leuchtobjekt",
    image: "/projects/leuchtobjekt.webp",
    images: ["/projects/leuchtobjekt.webp", "/projects/metallblume.webp"],
    category: { de: "Designobjekt", en: "Design object" },
    title: { de: "Leuchtobjekt", en: "Light object" },
    text: {
      de: "Einzelstück mit Metallform, Licht und dekorativer Wirkung.",
      en: "One-off piece combining metal form, light and decorative effect.",
    },
  },
  {
    slug: "tor-fertigung",
    image: "/projects/tor-werkstatt.webp",
    images: ["/projects/tor-werkstatt.webp", "/generated/exterior-metalwork-placeholder.webp"],
    category: { de: "Fertigung", en: "Fabrication" },
    title: { de: "Tor in Fertigung", en: "Gate in fabrication" },
    text: {
      de: "Werkstattarbeit mit Rahmen, Gitterstruktur und Beschlägen.",
      en: "Workshop fabrication with frame, grid structure and fittings.",
    },
  },
  {
    slug: "metallblume",
    image: "/projects/metallblume.webp",
    images: ["/projects/metallblume.webp", "/projects/leuchtobjekt.webp"],
    category: { de: "Objekt", en: "Object" },
    title: { de: "Metallblume", en: "Metal flower" },
    text: {
      de: "Dekoratives Einzelstück mit geschweißten und geformten Details.",
      en: "Decorative one-off piece with welded and formed details.",
    },
  },
  {
    slug: "rahmenbau-werkstatt",
    image: "/projects/rahmen-fertigung.webp",
    images: ["/projects/rahmen-fertigung.webp", "/generated/fabrication-placeholder.webp"],
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
