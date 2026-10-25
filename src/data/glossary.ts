export type GlossaryTerm = {
  term: string
  course: string
  module: string
  definition: string
  example?: string
}

export const glossary: GlossaryTerm[] = [
  {
    "term": "Tip de date (data type)",
    "course": "python",
    "module": "01-tipuri-date-operatori",
    "definition": "Categoria unei valori, care determină ce operații se pot face cu ea: int, float, str, bool, list, tuple, dict, set.",
    "example": "type(3.0)  # <class 'float'>"
  },
  {
    "term": "Conversie de tip (type casting)",
    "course": "python",
    "module": "01-tipuri-date-operatori",
    "definition": "Transformarea explicită a unei valori dintr-un tip în altul cu funcții precum int(), float(), str(), bool().",
    "example": "int(\"42\") + 1  # 43"
  },
  {
    "term": "Operator de precedență",
    "course": "python",
    "module": "01-tipuri-date-operatori",
    "definition": "Ordinea în care se evaluează operatorii: ** înaintea lui * / // %, apoi + -, apoi comparațiile, apoi not, and, or.",
    "example": "2 + 3 * 2 ** 2  # 14"
  },
  {
    "term": "Mutabil / imutabil",
    "course": "python",
    "module": "01-tipuri-date-operatori",
    "definition": "Un obiect mutabil (list, dict, set) poate fi modificat pe loc; unul imutabil (int, str, tuple) nu, orice „modificare” creează un obiect nou."
  },
  {
    "term": "Slicing (feliere)",
    "course": "python",
    "module": "01-tipuri-date-operatori",
    "definition": "Extragerea unei porțiuni dintr-o secvență cu sintaxa [start:stop:pas]; stop nu este inclus.",
    "example": "\"Python\"[1:4]  # \"yth\""
  },
  {
    "term": "Instrucțiune condițională",
    "course": "python",
    "module": "02-control-flux",
    "definition": "Structura if / elif / else, care execută un bloc de cod doar dacă o condiție este adevărată."
  },
  {
    "term": "Buclă (iterație)",
    "course": "python",
    "module": "02-control-flux",
    "definition": "Repetarea unui bloc de cod: for parcurge o secvență, while repetă cât timp condiția este adevărată.",
    "example": "for i in range(3): print(i)"
  },
  {
    "term": "break / continue / pass",
    "course": "python",
    "module": "02-control-flux",
    "definition": "break iese din buclă, continue trece la iterația următoare, pass este o instrucțiune goală folosită ca loc rezervat."
  },
  {
    "term": "Mod de deschidere a fișierului",
    "course": "python",
    "module": "03-intrare-iesire",
    "definition": "Al doilea argument al lui open(): \"r\" citire, \"w\" scriere (golește fișierul), \"a\" adăugare la final, \"x\" creare exclusivă, \"b\" binar."
  },
  {
    "term": "f-string",
    "course": "python",
    "module": "03-intrare-iesire",
    "definition": "Șir prefixat cu f în care expresiile dintre acolade sunt evaluate și formatate.",
    "example": "f\"{3.14159:.2f}\"  # \"3.14\""
  },
  {
    "term": "Docstring",
    "course": "python",
    "module": "04-documentare-structura",
    "definition": "Șir între ghilimele triple, plasat imediat după definiția unei funcții, clase sau modul, care îi descrie scopul. Este accesibil prin help() și __doc__."
  },
  {
    "term": "Parametru implicit",
    "course": "python",
    "module": "04-documentare-structura",
    "definition": "Parametru al unei funcții cu o valoare predefinită, folosită când argumentul lipsește la apel.",
    "example": "def salut(nume=\"Ana\"): ..."
  },
  {
    "term": "Excepție",
    "course": "python",
    "module": "05-depanare-erori",
    "definition": "Eroare apărută în timpul execuției (de ex. ValueError, ZeroDivisionError), care poate fi tratată cu try / except."
  },
  {
    "term": "Eroare de sintaxă / de execuție / logică",
    "course": "python",
    "module": "05-depanare-erori",
    "definition": "Sintaxă: codul nu respectă regulile limbajului și nu pornește. Execuție: apare o excepție la rulare. Logică: programul rulează, dar dă un rezultat greșit."
  },
  {
    "term": "Modul",
    "course": "python",
    "module": "06-module-instrumente",
    "definition": "Fișier .py cu funcții, clase și variabile reutilizabile, încărcat cu import. Biblioteca standard include math, random, datetime, os, sys."
  },
  {
    "term": "Cheie primară (primary key)",
    "course": "baze-de-date",
    "module": "01-proiectare",
    "definition": "Coloana sau combinația de coloane care identifică unic fiecare rând al unui tabel. Nu poate conține NULL sau duplicate."
  },
  {
    "term": "Cheie externă (foreign key)",
    "course": "baze-de-date",
    "module": "01-proiectare",
    "definition": "Coloană care referă cheia primară a altui tabel și impune integritatea referențială între cele două."
  },
  {
    "term": "Normalizare",
    "course": "baze-de-date",
    "module": "01-proiectare",
    "definition": "Procesul de organizare a tabelelor pentru a reduce redundanța: 1NF (valori atomice), 2NF (fără dependențe parțiale), 3NF (fără dependențe tranzitive)."
  },
  {
    "term": "Diagramă entitate-relație (ERD)",
    "course": "baze-de-date",
    "module": "01-proiectare",
    "definition": "Reprezentare grafică a entităților (tabelelor), atributelor și relațiilor dintre ele: unu-la-unu, unu-la-mulți, mulți-la-mulți."
  },
  {
    "term": "DDL (Data Definition Language)",
    "course": "baze-de-date",
    "module": "02-obiecte",
    "definition": "Comenzile care definesc structura bazei de date: CREATE, ALTER, DROP, TRUNCATE."
  },
  {
    "term": "Constrângere (constraint)",
    "course": "baze-de-date",
    "module": "02-obiecte",
    "definition": "Regulă impusă datelor dintr-o coloană: PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK, DEFAULT."
  },
  {
    "term": "Index",
    "course": "baze-de-date",
    "module": "02-obiecte",
    "definition": "Structură care accelerează căutarea rândurilor după una sau mai multe coloane, în schimbul unui cost la scriere."
  },
  {
    "term": "Vedere (view)",
    "course": "baze-de-date",
    "module": "02-obiecte",
    "definition": "Interogare SELECT salvată sub un nume, folosită ca un tabel virtual."
  },
  {
    "term": "Funcție agregată",
    "course": "baze-de-date",
    "module": "03-interogare",
    "definition": "Funcție care calculează o singură valoare dintr-un set de rânduri: COUNT, SUM, AVG, MIN, MAX."
  },
  {
    "term": "JOIN",
    "course": "baze-de-date",
    "module": "03-interogare",
    "definition": "Combinarea rândurilor din două tabele după o condiție: INNER JOIN (doar potriviri), LEFT/RIGHT JOIN (tot dintr-o parte), CROSS JOIN (toate combinațiile)."
  },
  {
    "term": "GROUP BY / HAVING",
    "course": "baze-de-date",
    "module": "03-interogare",
    "definition": "GROUP BY grupează rândurile cu aceleași valori; HAVING filtrează grupurile după rezultatul funcțiilor agregate."
  },
  {
    "term": "DML (Data Manipulation Language)",
    "course": "baze-de-date",
    "module": "04-manipulare",
    "definition": "Comenzile care modifică datele: INSERT, UPDATE, DELETE (și SELECT pentru citire)."
  },
  {
    "term": "Tranzacție",
    "course": "baze-de-date",
    "module": "04-manipulare",
    "definition": "Grup de operații executate ca o singură unitate: fie toate reușesc (COMMIT), fie niciuna (ROLLBACK)."
  },
  {
    "term": "NULL",
    "course": "baze-de-date",
    "module": "05-depanare",
    "definition": "Marcaj pentru o valoare lipsă sau necunoscută. Se testează cu IS NULL / IS NOT NULL, nu cu =."
  },
  {
    "term": "LAN / WAN",
    "course": "retelistica",
    "module": "01-infrastructura",
    "definition": "LAN: rețea locală (o clădire, o școală). WAN: rețea pe arie largă care leagă mai multe LAN-uri, de exemplu internetul."
  },
  {
    "term": "Adresă IPv4",
    "course": "retelistica",
    "module": "01-infrastructura",
    "definition": "Adresă logică de 32 de biți, scrisă ca patru octeți zecimali (192.168.1.10), formată din partea de rețea și partea de gazdă."
  },
  {
    "term": "Mască de subrețea / CIDR",
    "course": "retelistica",
    "module": "01-infrastructura",
    "definition": "Indică câți biți ai adresei aparțin rețelei: 255.255.255.0 = /24. Gazde utilizabile: 2^(32−prefix) − 2."
  },
  {
    "term": "Gateway implicit",
    "course": "retelistica",
    "module": "01-infrastructura",
    "definition": "Adresa routerului prin care un dispozitiv trimite traficul destinat altor rețele."
  },
  {
    "term": "Switch",
    "course": "retelistica",
    "module": "02-hardware",
    "definition": "Dispozitiv de nivel 2 care conectează gazdele dintr-un LAN și trimite cadrele doar spre portul destinatarului, după adresa MAC."
  },
  {
    "term": "Router",
    "course": "retelistica",
    "module": "02-hardware",
    "definition": "Dispozitiv de nivel 3 care direcționează pachetele între rețele diferite, pe baza adreselor IP și a tabelei de rutare."
  },
  {
    "term": "Adresă MAC",
    "course": "retelistica",
    "module": "02-hardware",
    "definition": "Adresă fizică de 48 de biți, unică, atribuită plăcii de rețea de producător."
  },
  {
    "term": "Modelul OSI",
    "course": "retelistica",
    "module": "03-protocoale-servicii",
    "definition": "Model conceptual în 7 niveluri: Fizic, Legătură de date, Rețea, Transport, Sesiune, Prezentare, Aplicație."
  },
  {
    "term": "TCP / UDP",
    "course": "retelistica",
    "module": "03-protocoale-servicii",
    "definition": "Protocoale de transport. TCP: orientat pe conexiune, sigur, ordonat. UDP: fără conexiune, rapid, fără garanția livrării."
  },
  {
    "term": "DNS",
    "course": "retelistica",
    "module": "03-protocoale-servicii",
    "definition": "Serviciul care traduce nume de domeniu (bacit.md) în adrese IP. Folosește portul 53."
  },
  {
    "term": "DHCP",
    "course": "retelistica",
    "module": "03-protocoale-servicii",
    "definition": "Protocol care atribuie automat adresa IP, masca, gateway-ul și serverele DNS dispozitivelor din rețea."
  },
  {
    "term": "Firewall",
    "course": "retelistica",
    "module": "04-securitate",
    "definition": "Sistem hardware sau software care permite sau blochează traficul pe baza unor reguli (adrese, porturi, protocoale)."
  },
  {
    "term": "VPN",
    "course": "retelistica",
    "module": "04-securitate",
    "definition": "Rețea privată virtuală: tunel criptat peste o rețea publică, care protejează traficul."
  },
  {
    "term": "ping / tracert",
    "course": "retelistica",
    "module": "05-depanare",
    "definition": "ping testează dacă o gazdă răspunde (ICMP Echo); tracert / traceroute arată routerele prin care trece pachetul până la destinație."
  },
  {
    "term": "APIPA",
    "course": "retelistica",
    "module": "05-depanare",
    "definition": "Adresă 169.254.x.x atribuită automat de Windows când serverul DHCP nu răspunde — semn de problemă de conectivitate."
  },
  {
    "term": "Element semantic",
    "course": "html5",
    "module": "02-interfata-html5",
    "definition": "Element care descrie rolul conținutului: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>."
  },
  {
    "term": "Validare a formularelor",
    "course": "html5",
    "module": "02-interfata-html5",
    "definition": "Verificarea datelor înainte de trimitere, cu atribute (required, pattern, min, max, type=\"email\") sau cu JavaScript."
  },
  {
    "term": "<canvas>",
    "course": "html5",
    "module": "02-interfata-html5",
    "definition": "Suprafață de desen bitmap controlată din JavaScript prin contextul 2D (getContext(\"2d\"))."
  },
  {
    "term": "SVG",
    "course": "html5",
    "module": "02-interfata-html5",
    "definition": "Format de grafică vectorială descris în XML; se scalează fără pierderi de calitate."
  },
  {
    "term": "Modelul cutiei (box model)",
    "course": "html5",
    "module": "03-formatare-css",
    "definition": "Fiecare element este o cutie formată din conținut, padding, bordură și margine. box-sizing: border-box include padding-ul și bordura în lățime."
  },
  {
    "term": "Specificitate",
    "course": "html5",
    "module": "03-formatare-css",
    "definition": "Regula care decide ce declarație CSS câștigă: stil inline > ID > clasă / atribut / pseudo-clasă > element."
  },
  {
    "term": "Flexbox",
    "course": "html5",
    "module": "03-formatare-css",
    "definition": "Model de așezare pe o singură axă; justify-content aliniază pe axa principală, align-items pe cea transversală."
  },
  {
    "term": "Media query",
    "course": "html5",
    "module": "03-formatare-css",
    "definition": "Regulă CSS aplicată doar în anumite condiții (lățimea ecranului, orientarea), baza designului responsiv.",
    "example": "@media (max-width: 600px) { ... }"
  },
  {
    "term": "DOM",
    "course": "html5",
    "module": "04-javascript",
    "definition": "Document Object Model: reprezentarea paginii ca arbore de obiecte, pe care JavaScript îl poate citi și modifica."
  },
  {
    "term": "Eveniment (event)",
    "course": "html5",
    "module": "04-javascript",
    "definition": "Acțiune la care poate reacționa codul (click, input, submit), tratată cu addEventListener."
  },
  {
    "term": "localStorage / sessionStorage",
    "course": "html5",
    "module": "01-ciclu-viata",
    "definition": "API-uri pentru stocarea perechilor cheie-valoare în browser; localStorage persistă, sessionStorage durează doar cât fila."
  },
  {
    "term": "Service worker",
    "course": "html5",
    "module": "01-ciclu-viata",
    "definition": "Script care rulează în fundal, separat de pagină, și poate intercepta cererile de rețea pentru cache și funcționare offline."
  },
  {
    "term": "Web app manifest",
    "course": "html5",
    "module": "01-ciclu-viata",
    "definition": "Fișier JSON cu numele, iconițele și modul de afișare ale unei aplicații web progresive (PWA)."
  },
  {
    "term": "Driver",
    "course": "configurare-dispozitive",
    "module": "01-configurare",
    "definition": "Software care permite sistemului de operare să comunice cu un dispozitiv hardware. Se gestionează din Device Manager."
  },
  {
    "term": "Device Manager",
    "course": "configurare-dispozitive",
    "module": "01-configurare",
    "definition": "Consola Windows care listează hardware-ul instalat și permite actualizarea, dezactivarea sau revenirea driverelor."
  },
  {
    "term": "Periferic",
    "course": "configurare-dispozitive",
    "module": "01-configurare",
    "definition": "Dispozitiv extern conectat la calculator (imprimantă, monitor, căști), prin porturi precum USB, USB-C, HDMI, audio, Ethernet."
  },
  {
    "term": "Windows Update",
    "course": "configurare-dispozitive",
    "module": "01-configurare",
    "definition": "Serviciul care descarcă și instalează actualizări de securitate, de calitate și de funcții pentru Windows."
  },
  {
    "term": "NTFS / FAT32 / exFAT",
    "course": "configurare-dispozitive",
    "module": "02-acces-date",
    "definition": "Sisteme de fișiere. NTFS: permisiuni, criptare, jurnalizare. FAT32: compatibil, fișiere max. 4 GB. exFAT: pentru stick-uri mari, fără permisiuni."
  },
  {
    "term": "Permisiuni NTFS",
    "course": "configurare-dispozitive",
    "module": "02-acces-date",
    "definition": "Drepturi pe fișiere și foldere (Read, Write, Modify, Full Control). Combinate cu permisiunile de partajare, se aplică cea mai restrictivă."
  },
  {
    "term": "Backup complet / incremental / diferențial",
    "course": "configurare-dispozitive",
    "module": "02-acces-date",
    "definition": "Complet: toate datele. Incremental: modificările de la ultimul backup. Diferențial: modificările de la ultimul backup complet."
  },
  {
    "term": "BitLocker",
    "course": "configurare-dispozitive",
    "module": "03-securitate",
    "definition": "Funcție Windows care criptează volume întregi; cheia de recuperare trebuie păstrată în siguranță."
  },
  {
    "term": "UAC (User Account Control)",
    "course": "configurare-dispozitive",
    "module": "03-securitate",
    "definition": "Mecanism care cere confirmarea înainte ca o aplicație să primească drepturi de administrator."
  },
  {
    "term": "Autentificare multi-factor (MFA)",
    "course": "configurare-dispozitive",
    "module": "03-securitate",
    "definition": "Verificarea identității cu cel puțin doi factori: ceva ce știi (parolă), ceva ce ai (telefon), ceva ce ești (amprentă)."
  },
  {
    "term": "Safe Mode",
    "course": "configurare-dispozitive",
    "module": "04-depanare",
    "definition": "Mod de pornire Windows cu un set minim de drivere și servicii, folosit pentru a diagnostica probleme."
  },
  {
    "term": "System Restore",
    "course": "configurare-dispozitive",
    "module": "04-depanare",
    "definition": "Readuce fișierele de sistem și setările la un punct de restaurare anterior, fără a afecta documentele personale."
  },
  {
    "term": "Event Viewer",
    "course": "configurare-dispozitive",
    "module": "04-depanare",
    "definition": "Consola care afișează jurnalele de evenimente (Aplicație, Sistem, Securitate) pentru diagnosticarea erorilor."
  }
]
