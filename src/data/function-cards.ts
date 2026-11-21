export type FunctionCard = {
  id: string
  title: string
  category: [string, string]
  purpose: [string, string]
  code: string
  output: string
  mistake: [string, string]
  objective: string
}
export const functionCards: FunctionCard[] = [
  {
    id: 'print-return',
    title: 'print / return',
    category: ['Afișare și rezultat', 'Display and return'],
    purpose: [
      'print afișează; return trimite o valoare apelantului și încheie funcția.',
      'print displays; return sends a value to the caller and ends the function.',
    ],
    code: 'def double(n):\n    return n * 2\nprint(double(3))',
    output: '6',
    mistake: [
      'Nu confunda textul afișat cu valoarea returnată.',
      'Do not confuse displayed text with a returned value.',
    ],
    objective: '4.2',
  },
  {
    id: 'input',
    title: 'input()',
    category: ['Citirea datelor', 'Reading input'],
    purpose: [
      'input returnează un șir, chiar dacă utilizatorul introduce cifre.',
      'input returns a string, even when the user enters digits.',
    ],
    code: "value = '12'  # a sample input value\nprint(int(value) + 1)",
    output: '13',
    mistake: [
      'Convertește explicit înainte de calcule; textul invalid poate produce ValueError.',
      'Convert explicitly before calculations; invalid text may raise ValueError.',
    ],
    objective: '3.2',
  },
  {
    id: 'conversions',
    title: 'int() / float() / str()',
    category: ['Conversii', 'Conversions'],
    purpose: [
      'Conversia construiește o valoare de tipul cerut când reprezentarea este validă.',
      'Conversion constructs a value of the requested type when its representation is valid.',
    ],
    code: "print(int('12'), float('2.5'), str(7))",
    output: '12 2.5 7',
    mistake: [
      "int('2.5') nu este valid; int(float('2.5')) produce 2.",
      "int('2.5') is invalid; int(float('2.5')) produces 2.",
    ],
    objective: '1.2',
  },
  {
    id: 'len',
    title: 'len()',
    category: ['Colecții', 'Collections'],
    purpose: [
      'Returnează numărul elementelor, nu dimensiunea în octeți.',
      'Returns the number of items, not the size in bytes.',
    ],
    code: 'print(len([1, [2, 3]]))',
    output: '2',
    mistake: [
      'Lista interioară este un singur element al listei exterioare.',
      'The inner list is one item in the outer list.',
    ],
    objective: '1.2',
  },
  {
    id: 'range',
    title: 'range()',
    category: ['Bucle', 'Loops'],
    purpose: [
      'Reprezintă o secvență de întregi; limita stop nu este inclusă.',
      'Represents an integer sequence; the stop boundary is excluded.',
    ],
    code: 'print(list(range(2, 7, 2)))',
    output: '[2, 4, 6]',
    mistake: [
      'range produce un obiect range, nu o listă; folosește list doar când ai nevoie.',
      'range produces a range object, not a list; use list only when needed.',
    ],
    objective: '2.2',
  },
  {
    id: 'append-extend',
    title: 'append() / extend()',
    category: ['Liste', 'Lists'],
    purpose: [
      'append adaugă un element; extend adaugă elementele unui iterabil.',
      'append adds one item; extend adds items from an iterable.',
    ],
    code: 'a = [1]\na.append([2, 3])\nb = [1]\nb.extend([2, 3])\nprint(a)\nprint(b)',
    output: '[1, [2, 3]]\n[1, 2, 3]',
    mistake: [
      'Ambele modifică lista și returnează None.',
      'Both modify the list and return None.',
    ],
    objective: '1.2',
  },
  {
    id: 'sort-sorted',
    title: 'sort() / sorted()',
    category: ['Liste', 'Lists'],
    purpose: [
      'sort modifică lista; sorted întoarce o listă nouă.',
      'sort modifies the list; sorted returns a new list.',
    ],
    code: 'a = [3, 1, 2]\nb = sorted(a)\nprint(a)\nprint(b)\nprint(a.sort())',
    output: '[3, 1, 2]\n[1, 2, 3]\nNone',
    mistake: [
      'Nu atribui a = a.sort(); ai înlocui lista cu None.',
      'Do not assign a = a.sort(); it would replace the list with None.',
    ],
    objective: '1.2',
  },
  {
    id: 'split-join',
    title: 'split() / join()',
    category: ['Șiruri', 'Strings'],
    purpose: [
      'split împarte un șir; join combină șiruri dintr-un iterabil folosind un separator.',
      'split divides a string; join combines strings from an iterable using a separator.',
    ],
    code: "parts = 'Ana,Ion'.split(',')\nprint(' / '.join(parts))",
    output: 'Ana / Ion',
    mistake: [
      'join cere elemente de tip str; nu convertește automat întregii.',
      'join requires str items; it does not automatically convert integers.',
    ],
    objective: '1.2',
  },
  {
    id: 'with-open',
    title: 'with / open()',
    category: ['Fișiere', 'Files'],
    purpose: [
      'with gestionează închiderea fișierului, inclusiv când apare o excepție.',
      'with manages file closing, including when an exception occurs.',
    ],
    code: "with open('bacit-demo-example.txt', 'w', encoding='utf-8') as f:\n    f.write('BacIt')\nwith open('bacit-demo-example.txt', encoding='utf-8') as f:\n    print(f.read())",
    output: 'BacIt',
    mistake: [
      'Modul w înlocuiește conținutul existent; a adaugă la sfârșit.',
      'Mode w replaces existing contents; a appends to the end.',
    ],
    objective: '3.1',
  },
  {
    id: 'exceptions',
    title: 'try / except / finally',
    category: ['Erori', 'Errors'],
    purpose: [
      'except tratează excepția potrivită; finally se execută la ieșirea din structură.',
      'except handles the matching exception; finally runs when leaving the construct.',
    ],
    code: "try:\n    int('abc')\nexcept ValueError:\n    print('invalid')\nfinally:\n    print('done')",
    output: 'invalid\ndone',
    mistake: [
      'Prinde excepția specifică în loc să ascunzi toate erorile.',
      'Catch the specific exception rather than hiding every error.',
    ],
    objective: '5.2',
  },
  {
    id: 'assertEqual',
    title: 'unittest.assertEqual()',
    category: ['Teste unitare', 'Unit testing'],
    purpose: [
      'Compară valorile folosind semantica egalității, nu identitatea.',
      'Compares values using equality semantics, not identity.',
    ],
    code: "import unittest\ncase = unittest.TestCase()\ncase.assertEqual([1, 2], [1, 2])\nprint('ok')",
    output: 'ok',
    mistake: [
      'assertIs cere același obiect; assertEqual acceptă obiecte diferite cu valori egale.',
      'assertIs requires the same object; assertEqual accepts different objects with equal values.',
    ],
    objective: '5.3',
  },
  {
    id: 'assertIn',
    title: 'assertIn / assertIsInstance',
    category: ['Teste unitare', 'Unit testing'],
    purpose: [
      'Verifică apartenența și, respectiv, relația dintre obiect și tip.',
      'Check membership and the object/type relationship, respectively.',
    ],
    code: "import unittest\ncase = unittest.TestCase()\ncase.assertIn(2, [1, 2])\ncase.assertIsInstance(3, int)\nprint('ok')",
    output: 'ok',
    mistake: [
      'assertTrue verifică valoarea de adevăr; nu înlocuiește toate verificările specifice.',
      'assertTrue checks truthiness; it does not replace every specific assertion.',
    ],
    objective: '5.3',
  },
  {
    id: 'pydoc',
    title: 'pydoc',
    category: ['Documentare', 'Documentation'],
    purpose: [
      'Generează documentație din obiecte Python și docstring-uri.',
      'Generates documentation from Python objects and docstrings.',
    ],
    code: 'def greet(name):\n    """Return a greeting."""\n    return \'Hello \' + name\nprint(greet.__doc__)',
    output: 'Return a greeting.',
    mistake: [
      'În terminal: python -m pydoc math. Exemplul arată docstring-ul, nu pornește un server.',
      'In a terminal: python -m pydoc math. The example shows a docstring without starting a server.',
    ],
    objective: '4.1',
  },
  {
    id: 'argv',
    title: 'sys.argv',
    category: ['Argumente', 'Arguments'],
    purpose: [
      'Este lista argumentelor liniei de comandă; indexul 0 este numele scriptului.',
      'It is the command-line argument list; index 0 is the script name.',
    ],
    code: "args = ['app.py', 'Ana']  # represents sys.argv\nprint(args[1])",
    output: 'Ana',
    mistake: [
      'Verifică numărul argumentelor înainte de accesarea indexului 1.',
      'Check the argument count before accessing index 1.',
    ],
    objective: '3.2',
  },
  {
    id: 'ospath',
    title: 'os.path.exists()',
    category: ['Fișiere', 'Files'],
    purpose: [
      'Testează existența unei căi; nu garantează permisiunea de citire.',
      'Checks path existence; it does not guarantee read permission.',
    ],
    code: "import os.path\nprint(isinstance(os.path.exists('missing-file.txt'), bool))",
    output: 'True',
    mistake: [
      'Existența poate să se schimbe între verificare și deschidere; tratează erorile la open.',
      'Existence can change between checking and opening; handle errors from open.',
    ],
    objective: '6.1',
  },
  {
    id: 'math',
    title: 'math.frexp / isnan / fmod',
    category: ['Module', 'Modules'],
    purpose: [
      'frexp descompune numărul; isnan identifică NaN; fmod calculează restul cu reguli pentru numere reale.',
      'frexp decomposes a number; isnan identifies NaN; fmod computes a remainder with floating-point rules.',
    ],
    code: "import math\nprint(math.frexp(8.0))\nprint(math.isnan(float('nan')))\nprint(math.fmod(-7, 3))",
    output: '(0.5, 4)\nTrue\n-1.0',
    mistake: [
      'fmod și operatorul % pot avea semne diferite pentru operanzi negativi.',
      'fmod and the % operator may give different signs for negative operands.',
    ],
    objective: '6.2',
  },
  {
    id: 'datetime',
    title: 'datetime.strftime()',
    category: ['Module', 'Modules'],
    purpose: [
      'Formatează o dată cu directive precum %Y, %m și %d.',
      'Formats a date using directives such as %Y, %m and %d.',
    ],
    code: "from datetime import datetime\nprint(datetime(2026, 11, 6).strftime('%Y-%m-%d'))",
    output: '2026-11-06',
    mistake: ['%m înseamnă lună; %M înseamnă minut.', '%m means month; %M means minute.'],
    objective: '6.2',
  },
]
