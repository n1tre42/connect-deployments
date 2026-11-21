import { hashString } from '@/lib/random'
import type { Question } from './questions'
export type OfficialObjective = {
  id: string
  titleRo: string
  titleEn: string
  source: string
}
export const objectivesByCourse: Record<string, OfficialObjective[]> = {
  python: [
    {
      id: '1.1',
      titleRo: 'Identificarea tipurilor',
      titleEn: 'Types str/int/float/bool',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '1.2',
      titleRo: 'Conversii, indexare și liste',
      titleEn: 'Type conversion, indexing, slicing and lists',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '1.3',
      titleRo: 'Prioritatea operatorilor',
      titleEn: 'Operator precedence',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '1.4',
      titleRo: 'Alegerea operatorilor',
      titleEn: 'Select operators for intended result',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '2.1',
      titleRo: 'Decizii și condiții',
      titleEn: 'Branching, nested and compound conditions',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '2.2',
      titleRo: 'Bucle și controlul iterației',
      titleEn: 'Iteration, nested loops, break/continue/pass',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '3.1',
      titleRo: 'Citirea și scrierea fișierelor',
      titleEn: 'File input/output, existence and deletion',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '3.2',
      titleRo: 'Consolă, formatare și argumente',
      titleEn: 'Console I/O, formatting, command-line arguments',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '4.1',
      titleRo: 'Documentarea codului',
      titleEn: 'Documentation, indentation, comments, docstrings, pydoc',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '4.2',
      titleRo: 'Definirea funcțiilor',
      titleEn: 'Function definitions and signatures',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '5.1',
      titleRo: 'Identificarea erorilor',
      titleEn: 'Syntax, logic and runtime errors',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '5.2',
      titleRo: 'Tratarea excepțiilor',
      titleEn: 'Exception handling',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '5.3',
      titleRo: 'Teste unitare cu unittest',
      titleEn: 'unittest and assertion methods',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '6.1',
      titleRo: 'Sistem de fișiere și argumente',
      titleEn: 'io/os/os.path/sys and command-line operations',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '6.2',
      titleRo: 'Module math, datetime și random',
      titleEn: 'math/datetime/random modules',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
  ],
  'baze-de-date': [
    {
      id: '1.1',
      titleRo: 'Proiectarea tabelelor',
      titleEn: 'Design tables, entities, records and fields',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '1.2',
      titleRo: 'Chei primare și compuse',
      titleEn: 'Primary and composite keys',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '1.3',
      titleRo: 'Alegerea tipurilor de date',
      titleEn: 'Select data types',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '1.4',
      titleRo: 'Relații și integritate',
      titleEn: 'Relationships, foreign keys, ERD, integrity',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '1.5',
      titleRo: 'Normalizarea până la 3NF',
      titleEn: 'Normalize to 3NF',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '1.6',
      titleRo: 'Protecția datelor și permisiuni',
      titleEn: 'Protection, GRANT/REVOKE, roles, encryption/hash/mask/audit',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '2.1',
      titleRo: 'Gestionarea tabelelor prin DDL',
      titleEn: 'CREATE/ALTER/DROP TABLE, NULL constraints',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '2.2',
      titleRo: 'Gestionarea vederilor',
      titleEn: 'CREATE/ALTER/DROP VIEW',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '2.3',
      titleRo: 'Proceduri și funcții stocate',
      titleEn: 'Stored procedures and functions, parameters',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '2.4',
      titleRo: 'Indecși clustered și nonclustered',
      titleEn: 'Clustered/nonclustered indexes',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '3.1',
      titleRo: 'SELECT și combinarea rezultatelor',
      titleEn: 'SELECT, joins, UNION, INTERSECT, NULLIF',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '3.2',
      titleRo: 'Sortare și filtrare',
      titleEn: 'Sort and filter, ANY/ALL/IN/NULL',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '3.3',
      titleRo: 'Agregarea datelor',
      titleEn: 'Aggregates, GROUP BY/HAVING',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '4.1',
      titleRo: 'INSERT',
      titleEn: 'INSERT INTO SELECT/VALUES',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '4.2',
      titleRo: 'UPDATE',
      titleEn: 'UPDATE a table',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '4.3',
      titleRo: 'DELETE',
      titleEn: 'DELETE from a table',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '5.1',
      titleRo: 'Depanarea comenzilor DDL',
      titleEn: 'Troubleshoot object-management failures',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '5.2',
      titleRo: 'Depanarea interogărilor SELECT',
      titleEn: 'Troubleshoot retrieval failures',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
    {
      id: '5.3',
      titleRo: 'Depanarea comenzilor DML',
      titleEn: 'Troubleshoot manipulation failures',
      source: 'https://certiport.pearsonvue.com/fc/ITS/database',
    },
  ],
  retelistica: [
    {
      id: '1.1',
      titleRo: 'Concepte și performanța rețelei',
      titleEn: 'Network concepts, IoT, redundancy, goodput/jitter, network scope',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '1.2',
      titleRo: 'Virtualizare și IaaS',
      titleEn: 'Virtualization, hypervisors, virtual devices and IaaS',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '1.3',
      titleRo: 'Topologii și metode de acces',
      titleEn: 'Topologies and access methods',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '1.4',
      titleRo: 'Acces la distanță',
      titleEn: 'VPN and remote desktop/assistance',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '2.1',
      titleRo: 'LAN, VLAN și DMZ',
      titleEn: 'LAN/VLAN/DMZ/security zones',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '2.2',
      titleRo: 'Alegerea tehnologiei WAN',
      titleEn: 'WAN technology selection, LTE/WiMAX/FTTx',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '2.3',
      titleRo: 'Rețele wireless LAN',
      titleEn: 'Wireless LANs, WPA3, channels and WiFi generations',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '2.4',
      titleRo: 'Alegerea tehnologiei wireless',
      titleEn: 'Wireless technology selection, Zigbee/Z-Wave/NFC/RFID',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '3.1',
      titleRo: 'Caracteristicile switch-urilor',
      titleEn: 'Switch characteristics, PoE and SFP',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '3.2',
      titleRo: 'Procese de comutare',
      titleEn: 'Switching methods, MAC tables, STP and trunks',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '3.3',
      titleRo: 'Procese de rutare',
      titleEn: 'Routing processes, QoS, convergence and domains',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '3.4',
      titleRo: 'Alegerea mediului fizic',
      titleEn: 'Physical media, CAT5–CAT8, lengths and attenuation',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '3.5',
      titleRo: 'Administrarea dispozitivelor',
      titleEn: 'Device management via console/Telnet/SSH/SNMP',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.1',
      titleRo: 'Modelul OSI',
      titleEn: 'OSI, PDUs and encapsulation',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.2',
      titleRo: 'Modelul TCP/IP',
      titleEn: 'TCP/IP model and encapsulation',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.3',
      titleRo: 'Adresare IPv4',
      titleEn: 'IPv4, CIDR, subnetting, APIPA and addressing',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.4',
      titleRo: 'Adresare IPv6',
      titleEn: 'IPv6, SLAAC/DHCPv6 and address structure',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.5',
      titleRo: 'Porturi cunoscute',
      titleEn: 'Well-known port numbers',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.6',
      titleRo: 'Rezolvarea numelor',
      titleEn: 'Name resolution, records, dynamic DNS',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.7',
      titleRo: 'Servicii de rețea',
      titleEn: 'DHCP/NAT/ARP/RARP/NTP services',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '4.8',
      titleRo: 'Protocoale comune',
      titleEn: 'Protocols incl. LDAP/LDAPS/RADIUS/TACACS/SMB',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '5.1',
      titleRo: 'Procesul de depanare',
      titleEn: 'Troubleshooting process and professional conduct',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '5.2',
      titleRo: 'Instrumente hardware',
      titleEn: 'Hardware tools incl. OTDR/VFL/WiFi analyzer',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '5.3',
      titleRo: 'Comenzi Windows',
      titleEn: 'Interpret Windows command results',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '5.4',
      titleRo: 'Comenzi Linux',
      titleEn: 'Interpret Linux command results',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
    {
      id: '5.5',
      titleRo: 'Instrumente grafice de diagnostic',
      titleEn: 'Graphical tools incl. Wireshark/speed/public-IP/domain lookup',
      source: 'https://certiport.pearsonvue.com/fc/ITS/networking/OD',
    },
  ],
  html5: [
    {
      id: '1.1',
      titleRo: 'Ciclul de viață al aplicației',
      titleEn: 'Application lifecycle stages',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '1.2',
      titleRo: 'Testare și depanare',
      titleEn: 'Debug and test apps, validation/runtime/breakpoints',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '2.1',
      titleRo: 'Grafică și animație cu canvas',
      titleEn: 'Canvas graphics and animation',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '2.2',
      titleRo: 'Grafică SVG',
      titleEn: 'SVG graphics, inline/referenced XML',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '2.3',
      titleRo: 'Efecte și transformări CSS',
      titleEn: 'Effects, 2D/3D transforms, typography, keyframes',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '2.4',
      titleRo: 'Filtre CSS pentru imagini',
      titleEn: 'CSS image filters',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '3.1',
      titleRo: 'Elemente pentru formulare',
      titleEn: 'Forms: datalist/fieldset/meter/legend/output',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '3.2',
      titleRo: 'Validarea datelor',
      titleEn: 'Input validation and pattern/required',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '4.1',
      titleRo: 'Flux, poziționare și overflow',
      titleEn: 'Flow, positioning, overflow and styling',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '4.2',
      titleRo: 'Design adaptiv',
      titleEn: 'Responsive design, picture/viewport/media queries',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '4.3',
      titleRo: 'Layout cu Flexbox',
      titleEn: 'Flexbox layouts',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '4.4',
      titleRo: 'Layout cu CSS Grid',
      titleEn: 'Grid layouts',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '5.1',
      titleRo: 'Clase JavaScript și moștenire',
      titleEn: 'JavaScript classes, methods and inheritance',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '5.2',
      titleRo: 'Acces la date, XML și JSON',
      titleEn: 'Data access, XML/JSON, send/receive/load/save',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '5.3',
      titleRo: 'Evenimente și propagare',
      titleEn: 'Events, gestures, bubbling and handlers',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '5.4',
      titleRo: 'API-uri JavaScript',
      titleEn: 'APIs: Google Charts/jQuery/Geolocation',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
    {
      id: '5.5',
      titleRo: 'Starea aplicației',
      titleEn: 'Session/app state, local/session storage',
      source: 'https://certiport.pearsonvue.com/fc/ITS/htmlappdevelopment',
    },
  ],
  'configurare-dispozitive': [
    {
      id: '1.1',
      titleRo: 'Componentele calculatorului',
      titleEn: 'Computer components and functions',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '1.2',
      titleRo: 'Active Directory și politici',
      titleEn: 'Active Directory, domain users, group policy',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '1.3',
      titleRo: 'Instalarea Windows',
      titleEn: 'Install/upgrade Windows, local/Microsoft accounts',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '1.4',
      titleRo: 'Conturi și profiluri',
      titleEn: 'User accounts, roles and profiles',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '1.5',
      titleRo: 'Setări desktop și alimentare',
      titleEn: 'Desktop, taskbar, display, time and power settings',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '1.6',
      titleRo: 'Accesibilitate',
      titleEn: 'Accessibility settings',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '1.7',
      titleRo: 'Actualizări și drivere',
      titleEn: 'Updates, patches, drivers and history',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '2.1',
      titleRo: 'Aplicații și caracteristici Windows',
      titleEn: 'Apps/features/Store/architecture/Remote Desktop',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '2.2',
      titleRo: 'Scopul și limitele Copilot',
      titleEn: 'Windows Copilot purpose and limitations',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '2.3',
      titleRo: 'Windows Registry',
      titleEn: 'Windows Registry',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '2.4',
      titleRo: 'Conectori periferici',
      titleEn: 'Peripheral connectors and adapters',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '2.5',
      titleRo: 'Proiecție și afișare',
      titleEn: 'Projection/display/ClearType',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '3.1',
      titleRo: 'Cloud, partiții și sisteme de fișiere',
      titleEn: 'Cloud services, partitions, filesystems, GPT/MBR',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '3.2',
      titleRo: 'Partajare și permisiuni',
      titleEn: 'Sharing, effective permissions, ownership, mapped drives',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '3.3',
      titleRo: 'Copii de siguranță și restaurare',
      titleEn: 'Backup/restore, cloud disk image and file history',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '4.1',
      titleRo: 'Windows Defender Firewall',
      titleEn: 'Windows Defender Firewall and network profiles',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '4.2',
      titleRo: 'Autentificare și Windows Hello',
      titleEn: 'Authentication/MFA/Windows Hello/passwords',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '4.3',
      titleRo: 'Amenințări informatice',
      titleEn: 'Malware/social engineering/physical threats',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '4.4',
      titleRo: 'Răspuns la malware și phishing',
      titleEn: 'Respond to malware and social engineering',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '4.5',
      titleRo: 'Setările UAC',
      titleEn: 'UAC settings and elevation',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '5.1',
      titleRo: 'Instrumente de depanare și politici',
      titleEn: 'Troubleshooting tools, escalation and group-policy commands',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '5.2',
      titleRo: 'Depanarea sistemului și aplicațiilor',
      titleEn: 'OS/apps/Store/services/S mode/startup',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '5.3',
      titleRo: 'Depanarea dispozitivelor',
      titleEn: 'Hardware/devices/drivers/Disk Management',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
    {
      id: '5.4',
      titleRo: 'Depanarea rețelei și domeniilor',
      titleEn: 'Network/domain troubleshooting commands',
      source:
        'https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/clients/it-specialist/its-od-103-devices-pearson.pdf',
    },
  ],
  'python-next-generation': [
    {
      id: '1.1',
      titleRo: 'Identificarea tipurilor',
      titleEn: 'Types str/int/float/bool',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '1.2',
      titleRo: 'Conversii, indexare și liste',
      titleEn: 'Type conversion, indexing, slicing and lists',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '1.3',
      titleRo: 'Prioritatea operatorilor',
      titleEn: 'Operator precedence',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '1.4',
      titleRo: 'Alegerea operatorilor',
      titleEn: 'Select operators for intended result',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '2.1',
      titleRo: 'Decizii și condiții',
      titleEn: 'Branching, nested and compound conditions',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '2.2',
      titleRo: 'Bucle și controlul iterației',
      titleEn: 'Iteration, nested loops, break/continue/pass',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '3.1',
      titleRo: 'Citirea și scrierea fișierelor',
      titleEn: 'File input/output, existence and deletion',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '3.2',
      titleRo: 'Consolă, formatare și argumente',
      titleEn: 'Console I/O, formatting, command-line arguments',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '4.1',
      titleRo: 'Documentarea codului',
      titleEn: 'Documentation, indentation, comments, docstrings, pydoc',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '4.2',
      titleRo: 'Definirea funcțiilor',
      titleEn: 'Function definitions and signatures',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '5.1',
      titleRo: 'Identificarea erorilor',
      titleEn: 'Syntax, logic and runtime errors',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '5.2',
      titleRo: 'Tratarea excepțiilor',
      titleEn: 'Exception handling',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '5.3',
      titleRo: 'Teste unitare cu unittest',
      titleEn: 'unittest and assertion methods',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '6.1',
      titleRo: 'Sistem de fișiere și argumente',
      titleEn: 'io/os/os.path/sys and command-line operations',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
    {
      id: '6.2',
      titleRo: 'Module math, datetime și random',
      titleEn: 'math/datetime/random modules',
      source: 'https://certiport.pearsonvue.com/fc/ITS/python',
    },
  ],
}
export const objectivesCheckedOn = '2026-11-06'
const moduleDomains: Record<string, string[][]> = {
  python: [['1'], ['2'], ['3'], ['4'], ['5'], ['6']],
  'python-next-generation': [['1'], ['2'], ['1'], ['4'], ['3'], ['5'], ['6']],
  'baze-de-date': [['1'], ['2'], ['3'], ['4'], ['5']],
  retelistica: [['1', '2'], ['3'], ['4'], ['2'], ['5']],
  html5: [['1'], ['2', '3'], ['2', '4'], ['5']],
  'configurare-dispozitive': [['1', '2'], ['3'], ['4'], ['5']],
}
export function attachLearningMetadata(course: string, question: Question): Question {
  const moduleIndex = Math.max(0, Number(question.module.slice(0, 2)) - 1)
  const domains = moduleDomains[course]?.[moduleIndex] ?? []
  const candidates = (objectivesByCourse[course] ?? [])
    .filter((o) => domains.includes(o.id.split('.')[0]))
    .map((o) => o.id)
  const concept = question.code
    ? question.code
    : question.explanation.toLowerCase().replace(/\\s+/g, ' ').trim()
  return {
    ...question,
    conceptId:
      question.conceptId ?? course + '-' + question.module + '-' + hashString(concept),
    objectiveIds: question.objectiveIds ?? candidates,
    mappingStatus: question.mappingStatus ?? 'suggested',
  }
}
export const learningScoreNote = {
  ro: 'Scor de antrenament BacIt. 700 Certiport nu înseamnă automat 70%.',
  en: 'BacIt practice score. 700 Certiport points do not necessarily mean 70%.',
}
