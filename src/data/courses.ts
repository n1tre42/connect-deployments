import { videos, courseVideos } from './videos'
import { pythonNextCourse } from './python-next'

export type CourseIcon = 'python' | 'database' | 'network' | 'html' | 'device'

export type Lesson = {
  id: string
  kind: 'video'
  title: string
  source: string
  license: string
  duration: string
  url: string
  youtubeId: string
  seconds: number
  language: 'en'
}

export type Module = {
  id: string
  title: string
  description: string
  /** Share of the exam (percent) covered by this objective domain. */
  weight: number
  lessons: Lesson[]
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

const catalog: Course[] = [
  {
    id: 'python',
    title: 'Python',
    examTitle: 'IT Specialist — Python',
    tagline:
      'Tipuri de date, controlul fluxului, fișiere, erori și module — tot ce cere examenul.',
    hue: 220,
    icon: 'python',
    questionTarget: 500,
    exam: {
      questions: 40,
      minutes: 50,
      passPercent: 70,
    },
    modules: [
      {
        id: '01-tipuri-date-operatori',
        title: 'Operații cu tipuri de date și operatori',
        description:
          'Tipuri de date, conversii, operatori aritmetici, logici și de comparație.',
        weight: 20,
        lessons: [],
      },
      {
        id: '02-control-flux',
        title: 'Controlul fluxului: decizii și bucle',
        description: 'if/elif/else, bucle for și while, break, continue, range().',
        weight: 25,
        lessons: [],
      },
      {
        id: '03-intrare-iesire',
        title: 'Operații de intrare și ieșire',
        description: 'Citire de la tastatură, afișare formatată, lucrul cu fișiere text.',
        weight: 15,
        lessons: [],
      },
      {
        id: '04-documentare-structura',
        title: 'Documentarea și structura codului',
        description:
          'Comentarii, docstring-uri, indentare, definirea funcțiilor și parametri impliciți.',
        weight: 15,
        lessons: [],
      },
      {
        id: '05-depanare-erori',
        title: 'Depanare și tratarea erorilor',
        description: 'Erori de sintaxă, de execuție și logice; try/except/else/finally.',
        weight: 15,
        lessons: [],
      },
      {
        id: '06-module-instrumente',
        title: 'Operații cu module și instrumente',
        description: 'import, biblioteca standard: math, random, datetime, os.',
        weight: 10,
        lessons: [],
      },
    ],
  },
  {
    id: 'baze-de-date',
    title: 'Baze de date',
    examTitle: 'IT Specialist — Databases',
    tagline:
      'Proiectare relațională, DDL, interogări SELECT și JOIN, manipularea datelor.',
    hue: 160,
    icon: 'database',
    questionTarget: 300,
    exam: {
      questions: 40,
      minutes: 50,
      passPercent: 70,
    },
    modules: [
      {
        id: '01-proiectare',
        title: 'Proiectarea bazelor de date',
        description: 'Tabele, chei primare și externe, relații, normalizare.',
        weight: 25,
        lessons: [],
      },
      {
        id: '02-obiecte',
        title: 'Gestionarea obiectelor bazei de date',
        description:
          'Comenzi DDL: CREATE, ALTER, DROP; tipuri de date, constrângeri, indexuri, vederi.',
        weight: 20,
        lessons: [],
      },
      {
        id: '03-interogare',
        title: 'Extragerea datelor',
        description: 'SELECT, WHERE, ORDER BY, funcții agregate, GROUP BY, HAVING, JOIN.',
        weight: 30,
        lessons: [],
      },
      {
        id: '04-manipulare',
        title: 'Manipularea datelor',
        description: 'INSERT, UPDATE, DELETE și efectele lor asupra datelor.',
        weight: 15,
        lessons: [],
      },
      {
        id: '05-depanare',
        title: 'Depanare',
        description: 'Erori de sintaxă SQL, încălcarea constrângerilor, lucrul cu NULL.',
        weight: 10,
        lessons: [],
      },
    ],
  },
  {
    id: 'retelistica',
    title: 'Rețelistică',
    examTitle: 'IT Specialist — Networking',
    tagline: 'Infrastructură, adresare IP, hardware, protocoale, securitate și depanare.',
    hue: 265,
    icon: 'network',
    questionTarget: 500,
    exam: {
      questions: 40,
      minutes: 50,
      passPercent: 70,
    },
    modules: [
      {
        id: '01-infrastructura',
        title: 'Infrastructura rețelei',
        description:
          'Tipuri de rețele (LAN, WAN), topologii, adresare IPv4 și IPv6, subrețele.',
        weight: 25,
        lessons: [],
      },
      {
        id: '02-hardware',
        title: 'Hardware de rețea',
        description: 'Switch, router, puncte de acces, cabluri și conectori.',
        weight: 20,
        lessons: [],
      },
      {
        id: '03-protocoale-servicii',
        title: 'Protocoale și servicii',
        description: 'Modelul OSI și TCP/IP, TCP vs UDP, porturi, DNS, DHCP, HTTP/HTTPS.',
        weight: 25,
        lessons: [],
      },
      {
        id: '04-securitate',
        title: 'Securitatea rețelei',
        description: 'Firewall, securitate wireless, VPN, amenințări comune.',
        weight: 15,
        lessons: [],
      },
      {
        id: '05-depanare',
        title: 'Depanarea rețelei',
        description:
          'ping, tracert/traceroute, ipconfig, probleme comune de conectivitate.',
        weight: 15,
        lessons: [],
      },
    ],
  },
  {
    id: 'html5',
    title: 'HTML5',
    examTitle: 'IT Specialist — HTML5 Application Development',
    tagline:
      'Elemente semantice, formulare, CSS Flexbox și Grid, JavaScript și API-uri ale browserului.',
    hue: 25,
    icon: 'html',
    questionTarget: 300,
    exam: {
      questions: 40,
      minutes: 50,
      passPercent: 70,
    },
    modules: [
      {
        id: '01-ciclu-viata',
        title: 'Gestionarea ciclului de viață al aplicației',
        description:
          'Publicare, aplicații offline, manifest, service workers, stocare locală.',
        weight: 15,
        lessons: [],
      },
      {
        id: '02-interfata-html5',
        title: 'Construirea interfeței cu HTML5',
        description: 'Elemente semantice, formulare și validare, media, canvas și SVG.',
        weight: 30,
        lessons: [],
      },
      {
        id: '03-formatare-css',
        title: 'Formatarea interfeței cu CSS',
        description:
          'Selectori și specificitate, modelul cutiei, Flexbox, Grid, design responsiv.',
        weight: 25,
        lessons: [],
      },
      {
        id: '04-javascript',
        title: 'Programare cu JavaScript',
        description:
          'Variabile și tipuri, DOM, evenimente, validare, API-uri ale browserului.',
        weight: 30,
        lessons: [],
      },
    ],
  },
  {
    id: 'configurare-dispozitive',
    title: 'Dispozitive',
    examTitle: 'IT Specialist — Device Configuration and Management',
    tagline:
      'Configurare Windows, sisteme de fișiere, permisiuni, securitate și depanare.',
    hue: 330,
    icon: 'device',
    questionTarget: 600,
    exam: {
      questions: 40,
      minutes: 50,
      passPercent: 70,
    },
    modules: [
      {
        id: '01-configurare',
        title: 'Configurarea dispozitivelor',
        description:
          'Setări de sistem, drivere, aplicații la pornire, actualizări, periferice.',
        weight: 30,
        lessons: [],
      },
      {
        id: '02-acces-date',
        title: 'Accesul la date și gestionarea lor',
        description:
          'Sisteme de fișiere, permisiuni, partajare, stocare în cloud, copii de rezervă.',
        weight: 25,
        lessons: [],
      },
      {
        id: '03-securitate',
        title: 'Securitatea dispozitivelor',
        description:
          'Conturi și privilegii, autentificare multi-factor, criptare, actualizări.',
        weight: 25,
        lessons: [],
      },
      {
        id: '04-depanare',
        title: 'Depanare',
        description:
          'Modul sigur, Manager dispozitive, Vizualizator evenimente, restaurarea sistemului.',
        weight: 20,
        lessons: [],
      },
    ],
  },
]

export const courses: Course[] = [...catalog, pythonNextCourse].map((course) => ({
  ...course,
  modules: course.modules.map((module, mi) => ({
    ...module,
    lessons: courseVideos[course.id][mi].map((id, li) => {
      const video = videos[id as keyof typeof videos]
      return {
        id: `${course.id}-short-${mi + 1}-${li + 1}`,
        kind: 'video' as const,
        title: video.title,
        source: video.source,
        license: 'YouTube — embedded original',
        duration: `${Math.floor(video.seconds / 60)}:${String(video.seconds % 60).padStart(2, '0')}`,
        seconds: video.seconds,
        language: 'en' as const,
        url: video.url,
        youtubeId: id,
      }
    }),
  })),
}))

export function getCourse(id: string) {
  return courses.find((c) => c.id === id)
}
export function courseColor(course: Course, l = 0.58, c = 0.17) {
  return `oklch(${l} ${c} ${course.hue})`
}
