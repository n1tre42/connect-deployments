import { drillBuilder, numberOptions } from './drill-builder'
import { addCases } from './scenario-drills'
const bank = drillBuilder('retelistica')
const ids = [
  '01-infrastructura',
  '02-hardware',
  '03-protocoale-servicii',
  '04-securitate',
  '05-depanare',
]

bank.choices(ids[0], '1.1', 'goodput', 10, (i) => {
  const seconds = i + 3,
    rate = 20 + 2 * i,
    bytes = seconds * rate
  return {
    prompt: [
      `O aplicație primește ${bytes} MB în ${seconds} s. Care este debitul util în Mb/s? Folosește unități zecimale.`,
      `An app receives ${bytes} MB in ${seconds} s. What is its application goodput in Mb/s? Use decimal units.`,
    ],
    options: numberOptions(rate * 8, rate, bytes * 8, bytes),
    explanation: [
      `Împarte la ${seconds} s și înmulțește cu 8 biți per octet.`,
      `Divide by ${seconds} s, then multiply by 8 bits per byte.`,
    ],
  }
})
bank.choices(ids[1], '3.4', 'copper-channel', 10, (i) => {
  const fixed = 81 + i,
    existing = 4 + (i % 3),
    left = 100 - fixed - existing
  return {
    prompt: [
      `Bugetul canalului Ethernet este 100 m. Legătura fixă de ${fixed} m are un patch de ${existing} m. Câți metri mai poți aloca celuilalt patch?`,
      `The Ethernet channel budget is 100 m. Its ${fixed} m permanent link has a ${existing} m patch lead. How many metres remain for the other lead?`,
    ],
    options: numberOptions(left, 100 - fixed, left + 5, left + 2),
    explanation: [
      'Se scad din buget lungimea legăturii fixe și lungimea patch-ului deja instalat.',
      'Subtract the permanent link and the installed patch lead from the channel budget.',
    ],
  }
})
bank.choices(ids[2], '4.3', 'ipv4-network', 10, (i) => {
  const prefix = 25 + (i % 5),
    size = 2 ** (32 - prefix),
    start = size * (i % Math.floor(256 / size)),
    octet = start + size - 2
  return {
    prompt: [
      `Care este ultimul octet al adresei de rețea pentru 192.168.${i + 20}.${octet}/${prefix}?`,
      `What is the last octet of the network address for 192.168.${i + 20}.${octet}/${prefix}?`,
    ],
    options: numberOptions(start, octet, start + 1, start + size - 1),
    explanation: [
      `Într-un /${prefix}, blocul are ${size} adrese. Începutul blocului este ${start}.`,
      `A /${prefix} block has ${size} addresses. This block starts at ${start}.`,
    ],
  }
})
bank.choices(ids[2], '4.3', 'ipv4-broadcast', 10, (i) => {
  const prefix = 25 + (i % 5),
    size = 2 ** (32 - prefix),
    start = size * ((i + 1) % Math.floor(256 / size)),
    last = start + size - 1
  return {
    prompt: [
      `Pentru rețeaua 10.8.${i + 11}.${start}/${prefix}, care este ultimul octet al adresei de broadcast?`,
      `For network 10.8.${i + 11}.${start}/${prefix}, what is the last octet of its broadcast address?`,
    ],
    options: numberOptions(last, start, last - 1, start + 1),
    explanation: [
      'Broadcast are toți biții de gazdă la 1: începutul blocului plus dimensiunea minus 1.',
      'The broadcast address has all host bits set: block start plus block size minus one.',
    ],
  }
})
bank.choices(ids[2], '4.3', 'dhcp-pool', 10, (i) => {
  const start = 20 + i * 2,
    end = 99 + i,
    reserved = i + 3
  return {
    prompt: [
      `Într-un /24, pool-ul DHCP include octeții ${start}–${end}. Sunt rezervate ${reserved} dintre acele adrese. Câte adrese rămân în pool pentru clienți fără rezervare?`,
      `On a /24, the DHCP pool spans last octets ${start}–${end}. ${reserved} of those addresses are reserved. How many are left for clients without reservations?`,
    ],
    options: numberOptions(
      end - start + 1 - reserved,
      end - start - reserved,
      end - start + 1,
      254 - reserved,
    ),
    explanation: [
      'Intervalul include ambele capete. Scade rezervările din total.',
      'Both endpoints are included. Subtract reservations from the inclusive total.',
    ],
  }
})
bank.choices(ids[4], '5.5', 'loss-rate', 10, (i) => {
  const n = 100 * (1 + (i % 4)),
    dropped = (i + 2) * (1 + (i % 4))
  return {
    prompt: [
      `Un test de rețea trimite ${n} pachete, iar ${n - dropped} primesc răspuns. Care este procentul fără răspuns?`,
      `A network test sends ${n} packets and ${n - dropped} receive replies. What percentage received no reply?`,
    ],
    options: numberOptions(
      (100 * dropped) / n,
      (100 * (n - dropped)) / n,
      dropped,
      100 / n,
    ),
    explanation: [
      'Calculează pachetele fără răspuns, împarte la totalul trimis și înmulțește cu 100.',
      'Divide the number with no reply by the number sent, then multiply by 100.',
    ],
  }
})
bank.choices(ids[4], '5.2', 'fibre-budget', 10, (i) => {
  const tx = 2 + i,
    minimum = -16 + i,
    loss = 3 + i
  return {
    prompt: [
      `Un modul optic transmite la ${tx} dBm, iar receptorul cere cel puțin ${minimum} dBm. Legătura introduce ${loss} dB pierdere. Ce marjă în dB mai rămâne?`,
      `An optical module transmits at ${tx} dBm and the receiver requires at least ${minimum} dBm. The link loses ${loss} dB. How much margin in dB remains?`,
    ],
    options: numberOptions(tx - loss - minimum, tx - minimum, tx + loss - minimum, loss),
    explanation: [
      'Puterea primită este puterea transmisă minus pierderea. Scade apoi pragul receptorului.',
      'Subtract link loss from transmit power, then subtract the receiver threshold.',
    ],
  }
})
addCases(
  bank,
  ids[0],
  '1.1',
  'network-measures',
  13,
  'Măsurarea rețelei|Network measurements',
  [
    'Variația întârzierii între pachetele audio|Variation in delay between audio packets > Jitter',
    'Cantitatea de date utile livrate aplicației pe secundă|Useful application data delivered per second > Goodput',
    'Timpul necesar ca un pachet să ajungă la destinație și răspunsul să revină|Time for a packet to reach the destination and its reply to return > RTT',
    'Proporția de pachete care nu ajung|Share of packets that never arrive > Pierdere de pachete|Packet loss',
    'Rata maximă nominală a legăturii|Nominal maximum rate of the link > Capacitate nominală|Nominal capacity',
  ],
)
addCases(bank, ids[0], '1.2', 'virtual-net', 13, 'Rețele virtuale|Virtual networking', [
  'Rulează mașinile virtuale direct peste hardware|Run virtual machines directly on the hardware > Hipervizor tip 1|Type 1 hypervisor',
  'Rulează mașinile virtuale ca aplicație pe un sistem gazdă|Run virtual machines as an app on a host OS > Hipervizor tip 2|Type 2 hypervisor',
  'Leagă mai multe adaptoare virtuale în același segment|Connect several virtual NICs in the same segment > Switch virtual|Virtual switch',
  'Interfața de rețea văzută de sistemul invitat|The guest operating system’s network interface > vNIC',
  'Furnizorul oferă procesare virtuală, stocare și rețea, iar clientul administrează sistemul invitat|Provider supplies virtual compute, storage and networking while the customer manages the guest OS > IaaS',
])
addCases(bank, ids[0], '2.3', 'wireless-plan', 13, 'Planificare Wi-Fi|Wi-Fi planning', [
  'Compară nivelul semnalului și canalele în fiecare sală|Compare signal strength and channels in each room > Sondaj Wi-Fi|Wi-Fi site survey',
  'Configurează autentificarea per utilizator cu infrastructură de întreprindere|Configure enterprise per-user authentication > WPA3-Enterprise',
  'Izolează vizitatorii de dispozitivele interne printr-o rețea dedicată|Isolate visitors from internal devices using a separate network > Rețea pentru oaspeți|Guest network',
  'Numele rețelei afișate de client|Network name displayed by the client > SSID',
  'Un utilizator se deplasează între puncte de acces ale aceleiași rețele|A user moves between access points on the same network > Roaming',
])
addCases(
  bank,
  ids[0],
  '2.4',
  'short-wireless',
  8,
  'Alegerea legăturii fără fir|Choose a wireless link',
  [
    'Validează plata apropiind telefonul de terminal|Make a payment by tapping a phone on a terminal > NFC',
    'Identifică etichete de inventar cu un cititor UHF|Identify inventory labels with a UHF reader > UHF RFID',
    'Leagă căști de telefon pentru ascultare|Connect headphones to a phone for audio > Bluetooth',
    'Conectează puncte de acces pentru laptopuri|Connect laptops to access points > Wi-Fi',
    'Construiește o rețea mesh Zigbee pentru senzori compatibili 802.15.4|Build a Zigbee mesh for compatible 802.15.4 sensors > Zigbee',
  ],
)
addCases(
  bank,
  ids[1],
  '3.1',
  'switch-hardware',
  13,
  'Hardware de comutare|Switch hardware',
  [
    'Alimentează un telefon IP prin cablul Ethernet|Power an IP phone over Ethernet cable > PoE',
    'Schimbă transceiverul pentru o legătură optică compatibilă|Replace a transceiver for a compatible optical link > Modul SFP|SFP module',
    'Legătura transmite și recepționează simultan|A link transmits and receives simultaneously > Full duplex',
    'Viteza legăturii se negociază între capete|The endpoints agree on link speed > Autonegociere|Autonegotiation',
    'Un administrator copiază traficul pentru analiză într-un port separat|An administrator copies traffic to a separate port for analysis > Oglindire de port|Port mirroring',
  ],
)
addCases(
  bank,
  ids[1],
  '3.2',
  'switching',
  13,
  'Tabele MAC și legături VLAN|MAC tables and VLAN links',
  [
    'Leagă două switch-uri și transportă mai multe VLAN-uri etichetate|Link two switches while carrying multiple tagged VLANs > Trunk 802.1Q',
    'Conectează o stație finală la un singur VLAN neetichetat|Connect an endpoint to one untagged VLAN > Port de acces|Access port',
    'Oprește buclele de nivel 2 cu legături redundante|Prevent layer-2 loops with redundant links > STP',
    'Asociază adresa MAC observată cu portul de intrare|Associate an observed source MAC address with an ingress port > Învățarea MAC|MAC learning',
    'Verifică cadrul complet înainte de redirecționare|Check the entire frame before forwarding > Store-and-forward',
  ],
)
addCases(bank, ids[2], '4.6', 'dns-records', 13, 'Date DNS|DNS records', [
  'Nume gazdă asociat unei adrese IPv4|Host name mapped to an IPv4 address > A',
  'Nume gazdă asociat unei adrese IPv6|Host name mapped to an IPv6 address > AAAA',
  'Adresă IP asociată unui nume prin rezoluție inversă|IP address mapped to a name through reverse lookup > PTR',
  'Un domeniu indică un server de poștă|A domain points to a mail server > MX',
  'Un nume indică serverul DNS autorizat pentru zonă|A name identifies an authoritative DNS server for the zone > NS',
])
addCases(
  bank,
  ids[2],
  '4.7',
  'lan-services',
  13,
  'Servicii ale rețelei locale|Local network services',
  [
    'Dispozitivele primesc automat configurația IP|Devices automatically receive IP configuration > DHCP',
    'Clientul identifică destinația Ethernet pe baza IPv4 local|Client finds an Ethernet destination based on local IPv4 > ARP',
    'Mai multe gazde folosesc o adresă publică prin traducerea porturilor|Several hosts share a public address using port translation > PAT',
    'Ceasurile dispozitivelor sunt sincronizate|Device clocks are synchronised > NTP',
    'Clienții rezolvă numele înainte de conectare|Clients resolve names before connecting > DNS',
  ],
)
addCases(
  bank,
  ids[3],
  '2.1',
  'segmentation',
  13,
  'Separarea rețelelor|Network segmentation',
  [
    'Separă traficul studenților de personal pe același switch administrabil|Separate students from staff on one managed switch > VLAN',
    'Izolează serverul web public de stațiile interne|Isolate the public web server from internal workstations > DMZ',
    'Aplică reguli pentru traficul dintre zone|Apply policy to traffic between zones > Firewall',
    'Leagă două sedii prin internet cu un tunel protejat|Connect two sites over the internet with a protected tunnel > VPN site-to-site',
    'Acordă acces administrativ la un singur server intermediar monitorizat|Allow administrative access through one monitored intermediate host > Bastion de administrare|Administrative jump host',
  ],
)
addCases(
  bank,
  ids[3],
  '4.8',
  'auth-services',
  13,
  'Servicii de infrastructură|Infrastructure services',
  [
    'Interoghează un director prin canal TLS implicit|Query a directory over implicit TLS > LDAPS',
    'Dă acces centralizat la Wi-Fi enterprise prin AAA|Provide central AAA for enterprise Wi-Fi > RADIUS',
    'Separă acțiunile administrative pe echipamente folosind AAA și autorizare per comandă|Separate network-device admin actions using AAA and command authorisation > TACACS+',
    'Partajează un folder de pe server în rețeaua Windows|Share a folder from a server on a Windows network > SMB',
    'Sincronizează ora pentru marcarea corectă a evenimentelor|Synchronise time for correctly timestamped events > NTP',
  ],
)
addCases(
  bank,
  ids[4],
  '5.2',
  'test-tools',
  13,
  'Instrumente fizice|Physical diagnostic tools',
  [
    'Verifică dacă perechile unui cablu Ethernet sunt conectate la pinii corecți|Check whether Ethernet wire pairs connect to the correct pins > Tester de cablu|Cable tester',
    'Localizează la distanță o reflexie sau o întrerupere pe fibră|Locate a reflection or break at a distance along fibre > OTDR',
    'Semnalizează vizual o îndoitură pe o fibră scurtă deconectată|Visually locate a bend on a short disconnected fibre > VFL',
    'Identifică traseul unei perechi de cupru într-un mănunchi|Trace a copper pair through a bundle > Generator de ton și sondă|Tone generator and probe',
    'Compară canalele radio și nivelul rețelelor învecinate|Compare radio channels and nearby network signal strength > Analizor Wi-Fi|Wi-Fi analyser',
  ],
)
addCases(
  bank,
  ids[4],
  '5.3',
  'windows-net',
  13,
  'Verificări Windows|Windows network checks',
  [
    'Afișează configurația completă inclusiv serverele DNS|Show full configuration including DNS servers > ipconfig /all',
    'Verifică numele rezolvat de un server DNS|Check a name resolved by a DNS server > nslookup example.test',
    'Testează accesul TCP la portul 443 al unei gazde aprobate|Test TCP reachability on port 443 for an approved host > Test-NetConnection example.test -Port 443',
    'Afișează ruta către o gazdă prin salturi succesive|Display the route to a host hop by hop > tracert example.test',
    'Afișează asocierile ARP memorate|Show cached ARP associations > arp -a',
  ],
)
export const networkDrills = bank.questions
