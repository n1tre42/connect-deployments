import { bilingual } from '@/lib/translations'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import type { Question } from './questions'

type Pair = readonly [string, string]
type Fact = {
  module: string
  prompt: Pair
  scenario: Pair
  statement: Pair
  answer: Pair
  distractors: readonly [Pair, Pair, Pair]
  explanation: Pair
  statementIsTrue: boolean
}

const f = (
  module: string,
  prompt: Pair,
  scenario: Pair,
  answer: Pair,
  distractors: readonly [Pair, Pair, Pair],
  explanation: Pair,
  statement: Pair,
  statementIsTrue: boolean,
): Fact => ({
  module,
  prompt,
  scenario,
  answer,
  distractors,
  explanation,
  statement,
  statementIsTrue,
})

function buildCourse(course: string, facts: Fact[], offset = 0): Question[] {
  const result: Question[] = []
  for (const [index, fact] of facts.entries()) {
    const choices = [fact.answer, ...fact.distractors]
    const prompts: { text: Pair; type: 'single' | 'true_false'; correct: number }[] = [
      { text: fact.prompt, type: 'single', correct: 0 },
      { text: fact.scenario, type: 'single', correct: 0 },
      {
        text: fact.statement,
        type: 'true_false',
        correct: fact.statementIsTrue ? 1 : 0,
      },
    ]

    for (const [variant, item] of prompts.entries()) {
      const id = `${course}-${fact.module.slice(0, 2)}-add-${String(offset + index * 3 + variant + 1).padStart(3, '0')}`
      const answers =
        item.type === 'true_false'
          ? [bilingual('Fals', 'False'), bilingual('Adevărat', 'True')]
          : choices.map(([ro, en]) => bilingual(ro, en))
      const options = answers.map((text, n) => ({ id: String(n), text }))
      const correct = item.correct
      result.push({
        id,
        module: fact.module,
        difficulty: variant === 1 ? 'medium' : 'easy',
        type: item.type,
        text: bilingual(item.text[0], item.text[1]),
        options: shuffle(options, seededRandom(hashString(id))),
        correct: [String(correct)],
        explanation: bilingual(fact.explanation[0], fact.explanation[1]),
      })
    }
  }
  return result
}

const pythonFacts: Fact[] = [
  f(
    '01-tipuri-date-operatori',
    [
      'Ce tip de valoare returnează 9 / 2 în Python 3?',
      'What type of value does 9 / 2 return in Python 3?',
    ],
    [
      'Un calculator împarte doi întregi cu /. Ce tip va avea rezultatul?',
      'A calculator divides two integers with /. What type will the result have?',
    ],
    ['float', 'float'],
    [
      ['int', 'int'],
      ['str', 'str'],
      ['bool', 'bool'],
    ],
    [
      'Operatorul / face împărțire reală și returnează float.',
      'The / operator performs true division and returns a float.',
    ],
    ['În Python 3, 9 / 2 produce un float.', 'In Python 3, 9 / 2 produces a float.'],
    true,
  ),
  f(
    '01-tipuri-date-operatori',
    [
      'Ce operator verifică dacă două valori au valori egale?',
      'Which operator checks whether two values are equal?',
    ],
    [
      'Un program trebuie să compare două scoruri fără să le atribuie unul altuia. Ce operator folosește?',
      'A program must compare two scores without assigning one to the other. Which operator should it use?',
    ],
    ['==', '=='],
    [
      ['=', '='],
      ['is not', 'is not'],
      ['>=', '>='],
    ],
    [
      '== compară valorile; = atribuie o valoare unei variabile.',
      '== compares values; = assigns a value to a variable.',
    ],
    [
      'Operatorul == compară egalitatea valorilor.',
      'The == operator compares value equality.',
    ],
    true,
  ),
  f(
    '01-tipuri-date-operatori',
    ['Ce valoare booleană are bool(0)?', 'What Boolean value does bool(0) produce?'],
    [
      'Un program tratează zero ca valoare falsă într-o condiție. Ce returnează bool(0)?',
      'A program treats zero as false in a condition. What does bool(0) return?',
    ],
    ['False', 'False'],
    [
      ['True', 'True'],
      ['0', '0'],
      ['None', 'None'],
    ],
    [
      'Numărul zero este fals în context boolean.',
      'The number zero is falsy in a Boolean context.',
    ],
    ['bool(0) returnează False.', 'bool(0) returns False.'],
    true,
  ),
  f(
    '01-tipuri-date-operatori',
    [
      'Ce metodă transformă textul "abc" în litere mari?',
      'Which method converts the text "abc" to uppercase?',
    ],
    [
      'Un raport trebuie să afișeze coduri de țară cu majuscule. Ce metodă aplici șirului?',
      'A report must display country codes in uppercase. Which method do you apply to a string?',
    ],
    ['upper()', 'upper()'],
    [
      ['capitalize()', 'capitalize()'],
      ['append()', 'append()'],
      ['titlecase()', 'titlecase()'],
    ],
    [
      'upper() transformă toate literele alfabetice în majuscule.',
      'upper() converts all alphabetic characters to uppercase.',
    ],
    [
      'Metoda upper() returnează șirul cu litere mari.',
      'The upper() method returns the string in uppercase.',
    ],
    true,
  ),
  f(
    '01-tipuri-date-operatori',
    ['Ce valoare are 17 % 5?', 'What is the value of 17 % 5?'],
    [
      'Un program distribuie 17 obiecte în grupuri de câte 5. Ce dă operatorul restului?',
      'A program distributes 17 items into groups of five. What does the remainder operator return?',
    ],
    ['2', '2'],
    [
      ['3', '3'],
      ['3.4', '3.4'],
      ['12', '12'],
    ],
    ['% returnează restul împărțirii întregi.', '% returns the remainder of division.'],
    ['17 % 5 este 2.', '17 % 5 is 2.'],
    true,
  ),
  f(
    '02-control-flux',
    ['Ce valori produce list(range(3))?', 'Which values does list(range(3)) produce?'],
    [
      'O buclă parcurge range(3). Ce numere primește?',
      'A loop iterates over range(3). Which numbers does it receive?',
    ],
    ['[0, 1, 2]', '[0, 1, 2]'],
    [
      ['[1, 2, 3]', '[1, 2, 3]'],
      ['[0, 1, 2, 3]', '[0, 1, 2, 3]'],
      ['[3]', '[3]'],
    ],
    [
      'Limita stop a lui range este exclusă, iar începutul implicit este zero.',
      'range excludes its stop value and defaults to a start of zero.',
    ],
    ['range(3) produce 0, 1 și 2.', 'range(3) produces 0, 1, and 2.'],
    true,
  ),
  f(
    '02-control-flux',
    [
      'Ce instrucțiune sare peste iterația curentă a unei bucle?',
      'Which statement skips the current loop iteration?',
    ],
    [
      'La valoarea zero, programul trebuie să nu execute restul corpului buclei și să continue cu următoarea valoare. Ce folosește?',
      'For a zero value, the program must skip the rest of the loop body and continue with the next value. What should it use?',
    ],
    ['continue', 'continue'],
    [
      ['break', 'break'],
      ['return', 'return'],
      ['pass', 'pass'],
    ],
    [
      'continue trece la următoarea iterație; break termină bucla.',
      'continue moves to the next iteration; break exits the loop.',
    ],
    [
      'continue nu oprește bucla, ci sare la iterația următoare.',
      'continue does not stop the loop; it skips to the next iteration.',
    ],
    true,
  ),
  f(
    '02-control-flux',
    [
      'Când se execută ramura else a unei bucle for?',
      'When does a for loop’s else branch execute?',
    ],
    [
      'O căutare parcurge toate elementele fără să întâlnească break. Când rulează else?',
      'A search checks every item without encountering break. When does else run?',
    ],
    ['După terminarea normală a buclei', 'After the loop finishes normally'],
    [
      ['La fiecare iterație', 'On every iteration'],
      ['Numai când bucla întâlnește break', 'Only when the loop encounters break'],
      ['Înaintea primei iterații', 'Before the first iteration'],
    ],
    [
      'else al unei bucle se execută dacă bucla se termină fără break.',
      'A loop’s else branch runs if the loop completes without break.',
    ],
    [
      'else al buclei for rulează după terminarea normală, fără break.',
      'A for loop’s else branch runs after normal completion without break.',
    ],
    true,
  ),
  f(
    '02-control-flux',
    ['Ce face break într-o buclă?', 'What does break do inside a loop?'],
    [
      'Un utilizator găsește elementul căutat și bucla nu mai trebuie să continue. Ce instrucțiune folosește?',
      'A user finds the searched item and the loop should stop. Which statement is used?',
    ],
    ['Termină imediat bucla curentă', 'Immediately exits the current loop'],
    [
      ['Sare doar peste iterația curentă', 'Skips only the current iteration'],
      ['Repornește bucla de la început', 'Restarts the loop from the beginning'],
      ['Închide programul Python', 'Closes the Python program'],
    ],
    [
      'break iese din cea mai apropiată buclă.',
      'break exits the nearest enclosing loop.',
    ],
    ['break termină bucla curentă.', 'break exits the current loop.'],
    true,
  ),
  f(
    '02-control-flux',
    [
      'Ce valoare booleană are expresia 5 > 8?',
      'What Boolean value does the expression 5 > 8 have?',
    ],
    [
      'O condiție verifică dacă 5 este mai mare decât 8. Ce ramură if este aleasă?',
      'A condition checks whether 5 is greater than 8. Which if branch is selected?',
    ],
    ['False', 'False'],
    [
      ['True', 'True'],
      ['5', '5'],
      ['None', 'None'],
    ],
    [
      'Comparația este falsă deoarece 5 este mai mic decât 8.',
      'The comparison is false because 5 is less than 8.',
    ],
    ['Expresia 5 > 8 este False.', 'The expression 5 > 8 is False.'],
    true,
  ),
  f(
    '03-intrare-iesire',
    [
      'Ce mod deschide un fișier text pentru adăugare la final?',
      'Which mode opens a text file for appending at the end?',
    ],
    [
      'Jurnalul trebuie să păstreze conținutul vechi și să adauge o linie nouă. Ce mod folosești?',
      'A log must preserve old content and add a new line. Which mode should you use?',
    ],
    ['"a"', '"a"'],
    [
      ['"w"', '"w"'],
      ['"r"', '"r"'],
      ['"x"', '"x"'],
    ],
    [
      'Modul a adaugă la final; w trunchiază fișierul.',
      'Mode a appends; w truncates the file.',
    ],
    [
      'Modul "a" adaugă conținut la sfârșitul fișierului.',
      'Mode "a" appends content to the end of a file.',
    ],
    true,
  ),
  f(
    '03-intrare-iesire',
    [
      'Ce funcție citește o linie de la tastatură?',
      'Which function reads a line from keyboard input?',
    ],
    [
      'Programul cere utilizatorului numele său în consolă. Ce funcție poate citi răspunsul?',
      'A program asks the user for a name in the console. Which function can read the response?',
    ],
    ['input()', 'input()'],
    [
      ['print()', 'print()'],
      ['readline()', 'readline()'],
      ['scan()', 'scan()'],
    ],
    [
      'input() afișează opțional un prompt și returnează textul introdus.',
      'input() can show a prompt and returns the entered text.',
    ],
    [
      'input() citește intrarea utilizatorului ca șir de caractere.',
      'input() reads user input as a string.',
    ],
    true,
  ),
  f(
    '03-intrare-iesire',
    [
      'Ce parametru al lui print() schimbă separatorul dintre valori?',
      'Which print() parameter changes the separator between values?',
    ],
    [
      'Un raport trebuie să afișeze valorile separate prin virgulă și spațiu. Ce argument folosești?',
      'A report must print values separated by a comma and a space. Which argument should you use?',
    ],
    ['sep', 'sep'],
    [
      ['end', 'end'],
      ['file', 'file'],
      ['flush', 'flush'],
    ],
    [
      'Argumentul sep stabilește textul dintre argumentele lui print().',
      'The sep argument sets the text between print() arguments.',
    ],
    [
      'Parametrul sep controlează separatorul dintre valorile afișate.',
      'The sep parameter controls the separator between printed values.',
    ],
    true,
  ),
  f(
    '03-intrare-iesire',
    [
      'Ce metodă citește întregul conținut al unui fișier?',
      'Which method reads the entire contents of a file?',
    ],
    [
      'Un program încarcă un fișier text mic într-o singură variabilă. Ce metodă folosește?',
      'A program loads a small text file into one variable. Which method does it use?',
    ],
    ['read()', 'read()'],
    [
      ['write()', 'write()'],
      ['seek()', 'seek()'],
      ['close()', 'close()'],
    ],
    [
      'read() citește datele disponibile din obiectul fișier.',
      'read() reads the available data from the file object.',
    ],
    ['read() citește conținutul fișierului.', 'read() reads the file contents.'],
    true,
  ),
  f(
    '03-intrare-iesire',
    [
      'Ce argument de formatare controlează numărul de zecimale afișate cu f-string?',
      'Which format specifier controls decimal places in an f-string?',
    ],
    [
      'Un preț trebuie afișat cu două cifre după punctul zecimal. Ce specificator este potrivit?',
      'A price must display two digits after the decimal point. Which specifier is appropriate?',
    ],
    ['.2f', '.2f'],
    [
      ['.2d', '.2d'],
      ['2%', '2%'],
      ['f2', 'f2'],
    ],
    [
      '.2f formatează numărul în virgulă mobilă cu două zecimale.',
      '.2f formats a floating-point number to two decimal places.',
    ],
    [
      'Specificatorul .2f afișează două zecimale.',
      'The .2f specifier displays two decimal places.',
    ],
    true,
  ),
  f(
    '04-documentare-structura',
    [
      'Ce docstring este asociat unei funcții?',
      'Which docstring is associated with a function?',
    ],
    [
      'O funcție trebuie să ofere descriere accesibilă prin help(). Unde pui docstringul?',
      'A function needs a description available through help(). Where do you put the docstring?',
    ],
    ['Primul șir din corpul funcției', 'The first string in the function body'],
    [
      ['Un comentariu după ultimul return', 'A comment after the final return'],
      ['Numele funcției', 'The function name'],
      ['Un șir global oriunde în fișier', 'Any global string anywhere in the file'],
    ],
    [
      'Docstringul este șirul literal de la începutul corpului funcției.',
      'A docstring is the string literal at the start of a function body.',
    ],
    [
      'Docstringul funcției apare primul în corpul acesteia.',
      'A function’s docstring appears first in its body.',
    ],
    true,
  ),
  f(
    '04-documentare-structura',
    [
      'Ce valoare implicită poate avea un parametru Python?',
      'What can be used as a default value for a Python parameter?',
    ],
    [
      'Un apel fără argument opțional trebuie să folosească valoarea 10. Cum definești parametrul?',
      'A call without an optional argument should use the value 10. How do you define the parameter?',
    ],
    ['def f(x=10):', 'def f(x=10):'],
    [
      ['def f(x:=10):', 'def f(x:=10):'],
      ['def f(default x 10):', 'def f(default x 10):'],
      ['def f(x==10):', 'def f(x==10):'],
    ],
    [
      'Valoarea implicită se atribuie în antetul funcției cu =.',
      'A default value is assigned in the function header with =.',
    ],
    [
      'Parametrii impliciți se declară cu sintaxa x=valoare.',
      'Default parameters use the syntax x=value.',
    ],
    true,
  ),
  f(
    '04-documentare-structura',
    [
      'Ce cuvânt-cheie trimite o valoare dintr-o funcție apelantului?',
      'Which keyword sends a value from a function to its caller?',
    ],
    [
      'O funcție calculează media și trebuie să ofere rezultatul codului care a apelat-o. Ce folosește?',
      'A function calculates an average and must provide the result to its caller. What does it use?',
    ],
    ['return', 'return'],
    [
      ['yield from', 'yield from'],
      ['print', 'print'],
      ['break', 'break'],
    ],
    [
      'return încheie apelul funcției și poate furniza o valoare.',
      'return ends the function call and can provide a value.',
    ],
    [
      'return trimite valoarea calculată înapoi apelantului.',
      'return sends the computed value back to the caller.',
    ],
    true,
  ),
  f(
    '04-documentare-structura',
    [
      'Unde se definește de regulă o variabilă locală?',
      'Where is a local variable generally defined?',
    ],
    [
      'O funcție calculează un total temporar care nu trebuie să fie global. Unde creezi variabila?',
      'A function calculates a temporary total that should not be global. Where should the variable be created?',
    ],
    ['În corpul funcției', 'Inside the function body'],
    [
      ['În afara tuturor funcțiilor, obligatoriu', 'Outside every function, always'],
      ['În fișierul de configurare Python', 'In a Python configuration file'],
      ['În argumentele interpretorului', 'In interpreter arguments'],
    ],
    [
      'Variabilele atribuite în funcție sunt locale dacă nu se declară altfel.',
      'Variables assigned in a function are local unless declared otherwise.',
    ],
    [
      'O atribuire obișnuită din funcție creează un nume local.',
      'A normal assignment inside a function creates a local name.',
    ],
    true,
  ),
  f(
    '05-depanare-erori',
    [
      'Ce excepție apare de obicei la împărțirea unui număr la zero?',
      'Which exception is usually raised when dividing a number by zero?',
    ],
    [
      'Un calculator primește ca împărțitor 0. Ce excepție ar trebui tratată?',
      'A calculator receives 0 as the divisor. Which exception should be handled?',
    ],
    ['ZeroDivisionError', 'ZeroDivisionError'],
    [
      ['ValueError', 'ValueError'],
      ['IndexError', 'IndexError'],
      ['ImportError', 'ImportError'],
    ],
    [
      'Împărțirea numerică la zero ridică ZeroDivisionError.',
      'Numeric division by zero raises ZeroDivisionError.',
    ],
    [
      'Împărțirea la zero ridică ZeroDivisionError.',
      'Division by zero raises ZeroDivisionError.',
    ],
    true,
  ),
  f(
    '05-depanare-erori',
    [
      'Ce bloc rulează indiferent dacă apare o excepție?',
      'Which block runs whether or not an exception occurs?',
    ],
    [
      'Un fișier trebuie închis după operație chiar dacă citirea eșuează. Ce bloc se execută garantat?',
      'A file must be closed after an operation even if reading fails. Which block runs regardless?',
    ],
    ['finally', 'finally'],
    [
      ['else', 'else'],
      ['except', 'except'],
      ['raise', 'raise'],
    ],
    [
      'finally rulează după blocurile try/except în ambele situații.',
      'finally runs after try/except handling in either case.',
    ],
    [
      'Codul din finally se execută indiferent de rezultat.',
      'Code in finally runs regardless of the outcome.',
    ],
    true,
  ),
  f(
    '05-depanare-erori',
    [
      'Ce excepție semnalează conversia invalidă int("abc")?',
      'Which exception signals an invalid int("abc") conversion?',
    ],
    [
      'Un formular conține text în loc de număr și conversia la int eșuează. Ce excepție tratezi?',
      'A form contains text instead of a number and conversion to int fails. Which exception should be handled?',
    ],
    ['ValueError', 'ValueError'],
    [
      ['TypeError', 'TypeError'],
      ['KeyError', 'KeyError'],
      ['SyntaxError', 'SyntaxError'],
    ],
    [
      'ValueError apare când tipul este potrivit, dar valoarea nu poate fi convertită.',
      'ValueError occurs when the type is acceptable but the value cannot be converted.',
    ],
    ['int("abc") ridică ValueError.', 'int("abc") raises ValueError.'],
    true,
  ),
  f(
    '05-depanare-erori',
    [
      'Ce indică de obicei o eroare de sintaxă?',
      'What does a syntax error usually indicate?',
    ],
    [
      'Interpretorul nu poate analiza o linie cu paranteză lipsă. Ce categorie de eroare este?',
      'The interpreter cannot parse a line with a missing parenthesis. Which error category is this?',
    ],
    [
      'Codul nu respectă gramatica limbajului',
      'The code does not follow the language grammar',
    ],
    [
      ['Rezultatul matematic este greșit', 'The mathematical result is wrong'],
      ['Un modul este lent', 'A module is slow'],
      ['Un obiect nu are metodă close()', 'An object has no close() method'],
    ],
    [
      'Erorile de sintaxă sunt detectate când codul nu poate fi parsată.',
      'Syntax errors occur when code cannot be parsed.',
    ],
    [
      'O paranteză neînchisă poate produce SyntaxError.',
      'An unclosed parenthesis can produce SyntaxError.',
    ],
    true,
  ),
  f(
    '06-module-instrumente',
    [
      'Ce funcție din math calculează rădăcina pătrată?',
      'Which function in math calculates a square root?',
    ],
    [
      'Un program folosește biblioteca standard și calculează rădăcina lui 81. Ce apel este potrivit?',
      'A program uses the standard library to calculate the square root of 81. Which call is appropriate?',
    ],
    ['math.sqrt(81)', 'math.sqrt(81)'],
    [
      ['math.root(81)', 'math.root(81)'],
      ['sqrt.math(81)', 'sqrt.math(81)'],
      ['math.pow(81)', 'math.pow(81)'],
    ],
    ['Modulul math oferă funcția sqrt.', 'The math module provides the sqrt function.'],
    [
      'math.sqrt(81) returnează rădăcina pătrată a lui 81.',
      'math.sqrt(81) returns the square root of 81.',
    ],
    true,
  ),
  f(
    '06-module-instrumente',
    ['Ce întoarce random.randint(1, 6)?', 'What does random.randint(1, 6) return?'],
    [
      'Un zar virtual trebuie să aleagă inclusiv fețele 1 și 6. Ce funcție folosești?',
      'A virtual die must include both faces 1 and 6. Which function do you use?',
    ],
    ['Un întreg de la 1 la 6 inclusiv', 'An integer from 1 through 6 inclusive'],
    [
      ['Un float de la 1 la 6', 'A float from 1 to 6'],
      ['Un întreg de la 1 la 5', 'An integer from 1 to 5'],
      ['Un element dintr-un șir', 'An item from a string'],
    ],
    [
      'randint(a, b) include ambele capete ale intervalului.',
      'randint(a, b) includes both endpoints of the range.',
    ],
    [
      'random.randint(1, 6) poate returna 1 sau 6.',
      'random.randint(1, 6) can return 1 or 6.',
    ],
    true,
  ),
  f(
    '06-module-instrumente',
    [
      'Ce conține __name__ când fișierul Python este rulat direct?',
      'What does __name__ contain when a Python file is run directly?',
    ],
    [
      'Un script trebuie să ruleze funcția main doar când este lansat direct. Ce valoare verifică?',
      'A script should run main only when launched directly. Which value should it check?',
    ],
    ['"__main__"', '"__main__"'],
    [
      ['"main"', '"main"'],
      ['Numele directorului', 'The directory name'],
      ['None', 'None'],
    ],
    [
      'Interpretorul setează __name__ la "__main__" pentru modulul executat direct.',
      'The interpreter sets __name__ to "__main__" for the module run directly.',
    ],
    [
      'La execuție directă, __name__ este "__main__".',
      'When run directly, __name__ is "__main__".',
    ],
    true,
  ),
]

const databaseFacts: Fact[] = [
  f(
    '01-proiectare',
    [
      'Ce caracteristică are o cheie primară?',
      'What characteristic does a primary key have?',
    ],
    [
      'Două rânduri de client nu trebuie să aibă același identificator. Ce constrângere definești?',
      'Two customer rows must not share an identifier. Which constraint do you define?',
    ],
    [
      'Valoare unică și nenulă pentru fiecare rând',
      'A unique, non-null value for each row',
    ],
    [
      ['Poate conține duplicate și NULL', 'It may contain duplicates and NULL'],
      ['Este obligatoriu text', 'It must be text'],
      ['Poate referi numai alt tabel', 'It can only reference another table'],
    ],
    [
      'Cheia primară identifică un rând și nu admite duplicate sau NULL.',
      'A primary key identifies a row and cannot be duplicated or NULL.',
    ],
    [
      'O tabelă poate avea o singură constrângere de cheie primară.',
      'A table can have one primary key constraint.',
    ],
    true,
  ),
  f(
    '01-proiectare',
    ['Ce scop are o cheie externă?', 'What is the purpose of a foreign key?'],
    [
      'Fiecare comandă trebuie să facă referire la un client existent. Ce constrângere ajută?',
      'Each order must refer to an existing customer. Which constraint helps?',
    ],
    ['Menține integritatea referențială', 'Maintains referential integrity'],
    [
      ['Sortează automat rândurile', 'Automatically sorts rows'],
      ['Criptează coloana', 'Encrypts the column'],
      ['Înlocuiește cheia primară', 'Replaces the primary key'],
    ],
    [
      'Cheia externă leagă rânduri și poate impune existența rândului referit.',
      'A foreign key links rows and can require the referenced row to exist.',
    ],
    [
      'Cheile externe susțin integritatea referențială între tabele.',
      'Foreign keys support referential integrity between tables.',
    ],
    true,
  ),
  f(
    '01-proiectare',
    [
      'Ce relație descrie o comandă și liniile sale de comandă?',
      'Which relationship describes an order and its order lines?',
    ],
    [
      'O comandă poate avea multe produse în linii diferite, iar o linie aparține unei comenzi. Ce relație este?',
      'An order can have many products in separate lines, and each line belongs to one order. Which relationship is this?',
    ],
    ['Unu-la-mulți', 'One-to-many'],
    [
      ['Unu-la-unu', 'One-to-one'],
      ['Mulți-la-mulți fără tabel de legătură', 'Many-to-many without a junction table'],
      ['Niciuna', 'None'],
    ],
    [
      'O comandă corespunde mai multor linii; fiecare linie aparține unei comenzi.',
      'One order can have several lines; each line belongs to one order.',
    ],
    [
      'Relația comandă-linii este unu-la-mulți.',
      'The order-to-lines relationship is one-to-many.',
    ],
    true,
  ),
  f(
    '01-proiectare',
    ['Ce reduce normalizarea?', 'What does normalization reduce?'],
    [
      'Un tabel repetă adresa clientului pe fiecare comandă. Ce abordare reduce anomaliile și redundanța?',
      'A table repeats the customer address on every order. What approach reduces anomalies and redundancy?',
    ],
    [
      'Separarea datelor în tabele relaționate corect',
      'Separating data into properly related tables',
    ],
    [
      [
        'Copierea tuturor coloanelor în fiecare tabel',
        'Copying every column into every table',
      ],
      ['Stocarea tabelelor ca imagini', 'Storing tables as images'],
      ['Eliminarea cheilor primare', 'Removing primary keys'],
    ],
    [
      'Normalizarea organizează datele pentru a reduce redundanța și anomaliile.',
      'Normalization organizes data to reduce redundancy and anomalies.',
    ],
    [
      'Normalizarea poate reduce actualizările repetate ale aceleiași informații.',
      'Normalization can reduce repeated updates to the same information.',
    ],
    true,
  ),
  f(
    '01-proiectare',
    [
      'Ce tip de relație necesită de obicei un tabel de legătură?',
      'Which relationship usually requires a junction table?',
    ],
    [
      'Studenții se pot înscrie la mai multe cursuri, iar cursurile au mai mulți studenți. Ce structură folosești?',
      'Students can enroll in several courses, and courses have several students. Which structure do you use?',
    ],
    ['Mulți-la-mulți', 'Many-to-many'],
    [
      ['Unu-la-unu', 'One-to-one'],
      ['Unu-la-zero', 'One-to-zero'],
      ['Auto-referință obligatorie', 'Mandatory self-reference'],
    ],
    [
      'O tabelă de legătură reprezintă fiecare asociere dintre cele două entități.',
      'A junction table represents each association between the two entities.',
    ],
    [
      'Relația mulți-la-mulți este modelată uzual printr-un tabel de legătură.',
      'A many-to-many relationship is commonly modeled with a junction table.',
    ],
    true,
  ),
  f(
    '01-proiectare',
    [
      'Ce reprezintă un atribut într-un model relațional?',
      'What does an attribute represent in a relational model?',
    ],
    [
      'Într-o tabelă Persoane se stochează DataNașterii. Ce reprezintă acea coloană?',
      'A People table stores BirthDate. What does that column represent?',
    ],
    [
      'O proprietate a entității, stocată într-o coloană',
      'An entity property stored in a column',
    ],
    [
      ['Un tabel separat obligatoriu', 'A mandatory separate table'],
      ['O înregistrare completă', 'A complete record'],
      ['O relație între două baze de date', 'A relationship between two databases'],
    ],
    [
      'În modelul relațional, atributul corespunde unei coloane.',
      'In the relational model, an attribute corresponds to a column.',
    ],
    [
      'O coloană descrie un atribut al entității reprezentate.',
      'A column describes an attribute of the represented entity.',
    ],
    true,
  ),
  f(
    '02-obiecte',
    ['Ce comandă creează o tabelă?', 'Which command creates a table?'],
    [
      'Baza de date trebuie să stocheze o nouă listă de produse. Ce instrucțiune DDL este potrivită?',
      'The database needs a new table for products. Which DDL statement is appropriate?',
    ],
    ['CREATE TABLE', 'CREATE TABLE'],
    [
      ['INSERT TABLE', 'INSERT TABLE'],
      ['MAKE ROW', 'MAKE ROW'],
      ['ADD DATABASE', 'ADD DATABASE'],
    ],
    ['CREATE TABLE definește un obiect tabelă.', 'CREATE TABLE defines a table object.'],
    ['CREATE TABLE creează o tabelă nouă.', 'CREATE TABLE creates a new table.'],
    true,
  ),
  f(
    '02-obiecte',
    [
      'Ce comandă modifică structura unei tabele existente?',
      'Which command changes the structure of an existing table?',
    ],
    [
      'Trebuie adăugată o coloană Email unei tabele. Ce comandă DDL modifică structura?',
      'An Email column must be added to a table. Which DDL command changes its structure?',
    ],
    ['ALTER TABLE', 'ALTER TABLE'],
    [
      ['UPDATE TABLE', 'UPDATE TABLE'],
      ['CHANGE ROW', 'CHANGE ROW'],
      ['MODIFY DATABASE', 'MODIFY DATABASE'],
    ],
    [
      'ALTER TABLE modifică definiția unei tabele.',
      'ALTER TABLE changes a table definition.',
    ],
    [
      'ALTER TABLE este folosit pentru a modifica structura tabelului.',
      'ALTER TABLE is used to modify a table’s structure.',
    ],
    true,
  ),
  f(
    '02-obiecte',
    [
      'Ce comandă elimină definiția unei tabele?',
      'Which command removes a table definition?',
    ],
    [
      'O tabelă de test și datele sale trebuie eliminate din baza de date. Ce comandă folosești?',
      'A test table and its data must be removed from the database. Which command do you use?',
    ],
    ['DROP TABLE', 'DROP TABLE'],
    [
      ['DELETE TABLE', 'DELETE TABLE'],
      ['REMOVE ROW', 'REMOVE ROW'],
      ['ERASE DATABASE', 'ERASE DATABASE'],
    ],
    [
      'DROP TABLE elimină obiectul tabelă; DELETE elimină rânduri.',
      'DROP TABLE removes the table object; DELETE removes rows.',
    ],
    [
      'DROP TABLE elimină tabela ca obiect din schemă.',
      'DROP TABLE removes the table object from the schema.',
    ],
    true,
  ),
  f(
    '02-obiecte',
    [
      'Ce constrângere respinge duplicate într-o coloană?',
      'Which constraint rejects duplicates in a column?',
    ],
    [
      'Fiecare adresă de e-mail trebuie să apară cel mult o dată. Ce constrângere aplici?',
      'Each email address may appear at most once. Which constraint do you apply?',
    ],
    ['UNIQUE', 'UNIQUE'],
    [
      ['DEFAULT', 'DEFAULT'],
      ['CHECK', 'CHECK'],
      ['FOREIGN KEY', 'FOREIGN KEY'],
    ],
    [
      'UNIQUE impune unicitatea valorilor pentru coloana sau grupul de coloane.',
      'UNIQUE enforces distinct values for a column or set of columns.',
    ],
    [
      'UNIQUE împiedică duplicatele în coloana declarată.',
      'UNIQUE prevents duplicates in the declared column.',
    ],
    true,
  ),
  f(
    '02-obiecte',
    ['Ce face o constrângere CHECK?', 'What does a CHECK constraint do?'],
    [
      'Vârsta trebuie să fie cel puțin zero. Unde impui această regulă?',
      'Age must be at least zero. Where can you enforce this rule?',
    ],
    [
      'Verifică dacă valoarea respectă o condiție',
      'Checks whether a value satisfies a condition',
    ],
    [
      ['Generează automat cheia primară', 'Automatically generates a primary key'],
      ['Sortează valorile', 'Sorts the values'],
      ['Creează o relație cu orice tabel', 'Creates a relationship to any table'],
    ],
    [
      'CHECK validează valorile după o expresie logică.',
      'CHECK validates values against a logical expression.',
    ],
    [
      'CHECK poate impune condiția Age >= 0.',
      'CHECK can enforce the condition Age >= 0.',
    ],
    true,
  ),
  f(
    '03-interogare',
    [
      'Ce clauză filtrează rândurile înaintea grupării?',
      'Which clause filters rows before grouping?',
    ],
    [
      'Un raport include doar comenzile din 2026 înainte să le agregheze. Ce clauză folosești?',
      'A report includes only orders from 2026 before aggregation. Which clause do you use?',
    ],
    ['WHERE', 'WHERE'],
    [
      ['HAVING', 'HAVING'],
      ['ORDER BY', 'ORDER BY'],
      ['AS', 'AS'],
    ],
    [
      'WHERE filtrează rânduri individuale înainte de GROUP BY.',
      'WHERE filters individual rows before GROUP BY.',
    ],
    [
      'WHERE selectează rândurile care participă la grupare.',
      'WHERE selects rows that participate in grouping.',
    ],
    true,
  ),
  f(
    '03-interogare',
    [
      'Ce clauză filtrează grupurile agregate?',
      'Which clause filters aggregated groups?',
    ],
    [
      'Un raport afișează numai departamentele cu peste 10 angajați după COUNT. Ce clauză se potrivește?',
      'A report shows only departments with over 10 employees after COUNT. Which clause fits?',
    ],
    ['HAVING', 'HAVING'],
    [
      ['WHERE', 'WHERE'],
      ['FROM', 'FROM'],
      ['DISTINCT', 'DISTINCT'],
    ],
    [
      'HAVING filtrează grupurile produse de GROUP BY.',
      'HAVING filters groups produced by GROUP BY.',
    ],
    [
      'HAVING poate filtra rezultatele unei agregări precum COUNT.',
      'HAVING can filter an aggregate result such as COUNT.',
    ],
    true,
  ),
  f(
    '03-interogare',
    ['Ce face COUNT(*)?', 'What does COUNT(*) do?'],
    [
      'O listă trebuie să raporteze numărul tuturor rândurilor rezultate, inclusiv cele cu NULL. Ce agregat folosești?',
      'A report must count all result rows, including rows containing NULL. Which aggregate do you use?',
    ],
    ['Numără rândurile', 'Counts rows'],
    [
      ['Adună toate valorile numerice', 'Sums all numeric values'],
      [
        'Numără doar valorile distincte din prima coloană',
        'Counts only distinct values in the first column',
      ],
      ['Returnează primul rând', 'Returns the first row'],
    ],
    [
      'COUNT(*) numără rândurile; COUNT(coloană) ignoră valorile NULL din acea coloană.',
      'COUNT(*) counts rows; COUNT(column) ignores NULL values in that column.',
    ],
    [
      'COUNT(*) numără fiecare rând din grupul rezultat.',
      'COUNT(*) counts every row in the result group.',
    ],
    true,
  ),
  f(
    '03-interogare',
    [
      'Ce tip de JOIN păstrează toate rândurile din tabelul stâng?',
      'Which JOIN keeps every row from the left table?',
    ],
    [
      'Raportul trebuie să includă și clienții fără comenzi. Ce join alegi dacă Clients este în stânga?',
      'A report must include customers with no orders. Which join do you use if Clients is on the left?',
    ],
    ['LEFT JOIN', 'LEFT JOIN'],
    [
      ['INNER JOIN', 'INNER JOIN'],
      ['CROSS JOIN', 'CROSS JOIN'],
      ['SELF JOIN', 'SELF JOIN'],
    ],
    [
      'LEFT JOIN păstrează toate rândurile din stânga și completează cu NULL fără potrivire.',
      'LEFT JOIN keeps all left rows and fills unmatched right columns with NULL.',
    ],
    [
      'LEFT JOIN include și rândurile fără corespondent din tabelul drept.',
      'LEFT JOIN includes rows without a match in the right table.',
    ],
    true,
  ),
  f(
    '03-interogare',
    [
      'Ce clauză stabilește ordinea rezultatelor?',
      'Which clause sets the order of results?',
    ],
    [
      'O listă de produse trebuie sortată după preț descrescător. Ce clauză folosești?',
      'A product list must be sorted by price descending. Which clause do you use?',
    ],
    ['ORDER BY', 'ORDER BY'],
    [
      ['GROUP BY', 'GROUP BY'],
      ['WHERE', 'WHERE'],
      ['LIMIT BY', 'LIMIT BY'],
    ],
    [
      'ORDER BY sortează rândurile; DESC indică ordinea descrescătoare.',
      'ORDER BY sorts rows; DESC specifies descending order.',
    ],
    [
      'ORDER BY price DESC sortează de la cel mai mare preț.',
      'ORDER BY price DESC sorts from highest price.',
    ],
    true,
  ),
  f(
    '03-interogare',
    [
      'Ce operator selectează valori dintr-un interval inclusiv?',
      'Which operator selects values in an inclusive range?',
    ],
    [
      'O notă între 8 și 10, inclusiv capetele, trebuie selectată. Ce condiție e adecvată?',
      'A grade from 8 through 10, including both endpoints, must be selected. Which condition is appropriate?',
    ],
    ['BETWEEN 8 AND 10', 'BETWEEN 8 AND 10'],
    [
      ['IN RANGE 8 TO 10', 'IN RANGE 8 TO 10'],
      ['LIKE 8 AND 10', 'LIKE 8 AND 10'],
      ['EQUALS 8:10', 'EQUALS 8:10'],
    ],
    [
      'BETWEEN include limitele de început și de sfârșit.',
      'BETWEEN includes its lower and upper bounds.',
    ],
    ['BETWEEN 8 AND 10 include valorile 8 și 10.', 'BETWEEN 8 AND 10 includes 8 and 10.'],
    true,
  ),
  f(
    '04-manipulare',
    ['Ce comandă adaugă un rând nou?', 'Which command adds a new row?'],
    [
      'Un client nou trebuie salvat în tabela Customers. Ce comandă folosești?',
      'A new customer must be saved in Customers. Which command do you use?',
    ],
    ['INSERT INTO', 'INSERT INTO'],
    [
      ['ALTER TABLE', 'ALTER TABLE'],
      ['SELECT INTO', 'SELECT INTO'],
      ['CREATE ROW', 'CREATE ROW'],
    ],
    [
      'INSERT INTO adaugă date într-o tabelă existentă.',
      'INSERT INTO adds data to an existing table.',
    ],
    [
      'INSERT INTO este comanda DML pentru inserarea rândurilor.',
      'INSERT INTO is the DML command for adding rows.',
    ],
    true,
  ),
  f(
    '04-manipulare',
    [
      'Ce comandă schimbă valori în rânduri existente?',
      'Which command changes values in existing rows?',
    ],
    [
      'Adresa unui client existent s-a schimbat, iar rândul trebuie corectat. Ce comandă folosești?',
      'An existing customer’s address has changed and the row must be corrected. Which command do you use?',
    ],
    ['UPDATE', 'UPDATE'],
    [
      ['INSERT', 'INSERT'],
      ['CREATE', 'CREATE'],
      ['GRANT', 'GRANT'],
    ],
    [
      'UPDATE schimbă valori în rânduri selectate, de obicei cu WHERE.',
      'UPDATE changes values in selected rows, commonly with WHERE.',
    ],
    ['UPDATE modifică date existente.', 'UPDATE modifies existing data.'],
    true,
  ),
  f(
    '04-manipulare',
    ['Ce risc are un UPDATE fără WHERE?', 'What is the risk of an UPDATE without WHERE?'],
    [
      'O instrucțiune mărește prețul unui produs, dar omite filtrul. Ce se poate întâmpla?',
      'A statement raises a product price but omits its filter. What can happen?',
    ],
    ['Se pot actualiza toate rândurile', 'Every row may be updated'],
    [
      ['Nu se actualizează niciun rând', 'No rows are updated'],
      ['Tabela este eliminată automat', 'The table is automatically dropped'],
      ['Se actualizează doar cheia primară', 'Only the primary key is updated'],
    ],
    [
      'Fără WHERE, UPDATE aplică modificarea tuturor rândurilor.',
      'Without WHERE, UPDATE applies the change to every row.',
    ],
    [
      'Clauza WHERE este opțională sintactic, dar omisiunea ei poate afecta toate rândurile.',
      'WHERE is syntactically optional, but omitting it can affect all rows.',
    ],
    true,
  ),
  f(
    '04-manipulare',
    [
      'Ce comandă elimină rânduri selectate dintr-o tabelă?',
      'Which command removes selected rows from a table?',
    ],
    [
      'Comenzile anulate trebuie șterse fără a elimina tabela. Ce instrucțiune folosești?',
      'Canceled orders must be removed without dropping the table. Which statement do you use?',
    ],
    ['DELETE FROM', 'DELETE FROM'],
    [
      ['DROP DATABASE', 'DROP DATABASE'],
      ['REMOVE COLUMN', 'REMOVE COLUMN'],
      ['ALTER ROW', 'ALTER ROW'],
    ],
    [
      'DELETE FROM șterge rânduri; WHERE limitează ce rânduri sunt afectate.',
      'DELETE FROM removes rows; WHERE limits which rows are affected.',
    ],
    [
      'DELETE FROM păstrează tabela, dar elimină rândurile selectate.',
      'DELETE FROM keeps the table but removes selected rows.',
    ],
    true,
  ),
  f(
    '04-manipulare',
    ['Ce face COMMIT într-o tranzacție?', 'What does COMMIT do in a transaction?'],
    [
      'Modificările validate trebuie făcute permanente în tranzacție. Ce comandă folosești?',
      'Validated changes must be made permanent in a transaction. Which command do you use?',
    ],
    ['Confirmă tranzacția', 'Commits the transaction'],
    [
      ['Anulează tranzacția', 'Rolls back the transaction'],
      ['Creează un index', 'Creates an index'],
      ['Deschide o conexiune nouă', 'Opens a new connection'],
    ],
    [
      'COMMIT finalizează modificările tranzacției.',
      'COMMIT finalizes the transaction’s changes.',
    ],
    [
      'COMMIT confirmă schimbările din tranzacție.',
      'COMMIT commits the transaction changes.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Cum se compară corect o coloană cu NULL în SQL?',
      'How should a column be compared with NULL in SQL?',
    ],
    [
      'O interogare trebuie să găsească rândurile fără telefon. Ce condiție se folosește?',
      'A query must find rows without a phone number. Which condition should it use?',
    ],
    ['IS NULL', 'IS NULL'],
    [
      ['= NULL', '= NULL'],
      ['== NULL', '== NULL'],
      ['EMPTY()', 'EMPTY()'],
    ],
    [
      'NULL se verifică cu IS NULL sau IS NOT NULL, nu cu egalitate.',
      'NULL is checked with IS NULL or IS NOT NULL, not equality.',
    ],
    [
      'Condiția corectă pentru valoarea lipsă este IS NULL.',
      'The correct condition for a missing value is IS NULL.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce înseamnă o încălcare a constrângerii UNIQUE?',
      'What does a UNIQUE constraint violation mean?',
    ],
    [
      'Inserarea unui email deja folosit este respinsă. Ce regulă a fost încălcată?',
      'Inserting an email already in use is rejected. Which rule was violated?',
    ],
    ['Valorile trebuie să fie distincte', 'Values must be distinct'],
    [
      ['Coloana trebuie să fie numerică', 'The column must be numeric'],
      ['Rândul trebuie sortat', 'The row must be sorted'],
      [
        'Tabelul trebuie să aibă index clustered',
        'The table must have a clustered index',
      ],
    ],
    [
      'UNIQUE nu permite două valori egale în cheia sau coloana constrânsă.',
      'UNIQUE does not allow duplicate values in the constrained key or column.',
    ],
    [
      'Un email deja existent poate încălca constrângerea UNIQUE.',
      'An existing email can violate the UNIQUE constraint.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce poate semnala o eroare de coloană necunoscută?',
      'What can an unknown-column error indicate?',
    ],
    [
      'Interogarea cere CustomerName, dar tabela are Name. Care este o cauză probabilă?',
      'A query requests CustomerName, but the table has Name. What is a likely cause?',
    ],
    [
      'Identificator de coloană greșit sau absent',
      'Incorrect or missing column identifier',
    ],
    [
      ['Lipsă paranteză în CSS', 'A missing CSS parenthesis'],
      ['Port de rețea blocat', 'A blocked network port'],
      ['Timp de execuție prea mic', 'Insufficient runtime'],
    ],
    [
      'Verifică numele coloanei, tabela și aliasurile folosite în interogare.',
      'Check the column name, table, and aliases used in the query.',
    ],
    [
      'O coloană necunoscută indică adesea o scriere greșită sau o schemă diferită.',
      'An unknown column often indicates a typo or a different schema.',
    ],
    true,
  ),
  f(
    '02-obiecte',
    ['Ce efect are DEFAULT pentru o coloană?', 'What does DEFAULT do for a column?'],
    [
      'O comandă INSERT omite CreatedAt, iar tabela trebuie să completeze automat data. Ce constrângere ajută?',
      'An INSERT omits CreatedAt and the table should fill in the date automatically. Which constraint helps?',
    ],
    [
      'Furnizează valoarea implicită când coloana este omisă',
      'Provides a default value when the column is omitted',
    ],
    [
      ['Respinge toate inserările', 'Rejects every insert'],
      ['Șterge coloana după inserare', 'Drops the column after insertion'],
      ['Transformă valoarea în cheie externă', 'Converts the value to a foreign key'],
    ],
    [
      'DEFAULT furnizează valoarea configurată când instrucțiunea nu oferă una.',
      'DEFAULT supplies the configured value when the statement omits one.',
    ],
    [
      'O valoare DEFAULT poate completa o coloană omisă din INSERT.',
      'A DEFAULT value can fill a column omitted from INSERT.',
    ],
    true,
  ),
  f(
    '02-obiecte',
    [
      'Ce tip de constrângere limitează valorile unui câmp la o listă definită?',
      'Which kind of constraint limits a field to a defined set of values?',
    ],
    [
      'Status trebuie să fie numai New, Active sau Closed. Ce regulă aplici?',
      'Status must be only New, Active, or Closed. Which rule do you apply?',
    ],
    ['CHECK', 'CHECK'],
    [
      ['ORDER BY', 'ORDER BY'],
      ['JOIN', 'JOIN'],
      ['VIEW', 'VIEW'],
    ],
    [
      "Un CHECK poate verifica status IN ('New', 'Active', 'Closed').",
      "A CHECK can validate status IN ('New', 'Active', 'Closed').",
    ],
    [
      'CHECK poate impune domeniul permis al valorilor.',
      'CHECK can enforce the allowed domain of values.',
    ],
    true,
  ),
  f(
    '03-interogare',
    ['Ce face DISTINCT într-un SELECT?', 'What does DISTINCT do in a SELECT?'],
    [
      'Lista trebuie să conțină fiecare oraș o singură dată, chiar dacă sunt mai multe comenzi per oraș. Ce folosești?',
      'A list should show each city once even if many orders exist for it. What do you use?',
    ],
    [
      'Elimină rândurile duplicate din rezultat',
      'Removes duplicate rows from the result',
    ],
    [
      ['Șterge duplicatele din tabel', 'Deletes duplicates from the table'],
      ['Sortează descrescător', 'Sorts descending'],
      ['Grupează permanent datele', 'Permanently groups the data'],
    ],
    [
      'DISTINCT schimbă setul de rezultate, nu șterge rândurile stocate.',
      'DISTINCT changes the result set; it does not delete stored rows.',
    ],
    [
      'SELECT DISTINCT poate returna fiecare valoare distinctă o singură dată.',
      'SELECT DISTINCT can return each distinct value once.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce valoare returnează COUNT(column) pentru valorile NULL?',
      'How does COUNT(column) treat NULL values?',
    ],
    [
      'O coloană Email conține și valori lipsă. Raportul numără numai emailurile prezente. Ce comportament are COUNT(Email)?',
      'An Email column contains missing values. A report should count only present email values. How does COUNT(Email) behave?',
    ],
    ['Ignoră valorile NULL', 'Ignores NULL values'],
    [
      ['Numără fiecare NULL ca 0', 'Counts each NULL as 0'],
      ['Oprește interogarea', 'Stops the query'],
      ['Înlocuiește NULL cu text gol', 'Replaces NULL with empty text'],
    ],
    [
      'COUNT(expression) numără valorile nenule ale expresiei.',
      'COUNT(expression) counts non-NULL values of the expression.',
    ],
    [
      'COUNT(Email) ignoră rândurile unde Email este NULL.',
      'COUNT(Email) ignores rows where Email is NULL.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce poate cauza o încălcare a cheii primare?',
      'What can cause a primary-key violation?',
    ],
    [
      'INSERT încearcă să adauge un ID deja existent. De ce poate fi refuzată operația?',
      'INSERT tries to add an ID that already exists. Why can the operation be rejected?',
    ],
    ['Cheia primară trebuie să rămână unică', 'The primary key must remain unique'],
    [
      ['Cheile primare trebuie să fie text', 'Primary keys must be text'],
      ['Tabelul trebuie sortat alfabetic', 'The table must be alphabetically sorted'],
      ['Comanda SELECT este interzisă', 'SELECT is forbidden'],
    ],
    [
      'Două rânduri nu pot avea aceeași valoare de cheie primară.',
      'Two rows cannot share the same primary-key value.',
    ],
    [
      'Un ID deja utilizat poate cauza încălcarea cheii primare.',
      'An ID that is already used can cause a primary-key violation.',
    ],
    true,
  ),
]

const networkFacts: Fact[] = [
  f(
    '01-infrastructura',
    [
      'Ce prefix CIDR corespunde măștii 255.255.255.0?',
      'Which CIDR prefix matches subnet mask 255.255.255.0?',
    ],
    [
      'O rețea folosește masca 255.255.255.0. Cum notezi prefixul ei?',
      'A network uses subnet mask 255.255.255.0. How do you write its prefix?',
    ],
    ['/24', '/24'],
    [
      ['/16', '/16'],
      ['/8', '/8'],
      ['/30', '/30'],
    ],
    [
      'Primii 24 de biți sunt partea de rețea.',
      'The first 24 bits are the network portion.',
    ],
    ['255.255.255.0 corespunde prefixului /24.', '255.255.255.0 corresponds to /24.'],
    true,
  ),
  f(
    '01-infrastructura',
    ['Ce tip de adresă este 10.2.4.8?', 'What type of address is 10.2.4.8?'],
    [
      'Un laptop folosește 10.2.4.8 în LAN-ul de acasă. Ce categorie de adresă IPv4 este?',
      'A laptop uses 10.2.4.8 on a home LAN. What IPv4 address category is it?',
    ],
    ['Adresă privată', 'Private address'],
    [
      ['Adresă loopback', 'Loopback address'],
      ['Adresă multicast', 'Multicast address'],
      ['Adresă publică rezervată pentru DNS', 'Public address reserved for DNS'],
    ],
    ['10.0.0.0/8 este un interval privat IPv4.', '10.0.0.0/8 is a private IPv4 range.'],
    [
      '10.2.4.8 aparține intervalului privat 10.0.0.0/8.',
      '10.2.4.8 belongs to the private 10.0.0.0/8 range.',
    ],
    true,
  ),
  f(
    '01-infrastructura',
    [
      'Ce reprezintă adresa IP a unei interfețe?',
      'What does an interface IP address represent?',
    ],
    [
      'Un router trebuie să trimită pachetul către rețeaua destinație. Ce informație logică analizează?',
      'A router must forward a packet toward its destination network. Which logical information does it examine?',
    ],
    [
      'Adresă logică folosită la livrarea pachetelor IP',
      'A logical address used for IP packet delivery',
    ],
    [
      ['Adresă fizică imprimată pe cablu', 'A physical address printed on the cable'],
      ['Parolă de utilizator', 'A user password'],
      ['Numele sistemului de fișiere', 'The file-system name'],
    ],
    [
      'IP oferă adresare logică pentru livrarea pachetelor între rețele.',
      'IP provides logical addressing for packet delivery between networks.',
    ],
    [
      'Rutarea IP folosește adrese IP pentru a selecta destinația.',
      'IP routing uses IP addresses to select destinations.',
    ],
    true,
  ),
  f(
    '01-infrastructura',
    [
      'Care este adresa loopback IPv4 uzuală?',
      'What is the common IPv4 loopback address?',
    ],
    [
      'Un tehnician testează stiva IP locală fără să contacteze alt calculator. Ce adresă folosește?',
      'A technician tests the local IP stack without contacting another computer. Which address is used?',
    ],
    ['127.0.0.1', '127.0.0.1'],
    [
      ['169.254.1.1', '169.254.1.1'],
      ['224.0.0.1', '224.0.0.1'],
      ['255.255.255.255', '255.255.255.255'],
    ],
    ['127.0.0.1 se referă la gazda locală.', '127.0.0.1 refers to the local host.'],
    ['127.0.0.1 este o adresă loopback IPv4.', '127.0.0.1 is an IPv4 loopback address.'],
    true,
  ),
  f(
    '01-infrastructura',
    [
      'Ce măsoară lățimea de bandă a unei conexiuni?',
      'What does a connection’s bandwidth measure?',
    ],
    [
      'Un administrator compară capacitatea maximă de transfer a două legături. Ce măsură compară?',
      'An administrator compares the maximum data-carrying capacity of two links. Which measure is compared?',
    ],
    ['Capacitatea de transfer a legăturii', 'The link’s data-carrying capacity'],
    [
      ['Întârzierea unui singur pachet', 'The delay of one packet'],
      ['Numărul de utilizatori conectați', 'The number of connected users'],
      ['Distanța până la router', 'The distance to the router'],
    ],
    [
      'Lățimea de bandă descrie capacitatea; latența descrie întârzierea.',
      'Bandwidth describes capacity; latency describes delay.',
    ],
    [
      'Lățimea de bandă nu este același lucru cu timpul de răspuns.',
      'Bandwidth is not the same as response time.',
    ],
    true,
  ),
  f(
    '01-infrastructura',
    ['Ce descrie cel mai bine o rețea LAN?', 'What best describes a LAN?'],
    [
      'Dispozitivele unei școli sunt conectate în aceeași clădire. Cum se clasifică rețeaua?',
      'Devices at a school are connected within one building. How is the network classified?',
    ],
    ['Rețea locală', 'Local area network'],
    [
      ['Rețea globală', 'Global area network'],
      ['Rețea celulară publică', 'Public cellular network'],
      ['Rețea de stocare exclusivă', 'Storage-only network'],
    ],
    [
      'LAN acoperă o zonă locală, de exemplu o cameră, clădire sau campus.',
      'A LAN covers a local area such as a room, building, or campus.',
    ],
    [
      'O rețea dintr-o singură clădire este de obicei LAN.',
      'A network within one building is typically a LAN.',
    ],
    true,
  ),
  f(
    '02-hardware',
    [
      'Ce dispozitiv transmite pachete între rețele IP?',
      'Which device forwards packets between IP networks?',
    ],
    [
      'Un pachet trebuie trimis de la LAN către Internet. Ce dispozitiv alege următorul hop?',
      'A packet must travel from the LAN to the Internet. Which device chooses the next hop?',
    ],
    ['Router', 'Router'],
    [
      ['Switch de nivel 2', 'Layer 2 switch'],
      ['Patch panel', 'Patch panel'],
      ['Hub USB', 'USB hub'],
    ],
    [
      'Routerul înaintează pachete între rețele folosind informații de nivel 3.',
      'A router forwards packets between networks using layer 3 information.',
    ],
    [
      'Routerul rutează traficul între rețele IP.',
      'A router routes traffic between IP networks.',
    ],
    true,
  ),
  f(
    '02-hardware',
    [
      'Ce adresă folosește un switch Ethernet pentru a comuta cadre?',
      'Which address does an Ethernet switch use to forward frames?',
    ],
    [
      'Switchul decide către ce port LAN trimite un cadru. Ce informație învață?',
      'A switch decides which LAN port should receive a frame. Which information does it learn?',
    ],
    ['Adresa MAC', 'MAC address'],
    [
      ['Numele DNS', 'DNS name'],
      ['URL-ul complet', 'Full URL'],
      ['Parola utilizatorului', 'User password'],
    ],
    [
      'Switchul învață adresele MAC sursă și porturile asociate.',
      'A switch learns source MAC addresses and their associated ports.',
    ],
    [
      'Switchurile Ethernet folosesc adrese MAC la comutarea cadrelor.',
      'Ethernet switches use MAC addresses for frame forwarding.',
    ],
    true,
  ),
  f(
    '02-hardware',
    [
      'Ce dispozitiv conectează clienții Wi-Fi la o rețea cablată?',
      'Which device connects Wi-Fi clients to a wired network?',
    ],
    [
      'Angajații trebuie să se conecteze prin Wi-Fi la LAN-ul existent. Ce instalezi?',
      'Employees need Wi-Fi access to an existing LAN. What do you install?',
    ],
    ['Punct de acces wireless', 'Wireless access point'],
    [
      ['Patch panel', 'Patch panel'],
      ['UPS', 'UPS'],
      ['Modem dial-up', 'Dial-up modem'],
    ],
    [
      'Punctul de acces conectează clienții wireless la rețeaua locală.',
      'An access point connects wireless clients to the local network.',
    ],
    [
      'Un access point oferă acces Wi-Fi către LAN.',
      'An access point provides Wi-Fi access to the LAN.',
    ],
    true,
  ),
  f(
    '02-hardware',
    [
      'Ce mediu folosește uzual Ethernetul pe cupru?',
      'Which medium is commonly used for copper Ethernet?',
    ],
    [
      'Un PC se conectează la switch prin cablul de rețea clasic cu mufă RJ-45. Ce tip de cablu este?',
      'A PC connects to a switch using a standard network cable with an RJ-45 plug. What type of cable is it?',
    ],
    ['Pereche torsadată', 'Twisted pair'],
    [
      ['Cablu audio TRS', 'TRS audio cable'],
      ['Cablu serial RS-232', 'RS-232 serial cable'],
      ['Cablu de alimentare', 'Power cable'],
    ],
    [
      'Ethernetul pe cupru folosește uzual cabluri twisted-pair.',
      'Copper Ethernet commonly uses twisted-pair cables.',
    ],
    [
      'Perechea torsadată este un mediu comun pentru Ethernet pe cupru.',
      'Twisted pair is a common medium for copper Ethernet.',
    ],
    true,
  ),
  f(
    '02-hardware',
    ['Ce rol are un modem?', 'What is the role of a modem?'],
    [
      'Conexiunea furnizorului folosește semnalul său de acces, iar rețeaua locală folosește Ethernet. Ce dispozitiv adaptează conexiunea?',
      'The provider uses its own access signal while the LAN uses Ethernet. Which device adapts the connection?',
    ],
    [
      'Adaptează semnalul liniei de acces a furnizorului',
      'Adapts the provider’s access-line signal',
    ],
    [
      ['Atribuie nume DNS', 'Assigns DNS names'],
      ['Stochează parolele Wi-Fi', 'Stores Wi-Fi passwords'],
      ['Comută cadre între porturile LAN', 'Switches frames between LAN ports'],
    ],
    [
      'Modemul adaptează semnalele pentru tehnologia de acces a furnizorului.',
      'A modem adapts signals for the provider’s access technology.',
    ],
    [
      'Modemul oferă interfața către serviciul de acces al furnizorului.',
      'A modem provides the interface to the provider’s access service.',
    ],
    true,
  ),
  f(
    '02-hardware',
    ['Ce face un firewall de rețea?', 'What does a network firewall do?'],
    [
      'Organizația permite HTTPS, dar blochează traficul neautorizat. Ce componentă aplică regulile?',
      'An organization allows HTTPS but blocks unauthorized traffic. Which component enforces the rules?',
    ],
    ['Filtrează traficul după reguli', 'Filters traffic according to rules'],
    [
      ['Traduce HTML în text', 'Translates HTML into text'],
      ['Înlocuiește toate parolele', 'Replaces all passwords'],
      ['Măsoară viteza ventilatorului', 'Measures fan speed'],
    ],
    [
      'Firewallul permite sau blochează traficul conform regulilor de securitate.',
      'A firewall allows or blocks traffic according to security rules.',
    ],
    [
      'Un firewall aplică reguli asupra traficului de rețea.',
      'A firewall enforces rules on network traffic.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    [
      'Ce serviciu rezolvă numele de domeniu în adrese IP?',
      'Which service resolves domain names to IP addresses?',
    ],
    [
      'Browserul primește example.com, dar are nevoie de adresa serverului. Ce serviciu consultă?',
      'A browser receives example.com but needs the server address. Which service does it query?',
    ],
    ['DNS', 'DNS'],
    [
      ['DHCP', 'DHCP'],
      ['SSH', 'SSH'],
      ['NTP', 'NTP'],
    ],
    [
      'DNS rezolvă nume către înregistrări precum adrese IP.',
      'DNS resolves names to records such as IP addresses.',
    ],
    [
      'DNS poate furniza adresa IP asociată unui domeniu.',
      'DNS can provide the IP address associated with a domain.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    [
      'Ce serviciu alocă dinamic adrese IP clienților?',
      'Which service dynamically assigns IP addresses to clients?',
    ],
    [
      'Laptopul primește automat adresa, gateway-ul și DNS-ul la conectare. Ce serviciu asigură configurația?',
      'A laptop automatically receives an address, gateway, and DNS when connecting. Which service provides the configuration?',
    ],
    ['DHCP', 'DHCP'],
    [
      ['DNS', 'DNS'],
      ['HTTP', 'HTTP'],
      ['SMTP', 'SMTP'],
    ],
    [
      'DHCP distribuie configurația IP prin lease-uri.',
      'DHCP distributes IP configuration through leases.',
    ],
    [
      'DHCP poate atribui automat o adresă și alți parametri de rețea.',
      'DHCP can automatically assign an address and other network settings.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    ['Ce port TCP este uzual pentru HTTPS?', 'Which TCP port is commonly used by HTTPS?'],
    [
      'Firewallul trebuie să permită navigarea web securizată standard. Ce port destinație este uzual?',
      'A firewall must allow standard secure web browsing. Which destination port is common?',
    ],
    ['443', '443'],
    [
      ['80', '80'],
      ['22', '22'],
      ['25', '25'],
    ],
    [
      'HTTPS folosește în mod obișnuit TCP portul 443.',
      'HTTPS commonly uses TCP port 443.',
    ],
    [
      'Portul implicit uzual pentru HTTPS este 443.',
      'The common default port for HTTPS is 443.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    ['Ce port standard este asociat DNS?', 'Which standard port is associated with DNS?'],
    [
      'Un administrator verifică traficul de rezolvare către serverul DNS. Ce port standard caută?',
      'An administrator inspects name-resolution traffic to a DNS server. Which standard port is checked?',
    ],
    ['53', '53'],
    [
      ['21', '21'],
      ['110', '110'],
      ['3389', '3389'],
    ],
    [
      'DNS folosește portul 53, de obicei UDP și uneori TCP.',
      'DNS uses port 53, usually UDP and sometimes TCP.',
    ],
    ['Portul standard DNS este 53.', 'The standard DNS port is 53.'],
    true,
  ),
  f(
    '03-protocoale-servicii',
    [
      'Ce protocol oferă confirmări și livrare ordonată?',
      'Which protocol provides acknowledgments and ordered delivery?',
    ],
    [
      'Transferul trebuie să retransmită segmentele pierdute și să reconstruiască un flux ordonat. Ce transport alegi?',
      'A transfer must retransmit lost segments and reconstruct an ordered stream. Which transport do you choose?',
    ],
    ['TCP', 'TCP'],
    [
      ['UDP', 'UDP'],
      ['ICMP', 'ICMP'],
      ['ARP', 'ARP'],
    ],
    [
      'TCP gestionează conexiuni, confirmări, secvențiere și retransmisie.',
      'TCP handles connections, acknowledgments, sequencing, and retransmission.',
    ],
    [
      'TCP oferă livrare fiabilă și ordonată a fluxului.',
      'TCP provides reliable, ordered stream delivery.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    [
      'Ce protocol folosește ping pentru echo request/reply?',
      'Which protocol does ping use for echo request/reply?',
    ],
    [
      'Un tehnician testează accesibilitatea IP cu mesaje echo. Ce protocol este folosit?',
      'A technician tests IP reachability with echo messages. Which protocol is used?',
    ],
    ['ICMP', 'ICMP'],
    [
      ['FTP', 'FTP'],
      ['DHCP', 'DHCP'],
      ['TLS', 'TLS'],
    ],
    [
      'Ping folosește mesaje ICMP echo, dacă acestea nu sunt filtrate.',
      'Ping uses ICMP echo messages unless they are filtered.',
    ],
    [
      'Ping folosește ICMP pentru cerere și răspuns echo.',
      'Ping uses ICMP for echo request and reply.',
    ],
    true,
  ),
  f(
    '04-securitate',
    [
      'Ce protejează HTTPS față de HTTP simplu?',
      'What does HTTPS protect compared with plain HTTP?',
    ],
    [
      'Un utilizator transmite parola printr-o pagină web. Ce protecție oferă TLS în tranzit?',
      'A user submits a password through a web page. What protection does TLS provide in transit?',
    ],
    ['Criptare și integritatea conexiunii', 'Encryption and connection integrity'],
    [
      ['Anonimat complet', 'Complete anonymity'],
      [
        'Protecție împotriva tuturor programelor malițioase',
        'Protection from all malware',
      ],
      ['Disponibilitatea permanentă a serverului', 'Permanent server availability'],
    ],
    [
      'HTTPS protejează traficul, dar nu garantează anonimat sau securitate totală.',
      'HTTPS protects traffic but does not guarantee anonymity or total security.',
    ],
    [
      'HTTPS folosește TLS pentru a proteja traficul client-server.',
      'HTTPS uses TLS to protect client-server traffic.',
    ],
    true,
  ),
  f(
    '04-securitate',
    ['Ce este autentificarea cu doi factori?', 'What is two-factor authentication?'],
    [
      'Accesul cere parolă și cod temporar dintr-o aplicație. Ce măsură este activată?',
      'Access requires a password and a temporary app code. Which measure is enabled?',
    ],
    ['Autentificare cu doi factori', 'Two-factor authentication'],
    [
      ['Criptare simetrică', 'Symmetric encryption'],
      ['NAT static', 'Static NAT'],
      ['Rezervare DHCP', 'DHCP reservation'],
    ],
    [
      'Doi factori folosesc categorii distincte de dovezi de identitate.',
      'Two-factor authentication uses distinct categories of identity evidence.',
    ],
    [
      'Parola și codul din aplicație sunt doi factori diferiți.',
      'A password and an app code are two different factors.',
    ],
    true,
  ),
  f(
    '04-securitate',
    [
      'Ce risc reduce schimbarea parolei Wi-Fi implicite?',
      'What risk is reduced by changing a default Wi-Fi password?',
    ],
    [
      'Punctul de acces folosește încă parola din manualul producătorului. Ce acțiune este potrivită?',
      'The access point still uses the password printed in the vendor manual. Which action is appropriate?',
    ],
    [
      'Înlocuirea cu o parolă unică și puternică',
      'Replacing it with a unique, strong password',
    ],
    [
      ['Dezactivarea criptării', 'Disabling encryption'],
      ['Publicarea parolei', 'Publishing the password'],
      [
        'Folosirea numelui rețelei drept parolă',
        'Using the network name as the password',
      ],
    ],
    [
      'Credentialele implicite sunt publice sau ușor de ghicit și trebuie schimbate.',
      'Default credentials are public or easy to guess and should be changed.',
    ],
    [
      'Schimbarea parolei implicite reduce accesul neautorizat la Wi-Fi.',
      'Changing a default password reduces unauthorized Wi-Fi access.',
    ],
    true,
  ),
  f(
    '04-securitate',
    ['Ce este phishingul?', 'What is phishing?'],
    [
      'Un mesaj fals imită banca și cere credențialele printr-o pagină clonată. Ce atac este?',
      'A fake message impersonates a bank and requests credentials through a cloned page. Which attack is this?',
    ],
    [
      'Tentativă de înșelăciune pentru colectarea datelor',
      'A deception attempt to collect information',
    ],
    [
      ['Rezolvare DNS benignă', 'A benign DNS lookup'],
      ['Actualizare de firmware', 'A firmware update'],
      ['Compresie de trafic', 'Traffic compression'],
    ],
    [
      'Phishingul folosește mesaje sau pagini înșelătoare pentru a fura date.',
      'Phishing uses deceptive messages or pages to steal information.',
    ],
    [
      'Un mesaj fals care încearcă să fure credențiale este phishing.',
      'A fake message attempting to steal credentials is phishing.',
    ],
    true,
  ),
  f(
    '04-securitate',
    ['La ce folosește un VPN?', 'What is a VPN used for?'],
    [
      'Un angajat accesează resurse interne de la distanță printr-un tunel securizat. Ce tehnologie folosește?',
      'An employee accesses internal resources remotely through a secure tunnel. Which technology is used?',
    ],
    ['Rețea privată virtuală', 'Virtual private network'],
    [
      ['Serviciu de nume de domeniu', 'Domain Name System'],
      ['Server local de imprimare', 'Local print server'],
      ['Conexiune Bluetooth deschisă', 'Open Bluetooth connection'],
    ],
    [
      'VPN-ul creează un tunel logic securizat peste o rețea existentă.',
      'A VPN creates a secure logical tunnel over an existing network.',
    ],
    [
      'Un VPN poate proteja traficul dintre utilizatorul la distanță și rețea.',
      'A VPN can protect traffic between a remote user and a network.',
    ],
    true,
  ),
  f(
    '04-securitate',
    [
      'De ce este recomandat WPA2-AES sau WPA3 pentru Wi-Fi?',
      'Why is WPA2-AES or WPA3 recommended for Wi-Fi?',
    ],
    [
      'O rețea folosește criptarea WEP veche. Ce setare modernă ar trebui aleasă dacă dispozitivele o suportă?',
      'A network uses old WEP encryption. Which modern setting should be selected if devices support it?',
    ],
    ['WPA3 sau WPA2 cu AES', 'WPA3 or WPA2 with AES'],
    [
      ['WEP cu cheie scurtă', 'WEP with a short key'],
      ['Rețea deschisă', 'Open network'],
      [
        'Ascunderea SSID-ului ca singură protecție',
        'Hiding the SSID as the only protection',
      ],
    ],
    [
      'WPA2-AES și WPA3 oferă protecții mult mai bune decât WEP sau o rețea deschisă.',
      'WPA2-AES and WPA3 offer much stronger protection than WEP or an open network.',
    ],
    [
      'Ascunderea SSID-ului nu înlocuiește criptarea wireless puternică.',
      'Hiding an SSID does not replace strong wireless encryption.',
    ],
    true,
  ),
  f(
    '04-securitate',
    [
      'Ce metodă de autentificare Wi-Fi este potrivită într-o organizație cu utilizatori individuali?',
      'Which Wi-Fi authentication method fits an organization with individual users?',
    ],
    [
      'Fiecare angajat trebuie să aibă credențiale proprii, revocabile separat. Ce mod este potrivit?',
      'Each employee needs individual credentials that can be revoked separately. Which mode is appropriate?',
    ],
    [
      'WPA-Enterprise cu server de autentificare',
      'WPA-Enterprise with an authentication server',
    ],
    [
      ['O singură parolă deschisă pentru toți', 'One shared open password for everyone'],
      ['WEP partajat', 'Shared WEP'],
      ['Dezactivarea autentificării', 'Disabling authentication'],
    ],
    [
      'Modul enterprise poate autentifica utilizatori individual și centralizat.',
      'Enterprise mode can authenticate users individually and centrally.',
    ],
    [
      'Credențialele separate ușurează revocarea accesului unui singur utilizator.',
      'Separate credentials make it easier to revoke one user’s access.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce comandă Windows afișează configurația IP?',
      'Which Windows command displays IP configuration?',
    ],
    [
      'Tehnicianul are nevoie de adresa, gateway și DNS ale adaptorului. Ce comandă rulează?',
      'A technician needs an adapter’s address, gateway, and DNS. Which command should be run?',
    ],
    ['ipconfig', 'ipconfig'],
    [
      ['tasklist', 'tasklist'],
      ['format', 'format'],
      ['whoami', 'whoami'],
    ],
    [
      'ipconfig afișează configurația IP a adaptoarelor de rețea.',
      'ipconfig displays network adapter IP configuration.',
    ],
    [
      'ipconfig /all poate afișa detalii suplimentare despre adaptori.',
      'ipconfig /all can display additional adapter details.',
    ],
    true,
  ),
  f(
    '05-depanare',
    ['Ce testează nslookup?', 'What does nslookup test?'],
    [
      'Un domeniu nu se rezolvă, iar tehnicianul vrea să interogheze DNS. Ce comandă folosește?',
      'A domain does not resolve and the technician wants to query DNS. Which command is used?',
    ],
    ['Interogări și rezoluție DNS', 'DNS queries and name resolution'],
    [
      ['Starea cablului USB', 'USB cable status'],
      ['Utilizarea RAM', 'RAM usage'],
      ['Tabelul de partiții', 'Partition table'],
    ],
    [
      'nslookup interoghează serverele DNS pentru nume și înregistrări.',
      'nslookup queries DNS servers for names and records.',
    ],
    [
      'nslookup ajută la depanarea rezoluției DNS.',
      'nslookup helps troubleshoot DNS resolution.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce confirmă un ping reușit către gateway?',
      'What does a successful ping to the gateway confirm?',
    ],
    [
      'Stația ajunge la gateway-ul local, dar nu la un site extern. Ce dovedește testul local?',
      'A workstation reaches its local gateway but not an external site. What does the local test prove?',
    ],
    [
      'Conectivitate IP locală până la acel gateway',
      'Local IP connectivity to that gateway',
    ],
    [
      ['Funcționarea tuturor site-urilor Internet', 'That all Internet sites work'],
      ['Rezolvarea tuturor numelor DNS', 'That all DNS names resolve'],
      ['Lipsa tuturor regulilor firewall', 'That no firewall rules exist'],
    ],
    [
      'Ping reușit confirmă doar calea testată, nu întregul Internet.',
      'A successful ping confirms only the tested path, not the entire Internet.',
    ],
    [
      'Ping-ul la gateway confirmă conectivitatea până la gateway.',
      'A ping to the gateway confirms connectivity to that gateway.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce utilitar arată hop-urile către o destinație?',
      'Which utility shows the hops to a destination?',
    ],
    [
      'O conexiune e lentă, iar administratorul vrea să identifice hop-ul problematic. Ce comandă folosește?',
      'A connection is slow and the administrator needs to identify a problematic hop. Which command is used?',
    ],
    ['tracert sau traceroute', 'tracert or traceroute'],
    [
      ['format', 'format'],
      ['net user', 'net user'],
      ['chkdsk', 'chkdsk'],
    ],
    [
      'tracert/traceroute urmărește hop-urile IP spre destinație.',
      'tracert/traceroute traces IP hops toward a destination.',
    ],
    [
      'tracert poate ajuta la localizarea hop-ului unde se oprește ruta.',
      'tracert can help locate the hop where a route stops.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce poți concluziona dacă ping nu primește răspuns?',
      'What can you conclude if ping receives no reply?',
    ],
    [
      'Ping către server nu răspunde. Ce afirmație este corectă înainte de verificări suplimentare?',
      'Ping to a server receives no reply. Which conclusion is valid before further checks?',
    ],
    [
      'Răspunsul ICMP lipsește, dar gazda poate fi totuși activă',
      'The ICMP reply is missing, but the host may still be online',
    ],
    [
      ['Gazda este sigur oprită', 'The host is definitely powered off'],
      ['DNS este sigur defect', 'DNS is definitely broken'],
      ['Cablul este sigur deconectat', 'The cable is definitely disconnected'],
    ],
    [
      'Firewallul poate filtra ICMP; folosește și alte teste potrivite.',
      'A firewall may filter ICMP; use other appropriate tests too.',
    ],
    [
      'Absența răspunsului ping nu dovedește singură că gazda este oprită.',
      'A missing ping reply alone does not prove the host is offline.',
    ],
    true,
  ),
  f(
    '05-depanare',
    [
      'Ce verifici dacă un PC are adresă 169.254.x.x?',
      'What should be checked if a PC has a 169.254.x.x address?',
    ],
    [
      'Stația nu a primit lease DHCP și a ales o adresă link-local. Ce investighezi?',
      'A workstation did not receive a DHCP lease and selected a link-local address. What should be investigated?',
    ],
    [
      'Conexiunea LAN și disponibilitatea serverului DHCP',
      'LAN connectivity and DHCP-server availability',
    ],
    [
      ['Serverul HTTP al site-ului public', 'The public site’s HTTP server'],
      ['Rezoluția CSS în browser', 'CSS resolution in the browser'],
      ['Numele imprimantei', 'The printer name'],
    ],
    [
      '169.254.0.0/16 este folosit pentru autoconfigurare link-local IPv4.',
      '169.254.0.0/16 is used for IPv4 link-local autoconfiguration.',
    ],
    [
      'O adresă 169.254.x.x poate indica eșecul obținerii unui lease DHCP.',
      'A 169.254.x.x address can indicate failure to obtain a DHCP lease.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    ['Ce port TCP folosește uzual SSH?', 'Which TCP port does SSH commonly use?'],
    [
      'O politică firewall permite administrare securizată la distanță prin SSH. Ce port implicit se deschide?',
      'A firewall policy allows secure remote administration over SSH. Which default port is opened?',
    ],
    ['22', '22'],
    [
      ['23', '23'],
      ['53', '53'],
      ['443', '443'],
    ],
    ['SSH folosește uzual TCP portul 22.', 'SSH commonly uses TCP port 22.'],
    [
      'Portul implicit uzual pentru SSH este 22.',
      'The common default port for SSH is 22.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    [
      'Ce port HTTP necriptat este uzual?',
      'Which port is commonly used by unencrypted HTTP?',
    ],
    [
      'Un server web ascultă pe portul implicit necriptat. Ce număr verifici?',
      'A web server listens on the default unencrypted port. Which number do you check?',
    ],
    ['80', '80'],
    [
      ['443', '443'],
      ['25', '25'],
      ['3389', '3389'],
    ],
    [
      'HTTP folosește în mod uzual portul 80; HTTPS folosește uzual 443.',
      'HTTP commonly uses port 80; HTTPS commonly uses 443.',
    ],
    [
      'Portul implicit standard pentru HTTP este 80.',
      'The standard default port for HTTP is 80.',
    ],
    true,
  ),
  f(
    '03-protocoale-servicii',
    [
      'Ce transport este potrivit când viteza contează și aplicația poate tolera pierderi?',
      'Which transport fits when speed matters and the application can tolerate loss?',
    ],
    [
      'Vocea în timp real preferă întârziere mică și gestionează singură eventuale pierderi. Ce transport poate alege?',
      'Real-time voice prefers low delay and handles occasional loss at the application layer. Which transport may it use?',
    ],
    ['UDP', 'UDP'],
    [
      ['TCP', 'TCP'],
      ['FTP', 'FTP'],
      ['ARP', 'ARP'],
    ],
    [
      'UDP are overhead mic și nu garantează retransmiterea sau ordinea datelor.',
      'UDP has low overhead and does not guarantee retransmission or ordering.',
    ],
    [
      'UDP poate fi potrivit pentru trafic sensibil la latență.',
      'UDP may suit latency-sensitive traffic.',
    ],
    true,
  ),
  f(
    '01-infrastructura',
    ['Câte biți are o adresă IPv4?', 'How many bits are in an IPv4 address?'],
    [
      'Un inventar de rețea stochează adresa IPv4 în format numeric binar. Câți biți sunt?',
      'A network inventory stores an IPv4 address in binary form. How many bits are there?',
    ],
    ['32', '32'],
    [
      ['16', '16'],
      ['64', '64'],
      ['128', '128'],
    ],
    [
      'IPv4 are patru octeți, câte 8 biți fiecare.',
      'IPv4 has four octets of 8 bits each.',
    ],
    ['O adresă IPv4 are 32 de biți.', 'An IPv4 address contains 32 bits.'],
    true,
  ),
  f(
    '02-hardware',
    [
      'Ce conector este folosit uzual la Ethernet cu pereche torsadată?',
      'Which connector is commonly used for twisted-pair Ethernet?',
    ],
    [
      'Cablul Cat 6 trebuie introdus în portul Ethernet al unui switch. Ce mufă are la capăt?',
      'A Cat 6 cable must connect to an Ethernet switch port. Which plug is used at its end?',
    ],
    ['RJ-45 (8P8C)', 'RJ-45 (8P8C)'],
    [
      ['USB-C', 'USB-C'],
      ['HDMI', 'HDMI'],
      ['LC duplex', 'LC duplex'],
    ],
    [
      'Ethernet pe cupru folosește uzual mufa 8P8C, numită frecvent RJ-45.',
      'Copper Ethernet commonly uses an 8P8C plug, often called RJ-45.',
    ],
    [
      'RJ-45 este conectorul uzual pentru cabluri Ethernet twisted-pair.',
      'RJ-45 is commonly used for twisted-pair Ethernet cables.',
    ],
    true,
  ),
]

const htmlFacts: Fact[] = [
  f(
    '01-ciclu-viata',
    [
      'Ce face declarația <!doctype html>?',
      'What does the <!doctype html> declaration do?',
    ],
    [
      'Browserul trebuie să afișeze pagina în modul standard HTML. Ce declarație se pune la început?',
      'The browser should render the page in standards mode. Which declaration is placed at the beginning?',
    ],
    ['Declară documentul HTML modern', 'Declares a modern HTML document'],
    [
      ['Încarcă foaia CSS', 'Loads the CSS stylesheet'],
      ['Creează un formular', 'Creates a form'],
      ['Activează JavaScript strict', 'Enables strict JavaScript'],
    ],
    [
      'Doctype îi indică browserului să folosească modul standard.',
      'The doctype tells the browser to use standards mode.',
    ],
    [
      '<!doctype html> este declarația de tip pentru documentele HTML moderne.',
      '<!doctype html> is the doctype declaration for modern HTML documents.',
    ],
    true,
  ),
  f(
    '01-ciclu-viata',
    [
      'Unde se plasează de regulă titlul și metadatele paginii?',
      'Where are a page title and metadata usually placed?',
    ],
    [
      'Pagina setează charset, viewport și titlu înainte de conținutul vizibil. În ce element?',
      'The page sets charset, viewport, and title before visible content. In which element?',
    ],
    ['<head>', '<head>'],
    [
      ['<footer>', '<footer>'],
      ['<main>', '<main>'],
      ['<article>', '<article>'],
    ],
    [
      '<head> conține metadate și referințe la resurse.',
      '<head> contains metadata and resource references.',
    ],
    [
      'Metadatele documentului se declară de regulă în <head>.',
      'Document metadata is generally declared in <head>.',
    ],
    true,
  ),
  f(
    '01-ciclu-viata',
    [
      'Ce atribut oferă text alternativ unei imagini?',
      'Which attribute provides alternative text for an image?',
    ],
    [
      'O diagramă trebuie să poată fi înțeleasă și de un cititor de ecran. Ce atribut adaugi?',
      'A chart should also be understandable to a screen reader. Which attribute do you add?',
    ],
    ['alt', 'alt'],
    [
      ['title', 'title'],
      ['srcset', 'srcset'],
      ['role-only', 'role-only'],
    ],
    [
      'alt oferă un echivalent textual pentru imaginile informative.',
      'alt provides a text alternative for informative images.',
    ],
    [
      'Atributul alt poate transmite sensul imaginii când aceasta nu este disponibilă.',
      'The alt attribute can convey an image’s meaning when the image is unavailable.',
    ],
    true,
  ),
  f(
    '01-ciclu-viata',
    [
      'Ce element semnalează conținutul principal al paginii?',
      'Which element identifies the primary content of a page?',
    ],
    [
      'Pagina are o singură zonă centrală, fără antet și navigare. Ce element semantic alegi?',
      'The page has one central area apart from the header and navigation. Which semantic element do you choose?',
    ],
    ['<main>', '<main>'],
    [
      ['<span>', '<span>'],
      ['<b>', '<b>'],
      ['<small>', '<small>'],
    ],
    [
      'main marchează conținutul principal al documentului.',
      'main marks the primary content of the document.',
    ],
    [
      'Un document ar trebui să aibă o singură regiune <main> vizibilă.',
      'A document should have a single visible <main> region.',
    ],
    true,
  ),
  f(
    '01-ciclu-viata',
    [
      'Ce element semantic este potrivit pentru o știre autonomă?',
      'Which semantic element fits a self-contained news item?',
    ],
    [
      'O știre cu titlu și corp poate fi distribuită independent de restul paginii. Ce element folosești?',
      'A news item with a title and body can be distributed independently of the rest of the page. Which element do you use?',
    ],
    ['<article>', '<article>'],
    [
      ['<br>', '<br>'],
      ['<input>', '<input>'],
      ['<meta>', '<meta>'],
    ],
    [
      'article reprezintă o compoziție autonomă precum o știre sau o postare.',
      'article represents a self-contained composition such as a news item or post.',
    ],
    [
      'O știre autonomă poate fi reprezentată prin <article>.',
      'A self-contained news item can be represented with <article>.',
    ],
    true,
  ),
  f(
    '01-ciclu-viata',
    [
      'Ce comunică atributul lang="ro"?',
      'What does the lang="ro" attribute communicate?',
    ],
    [
      'Cititoarele de ecran trebuie să pronunțe corect textul românesc al documentului. Ce atribut al html setezi?',
      'Screen readers should pronounce a document’s English text correctly. Which html attribute do you set?',
    ],
    ['Limba principală a conținutului', 'The primary language of the content'],
    [
      ['Limba serverului', 'The server language'],
      ['Encodingul imaginilor', 'Image encoding'],
      ['Fontul obligatoriu', 'The required font'],
    ],
    [
      'lang declară limba documentului și ajută tehnologiile asistive.',
      'lang declares the document language and helps assistive technologies.',
    ],
    [
      'Atributul lang ajută instrumentele să interpreteze limba textului.',
      'The lang attribute helps tools interpret the language of the text.',
    ],
    true,
  ),
  f(
    '01-ciclu-viata',
    [
      'Ce element conține navigarea principală a unui site?',
      'Which element contains a site’s primary navigation?',
    ],
    [
      'Legăturile către paginile principale trebuie grupate semantic pentru tehnologiile asistive. Ce element alegi?',
      'Links to main pages should be grouped semantically for assistive technologies. Which element do you choose?',
    ],
    ['<nav>', '<nav>'],
    [
      ['<aside>', '<aside>'],
      ['<mark>', '<mark>'],
      ['<figure>', '<figure>'],
    ],
    [
      'nav marchează blocul de navigare al paginii.',
      'nav marks a page’s navigation block.',
    ],
    [
      'Un bloc de navigare principal se poate marca prin <nav>.',
      'A primary navigation block can be marked with <nav>.',
    ],
    true,
  ),
  f(
    '02-interfata-html5',
    [
      'Ce atribut leagă un label de un input?',
      'Which attribute connects a label to an input?',
    ],
    [
      'Apăsarea textului Email trebuie să focalizeze inputul cu id="email". Ce atribut setezi pe label?',
      'Clicking the Email text should focus the input with id="email". Which label attribute do you set?',
    ],
    ['for="email"', 'for="email"'],
    [
      ['name="email"', 'name="email"'],
      ['target="email"', 'target="email"'],
      ['href="email"', 'href="email"'],
    ],
    [
      'Valoarea for corespunde atributului id al controlului.',
      'The for value matches the control’s id attribute.',
    ],
    [
      'label for="email" se asociază cu input id="email".',
      'label for="email" is associated with input id="email".',
    ],
    true,
  ),
  f(
    '02-interfata-html5',
    [
      'Ce atribut face un câmp obligatoriu în validarea nativă?',
      'Which attribute makes a field required in native validation?',
    ],
    [
      'Formularul nu trebuie să se trimită fără completarea numelui. Ce atribut adaugi?',
      'The form must not submit without a name. Which attribute do you add?',
    ],
    ['required', 'required'],
    [
      ['mandatory', 'mandatory'],
      ['validate="true"', 'validate="true"'],
      ['checked', 'checked'],
    ],
    [
      'required activează verificarea nativă pentru completarea câmpului.',
      'required enables native validation that the field has a value.',
    ],
    [
      'Un input required gol poate bloca trimiterea formularului.',
      'An empty required input can prevent form submission.',
    ],
    true,
  ),
  f(
    '02-interfata-html5',
    [
      'Ce tip de input este potrivit pentru o adresă de e-mail?',
      'Which input type is appropriate for an email address?',
    ],
    [
      'Browserul trebuie să ofere tastatură adaptată și validare de bază pentru un email. Ce tip alegi?',
      'The browser should provide an email-friendly keyboard and basic validation. Which type do you choose?',
    ],
    ['type="email"', 'type="email"'],
    [
      ['type="mailbox"', 'type="mailbox"'],
      ['type="text-email"', 'type="text-email"'],
      ['type="url"', 'type="url"'],
    ],
    [
      'type=email validează forma de bază, dar nu confirmă existența adresei.',
      'type=email checks basic format but does not confirm the address exists.',
    ],
    [
      'Inputul type=email este proiectat pentru adrese de email.',
      'An input of type=email is designed for email addresses.',
    ],
    true,
  ),
  f(
    '02-interfata-html5',
    [
      'Ce atribut furnizează numele parametrului trimis pentru un câmp?',
      'Which attribute supplies the submitted parameter name for a field?',
    ],
    [
      'Serverul așteaptă parametrul user_email când formularul e trimis. Ce atribut al inputului îl definește?',
      'The server expects user_email when the form is submitted. Which input attribute defines it?',
    ],
    ['name="user_email"', 'name="user_email"'],
    [
      ['class="user_email"', 'class="user_email"'],
      ['placeholder="user_email"', 'placeholder="user_email"'],
      ['id="user_email" doar', 'id="user_email" only'],
    ],
    [
      'name definește cheia câmpului în datele formularului.',
      'name defines the field key in submitted form data.',
    ],
    [
      'Atributul name furnizează numele parametrului pentru controlul formularului.',
      'The name attribute provides the parameter name for the form control.',
    ],
    true,
  ),
  f(
    '02-interfata-html5',
    [
      'Ce element construiește o listă derulantă de opțiuni?',
      'Which element creates a drop-down list of options?',
    ],
    [
      'Utilizatorul selectează o țară dintr-o listă. Ce element HTML folosești?',
      'A user selects a country from a list. Which HTML element do you use?',
    ],
    ['<select> cu <option>', '<select> with <option>'],
    [
      ['<datalist> singur', '<datalist> alone'],
      ['<fieldset> fără controale', '<fieldset> without controls'],
      ['<output>', '<output>'],
    ],
    [
      'select conține opțiunile oferite utilizatorului.',
      'select contains the options offered to the user.',
    ],
    [
      'Un dropdown se construiește cu <select> și elemente <option>.',
      'A dropdown is built with <select> and <option> elements.',
    ],
    true,
  ),
  f(
    '02-interfata-html5',
    [
      'Ce element oferă legenda unui grup de câmpuri?',
      'Which element captions a group of fields?',
    ],
    [
      'Mai multe câmpuri de adresă sunt încadrate cu un titlu comun. Ce element reprezintă titlul?',
      'Several address fields are grouped under one caption. Which element provides the caption?',
    ],
    ['<legend> în interiorul <fieldset>', '<legend> inside <fieldset>'],
    [
      ['<caption> în <div>', '<caption> in <div>'],
      ['<summary> în <form>', '<summary> in <form>'],
      ['<title> în <input>', '<title> in <input>'],
    ],
    [
      'fieldset grupează controalele, iar legend le oferă un titlu.',
      'fieldset groups controls and legend gives them a caption.',
    ],
    [
      '<legend> furnizează eticheta grupului <fieldset>.',
      '<legend> provides the caption for a <fieldset> group.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce selector selectează elementul cu id="menu"?',
      'Which selector targets the element with id="menu"?',
    ],
    [
      'Regula trebuie să se aplice unui singur element identificat prin id menu. Ce selector scrii?',
      'The rule must target one element whose id is menu. Which selector do you write?',
    ],
    ['#menu', '#menu'],
    [
      ['.menu', '.menu'],
      ['menu()', 'menu()'],
      ['*menu', '*menu'],
    ],
    [
      '# selectează id; punctul selectează o clasă.',
      '# selects an id; a period selects a class.',
    ],
    ['Selectorul pentru id menu este #menu.', 'The selector for id menu is #menu.'],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce selector selectează elementele cu class="card"?',
      'Which selector targets elements with class="card"?',
    ],
    [
      'Mai multe articole trebuie să primească același stil. Ce selector folosești?',
      'Several articles need the same style. Which selector do you use?',
    ],
    ['.card', '.card'],
    [
      ['#card', '#card'],
      ['card()', 'card()'],
      ['@card', '@card'],
    ],
    ['Punctul selectează o clasă în CSS.', 'A period selects a class in CSS.'],
    [
      'Selectorul .card selectează elementele cu acea clasă.',
      'The .card selector targets elements with that class.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce include box-sizing: border-box în lățimea declarată?',
      'What does box-sizing: border-box include in the declared width?',
    ],
    [
      'Cardul trebuie să includă paddingul și borderul în dimensiunea sa totală. Ce setare alegi?',
      'A card’s total size should include its padding and border. Which setting do you choose?',
    ],
    ['Conținut, padding și border', 'Content, padding, and border'],
    [
      ['Doar marginea exterioară', 'Only the outer margin'],
      ['Numai conținutul', 'Content only'],
      ['Înălțimea fontului', 'Font height'],
    ],
    [
      'Cu border-box, lățimea specificată include padding și border.',
      'With border-box, the specified width includes padding and border.',
    ],
    [
      'border-box face calculul dimensiunii mai previzibil.',
      'border-box makes size calculations more predictable.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce regulă spațiază elementele flex la capetele axei principale?',
      'Which rule spaces flex items at the ends of the main axis?',
    ],
    [
      'Primul element trebuie la stânga, ultimul la dreapta și spațiul liber între ele. Ce valoare folosești?',
      'The first item should be left, the last right, with free space between. Which value do you use?',
    ],
    ['justify-content: space-between', 'justify-content: space-between'],
    [
      ['align-items: space-between', 'align-items: space-between'],
      ['flex-wrap: ends', 'flex-wrap: ends'],
      ['position: justify', 'position: justify'],
    ],
    [
      'justify-content distribuie spațiul pe axa principală a flex containerului.',
      'justify-content distributes space along the flex container’s main axis.',
    ],
    [
      'space-between plasează spațiul liber între elemente.',
      'space-between places free space between items.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    ['La ce este relativă unitatea em?', 'What is the em unit relative to?'],
    [
      'Paddingul unei etichete trebuie să se scaleze odată cu fontul ei. Ce unitate poți folosi?',
      'A label’s padding should scale with its font size. Which unit can you use?',
    ],
    ['Dimensiunea fontului relevant', 'The relevant font size'],
    [
      ['Lățimea viewportului', 'The viewport width'],
      ['Înălțimea viewportului', 'The viewport height'],
      ['Numărul de elemente', 'The number of elements'],
    ],
    [
      'em se raportează la font-size-ul relevant; rem se raportează la rădăcină.',
      'em relates to the relevant font size; rem relates to the root.',
    ],
    [
      'Unitatea em se scalează în raport cu fontul.',
      'The em unit scales relative to the font size.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce declarație creează un container CSS Grid?',
      'Which declaration creates a CSS Grid container?',
    ],
    [
      'Galeria trebuie să aibă rânduri și coloane controlate de CSS Grid. Ce proprietate setezi?',
      'The gallery needs rows and columns controlled by CSS Grid. Which property do you set?',
    ],
    ['display: grid', 'display: grid'],
    [
      ['position: grid', 'position: grid'],
      ['grid: display', 'grid: display'],
      ['layout: table-grid', 'layout: table-grid'],
    ],
    [
      'display:grid activează contextul de layout Grid pentru copiii direcți.',
      'display:grid enables a Grid layout context for direct children.',
    ],
    [
      'Un container grid se declară cu display: grid.',
      'A grid container is declared with display: grid.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce proprietate controlează spațiul dintre rândurile grid?',
      'Which property controls spacing between grid rows?',
    ],
    [
      'O grilă de carduri trebuie să aibă 20px între rânduri. Ce proprietate poți seta?',
      'A card grid needs 20px between rows. Which property can be set?',
    ],
    ['row-gap: 20px', 'row-gap: 20px'],
    [
      ['line-height: 20px', 'line-height: 20px'],
      ['padding-row: 20px', 'padding-row: 20px'],
      ['grid-space-y: 20px', 'grid-space-y: 20px'],
    ],
    [
      'row-gap controlează spațiul dintre rândurile Grid.',
      'row-gap controls spacing between Grid rows.',
    ],
    [
      'row-gap este destinat spațiului dintre rânduri.',
      'row-gap controls space between rows.',
    ],
    true,
  ),
  f(
    '03-formatare-css',
    [
      'Ce pseudo-clasă selectează un control focalizat?',
      'Which pseudo-class selects a focused control?',
    ],
    [
      'Un câmp trebuie evidențiat când utilizatorul îl selectează cu tastatura. Ce pseudo-clasă folosești?',
      'A field should be highlighted when focused by keyboard. Which pseudo-class do you use?',
    ],
    [':focus', ':focus'],
    [
      [':hovered', ':hovered'],
      [':active-text', ':active-text'],
      ['::focused', '::focused'],
    ],
    [
      ':focus se aplică elementului care are focalizarea.',
      ':focus applies to the element that has focus.',
    ],
    [
      ':focus poate stiliza starea de focalizare a unui control.',
      ':focus can style a control’s focused state.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce operator compară strict valoarea și tipul?',
      'Which operator strictly compares both value and type?',
    ],
    [
      'Codul trebuie să distingă numărul 5 de șirul "5". Ce operator alegi?',
      'Code must distinguish number 5 from string "5". Which operator do you choose?',
    ],
    ['===', '==='],
    [
      ['==', '=='],
      ['=', '='],
      ['!== only', '!== only'],
    ],
    [
      '=== nu face conversii implicite de tip înaintea comparației.',
      '=== does not perform implicit type conversion before comparison.',
    ],
    [
      '5 === "5" este false deoarece tipurile diferă.',
      '5 === "5" is false because the types differ.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce metodă atașează un handler de eveniment?',
      'Which method attaches an event handler?',
    ],
    [
      'Butonul trebuie să ruleze o funcție la click fără cod HTML inline. Ce API folosești?',
      'A button should run a function on click without inline HTML code. Which API do you use?',
    ],
    ['addEventListener()', 'addEventListener()'],
    [
      ['setEvent()', 'setEvent()'],
      ['listenHTML()', 'listenHTML()'],
      ['attachFunctionText()', 'attachFunctionText()'],
    ],
    [
      'addEventListener înregistrează callback-uri pentru tipul de eveniment ales.',
      'addEventListener registers callbacks for the selected event type.',
    ],
    [
      'addEventListener("click", handler) conectează handlerul la evenimentul click.',
      'addEventListener("click", handler) attaches the handler to click events.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce returnează document.querySelector(".item")?',
      'What does document.querySelector(".item") return?',
    ],
    [
      'Scriptul trebuie să găsească primul element cu clasa item. Ce rezultat oferă API-ul?',
      'A script must find the first element with class item. What does the API return?',
    ],
    ['Prima potrivire sau null', 'The first match or null'],
    [
      ['Toate potrivirile într-o listă', 'All matches in a list'],
      ['Întotdeauna text HTML', 'Always HTML text'],
      ['Numărul potrivirilor', 'The number of matches'],
    ],
    [
      'querySelector întoarce primul element potrivit sau null.',
      'querySelector returns the first matching element or null.',
    ],
    [
      'querySelector caută o singură primă potrivire.',
      'querySelector returns a single first match.',
    ],
    true,
  ),
  f(
    '04-javascript',
    ['Ce metodă parsează un șir JSON?', 'Which method parses a JSON string?'],
    [
      'API-ul returnează JSON ca text și aplicația trebuie să îl transforme într-un obiect. Ce metodă folosești?',
      'An API returns JSON as text and the application must turn it into an object. Which method do you use?',
    ],
    ['JSON.parse()', 'JSON.parse()'],
    [
      ['JSON.stringify()', 'JSON.stringify()'],
      ['JSON.decodeText()', 'JSON.decodeText()'],
      ['Object.parseJSON()', 'Object.parseJSON()'],
    ],
    [
      'JSON.parse citește șir; JSON.stringify serializează o valoare JavaScript.',
      'JSON.parse reads a string; JSON.stringify serializes a JavaScript value.',
    ],
    [
      'JSON.parse transformă text JSON valid într-o valoare JavaScript.',
      'JSON.parse converts valid JSON text into a JavaScript value.',
    ],
    true,
  ),
  f(
    '04-javascript',
    ['Ce face event.preventDefault()?', 'What does event.preventDefault() do?'],
    [
      'Formularul trebuie validat de cod înaintea navigării implicite la submit. Ce metodă a evenimentului apelezi?',
      'A form must be validated before the default submit navigation. Which event method do you call?',
    ],
    ['Oprește acțiunea implicită a browserului', 'Prevents the browser’s default action'],
    [
      ['Elimină elementul din DOM', 'Removes the element from the DOM'],
      ['Oprește toate event listener-ele', 'Stops all event listeners'],
      ['Reîncarcă pagina', 'Reloads the page'],
    ],
    [
      'preventDefault nu oprește propagarea; stopPropagation face acest lucru.',
      'preventDefault does not stop propagation; stopPropagation does that.',
    ],
    [
      'preventDefault împiedică acțiunea implicită asociată evenimentului.',
      'preventDefault prevents the event’s default action.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce face document.querySelectorAll(".item")?',
      'What does document.querySelectorAll(".item") do?',
    ],
    [
      'Trebuie procesate toate elementele cu clasa item. Ce metodă oferă colecția potrivită?',
      'All elements with class item must be processed. Which method returns the matching collection?',
    ],
    [
      'Returnează o colecție statică a tuturor potrivirilor',
      'Returns a static collection of all matches',
    ],
    [
      [
        'Returnează doar primul element sau null',
        'Returns only the first element or null',
      ],
      ['Șterge potrivirile', 'Deletes the matches'],
      ['Returnează numele clasei ca șir', 'Returns the class name as a string'],
    ],
    [
      'querySelectorAll returnează o NodeList statică a potrivirilor.',
      'querySelectorAll returns a static NodeList of matches.',
    ],
    [
      'querySelectorAll găsește toate elementele care corespund selectorului.',
      'querySelectorAll finds all elements matching the selector.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce valoare este returnată pentru o proprietate obiect inexistentă?',
      'What value is returned for a missing object property?',
    ],
    [
      'Codul citește user.phone, dar obiectul nu are proprietatea phone. Ce obține de regulă?',
      'Code reads user.phone, but the object has no phone property. What is normally obtained?',
    ],
    ['undefined', 'undefined'],
    [
      ['null automat', 'null automatically'],
      ['false automat', 'false automatically'],
      ['NaN întotdeauna', 'NaN always'],
    ],
    [
      'O proprietate absentă returnează undefined, dacă nu există getter sau alt comportament special.',
      'A missing property evaluates to undefined unless a getter or other special behavior applies.',
    ],
    [
      'Proprietatea lipsă phone produce de regulă undefined.',
      'A missing phone property normally evaluates to undefined.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce valoare booleană are Boolean(0)?',
      'What Boolean value does Boolean(0) produce?',
    ],
    [
      'Un script verifică o valoare numerică zero într-o condiție. Ce rezultat boolean primește?',
      'A script checks numeric zero in a condition. Which Boolean result does it get?',
    ],
    ['false', 'false'],
    [
      ['true', 'true'],
      ['undefined', 'undefined'],
      ['"0"', '"0"'],
    ],
    [
      'Valorile numerice 0 și -0 sunt falsy în JavaScript.',
      'Numeric 0 and -0 are falsy in JavaScript.',
    ],
    ['Boolean(0) returnează false.', 'Boolean(0) returns false.'],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce declarație este recomandată pentru o variabilă care nu va fi reatribuită?',
      'Which declaration is recommended for a variable that will not be reassigned?',
    ],
    [
      'Referința la elementul principal rămâne aceeași pe durata scriptului. Ce declarație semnalează lipsa reatribuirii?',
      'The reference to a main element stays the same throughout the script. Which declaration signals no reassignment?',
    ],
    ['const', 'const'],
    [
      ['var always', 'var always'],
      ['static', 'static'],
      ['fixed', 'fixed'],
    ],
    [
      'const interzice reatribuirea legăturii, deși un obiect referit poate rămâne mutabil.',
      'const prevents reassignment of the binding, though a referenced object can still be mutable.',
    ],
    [
      'O legătură declarată cu const nu poate fi reasignată.',
      'A binding declared with const cannot be reassigned.',
    ],
    true,
  ),
  f(
    '04-javascript',
    [
      'Ce proprietate indică elementul care a declanșat evenimentul?',
      'Which property identifies the element that triggered an event?',
    ],
    [
      'Un handler atașat unui buton trebuie să citească butonul efectiv apăsat. Ce proprietate verifică?',
      'A handler attached to a button must read the button that was actually clicked. Which property is checked?',
    ],
    ['event.target', 'event.target'],
    [
      ['event.defaultValue', 'event.defaultValue'],
      ['event.href', 'event.href'],
      ['event.document', 'event.document'],
    ],
    [
      'target este elementul de pe care a pornit evenimentul; currentTarget este elementul cu handlerul.',
      'target is the element that originated the event; currentTarget is the element with the handler.',
    ],
    [
      'event.target indică de obicei elementul care a generat evenimentul.',
      'event.target usually identifies the element that originated the event.',
    ],
    true,
  ),
]

const deviceFacts: Fact[] = [
  f(
    '01-configurare',
    [
      'Ce unealtă Windows afișează și gestionează hardware-ul instalat?',
      'Which Windows tool displays and manages installed hardware?',
    ],
    [
      'Driverul imprimantei trebuie actualizat după o eroare. Ce utilitar deschizi?',
      'The printer driver needs updating after an error. Which utility do you open?',
    ],
    ['Device Manager', 'Device Manager'],
    [
      ['Disk Cleanup', 'Disk Cleanup'],
      ['Task Scheduler', 'Task Scheduler'],
      ['Resource Monitor', 'Resource Monitor'],
    ],
    [
      'Device Manager arată dispozitivele, starea și driverele lor.',
      'Device Manager shows devices, their status, and their drivers.',
    ],
    [
      'Device Manager poate fi folosit pentru verificarea și actualizarea driverelor.',
      'Device Manager can be used to inspect and update drivers.',
    ],
    true,
  ),
  f(
    '01-configurare',
    ['Ce este un driver de dispozitiv?', 'What is a device driver?'],
    [
      'Sistemul de operare trebuie să comunice cu placa audio prin software specific. Ce componentă face legătura?',
      'The operating system must communicate with an audio adapter through specific software. Which component provides the interface?',
    ],
    [
      'Software care permite OS-ului să utilizeze hardware-ul',
      'Software that lets the OS use hardware',
    ],
    [
      ['Un cablu de alimentare', 'A power cable'],
      ['Un cont de utilizator', 'A user account'],
      ['O copie de rezervă', 'A backup'],
    ],
    [
      'Driverul expune funcții hardware sistemului de operare și aplicațiilor.',
      'A driver exposes hardware functions to the operating system and applications.',
    ],
    [
      'Un driver ajută sistemul să comunice cu dispozitivul.',
      'A driver helps the system communicate with a device.',
    ],
    true,
  ),
  f(
    '01-configurare',
    [
      'Ce sistem de fișiere folosește uzual Windows pentru discuri interne?',
      'Which file system does Windows commonly use for internal drives?',
    ],
    [
      'O partiție Windows trebuie să suporte permisiuni și jurnalizare. Ce format este uzual?',
      'A Windows partition should support permissions and journaling. Which format is common?',
    ],
    ['NTFS', 'NTFS'],
    [
      ['ext4', 'ext4'],
      ['APFS', 'APFS'],
      ['FAT12', 'FAT12'],
    ],
    [
      'NTFS oferă caracteristici precum permisiuni și jurnalizare pe Windows.',
      'NTFS provides features such as permissions and journaling on Windows.',
    ],
    [
      'NTFS este un sistem de fișiere uzual pentru volumele Windows moderne.',
      'NTFS is a common file system for modern Windows volumes.',
    ],
    true,
  ),
  f(
    '01-configurare',
    ['Ce reprezintă o partiție?', 'What is a partition?'],
    [
      'Un singur disc fizic trebuie împărțit în volume logice separate. Ce creează administratorul?',
      'One physical disk must be divided into separate logical volumes. What does the administrator create?',
    ],
    ['O regiune logică definită pe disc', 'A logical region defined on a disk'],
    [
      ['Un proces de utilizator', 'A user process'],
      ['Un protocol de rețea', 'A network protocol'],
      ['O regulă firewall', 'A firewall rule'],
    ],
    [
      'Partițiile definesc regiuni logice pe un dispozitiv de stocare.',
      'Partitions define logical regions on a storage device.',
    ],
    [
      'Un disc poate conține mai multe partiții logice.',
      'A disk can contain multiple logical partitions.',
    ],
    true,
  ),
  f(
    '01-configurare',
    ['Ce rol are BIOS/UEFI la pornire?', 'What role does BIOS/UEFI play during startup?'],
    [
      'Înainte ca OS-ul să se încarce, firmware-ul inițializează hardware-ul și găsește dispozitivul bootabil. Ce componentă execută acești pași?',
      'Before the OS loads, firmware initializes hardware and finds a bootable device. Which component performs these steps?',
    ],
    ['BIOS/UEFI', 'BIOS/UEFI'],
    [
      ['DNS', 'DNS'],
      ['NTFS', 'NTFS'],
      ['Shell-ul utilizatorului', 'The user shell'],
    ],
    [
      'Firmware-ul BIOS/UEFI inițializează componentele și pornește procesul de boot.',
      'BIOS/UEFI firmware initializes components and starts the boot process.',
    ],
    [
      'UEFI/BIOS rulează înaintea sistemului de operare.',
      'UEFI/BIOS runs before the operating system.',
    ],
    true,
  ),
  f(
    '01-configurare',
    ['Ce oferă Remote Desktop?', 'What does Remote Desktop provide?'],
    [
      'Tehnicianul administrează de la distanță un PC printr-o sesiune grafică. Ce funcție folosește?',
      'A technician remotely administers a PC through a graphical session. Which feature is used?',
    ],
    [
      'Acces interactiv la desktop prin rețea',
      'Interactive desktop access over a network',
    ],
    [
      ['Curățarea fișierelor temporare', 'Temporary-file cleanup'],
      ['Partiționarea discului', 'Disk partitioning'],
      ['Scanarea automată a memoriei USB', 'Automatic USB scanning'],
    ],
    [
      'Remote Desktop oferă o sesiune interactivă când este configurat și permis.',
      'Remote Desktop provides an interactive session when configured and allowed.',
    ],
    [
      'Remote Desktop permite acces grafic la un computer aflat la distanță.',
      'Remote Desktop allows graphical access to a remote computer.',
    ],
    true,
  ),
  f(
    '01-configurare',
    [
      'Ce măsoară frecvența unui procesor, exprimată în GHz?',
      'What does a processor frequency measured in GHz describe?',
    ],
    [
      'Specificațiile unui CPU indică 3.2 GHz. La ce caracteristică se referă valoarea?',
      'A CPU specification lists 3.2 GHz. Which characteristic does this describe?',
    ],
    ['Rata ciclurilor de ceas', 'The clock-cycle rate'],
    [
      ['Capacitatea discului', 'Disk capacity'],
      ['Memoria video disponibilă', 'Available video memory'],
      ['Numărul de porturi USB', 'The number of USB ports'],
    ],
    [
      'GHz indică miliarde de cicluri pe secundă, nu performanța totală a sistemului.',
      'GHz indicates billions of cycles per second, not total system performance.',
    ],
    [
      'Frecvența CPU este una dintre caracteristicile procesorului.',
      'CPU frequency is one characteristic of a processor.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    [
      'Ce sistem de fișiere Windows suportă ACL-uri uzuale?',
      'Which Windows file system supports common ACLs?',
    ],
    [
      'Un folder NTFS trebuie să permită acces unui grup și să îl refuze altuia. Ce funcție folosești?',
      'An NTFS folder must allow one group and deny another. Which feature do you use?',
    ],
    ['Permisiuni NTFS / ACL', 'NTFS permissions / ACLs'],
    [
      ['Etichete de volum', 'Volume labels'],
      ['Nume de fișier', 'File names'],
      ['Extensii de browser', 'Browser extensions'],
    ],
    [
      'ACL-urile asociază drepturi utilizatorilor și grupurilor.',
      'ACLs associate access rights with users and groups.',
    ],
    [
      'Permisiunile NTFS pot fi stabilite pentru utilizatori și grupuri.',
      'NTFS permissions can be assigned to users and groups.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    [
      'Ce drept permite citirea conținutului unui fișier?',
      'Which permission allows reading a file’s contents?',
    ],
    [
      'Utilizatorul trebuie să deschidă un document, dar nu să îl modifice. Ce drept este suficient?',
      'A user must open a document but not modify it. Which permission is sufficient?',
    ],
    ['Read', 'Read'],
    [
      ['Full Control', 'Full Control'],
      ['Write only', 'Write only'],
      ['Deny execute', 'Deny execute'],
    ],
    [
      'Read permite vizualizarea conținutului fără a acorda automat modificarea.',
      'Read allows viewing content without automatically granting modification.',
    ],
    [
      'Dreptul Read permite citirea fișierului.',
      'The Read permission allows reading the file.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    ['Ce este o copie de backup?', 'What is a backup copy?'],
    [
      'Un document șters accidental trebuie recuperat dintr-o copie anterioară. Ce protecție ajută?',
      'A document was accidentally deleted and must be recovered from an earlier copy. Which safeguard helps?',
    ],
    [
      'O copie separată a datelor pentru recuperare',
      'A separate copy of data for recovery',
    ],
    [
      ['Un shortcut către original', 'A shortcut to the original'],
      ['Un index de căutare', 'A search index'],
      ['O partiție goală', 'An empty partition'],
    ],
    [
      'Backupul păstrează copii recuperabile; un shortcut doar indică originalul.',
      'A backup preserves recoverable copies; a shortcut only points to the original.',
    ],
    [
      'Un backup separat poate restaura date după ștergere sau defectare.',
      'A separate backup can restore data after deletion or failure.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    ['Ce măsoară MB/s?', 'What does MB/s measure?'],
    [
      'Un fișier este copiat la 40 MB/s. Ce proprietate indică această valoare?',
      'A file is copied at 40 MB/s. Which property does this value indicate?',
    ],
    ['Rata de transfer a datelor', 'Data transfer rate'],
    [
      ['Capacitatea totală a discului', 'Total disk capacity'],
      ['Latența de boot', 'Boot latency'],
      ['Numărul fișierelor', 'Number of files'],
    ],
    [
      'MB/s descrie debitul transferului; capacitatea se măsoară în MB sau GB.',
      'MB/s describes throughput; capacity is measured in MB or GB.',
    ],
    [
      'MB/s măsoară cantitatea de date transferată într-o secundă.',
      'MB/s measures data transferred in one second.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    ['Ce este un shortcut în Windows?', 'What is a Windows shortcut?'],
    [
      'Utilizatorul creează pe desktop o pictogramă către un program fără să copieze programul. Ce a creat?',
      'A user creates a desktop icon pointing to a program without copying it. What was created?',
    ],
    ['O legătură către elementul original', 'A link to the original item'],
    [
      ['Un backup complet', 'A full backup'],
      ['O copie de boot', 'A boot copy'],
      ['O partiție nouă', 'A new partition'],
    ],
    [
      'Shortcutul indică spre resursă și nu duplică automat conținutul ei.',
      'A shortcut points to a resource and does not automatically duplicate its contents.',
    ],
    [
      'Ștergerea unui shortcut nu șterge în mod normal fișierul original.',
      'Deleting a shortcut normally does not delete the original file.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    [
      'Ce efect poate avea comprimarea fișierelor?',
      'What effect can file compression have?',
    ],
    [
      'Un folder mare trebuie să ocupe mai puțin spațiu într-o arhivă. Ce operație se aplică?',
      'A large folder should use less space in an archive. Which operation is applied?',
    ],
    [
      'Codifică datele pentru a reduce dimensiunea stocată',
      'Encodes data to reduce stored size',
    ],
    [
      ['Criptează automat cu parolă', 'Automatically encrypts with a password'],
      ['Mărește rezoluția imaginilor', 'Increases image resolution'],
      ['Creează conturi noi', 'Creates new accounts'],
    ],
    [
      'Comprimarea poate reduce dimensiunea, dar nu implică automat criptarea.',
      'Compression can reduce size but does not automatically encrypt data.',
    ],
    [
      'O arhivă comprimată poate ocupa mai puțin spațiu decât sursele.',
      'A compressed archive may use less space than its sources.',
    ],
    true,
  ),
  f(
    '02-acces-date',
    ['La ce folosește coșul de reciclare?', 'What is the Recycle Bin used for?'],
    [
      'Un fișier local este șters și utilizatorul vrea să îl restaureze înainte de golirea coșului. Unde îl caută?',
      'A local file is deleted and the user wants to restore it before the bin is emptied. Where should it be checked?',
    ],
    ['Recycle Bin', 'Recycle Bin'],
    [
      ['Device Manager', 'Device Manager'],
      ['Task Scheduler', 'Task Scheduler'],
      ['DNS cache', 'DNS cache'],
    ],
    [
      'Fișierele șterse local pot rămâne în Recycle Bin până la golire sau eliminare definitivă.',
      'Locally deleted files may remain in the Recycle Bin until it is emptied or bypassed.',
    ],
    [
      'Recycle Bin poate restaura fișierele șterse care se află încă acolo.',
      'The Recycle Bin can restore deleted files that remain there.',
    ],
    true,
  ),
  f(
    '03-securitate',
    [
      'Ce înseamnă principiul privilegiului minim?',
      'What does the principle of least privilege mean?',
    ],
    [
      'Un angajat trebuie să citească rapoarte, dar nu să instaleze software. Ce principiu aplici?',
      'An employee needs to read reports but not install software. Which principle do you apply?',
    ],
    ['Acordarea doar a permisiunilor necesare', 'Granting only the permissions required'],
    [
      ['Administrator pentru toți', 'Administrator access for everyone'],
      ['Dezactivarea backupurilor', 'Disabling backups'],
      ['Partajarea unei parole', 'Sharing one password'],
    ],
    [
      'Privilegiul minim limitează impactul greșelilor și compromiterii contului.',
      'Least privilege limits the impact of mistakes and account compromise.',
    ],
    [
      'Utilizatorii ar trebui să primească doar drepturile necesare sarcinilor lor.',
      'Users should receive only the rights required for their tasks.',
    ],
    true,
  ),
  f(
    '03-securitate',
    ['Ce face autentificarea?', 'What does authentication do?'],
    [
      'Sistemul verifică dacă persoana care prezintă credențialele este cine pretinde. Ce proces este?',
      'A system checks whether the person presenting credentials is who they claim to be. Which process is this?',
    ],
    ['Verifică identitatea utilizatorului', 'Verifies the user’s identity'],
    [
      ['Atribuie doar permisiunile', 'Only assigns permissions'],
      ['Criptează discul', 'Encrypts the disk'],
      ['Copiază fișierele în cloud', 'Copies files to the cloud'],
    ],
    [
      'Autentificarea verifică identitatea; autorizarea determină ce poate face utilizatorul.',
      'Authentication verifies identity; authorization determines what a user may do.',
    ],
    [
      'Parola este un exemplu de dovadă folosită la autentificare.',
      'A password is an example of evidence used for authentication.',
    ],
    true,
  ),
  f(
    '03-securitate',
    [
      'Ce risc reduce criptarea integrală a discului?',
      'What risk does full-disk encryption reduce?',
    ],
    [
      'Laptopul este pierdut, iar discul ar putea fi citit pe alt calculator. Ce protecție ajută?',
      'A laptop is lost and its drive might be read on another computer. Which protection helps?',
    ],
    [
      'Citirea datelor fără cheia de decriptare',
      'Reading data without the decryption key',
    ],
    [
      ['Defectarea mecanică a discului', 'Mechanical drive failure'],
      ['Pierderea încărcătorului', 'Loss of the charger'],
      ['Uitarea numelui dispozitivului', 'Forgetting the device name'],
    ],
    [
      'Criptarea protejează datele în repaus dacă cheile sunt protejate.',
      'Encryption protects data at rest when keys are protected.',
    ],
    [
      'Criptarea poate împiedica accesul la date dacă dispozitivul este pierdut.',
      'Encryption can prevent access to data if a device is lost.',
    ],
    true,
  ),
  f(
    '03-securitate',
    ['Ce este malware?', 'What is malware?'],
    [
      'Un program este conceput să fure informații sau să perturbe sistemul fără acord. Cum se numește?',
      'A program is designed to steal information or disrupt a system without consent. What is it called?',
    ],
    ['Software malițios', 'Malicious software'],
    [
      ['Firmware semnat', 'Signed firmware'],
      ['Actualizare legitimă', 'A legitimate update'],
      ['Backup incremental', 'An incremental backup'],
    ],
    [
      'Malware este software creat cu scop dăunător.',
      'Malware is software created for harmful purposes.',
    ],
    ['Un virus este un tip de malware.', 'A virus is a type of malware.'],
    true,
  ),
  f(
    '03-securitate',
    [
      'De ce se instalează actualizări de securitate?',
      'Why are security updates installed?',
    ],
    [
      'Producătorul a publicat un patch pentru o vulnerabilitate cunoscută. Ce acțiune este potrivită?',
      'The vendor published a patch for a known vulnerability. Which action is appropriate?',
    ],
    [
      'Aplicarea patchului verificat conform politicii organizației',
      'Applying the verified patch under organizational policy',
    ],
    [
      ['Dezinstalarea antivirusului', 'Uninstalling antivirus'],
      ['Dezactivarea firewallului', 'Disabling the firewall'],
      ['Publicarea parolei', 'Publishing the password'],
    ],
    [
      'Actualizările pot remedia vulnerabilități și defecte.',
      'Updates can fix vulnerabilities and defects.',
    ],
    [
      'Patch-urile pot remedia vulnerabilități cunoscute.',
      'Patches can fix known vulnerabilities.',
    ],
    true,
  ),
  f(
    '03-securitate',
    [
      'Ce acțiune protejează sesiunea când utilizatorul pleacă de la PC?',
      'What protects a session when a user steps away from a PC?',
    ],
    [
      'Angajatul se îndepărtează temporar de stația nesupravegheată. Ce pas este potrivit?',
      'An employee temporarily leaves an unattended workstation. Which action is appropriate?',
    ],
    ['Blocarea ecranului', 'Locking the screen'],
    [
      ['Oprirea antivirusului', 'Turning off antivirus'],
      ['Dezactivarea contului permanent', 'Permanently disabling the account'],
      ['Partajarea desktopului', 'Sharing the desktop'],
    ],
    [
      'Blocarea cere reautentificare pentru a relua sesiunea.',
      'Locking requires reauthentication to resume the session.',
    ],
    [
      'Blocarea ecranului împiedică accesul imediat la sesiunea nesupravegheată.',
      'Locking the screen prevents immediate access to the unattended session.',
    ],
    true,
  ),
  f(
    '03-securitate',
    [
      'Ce metodă protejează cel mai bine contul administrator local?',
      'Which practice best protects a local administrator account?',
    ],
    [
      'Mai multe calculatoare folosesc aceeași parolă administrator ușor de ghicit. Ce schimbare e mai sigură?',
      'Several computers use the same easy-to-guess administrator password. Which change is safer?',
    ],
    [
      'Parole unice, puternice și acces limitat',
      'Unique, strong passwords and limited access',
    ],
    [
      ['Aceeași parolă publicată tuturor', 'The same password shared with everyone'],
      ['Parolă goală în LAN', 'A blank password on the LAN'],
      ['Dezactivarea actualizărilor', 'Disabling updates'],
    ],
    [
      'Credentialele unice limitează propagarea compromiterii între dispozitive.',
      'Unique credentials limit compromise from spreading between devices.',
    ],
    [
      'Parolele administratorului trebuie protejate și diferite de cele implicite.',
      'Administrator passwords should be protected and changed from defaults.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce utilitar afișează procese și utilizarea CPU în Windows?',
      'Which utility shows processes and CPU usage in Windows?',
    ],
    [
      'Calculatorul este lent și trebuie găsită aplicația care consumă CPU. Ce utilitar deschizi?',
      'A computer is slow and the application using CPU must be found. Which utility do you open?',
    ],
    ['Task Manager', 'Task Manager'],
    [
      ['Registry Editor', 'Registry Editor'],
      ['Character Map', 'Character Map'],
      ['Disk Cleanup', 'Disk Cleanup'],
    ],
    [
      'Task Manager arată procese și resurse precum CPU, memorie și disc.',
      'Task Manager shows processes and resources such as CPU, memory, and disk.',
    ],
    [
      'Task Manager poate identifica un proces cu utilizare ridicată a resurselor.',
      'Task Manager can identify a process with high resource usage.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Unde găsești jurnalele Windows de sistem și aplicații?',
      'Where can you find Windows system and application logs?',
    ],
    [
      'O aplicație s-a oprit, iar tehnicianul caută ora și detaliile evenimentului. Ce utilitar consultă?',
      'An application stopped and the technician needs the event time and details. Which utility should be checked?',
    ],
    ['Event Viewer', 'Event Viewer'],
    [
      ['Device Manager', 'Device Manager'],
      ['Paint', 'Paint'],
      ['Disk Management', 'Disk Management'],
    ],
    [
      'Event Viewer organizează jurnalele aplicațiilor, securității și sistemului.',
      'Event Viewer organizes application, security, and system logs.',
    ],
    [
      'Event Viewer poate afișa detalii și timestamp-uri ale erorilor.',
      'Event Viewer can show error details and timestamps.',
    ],
    true,
  ),
  f(
    '04-depanare',
    ['Ce face Safe Mode?', 'What does Safe Mode do?'],
    [
      'Windows pornește cu un set limitat de drivere și servicii pentru izolarea problemei. În ce mod a pornit?',
      'Windows starts with a limited set of drivers and services to isolate an issue. Which mode is this?',
    ],
    ['Mod sigur', 'Safe Mode'],
    [
      ['Sleep mode', 'Sleep mode'],
      ['Airplane mode', 'Airplane mode'],
      ['Read-only mode', 'Read-only mode'],
    ],
    [
      'Safe Mode încarcă un set redus de componente pentru depanare.',
      'Safe Mode loads a reduced set of components for troubleshooting.',
    ],
    [
      'Safe Mode poate ajuta la izolarea unei probleme de driver sau pornire.',
      'Safe Mode can help isolate a driver or startup problem.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce utilitar grafic prezintă discuri, partiții și volume?',
      'Which graphical utility displays disks, partitions, and volumes?',
    ],
    [
      'Un tehnician verifică layoutul volumelor înainte să extindă o partiție. Ce deschide?',
      'A technician inspects volume layout before extending a partition. Which utility is opened?',
    ],
    ['Disk Management', 'Disk Management'],
    [
      ['Event Viewer', 'Event Viewer'],
      ['Task Scheduler', 'Task Scheduler'],
      ['Firewall settings', 'Firewall settings'],
    ],
    [
      'Disk Management prezintă discuri, partiții și volume.',
      'Disk Management displays disks, partitions, and volumes.',
    ],
    [
      'Disk Management este utilitarul pentru gestionarea volumelor.',
      'Disk Management is the utility for managing volumes.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce verifici întâi când un periferic nu răspunde?',
      'What should you check first when a peripheral does not respond?',
    ],
    [
      'Mouse-ul nu funcționează după conectare. Care este un prim pas sigur?',
      'A mouse does not work after connection. What is a safe first step?',
    ],
    [
      'Conexiunea fizică, alimentarea și starea dispozitivului',
      'Physical connection, power, and device status',
    ],
    [
      ['Ștergerea tuturor driverelor', 'Deleting every driver'],
      ['Formatarea discului sistem', 'Formatting the system drive'],
      ['Dezactivarea actualizărilor', 'Disabling updates'],
    ],
    [
      'Verificările de bază izolează problema înainte de schimbări ample.',
      'Basic checks isolate the issue before broader changes.',
    ],
    [
      'Verificarea cablului și alimentării este un prim pas rezonabil.',
      'Checking the cable and power is a reasonable first step.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce utilitar verifică erori de sistem de fișiere pe un volum?',
      'Which utility checks a volume for file-system errors?',
    ],
    [
      'Un volum NTFS raportează erori logice. Ce utilitar de linie de comandă poate verifica volumul?',
      'An NTFS volume reports logical errors. Which command-line utility can check the volume?',
    ],
    ['chkdsk', 'chkdsk'],
    [
      ['ipconfig', 'ipconfig'],
      ['sfc /scannow', 'sfc /scannow'],
      ['nslookup', 'nslookup'],
    ],
    [
      'chkdsk verifică un volum pentru erori de sistem de fișiere și probleme logice.',
      'chkdsk checks a volume for file-system errors and logical issues.',
    ],
    [
      'chkdsk este utilitarul Windows pentru verificarea discului.',
      'chkdsk is the Windows disk-checking utility.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce instrument repară fișierele de sistem Windows protejate?',
      'Which tool repairs protected Windows system files?',
    ],
    [
      'Fișierele de sistem pot fi corupte. Ce comandă verifică și încearcă să repare fișierele protejate?',
      'System files may be corrupted. Which command checks and attempts to repair protected files?',
    ],
    ['sfc /scannow', 'sfc /scannow'],
    [
      ['ipconfig /all', 'ipconfig /all'],
      ['diskpart', 'diskpart'],
      ['netstat -an', 'netstat -an'],
    ],
    [
      'System File Checker verifică fișierele de sistem protejate și încearcă repararea lor.',
      'System File Checker verifies protected system files and attempts repair.',
    ],
    [
      'sfc /scannow lansează o verificare a fișierelor sistemului.',
      'sfc /scannow starts a system-file check.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce pas poate remedia o problemă apărută după actualizarea driverului?',
      'What step may fix an issue that began after a driver update?',
    ],
    [
      'Imprimanta a încetat să funcționeze imediat după instalarea unui driver nou. Ce opțiune investighezi?',
      'A printer stopped working immediately after a new driver was installed. Which option do you investigate?',
    ],
    [
      'Revenirea la driverul anterior compatibil',
      'Rolling back to the previous compatible driver',
    ],
    [
      ['Ștergerea tuturor documentelor', 'Deleting all documents'],
      ['Schimbarea fusului orar', 'Changing the time zone'],
      ['Dezactivarea contului utilizator', 'Disabling the user account'],
    ],
    [
      'Device Manager poate oferi Roll Back Driver dacă versiunea anterioară este disponibilă.',
      'Device Manager may offer Roll Back Driver if the previous version is available.',
    ],
    [
      'Revenirea la driverul anterior poate izola o regresie recentă.',
      'Rolling back may help isolate a recent driver regression.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce setare verifici dacă laptopul se oprește prea repede când este inactiv?',
      'Which setting should you check if a laptop powers down too quickly while idle?',
    ],
    [
      'Laptopul intră în repaus după un minut, deși bateria este încărcată. Unde ajustezi comportamentul?',
      'A laptop sleeps after one minute even though its battery is charged. Where can the behavior be adjusted?',
    ],
    [
      'Setările Power & sleep / planul de alimentare',
      'Power & sleep settings / power plan',
    ],
    [
      ['Permisiunile NTFS', 'NTFS permissions'],
      ['Ordinea coloanelor din Task Manager', 'Task Manager column order'],
      ['Cache-ul DNS', 'DNS cache'],
    ],
    [
      'Planul de alimentare controlează comportamente precum repausul și oprirea ecranului.',
      'The power plan controls behaviors such as sleep and display turn-off.',
    ],
    [
      'Setările de alimentare determină după cât timp dispozitivul intră în repaus.',
      'Power settings determine when the device enters sleep.',
    ],
    true,
  ),
  f(
    '04-depanare',
    [
      'Ce pas verifici când un PC nu pornește după pană de curent?',
      'What should you check when a PC will not start after a power outage?',
    ],
    [
      'Desktopul nu dă niciun semn după întreruperea curentului. Care este un prim pas sigur?',
      'A desktop shows no sign of power after an outage. What is a safe first check?',
    ],
    [
      'Cablul, priza și întrerupătorul sursei de alimentare',
      'The cable, outlet, and power-supply switch',
    ],
    [
      ['Ștergerea jurnalelor Event Viewer', 'Deleting Event Viewer logs'],
      ['Schimbarea parolei Wi-Fi', 'Changing the Wi-Fi password'],
      ['Golirea Recycle Bin', 'Emptying the Recycle Bin'],
    ],
    [
      'Verifică întâi alimentarea externă înainte de intervenții hardware interne.',
      'Check external power first before internal hardware intervention.',
    ],
    [
      'Cablul și priza sunt verificări inițiale sigure când dispozitivul nu pornește.',
      'The cable and outlet are safe initial checks when a device will not start.',
    ],
    true,
  ),
]

function take(facts: Fact[], module: string, count: number): Fact[] {
  return facts.filter((fact) => fact.module === module).slice(0, count)
}

export const expandedQuestions: Record<string, Question[]> = {
  python: buildCourse('python', [
    ...pythonFacts,
    f(
      '06-module-instrumente',
      [
        'Ce modul standard oferă data și ora curentă locală?',
        'Which standard module provides the current local date and time?',
      ],
      [
        'Un raport trebuie să includă data și ora sistemului în momentul generării. Ce modul importă?',
        'A report must include the system date and time when it is generated. Which module should be imported?',
      ],
      ['datetime', 'datetime'],
      [
        ['random', 'random'],
        ['math', 'math'],
        ['statistics', 'statistics'],
      ],
      [
        'Modulul datetime oferă clase pentru date, ore și diferențe de timp.',
        'The datetime module provides classes for dates, times, and time differences.',
      ],
      [
        'datetime este modulul standard folosit pentru lucrul cu date și ore.',
        'datetime is the standard module used for dates and times.',
      ],
      true,
    ),
  ]),
  'baze-de-date': buildCourse('baze-de-date', databaseFacts.slice(0, 29)),
  retelistica: buildCourse('retelistica', [
    ...take(networkFacts, '01-infrastructura', 6),
    ...take(networkFacts, '02-hardware', 6),
    ...take(networkFacts, '03-protocoale-servicii', 6),
    ...take(networkFacts, '04-securitate', 6),
    ...take(networkFacts, '05-depanare', 5),
  ]),
  html5: buildCourse('html5', htmlFacts),
  'configurare-dispozitive': buildCourse('configurare-dispozitive', deviceFacts),
}
