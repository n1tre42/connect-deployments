import { makeQuestions, q, type QuestionSpec } from './question-builders'
import type { Question } from './questions'

const catalog: Record<string, Record<string, QuestionSpec[]>> = {
  retelistica: {
    '01-infrastructura': [
      q(
        ['Ce unește rețele IP diferite?', 'What connects different IP networks?'],
        ['Router', 'Hub', 'Repeater', 'Patch panel'],
        [
          'Routerul transmite pachete între rețele.',
          'A router forwards packets between networks.',
        ],
      ),
      q(
        [
          'Ce topologie are un dispozitiv central?',
          'Which topology has a central device?',
        ],
        [
          ['Stea', 'Star'],
          ['Inel', 'Ring'],
          ['Magistrală', 'Bus'],
          ['Punct-la-punct', 'Point-to-point'],
        ],
        [
          'În topologia stea toate nodurile se conectează la un punct central.',
          'In a star topology, all nodes connect to a central point.',
        ],
      ),
      q(
        ['Ce adresă este privată?', 'Which address is private?'],
        ['192.168.10.2', '8.8.8.8', '1.1.1.1', '129.6.15.28'],
        [
          '192.168.0.0/16 este un interval privat IPv4.',
          '192.168.0.0/16 is a private IPv4 range.',
        ],
      ),
      q(
        [
          'Câte adrese utilizabile are o subrețea IPv4 /27 convențională?',
          'How many usable addresses does a conventional IPv4 /27 subnet have?',
        ],
        ['30', '32', '62', '14'],
        [
          '5 biți de gazdă dau 32 adrese; rețeaua și broadcastul lasă 30.',
          '5 host bits give 32 addresses; network and broadcast leave 30 usable.',
        ],
      ),
      q(
        ['Ce face gateway-ul implicit?', 'What does the default gateway do?'],
        [
          [
            'Primește traficul către alte rețele',
            'Receives traffic destined for other networks',
          ],
          ['Traduce nume DNS', 'Resolves DNS names'],
          ['Atribuie adrese MAC', 'Assigns MAC addresses'],
          ['Înlocuiește cablul', 'Replaces the cable'],
        ],
        [
          'Gazda trimite traficul nelocal către gateway.',
          'A host sends nonlocal traffic to its gateway.',
        ],
      ),
      q(
        ['Ce nivel OSI folosește adrese IP?', 'Which OSI layer uses IP addresses?'],
        [
          ['Rețea, nivelul 3', 'Network, layer 3'],
          ['Fizic, nivelul 1', 'Physical, layer 1'],
          ['Sesiune, nivelul 5', 'Session, layer 5'],
          ['Aplicație, nivelul 7', 'Application, layer 7'],
        ],
        [
          'Rutarea IP aparține nivelului rețea.',
          'IP routing belongs to the network layer.',
        ],
      ),
    ],
    '02-hardware': [
      q(
        [
          'Pe ce se bazează un switch Ethernet pentru comutare?',
          'What does an Ethernet switch use for forwarding?',
        ],
        [
          ['Adrese MAC', 'MAC addresses'],
          ['Nume DNS', 'DNS names'],
          ['Parole', 'Passwords'],
          ['Numere de fișiere', 'File numbers'],
        ],
        [
          'Switchul învață adrese MAC și porturile asociate.',
          'A switch learns MAC addresses and their associated ports.',
        ],
      ),
      q(
        [
          'Ce suport este imun la interferențe electromagnetice?',
          'Which medium is immune to electromagnetic interference?',
        ],
        [
          ['Fibră optică', 'Optical fiber'],
          'UTP',
          'STP',
          ['Cablu coaxial', 'Coaxial cable'],
        ],
        [
          'Fibra transportă lumină, nu semnale electrice.',
          'Fiber carries light rather than electrical signals.',
        ],
      ),
      q(
        ['Ce oferă PoE?', 'What does PoE provide?'],
        [
          ['Date și alimentare pe Ethernet', 'Data and power over Ethernet'],
          ['Doar criptare', 'Encryption only'],
          ['Adrese publice', 'Public addresses'],
          ['Backup automat', 'Automatic backup'],
        ],
        [
          'Power over Ethernet alimentează dispozitive compatibile prin cablul de date.',
          'Power over Ethernet powers compatible devices through the data cable.',
        ],
      ),
      q(
        [
          'Ce conectează clienți Wi-Fi la rețeaua cablată?',
          'What connects Wi-Fi clients to a wired network?',
        ],
        [
          ['Punct de acces', 'Access point'],
          ['Patch panel pasiv', 'Passive patch panel'],
          ['Adaptor HDMI', 'HDMI adapter'],
          ['Splitter audio', 'Audio splitter'],
        ],
        [
          'Un access point face legătura dintre wireless și LAN.',
          'An access point bridges wireless clients to the LAN.',
        ],
      ),
      q(
        [
          'Ce instrument verifică continuitatea cablului?',
          'Which tool tests cable continuity?',
        ],
        [
          ['Tester de cablu', 'Cable tester'],
          ['Analizor SQL', 'SQL analyzer'],
          ['Termometru', 'Thermometer'],
          ['Compilator', 'Compiler'],
        ],
        [
          'Testerul depistează fire întrerupte sau conectate greșit.',
          'A cable tester detects broken or incorrectly wired conductors.',
        ],
      ),
      q(
        ['Ce separă un VLAN?', 'What does a VLAN separate?'],
        [
          ['Domenii de broadcast logice', 'Logical broadcast domains'],
          ['Frecvențe audio', 'Audio frequencies'],
          ['Versiuni de fișier', 'File versions'],
          ['Tipuri de baterii', 'Battery types'],
        ],
        [
          'VLAN-urile împart logic o infrastructură comutată.',
          'VLANs logically divide a switched infrastructure.',
        ],
      ),
    ],
    '03-protocoale-servicii': [
      q(
        [
          'Ce serviciu atribuie automat configurația IP?',
          'Which service automatically assigns IP configuration?',
        ],
        ['DHCP', 'DNS', 'SMTP', 'NTP'],
        [
          'DHCP furnizează adresa, masca, gateway-ul și alte opțiuni.',
          'DHCP supplies the address, mask, gateway, and other options.',
        ],
      ),
      q(
        [
          'Ce protocol oferă livrare fiabilă și ordonată?',
          'Which protocol offers reliable ordered delivery?',
        ],
        ['TCP', 'UDP', 'IP', 'ARP'],
        [
          'TCP folosește confirmări și retransmisii.',
          'TCP uses acknowledgements and retransmissions.',
        ],
      ),
      q(
        ['Ce port folosește HTTPS implicit?', 'Which port does HTTPS use by default?'],
        ['443', '80', '22', '53'],
        [
          'HTTPS folosește TLS, implicit pe portul 443.',
          'HTTPS uses TLS, normally on port 443.',
        ],
      ),
      q(
        ['Ce traduce DNS?', 'What does DNS resolve?'],
        [
          [
            'Nume de domeniu în adrese și alte înregistrări',
            'Domain names into addresses and other records',
          ],
          ['MAC în parole', 'MAC addresses into passwords'],
          ['Fișiere în directoare', 'Files into directories'],
          ['Tensiuni în curent', 'Voltage into current'],
        ],
        [
          'Înregistrările A și AAAA asociază nume cu IPv4 și IPv6.',
          'A and AAAA records associate names with IPv4 and IPv6 addresses.',
        ],
      ),
      q(
        ['La ce folosește ARP în IPv4?', 'What is ARP used for in IPv4?'],
        [
          [
            'Află adresa MAC pentru un IP local',
            'Finding the MAC address for a local IP',
          ],
          ['Criptează HTTP', 'Encrypting HTTP'],
          ['Atribuie IP public', 'Assigning public IPs'],
          ['Sincronizează ceasul', 'Synchronizing clocks'],
        ],
        [
          'ARP rezolvă adresa de nivel 2 pe segmentul local.',
          'ARP resolves a layer-2 address on the local segment.',
        ],
      ),
      q(
        ['Ce protocol sincronizează timpul?', 'Which protocol synchronizes time?'],
        ['NTP', 'FTP', 'IMAP', 'SNMP'],
        [
          'Network Time Protocol sincronizează ceasurile sistemelor.',
          'Network Time Protocol synchronizes system clocks.',
        ],
      ),
    ],
    '04-securitate': [
      q(
        [
          'Ce principiu acordă doar drepturile necesare?',
          'Which principle grants only necessary permissions?',
        ],
        [
          ['Privilegiu minim', 'Least privilege'],
          ['Acces universal', 'Universal access'],
          ['Parole comune', 'Shared passwords'],
          ['Permitere implicită', 'Default allow'],
        ],
        [
          'Reducerea drepturilor limitează impactul unui cont compromis.',
          'Reducing permissions limits the impact of a compromised account.',
        ],
      ),
      q(
        ['Ce protejează un VPN?', 'What does a VPN protect?'],
        [
          ['Traficul printr-un tunel criptat', 'Traffic through an encrypted tunnel'],
          ['Orice fișier infectat', 'Every infected file'],
          ['Defecțiuni fizice', 'Physical failures'],
          ['Toate parolele slabe', 'All weak passwords'],
        ],
        [
          'Un VPN protejează legătura; nu înlocuiește securitatea endpointului.',
          'A VPN protects the connection; it does not replace endpoint security.',
        ],
      ),
      q(
        [
          'Ce avantaj are WPA3 față de o rețea deschisă?',
          'What advantage does WPA3 have over an open network?',
        ],
        [
          [
            'Autentificare și criptare wireless',
            'Wireless authentication and encryption',
          ],
          ['Fără limită de rază', 'Unlimited range'],
          ['Elimină DNS', 'It eliminates DNS'],
          ['Înlocuiește fibra', 'It replaces fiber'],
        ],
        [
          'WPA3 protejează accesul și confidențialitatea traficului Wi-Fi.',
          'WPA3 protects access and the confidentiality of Wi-Fi traffic.',
        ],
      ),
      q(
        ['Ce este phishingul?', 'What is phishing?'],
        [
          [
            'Înșelarea utilizatorului pentru a obține date sensibile',
            'Tricking a user into revealing sensitive data',
          ],
          ['Un tip de cablu', 'A cable type'],
          ['Rutare dinamică', 'Dynamic routing'],
          ['Un protocol de timp', 'A time protocol'],
        ],
        [
          'Atacatorul imită o sursă de încredere pentru a fura date.',
          'An attacker impersonates a trusted source to steal information.',
        ],
      ),
      q(
        ['Ce controlează un firewall?', 'What does a firewall control?'],
        [
          ['Traficul permis conform regulilor', 'Traffic allowed by rules'],
          ['Capacitatea discului', 'Disk capacity'],
          ['Rezoluția ecranului', 'Display resolution'],
          ['Viteza ventilatorului', 'Fan speed'],
        ],
        [
          'Regulile pot filtra după adresă, port, protocol și stare.',
          'Rules can filter by address, port, protocol, and connection state.',
        ],
      ),
      q(
        ['Care este un exemplu de MFA?', 'Which is an example of MFA?'],
        [
          ['Parolă și cheie de securitate', 'Password and security key'],
          ['Două parole', 'Two passwords'],
          ['Parolă repetată', 'Repeated password'],
          ['Nume și email', 'Name and email'],
        ],
        [
          'MFA combină factori din categorii diferite.',
          'MFA combines factors from different categories.',
        ],
      ),
    ],
    '05-depanare': [
      q(
        ['Ce comandă testează răspunsul ICMP?', 'Which command tests ICMP reachability?'],
        ['ping', 'nslookup', 'mkdir', 'whoami'],
        [
          'ping trimite cereri ICMP Echo; filtrarea poate împiedica răspunsul.',
          'ping sends ICMP Echo requests; filtering can prevent replies.',
        ],
      ),
      q(
        [
          'Ce sugerează o adresă IPv4 169.254.x.x automată?',
          'What does an automatic 169.254.x.x IPv4 address suggest?',
        ],
        [
          [
            'Clientul nu a primit o adresă DHCP',
            'The client did not receive a DHCP address',
          ],
          ['DNS funcționează perfect', 'DNS works perfectly'],
          ['IP public fix', 'Static public IP'],
          ['Cablul este sigur bun', 'The cable is definitely good'],
        ],
        [
          'APIPA este folosit de Windows când atribuirea DHCP nu reușește.',
          'Windows uses APIPA when DHCP assignment fails.',
        ],
      ),
      q(
        [
          'Ce instrument investighează rezolvarea DNS?',
          'Which tool investigates DNS resolution?',
        ],
        ['nslookup', 'format', 'chkdsk', 'taskkill'],
        ['nslookup interoghează înregistrările DNS.', 'nslookup queries DNS records.'],
      ),
      q(
        [
          'IP-ul funcționează, numele nu. Ce verifici întâi?',
          'IP access works but names do not. What should you check first?',
        ],
        [
          ['Configurația DNS', 'DNS configuration'],
          ['Luminozitatea', 'Brightness'],
          ['Sistemul de fișiere', 'File system'],
          ['Placa de sunet', 'Sound card'],
        ],
        [
          'Diferența dintre accesul prin IP și nume indică o problemă DNS.',
          'The difference between IP and name access suggests a DNS issue.',
        ],
      ),
      q(
        ['Ce arată tracert/traceroute?', 'What does tracert/traceroute show?'],
        [
          ['Hopurile către destinație', 'Hops toward the destination'],
          ['Conținutul HTTPS decriptat', 'Decrypted HTTPS contents'],
          ['Parole Wi-Fi', 'Wi-Fi passwords'],
          ['Toate fișierele locale', 'All local files'],
        ],
        [
          'Valorile TTL permit identificarea routerelor intermediare.',
          'TTL values help identify intermediate routers.',
        ],
      ),
      q(
        [
          'Care este primul pas la un singur PC fără link?',
          'What is the first step for one PC with no link?',
        ],
        [
          ['Verifici cablul și LED-urile portului', 'Check the cable and port LEDs'],
          ['Reinstalezi tot serverul', 'Reinstall the entire server'],
          ['Ștergi baza de date', 'Delete the database'],
          ['Schimbi parola DNS', 'Change the DNS password'],
        ],
        [
          'Se pornește de la verificări fizice simple și observabile.',
          'Start with simple observable physical checks.',
        ],
      ),
    ],
  },
  html5: {
    '01-ciclu-viata': [
      q(
        ['Ce măsoară un test de acceptanță?', 'What does an acceptance test verify?'],
        [
          ['Îndeplinirea cerințelor utilizatorului', 'Whether user requirements are met'],
          ['Doar numărul liniilor', 'Only line count'],
          ['Doar culoarea editorului', 'Only editor color'],
          ['Parola routerului', 'Router password'],
        ],
        [
          'Acceptanța verifică rezultatele cerute pentru produs.',
          'Acceptance checks required product outcomes.',
        ],
      ),
      q(
        ['Ce păstrează Git?', 'What does Git maintain?'],
        [
          ['Istoricul versiunilor sursei', 'Source version history'],
          ['Doar pagina publicată', 'Only the published page'],
          ['Bateria dispozitivului', 'Device battery'],
          ['Toate parolele browserului', 'All browser passwords'],
        ],
        [
          'Git înregistrează schimbările și permite colaborarea pe ramuri.',
          'Git records changes and supports branch-based collaboration.',
        ],
      ),
      q(
        [
          'Ce răspuns HTTP indică o resursă absentă?',
          'Which HTTP status indicates a missing resource?',
        ],
        ['404', '200', '201', '204'],
        [
          '404 Not Found indică faptul că resursa nu a fost găsită.',
          '404 Not Found indicates that the resource was not found.',
        ],
      ),
      q(
        ['Ce scop are un service worker?', 'What is a service worker used for?'],
        [
          [
            'Interceptarea cererilor și suport offline',
            'Intercepting requests and supporting offline use',
          ],
          ['Înlocuirea serverului DNS', 'Replacing the DNS server'],
          ['Acces nelimitat la disc', 'Unlimited disk access'],
          ['Crearea automată de parole', 'Automatic password creation'],
        ],
        [
          'Service workerul poate gestiona cache-ul în fundal într-un context securizat.',
          'A service worker can manage caching in the background in a secure context.',
        ],
      ),
      q(
        ['Ce este o regresie?', 'What is a regression?'],
        [
          [
            'O funcționalitate existentă stricată de o modificare',
            'An existing feature broken by a change',
          ],
          ['Un commit nou', 'A new commit'],
          ['O pagină semantică', 'A semantic page'],
          ['O conexiune TLS', 'A TLS connection'],
        ],
        [
          'Testele de regresie verifică păstrarea comportamentelor existente.',
          'Regression tests check that existing behavior continues to work.',
        ],
      ),
      q(
        ['De ce testăm la lățimi diferite?', 'Why test at different viewport widths?'],
        [
          ['Pentru a verifica adaptarea interfeței', 'To verify responsive behavior'],
          ['Pentru a modifica DNS', 'To change DNS'],
          ['Pentru a evita HTML', 'To avoid HTML'],
          ['Pentru a dezactiva CSS', 'To disable CSS'],
        ],
        [
          'Un layout trebuie să rămână utilizabil pe mobil și desktop.',
          'A layout must remain usable on mobile and desktop.',
        ],
      ),
    ],
    '02-interfata-html5': [
      q(
        [
          'Ce element descrie navigarea principală?',
          'Which element describes primary navigation?',
        ],
        ['<nav>', '<div>', '<b>', '<small>'],
        [
          'nav oferă semantică pentru un grup de linkuri de navigare.',
          'nav provides semantics for a group of navigation links.',
        ],
      ),
      q(
        [
          'Cum asociem un label cu un input?',
          'How do we associate a label with an input?',
        ],
        [
          ['for egal cu id-ul inputului', 'for matching the input id'],
          ['Doar aceeași culoare', 'Only matching colors'],
          ['Prin href', 'Using href'],
          ['Prin src', 'Using src'],
        ],
        [
          'Asocierea explicită îmbunătățește accesibilitatea și zona de clic.',
          'Explicit association improves accessibility and the clickable area.',
        ],
      ),
      q(
        [
          'Ce alt folosim pentru o imagine decorativă?',
          'Which alt text should a decorative image have?',
        ],
        ['alt=""', 'alt="image"', 'alt="important"', 'alt="photo.jpg"'],
        [
          'Un alt gol permite cititorului de ecran să ignore decorul.',
          'Empty alt text lets a screen reader ignore decoration.',
        ],
      ),
      q(
        [
          'Ce tip de buton previne trimiterea formularului?',
          'Which button type prevents form submission?',
        ],
        ['type="button"', 'type="submit"', 'type="send"', 'type="form"'],
        [
          'Într-un formular, un buton fără tip poate trimite implicit formularul.',
          'Inside a form, a button without a type may submit by default.',
        ],
      ),
      q(
        [
          'Ce atribut cere completarea unui câmp?',
          'Which attribute requires a field to be completed?',
        ],
        ['required', 'disabled', 'readonly', 'hidden'],
        [
          'required activează validarea nativă pentru câmpul obligatoriu.',
          'required enables native validation for a mandatory field.',
        ],
      ),
      q(
        ['Cum afișăm un video cu controale?', 'How do we display a video with controls?'],
        [
          '<video controls src="clip.mp4"></video>',
          '<img src="clip.mp4">',
          '<audio type="video">',
          '<video disabled>',
        ],
        [
          'controls afișează comenzile native ale playerului video.',
          'controls displays the native video player controls.',
        ],
      ),
    ],
    '03-formatare-css': [
      q(
        ['Ce include modelul box CSS?', 'What does the CSS box model include?'],
        [
          ['Conținut, padding, border, margin', 'Content, padding, border, margin'],
          ['Doar text', 'Text only'],
          ['Doar coordonate', 'Coordinates only'],
          ['Fișiere și directoare', 'Files and directories'],
        ],
        [
          'Cele patru zone determină spațiul ocupat de element.',
          'The four areas determine the space occupied by an element.',
        ],
      ),
      q(
        ['Ce înseamnă box-sizing: border-box?', 'What does box-sizing: border-box mean?'],
        [
          ['width include padding și border', 'width includes padding and border'],
          ['margin este inclus', 'margin is included'],
          ['border dispare', 'border disappears'],
          ['width este ignorat', 'width is ignored'],
        ],
        [
          'Dimensiunea declarată cuprinde conținutul, paddingul și bordura.',
          'The declared size includes content, padding, and border.',
        ],
      ),
      q(
        [
          'Ce selector are specificitatea cea mai mare?',
          'Which selector has the highest specificity?',
        ],
        ['#menu', '.menu', 'nav', '*'],
        [
          'Un selector ID are specificitate mai mare decât o clasă sau un tip.',
          'An ID selector has higher specificity than a class or type.',
        ],
      ),
      q(
        [
          'Cum definim două coloane egale cu Grid?',
          'How do we define two equal Grid columns?',
        ],
        [
          'grid-template-columns: repeat(2, 1fr)',
          'grid-columns: 2',
          'display: columns(2)',
          'grid-template: equal',
        ],
        [
          'repeat(2, 1fr) creează două coloane cu fracții egale.',
          'repeat(2, 1fr) creates two equal fractional columns.',
        ],
      ),
      q(
        ['Ce face @media (max-width: 600px)?', 'What does @media (max-width: 600px) do?'],
        [
          [
            'Aplică reguli la viewport de cel mult 600px',
            'Applies rules at viewport widths up to 600px',
          ],
          ['Mărește toate imaginile', 'Enlarges all images'],
          ['Blochează ecranul', 'Locks the screen'],
          ['Schimbă HTML pe server', 'Changes server HTML'],
        ],
        [
          'Media queries adaptează stilurile la condițiile mediului.',
          'Media queries adapt styles to environment conditions.',
        ],
      ),
      q(
        [
          'Ce proprietate Flexbox aliniază pe axa transversală?',
          'Which Flexbox property aligns on the cross axis?',
        ],
        ['align-items', 'justify-content', 'font-weight', 'z-index'],
        [
          'align-items controlează alinierea pe axa transversală.',
          'align-items controls cross-axis alignment.',
        ],
      ),
    ],
    '04-javascript': [
      q(
        [
          'Ce comparație evită conversia implicită de tip?',
          'Which comparison avoids implicit type conversion?',
        ],
        ['===', '==', '=', '!='],
        [
          '=== compară valoarea și tipul fără coerciție.',
          '=== compares value and type without coercion.',
        ],
      ),
      q(
        ['Ce metodă ascultă un clic?', 'Which method listens for a click?'],
        [
          'addEventListener("click", handler)',
          'onClickNow(handler)',
          'listenClick = true',
          'dispatchEvent("load")',
        ],
        [
          'addEventListener înregistrează un handler pentru tipul de eveniment.',
          'addEventListener registers a handler for an event type.',
        ],
      ),
      q(
        [
          'Ce returnează document.querySelector dacă nu găsește nimic?',
          'What does document.querySelector return if nothing matches?',
        ],
        ['null', '[]', 'false', '0'],
        [
          'querySelector returnează primul element potrivit sau null.',
          'querySelector returns the first matching element or null.',
        ],
      ),
      q(
        [
          'Ce metodă transformă JSON text într-un obiect?',
          'Which method turns JSON text into an object?',
        ],
        ['JSON.parse()', 'JSON.stringify()', 'Object.toJSON()', 'String.json()'],
        [
          'JSON.parse deserializează; stringify serializează.',
          'JSON.parse deserializes; stringify serializes.',
        ],
      ),
      q(
        ['Ce face event.preventDefault()?', 'What does event.preventDefault() do?'],
        [
          [
            'Împiedică acțiunea implicită anulabilă',
            'Prevents the cancelable default action',
          ],
          ['Șterge elementul', 'Deletes the element'],
          ['Oprește orice JavaScript', 'Stops all JavaScript'],
          ['Garantează oprirea propagării', 'Always stops propagation'],
        ],
        [
          'De exemplu, poate împiedica trimiterea nativă a unui formular.',
          'For example, it can prevent native form submission.',
        ],
      ),
      q(
        [
          'Ce verificăm înainte de response.json() la fetch?',
          'What should we check before response.json() after fetch?',
        ],
        ['response.ok', 'response.style', 'response.length', 'response.onclick'],
        [
          'fetch nu respinge automat pentru răspunsuri HTTP 4xx sau 5xx.',
          'fetch does not automatically reject HTTP 4xx or 5xx responses.',
        ],
      ),
    ],
  },
  'configurare-dispozitive': {
    '01-configurare': [
      q(
        [
          'Ce instrument gestionează driverele Windows?',
          'Which tool manages Windows drivers?',
        ],
        ['Device Manager', 'Notepad', 'Paint', 'Calculator'],
        [
          'Device Manager arată dispozitivele, starea și driverele.',
          'Device Manager shows devices, their status, and drivers.',
        ],
      ),
      q(
        ['De unde luăm un driver?', 'Where should we obtain a driver?'],
        [
          ['Producător sau Windows Update', 'The manufacturer or Windows Update'],
          ['Orice reclamă', 'Any advertisement'],
          ['Atașament necunoscut', 'An unknown attachment'],
          ['Un pop-up', 'A pop-up'],
        ],
        [
          'Sursele oficiale reduc riscul de software malițios sau incompatibil.',
          'Official sources reduce malware and incompatibility risks.',
        ],
      ),
      q(
        ['Ce este UEFI?', 'What is UEFI?'],
        [
          [
            'Firmware care inițializează hardware-ul și pornirea',
            'Firmware that initializes hardware and booting',
          ],
          ['Un browser', 'A browser'],
          ['Un editor foto', 'A photo editor'],
          ['Un protocol email', 'An email protocol'],
        ],
        [
          'UEFI este interfața firmware modernă a platformei.',
          'UEFI is the modern platform firmware interface.',
        ],
      ),
      q(
        [
          'Ce cablu transportă video digital și audio?',
          'Which cable carries digital video and audio?',
        ],
        ['HDMI', 'RJ11', 'PS/2', 'SATA power'],
        [
          'HDMI transportă atât imagine, cât și sunet digital.',
          'HDMI carries both digital video and audio.',
        ],
      ),
      q(
        [
          'Ce verificăm înainte de instalarea unei aplicații?',
          'What should we check before installing an application?',
        ],
        [
          ['Compatibilitatea și sursa', 'Compatibility and source'],
          ['Doar pictograma', 'Only the icon'],
          ['Doar numele', 'Only the name'],
          ['Culoarea cablului', 'Cable color'],
        ],
        [
          'Arhitectura, cerințele și sursa de încredere contează.',
          'Architecture, requirements, and a trusted source matter.',
        ],
      ),
      q(
        [
          'Ce mod reduce consumul când nu folosim PC-ul?',
          'Which mode reduces power use while the PC is idle?',
        ],
        [
          ['Repaus', 'Sleep'],
          ['Benchmark', 'Benchmark'],
          ['Defragmentare', 'Defragmentation'],
          ['Instalare driver', 'Driver installation'],
        ],
        [
          'Repausul suspendă majoritatea activităților pentru economie de energie.',
          'Sleep suspends most activity to save energy.',
        ],
      ),
    ],
    '02-acces-date': [
      q(
        [
          'Ce sistem de fișiere Windows oferă permisiuni pe fișiere?',
          'Which Windows file system supports file permissions?',
        ],
        ['NTFS', 'FAT32', 'ISO 9660', 'Audio CD'],
        [
          'NTFS oferă ACL-uri pentru fișiere și directoare.',
          'NTFS supports ACLs for files and folders.',
        ],
      ),
      q(
        [
          'Ce înseamnă strategia de backup 3-2-1?',
          'What does the 3-2-1 backup strategy mean?',
        ],
        [
          [
            '3 copii, 2 tipuri de suport, 1 copie externă',
            '3 copies, 2 media types, 1 offsite copy',
          ],
          ['3 parole și 2 utilizatori', '3 passwords and 2 users'],
          ['1 singur disc', '1 disk only'],
          ['Backup la 321 zile', 'A backup every 321 days'],
        ],
        [
          'Diversificarea copiilor reduce riscul pierderii simultane.',
          'Diversifying copies reduces the risk of simultaneous loss.',
        ],
      ),
      q(
        ['Ce face o scurtătură către un fișier?', 'What does a file shortcut do?'],
        [
          ['Indică spre fișierul original', 'Points to the original file'],
          ['Copiază automat conținutul', 'Automatically copies content'],
          ['Criptează originalul', 'Encrypts the original'],
          ['Înlocuiește backupul', 'Replaces backup'],
        ],
        [
          'Ștergerea scurtăturii nu șterge fișierul țintă.',
          'Deleting the shortcut does not delete the target file.',
        ],
      ),
      q(
        [
          'Ce limită importantă are FAT32 pentru un singur fișier?',
          'What important single-file limit does FAT32 have?',
        ],
        [
          ['Aproximativ 4 GiB', 'Approximately 4 GiB'],
          '1 TiB',
          '32 TiB',
          ['Fără limită', 'No limit'],
        ],
        [
          'Dimensiunea maximă a unui fișier FAT32 este 4 GiB minus un octet.',
          'The maximum FAT32 file size is 4 GiB minus one byte.',
        ],
      ),
      q(
        ['De ce afișăm extensiile fișierelor?', 'Why display filename extensions?'],
        [
          [
            'Pentru a recunoaște tipul real al fișierului',
            'To recognize the actual file type',
          ],
          ['Pentru a dubla spațiul', 'To double storage'],
          ['Pentru a elimina viruși', 'To remove viruses'],
          ['Pentru a evita backupul', 'To avoid backups'],
        ],
        [
          'Extensiile vizibile ajută la identificarea executabilelor mascate.',
          'Visible extensions help identify disguised executables.',
        ],
      ),
      q(
        [
          'Ce verificăm după recuperarea datelor?',
          'What should we verify after restoring data?',
        ],
        [
          [
            'Integritatea și posibilitatea de deschidere',
            'Integrity and whether files open',
          ],
          ['Doar numărul pictogramelor', 'Only the icon count'],
          ['Doar tema', 'Only the theme'],
          ['Doar fundalul', 'Only the wallpaper'],
        ],
        [
          'O restaurare utilă trebuie să producă fișiere corecte și accesibile.',
          'A useful restoration must produce correct, accessible files.',
        ],
      ),
    ],
    '03-securitate': [
      q(
        ['Ce protejează BitLocker?', 'What does BitLocker protect?'],
        [
          ['Datele de pe unitate prin criptare', 'Data on a drive through encryption'],
          ['Temperatura CPU', 'CPU temperature'],
          ['Orice site web', 'Every website'],
          ['Doar imprimanta', 'Only the printer'],
        ],
        [
          'Criptarea discului protejează datele la pierderea dispozitivului.',
          'Drive encryption protects data if the device is lost.',
        ],
      ),
      q(
        [
          'De ce folosim zilnic un cont standard?',
          'Why use a standard account for daily work?',
        ],
        [
          [
            'Limitează modificările cu privilegii ridicate',
            'It limits changes requiring elevated privileges',
          ],
          ['Oprește toate atacurile', 'It stops every attack'],
          ['Elimină actualizările', 'It eliminates updates'],
          ['Mărește discul', 'It enlarges the disk'],
        ],
        [
          'Contul standard aplică principiul privilegiului minim.',
          'A standard account applies least privilege.',
        ],
      ),
      q(
        ['Ce face UAC?', 'What does UAC do?'],
        [
          [
            'Cere confirmare pentru ridicarea privilegiilor',
            'Requests confirmation for privilege elevation',
          ],
          ['Criptează toate emailurile', 'Encrypts all email'],
          ['Curăță ventilatorul', 'Cleans the fan'],
          ['Înlocuiește antivirusul', 'Replaces antivirus'],
        ],
        [
          'UAC separă operațiile obișnuite de cele administrative.',
          'UAC separates ordinary operations from administrative ones.',
        ],
      ),
      q(
        [
          'Unde păstrăm cheia de recuperare BitLocker?',
          'Where should a BitLocker recovery key be stored?',
        ],
        [
          [
            'Într-un loc sigur separat de dispozitiv',
            'In a secure location separate from the device',
          ],
          ['Doar pe discul criptat', 'Only on the encrypted disk'],
          ['Public pe internet', 'Publicly online'],
          ['În numele fișierului', 'In the filename'],
        ],
        [
          'Cheia trebuie să poată fi accesată când dispozitivul este blocat.',
          'The key must remain accessible when the device is locked.',
        ],
      ),
      q(
        [
          'Ce reduce riscul exploatării vulnerabilităților cunoscute?',
          'What reduces the risk of exploiting known vulnerabilities?',
        ],
        [
          ['Actualizări de securitate', 'Security updates'],
          ['Dezactivarea firewallului', 'Disabling the firewall'],
          ['Parole comune', 'Shared passwords'],
          ['Ascunderea taskbarului', 'Hiding the taskbar'],
        ],
        [
          'Actualizările corectează defecte de securitate cunoscute.',
          'Updates fix known security defects.',
        ],
      ),
      q(
        [
          'Ce facem cu un atașament neașteptat suspect?',
          'What should we do with a suspicious unexpected attachment?',
        ],
        [
          [
            'Verificăm expeditorul pe un canal separat',
            'Verify the sender through a separate channel',
          ],
          ['Îl rulăm ca administrator', 'Run it as administrator'],
          ['Dezactivăm antivirusul', 'Disable antivirus'],
          ['Îl trimitem tuturor', 'Send it to everyone'],
        ],
        [
          'Verificarea independentă poate detecta impersonarea.',
          'Independent verification can detect impersonation.',
        ],
      ),
    ],
    '04-depanare': [
      q(
        ['Ce arată Event Viewer?', 'What does Event Viewer show?'],
        [
          ['Jurnale de sistem și aplicații', 'System and application logs'],
          ['Doar fotografii', 'Only photos'],
          ['Viteza internetului garantată', 'Guaranteed internet speed'],
          ['Toate parolele', 'All passwords'],
        ],
        [
          'Jurnalele oferă timp, sursă și detalii despre erori.',
          'Logs provide error time, source, and details.',
        ],
      ),
      q(
        ['La ce folosește Safe Mode?', 'What is Safe Mode used for?'],
        [
          [
            'Diagnostic cu servicii și drivere minime',
            'Diagnosis with minimal services and drivers',
          ],
          ['Creșterea FPS', 'Increasing FPS'],
          ['Backup complet automat', 'Automatic full backup'],
          ['Criptarea BIOS', 'BIOS encryption'],
        ],
        [
          'Pornirea minimală ajută la izolarea software-ului problematic.',
          'Minimal startup helps isolate problematic software.',
        ],
      ),
      q(
        ['Ce verifică sfc /scannow?', 'What does sfc /scannow check?'],
        [
          ['Fișierele de sistem Windows', 'Windows system files'],
          ['Semnalul Wi-Fi', 'Wi-Fi signal'],
          ['Parolele', 'Passwords'],
          ['Temperatura camerei', 'Room temperature'],
        ],
        [
          'System File Checker verifică și repară fișiere de sistem protejate.',
          'System File Checker checks and repairs protected system files.',
        ],
      ),
      q(
        [
          'Ce instrument identifică un proces cu consum mare de CPU?',
          'Which tool identifies a process with high CPU usage?',
        ],
        ['Task Manager', 'Character Map', 'Paint', 'Snipping Tool'],
        [
          'Task Manager permite sortarea proceselor după consum.',
          'Task Manager lets you sort processes by resource use.',
        ],
      ),
      q(
        [
          'Ce faci dacă un driver nou produce erori?',
          'What should you do if a new driver causes errors?',
        ],
        [
          [
            'Revii la driverul anterior compatibil',
            'Roll back to the previous compatible driver',
          ],
          ['Ștergi toate datele imediat', 'Immediately erase all data'],
          ['Dezactivezi backupul', 'Disable backup'],
          ['Schimbi rezoluția la întâmplare', 'Randomly change resolution'],
        ],
        [
          'Revenirea la un driver stabil poate confirma cauza.',
          'Rolling back to a stable driver can help confirm the cause.',
        ],
      ),
      q(
        ['Ce NU înlocuiește System Restore?', 'What does System Restore NOT replace?'],
        [
          ['Backupul fișierelor personale', 'A backup of personal files'],
          ['Punctele de restaurare', 'Restore points'],
          ['Restaurarea configurației', 'Configuration restoration'],
          ['Revenirea unor setări', 'Reverting some settings'],
        ],
        [
          'System Restore restaurează configurația sistemului, nu este backup complet al documentelor.',
          'System Restore restores system configuration; it is not a full document backup.',
        ],
      ),
    ],
  },
}

export const systemsBank: Record<string, Question[]> = Object.fromEntries(
  Object.entries(catalog).map(([course, modules]) => [
    course,
    Object.entries(modules).flatMap(([module, specs]) =>
      makeQuestions(course, module, specs),
    ),
  ]),
)
