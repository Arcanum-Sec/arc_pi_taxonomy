# Changelog

All notable changes to the Arcanum Prompt Injection Taxonomy are documented here.

## [1.6] - 2026-06-29

A large expansion and rebuild. The taxonomy grows from 107 to 171 nodes, the per-node Markdown is retired in favor of the interactive site plus a single JSON data file, the project is rebranded, and the repository is narrowed to the taxonomy alone. Audience framing is now explicit: this resource is for cybersecurity auditors and penetration testers moving into AI red teaming.

Totals: Intents 18 to 27 (+9), Techniques 28 to 69 (+41), Evasions 51 to 63 (+12), Inputs 10 to 12 (+2).

### Repository and format

- **The interactive HTML taxonomy is now the single canonical form**, kept in parity on the website (arcanum-sec.com/pitax) and the GitHub Pages site (arcanum-sec.github.io/arc_pi_taxonomy).
- **Retired the per-node Markdown taxonomy** (`attack_intents/`, `attack_techniques/`, `attack_evasions/`) and the `.xmind` mind map. Every node they contained is represented in the HTML version.
- **Added `docs/data/taxonomy.json`**, a plain-JSON export of the full taxonomy for programmatic and AI consumption (`taxonomy.js` remains the web app's loader).
- **Narrowed the repository to the taxonomy.** The AI-enabled-app defense checklist, AI security questionnaire, AI threat-model questions, ecosystem assessment table, and example probes were moved to separate repositories. This repo is now just the taxonomy.
- GitHub is the canonical source for community contribution; reviewed changes deploy to the Pages site and the website.

### Branding

- Rebuilt the masthead around the Arcanum word logo on the Arcanum purple background, matching the brand across the site.

### Added

**Reference codes.** Every node now has a citable code for use in reports: `PIT-I-NN` (Intents), `PIT-T-NN` (Techniques), `PIT-E-NN` (Evasions), `PIT-N-NN` (Inputs). Shown on each card and in the detail view, and searchable.

**Alternate-name mapping.** Most nodes carry an "Also Known As" list mapping the attack to the names used by other taxonomies and papers, so a reader who knows one name can find ours. Searchable. Frameworks referenced include OWASP Top 10 for LLM Applications 2025, MITRE ATLAS, NIST AI 100-2e2025, MLCommons AILuminate, NVIDIA garak, Learn Prompting / HackAPrompt, Pangea, Mindgard, and HiddenLayer APE.

**Delivery indicator.** Each node is tagged direct, indirect, or either, with a legend.

**Local-access tag.** White-box attacks that require the model weights, gradients, or internals (and cannot run against a black-box API or chatbot) are marked LOCAL, with an in-card explainer.

**New Intents (+9):** Sensitive Data Exfiltration, Unauthorized Action Execution, Generate Malicious Artifacts, Generate Disinformation, Model and Data Privacy Extraction, Output-Handling Exploitation, Harmful Content Generation, Denial of Wallet, Cross-Tenant Data Leakage.

**New Techniques (+41):**
- Multi-turn and conversational: Crescendo, Many-Shot Jailbreaking, History Fabrication, Echo Chamber, Multi-Turn Decomposition.
- Reasoning-model: Reasoning Dilution, Thinking-Mode Manipulation, Chain-of-Thought Spoofing.
- Agentic, tool, and MCP: Tool-Definition Injection, Tool Rug Pull, Tool-Call Spoofing, Tool-Preference Manipulation, Confused Deputy, Agent Instruction-File Injection, Agentic Compliance Momentum, Prompt Worm.
- Control plane: Structured-Output Coercion, Retrieval Ranking Manipulation.
- Framing and social engineering: Policy-File Framing, Evaluator-Role Abuse, Distraction Sandwich, Tense Reformulation, Persuasion, Self-Persuasion, Fake-Citation Grounding, Authority Impersonation, Special-Case Exception.
- Automated and optimization: Fuzzing-Based Jailbreak, Autonomous Strategy Discovery, Best-of-N.
- Output and priming: Output Priming, Fake Completion.
- Other: Conditional / Trigger-Gated Payload, Special-Token Injection, Glitch / Anomalous Tokens, Context Overflow, Secret Probing, Masked-Word Reconstruction, Abliteration / Weight Ablation, Direct Request (the no-technique baseline).

**New Evasions (+12):** Adversarial Poetry, Symbolic Math Encoding, Bidirectional Text Override (Trojan Source), Alternative Base Encodings (Base32 / Base58 / Base85), Numeric Code-Point Encoding (octal / decimal), Layered Encoding, Compression Encoding, ANSI Escape Concealment, Query-Language Encoding, Code-Structure Encoding, Legacy Charset Confusion, Delimiter.

**New Inputs (+2):** Supply Chain / Pipeline, Sensor / Cross-Modal.

### Changed

- Naming convention: academic and vendor attack names were retitled to plain-English names that describe what the attack does, with the original name kept as a searchable alias (for example Constrained Decoding Attack became Structured-Output Coercion, DarkCite became Fake-Citation Grounding, Bad Likert Judge became Evaluator-Role Abuse).
- Tightened node boundaries so adjacent attacks read as a clean set: Cognitive Overload is now scoped to exhaustion via complexity (the opposite of Reasoning Dilution), and Metacharacter Confusion now excludes directional-formatting controls, model special tokens, and terminal control sequences (each its own node).
- Reconciled cross-pillar overlaps so attacks are catalogued once.

### Fixed

- Audited all 752 example prompts. Replaced 50 examples that did not demonstrate their node, and added 6 corrected examples alongside the originals where the call was uncertain.
- Every cipher and encoding example was recomputed and verified to round-trip decode: Baconian, Rail Fence, Tap Code, DTMF, Vigenere, ROT13, Morse, Base58, UTF-7, hexadecimal, binary, Brainfuck, invisible Unicode-tag characters, and bidirectional override.
- Removed broken examples, including ROT13 strings that contained Cyrillic homoglyphs and a Base58 string that did not decode.

### License

- Surfaced the CC BY 4.0 license, required attribution, and a citation on the page and in this repository.
