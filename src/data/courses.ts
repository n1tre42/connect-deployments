export type CourseIcon = 'python' | 'database' | 'network' | 'html' | 'device'

export type Lesson = {
  id: string
  kind: 'video' | 'reading'
  title: string
  source: string
  license: string
  duration: string
  url: string
  youtubeId?: string
}

export type Resource = { title: string; format: string; url: string }

export type Module = {
  id: string
  title: string
  description: string
  /** Share of the exam (percent) covered by this objective domain. */
  weight: number
  lessons: Lesson[]
  resources: Resource[]
}

export type Course = {
  id: string
  title: string
  examTitle: string
  tagline: string
  /** OKLCH hue used for the course accent color. */
  hue: number
  icon: CourseIcon
  /** Size the question bank is growing toward. */
  questionTarget: number
  exam: { questions: number; minutes: number; passPercent: number }
  modules: Module[]
}

export const courses: Course[] = [
  {
    "id": "python",
    "title": "Python",
    "examTitle": "IT Specialist — Python",
    "tagline": "Tipuri de date, controlul fluxului, fișiere, erori și module — tot ce cere examenul.",
    "hue": 220,
    "icon": "python",
    "questionTarget": 500,
    "exam": {
      "questions": 40,
      "minutes": 50,
      "passPercent": 70
    },
    "modules": [
      {
        "id": "01-tipuri-date-operatori",
        "title": "Operații cu tipuri de date și operatori",
        "description": "Tipuri de date, conversii, operatori aritmetici, logici și de comparație.",
        "weight": 20,
        "lessons": [
          {
            "id": "py-1-1",
            "kind": "video",
            "title": "Learn Python — curs complet pentru începători",
            "source": "freeCodeCamp.org (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "4:26:52",
            "url": "https://www.youtube.com/watch?v=rfscVS0vtbw",
            "youtubeId": "rfscVS0vtbw"
          },
          {
            "id": "py-1-2",
            "kind": "reading",
            "title": "O introducere informală în Python",
            "source": "Documentația oficială Python",
            "license": "PSF Documentation License",
            "duration": "~25 min",
            "url": "https://docs.python.org/3/tutorial/introduction.html"
          }
        ],
        "resources": [
          {
            "title": "Tipuri de date încorporate",
            "format": "DOCS",
            "url": "https://docs.python.org/3/library/stdtypes.html"
          },
          {
            "title": "Funcții încorporate (int, str, type…)",
            "format": "DOCS",
            "url": "https://docs.python.org/3/library/functions.html"
          }
        ]
      },
      {
        "id": "02-control-flux",
        "title": "Controlul fluxului: decizii și bucle",
        "description": "if/elif/else, bucle for și while, break, continue, range().",
        "weight": 25,
        "lessons": [
          {
            "id": "py-2-1",
            "kind": "video",
            "title": "Python Tutorial — curs complet pentru începători",
            "source": "Programming with Mosh (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "6:14:07",
            "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
            "youtubeId": "_uQrJ0TkZlc"
          },
          {
            "id": "py-2-2",
            "kind": "reading",
            "title": "Instrumente pentru controlul fluxului",
            "source": "Documentația oficială Python",
            "license": "PSF Documentation License",
            "duration": "~30 min",
            "url": "https://docs.python.org/3/tutorial/controlflow.html"
          }
        ],
        "resources": [
          {
            "title": "Instrucțiuni compuse: if, while, for",
            "format": "DOCS",
            "url": "https://docs.python.org/3/reference/compound_stmts.html"
          }
        ]
      },
      {
        "id": "03-intrare-iesire",
        "title": "Operații de intrare și ieșire",
        "description": "Citire de la tastatură, afișare formatată, lucrul cu fișiere text.",
        "weight": 15,
        "lessons": [
          {
            "id": "py-3-1",
            "kind": "reading",
            "title": "Intrare și ieșire",
            "source": "Documentația oficială Python",
            "license": "PSF Documentation License",
            "duration": "~30 min",
            "url": "https://docs.python.org/3/tutorial/inputoutput.html"
          }
        ],
        "resources": [
          {
            "title": "Funcția open() și modurile de deschidere",
            "format": "DOCS",
            "url": "https://docs.python.org/3/library/functions.html#open"
          }
        ]
      },
      {
        "id": "04-documentare-structura",
        "title": "Documentarea și structura codului",
        "description": "Comentarii, docstring-uri, indentare, definirea funcțiilor și parametri impliciți.",
        "weight": 15,
        "lessons": [
          {
            "id": "py-4-1",
            "kind": "reading",
            "title": "PEP 8 — ghid de stil pentru codul Python",
            "source": "Python Enhancement Proposals",
            "license": "Domeniu public",
            "duration": "~40 min",
            "url": "https://peps.python.org/pep-0008/"
          },
          {
            "id": "py-4-2",
            "kind": "reading",
            "title": "PEP 257 — convenții pentru docstring-uri",
            "source": "Python Enhancement Proposals",
            "license": "Domeniu public",
            "duration": "~15 min",
            "url": "https://peps.python.org/pep-0257/"
          }
        ],
        "resources": [
          {
            "title": "Definirea funcțiilor",
            "format": "DOCS",
            "url": "https://docs.python.org/3/tutorial/controlflow.html#defining-functions"
          }
        ]
      },
      {
        "id": "05-depanare-erori",
        "title": "Depanare și tratarea erorilor",
        "description": "Erori de sintaxă, de execuție și logice; try/except/else/finally.",
        "weight": 15,
        "lessons": [
          {
            "id": "py-5-1",
            "kind": "reading",
            "title": "Erori și excepții",
            "source": "Documentația oficială Python",
            "license": "PSF Documentation License",
            "duration": "~25 min",
            "url": "https://docs.python.org/3/tutorial/errors.html"
          }
        ],
        "resources": [
          {
            "title": "Ierarhia excepțiilor încorporate",
            "format": "DOCS",
            "url": "https://docs.python.org/3/library/exceptions.html"
          }
        ]
      },
      {
        "id": "06-module-instrumente",
        "title": "Operații cu module și instrumente",
        "description": "import, biblioteca standard: math, random, datetime, os.",
        "weight": 10,
        "lessons": [
          {
            "id": "py-6-1",
            "kind": "reading",
            "title": "Module",
            "source": "Documentația oficială Python",
            "license": "PSF Documentation License",
            "duration": "~25 min",
            "url": "https://docs.python.org/3/tutorial/modules.html"
          },
          {
            "id": "py-6-2",
            "kind": "reading",
            "title": "Modulul math",
            "source": "Documentația oficială Python",
            "license": "PSF Documentation License",
            "duration": "~15 min",
            "url": "https://docs.python.org/3/library/math.html"
          }
        ],
        "resources": [
          {
            "title": "Modulul random",
            "format": "DOCS",
            "url": "https://docs.python.org/3/library/random.html"
          },
          {
            "title": "Modulul datetime",
            "format": "DOCS",
            "url": "https://docs.python.org/3/library/datetime.html"
          }
        ]
      }
    ]
  },
  {
    "id": "baze-de-date",
    "title": "Baze de date",
    "examTitle": "IT Specialist — Databases",
    "tagline": "Proiectare relațională, DDL, interogări SELECT și JOIN, manipularea datelor.",
    "hue": 160,
    "icon": "database",
    "questionTarget": 300,
    "exam": {
      "questions": 40,
      "minutes": 50,
      "passPercent": 70
    },
    "modules": [
      {
        "id": "01-proiectare",
        "title": "Proiectarea bazelor de date",
        "description": "Tabele, chei primare și externe, relații, normalizare.",
        "weight": 25,
        "lessons": [
          {
            "id": "db-1-1",
            "kind": "video",
            "title": "SQL Tutorial — curs complet de baze de date",
            "source": "freeCodeCamp.org (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "4:20:39",
            "url": "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            "youtubeId": "HXV3zeQKqGY"
          }
        ],
        "resources": [
          {
            "title": "Normalizarea bazelor de date",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Database_normalization"
          },
          {
            "title": "Modelul entitate-relație",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Entity%E2%80%93relationship_model"
          }
        ]
      },
      {
        "id": "02-obiecte",
        "title": "Gestionarea obiectelor bazei de date",
        "description": "Comenzi DDL: CREATE, ALTER, DROP; tipuri de date, constrângeri, indexuri, vederi.",
        "weight": 20,
        "lessons": [
          {
            "id": "db-2-1",
            "kind": "reading",
            "title": "Definirea datelor (DDL)",
            "source": "Documentația PostgreSQL",
            "license": "PostgreSQL License",
            "duration": "~30 min",
            "url": "https://www.postgresql.org/docs/current/ddl.html"
          }
        ],
        "resources": [
          {
            "title": "CREATE VIEW",
            "format": "DOCS",
            "url": "https://www.postgresql.org/docs/current/sql-createview.html"
          },
          {
            "title": "Indexuri",
            "format": "DOCS",
            "url": "https://www.postgresql.org/docs/current/indexes.html"
          }
        ]
      },
      {
        "id": "03-interogare",
        "title": "Extragerea datelor",
        "description": "SELECT, WHERE, ORDER BY, funcții agregate, GROUP BY, HAVING, JOIN.",
        "weight": 30,
        "lessons": [
          {
            "id": "db-3-1",
            "kind": "reading",
            "title": "Interogări",
            "source": "Documentația PostgreSQL",
            "license": "PostgreSQL License",
            "duration": "~40 min",
            "url": "https://www.postgresql.org/docs/current/queries.html"
          }
        ],
        "resources": [
          {
            "title": "Sintaxa completă SELECT",
            "format": "DOCS",
            "url": "https://www.postgresql.org/docs/current/sql-select.html"
          },
          {
            "title": "Funcții agregate",
            "format": "DOCS",
            "url": "https://www.postgresql.org/docs/current/functions-aggregate.html"
          }
        ]
      },
      {
        "id": "04-manipulare",
        "title": "Manipularea datelor",
        "description": "INSERT, UPDATE, DELETE și efectele lor asupra datelor.",
        "weight": 15,
        "lessons": [
          {
            "id": "db-4-1",
            "kind": "reading",
            "title": "Manipularea datelor (DML)",
            "source": "Documentația PostgreSQL",
            "license": "PostgreSQL License",
            "duration": "~15 min",
            "url": "https://www.postgresql.org/docs/current/dml.html"
          }
        ],
        "resources": [
          {
            "title": "Tranzacții",
            "format": "DOCS",
            "url": "https://www.postgresql.org/docs/current/tutorial-transactions.html"
          }
        ]
      },
      {
        "id": "05-depanare",
        "title": "Depanare",
        "description": "Erori de sintaxă SQL, încălcarea constrângerilor, lucrul cu NULL.",
        "weight": 10,
        "lessons": [
          {
            "id": "db-5-1",
            "kind": "reading",
            "title": "Constrângeri",
            "source": "Documentația PostgreSQL",
            "license": "PostgreSQL License",
            "duration": "~25 min",
            "url": "https://www.postgresql.org/docs/current/ddl-constraints.html"
          }
        ],
        "resources": [
          {
            "title": "Comparații cu NULL",
            "format": "DOCS",
            "url": "https://www.postgresql.org/docs/current/functions-comparison.html"
          }
        ]
      }
    ]
  },
  {
    "id": "retelistica",
    "title": "Rețelistică",
    "examTitle": "IT Specialist — Networking",
    "tagline": "Infrastructură, adresare IP, hardware, protocoale, securitate și depanare.",
    "hue": 265,
    "icon": "network",
    "questionTarget": 500,
    "exam": {
      "questions": 40,
      "minutes": 50,
      "passPercent": 70
    },
    "modules": [
      {
        "id": "01-infrastructura",
        "title": "Infrastructura rețelei",
        "description": "Tipuri de rețele (LAN, WAN), topologii, adresare IPv4 și IPv6, subrețele.",
        "weight": 25,
        "lessons": [
          {
            "id": "net-1-1",
            "kind": "video",
            "title": "Curs de rețelistică (Network Engineering)",
            "source": "freeCodeCamp.org (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "~9 ore",
            "url": "https://www.youtube.com/watch?v=qiQR5rTSshw",
            "youtubeId": "qiQR5rTSshw"
          },
          {
            "id": "net-1-2",
            "kind": "reading",
            "title": "Adresa IP — glosar",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~5 min",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary/IP_Address"
          }
        ],
        "resources": [
          {
            "title": "Subrețele și notația CIDR",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Subnet"
          }
        ]
      },
      {
        "id": "02-hardware",
        "title": "Hardware de rețea",
        "description": "Switch, router, puncte de acces, cabluri și conectori.",
        "weight": 20,
        "lessons": [
          {
            "id": "net-2-1",
            "kind": "reading",
            "title": "Network switch",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/Network_switch"
          },
          {
            "id": "net-2-2",
            "kind": "reading",
            "title": "Router (computing)",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/Router_(computing)"
          }
        ],
        "resources": [
          {
            "title": "Cablu cu perechi torsadate (UTP)",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Twisted_pair"
          }
        ]
      },
      {
        "id": "03-protocoale-servicii",
        "title": "Protocoale și servicii",
        "description": "Modelul OSI și TCP/IP, TCP vs UDP, porturi, DNS, DHCP, HTTP/HTTPS.",
        "weight": 25,
        "lessons": [
          {
            "id": "net-3-1",
            "kind": "reading",
            "title": "DNS — glosar",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~5 min",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary/DNS"
          },
          {
            "id": "net-3-2",
            "kind": "reading",
            "title": "TCP — glosar",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~5 min",
            "url": "https://developer.mozilla.org/en-US/docs/Glossary/TCP"
          }
        ],
        "resources": [
          {
            "title": "Modelul OSI",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/OSI_model"
          },
          {
            "title": "Lista porturilor TCP și UDP",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers"
          }
        ]
      },
      {
        "id": "04-securitate",
        "title": "Securitatea rețelei",
        "description": "Firewall, securitate wireless, VPN, amenințări comune.",
        "weight": 15,
        "lessons": [
          {
            "id": "net-4-1",
            "kind": "reading",
            "title": "Firewall (computing)",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/Firewall_(computing)"
          },
          {
            "id": "net-4-2",
            "kind": "reading",
            "title": "Wi-Fi Protected Access",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/Wi-Fi_Protected_Access"
          }
        ],
        "resources": [
          {
            "title": "Rețele private virtuale (VPN)",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Virtual_private_network"
          }
        ]
      },
      {
        "id": "05-depanare",
        "title": "Depanarea rețelei",
        "description": "ping, tracert/traceroute, ipconfig, probleme comune de conectivitate.",
        "weight": 15,
        "lessons": [
          {
            "id": "net-5-1",
            "kind": "reading",
            "title": "Ping (networking utility)",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~10 min",
            "url": "https://en.wikipedia.org/wiki/Ping_(networking_utility)"
          },
          {
            "id": "net-5-2",
            "kind": "reading",
            "title": "Traceroute",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~10 min",
            "url": "https://en.wikipedia.org/wiki/Traceroute"
          }
        ],
        "resources": [
          {
            "title": "Comanda ipconfig",
            "format": "DOCS",
            "url": "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig"
          }
        ]
      }
    ]
  },
  {
    "id": "html5",
    "title": "HTML5",
    "examTitle": "IT Specialist — HTML5 Application Development",
    "tagline": "Elemente semantice, formulare, CSS Flexbox și Grid, JavaScript și API-uri ale browserului.",
    "hue": 25,
    "icon": "html",
    "questionTarget": 300,
    "exam": {
      "questions": 40,
      "minutes": 50,
      "passPercent": 70
    },
    "modules": [
      {
        "id": "01-ciclu-viata",
        "title": "Gestionarea ciclului de viață al aplicației",
        "description": "Publicare, aplicații offline, manifest, service workers, stocare locală.",
        "weight": 15,
        "lessons": [
          {
            "id": "html-1-1",
            "kind": "reading",
            "title": "Aplicații web progresive (PWA)",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~20 min",
            "url": "https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps"
          },
          {
            "id": "html-1-2",
            "kind": "reading",
            "title": "Web Storage API",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~10 min",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"
          }
        ],
        "resources": [
          {
            "title": "Service Worker API",
            "format": "DOCS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API"
          }
        ]
      },
      {
        "id": "02-interfata-html5",
        "title": "Construirea interfeței cu HTML5",
        "description": "Elemente semantice, formulare și validare, media, canvas și SVG.",
        "weight": 30,
        "lessons": [
          {
            "id": "html-2-1",
            "kind": "video",
            "title": "HTML Full Course — construiește un site web",
            "source": "freeCodeCamp.org (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "2:02:32",
            "url": "https://www.youtube.com/watch?v=pQN-pnXPaVg",
            "youtubeId": "pQN-pnXPaVg"
          },
          {
            "id": "html-2-2",
            "kind": "reading",
            "title": "Referința elementelor HTML",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~20 min",
            "url": "https://developer.mozilla.org/en-US/docs/Web/HTML/Element"
          }
        ],
        "resources": [
          {
            "title": "Validarea formularelor pe client",
            "format": "DOCS",
            "url": "https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation"
          },
          {
            "title": "Canvas API",
            "format": "DOCS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API"
          }
        ]
      },
      {
        "id": "03-formatare-css",
        "title": "Formatarea interfeței cu CSS",
        "description": "Selectori și specificitate, modelul cutiei, Flexbox, Grid, design responsiv.",
        "weight": 25,
        "lessons": [
          {
            "id": "html-3-1",
            "kind": "video",
            "title": "CSS Tutorial — curs complet",
            "source": "freeCodeCamp.org (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "6:18:37",
            "url": "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
            "youtubeId": "1Rs2ND1ryYc"
          },
          {
            "id": "html-3-2",
            "kind": "reading",
            "title": "Concepte de bază Flexbox",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~20 min",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox"
          }
        ],
        "resources": [
          {
            "title": "CSS Grid Layout",
            "format": "DOCS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout"
          },
          {
            "title": "Specificitatea selectorilor",
            "format": "DOCS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity"
          }
        ]
      },
      {
        "id": "04-javascript",
        "title": "Programare cu JavaScript",
        "description": "Variabile și tipuri, DOM, evenimente, validare, API-uri ale browserului.",
        "weight": 30,
        "lessons": [
          {
            "id": "html-4-1",
            "kind": "video",
            "title": "Learn JavaScript — curs complet pentru începători",
            "source": "freeCodeCamp.org (YouTube)",
            "license": "Licență standard YouTube — doar încorporare",
            "duration": "3:26:42",
            "url": "https://www.youtube.com/watch?v=PkZNo7MFNFg",
            "youtubeId": "PkZNo7MFNFg"
          },
          {
            "id": "html-4-2",
            "kind": "reading",
            "title": "Ghidul JavaScript",
            "source": "MDN Web Docs",
            "license": "CC BY-SA 2.5 (MDN)",
            "duration": "~60 min",
            "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
          }
        ],
        "resources": [
          {
            "title": "Introducere în DOM",
            "format": "DOCS",
            "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
          }
        ]
      }
    ]
  },
  {
    "id": "configurare-dispozitive",
    "title": "Dispozitive",
    "examTitle": "IT Specialist — Device Configuration and Management",
    "tagline": "Configurare Windows, sisteme de fișiere, permisiuni, securitate și depanare.",
    "hue": 330,
    "icon": "device",
    "questionTarget": 600,
    "exam": {
      "questions": 40,
      "minutes": 50,
      "passPercent": 70
    },
    "modules": [
      {
        "id": "01-configurare",
        "title": "Configurarea dispozitivelor",
        "description": "Setări de sistem, drivere, aplicații la pornire, actualizări, periferice.",
        "weight": 30,
        "lessons": [
          {
            "id": "dev-1-1",
            "kind": "reading",
            "title": "Device driver",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~10 min",
            "url": "https://en.wikipedia.org/wiki/Device_driver"
          }
        ],
        "resources": [
          {
            "title": "Windows Update — întrebări frecvente",
            "format": "WEB",
            "url": "https://support.microsoft.com/en-us/windows/windows-update-faq-8a903416-6f45-0718-f5c7-375e92dddeb2"
          },
          {
            "title": "Porturi și conectori (USB, HDMI, RJ-45)",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Computer_port_(hardware)"
          }
        ]
      },
      {
        "id": "02-acces-date",
        "title": "Accesul la date și gestionarea lor",
        "description": "Sisteme de fișiere, permisiuni, partajare, stocare în cloud, copii de rezervă.",
        "weight": 25,
        "lessons": [
          {
            "id": "dev-2-1",
            "kind": "reading",
            "title": "NTFS",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/NTFS"
          },
          {
            "id": "dev-2-2",
            "kind": "reading",
            "title": "Backup",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/Backup"
          }
        ],
        "resources": [
          {
            "title": "Permisiuni de fișiere și foldere NTFS",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/File-system_permissions"
          }
        ]
      },
      {
        "id": "03-securitate",
        "title": "Securitatea dispozitivelor",
        "description": "Conturi și privilegii, autentificare multi-factor, criptare, actualizări.",
        "weight": 25,
        "lessons": [
          {
            "id": "dev-3-1",
            "kind": "reading",
            "title": "BitLocker",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~10 min",
            "url": "https://en.wikipedia.org/wiki/BitLocker"
          },
          {
            "id": "dev-3-2",
            "kind": "reading",
            "title": "Multi-factor authentication",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~15 min",
            "url": "https://en.wikipedia.org/wiki/Multi-factor_authentication"
          }
        ],
        "resources": [
          {
            "title": "Controlul contului de utilizator (UAC)",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/User_Account_Control"
          }
        ]
      },
      {
        "id": "04-depanare",
        "title": "Depanare",
        "description": "Modul sigur, Manager dispozitive, Vizualizator evenimente, restaurarea sistemului.",
        "weight": 20,
        "lessons": [
          {
            "id": "dev-4-1",
            "kind": "reading",
            "title": "Safe mode",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~10 min",
            "url": "https://en.wikipedia.org/wiki/Safe_mode"
          },
          {
            "id": "dev-4-2",
            "kind": "reading",
            "title": "System Restore",
            "source": "Wikipedia",
            "license": "CC BY-SA 4.0 (Wikipedia)",
            "duration": "~10 min",
            "url": "https://en.wikipedia.org/wiki/System_Restore"
          }
        ],
        "resources": [
          {
            "title": "Event Viewer",
            "format": "WEB",
            "url": "https://en.wikipedia.org/wiki/Event_Viewer"
          }
        ]
      }
    ]
  }
]

export function getCourse(id: string) {
  return courses.find((c) => c.id === id)
}

export function courseColor(course: Course, l = 0.58, c = 0.17) {
  return `oklch(${l} ${c} ${course.hue})`
}
