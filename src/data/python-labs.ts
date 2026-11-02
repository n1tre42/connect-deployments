import { bilingual as b } from '@/lib/translations'
import { pythonNextModules } from './python-next'

export type PythonLab = {
  id: string
  module: string
  title: string
  task: string
  starter: string
  solution: string
  tests: string[]
}
type LabSpec = [string, string, string, string, string, string, string[]]
const specs: LabSpec[] = [
  [
    'Temperatura',
    'Temperature',
    'Implementează celsius_to_fahrenheit(c). Formula: c * 9 / 5 + 32.',
    'Implement celsius_to_fahrenheit(c). Formula: c * 9 / 5 + 32.',
    'def celsius_to_fahrenheit(c):',
    '    return c * 9 / 5 + 32',
    [
      'assert celsius_to_fahrenheit(0) == 32',
      'assert celsius_to_fahrenheit(100) == 212',
      'assert celsius_to_fahrenheit(-40) == -40',
    ],
  ],
  [
    'Prețul final',
    'Final price',
    'Implementează final_price(price, discount) cu reducerea în procente. Rotunjește la două zecimale.',
    'Implement final_price(price, discount) with a percentage discount. Round to two decimal places.',
    'def final_price(price, discount):',
    '    return round(price * (1 - discount / 100), 2)',
    [
      'assert final_price(100, 20) == 80',
      'assert final_price(9.99, 10) == 8.99',
      'assert final_price(0, 50) == 0',
    ],
  ],
  [
    'Inițiale',
    'Initials',
    'Implementează initials(name): inițialele cu majuscule, fără puncte. Ignoră spațiile suplimentare.',
    'Implement initials(name): uppercase initials without dots. Ignore extra spaces.',
    'def initials(name):',
    '    return "".join(part[0].upper() for part in name.split())',
    [
      'assert initials("Ana Popescu") == "AP"',
      'assert initials("  ion  creanga ") == "IC"',
      'assert initials("") == ""',
    ],
  ],
  [
    'FizzBuzz',
    'FizzBuzz',
    'Implementează fizzbuzz(n): FizzBuzz pentru multipli de 15, Fizz pentru 3, Buzz pentru 5; altfel str(n).',
    'Implement fizzbuzz(n): FizzBuzz for multiples of 15, Fizz for 3, Buzz for 5; otherwise str(n).',
    'def fizzbuzz(n):',
    '    if n % 15 == 0:\n        return "FizzBuzz"\n    if n % 3 == 0:\n        return "Fizz"\n    if n % 5 == 0:\n        return "Buzz"\n    return str(n)',
    [
      'assert fizzbuzz(15) == "FizzBuzz"',
      'assert fizzbuzz(9) == "Fizz"',
      'assert fizzbuzz(10) == "Buzz"',
      'assert fizzbuzz(7) == "7"',
    ],
  ],
  [
    'Suma numerelor pare',
    'Even sum',
    'Implementează even_sum(n): suma numerelor pare de la 0 la n inclusiv. n este întreg nenegativ.',
    'Implement even_sum(n): the sum of even numbers from 0 through n inclusive. n is a nonnegative integer.',
    'def even_sum(n):',
    '    return sum(range(0, n + 1, 2))',
    ['assert even_sum(6) == 12', 'assert even_sum(5) == 6', 'assert even_sum(0) == 0'],
  ],
  [
    'Număr prim',
    'Prime number',
    'Implementează is_prime(n), întorcând True doar pentru numere prime. Tratează și n < 2.',
    'Implement is_prime(n), returning True only for prime numbers. Handle n < 2 too.',
    'def is_prime(n):',
    '    if n < 2:\n        return False\n    return all(n % d for d in range(2, int(n ** 0.5) + 1))',
    [
      'assert is_prime(2) is True',
      'assert is_prime(17) is True',
      'assert is_prime(1) is False',
      'assert is_prime(25) is False',
      'assert is_prime(-5) is False',
    ],
  ],
  [
    'Fără duplicate',
    'Remove duplicates',
    'Implementează unique(items), păstrând ordinea primei apariții. Elementele sunt hashable.',
    'Implement unique(items), preserving first occurrence order. Items are hashable.',
    'def unique(items):',
    '    return list(dict.fromkeys(items))',
    [
      'assert unique([3, 1, 3, 2]) == [3, 1, 2]',
      'assert unique([]) == []',
      'assert unique(["a", "a", "b"]) == ["a", "b"]',
    ],
  ],
  [
    'Frecvența cuvintelor',
    'Word counts',
    'Implementează word_counts(text): separă pe spații, ignoră majusculele, returnează un dict. Nu se cere eliminarea punctuației.',
    'Implement word_counts(text): split on whitespace, ignore case, return a dict. Punctuation removal is not required.',
    'def word_counts(text):',
    '    counts = {}\n    for word in text.lower().split():\n        counts[word] = counts.get(word, 0) + 1\n    return counts',
    [
      'assert word_counts("Ana ana Ion") == {"ana": 2, "ion": 1}',
      'assert word_counts("") == {}',
      'assert word_counts("x  x\\ny") == {"x": 2, "y": 1}',
    ],
  ],
  [
    'Aplatizarea listei',
    'Flatten a list',
    'Implementează flatten(rows) pentru o listă de liste, într-un singur nivel.',
    'Implement flatten(rows) for a list of lists, flattening one level.',
    'def flatten(rows):',
    '    return [item for row in rows for item in row]',
    [
      'assert flatten([[1, 2], [], [3]]) == [1, 2, 3]',
      'assert flatten([]) == []',
      'assert flatten([["a"], ["b", "c"]]) == ["a", "b", "c"]',
    ],
  ],
  [
    'Palindrom',
    'Palindrome',
    'Implementează is_palindrome(text), ignorând spațiile și majusculele. Șirul gol este palindrom.',
    'Implement is_palindrome(text), ignoring whitespace and case. The empty string is a palindrome.',
    'def is_palindrome(text):',
    '    clean = "".join(text.lower().split())\n    return clean == clean[::-1]',
    [
      'assert is_palindrome("Ana") is True',
      'assert is_palindrome("Never odd or even") is True',
      'assert is_palindrome("Python") is False',
      'assert is_palindrome("") is True',
    ],
  ],
  [
    'Funcție cu parametru implicit',
    'Default parameter',
    'Implementează greet(name, greeting="Salut") returnând greeting, o virgulă, un spațiu, name și !.',
    'Implement greet(name, greeting="Salut") returning greeting, a comma, a space, name, and !.',
    'def greet(name, greeting="Salut"):',
    '    return f"{greeting}, {name}!"',
    [
      'assert greet("Ana") == "Salut, Ana!"',
      'assert greet("Ion", "Hello") == "Hello, Ion!"',
      'assert greet(name="Sam", greeting="Hi") == "Hi, Sam!"',
    ],
  ],
  [
    'Generator de pătrate',
    'Square generator',
    'Implementează squares(n) ca generator care produce pătratele de la 0 la n-1.',
    'Implement squares(n) as a generator yielding the squares from 0 through n-1.',
    'def squares(n):',
    '    for i in range(n):\n        yield i * i',
    [
      'import types\nassert isinstance(squares(2), types.GeneratorType)',
      'assert list(squares(4)) == [0, 1, 4, 9]',
      'assert list(squares(0)) == []',
    ],
  ],
  [
    'Raport JSON',
    'JSON report',
    'Implementează score_total(payload): decodează un șir JSON cu cheia scores și însumează lista. Cheia absentă înseamnă listă goală.',
    'Implement score_total(payload): decode a JSON string with a scores key and sum its list. A missing key means an empty list.',
    'def score_total(payload):',
    '    import json\n    return sum(json.loads(payload).get("scores", []))',
    [
      'assert score_total(\'{"scores": [4, 5, 6]}\') == 15',
      "assert score_total('{}') == 0",
      'assert score_total(\'{"scores": []}\') == 0',
    ],
  ],
  [
    'Citirea CSV',
    'Read CSV',
    'Implementează csv_names(data): text CSV cu antet name,score; returnează valorile coloanei name în ordine.',
    'Implement csv_names(data): CSV text with a name,score header; return the name column values in order.',
    'def csv_names(data):',
    '    import csv\n    from io import StringIO\n    return [row["name"] for row in csv.DictReader(StringIO(data))]',
    [
      'assert csv_names("name,score\\nAna,9\\nIon,8") == ["Ana", "Ion"]',
      'assert csv_names("name,score\\n") == []',
      'assert csv_names(\'name,score\\n"Popescu, Ana",10\') == ["Popescu, Ana"]',
    ],
  ],
  [
    'Fișier text',
    'Text file',
    'Implementează save_lines(path, lines): scrie UTF-8, o linie pentru fiecare element, inclusiv newline la final. Returnează numărul liniilor.',
    'Implement save_lines(path, lines): write UTF-8, one line per item, including a final newline. Return the number of lines.',
    'def save_lines(path, lines):',
    '    with open(path, "w", encoding="utf-8") as f:\n        for line in lines:\n            f.write(line + "\\n")\n    return len(lines)',
    [
      'assert save_lines("bacit-lines.txt", ["Ana", "școală"]) == 2\nwith open("bacit-lines.txt", encoding="utf-8") as f:\n    assert f.read() == "Ana\\nșcoală\\n"',
      'assert save_lines("bacit-empty.txt", []) == 0\nwith open("bacit-empty.txt", encoding="utf-8") as f:\n    assert f.read() == ""',
    ],
  ],
  [
    'Conversie sigură',
    'Safe conversion',
    'Implementează safe_int(value, default=0): întregul convertit sau default la ValueError/TypeError.',
    'Implement safe_int(value, default=0): the converted integer, or default on ValueError/TypeError.',
    'def safe_int(value, default=0):',
    '    try:\n        return int(value)\n    except (ValueError, TypeError):\n        return default',
    [
      'assert safe_int("12") == 12',
      'assert safe_int("x", -1) == -1',
      'assert safe_int(None) == 0',
      'assert safe_int("-5") == -5',
    ],
  ],
  [
    'Validarea vârstei',
    'Validate age',
    'Implementează validate_age(age): returnează age în intervalul 0–130 inclusiv; altfel ridică ValueError.',
    'Implement validate_age(age): return age in the inclusive range 0–130; otherwise raise ValueError.',
    'def validate_age(age):',
    '    if not 0 <= age <= 130:\n        raise ValueError("age")\n    return age',
    [
      'assert validate_age(0) == 0\nassert validate_age(130) == 130',
      'try:\n    validate_age(-1)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("Expected ValueError")',
      'try:\n    validate_age(131)\nexcept ValueError:\n    pass\nelse:\n    raise AssertionError("Expected ValueError")',
    ],
  ],
  [
    'Media sigură',
    'Safe average',
    'Implementează average(values): media aritmetică; pentru o listă goală returnează None.',
    'Implement average(values): arithmetic mean; return None for an empty list.',
    'def average(values):',
    '    return sum(values) / len(values) if values else None',
    [
      'assert average([2, 4, 6]) == 4',
      'assert average([]) is None',
      'assert average([-2, 2]) == 0',
      'assert average([7]) == 7',
    ],
  ],
  [
    'Contor',
    'Counter class',
    'Creează Counter cu value inițial 0 și metoda increment(step=1), care actualizează și returnează value.',
    'Create Counter with initial value 0 and increment(step=1), which updates and returns value.',
    'class Counter:',
    '    def __init__(self):\n        self.value = 0\n    def increment(self, step=1):\n        self.value += step\n        return self.value',
    [
      'c = Counter()\nassert c.value == 0\nassert c.increment() == 1\nassert c.increment(3) == 4',
      'a = Counter()\nb = Counter()\na.increment()\nassert b.value == 0',
    ],
  ],
  [
    'Dreptunghi',
    'Rectangle class',
    'Creează Rectangle(width, height) cu metodele area() și perimeter().',
    'Create Rectangle(width, height) with area() and perimeter() methods.',
    'class Rectangle:',
    '    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    def area(self):\n        return self.width * self.height\n    def perimeter(self):\n        return 2 * (self.width + self.height)',
    [
      'r = Rectangle(3, 4)\nassert r.area() == 12\nassert r.perimeter() == 14',
      'r = Rectangle(0, 2)\nassert r.area() == 0\nassert r.perimeter() == 4',
    ],
  ],
  [
    'Inventar',
    'Inventory class',
    'Creează Inventory cu add(name, quantity) care adună stocul și stock(name) care returnează cantitatea sau 0.',
    'Create Inventory with add(name, quantity) that adds stock and stock(name) that returns its quantity or 0.',
    'class Inventory:',
    '    def __init__(self):\n        self.items = {}\n    def add(self, name, quantity):\n        self.items[name] = self.items.get(name, 0) + quantity\n    def stock(self, name):\n        return self.items.get(name, 0)',
    [
      'i = Inventory()\ni.add("pen", 2)\ni.add("pen", 3)\nassert i.stock("pen") == 5\nassert i.stock("book") == 0',
      'a = Inventory()\nb = Inventory()\na.add("x", 1)\nassert b.stock("x") == 0',
    ],
  ],
]

export const pythonLabs: PythonLab[] = specs.map(
  ([ro, en, taskRo, taskEn, signature, body, tests], i) => ({
    id: `python-ng-lab-${String(i + 1).padStart(2, '0')}`,
    module: pythonNextModules[Math.floor(i / 3)][0],
    title: b(ro, en),
    task: b(taskRo, taskEn),
    starter: `${signature}\n    # TODO\n    raise NotImplementedError\n`,
    solution: `${signature}\n${body}\n`,
    tests,
  }),
)
