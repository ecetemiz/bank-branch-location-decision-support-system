# Methodology, reproducibility and limitations

## 1. Decision formulation

Choose one of six Ankara districts for a hypothetical new bank branch. The five decision criteria are:

| Criterion | Direction | Baseline weight | Definition in this case study |
|---|---|---:|---|
| Population | Benefit | 25% | Larger population is preferred |
| Rent indicator | Cost | 20% | Smaller value is preferred |
| Commercial activity | Benefit | 25% | Higher 0–10 index is preferred |
| Existing branches | Cost | 15% | Fewer existing branches used as a simplified competition proxy |
| Transport access | Benefit | 15% | Higher 0–10 accessibility score is preferred |

The data and units come from the Ankara presentation. Rent is labelled an **indicator** because source slides do not give an unambiguous unit (e.g. TRY vs thousands of TRY). Index inputs and branch counts have not been independently verified.

## 2. Weighted-sum MCDM

For each criterion j, scale the value to 0–10. If higher is preferable:

`score_ij = 10 × (x_ij – min_j) / (max_j – min_j)`

If lower is preferable:

`score_ij = 10 × (max_j – x_ij) / (max_j – min_j)`

Then compute `MCDM_i = Σ w_j × score_ij` with weights summing to 1.

The reproduced weighted-sum MCDM score for Keçiören is **6.9779**, displayed as **6.98**.

## 3. AHP (Analytic Hierarchy Process)

The course presentation includes this Saaty-style reciprocal pairwise comparison matrix, ordered Population, Rent, Commercial activity, Existing branches, Transport:

```text
1      2      1      3      3
1/2    1      1      2      2
1      1      1      3      2
1/3    1/2    1/3    1      1
1/3    1/2    1/2    1      1
```

The demonstration normalizes each matrix column and averages each row, yielding approximate AHP criterion weights: **32.20%, 20.82%, 25.98%, 10.07%, 10.94%**. The resulting Keçiören score is approximately **7.1362/10**.

For a five-criterion matrix, approximate λmax = mean `(A×w)_i / w_i`; `CI=(λmax–5)/4`; using `RI=1.12` yields `CR ≈ 0.0102` (~**1.02%**). The source slide claims **7.4%**, which is not reproduced by this matrix. Treat this as an inconsistency to be corrected, not silently reconciled.

## 4. TOPSIS

The demo uses the standard weighted-vector TOPSIS procedure:

1. Normalize each raw column by its Euclidean norm (`x_ij / sqrt(Σ x_ij²)`).
2. Multiply each normalized criterion by its weight.
3. Identify benefit/cost-adjusted positive and negative ideal solutions.
4. Calculate each alternative's Euclidean distances to the two ideals.
5. Compute `C_i = D_i⁻ / (D_i⁺ + D_i⁻)`; higher closeness is preferred.

The reproduced Keçiören closeness is about **0.8117 (0.812)**. The shorter original presentation reports **0.612**, while a longer version includes both **0.612** and **0.812**. The ranking of other districts in the calculated model also differs from the historical slide summary. **The demo prioritizes mathematical reproducibility from the explicitly stated matrix and assumptions, not the inconsistent prewritten outcome table.**

## 5. Scenario presets

The interactive dashboard includes three demonstration weight profiles:

- **Balanced (course weights):** `[0.25, 0.20, 0.25, 0.15, 0.15]`
- **Growth-focused (illustrative):** `[0.45, 0.05, 0.35, 0.05, 0.10]`
- **Cost-focused (illustrative):** `[0.08, 0.43, 0.08, 0.36, 0.05]`

Only the **criterion weights** change between these demo scenarios; the underlying data remain fixed. These are transparent illustrative profiles, **not reconstructions of the original slides' unspecified scenario parameters**. The displayed AHP result stays fixed because its judgment matrix does not change when sliders move.

## 6. Data provenance and caveats

- Six Ankara district input rows are **transcriptions from the class presentation** and are included for reproducibility.
- The original presentation references TÜİK/BDDK/municipal data sources but this repository does not contain the underlying raw downloads or verifiable links. The data should therefore be treated as **educational, unverified inputs**.
- Branch count is a simplified proxy for competition and ignores branch capacity, digital adoption, catchments and market segmentation.
- District-level averages are not enough to pick a branch address. Site-level costs, footfall, compliance, market demand and legal conditions would require further work.
- Current reproducible outputs are not causal estimates of the effect of opening a branch.
