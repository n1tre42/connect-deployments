import { drillBuilder } from './drill-builder'
import { addCases } from './scenario-drills'
const bank = drillBuilder('configurare-dispozitive')
const ids = ['01-configurare', '02-acces-date', '03-securitate', '04-depanare']
addCases(bank, ids[0], '1.1', 'parts', 15, 'Componente și roluri|Hardware roles', [
  'Execută calculele principale ale aplicațiilor|Runs the main computations for applications > CPU',
  'Stochează temporar datele aplicațiilor în execuție|Temporarily stores data for running apps > RAM',
  'Păstrează sistemul și fișierele fără alimentare|Retains the operating system and files without power > SSD',
  'Procesează cadrele afișate prin accelerare hardware|Processes displayed frames using hardware acceleration > GPU',
  'Transformă alimentarea de la priză pentru componentele PC|Converts mains power for PC components > Sursă de alimentare|Power supply',
])
addCases(bank, ids[0], '1.2', 'domain-objects', 15, 'Obiecte de domeniu|Domain objects', [
  'Identitatea unei persoane administrată central|Central identity for an individual > Utilizator de domeniu|Domain user',
  'Set de conturi cărora le atribui aceleași permisiuni|Set of accounts to which you assign the same permissions > Grup de securitate|Security group',
  'Container pentru organizarea calculatoarelor și delegare|Container for organising computers and delegating administration > Unitate organizațională|Organisational unit',
  'Apasă reguli comune pentru stații printr-o configurație legată de OU|Apply shared workstation settings using a configuration linked to an OU > Obiect de politică de grup|Group Policy Object',
  'Server care autentifică membri ai domeniului|Server that authenticates domain members > Controler de domeniu|Domain controller',
])
addCases(
  bank,
  ids[0],
  '1.4',
  'account-scope',
  15,
  'Roluri și conturi Windows|Windows accounts and roles',
  [
    'Cont cu identitate păstrată numai pe calculator|Account whose identity exists only on one computer > Cont local|Local account',
    'Identitate personală conectată la servicii Microsoft online|Personal identity connected to Microsoft’s online services > Cont Microsoft|Microsoft account',
    'Cont administrat într-un domeniu Active Directory|Account managed in an Active Directory domain > Cont de domeniu|Domain account',
    'Rol potrivit pentru utilizare zilnică fără privilegii administrative|Role for routine use without administrative privileges > Utilizator standard|Standard user',
    'Rol care poate modifica setări de sistem după elevare|Role that can change system settings after elevation > Administrator',
  ],
)
addCases(
  bank,
  ids[0],
  '1.6',
  'accessible-win',
  15,
  'Accesibilitate în Windows|Windows accessibility',
  [
    'Citește interfața și textul cu voce sintetizată|Read interface and text with speech synthesis > Narator|Narrator',
    'Mărește o parte a ecranului fără a schimba rezoluția|Enlarge part of the screen without changing resolution > Lupă|Magnifier',
    'Permite o combinație de taste apăsate pe rând|Allow a key combination to be entered one key at a time > Taste adezive|Sticky Keys',
    'Reduce efectul apăsărilor repetate neintenționate|Reduce unintended repeated keystrokes > Taste de filtrare|Filter Keys',
    'Schimbă contrastul culorilor interfeței|Change the colour contrast of the interface > Teme de contrast|Contrast themes',
  ],
)
addCases(
  bank,
  ids[0],
  '1.7',
  'update-status',
  15,
  'Actualizări și drivere|Updates and drivers',
  [
    'Identifică data instalării unui pachet de sistem|Find when a system update package was installed > Istoric actualizări|Update history',
    'Un dispozitiv a încetat să funcționeze imediat după actualizarea driverului|A device stopped working immediately after its driver was updated > Revino la driverul anterior|Roll back the driver',
    'Finalizează o actualizare care este marcată ca necesitând repornire|Finish an update marked as requiring restart > Repornește planificat|Schedule a restart',
    'Află ce versiune Windows rulează pe stație|Find which Windows version a workstation is running > winver',
    'Caută manual patch-uri disponibile de la Microsoft|Manually look for available Microsoft updates > Caută actualizări|Check for updates',
  ],
)
addCases(
  bank,
  ids[1],
  '3.1',
  'storage-config',
  15,
  'Configurarea stocării|Storage configuration',
  [
    'O partiție nouă pe disc are nevoie de cheie de acces prin Explorer|A new partition needs a convenient Explorer access path > Atribuie o literă unității|Assign a drive letter',
    'Vrei ca un volum Windows să suporte liste de control al accesului|A Windows volume must support access control lists > NTFS',
    'Vrei stocare portabilă pentru fișiere mari între Windows și macOS|Need portable storage for large files between Windows and macOS > exFAT',
    'Un disc nou de 4 TB necesită o schemă modernă de partiționare|A new 4 TB drive requires a modern partition scheme > GPT',
    'Spațiu pe disc fără partiție definită|Disk space with no defined partition > Spațiu nealocat|Unallocated space',
  ],
)
addCases(bank, ids[1], '3.2', 'file-access', 15, 'Resurse partajate|Shared resources', [
  'Accesează direct partajarea docs de pe serverul files|Directly access the docs share on server files > \\\\files\\docs',
  'Atribuie litera P: unei partajări pentru elevi|Assign drive letter P: to a share for students > Unitate de rețea mapată|Mapped network drive',
  'Verifică permisiunile finale NTFS ale unui utilizator|Inspect a user’s effective NTFS rights > Acces efectiv|Effective Access',
  'Aplică drept de citire tuturor membrilor unui grup|Give all members of a group read access > Permisiune de citire pentru grup|Group read permission',
  'Setează utilizatorul care deține fișierul|Set which user owns the file > Proprietar|Owner',
])
addCases(
  bank,
  ids[1],
  '3.3',
  'recovery-methods',
  15,
  'Copii și recuperare|Backup and recovery',
  [
    'Restaurează o copie anterioară a unui document dintr-o copie locală configurată|Restore a past version of a document from a configured local backup > Istoric fișiere|File History',
    'Recuperează un sistem cu toate volumele după defectarea discului|Recover a system and its volumes after disk failure > Imagine de sistem|System image',
    'Revino la o stare anterioară a setărilor sistemului printr-un punct salvat|Revert system settings to a saved restore point > Restaurare sistem|System Restore',
    'Ține un set de documente disponibil pe mai multe dispozitive|Keep a set of documents available on multiple devices > Sincronizare cloud|Cloud sync',
    'Confirmă că fișierele din copie se pot citi înainte de nevoie|Confirm backed-up files are readable before they are needed > Test de restaurare|Test restore',
  ],
)
addCases(
  bank,
  ids[1],
  '3.2',
  'sharing-scope',
  15,
  'Permisiuni și partajare|Permissions and sharing',
  [
    'Limitează accesul la nivelul folderului partajat în rețea|Limit access at the folder share boundary > Permisiuni de partajare|Share permissions',
    'Limitează accesul și atunci când fișierul este deschis local|Limit access even when the file is opened locally > Permisiuni NTFS|NTFS permissions',
    'Propagă regulile unui folder părinte la fișierele lui|Propagate parent folder rules to its files > Moștenire|Inheritance',
    'Acordă doar operațiile necesare rolului|Grant only the operations a role requires > Privilegiu minim|Least privilege',
    'Înregistrează încercările relevante de acces după configurarea politicii și a SACL|Log relevant access attempts after configuring policy and a SACL > Audit de acces|Access auditing',
  ],
)
addCases(
  bank,
  ids[2],
  '4.1',
  'firewall-policy',
  15,
  'Reguli pentru rețea|Network rules',
  [
    'Calculează dacă o conexiune nouă din rețea poate intra spre un serviciu local|Decide whether a new connection from the network may reach a local service > Regulă de intrare|Inbound rule',
    'Restricționează conexiunile inițiate de o aplicație de pe calculator|Restrict connections initiated by an app on the computer > Regulă de ieșire|Outbound rule',
    'Aplică setări prudente pe o rețea de gară|Apply conservative settings on a railway station network > Profil public|Public profile',
    'Identifică la stația din domeniu profilul rețelei organizației autentificate|Identify the organisation’s authenticated network on a domain member > Profil de domeniu|Domain profile',
    'Permite accesul la imprimanta locală numai din subrețeaua biroului|Allow access to the local printer only from the office subnet > Restricție după adresă la distanță|Remote-address scope',
  ],
)
addCases(
  bank,
  ids[2],
  '4.2',
  'login-factors',
  15,
  'Verificarea identității|Identity verification',
  [
    'Secret cunoscut de utilizator|Secret known by the user > Factor de cunoaștere|Knowledge factor',
    'Cheie hardware de autentificare aflată la utilizator|Hardware authentication key held by the user > Factor de posesie|Possession factor',
    'Caracteristică fizică verificată de un senzor|Physical characteristic verified by a sensor > Factor biometric|Biometric factor',
    'Cod scurt Windows Hello legat de dispozitiv|Short Windows Hello code bound to a device > PIN Windows Hello|Windows Hello PIN',
    'Parolă și cheie hardware cerute împreună|Password and hardware key required together > Autentificare multifactor|Multifactor authentication',
  ],
)
addCases(
  bank,
  ids[2],
  '4.3',
  'threats',
  15,
  'Recunoașterea amenințărilor|Recognise threats',
  [
    'Mesaj fraudulos care cere verificarea contului printr-un link|Fraudulent message asking to verify an account through a link > Phishing',
    'Telefon de la un pretins tehnician care cere codul MFA|Phone call by a fake technician asking for an MFA code > Vishing',
    'Persoană intră în spațiul controlat urmând un angajat|Someone enters a controlled area by following an employee > Tailgating',
    'Fișierele sunt criptate și apare o cerere de plată|Files are encrypted and a payment demand appears > Ransomware',
    'Codul se ascunde într-un program ce pare legitim|Malicious code is hidden inside a program that appears legitimate > Troian|Trojan',
  ],
)
addCases(
  bank,
  ids[2],
  '4.4',
  'response-actions',
  15,
  'Răspunsul la incidente|Incident response',
  [
    'Mesaj suspect încă nedeschis|Unopened suspicious message > Raportează-l ca phishing|Report it as phishing',
    'Stație suspectată că răspândește malware în rețeaua laboratorului|Workstation suspected of spreading malware on the lab network > Izolează stația conform procedurii|Isolate the workstation according to procedure',
    'Parola a fost introdusă într-un formular fraudulos|A password was entered in a fraudulent form > Schimbă parola prin canalul legitim|Change the password through the legitimate channel',
    'Fișierele recuperate trebuie verificate înainte de restabilire|Recovered files must be checked before restoration > Verifică o copie curată|Verify a clean backup',
    'Mai multe stații au același simptom și depășesc accesul echipei locale|Several workstations share symptoms beyond the local team’s authority > Escaladează incidentul|Escalate the incident',
  ],
)
addCases(
  bank,
  ids[2],
  '4.5',
  'uac',
  15,
  'Elevare și privilegii|Elevation and privileges',
  [
    'Utilizator standard încearcă o modificare la nivel de sistem cu setări UAC implicite|Standard user attempts a system-wide change with default UAC settings > Solicitare pentru acreditări de administrator|Prompt for administrator credentials',
    'Administratorul face o modificare care cere confirmare UAC|An admin makes a change requiring UAC consent > Solicitare de consimțământ|Consent prompt',
    'Windows afișează solicitarea pe un desktop protejat separat|Windows shows its prompt on a separate protected desktop > Secure desktop',
    'O aplicație de încredere are nevoie de privilegii ridicate o singură dată|A trusted app needs elevated privileges once > Run as administrator',
    'Utilizatorul citește un document din propriul profil|User reads a document within their own profile > Acces standard fără elevare|Standard access without elevation',
  ],
)
addCases(
  bank,
  ids[3],
  '5.1',
  'logs-policies',
  15,
  'Depanarea politicilor și evenimentelor|Troubleshoot policies and events',
  [
    'Afișează politicile de grup efective pentru stație|Show effective group policies for the workstation > gpresult /r',
    'Solicită reîmprospătarea politicii de grup|Request a Group Policy refresh > gpupdate',
    'Citește jurnalul System pentru ora exactă a unei erori|Read the System log for the exact time of an error > Event Viewer',
    'Compară momentele căderilor și instalărilor pe o cronologie|Compare crash and installation times in a timeline > Reliability Monitor',
    'Trimite mai departe un incident și notează pașii deja testați|Pass on an incident and document the steps already tried > Escaladare documentată|Documented escalation',
  ],
)
addCases(
  bank,
  ids[3],
  '5.2',
  'startup-services',
  15,
  'Pornirea sistemului și aplicațiilor|System and application startup',
  [
    'Dezactivează lansarea automată a unei aplicații neesențiale la conectare|Disable a nonessential app that launches at sign-in > Startup apps',
    'Verifică starea serviciului Print Spooler|Check the status of the Print Spooler service > Services',
    'Urmărește procesele care folosesc resurse în timp real|Observe processes using resources in real time > Task Manager',
    'Depanează cu un set minim de drivere și servicii|Troubleshoot with a minimal set of drivers and services > Safe Mode',
    'Încearcă opțiunea Repair a unei aplicații care o acceptă|Use an app’s Repair option when available > Settings: Apps',
  ],
)
addCases(
  bank,
  ids[3],
  '5.3',
  'hardware-triage',
  15,
  'Diagnostic dispozitive|Device diagnostics',
  [
    'Identifică dispozitivul care are un cod de eroare de driver|Identify the device showing a driver error code > Device Manager',
    'Inspectează partițiile unui disc nou|Inspect partitions on a new drive > Disk Management',
    'Verifică dacă memoria produce erori la repornire|Check memory for faults on restart > Windows Memory Diagnostic',
    'Verifică rapid dacă un periferic funcționează prin alt cablu confirmat|Quickly check a peripheral with another known-good cable > Test cu un cablu funcțional|Known-good cable test',
    'Clientul nu vede imaginea fiindcă adaptorul monitorului este pe altă intrare|Client sees no picture because the monitor is on a different input > Alege sursa de intrare corectă|Select the correct input source',
  ],
)
addCases(
  bank,
  ids[3],
  '5.4',
  'windows-net-diag',
  15,
  'Diagnostic conexiuni Windows|Windows connection diagnostics',
  [
    'Verifică serverul DNS configurat și masca stației|Check the workstation’s configured DNS server and mask > ipconfig /all',
    'Testează rezoluția numelui aplicației interne|Test internal application name resolution > nslookup intranet.example.test',
    'Descoperă salturile către o destinație de test|Discover hops toward a test destination > tracert example.test',
    'Vezi rutele și gateway-urile instalate|View the installed routes and gateways > route print',
    'Testează dacă o gazdă răspunde la ICMP Echo|Test whether a destination replies to ICMP Echo > ping example.test',
  ],
)
export const deviceDrills = bank.questions
