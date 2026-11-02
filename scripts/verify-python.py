"""Execute authored output questions and every lab solution against CPython."""
import contextlib
import io
import json
import os
import sys
from pathlib import Path

fixtures = json.load(sys.stdin)
work = Path('.cache/python-check').resolve()
workspace = Path.cwd().resolve()
if not work.is_relative_to(workspace):
    raise RuntimeError('Verification directory must stay inside the workspace')
work.mkdir(parents=True, exist_ok=True)
os.chdir(work)
count = 0
for question in fixtures['questions']:
    namespace = {'__name__': '__main__'}
    out = io.StringIO()
    with contextlib.redirect_stdout(out):
        exec(compile(question['code'], question['id'], 'exec'), namespace)
    actual = out.getvalue().rstrip('\n')
    assert actual == question['expected'], f"{question['id']}: {actual!r} != {question['expected']!r}"
    count += 1
for lab in fixtures['labs']:
    namespace = {'__name__': '__main__'}
    exec(compile(lab['solution'], lab['id'], 'exec'), namespace)
    for test in lab['tests']:
        exec(compile(test, lab['id'] + '-test', 'exec'), namespace)
    try:
        starter_namespace = {}
        exec(compile(lab['starter'], lab['id'] + '-starter', 'exec'), starter_namespace)
        for test in lab['tests']:
            exec(test, starter_namespace)
    except NotImplementedError:
        pass
    else:
        raise AssertionError(f"Starter should require implementation: {lab['id']}")
print(json.dumps({'outputQuestions': count, 'labSolutions': len(fixtures['labs']), 'status': 'passed'}))
