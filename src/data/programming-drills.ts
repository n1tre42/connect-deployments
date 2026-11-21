import { drillBuilder, numberOptions, type Bilingual, type Drill } from './drill-builder'
import { readCases, readPair } from './scenario-drills'

const python = drillBuilder('python')
const pyModules = [
  '01-tipuri-date-operatori',
  '02-control-flux',
  '03-intrare-iesire',
  '04-documentare-structura',
  '05-depanare-erori',
  '06-module-instrumente',
]
const outputPrompt: Bilingual = ['Ce afișează programul?', 'What does the program print?']
function py(
  index: number,
  objective: string,
  family: string,
  count: number,
  build: (i: number) => [string, number, number[], Bilingual],
) {
  python.choices(pyModules[index], objective, family, count, (i) => {
    const [code, result, wrong, explanation] = build(i)
    return {
      prompt: outputPrompt,
      type: 'code_output',
      code,
      options: numberOptions(result, ...wrong),
      explanation,
    }
  })
}
py(0, '1.3', 'precedence', 8, (i) => {
  const n = i + 3
  return [
    `print(${n} + ${n + 2} * 3 % 7)`,
    n + (((n + 2) * 3) % 7),
    [((n + n + 2) * 3) % 7, n + (n + 2) * (3 % 7), (n + n + 2) * 3],
    [
      'Înmulțirea și modulo au aceeași prioritate și se evaluează de la stânga. Adunarea vine după ele.',
      'Multiplication and modulo share a precedence level and group from the left. Addition follows.',
    ],
  ]
})
py(0, '1.2', 'slicing', 7, (i) => {
  const n = i + 2
  return [
    `values = [${n}, ${n + 5}, ${n + 8}, ${n + 13}, ${n + 21}]\nprint(sum(values[1:4:2]))`,
    2 * n + 18,
    [2 * n + 26, 2 * n + 29, n + 5],
    [
      'Feliei îi revin indicii 1 și 3. Limita 4 este exclusă.',
      'The slice selects indices 1 and 3. The stop index 4 is excluded.',
    ],
  ]
})
py(1, '2.1', 'branch', 8, (i) => {
  const n = i + 10
  const allowed = n % 3 === 0 || n % 4 === 0
  return [
    `n = ${n}\nif n % 3 == 0 or n % 4 == 0:\n    print(n + 2)\nelse:\n    print(n - 2)`,
    allowed ? n + 2 : n - 2,
    [allowed ? n - 2 : n + 2, n, n * 2],
    [
      'Se verifică dacă cel puțin unul dintre resturi este zero, apoi se execută numai ramura aleasă.',
      'At least one zero remainder satisfies the condition. Only the selected branch executes.',
    ],
  ]
})
py(1, '2.2', 'continue-sum', 9, (i) => {
  const n = i + 4
  const xs = Array.from({ length: n }, (_, k) => k)
  return [
    `total = 0\nfor n in range(${n}):\n    if n % 3 == 1:\n        continue\n    total += n\nprint(total)`,
    xs.filter((x) => x % 3 !== 1).reduce((a, b) => a + b, 0),
    [(n * (n - 1)) / 2, (n * (n + 1)) / 2, n - 1],
    [
      'range exclude limita, iar continue sare peste adunare la restul 1.',
      'range excludes its stop, and continue skips addition for remainder 1.',
    ],
  ]
})
py(1, '2.2', 'nested-count', 8, (i) => {
  const n = i + 3
  return [
    `hits = 0\nfor row in range(${n}):\n    for col in range(row):\n        hits += 1\nprint(hits)`,
    (n * (n - 1)) / 2,
    [n * n, (n * (n + 1)) / 2, n],
    [
      'Bucla interioară rulează de row ori: 0, 1, 2 și așa mai departe.',
      'The inner loop runs row times: 0, 1, 2, and so on.',
    ],
  ]
})
py(1, '2.2', 'break-prefix', 8, (i) => {
  const n = i + 3
  return [
    `total = 0\nfor value in range(1, 15):\n    if value == ${n}:\n        break\n    total += value\nprint(total)`,
    (n * (n - 1)) / 2,
    [(n * (n + 1)) / 2, 105, n],
    [
      'break oprește bucla înainte de adunarea valorii de oprire.',
      'break exits the loop before adding the stopping value.',
    ],
  ]
})
py(2, '3.1', 'file-cursor', 9, (i) => {
  const s = [
    'abcd12',
    'c3p0a9',
    'ba3d2q',
    'j7vw0r',
    'tkm5dz',
    'p3s7ab',
    'w01cde',
    '87zqtm',
    'j01up5',
  ][i]
  return [
    `from io import StringIO\nwith StringIO("${s}") as stream:\n    first = stream.read(${(i % 3) + 1})\n    second = stream.read(2)\n    print(stream.tell())`,
    (i % 3) + 3,
    [2, (i % 3) + 1, s.length],
    [
      'Citirile avansează cursorul. tell returnează poziția după ambele citiri în acest flux.',
      'Each read advances the cursor. tell returns its position after both reads in this stream.',
    ],
  ]
})
py(2, '3.1', 'records', 9, (i) => {
  const n = i + 11
  return [
    `from io import StringIO\nstream = StringIO("${n};3\\n${n + 4};1\\n${n + 7};3\\n")\ncount = 0\nfor line in stream:\n    price, group = line.strip().split(";")\n    if group == "3":\n        count += int(price)\nprint(count)`,
    2 * n + 7,
    [3 * n + 11, n + 4, 6],
    [
      'Se citesc rândurile, se separă cele două câmpuri și se adună prețurile din grupa 3.',
      'Read each line, split its two fields, and add prices from group 3.',
    ],
  ]
})
py(2, '3.2', 'argument-index', 9, (i) => {
  const n = i + 5
  return [
    `argv = ["score.py", "${n}", "${n + 10}"]\nprint(int(argv[2]) - len(argv[1]))`,
    n + 10 - String(n).length,
    [n + 10, n + 9, n],
    [
      'argv[0] este numele programului. argv[2] este al doilea argument; len măsoară textul primului argument.',
      'argv[0] is the program name. argv[2] is the second argument; len measures the first argument’s text.',
    ],
  ]
})
py(3, '4.2', 'keyword-default', 10, (i) => {
  const n = i + 2
  return [
    `def cost(units, price=${n + 2}, fee=${n}):\n    return units * price + fee\n\nprint(cost(3, fee=${n + 5}))`,
    4 * n + 11,
    [4 * n + 6, 3 * (n + 5) + n, 3 * (n + 5) + (n + 5)],
    [
      'Argumentul numit schimbă fee. price folosește valoarea implicită.',
      'The keyword argument overrides fee. price uses its default.',
    ],
  ]
})
py(3, '4.2', 'return-value', 9, (i) => {
  const n = i + 7
  return [
    `def step(value):\n    value += ${n}\n    return value // 3\n\na = ${n + 11}\nb = step(a)\nprint(a - b)`,
    n + 11 - Math.floor((2 * n + 11) / 3),
    [n + 11, Math.floor((2 * n + 11) / 3), 2 * n + 11],
    [
      'Funcția întoarce câtul. Modificarea parametrului local nu reasignează variabila a.',
      'The function returns the quotient. Reassigning its local parameter does not reassign a.',
    ],
  ]
})
py(4, '5.2', 'try-else-finally', 8, (i) => {
  const n = i + 5
  const good = i % 2 === 0
  return [
    `score = ${n}\ntry:\n    score += int("${good ? '4' : '4x'}")\nexcept ValueError:\n    score -= 2\nelse:\n    score *= 2\nfinally:\n    score += 1\nprint(score)`,
    good ? 2 * (n + 4) + 1 : n - 1,
    [n + 5, 2 * (n - 2) + 1, n - 2],
    [
      'else rulează numai fără excepție. finally adaugă întotdeauna un punct înainte de print.',
      'else runs only if there was no exception. finally adds a point before print in either case.',
    ],
  ]
})
py(4, '5.3', 'assertions', 7, (i) => {
  const n = i + 3
  return [
    `import unittest\ntest = unittest.TestCase()\npoints = 0\nfor value in [${n}, ${n + 2}, ${n - 1}]:\n    try:\n        test.assertGreaterEqual(value, ${n})\n    except AssertionError:\n        points -= 1\n    else:\n        points += ${n}\nprint(points)`,
    2 * n - 1,
    [n - 2, 3 * n, n],
    [
      'assertGreaterEqual permite egalitatea. Două valori trec și una declanșează AssertionError.',
      'assertGreaterEqual allows equality. Two values pass and one raises AssertionError.',
    ],
  ]
})
py(5, '6.2', 'math-sizes', 9, (i) => {
  const n = 13 + 2 * i
  return [
    `from math import ceil, floor\nprint(ceil(${n} / 4) + floor(${n} / 6))`,
    Math.ceil(n / 4) + Math.floor(n / 6),
    [
      Math.floor(n / 4) + Math.floor(n / 6),
      Math.ceil(n / 4) + Math.ceil(n / 6),
      Math.ceil(n / 4 + n / 6),
    ],
    [
      'ceil rotunjește în sus, iar floor în jos. Rezultatele se adună după rotunjire.',
      'ceil rounds up and floor rounds down. Add the two rounded results.',
    ],
  ]
})
py(5, '6.2', 'date-delta', 8, (i) => {
  const n = i + 22,
    k = i + 8
  return [
    `from datetime import date, timedelta\nstart = date(2024, 2, ${n})\nprint((start + timedelta(days=${k})).day)`,
    n + k - 29,
    [n + k - 28, n + k - 30, k],
    [
      '2024 este an bisect: februarie are 29 de zile. timedelta mută data cu numărul exact de zile.',
      '2024 is a leap year with 29 days in February. timedelta advances the exact number of days.',
    ],
  ]
})
py(5, '6.1', 'path-stem', 8, (i) => {
  const stem = [
    'table',
    'draft-v2',
    'stats.2026',
    'a.b.c',
    'week_20',
    'schedule',
    'image02',
    'chapter-12',
  ][i]
  return [
    `import posixpath as path\nname = path.basename("/work/archive/${stem}.txt")\nprint(len(path.splitext(name)[0]))`,
    stem.length,
    [stem.length + 4, 3, 14 + stem.length],
    [
      'basename păstrează numele fișierului; splitext separă doar extensia finală .txt.',
      'basename keeps the final file name. splitext removes only the final .txt extension.',
    ],
  ]
})

export const pythonDrills = python.questions

const html = drillBuilder('html5')
const htmlModules = [
  '01-ciclu-viata',
  '02-interfata-html5',
  '03-formatare-css',
  '04-javascript',
]
function webCases(
  module: number,
  objective: string,
  family: string,
  count: number,
  title: Bilingual,
  rows: Parameters<typeof html.cases>[5],
) {
  html.cases(htmlModules[module], objective, family, count, title, rows)
}
function webChoices(
  module: number,
  objective: string,
  family: string,
  count: number,
  make: (i: number) => Drill,
) {
  html.choices(htmlModules[module], objective, family, count, make)
}
webChoices(2, '4.4', 'grid-span', 9, (i) => {
  const cell = 90 + i * 10,
    gap = 8 + i * 2
  return {
    prompt: [
      `O grilă are coloane de ${cell}px și spațiu de ${gap}px între coloane. Ce lățime acoperă un element întins pe două coloane?`,
      `A grid has ${cell}px columns and a ${gap}px gap. How wide is the area spanning two columns?`,
    ],
    options: numberOptions(2 * cell + gap, 2 * cell, 2 * cell + 2 * gap, cell + gap),
    explanation: [
      'Aria ocupă două coloane și intervalul dintre ele.',
      'The area takes up two columns plus the gap between them.',
    ],
  }
})
webChoices(3, '5.2', 'js-map-filter', 9, (i) => {
  const n = i + 3
  const result = [n, n + 1, n + 2]
    .filter((x) => x % 2 === 0)
    .map((x) => x * 3)
    .reduce((a, b) => a + b, 0)
  return {
    prompt: ['Ce număr afișează JavaScript?', 'What number does JavaScript log?'],
    code: `const xs = [${n}, ${n + 1}, ${n + 2}];\nconsole.log(xs.filter(x => x % 2 === 0).map(x => 3 * x).reduce((sum, x) => sum + x, 0));`,
    options: numberOptions(result, 9 * (n + 1), result / 3, n + 1),
    explanation: [
      'filter păstrează valorile pare, map le înmulțește cu 3, iar reduce le adună.',
      'filter keeps even values, map multiplies them by 3, and reduce sums them.',
    ],
  }
})
webChoices(3, '5.1', 'js-default', 8, (i) => {
  const n = i + 4
  return {
    prompt: ['Ce număr afișează JavaScript?', 'What number does JavaScript log?'],
    code: `class Order {\n  constructor(qty, fee = ${n + 3}) { this.qty = qty; this.fee = fee; }\n  total() { return this.qty * 2 + this.fee; }\n}\nconsole.log(new Order(${n}, 0).total());`,
    options: numberOptions(2 * n, 3 * n + 3, n, 3 * n),
    explanation: [
      'Valoarea implicită se folosește dacă argumentul lipsește sau este undefined. Valoarea 0 este transmisă explicit.',
      'The default applies if the argument is missing or undefined. The value 0 is supplied explicitly.',
    ],
  }
})
webCases(
  0,
  '1.1',
  'release-cycle',
  9,
  readPair('De la cerințe la publicare|From requirements to deployment'),
  readCases([
    'Notează ce trebuie să poată face utilizatorul|Record what the user needs to be able to do > Definirea cerințelor|Requirements',
    'Construiește o schiță pentru fluxul paginilor|Sketch the page flow > Proiectare|Design',
    'Transformă schița în pagini utilizabile|Turn the sketch into usable pages > Implementare|Implementation',
    'Verifică cerințele cu scenarii repetabile|Check requirements with repeatable scenarios > Testare|Testing',
    'Publică versiunea verificată pe server|Make the verified release available on the server > Publicare|Deployment',
  ]),
)
webCases(
  0,
  '1.2',
  'web-debug',
  9,
  readPair('Depanarea unei aplicații web|Debugging a web app'),
  readCases([
    'Verifică elemente HTML cu închideri incorecte|Check HTML for incorrectly closed elements > Validator HTML|HTML validator',
    'Identifică răspunsurile HTTP 404 din încărcarea paginii|Identify HTTP 404 responses during page load > Panoul Network|Network panel',
    'Identifică regula care suprascrie o culoare|Find the rule overriding a colour > Panoul Styles|Styles panel',
    'Oprește execuția înainte de a modifica variabila|Pause execution before changing a variable > Breakpoint',
    'Citește stiva unei excepții JavaScript în timpul rulării|Read the stack of a runtime JavaScript exception > Consola browserului|Browser console',
  ]),
)
webCases(
  1,
  '2.1',
  'canvas-methods',
  13,
  readPair('Contextul Canvas 2D|Canvas 2D context'),
  readCases([
    'Șterge un dreptunghi din cadrul precedent|Clear a rectangular area from the previous frame > clearRect(x, y, w, h)',
    'Pornește un traseu separat de traseele anterioare|Start a path separate from the previous paths > beginPath()',
    'Desenează direct o zonă dreptunghiulară plină|Draw a filled rectangular area directly > fillRect(x, y, w, h)',
    'Aplică stilul curent liniei din traseu|Paint the outline of the current path > stroke()',
    'Programează desenarea următorului cadru|Schedule drawing for the next frame > requestAnimationFrame(draw)',
  ]),
)
webCases(
  1,
  '2.2',
  'svg-shapes',
  12,
  readPair('Elemente SVG|SVG elements'),
  readCases([
    'Cerc cu centru cx, cy și rază r|Circle with centre cx, cy and radius r > <circle>',
    'Linie cu capete x1, y1 și x2, y2|Line with endpoints x1, y1 and x2, y2 > <line>',
    'Poligon închis definit prin mai multe puncte|Closed polygon defined by a list of points > <polygon>',
    'Formă compusă descrisă prin comenzi în atributul d|Composite shape described by commands in the d attribute > <path>',
    'Dreptunghi definit prin width și height|Rectangle defined by width and height > <rect>',
  ]),
)
webCases(
  1,
  '3.1',
  'form-elements',
  12,
  readPair('Elementele unui formular|Form elements'),
  readCases([
    'Grupează câmpuri legate semantic|Group related fields semantically > <fieldset>',
    'Oferă un titlu grupului de câmpuri|Give the group of fields a caption > <legend>',
    'Sugerează valori fără să le facă obligatorii|Suggest values without making them mandatory > <datalist>',
    'Prezintă rezultatul unui calcul din formular|Represent the result of a calculation in the form > <output>',
    'Indică o valoare scalară într-un interval cunoscut|Indicate a scalar measurement in a known range > <meter>',
  ]),
)
webCases(
  2,
  '2.4',
  'css-filters',
  13,
  readPair('Filtre CSS pentru imagini|CSS image filters'),
  readCases([
    'Transformă imaginea în tonuri de gri|Turn an image to grayscale > grayscale(1)',
    'Înmoaie detaliile cu raza de 4 pixeli|Soften details with a radius of 4 pixels > blur(4px)',
    'Crește luminozitatea la 130%|Increase brightness to 130% > brightness(1.3)',
    'Inversarea completă a culorilor|Fully invert colours > invert(1)',
    'Aplică o nuanță sepia completă|Apply the full sepia effect > sepia(1)',
  ]),
)
webCases(
  2,
  '4.3',
  'flex-layout',
  13,
  readPair('Aliniere în Flexbox|Flexbox alignment'),
  readCases([
    'Distribuie spațiul liber între elemente, cu margini fără spațiu extra|Distribute free space between items with no extra edge space > justify-content: space-between',
    'Centrează toate elementele pe axa transversală|Centre all items on the cross axis > align-items: center',
    'Permite elementelor să formeze mai multe rânduri|Allow items to form several lines > flex-wrap: wrap',
    'Aliniază un singur element la capătul axei transversale|Align one item at the end of the cross axis > align-self: flex-end',
    'Schimbă axa principală în direcția verticală obișnuită|Change the main axis to the usual vertical direction > flex-direction: column',
  ]),
)
webCases(
  3,
  '5.3',
  'event-flow',
  11,
  readPair('Evenimente JavaScript|JavaScript events'),
  readCases([
    "Abonează o funcție la apăsarea unui buton|Register a function for a button click > addEventListener('click', handler)",
    'Împiedică trimiterea implicită a formularului din handler|Prevent the form’s default submission in a handler > event.preventDefault()',
    'Oprește propagarea evenimentului către strămoși|Stop the event from propagating to ancestors > event.stopPropagation()',
    'Identifică elementul unde a pornit evenimentul|Identify the element where the event originated > event.target',
    'Identifică elementul al cărui handler rulează acum|Identify the element whose handler is running > event.currentTarget',
  ]),
)
webCases(
  3,
  '5.2',
  'json-requests',
  11,
  readPair('Schimb de date în browser|Browser data exchange'),
  readCases([
    'Transformă textul JSON în valoare JavaScript|Turn JSON text into a JavaScript value > JSON.parse(raw)',
    'Transformă o valoare JavaScript în text JSON|Turn a JavaScript value into JSON text > JSON.stringify(data)',
    'Inițiază o cerere HTTP din browser|Start an HTTP request from a browser > fetch(url)',
    'Citește date JSON din corpul răspunsului HTTP|Read JSON data from an HTTP response body > response.json()',
    'Verifică dacă răspunsul a avut un statut din intervalul 200–299|Check whether a response status was in the 200–299 range > response.ok',
  ]),
)
export const htmlDrills = html.questions
