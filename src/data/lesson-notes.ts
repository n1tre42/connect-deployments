export type LessonNote = {
  points: [string, string][]
  source: string
  captionKind: string
  captionLanguage: string
  checkedOn: string
}
export const lessonNotes: Record<string, LessonNote> = {
  Gx5qb1uHss4: {
    points: [
      [
        'Un fișier .py conține instrucțiuni executate de interpretul Python.',
        'A .py file contains instructions executed by the Python interpreter.',
      ],
      [
        'Variabilele leagă nume de valori; tipurile includ numere, șiruri și colecții.',
        'Variables bind names to values; types include numbers, strings and collections.',
      ],
      [
        'Adnotările de tip ajută dezvoltatorul, dar nu impun singure verificarea tipului la execuție.',
        'Type annotations help the developer but do not by themselves enforce runtime types.',
      ],
    ],
    source: 'Gx5qb1uHss4',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  DZwmZ8Usvnk: {
    points: [
      [
        'if, elif și else aleg ramura executată în funcție de o condiție.',
        'if, elif and else choose the executed branch based on a condition.',
      ],
      [
        '== compară valori; = atribuie o valoare; is verifică identitatea.',
        '== compares values; = assigns a value; is checks identity.',
      ],
      [
        'Indentarea delimitează blocurile, iar and, or și not combină condiții.',
        'Indentation delimits blocks, while and, or and not combine conditions.',
      ],
    ],
    source: 'DZwmZ8Usvnk',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  q5uM4VKywbA: {
    points: [
      [
        'Un CSV păstrează înregistrări text separate printr-un delimitator.',
        'A CSV stores text records separated by a delimiter.',
      ],
      [
        'Modulul csv citește și scrie câmpuri fără a trata fișierul ca un simplu split.',
        'The csv module reads and writes fields instead of treating the file as a simple split.',
      ],
      [
        'DictReader și DictWriter leagă câmpurile de numele coloanelor.',
        'DictReader and DictWriter connect fields with column names.',
      ],
    ],
    source: 'q5uM4VKywbA',
    captionKind: 'manual',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  NZMBVkTP3LA: {
    points: [
      [
        'def definește funcția; corpul rulează abia când funcția este apelată.',
        'def defines the function; its body runs only when called.',
      ],
      [
        'Parametrii apar în definiție, iar argumentele sunt valorile trimise la apel.',
        'Parameters appear in the definition; arguments are values supplied in a call.',
      ],
      [
        'return permite reutilizarea rezultatului; print doar îl afișează.',
        'return allows reuse of a result; print only displays it.',
      ],
    ],
    source: 'NZMBVkTP3LA',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  I72uD8ED73U: {
    points: [
      [
        "Protejează punctul de intrare cu if __name__ == '__main__'.",
        "Protect the entry point with if __name__ == '__main__'.",
      ],
      [
        'Importul execută instrucțiunile de la nivelul modulului, nu doar definițiile.',
        'Importing executes module-level statements, not only definitions.',
      ],
      [
        'Alege nume descriptive și expresii pe care le poți citi ușor.',
        'Choose descriptive names and expressions that are easy to read.',
      ],
    ],
    source: 'I72uD8ED73U',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  JG1livF44_E: {
    points: [
      [
        'Mesajul excepției ajută la identificarea operației care a eșuat.',
        'The exception message helps identify the failing operation.',
      ],
      [
        'Accesarea unui atribut inexistent poate provoca AttributeError.',
        'Accessing a nonexistent attribute can raise AttributeError.',
      ],
      [
        'Diferențiază o valoare nepotrivită de un tip nepotrivit pentru conversie.',
        'Distinguish an unsuitable value from an unsuitable type for conversion.',
      ],
    ],
    source: 'JG1livF44_E',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  tJxcKyFMTGo: {
    points: [
      [
        'os oferă operații asupra sistemului și fișierelor.',
        'os provides operating-system and filesystem operations.',
      ],
      [
        'getcwd arată directorul curent; lucrul cu directoare schimbă contextul căilor relative.',
        'getcwd shows the current directory; changing directories changes relative-path context.',
      ],
      [
        'os.path ajută la construirea și verificarea căilor, numelor și extensiilor.',
        'os.path helps construct and inspect paths, names and extensions.',
      ],
    ],
    source: 'tJxcKyFMTGo',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  wY1qqBFnKhk: {
    points: [
      [
        'Normalizarea organizează datele pentru consistență și mai puține anomalii.',
        'Normalization organizes data for consistency and fewer anomalies.',
      ],
      [
        'Separarea entităților și relațiilor evită actualizări contradictorii.',
        'Separating entities and relationships prevents contradictory updates.',
      ],
      [
        'Formele normale se construiesc progresiv; pentru obiectivele noastre, fixează mai întâi 1NF–3NF.',
        'Normal forms build progressively; for our objectives, first consolidate 1NF–3NF.',
      ],
    ],
    source: 'wY1qqBFnKhk',
    captionKind: 'manual',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  gm6tNK_iOHs: {
    points: [
      [
        'Tabelele organizează datele în rânduri și coloane cu tipuri potrivite.',
        'Tables organize data into rows and appropriately typed columns.',
      ],
      [
        'CREATE și ALTER definesc sau schimbă structura; INSERT adaugă date.',
        'CREATE and ALTER define or change structure; INSERT adds data.',
      ],
      [
        'UPDATE și DELETE trebuie filtrate atent pentru a afecta rândurile dorite.',
        'UPDATE and DELETE need careful filtering to affect the intended rows.',
      ],
    ],
    source: 'gm6tNK_iOHs',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  kbKty5ZVKMY: {
    points: [
      [
        'SELECT alege coloanele, iar FROM stabilește sursa.',
        'SELECT chooses columns, while FROM identifies the source.',
      ],
      [
        'WHERE filtrează rândurile înainte de agregare; HAVING filtrează grupurile.',
        'WHERE filters rows before aggregation; HAVING filters groups.',
      ],
      [
        'GROUP BY agregă, iar ORDER BY stabilește ordinea rezultatului.',
        'GROUP BY aggregates, while ORDER BY determines result order.',
      ],
    ],
    source: 'kbKty5ZVKMY',
    captionKind: 'manual',
    captionLanguage: 'ar',
    checkedOn: '2026-11-06',
  },
  w3ea4fKiS2g: {
    points: [
      [
        'Funcțiile SQL transformă valori și pot construi coloane calculate.',
        'SQL functions transform values and can build calculated columns.',
      ],
      [
        'Curățarea datelor urmărește eliminarea diferențelor de formatare relevante.',
        'Data cleaning addresses relevant formatting inconsistencies.',
      ],
      [
        'CASE construiește categorii pe baza condițiilor; verifică sintaxa dialectului folosit.',
        'CASE builds categories from conditions; verify the syntax of the dialect used.',
      ],
    ],
    source: 'w3ea4fKiS2g',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  YM11tS0oCkk: {
    points: [
      [
        'O tranzacție grupează operații care trebuie să reușească sau să fie anulate împreună.',
        'A transaction groups operations that should succeed or roll back together.',
      ],
      [
        'COMMIT confirmă modificările; ROLLBACK anulează lucrul neconfirmat.',
        'COMMIT confirms changes; ROLLBACK undoes uncommitted work.',
      ],
      [
        'Blocările și tranzacțiile neîncheiate pot afecta ce văd alți utilizatori.',
        'Locks and unfinished transactions can affect what other users see.',
      ],
    ],
    source: 'YM11tS0oCkk',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  TukZd6LjeBc: {
    points: [
      [
        'EXPLAIN arată planul ales de optimizator pentru o interogare MySQL.',
        "EXPLAIN shows the optimizer's chosen plan for a MySQL query.",
      ],
      [
        'Compară scanarea completă cu accesul prin index și numărul de rânduri procesate.',
        'Compare full scans with index access and the number of rows processed.',
      ],
      [
        'EXPLAIN ANALYZE execută interogarea; cache-ul poate influența măsurarea.',
        'EXPLAIN ANALYZE executes the query; caches can influence measurements.',
      ],
    ],
    source: 'TukZd6LjeBc',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  '4I2AZ1by_sY': {
    points: [
      [
        'TCP/IP coordonează transportul și adresarea datelor în rețea.',
        'TCP/IP coordinates data transport and addressing across networks.',
      ],
      [
        'TCP folosește stabilirea conexiunii, numerotare și retransmisie pentru livrare fiabilă.',
        'TCP uses connection setup, numbering and retransmission for reliable delivery.',
      ],
      [
        'Protocoalele au roluri distincte; rutarea între rețele nu este același lucru cu transportul.',
        'Protocols have distinct roles; routing between networks is not the same as transport.',
      ],
    ],
    source: '4I2AZ1by_sY',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  boiRCoFdR2E: {
    points: [
      [
        'Dispozitivele de rețea conectează echipamente și transportă informații.',
        'Network devices connect equipment and carry information.',
      ],
      [
        'Switch-urile și routerele îndeplinesc roluri diferite în conectarea rețelelor.',
        'Switches and routers perform different roles in connecting networks.',
      ],
      [
        'O poartă de acces poate lega sisteme cu protocoale sau structuri diferite.',
        'A gateway can connect systems with different protocols or structures.',
      ],
    ],
    source: 'boiRCoFdR2E',
    captionKind: 'asr',
    captionLanguage: 'ar',
    checkedOn: '2026-11-06',
  },
  n7cjd5E_nsc: {
    points: [
      [
        'Securitatea rețelei include configurare și comportament, nu un singur produs.',
        'Network security includes configuration and behavior, not one product.',
      ],
      [
        'Analizează serviciile expuse și conexiunile dispozitivelor în context.',
        'Examine exposed services and device connections in context.',
      ],
      [
        'Inventarul dispozitivelor conectate ajută la observarea schimbărilor neobișnuite.',
        'An inventory of connected devices helps detect unusual changes.',
      ],
    ],
    source: 'n7cjd5E_nsc',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  f2JUAsRGIHM: {
    points: [
      [
        'Clarifică resursa afectată și ultima situație în care a funcționat.',
        'Clarify the affected resource and the last known working situation.',
      ],
      [
        'Verifică ipotezele privind accesul, VLAN-ul și politica de rețea.',
        'Check assumptions about access, VLAN membership and network policy.',
      ],
      [
        'O schimbare a locației utilizatorului poate explica simptomele fără un echipament defect.',
        "A change in the user's location can explain symptoms without failed equipment.",
      ],
    ],
    source: 'f2JUAsRGIHM',
    captionKind: 'asr',
    captionLanguage: 'ar',
    checkedOn: '2026-11-06',
  },
  GxmfcnU3feo: {
    points: [
      [
        'Frontend-ul gestionează interacțiunea vizibilă, backend-ul logica și datele.',
        'The frontend handles visible interaction; the backend handles logic and data.',
      ],
      [
        'Full stack combină responsabilitățile din ambele zone.',
        'Full stack combines responsibilities from both areas.',
      ],
      [
        'Instrumentele și framework-urile completează fundamentele; nu le înlocuiesc.',
        'Tools and frameworks supplement the fundamentals; they do not replace them.',
      ],
    ],
    source: 'GxmfcnU3feo',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  OtGqPwOa55o: {
    points: [
      [
        'HTML descrie structura paginii; CSS stilul; JavaScript interactivitatea.',
        'HTML describes page structure; CSS provides styling; JavaScript adds interaction.',
      ],
      [
        'Documentul separă metadatele din head de conținutul din body.',
        'The document separates head metadata from body content.',
      ],
      [
        'Elementele semantice și details/summary dau structură și interacțiuni native.',
        'Semantic elements and details/summary provide structure and native interactions.',
      ],
    ],
    source: 'OtGqPwOa55o',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  dvqswhsH5dk: {
    points: [
      [
        'Selectorii de clasă și ID leagă reguli CSS de elementele potrivite.',
        'Class and ID selectors connect CSS rules with the intended elements.',
      ],
      [
        'Un layout poate fi împărțit în container, antet, navigare, conținut și subsol.',
        'A layout can be divided into container, header, navigation, content and footer.',
      ],
      [
        'Spațierea, dimensiunile și tipografia trebuie ajustate împreună.',
        'Spacing, dimensions and typography need to be adjusted together.',
      ],
    ],
    source: 'dvqswhsH5dk',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  y17RuWkWdn8: {
    points: [
      [
        'DOM-ul permite selectarea și modificarea elementelor paginii prin JavaScript.',
        'The DOM lets JavaScript select and modify page elements.',
      ],
      [
        'Diferențiază conținutul text de HTML și alege API-ul potrivit.',
        'Distinguish text content from HTML and choose the appropriate API.',
      ],
      [
        'Proprietățile de stil JavaScript folosesc frecvent camelCase, de exemplu backgroundColor.',
        'JavaScript style properties commonly use camelCase, such as backgroundColor.',
      ],
    ],
    source: 'y17RuWkWdn8',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  'QqLbk-PmX2Q': {
    points: [
      [
        'Settings permite ajustarea afișajului și a dimensiunii textului.',
        'Settings allows adjustment of display scaling and text size.',
      ],
      [
        'Preferințele de confidențialitate și desktop influențează experiența de utilizare.',
        'Privacy and desktop preferences influence the user experience.',
      ],
      [
        'Videoul include modificări ale registrului Windows și explică efectele lor.',
        'The video shows changes to the Windows Registry and explains their effects.',
      ],
    ],
    source: 'QqLbk-PmX2Q',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  mr7ErL0dCBE: {
    points: [
      [
        'File Explorer organizează documente în foldere cu o structură clară.',
        'File Explorer organizes documents in folders with a clear structure.',
      ],
      [
        'Mutarea, copierea și ștergerea au efecte diferite asupra locației datelor.',
        'Moving, copying and deleting have different effects on data location.',
      ],
      [
        'Ferestrele alăturate ajută la organizarea fișierelor între foldere.',
        'Side-by-side windows help organize files between folders.',
      ],
    ],
    source: 'mr7ErL0dCBE',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  fcydKLBb4A8: {
    points: [
      [
        'Tipul contului influențează privilegiile și modificările disponibile.',
        'The account type affects privileges and available changes.',
      ],
      [
        'UAC cere confirmarea anumitor modificări administrative.',
        'UAC requests confirmation for certain administrative changes.',
      ],
      [
        'Discuția despre parole evidențiază importanța unor credențiale distincte și memorabile.',
        'The password discussion highlights distinct and memorable credentials.',
      ],
    ],
    source: 'fcydKLBb4A8',
    captionKind: 'asr',
    captionLanguage: 'ar',
    checkedOn: '2026-11-06',
  },
  qIenQsBAg2U: {
    points: [
      [
        'Un ecran de oprire indică o problemă care împiedică sistemul să continue.',
        'A stop screen indicates a problem that prevents the system from continuing.',
      ],
      [
        'Hardware-ul, driverele și aplicațiile sunt piste diferite de investigat.',
        'Hardware, drivers and applications are different investigation paths.',
      ],
      [
        'Ora și data corecte contează în funcționarea și sincronizarea sistemului.',
        'Correct time and date matter to system operation and synchronization.',
      ],
    ],
    source: 'qIenQsBAg2U',
    captionKind: 'manual',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  'gOMW_n2-2Mw': {
    points: [
      [
        'Listele sunt ordonate și modificabile; tuplele sunt ordonate și nemodificabile.',
        'Lists are ordered and mutable; tuples are ordered and immutable.',
      ],
      [
        'Seturile elimină duplicatele; elementele lor trebuie să fie hashable.',
        'Sets eliminate duplicates; their elements must be hashable.',
      ],
      [
        'Colecțiile pot fi parcurse cu for; metodele disponibile depind de tip.',
        'Collections can be iterated with for; available methods depend on the type.',
      ],
    ],
    source: 'gOMW_n2-2Mw',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  '69ZNyVeJ6ik': {
    points: [
      [
        'unittest organizează teste în clase TestCase și folosește metode assert.',
        'unittest organizes tests in TestCase classes and uses assertion methods.',
      ],
      [
        'pytest permite funcții de test cu assert și fixture-uri pentru pregătirea datelor.',
        'pytest supports test functions with assert and fixtures for setup.',
      ],
      [
        'Pentru Certiport, exersează explicit și metodele unittest din obiective.',
        'For Certiport, explicitly practice the unittest methods listed in the objectives.',
      ],
    ],
    source: '69ZNyVeJ6ik',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
  rLyYb7BFgQI: {
    points: [
      [
        'O clasă definește structura și comportamentul obiectelor create din ea.',
        'A class defines the structure and behavior of objects created from it.',
      ],
      [
        'Constructorul și atributele instanței păstrează datele fiecărui obiect.',
        "The constructor and instance attributes store each object's data.",
      ],
      [
        'Metodele reutilizează comportamentul pentru mai multe instanțe.',
        'Methods reuse behavior across multiple instances.',
      ],
    ],
    source: 'rLyYb7BFgQI',
    captionKind: 'asr',
    captionLanguage: 'en',
    checkedOn: '2026-11-06',
  },
}
