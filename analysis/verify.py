"""Reproduce bank branch DSS class-study scores (standard library only).

From repository root: python analysis/verify.py
Input values are educational case-study numbers transcribed from student slides.
"""
import csv
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / 'data' / 'ankara_districts.csv'
PAIRWISE = ROOT / 'data' / 'ahp_pairwise_matrix.csv'
CRITERIA = ['population', 'rent_indicator', 'commercial_activity_0_10',
            'existing_branches', 'transport_access_0_10']
BENEFIT = [True, False, True, False, True]
BASELINE = [0.25, 0.20, 0.25, 0.15, 0.15]

with DATA.open(encoding='utf-8-sig', newline='') as f:
    raw = list(csv.DictReader(f))
names = [r['district'] for r in raw]
x = [[float(r[c]) for c in CRITERIA] for r in raw]

minima = [min(row[j] for row in x) for j in range(5)]
maxima = [max(row[j] for row in x) for j in range(5)]
normalized = [
    [10 * ((v - minima[j]) if BENEFIT[j] else (maxima[j] - v))
     / (maxima[j] - minima[j]) if maxima[j] != minima[j] else 5
     for j, v in enumerate(row)]
    for row in x
]

with PAIRWISE.open(encoding='utf-8-sig', newline='') as f:
    p = [[float(r[c]) for c in ['population', 'rent_indicator',
         'commercial_activity', 'existing_branches', 'transport_access']]
         for r in csv.DictReader(f)]
col_sums = [sum(p[i][j] for i in range(5)) for j in range(5)]
ahp_weights = [sum(p[i][j] / col_sums[j] for j in range(5)) / 5 for i in range(5)]
lam = sum(sum(p[i][j] * ahp_weights[j] for j in range(5)) / ahp_weights[i]
          for i in range(5)) / 5
cr = ((lam - 5) / 4) / 1.12

def weighted_sum(weights):
    return [sum(row[j] * weights[j] for j in range(5)) for row in normalized]

def topsis(weights):
    norms = [math.sqrt(sum(row[j] ** 2 for row in x)) for j in range(5)]
    weighted = [[row[j] / norms[j] * weights[j] for j in range(5)] for row in x]
    ideal = [(max if BENEFIT[j] else min)(row[j] for row in weighted)
             for j in range(5)]
    anti = [(min if BENEFIT[j] else max)(row[j] for row in weighted)
            for j in range(5)]
    result = []
    for row in weighted:
        d_pos = math.sqrt(sum((row[j]-ideal[j])**2 for j in range(5)))
        d_neg = math.sqrt(sum((row[j]-anti[j])**2 for j in range(5)))
        result.append(d_neg / (d_pos+d_neg) if d_pos+d_neg else 0.5)
    return result

metrics = {
    'Weighted-sum MCDM (0-10)': weighted_sum(BASELINE),
    'AHP-weighted (0-10)': weighted_sum(ahp_weights),
    'TOPSIS closeness (0-1)': topsis(BASELINE)
}
print('Baseline criterion weights:', BASELINE)
print('Reproduced AHP weights:', [round(v,4) for v in ahp_weights])
print(f'Reproduced AHP consistency ratio: {cr:.2%} (slides state 7.4%)')
for label, scores in metrics.items():
    print('\n' + label)
    for i in sorted(range(len(names)), key=lambda i: scores[i], reverse=True):
        print(f'  {names[i]:14s} {scores[i]:.4f}')
    assert names[max(range(len(names)), key=lambda i:scores[i])] == 'Keçiören'
print('\nPASS: Keçiören ranks first in each reproduced baseline method.')
