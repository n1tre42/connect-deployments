import { bilingual as b } from '@/lib/translations'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import type { ChoiceQuestion, Question } from './questions'
type Pair = readonly [string, string]
const bank: Record<string, Question[]> = {}
function add(
  course: string,
  module: string,
  objective: string,
  prompt: Pair,
  answers: Pair[],
  explanation: Pair,
  extra: Partial<ChoiceQuestion> = {},
) {
  const id = `${course}-${module.slice(0, 2)}-review-${String((bank[course]?.length ?? 0) + 1).padStart(3, '0')}`
  const q: ChoiceQuestion = {
    id,
    module,
    conceptId: `${course}-review-${objective}-${hashString(prompt[1])}`,
    objectiveIds: [objective],
    mappingStatus: 'reviewed',
    text: b(...prompt),
    type: 'single',
    difficulty: 'medium',
    options: shuffle(
      answers.map((a, i) => ({ id: String(i), text: b(...a) })),
      seededRandom(hashString(id)),
    ),
    correct: ['0'],
    explanation: b(...explanation),
    ...extra,
  }
  ;(bank[course] ??= []).push(q)
}
const same = (s: string): Pair => [s, s]
const py = (
  objective: string,
  prompt: Pair,
  answers: string[],
  explanation: Pair,
  extra: Partial<ChoiceQuestion> = {},
) => {
  const domain = objective.split('.')[0]
  const modules: Record<string, string> = {
    '1': '01-tipuri-date-operatori',
    '2': '02-control-flux',
    '3': '03-intrare-iesire',
    '4': '04-documentare-structura',
    '5': '05-depanare-erori',
    '6': '06-module-instrumente',
  }
  add('python', modules[domain], objective, prompt, answers.map(same), explanation, extra)
  const ng: Record<string, string> = {
    '1': '03-collections',
    '2': '02-flow',
    '3': '05-files',
    '4': '04-functions',
    '5': '06-errors',
    '6': '07-objects',
  }
  add(
    'python-next-generation',
    ng[domain],
    objective,
    prompt,
    answers.map(same),
    explanation,
    extra,
  )
}
py(
  '5.3',
  [
    'Ce metodă unittest verifică egalitatea valorilor?',
    'Which unittest method checks equality of values?',
  ],
  ['assertEqual(a, b)', 'assertIs(a, b)', 'assertIn(a, b)', 'assertTrue(a, b)'],
  [
    'assertEqual verifică valorile. assertIs verifică identitatea obiectelor.',
    'assertEqual checks values. assertIs checks object identity.',
  ],
)
py(
  '5.3',
  [
    'Două liste egale sunt obiecte diferite. Ce verificare de identitate eșuează?',
    'Two equal lists are separate objects. Which identity check fails?',
  ],
  [
    'self.assertIs(a, b)',
    'self.assertEqual(a, b)',
    'self.assertIn(1, a)',
    'self.assertTrue(a == b)',
  ],
  [
    'assertIs cere același obiect; două liste construite separat nu au aceeași identitate.',
    'assertIs requires the same object; separately constructed lists do not share identity.',
  ],
  { code: 'a = [1]\nb = [1]' },
)
py(
  '5.3',
  [
    'Ce metodă verifică dacă 3 se află în values?',
    'Which method checks whether 3 is in values?',
  ],
  [
    'self.assertIn(3, values)',
    'self.assertIs(3, values)',
    'self.assertEqual(3, values)',
    'self.assertIsInstance(3, values)',
  ],
  [
    'assertIn verifică apartenența unui element la un container.',
    'assertIn checks whether an item belongs to a container.',
  ],
)
py(
  '5.3',
  [
    'Ce apel verifică dacă value este instanță de int?',
    'Which call checks whether value is an int instance?',
  ],
  [
    'self.assertIsInstance(value, int)',
    'self.assertEqual(value, int)',
    'self.assertIn(value, int)',
    'self.assertIs(value, int)',
  ],
  [
    'assertIsInstance verifică tipul prin isinstance; nu compară valoarea cu obiectul clasei.',
    'assertIsInstance uses isinstance; it does not compare the value with the class object.',
  ],
)
py(
  '4.1',
  [
    'Ce comandă afișează documentația modulului math în terminal?',
    'Which terminal command displays documentation for the math module?',
  ],
  [
    'python -m pydoc math',
    'python -m unittest math',
    'python math --install',
    'python -m pip math',
  ],
  [
    'pydoc generează documentație din module și docstring-uri.',
    'pydoc generates documentation from modules and docstrings.',
  ],
)
py(
  '3.2',
  [
    'În comanda python app.py Ana, ce conține sys.argv[1]?',
    'In python app.py Ana, what is sys.argv[1]?',
  ],
  ['Ana', 'app.py', 'python', '1'],
  [
    'sys.argv[0] este numele scriptului; primul argument urmează la indexul 1.',
    'sys.argv[0] is the script name; the first argument follows at index 1.',
  ],
)
py(
  '6.1',
  [
    'Ce apel verifică existența căii fără să deschidă fișierul?',
    'Which call checks whether a path exists without opening the file?',
  ],
  ['os.path.exists(path)', 'os.getcwd(path)', 'sys.argv(path)', 'io.close(path)'],
  [
    'os.path.exists întoarce un bool și nu citește conținutul fișierului.',
    'os.path.exists returns a bool without reading the file contents.',
  ],
)
py(
  '6.2',
  ['Ce returnează math.frexp(8.0)?', 'What does math.frexp(8.0) return?'],
  ['(0.5, 4)', '(8, 0)', '(2, 3)', '4.0'],
  [
    '8.0 = 0.5 × 2**4; frexp returnează mantisa și exponentul.',
    '8.0 = 0.5 × 2**4; frexp returns the mantissa and exponent.',
  ],
)
py(
  '6.2',
  [
    'Cum verifici corect dacă x este NaN?',
    'How do you correctly check whether x is NaN?',
  ],
  ['math.isnan(x)', 'x == math.nan', 'x is float', 'x == "NaN"'],
  [
    'NaN nu este egal cu el însuși; folosește math.isnan.',
    'NaN is not equal to itself; use math.isnan.',
  ],
)
py(
  '6.2',
  [
    'Ce șablon strftime produce 2026-11-06?',
    'Which strftime pattern produces 2026-11-06?',
  ],
  ['%Y-%m-%d', '%d-%Y-%m', '%H-%M-%S', '%m/%d/%y'],
  [
    '%Y este anul cu patru cifre, %m luna și %d ziua.',
    '%Y is the four-digit year, %m the month, and %d the day.',
  ],
)
py(
  '4.2',
  [
    'Completează cuvântul care trimite valoarea către apelant.',
    'Fill in the keyword that sends the value to the caller.',
  ],
  ['return'],
  [
    'return trimite o valoare și încheie apelul funcției. print doar afișează.',
    'return sends a value and ends the function call. print only displays it.',
  ],
  {
    type: 'fill_blank',
    acceptedText: ['return'],
    code: 'def double(n):\n    ____ n * 2',
  },
)
py(
  '3.1',
  [
    'Ordonează pașii pentru a citi un fișier în siguranță.',
    'Order the steps to read a file safely.',
  ],
  [
    'Deschide cu with / Open with with',
    'Citește în bloc / Read inside the block',
    'Ieși din bloc / Leave the block',
  ],
  [
    'Context managerul deschide fișierul și îl închide la ieșirea din bloc, inclusiv la erori.',
    'The context manager opens the file and closes it on leaving the block, including on errors.',
  ],
  { type: 'sequence', sequence: ['0', '1', '2'] },
)
const db = (obj: string, p: Pair, a: Pair[], e: Pair, x: Partial<ChoiceQuestion> = {}) =>
  add(
    'baze-de-date',
    (
      {
        '1': '01-proiectare',
        '2': '02-obiecte',
        '3': '03-interogare',
        '4': '04-manipulare',
        '5': '05-depanare',
      } as Record<string, string>
    )[obj[0]],
    obj,
    p,
    a,
    e,
    x,
  )
db(
  '1.6',
  [
    'Ce comandă retrage un privilegiu acordat anterior?',
    'Which statement withdraws a previously granted privilege?',
  ],
  ['REVOKE', 'GRANT', 'COMMIT', 'SELECT'].map(same),
  [
    'REVOKE retrage privilegii; GRANT le acordă.',
    'REVOKE withdraws privileges; GRANT grants them.',
  ],
)
db(
  '1.6',
  [
    'Ce tehnică ascunde o parte dintr-o valoare sensibilă afișată?',
    'Which technique hides part of a sensitive displayed value?',
  ],
  [
    ['Mascare', 'Masking'],
    ['Indexare', 'Indexing'],
    ['Normalizare', 'Normalization'],
    ['Sortare', 'Sorting'],
  ],
  [
    'Mascarea limitează expunerea valorii afișate; nu este echivalentă cu criptarea stocării.',
    'Masking limits exposure of a displayed value; it is not equivalent to encrypting storage.',
  ],
)
db(
  '1.6',
  [
    'Ce urmărești prin auditarea accesului la date?',
    'What do you track through data-access auditing?',
  ],
  [
    ['Cine a efectuat acțiuni și când', 'Who performed actions and when'],
    ['Doar ordinea coloanelor', 'Only column order'],
    ['Dimensiunea ecranului', 'Screen size'],
    ['Numai cheia primară', 'Only the primary key'],
  ],
  [
    'Auditul înregistrează activități pentru trasabilitate și investigație.',
    'Auditing records activity for traceability and investigation.',
  ],
)
db(
  '3.1',
  ['Ce returnează NULLIF(5, 5)?', 'What does NULLIF(5, 5) return?'],
  ['NULL', '5', '0', 'TRUE'].map(same),
  [
    'NULLIF returnează NULL când expresiile sunt egale, altfel prima expresie.',
    'NULLIF returns NULL when the expressions are equal, otherwise the first expression.',
  ],
)
db(
  '3.1',
  [
    'Ce operator păstrează rândurile prezente în ambele rezultate compatibile?',
    'Which operator keeps rows present in both compatible result sets?',
  ],
  ['INTERSECT', 'UNION ALL', 'CROSS JOIN', 'ORDER BY'].map(same),
  [
    'INTERSECT exprimă intersecția rezultatelor. Suportul concret depinde de versiunea SGBD.',
    'INTERSECT expresses set intersection. Concrete support depends on the DBMS version.',
  ],
)
db(
  '2.3',
  [
    'De ce folosești un parametru de intrare într-o procedură stocată?',
    'Why use an input parameter in a stored procedure?',
  ],
  [
    [
      'Pentru a reutiliza logica pentru valori diferite',
      'To reuse logic for different values',
    ],
    ['Pentru a șterge schema automat', 'To delete the schema automatically'],
    ['Pentru a elimina toate permisiunile', 'To remove all permissions'],
    ['Pentru a evita orice validare', 'To avoid all validation'],
  ],
  [
    'Parametrul transmite date apelului; logica poate fi reutilizată.',
    'The parameter supplies data to the call; the logic can be reused.',
  ],
)
db(
  '1.6',
  [
    'Selectează două măsuri care reduc expunerea datelor.',
    'Select two measures that reduce data exposure.',
  ],
  [
    ['Privilegii minime', 'Least privilege'],
    ['Mascarea datelor afișate', 'Masking displayed data'],
    ['Toți utilizatorii sunt administratori', 'Make every user an administrator'],
    ['Oprirea jurnalelor de audit', 'Disable audit logs'],
  ],
  [
    'Privilegiile minime și mascarea reduc accesul sau expunerea inutilă.',
    'Least privilege and masking reduce unnecessary access or exposure.',
  ],
  { type: 'multiple', correct: ['0', '1'] },
)
db(
  '3.2',
  [
    'Completează cuvântul SQL pentru filtrarea rândurilor înainte de agregare.',
    'Fill in the SQL keyword that filters rows before aggregation.',
  ],
  ['WHERE'].map(same),
  [
    'WHERE filtrează rânduri; HAVING filtrează grupuri după agregare.',
    'WHERE filters rows; HAVING filters groups after aggregation.',
  ],
  {
    type: 'fill_blank',
    acceptedText: ['WHERE', 'where'],
    code: 'SELECT name FROM Students ____ grade >= 9;',
  },
)
const html = (
  obj: string,
  p: Pair,
  a: Pair[],
  e: Pair,
  x: Partial<ChoiceQuestion> = {},
) =>
  add(
    'html5',
    obj.startsWith('1')
      ? '01-ciclu-viata'
      : obj.startsWith('5')
        ? '04-javascript'
        : obj.startsWith('4') || obj.startsWith('2')
          ? '03-formatare-css'
          : '02-interfata-html5',
    obj,
    p,
    a,
    e,
    x,
  )
html(
  '2.1',
  [
    'Ce obiect primești din canvas.getContext("2d")?',
    'What do you get from canvas.getContext("2d")?',
  ],
  [
    ['Un context de desenare 2D', 'A 2D drawing context'],
    ['Un element SVG', 'An SVG element'],
    ['Un server HTTP', 'An HTTP server'],
    ['O foaie CSS', 'A CSS stylesheet'],
  ],
  [
    'Contextul oferă operații de desenare; canvas nu creează noduri DOM pentru fiecare formă.',
    'The context provides drawing operations; canvas does not create DOM nodes for each shape.',
  ],
)
html(
  '2.1',
  [
    'Ce metodă desenează un dreptunghi plin într-un context canvas 2D?',
    'Which method draws a filled rectangle in a 2D canvas context?',
  ],
  [
    'fillRect(x, y, w, h)',
    'createElement("rect")',
    'fillCircle(x, y)',
    'appendChild("rect")',
  ].map(same),
  [
    'fillRect folosește poziția și dimensiunile dreptunghiului.',
    'fillRect uses the rectangle position and dimensions.',
  ],
)
html(
  '2.2',
  [
    'Care avantaj este specific graficii SVG?',
    'Which benefit is characteristic of SVG graphics?',
  ],
  [
    [
      'Formele vectoriale se scalează fără pixelare geometrică',
      'Vector shapes scale without geometric pixelation',
    ],
    ['Necesită doar pixeli fixați', 'It only uses fixed pixels'],
    ['Nu poate fi stilizată', 'It cannot be styled'],
    ['Este exclusiv audio', 'It is audio only'],
  ],
  [
    'SVG descrie forme vectoriale și poate integra elemente în DOM.',
    'SVG describes vector shapes and can integrate elements into the DOM.',
  ],
)
html(
  '2.4',
  ['Ce regulă CSS estompează o imagine?', 'Which CSS rule blurs an image?'],
  ['filter: blur(4px);', 'transform: blur(4px);', 'display: blur;', 'opacity: 4px;'].map(
    same,
  ),
  [
    'blur este o funcție pentru proprietatea filter; opacity controlează transparența.',
    'blur is a function for the filter property; opacity controls transparency.',
  ],
)
html(
  '2.3',
  [
    'Ce definește etapele unei animații CSS?',
    'What defines the stages of a CSS animation?',
  ],
  ['@keyframes', '@media', '@import', '@charset'].map(same),
  [
    '@keyframes descrie stările animației la momente relative.',
    '@keyframes describes animation states at relative times.',
  ],
)
html(
  '5.1',
  [
    'Ce cuvânt cheie extinde o clasă JavaScript?',
    'Which keyword extends a JavaScript class?',
  ],
  ['extends', 'implements', 'inherits', 'include'].map(same),
  [
    'extends declară moștenirea; super permite apelarea constructorului părinte.',
    'extends declares inheritance; super can call the parent constructor.',
  ],
)
html(
  '5.3',
  [
    'Ce descrie propagarea bubbling a unui click?',
    'What describes click-event bubbling?',
  ],
  [
    [
      'Evenimentul urcă de la țintă spre strămoși',
      'The event travels from the target toward ancestors',
    ],
    [
      'Evenimentul pornește întotdeauna de la window către țintă',
      'The event always starts at window and travels to the target',
    ],
    ['Oprește toate evenimentele', 'It stops every event'],
    ['Schimbă automat HTML-ul', 'It automatically changes HTML'],
  ],
  [
    'Bubbling urcă prin strămoși; capturarea este faza în direcția opusă.',
    'Bubbling travels through ancestors; capture is the phase in the opposite direction.',
  ],
)
html(
  '5.4',
  [
    'Ce condiție cere în mod normal accesul la Geolocation în browser?',
    'What does browser Geolocation normally require?',
  ],
  [
    [
      'Context securizat și permisiunea utilizatorului',
      'A secure context and user permission',
    ],
    ['Dezactivarea HTTPS', 'Disabling HTTPS'],
    ['O parolă SQL', 'An SQL password'],
    ['Instalarea SVG', 'Installing SVG'],
  ],
  [
    'Geolocation expune poziția; browserul controlează accesul prin permisiuni.',
    'Geolocation exposes location; the browser controls access through permissions.',
  ],
)
html(
  '5.4',
  [
    'Ce permite biblioteca Google Charts?',
    'What does the Google Charts library provide?',
  ],
  [
    ['Vizualizări grafice bazate pe date', 'Data-based chart visualizations'],
    ['Autentificare Windows', 'Windows authentication'],
    ['Partiționare de disc', 'Disk partitioning'],
    ['Compilarea Python', 'Python compilation'],
  ],
  [
    'Biblioteca creează diagrame din date; nu înlocuiește validarea datelor.',
    'The library creates charts from data; it does not replace data validation.',
  ],
)
html(
  '5.4',
  ['Ce reprezintă jQuery?', 'What is jQuery?'],
  [
    [
      'O bibliotecă JavaScript pentru DOM și evenimente',
      'A JavaScript library for DOM and events',
    ],
    ['Un tip de bază de date', 'A database type'],
    ['Un browser', 'A browser'],
    ['Un format vectorial', 'A vector format'],
  ],
  [
    'jQuery este o bibliotecă; multe sarcini au și echivalente în API-urile native ale browserului.',
    'jQuery is a library; many tasks also have equivalents in native browser APIs.',
  ],
)
html(
  '3.1',
  [
    'Selectează elementele care grupează controale și descriu grupul.',
    'Select the elements that group controls and label the group.',
  ],
  ['fieldset', 'legend', 'canvas', 'script'].map(same),
  [
    'fieldset grupează controalele; legend oferă eticheta grupului.',
    'fieldset groups controls; legend labels the group.',
  ],
  { type: 'multiple', correct: ['0', '1'] },
)
html(
  '2.2',
  ['Completează numele elementului vectorial.', 'Fill in the vector element name.'],
  ['svg'].map(same),
  [
    'Elementul svg conține forme vectoriale precum circle.',
    'The svg element contains vector shapes such as circle.',
  ],
  {
    type: 'fill_blank',
    acceptedText: ['svg'],
    code: '<____ viewBox="0 0 100 100"><circle cx="50" cy="50" r="20" /></____>',
  },
)
const device = (
  obj: string,
  p: Pair,
  a: Pair[],
  e: Pair,
  x: Partial<ChoiceQuestion> = {},
) =>
  add(
    'configurare-dispozitive',
    obj.startsWith('1') || obj.startsWith('2')
      ? '01-configurare'
      : obj.startsWith('3')
        ? '02-acces-date'
        : obj.startsWith('4')
          ? '03-securitate'
          : '04-depanare',
    obj,
    p,
    a,
    e,
    x,
  )
device(
  '1.2',
  [
    'Ce oferă Active Directory într-un domeniu Windows?',
    'What does Active Directory provide in a Windows domain?',
  ],
  [
    [
      'Administrare centralizată a utilizatorilor, grupurilor și calculatoarelor',
      'Centralized management of users, groups and computers',
    ],
    ['Numai redarea audio', 'Only audio playback'],
    ['Doar formatarea USB', 'Only USB formatting'],
    ['O copie locală a fiecărui fișier', 'A local copy of every file'],
  ],
  [
    'Serviciile de director organizează identități și dispozitive pentru administrare centralizată.',
    'Directory services organize identities and devices for centralized administration.',
  ],
)
device(
  '1.2',
  [
    'Ce mecanism distribuie setări administrate către calculatoare din domeniu?',
    'Which mechanism distributes managed settings to domain computers?',
  ],
  ['Group Policy', 'ClearType', 'Disk Cleanup', 'Task View'].map(same),
  [
    'Group Policy aplică politici definite de administratori; setările locale pot fi suprascrise conform regulilor de precedență.',
    'Group Policy applies administrator-defined policies; local settings may be overridden according to precedence rules.',
  ],
)
device(
  '2.2',
  [
    'Cum tratezi un răspuns Copilot despre o configurație Windows?',
    'How should you treat a Copilot answer about Windows configuration?',
  ],
  [
    [
      'Verifici instrucțiunile și efectul înainte de aplicare',
      'Verify instructions and their effect before applying them',
    ],
    ['Îl aplici fără verificare', 'Apply it without review'],
    [
      'Presupui că are mereu permisiuni administrative',
      'Assume it always has administrative privileges',
    ],
    ['Dezactivezi antivirusul pentru a-l folosi', 'Disable antivirus to use it'],
  ],
  [
    'Asistența AI poate fi greșită și nu înlocuiește verificarea sau permisiunile utilizatorului.',
    'AI assistance may be wrong and does not replace verification or user permissions.',
  ],
)
device(
  '1.6',
  [
    'Ce caracteristică citește cu voce tare elemente ale interfeței?',
    'Which feature reads interface elements aloud?',
  ],
  ['Narrator', 'ClearType', 'BitLocker', 'Disk Management'].map(same),
  [
    'Narrator este cititorul de ecran; ClearType optimizează redarea textului.',
    'Narrator is the screen reader; ClearType optimizes text rendering.',
  ],
)
device(
  '1.6',
  [
    'Ce opțiune transcrie audio în text pe ecran?',
    'Which option transcribes audio into on-screen text?',
  ],
  ['Live captions', 'Voice Access', 'Sticky Keys', 'Magnifier'].map(same),
  [
    'Live captions afișează subtitrări; Voice Access este orientat spre comenzi vocale.',
    'Live captions displays captions; Voice Access focuses on voice commands.',
  ],
)
device(
  '2.4',
  [
    'Care conexiune transportă audio digital optic?',
    'Which connection carries optical digital audio?',
  ],
  ['S/PDIF optical', 'VGA', 'RJ-11', 'PS/2'].map(same),
  [
    'S/PDIF optic transmite audio digital printr-un cablu optic.',
    'Optical S/PDIF carries digital audio through an optical cable.',
  ],
)
device(
  '2.5',
  [
    'Ce mod arată același conținut pe două ecrane?',
    'Which mode shows the same content on two displays?',
  ],
  [
    ['Duplicare', 'Duplicate'],
    ['Extindere', 'Extend'],
    ['Numai ecranul 1', 'Display 1 only'],
    ['Deconectare', 'Disconnect'],
  ],
  [
    'Duplicarea oglindește conținutul; extinderea mărește suprafața desktopului.',
    'Duplicate mirrors content; Extend increases desktop space.',
  ],
)
device(
  '5.1',
  [
    'Ce comandă actualizează aplicarea politicilor de grup?',
    'Which command refreshes Group Policy application?',
  ],
  ['gpupdate /force', 'ipconfig /flushdns', 'chkdsk /f', 'format C:'].map(same),
  [
    'gpupdate /force reaplică politicile; nu este o comandă de curățare DNS.',
    'gpupdate /force reapplies policy; it is not a DNS-cache cleanup command.',
  ],
)
device(
  '5.1',
  [
    'Ce comandă ajută la vizualizarea politicilor aplicate?',
    'Which command helps display applied policies?',
  ],
  ['gpresult /r', 'ping /r', 'diskpart /r', 'shutdown /r'].map(same),
  [
    'gpresult raportează setul de politici rezultat pentru utilizator și calculator.',
    'gpresult reports the resultant policy set for the user and computer.',
  ],
)
device(
  '4.2',
  [
    'Selectează două metode care pot reprezenta factori diferiți.',
    'Select two methods that can represent different factors.',
  ],
  [
    ['Parolă', 'Password'],
    ['Cheie de securitate fizică', 'Physical security key'],
    ['Aceeași parolă scrisă de două ori', 'The same password entered twice'],
    ['Numele contului', 'Account name'],
  ],
  [
    'Parola este ceva ce știi; cheia fizică este ceva ce ai. Două parole nu sunt automat doi factori.',
    'A password is something you know; a physical key is something you have. Two passwords are not automatically two factors.',
  ],
  { type: 'multiple', correct: ['0', '1'] },
)
const net = (obj: string, p: Pair, a: Pair[], e: Pair, x: Partial<ChoiceQuestion> = {}) =>
  add(
    'retelistica',
    obj.startsWith('1') || obj.startsWith('2')
      ? '01-infrastructura'
      : obj.startsWith('3')
        ? '02-hardware'
        : obj.startsWith('4')
          ? '03-protocoale-servicii'
          : '05-depanare',
    obj,
    p,
    a,
    e,
    x,
  )
net(
  '1.1',
  ['Ce măsoară jitter?', 'What does jitter measure?'],
  [
    ['Variația întârzierii pachetelor', 'Variation in packet delay'],
    ['Numărul porturilor fizice', 'The number of physical ports'],
    ['Dimensiunea adresei MAC', 'The size of a MAC address'],
    ['Numărul de VLAN-uri', 'The number of VLANs'],
  ],
  [
    'Jitter descrie variația latenței și poate afecta vocea sau video în timp real.',
    'Jitter describes latency variation and can affect real-time voice or video.',
  ],
)
net(
  '1.1',
  ['Ce descrie goodput?', 'What does goodput describe?'],
  [
    [
      'Rata datelor utile livrate aplicației',
      'The rate of useful application data delivered',
    ],
    ['Capacitatea nominală a cablului', 'The nominal cable capacity'],
    ['Toți biții, inclusiv retransmisii', 'All bits including retransmissions'],
    ['Lungimea cablului', 'Cable length'],
  ],
  [
    'Goodput exclude overhead-ul de protocol și retransmisiile din datele utile.',
    'Goodput excludes protocol overhead and retransmissions from useful data.',
  ],
)
net(
  '1.2',
  ['Ce rol are un hypervisor?', 'What role does a hypervisor perform?'],
  [
    ['Rulează și izolează mașini virtuale', 'Runs and isolates virtual machines'],
    ['Convertește DNS în cablu', 'Converts DNS into a cable'],
    ['Înlocuiește toate parolele', 'Replaces every password'],
    ['Este un conector optic', 'It is an optical connector'],
  ],
  [
    'Hypervisorul gestionează resurse pentru sisteme virtuale.',
    'The hypervisor manages resources for virtual systems.',
  ],
)
net(
  '1.2',
  [
    'Ce închiriezi în principal într-un serviciu IaaS?',
    'What do you primarily rent in IaaS?',
  ],
  [
    ['Resurse de calcul, rețea și stocare', 'Compute, networking and storage resources'],
    ['Doar un document final', 'Only a finished document'],
    ['Un cablu de imprimantă', 'A printer cable'],
    ['O parolă publică', 'A public password'],
  ],
  [
    'IaaS oferă infrastructură virtualizată; clientul gestionează componente precum sistemul de operare.',
    'IaaS supplies virtualized infrastructure; the customer manages components such as the operating system.',
  ],
)
net(
  '2.4',
  [
    'Ce tehnologie este potrivită pentru dispozitive IoT cu consum redus într-o rețea mesh?',
    'Which technology suits low-power IoT devices in a mesh network?',
  ],
  ['Zigbee', 'VGA', 'SMTP', 'SATA'].map(same),
  [
    'Zigbee este o tehnologie wireless folosită în automatizări și senzori.',
    'Zigbee is a wireless technology used in automation and sensors.',
  ],
)
net(
  '3.2',
  [
    'Ce metodă primește întregul cadru înainte de redirecționare?',
    'Which method receives the entire frame before forwarding?',
  ],
  ['Store-and-forward', 'Cut-through', 'DNS round robin', 'SLAAC'].map(same),
  [
    'Store-and-forward permite verificarea cadrului înainte de transmitere.',
    'Store-and-forward allows frame checking before transmission.',
  ],
)
net(
  '3.1',
  ['Ce permite PoE?', 'What does PoE enable?'],
  [
    [
      'Alimentare și date prin cablul Ethernet compatibil',
      'Power and data through compatible Ethernet cabling',
    ],
    ['Doar transmisie audio optică', 'Only optical audio transmission'],
    ['Criptare SQL automată', 'Automatic SQL encryption'],
    ['Creșterea numărului de biți IPv4', 'Increasing IPv4 address length'],
  ],
  [
    'Power over Ethernet poate alimenta dispozitive compatibile, în limitele standardului și bugetului de putere.',
    'Power over Ethernet can power compatible devices within standard and power-budget limits.',
  ],
)
net(
  '5.2',
  [
    'Ce instrument poate localiza o defecțiune de-a lungul unei fibre optice?',
    'Which tool can locate a fault along an optical fiber?',
  ],
  [
    'OTDR',
    'Un scanner SQL / An SQL scanner',
    'O tastatură / A keyboard',
    'Un switch fără management / An unmanaged switch',
  ].map(same),
  [
    'OTDR analizează reflexiile optice pentru estimarea poziției evenimentelor pe fibră.',
    'OTDR analyzes optical reflections to estimate event locations along fiber.',
  ],
)
net(
  '5.5',
  [
    'Ce instrument permite inspectarea pachetelor capturate?',
    'Which tool allows inspection of captured packets?',
  ],
  ['Wireshark', 'Disk Cleanup', 'pydoc', 'ClearType'].map(same),
  [
    'Wireshark analizează traficul capturat; se folosește doar pe rețele unde ai permisiune.',
    'Wireshark analyzes captured traffic; use it only on networks where you have permission.',
  ],
)
net(
  '3.5',
  [
    'Selectează două protocoale utilizate la administrarea dispozitivelor.',
    'Select two protocols used for device management.',
  ],
  ['SSH', 'SNMP', 'HDMI', 'NTFS'].map(same),
  [
    'SSH oferă acces la distanță securizat; SNMP este folosit pentru monitorizare și administrare.',
    'SSH provides secure remote access; SNMP is used for monitoring and management.',
  ],
  { type: 'multiple', correct: ['0', '1'] },
)
net(
  '4.3',
  [
    'Completează prefixul CIDR pentru masca 255.255.255.0.',
    'Fill in the CIDR prefix for mask 255.255.255.0.',
  ],
  ['/24'].map(same),
  [
    'Masca are 24 de biți consecutivi setați la 1.',
    'The mask has 24 consecutive one bits.',
  ],
  { type: 'fill_blank', acceptedText: ['/24', '24'] },
)
net(
  '5.1',
  [
    'Ordonează începutul unei depanări controlate.',
    'Order the start of controlled troubleshooting.',
  ],
  [
    ['Identifică problema', 'Identify the problem'],
    ['Formulează o ipoteză', 'Form a hypothesis'],
    ['Testează ipoteza', 'Test the hypothesis'],
  ],
  [
    'Înțelege problema înainte de modificări; testează ipoteza înainte de aplicarea unei soluții extinse.',
    'Understand the issue before changes; test the hypothesis before applying a broad solution.',
  ],
  { type: 'sequence', sequence: ['0', '1', '2'] },
)
export const reviewedQuestions = bank
