<div align="center">

![Arcanum Prompt Injection Taxonomy](docs/pitax-banner.png)

[![Live site](https://img.shields.io/badge/Live-arcanum--sec.com%2Fpitax-BA258A.svg)](https://www.arcanum-sec.com/pitax)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-interactive-9966CC.svg)](https://arcanum-sec.github.io/arc_pi_taxonomy/)
[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-562997.svg)](https://creativecommons.org/licenses/by/4.0/)
![Nodes](https://img.shields.io/badge/nodes-172-3fb950.svg)

**An open, interactive classification of prompt injection and LLM attacks, built for cybersecurity auditors and penetration testers moving into AI red teaming.**

</div>

## The taxonomy is interactive

The Arcanum Prompt Injection Taxonomy lives as an interactive, searchable web app. The two deployed versions below are the main, always-current copies. They are kept in parity and are the canonical reference:

- **Website:** https://www.arcanum-sec.com/pitax
- **GitHub Pages:** https://arcanum-sec.github.io/arc_pi_taxonomy/

Every entry has a citable reference code (for example `PIT-I-01`), the alternate names other frameworks use for the same attack (OWASP, MITRE ATLAS, NIST, MLCommons, garak, and others), a delivery tag (direct, indirect, or either), and example prompts. White-box attacks that need the model weights are flagged `LOCAL` so testers know they do not apply to a black-box API or chatbot.

## Structure

The taxonomy is organized into four pillars (172 nodes total):

| Pillar | Code | What it answers | Count |
|---|---|---|---|
| Intents | `PIT-I-NN` | What is the attacker trying to achieve? | 27 |
| Techniques | `PIT-T-NN` | What method manipulates the model? | 70 |
| Evasions | `PIT-E-NN` | How is it obfuscated past filters? | 63 |
| Inputs | `PIT-N-NN` | Where does the payload enter? | 12 |

## Building on the data

If you want to analyze, extend, or build tools on top of the taxonomy, use the data file:

- **`docs/data/taxonomy.json`** is plain JSON: one object with `intents`, `techniques`, `evasions`, and `inputs` arrays. Each node carries `code`, `title`, `description`, `aliases`, `ideas`, and `examples`. It parses cleanly in any language and is easy for LLMs to consume directly.

`docs/data/taxonomy.js` is the same data wrapped for the web app to load; treat `taxonomy.json` as the source for programmatic use.

> **Note on format.** Versions through 1.0 shipped the taxonomy as one Markdown file per node. From 1.6 onward the taxonomy is maintained as the interactive site plus the single JSON data file, and the old per-node Markdown folders have been retired. To build on the data, use `taxonomy.json`.

## Contributing

This GitHub repository is the canonical source. Community input is welcome: open an issue, or submit a pull request editing `docs/data/taxonomy.js` (and `taxonomy.json`). Reviewed changes are merged here and then deployed to the GitHub Pages site and the website.

## Changelog

See [CHANGELOG.md](CHANGELOG.md). The current release is **v1.6.1**; **v1.6** was a large expansion and rebuild.

## License and attribution

Licensed under [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). You may use, share, and build upon this taxonomy, including commercially, provided you give attribution.

**Required attribution:** Based on the Arcanum Prompt Injection Taxonomy by Jason Haddix, Arcanum Information Security (arcanum-sec.com).

**How to cite:** Haddix, J. (2026). *Arcanum Prompt Injection Taxonomy* (v1.6.1). Arcanum Information Security. https://www.arcanum-sec.com/pitax

---

Created by Jason Haddix and Arcanum Information Security.
