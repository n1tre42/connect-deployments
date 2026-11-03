import { bilingual } from '@/lib/translations'
import { hashString, seededRandom, shuffle } from '@/lib/random'
import {
  databaseFacts as sourceDatabaseFacts,
  deviceFacts as sourceDeviceFacts,
  htmlFacts as sourceHtmlFacts,
  networkFacts as sourceNetworkFacts,
  pythonFacts as sourcePythonFacts,
  type Fact,
} from './question-expansion'
import type { Question } from './questions'

type Pair = readonly [string, string]
type Seed = {
  module: string
  prompt: Pair
  scenario: Pair
  task: Pair
  answer: Pair
  wrong: readonly [Pair, Pair, Pair]
  explanation: Pair
  statement: Pair
  statementIsTrue: boolean
}

const seed = (
  module: string,
  prompt: Pair,
  scenario: Pair,
  task: Pair,
  answer: Pair,
  wrong: readonly [Pair, Pair, Pair],
  explanation: Pair,
  statement: Pair,
  statementIsTrue = true,
): Seed => ({
  module,
  prompt,
  scenario,
  task,
  answer,
  wrong,
  explanation,
  statement,
  statementIsTrue,
})

function build(
  course: string,
  facts: Seed[],
  target: number,
  variantsPerFact: number,
): Question[] {
  const questions: Question[] = []
  for (const [index, fact] of facts.entries()) {
    const idBase = `${course}-${fact.module.slice(0, 2)}-max-${String(index + 1).padStart(3, '0')}`
    const choices = [fact.answer, ...fact.wrong].map(([ro, en], n) => ({
      id: String(n),
      text: bilingual(ro, en),
    }))
    const prompts = [
      { text: fact.prompt, type: 'single' as const, correct: '0' },
      { text: fact.scenario, type: 'single' as const, correct: '0' },
      {
        text: [
          `Alege răspunsul corect pentru obiectivul: ${fact.prompt[0]}`,
          `Choose the correct answer for this objective: ${fact.prompt[1]}`,
        ] as Pair,
        type: 'single' as const,
        correct: '0',
      },
      {
        text: fact.statement,
        type: 'true_false' as const,
        correct: fact.statementIsTrue ? '1' : '0',
      },
      ...fact.wrong.map((wrong): { text: Pair; type: 'true_false'; correct: string } => ({
        text: [
          `Răspunsul corect este ${wrong[0]}.`,
          `The correct answer is ${wrong[1]}.`,
        ],
        type: 'true_false',
        correct: '0',
      })),
    ]
    for (const [variant, prompt] of prompts.slice(0, variantsPerFact).entries()) {
      const questionId = `${idBase}-${variant + 1}`
      const options =
        prompt.type === 'true_false'
          ? [bilingual('Fals', 'False'), bilingual('Adevărat', 'True')].map(
              (text, n) => ({ id: String(n), text }),
            )
          : shuffle(choices, seededRandom(hashString(questionId)))
      questions.push({
        id: questionId,
        module: fact.module,
        difficulty: variant === 1 || variant === 2 ? 'medium' : 'easy',
        type: prompt.type,
        text: bilingual(prompt.text[0], prompt.text[1]),
        options,
        correct: [prompt.correct],
        explanation: bilingual(fact.explanation[0], fact.explanation[1]),
      })
    }
  }
  return questions.slice(0, target)
}

const authoredPythonFacts: Seed[] = [
  seed(
    '01-tipuri-date-operatori',
    ['Ce returnează isinstance(True, int)?', 'What does isinstance(True, int) return?'],
    [
      'Un API verifică dacă un fanion boolean este și instanță de int. Care este rezultatul?',
      'An API checks whether a Boolean flag is also an int instance. What is the result?',
    ],
    [
      'verifici relația de moștenire dintre tipuri',
      'check the inheritance relationship between types',
    ],
    ['True', 'True'],
    [
      ['False', 'False'],
      ['TypeError', 'TypeError'],
      ['None', 'None'],
    ],
    [
      'bool este subclasă a lui int în Python, deci isinstance(True, int) este True.',
      'bool is a subclass of int in Python, so isinstance(True, int) is True.',
    ],
    ['isinstance(True, int) returnează True.', 'isinstance(True, int) returns True.'],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce produce 2 ** 3 ** 2?', 'What does 2 ** 3 ** 2 produce?'],
    [
      'O expresie conține două exponențieri fără paranteze. Ce valoare se calculează?',
      'An expression contains two exponentiations without parentheses. What value is calculated?',
    ],
    [
      'respecți asociativitatea la dreapta a operatorului **',
      'respect the right associativity of the ** operator',
    ],
    ['512', '512'],
    [
      ['64', '64'],
      ['36', '36'],
      ['256', '256'],
    ],
    [
      'Exponențierea se asociază la dreapta: 2 ** (3 ** 2) = 512.',
      'Exponentiation is right-associative: 2 ** (3 ** 2) = 512.',
    ],
    [
      '2 ** 3 ** 2 este evaluat ca 2 ** (3 ** 2).',
      '2 ** 3 ** 2 is evaluated as 2 ** (3 ** 2).',
    ],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce valoare are 5 // -2?', 'What value does 5 // -2 have?'],
    [
      'Un calcul folosește împărțire întreagă cu un divizor negativ. Care este rezultatul?',
      'A calculation uses floor division with a negative divisor. What is the result?',
    ],
    [
      'aplici rotunjirea în jos la împărțirea întreagă',
      'apply floor rounding in floor division',
    ],
    ['-3', '-3'],
    [
      ['-2', '-2'],
      ['2', '2'],
      ['-2.5', '-2.5'],
    ],
    [
      '// rotunjește spre minus infinit, astfel încât 5 // -2 este -3.',
      '// floors toward negative infinity, so 5 // -2 is -3.',
    ],
    ['5 // -2 produce -3.', '5 // -2 produces -3.'],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce valoare are 0.1 + 0.2 == 0.3?', 'What value does 0.1 + 0.2 == 0.3 have?'],
    [
      'Un test de egalitate directă eșuează pentru suma unor zecimale float. Ce trebuie reținut?',
      'A direct equality test fails for a sum of decimal floats. What should you remember?',
    ],
    [
      'ții cont de reprezentarea binară aproximativă a numerelor float',
      'account for the approximate binary representation of floats',
    ],
    ['False', 'False'],
    [
      ['True', 'True'],
      ['0.3', '0.3'],
      ['TypeError', 'TypeError'],
    ],
    [
      'Unele fracții zecimale nu au reprezentare binară finită; compară cu o toleranță.',
      'Some decimal fractions have no finite binary representation; compare with a tolerance.',
    ],
    [
      '0.1 + 0.2 este garantat egal cu 0.3 în float.',
      '0.1 + 0.2 is guaranteed to equal 0.3 with floats.',
    ],
    false,
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce înseamnă a is b?', 'What does a is b mean?'],
    [
      'Două variabile au conținuturi egale, dar pot fi obiecte diferite. Ce verifică is?',
      'Two variables have equal contents but may be different objects. What does is check?',
    ],
    ['compari identitatea obiectelor', 'compare object identity'],
    ['Dacă referă același obiect', 'Whether they refer to the same object'],
    [
      ['Dacă au aceeași valoare', 'Whether they have the same value'],
      ['Dacă au același tip', 'Whether they have the same type'],
      ['Dacă sunt mutabile', 'Whether they are mutable'],
    ],
    [
      'is verifică identitatea; == verifică egalitatea valorilor.',
      'is checks identity; == checks value equality.',
    ],
    [
      'is compară identitatea a două referințe.',
      'is compares the identity of two references.',
    ],
  ),
  seed(
    '01-tipuri-date-operatori',
    [
      'Ce operator verifică apartenența la o secvență?',
      'Which operator checks membership in a sequence?',
    ],
    [
      'Un program caută dacă „py” apare în șirul „python”. Ce operator folosește?',
      'A program checks whether “py” occurs in the string “python”. Which operator does it use?',
    ],
    ['testezi apartenența unui element cu in', 'test whether an element belongs with in'],
    ['in', 'in'],
    [
      ['is', 'is'],
      ['has', 'has'],
      ['contains', 'contains'],
    ],
    [
      'in verifică apartenența pentru șiruri și containere.',
      'in checks membership in strings and containers.',
    ],
    ['„py” in „python” este True.', '“py” in “python” is True.'],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce creează [0] * 4?', 'What does [0] * 4 create?'],
    [
      'Un program inițializează patru poziții cu zero folosind o listă repetată. Ce obține?',
      'A program initializes four positions to zero using list repetition. What does it get?',
    ],
    ['repeți elementul listei de patru ori', 'repeat the list element four times'],
    ['[0, 0, 0, 0]', '[0, 0, 0, 0]'],
    [
      ['[0, 4]', '[0, 4]'],
      ['[4]', '[4]'],
      ['0', '0'],
    ],
    [
      'Înmulțirea unei liste cu un întreg repetă elementele ei.',
      'Multiplying a list by an integer repeats its elements.',
    ],
    ['[0] * 4 produce lista [0, 0, 0, 0].', '[0] * 4 produces the list [0, 0, 0, 0].'],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce face tuple([1, 2])?', 'What does tuple([1, 2]) do?'],
    [
      'O colecție nu trebuie să mai poată fi modificată. Cum o convertești?',
      'A collection must no longer be mutable. How do you convert it?',
    ],
    ['convertești lista într-un tuplu', 'convert the list into a tuple'],
    ['(1, 2)', '(1, 2)'],
    [
      ['[1, 2]', '[1, 2]'],
      ['{1, 2}', '{1, 2}'],
      ['None', 'None'],
    ],
    [
      'tuple() construiește un tuplu din elementele iterabilei.',
      'tuple() constructs a tuple from the iterable’s elements.',
    ],
    ['tuple([1, 2]) returnează un tuplu.', 'tuple([1, 2]) returns a tuple.'],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce face set([2, 2, 3])?', 'What does set([2, 2, 3]) do?'],
    [
      'O listă are valori repetate și vrei doar elementele unice. Ce tip construiești?',
      'A list contains repeated values and you want only unique elements. Which type do you construct?',
    ],
    ['elimini duplicatele cu un set', 'remove duplicates with a set'],
    ['{2, 3}', '{2, 3}'],
    [
      ['[2, 2, 3]', '[2, 2, 3]'],
      ['(2, 3)', '(2, 3)'],
      ['{2: 3}', '{2: 3}'],
    ],
    [
      'Seturile păstrează elemente distincte și nu garantează ordinea.',
      'Sets keep distinct elements and do not guarantee order.',
    ],
    [
      'set([2, 2, 3]) conține două elemente unice.',
      'set([2, 2, 3]) contains two unique elements.',
    ],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce returnează len({"a": 1, "b": 2})?', 'What does len({"a": 1, "b": 2}) return?'],
    [
      'O funcție numără elementele unui dicționar. Ce este numărat?',
      'A function counts the items in a dictionary. What is counted?',
    ],
    ['numeri cheile dicționarului', 'count the dictionary keys'],
    ['2', '2'],
    [
      ['1', '1'],
      ['3', '3'],
      ['TypeError', 'TypeError'],
    ],
    [
      'len() pentru dicționar returnează numărul de chei.',
      'len() on a dictionary returns the number of keys.',
    ],
    [
      'len() numără perechile cheie-valoare din dicționar.',
      'len() counts the key-value entries in a dictionary.',
    ],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce valoare are bool("0")?', 'What value does bool("0") have?'],
    [
      'Un șir conține caracterul zero. Cum se evaluează ca valoare booleană?',
      'A string contains the character zero. How does it evaluate as a Boolean?',
    ],
    ['evaluezi un șir nevid drept adevărat', 'evaluate a non-empty string as true'],
    ['True', 'True'],
    [
      ['False', 'False'],
      ['0', '0'],
      ['ValueError', 'ValueError'],
    ],
    [
      'Orice șir nevid este truthy, chiar dacă textul său este „0”.',
      'Any non-empty string is truthy, even if its text is “0”.',
    ],
    ['bool("0") returnează True.', 'bool("0") returns True.'],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce face „x” in {"x": 4}?', 'What does “x” in {"x": 4} do?'],
    [
      'Un dicționar este folosit într-o condiție de apartenență. Ce se verifică implicit?',
      'A dictionary is used in a membership condition. What is checked by default?',
    ],
    ['verifici existența unei chei', 'check whether a key exists'],
    ['True', 'True'],
    [
      ['False', 'False'],
      ['4', '4'],
      ['KeyError', 'KeyError'],
    ],
    [
      'Operatorul in aplicat unui dicționar testează cheile.',
      'The in operator applied to a dictionary tests its keys.',
    ],
    [
      '„x” in {"x": 4} verifică dacă „x” este cheie.',
      '“x” in {"x": 4} checks whether “x” is a key.',
    ],
  ),
  seed(
    '01-tipuri-date-operatori',
    ['Ce returnează "abc"[1:]?', 'What does "abc"[1:] return?'],
    [
      'Un program taie un șir de la indexul 1 până la final. Ce subșir obține?',
      'A program slices a string from index 1 to the end. What substring does it get?',
    ],
    ['tai șirul fără primul caracter', 'slice the string without its first character'],
    ['bc', 'bc'],
    [
      ['ab', 'ab'],
      ['c', 'c'],
      ['abc', 'abc'],
    ],
    [
      'Capătul omis al secvenței indică poziția finală.',
      'An omitted slice stop means the end of the sequence.',
    ],
    ['"abc"[1:] returnează "bc".', '"abc"[1:] returns "bc".'],
  ),
  seed(
    '02-control-flux',
    [
      'Când se execută blocul else al unui for?',
      'When does a for loop’s else block run?',
    ],
    [
      'Căutarea nu folosește break. Ce se întâmplă după terminarea normală a buclei?',
      'A search does not use break. What happens after the loop ends normally?',
    ],
    [
      'execuți else după terminarea normală a buclei',
      'run else after the loop ends normally',
    ],
    ['Se execută', 'It runs'],
    [
      ['Se execută doar dacă apare break', 'It runs only if break occurs'],
      ['Nu se execută niciodată', 'It never runs'],
      ['Se execută înaintea buclei', 'It runs before the loop'],
    ],
    [
      'else al buclei rulează dacă aceasta se termină fără break.',
      'A loop’s else runs if the loop finishes without break.',
    ],
    [
      'else al unui for poate rula după terminarea normală a buclei.',
      'A for loop’s else can run after normal completion.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce elemente produce range(2, 8, 2)?', 'Which values does range(2, 8, 2) produce?'],
    [
      'O buclă folosește un pas de două și limita finală este 8, exclusiv. Ce valori parcurge?',
      'A loop uses a step of two and an exclusive stop of 8. Which values does it visit?',
    ],
    [
      'parcurgi valori din 2 în 2 fără limita finală',
      'iterate by twos without including the stop',
    ],
    ['2, 4, 6', '2, 4, 6'],
    [
      ['2, 4, 6, 8', '2, 4, 6, 8'],
      ['2, 3, 4, 5, 6, 7', '2, 3, 4, 5, 6, 7'],
      ['4, 6, 8', '4, 6, 8'],
    ],
    ['Limita stop din range este exclusă.', 'The stop value in range is excluded.'],
    ['range(2, 8, 2) include valoarea 8.', 'range(2, 8, 2) includes the value 8.'],
    false,
  ),
  seed(
    '02-control-flux',
    ['Ce face continue într-o buclă?', 'What does continue do in a loop?'],
    [
      'Un element nu trebuie procesat, dar iterația următoare trebuie să continue. Ce instrucțiune folosești?',
      'An item should be skipped, but the next iteration should continue. Which statement do you use?',
    ],
    ['sari direct la iterația următoare', 'skip directly to the next iteration'],
    ['Trece la următoarea iterație', 'Moves to the next iteration'],
    [
      ['Oprește bucla', 'Stops the loop'],
      ['Repornește programul', 'Restarts the program'],
      ['Iese din funcție', 'Exits the function'],
    ],
    [
      'continue omite restul corpului pentru iterația curentă.',
      'continue skips the rest of the current loop body.',
    ],
    [
      'continue trece controlul la următoarea iterație.',
      'continue transfers control to the next iteration.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce face break într-o buclă?', 'What does break do in a loop?'],
    [
      'Un element căutat a fost găsit și nu mai sunt necesare alte iterații. Ce instrucțiune folosești?',
      'A searched item is found and no more iterations are needed. Which statement do you use?',
    ],
    ['oprești imediat bucla curentă', 'stop the current loop immediately'],
    ['Iese din buclă', 'Exits the loop'],
    [
      ['Omite doar o iterație', 'Skips only one iteration'],
      ['Repornește bucla', 'Restarts the loop'],
      ['Încheie întregul proces Python', 'Ends the entire Python process'],
    ],
    ['break termină bucla cea mai apropiată.', 'break terminates the nearest loop.'],
    [
      'break oprește bucla în care este executat.',
      'break stops the loop in which it runs.',
    ],
  ),
  seed(
    '02-control-flux',
    [
      'Ce valoare are expresia 3 < 4 < 5?',
      'What value does the expression 3 < 4 < 5 have?',
    ],
    [
      'Două comparații sunt legate în lanț. Cum se evaluează în Python?',
      'Two comparisons are chained. How does Python evaluate them?',
    ],
    ['verifici ambele comparații consecutive', 'check both consecutive comparisons'],
    ['True', 'True'],
    [
      ['False', 'False'],
      ['3', '3'],
      ['SyntaxError', 'SyntaxError'],
    ],
    [
      'Comparația în lanț verifică 3 < 4 și 4 < 5.',
      'A chained comparison checks 3 < 4 and 4 < 5.',
    ],
    [
      '3 < 4 < 5 este echivalent cu 3 < 4 and 4 < 5.',
      '3 < 4 < 5 is equivalent to 3 < 4 and 4 < 5.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce înseamnă pass?', 'What does pass mean?'],
    [
      'O ramură este încă goală, dar sintaxa cere o instrucțiune. Ce folosești temporar?',
      'A branch is still empty, but syntax requires a statement. What do you use temporarily?',
    ],
    ['păstrezi un bloc gol valid cu pass', 'keep an empty block valid with pass'],
    ['Nu face nimic', 'Does nothing'],
    [
      ['Oprește programul', 'Stops the program'],
      ['Sare la iterația următoare', 'Skips to the next iteration'],
      ['Returnează None din funcție', 'Returns None from a function'],
    ],
    [
      'pass este o instrucțiune nulă care nu schimbă starea.',
      'pass is a null statement that does not change state.',
    ],
    ['pass nu execută nicio operație.', 'pass performs no operation.'],
  ),
  seed(
    '02-control-flux',
    ['Ce iterează for key in dict?', 'What does for key in dict iterate over?'],
    [
      'Un program parcurge direct un dicționar fără .values() sau .items(). Ce primește?',
      'A program loops directly over a dictionary without .values() or .items(). What does it receive?',
    ],
    ['parcurgi cheile dicționarului', 'iterate over the dictionary keys'],
    ['Cheile', 'The keys'],
    [
      ['Valorile', 'The values'],
      ['Perechi tuple cheie-valoare', 'Key-value tuple pairs'],
      ['Doar prima valoare', 'Only the first value'],
    ],
    [
      'Iterarea directă a unui dicționar produce cheile sale.',
      'Direct iteration over a dictionary yields its keys.',
    ],
    ['for key in dict parcurge cheile.', 'for key in dict iterates over the keys.'],
  ),
  seed(
    '02-control-flux',
    ['Ce rol are enumerate(items)?', 'What is the purpose of enumerate(items)?'],
    [
      'O buclă are nevoie de index și element în același timp. Ce funcție înfășoară iterabila?',
      'A loop needs the index and item at the same time. Which function wraps the iterable?',
    ],
    ['obții perechi index și element', 'get index-item pairs'],
    ['Perechi (index, element)', '(index, item) pairs'],
    [
      ['Perechi (cheie, valoare)', '(key, value) pairs'],
      ['Doar indexuri', 'Indexes only'],
      ['O listă sortată', 'A sorted list'],
    ],
    [
      'enumerate produce tupluri cu numărătorul și elementul curent.',
      'enumerate yields tuples with a counter and the current item.',
    ],
    [
      'enumerate poate furniza indexul și elementul într-o buclă.',
      'enumerate can provide the index and item in a loop.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce face zip(a, b)?', 'What does zip(a, b) do?'],
    [
      'Două secvențe trebuie parcurse element cu element împreună. Ce funcție folosești?',
      'Two sequences must be traversed together item by item. Which function do you use?',
    ],
    ['combini elemente cu aceeași poziție', 'combine elements at matching positions'],
    ['Perechi de elemente corespunzătoare', 'Pairs of corresponding items'],
    [
      ['Concatenează secvențele', 'Concatenates the sequences'],
      ['Sortează ambele liste', 'Sorts both lists'],
      ['Elimină toate duplicatele', 'Removes all duplicates'],
    ],
    [
      'zip produce tuple până la epuizarea celei mai scurte iterabile.',
      'zip yields tuples until the shortest iterable is exhausted.',
    ],
    [
      'zip combină valorile de la poziții corespunzătoare.',
      'zip combines values from matching positions.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce face any([False, True, False])?', 'What does any([False, True, False]) do?'],
    [
      'O condiție trebuie să fie adevărată pentru cel puțin un element. Ce funcție agregă valorile?',
      'A condition must be true for at least one item. Which function aggregates the values?',
    ],
    [
      'verifici dacă există cel puțin o valoare truthy',
      'check whether at least one value is truthy',
    ],
    ['True', 'True'],
    [
      ['False', 'False'],
      ['3', '3'],
      ['None', 'None'],
    ],
    [
      'any returnează True când cel puțin un element este truthy.',
      'any returns True when at least one item is truthy.',
    ],
    ['any([False, True, False]) este True.', 'any([False, True, False]) is True.'],
  ),
  seed(
    '02-control-flux',
    ['Ce face all([True, True, False])?', 'What does all([True, True, False]) do?'],
    [
      'Toate verificările trebuie să treacă pentru ca o regulă să fie acceptată. Ce funcție agregă valorile?',
      'Every check must pass for a rule to be accepted. Which function aggregates the values?',
    ],
    ['verifici dacă toate elementele sunt truthy', 'check whether all items are truthy'],
    ['False', 'False'],
    [
      ['True', 'True'],
      ['2', '2'],
      ['None', 'None'],
    ],
    [
      'all returnează True numai dacă fiecare element este truthy.',
      'all returns True only if every item is truthy.',
    ],
    ['all([True, True, False]) este False.', 'all([True, True, False]) is False.'],
  ),
  seed(
    '02-control-flux',
    ['Cum obții indecșii 0–4?', 'How do you obtain indexes 0–4?'],
    [
      'O buclă trebuie să ruleze exact de cinci ori cu indecși începând de la zero. Ce construiești?',
      'A loop must run exactly five times with indexes starting at zero. What do you create?',
    ],
    ['folosești range(5)', 'use range(5)'],
    ['range(5)', 'range(5)'],
    [
      ['range(1, 5)', 'range(1, 5)'],
      ['range(5, 0)', 'range(5, 0)'],
      ['list(5)', 'list(5)'],
    ],
    ['range(5) generează 0, 1, 2, 3 și 4.', 'range(5) yields 0, 1, 2, 3, and 4.'],
    [
      'range(5) produce cinci valori de la zero la patru.',
      'range(5) yields five values from zero through four.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce verifică „if x is None”?', 'What does “if x is None” check?'],
    [
      'Un rezultat opțional poate lipsi și trebuie verificat explicit. Ce comparație folosești?',
      'An optional result may be absent and needs an explicit check. Which comparison do you use?',
    ],
    ['verifici identitatea față de None', 'check identity against None'],
    ['Dacă x este None', 'Whether x is None'],
    [
      ['Dacă x este fals', 'Whether x is false'],
      ['Dacă x este gol', 'Whether x is empty'],
      ['Dacă x este zero', 'Whether x is zero'],
    ],
    [
      'Pentru None, stilul Python recomandat folosește is sau is not.',
      'For None, recommended Python style uses is or is not.',
    ],
    [
      'Verificarea x is None este potrivită pentru un rezultat absent.',
      'The check x is None is suitable for a missing result.',
    ],
  ),
  seed(
    '02-control-flux',
    [
      'Ce face operatorul condițional a if test else b?',
      'What does the conditional expression a if test else b do?',
    ],
    [
      'Valoarea aleasă trebuie calculată într-o singură expresie în funcție de o condiție. Ce folosești?',
      'A value must be selected in one expression based on a condition. What do you use?',
    ],
    [
      'alegi una dintre două expresii după o condiție',
      'select one of two expressions based on a condition',
    ],
    [
      'Evaluează a dacă test este adevărat, altfel b',
      'Evaluates a if test is true, otherwise b',
    ],
    [
      ['Evaluează întotdeauna ambele expresii', 'Always evaluates both expressions'],
      ['Repetă expresia a', 'Repeats expression a'],
      ['Încheie funcția curentă', 'Ends the current function'],
    ],
    [
      'Expresia condițională returnează una dintre expresii în funcție de test.',
      'A conditional expression returns one of two expressions based on the test.',
    ],
    [
      'a if test else b selectează rezultatul pe baza condiției.',
      'a if test else b selects a result based on the condition.',
    ],
  ),
  seed(
    '02-control-flux',
    ['Ce produce reversed([1, 2, 3])?', 'What does reversed([1, 2, 3]) produce?'],
    [
      'Trebuie să parcurgi lista în ordine inversă fără să o sortezi. Ce funcție folosești?',
      'You need to traverse a list in reverse without sorting it. Which function do you use?',
    ],
    ['parcurgi elementele în ordine inversă', 'iterate over items in reverse order'],
    ['Un iterator: 3, 2, 1', 'An iterator: 3, 2, 1'],
    [
      ['Lista sortată: 1, 2, 3', 'Sorted list: 1, 2, 3'],
      ['O copie identică', 'An identical copy'],
      ['Un iterator: 1, 2, 3', 'An iterator: 1, 2, 3'],
    ],
    [
      'reversed returnează un iterator care parcurge elementele invers.',
      'reversed returns an iterator that traverses items backward.',
    ],
    [
      'reversed([1, 2, 3]) parcurge lista de la 3 la 1.',
      'reversed([1, 2, 3]) traverses the list from 3 to 1.',
    ],
  ),
  seed(
    '02-control-flux',
    [
      'Ce face sorted(values, reverse=True)?',
      'What does sorted(values, reverse=True) do?',
    ],
    [
      'Ai nevoie de o nouă listă ordonată descrescător, păstrând lista inițială. Ce apel folosești?',
      'You need a new list sorted descending while preserving the original. Which call do you use?',
    ],
    ['sortezi o copie în ordine descrescătoare', 'sort a copy in descending order'],
    ['Returnează o listă nouă descrescătoare', 'Returns a new descending list'],
    [
      [
        'Modifică lista originală și returnează None',
        'Mutates the original and returns None',
      ],
      ['Inversează fără sortare', 'Reverses without sorting'],
      ['Elimină duplicatele', 'Removes duplicates'],
    ],
    [
      'sorted construiește o listă nouă; reverse=True inversează ordinea sortată.',
      'sorted builds a new list; reverse=True reverses the sorted order.',
    ],
    [
      'sorted cu reverse=True sortează descrescător fără să modifice lista originală.',
      'sorted with reverse=True sorts descending without changing the original list.',
    ],
  ),
  seed(
    '03-intrare-iesire',
    ['Ce face input() cu textul introdus?', 'What does input() do with entered text?'],
    [
      'Vârsta introdusă trebuie folosită la calcule numerice. Ce pas urmează după input()?',
      'An entered age is needed for numeric calculations. What step follows input()?',
    ],
    [
      'convertești șirul citit în tipul necesar',
      'convert the read string to the needed type',
    ],
    ['Returnează un str', 'Returns a str'],
    [
      ['Returnează automat un int', 'Automatically returns an int'],
      ['Returnează un float pentru cifre', 'Returns a float for digits'],
      ['Returnează bytes', 'Returns bytes'],
    ],
    [
      'input() returnează întotdeauna text; conversia explicită este necesară pentru numere.',
      'input() always returns text; explicit conversion is needed for numbers.',
    ],
    ['input() returnează un șir de caractere.', 'input() returns a string.'],
  ),
  seed(
    '03-intrare-iesire',
    [
      'Ce afișează print(f"{3.14159:.2f}")?',
      'What does print(f"{3.14159:.2f}") display?',
    ],
    [
      'Un raport trebuie să afișeze două zecimale. Ce format produce f-string-ul?',
      'A report must display two decimal places. What does the f-string format produce?',
    ],
    [
      'formatezi numărul cu două cifre după punctul zecimal',
      'format the number with two digits after the decimal point',
    ],
    ['3.14', '3.14'],
    [
      ['3.14159', '3.14159'],
      ['3.1', '3.1'],
      ['3,14', '3,14'],
    ],
    [
      'Specificatorul .2f formatează un float cu două zecimale.',
      'The .2f specifier formats a float to two decimal places.',
    ],
    [':.2f afișează exact două zecimale.', ':.2f displays exactly two decimal places.'],
  ),
  seed(
    '03-intrare-iesire',
    [
      'Ce mod deschide un fișier pentru adăugare?',
      'Which mode opens a file for appending?',
    ],
    [
      'Jurnalul existent trebuie păstrat, iar intrările noi se adaugă la final. Ce mod folosești?',
      'An existing log must be preserved and new entries added at the end. Which mode do you use?',
    ],
    ['deschizi fișierul cu modul a', 'open the file in a mode'],
    ['a', 'a'],
    [
      ['w', 'w'],
      ['r', 'r'],
      ['x', 'x'],
    ],
    [
      'Modul a adaugă la final și creează fișierul dacă lipsește.',
      'Mode a appends at the end and creates the file if it is missing.',
    ],
    [
      'Modul a adaugă date după conținutul existent.',
      'Mode a appends data after existing content.',
    ],
  ),
  seed(
    '03-intrare-iesire',
    ['De ce folosești with open(...) as file?', 'Why use with open(...) as file?'],
    [
      'Citirea se poate opri din cauza unei erori. Cum te asiguri că fișierul se închide?',
      'Reading may stop because of an error. How do you ensure the file closes?',
    ],
    [
      'folosești managerul de context pentru închidere automată',
      'use a context manager for automatic closing',
    ],
    ['Închide fișierul la ieșirea din bloc', 'Closes the file when leaving the block'],
    [
      ['Șterge fișierul după citire', 'Deletes the file after reading'],
      ['Redeschide fișierul în modul w', 'Reopens the file in w mode'],
      ['Ignoră toate erorile', 'Ignores all errors'],
    ],
    [
      'with închide resursa la ieșirea din bloc, inclusiv la o excepție.',
      'with closes the resource when leaving the block, including after an exception.',
    ],
    [
      'with open gestionează închiderea fișierului.',
      'with open manages closing the file.',
    ],
  ),
  seed(
    '03-intrare-iesire',
    ['Ce face metoda strip() pe un șir?', 'What does the strip() method do to a string?'],
    [
      'O linie citită are spații și un newline la margini. Cum le elimini?',
      'A read line has spaces and a newline at its edges. How do you remove them?',
    ],
    ['elimini spațiile albe de la ambele capete', 'remove whitespace from both ends'],
    [
      'Returnează șirul fără spații marginale',
      'Returns the string without surrounding whitespace',
    ],
    [
      ['Elimină toate spațiile interne', 'Removes all internal spaces'],
      ['Șterge ultimul cuvânt', 'Deletes the last word'],
      ['Transformă textul în litere mici', 'Converts text to lowercase'],
    ],
    [
      'strip elimină whitespace de la început și sfârșit, nu dintre cuvinte.',
      'strip removes whitespace at the start and end, not between words.',
    ],
    [
      'strip() elimină spațiile albe marginale.',
      'strip() removes surrounding whitespace.',
    ],
  ),
  seed(
    '04-documentare-structura',
    ['Ce documentează un docstring?', 'What does a docstring document?'],
    [
      'Un utilizator inspectează funcția prin help(). Unde pui descrierea ei?',
      'A user inspects a function with help(). Where do you put its description?',
    ],
    [
      'scrii un șir documentar imediat după antetul funcției',
      'place a documentation string immediately after the function header',
    ],
    ['Scopul și comportamentul funcției', 'The function’s purpose and behavior'],
    [
      ['Valorile tuturor variabilelor globale', 'All global variable values'],
      ['Versiunea interpretului', 'The interpreter version'],
      ['Doar tipul fișierului', 'Only the file type'],
    ],
    [
      'Un docstring este șirul literal de la începutul modulului, clasei sau funcției.',
      'A docstring is the string literal at the start of a module, class, or function.',
    ],
    [
      'help() poate afișa docstring-ul unei funcții.',
      'help() can display a function’s docstring.',
    ],
  ),
  seed(
    '04-documentare-structura',
    [
      'Ce întoarce o funcție fără return explicit?',
      'What does a function with no explicit return return?',
    ],
    [
      'O funcție afișează un mesaj, dar nu conține return. Ce primește apelantul?',
      'A function prints a message but has no return. What does the caller receive?',
    ],
    [
      'distingi efectul print de valoarea returnată',
      'distinguish the effect of print from the returned value',
    ],
    ['None', 'None'],
    [
      ['0', '0'],
      ['Șirul afișat', 'The displayed string'],
      ['True', 'True'],
    ],
    [
      'O funcție ajunge la final fără return și returnează None implicit.',
      'A function that reaches its end without return implicitly returns None.',
    ],
    [
      'print nu returnează automat textul afișat de funcție.',
      'print does not automatically return the text displayed by a function.',
    ],
  ),
  seed(
    '04-documentare-structura',
    ['Ce este un argument implicit?', 'What is a default argument?'],
    [
      'Parametrul limită trebuie să fie opțional și să aibă valoarea 10 dacă lipsește. Cum îl declari?',
      'A limit parameter should be optional and equal 10 when omitted. How do you declare it?',
    ],
    [
      'atribui o valoare parametrului în antetul funcției',
      'assign a value to the parameter in the function header',
    ],
    ['Un parametru cu valoare prestabilită', 'A parameter with a default value'],
    [
      ['Un argument pozițional obligatoriu', 'A required positional argument'],
      ['O variabilă globală', 'A global variable'],
      ['O valoare returnată', 'A return value'],
    ],
    [
      'Valoarea implicită este folosită când apelul omite argumentul.',
      'The default value is used when a call omits the argument.',
    ],
    [
      'Un parametru implicit poate fi omis la apel.',
      'A default parameter can be omitted in a call.',
    ],
  ),
  seed(
    '04-documentare-structura',
    [
      'Ce structură are *args în definiția funcției?',
      'What structure does *args have in a function definition?',
    ],
    [
      'O funcție acceptă un număr variabil de argumente poziționale. Cum le primește?',
      'A function accepts a variable number of positional arguments. How does it receive them?',
    ],
    [
      'colectezi argumentele poziționale suplimentare într-un tuplu',
      'collect extra positional arguments in a tuple',
    ],
    ['Un tuplu', 'A tuple'],
    [
      ['O listă de dicționare', 'A list of dictionaries'],
      ['Un singur șir', 'A single string'],
      ['Un set', 'A set'],
    ],
    [
      '*args colectează argumentele poziționale suplimentare într-un tuplu.',
      '*args collects extra positional arguments into a tuple.',
    ],
    ['În funcție, *args este tuplu.', 'Inside a function, *args is a tuple.'],
  ),
  seed(
    '04-documentare-structura',
    [
      'Ce structură are **kwargs în funcție?',
      'What structure does **kwargs have in a function?',
    ],
    [
      'O funcție primește opțiuni numite arbitrare. Cum sunt colectate?',
      'A function accepts arbitrary named options. How are they collected?',
    ],
    [
      'colectezi argumentele numite într-un dicționar',
      'collect named arguments in a dictionary',
    ],
    ['Un dicționar', 'A dictionary'],
    [
      ['Un tuplu', 'A tuple'],
      ['O listă sortată', 'A sorted list'],
      ['Un șir', 'A string'],
    ],
    [
      '**kwargs colectează argumentele numite ca perechi cheie-valoare.',
      '**kwargs collects named arguments as key-value pairs.',
    ],
    [
      'În funcție, **kwargs este dicționar.',
      'Inside a function, **kwargs is a dictionary.',
    ],
  ),
  seed(
    '04-documentare-structura',
    [
      'Ce înseamnă domeniul local al variabilei?',
      'What does a variable’s local scope mean?',
    ],
    [
      'O variabilă este creată în interiorul unei funcții. Unde este disponibilă în mod normal?',
      'A variable is created inside a function. Where is it normally available?',
    ],
    [
      'limitezi folosirea numelui la blocul local al funcției',
      'limit the name’s use to the function’s local scope',
    ],
    ['În funcția în care a fost definită', 'In the function where it was defined'],
    [
      ['În toate modulele Python', 'In all Python modules'],
      ['Doar în interpreterul interactiv', 'Only in the interactive interpreter'],
      ['În orice proces al sistemului', 'In any system process'],
    ],
    [
      'Numele local este vizibil în domeniul local și nu devine global automat.',
      'A local name is visible in its local scope and does not become global automatically.',
    ],
    [
      'O variabilă locală este disponibilă în mod normal în funcția sa.',
      'A local variable is normally available in its function.',
    ],
  ),
  seed(
    '04-documentare-structura',
    [
      'Ce stil recomandă PEP 8 pentru numele funcțiilor?',
      'Which style does PEP 8 recommend for function names?',
    ],
    [
      'Echipa vrea nume Python ușor de citit și consecvente. Ce convenție folosește?',
      'A team wants readable, consistent Python names. Which convention should it use?',
    ],
    [
      'scrii numele funcțiilor cu litere mici și underscore',
      'write function names in lowercase with underscores',
    ],
    ['snake_case', 'snake_case'],
    [
      ['PascalCase', 'PascalCase'],
      ['ALL_CAPS', 'ALL_CAPS'],
      ['kebab-case', 'kebab-case'],
    ],
    [
      'PEP 8 recomandă lowercase_with_underscores pentru funcții și variabile.',
      'PEP 8 recommends lowercase_with_underscores for functions and variables.',
    ],
    [
      'snake_case este convenția recomandată pentru funcții Python.',
      'snake_case is the recommended convention for Python functions.',
    ],
  ),
  seed(
    '04-documentare-structura',
    ['De ce păstrezi indentarea consecventă?', 'Why keep indentation consistent?'],
    [
      'Liniile unui bloc trebuie recunoscute de parser și de colegi. Ce practică menții?',
      'A block’s lines must be recognized by the parser and teammates. What practice do you maintain?',
    ],
    ['indentezi uniform blocurile de cod', 'indent code blocks consistently'],
    [
      'Delimitează blocurile și crește lizibilitatea',
      'It defines blocks and improves readability',
    ],
    [
      ['Înlocuiește toate acoladele', 'Replaces all braces'],
      ['Schimbă tipul variabilelor', 'Changes variable types'],
      ['Rulează automat codul', 'Runs code automatically'],
    ],
    [
      'Python folosește indentarea pentru delimitarea blocurilor.',
      'Python uses indentation to delimit blocks.',
    ],
    [
      'Indentarea incorectă poate produce IndentationError.',
      'Incorrect indentation can cause IndentationError.',
    ],
  ),
  seed(
    '05-depanare-erori',
    ['Ce excepție apare la int("abc")?', 'Which exception occurs for int("abc")?'],
    [
      'Un câmp numeric conține litere și conversia nu poate reuși. Ce excepție tratezi?',
      'A numeric field contains letters, so conversion cannot succeed. Which exception do you handle?',
    ],
    [
      'tratezi valoarea nevalidă la conversia numerică',
      'handle invalid input during numeric conversion',
    ],
    ['ValueError', 'ValueError'],
    [
      ['TypeError', 'TypeError'],
      ['IndexError', 'IndexError'],
      ['KeyError', 'KeyError'],
    ],
    [
      'ValueError apare când tipul este potrivit, dar valoarea nu poate fi convertită.',
      'ValueError occurs when the type is suitable but the value cannot be converted.',
    ],
    ['int("abc") poate ridica ValueError.', 'int("abc") can raise ValueError.'],
  ),
  seed(
    '05-depanare-erori',
    [
      'Ce excepție indică un index de listă absent?',
      'Which exception indicates a missing list index?',
    ],
    [
      'Codul cere elementul cu indexul 9 dintr-o listă cu trei elemente. Ce excepție apare?',
      'Code requests index 9 from a three-item list. Which exception occurs?',
    ],
    ['tratezi accesul în afara limitelor listei', 'handle access beyond the list bounds'],
    ['IndexError', 'IndexError'],
    [
      ['KeyError', 'KeyError'],
      ['NameError', 'NameError'],
      ['ValueError', 'ValueError'],
    ],
    [
      'IndexError indică un indice de secvență în afara intervalului valid.',
      'IndexError indicates a sequence index outside the valid range.',
    ],
    [
      'Un index de listă în afara limitelor poate ridica IndexError.',
      'A list index out of bounds can raise IndexError.',
    ],
  ),
  seed(
    '05-depanare-erori',
    [
      'Ce excepție apare când o cheie lipsește din dicționar?',
      'Which exception occurs when a dictionary key is missing?',
    ],
    [
      'Codul accesează record["email"], dar cheia nu există. Ce excepție poate apărea?',
      'Code accesses record["email"] but the key is absent. Which exception may occur?',
    ],
    ['tratezi accesul la o cheie inexistentă', 'handle access to a missing key'],
    ['KeyError', 'KeyError'],
    [
      ['IndexError', 'IndexError'],
      ['AttributeError', 'AttributeError'],
      ['ValueError', 'ValueError'],
    ],
    [
      'Accesul cu paranteze pătrate la o cheie absentă ridică KeyError.',
      'Bracket access to a missing key raises KeyError.',
    ],
    [
      'O cheie absentă accesată cu dict[key] poate ridica KeyError.',
      'A missing key accessed with dict[key] can raise KeyError.',
    ],
  ),
  seed(
    '05-depanare-erori',
    ['Ce excepție apare la 10 / 0?', 'Which exception occurs for 10 / 0?'],
    [
      'Un numitor introdus de utilizator este zero. Ce excepție ar trebui anticipată?',
      'A user-entered denominator is zero. Which exception should be anticipated?',
    ],
    ['gestionezi împărțirea la zero', 'handle division by zero'],
    ['ZeroDivisionError', 'ZeroDivisionError'],
    [
      ['ArithmeticError direct întotdeauna', 'Always ArithmeticError directly'],
      ['ValueError', 'ValueError'],
      ['OverflowError', 'OverflowError'],
    ],
    [
      'Împărțirea unui număr cu zero ridică ZeroDivisionError.',
      'Dividing a number by zero raises ZeroDivisionError.',
    ],
    ['10 / 0 ridică ZeroDivisionError.', '10 / 0 raises ZeroDivisionError.'],
  ),
  seed(
    '05-depanare-erori',
    [
      'Ce bloc rulează doar dacă try nu a ridicat excepții?',
      'Which block runs only if try raised no exception?',
    ],
    [
      'Procesarea principală a reușit și vrei să execuți codul de succes. Unde îl pui?',
      'The main operation succeeded and you want to run success-only code. Where do you put it?',
    ],
    [
      'separi calea de succes în blocul else',
      'separate the success path in the else block',
    ],
    ['else', 'else'],
    [
      ['finally', 'finally'],
      ['except', 'except'],
      ['raise', 'raise'],
    ],
    [
      'else rulează când blocul try s-a încheiat fără excepție.',
      'else runs when the try block completes without an exception.',
    ],
    [
      'Blocul else al try nu rulează după o excepție.',
      'The try else block does not run after an exception.',
    ],
  ),
  seed(
    '05-depanare-erori',
    ['Ce garantează blocul finally?', 'What does a finally block ensure?'],
    [
      'Un fișier trebuie eliberat indiferent dacă operația reușește sau eșuează. Ce bloc folosești?',
      'A file must be released whether the operation succeeds or fails. Which block do you use?',
    ],
    ['plasezi operația de curățare în finally', 'place cleanup in finally'],
    ['Rulează în mod normal la ieșirea din try', 'Normally runs when leaving try'],
    [
      ['Rulează doar când apare o excepție', 'Runs only when an exception occurs'],
      ['Rulează doar fără excepții', 'Runs only without exceptions'],
      ['Ignoră excepțiile', 'Ignores exceptions'],
    ],
    [
      'finally este folosit pentru curățarea resurselor indiferent de rezultat.',
      'finally is used for cleanup regardless of the outcome.',
    ],
    [
      'finally poate rula atât după succes, cât și după o excepție.',
      'finally can run after success or an exception.',
    ],
  ),
  seed(
    '05-depanare-erori',
    ['Ce face raise ValueError("invalid")?', 'What does raise ValueError("invalid") do?'],
    [
      'O funcție detectează argumente nevalide și trebuie să semnaleze apelantului. Ce scrie?',
      'A function detects invalid arguments and must notify the caller. What does it use?',
    ],
    [
      'ridici o excepție explicit pentru date nevalide',
      'raise an exception explicitly for invalid data',
    ],
    ['Ridică ValueError', 'Raises ValueError'],
    [
      ['Returnează False', 'Returns False'],
      ['Afișează doar un avertisment', 'Only displays a warning'],
      ['Închide interpreterul fără mesaj', 'Closes the interpreter without a message'],
    ],
    [
      'raise semnalează o excepție, care poate fi prinsă de un apelant.',
      'raise signals an exception that a caller may catch.',
    ],
    [
      'raise ValueError semnalează o valoare invalidă.',
      'raise ValueError signals an invalid value.',
    ],
  ),
  seed(
    '05-depanare-erori',
    [
      'Ce prinde except (ValueError, TypeError)?',
      'What does except (ValueError, TypeError) catch?',
    ],
    [
      'Conversia și operația pot eșua cu oricare dintre două excepții cunoscute. Cum scrii handlerul?',
      'Conversion and the operation may fail with either of two known exceptions. How do you write the handler?',
    ],
    ['prinzi tipurile enumerate în tuplu', 'catch the listed exception types in a tuple'],
    ['ValueError sau TypeError', 'ValueError or TypeError'],
    [
      ['Orice excepție posibilă', 'Every possible exception'],
      ['Doar SyntaxError', 'SyntaxError only'],
      ['Nicio excepție', 'No exception'],
    ],
    [
      'Un tuplu în except poate enumera mai multe tipuri de excepții.',
      'A tuple in except can list multiple exception types.',
    ],
    [
      'except (ValueError, TypeError) prinde una dintre cele două excepții.',
      'except (ValueError, TypeError) catches either exception.',
    ],
  ),
  seed(
    '05-depanare-erori',
    ['Ce înseamnă un traceback?', 'What does a traceback show?'],
    [
      'Aplicația eșuează și dezvoltatorul trebuie să afle traseul apelurilor până la eroare. Ce inspectează?',
      'An application fails and the developer needs the call path to the error. What should be inspected?',
    ],
    [
      'citești traceback-ul pentru traseu și locul erorii',
      'read the traceback for the call path and error location',
    ],
    [
      'Apelurile și locul unde s-a produs excepția',
      'Calls and where the exception occurred',
    ],
    [
      ['Doar valorile locale fără sursă', 'Only local values without source'],
      ['Istoricul instalărilor', 'Installation history'],
      ['Ieșirea de rețea', 'Network output'],
    ],
    [
      'Traceback-ul arată lanțul apelurilor și locația excepției.',
      'A traceback shows the call chain and the exception location.',
    ],
    [
      'Traceback-ul ajută la localizarea erorii în cod.',
      'A traceback helps locate the error in code.',
    ],
  ),
  seed(
    '05-depanare-erori',
    ['Ce indică SyntaxError?', 'What does SyntaxError indicate?'],
    [
      'Interpretul nu poate analiza paranteze sau două puncte lipsă. Ce tip de eroare este?',
      'The interpreter cannot parse a missing parenthesis or colon. Which error type is this?',
    ],
    [
      'corectezi structura sintactică înainte de rulare',
      'fix syntax structure before running',
    ],
    ['Codul nu poate fi analizat sintactic', 'The code cannot be parsed syntactically'],
    [
      ['Rezultat logic neașteptat', 'Unexpected logical result'],
      ['Cheie absentă la rulare', 'Missing key at runtime'],
      ['Pachet lipsă din sistem', 'Missing system package'],
    ],
    [
      'SyntaxError apare la parsarea codului, înainte de execuția normală.',
      'SyntaxError occurs while parsing code, before normal execution.',
    ],
    ['SyntaxError este o eroare de sintaxă.', 'SyntaxError is a syntax error.'],
  ),
  seed(
    '05-depanare-erori',
    ['Ce descrie o eroare logică?', 'What describes a logic error?'],
    [
      'Programul rulează fără excepție, dar calculează totalul greșit. Ce fel de defect investighezi?',
      'The program runs without an exception but calculates the wrong total. What kind of defect do you investigate?',
    ],
    [
      'verifici algoritmul și ipotezele de calcul',
      'check the algorithm and calculation assumptions',
    ],
    ['Cod valid cu rezultat incorect', 'Valid code with an incorrect result'],
    [
      ['Cod imposibil de parsat', 'Code that cannot be parsed'],
      ['Dispozitiv hardware defect', 'A faulty hardware device'],
      ['O excepție întotdeauna nepreluată', 'An always-uncaught exception'],
    ],
    [
      'Erorile logice permit rularea, dar produc un rezultat nedorit.',
      'Logic errors allow execution but produce an unintended result.',
    ],
    [
      'Un rezultat greșit fără excepție poate indica o eroare logică.',
      'A wrong result without an exception may indicate a logic error.',
    ],
  ),
  seed(
    '06-module-instrumente',
    ['Ce face if __name__ == "__main__":?', 'What does if __name__ == "__main__": do?'],
    [
      'Un modul trebuie să ruleze funcția principală la execuție directă, nu la import. Ce gardă folosești?',
      'A module should run its main function when executed directly, not when imported. Which guard do you use?',
    ],
    ['separi execuția directă de import', 'separate direct execution from import'],
    [
      'Verifică dacă fișierul este programul executat',
      'Checks whether the file is the program being run',
    ],
    [
      ['Verifică versiunea Python', 'Checks the Python version'],
      ['Importă automat toate modulele', 'Automatically imports all modules'],
      ['Activează modul interactiv', 'Enables interactive mode'],
    ],
    [
      'La execuția directă, __name__ devine "__main__"; la import primește numele modulului.',
      'When run directly, __name__ becomes "__main__"; on import it gets the module name.',
    ],
    [
      'Garda __main__ poate preveni rularea codului principal la import.',
      'The __main__ guard can prevent main code from running on import.',
    ],
  ),
  seed(
    '06-module-instrumente',
    ['Ce face import math as m?', 'What does import math as m do?'],
    [
      'Codul folosește funcții matematice cu un alias scurt. Cum este accesată apoi funcția sqrt?',
      'Code uses math functions through a short alias. How is sqrt then accessed?',
    ],
    ['accesezi numele modulului prin aliasul m', 'access the module through the alias m'],
    ['m.sqrt(...)', 'm.sqrt(...)'],
    [
      ['math.sqrt(...) doar după acel import', 'math.sqrt(...) only after that import'],
      ['sqrt(...) automat în global', 'sqrt(...) automatically in globals'],
      ['as.sqrt(...)', 'as.sqrt(...)'],
    ],
    ['as m leagă numele m de modulul math.', 'as m binds the name m to the math module.'],
    [
      'Aliasul m poate fi folosit ca prefix pentru funcțiile math.',
      'The alias m can prefix math functions.',
    ],
  ),
  seed(
    '06-module-instrumente',
    [
      'Ce metodă din pathlib citește întregul fișier text?',
      'Which pathlib method reads an entire text file?',
    ],
    [
      'Un script folosește un obiect Path și trebuie să citească fișierul ca text. Ce metodă apelează?',
      'A script uses a Path object and needs to read a file as text. Which method does it call?',
    ],
    ['citești textul cu metoda read_text', 'read text using read_text'],
    ['Path.read_text()', 'Path.read_text()'],
    [
      ['Path.open_binary()', 'Path.open_binary()'],
      ['Path.load_string()', 'Path.load_string()'],
      ['Path.read_bytes_text()', 'Path.read_bytes_text()'],
    ],
    [
      'Path.read_text() returnează conținutul decodat al fișierului.',
      'Path.read_text() returns the decoded contents of the file.',
    ],
    [
      'Path.read_text() este o metodă pentru citirea unui fișier text.',
      'Path.read_text() reads a text file.',
    ],
  ),
]
const networkFacts: Seed[] = [
  seed(
    '01-infrastructura',
    [
      'Care este masca zecimală pentru prefixul IPv4 /24?',
      'What is the dotted-decimal mask for IPv4 prefix /24?',
    ],
    [
      'O rețea mică folosește prefixul /24. Ce mască configurezi?',
      'A small network uses a /24 prefix. Which mask do you configure?',
    ],
    ['asociezi prefixul cu masca sa IPv4', 'map the prefix to its IPv4 mask'],
    ['255.255.255.0', '255.255.255.0'],
    [
      ['255.255.0.0', '255.255.0.0'],
      ['255.0.0.0', '255.0.0.0'],
      ['255.255.255.128', '255.255.255.128'],
    ],
    [
      '/24 înseamnă 24 de biți de rețea, adică 255.255.255.0.',
      '/24 means 24 network bits, which is 255.255.255.0.',
    ],
    [
      'Masca pentru un prefix IPv4 /24 este 255.255.255.0.',
      'The mask for an IPv4 /24 prefix is 255.255.255.0.',
    ],
  ),
  seed(
    '01-infrastructura',
    ['Care este adresa de loopback IPv6?', 'What is the IPv6 loopback address?'],
    [
      'Un test local trebuie să verifice stiva IPv6 fără să trimită pachete în LAN. Ce adresă folosești?',
      'A local test must check the IPv6 stack without sending packets on the LAN. Which address do you use?',
    ],
    [
      'testezi gazda locală prin loopback IPv6',
      'test the local host through IPv6 loopback',
    ],
    ['::1', '::1'],
    [
      ['fe80::1', 'fe80::1'],
      ['ff02::1', 'ff02::1'],
      ['2001:db8::1', '2001:db8::1'],
    ],
    [
      '::1 este adresa IPv6 de loopback, echivalentă funcțional cu 127.0.0.1.',
      '::1 is the IPv6 loopback address, functionally equivalent to 127.0.0.1.',
    ],
    [
      '::1 identifică interfața loopback IPv6.',
      '::1 identifies the IPv6 loopback interface.',
    ],
  ),
  seed(
    '01-infrastructura',
    [
      'Ce interval IPv4 este privat în clasa 10/8?',
      'Which IPv4 range is private in 10/8?',
    ],
    [
      'O rețea internă are nevoie de adrese care nu se rutează public. Care interval este rezervat privat?',
      'An internal network needs addresses that are not publicly routed. Which range is reserved as private?',
    ],
    ['alegi un interval privat RFC 1918', 'choose an RFC 1918 private range'],
    ['10.0.0.0–10.255.255.255', '10.0.0.0–10.255.255.255'],
    [
      ['11.0.0.0–11.255.255.255', '11.0.0.0–11.255.255.255'],
      ['100.0.0.0–100.255.255.255', '100.0.0.0–100.255.255.255'],
      ['192.0.0.0–192.0.0.255', '192.0.0.0–192.0.0.255'],
    ],
    [
      '10.0.0.0/8 este unul dintre cele trei intervale private IPv4.',
      '10.0.0.0/8 is one of the three private IPv4 ranges.',
    ],
    ['10.0.0.0/8 este un interval privat IPv4.', '10.0.0.0/8 is a private IPv4 range.'],
  ),
  seed(
    '01-infrastructura',
    [
      'Ce adresă reprezintă broadcast-ul în 192.168.4.0/24?',
      'Which address is the broadcast for 192.168.4.0/24?',
    ],
    [
      'Toate gazdele din subrețeaua /24 trebuie să primească un pachet broadcast. Care este adresa?',
      'All hosts on the /24 subnet must receive a broadcast packet. Which address is used?',
    ],
    [
      'calculezi adresa cu toți biții de gazdă setați',
      'calculate the address with all host bits set',
    ],
    ['192.168.4.255', '192.168.4.255'],
    [
      ['192.168.4.0', '192.168.4.0'],
      ['192.168.4.1', '192.168.4.1'],
      ['192.168.5.255', '192.168.5.255'],
    ],
    [
      'Într-un /24, ultimul octet al adresei broadcast este 255.',
      'In a /24, the last octet of the broadcast address is 255.',
    ],
    [
      '192.168.4.255 este broadcast-ul pentru 192.168.4.0/24.',
      '192.168.4.255 is the broadcast for 192.168.4.0/24.',
    ],
  ),
  seed(
    '01-infrastructura',
    ['Ce face gateway-ul implicit?', 'What does the default gateway do?'],
    [
      'Un PC trimite date către o rețea IP diferită de subrețeaua sa. Ce dispozitiv de nivel 3 folosește?',
      'A PC sends data to an IP network outside its subnet. Which layer-3 device does it use?',
    ],
    [
      'trimiți traficul destinat altor rețele către gateway',
      'send traffic for other networks to the gateway',
    ],
    ['Rutează traficul spre alte rețele', 'Routes traffic to other networks'],
    [
      ['Rezolvă nume de domeniu', 'Resolves domain names'],
      ['Atribuie adrese MAC', 'Assigns MAC addresses'],
      ['Amplifică semnalul Wi-Fi', 'Amplifies the Wi-Fi signal'],
    ],
    [
      'Gateway-ul implicit este următorul hop folosit pentru destinații din afara rețelei locale.',
      'The default gateway is the next hop for destinations outside the local network.',
    ],
    [
      'Gateway-ul implicit permite traficul către alte rețele.',
      'The default gateway enables traffic to other networks.',
    ],
  ),
  seed(
    '02-hardware',
    [
      'Ce tabel folosește un switch pentru a trimite cadre?',
      'Which table does a switch use to forward frames?',
    ],
    [
      'Switch-ul învață adresa sursă a cadrelor și alege portul de ieșire. Ce asociere păstrează?',
      'A switch learns frame source addresses and chooses an output port. Which mapping does it keep?',
    ],
    ['învățarea adreselor MAC pe porturi', 'learn MAC addresses on ports'],
    ['Adresă MAC către port', 'MAC address to port'],
    [
      ['Adresă IP către domeniu DNS', 'IP address to DNS domain'],
      ['Port TCP către proces', 'TCP port to process'],
      ['SSID către parolă', 'SSID to password'],
    ],
    [
      'Tabelul CAM al switch-ului asociază MAC-urile observate cu porturile.',
      'A switch CAM table maps learned MAC addresses to ports.',
    ],
    [
      'Un switch folosește adresele MAC pentru comutarea cadrelor în LAN.',
      'A switch uses MAC addresses to switch frames on a LAN.',
    ],
  ),
  seed(
    '02-hardware',
    [
      'Ce dispozitiv oferă conectivitate Wi-Fi pentru clienți?',
      'Which device provides Wi-Fi connectivity for clients?',
    ],
    [
      'Laptopurile trebuie conectate fără fir la LAN-ul existent. Ce componentă se adaugă?',
      'Laptops need wireless access to the existing LAN. Which component is added?',
    ],
    [
      'extinzi LAN-ul fără fir printr-un punct de acces',
      'extend the LAN wirelessly with an access point',
    ],
    ['Punct de acces', 'Wireless access point'],
    [
      ['Switch neadministrat', 'Unmanaged switch'],
      ['Patch panel', 'Patch panel'],
      ['Repetor de fibră', 'Fiber repeater'],
    ],
    [
      'Punctul de acces leagă clienții wireless de rețeaua locală.',
      'An access point connects wireless clients to the local network.',
    ],
    [
      'Un punct de acces permite clienților Wi-Fi să se conecteze la LAN.',
      'An access point lets Wi-Fi clients connect to a LAN.',
    ],
  ),
  seed(
    '02-hardware',
    [
      'Ce caracteristică indică Power over Ethernet?',
      'What does Power over Ethernet indicate?',
    ],
    [
      'Un punct de acces trebuie alimentat prin cablul Ethernet, fără priză locală. Ce suport este necesar?',
      'An access point must receive power through Ethernet without a local outlet. What support is needed?',
    ],
    [
      'alimentezi echipamentul compatibil prin cablul de rețea',
      'power compatible equipment through the network cable',
    ],
    ['PoE', 'PoE'],
    [
      ['VLAN tagging', 'VLAN tagging'],
      ['NAT', 'NAT'],
      ['WPA3', 'WPA3'],
    ],
    [
      'PoE transmite alimentare și date printr-un cablu Ethernet compatibil.',
      'PoE carries power and data over a compatible Ethernet cable.',
    ],
    [
      'PoE poate alimenta un punct de acces prin Ethernet.',
      'PoE can power an access point over Ethernet.',
    ],
  ),
  seed(
    '02-hardware',
    [
      'Ce cablu este potrivit pentru conexiuni Ethernet pe distanțe lungi și EMI ridicat?',
      'Which cable suits long Ethernet links with high EMI?',
    ],
    [
      'Un traseu trece lângă motoare electrice și depășește limita cuprului. Ce mediu alegi?',
      'A run passes near electric motors and exceeds copper distance limits. Which medium do you choose?',
    ],
    [
      'folosești fibră optică imună la interferențe electromagnetice',
      'use fiber optic cable, which is immune to electromagnetic interference',
    ],
    ['Fibră optică', 'Fiber optic'],
    [
      ['UTP Cat 5e', 'UTP Cat 5e'],
      ['Cablu telefonic', 'Telephone cable'],
      ['Coaxial pentru antenă TV', 'TV antenna coaxial'],
    ],
    [
      'Fibra transportă semnale optice și nu captează EMI ca un cablu de cupru.',
      'Fiber carries optical signals and does not pick up EMI like copper cable.',
    ],
    [
      'Fibra optică este potrivită pentru distanțe lungi și medii cu EMI.',
      'Fiber optic cable suits long distances and high-EMI environments.',
    ],
  ),
  seed(
    '02-hardware',
    ['Ce face un modem în legătura cu ISP-ul?', 'What does a modem do on an ISP link?'],
    [
      'Linia furnizorului folosește o tehnologie de acces care trebuie terminată la sediu. Ce echipament este folosit?',
      'The provider line uses an access technology that must terminate at the site. Which equipment is used?',
    ],
    [
      'termini conexiunea de acces a furnizorului',
      'terminate the provider access connection',
    ],
    ['Modem', 'Modem'],
    [
      ['Patch panel', 'Patch panel'],
      ['Hub USB', 'USB hub'],
      ['Punct de acces', 'Access point'],
    ],
    [
      'Modemul adaptează semnalul la tehnologia liniei furnizorului.',
      'A modem adapts signaling to the provider’s access technology.',
    ],
    [
      'Un modem poate termina conexiunea de acces la ISP.',
      'A modem can terminate the ISP access connection.',
    ],
  ),
  seed(
    '03-protocoale-servicii',
    [
      'Ce transport folosește DNS în mod obișnuit pentru interogări?',
      'Which transport does DNS commonly use for queries?',
    ],
    [
      'Un client trimite o interogare DNS obișnuită și răspunsul încape într-un datagram. Ce transport este comun?',
      'A client sends a standard DNS query and the answer fits in a datagram. Which transport is common?',
    ],
    [
      'trimiți interogarea DNS uzuală prin UDP port 53',
      'send the usual DNS query over UDP port 53',
    ],
    ['UDP port 53', 'UDP port 53'],
    [
      ['TCP port 25', 'TCP port 25'],
      ['UDP port 67', 'UDP port 67'],
      ['TCP port 443', 'TCP port 443'],
    ],
    [
      'DNS folosește uzual UDP port 53; anumite operații folosesc și TCP.',
      'DNS commonly uses UDP port 53; some operations also use TCP.',
    ],
    [
      'Interogările DNS obișnuite folosesc frecvent UDP port 53.',
      'Ordinary DNS queries commonly use UDP port 53.',
    ],
  ),
  seed(
    '03-protocoale-servicii',
    [
      'Ce protocol atribuie dinamic o configurație IP?',
      'Which protocol dynamically assigns IP configuration?',
    ],
    [
      'Un laptop conectat la o rețea primește automat IP, gateway și DNS. Ce serviciu face asta?',
      'A laptop joins a network and automatically receives an IP, gateway, and DNS. Which service does this?',
    ],
    [
      'obții configurația de rețea prin DHCP',
      'obtain network configuration through DHCP',
    ],
    ['DHCP', 'DHCP'],
    [
      ['DNS', 'DNS'],
      ['NTP', 'NTP'],
      ['SNMP', 'SNMP'],
    ],
    [
      'DHCP închiriază parametri IP clienților dintr-un pool.',
      'DHCP leases IP parameters to clients from a pool.',
    ],
    [
      'DHCP poate atribui automat adresa IP și gateway-ul.',
      'DHCP can assign an IP address and gateway automatically.',
    ],
  ),
  seed(
    '03-protocoale-servicii',
    ['Ce port folosește HTTPS în mod obișnuit?', 'Which port does HTTPS commonly use?'],
    [
      'Un browser stabilește o sesiune web criptată prin HTTPS. Ce port implicit contactează?',
      'A browser establishes an encrypted HTTPS session. Which default port does it contact?',
    ],
    ['folosești portul standard HTTPS', 'use the standard HTTPS port'],
    ['TCP port 443', 'TCP port 443'],
    [
      ['TCP port 80', 'TCP port 80'],
      ['TCP port 22', 'TCP port 22'],
      ['UDP port 161', 'UDP port 161'],
    ],
    ['HTTPS folosește implicit portul TCP 443.', 'HTTPS uses TCP port 443 by default.'],
    ['HTTPS folosește de regulă portul 443.', 'HTTPS normally uses port 443.'],
  ),
  seed(
    '03-protocoale-servicii',
    ['Ce port standard folosește SSH?', 'Which standard port does SSH use?'],
    [
      'Un administrator deschide o sesiune de shell securizată către un server Linux. Ce port TCP permite?',
      'An administrator opens a secure shell session to a Linux server. Which TCP port is allowed?',
    ],
    ['permiți serviciul SSH pe portul său standard', 'allow SSH on its standard port'],
    ['TCP port 22', 'TCP port 22'],
    [
      ['TCP port 23', 'TCP port 23'],
      ['TCP port 21', 'TCP port 21'],
      ['UDP port 53', 'UDP port 53'],
    ],
    ['SSH folosește în mod implicit TCP port 22.', 'SSH uses TCP port 22 by default.'],
    ['Portul TCP standard pentru SSH este 22.', 'The standard TCP port for SSH is 22.'],
  ),
  seed(
    '03-protocoale-servicii',
    ['Ce avantaj oferă TCP față de UDP?', 'What advantage does TCP provide over UDP?'],
    [
      'Transferul unui fișier trebuie să detecteze pierderi și să retransmită datele. Ce transport alegi?',
      'A file transfer must detect loss and retransmit data. Which transport do you choose?',
    ],
    [
      'folosești livrare orientată pe conexiune cu confirmări',
      'use connection-oriented delivery with acknowledgments',
    ],
    ['TCP', 'TCP'],
    [
      ['UDP', 'UDP'],
      ['ICMP', 'ICMP'],
      ['ARP', 'ARP'],
    ],
    [
      'TCP oferă secvențiere și retransmisii pentru livrare fiabilă.',
      'TCP provides sequencing and retransmission for reliable delivery.',
    ],
    ['TCP poate retransmite segmente pierdute.', 'TCP can retransmit lost segments.'],
  ),
  seed(
    '03-protocoale-servicii',
    [
      'Ce rezolvă protocolul ARP într-un LAN IPv4?',
      'What does ARP resolve on an IPv4 LAN?',
    ],
    [
      'O gazdă cunoaște IP-ul local al următorului hop și trebuie să încadreze pachetul în Ethernet. Ce află?',
      'A host knows the local next-hop IP and must frame the packet for Ethernet. What does it discover?',
    ],
    [
      'afli adresa MAC asociată unei adrese IPv4 locale',
      'discover the MAC address associated with a local IPv4 address',
    ],
    ['Adresa MAC', 'The MAC address'],
    [
      ['Numele DNS complet', 'The fully qualified DNS name'],
      ['Portul TCP', 'The TCP port'],
      ['Masca de subrețea', 'The subnet mask'],
    ],
    [
      'ARP face asocierea dintre IPv4 și adresa MAC necesară pe legătura locală.',
      'ARP maps IPv4 to the MAC address needed on the local link.',
    ],
    [
      'ARP este folosit pentru a afla adresa MAC locală corespunzătoare unui IPv4.',
      'ARP is used to find the local MAC address for an IPv4 address.',
    ],
  ),
  seed(
    '04-securitate',
    [
      'Ce face WPA3-Personal pentru o rețea Wi-Fi?',
      'What does WPA3-Personal provide for a Wi-Fi network?',
    ],
    [
      'Un router casnic trebuie să autentifice clienții cu o parolă și să protejeze traficul radio. Ce mod alegi?',
      'A home router must authenticate clients with a password and protect radio traffic. Which mode do you choose?',
    ],
    [
      'activezi autentificarea și criptarea moderne pentru Wi-Fi',
      'enable modern Wi-Fi authentication and encryption',
    ],
    ['WPA3-Personal', 'WPA3-Personal'],
    [
      ['WEP', 'WEP'],
      ['Deschis fără parolă', 'Open without a password'],
      ['Telnet', 'Telnet'],
    ],
    [
      'WPA3-Personal folosește autentificare bazată pe parolă și protejează traficul wireless.',
      'WPA3-Personal uses password-based authentication and protects wireless traffic.',
    ],
    ['WPA3 este o opțiune de securitate Wi-Fi.', 'WPA3 is a Wi-Fi security option.'],
  ),
  seed(
    '04-securitate',
    [
      'De ce separi rețeaua Wi-Fi pentru invitați?',
      'Why separate a guest Wi-Fi network?',
    ],
    [
      'Vizitatorii au nevoie de internet, dar nu trebuie să acceseze imprimante și fișiere interne. Ce configurezi?',
      'Guests need internet but should not reach internal printers and files. What do you configure?',
    ],
    [
      'izolezi clienții invitați de resursele interne',
      'isolate guest clients from internal resources',
    ],
    ['SSID/VLAN pentru invitați cu izolare', 'A guest SSID/VLAN with isolation'],
    [
      ['Aceeași rețea LAN fără reguli', 'The same LAN without rules'],
      ['Dezactivezi firewall-ul', 'Disable the firewall'],
      ['Partajezi parola de administrator', 'Share the administrator password'],
    ],
    [
      'Izolarea guest limitează accesul oaspeților la rețeaua de producție.',
      'Guest isolation limits visitors’ access to the production network.',
    ],
    [
      'O rețea guest izolată poate oferi internet fără acces la LAN-ul intern.',
      'An isolated guest network can provide internet without internal LAN access.',
    ],
  ),
  seed(
    '04-securitate',
    [
      'Ce protejează un VPN la conectarea de la distanță?',
      'What does a VPN protect for remote access?',
    ],
    [
      'Un angajat folosește Wi-Fi public pentru a accesa resurse interne. Ce creează VPN-ul?',
      'An employee uses public Wi-Fi to reach internal resources. What does the VPN create?',
    ],
    [
      'stabilești un tunel criptat către rețeaua organizației',
      'establish an encrypted tunnel to the organization network',
    ],
    ['Tunel criptat', 'An encrypted tunnel'],
    [
      ['Un punct de acces radio local', 'A local wireless access point'],
      ['O rezervare DHCP', 'A DHCP reservation'],
      [
        'Un cablu Ethernet virtual fără criptare',
        'An unencrypted virtual Ethernet cable',
      ],
    ],
    [
      'VPN-ul autentifică și criptează conexiunea logică prin rețeaua publică.',
      'A VPN authenticates and encrypts a logical connection over a public network.',
    ],
    [
      'Un VPN poate proteja traficul dintre client și rețeaua organizației.',
      'A VPN can protect traffic between a client and the organization network.',
    ],
  ),
  seed(
    '04-securitate',
    [
      'Ce este principiul privilegiului minim?',
      'What is the principle of least privilege?',
    ],
    [
      'Un cont de laborator trebuie să acceseze doar fișierele necesare exercițiului. Ce politică aplici?',
      'A lab account should access only files required for its exercise. Which policy do you apply?',
    ],
    [
      'acorzi doar permisiunile necesare rolului',
      'grant only permissions needed for the role',
    ],
    ['Privilegiu minim', 'Least privilege'],
    [
      ['Administrator pentru toți', 'Administrator for everyone'],
      ['Aceeași parolă pentru toate conturile', 'One password for all accounts'],
      ['Acces anonim permanent', 'Permanent anonymous access'],
    ],
    [
      'Privilegiul minim reduce impactul unei erori sau compromiteri.',
      'Least privilege reduces the impact of a mistake or compromise.',
    ],
    [
      'Un utilizator ar trebui să primească doar drepturile necesare.',
      'A user should receive only the permissions they need.',
    ],
  ),
  seed(
    '05-depanare',
    ['Ce testează ping în mod obișnuit?', 'What does ping commonly test?'],
    [
      'Vrei să verifici dacă o destinație IP răspunde prin ICMP și să măsori latența aproximativă. Ce comandă folosești?',
      'You want to see whether an IP responds to ICMP and estimate latency. Which command do you use?',
    ],
    ['trimiți cereri ICMP Echo cu ping', 'send ICMP Echo requests with ping'],
    ['Reachability și timpul de răspuns', 'Reachability and response time'],
    [
      ['Traseul exact al fiecărui proces', 'The exact route of each process'],
      ['Viteza discului', 'Disk speed'],
      ['Valoarea parolei Wi-Fi', 'The Wi-Fi password value'],
    ],
    [
      'ping indică răspunsurile Echo când ICMP nu este blocat.',
      'ping reports Echo replies when ICMP is not blocked.',
    ],
    [
      'ping poate verifica conectivitatea IP de bază.',
      'ping can check basic IP connectivity.',
    ],
  ),
  seed(
    '05-depanare',
    ['Ce afișează nslookup?', 'What does nslookup display?'],
    [
      'Un browser nu poate găsi hostname-ul intern. Trebuie verificat răspunsul DNS. Ce utilitar folosești?',
      'A browser cannot find an internal hostname. The DNS response must be checked. Which utility do you use?',
    ],
    [
      'interoghezi serverul DNS pentru un nume sau o adresă',
      'query DNS for a name or address',
    ],
    ['Înregistrări DNS pentru nume/adresă', 'DNS records for a name/address'],
    [
      ['Adresele MAC ale switch-ului', 'The switch MAC addresses'],
      ['Procesorul utilizat', 'CPU usage'],
      ['Conținutul cache-ului browserului', 'Browser cache contents'],
    ],
    [
      'nslookup efectuează interogări DNS și afișează răspunsurile.',
      'nslookup performs DNS queries and displays the responses.',
    ],
    [
      'nslookup ajută la depanarea rezoluției numelor DNS.',
      'nslookup helps troubleshoot DNS name resolution.',
    ],
  ),
  seed(
    '05-depanare',
    [
      'Ce verifică ipconfig /all pe Windows?',
      'What does ipconfig /all check on Windows?',
    ],
    [
      'Un client nu primește gateway-ul așteptat. Ce comandă afișează detaliile adaptorului și DHCP?',
      'A client did not receive the expected gateway. Which command displays adapter and DHCP details?',
    ],
    [
      'inspectezi adresa, masca, gateway-ul și detaliile DHCP',
      'inspect the address, mask, gateway, and DHCP details',
    ],
    ['Configurația IP a adaptoarelor', 'Adapter IP configuration'],
    [
      ['Tabelul de rutare al ISP-ului', 'The ISP routing table'],
      ['Parolele salvate în browser', 'Saved browser passwords'],
      ['Starea porturilor TCP la distanță', 'Remote TCP port states'],
    ],
    [
      'ipconfig /all afișează configurația detaliată a interfețelor Windows.',
      'ipconfig /all displays detailed Windows interface configuration.',
    ],
    [
      'ipconfig /all poate arăta gateway-ul implicit primit prin DHCP.',
      'ipconfig /all can show the default gateway received through DHCP.',
    ],
  ),
  seed(
    '05-depanare',
    ['Ce ajută tracert să identifice?', 'What does tracert help identify?'],
    [
      'Conexiunea ajunge la gateway, dar nu la serverul din afara LAN-ului. Ce utilitar arată hopurile?',
      'The connection reaches the gateway but not the remote server. Which utility shows the hops?',
    ],
    ['urmărești routerele de-a lungul traseului IP', 'trace routers along the IP path'],
    ['Hopurile traseului', 'The route hops'],
    [
      ['Rezultatul unei interogări SQL', 'The result of a SQL query'],
      ['VLAN-urile configurate pe toate switch-urile', 'VLANs on every switch'],
      ['Parola de acces a routerului', 'The router access password'],
    ],
    [
      'tracert/traceroute sondează hopurile pentru a localiza întreruperea traseului.',
      'tracert/traceroute probes hops to locate a break in the route.',
    ],
    [
      'tracert poate arăta unde se oprește răspunsul de-a lungul unui traseu.',
      'tracert can show where replies stop along a route.',
    ],
  ),
  seed(
    '05-depanare',
    ['Ce face ipconfig /renew?', 'What does ipconfig /renew do?'],
    [
      'Un client DHCP a fost eliberat și trebuie să ceară din nou configurație IP. Ce comandă rulezi?',
      'A DHCP client released its lease and needs to request IP configuration again. Which command do you run?',
    ],
    ['soliciți o reînnoire a lease-ului DHCP', 'request a DHCP lease renewal'],
    ['Cere configurația DHCP reînnoită', 'Requests renewed DHCP configuration'],
    [
      ['Golește tabelul MAC al switch-ului', 'Clears the switch MAC table'],
      ['Testează un server DNS', 'Tests a DNS server'],
      ['Dezactivează adaptorul permanent', 'Permanently disables the adapter'],
    ],
    [
      'ipconfig /renew cere configurația DHCP pentru adaptoarele selectate.',
      'ipconfig /renew requests DHCP configuration for selected adapters.',
    ],
    [
      'ipconfig /renew poate solicita o adresă DHCP actualizată.',
      'ipconfig /renew can request updated DHCP configuration.',
    ],
  ),
  seed(
    '05-depanare',
    [
      'Ce verifici când un nume DNS nu se rezolvă, dar IP-ul răspunde?',
      'What do you check when a DNS name fails but its IP responds?',
    ],
    [
      'Ping către IP reușește, iar hostname-ul eșuează. Ce componentă investighezi?',
      'A ping to the IP succeeds but the hostname fails. Which component do you investigate?',
    ],
    [
      'verifici configurația DNS și rezoluția numelui',
      'check DNS configuration and name resolution',
    ],
    ['Serverul DNS sau înregistrarea numelui', 'The DNS server or name record'],
    [
      ['Cablul monitorului', 'The monitor cable'],
      ['Permisiunile locale NTFS', 'Local NTFS permissions'],
      ['Driverul audio', 'The audio driver'],
    ],
    [
      'Conectivitatea IP funcțională cu rezoluție eșuată indică o posibilă problemă DNS.',
      'Working IP connectivity with failed name resolution suggests a DNS issue.',
    ],
    [
      'Dacă IP-ul răspunde, dar numele nu, verificarea DNS este un pas potrivit.',
      'If the IP responds but the name does not, checking DNS is appropriate.',
    ],
  ),
]
const deviceFacts: Seed[] = [
  seed(
    '01-configurare',
    [
      'Ce folosești pentru a instala actualizări Windows?',
      'What do you use to install Windows updates?',
    ],
    [
      'Un dispozitiv trebuie să primească actualizări cumulative și de securitate. Unde verifici?',
      'A device needs cumulative and security updates. Where do you check?',
    ],
    [
      'verifici pagina Windows Update din Settings',
      'check the Windows Update page in Settings',
    ],
    ['Windows Update', 'Windows Update'],
    [
      ['Device Manager', 'Device Manager'],
      ['Disk Management', 'Disk Management'],
      ['Event Viewer', 'Event Viewer'],
    ],
    [
      'Windows Update verifică, descarcă și instalează actualizări aprobate.',
      'Windows Update checks for, downloads, and installs approved updates.',
    ],
    [
      'Actualizările Windows se gestionează prin Windows Update.',
      'Windows updates are managed through Windows Update.',
    ],
  ),
  seed(
    '01-configurare',
    [
      'Unde dezactivezi o aplicație de la pornirea automată?',
      'Where do you disable an app from starting automatically?',
    ],
    [
      'Autostart-ul mărește timpul de boot și aplicația nu este necesară la pornire. Ce instrument verifici?',
      'Startup apps increase boot time and are not needed immediately. Which tool do you check?',
    ],
    [
      'revizuiești lista Startup apps din Task Manager sau Settings',
      'review Startup apps in Task Manager or Settings',
    ],
    ['Startup apps', 'Startup apps'],
    [
      ['Disk Cleanup', 'Disk Cleanup'],
      ['Windows Defender Firewall', 'Windows Defender Firewall'],
      ['Credential Manager', 'Credential Manager'],
    ],
    [
      'Aplicațiile de pornire pot fi activate sau dezactivate fără dezinstalarea lor.',
      'Startup apps can be enabled or disabled without uninstalling them.',
    ],
    [
      'Task Manager poate dezactiva aplicații din pornire.',
      'Task Manager can disable startup apps.',
    ],
  ),
  seed(
    '01-configurare',
    ['Ce rol are Device Manager?', 'What is Device Manager used for?'],
    [
      'Un adaptor de rețea are semn de eroare și driverul trebuie actualizat. Ce consolă deschizi?',
      'A network adapter shows an error and its driver needs updating. Which console do you open?',
    ],
    [
      'inspectezi dispozitivul și driverul în Device Manager',
      'inspect the device and driver in Device Manager',
    ],
    ['Device Manager', 'Device Manager'],
    [
      ['Disk Management', 'Disk Management'],
      ['Task Scheduler', 'Task Scheduler'],
      ['Resource Monitor', 'Resource Monitor'],
    ],
    [
      'Device Manager arată hardware-ul instalat și starea driverelor.',
      'Device Manager shows installed hardware and driver status.',
    ],
    [
      'Device Manager ajută la gestionarea driverelor dispozitivelor.',
      'Device Manager helps manage device drivers.',
    ],
  ),
  seed(
    '01-configurare',
    [
      'Ce setare ajută când textul de pe ecran este prea mic?',
      'Which setting helps when on-screen text is too small?',
    ],
    [
      'Utilizatorul are nevoie de text mai mare, fără schimbarea rezoluției monitorului. Ce ajustezi?',
      'A user needs larger text without changing the monitor resolution. What do you adjust?',
    ],
    [
      'mărești scalarea sau dimensiunea textului din Display settings',
      'increase scaling or text size in Display settings',
    ],
    ['Scalare/dimensiune text', 'Scaling/text size'],
    [
      ['Rata de refresh a discului', 'Disk refresh rate'],
      ['Subnet mask', 'Subnet mask'],
      ['NTFS compression', 'NTFS compression'],
    ],
    [
      'Setările de accesibilitate și scalare măresc interfața fără a schimba conținutul aplicației.',
      'Accessibility and scaling settings enlarge the interface without changing app content.',
    ],
    [
      'Display settings pot schimba scalarea interfeței.',
      'Display settings can change interface scaling.',
    ],
  ),
  seed(
    '01-configurare',
    [
      'Ce configurație păstrează utilizatorii existenți la schimbarea PC-ului?',
      'Which setup preserves existing user data when replacing a PC?',
    ],
    [
      'Angajații primesc un PC nou și trebuie să-și recupereze documentele și setările. Ce planifici?',
      'Employees receive a new PC and need their documents and settings restored. What do you plan?',
    ],
    [
      'faci backup și transferi datele înainte de retragerea vechiului dispozitiv',
      'back up and transfer data before retiring the old device',
    ],
    ['Backup și migrare planificată', 'A planned backup and migration'],
    [
      ['Ștergi discul vechi înainte de copiere', 'Erase the old drive before copying'],
      ['Dezactivezi conturile înainte de export', 'Disable accounts before export'],
      ['Mărești rezoluția ecranului', 'Increase display resolution'],
    ],
    [
      'Backup-ul verificat și migrarea reduc pierderea de date la înlocuire.',
      'A verified backup and migration reduce data loss during replacement.',
    ],
    [
      'Datele se verifică prin backup înainte de migrarea la un PC nou.',
      'Data should be protected with a backup before migrating to a new PC.',
    ],
  ),
  seed(
    '01-configurare',
    [
      'Ce face o aplicație implicită în Windows?',
      'What does a default app do in Windows?',
    ],
    [
      'Fișierele .pdf trebuie să se deschidă într-un anumit cititor. Ce asociezi?',
      'PDF files must open in a particular reader. What do you associate?',
    ],
    [
      'setezi aplicația implicită pentru tipul de fișier',
      'set the default app for the file type',
    ],
    ['Tipul de fișier cu aplicația', 'The file type with the app'],
    [
      ['Fișierul cu un driver', 'The file with a driver'],
      ['Contul cu o parolă Wi-Fi', 'The account with a Wi-Fi password'],
      ['Volumul cu un server DNS', 'The volume with a DNS server'],
    ],
    [
      'Asocierea implicită controlează ce aplicație deschide un tip sau protocol.',
      'A default association controls which app opens a file type or protocol.',
    ],
    [
      'O asociere implicită poate selecta aplicația care deschide PDF-uri.',
      'A default association can choose the app that opens PDFs.',
    ],
  ),
  seed(
    '01-configurare',
    ['Ce efect are blocarea ecranului?', 'What does locking the screen do?'],
    [
      'Utilizatorul părăsește temporar biroul, dar nu trebuie să închidă aplicațiile. Ce comandă folosește?',
      'A user leaves the desk briefly but must keep apps open. What action should they use?',
    ],
    [
      'blochezi sesiunea și ceri autentificare la revenire',
      'lock the session and require sign-in on return',
    ],
    [
      'Păstrează sesiunea deschisă și ascunde accesul',
      'Keeps the session open while blocking access',
    ],
    [
      ['Închide sesiunea și salvează parola', 'Signs out and saves the password'],
      ['Oprește dispozitivul imediat', 'Shuts the device down immediately'],
      ['Dezinstalează aplicațiile active', 'Uninstalls active apps'],
    ],
    [
      'Blocarea împiedică accesul fără autentificare, păstrând aplicațiile sesiunii.',
      'Locking blocks access without signing out of the session.',
    ],
    [
      'Blocarea ecranului păstrează sesiunea, dar cere autentificare pentru revenire.',
      'Locking the screen keeps the session but requires sign-in to resume.',
    ],
  ),
  seed(
    '01-configurare',
    ['Ce face Safe Removal pentru un USB?', 'What does Safe Removal do for a USB drive?'],
    [
      'Un stick poate avea scrieri încă în cache. Cum îl scoți în siguranță?',
      'A USB drive may have writes still cached. How should it be removed?',
    ],
    [
      'folosești Eject și aștepți confirmarea înainte de deconectare',
      'use Eject and wait for confirmation before unplugging',
    ],
    ['Finalizează operațiile înainte de scoatere', 'Finishes operations before removal'],
    [
      ['Șterge automat toate fișierele', 'Automatically deletes all files'],
      ['Formatează stickul', 'Formats the drive'],
      ['Oprește Windows Update', 'Stops Windows Update'],
    ],
    [
      'Eject permite sistemului să finalizeze scrierile și să elibereze dispozitivul.',
      'Eject lets the system finish writes and release the device.',
    ],
    [
      'Un dispozitiv de stocare USB se ejectează înainte de deconectare.',
      'A USB storage device should be ejected before unplugging.',
    ],
  ),
  seed(
    '01-configurare',
    [
      'Ce tip de cont este potrivit pentru utilizarea zilnică?',
      'Which account type is appropriate for daily use?',
    ],
    [
      'Utilizatorul instalează aplicații aprobate, dar nu administrează alți utilizatori. Ce privilegii primește?',
      'A user installs approved apps but does not administer other users. Which privileges should be assigned?',
    ],
    [
      'folosești un cont standard și elevi privilegiile doar când sunt necesare',
      'use a standard account and elevate privileges only when needed',
    ],
    ['Cont standard', 'Standard account'],
    [
      ['Administrator permanent', 'Permanent administrator'],
      ['Guest fără autentificare', 'Unauthenticated guest'],
      ['Cont de serviciu partajat', 'Shared service account'],
    ],
    [
      'Conturile standard reduc impactul schimbărilor accidentale sau malițioase.',
      'Standard accounts reduce the impact of accidental or malicious changes.',
    ],
    [
      'Un cont standard este preferabil pentru activitățile zilnice obișnuite.',
      'A standard account is preferred for routine daily work.',
    ],
  ),
  seed(
    '01-configurare',
    ['De ce verifici compatibilitatea unui driver?', 'Why check driver compatibility?'],
    [
      'Un pachet vechi de driver nu suportă versiunea Windows instalată. Ce faci înainte de distribuire?',
      'An old driver package does not support the installed Windows version. What should you do before deployment?',
    ],
    [
      'confirmi versiunea, arhitectura și suportul hardware',
      'confirm the version, architecture, and hardware support',
    ],
    [
      'Verifici compatibilitatea înainte de instalare',
      'Check compatibility before installation',
    ],
    [
      ['Instalezi driverul în toate cazurile', 'Install the driver in every case'],
      ['Dezactivezi semnătura tuturor driverelor', 'Disable all driver signature checks'],
      ['Ștergi jurnalul de evenimente', 'Delete the event log'],
    ],
    [
      'Un driver nepotrivit poate cauza defecțiuni sau poate să nu fie instalat.',
      'An incompatible driver may malfunction or fail to install.',
    ],
    [
      'Compatibilitatea driverului trebuie verificată cu sistemul și hardware-ul.',
      'Driver compatibility should be checked against the OS and hardware.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Ce sistem de fișiere suportă permisiuni NTFS?',
      'Which file system supports NTFS permissions?',
    ],
    [
      'Un volum Windows trebuie să controleze accesul la nivel de fișier și folder. Ce sistem de fișiere alegi?',
      'A Windows volume must control file and folder access. Which file system do you choose?',
    ],
    ['formatezi volumul cu NTFS', 'format the volume with NTFS'],
    ['NTFS', 'NTFS'],
    [
      ['FAT32', 'FAT32'],
      ['exFAT doar pe cloud', 'exFAT only on cloud'],
      ['ISO 9660', 'ISO 9660'],
    ],
    [
      'NTFS oferă ACL-uri și alte funcții Windows pentru volume locale.',
      'NTFS provides ACLs and other Windows features for local volumes.',
    ],
    [
      'NTFS poate aplica permisiuni Windows la fișiere și foldere.',
      'NTFS can apply Windows permissions to files and folders.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Ce permisiune NTFS controlează accesul local la un folder?',
      'Which NTFS permission controls local access to a folder?',
    ],
    [
      'Un utilizator local trebuie să poată citi, dar nu edita un document. Ce configurezi?',
      'A local user should read but not edit a document. What do you configure?',
    ],
    ['asignezi o permisiune NTFS Read', 'assign an NTFS Read permission'],
    ['Read', 'Read'],
    [
      ['Full Control', 'Full Control'],
      ['Modify pentru toți', 'Modify for everyone'],
      ['Share fără ACL', 'Share without an ACL'],
    ],
    [
      'ACL-ul NTFS stabilește acțiunile permise pe fișier sau folder.',
      'The NTFS ACL determines allowed actions on a file or folder.',
    ],
    [
      'Permisiunea NTFS Read permite citirea fără modificare.',
      'NTFS Read permits reading without modification.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Ce se întâmplă cu permisiunile moștenite într-un folder copil?',
      'What happens to inherited permissions on a child folder?',
    ],
    [
      'Un subfolder nou trebuie să folosească ACL-ul folderului părinte. Ce comportament lași activ?',
      'A new subfolder should use its parent folder’s ACL. Which behavior do you keep enabled?',
    ],
    ['păstrezi moștenirea permisiunilor NTFS', 'keep NTFS permission inheritance'],
    ['Moștenește permisiunile părintelui', 'Inherits the parent’s permissions'],
    [
      ['Șterge automat ACL-ul părintelui', 'Automatically deletes the parent ACL'],
      ['Dezactivează autentificarea', 'Disables authentication'],
      ['Convertește permisiunile în share', 'Converts permissions to share permissions'],
    ],
    [
      'Moștenirea propagă permisiunile părinte către obiectele copil.',
      'Inheritance propagates parent permissions to child objects.',
    ],
    [
      'Un folder copil poate moșteni ACL-ul folderului părinte.',
      'A child folder can inherit its parent folder’s ACL.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Cum se combină permisiunile share și NTFS la accesul prin rețea?',
      'How do share and NTFS permissions combine over the network?',
    ],
    [
      'Accesul la un fișier partajat este limitat atât de share, cât și de ACL-ul NTFS. Ce nivel efectiv se aplică?',
      'Network access to a shared file is limited by both the share and NTFS ACL. What effective level applies?',
    ],
    [
      'ții cont de combinația restrictivă a ambelor seturi',
      'account for the more restrictive combination of both sets',
    ],
    [
      'Cea mai restrictivă permisiune efectivă',
      'The most restrictive effective permission',
    ],
    [
      ['Întotdeauna Full Control', 'Always Full Control'],
      ['Doar permisiunea share', 'Only the share permission'],
      [
        'Doar permisiunea NTFS ignorând share',
        'Only NTFS permission, ignoring the share',
      ],
    ],
    [
      'Accesul prin share este limitat de setările share și NTFS.',
      'Share access is limited by both share and NTFS settings.',
    ],
    [
      'Permisiunile share și NTFS pot limita împreună accesul prin rețea.',
      'Share and NTFS permissions can jointly restrict network access.',
    ],
  ),
  seed(
    '02-acces-date',
    ['Ce face OneDrive Files On-Demand?', 'What does OneDrive Files On-Demand do?'],
    [
      'Fișierele din cloud trebuie să fie vizibile în Explorer fără descărcarea tuturor local. Ce activezi?',
      'Cloud files should appear in Explorer without downloading them all locally. What do you enable?',
    ],
    ['activezi Files On-Demand', 'enable Files On-Demand'],
    [
      'Afișează fișiere cloud și descarcă la cerere',
      'Shows cloud files and downloads them on demand',
    ],
    [
      ['Șterge fișierele din cloud', 'Deletes cloud files'],
      ['Dezactivează sincronizarea', 'Disables sync'],
      ['Criptează întregul disc local', 'Encrypts the entire local disk'],
    ],
    [
      'Files On-Demand economisește spațiu local păstrând placeholder-e pentru fișiere.',
      'Files On-Demand saves local space by keeping placeholders for files.',
    ],
    [
      'Files On-Demand poate păstra local doar fișierele utilizate.',
      'Files On-Demand can keep only used files locally.',
    ],
  ),
  seed(
    '02-acces-date',
    ['Ce protejează backup-ul versionat?', 'What does a versioned backup protect?'],
    [
      'Un fișier este suprascris sau criptat de ransomware, iar o copie veche curată este necesară. Ce politică ajută?',
      'A file is overwritten or encrypted by ransomware and a clean older copy is needed. Which policy helps?',
    ],
    [
      'păstrezi versiuni istorice și testezi restaurarea',
      'keep historical versions and test restoration',
    ],
    ['Backup cu versiuni istorice', 'A backup with historical versions'],
    [
      ['O singură copie sincronizată', 'A single synchronized copy'],
      ['Golirea Recycle Bin', 'Emptying Recycle Bin'],
      ['Dezactivarea restaurării', 'Disabling restore'],
    ],
    [
      'Versiunile istorice permit revenirea la o stare anterioară a datelor.',
      'Historical versions allow restoring an earlier data state.',
    ],
    [
      'O copie de rezervă versionată poate recupera datele după o suprascriere.',
      'A versioned backup can recover data after an overwrite.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Ce face Recycle Bin pentru un fișier șters local?',
      'What does Recycle Bin do for a locally deleted file?',
    ],
    [
      'Un utilizator a șters accidental un fișier și acesta nu a fost eliminat definitiv. Unde îl restaurezi?',
      'A user accidentally deleted a file and it was not permanently removed. Where do you restore it?',
    ],
    ['restaurezi fișierul din Recycle Bin', 'restore the file from Recycle Bin'],
    [
      'Permite restaurarea elementelor șterse recent',
      'Allows recently deleted items to be restored',
    ],
    [
      ['Recuperează orice disc formatat', 'Recovers any formatted disk'],
      ['Înlocuiește backup-ul extern', 'Replaces an external backup'],
      ['Decriptează BitLocker', 'Decrypts BitLocker'],
    ],
    [
      'Recycle Bin păstrează temporar anumite fișiere șterse local.',
      'Recycle Bin temporarily keeps certain locally deleted files.',
    ],
    [
      'Un fișier aflat în Recycle Bin poate fi restaurat.',
      'A file in Recycle Bin can be restored.',
    ],
  ),
  seed(
    '02-acces-date',
    ['Ce face compresia NTFS?', 'What does NTFS compression do?'],
    [
      'Documentele rar accesate trebuie să ocupe mai puțin spațiu pe un volum NTFS. Ce proprietate activezi?',
      'Rarely used documents should occupy less space on an NTFS volume. Which property do you enable?',
    ],
    [
      'activezi compresia pentru fișierele potrivite',
      'enable compression for suitable files',
    ],
    ['Stochează fișierele comprimate pe volum', 'Stores files compressed on the volume'],
    [
      ['Criptează fișierele cu BitLocker', 'Encrypts files with BitLocker'],
      ['Creează copii externe', 'Creates external copies'],
      ['Schimbă proprietarul folderului', 'Changes the folder owner'],
    ],
    [
      'Compresia NTFS economisește spațiu cu procesare suplimentară la acces.',
      'NTFS compression saves space with extra processing during access.',
    ],
    [
      'Compresia NTFS poate reduce spațiul ocupat de fișiere.',
      'NTFS compression can reduce the space used by files.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Ce avantaj are stocarea în cloud pentru colaborare?',
      'What is a cloud storage benefit for collaboration?',
    ],
    [
      'Mai mulți utilizatori trebuie să acceseze documente aprobate de pe dispozitive autorizate. Ce serviciu poate ajuta?',
      'Several users need approved documents on authorized devices. Which service can help?',
    ],
    [
      'folosești sincronizare și partajare cloud cu permisiuni',
      'use cloud sync and sharing with permissions',
    ],
    [
      'Acces și colaborare controlată prin internet',
      'Controlled access and collaboration over the internet',
    ],
    [
      ['Elimină necesitatea permisiunilor', 'Removes the need for permissions'],
      ['Funcționează doar pe un singur disc USB', 'Works only on one USB drive'],
      ['Dezactivează backup-ul', 'Disables backup'],
    ],
    [
      'Serviciile cloud permit sincronizare și partajare, dar necesită controlul accesului.',
      'Cloud services allow sync and sharing but still require access control.',
    ],
    [
      'Partajarea cloud trebuie configurată cu permisiuni potrivite.',
      'Cloud sharing should use appropriate permissions.',
    ],
  ),
  seed(
    '02-acces-date',
    [
      'Ce verifici înainte de a partaja un folder?',
      'What should you check before sharing a folder?',
    ],
    [
      'Un folder conține documente interne și va fi partajat către echipă. Ce revizuiești?',
      'A folder contains internal documents and will be shared with a team. What should you review?',
    ],
    [
      'validezi destinatarii și permisiunile necesare',
      'validate recipients and necessary permissions',
    ],
    ['Destinatari și drepturi de acces', 'Recipients and access rights'],
    [
      ['Doar culoarea pictogramei', 'Only the icon color'],
      ['Setările monitorului', 'Monitor settings'],
      ['Parola Wi-Fi personală', 'Personal Wi-Fi password'],
    ],
    [
      'Partajarea sigură acordă acces numai identităților și acțiunilor necesare.',
      'Safe sharing grants access only to needed identities and actions.',
    ],
    [
      'Accesul unui folder partajat trebuie acordat doar utilizatorilor necesari.',
      'A shared folder’s access should be limited to necessary users.',
    ],
  ),
  seed(
    '02-acces-date',
    ['De ce folosești un backup 3-2-1?', 'Why use a 3-2-1 backup strategy?'],
    [
      'Un incendiu sau ransomware poate afecta copiile păstrate lângă PC. Ce strategie adaugă reziliență?',
      'A fire or ransomware may affect copies stored beside a PC. Which strategy adds resilience?',
    ],
    [
      'păstrezi trei copii, pe două medii, una off-site',
      'keep three copies on two media types, with one off-site',
    ],
    ['Strategia 3-2-1', 'The 3-2-1 strategy'],
    [
      ['Trei conturi pe același disc', 'Three accounts on the same disk'],
      ['Un singur backup neverificat', 'One unverified backup'],
      ['Sincronizare în același folder', 'Sync in the same folder'],
    ],
    [
      'Copiile pe medii diferite și off-site reduc riscul unei pierderi comune.',
      'Copies on different media and off-site reduce common-loss risk.',
    ],
    [
      'O copie off-site este una dintre recomandările strategiei 3-2-1.',
      'An off-site copy is part of the 3-2-1 strategy.',
    ],
  ),
  seed(
    '03-securitate',
    ['Ce face UAC în Windows?', 'What does UAC do in Windows?'],
    [
      'O aplicație încearcă să schimbe setări administrative. Ce mecanism solicită aprobare sau acreditări?',
      'An app attempts an administrative change. Which mechanism requests approval or credentials?',
    ],
    [
      'folosești User Account Control pentru elevare',
      'use User Account Control for elevation',
    ],
    [
      'Solicită aprobare/elevare pentru acțiuni privilegiate',
      'Requests approval/elevation for privileged actions',
    ],
    [
      ['Înlocuiește antivirusul', 'Replaces antivirus'],
      ['Atribuie IP prin DHCP', 'Assigns an IP through DHCP'],
      ['Criptează automat fiecare email', 'Automatically encrypts every email'],
    ],
    [
      'UAC ajută la confirmarea schimbărilor care necesită privilegii administrative.',
      'UAC helps confirm changes that require administrative privileges.',
    ],
    [
      'UAC poate cere confirmarea unei acțiuni privilegiate.',
      'UAC can ask for confirmation of a privileged action.',
    ],
  ),
  seed(
    '03-securitate',
    ['Ce protejează BitLocker?', 'What does BitLocker protect?'],
    [
      'Laptopul este pierdut, iar discul nu trebuie citit fără autorizare. Ce activezi?',
      'A laptop is lost and its drive must not be read without authorization. What do you enable?',
    ],
    ['criptezi volumul cu BitLocker', 'encrypt the volume with BitLocker'],
    ['Datele de pe volum la repaus', 'Data on the volume at rest'],
    [
      ['Tastatura de malware în timp real', 'The keyboard from real-time malware'],
      ['Conexiunea DNS externă', 'The external DNS connection'],
      ['Parola contului cloud', 'The cloud account password'],
    ],
    [
      'BitLocker criptează volume și reduce accesul la date dacă discul este scos.',
      'BitLocker encrypts volumes and limits data access if a drive is removed.',
    ],
    [
      'BitLocker poate proteja datele de pe un disc pierdut.',
      'BitLocker can protect data on a lost drive.',
    ],
  ),
  seed(
    '03-securitate',
    ['Ce este autentificarea multi-factor?', 'What is multi-factor authentication?'],
    [
      'O parolă furată nu trebuie să fie suficientă pentru acces. Ce impui?',
      'A stolen password should not be enough for access. What do you require?',
    ],
    [
      'combini factori independenți precum parolă și aplicație',
      'combine independent factors such as a password and app',
    ],
    ['Doi sau mai mulți factori de autentificare', 'Two or more authentication factors'],
    [
      ['Două parole identice', 'Two identical passwords'],
      ['Doar un PIN mai lung', 'Only a longer PIN'],
      ['Un cont partajat de echipă', 'A shared team account'],
    ],
    [
      'MFA combină factori din categorii distincte, nu doar două parole.',
      'MFA combines factors from distinct categories, not just two passwords.',
    ],
    [
      'MFA cere mai mult de un factor pentru autentificare.',
      'MFA requires more than one factor for authentication.',
    ],
  ),
  seed(
    '03-securitate',
    [
      'Ce protejează Windows Defender Firewall?',
      'What does Windows Defender Firewall protect?',
    ],
    [
      'Aplicațiile nu trebuie să accepte conexiuni neautorizate pe profilul rețelei. Ce controlezi?',
      'Apps should not accept unauthorized connections on the network profile. What do you control?',
    ],
    [
      'controlezi traficul de intrare și ieșire prin reguli',
      'control inbound and outbound traffic with rules',
    ],
    ['Conexiunile de rețea permise', 'Allowed network connections'],
    [
      ['Permisiunile NTFS', 'NTFS permissions'],
      ['Setările fizice ale BIOS-ului', 'Physical BIOS settings'],
      ['Numărul de copii OneDrive', 'The number of OneDrive copies'],
    ],
    [
      'Firewall-ul Windows filtrează conexiuni după profil și reguli.',
      'Windows Firewall filters connections by profile and rules.',
    ],
    [
      'Firewall-ul poate bloca conexiuni de intrare nepermise.',
      'A firewall can block unauthorized inbound connections.',
    ],
  ),
  seed(
    '03-securitate',
    [
      'Ce face Microsoft Defender Antivirus?',
      'What does Microsoft Defender Antivirus do?',
    ],
    [
      'Un fișier descărcat trebuie verificat pentru malware înainte să fie deschis. Ce protecție folosești?',
      'A downloaded file should be checked for malware before opening. Which protection do you use?',
    ],
    [
      'scanezi fișierul cu protecția antimalware',
      'scan the file with antimalware protection',
    ],
    [
      'Detectează și blochează software malițios',
      'Detects and blocks malicious software',
    ],
    [
      ['Partajează fișierul pe internet', 'Shares the file online'],
      ['Administrează permisiuni de folder', 'Manages folder permissions'],
      ['Repară automat cablul de rețea', 'Automatically repairs the network cable'],
    ],
    [
      'Protecția antivirus scanează și poate pune în carantină amenințări detectate.',
      'Antivirus protection scans for and can quarantine detected threats.',
    ],
    [
      'Defender Antivirus poate scana fișiere pentru malware.',
      'Defender Antivirus can scan files for malware.',
    ],
  ),
  seed(
    '03-securitate',
    ['Ce face Windows Hello?', 'What does Windows Hello do?'],
    [
      'Utilizatorul trebuie să se autentifice biometric sau prin PIN legat de dispozitiv. Ce funcție folosește?',
      'A user must sign in biometrically or with a device-bound PIN. Which feature do they use?',
    ],
    ['configurezi Windows Hello', 'configure Windows Hello'],
    ['Autentificare cu față, amprentă sau PIN', 'Sign-in with face, fingerprint, or PIN'],
    [
      ['Partajare de fișiere anonimă', 'Anonymous file sharing'],
      ['Backup de sistem complet', 'Full system backup'],
      ['Rulare de scripturi la pornire', 'Startup script execution'],
    ],
    [
      'Windows Hello oferă metode locale de autentificare fără parolă.',
      'Windows Hello provides local passwordless sign-in methods.',
    ],
    [
      'Windows Hello poate folosi recunoaștere facială sau amprentă.',
      'Windows Hello can use face recognition or a fingerprint.',
    ],
  ),
  seed(
    '03-securitate',
    [
      'Ce face Microsoft Defender SmartScreen?',
      'What does Microsoft Defender SmartScreen help detect?',
    ],
    [
      'Un utilizator deschide un site sau fișier descărcat cunoscut ca nesigur. Ce protecție avertizează?',
      'A user opens a site or downloaded file known to be unsafe. Which protection warns them?',
    ],
    [
      'verifici reputația și avertizările SmartScreen',
      'use SmartScreen reputation checks and warnings',
    ],
    [
      'Site-uri și aplicații cu reputație riscantă',
      'Websites and apps with risky reputation',
    ],
    [
      ['Fișiere duplicate pe disc', 'Duplicate files on disk'],
      ['Conectivitatea unui router', 'Router connectivity'],
      ['Permisiunile unei imprimante', 'Printer permissions'],
    ],
    [
      'SmartScreen verifică reputația și avertizează despre conținut potențial periculos.',
      'SmartScreen checks reputation and warns about potentially unsafe content.',
    ],
    [
      'SmartScreen poate avertiza despre aplicații necunoscute sau suspecte.',
      'SmartScreen can warn about unknown or suspicious apps.',
    ],
  ),
  seed(
    '03-securitate',
    ['De ce blochezi conturile inactive?', 'Why disable inactive accounts?'],
    [
      'Un angajat a părăsit organizația, iar contul încă poate autentifica. Ce faci?',
      'An employee has left the organization but their account can still sign in. What do you do?',
    ],
    [
      'dezactivezi accesul și păstrezi procedura de audit',
      'disable access and preserve the audit process',
    ],
    [
      'Dezactivezi contul după politica organizației',
      'Disable the account per organizational policy',
    ],
    [
      ['Partajezi parola cu înlocuitorul', 'Share the password with a replacement'],
      ['Lași contul activ fără monitorizare', 'Leave it active without monitoring'],
      ['Elimini jurnalele', 'Remove the logs'],
    ],
    [
      'Dezactivarea conturilor inutile reduce suprafața de atac și păstrează trasabilitatea.',
      'Disabling unneeded accounts reduces attack surface and preserves accountability.',
    ],
    [
      'Accesul unui fost utilizator trebuie revocat la plecare.',
      'A former user’s access should be revoked when they leave.',
    ],
  ),
  seed(
    '03-securitate',
    ['Ce este o parolă passphrase puternică?', 'What is a strong passphrase?'],
    [
      'Politica cere un secret ușor de reținut, lung și greu de ghicit. Ce alegi?',
      'Policy calls for a memorable, long, hard-to-guess secret. What do you choose?',
    ],
    [
      'folosești o frază lungă, unică și nepartajată',
      'use a long, unique, unshared passphrase',
    ],
    ['O frază lungă și unică', 'A long, unique passphrase'],
    [
      ['Numele și anul nașterii', 'A name and birth year'],
      ['Parola comună a clasei', 'The class’s shared password'],
      ['Un PIN repetat pe toate conturile', 'One PIN reused across accounts'],
    ],
    [
      'Lungimea și unicitatea reduc riscul ghicirii și reutilizării credentialelor.',
      'Length and uniqueness reduce guessing and credential-reuse risks.',
    ],
    [
      'O parolă unică nu trebuie reutilizată pe mai multe conturi.',
      'A unique password should not be reused across accounts.',
    ],
  ),
  seed(
    '04-depanare',
    [
      'Ce indică un cod galben de avertizare în Device Manager?',
      'What can a yellow warning icon in Device Manager indicate?',
    ],
    [
      'O imprimantă apare cu avertizare după actualizarea Windows. Ce inspectezi întâi?',
      'A printer shows a warning after a Windows update. What do you inspect first?',
    ],
    [
      'verifici starea dispozitivului și driverul raportat',
      'check the reported device status and driver',
    ],
    ['Problemă de dispozitiv sau driver', 'A device or driver problem'],
    [
      ['Parolă Wi-Fi expirată', 'Expired Wi-Fi password'],
      ['Fișier șters din Recycle Bin', 'A file deleted from Recycle Bin'],
      ['Spațiu de cloud nelimitat', 'Unlimited cloud storage'],
    ],
    [
      'Device Manager prezintă codul de stare și poate indica o problemă de driver.',
      'Device Manager shows a status code and may indicate a driver problem.',
    ],
    [
      'Un simbol de avertizare în Device Manager indică o problemă de dispozitiv.',
      'A warning icon in Device Manager can indicate a device issue.',
    ],
  ),
  seed(
    '04-depanare',
    ['Ce oferă Event Viewer?', 'What does Event Viewer provide?'],
    [
      'Un serviciu eșuează periodic și administratorul caută mesajele asociate. Ce instrument deschide?',
      'A service fails intermittently and the admin needs related messages. Which tool should be opened?',
    ],
    [
      'inspectezi jurnalele Application, System și Security',
      'inspect the Application, System, and Security logs',
    ],
    ['Jurnale de evenimente', 'Event logs'],
    [
      ['Istoricul browserului privat', 'Private browser history'],
      ['Fișiere temporare cache בלבד', 'Temporary cache files only'],
      ['O listă de parole salvate', 'A list of saved passwords'],
    ],
    [
      'Event Viewer centralizează jurnalele Windows și detaliile evenimentelor.',
      'Event Viewer centralizes Windows logs and event details.',
    ],
    [
      'Event Viewer poate ajuta la identificarea cauzei unei erori de serviciu.',
      'Event Viewer can help identify the cause of a service error.',
    ],
  ),
  seed(
    '04-depanare',
    ['Ce face Safe Mode?', 'What does Safe Mode do?'],
    [
      'Un driver recent împiedică pornirea normală. Ce mod pornește Windows cu un set minim de drivere?',
      'A recent driver prevents normal startup. Which mode starts Windows with a minimal driver set?',
    ],
    [
      'pornești Windows în Safe Mode pentru depanare',
      'start Windows in Safe Mode for troubleshooting',
    ],
    [
      'Încarcă un set minim de drivere și servicii',
      'Loads a minimal set of drivers and services',
    ],
    [
      ['Restabilește automat fiecare backup', 'Automatically restores every backup'],
      ['Instalează toate actualizările', 'Installs all updates'],
      ['Dezactivează toate conturile', 'Disables every account'],
    ],
    [
      'Safe Mode ajută la izolarea problemelor cauzate de drivere sau servicii.',
      'Safe Mode helps isolate issues caused by drivers or services.',
    ],
    [
      'Safe Mode pornește Windows cu drivere și servicii esențiale.',
      'Safe Mode starts Windows with essential drivers and services.',
    ],
  ),
  seed(
    '04-depanare',
    ['Ce face System Restore?', 'What does System Restore do?'],
    [
      'După o schimbare de driver apar probleme, iar fișierele personale trebuie păstrate. Ce opțiune revii?',
      'A driver change caused problems, but personal files should remain. Which option can you roll back?',
    ],
    ['revii la un punct de restaurare de sistem', 'roll back to a system restore point'],
    ['Setări de sistem și drivere', 'System settings and drivers'],
    [
      ['Șterge automat toate documentele', 'Automatically deletes all documents'],
      ['Înlocuiește backup-ul fișierelor', 'Replaces file backup'],
      ['Resetează parola routerului', 'Resets the router password'],
    ],
    [
      'System Restore poate reveni la o configurație anterioară fără să fie backup complet al fișierelor.',
      'System Restore can revert configuration without being a full file backup.',
    ],
    [
      'System Restore poate reveni asupra unor schimbări recente de sistem.',
      'System Restore can roll back some recent system changes.',
    ],
  ),
  seed(
    '04-depanare',
    ['Ce face sfc /scannow?', 'What does sfc /scannow do?'],
    [
      'Fișierele protejate Windows pot fi corupte. Ce utilitar le verifică și încearcă să le repare?',
      'Protected Windows files may be corrupted. Which utility checks and attempts to repair them?',
    ],
    [
      'rulezi System File Checker dintr-un terminal elevat',
      'run System File Checker from an elevated terminal',
    ],
    ['Verifică fișierele de sistem protejate', 'Checks protected system files'],
    [
      ['Testează viteza memoriei RAM', 'Tests RAM speed'],
      ['Șterge toate aplicațiile', 'Deletes all apps'],
      ['Resetează toate ACL-urile NTFS', 'Resets all NTFS ACLs'],
    ],
    [
      'sfc verifică integritatea fișierelor de sistem protejate.',
      'sfc checks the integrity of protected system files.',
    ],
    [
      'sfc /scannow verifică fișierele Windows protejate.',
      'sfc /scannow checks protected Windows files.',
    ],
  ),
  seed(
    '04-depanare',
    [
      'Ce face DISM /Online /Cleanup-Image /RestoreHealth?',
      'What does DISM /Online /Cleanup-Image /RestoreHealth do?',
    ],
    [
      'Magazinul componentelor Windows pare corupt, iar SFC nu îl poate repara. Ce comandă folosești?',
      'The Windows component store appears corrupted and SFC cannot repair it. Which command do you use?',
    ],
    ['repari imaginea Windows cu DISM', 'repair the Windows image with DISM'],
    [
      'Verifică și repară imaginea componentelor',
      'Checks and repairs the component image',
    ],
    [
      ['Formatează volumul utilizatorului', 'Formats the user volume'],
      ['Instalează driverul imprimantei', 'Installs the printer driver'],
      ['Golește DNS cache-ul', 'Flushes the DNS cache'],
    ],
    [
      'DISM poate repara magazinul componentelor folosit de Windows și SFC.',
      'DISM can repair the component store used by Windows and SFC.',
    ],
    ['DISM poate repara imaginea Windows.', 'DISM can repair the Windows image.'],
  ),
  seed(
    '04-depanare',
    [
      'Ce verifici când o imprimantă arată „Offline”?',
      'What do you check when a printer shows “Offline”?',
    ],
    [
      'Un job este blocat, iar imprimanta este pornită. Ce verifici înainte de reinstalare?',
      'A print job is stuck while the printer is on. What do you check before reinstalling?',
    ],
    [
      'conexiunea, coada de printare și starea offline',
      'the connection, print queue, and offline state',
    ],
    ['Conexiunea și coada imprimantei', 'The printer connection and queue'],
    [
      ['Permisiunile NTFS ale Windows Update', 'NTFS permissions for Windows Update'],
      ['Setările de scalare a ecranului', 'Display scaling settings'],
      ['BitLocker recovery key', 'BitLocker recovery key'],
    ],
    [
      'Verificarea conexiunii și a cozii identifică probleme comune de imprimare.',
      'Checking connectivity and the queue identifies common printing problems.',
    ],
    [
      'O coadă blocată poate face ca imprimarea să pară offline.',
      'A stuck print queue can make printing appear offline.',
    ],
  ),
  seed(
    '04-depanare',
    [
      'Ce verifici dacă Wi-Fi nu se conectează după schimbarea parolei?',
      'What do you check if Wi-Fi will not connect after a password change?',
    ],
    [
      'Punctul de acces funcționează pentru alți utilizatori, dar un laptop încă încearcă parola veche. Ce remediezi?',
      'The access point works for others, but one laptop still uses the old password. What do you fix?',
    ],
    [
      'actualizezi profilul Wi-Fi salvat cu parola nouă',
      'update the saved Wi-Fi profile with the new password',
    ],
    ['Acreditările profilului wireless', 'The wireless profile credentials'],
    [
      ['Formatul discului NTFS', 'The NTFS disk format'],
      ['Versiunea aplicației de calcul', 'The calculator app version'],
      ['Dimensiunea Recycle Bin', 'The Recycle Bin size'],
    ],
    [
      'Un profil salvat poate conține acreditări vechi și trebuie actualizat sau recreat.',
      'A saved profile may contain old credentials and should be updated or recreated.',
    ],
    [
      'După schimbarea parolei Wi-Fi, profilul clientului trebuie actualizat.',
      'After a Wi-Fi password change, the client profile must be updated.',
    ],
  ),
  seed(
    '04-depanare',
    [
      'Ce verifici când discul sistemului este aproape plin?',
      'What do you check when the system drive is nearly full?',
    ],
    [
      'Actualizarea eșuează din cauza spațiului insuficient. Ce faci înainte de a șterge fișiere personale?',
      'An update fails because space is low. What do you do before deleting personal files?',
    ],
    [
      'inspectezi Storage și cureți fișiere temporare sigure',
      'inspect Storage and clean safe temporary files',
    ],
    ['Utilizarea stocării și fișierele temporare', 'Storage usage and temporary files'],
    [
      ['Ștergi folderele de sistem la întâmplare', 'Randomly delete system folders'],
      ['Dezactivezi toate backup-urile', 'Disable all backups'],
      ['Formatezi discul fără verificare', 'Format the drive without checking'],
    ],
    [
      'Storage settings identifică utilizarea; curățarea controlată evită eliminarea fișierelor necesare.',
      'Storage settings identify usage; controlled cleanup avoids removing needed files.',
    ],
    [
      'Analiza spațiului precede ștergerea manuală a fișierelor necunoscute.',
      'Reviewing storage should precede deleting unknown files manually.',
    ],
  ),
  seed(
    '04-depanare',
    [
      'Ce faci când o aplicație nu mai răspunde?',
      'What do you do when an app stops responding?',
    ],
    [
      'O aplicație nu răspunde, dar Windows funcționează. Cum o închizi fără restart complet?',
      'An app is unresponsive but Windows still works. How do you close it without a full restart?',
    ],
    [
      'închei procesul problematic în Task Manager după salvarea lucrului posibil',
      'end the problem process in Task Manager after saving what you can',
    ],
    ['Închei procesul aplicației', 'End the app process'],
    [
      ['Oprești serviciile de securitate', 'Stop security services'],
      ['Ștergi profilul tuturor utilizatorilor', 'Delete every user profile'],
      ['Formatezi volumul sistemului', 'Format the system volume'],
    ],
    [
      'Task Manager permite terminarea unui proces; datele nesalvate ale aplicației se pot pierde.',
      'Task Manager can end a process; unsaved app data may be lost.',
    ],
    [
      'Task Manager poate închide o aplicație care nu răspunde.',
      'Task Manager can close an unresponsive app.',
    ],
  ),
]

function adapt(fact: Fact): Seed {
  return {
    ...fact,
    wrong: fact.distractors,
    task: [
      `alegi răspunsul potrivit pentru „${fact.prompt[0]}”`,
      `choose the appropriate answer to “${fact.prompt[1]}”`,
    ],
  }
}

function take(facts: Fact[], module: string, count: number) {
  return facts.filter((fact) => fact.module === module).slice(0, count)
}

const authoredNetworkSource = [
  ...take(sourceNetworkFacts, '01-infrastructura', 6),
  ...take(sourceNetworkFacts, '02-hardware', 6),
  ...take(sourceNetworkFacts, '03-protocoale-servicii', 6),
  ...take(sourceNetworkFacts, '04-securitate', 6),
  ...take(sourceNetworkFacts, '05-depanare', 5),
]

const pythonSeeds = [...sourcePythonFacts.map(adapt), ...authoredPythonFacts]
const databaseSeeds = sourceDatabaseFacts.slice(0, 30).map(adapt)
const networkSeeds = authoredNetworkSource.map(adapt).concat(networkFacts)
const htmlSeeds = sourceHtmlFacts.slice(0, 30).map(adapt)
const deviceSeeds = sourceDeviceFacts.map(adapt).concat(deviceFacts)

export const maximumQuestions: Record<string, Question[]> = {
  python: build('python', pythonSeeds.slice(0, 76), 380, 5),
  'baze-de-date': build('baze-de-date', databaseSeeds, 180, 6),
  retelistica: build('retelistica', networkSeeds, 380, 7),
  html5: build('html5', htmlSeeds, 180, 6),
  'configurare-dispozitive': build('configurare-dispozitive', deviceSeeds, 480, 7),
}
