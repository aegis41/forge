# ⬡ Forge

A scenario builder and game engine for a config-driven RPG idle game.

## Project Structure

```
forge/
├── admin/          # Forge admin panel — scenario builder tool
│   └── index.html  # Open this in any browser, no server needed
├── docs/           # Design documents and schema references
└── README.md
```

## Getting Started

The admin panel is a single self-contained HTML file. No install, no server, no build step required.

1. Clone the repo
2. Open `admin/index.html` in your browser
3. Build worlds

## Config Schema

Settings are exported as JSON files with the following top-level structure:

```json
{
  "setting": {
    "id": "string",
    "version": "semver string",
    "meta": { "name", "description", "author", "created", "locked", "thumbnail" },
    "classes": [ { "id", "name", "description", "attribute_contribution": { "physical", "mental", "supernatural" } } ],
    "species": [ { "id", "name", "description", "attribute_contribution": { "physical", "mental", "supernatural" } } ],
    "questions": [ { "id", "axis", "prompt", "answers": [ { "id", "text", "weights": { "class": {}, "species": {} } } ] } ]
  }
}
```

### Key design decisions

- **Additive attribute model** — class and species attribute contributions are summed at character creation. No hardcoded permutations.
- **10 questions recommended** — statistical analysis shows 10 questions yields ~10–14% tie rate, which pairs well with the player-choice tie resolution mechanic.
- **n ≥ 9 minimum** — the engine supports any number of questions above 9. 10 is the standard. 15 is the soft maximum before player fatigue sets in.
- **Axis independence** — class and species scores are tracked separately to prevent bleed between the two resolution axes.

## Roadmap

- [ ] Game engine (character creation flow, tutorial runner, idle loop)
- [ ] Loot and equipment system
- [ ] Skills and upgrades
- [ ] Persistent save state
- [ ] Deployment pipeline
