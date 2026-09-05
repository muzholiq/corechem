# CoreChem 2.0 Implementation Specification

Status: approved working specification · 2026-09-05

## 1. Goal

Extend the current CoreChem homepage (the canonical implementation) into a semiconductor-focused B2B offering with two equal pillars:

1. Semi-finished Materials
2. Machined Parts

CoreChem coordinates supply through verified partners. The site must never imply that CoreChem owns machining facilities.

## 2. Verified-claims policy

Public copy may state only information confirmed by CoreChem or a named partner. Until partner confirmation, do not publish grades, stock, tolerances, cleanroom capability, certifications, inspection documents, lead times, minimum quantities, or specific machining capability.

Initial Machined Parts reference scope, based on the reviewed Dongyang Fine Tech public product/equipment pages: PTFE gaskets, O-rings, piston rings, packings, bellows, sliding pads, and related sealing components; press, lathe/CNC lathe, milling and machining-center processes; hardness, tensile and wear measurement references. Treat this as partner-reference scope, not a blanket CoreChem promise.

## 3. Positioning and terminology

Primary concept: “High-performance polymer materials and drawing-based Machined Parts for semiconductor equipment and process environments.”

Use `Machined Parts` as the primary English navigation term. Korean copy may use “반도체용 정밀 가공 부품” as explanation. Use “partner-supplied” or “partner-network supply” where manufacturing responsibility matters.

## 4. Information architecture

Homepage flow:

```text
Hero
→ What We Supply (Materials / Machined Parts)
→ Semiconductor Focus
→ Materials Explorer + Compare
→ Machined Parts journey
→ Applications
→ Documents / Evidence
→ How We Work
→ Company
→ RFQ / Inquiry
```

Top navigation exposes `MATERIALS`, `MACHINED PARTS`, `APPLICATIONS`, `DOCUMENTS`, `COMPANY`, and `INQUIRY`. Preserve the current technical, industrial, evidence-first visual language.

## 5. Materials journey

Each material connects overview, properties, applications, verified semi-finished forms, related Machined Parts, documents, and inquiry. Keep the current material selector, comparison table, URL state, keyboard support, and KO/EN/JA parity.

## 6. Machined Parts journey

Organize by requirement rather than SKU catalog:

- Sealing components: gaskets, O-rings, piston rings, packings
- Flow and motion components: bellows, valve-related parts, sliding pads
- Precision support components: bearings and drawing-based custom parts

Each entry explains the requirement context, possible material families, verification status, and an inquiry CTA. Do not expose unverified dimensions, grades, tolerances, or delivery promises.

## 7. Semiconductor emphasis

Prioritize semiconductor equipment, wet-process chemical handling, gas/fluid control, valves, pumps, sealing, vacuum and low-contamination environments. Phrase benefits as review criteria (chemical compatibility, dimensional stability, low contamination, electrical insulation) rather than guaranteed performance.

## 8. RFQ / inquiry

First choice:

```text
Semi-finished Material | Machined Parts
```

Material RFQ fields: material, grade/form if known, dimensions, quantity, application/environment, requested documents, notes, contact.

Machined Parts RFQ fields: part type, material if known, drawing availability, quantity, critical requirements, application/environment, requested documents, notes, contact.

No account, server storage, database, or upload infrastructure. Explain that customers should attach a PDF/CAD drawing or dimension sheet in their mail app. Browser-generated `mailto:` draft remains the delivery mechanism.

## 9. Data and implementation

Keep content in data modules separate from rendering. Add Machined Parts and semiconductor application data modules rather than hard-coding product copy into HTML. Extend the existing inquiry state with an RFQ type while preserving the current copy-summary and copy-address fallbacks.

## 10. Internationalization, accessibility, SEO

Every user-facing key must exist in KO, EN, and JA. Preserve tab roles and keyboard navigation, visible focus states, reduced-motion support, semantic headings, responsive layouts, canonical/alternate links, metadata, and JSON-LD. Use descriptive labels for any future part diagrams.

## 11. Out of scope

- Direct-manufacturer claims
- Drawing upload, file storage, customer accounts, bulletin boards, admin, cart, checkout, or CRM
- Unverified supplier names, grades, certifications, tolerances, stock, lead times, or quality guarantees
- Replacing the current visual system without evidence

## 12. Acceptance criteria

- Materials and Machined Parts are visibly equal top-level offerings.
- Semiconductor use cases are the primary orientation without unsupported claims.
- Material ↔ part ↔ application cross-links work in all three languages.
- RFQ paths are distinct and end in an external email draft with drawing-attachment guidance.
- No server persistence or upload endpoint is introduced.
- Desktop, mobile, keyboard, reduced-motion, and language QA pass in the existing validation loop.
- GitHub Pages preview is verified before merging to `main`.
