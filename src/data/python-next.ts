import { bilingual as b } from '@/lib/translations'
import { makeQuestions, output as o, type QuestionSpec } from './question-builders'
import { freshBank } from './fresh-questions'
import type { Course } from './courses'

export const pythonNextModules = [
  ['01-fundamentals', 'Fundamente și tipuri', 'Fundamentals and types'],
  ['02-flow', 'Decizii și bucle', 'Decisions and loops'],
  ['03-collections', 'Colecții și comprehensiuni', 'Collections and comprehensions'],
  ['04-functions', 'Funcții și structură', 'Functions and structure'],
  ['05-files', 'Fișiere și date', 'Files and data'],
  ['06-errors', 'Erori și testare', 'Errors and testing'],
  ['07-objects', 'Obiecte și module', 'Objects and modules'],
] as const

export const pythonNextCourse: Course = {
  id: 'python-next-generation',
  title: 'Python Next Generation',
  examTitle: b(
    'Python Next Generation — teorie și practică',
    'Python Next Generation — theory and practice',
  ),
  tagline: b(
    '137 de întrebări și 21 de laburi cu Python executabil. Simulare combinată sau practică separată.',
    '137 questions and 21 labs with executable Python. Combined simulation or separate practice.',
  ),
  hue: 155,
  icon: 'python',
  questionTarget: 137,
  exam: { questions: 35, minutes: 60, passPercent: 70 },
  modules: pythonNextModules.map(([id, ro, en], i) => ({
    id,
    title: b(ro, en),
    description: b(ro, en),
    weight: i === 6 ? 16 : 14,
    lessons: [],
  })),
}

// Each trace covers a different operation or edge case. Correct outputs are also
// executed against CPython by the content verification script.
type Trace = [string, string, string, string]
const traces: Trace[][] = [
  [
    [
      'print(type(3.0).__name__)',
      'float',
      'Un literal cu punct zecimal este float.',
      'A decimal literal is a float.',
    ],
    [
      'print(round(2.75, 1))',
      '2.8',
      'round rotunjește la o zecimală.',
      'round rounds to one decimal place.',
    ],
    [
      'print(-7 // 3)',
      '-3',
      'Împărțirea întreagă rotunjește spre minus infinit.',
      'Floor division rounds toward negative infinity.',
    ],
    [
      'print(10 % 3 + 2)',
      '3',
      'Restul este 1, apoi se adună 2.',
      'The remainder is 1, then 2 is added.',
    ],
    [
      'print("Python"[1:4])',
      'yth',
      'Slice include indicii 1, 2 și 3.',
      'The slice includes indexes 1, 2, and 3.',
    ],
    [
      'print("abc"[::-1])',
      'cba',
      'Pasul -1 inversează șirul.',
      'A step of -1 reverses the string.',
    ],
    [
      'print("  BacIt  ".strip().lower())',
      'bacit',
      'strip elimină spațiile exterioare, lower transformă în litere mici.',
      'strip removes surrounding whitespace; lower converts to lowercase.',
    ],
    [
      'print("a,b,c".split(",")[1])',
      'b',
      'split produce o listă; indicele 1 selectează al doilea element.',
      'split creates a list; index 1 selects its second item.',
    ],
    [
      'print("-".join(["a", "b", "c"]))',
      'a-b-c',
      'join inserează separatorul între elemente.',
      'join inserts the separator between items.',
    ],
    [
      'print(3 < 4 < 5)',
      'True',
      'Ambele comparații din lanț sunt adevărate.',
      'Both comparisons in the chain are true.',
    ],
    [
      'print(not (True and False))',
      'True',
      'True and False este False; not inversează.',
      'True and False is False; not negates it.',
    ],
    [
      'print(int("101", 2))',
      '5',
      '101 în baza 2 reprezintă 4 + 1.',
      '101 in base 2 represents 4 + 1.',
    ],
    [
      'print("x" * 0 == "")',
      'True',
      'Repetarea de zero ori produce șirul gol.',
      'Repeating zero times produces the empty string.',
    ],
    [
      'print(divmod(23, 5))',
      '(4, 3)',
      'divmod returnează câtul și restul.',
      'divmod returns quotient and remainder.',
    ],
  ],
  [
    [
      'print(sum(range(1, 6)))',
      '15',
      'range produce 1 până la 5.',
      'range produces 1 through 5.',
    ],
    [
      'print(list(range(5, 0, -2)))',
      '[5, 3, 1]',
      'Pasul negativ scade cu 2 până înainte de zero.',
      'The negative step subtracts 2 until before zero.',
    ],
    [
      'print([x * x for x in range(4)])',
      '[0, 1, 4, 9]',
      'Fiecare număr din range este ridicat la pătrat.',
      'Each number in range is squared.',
    ],
    [
      'n = 7\nprint("even" if n % 2 == 0 else "odd")',
      'odd',
      '7 are restul 1 la împărțirea cu 2.',
      '7 has a remainder of 1 when divided by 2.',
    ],
    [
      'for x in range(3):\n    if x == 1:\n        continue\n    print(x)',
      '0\n2',
      'continue sare peste afișarea lui 1.',
      'continue skips printing 1.',
    ],
    [
      'for x in []:\n    print(x)\nelse:\n    print("done")',
      'done',
      'else rulează când bucla se încheie fără break.',
      'else runs when the loop finishes without break.',
    ],
    [
      'n = 1\nwhile n < 8:\n    n *= 2\nprint(n)',
      '8',
      'Valorile succesive sunt 1, 2, 4 și 8.',
      'Successive values are 1, 2, 4, and 8.',
    ],
    [
      'print(any([False, 0, "yes"]))',
      'True',
      'any găsește un element cu valoare de adevăr adevărată.',
      'any finds a truthy element.',
    ],
    [
      'print(all([1, 2, 0]))',
      'False',
      'Zero este fals, deci all returnează False.',
      'Zero is falsy, so all returns False.',
    ],
    [
      'print(list(enumerate(["a", "b"], start=1)))',
      "[(1, 'a'), (2, 'b')]",
      'enumerate asociază fiecărui element un indice începând cu 1.',
      'enumerate pairs each item with an index starting at 1.',
    ],
    [
      'print(list(zip([1, 2, 3], ["a", "b"])))',
      "[(1, 'a'), (2, 'b')]",
      'zip se oprește la cel mai scurt iterabil.',
      'zip stops at the shortest iterable.',
    ],
    [
      'total = 0\nfor row in [[1, 2], [3]]:\n    for item in row:\n        total += item\nprint(total)',
      '6',
      'Buclele imbricate vizitează 1, 2 și 3.',
      'The nested loops visit 1, 2, and 3.',
    ],
    [
      'for n in range(5):\n    if n == 2:\n        break\nelse:\n    print("else")\nprint(n)',
      '2',
      'break împiedică blocul else al buclei.',
      'break prevents the loop else block from running.',
    ],
    [
      'x = 0\nif x:\n    print("yes")\nelse:\n    print("no")',
      'no',
      'Zero are valoare de adevăr falsă.',
      'Zero is falsy.',
    ],
  ],
  [
    [
      'a = [3, 1, 2]\nprint(sorted(a), a)',
      '[1, 2, 3] [3, 1, 2]',
      'sorted creează o listă nouă, fără modificarea originalului.',
      'sorted creates a new list without modifying the original.',
    ],
    [
      'a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a)',
      '[1, 2]',
      'O copie superficială separă lista exterioară.',
      'A shallow copy separates the outer list.',
    ],
    [
      'print(len({1, 1, 2, 3}))',
      '3',
      'Seturile elimină duplicatele.',
      'Sets remove duplicates.',
    ],
    [
      'print(sorted({1, 2, 3} & {2, 3, 4}))',
      '[2, 3]',
      '& calculează intersecția seturilor.',
      '& computes set intersection.',
    ],
    [
      'print(sorted({1, 2} | {2, 3}))',
      '[1, 2, 3]',
      '| calculează reuniunea seturilor.',
      '| computes set union.',
    ],
    [
      'print(sorted({1, 2, 3} - {2}))',
      '[1, 3]',
      'Diferența elimină elementele prezente în al doilea set.',
      'Difference removes items present in the second set.',
    ],
    [
      'd = {"a": 1}\nprint(d.get("b", 9))',
      '9',
      'get returnează valoarea implicită pentru o cheie absentă.',
      'get returns the default for a missing key.',
    ],
    [
      'd = {"a": 1, "b": 2}\nd["a"] = 3\nprint(len(d), d["a"])',
      '2 3',
      'Actualizarea unei chei existente nu mărește dicționarul.',
      'Updating an existing key does not enlarge the dictionary.',
    ],
    [
      'print({x: x * 2 for x in range(3)})',
      '{0: 0, 1: 2, 2: 4}',
      'Comprehensiunea creează perechi cheie-valoare.',
      'The comprehension creates key-value pairs.',
    ],
    [
      'print([x for x in [1, 4, 2, 5] if x > 2])',
      '[4, 5]',
      'Filtrul păstrează doar valorile mai mari decât 2.',
      'The filter keeps only values greater than 2.',
    ],
    [
      'a = [1, 2, 3]\nprint(a.pop(), a)',
      '3 [1, 2]',
      'pop fără indice elimină și returnează ultimul element.',
      'pop without an index removes and returns the last item.',
    ],
    [
      'a = [1, 2, 1]\na.remove(1)\nprint(a)',
      '[2, 1]',
      'remove elimină doar prima apariție.',
      'remove removes only the first occurrence.',
    ],
    [
      'print((1, 2) + (3,))',
      '(1, 2, 3)',
      'Tuplurile se concatenează cu +.',
      'Tuples concatenate with +.',
    ],
    [
      'a, *middle, z = [1, 2, 3, 4]\nprint(middle)',
      '[2, 3]',
      'Ținta cu stea colectează elementele intermediare într-o listă.',
      'The starred target collects middle items into a list.',
    ],
    [
      'print("a" in {"a": 2})',
      'True',
      'in verifică cheile unui dicționar.',
      'in checks dictionary keys.',
    ],
    [
      'print([1, 2, 3][::2])',
      '[1, 3]',
      'Pasul 2 selectează fiecare al doilea element.',
      'Step 2 selects every other item.',
    ],
    [
      'a = [[1]]\nb = a.copy()\nb[0].append(2)\nprint(a)',
      '[[1, 2]]',
      'Copia superficială păstrează referințele obiectelor interioare.',
      'A shallow copy retains references to nested objects.',
    ],
    [
      'print(list(dict.fromkeys(["a", "b", "a"])))',
      "['a', 'b']",
      'Cheile unice păstrează ordinea primei inserări.',
      'Unique keys preserve first insertion order.',
    ],
    [
      'print([x + y for x in [1, 2] for y in [10, 20]])',
      '[11, 21, 12, 22]',
      'Bucla pentru y se execută pentru fiecare x.',
      'The y loop runs for each x.',
    ],
    [
      'print(sum({"a": 2, "b": 5}.values()))',
      '7',
      'values expune valorile dicționarului pentru sumă.',
      'values exposes dictionary values for summing.',
    ],
  ],
  [
    [
      'def f(x):\n    return x + 1\nprint(f(f(2)))',
      '4',
      'Apelul interior returnează 3, cel exterior returnează 4.',
      'The inner call returns 3; the outer call returns 4.',
    ],
    [
      'def f(*args):\n    return sum(args)\nprint(f(1, 2, 3))',
      '6',
      '*args colectează argumentele poziționale într-un tuplu.',
      '*args collects positional arguments into a tuple.',
    ],
    [
      'def f(**kwargs):\n    return sorted(kwargs)\nprint(f(z=1, a=2))',
      "['a', 'z']",
      '**kwargs colectează argumentele cu nume într-un dicționar.',
      '**kwargs collects keyword arguments into a dictionary.',
    ],
    [
      'x = 10\ndef f():\n    x = 3\n    return x\nprint(f(), x)',
      '3 10',
      'Atribuirea locală nu schimbă variabila globală.',
      'Local assignment does not change the global variable.',
    ],
    [
      'print((lambda n: n * 3)(4))',
      '12',
      'Funcția lambda primește 4 și returnează 12.',
      'The lambda receives 4 and returns 12.',
    ],
    [
      'def f(x, /, y):\n    return x - y\nprint(f(9, y=4))',
      '5',
      'x este doar pozițional, y poate fi dat cu nume.',
      'x is positional-only; y may be passed by keyword.',
    ],
    [
      'def f(*, size=2):\n    return size\nprint(f(size=5))',
      '5',
      'Parametrul după * este doar cu nume.',
      'A parameter after * is keyword-only.',
    ],
    [
      'def f(items=None):\n    if items is None:\n        items = []\n    items.append(1)\n    return items\nprint(f(), f())',
      '[1] [1]',
      'None permite crearea unei liste noi la fiecare apel.',
      'None allows a fresh list to be created on every call.',
    ],
    [
      'def f():\n    return 2, 3\na, b = f()\nprint(a * b)',
      '6',
      'Funcția returnează un tuplu care este despachetat.',
      'The function returns a tuple that is unpacked.',
    ],
    [
      'def f(n):\n    if n <= 1:\n        return 1\n    return n * f(n - 1)\nprint(f(4))',
      '24',
      'Recursia calculează 4 × 3 × 2 × 1.',
      'The recursion computes 4 × 3 × 2 × 1.',
    ],
    [
      'print(list(map(str, [1, 2])))',
      "['1', '2']",
      'map aplică str fiecărui element.',
      'map applies str to each item.',
    ],
    [
      'print(list(filter(lambda n: n > 0, [-1, 0, 2])))',
      '[2]',
      'filter păstrează elementele pentru care predicatul este adevărat.',
      'filter keeps items for which the predicate is true.',
    ],
    [
      'def f():\n    yield 1\n    yield 2\nprint(list(f()))',
      '[1, 2]',
      'yield produce pe rând valorile generatorului.',
      'yield produces successive generator values.',
    ],
    [
      'print(sorted(["bbb", "a", "cc"], key=len))',
      "['a', 'cc', 'bbb']",
      'key=len sortează după lungime.',
      'key=len sorts by length.',
    ],
  ],
  [
    [
      'from io import StringIO\nf = StringIO("abc\\ndef")\nprint(f.readline().strip())',
      'abc',
      'readline citește prima linie, strip elimină newline.',
      'readline reads the first line; strip removes the newline.',
    ],
    [
      'from io import StringIO\nf = StringIO("abcdef")\nprint(f.read(2), f.read(2))',
      'ab cd',
      'Poziția curentă avansează după fiecare citire.',
      'The current position advances after each read.',
    ],
    [
      'from io import StringIO\nf = StringIO("abc")\nf.seek(1)\nprint(f.read())',
      'bc',
      'seek poziționează cursorul înainte de b.',
      'seek positions the cursor before b.',
    ],
    [
      'from io import StringIO\nf = StringIO()\nprint(f.write("BacIt"))',
      '5',
      'write returnează numărul de caractere scrise.',
      'write returns the number of characters written.',
    ],
    [
      'import json\nprint(json.dumps([1, True, None]))',
      '[1, true, null]',
      'Serializarea folosește literalurile JSON true și null.',
      'Serialization uses JSON literals true and null.',
    ],
    [
      'import json\nprint(type(json.loads("[1,2]")).__name__)',
      'list',
      'Un array JSON devine o listă Python.',
      'A JSON array becomes a Python list.',
    ],
    [
      'import csv\nfrom io import StringIO\nprint(next(csv.reader(StringIO("a,b\\n1,2"))))',
      "['a', 'b']",
      'csv.reader citește primul rând ca listă de șiruri.',
      'csv.reader reads the first row as a list of strings.',
    ],
    [
      'from pathlib import PurePosixPath\nprint(PurePosixPath("data/report.csv").suffix)',
      '.csv',
      'suffix returnează extensia cu punct.',
      'suffix returns the extension including the dot.',
    ],
    [
      'print("café".encode("utf-8").decode("utf-8"))',
      'café',
      'Aceeași codare la encode și decode păstrează textul.',
      'Matching encoding and decoding preserves the text.',
    ],
    [
      'print("a\\nb\\n".splitlines())',
      "['a', 'b']",
      'splitlines separă liniile fără un element gol final.',
      'splitlines separates lines without a trailing empty item.',
    ],
    [
      'from io import StringIO\nwith StringIO("x") as f:\n    value = f.read()\nprint(value, f.closed)',
      'x True',
      'Context managerul închide streamul la ieșire.',
      'The context manager closes the stream on exit.',
    ],
    [
      `import json\nprint(json.loads('{"score": 8}').get("score", 0))`,
      '8',
      'Cheia score există, deci nu se folosește valoarea implicită.',
      'The score key exists, so the default is not used.',
    ],
    [
      'from pathlib import PurePosixPath\nprint(PurePosixPath("a/b.txt").name)',
      'b.txt',
      'name returnează ultimul component al căii.',
      'name returns the final path component.',
    ],
  ],
  [
    [
      'try:\n    int("x")\nexcept ValueError:\n    print("invalid")',
      'invalid',
      'Textul x nu este un întreg valid.',
      'The text x is not a valid integer.',
    ],
    [
      'try:\n    x = 2\nexcept ValueError:\n    print("error")\nelse:\n    print("ok")',
      'ok',
      'else rulează dacă try nu ridică excepție.',
      'else runs if try raises no exception.',
    ],
    [
      'try:\n    1 / 0\nexcept ZeroDivisionError:\n    print("error")\nfinally:\n    print("done")',
      'error\ndone',
      'finally rulează și după tratarea excepției.',
      'finally runs after the exception is handled too.',
    ],
    [
      'try:\n    [1][3]\nexcept IndexError:\n    print("index")',
      'index',
      'Indicele 3 depășește lista cu un singur element.',
      'Index 3 is outside the one-item list.',
    ],
    [
      'try:\n    {"a": 1}["b"]\nexcept KeyError:\n    print("missing")',
      'missing',
      'Cheia b nu există în dicționar.',
      'The dictionary does not contain key b.',
    ],
    [
      'def f(x):\n    assert x > 0\n    return x * 2\nprint(f(3))',
      '6',
      'Condiția assert este adevărată, deci funcția continuă.',
      'The assertion is true, so the function continues.',
    ],
    [
      'try:\n    raise ValueError("bad")\nexcept ValueError as e:\n    print(str(e))',
      'bad',
      'str(e) returnează mesajul excepției.',
      'str(e) returns the exception message.',
    ],
    [
      'try:\n    int(None)\nexcept (TypeError, ValueError):\n    print("handled")',
      'handled',
      'Un tuplu de clase permite capturarea mai multor tipuri.',
      'A tuple of classes handles multiple exception types.',
    ],
    [
      'print(isinstance(True, int))',
      'True',
      'bool este o subclasă a lui int în Python.',
      'bool is a subclass of int in Python.',
    ],
    [
      'print(abs(0.1 + 0.2 - 0.3) < 1e-9)',
      'True',
      'Comparația cu toleranță gestionează erorile de virgulă mobilă.',
      'A tolerance comparison handles floating-point error.',
    ],
    [
      'import math\nprint(math.isclose(0.1 + 0.2, 0.3))',
      'True',
      'isclose compară valori numerice cu toleranță.',
      'isclose compares numeric values with tolerance.',
    ],
    [
      'def safe(n):\n    try:\n        return 10 / n\n    except ZeroDivisionError:\n        return None\nprint(safe(0) is None)',
      'True',
      'Funcția returnează None pentru împărțirea la zero.',
      'The function returns None for division by zero.',
    ],
    [
      'try:\n    raise RuntimeError()\nexcept ValueError:\n    print("value")\nexcept RuntimeError:\n    print("runtime")',
      'runtime',
      'Se alege primul handler care se potrivește tipului.',
      'The first handler matching the exception type is selected.',
    ],
  ],
  [
    [
      'class Box:\n    def __init__(self, value):\n        self.value = value\nprint(Box(7).value)',
      '7',
      '__init__ inițializează starea instanței.',
      '__init__ initializes instance state.',
    ],
    [
      'class A:\n    x = 2\na = A()\na.x = 5\nprint(A.x, a.x)',
      '2 5',
      'Atribuirea pe instanță nu schimbă atributul clasei.',
      'Assigning on the instance does not change the class attribute.',
    ],
    [
      'class A:\n    def value(self):\n        return 3\nclass B(A):\n    pass\nprint(B().value())',
      '3',
      'B moștenește metoda value de la A.',
      'B inherits the value method from A.',
    ],
    [
      'class A:\n    def value(self):\n        return 3\nclass B(A):\n    def value(self):\n        return super().value() + 2\nprint(B().value())',
      '5',
      'super apelează implementarea din clasa părinte.',
      'super calls the parent implementation.',
    ],
    [
      'class A:\n    def __len__(self):\n        return 4\nprint(len(A()))',
      '4',
      'len deleagă la metoda specială __len__.',
      'len delegates to the __len__ special method.',
    ],
    [
      'class A:\n    def __str__(self):\n        return "BacIt"\nprint(A())',
      'BacIt',
      'print folosește reprezentarea oferită de __str__.',
      'print uses the representation supplied by __str__.',
    ],
    [
      'from dataclasses import dataclass\n@dataclass\nclass Point:\n    x: int\n    y: int\nprint(Point(1, 2) == Point(1, 2))',
      'True',
      'dataclass generează egalitate bazată pe câmpuri.',
      'dataclass generates field-based equality.',
    ],
    [
      'class A:\n    @staticmethod\n    def double(n):\n        return n * 2\nprint(A.double(4))',
      '8',
      'O metodă statică nu primește self implicit.',
      'A static method does not receive an implicit self.',
    ],
    [
      'class A:\n    count = 3\n    @classmethod\n    def read(cls):\n        return cls.count\nprint(A.read())',
      '3',
      'classmethod primește clasa ca prim argument.',
      'classmethod receives the class as its first argument.',
    ],
    [
      'class A:\n    @property\n    def size(self):\n        return 10\nprint(A().size)',
      '10',
      'property expune o metodă ca atribut calculat.',
      'property exposes a method as a computed attribute.',
    ],
    [
      'from collections import Counter\nprint(Counter([1, 1, 2]).most_common(1))',
      '[(1, 2)]',
      'most_common întoarce perechea element-frecvență cea mai frecventă.',
      'most_common returns the most frequent item-count pair.',
    ],
    [
      'from collections import deque\nd = deque([1, 2])\nd.appendleft(0)\nprint(d.popleft())',
      '0',
      'appendleft și popleft lucrează la capătul din stânga.',
      'appendleft and popleft operate on the left end.',
    ],
    [
      'from itertools import islice\nprint(list(islice(range(10), 2, 5)))',
      '[2, 3, 4]',
      'islice selectează elemente fără a materializa întregul iterabil.',
      'islice selects items without materializing the entire iterable.',
    ],
    [
      'import math\nprint(math.gcd(18, 24))',
      '6',
      'gcd calculează cel mai mare divizor comun.',
      'gcd computes the greatest common divisor.',
    ],
    [
      'from functools import reduce\nprint(reduce(lambda a, b: a + b, [1, 2, 3], 0))',
      '6',
      'reduce acumulează valorile pornind de la zero.',
      'reduce accumulates values starting from zero.',
    ],
    [
      'class A:\n    pass\na = A()\nsetattr(a, "x", 9)\nprint(getattr(a, "x"))',
      '9',
      'setattr și getattr scriu și citesc atribute după nume.',
      'setattr and getattr write and read attributes by name.',
    ],
    [
      'class A:\n    pass\nclass B(A):\n    pass\nprint(isinstance(B(), A))',
      'True',
      'O instanță a subclasei este și instanță a clasei părinte.',
      'A subclass instance is also an instance of its parent class.',
    ],
    [
      'from decimal import Decimal\nprint(Decimal("0.1") + Decimal("0.2"))',
      '0.3',
      'Decimal din șiruri evită aproximația binară a acestor zecimale.',
      'Decimal from strings avoids binary approximation of these decimals.',
    ],
    [
      'from fractions import Fraction\nprint(Fraction(1, 3) + Fraction(1, 6))',
      '1/2',
      'Fraction calculează exact cu numere raționale.',
      'Fraction computes exactly with rational numbers.',
    ],
  ],
]

const baseModules = [
  '01-tipuri-date-operatori',
  '02-control-flux',
  '',
  '04-documentare-structura',
  '03-intrare-iesire',
  '05-depanare-erori',
  '',
]
export const pythonNextQuestions = pythonNextModules.flatMap(([module], i) => {
  const inherited: QuestionSpec[] = freshBank.python
    .filter((q) => q.module === baseModules[i])
    .map((q) => {
      if (q.type === 'matching') throw new Error('Unexpected matching source')
      return {
        prompt: q.text,
        code: q.code,
        explanation: q.explanation,
        answers: [
          ...q.correct.map((id) => q.options.find((x) => x.id === id)!.text),
          ...q.options.filter((x) => !q.correct.includes(x.id)).map((x) => x.text),
        ],
      }
    })
  const specs = traces[i].map(([code, expected, ro, en]) => {
    const options = [
      ...new Set(
        ['None', 'TypeError', 'False', '0', 'True', '[]'].filter((x) => x !== expected),
      ),
    ].slice(0, 3)
    return o(code, expected, options, [ro, en])
  })
  return makeQuestions('python-next-generation', module, [...inherited, ...specs])
})
