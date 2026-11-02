import { bilingual as b } from '@/lib/translations'
import { makeQuestions } from './question-builders'
import type { Question } from './questions'

const specs = [
  {
    course: 'python',
    module: '01-tipuri-date-operatori',
    pairs: [
      ['list', 'Mutabil / Mutable'],
      ['tuple', 'Imutabil / Immutable'],
      ['dict', 'Cheie-valoare / Key-value'],
      ['set', 'Elemente unice / Unique items'],
    ],
    prompt: ['Care tipuri sunt mutabile?', 'Which types are mutable?'],
    options: ['list', 'dict', 'tuple', 'str'],
    statement: [
      'Operatorul / returnează întotdeauna int în Python 3.',
      'The / operator always returns int in Python 3.',
    ],
    explanation: [
      'list și dict sunt mutabile. / produce float pentru operanzi întregi.',
      'list and dict are mutable. / produces float for integer operands.',
    ],
  },
  {
    course: 'baze-de-date',
    module: '04-manipulare',
    pairs: [
      ['SELECT', 'Citire / Read'],
      ['INSERT', 'Adăugare / Insert'],
      ['UPDATE', 'Modificare / Update'],
      ['DELETE', 'Ștergere / Delete'],
    ],
    prompt: [
      'Ce comenzi modifică rânduri existente?',
      'Which commands change existing rows?',
    ],
    options: ['UPDATE', 'DELETE', 'SELECT', 'CREATE VIEW'],
    statement: [
      'WHERE este obligatoriu sintactic la orice UPDATE.',
      'WHERE is syntactically required in every UPDATE.',
    ],
    explanation: [
      'UPDATE și DELETE modifică date existente; WHERE este opțional, dar limitează rândurile afectate.',
      'UPDATE and DELETE change existing data; WHERE is optional but limits affected rows.',
    ],
  },
  {
    course: 'retelistica',
    module: '03-protocoale-servicii',
    pairs: [
      ['HTTPS', '443'],
      ['SSH', '22'],
      ['DNS', '53'],
      ['HTTP', '80'],
    ],
    prompt: [
      'Ce protocoale oferă criptare pentru conexiune?',
      'Which protocols provide connection encryption?',
    ],
    options: ['HTTPS', 'SSH', 'HTTP', 'Telnet'],
    statement: [
      'Un răspuns ping absent dovedește că gazda este oprită.',
      'A missing ping reply proves the host is powered off.',
    ],
    explanation: [
      'HTTPS și SSH folosesc criptare. ICMP poate fi filtrat chiar dacă gazda funcționează.',
      'HTTPS and SSH use encryption. ICMP can be filtered even when the host is running.',
    ],
  },
  {
    course: 'html5',
    module: '02-interfata-html5',
    pairs: [
      ['<nav>', 'Navigare / Navigation'],
      ['<main>', 'Conținut principal / Main content'],
      ['<button>', 'Acțiune / Action'],
      ['<a>', 'Legătură / Link'],
    ],
    prompt: [
      'Ce elemente HTML sunt semantice pentru structura paginii?',
      'Which HTML elements are semantic page structure elements?',
    ],
    options: ['<main>', '<nav>', '<div>', '<span>'],
    statement: [
      'Validarea în browser înlocuiește validarea pe server.',
      'Browser validation replaces server-side validation.',
    ],
    explanation: [
      'main și nav descriu rolul conținutului. Validarea pe server rămâne necesară.',
      'main and nav describe content roles. Server-side validation remains necessary.',
    ],
  },
  {
    course: 'configurare-dispozitive',
    module: '04-depanare',
    pairs: [
      ['Task Manager', 'Procese / Processes'],
      ['Event Viewer', 'Jurnale / Logs'],
      ['Device Manager', 'Drivere / Drivers'],
      ['Disk Management', 'Partiții / Partitions'],
    ],
    prompt: [
      'Ce acțiuni protejează datele la pierderea unui laptop?',
      'Which actions protect data if a laptop is lost?',
    ],
    options: [
      ['Criptarea discului', 'Drive encryption'],
      ['Backup separat', 'Separate backup'],
      ['Dezactivarea parolei', 'Disabling the password'],
      ['Doar un fundal nou', 'Only a new wallpaper'],
    ],
    statement: [
      'O scurtătură către un fișier este un backup complet al acestuia.',
      'A shortcut to a file is a complete backup of it.',
    ],
    explanation: [
      'Criptarea protejează confidențialitatea, backupul permite recuperarea. Scurtătura este doar o referință.',
      'Encryption protects confidentiality; backup enables recovery. A shortcut is only a reference.',
    ],
  },
] as const

export const extraBank: Record<string, Question[]> = Object.fromEntries(
  specs.map((s) => {
    const explanation = b(s.explanation[0], s.explanation[1])
    const multiple = makeQuestions(s.course, s.module, [
      {
        prompt: s.prompt,
        answers: [...s.options],
        multiple: [0, 1],
        explanation,
      },
    ])[0]
    multiple.id = `${s.course}-new-multiple`
    const truth = makeQuestions(s.course, s.module, [
      {
        prompt: s.statement,
        answers: [b('Fals', 'False'), b('Adevărat', 'True')],
        explanation,
      },
    ])[0]
    truth.id = `${s.course}-new-true-false`
    truth.type = 'true_false'
    const matching: Question = {
      id: `${s.course}-new-matching`,
      module: s.module,
      type: 'matching',
      difficulty: 'medium',
      text: b(
        'Asociază fiecare element cu rolul sau valoarea sa.',
        'Match each item with its role or value.',
      ),
      pairs: s.pairs.map(([target, answer]) => {
        const [ro, en] = answer.split(' / ')
        return { target, answer: en ? b(ro, en) : ro }
      }),
      explanation: b(
        s.pairs
          .map(([target, answer]) => `${target} → ${answer.split(' / ')[0]}`)
          .join('; '),
        s.pairs
          .map(([target, answer]) => `${target} → ${answer.split(' / ').at(-1)}`)
          .join('; '),
      ),
    }
    return [s.course, [multiple, truth, matching]]
  }),
)
