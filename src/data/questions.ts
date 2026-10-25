export type QuestionType =
  | 'single'
  | 'multiple'
  | 'true_false'
  | 'code_output'
  | 'matching'

export type Option = { id: string; text: string }

type BaseQuestion = {
  id: string
  module: string
  difficulty: 'easy' | 'medium' | 'hard'
  text: string
  code?: string
  explanation: string
}

export type ChoiceQuestion = BaseQuestion & {
  type: Exclude<QuestionType, 'matching'>
  options: Option[]
  correct: string[]
}

export type MatchingQuestion = BaseQuestion & {
  type: 'matching'
  pairs: { target: string; answer: string }[]
  distractors?: string[]
}

export type Question = ChoiceQuestion | MatchingQuestion

const bank: Record<string, Question[]> = {
  "python": [
    {
      "id": "python-01-01",
      "module": "01-tipuri-date-operatori",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Ce afișează codul de mai jos?",
      "code": "print(type(7 / 2))",
      "options": [
        {
          "id": "a",
          "text": "<class 'int'>"
        },
        {
          "id": "b",
          "text": "<class 'float'>"
        },
        {
          "id": "c",
          "text": "3.5"
        },
        {
          "id": "d",
          "text": "<class 'str'>"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Operatorul / face mereu împărțire reală în Python 3, deci rezultatul este float (3.5). Pentru împărțire întreagă se folosește //."
    },
    {
      "id": "python-01-02",
      "module": "01-tipuri-date-operatori",
      "type": "single",
      "difficulty": "easy",
      "text": "Care operator returnează restul împărțirii a două numere întregi?",
      "options": [
        {
          "id": "a",
          "text": "//"
        },
        {
          "id": "b",
          "text": "%"
        },
        {
          "id": "c",
          "text": "**"
        },
        {
          "id": "d",
          "text": "/"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "% este operatorul modulo: 7 % 3 este 1. // este împărțirea întreagă, ** este ridicarea la putere."
    },
    {
      "id": "python-01-03",
      "module": "01-tipuri-date-operatori",
      "type": "multiple",
      "difficulty": "medium",
      "text": "Care dintre următoarele tipuri sunt mutabile (pot fi modificate după creare)?",
      "options": [
        {
          "id": "a",
          "text": "list"
        },
        {
          "id": "b",
          "text": "tuple"
        },
        {
          "id": "c",
          "text": "dict"
        },
        {
          "id": "d",
          "text": "str"
        },
        {
          "id": "e",
          "text": "set"
        }
      ],
      "correct": [
        "a",
        "c",
        "e"
      ],
      "explanation": "list, dict și set pot fi modificate pe loc. tuple și str sunt imutabile: orice „modificare” creează un obiect nou."
    },
    {
      "id": "python-01-04",
      "module": "01-tipuri-date-operatori",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "x = \"3\"\ny = 2\nprint(x * y)",
      "options": [
        {
          "id": "a",
          "text": "6"
        },
        {
          "id": "b",
          "text": "33"
        },
        {
          "id": "c",
          "text": "TypeError"
        },
        {
          "id": "d",
          "text": "\"3\"\"2\""
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Înmulțirea unui șir cu un întreg repetă șirul: \"3\" * 2 dă \"33\". Pentru 6 trebuie convertit întâi: int(x) * y."
    },
    {
      "id": "python-01-05",
      "module": "01-tipuri-date-operatori",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Expresia bool(\"False\") are valoarea False.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Orice șir nevid este considerat adevărat, inclusiv \"False\". Doar șirul vid \"\" are valoarea False."
    },
    {
      "id": "python-02-01",
      "module": "02-control-flux",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Ce afișează codul?",
      "code": "for i in range(1, 10, 3):\n    print(i, end=\" \")",
      "options": [
        {
          "id": "a",
          "text": "1 4 7"
        },
        {
          "id": "b",
          "text": "1 4 7 10"
        },
        {
          "id": "c",
          "text": "1 3 6 9"
        },
        {
          "id": "d",
          "text": "3 6 9"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "range(1, 10, 3) începe la 1, crește cu 3 și se oprește înainte de 10: 1, 4, 7."
    },
    {
      "id": "python-02-02",
      "module": "02-control-flux",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce cuvânt-cheie trece imediat la următoarea iterație a buclei, fără a o încheia?",
      "options": [
        {
          "id": "a",
          "text": "break"
        },
        {
          "id": "b",
          "text": "pass"
        },
        {
          "id": "c",
          "text": "continue"
        },
        {
          "id": "d",
          "text": "return"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "continue sare peste restul corpului buclei pentru iterația curentă. break iese complet din buclă, iar pass nu face nimic."
    },
    {
      "id": "python-02-03",
      "module": "02-control-flux",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "x = 5\nif x > 3 and x < 5:\n    print(\"A\")\nelif x >= 5:\n    print(\"B\")\nelse:\n    print(\"C\")",
      "options": [
        {
          "id": "a",
          "text": "A"
        },
        {
          "id": "b",
          "text": "B"
        },
        {
          "id": "c",
          "text": "C"
        },
        {
          "id": "d",
          "text": "A B"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "x < 5 este fals pentru x = 5, deci prima condiție e falsă. A doua (x >= 5) este adevărată, așa că se afișează B."
    },
    {
      "id": "python-02-04",
      "module": "02-control-flux",
      "type": "true_false",
      "difficulty": "hard",
      "text": "Blocul else atașat unei bucle while se execută doar dacă bucla se termină fără break.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "În Python, else după for/while rulează când bucla se încheie normal. Dacă bucla este oprită cu break, else este sărit."
    },
    {
      "id": "python-03-01",
      "module": "03-intrare-iesire",
      "type": "single",
      "difficulty": "easy",
      "text": "Cum deschizi fișierul note.txt pentru a adăuga text la sfârșitul lui, fără a șterge conținutul existent?",
      "options": [
        {
          "id": "a",
          "text": "open(\"note.txt\", \"r\")"
        },
        {
          "id": "b",
          "text": "open(\"note.txt\", \"w\")"
        },
        {
          "id": "c",
          "text": "open(\"note.txt\", \"a\")"
        },
        {
          "id": "d",
          "text": "open(\"note.txt\", \"x\")"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Modul \"a\" (append) scrie la finalul fișierului. \"w\" golește fișierul, \"r\" doar citește, \"x\" creează un fișier nou și dă eroare dacă există."
    },
    {
      "id": "python-03-02",
      "module": "03-intrare-iesire",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce tip de date returnează funcția input()?",
      "options": [
        {
          "id": "a",
          "text": "int"
        },
        {
          "id": "b",
          "text": "Depinde de ce tastează utilizatorul"
        },
        {
          "id": "c",
          "text": "str"
        },
        {
          "id": "d",
          "text": "float"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "input() returnează mereu un șir (str). Pentru numere trebuie conversie explicită, de exemplu int(input())."
    },
    {
      "id": "python-03-03",
      "module": "03-intrare-iesire",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "print(\"a\", \"b\", \"c\", sep=\"-\")",
      "options": [
        {
          "id": "a",
          "text": "a b c"
        },
        {
          "id": "b",
          "text": "a-b-c"
        },
        {
          "id": "c",
          "text": "abc"
        },
        {
          "id": "d",
          "text": "a-b-c-"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Parametrul sep stabilește separatorul dintre argumente. Implicit este un spațiu."
    },
    {
      "id": "python-03-04",
      "module": "03-intrare-iesire",
      "type": "multiple",
      "difficulty": "medium",
      "text": "Care moduri de deschidere permit scrierea în fișier?",
      "options": [
        {
          "id": "a",
          "text": "\"r\""
        },
        {
          "id": "b",
          "text": "\"w\""
        },
        {
          "id": "c",
          "text": "\"a\""
        },
        {
          "id": "d",
          "text": "\"r+\""
        }
      ],
      "correct": [
        "b",
        "c",
        "d"
      ],
      "explanation": "\"w\" și \"a\" permit scrierea, iar \"r+\" permite citire și scriere. \"r\" este doar pentru citire."
    },
    {
      "id": "python-04-01",
      "module": "04-documentare-structura",
      "type": "single",
      "difficulty": "medium",
      "text": "Unde se plasează docstring-ul unei funcții?",
      "options": [
        {
          "id": "a",
          "text": "Pe linia dinaintea lui def, cu #"
        },
        {
          "id": "b",
          "text": "Prima instrucțiune din corpul funcției, între ghilimele triple"
        },
        {
          "id": "c",
          "text": "La finalul funcției, după return"
        },
        {
          "id": "d",
          "text": "Oriunde în fișier, cu comentariul @doc"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Docstring-ul este un șir literal (de obicei \"\"\"...\"\"\") pus ca primă instrucțiune în corpul funcției. Este accesibil prin funcție.__doc__ și help()."
    },
    {
      "id": "python-04-02",
      "module": "04-documentare-structura",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Ce afișează codul?",
      "code": "def f(a, b=2):\n    return a * b\n\nprint(f(3))",
      "options": [
        {
          "id": "a",
          "text": "3"
        },
        {
          "id": "b",
          "text": "5"
        },
        {
          "id": "c",
          "text": "6"
        },
        {
          "id": "d",
          "text": "TypeError"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "b are valoarea implicită 2, deci f(3) calculează 3 * 2 = 6."
    },
    {
      "id": "python-04-03",
      "module": "04-documentare-structura",
      "type": "true_false",
      "difficulty": "easy",
      "text": "Liniile care încep cu # sunt executate de interpretor.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "# marchează un comentariu: interpretorul ignoră tot ce urmează pe acea linie."
    },
    {
      "id": "python-04-04",
      "module": "04-documentare-structura",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce returnează o funcție care nu conține nicio instrucțiune return?",
      "options": [
        {
          "id": "a",
          "text": "0"
        },
        {
          "id": "b",
          "text": "None"
        },
        {
          "id": "c",
          "text": "Un șir vid"
        },
        {
          "id": "d",
          "text": "Ultima valoare calculată"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Orice funcție fără return explicit returnează automat None."
    },
    {
      "id": "python-05-01",
      "module": "05-depanare-erori",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce excepție produce instrucțiunea int(\"abc\")?",
      "options": [
        {
          "id": "a",
          "text": "TypeError"
        },
        {
          "id": "b",
          "text": "ValueError"
        },
        {
          "id": "c",
          "text": "SyntaxError"
        },
        {
          "id": "d",
          "text": "NameError"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Tipul argumentului (str) este acceptat de int(), dar valoarea \"abc\" nu poate fi convertită, deci apare ValueError."
    },
    {
      "id": "python-05-02",
      "module": "05-depanare-erori",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "try:\n    print(1 / 0)\nexcept ZeroDivisionError:\n    print(\"zero\")\nfinally:\n    print(\"gata\")",
      "options": [
        {
          "id": "a",
          "text": "zero"
        },
        {
          "id": "b",
          "text": "gata"
        },
        {
          "id": "c",
          "text": "zero\ngata"
        },
        {
          "id": "d",
          "text": "ZeroDivisionError"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Împărțirea la zero ridică ZeroDivisionError, prinsă de except („zero”). Blocul finally se execută întotdeauna („gata”)."
    },
    {
      "id": "python-05-03",
      "module": "05-depanare-erori",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce tip de eroare conține linia print(\"Salut\"?",
      "options": [
        {
          "id": "a",
          "text": "SyntaxError"
        },
        {
          "id": "b",
          "text": "NameError"
        },
        {
          "id": "c",
          "text": "ValueError"
        },
        {
          "id": "d",
          "text": "Eroare logică"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Paranteza neînchisă încalcă regulile limbajului, așa că programul nici nu pornește: SyntaxError."
    },
    {
      "id": "python-05-04",
      "module": "05-depanare-erori",
      "type": "multiple",
      "difficulty": "medium",
      "text": "Care dintre următoarele sunt blocuri valide ale unei instrucțiuni try în Python?",
      "options": [
        {
          "id": "a",
          "text": "except"
        },
        {
          "id": "b",
          "text": "catch"
        },
        {
          "id": "c",
          "text": "else"
        },
        {
          "id": "d",
          "text": "finally"
        }
      ],
      "correct": [
        "a",
        "c",
        "d"
      ],
      "explanation": "Python folosește except, else și finally. catch există în alte limbaje (Java, JavaScript), nu în Python."
    },
    {
      "id": "python-06-01",
      "module": "06-module-instrumente",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "import math\nprint(math.floor(-2.5))",
      "options": [
        {
          "id": "a",
          "text": "-2"
        },
        {
          "id": "b",
          "text": "-3"
        },
        {
          "id": "c",
          "text": "-2.5"
        },
        {
          "id": "d",
          "text": "2"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "floor rotunjește în jos, spre minus infinit: cel mai mare întreg ≤ -2.5 este -3."
    },
    {
      "id": "python-06-02",
      "module": "06-module-instrumente",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce valori poate returna random.randint(1, 6)?",
      "options": [
        {
          "id": "a",
          "text": "1, 2, 3, 4, 5"
        },
        {
          "id": "b",
          "text": "1, 2, 3, 4, 5, 6"
        },
        {
          "id": "c",
          "text": "0, 1, 2, 3, 4, 5"
        },
        {
          "id": "d",
          "text": "Orice număr real între 1 și 6"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "randint(a, b) include ambele capete, deci rezultatul este un întreg de la 1 la 6 inclusiv."
    },
    {
      "id": "python-06-03",
      "module": "06-module-instrumente",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce instrucțiune importă doar funcția sqrt din modulul math?",
      "options": [
        {
          "id": "a",
          "text": "import sqrt from math"
        },
        {
          "id": "b",
          "text": "from math import sqrt"
        },
        {
          "id": "c",
          "text": "import math.sqrt()"
        },
        {
          "id": "d",
          "text": "include math.sqrt"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Sintaxa corectă este from modul import nume. După aceea poți scrie direct sqrt(16)."
    },
    {
      "id": "python-06-04",
      "module": "06-module-instrumente",
      "type": "true_false",
      "difficulty": "medium",
      "text": "os.path.isfile(\"cale\") returnează True și pentru directoare.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "isfile() returnează True doar pentru fișiere obișnuite. Pentru directoare se folosește os.path.isdir()."
    },
    {
      "id": "python-01-06",
      "module": "01-tipuri-date-operatori",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Ce afișează codul?",
      "code": "print(17 // 5, 17 % 5)",
      "options": [
        {
          "id": "a",
          "text": "3 2"
        },
        {
          "id": "b",
          "text": "3.4 2"
        },
        {
          "id": "c",
          "text": "2 3"
        },
        {
          "id": "d",
          "text": "3 2.0"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "// este împărțirea întreagă (17 // 5 = 3), iar % dă restul (17 % 5 = 2)."
    },
    {
      "id": "python-01-07",
      "module": "01-tipuri-date-operatori",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este rezultatul expresiei int(\"12\") + float(\"0.5\")?",
      "options": [
        {
          "id": "a",
          "text": "12.5"
        },
        {
          "id": "b",
          "text": "\"120.5\""
        },
        {
          "id": "c",
          "text": "TypeError"
        },
        {
          "id": "d",
          "text": "12"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "int(\"12\") dă 12, float(\"0.5\") dă 0.5; suma unui int cu un float este un float: 12.5."
    },
    {
      "id": "python-01-08",
      "module": "01-tipuri-date-operatori",
      "type": "matching",
      "difficulty": "medium",
      "text": "Trage fiecare valoare lângă tipul ei de date în Python.",
      "pairs": [
        {
          "target": "int",
          "answer": "42"
        },
        {
          "target": "float",
          "answer": "3.14"
        },
        {
          "target": "str",
          "answer": "\"42\""
        },
        {
          "target": "bool",
          "answer": "True"
        },
        {
          "target": "list",
          "answer": "[1, 2, 3]"
        }
      ],
      "distractors": [
        "(1, 2)"
      ],
      "explanation": "42 este int, 3.14 este float, \"42\" (între ghilimele) este str, True este bool, iar [1, 2, 3] este list. (1, 2) ar fi un tuple."
    },
    {
      "id": "python-02-05",
      "module": "02-control-flux",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "total = 0\nfor n in range(5):\n    if n == 3:\n        break\n    total += n\nprint(total)",
      "options": [
        {
          "id": "a",
          "text": "3"
        },
        {
          "id": "b",
          "text": "6"
        },
        {
          "id": "c",
          "text": "10"
        },
        {
          "id": "d",
          "text": "0"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Se adună 0 + 1 + 2 = 3, apoi la n == 3 bucla se oprește cu break."
    },
    {
      "id": "python-02-06",
      "module": "02-control-flux",
      "type": "single",
      "difficulty": "easy",
      "text": "Câte iterații execută bucla for i in range(2, 8)?",
      "options": [
        {
          "id": "a",
          "text": "5"
        },
        {
          "id": "b",
          "text": "6"
        },
        {
          "id": "c",
          "text": "7"
        },
        {
          "id": "d",
          "text": "8"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "range(2, 8) produce 2, 3, 4, 5, 6, 7 — adică 6 valori; capătul din dreapta nu este inclus."
    },
    {
      "id": "python-02-07",
      "module": "02-control-flux",
      "type": "code_output",
      "difficulty": "hard",
      "text": "Ce afișează codul?",
      "code": "i = 10\nwhile i > 0:\n    i -= 3\nprint(i)",
      "options": [
        {
          "id": "a",
          "text": "1"
        },
        {
          "id": "b",
          "text": "0"
        },
        {
          "id": "c",
          "text": "-2"
        },
        {
          "id": "d",
          "text": "-1"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "i ia valorile 10 → 7 → 4 → 1 → -2. Când i devine -2, condiția i > 0 este falsă și se afișează -2."
    },
    {
      "id": "python-02-08",
      "module": "02-control-flux",
      "type": "matching",
      "difficulty": "medium",
      "text": "Potrivește fiecare cuvânt-cheie cu efectul lui într-o buclă.",
      "pairs": [
        {
          "target": "Iese complet din buclă",
          "answer": "break"
        },
        {
          "target": "Sare la următoarea iterație",
          "answer": "continue"
        },
        {
          "target": "Nu face nimic (loc rezervat)",
          "answer": "pass"
        },
        {
          "target": "Rulează dacă bucla s-a terminat fără break",
          "answer": "else"
        }
      ],
      "distractors": [
        "return"
      ],
      "explanation": "break oprește bucla, continue sare la iterația următoare, pass este o instrucțiune goală, iar else după for/while rulează doar dacă nu a existat break."
    },
    {
      "id": "python-03-05",
      "module": "03-intrare-iesire",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce tip de date returnează mereu funcția input()?",
      "options": [
        {
          "id": "a",
          "text": "int"
        },
        {
          "id": "b",
          "text": "str"
        },
        {
          "id": "c",
          "text": "float"
        },
        {
          "id": "d",
          "text": "depinde de ce scrie utilizatorul"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "input() returnează întotdeauna un șir (str). Pentru numere trebuie convertit cu int() sau float()."
    },
    {
      "id": "python-03-06",
      "module": "03-intrare-iesire",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce mod de deschidere adaugă text la finalul unui fișier existent, fără a-l șterge?",
      "options": [
        {
          "id": "a",
          "text": "\"r\""
        },
        {
          "id": "b",
          "text": "\"w\""
        },
        {
          "id": "c",
          "text": "\"a\""
        },
        {
          "id": "d",
          "text": "\"x\""
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "\"a\" (append) scrie la sfârșitul fișierului. \"w\" golește fișierul, \"r\" doar citește, \"x\" creează un fișier nou și dă eroare dacă există."
    },
    {
      "id": "python-03-07",
      "module": "03-intrare-iesire",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "pret = 7.5\nprint(f\"Total: {pret * 2:.2f} lei\")",
      "options": [
        {
          "id": "a",
          "text": "Total: 15.0 lei"
        },
        {
          "id": "b",
          "text": "Total: 15.00 lei"
        },
        {
          "id": "c",
          "text": "Total: 15 lei"
        },
        {
          "id": "d",
          "text": "Total: {pret * 2:.2f} lei"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Specificatorul :.2f formatează numărul cu exact două zecimale: 15.00."
    },
    {
      "id": "python-03-08",
      "module": "03-intrare-iesire",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Instrucțiunea with open(\"date.txt\") as f: închide automat fișierul la ieșirea din bloc.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Managerul de context with apelează automat f.close(), chiar dacă apare o excepție în interiorul blocului."
    },
    {
      "id": "python-04-05",
      "module": "04-documentare-structura",
      "type": "single",
      "difficulty": "easy",
      "text": "Care este modul corect de a scrie un comentariu pe o singură linie în Python?",
      "options": [
        {
          "id": "a",
          "text": "// comentariu"
        },
        {
          "id": "b",
          "text": "/* comentariu */"
        },
        {
          "id": "c",
          "text": "# comentariu"
        },
        {
          "id": "d",
          "text": "-- comentariu"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "În Python, comentariile pe o linie încep cu #. Docstring-urile se scriu între ghilimele triple."
    },
    {
      "id": "python-04-06",
      "module": "04-documentare-structura",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "def salut(nume, mesaj=\"Bună\"):\n    return f\"{mesaj}, {nume}!\"\n\nprint(salut(\"Ana\"))",
      "options": [
        {
          "id": "a",
          "text": "Bună, Ana!"
        },
        {
          "id": "b",
          "text": "Ana, Bună!"
        },
        {
          "id": "c",
          "text": "TypeError"
        },
        {
          "id": "d",
          "text": "None"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Parametrul mesaj are valoarea implicită \"Bună\", folosită când argumentul lipsește."
    },
    {
      "id": "python-04-07",
      "module": "04-documentare-structura",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce returnează o funcție Python care nu conține instrucțiunea return?",
      "options": [
        {
          "id": "a",
          "text": "0"
        },
        {
          "id": "b",
          "text": "\"\""
        },
        {
          "id": "c",
          "text": "None"
        },
        {
          "id": "d",
          "text": "False"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "O funcție fără return (sau cu return fără valoare) returnează implicit None."
    },
    {
      "id": "python-05-05",
      "module": "05-depanare-erori",
      "type": "matching",
      "difficulty": "medium",
      "text": "Trage fiecare excepție lângă codul care o provoacă.",
      "pairs": [
        {
          "target": "int(\"abc\")",
          "answer": "ValueError"
        },
        {
          "target": "10 / 0",
          "answer": "ZeroDivisionError"
        },
        {
          "target": "[1, 2][5]",
          "answer": "IndexError"
        },
        {
          "target": "{\"a\": 1}[\"b\"]",
          "answer": "KeyError"
        },
        {
          "target": "\"3\" + 4",
          "answer": "TypeError"
        }
      ],
      "distractors": [
        "NameError"
      ],
      "explanation": "Conversie invalidă → ValueError; împărțire la zero → ZeroDivisionError; index inexistent → IndexError; cheie lipsă → KeyError; operație între tipuri incompatibile → TypeError."
    },
    {
      "id": "python-05-06",
      "module": "05-depanare-erori",
      "type": "single",
      "difficulty": "medium",
      "text": "Care bloc se execută întotdeauna, indiferent dacă a apărut sau nu o excepție?",
      "options": [
        {
          "id": "a",
          "text": "except"
        },
        {
          "id": "b",
          "text": "else"
        },
        {
          "id": "c",
          "text": "finally"
        },
        {
          "id": "d",
          "text": "raise"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "finally rulează mereu — este locul potrivit pentru eliberarea resurselor (închiderea fișierelor, conexiunilor)."
    },
    {
      "id": "python-05-07",
      "module": "05-depanare-erori",
      "type": "code_output",
      "difficulty": "hard",
      "text": "Ce afișează codul?",
      "code": "try:\n    x = int(\"5\")\nexcept ValueError:\n    print(\"A\")\nelse:\n    print(\"B\")\nfinally:\n    print(\"C\")",
      "options": [
        {
          "id": "a",
          "text": "A C"
        },
        {
          "id": "b",
          "text": "B C"
        },
        {
          "id": "c",
          "text": "C"
        },
        {
          "id": "d",
          "text": "A B C"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Conversia reușește, deci except este sărit, else afișează B, iar finally afișează C."
    },
    {
      "id": "python-06-05",
      "module": "06-module-instrumente",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Ce afișează codul?",
      "code": "import math\nprint(math.floor(3.7), math.ceil(3.2))",
      "options": [
        {
          "id": "a",
          "text": "3 4"
        },
        {
          "id": "b",
          "text": "4 3"
        },
        {
          "id": "c",
          "text": "3 3"
        },
        {
          "id": "d",
          "text": "4 4"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "floor rotunjește în jos (3), ceil rotunjește în sus (4)."
    },
    {
      "id": "python-06-06",
      "module": "06-module-instrumente",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce funcție din modulul random returnează un întreg între a și b, ambele incluse?",
      "options": [
        {
          "id": "a",
          "text": "random.random()"
        },
        {
          "id": "b",
          "text": "random.randint(a, b)"
        },
        {
          "id": "c",
          "text": "random.choice(a, b)"
        },
        {
          "id": "d",
          "text": "random.range(a, b)"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "random.randint(a, b) include ambele capete. random.random() dă un float în [0, 1)."
    },
    {
      "id": "python-06-07",
      "module": "06-module-instrumente",
      "type": "single",
      "difficulty": "medium",
      "text": "Cum imporți doar funcția sqrt din modulul math, astfel încât să o poți apela direct sqrt(16)?",
      "options": [
        {
          "id": "a",
          "text": "import math.sqrt"
        },
        {
          "id": "b",
          "text": "from math import sqrt"
        },
        {
          "id": "c",
          "text": "import sqrt from math"
        },
        {
          "id": "d",
          "text": "using math.sqrt"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "from modul import nume aduce numele direct în spațiul curent, fără prefixul math."
    }
  ],
  "baze-de-date": [
    {
      "id": "baze-de-date-01-01",
      "module": "01-proiectare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce este o cheie primară?",
      "options": [
        {
          "id": "a",
          "text": "O coloană care poate conține valori duplicate"
        },
        {
          "id": "b",
          "text": "Una sau mai multe coloane care identifică unic fiecare rând și nu acceptă NULL"
        },
        {
          "id": "c",
          "text": "Prima coloană a oricărui tabel"
        },
        {
          "id": "d",
          "text": "O coloană care face legătura cu alt tabel"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Cheia primară identifică unic fiecare înregistrare. Valorile ei trebuie să fie unice și nenule. Legătura cu alt tabel o face cheia externă."
    },
    {
      "id": "baze-de-date-01-02",
      "module": "01-proiectare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce formă normală cere ca fiecare câmp să conțină o singură valoare (atomică), fără grupuri repetitive?",
      "options": [
        {
          "id": "a",
          "text": "1NF"
        },
        {
          "id": "b",
          "text": "2NF"
        },
        {
          "id": "c",
          "text": "3NF"
        },
        {
          "id": "d",
          "text": "BCNF"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Prima formă normală (1NF) cere valori atomice și elimină grupurile repetitive. 2NF și 3NF se ocupă de dependențele dintre coloane."
    },
    {
      "id": "baze-de-date-01-03",
      "module": "01-proiectare",
      "type": "single",
      "difficulty": "medium",
      "text": "Cum se implementează o relație „mulți-la-mulți” între Elevi și Cursuri?",
      "options": [
        {
          "id": "a",
          "text": "O coloană cu mai multe ID-uri separate prin virgulă"
        },
        {
          "id": "b",
          "text": "Un tabel de legătură cu două chei externe"
        },
        {
          "id": "c",
          "text": "O cheie primară comună"
        },
        {
          "id": "d",
          "text": "Nu se poate în modelul relațional"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Se creează un tabel intermediar (de exemplu Inscrieri) cu o cheie externă spre Elevi și una spre Cursuri."
    },
    {
      "id": "baze-de-date-01-04",
      "module": "01-proiectare",
      "type": "true_false",
      "difficulty": "hard",
      "text": "O cheie externă poate face referire la o coloană din același tabel.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Da, se numește relație recursivă (auto-referință). Exemplu: Angajati.manager_id face referire la Angajati.id."
    },
    {
      "id": "baze-de-date-02-01",
      "module": "02-obiecte",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce comandă adaugă o coloană nouă într-un tabel existent?",
      "options": [
        {
          "id": "a",
          "text": "UPDATE TABLE Elevi ADD email"
        },
        {
          "id": "b",
          "text": "ALTER TABLE Elevi ADD email VARCHAR(100)"
        },
        {
          "id": "c",
          "text": "INSERT COLUMN email INTO Elevi"
        },
        {
          "id": "d",
          "text": "CREATE COLUMN email ON Elevi"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Structura unui tabel se modifică cu ALTER TABLE. UPDATE modifică date, nu structura."
    },
    {
      "id": "baze-de-date-02-02",
      "module": "02-obiecte",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este diferența dintre DELETE FROM Elevi și DROP TABLE Elevi?",
      "options": [
        {
          "id": "a",
          "text": "Nu există nicio diferență"
        },
        {
          "id": "b",
          "text": "DELETE șterge rândurile, iar DROP șterge tabelul cu tot cu structura lui"
        },
        {
          "id": "c",
          "text": "DROP șterge doar rândurile"
        },
        {
          "id": "d",
          "text": "DELETE șterge și indexurile"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "DELETE (DML) elimină date și păstrează tabelul. DROP (DDL) elimină complet obiectul din baza de date."
    },
    {
      "id": "baze-de-date-02-03",
      "module": "02-obiecte",
      "type": "multiple",
      "difficulty": "medium",
      "text": "Care dintre următoarele sunt comenzi DDL (Data Definition Language)?",
      "options": [
        {
          "id": "a",
          "text": "CREATE"
        },
        {
          "id": "b",
          "text": "SELECT"
        },
        {
          "id": "c",
          "text": "ALTER"
        },
        {
          "id": "d",
          "text": "UPDATE"
        },
        {
          "id": "e",
          "text": "DROP"
        }
      ],
      "correct": [
        "a",
        "c",
        "e"
      ],
      "explanation": "CREATE, ALTER și DROP definesc structura. SELECT și UPDATE lucrează cu date (DML/DQL)."
    },
    {
      "id": "baze-de-date-02-04",
      "module": "02-obiecte",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este efectul principal al unui index pe o coloană?",
      "options": [
        {
          "id": "a",
          "text": "Criptează coloana"
        },
        {
          "id": "b",
          "text": "Accelerează căutarea și sortarea după acea coloană, dar poate încetini inserările"
        },
        {
          "id": "c",
          "text": "Interzice valorile NULL"
        },
        {
          "id": "d",
          "text": "Creează automat o copie de rezervă a tabelului"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Indexul este o structură auxiliară care accelerează citirea. Fiecare INSERT/UPDATE trebuie să actualizeze și indexul, așa că scrierile devin mai lente."
    },
    {
      "id": "baze-de-date-03-01",
      "module": "03-interogare",
      "type": "single",
      "difficulty": "easy",
      "text": "Interogarea SELECT * FROM Produse WHERE pret BETWEEN 10 AND 20 include produsele cu prețul exact 10 și 20?",
      "options": [
        {
          "id": "a",
          "text": "Da, BETWEEN include ambele capete"
        },
        {
          "id": "b",
          "text": "Nu, le exclude pe amândouă"
        },
        {
          "id": "c",
          "text": "Include doar 10"
        },
        {
          "id": "d",
          "text": "Include doar 20"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "BETWEEN a AND b este echivalent cu >= a AND <= b, deci ambele capete sunt incluse."
    },
    {
      "id": "baze-de-date-03-02",
      "module": "03-interogare",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Tabelul Elevi conține rândurile: (Ana, 10), (Ion, 11), (Dan, 10). Ce returnează interogarea?",
      "code": "SELECT COUNT(*) FROM Elevi WHERE clasa = 10;",
      "options": [
        {
          "id": "a",
          "text": "1"
        },
        {
          "id": "b",
          "text": "2"
        },
        {
          "id": "c",
          "text": "3"
        },
        {
          "id": "d",
          "text": "10"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Două rânduri (Ana și Dan) au clasa = 10, deci COUNT(*) returnează 2."
    },
    {
      "id": "baze-de-date-03-03",
      "module": "03-interogare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce clauză filtrează grupurile după agregare (de exemplu, doar clasele cu peste 25 de elevi)?",
      "options": [
        {
          "id": "a",
          "text": "WHERE"
        },
        {
          "id": "b",
          "text": "HAVING"
        },
        {
          "id": "c",
          "text": "ORDER BY"
        },
        {
          "id": "d",
          "text": "LIMIT"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "WHERE filtrează rândurile înainte de grupare. HAVING filtrează grupurile după GROUP BY, folosind funcții agregate."
    },
    {
      "id": "baze-de-date-03-04",
      "module": "03-interogare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce returnează un INNER JOIN între două tabele?",
      "options": [
        {
          "id": "a",
          "text": "Toate rândurile din ambele tabele"
        },
        {
          "id": "b",
          "text": "Doar rândurile care au corespondent în ambele tabele"
        },
        {
          "id": "c",
          "text": "Toate rândurile din tabelul din stânga"
        },
        {
          "id": "d",
          "text": "Doar rândurile fără corespondent"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "INNER JOIN păstrează doar perechile care respectă condiția de legătură. LEFT JOIN păstrează și rândurile din stânga fără corespondent."
    },
    {
      "id": "baze-de-date-03-05",
      "module": "03-interogare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce nume selectează condiția WHERE nume LIKE 'A%'?",
      "options": [
        {
          "id": "a",
          "text": "Numele care se termină cu A"
        },
        {
          "id": "b",
          "text": "Numele care încep cu A"
        },
        {
          "id": "c",
          "text": "Numele care conțin exact litera A"
        },
        {
          "id": "d",
          "text": "Numele cu exact două caractere"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "% înlocuiește orice secvență de caractere, deci 'A%' înseamnă „începe cu A”."
    },
    {
      "id": "baze-de-date-04-01",
      "module": "04-manipulare",
      "type": "single",
      "difficulty": "easy",
      "text": "Care instrucțiune INSERT este corectă?",
      "options": [
        {
          "id": "a",
          "text": "INSERT INTO Elevi (nume, clasa) VALUES ('Ana', 10);"
        },
        {
          "id": "b",
          "text": "INSERT Elevi SET nume = 'Ana', clasa = 10;"
        },
        {
          "id": "c",
          "text": "ADD INTO Elevi VALUES ('Ana', 10);"
        },
        {
          "id": "d",
          "text": "INSERT VALUES ('Ana', 10) INTO Elevi;"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Forma standard este INSERT INTO tabel (coloane) VALUES (valori)."
    },
    {
      "id": "baze-de-date-04-02",
      "module": "04-manipulare",
      "type": "true_false",
      "difficulty": "easy",
      "text": "O instrucțiune UPDATE fără clauza WHERE modifică toate rândurile din tabel.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Fără WHERE, condiția se aplică fiecărui rând. Verifică întotdeauna WHERE înainte de a rula UPDATE sau DELETE."
    },
    {
      "id": "baze-de-date-04-03",
      "module": "04-manipulare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce face instrucțiunea DELETE FROM Elevi WHERE clasa = 12;?",
      "options": [
        {
          "id": "a",
          "text": "Șterge coloana clasa"
        },
        {
          "id": "b",
          "text": "Șterge rândurile elevilor din clasa a 12-a"
        },
        {
          "id": "c",
          "text": "Șterge tabelul Elevi"
        },
        {
          "id": "d",
          "text": "Setează clasa la NULL pentru clasa a 12-a"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "DELETE elimină rândurile care îndeplinesc condiția. Structura tabelului rămâne neschimbată."
    },
    {
      "id": "baze-de-date-04-04",
      "module": "04-manipulare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce instrucțiune elimină toate rândurile din Elevi, dar păstrează tabelul?",
      "options": [
        {
          "id": "a",
          "text": "DROP TABLE Elevi;"
        },
        {
          "id": "b",
          "text": "DELETE FROM Elevi;"
        },
        {
          "id": "c",
          "text": "ALTER TABLE Elevi DROP ALL;"
        },
        {
          "id": "d",
          "text": "SELECT * FROM Elevi;"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "DELETE fără WHERE golește tabelul, dar structura lui rămâne. DROP TABLE ar elimina tabelul cu totul."
    },
    {
      "id": "baze-de-date-05-01",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Inserezi un rând cu o valoare a cheii primare care există deja. Ce se întâmplă?",
      "options": [
        {
          "id": "a",
          "text": "Rândul vechi este înlocuit"
        },
        {
          "id": "b",
          "text": "Inserarea eșuează din cauza încălcării constrângerii PRIMARY KEY"
        },
        {
          "id": "c",
          "text": "Se creează un duplicat"
        },
        {
          "id": "d",
          "text": "Valoarea este incrementată automat"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Cheia primară trebuie să fie unică, așa că sistemul respinge inserarea cu o eroare de constrângere."
    },
    {
      "id": "baze-de-date-05-02",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Interogarea SELECT nume FROM Elevi WHERE nota = NULL nu returnează niciun rând, deși există note lipsă. Cum se corectează?",
      "options": [
        {
          "id": "a",
          "text": "WHERE nota == NULL"
        },
        {
          "id": "b",
          "text": "WHERE nota IS NULL"
        },
        {
          "id": "c",
          "text": "WHERE nota = 'NULL'"
        },
        {
          "id": "d",
          "text": "WHERE NULL(nota)"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "NULL nu se compară cu =. Rezultatul ar fi „necunoscut”, nu adevărat. Se folosește IS NULL sau IS NOT NULL."
    },
    {
      "id": "baze-de-date-05-03",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Inserezi în Note un elev_id care nu există în tabelul Elevi (există o cheie externă). Ce se întâmplă?",
      "options": [
        {
          "id": "a",
          "text": "Rândul se inserează normal"
        },
        {
          "id": "b",
          "text": "Inserarea eșuează din cauza integrității referențiale"
        },
        {
          "id": "c",
          "text": "Se creează automat elevul"
        },
        {
          "id": "d",
          "text": "elev_id devine 0"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Cheia externă garantează că valoarea există în tabelul părinte, deci inserarea este respinsă."
    },
    {
      "id": "baze-de-date-05-04",
      "module": "05-depanare",
      "type": "true_false",
      "difficulty": "medium",
      "text": "În SQL standard, valorile de tip text se scriu între apostrofuri (ghilimele simple).",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Exemplu: WHERE nume = 'Ana'. Ghilimelele duble sunt rezervate, în standard, pentru numele de obiecte (identificatori)."
    },
    {
      "id": "baze-de-date-01-05",
      "module": "01-proiectare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce relație există între tabelele Elevi și Clase, dacă un elev aparține unei singure clase, iar o clasă are mulți elevi?",
      "options": [
        {
          "id": "a",
          "text": "unu-la-unu"
        },
        {
          "id": "b",
          "text": "unu-la-mulți"
        },
        {
          "id": "c",
          "text": "mulți-la-mulți"
        },
        {
          "id": "d",
          "text": "fără relație"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "O clasă → mulți elevi este o relație unu-la-mulți; cheia externă ClasaID se pune în tabelul Elevi."
    },
    {
      "id": "baze-de-date-01-06",
      "module": "01-proiectare",
      "type": "single",
      "difficulty": "medium",
      "text": "Cum se implementează o relație mulți-la-mulți între Elevi și Cursuri?",
      "options": [
        {
          "id": "a",
          "text": "Cheie externă în Elevi"
        },
        {
          "id": "b",
          "text": "Cheie externă în Cursuri"
        },
        {
          "id": "c",
          "text": "Un tabel de legătură cu două chei externe"
        },
        {
          "id": "d",
          "text": "Nu se poate implementa"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Se folosește un tabel de joncțiune (de ex. Inscrieri) cu ElevID și CursID, care împreună formează adesea cheia primară."
    },
    {
      "id": "baze-de-date-01-07",
      "module": "01-proiectare",
      "type": "matching",
      "difficulty": "medium",
      "text": "Potrivește fiecare noțiune cu definiția ei.",
      "pairs": [
        {
          "target": "Identifică unic fiecare rând",
          "answer": "Cheie primară"
        },
        {
          "target": "Face legătura cu alt tabel",
          "answer": "Cheie externă"
        },
        {
          "target": "Cheie formată din mai multe coloane",
          "answer": "Cheie compusă"
        },
        {
          "target": "Elimină grupurile repetitive",
          "answer": "1NF"
        }
      ],
      "distractors": [
        "Index"
      ],
      "explanation": "Cheia primară identifică rândul, cheia externă referă alt tabel, cheia compusă are mai multe coloane, iar prima formă normală (1NF) cere valori atomice, fără grupuri repetitive."
    },
    {
      "id": "baze-de-date-02-05",
      "module": "02-obiecte",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce face instrucțiunea de mai jos?",
      "code": "ALTER TABLE Elevi\nADD Email VARCHAR(100);",
      "options": [
        {
          "id": "a",
          "text": "Creează tabelul Elevi"
        },
        {
          "id": "b",
          "text": "Adaugă coloana Email"
        },
        {
          "id": "c",
          "text": "Inserează un e-mail"
        },
        {
          "id": "d",
          "text": "Șterge coloana Email"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "ALTER TABLE ... ADD adaugă o coloană nouă unui tabel existent."
    },
    {
      "id": "baze-de-date-02-06",
      "module": "02-obiecte",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce este o vedere (VIEW)?",
      "options": [
        {
          "id": "a",
          "text": "O copie fizică a unui tabel"
        },
        {
          "id": "b",
          "text": "O interogare salvată, folosită ca un tabel virtual"
        },
        {
          "id": "c",
          "text": "Un index pe mai multe coloane"
        },
        {
          "id": "d",
          "text": "O procedură stocată"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "O vedere stochează definiția unei interogări SELECT; datele sunt citite din tabelele de bază la fiecare utilizare."
    },
    {
      "id": "baze-de-date-02-07",
      "module": "02-obiecte",
      "type": "true_false",
      "difficulty": "easy",
      "text": "DROP TABLE șterge atât datele, cât și structura tabelului.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "DROP TABLE elimină tabelul complet. Pentru a șterge doar datele se folosește DELETE sau TRUNCATE."
    },
    {
      "id": "baze-de-date-03-06",
      "module": "03-interogare",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Câte rânduri returnează interogarea, dacă tabelul Note are 3 elevi, fiecare cu câte 4 note?",
      "code": "SELECT ElevID, AVG(Nota)\nFROM Note\nGROUP BY ElevID;",
      "options": [
        {
          "id": "a",
          "text": "1"
        },
        {
          "id": "b",
          "text": "3"
        },
        {
          "id": "c",
          "text": "4"
        },
        {
          "id": "d",
          "text": "12"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "GROUP BY ElevID creează câte un grup pentru fiecare elev: 3 rânduri, fiecare cu media notelor."
    },
    {
      "id": "baze-de-date-03-07",
      "module": "03-interogare",
      "type": "single",
      "difficulty": "medium",
      "text": "Care clauză filtrează grupurile după aplicarea funcțiilor agregate?",
      "options": [
        {
          "id": "a",
          "text": "WHERE"
        },
        {
          "id": "b",
          "text": "HAVING"
        },
        {
          "id": "c",
          "text": "ORDER BY"
        },
        {
          "id": "d",
          "text": "DISTINCT"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "WHERE filtrează rândurile înainte de grupare; HAVING filtrează grupurile, de exemplu HAVING COUNT(*) > 2."
    },
    {
      "id": "baze-de-date-03-08",
      "module": "03-interogare",
      "type": "matching",
      "difficulty": "hard",
      "text": "Potrivește fiecare tip de JOIN cu rezultatul lui.",
      "pairs": [
        {
          "target": "Doar rândurile cu potrivire în ambele tabele",
          "answer": "INNER JOIN"
        },
        {
          "target": "Toate rândurile din tabelul din stânga",
          "answer": "LEFT JOIN"
        },
        {
          "target": "Toate rândurile din tabelul din dreapta",
          "answer": "RIGHT JOIN"
        },
        {
          "target": "Toate combinațiile posibile de rânduri",
          "answer": "CROSS JOIN"
        }
      ],
      "distractors": [
        "SELF JOIN"
      ],
      "explanation": "INNER păstrează doar potrivirile, LEFT/RIGHT păstrează tot tabelul din partea respectivă (cu NULL unde lipsește potrivirea), CROSS face produsul cartezian."
    },
    {
      "id": "baze-de-date-04-05",
      "module": "04-manipulare",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce se întâmplă la rularea instrucțiunii?",
      "code": "UPDATE Elevi\nSET Clasa = '10B';",
      "options": [
        {
          "id": "a",
          "text": "Se modifică doar primul elev"
        },
        {
          "id": "b",
          "text": "Se modifică toți elevii"
        },
        {
          "id": "c",
          "text": "Eroare de sintaxă"
        },
        {
          "id": "d",
          "text": "Nu se modifică nimic"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Fără WHERE, UPDATE modifică fiecare rând din tabel — o greșeală frecventă și periculoasă."
    },
    {
      "id": "baze-de-date-04-06",
      "module": "04-manipulare",
      "type": "single",
      "difficulty": "easy",
      "text": "Care instrucțiune adaugă un rând nou într-un tabel?",
      "options": [
        {
          "id": "a",
          "text": "ADD ROW"
        },
        {
          "id": "b",
          "text": "INSERT INTO"
        },
        {
          "id": "c",
          "text": "UPDATE"
        },
        {
          "id": "d",
          "text": "CREATE ROW"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "INSERT INTO Tabel (col1, col2) VALUES (v1, v2) adaugă un rând nou."
    },
    {
      "id": "baze-de-date-04-07",
      "module": "04-manipulare",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este diferența principală dintre DELETE fără WHERE și TRUNCATE TABLE?",
      "options": [
        {
          "id": "a",
          "text": "Nu există nicio diferență"
        },
        {
          "id": "b",
          "text": "DELETE șterge structura"
        },
        {
          "id": "c",
          "text": "TRUNCATE golește tabelul mai rapid, fără a evalua fiecare rând, și nu poate avea WHERE"
        },
        {
          "id": "d",
          "text": "TRUNCATE șterge doar primul rând"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Ambele golesc tabelul, dar TRUNCATE este o operație DDL rapidă, fără condiții; DELETE este DML și poate filtra cu WHERE."
    },
    {
      "id": "baze-de-date-05-05",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Care condiție găsește corect rândurile în care Telefon nu are valoare?",
      "options": [
        {
          "id": "a",
          "text": "Telefon = NULL"
        },
        {
          "id": "b",
          "text": "Telefon == NULL"
        },
        {
          "id": "c",
          "text": "Telefon IS NULL"
        },
        {
          "id": "d",
          "text": "Telefon = ''"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "NULL nu se compară cu =; se folosește IS NULL sau IS NOT NULL."
    },
    {
      "id": "baze-de-date-05-06",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "O inserare eșuează cu mesajul „violation of FOREIGN KEY constraint”. Care este cauza cea mai probabilă?",
      "options": [
        {
          "id": "a",
          "text": "Valoarea referită nu există în tabelul părinte"
        },
        {
          "id": "b",
          "text": "Lipsește cheia primară"
        },
        {
          "id": "c",
          "text": "Tabelul este gol"
        },
        {
          "id": "d",
          "text": "Tipul coloanei este VARCHAR"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "O cheie externă trebuie să refere o valoare existentă în tabelul părinte (integritate referențială)."
    },
    {
      "id": "baze-de-date-05-07",
      "module": "05-depanare",
      "type": "code_output",
      "difficulty": "hard",
      "text": "Ce eroare conține interogarea?",
      "code": "SELECT Nume, COUNT(*)\nFROM Elevi;",
      "options": [
        {
          "id": "a",
          "text": "Lipsește GROUP BY Nume"
        },
        {
          "id": "b",
          "text": "COUNT nu primește *"
        },
        {
          "id": "c",
          "text": "Lipsește WHERE"
        },
        {
          "id": "d",
          "text": "Nu există nicio eroare"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "O coloană neagregată (Nume) alături de COUNT(*) trebuie să apară în GROUP BY."
    }
  ],
  "retelistica": [
    {
      "id": "retelistica-01-01",
      "module": "01-infrastructura",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce o deosebește o rețea LAN de o rețea WAN?",
      "options": [
        {
          "id": "a",
          "text": "LAN folosește doar Wi-Fi"
        },
        {
          "id": "b",
          "text": "LAN acoperă o zonă geografică limitată, de exemplu o școală sau o clădire"
        },
        {
          "id": "c",
          "text": "LAN este întotdeauna mai lentă"
        },
        {
          "id": "d",
          "text": "LAN nu folosește adrese IP"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "LAN (Local Area Network) acoperă o zonă mică. WAN (Wide Area Network) leagă rețele aflate la distanță mare, cum face Internetul."
    },
    {
      "id": "retelistica-01-02",
      "module": "01-infrastructura",
      "type": "single",
      "difficulty": "easy",
      "text": "În ce topologie toate dispozitivele se conectează la un echipament central?",
      "options": [
        {
          "id": "a",
          "text": "Magistrală (bus)"
        },
        {
          "id": "b",
          "text": "Inel (ring)"
        },
        {
          "id": "c",
          "text": "Stea (star)"
        },
        {
          "id": "d",
          "text": "Mesh"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "În topologia stea, fiecare nod are o legătură dedicată cu un switch sau hub central."
    },
    {
      "id": "retelistica-01-03",
      "module": "01-infrastructura",
      "type": "single",
      "difficulty": "medium",
      "text": "Care interval de adrese IPv4 este privat?",
      "options": [
        {
          "id": "a",
          "text": "8.8.0.0/16"
        },
        {
          "id": "b",
          "text": "192.168.0.0/16"
        },
        {
          "id": "c",
          "text": "100.0.0.0/8"
        },
        {
          "id": "d",
          "text": "200.10.0.0/16"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Intervalele private (RFC 1918) sunt 10.0.0.0/8, 172.16.0.0/12 și 192.168.0.0/16. Ele nu sunt rutate pe Internet."
    },
    {
      "id": "retelistica-01-04",
      "module": "01-infrastructura",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce mască de subrețea corespunde prefixului /24?",
      "options": [
        {
          "id": "a",
          "text": "255.0.0.0"
        },
        {
          "id": "b",
          "text": "255.255.0.0"
        },
        {
          "id": "c",
          "text": "255.255.255.0"
        },
        {
          "id": "d",
          "text": "255.255.255.128"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "/24 înseamnă 24 de biți de 1 în mască: 11111111.11111111.11111111.00000000, adică 255.255.255.0."
    },
    {
      "id": "retelistica-02-01",
      "module": "02-hardware",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce dispozitiv transmite cadrele în interiorul unei rețele locale pe baza adreselor MAC?",
      "options": [
        {
          "id": "a",
          "text": "Router"
        },
        {
          "id": "b",
          "text": "Switch"
        },
        {
          "id": "c",
          "text": "Modem"
        },
        {
          "id": "d",
          "text": "Repetor"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Switch-ul învață adresele MAC de pe fiecare port și trimite cadrele doar către destinatarul potrivit."
    },
    {
      "id": "retelistica-02-02",
      "module": "02-hardware",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce dispozitiv conectează rețele diferite și direcționează pachetele pe baza adreselor IP?",
      "options": [
        {
          "id": "a",
          "text": "Hub"
        },
        {
          "id": "b",
          "text": "Switch"
        },
        {
          "id": "c",
          "text": "Router"
        },
        {
          "id": "d",
          "text": "Punct de acces"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Routerul lucrează la nivelul rețea (OSI 3) și alege drumul pachetelor între rețele."
    },
    {
      "id": "retelistica-02-03",
      "module": "02-hardware",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce conector se folosește de obicei la un cablu Ethernet torsadat (Cat 5e/Cat 6)?",
      "options": [
        {
          "id": "a",
          "text": "RJ-11"
        },
        {
          "id": "b",
          "text": "RJ-45"
        },
        {
          "id": "c",
          "text": "BNC"
        },
        {
          "id": "d",
          "text": "USB-C"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "RJ-45 are 8 pini și este conectorul standard pentru Ethernet pe cablu torsadat. RJ-11 se folosește la telefonie."
    },
    {
      "id": "retelistica-02-04",
      "module": "02-hardware",
      "type": "true_false",
      "difficulty": "easy",
      "text": "Un hub trimite fiecare cadru primit pe toate celelalte porturi.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Hub-ul nu „știe” nimic despre adrese, doar repetă semnalul. Din acest motiv a fost înlocuit de switch-uri."
    },
    {
      "id": "retelistica-03-01",
      "module": "03-protocoale-servicii",
      "type": "single",
      "difficulty": "easy",
      "text": "Care este rolul principal al serviciului DNS?",
      "options": [
        {
          "id": "a",
          "text": "Atribuie automat adrese IP"
        },
        {
          "id": "b",
          "text": "Traduce nume de domenii în adrese IP"
        },
        {
          "id": "c",
          "text": "Criptează traficul"
        },
        {
          "id": "d",
          "text": "Blochează site-urile periculoase"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "DNS funcționează ca o „agendă” a Internetului: transformă de exemplu example.com în adresa IP a serverului."
    },
    {
      "id": "retelistica-03-02",
      "module": "03-protocoale-servicii",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce protocol atribuie automat adrese IP dispozitivelor din rețea?",
      "options": [
        {
          "id": "a",
          "text": "DNS"
        },
        {
          "id": "b",
          "text": "DHCP"
        },
        {
          "id": "c",
          "text": "FTP"
        },
        {
          "id": "d",
          "text": "ARP"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "DHCP oferă dispozitivelor adresa IP, masca, gateway-ul și serverele DNS."
    },
    {
      "id": "retelistica-03-03",
      "module": "03-protocoale-servicii",
      "type": "multiple",
      "difficulty": "hard",
      "text": "Care dintre următoarele servicii folosesc TCP ca protocol de transport?",
      "options": [
        {
          "id": "a",
          "text": "HTTPS (port 443)"
        },
        {
          "id": "b",
          "text": "SSH (port 22)"
        },
        {
          "id": "c",
          "text": "SMTP (port 25)"
        },
        {
          "id": "d",
          "text": "TFTP (port 69)"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "HTTPS, SSH și SMTP au nevoie de livrare sigură, deci folosesc TCP. TFTP folosește UDP."
    },
    {
      "id": "retelistica-03-04",
      "module": "03-protocoale-servicii",
      "type": "single",
      "difficulty": "easy",
      "text": "Care este portul implicit pentru HTTPS?",
      "options": [
        {
          "id": "a",
          "text": "21"
        },
        {
          "id": "b",
          "text": "80"
        },
        {
          "id": "c",
          "text": "443"
        },
        {
          "id": "d",
          "text": "8080"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "HTTP folosește implicit portul 80, iar HTTPS portul 443."
    },
    {
      "id": "retelistica-03-05",
      "module": "03-protocoale-servicii",
      "type": "single",
      "difficulty": "medium",
      "text": "La ce nivel al modelului OSI funcționează protocolul IP?",
      "options": [
        {
          "id": "a",
          "text": "Nivelul 2 — legătură de date"
        },
        {
          "id": "b",
          "text": "Nivelul 3 — rețea"
        },
        {
          "id": "c",
          "text": "Nivelul 4 — transport"
        },
        {
          "id": "d",
          "text": "Nivelul 7 — aplicație"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "IP se ocupă de adresarea logică și de rutare, adică nivelul 3 (rețea). TCP și UDP sunt la nivelul 4."
    },
    {
      "id": "retelistica-04-01",
      "module": "04-securitate",
      "type": "single",
      "difficulty": "easy",
      "text": "Care este rolul unui firewall?",
      "options": [
        {
          "id": "a",
          "text": "Mărește viteza Internetului"
        },
        {
          "id": "b",
          "text": "Filtrează traficul de rețea pe baza unor reguli"
        },
        {
          "id": "c",
          "text": "Atribuie adrese IP"
        },
        {
          "id": "d",
          "text": "Face copii de rezervă"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Firewall-ul permite sau blochează traficul în funcție de reguli (adrese, porturi, protocoale, aplicații)."
    },
    {
      "id": "retelistica-04-02",
      "module": "04-securitate",
      "type": "single",
      "difficulty": "medium",
      "text": "Care standard de securitate Wi-Fi este cel mai sigur dintre cele de mai jos?",
      "options": [
        {
          "id": "a",
          "text": "WEP"
        },
        {
          "id": "b",
          "text": "WPA"
        },
        {
          "id": "c",
          "text": "WPA2"
        },
        {
          "id": "d",
          "text": "WPA3"
        }
      ],
      "correct": [
        "d"
      ],
      "explanation": "WPA3 este cel mai recent standard și oferă protecție mai bună împotriva ghicirii parolei. WEP este considerat nesigur."
    },
    {
      "id": "retelistica-04-03",
      "module": "04-securitate",
      "type": "true_false",
      "difficulty": "easy",
      "text": "Un VPN criptează traficul dintre dispozitivul tău și serverul VPN.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "VPN-ul creează un „tunel” criptat, util mai ales în rețele publice, cum sunt cele din cafenele."
    },
    {
      "id": "retelistica-04-04",
      "module": "04-securitate",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce este phishing-ul?",
      "options": [
        {
          "id": "a",
          "text": "Un tip de cablu de rețea"
        },
        {
          "id": "b",
          "text": "Încercarea de a obține date sensibile prin mesaje sau site-uri false"
        },
        {
          "id": "c",
          "text": "O metodă de compresie"
        },
        {
          "id": "d",
          "text": "Un protocol de rutare"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Phishing-ul folosește e-mailuri, mesaje sau pagini false pentru a păcăli utilizatorul să-și dea parolele sau datele."
    },
    {
      "id": "retelistica-05-01",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce comandă verifici mai întâi dacă un alt calculator din rețea răspunde?",
      "options": [
        {
          "id": "a",
          "text": "ping"
        },
        {
          "id": "b",
          "text": "netstat"
        },
        {
          "id": "c",
          "text": "format"
        },
        {
          "id": "d",
          "text": "chkdsk"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "ping trimite cereri ICMP Echo și arată dacă gazda răspunde și în cât timp."
    },
    {
      "id": "retelistica-05-02",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Un calculator cu Windows are adresa 169.254.10.5. Ce indică acest lucru?",
      "options": [
        {
          "id": "a",
          "text": "Conexiune perfectă la Internet"
        },
        {
          "id": "b",
          "text": "Calculatorul nu a primit adresă de la serverul DHCP (APIPA)"
        },
        {
          "id": "c",
          "text": "Adresă publică statică"
        },
        {
          "id": "d",
          "text": "Adresă IPv6"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Adresele 169.254.x.x sunt autoconfigurate (APIPA) atunci când serverul DHCP nu răspunde."
    },
    {
      "id": "retelistica-05-03",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce afișează comanda tracert (traceroute)?",
      "options": [
        {
          "id": "a",
          "text": "Lista fișierelor partajate"
        },
        {
          "id": "b",
          "text": "Routerele (hop-urile) prin care trec pachetele până la destinație"
        },
        {
          "id": "c",
          "text": "Viteza de descărcare"
        },
        {
          "id": "d",
          "text": "Adresa MAC a plăcii de rețea"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "tracert arată fiecare hop de pe drum și timpul de răspuns, așa că ajută la găsirea punctului unde se pierde conexiunea."
    },
    {
      "id": "retelistica-05-04",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce comandă din Windows afișează configurația completă a plăcilor de rețea (IP, DNS, MAC, DHCP)?",
      "options": [
        {
          "id": "a",
          "text": "ipconfig /all"
        },
        {
          "id": "b",
          "text": "ping /all"
        },
        {
          "id": "c",
          "text": "netsh /show"
        },
        {
          "id": "d",
          "text": "route print /all"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "ipconfig /all afișează toate detaliile despre fiecare adaptor de rețea."
    },
    {
      "id": "retelistica-01-05",
      "module": "01-infrastructura",
      "type": "single",
      "difficulty": "medium",
      "text": "Câte adrese utilizabile pentru gazde are o subrețea /26?",
      "options": [
        {
          "id": "a",
          "text": "30"
        },
        {
          "id": "b",
          "text": "62"
        },
        {
          "id": "c",
          "text": "64"
        },
        {
          "id": "d",
          "text": "126"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "/26 lasă 6 biți pentru gazde: 2⁶ = 64 adrese, minus adresa de rețea și cea de broadcast = 62."
    },
    {
      "id": "retelistica-01-06",
      "module": "01-infrastructura",
      "type": "single",
      "difficulty": "easy",
      "text": "Care dintre adresele de mai jos este privată?",
      "options": [
        {
          "id": "a",
          "text": "8.8.8.8"
        },
        {
          "id": "b",
          "text": "192.168.1.10"
        },
        {
          "id": "c",
          "text": "172.32.0.5"
        },
        {
          "id": "d",
          "text": "11.0.0.1"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Intervalele private sunt 10.0.0.0/8, 172.16.0.0/12 (172.16–172.31) și 192.168.0.0/16."
    },
    {
      "id": "retelistica-01-07",
      "module": "01-infrastructura",
      "type": "matching",
      "difficulty": "medium",
      "text": "Potrivește fiecare tip de rețea cu descrierea lui.",
      "pairs": [
        {
          "target": "Rețeaua dintr-o clădire sau școală",
          "answer": "LAN"
        },
        {
          "target": "Leagă orașe sau țări",
          "answer": "WAN"
        },
        {
          "target": "Acoperă un oraș",
          "answer": "MAN"
        },
        {
          "target": "Dispozitive personale la câțiva metri (Bluetooth)",
          "answer": "PAN"
        }
      ],
      "distractors": [
        "VLAN"
      ],
      "explanation": "LAN = local, WAN = arie largă, MAN = metropolitan, PAN = rețea personală."
    },
    {
      "id": "retelistica-01-08",
      "module": "01-infrastructura",
      "type": "true_false",
      "difficulty": "easy",
      "text": "O adresă IPv6 are 128 de biți.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "IPv4 are 32 de biți, iar IPv6 are 128 de biți, scriși în opt grupuri hexazecimale."
    },
    {
      "id": "retelistica-02-05",
      "module": "02-hardware",
      "type": "matching",
      "difficulty": "medium",
      "text": "Trage fiecare conector lângă dispozitivul la care se conectează de obicei.",
      "pairs": [
        {
          "target": "Căști",
          "answer": "AUDIO"
        },
        {
          "target": "Rețea",
          "answer": "ETHERNET"
        },
        {
          "target": "Televizor",
          "answer": "HDMI"
        },
        {
          "target": "Imprimantă",
          "answer": "USB"
        },
        {
          "target": "Smartphone",
          "answer": "USB TYPE C"
        }
      ],
      "explanation": "Căștile folosesc mufa audio de 3,5 mm, rețeaua cablul Ethernet (RJ-45), televizorul HDMI, imprimanta clasic USB, iar telefoanele moderne USB Type-C."
    },
    {
      "id": "retelistica-02-06",
      "module": "02-hardware",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce dispozitiv transmite cadrele doar către portul destinatarului, folosind adresele MAC?",
      "options": [
        {
          "id": "a",
          "text": "Hub"
        },
        {
          "id": "b",
          "text": "Switch"
        },
        {
          "id": "c",
          "text": "Repetor"
        },
        {
          "id": "d",
          "text": "Modem"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Switch-ul învață adresele MAC și trimite cadrul doar pe portul potrivit; hub-ul îl trimite pe toate porturile."
    },
    {
      "id": "retelistica-02-07",
      "module": "02-hardware",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce tip de cablu oferă cea mai bună imunitate la interferențe electromagnetice pe distanțe mari?",
      "options": [
        {
          "id": "a",
          "text": "UTP Cat5e"
        },
        {
          "id": "b",
          "text": "Coaxial"
        },
        {
          "id": "c",
          "text": "Fibră optică"
        },
        {
          "id": "d",
          "text": "STP Cat6"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Fibra optică transmite lumină, deci nu este afectată de interferențe electromagnetice și acoperă distanțe mari."
    },
    {
      "id": "retelistica-03-06",
      "module": "03-protocoale-servicii",
      "type": "matching",
      "difficulty": "medium",
      "text": "Potrivește fiecare protocol cu portul lui implicit.",
      "pairs": [
        {
          "target": "HTTP",
          "answer": "80"
        },
        {
          "target": "HTTPS",
          "answer": "443"
        },
        {
          "target": "DNS",
          "answer": "53"
        },
        {
          "target": "SSH",
          "answer": "22"
        },
        {
          "target": "FTP (control)",
          "answer": "21"
        }
      ],
      "distractors": [
        "25"
      ],
      "explanation": "HTTP 80, HTTPS 443, DNS 53, SSH 22, FTP 21. Portul 25 este folosit de SMTP."
    },
    {
      "id": "retelistica-03-07",
      "module": "03-protocoale-servicii",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce serviciu atribuie automat adrese IP dispozitivelor dintr-o rețea?",
      "options": [
        {
          "id": "a",
          "text": "DNS"
        },
        {
          "id": "b",
          "text": "DHCP"
        },
        {
          "id": "c",
          "text": "NAT"
        },
        {
          "id": "d",
          "text": "ARP"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "DHCP oferă automat adresa IP, masca, gateway-ul și serverele DNS."
    },
    {
      "id": "retelistica-03-08",
      "module": "03-protocoale-servicii",
      "type": "single",
      "difficulty": "medium",
      "text": "La ce nivel al modelului OSI lucrează un router?",
      "options": [
        {
          "id": "a",
          "text": "Fizic (1)"
        },
        {
          "id": "b",
          "text": "Legătură de date (2)"
        },
        {
          "id": "c",
          "text": "Rețea (3)"
        },
        {
          "id": "d",
          "text": "Transport (4)"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Routerul direcționează pachete pe baza adreselor IP — nivelul 3, Rețea."
    },
    {
      "id": "retelistica-04-05",
      "module": "04-securitate",
      "type": "single",
      "difficulty": "medium",
      "text": "Care standard de securitate Wi-Fi este cel mai sigur?",
      "options": [
        {
          "id": "a",
          "text": "WEP"
        },
        {
          "id": "b",
          "text": "WPA"
        },
        {
          "id": "c",
          "text": "WPA2"
        },
        {
          "id": "d",
          "text": "WPA3"
        }
      ],
      "correct": [
        "d"
      ],
      "explanation": "WPA3 este cel mai recent și mai sigur; WEP este depășit și ușor de spart."
    },
    {
      "id": "retelistica-04-06",
      "module": "04-securitate",
      "type": "single",
      "difficulty": "easy",
      "text": "Un e-mail fals care imită banca și cere parola este un exemplu de:",
      "options": [
        {
          "id": "a",
          "text": "Phishing"
        },
        {
          "id": "b",
          "text": "DDoS"
        },
        {
          "id": "c",
          "text": "Spoofing ARP"
        },
        {
          "id": "d",
          "text": "Brute force"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Phishing-ul păcălește utilizatorul să dezvăluie date confidențiale prin mesaje care par legitime."
    },
    {
      "id": "retelistica-04-07",
      "module": "04-securitate",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Un VPN creează un tunel criptat între dispozitiv și rețeaua de destinație.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "VPN-ul încapsulează și criptează traficul, protejându-l pe rețelele nesigure."
    },
    {
      "id": "retelistica-05-05",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Un calculator are adresa 169.254.12.7. Ce indică acest lucru?",
      "options": [
        {
          "id": "a",
          "text": "Conexiune corectă la internet"
        },
        {
          "id": "b",
          "text": "Nu a primit adresă de la serverul DHCP (APIPA)"
        },
        {
          "id": "c",
          "text": "Adresă publică statică"
        },
        {
          "id": "d",
          "text": "Conflict DNS"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "169.254.x.x este o adresă APIPA, atribuită automat când serverul DHCP nu răspunde."
    },
    {
      "id": "retelistica-05-06",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce comandă Windows afișează adresa IP, masca și gateway-ul?",
      "options": [
        {
          "id": "a",
          "text": "ping"
        },
        {
          "id": "b",
          "text": "ipconfig"
        },
        {
          "id": "c",
          "text": "tracert"
        },
        {
          "id": "d",
          "text": "netstat"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "ipconfig (sau ipconfig /all pentru detalii) afișează configurația IP a adaptoarelor."
    },
    {
      "id": "retelistica-05-07",
      "module": "05-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "ping 8.8.8.8 funcționează, dar ping google.com nu. Ce problemă este cea mai probabilă?",
      "options": [
        {
          "id": "a",
          "text": "Cablul este deconectat"
        },
        {
          "id": "b",
          "text": "Problemă DNS"
        },
        {
          "id": "c",
          "text": "Placa de rețea defectă"
        },
        {
          "id": "d",
          "text": "Gateway greșit"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Conectivitatea IP există, deci problema este rezolvarea numelor — serviciul DNS."
    }
  ],
  "html5": [
    {
      "id": "html5-01-01",
      "module": "01-ciclu-viata",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este rolul fișierului manifest al unei aplicații web (manifest.json)?",
      "options": [
        {
          "id": "a",
          "text": "Stochează parolele utilizatorilor"
        },
        {
          "id": "b",
          "text": "Descrie aplicația (nume, iconițe, culori) ca să poată fi instalată pe dispozitiv"
        },
        {
          "id": "c",
          "text": "Comprimă imaginile"
        },
        {
          "id": "d",
          "text": "Înlocuiește fișierul HTML"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Manifestul web oferă browserului informațiile necesare pentru instalarea aplicației ca PWA."
    },
    {
      "id": "html5-01-02",
      "module": "01-ciclu-viata",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce tehnologie permite unei aplicații web să funcționeze offline, prin interceptarea cererilor și servirea lor din cache?",
      "options": [
        {
          "id": "a",
          "text": "Cookies"
        },
        {
          "id": "b",
          "text": "Service Worker"
        },
        {
          "id": "c",
          "text": "iframe"
        },
        {
          "id": "d",
          "text": "WebSocket"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Service Worker-ul rulează separat de pagină, interceptează cererile de rețea și poate răspunde din cache."
    },
    {
      "id": "html5-01-03",
      "module": "01-ciclu-viata",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este diferența dintre localStorage și sessionStorage?",
      "options": [
        {
          "id": "a",
          "text": "sessionStorage este șters la închiderea filei, iar localStorage persistă"
        },
        {
          "id": "b",
          "text": "localStorage este criptat"
        },
        {
          "id": "c",
          "text": "sessionStorage poate stoca mai multe date"
        },
        {
          "id": "d",
          "text": "Nu există nicio diferență"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Ambele stochează perechi cheie-valoare de tip text. sessionStorage trăiește cât fila, iar localStorage rămâne și după repornirea browserului."
    },
    {
      "id": "html5-01-04",
      "module": "01-ciclu-viata",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Datele din localStorage sunt trimise automat la server cu fiecare cerere HTTP.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Cookie-urile se trimit cu fiecare cerere. localStorage rămâne doar în browser până când îl citește un script."
    },
    {
      "id": "html5-02-01",
      "module": "02-interfata-html5",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce element semantic HTML5 se folosește pentru blocul principal de navigare?",
      "options": [
        {
          "id": "a",
          "text": "<div id=\"nav\">"
        },
        {
          "id": "b",
          "text": "<nav>"
        },
        {
          "id": "c",
          "text": "<menu>"
        },
        {
          "id": "d",
          "text": "<navigation>"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "<nav> marchează un grup de linkuri de navigare. Ajută cititoarele de ecran și motoarele de căutare."
    },
    {
      "id": "html5-02-02",
      "module": "02-interfata-html5",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce tip de input validează automat că valoarea arată ca o adresă de e-mail?",
      "options": [
        {
          "id": "a",
          "text": "type=\"text\""
        },
        {
          "id": "b",
          "text": "type=\"mail\""
        },
        {
          "id": "c",
          "text": "type=\"email\""
        },
        {
          "id": "d",
          "text": "type=\"address\""
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "type=\"email\" activează validarea nativă a formatului și, pe telefon, o tastatură potrivită."
    },
    {
      "id": "html5-02-03",
      "module": "02-interfata-html5",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este diferența principală dintre <canvas> și <svg>?",
      "options": [
        {
          "id": "a",
          "text": "canvas desenează pixeli prin JavaScript, iar svg descrie forme vectoriale în marcaj"
        },
        {
          "id": "b",
          "text": "svg nu se poate stiliza cu CSS"
        },
        {
          "id": "c",
          "text": "canvas este doar pentru video"
        },
        {
          "id": "d",
          "text": "Nu există nicio diferență"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "<canvas> este o suprafață bitmap pe care desenezi cu JavaScript. SVG este vectorial: fiecare formă este un element din DOM."
    },
    {
      "id": "html5-02-04",
      "module": "02-interfata-html5",
      "type": "multiple",
      "difficulty": "medium",
      "text": "Care dintre următoarele sunt elemente semantice HTML5?",
      "options": [
        {
          "id": "a",
          "text": "<header>"
        },
        {
          "id": "b",
          "text": "<div>"
        },
        {
          "id": "c",
          "text": "<article>"
        },
        {
          "id": "d",
          "text": "<span>"
        },
        {
          "id": "e",
          "text": "<footer>"
        }
      ],
      "correct": [
        "a",
        "c",
        "e"
      ],
      "explanation": "<header>, <article> și <footer> descriu rolul conținutului. <div> și <span> sunt containere generice, fără semnificație."
    },
    {
      "id": "html5-02-05",
      "module": "02-interfata-html5",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce atribut face ca un câmp de formular să fie obligatoriu?",
      "options": [
        {
          "id": "a",
          "text": "mandatory"
        },
        {
          "id": "b",
          "text": "required"
        },
        {
          "id": "c",
          "text": "validate"
        },
        {
          "id": "d",
          "text": "needed"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Cu required, browserul nu trimite formularul cât timp câmpul este gol."
    },
    {
      "id": "html5-03-01",
      "module": "03-formatare-css",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce proprietate aliniază elementele unui container Flexbox pe axa principală?",
      "options": [
        {
          "id": "a",
          "text": "align-items"
        },
        {
          "id": "b",
          "text": "justify-content"
        },
        {
          "id": "c",
          "text": "flex-wrap"
        },
        {
          "id": "d",
          "text": "text-align"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "justify-content controlează axa principală. align-items controlează axa transversală."
    },
    {
      "id": "html5-03-02",
      "module": "03-formatare-css",
      "type": "single",
      "difficulty": "medium",
      "text": "Care selector are cea mai mare specificitate?",
      "options": [
        {
          "id": "a",
          "text": "p"
        },
        {
          "id": "b",
          "text": ".titlu"
        },
        {
          "id": "c",
          "text": "#principal"
        },
        {
          "id": "d",
          "text": "div p"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Selectorii de ID (#) sunt mai specifici decât clasele, iar clasele sunt mai specifice decât elementele."
    },
    {
      "id": "html5-03-03",
      "module": "03-formatare-css",
      "type": "code_output",
      "difficulty": "hard",
      "text": "Ce lățime totală ocupă pe ecran un element cu stilul de mai jos?",
      "code": ".box {\n  box-sizing: border-box;\n  width: 200px;\n  padding: 10px;\n  border: 5px solid;\n}",
      "options": [
        {
          "id": "a",
          "text": "200px"
        },
        {
          "id": "b",
          "text": "220px"
        },
        {
          "id": "c",
          "text": "230px"
        },
        {
          "id": "d",
          "text": "210px"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Cu box-sizing: border-box, width include padding-ul și bordura, deci lățimea totală rămâne 200px. Cu content-box ar fi fost 230px."
    },
    {
      "id": "html5-03-04",
      "module": "03-formatare-css",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce media query aplică stilurile doar pe ecranele late de cel mult 600px?",
      "options": [
        {
          "id": "a",
          "text": "@media (min-width: 600px)"
        },
        {
          "id": "b",
          "text": "@media (max-width: 600px)"
        },
        {
          "id": "c",
          "text": "@media screen = 600px"
        },
        {
          "id": "d",
          "text": "@screen (600px)"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "max-width: 600px înseamnă „până la 600px inclusiv”. Este folosit des pentru stilurile de telefon."
    },
    {
      "id": "html5-04-01",
      "module": "04-javascript",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul?",
      "code": "console.log(typeof null);",
      "options": [
        {
          "id": "a",
          "text": "\"null\""
        },
        {
          "id": "b",
          "text": "\"undefined\""
        },
        {
          "id": "c",
          "text": "\"object\""
        },
        {
          "id": "d",
          "text": "\"boolean\""
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Este o particularitate istorică a JavaScript: typeof null returnează \"object\"."
    },
    {
      "id": "html5-04-02",
      "module": "04-javascript",
      "type": "code_output",
      "difficulty": "easy",
      "text": "Ce afișează codul?",
      "code": "console.log(\"5\" + 3);",
      "options": [
        {
          "id": "a",
          "text": "8"
        },
        {
          "id": "b",
          "text": "\"53\""
        },
        {
          "id": "c",
          "text": "NaN"
        },
        {
          "id": "d",
          "text": "TypeError"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Când un operand este șir, + face concatenare: \"5\" + 3 dă \"53\". În schimb, \"5\" - 3 dă 2."
    },
    {
      "id": "html5-04-03",
      "module": "04-javascript",
      "type": "single",
      "difficulty": "easy",
      "text": "Cum selectezi elementul cu id=\"scor\"?",
      "options": [
        {
          "id": "a",
          "text": "document.getElementById(\"scor\")"
        },
        {
          "id": "b",
          "text": "document.getElement(\"#scor\")"
        },
        {
          "id": "c",
          "text": "document.id(\"scor\")"
        },
        {
          "id": "d",
          "text": "window.scor.select()"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "getElementById primește ID-ul fără #. Echivalent: document.querySelector(\"#scor\")."
    },
    {
      "id": "html5-04-04",
      "module": "04-javascript",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este diferența dintre == și ===?",
      "options": [
        {
          "id": "a",
          "text": "=== compară valoarea și tipul, fără conversie"
        },
        {
          "id": "b",
          "text": "== este mai strict"
        },
        {
          "id": "c",
          "text": "=== se folosește doar la șiruri"
        },
        {
          "id": "d",
          "text": "Nu există nicio diferență"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "== convertește tipurile înainte de comparare (0 == \"0\" este true). === nu convertește (0 === \"0\" este false)."
    },
    {
      "id": "html5-04-05",
      "module": "04-javascript",
      "type": "single",
      "difficulty": "easy",
      "text": "Cum adaugi o funcție care rulează la apăsarea unui buton?",
      "options": [
        {
          "id": "a",
          "text": "buton.addEventListener(\"click\", functie)"
        },
        {
          "id": "b",
          "text": "buton.onClick(functie)"
        },
        {
          "id": "c",
          "text": "buton.listen(\"press\", functie)"
        },
        {
          "id": "d",
          "text": "buton.event = \"click\""
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "addEventListener(tip, funcție) atașează un handler. Pot fi atașate mai multe handlere pentru același eveniment."
    },
    {
      "id": "html5-01-05",
      "module": "01-ciclu-viata",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce fișier descrie numele, iconițele și culorile unei aplicații web progresive (PWA)?",
      "options": [
        {
          "id": "a",
          "text": "service-worker.js"
        },
        {
          "id": "b",
          "text": "manifest.json (web app manifest)"
        },
        {
          "id": "c",
          "text": "robots.txt"
        },
        {
          "id": "d",
          "text": "package.json"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Manifestul aplicației web declară numele, iconițele, culoarea temei și modul de afișare al PWA."
    },
    {
      "id": "html5-01-06",
      "module": "01-ciclu-viata",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este diferența dintre localStorage și sessionStorage?",
      "options": [
        {
          "id": "a",
          "text": "localStorage se șterge la închiderea filei"
        },
        {
          "id": "b",
          "text": "sessionStorage persistă după repornire"
        },
        {
          "id": "c",
          "text": "localStorage persistă după închiderea browserului, sessionStorage nu"
        },
        {
          "id": "d",
          "text": "Nu există diferență"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Datele din localStorage rămân până sunt șterse; sessionStorage durează doar cât sesiunea filei."
    },
    {
      "id": "html5-01-07",
      "module": "01-ciclu-viata",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Un service worker poate intercepta cererile de rețea și răspunde din cache, permițând funcționarea offline.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Service worker-ul ascultă evenimentul fetch și poate servi resurse din Cache Storage."
    },
    {
      "id": "html5-02-06",
      "module": "02-interfata-html5",
      "type": "matching",
      "difficulty": "easy",
      "text": "Trage fiecare element semantic lângă rolul lui.",
      "pairs": [
        {
          "target": "Meniul principal de navigare",
          "answer": "<nav>"
        },
        {
          "target": "Conținut independent, de ex. o știre",
          "answer": "<article>"
        },
        {
          "target": "Conținut secundar, lateral",
          "answer": "<aside>"
        },
        {
          "target": "Subsolul paginii",
          "answer": "<footer>"
        },
        {
          "target": "Conținutul principal, unic în pagină",
          "answer": "<main>"
        }
      ],
      "distractors": [
        "<div>"
      ],
      "explanation": "Elementele semantice descriu rolul conținutului; <div> nu are semnificație semantică."
    },
    {
      "id": "html5-02-07",
      "module": "02-interfata-html5",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce atribut face un câmp de formular obligatoriu?",
      "options": [
        {
          "id": "a",
          "text": "needed"
        },
        {
          "id": "b",
          "text": "required"
        },
        {
          "id": "c",
          "text": "validate"
        },
        {
          "id": "d",
          "text": "mandatory"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Atributul boolean required împiedică trimiterea formularului dacă câmpul este gol."
    },
    {
      "id": "html5-02-08",
      "module": "02-interfata-html5",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce tip de input afișează pe mobil o tastatură optimizată pentru adrese de e-mail și validează formatul?",
      "options": [
        {
          "id": "a",
          "text": "type=\"text\""
        },
        {
          "id": "b",
          "text": "type=\"email\""
        },
        {
          "id": "c",
          "text": "type=\"mail\""
        },
        {
          "id": "d",
          "text": "type=\"url\""
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "type=\"email\" validează formatul și oferă tastatura potrivită pe dispozitive mobile."
    },
    {
      "id": "html5-03-05",
      "module": "03-formatare-css",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce lățime totală ocupă elementul (box-sizing implicit: content-box)?",
      "code": ".card {\n  width: 200px;\n  padding: 10px;\n  border: 5px solid;\n}",
      "options": [
        {
          "id": "a",
          "text": "200px"
        },
        {
          "id": "b",
          "text": "215px"
        },
        {
          "id": "c",
          "text": "230px"
        },
        {
          "id": "d",
          "text": "220px"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "Cu content-box: 200 + 2×10 (padding) + 2×5 (bordură) = 230px. Cu border-box ar fi exact 200px."
    },
    {
      "id": "html5-03-06",
      "module": "03-formatare-css",
      "type": "matching",
      "difficulty": "hard",
      "text": "Ordonează selectorii după specificitate: potrivește fiecare selector cu valoarea lui.",
      "pairs": [
        {
          "target": "#meniu",
          "answer": "(1,0,0)"
        },
        {
          "target": ".activ",
          "answer": "(0,1,0)"
        },
        {
          "target": "p",
          "answer": "(0,0,1)"
        },
        {
          "target": "#meniu .activ a",
          "answer": "(1,1,1)"
        }
      ],
      "distractors": [
        "(0,2,0)"
      ],
      "explanation": "ID-urile contează (1,0,0), clasele (0,1,0), elementele (0,0,1); valorile se adună pentru selectorii compuși."
    },
    {
      "id": "html5-03-07",
      "module": "03-formatare-css",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce proprietate Flexbox aliniază elementele pe axa principală?",
      "options": [
        {
          "id": "a",
          "text": "align-items"
        },
        {
          "id": "b",
          "text": "justify-content"
        },
        {
          "id": "c",
          "text": "flex-wrap"
        },
        {
          "id": "d",
          "text": "align-content"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "justify-content lucrează pe axa principală; align-items pe axa transversală."
    },
    {
      "id": "html5-04-06",
      "module": "04-javascript",
      "type": "code_output",
      "difficulty": "medium",
      "text": "Ce afișează codul în consolă?",
      "code": "console.log(typeof null, typeof [])",
      "options": [
        {
          "id": "a",
          "text": "null array"
        },
        {
          "id": "b",
          "text": "object object"
        },
        {
          "id": "c",
          "text": "null object"
        },
        {
          "id": "d",
          "text": "undefined array"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "O particularitate istorică: typeof null este \"object\"; tablourile sunt tot obiecte. Pentru tablouri se folosește Array.isArray()."
    },
    {
      "id": "html5-04-07",
      "module": "04-javascript",
      "type": "single",
      "difficulty": "easy",
      "text": "Care metodă selectează primul element care corespunde unui selector CSS?",
      "options": [
        {
          "id": "a",
          "text": "document.getElement()"
        },
        {
          "id": "b",
          "text": "document.querySelector()"
        },
        {
          "id": "c",
          "text": "document.findFirst()"
        },
        {
          "id": "d",
          "text": "document.select()"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "querySelector returnează primul element potrivit; querySelectorAll returnează toate."
    },
    {
      "id": "html5-04-08",
      "module": "04-javascript",
      "type": "code_output",
      "difficulty": "hard",
      "text": "Ce afișează codul?",
      "code": "console.log(\"5\" + 3, \"5\" - 3)",
      "options": [
        {
          "id": "a",
          "text": "8 2"
        },
        {
          "id": "b",
          "text": "53 2"
        },
        {
          "id": "c",
          "text": "53 \"2\""
        },
        {
          "id": "d",
          "text": "8 \"53\""
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "+ cu un șir face concatenare (\"53\"), iar - convertește șirul în număr (2)."
    }
  ],
  "configurare-dispozitive": [
    {
      "id": "configurare-dispozitive-01-01",
      "module": "01-configurare",
      "type": "single",
      "difficulty": "easy",
      "text": "Unde modifici rezoluția ecranului în Windows 10/11?",
      "options": [
        {
          "id": "a",
          "text": "Setări → Sistem → Afișare"
        },
        {
          "id": "b",
          "text": "Panou de control → Programe"
        },
        {
          "id": "c",
          "text": "Manager activități → Performanță"
        },
        {
          "id": "d",
          "text": "Setări → Confidențialitate"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Rezoluția, scalarea și orientarea ecranului se găsesc în Setări → Sistem → Afișare."
    },
    {
      "id": "configurare-dispozitive-01-02",
      "module": "01-configurare",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce este un driver?",
      "options": [
        {
          "id": "a",
          "text": "Un program antivirus"
        },
        {
          "id": "b",
          "text": "Un software care permite sistemului de operare să comunice cu un dispozitiv hardware"
        },
        {
          "id": "c",
          "text": "O componentă fizică a plăcii de bază"
        },
        {
          "id": "d",
          "text": "Un tip de cont de utilizator"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Driverul „traduce” comenzile sistemului de operare pentru un anumit dispozitiv (imprimantă, placă video etc.)."
    },
    {
      "id": "configurare-dispozitive-01-03",
      "module": "01-configurare",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Windows pe 64 de biți poate rula majoritatea aplicațiilor pe 32 de biți.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Windows pe 64 de biți include stratul de compatibilitate WOW64 pentru aplicațiile pe 32 de biți. Driverele pe 32 de biți nu funcționează însă."
    },
    {
      "id": "configurare-dispozitive-01-04",
      "module": "01-configurare",
      "type": "single",
      "difficulty": "medium",
      "text": "Unde vezi și dezactivezi aplicațiile care pornesc automat la deschiderea Windows?",
      "options": [
        {
          "id": "a",
          "text": "Manager activități → Aplicații de pornire"
        },
        {
          "id": "b",
          "text": "Explorer → Acest PC"
        },
        {
          "id": "c",
          "text": "Setări → Ora și limba"
        },
        {
          "id": "d",
          "text": "Coșul de reciclare"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "În Manager activități (Ctrl+Shift+Esc), fila Pornire (Startup) arată impactul fiecărei aplicații și permite dezactivarea ei."
    },
    {
      "id": "configurare-dispozitive-02-01",
      "module": "02-acces-date",
      "type": "single",
      "difficulty": "hard",
      "text": "Un folder are atât permisiuni de partajare, cât și permisiuni NTFS. Ce permisiune se aplică unui utilizator care îl accesează prin rețea?",
      "options": [
        {
          "id": "a",
          "text": "Cea mai permisivă dintre cele două"
        },
        {
          "id": "b",
          "text": "Cea mai restrictivă dintre cele două"
        },
        {
          "id": "c",
          "text": "Doar cea de partajare"
        },
        {
          "id": "d",
          "text": "Doar cea NTFS"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "La accesul prin rețea se aplică ambele seturi, iar permisiunea efectivă este cea mai restrictivă."
    },
    {
      "id": "configurare-dispozitive-02-02",
      "module": "02-acces-date",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce înseamnă regula de backup 3-2-1?",
      "options": [
        {
          "id": "a",
          "text": "3 parole, 2 conturi, 1 dispozitiv"
        },
        {
          "id": "b",
          "text": "3 copii ale datelor, pe 2 tipuri de suport, dintre care 1 în altă locație"
        },
        {
          "id": "c",
          "text": "Backup la fiecare 3 zile, păstrat 2 săptămâni, 1 restaurare pe lună"
        },
        {
          "id": "d",
          "text": "3 discuri în RAID 1"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Regula 3-2-1 protejează datele atât de defectarea unui suport, cât și de incidente locale, cum ar fi un incendiu sau un furt."
    },
    {
      "id": "configurare-dispozitive-02-03",
      "module": "02-acces-date",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce sistem de fișiere din Windows suportă permisiuni pe fișiere și criptare?",
      "options": [
        {
          "id": "a",
          "text": "FAT32"
        },
        {
          "id": "b",
          "text": "exFAT"
        },
        {
          "id": "c",
          "text": "NTFS"
        },
        {
          "id": "d",
          "text": "ISO 9660"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "NTFS oferă liste de control al accesului (ACL), criptare EFS, jurnalizare și compresie. FAT32 și exFAT nu au permisiuni."
    },
    {
      "id": "configurare-dispozitive-02-04",
      "module": "02-acces-date",
      "type": "true_false",
      "difficulty": "medium",
      "text": "FAT32 permite stocarea fișierelor mai mari de 4 GB.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "FAT32 limitează un fișier la 4 GB minus 1 octet. Pentru fișiere mai mari se folosește exFAT sau NTFS."
    },
    {
      "id": "configurare-dispozitive-03-01",
      "module": "03-securitate",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce face BitLocker?",
      "options": [
        {
          "id": "a",
          "text": "Blochează site-urile web"
        },
        {
          "id": "b",
          "text": "Criptează unități de stocare întregi"
        },
        {
          "id": "c",
          "text": "Șterge fișierele temporare"
        },
        {
          "id": "d",
          "text": "Gestionează actualizările"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "BitLocker criptează întregul volum. Fără cheie, datele nu pot fi citite nici dacă discul este scos din calculator."
    },
    {
      "id": "configurare-dispozitive-03-02",
      "module": "03-securitate",
      "type": "single",
      "difficulty": "medium",
      "text": "Conform principiului privilegiului minim, ce cont ar trebui folosit pentru activitatea zilnică?",
      "options": [
        {
          "id": "a",
          "text": "Un cont de administrator"
        },
        {
          "id": "b",
          "text": "Un cont standard, iar contul de administrator doar când e nevoie"
        },
        {
          "id": "c",
          "text": "Contul Guest"
        },
        {
          "id": "d",
          "text": "Un cont fără parolă"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Un cont standard limitează pagubele pe care le poate face un program rău intenționat. Drepturile de administrator se cer doar la nevoie (UAC)."
    },
    {
      "id": "configurare-dispozitive-03-03",
      "module": "03-securitate",
      "type": "multiple",
      "difficulty": "medium",
      "text": "Care dintre următoarele sunt factori de autentificare folosiți în MFA?",
      "options": [
        {
          "id": "a",
          "text": "Parola (ceva ce știi)"
        },
        {
          "id": "b",
          "text": "Codul din aplicația de autentificare de pe telefon (ceva ce ai)"
        },
        {
          "id": "c",
          "text": "Amprenta (ceva ce ești)"
        },
        {
          "id": "d",
          "text": "Numele de utilizator"
        }
      ],
      "correct": [
        "a",
        "b",
        "c"
      ],
      "explanation": "MFA combină factori din categorii diferite: cunoaștere, posesie și caracteristici biometrice. Numele de utilizator te identifică, dar nu te autentifică."
    },
    {
      "id": "configurare-dispozitive-03-04",
      "module": "03-securitate",
      "type": "single",
      "difficulty": "easy",
      "text": "De ce sunt importante actualizările de sistem?",
      "options": [
        {
          "id": "a",
          "text": "Schimbă doar aspectul interfeței"
        },
        {
          "id": "b",
          "text": "Corectează vulnerabilități de securitate și erori"
        },
        {
          "id": "c",
          "text": "Șterg datele personale"
        },
        {
          "id": "d",
          "text": "Măresc spațiul pe disc"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Actualizările închid breșe de securitate cunoscute, prin care atacatorii ar putea compromite dispozitivul."
    },
    {
      "id": "configurare-dispozitive-04-01",
      "module": "04-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce face modul sigur (Safe Mode) în Windows?",
      "options": [
        {
          "id": "a",
          "text": "Pornește sistemul doar cu driverele și serviciile minime necesare"
        },
        {
          "id": "b",
          "text": "Formatează discul"
        },
        {
          "id": "c",
          "text": "Dezactivează parola"
        },
        {
          "id": "d",
          "text": "Pornește doar browserul"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Safe Mode încarcă doar componentele esențiale. Dacă problema dispare, cauza este probabil un driver sau o aplicație terță."
    },
    {
      "id": "configurare-dispozitive-04-02",
      "module": "04-depanare",
      "type": "single",
      "difficulty": "easy",
      "text": "În Manager dispozitive apare un semn de exclamare galben lângă placa de rețea. Ce indică acest lucru?",
      "options": [
        {
          "id": "a",
          "text": "Dispozitivul funcționează perfect"
        },
        {
          "id": "b",
          "text": "O problemă cu dispozitivul sau cu driverul lui"
        },
        {
          "id": "c",
          "text": "Dispozitivul este cel mai rapid din sistem"
        },
        {
          "id": "d",
          "text": "Dispozitivul este ascuns"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Semnul galben indică o eroare: lipsește driverul, driverul este incompatibil sau există un conflict de resurse."
    },
    {
      "id": "configurare-dispozitive-04-03",
      "module": "04-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce face Restaurarea sistemului (System Restore)?",
      "options": [
        {
          "id": "a",
          "text": "Readuce fișierele de sistem și setările la un punct de restaurare, fără a afecta documentele personale"
        },
        {
          "id": "b",
          "text": "Reinstalează Windows de la zero"
        },
        {
          "id": "c",
          "text": "Recuperează fișierele șterse din Coș"
        },
        {
          "id": "d",
          "text": "Face backup la fotografii"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "System Restore anulează modificările de sistem (drivere, actualizări, registry), dar nu restaurează și nu șterge documentele personale."
    },
    {
      "id": "configurare-dispozitive-04-04",
      "module": "04-depanare",
      "type": "true_false",
      "difficulty": "easy",
      "text": "Vizualizatorul de evenimente (Event Viewer) afișează jurnalele cu erorile și avertismentele sistemului și ale aplicațiilor.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Event Viewer este primul loc în care cauți detalii despre blocări, erori de servicii sau probleme la pornire."
    },
    {
      "id": "configurare-dispozitive-01-05",
      "module": "01-configurare",
      "type": "matching",
      "difficulty": "easy",
      "text": "Trage fiecare conector lângă dispozitivul periferic pe care îl atașează de obicei.",
      "pairs": [
        {
          "target": "Căști",
          "answer": "AUDIO"
        },
        {
          "target": "Rețea",
          "answer": "ETHERNET"
        },
        {
          "target": "Monitor TV",
          "answer": "HDMI"
        },
        {
          "target": "Imprimantă",
          "answer": "USB"
        },
        {
          "target": "Smartphone",
          "answer": "USB TYPE C"
        }
      ],
      "explanation": "Mufa audio de 3,5 mm pentru căști, RJ-45/Ethernet pentru rețea, HDMI pentru afișaj, USB pentru imprimantă și USB-C pentru telefoane moderne."
    },
    {
      "id": "configurare-dispozitive-01-06",
      "module": "01-configurare",
      "type": "single",
      "difficulty": "easy",
      "text": "Unde verifici în Windows dacă un driver are probleme (semn de exclamare galben)?",
      "options": [
        {
          "id": "a",
          "text": "Task Manager"
        },
        {
          "id": "b",
          "text": "Device Manager (Manager dispozitive)"
        },
        {
          "id": "c",
          "text": "File Explorer"
        },
        {
          "id": "d",
          "text": "Control Panel → Fonts"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Device Manager listează hardware-ul și marchează dispozitivele cu drivere lipsă sau defecte."
    },
    {
      "id": "configurare-dispozitive-01-07",
      "module": "01-configurare",
      "type": "single",
      "difficulty": "medium",
      "text": "Cum dezactivezi o aplicație care pornește automat la logare în Windows 10/11?",
      "options": [
        {
          "id": "a",
          "text": "Task Manager → fila Startup"
        },
        {
          "id": "b",
          "text": "Device Manager"
        },
        {
          "id": "c",
          "text": "Disk Management"
        },
        {
          "id": "d",
          "text": "Event Viewer"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Fila Startup (Pornire) din Task Manager permite activarea sau dezactivarea aplicațiilor la pornire."
    },
    {
      "id": "configurare-dispozitive-01-08",
      "module": "01-configurare",
      "type": "true_false",
      "difficulty": "medium",
      "text": "Un driver nesemnat digital poate reprezenta un risc de securitate și stabilitate.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Semnătura digitală confirmă proveniența driverului; driverele nesemnate pot fi modificate sau instabile."
    },
    {
      "id": "configurare-dispozitive-02-05",
      "module": "02-acces-date",
      "type": "single",
      "difficulty": "medium",
      "text": "Un utilizator are permisiunea Read pe partajare și Modify pe NTFS. Ce permisiune efectivă are accesând folderul din rețea?",
      "options": [
        {
          "id": "a",
          "text": "Modify"
        },
        {
          "id": "b",
          "text": "Read"
        },
        {
          "id": "c",
          "text": "Full Control"
        },
        {
          "id": "d",
          "text": "Niciuna"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Din rețea, se aplică permisiunea cea mai restrictivă dintre partajare și NTFS: Read."
    },
    {
      "id": "configurare-dispozitive-02-06",
      "module": "02-acces-date",
      "type": "matching",
      "difficulty": "medium",
      "text": "Potrivește fiecare tip de backup cu descrierea lui.",
      "pairs": [
        {
          "target": "Copiază toate datele de fiecare dată",
          "answer": "Complet"
        },
        {
          "target": "Doar modificările de la ultimul backup de orice tip",
          "answer": "Incremental"
        },
        {
          "target": "Modificările de la ultimul backup complet",
          "answer": "Diferențial"
        },
        {
          "target": "Copie identică, actualizată continuu",
          "answer": "Oglindire"
        }
      ],
      "distractors": [
        "Arhivare"
      ],
      "explanation": "Complet = tot; incremental = de la ultimul backup; diferențial = de la ultimul complet; oglindire = replică sincronizată."
    },
    {
      "id": "configurare-dispozitive-02-07",
      "module": "02-acces-date",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce sistem de fișiere suportă permisiuni și criptare la nivel de fișier în Windows?",
      "options": [
        {
          "id": "a",
          "text": "FAT32"
        },
        {
          "id": "b",
          "text": "exFAT"
        },
        {
          "id": "c",
          "text": "NTFS"
        },
        {
          "id": "d",
          "text": "ISO 9660"
        }
      ],
      "correct": [
        "c"
      ],
      "explanation": "NTFS oferă ACL-uri (permisiuni), jurnalizare, criptare EFS și compresie; FAT32 nu."
    },
    {
      "id": "configurare-dispozitive-02-08",
      "module": "02-acces-date",
      "type": "single",
      "difficulty": "medium",
      "text": "Care este dimensiunea maximă a unui singur fișier pe o partiție FAT32?",
      "options": [
        {
          "id": "a",
          "text": "2 GB"
        },
        {
          "id": "b",
          "text": "4 GB"
        },
        {
          "id": "c",
          "text": "16 GB"
        },
        {
          "id": "d",
          "text": "Nelimitată"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "FAT32 limitează un fișier la 4 GB minus 1 octet; pentru fișiere mai mari se folosește NTFS sau exFAT."
    },
    {
      "id": "configurare-dispozitive-03-05",
      "module": "03-securitate",
      "type": "single",
      "difficulty": "easy",
      "text": "Ce caracteristică Windows criptează întregul disc?",
      "options": [
        {
          "id": "a",
          "text": "BitLocker"
        },
        {
          "id": "b",
          "text": "Windows Defender Firewall"
        },
        {
          "id": "c",
          "text": "UAC"
        },
        {
          "id": "d",
          "text": "OneDrive"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "BitLocker criptează volume întregi; EFS criptează fișiere individuale."
    },
    {
      "id": "configurare-dispozitive-03-06",
      "module": "03-securitate",
      "type": "matching",
      "difficulty": "medium",
      "text": "Potrivește fiecare factor de autentificare cu categoria lui.",
      "pairs": [
        {
          "target": "Parola",
          "answer": "Ceva ce știi"
        },
        {
          "target": "Cod pe telefon / token",
          "answer": "Ceva ce ai"
        },
        {
          "target": "Amprenta",
          "answer": "Ceva ce ești"
        }
      ],
      "distractors": [
        "Ceva ce vezi"
      ],
      "explanation": "MFA combină cel puțin două categorii: cunoaștere, posesie și inerență (biometrie)."
    },
    {
      "id": "configurare-dispozitive-03-07",
      "module": "03-securitate",
      "type": "single",
      "difficulty": "medium",
      "text": "Ce principiu recomandă ca utilizatorii să lucreze zilnic cu un cont standard, nu de administrator?",
      "options": [
        {
          "id": "a",
          "text": "Principiul privilegiului minim"
        },
        {
          "id": "b",
          "text": "Apărarea în adâncime"
        },
        {
          "id": "c",
          "text": "Separarea rețelelor"
        },
        {
          "id": "d",
          "text": "Securitatea prin obscuritate"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Privilegiul minim limitează daunele pe care le poate face un malware sau o greșeală."
    },
    {
      "id": "configurare-dispozitive-03-08",
      "module": "03-securitate",
      "type": "true_false",
      "difficulty": "easy",
      "text": "Actualizările de securitate trebuie amânate cât mai mult pentru a evita schimbările.",
      "options": [
        {
          "id": "a",
          "text": "Adevărat"
        },
        {
          "id": "b",
          "text": "Fals"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Actualizările închid vulnerabilități cunoscute; amânarea lor lasă dispozitivul expus."
    },
    {
      "id": "configurare-dispozitive-04-05",
      "module": "04-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "Unde cauți detalii despre o eroare apărută la pornirea unui serviciu Windows?",
      "options": [
        {
          "id": "a",
          "text": "Event Viewer (Vizualizator evenimente)"
        },
        {
          "id": "b",
          "text": "Paint"
        },
        {
          "id": "c",
          "text": "Disk Cleanup"
        },
        {
          "id": "d",
          "text": "Windows Store"
        }
      ],
      "correct": [
        "a"
      ],
      "explanation": "Event Viewer înregistrează erorile aplicațiilor, sistemului și securității, cu dată, sursă și cod."
    },
    {
      "id": "configurare-dispozitive-04-06",
      "module": "04-depanare",
      "type": "single",
      "difficulty": "medium",
      "text": "După instalarea unui driver, Windows nu mai pornește normal. Care este primul pas recomandat?",
      "options": [
        {
          "id": "a",
          "text": "Reinstalarea completă a Windows"
        },
        {
          "id": "b",
          "text": "Pornirea în Safe Mode și revenirea la driverul anterior"
        },
        {
          "id": "c",
          "text": "Formatarea discului"
        },
        {
          "id": "d",
          "text": "Schimbarea plăcii de bază"
        }
      ],
      "correct": [
        "b"
      ],
      "explanation": "Safe Mode încarcă doar driverele esențiale; din Device Manager poți folosi „Roll Back Driver”."
    },
    {
      "id": "configurare-dispozitive-04-07",
      "module": "04-depanare",
      "type": "matching",
      "difficulty": "hard",
      "text": "Potrivește fiecare instrument cu problema pe care o rezolvă.",
      "pairs": [
        {
          "target": "Revenire la o stare anterioară a sistemului",
          "answer": "System Restore"
        },
        {
          "target": "Verificarea fișierelor de sistem corupte",
          "answer": "sfc /scannow"
        },
        {
          "target": "Vizualizarea utilizării CPU și RAM",
          "answer": "Task Manager"
        },
        {
          "target": "Gestionarea partițiilor",
          "answer": "Disk Management"
        }
      ],
      "distractors": [
        "Notepad"
      ],
      "explanation": "System Restore revine la un punct de restaurare, sfc repară fișiere de sistem, Task Manager arată resursele, Disk Management gestionează partițiile."
    }
  ]
}

export function questionsFor(courseId: string, moduleId?: string): Question[] {
  const list = bank[courseId] ?? []
  return moduleId ? list.filter((q) => q.module === moduleId) : list
}

export const totalQuestions = Object.values(bank).reduce(
  (sum, list) => sum + list.length,
  0,
)
