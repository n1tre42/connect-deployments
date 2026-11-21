import { drillBuilder, numberOptions, type Bilingual } from './drill-builder'
import { addCases } from './scenario-drills'

const bank = drillBuilder('baze-de-date')
const queryPrompt = [
  'Ce valoare returnează interogarea după executarea scriptului?',
  'What value does the query return after running the script?',
] as const
function query(
  module: string,
  objective: string,
  family: string,
  count: number,
  explanation: Bilingual,
  sql: (n: number) => [string, number, number[]],
) {
  bank.choices(module, objective, family, count, (i) => {
    const [code, expected, wrong] = sql(i + 3)
    return {
      prompt: queryPrompt,
      code,
      options: numberOptions(expected, ...wrong),
      explanation,
    }
  })
}
query(
  '03-interogare',
  '3.3',
  'group-total',
  9,
  [
    'HAVING păstrează echipa cu două rânduri. SUM adună sumele acelei echipe.',
    'HAVING keeps the team with two rows. SUM adds the amounts for that team.',
  ],
  (n) => [
    `CREATE TABLE Sales (team VARCHAR(8), amount INTEGER);\nINSERT INTO Sales VALUES ('A', ${n}), ('A', ${n + 2}), ('B', ${n * 3});\nSELECT SUM(amount) FROM Sales GROUP BY team HAVING COUNT(*) > 1;`,
    2 * n + 2,
    [3 * n, 5 * n + 2, n + 2],
  ],
)
query(
  '03-interogare',
  '3.2',
  'null-count',
  8,
  [
    'Filtrul păstrează și valorile NULL. COUNT(points) numără doar valorile nenule, iar COUNT(*) numără toate rândurile filtrate.',
    'The filter keeps NULL values too. COUNT(points) counts only non-null values, and COUNT(*) counts every filtered row.',
  ],
  (n) => {
    const threshold = n + (n % 4) - 1
    const values = [n - 2, n, n + 1, n + 2]
    const all = n % 2 === 0
    const matched = values.filter((v) => v >= threshold).length
    return [
      `CREATE TABLE Scores (points INTEGER);\nINSERT INTO Scores VALUES (NULL), ${values.map((v) => `(${v})`).join(', ')};\nSELECT COUNT(${all ? '*' : 'points'}) FROM Scores WHERE points >= ${threshold} OR points IS NULL;`,
      matched + Number(all),
      [matched + Number(!all), 5, 0],
    ]
  },
)
query(
  '03-interogare',
  '3.1',
  'left-join',
  11,
  [
    'LEFT JOIN păstrează echipele fără membri. Filtrul IS NULL numără doar aceste echipe.',
    'LEFT JOIN keeps teams without members. The IS NULL filter counts only those teams.',
  ],
  (n) => {
    const teams = Array.from({ length: 3 + (n % 4) }, (_, i) => n + i)
    const missed = 1 + (n % 3)
    const assigned = teams.slice(missed)
    const members = [...assigned, ...assigned.slice(0, 2)]
    return [
      `CREATE TABLE Teams (id INTEGER PRIMARY KEY);\nCREATE TABLE Members (team_id INTEGER);\nINSERT INTO Teams VALUES ${teams.map((v) => `(${v})`).join(', ')};\n${members.length ? `INSERT INTO Members VALUES ${members.map((v) => `(${v})`).join(', ')};\n` : ''}SELECT COUNT(*) FROM Teams t\nLEFT JOIN Members m ON m.team_id = t.id\nWHERE m.team_id IS NULL;`,
      missed,
      [teams.length, members.length, 0],
    ]
  },
)
query(
  '04-manipulare',
  '4.2',
  'update-range',
  9,
  [
    'WHERE selectează primele două produse. UPDATE adaugă 4 la fiecare; suma crește cu 8.',
    'WHERE selects the first two products. UPDATE adds 4 to each, so the sum increases by 8.',
  ],
  (n) => [
    `CREATE TABLE Items (id INTEGER PRIMARY KEY, price INTEGER);\nINSERT INTO Items VALUES (1,${n}), (2,${n + 5}), (3,${n + 10});\nUPDATE Items SET price = price + 4 WHERE price <= ${n + 5};\nSELECT SUM(price) FROM Items;`,
    3 * n + 23,
    [3 * n + 15, 3 * n + 19, 3 * n + 27],
  ],
)
query(
  '04-manipulare',
  '4.3',
  'delete-filter',
  9,
  [
    'Se șterge doar rândul care satisface ambele condiții. Rândul de la limită rămâne, deoarece comparația este strictă.',
    'Only the row satisfying both conditions is deleted. The row at the boundary remains because the comparison is strict.',
  ],
  (n) => [
    `CREATE TABLE Logs (points INTEGER, state VARCHAR(12));\nINSERT INTO Logs VALUES (${n},'done'), (${n + 2},'new'), (${n + 4},'done');\nDELETE FROM Logs WHERE state = 'done' AND points < ${n + 4};\nSELECT SUM(points) FROM Logs;`,
    2 * n + 6,
    [3 * n + 6, n + 2, n + 4],
  ],
)
query(
  '02-obiecte',
  '2.2',
  'view-filter',
  8,
  [
    'Vederea expune doar valorile strict pozitive. SUM se aplică celor două rânduri din vedere.',
    'The view exposes only strictly positive values. SUM uses the two rows in the view.',
  ],
  (n) => [
    `CREATE TABLE Stock (units INTEGER);\nINSERT INTO Stock VALUES (0), (${n}), (${n + 2});\nCREATE VIEW InStock AS SELECT units FROM Stock WHERE units > 0;\nSELECT SUM(units) FROM InStock;`,
    2 * n + 2,
    [n, n + 2, 2 * n],
  ],
)

addCases(
  bank,
  '01-proiectare',
  '1.1',
  'schema-choice',
  12,
  'Modelarea tabelelor|Table design',
  [
    'Fiecare client poate avea mai multe adrese|Each customer can have several addresses > Tabel separat de adrese cu cheia clientului|Separate address table with a customer key',
    'Data nașterii unui client|A customer’s date of birth > Coloană DATE în tabelul clienților|DATE column in the customers table',
    'Numele produsului într-o comandă, la momentul vânzării|Product name on an order when it was sold > Valoare istorică în rândul comenzii|Historical snapshot in the order line',
    'Cantitatea vândută pentru un produs dintr-o comandă|Quantity sold for a product on an order > Coloană în tabelul pozițiilor comenzii|Column in the order lines table',
    'Un produs este identificat independent de denumire|A product is identified independently of its name > Cheie primară stabilă pentru produs|Stable product primary key',
  ],
)
addCases(
  bank,
  '01-proiectare',
  '1.5',
  'normal-forms',
  10,
  'Dependențe și forme normale|Dependencies and normal forms',
  [
    'Mai multe adrese de e-mail într-o singură celulă|Several email addresses in a single cell > Încălcare 1NF|1NF violation',
    'Nota depinde de ambele coloane ale cheii elev–curs|Grade depends on both columns of the student-course key > Dependență funcțională completă|Full functional dependency',
    'Numele elevului depinde de o singură parte a cheii compuse|Student name depends on only one part of the composite key > Dependență parțială|Partial dependency',
    'Codul cheie determină codul departamentului, care determină apoi numele departamentului|The key determines department code, which determines department name > Dependență tranzitivă|Transitive dependency',
    'Eliminarea unui singur rând șterge ultima informație despre un furnizor|Removing one row erases the last details about a supplier > Anomalie de ștergere|Deletion anomaly',
  ],
)
addCases(
  bank,
  '01-proiectare',
  '1.3',
  'data-constraints',
  10,
  'Tipuri de date și constrângeri|Data types and constraints',
  [
    'Sold exact cu două zecimale|Exact account balance with two decimal places > DECIMAL(12,2)',
    'Dată calendaristică fără oră|Calendar date without a time > DATE',
    'Număr fix de caractere pentru codul unei țări|Fixed character count for a country code > CHAR(2)',
    'Un cod alternativ nu se poate repeta|An alternate code must not be duplicated > UNIQUE',
    'Stocul trebuie să fie nenegativ|Stock cannot be negative > CHECK (stock >= 0)',
  ],
)
addCases(
  bank,
  '02-obiecte',
  '2.1',
  'ddl',
  8,
  'Operații asupra schemei|Schema operations',
  [
    'Definește un tabel nou|Define a new table > CREATE TABLE',
    'Adaugă un câmp unui tabel existent|Add a field to an existing table > ALTER TABLE',
    'Elimină tabelul cu structura sa|Remove the table and its definition > DROP TABLE',
    'Păstrează o interogare reutilizabilă ca obiect|Save a reusable query as an object > CREATE VIEW',
    'Creează o structură pentru căutarea după cod|Build a lookup structure on a code > CREATE INDEX',
  ],
)
addCases(
  bank,
  '02-obiecte',
  '1.6',
  'access-control',
  8,
  'Permisiuni asupra datelor|Data permissions',
  [
    'Acordă citirea rândurilor|Allow users to read rows > GRANT SELECT',
    'Acordă adăugarea de rânduri|Allow users to add rows > GRANT INSERT',
    'Acordă modificarea valorilor existente|Allow users to change existing values > GRANT UPDATE',
    'Acordă eliminarea de rânduri|Allow users to remove rows > GRANT DELETE',
    'Retrage o permisiune de citire acordată anterior|Remove a previously granted read permission > REVOKE SELECT',
  ],
)
addCases(
  bank,
  '03-interogare',
  '3.2',
  'sort-results',
  10,
  'Ordonare și afișare|Sorting and display',
  [
    'Sortează descrescător după sumă|Sort by amount from largest to smallest > ORDER BY amount DESC',
    'Afișează o singură dată fiecare categorie|Show each category only once > SELECT DISTINCT category',
    'Etichetează coloana rezultată ca total|Label the output column as total > AS total',
    'Sortează alfabetic după nume|Sort names from A to Z > ORDER BY name ASC',
    'Tratează un preț lipsă ca zero în rezultat|Treat a missing price as zero in the output > COALESCE(price, 0)',
  ],
)
addCases(
  bank,
  '05-depanare',
  '5.3',
  'mutation-errors',
  12,
  'Diagnostic SQL|SQL diagnostics',
  [
    'Noul rând reutilizează identificatorul unui rând existent|The new row reuses an existing row identifier > Cheie primară duplicată|Duplicate primary key',
    'Comanda indică un client care nu există|An order points to a customer that does not exist > Cheie externă invalidă|Invalid foreign key',
    'Coloana obligatorie primește o valoare NULL explicită|A required column is explicitly assigned NULL > Încălcare NOT NULL|NOT NULL violation',
    'Comanda este validă, dar utilizatorul nu poate scrie în tabel|The statement is valid, but the user cannot write to the table > Permisiuni insuficiente|Insufficient permissions',
    'Nota introdusă depășește intervalul impus prin constrângere|The new grade exceeds the range enforced by a constraint > Încălcare CHECK|CHECK violation',
  ],
)
export const databaseDrills = bank.questions
