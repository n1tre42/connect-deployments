import { makeQuestions, output as o, q, type QuestionSpec } from './question-builders'
import type { Question } from './questions'

const catalog: Record<string, Record<string, QuestionSpec[]>> = {
  python: {
    '01-tipuri-date-operatori': [
      o(
        'print(17 // 4, 17 % 4)',
        '4 1',
        ['4.25 1', '4 0', '5 1'],
        [
          '// calculează câtul întreg; % calculează restul.',
          '// calculates the floor quotient; % calculates the remainder.',
        ],
      ),
      o(
        'print("7" + "3")',
        '73',
        ['10', '21', 'TypeError'],
        ['+ concatenează două șiruri.', '+ concatenates two strings.'],
      ),
      o(
        'print(bool([]), bool([0]))',
        'False True',
        ['False False', 'True True', 'True False'],
        [
          'O listă goală este falsă; o listă nevidă este adevărată.',
          'An empty list is falsy; a nonempty list is truthy.',
        ],
      ),
      o(
        'x = [1, 2]\ny = x\ny.append(3)\nprint(len(x))',
        '3',
        ['2', '1', 'TypeError'],
        [
          'x și y referă aceeași listă mutabilă.',
          'x and y refer to the same mutable list.',
        ],
      ),
      o(
        'print(2 ** 3 * 2)',
        '16',
        ['64', '12', '10'],
        [
          'Puterea are prioritate față de înmulțire.',
          'Exponentiation has higher precedence than multiplication.',
        ],
      ),
      q(
        [
          'Ce conversie păstrează valoarea numerică din "12"?',
          'Which conversion preserves the numeric value in "12"?',
        ],
        ['int("12")', 'bool("12")', 'len("12")', 'str(12)'],
        [
          'int transformă șirul numeric într-un întreg.',
          'int converts the numeric string to an integer.',
        ],
      ),
    ],
    '02-control-flux': [
      o(
        'print(list(range(2, 8, 2)))',
        '[2, 4, 6]',
        ['[2, 4, 6, 8]', '[2, 3, 4]', '[8, 6, 4]'],
        [
          'Limita finală a range nu este inclusă.',
          'The stop value of range is excluded.',
        ],
      ),
      o(
        'total = 0\nfor n in range(4):\n    total += n\nprint(total)',
        '6',
        ['10', '4', '3'],
        ['Se adună 0, 1, 2 și 3.', 'The loop adds 0, 1, 2, and 3.'],
      ),
      o(
        'for n in [2, 4, 6]:\n    if n == 4:\n        break\n    print(n)',
        '2',
        ['2\n4', '2\n6', '4'],
        [
          'break încheie bucla înainte de afișarea lui 4.',
          'break exits the loop before printing 4.',
        ],
      ),
      o(
        'print([n for n in range(5) if n % 2])',
        '[1, 3]',
        ['[0, 2, 4]', '[1, 2, 3]', '[0, 1]'],
        [
          'Numerele impare au rest nenul la împărțirea cu 2.',
          'Odd numbers have a nonzero remainder when divided by 2.',
        ],
      ),
      q(
        [
          'Ce instrucțiune sare la următoarea iterație?',
          'Which statement skips to the next iteration?',
        ],
        ['continue', 'break', 'return', 'pass'],
        [
          'continue sare peste restul iterației curente.',
          'continue skips the rest of the current iteration.',
        ],
      ),
      o(
        'x = 3\nwhile x > 0:\n    x -= 1\nprint(x)',
        '0',
        ['-1', '1', '3'],
        [
          'Condiția devine falsă când x ajunge la zero.',
          'The condition becomes false when x reaches zero.',
        ],
      ),
    ],
    '03-intrare-iesire': [
      q(
        ['Ce tip returnează input()?', 'What type does input() return?'],
        ['str', 'int', 'float', 'bool'],
        [
          'input returnează text, chiar dacă utilizatorul introduce cifre.',
          'input returns text even when the user enters digits.',
        ],
      ),
      q(
        [
          'Ce mod adaugă text la finalul unui fișier?',
          'Which mode appends text to a file?',
        ],
        ['a', 'w', 'r', 'x'],
        [
          'Modul a adaugă fără a trunchia conținutul existent.',
          'Mode a appends without truncating existing contents.',
        ],
      ),
      q(
        [
          'Ce avantaj oferă with open(...) as f?',
          'What advantage does with open(...) as f provide?',
        ],
        [
          ['Închide automat fișierul', 'It closes the file automatically'],
          ['Șterge fișierul', 'It deletes the file'],
          ['Elimină erorile', 'It removes errors'],
          ['Criptează textul', 'It encrypts text'],
        ],
        [
          'Context managerul închide fișierul inclusiv la excepții.',
          'The context manager closes the file even if an exception occurs.',
        ],
      ),
      o(
        'print("A", "B", sep="-", end="!")',
        'A-B!',
        ['A B!', 'AB', 'A-B\n!'],
        [
          'sep separă argumentele, end înlocuiește sfârșitul liniei.',
          'sep separates arguments; end replaces the line ending.',
        ],
      ),
      o(
        'price = 7.5\nprint(f"{price:.2f}")',
        '7.50',
        ['7.5', '7', '7.500'],
        ['.2f formatează cu două zecimale.', '.2f formats with two decimal places.'],
      ),
      q(
        [
          'Ce mod poate șterge conținutul existent la deschidere?',
          'Which mode can erase existing content on opening?',
        ],
        ['w', 'a', 'r', 'rb'],
        ['Modul w trunchiază fișierul existent.', 'Mode w truncates an existing file.'],
      ),
    ],
    '04-documentare-structura': [
      q(
        [
          'Unde se scrie docstringul unei funcții?',
          'Where is a function docstring written?',
        ],
        [
          ['Prima instrucțiune din corp', 'As the first statement in the body'],
          ['După return', 'After return'],
          ['În numele funcției', 'In the function name'],
          ['Doar într-un fișier extern', 'Only in an external file'],
        ],
        [
          'Șirul inițial devine atributul __doc__.',
          'The initial string becomes the __doc__ attribute.',
        ],
      ),
      o(
        'def add(a, b=3):\n    return a + b\nprint(add(4))',
        '7',
        ['4', '3', 'TypeError'],
        ['Parametrul implicit b are valoarea 3.', 'The default value of b is 3.'],
      ),
      q(
        [
          'Ce stil recomandă PEP 8 pentru numele funcțiilor?',
          'Which function naming style does PEP 8 recommend?',
        ],
        ['snake_case', 'PascalCase', 'UPPERCASE', 'kebab-case'],
        [
          'Numele funcțiilor folosesc litere mici separate prin underscore.',
          'Function names use lowercase words separated by underscores.',
        ],
      ),
      o(
        'def task():\n    pass\nprint(task())',
        'None',
        ['0', 'False', 'pass'],
        [
          'O funcție fără return explicit returnează None.',
          'A function without an explicit return returns None.',
        ],
      ),
      o(
        'def scale(x, factor=2):\n    return x * factor\nprint(scale(factor=3, x=5))',
        '15',
        ['10', '8', 'TypeError'],
        [
          'Argumentele cu nume se pot da în altă ordine.',
          'Keyword arguments may be supplied in a different order.',
        ],
      ),
      q(
        [
          'Ce caracter începe un comentariu Python?',
          'Which character starts a Python comment?',
        ],
        ['#', '//', '<!--', '/*'],
        [
          '# introduce un comentariu până la finalul liniei.',
          '# starts a comment extending to the end of the line.',
        ],
      ),
    ],
    '05-depanare-erori': [
      q(
        ['Ce excepție produce int("abc")?', 'Which exception does int("abc") raise?'],
        ['ValueError', 'TypeError', 'KeyError', 'IndexError'],
        [
          'Tipul str este acceptat, dar valoarea nu reprezintă un întreg.',
          'str is an accepted type, but the value does not represent an integer.',
        ],
      ),
      q(
        ['Când se execută finally?', 'When does finally execute?'],
        [
          [
            'La ieșirea din try, cu sau fără excepție',
            'When leaving try, with or without an exception',
          ],
          ['Doar la succes', 'Only on success'],
          ['Doar la ValueError', 'Only for ValueError'],
          ['Înainte de try', 'Before try'],
        ],
        [
          'finally este destinat eliberării resurselor.',
          'finally is intended for resource cleanup.',
        ],
      ),
      o(
        'try:\n    print(8 / 0)\nexcept ZeroDivisionError:\n    print("zero")',
        'zero',
        ['0', '8', 'None'],
        [
          'Excepția este prinsă de blocul except specific.',
          'The specific except block handles the exception.',
        ],
      ),
      q(
        ['Ce verifică assert x > 0?', 'What does assert x > 0 check?'],
        [
          [
            'Ridică AssertionError dacă x nu este pozitiv',
            'It raises AssertionError if x is not positive',
          ],
          ['Transformă x în pozitiv', 'It makes x positive'],
          ['Prinde orice eroare', 'It catches every error'],
          ['Oprește toate testele', 'It stops all tests'],
        ],
        [
          'assert testează o condiție; nu înlocuiește validarea intrărilor.',
          'assert checks a condition; it does not replace input validation.',
        ],
      ),
      q(
        [
          'Ce excepție produce accesul la o cheie inexistentă cu d[key]?',
          'Which exception does d[key] raise for a missing key?',
        ],
        ['KeyError', 'IndexError', 'NameError', 'SyntaxError'],
        [
          'Accesarea directă a unei chei inexistente ridică KeyError.',
          'Direct access to a missing dictionary key raises KeyError.',
        ],
      ),
      q(
        ['De ce prindem excepții specifice?', 'Why should we catch specific exceptions?'],
        [
          ['Pentru a nu ascunde erori neașteptate', 'To avoid hiding unexpected errors'],
          ['Pentru viteză garantată', 'To guarantee speed'],
          ['Pentru a evita importurile', 'To avoid imports'],
          ['Pentru a opri finally', 'To stop finally'],
        ],
        [
          'O captură prea generală poate ascunde defecte de programare.',
          'An overly broad handler can hide programming defects.',
        ],
      ),
    ],
    '06-module-instrumente': [
      o(
        'import math\nprint(math.isqrt(20))',
        '4',
        ['4.47', '5', '20'],
        [
          'isqrt calculează partea întreagă a rădăcinii pătrate.',
          'isqrt computes the integer square root.',
        ],
      ),
      o(
        'from collections import Counter\nprint(Counter("banana")["a"])',
        '3',
        ['2', '1', '6'],
        [
          'Counter numără aparițiile fiecărui element.',
          'Counter counts occurrences of each element.',
        ],
      ),
      q(
        ['Ce oferă un mediu virtual?', 'What does a virtual environment provide?'],
        [
          ['Dependențe separate pentru proiect', 'Separate project dependencies'],
          ['Un sistem de operare nou', 'A new operating system'],
          ['Criptare automată', 'Automatic encryption'],
          ['Un compilator C obligatoriu', 'A required C compiler'],
        ],
        [
          'venv izolează pachetele proiectului de alte proiecte.',
          'venv isolates project packages from other projects.',
        ],
      ),
      q(
        [
          'Ce comandă instalează un pachet pentru interpretorul curent?',
          'Which command installs a package for the current interpreter?',
        ],
        [
          'python -m pip install requests',
          'python install requests',
          'import install requests',
          'pip import requests',
        ],
        [
          '-m pip rulează pip cu interpretorul selectat.',
          '-m pip runs pip using the selected interpreter.',
        ],
      ),
      o(
        `import json\nprint(json.loads('{"ok": true}')["ok"])`,
        'True',
        ['true', '"true"', '1.0'],
        ['JSON true devine bool True în Python.', 'JSON true becomes Python bool True.'],
      ),
      q(
        [
          'Ce previne if __name__ == "__main__"?',
          'What does if __name__ == "__main__" prevent?',
        ],
        [
          ['Executarea blocului la import', 'Execution of the block during import'],
          ['Toate importurile', 'All imports'],
          ['Definirea funcțiilor', 'Function definitions'],
          ['Rularea directă', 'Direct execution'],
        ],
        [
          'Blocul rulează doar când fișierul este punctul de intrare.',
          'The block runs only when the file is the entry point.',
        ],
      ),
    ],
  },
  'baze-de-date': {
    '01-proiectare': [
      q(
        ['Ce identifică unic un rând?', 'What uniquely identifies a row?'],
        ['PRIMARY KEY', 'FOREIGN KEY', 'ORDER BY', 'VIEW'],
        [
          'Cheia primară este unică și nu poate fi NULL.',
          'A primary key is unique and cannot be NULL.',
        ],
      ),
      q(
        [
          'Cum modelăm relația mulți-la-mulți?',
          'How do we model a many-to-many relationship?',
        ],
        [
          ['Tabel de legătură cu chei străine', 'A junction table with foreign keys'],
          ['O coloană cu valori separate prin virgulă', 'One comma-separated column'],
          ['Fără chei', 'Without keys'],
          ['Un singur rând', 'One row only'],
        ],
        [
          'Tabelul de legătură transformă relația în două relații unu-la-mulți.',
          'A junction table creates two one-to-many relationships.',
        ],
      ),
      q(
        ['Ce cere prima formă normală?', 'What does first normal form require?'],
        [
          ['Valori atomice în fiecare celulă', 'Atomic values in each cell'],
          ['Toate coloanele numerice', 'All numeric columns'],
          ['Lipsa cheii primare', 'No primary key'],
          ['Doar două coloane', 'Exactly two columns'],
        ],
        [
          'Grupurile repetitive și listele într-o celulă încalcă 1NF.',
          'Repeating groups and lists in one cell violate 1NF.',
        ],
      ),
      q(
        [
          'Ce previne integritatea referențială?',
          'What does referential integrity prevent?',
        ],
        [
          ['Referințe la rânduri inexistente', 'References to nonexistent rows'],
          ['Interogări lente', 'Slow queries'],
          ['Valori duplicate în orice coloană', 'Duplicates in every column'],
          ['Tranzacții', 'Transactions'],
        ],
        [
          'O cheie străină trebuie să indice o cheie validă sau să fie NULL dacă este permis.',
          'A foreign key must reference a valid key or be NULL if allowed.',
        ],
      ),
      q(
        [
          'Ce tip se potrivește unei sume monetare exacte?',
          'Which type suits an exact monetary amount?',
        ],
        ['DECIMAL(10,2)', 'FLOAT', 'BOOLEAN', 'BLOB'],
        [
          'DECIMAL stochează valori zecimale exacte cu precizie fixă.',
          'DECIMAL stores exact decimal values with fixed precision.',
        ],
      ),
      q(
        ['Ce anomalie reduce normalizarea?', 'Which anomaly does normalization reduce?'],
        [
          [
            'Actualizarea aceleiași informații în mai multe locuri',
            'Updating the same fact in multiple places',
          ],
          ['Sortarea rezultatelor', 'Sorting results'],
          ['Autentificarea', 'Authentication'],
          ['Folosirea cheilor', 'Using keys'],
        ],
        [
          'Reducerea redundanței reduce anomaliile de actualizare.',
          'Reducing redundancy reduces update anomalies.',
        ],
      ),
    ],
    '02-obiecte': [
      q(
        ['Ce comandă creează un tabel?', 'Which command creates a table?'],
        ['CREATE TABLE', 'INSERT TABLE', 'SELECT TABLE', 'MAKE ROW'],
        [
          'CREATE TABLE definește structura tabelului.',
          'CREATE TABLE defines the table structure.',
        ],
      ),
      q(
        ['Cum adăugăm o coloană?', 'How do we add a column?'],
        [
          'ALTER TABLE students ADD email VARCHAR(100)',
          'UPDATE students ADD email',
          'SELECT ADD email',
          'INSERT COLUMN email',
        ],
        [
          'ALTER TABLE schimbă structura unui tabel existent.',
          'ALTER TABLE changes an existing table structure.',
        ],
      ),
      q(
        ['Ce reprezintă un VIEW obișnuit?', 'What does a regular VIEW represent?'],
        [
          ['O interogare salvată', 'A saved query'],
          ['O copie fizică obligatorie', 'A mandatory physical copy'],
          ['Un utilizator', 'A user'],
          ['Un backup complet', 'A full backup'],
        ],
        [
          'Un view obișnuit expune rezultatul unei interogări.',
          'A regular view exposes the result of a query.',
        ],
      ),
      q(
        ['Ce compromis introduce un index?', 'What trade-off does an index introduce?'],
        [
          [
            'Citiri mai rapide, cost suplimentar la scriere',
            'Faster reads, extra write cost',
          ],
          ['Zero spațiu ocupat', 'Zero storage use'],
          ['Scrieri mereu mai rapide', 'Always faster writes'],
          ['Elimină toate scanările', 'It eliminates all scans'],
        ],
        [
          'Indexul necesită spațiu și întreținere la modificări.',
          'An index needs storage and maintenance during changes.',
        ],
      ),
      q(
        [
          'Ce restricție cere o valoare obligatorie?',
          'Which constraint requires a value?',
        ],
        ['NOT NULL', 'DEFAULT NULL', 'ORDER BY', 'LEFT JOIN'],
        ['NOT NULL interzice absența valorii.', 'NOT NULL prohibits a missing value.'],
      ),
      q(
        [
          'Ce comandă elimină structura tabelului?',
          'Which command removes the table structure?',
        ],
        ['DROP TABLE', 'DELETE FROM', 'SELECT DISTINCT', 'ROLLBACK'],
        [
          'DROP TABLE elimină obiectul tabel; DELETE elimină rânduri.',
          'DROP TABLE removes the table object; DELETE removes rows.',
        ],
      ),
    ],
    '03-interogare': [
      q(
        ['Cum găsim valori NULL?', 'How do we find NULL values?'],
        [
          'WHERE email IS NULL',
          'WHERE email = NULL',
          'WHERE email == NULL',
          'WHERE NULL(email)',
        ],
        [
          'NULL se testează cu IS NULL, nu cu egalitate.',
          'Test NULL using IS NULL, not equality.',
        ],
      ),
      q(
        [
          'Ce JOIN păstrează toate rândurile din stânga?',
          'Which JOIN keeps all rows from the left?',
        ],
        ['LEFT JOIN', 'INNER JOIN', 'CROSS JOIN', 'RIGHT JOIN'],
        [
          'Rândurile fără corespondent primesc NULL în coloanele din dreapta.',
          'Unmatched rows receive NULL in the right-side columns.',
        ],
      ),
      q(
        ['Ce filtrează grupuri după agregare?', 'What filters groups after aggregation?'],
        ['HAVING', 'WHERE', 'ORDER BY', 'DISTINCT'],
        [
          'HAVING aplică o condiție grupurilor produse de GROUP BY.',
          'HAVING applies a condition to groups produced by GROUP BY.',
        ],
      ),
      q(
        ['Ce numără COUNT(email)?', 'What does COUNT(email) count?'],
        [
          ['Valorile email care nu sunt NULL', 'Non-NULL email values'],
          ['Toate rândurile inclusiv NULL', 'All rows including NULL'],
          ['Doar emailuri unice', 'Only unique emails'],
          ['Doar șiruri goale', 'Only empty strings'],
        ],
        [
          'COUNT(coloană) ignoră NULL; COUNT(*) numără rândurile.',
          'COUNT(column) ignores NULL; COUNT(*) counts rows.',
        ],
      ),
      q(
        ['Cum sortăm notele descrescător?', 'How do we sort grades in descending order?'],
        [
          'ORDER BY grade DESC',
          'GROUP BY grade DESC',
          'WHERE grade DESC',
          'SORT grade UP',
        ],
        ['DESC ordonează de la mare la mic.', 'DESC sorts from highest to lowest.'],
      ),
      q(
        ['Ce face SELECT DISTINCT city?', 'What does SELECT DISTINCT city do?'],
        [
          ['Elimină duplicatele din rezultat', 'Removes duplicates from the result'],
          ['Șterge rânduri', 'Deletes rows'],
          ['Sortează obligatoriu', 'Always sorts'],
          ['Înlocuiește NULL', 'Replaces NULL'],
        ],
        [
          'DISTINCT returnează combinațiile distincte ale coloanelor selectate.',
          'DISTINCT returns distinct combinations of the selected columns.',
        ],
      ),
    ],
    '04-manipulare': [
      q(
        ['Ce comandă adaugă un rând?', 'Which command adds a row?'],
        ['INSERT INTO', 'ALTER TABLE', 'CREATE VIEW', 'DROP INDEX'],
        [
          'INSERT INTO adaugă date într-un tabel existent.',
          'INSERT INTO adds data to an existing table.',
        ],
      ),
      q(
        ['Ce risc are UPDATE fără WHERE?', 'What is the risk of UPDATE without WHERE?'],
        [
          ['Modifică toate rândurile', 'It updates every row'],
          ['Șterge tabelul', 'It drops the table'],
          ['Nu face nimic', 'It does nothing'],
          ['Modifică doar primul rând', 'It updates only the first row'],
        ],
        [
          'Fără filtru, UPDATE se aplică întregului tabel.',
          'Without a filter, UPDATE applies to the entire table.',
        ],
      ),
      q(
        ['Ce face ROLLBACK?', 'What does ROLLBACK do?'],
        [
          [
            'Anulează modificările neconfirmate ale tranzacției',
            'Undoes uncommitted transaction changes',
          ],
          ['Confirmă modificările', 'Commits changes'],
          ['Creează un index', 'Creates an index'],
          ['Șterge backupul', 'Deletes the backup'],
        ],
        [
          'ROLLBACK revine la starea anterioară tranzacției neconfirmate.',
          'ROLLBACK returns to the state before the uncommitted transaction.',
        ],
      ),
      q(
        [
          'Ce proprietate ACID înseamnă totul sau nimic?',
          'Which ACID property means all or nothing?',
        ],
        ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        [
          'Atomicitatea cere ca toate operațiile tranzacției să reușească împreună.',
          'Atomicity requires all transaction operations to succeed together.',
        ],
      ),
      q(
        [
          'Cum ștergem doar studentul cu id 9?',
          'How do we delete only the student with id 9?',
        ],
        [
          'DELETE FROM students WHERE id = 9',
          'DROP TABLE students',
          'DELETE students.id = 9',
          'DELETE FROM students',
        ],
        [
          'WHERE limitează ștergerea la rândul identificat.',
          'WHERE limits deletion to the identified row.',
        ],
      ),
      q(
        ['Ce face COMMIT?', 'What does COMMIT do?'],
        [
          ['Confirmă tranzacția', 'Commits the transaction'],
          ['Anulează tranzacția', 'Undoes the transaction'],
          ['Șterge cheile', 'Deletes keys'],
          ['Oprește serverul', 'Stops the server'],
        ],
        [
          'COMMIT finalizează modificările tranzacției.',
          'COMMIT finalizes transaction changes.',
        ],
      ),
    ],
    '05-depanare': [
      q(
        [
          'Ce previne injecția SQL la valori introduse de utilizator?',
          'What prevents SQL injection through user-supplied values?',
        ],
        [
          ['Interogări parametrizate', 'Parameterized queries'],
          ['Concatenarea șirurilor', 'String concatenation'],
          ['Ascunderea butonului', 'Hiding the button'],
          ['SELECT *', 'SELECT *'],
        ],
        [
          'Parametrii separă datele de sintaxa SQL.',
          'Parameters separate data from SQL syntax.',
        ],
      ),
      q(
        ['Ce arată EXPLAIN?', 'What does EXPLAIN show?'],
        [
          ['Planul de execuție', 'The execution plan'],
          ['Parolele utilizatorilor', 'User passwords'],
          ['Un backup', 'A backup'],
          ['Licența serverului', 'The server license'],
        ],
        [
          'Planul ajută la depistarea scanărilor și indexurilor utilizate.',
          'The plan helps identify scans and indexes used.',
        ],
      ),
      q(
        ['De ce SELECT * poate fi costisitor?', 'Why can SELECT * be expensive?'],
        [
          ['Transferă coloane care nu sunt necesare', 'It transfers unnecessary columns'],
          ['Elimină indexurile', 'It deletes indexes'],
          ['Produce mereu erori', 'It always errors'],
          ['Blochează autentificarea', 'It blocks authentication'],
        ],
        [
          'Selectarea doar a coloanelor necesare reduce volumul transferat.',
          'Selecting only necessary columns reduces transferred data.',
        ],
      ),
      q(
        [
          'Ce verificăm la o eroare de cheie străină?',
          'What should we check after a foreign key error?',
        ],
        [
          ['Existența rândului referit', 'Whether the referenced row exists'],
          ['Culoarea tabelului', 'The table color'],
          ['Ordinea coloanelor în SELECT', 'Column order in SELECT'],
          ['Fusul orar al monitorului', 'The monitor time zone'],
        ],
        [
          'Rândul părinte trebuie să existe înaintea referinței.',
          'The parent row must exist before the reference.',
        ],
      ),
      q(
        [
          'Ce verifică testarea restaurării unui backup?',
          'What does a backup restoration test verify?',
        ],
        [
          ['Că datele pot fi recuperate', 'That data can be recovered'],
          ['Doar numele fișierului', 'Only the filename'],
          ['Viteza tastaturii', 'Keyboard speed'],
          ['Că nu mai trebuie backup', 'That backups are no longer needed'],
        ],
        [
          'Un backup trebuie verificat prin restaurare într-un mediu de test.',
          'A backup should be verified by restoring it in a test environment.',
        ],
      ),
      q(
        ['Ce poate cauza un deadlock?', 'What can cause a deadlock?'],
        [
          [
            'Tranzacții care așteaptă reciproc resurse blocate',
            'Transactions waiting for each other’s locked resources',
          ],
          ['Un SELECT fără tabel', 'A SELECT without a table'],
          ['O valoare NULL', 'A NULL value'],
          ['Un alias', 'An alias'],
        ],
        [
          'O ordine consistentă de acces la resurse reduce deadlockurile.',
          'Consistent resource access order reduces deadlocks.',
        ],
      ),
    ],
  },
}

export const freshBank: Record<string, Question[]> = Object.fromEntries(
  Object.entries(catalog).map(([course, modules]) => [
    course,
    Object.entries(modules).flatMap(([module, specs]) =>
      makeQuestions(course, module, specs),
    ),
  ]),
)
