import { bilingual } from '@/lib/translations'
import { objectivesByCourse } from './objectives'
import type { MatchingQuestion } from './questions'

type Label = readonly [ro: string, en: string]
type Match = readonly [target: Label, answer: Label]
type Exercise = readonly [
  objective: string,
  module: string,
  matches: readonly [Match, Match, Match],
  explanation: Label,
]

const same = (value: string): Label => [value, value]

const python: Exercise[] = [
  [
    '1.1',
    '01-tipuri-date-operatori',
    [
      [same('42'), same('int')],
      [same('42.0'), same('float')],
      [same('"42"'), same('str')],
    ],
    [
      'Ghilimelele indică text, iar punctul zecimal din literal indică float.',
      'Quotes indicate text, and a decimal point in the literal indicates a float.',
    ],
  ],
  [
    '1.2',
    '01-tipuri-date-operatori',
    [
      [same('items[-1]'), ['Ultimul element', 'Last item']],
      [
        same('items[1:3]'),
        ['Elementele de la indicii 1 și 2', 'Items at indices 1 and 2'],
      ],
      [
        same('items[::-1]'),
        ['O listă nouă, în ordine inversă', 'A new list in reverse order'],
      ],
    ],
    [
      'Indicii negativi pornesc de la sfârșit. Indicele final al unei felii este exclus.',
      'Negative indices count from the end. A slice excludes its stop index.',
    ],
  ],
  [
    '1.3',
    '01-tipuri-date-operatori',
    [
      [same('2 + 3 * 4'), same('14')],
      [same('(2 + 3) * 4'), same('20')],
      [same('2 ** 3 ** 2'), same('512')],
    ],
    [
      'Parantezele au prioritate, înmulțirea precedă adunarea, iar puterile se grupează de la dreapta.',
      'Parentheses take precedence, multiplication comes before addition, and exponentiation groups from the right.',
    ],
  ],
  [
    '1.4',
    '01-tipuri-date-operatori',
    [
      [
        ['Restul împărțirii lui n la 5', 'Remainder when n is divided by 5'],
        same('n % 5'),
      ],
      [
        ['Câtul întreg rotunjit în jos', 'Quotient rounded down to an integer'],
        same('n // 5'),
      ],
      [
        ['Verifică dacă n este diferit de 5', 'Check whether n differs from 5'],
        same('n != 5'),
      ],
    ],
    [
      'Operatorii % și // dau rezultate numerice. != compară valorile și întoarce un bool.',
      '% and // give numeric results. != compares two values and returns a bool.',
    ],
  ],
  [
    '2.1',
    '02-control-flux',
    [
      [['Trebuie îndeplinite ambele condiții', 'Both conditions must hold'], same('and')],
      [
        ['E suficientă cel puțin o condiție', 'At least one condition must hold'],
        same('or'),
      ],
      [
        [
          'Inversează valoarea logică a condiției',
          'Negate the truth value of the condition',
        ],
        same('not'),
      ],
    ],
    [
      'and cere ambele condiții, or permite și cazul în care ambele sunt adevărate, iar not inversează rezultatul logic.',
      'and requires both conditions, or also accepts both being true, and not negates the truth value.',
    ],
  ],
  [
    '2.2',
    '02-control-flux',
    [
      [
        [
          'Oprește bucla curentă când ai găsit valoarea',
          'Exit the current loop when you find the value',
        ],
        same('break'),
      ],
      [
        [
          'Sari peste restul iterației pentru un element gol',
          'Skip the rest of the iteration for an empty item',
        ],
        same('continue'),
      ],
      [
        [
          'Lasă intenționat un bloc fără operații',
          'Intentionally leave a block with no operation',
        ],
        same('pass'),
      ],
    ],
    [
      'break iese din bucla cea mai apropiată. continue trece la următoarea iterație, iar pass nu execută nimic.',
      'break exits the innermost loop. continue starts the next iteration, and pass does nothing.',
    ],
  ],
  [
    '5.1',
    '05-depanare-erori',
    [
      [same('if x > 0 print(x)'), same('SyntaxError')],
      [same('10 / 0'), same('ZeroDivisionError')],
      [
        [
          'Calculezi media cu suma × numărul de valori',
          'Calculate a mean using sum × count',
        ],
        ['Eroare logică', 'Logic error'],
      ],
    ],
    [
      'Sintaxa se verifică înainte de execuție. Împărțirea la zero eșuează la rulare. Formula greșită poate rula cu rezultat incorect.',
      'Syntax is checked before execution. Division by zero fails at runtime. The wrong formula can run and produce an incorrect result.',
    ],
  ],
  [
    '5.2',
    '05-depanare-erori',
    [
      [
        [
          'Convertește textul în număr și tratează formatul invalid',
          'Convert text to a number and handle invalid input',
        ],
        same('except ValueError:'),
      ],
      [
        [
          'Rulează doar când blocul try se încheie fără excepție',
          'Run only when try completes without an exception',
        ],
        same('else:'),
      ],
      [
        [
          'Închide resursa indiferent dacă apare o excepție',
          'Close a resource even if an exception occurs',
        ],
        same('finally:'),
      ],
    ],
    [
      'except tratează tipul indicat. else urmează succesului blocului try. finally se execută la ieșire, inclusiv când se propagă o excepție.',
      'except handles the specified type. else follows a successful try block. finally runs on exit, including when an exception propagates.',
    ],
  ],
]

const databases: Exercise[] = [
  [
    '1.1',
    '01-proiectare',
    [
      [
        ['Lista tuturor înscrierilor', 'The collection of all enrolments'],
        ['Tabel', 'Table'],
      ],
      [
        ['Înscrierea Anei la cursul SQL', 'Ana’s enrolment in the SQL course'],
        ['Rând', 'Row'],
      ],
      [
        ['Data înscrierii pentru fiecare rând', 'The enrolment date for each row'],
        ['Coloană', 'Column'],
      ],
    ],
    [
      'Tabelul grupează înregistrările. Un rând reprezintă o înscriere; o coloană descrie un atribut.',
      'A table groups records. Each row represents an enrolment, and a column describes an attribute.',
    ],
  ],
  [
    '1.2',
    '01-proiectare',
    [
      [
        [
          'Un identificator generat pentru fiecare comandă',
          'One generated identifier per order',
        ],
        same('PRIMARY KEY (order_id)'),
      ],
      [
        [
          'O singură înscriere pentru fiecare pereche elev–curs',
          'One enrolment per student-course pair',
        ],
        same('PRIMARY KEY (student_id, course_id)'),
      ],
      [
        [
          'Cod alternativ obligatoriu și unic pentru produs',
          'A required unique alternate product code',
        ],
        same('UNIQUE (sku) + NOT NULL'),
      ],
    ],
    [
      'Cheia primară poate avea una sau mai multe coloane. O cheie alternativă nenulă și unică poate identifica și ea un rând.',
      'A primary key can contain one or more columns. A unique, non-null alternate key can also identify a row.',
    ],
  ],
  [
    '1.3',
    '01-proiectare',
    [
      [
        [
          'Sumă în lei cu exact două zecimale',
          'Amount in lei with exactly two decimal places',
        ],
        same('DECIMAL(10, 2)'),
      ],
      [
        ['Cod poștal care poate începe cu zero', 'Postal code that may start with zero'],
        same('VARCHAR(12)'),
      ],
      [
        ['Ziua unei programări, fără oră', 'Appointment day without a time'],
        same('DATE'),
      ],
    ],
    [
      'DECIMAL păstrează precizia fixă; textul păstrează zerourile inițiale, iar DATE stochează data calendaristică.',
      'DECIMAL provides fixed precision, text preserves leading zeroes, and DATE stores a calendar date.',
    ],
  ],
  [
    '1.4',
    '01-proiectare',
    [
      [
        [
          'Un client are mai multe comenzi, fiecare cu un singur client',
          'A customer has many orders, each with one customer',
        ],
        ['Relație unu-la-mai-multe', 'One-to-many relationship'],
      ],
      [
        [
          'Un elev urmează mai multe cursuri și fiecare curs are mai mulți elevi',
          'A student can take many courses and each course has many students',
        ],
        ['Tabel de legătură', 'Junction table'],
      ],
      [
        [
          'O comandă nu poate indica un client inexistent',
          'An order cannot reference a missing customer',
        ],
        same('FOREIGN KEY'),
      ],
    ],
    [
      'Cheia externă impune integritatea referențială. Tabelul de legătură reprezintă relația mai-multe-la-mai-multe.',
      'A foreign key enforces referential integrity. A junction table represents a many-to-many relationship.',
    ],
  ],
  [
    '1.5',
    '01-proiectare',
    [
      [
        [
          'O celulă conține o listă de telefoane',
          'One cell contains a list of phone numbers',
        ],
        same('1NF'),
      ],
      [
        [
          'Numele elevului depinde numai de student_id din cheia compusă',
          'The student name depends only on student_id from the composite key',
        ],
        same('2NF'),
      ],
      [
        [
          'Numele departamentului depinde de department_id, atribut non-cheie',
          'Department name depends on the non-key attribute department_id',
        ],
        same('3NF'),
      ],
    ],
    [
      '1NF cere valori atomice. 2NF elimină dependențele parțiale, iar 3NF tratează dependențele tranzitive dintre atributele non-cheie.',
      '1NF requires atomic values. 2NF removes partial dependencies, and 3NF addresses transitive dependencies involving non-key attributes.',
    ],
  ],
  [
    '2.1',
    '02-obiecte',
    [
      [
        ['Creează structura pentru comenzi noi', 'Define a new orders table'],
        same('CREATE TABLE'),
      ],
      [
        ['Adaugă o coloană la tabelul existent', 'Add a column to an existing table'],
        same('ALTER TABLE'),
      ],
      [
        ['Șterge tabelul și datele lui', 'Remove the table and its data'],
        same('DROP TABLE'),
      ],
    ],
    [
      'Aceste comenzi modifică schema. DROP TABLE elimină obiectul, nu doar rândurile.',
      'These statements change the schema. DROP TABLE removes the object as well as its rows.',
    ],
  ],
  [
    '2.2',
    '02-obiecte',
    [
      [
        ['Salvează o interogare sub numele v_open', 'Save a query under the name v_open'],
        same('CREATE VIEW v_open AS SELECT …'),
      ],
      [
        [
          'Citește rândurile expuse prin vederea v_open',
          'Read rows exposed by the v_open view',
        ],
        same('SELECT * FROM v_open'),
      ],
      [
        ['Elimină definiția vederii', 'Remove the view definition'],
        same('DROP VIEW v_open'),
      ],
    ],
    [
      'O vedere obișnuită expune rezultatul unei interogări. Eliminarea vederii nu elimină tabelul de bază.',
      'An ordinary view exposes a query result. Dropping it does not drop the underlying table.',
    ],
  ],
  [
    '2.4',
    '02-obiecte',
    [
      [
        [
          'Structura în care nivelul frunză conține rândurile tabelului',
          'Structure whose leaf level contains the table rows',
        ],
        ['Index clustered (SQL Server)', 'Clustered index (SQL Server)'],
      ],
      [
        [
          'Structură separată cu chei și referințe către rânduri',
          'Separate structure with keys and row locators',
        ],
        ['Index nonclustered (SQL Server)', 'Nonclustered index (SQL Server)'],
      ],
      [
        [
          'Efect frecvent la fiecare inserare într-un tabel cu multe indexuri',
          'Common effect of each insert into a heavily indexed table',
        ],
        [
          'Cost suplimentar pentru actualizarea indexurilor',
          'Extra cost to maintain indexes',
        ],
      ],
    ],
    [
      'Organizarea indexurilor depinde de motor. În SQL Server, un tabel poate avea un singur index clustered și mai multe indexuri nonclustered.',
      'Index storage depends on the database engine. In SQL Server, a table can have one clustered index and multiple nonclustered indexes.',
    ],
  ],
  [
    '3.3',
    '03-interogare',
    [
      [
        [
          'Exclude rândurile cu preț negativ înainte de agregare',
          'Exclude negative-price rows before aggregation',
        ],
        same('WHERE price >= 0'),
      ],
      [
        [
          'Agregă separat comenzile fiecărui client',
          'Aggregate orders separately for each customer',
        ],
        same('GROUP BY customer_id'),
      ],
      [
        [
          'Păstrează numai clienții cu cel puțin trei comenzi',
          'Keep only customer groups with at least three orders',
        ],
        same('HAVING COUNT(*) >= 3'),
      ],
    ],
    [
      'WHERE filtrează rânduri, GROUP BY formează grupuri, iar HAVING filtrează grupuri agregate.',
      'WHERE filters rows, GROUP BY forms groups, and HAVING filters aggregate groups.',
    ],
  ],
  [
    '4.1',
    '04-manipulare',
    [
      [
        [
          'Adaugă o categorie cu valoare introdusă manual',
          'Add a category with a manually supplied value',
        ],
        same('INSERT INTO categories (name) VALUES (…)'),
      ],
      [
        ['Copiază numele dintr-un tabel de import', 'Copy names from a staging table'],
        same('INSERT INTO categories (name) SELECT name FROM staging'),
      ],
      [
        ['Cere un nume pentru fiecare rând nou', 'Require a name on every inserted row'],
        same('name NOT NULL'),
      ],
    ],
    [
      'VALUES folosește valori explicite; INSERT … SELECT preia rânduri din altă interogare. O constrângere NOT NULL respinge valorile nule.',
      'VALUES takes explicit values; INSERT … SELECT uses rows from a query. NOT NULL rejects null values.',
    ],
  ],
  [
    '4.2',
    '04-manipulare',
    [
      [
        ['Alege tabelul de modificat', 'Choose the table to modify'],
        same('UPDATE products'),
      ],
      [
        ['Crește prețul existent cu 10%', 'Increase the existing price by 10%'],
        same('SET price = price * 1.10'),
      ],
      [
        ['Limitează operația la produsul 7', 'Limit the operation to product 7'],
        same('WHERE product_id = 7'),
      ],
    ],
    [
      'UPDATE alege tabelul, SET calculează valorile noi, iar WHERE limitează rândurile vizate.',
      'UPDATE selects the table, SET computes new values, and WHERE limits the affected rows.',
    ],
  ],
  [
    '4.3',
    '04-manipulare',
    [
      [
        ['Previzualizează rândurile arhivate', 'Preview archived rows'],
        same("SELECT * FROM logs WHERE status = 'archived'"),
      ],
      [
        ['Șterge doar rândurile arhivate', 'Delete archived rows only'],
        same("DELETE FROM logs WHERE status = 'archived'"),
      ],
      [
        [
          'Șterge toate rândurile, păstrând tabelul',
          'Delete all rows and keep the table',
        ],
        same('DELETE FROM logs'),
      ],
    ],
    [
      'Verifică filtrul cu SELECT înainte de DELETE. Fără WHERE, DELETE vizează toate rândurile.',
      'Check the filter with SELECT before running DELETE. Without WHERE, DELETE targets every row.',
    ],
  ],
  [
    '5.1',
    '05-depanare',
    [
      [
        [
          'CREATE TABLE raportează că numele există',
          'CREATE TABLE reports the name already exists',
        ],
        [
          'Inspectează obiectul existent și schema',
          'Inspect the existing object and schema',
        ],
      ],
      [
        [
          'DROP TABLE este refuzat din cauza unei referințe externe',
          'DROP TABLE is rejected due to a foreign key reference',
        ],
        [
          'Verifică dependențele înainte de a schimba schema',
          'Check dependencies before changing the schema',
        ],
      ],
      [
        [
          'ALTER TABLE este refuzat pentru utilizator',
          'ALTER TABLE is denied for the user',
        ],
        [
          'Verifică permisiunea de modificare a tabelului',
          'Check permission to alter the table',
        ],
      ],
    ],
    [
      'Aceeași comandă poate eșua din motive diferite: nume ocupat, dependențe sau permisiuni insuficiente.',
      'The same operation can fail for different reasons: a name conflict, dependencies, or insufficient permissions.',
    ],
  ],
  [
    '5.2',
    '05-depanare',
    [
      [
        [
          'Coloana id apare în ambele tabele ale unui JOIN',
          'The id column appears in both joined tables',
        ],
        [
          'Califică numele cu aliasul tabelului',
          'Qualify the column name with the table alias',
        ],
      ],
      [
        [
          'Comparația cu = NULL nu găsește rânduri',
          'A comparison using = NULL finds no rows',
        ],
        same('IS NULL'),
      ],
      [
        [
          'Apar perechi din toate rândurile a două tabele',
          'Every row in one table is paired with every row in the other',
        ],
        ['Verifică dacă lipsește condiția JOIN', 'Check for a missing join condition'],
      ],
    ],
    [
      'Aliasurile elimină ambiguitatea, IS NULL testează lipsa valorii, iar condiția de îmbinare împiedică un produs cartezian nedorit.',
      'Aliases resolve ambiguity, IS NULL tests missing values, and a join condition avoids an unintended Cartesian product.',
    ],
  ],
  [
    '5.3',
    '05-depanare',
    [
      [
        [
          'INSERT repetă o cheie primară existentă',
          'INSERT repeats an existing primary key',
        ],
        ['Încalcă unicitatea', 'Uniqueness violation'],
      ],
      [
        [
          'INSERT referă un client care lipsește',
          'INSERT references a customer that does not exist',
        ],
        ['Încalcă cheia externă', 'Foreign key violation'],
      ],
      [
        [
          'UPDATE pune NULL într-o coloană obligatorie',
          'UPDATE assigns NULL to a required column',
        ],
        ['Încalcă NOT NULL', 'NOT NULL violation'],
      ],
    ],
    [
      'Identificarea constrângerii care a respins operația indică ce date trebuie corectate.',
      'Identifying the constraint that rejected the operation shows which data must be corrected.',
    ],
  ],
]

const html: Exercise[] = [
  [
    '1.1',
    '01-ciclu-viata',
    [
      [
        [
          'Definește nevoile utilizatorilor și criteriile de acceptare',
          'Define user needs and acceptance criteria',
        ],
        ['Planificare', 'Planning'],
      ],
      [
        [
          'Confirmă că formularul funcționează pe ecrane diferite',
          'Confirm that the form works on different screens',
        ],
        ['Testare', 'Testing'],
      ],
      [
        [
          'Pune versiunea aprobată la dispoziția utilizatorilor',
          'Make the approved release available to users',
        ],
        ['Publicare', 'Deployment'],
      ],
    ],
    [
      'Criteriile ghidează dezvoltarea; testarea verifică îndeplinirea lor, iar publicarea livrează versiunea aprobată.',
      'Criteria guide development, testing verifies them, and deployment delivers the approved release.',
    ],
  ],
  [
    '1.2',
    '01-ciclu-viata',
    [
      [
        [
          'Verifică marcajul HTML pentru elemente nepermise',
          'Check HTML markup for invalid elements',
        ],
        ['Validator HTML', 'HTML validator'],
      ],
      [
        [
          'Oprește execuția înainte de o linie JavaScript',
          'Pause execution before a JavaScript line',
        ],
        ['Punct de întrerupere', 'Breakpoint'],
      ],
      [
        [
          'Citește mesajul și stiva unei excepții',
          'Read an exception message and stack trace',
        ],
        ['Consola browserului', 'Browser console'],
      ],
    ],
    [
      'Validatorul analizează marcajul, depanatorul oprește codul, iar consola afișează erorile de execuție.',
      'A validator checks markup, a debugger pauses code, and the console displays runtime errors.',
    ],
  ],
  [
    '3.2',
    '02-interfata-html5',
    [
      [['Câmpul nu poate fi gol', 'Field must not be empty'], same('required')],
      [
        [
          'Codul trebuie să aibă exact trei cifre ASCII',
          'Code must contain exactly three ASCII digits',
        ],
        same('pattern="[0-9]{3}"'),
      ],
      [
        [
          'Valoarea trebuie să aibă forma unei adrese de e-mail',
          'Value must look like an email address',
        ],
        same('type="email"'),
      ],
    ],
    [
      'Atributele activează validarea browserului. Un server care primește formularul trebuie să valideze și el datele.',
      'These attributes enable browser validation. A server that receives the form must validate the data too.',
    ],
  ],
  [
    '4.1',
    '03-formatare-css',
    [
      [
        [
          'Păstrează spațiul în flux, dar deplasează elementul vizual',
          'Keep the original space in flow while shifting the element visually',
        ],
        same('position: relative'),
      ],
      [
        [
          'Poziționează elementul față de strămoșul poziționat',
          'Place an element relative to its positioned ancestor',
        ],
        same('position: absolute'),
      ],
      [
        [
          'Adaugă derulare doar când conținutul depășește spațiul',
          'Show scrolling when content exceeds the available space',
        ],
        same('overflow: auto'),
      ],
    ],
    [
      'Poziționarea relativă păstrează locul în flux. Cea absolută scoate elementul din flux. overflow controlează conținutul excedentar.',
      'Relative positioning preserves flow space. Absolute positioning removes the element from normal flow. overflow controls excess content.',
    ],
  ],
  [
    '4.2',
    '03-formatare-css',
    [
      [
        [
          'Folosește lățimea reală a ecranului pentru viewport',
          'Use the device width as the viewport width',
        ],
        same('width=device-width'),
      ],
      [
        [
          'Aplică reguli când viewportul are cel puțin 768 px',
          'Apply rules when the viewport is at least 768 px wide',
        ],
        same('@media (min-width: 768px)'),
      ],
      [
        [
          'Oferă decupaje diferite ale aceleiași imagini',
          'Offer different crops of the same image',
        ],
        same('<picture>'),
      ],
    ],
    [
      'Viewportul stabilește scara inițială, media queries schimbă stiluri, iar picture permite surse adaptate.',
      'The viewport sets the initial scale, media queries change styles, and picture allows responsive sources.',
    ],
  ],
  [
    '4.3',
    '03-formatare-css',
    [
      [
        [
          'Într-un rând flex, centrează elementele pe orizontală',
          'Center items horizontally in a flex row',
        ],
        same('justify-content: center'),
      ],
      [
        [
          'Într-un rând flex, centrează elementele pe verticală',
          'Center items vertically in a flex row',
        ],
        same('align-items: center'),
      ],
      [
        [
          'Trimite elementele pe rânduri noi când nu încap',
          'Move items to new lines when space runs out',
        ],
        same('flex-wrap: wrap'),
      ],
    ],
    [
      'În flex-direction: row, justify-content controlează axa principală, iar align-items axa transversală.',
      'With flex-direction: row, justify-content controls the main axis and align-items controls the cross axis.',
    ],
  ],
  [
    '4.4',
    '03-formatare-css',
    [
      [
        ['Creează trei coloane egale', 'Create three equal columns'],
        same('grid-template-columns: repeat(3, minmax(0, 1fr))'),
      ],
      [
        ['Lasă 16 px între celulele grilei', 'Leave 16 px between grid cells'],
        same('gap: 16px'),
      ],
      [
        ['Întinde o celulă pe două coloane', 'Make an item span two columns'],
        same('grid-column: span 2'),
      ],
    ],
    [
      'Șablonul definește coloanele, gap stabilește spațiul, iar grid-column controlează plasarea unui element.',
      'The template defines the columns, gap sets the spacing, and grid-column controls item placement.',
    ],
  ],
  [
    '5.2',
    '04-javascript',
    [
      [
        [
          'Transformă textul JSON primit într-un obiect',
          'Turn received JSON text into an object',
        ],
        same('JSON.parse(text)'),
      ],
      [
        ['Transformă obiectul în text JSON', 'Turn an object into JSON text'],
        same('JSON.stringify(data)'),
      ],
      [['Cere o resursă prin HTTP', 'Request a resource over HTTP'], same('fetch(url)')],
    ],
    [
      'fetch inițiază transferul; parse și stringify convertesc între reprezentarea textuală JSON și valorile JavaScript.',
      'fetch starts the transfer; parse and stringify convert between JSON text and JavaScript values.',
    ],
  ],
  [
    '5.5',
    '04-javascript',
    [
      [
        [
          'Păstrează tema după închiderea și redeschiderea browserului',
          'Save the theme across browser restarts',
        ],
        same('localStorage'),
      ],
      [
        [
          'Păstrează un pas de formular după reîncărcare, în aceeași filă',
          'Keep a form step on reload in the same tab',
        ],
        same('sessionStorage'),
      ],
      [
        [
          'Păstrează o stare care poate dispărea la reîncărcare',
          'Keep state that may disappear on reload',
        ],
        ['Variabilă în memorie', 'In-memory variable'],
      ],
    ],
    [
      'localStorage persistă de regulă între sesiuni. sessionStorage este legat de contextul filei, iar memoria se pierde la reîncărcare.',
      'localStorage usually persists across sessions. sessionStorage belongs to the tab context, and memory resets on reload.',
    ],
  ],
]

const networking: Exercise[] = [
  [
    '1.3',
    '01-infrastructura',
    [
      [
        [
          'Un cablu central conectează dispozitivele printr-un switch',
          'Devices connect through one central switch',
        ],
        ['Stea', 'Star'],
      ],
      [
        [
          'Fiecare nod are legătură directă cu toate celelalte',
          'Each node links directly to all other nodes',
        ],
        ['Mesh complet', 'Full mesh'],
      ],
      [
        [
          'Wi-Fi încearcă să evite coliziunile înainte de transmisie',
          'Wi-Fi tries to avoid collisions before transmitting',
        ],
        ['CSMA/CA', 'CSMA/CA'],
      ],
    ],
    [
      'Topologia descrie legăturile. CSMA/CA descrie accesul la mediul radio.',
      'Topology describes links. CSMA/CA describes access to the radio medium.',
    ],
  ],
  [
    '1.4',
    '01-infrastructura',
    [
      [
        [
          'Angajatul accesează rețeaua firmei de acasă printr-un tunel',
          'An employee accesses the company network from home through a tunnel',
        ],
        ['VPN', 'VPN'],
      ],
      [
        [
          'Administratorul deschide o sesiune interactivă pe alt PC',
          'An administrator opens an interactive session on another PC',
        ],
        ['Remote Desktop', 'Remote Desktop'],
      ],
      [
        [
          'Tehnicianul asistă un utilizator în sesiunea sa existentă',
          'A technician helps a user in their existing session',
        ],
        ['Remote Assistance', 'Remote Assistance'],
      ],
    ],
    [
      'VPN oferă conectivitate, Remote Desktop deschide o sesiune la distanță, iar asistența partajează sesiunea utilizatorului.',
      'A VPN provides connectivity, Remote Desktop opens a remote session, and assistance shares the user’s session.',
    ],
  ],
  [
    '2.1',
    '01-infrastructura',
    [
      [
        [
          'Separă laboratoarele pe același switch administrabil',
          'Separate classrooms on the same managed switch',
        ],
        ['VLAN', 'VLAN'],
      ],
      [
        [
          'Izolează serverele publice între internet și rețeaua internă',
          'Isolate public-facing servers between the internet and the internal network',
        ],
        ['DMZ', 'DMZ'],
      ],
      [
        [
          'Conectează stațiile și imprimantele dintr-un birou',
          'Connect workstations and printers in an office',
        ],
        ['LAN', 'LAN'],
      ],
    ],
    [
      'VLAN separă domenii de broadcast logic, DMZ izolează servicii expuse, iar LAN descrie o rețea locală.',
      'A VLAN separates logical broadcast domains, a DMZ isolates exposed services, and a LAN is a local network.',
    ],
  ],
  [
    '2.2',
    '01-infrastructura',
    [
      [
        [
          'Conexiune mobilă de rezervă prin rețeaua operatorului',
          'Mobile backup through the carrier network',
        ],
        ['LTE', 'LTE'],
      ],
      [
        ['Fibra ajunge până în locuință', 'Fibre reaches the home'],
        ['FTTH', 'FTTH'],
      ],
      [
        [
          'Acces fix fără fir bazat pe IEEE 802.16',
          'Fixed wireless access based on IEEE 802.16',
        ],
        ['WiMAX', 'WiMAX'],
      ],
    ],
    [
      'Alegerea WAN depinde de acoperire, mediu și amplasare. Litera H din FTTH indică locuința.',
      'WAN selection depends on coverage, medium, and location. The H in FTTH stands for home.',
    ],
  ],
  [
    '2.3',
    '01-infrastructura',
    [
      [
        ['Standard desemnat Wi‑Fi 6', 'Standard designated Wi-Fi 6'],
        ['802.11ax', '802.11ax'],
      ],
      [
        ['Autentificare personală bazată pe SAE', 'Personal authentication based on SAE'],
        ['WPA3-Personal', 'WPA3-Personal'],
      ],
      [
        [
          'Plan clasic cu trei canale de 20 MHz separate în banda de 2,4 GHz',
          'Conventional plan with three separate 20 MHz channels on 2.4 GHz',
        ],
        ['1 / 6 / 11', '1 / 6 / 11'],
      ],
    ],
    [
      'Generația, metoda de securitate și canalul sunt setări distincte. Canalele disponibile depind de regiune.',
      'Generation, security method, and channel are distinct settings. Available channels depend on the region.',
    ],
  ],
  [
    '3.3',
    '02-hardware',
    [
      [
        [
          'Routerele își actualizează rutele după căderea unei legături',
          'Routers update routes after a link goes down',
        ],
        ['Convergență', 'Convergence'],
      ],
      [
        [
          'Traficul de voce primește prioritate când legătura este aglomerată',
          'Voice traffic receives priority when the link is congested',
        ],
        ['QoS', 'QoS'],
      ],
      [
        [
          'Un pachet de broadcast Ethernet rămâne în VLAN-ul său',
          'An Ethernet broadcast stays within its VLAN',
        ],
        ['Domeniu de broadcast', 'Broadcast domain'],
      ],
    ],
    [
      'Convergența descrie stabilizarea rutelor, QoS tratează prioritățile, iar un VLAN delimitează broadcastul Ethernet.',
      'Convergence is route stabilisation, QoS handles priorities, and a VLAN bounds Ethernet broadcasts.',
    ],
  ],
  [
    '3.4',
    '02-hardware',
    [
      [
        [
          'Legătură de 85 m într-un birou pentru 1000BASE-T',
          '85 m office link for 1000BASE-T',
        ],
        ['Cablu UTP Cat 5e', 'Cat 5e UTP cable'],
      ],
      [
        [
          'Legătură între clădiri expusă interferențelor electrice',
          'Inter-building link exposed to electrical interference',
        ],
        ['Fibră optică', 'Optical fibre'],
      ],
      [
        [
          'Semnal mai slab la capătul unei legături lungi',
          'Weaker signal at the far end of a long link',
        ],
        ['Atenuare', 'Attenuation'],
      ],
    ],
    [
      'Cuprul Cat 5e poate transporta 1000BASE-T în limita canalului de 100 m. Fibra nu conduce curent și nu captează interferențe electromagnetice.',
      'Cat 5e supports 1000BASE-T within the 100 m channel limit. Fibre does not conduct electricity and is immune to electromagnetic interference.',
    ],
  ],
  [
    '4.1',
    '03-protocoale-servicii',
    [
      [
        [
          'Un switch examinează adresa MAC de destinație',
          'A switch examines the destination MAC address',
        ],
        ['Cadru, nivelul 2', 'Frame, layer 2'],
      ],
      [
        [
          'Un router examinează destinația IP',
          'A router examines the destination IP address',
        ],
        ['Pachet, nivelul 3', 'Packet, layer 3'],
      ],
      [
        ['TCP adaugă numere de secvență', 'TCP adds sequence numbers'],
        ['Segment, nivelul 4', 'Segment, layer 4'],
      ],
    ],
    [
      'Încapsularea adaugă informații specifice fiecărui nivel: segment TCP, pachet IP, apoi cadru Ethernet.',
      'Encapsulation adds layer-specific information: TCP segment, IP packet, then Ethernet frame.',
    ],
  ],
  [
    '4.2',
    '03-protocoale-servicii',
    [
      [
        ['Mesaj HTTP între client și server', 'HTTP message between client and server'],
        ['Aplicație', 'Application'],
      ],
      [
        [
          'Segmentul TCP cu porturi sursă și destinație',
          'TCP segment with source and destination ports',
        ],
        ['Transport', 'Transport'],
      ],
      [
        ['Datagrama IP transmisă între rețele', 'IP datagram forwarded between networks'],
        ['Internet', 'Internet'],
      ],
    ],
    [
      'În modelul TCP/IP, datele aplicației sunt încapsulate mai întâi de transport, apoi de nivelul internet și de legătura locală.',
      'In TCP/IP, application data is encapsulated by transport, then the internet layer and the local link.',
    ],
  ],
  [
    '4.4',
    '03-protocoale-servicii',
    [
      [
        ['Prefix rezervat adreselor IPv6 link-local', 'IPv6 link-local prefix'],
        ['fe80::/10', 'fe80::/10'],
      ],
      [
        [
          'Gazda folosește un prefix anunțat de router pentru a-și configura adresa',
          'A host uses a router-advertised prefix to configure its address',
        ],
        ['SLAAC', 'SLAAC'],
      ],
      [
        [
          'Un server atribuie adrese IPv6 și menține starea lor',
          'A server assigns IPv6 addresses and tracks leases',
        ],
        ['DHCPv6 cu stare', 'Stateful DHCPv6'],
      ],
    ],
    [
      'Adresele link-local rămân pe legătura locală. SLAAC folosește anunțuri de router, iar DHCPv6 cu stare atribuie adrese prin server.',
      'Link-local addresses stay on the local link. SLAAC uses router advertisements, while stateful DHCPv6 assigns addresses via a server.',
    ],
  ],
  [
    '4.5',
    '03-protocoale-servicii',
    [
      [
        [
          'Conexiune web HTTPS clasică peste TCP',
          'Conventional HTTPS web connection over TCP',
        ],
        ['443/TCP', '443/TCP'],
      ],
      [
        ['Transfer de mesaje între servere SMTP', 'Mail relay between SMTP servers'],
        ['25/TCP', '25/TCP'],
      ],
      [
        ['Sincronizarea ceasului prin NTP', 'Clock synchronisation via NTP'],
        ['123/UDP', '123/UDP'],
      ],
    ],
    [
      'Acestea sunt porturi implicite cunoscute. Un administrator poate configura servicii pe alte porturi.',
      'These are well-known defaults. Administrators can configure services on other ports.',
    ],
  ],
  [
    '4.6',
    '03-protocoale-servicii',
    [
      [
        ['Nume asociat unei adrese IPv6', 'Name associated with an IPv6 address'],
        ['AAAA', 'AAAA'],
      ],
      [
        [
          'Server care primește poșta unui domeniu',
          'Server that receives mail for a domain',
        ],
        ['MX', 'MX'],
      ],
      [
        ['Alias care indică alt nume DNS', 'Alias that points to another DNS name'],
        ['CNAME', 'CNAME'],
      ],
    ],
    [
      'DNS folosește tipuri de înregistrări diferite pentru adrese, schimbul de poștă și aliasuri.',
      'DNS uses different record types for addresses, mail exchange, and aliases.',
    ],
  ],
  [
    '4.7',
    '03-protocoale-servicii',
    [
      [
        [
          'Atribuie adresa IP și gateway-ul unui client IPv4',
          'Lease an IPv4 client address and gateway',
        ],
        ['DHCP', 'DHCP'],
      ],
      [
        [
          'Află adresa MAC pentru o adresă IPv4 locală',
          'Find the MAC address for a local IPv4 address',
        ],
        ['ARP', 'ARP'],
      ],
      [
        [
          'Traduce adrese între rețeaua privată și cea publică',
          'Translate addresses between private and public networks',
        ],
        ['NAT', 'NAT'],
      ],
    ],
    [
      'DHCP configurează clientul, ARP rezolvă adrese pe legătura locală, iar NAT modifică informația de adresare a pachetelor.',
      'DHCP configures a client, ARP resolves local link addresses, and NAT changes packet addressing.',
    ],
  ],
  [
    '4.8',
    '03-protocoale-servicii',
    [
      [
        [
          'Acces la directoare centralizate prin LDAP peste TLS implicit',
          'Central directory access using LDAP over implicit TLS',
        ],
        ['LDAPS', 'LDAPS'],
      ],
      [
        [
          'Autentificare centralizată pentru Wi‑Fi de întreprindere',
          'Central authentication for enterprise Wi-Fi',
        ],
        ['RADIUS', 'RADIUS'],
      ],
      [
        ['Partajare de fișiere Windows în rețea', 'Windows network file sharing'],
        ['SMB', 'SMB'],
      ],
    ],
    [
      'Directorul, autentificarea accesului și partajarea fișierelor au roluri de protocol distincte.',
      'Directory access, network access authentication, and file sharing are different protocol roles.',
    ],
  ],
  [
    '5.3',
    '05-depanare',
    [
      [
        [
          'Afișează IPv4, gateway și DNS pe Windows',
          'Show IPv4, gateway, and DNS on Windows',
        ],
        ['ipconfig /all', 'ipconfig /all'],
      ],
      [
        ['Interoghează DNS pentru un nume', 'Query DNS for a name'],
        ['nslookup', 'nslookup'],
      ],
      [
        [
          'Arată succesiunea de salturi către o destinație',
          'Show hops toward a destination',
        ],
        ['tracert', 'tracert'],
      ],
    ],
    [
      'Verifică mai întâi configurarea IP, apoi rezoluția numelui și traseul, în funcție de simptom.',
      'Check IP configuration, then name resolution or the route, depending on the symptom.',
    ],
  ],
  [
    '5.4',
    '05-depanare',
    [
      [
        ['Afișează adresele interfețelor Linux', 'Show addresses on Linux interfaces'],
        ['ip addr', 'ip addr'],
      ],
      [
        ['Afișează ruta implicită Linux', 'Show the default Linux route'],
        ['ip route', 'ip route'],
      ],
      [
        [
          'Listează socketurile TCP care ascultă fără rezoluție de nume',
          'List listening TCP sockets without name resolution',
        ],
        ['ss -ltn', 'ss -ltn'],
      ],
    ],
    [
      'ip addr arată adresele, ip route arată rutele, iar ss arată socketurile, nu conectivitatea de la un client îndepărtat.',
      'ip addr shows addresses, ip route shows routes, and ss shows sockets rather than remote reachability.',
    ],
  ],
]

const devices: Exercise[] = [
  [
    '1.1',
    '01-configurare',
    [
      [
        [
          'Păstrează temporar datele programelor active',
          'Temporarily stores active program data',
        ],
        ['RAM', 'RAM'],
      ],
      [
        ['Execută instrucțiuni generale', 'Executes general instructions'],
        ['CPU', 'CPU'],
      ],
      [
        [
          'Păstrează fișierele după oprire, fără părți mobile',
          'Keeps files after power-off with no moving parts',
        ],
        ['SSD', 'SSD'],
      ],
    ],
    [
      'RAM este volatilă, procesorul execută instrucțiuni, iar SSD-ul păstrează datele.',
      'RAM is volatile, the processor executes instructions, and an SSD retains data.',
    ],
  ],
  [
    '1.3',
    '01-configurare',
    [
      [
        [
          'Păstrează aplicațiile compatibile și datele în timpul actualizării sistemului',
          'Keep compatible apps and data during a system upgrade',
        ],
        ['Upgrade in-place', 'Upgrade in-place'],
      ],
      [
        [
          'Instalează Windows pornind de pe mediu, pe o partiție pregătită pentru instalare nouă',
          'Install Windows from boot media onto a partition prepared for a fresh install',
        ],
        ['Instalare curată', 'Clean install'],
      ],
      [
        [
          'Folosește o identitate specifică acelui PC, fără cont online',
          'Use an identity specific to that PC without an online account',
        ],
        ['Cont local', 'Local account'],
      ],
    ],
    [
      'O actualizare in-place păstrează de regulă aplicațiile. O instalare curată pornește de la o copie proaspătă; contul local aparține dispozitivului.',
      'An in-place upgrade generally keeps apps. A clean install starts from a fresh copy, and a local account belongs to the device.',
    ],
  ],
  [
    '1.4',
    '01-configurare',
    [
      [
        [
          'Poate instala software pentru toți utilizatorii după elevare',
          'Can install software for all users after elevation',
        ],
        ['Administrator', 'Administrator'],
      ],
      [
        [
          'Lucrează fără permisiuni administrative implicite',
          'Works without administrator permissions by default',
        ],
        ['Utilizator standard', 'Standard user'],
      ],
      [
        [
          'Stochează preferințele și fișierele personale ale unui utilizator',
          'Stores a user’s personal files and preferences',
        ],
        ['Profil de utilizator', 'User profile'],
      ],
    ],
    [
      'Rolul stabilește permisiunile. Profilul păstrează date și setări specifice utilizatorului.',
      'A role controls permissions. A profile stores user-specific data and preferences.',
    ],
  ],
  [
    '1.5',
    '01-configurare',
    [
      [
        [
          'Textul este prea mic pe un ecran cu rezoluție mare',
          'Text is too small on a high-resolution screen',
        ],
        ['Scalare afișaj', 'Display scaling'],
      ],
      [
        [
          'Ceasul afișează ora unei alte regiuni',
          'The clock shows the time for another region',
        ],
        ['Fus orar', 'Time zone'],
      ],
      [
        [
          'Laptopul trebuie să intre în repaus mai repede pe baterie',
          'Laptop should sleep sooner on battery power',
        ],
        ['Setări de alimentare', 'Power settings'],
      ],
    ],
    [
      'Ajustează setarea care controlează simptomul: dimensiunea, ora locală sau timpul până la repaus.',
      'Adjust the setting that controls the symptom: size, local time, or time before sleep.',
    ],
  ],
  [
    '1.7',
    '01-configurare',
    [
      [
        [
          'Află ce actualizare a precedat defecțiunea',
          'Find which installed update preceded a fault',
        ],
        ['Istoric actualizări', 'Update history'],
      ],
      [
        [
          'Remediază o problemă de compatibilitate a adaptorului video',
          'Resolve a graphics adapter compatibility issue',
        ],
        ['Driver de dispozitiv', 'Device driver'],
      ],
      [
        [
          'Instalează o corecție pentru o vulnerabilitate cunoscută',
          'Install a fix for a known vulnerability',
        ],
        ['Actualizare de securitate', 'Security update'],
      ],
    ],
    [
      'Istoricul ajută diagnosticul. Driverul gestionează hardware-ul, iar actualizarea de securitate corectează vulnerabilități.',
      'History aids diagnosis. A driver manages hardware, and a security update addresses vulnerabilities.',
    ],
  ],
  [
    '2.1',
    '01-configurare',
    [
      [
        [
          'Instalează o aplicație distribuită prin catalogul Microsoft',
          'Install an app distributed through the Microsoft catalogue',
        ],
        ['Microsoft Store', 'Microsoft Store'],
      ],
      [
        [
          'Activează o componentă Windows disponibilă dar dezactivată',
          'Enable a Windows component that is available but turned off',
        ],
        ['Caracteristici Windows', 'Windows features'],
      ],
      [
        [
          'Deschide o sesiune grafică pe un calculator Windows configurat pentru acces la distanță',
          'Open a graphical session on a Windows computer configured for remote access',
        ],
        ['Remote Desktop', 'Remote Desktop'],
      ],
    ],
    [
      'Aplicațiile, componentele opționale și accesul la distanță se gestionează separat.',
      'Apps, optional components, and remote access are managed separately.',
    ],
  ],
  [
    '2.3',
    '01-configurare',
    [
      [
        [
          'Setare de registru specifică utilizatorului conectat',
          'Registry setting specific to the signed-in user',
        ],
        ['HKEY_CURRENT_USER', 'HKEY_CURRENT_USER'],
      ],
      [
        ['Setare de registru la nivelul dispozitivului', 'Device-wide Registry setting'],
        ['HKEY_LOCAL_MACHINE', 'HKEY_LOCAL_MACHINE'],
      ],
      [
        [
          'Păstrează o copie a cheii înainte de modificare',
          'Save a copy of the key before editing',
        ],
        ['Export în Registry Editor', 'Export in Registry Editor'],
      ],
    ],
    [
      'Ramura HKCU se aplică utilizatorului curent, HKLM dispozitivului. Exportul păstrează valorile cheii selectate.',
      'HKCU applies to the current user, and HKLM to the machine. Export saves the selected key’s values.',
    ],
  ],
  [
    '3.1',
    '02-acces-date',
    [
      [
        [
          'Tabel de partiții potrivit pentru un disc de 4 TB cu sectoare logice de 512 B',
          'Partition table for a 4 TB disk with 512-byte logical sectors',
        ],
        ['GPT', 'GPT'],
      ],
      [
        [
          'Sistem de fișiere Windows cu permisiuni pe fișiere',
          'Windows file system with per-file permissions',
        ],
        ['NTFS', 'NTFS'],
      ],
      [
        [
          'Serviciu Microsoft pentru sincronizarea documentelor între dispozitive',
          'Microsoft service for syncing documents across devices',
        ],
        ['OneDrive', 'OneDrive'],
      ],
    ],
    [
      'GPT descrie partițiile, NTFS organizează fișierele, iar OneDrive sincronizează datele în cloud.',
      'GPT describes partitions, NTFS organises files, and OneDrive syncs data through the cloud.',
    ],
  ],
  [
    '3.2',
    '02-acces-date',
    [
      [
        [
          'Accesează un folder partajat prin litera Z:',
          'Access a shared folder using drive letter Z:',
        ],
        ['Unitate de rețea mapată', 'Mapped network drive'],
      ],
      [
        [
          'Află ce permisiuni NTFS are efectiv un utilizator',
          'Determine a user’s actual NTFS rights',
        ],
        ['Acces efectiv', 'Effective Access'],
      ],
      [
        [
          'Schimbă cine poate administra controlul accesului asupra fișierului ca proprietar',
          'Change who controls access to a file as its owner',
        ],
        ['Schimbă proprietarul', 'Change ownership'],
      ],
    ],
    [
      'Pentru accesul prin rețea se aplică atât permisiunile de partajare, cât și cele NTFS. Maparea oferă doar o cale convenabilă.',
      'Network access is subject to both share and NTFS permissions. Mapping provides a convenient path.',
    ],
  ],
  [
    '3.3',
    '02-acces-date',
    [
      [
        [
          'Recuperează o versiune mai veche a unui document personal',
          'Recover a past version of a personal document',
        ],
        ['Istoric fișiere', 'File History'],
      ],
      [
        [
          'Recuperează sistemul și partițiile după defectarea discului',
          'Recover the system and partitions after disk failure',
        ],
        ['Imagine de sistem', 'System image'],
      ],
      [
        [
          'Menține aceleași documente de lucru pe laptop și desktop',
          'Keep the same working documents on a laptop and desktop',
        ],
        ['Sincronizare cloud', 'Cloud sync'],
      ],
    ],
    [
      'Istoricul păstrează versiuni, imaginea poate restaura sistemul, iar sincronizarea propagă modificările între dispozitive.',
      'History retains versions, an image can restore the system, and sync propagates changes across devices.',
    ],
  ],
  [
    '4.1',
    '03-securitate',
    [
      [
        ['Rețea Wi-Fi necunoscută într-o gară', 'Unfamiliar Wi-Fi at a railway station'],
        ['Profil public', 'Public profile'],
      ],
      [
        [
          'Permite conexiuni inițiate din exterior către o aplicație aprobată',
          'Allow connections initiated from outside to an approved app',
        ],
        ['Regulă de intrare', 'Inbound rule'],
      ],
      [
        [
          'Restricționează conexiunile inițiate de o aplicație locală',
          'Restrict connections initiated by a local app',
        ],
        ['Regulă de ieșire', 'Outbound rule'],
      ],
    ],
    [
      'Profilurile aplică reguli după contextul rețelei. Direcția depinde de cine inițiază conexiunea.',
      'Profiles apply rules by network context. Direction depends on which side initiates the connection.',
    ],
  ],
  [
    '4.3',
    '03-securitate',
    [
      [
        [
          'Un mesaj fals cere parola contului',
          'A fraudulent message requests the account password',
        ],
        ['Phishing', 'Phishing'],
      ],
      [
        [
          'Fișierele sunt criptate și apare o cerere de plată',
          'Files are encrypted and a payment demand appears',
        ],
        ['Ransomware', 'Ransomware'],
      ],
      [
        [
          'O persoană intră urmând un angajat prin ușa controlată',
          'A person enters by following an employee through a controlled door',
        ],
        ['Tailgating', 'Tailgating'],
      ],
    ],
    [
      'Amenințările pot viza datele, încrederea utilizatorului sau accesul fizic.',
      'Threats can target data, user trust, or physical access.',
    ],
  ],
  [
    '4.4',
    '03-securitate',
    [
      [
        [
          'Stație suspectată de infectare activă',
          'Workstation suspected of an active infection',
        ],
        ['Izolează stația și anunță echipa IT', 'Isolate the workstation and notify IT'],
      ],
      [
        [
          'Mesaj suspect cu link de autentificare',
          'Suspicious message containing a login link',
        ],
        [
          'Raportează mesajul fără a deschide linkul',
          'Report the message without opening the link',
        ],
      ],
      [
        [
          'Parolă introdusă pe un site de phishing',
          'Password entered on a phishing site',
        ],
        [
          'Schimbă parola de pe un dispozitiv sigur și raportează incidentul',
          'Change the password from a trusted device and report the incident',
        ],
      ],
    ],
    [
      'Acțiunea inițială depinde de ce a fost afectat: dispozitivul, un mesaj sau un cont.',
      'The first action depends on what is affected: a device, a message, or an account.',
    ],
  ],
  [
    '4.5',
    '03-securitate',
    [
      [
        [
          'Administratorul pornește o acțiune care cere privilegii ridicate',
          'An administrator starts an action that needs elevated privileges',
        ],
        ['Confirmare UAC', 'UAC consent'],
      ],
      [
        [
          'Utilizatorul standard lansează o acțiune administrativă',
          'A standard user starts an administrative action',
        ],
        ['Solicitare acreditări de administrator', 'Administrator credential prompt'],
      ],
      [
        [
          'Desktopul obișnuit se estompează pe durata solicitării',
          'The normal desktop dims during the prompt',
        ],
        ['Secure desktop', 'Secure desktop'],
      ],
    ],
    [
      'În configurația implicită, UAC cere acordul administratorului sau acreditări pentru utilizatorul standard. Politica poate schimba comportamentul.',
      'Under default settings, UAC requests admin consent or credentials for a standard user. Policy can change the behaviour.',
    ],
  ],
  [
    '5.2',
    '04-depanare',
    [
      [
        [
          'O aplicație încetinește autentificarea deoarece pornește automat',
          'An app delays sign-in because it starts automatically',
        ],
        ['Task Manager: Startup apps', 'Task Manager: Startup apps'],
      ],
      [
        [
          'Un serviciu Windows necesar s-a oprit',
          'A required Windows service has stopped',
        ],
        ['Services', 'Services'],
      ],
      [
        [
          'O aplicație compatibilă din Store oferă opțiune de reparare',
          'A supported Store app offers a repair option',
        ],
        [
          'Settings: Apps → Advanced options → Repair',
          'Settings: Apps → Advanced options → Repair',
        ],
      ],
    ],
    [
      'Verifică aplicațiile de pornire, serviciile sau opțiunile aplicației în funcție de simptom.',
      'Check startup apps, services, or app settings depending on the symptom.',
    ],
  ],
  [
    '5.3',
    '04-depanare',
    [
      [
        [
          'Un adaptor apare cu un semn de avertizare',
          'An adapter displays a warning icon',
        ],
        ['Device Manager', 'Device Manager'],
      ],
      [
        [
          'Un disc funcționează, dar volumul nu are literă',
          'A disk works, but its volume has no drive letter',
        ],
        ['Disk Management', 'Disk Management'],
      ],
      [
        [
          'Sistemul pierde date și suspectezi erori RAM',
          'Data corruption suggests possible RAM errors',
        ],
        ['Windows Memory Diagnostic', 'Windows Memory Diagnostic'],
      ],
    ],
    [
      'Alege instrumentul pentru driver, volum sau memorie. Semnul din Device Manager permite citirea codului de eroare.',
      'Choose the tool for the driver, volume, or memory. Device Manager exposes the device error code.',
    ],
  ],
  [
    '5.4',
    '04-depanare',
    [
      [
        [
          'Verifică dacă stația a primit gateway și server DNS',
          'Check whether the device obtained a gateway and DNS server',
        ],
        ['ipconfig /all', 'ipconfig /all'],
      ],
      [
        [
          'Verifică răspunsul DNS pentru numele unui controler de domeniu',
          'Check DNS resolution for a domain controller name',
        ],
        ['nslookup dc01.example.test', 'nslookup dc01.example.test'],
      ],
      [
        [
          'Afișează serverul de logon din sesiunea Command Prompt curentă',
          'Show the logon server in the current Command Prompt session',
        ],
        ['echo %LOGONSERVER%', 'echo %LOGONSERVER%'],
      ],
    ],
    [
      'Configurarea IP, rezoluția DNS și serverul de logon oferă indicii diferite la depanarea conectării în domeniu.',
      'IP configuration, DNS resolution, and the logon server provide different clues when troubleshooting domain access.',
    ],
  ],
]

const ngModules: Record<string, string> = {
  '1.1': '01-fundamentals',
  '1.2': '03-collections',
  '1.3': '01-fundamentals',
  '1.4': '01-fundamentals',
  '2.1': '02-flow',
  '2.2': '02-flow',
  '5.1': '06-errors',
  '5.2': '06-errors',
}

const exercises: Record<string, Exercise[]> = {
  python,
  'python-next-generation': python.map(([id, , matches, explanation]) => [
    id,
    ngModules[id],
    matches,
    explanation,
  ]),
  'baze-de-date': databases,
  retelistica: networking,
  html5: html,
  'configurare-dispozitive': devices,
}

export const objectiveMatching: Record<string, MatchingQuestion[]> = Object.fromEntries(
  Object.entries(exercises).map(([course, rows]) => [
    course,
    rows.map(([objective, module, matches, explanation]): MatchingQuestion => {
      const topic = objectivesByCourse[course].find((o) => o.id === objective)!
      return {
        id: course + '-' + module.slice(0, 2) + '-match-' + objective.replace('.', '-'),
        module,
        conceptId: course + '-match-' + objective,
        objectiveIds: [objective],
        mappingStatus: 'reviewed',
        type: 'matching',
        difficulty: 'medium',
        text: bilingual(
          'Potrivește fiecare element cu răspunsul său. Tema: ' + topic.titleRo,
          'Match each item to its answer. Topic: ' + topic.titleEn,
        ),
        pairs: matches.map(([target, answer]) => ({
          target: bilingual(...target),
          answer: bilingual(...answer),
        })),
        explanation: bilingual(...explanation),
      }
    }),
  ]),
)
