![Bank Branch Location Decision Support System](assets/cover.svg)

# Bank Branch Location Decision Support System

**Academic Decision Support Systems (DSS) case study · Ankara, Türkiye**  
**Ece Temiz** · Gazi University, Management Information Systems

[Open interactive dashboard](index.html) · [Turkish README](README_TR.md) · [Class presentation](presentations/Banka_Subesi_Lokasyon_Secimi_Ankara.pptx)

## Project overview

Where should a bank open a new branch in Ankara? This case study frames the decision as a **multi-criteria decision-making** problem and compares six districts using five criteria. The project illustrates how structured data and transparent scoring can support a managerial recommendation, rather than relying on intuition alone.

### Decision structure

| Component | Scope |
|---|---|
| Decision maker | Bank headquarters / branch expansion team (hypothetical) |
| Alternatives | Çankaya, Yenimahalle, Keçiören, Sincan, Mamak, Etimesgut |
| Benefit criteria | Population, commercial activity, transport accessibility |
| Cost criteria | Rent indicator, existing branch count (competition proxy) |
| Methods | Weighted-sum MCDM, Analytic Hierarchy Process (AHP), TOPSIS |
| Reported recommendation | **Keçiören** in the baseline analysis |

## What I worked on (class project)

- Defined the bank branch location problem, stakeholders, alternatives and decision criteria.
- Organized a decision matrix covering six Ankara districts.
- Explained **benefit/cost normalization**, **criterion weighting**, **AHP pairwise comparison** and **TOPSIS ideal-solution comparison**.
- Presented scenario and sensitivity analyses and a management recommendation.
- Prepared the academic project presentation supplied in this repository.

## Reproducible portfolio demonstration

This repository also contains a **new, post-course interactive web demonstration** and a Python verification script, prepared from the original presentation data for portfolio use. They are **not represented as software delivered during the original class project**.

- Open `index.html` directly in a browser. No installation or backend is required.
- Adjust the five criterion weights, or choose the balanced, growth-focused or cost-focused presets.
- View recalculated **weighted-sum and TOPSIS rankings** alongside the fixed **AHP pairwise-matrix result**.
- For a transparent command-line calculation, run `python analysis/verify.py` from the repository root (Python 3 standard library only).
- To publish the demo as a webpage, enable **GitHub Pages** from the repository's main branch, root (`/`).

## Reproduced baseline results

The numerical reproduction uses the six rows in `data/ankara_districts.csv`. With the class presentation's baseline weights (25%, 20%, 25%, 15%, 15%), the leading alternative is **Keçiören**:

| Method | Reproduced baseline score for Keçiören |
|---|---|
| Weighted-sum MCDM (min-max normalized, 0–10) | ~**6.98 / 10** |
| AHP-weighted score using the documented pairwise matrix | ~**7.14 / 10** |
| TOPSIS closeness with vector normalization and baseline weights | ~**0.812** |

### Data quality and calculation caveats

**These figures are educational case-study inputs**, transcribed from the class presentations. This repository does not independently verify population, branch, rent or index figures against official live datasets. The rent values in the source slides are `70–180` with ambiguous units, so the CSV intentionally labels them `rent_indicator`, **not verified TRY/month**.

The original slide versions are not fully internally consistent: some slides report AHP **7.05** versus **7.14**, TOPSIS closeness **0.612** versus **0.812**, and AHP consistency ratio **7.4%**. Recalculating from the documented pairwise matrix gives approximately **1.02% CR** (Saaty's RI=1.12 for n=5); the TOPSIS implementation reproduces approximately **0.812**. The calculated results in the demo follow the explicit methods/data in this repository and should **not** be presented as independent real-world validation. See [Methodology and limitations](docs/methodology.md).

## Repository contents

```text
.
├── index.html                 # Interactive, local-first dashboard
├── app.js                     # Multi-criteria calculations and interface
├── styles.css                 # Dashboard design
├── analysis/verify.py         # Python reproduction, no dependencies
├── data/ankara_districts.csv  # District decision matrix from slides
├── data/ahp_pairwise_matrix.csv
├── docs/methodology.md        # Methods, assumptions and limitations
├── presentations/             # Original 12-slide Ankara class presentation
└── assets/cover.svg           # Repository cover
```

## Limitations and next steps

This is a **decision-analysis case study and portfolio demo**, not a production banking application. A deployment-ready solution would require traceable data sources, current district-level data, validated rent units, real operational constraints, micro-location comparisons and stakeholder-approved criterion weights.

*For coursework and portfolio illustration only. This is not investment or branch-opening advice.*
