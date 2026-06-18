# ⬡ Forge

A config-driven RPG idle game. The player completes a personality interview to discover their character, then enters a game world shaped by the setting they chose.

This repository is a proof of concept. The current working prototype lives in `game/index.html` — a single self-contained HTML file with no dependencies beyond Google Fonts.

---

## What works right now

### Character interview flow

The complete onboarding sequence is implemented and functional:

**Intro screen** — title splash with animated emblem and Begin button.

**Setting selection** — the player chooses a world. Two settings are currently playable. A third is locked and marked "Coming Soon."

**Personality test** — 10 questions per setting, each answer weighted toward class and species outcomes independently. The player can go back and change answers. A progress bar tracks position through the questionnaire.

**Tie resolution** — when two classes or two species score equally, the player is presented with a choice screen. They can pick deliberately or let fate decide at random.

**Character reveal** — the resolved class and species are displayed with their combined attribute scores (Physical, Mental, Supernatural), a flavor paragraph specific to that class/species combination, and a prompt to enter the world.

**Hello World game screen** — clicking "Enter the World" transitions to a placeholder screen confirming the navigation works. The game itself is not yet implemented.

---

## Playable settings

### Sword & Sorcery

| Classes | Species |
|---|---|
| Warrior | Human |
| Mage | Elf |
| Rogue | Dwarf |

9 flavor combinations (every class × species pair has a unique paragraph). 10 questions with weighted answers across both axes.

### Horror

| Classes | Species |
|---|---|
| Stalker | Vampire |
| Brawler | Werewolf |
| Tank | Zombie |

9 flavor combinations. 10 questions written in second person, present tense — the interview leans into the setting's atmosphere.

### Sci-Fi *(locked)*

Defined in the data but not yet authored. Displays as a locked tile on the setting selection screen.

---

## Architecture

Everything is in one file: `game/index.html`.

```
game/
└── index.html    — the entire prototype
```

**Screen management** — screens are `position: absolute` divs that transition via `opacity`. Only one carries the `active` class at a time. `showScreen(id)` handles all transitions.

**State** — a single `state` object holds the active setting, current question index, accumulated scores, and resolved character identity.

```js
state = {
  setting,        // the selected SETTINGS entry
  currentQ,       // 0-indexed question position
  answers,        // array of selected answer indices
  classScores,    // { class_id: score }
  specScores,     // { species_id: score }
  finalClass,     // resolved after all questions answered
  finalSpecies,
}
```

**Scoring** — each answer carries a `weights` object with independent contributions to `classScores` and `specScores`. Going back subtracts the previous answer's weights before re-scoring.

**Resolution** — `resolveCharacter()` sorts each score map and checks for ties. Ties trigger `showTie()` which chains callbacks so class and species ties resolve sequentially before the reveal.

**Settings data** — `SETTINGS` is an inline array. Each entry defines `meta`, `classes`, `species`, `flavors` (keyed `class_id + '_' + species_id`), and `questions`. Adding a new setting means adding a new entry to this array.

---

## Known issues

- The `renderSettings()` function uses a nested template literal to build tile `onclick` attributes. This is a parser hazard and should be replaced with string concatenation.
- `screen-game` is currently a bare `<div>` with a class attribute instead of an id attribute — `showScreen()` will silently fail to activate it once game content is added. Needs `id="screen-game"`.

---

## What is designed but not yet built

The following systems are fully designed with finalized decisions. They are not implemented in main.

**Character model** — attributes derived from class + species contributions, gear modifiers, and imprints. Six combat stats derived at runtime from attributes.

**Combat** — idle auto-battle loop. Player attacks, companion attacks, enemy attacks companion first (else player). Per-round resolution with evade rolls, block, and soak.

**Economy** — four currencies: Essence (combat wins), Shards (rare drops), setting currency (selling loot), Fragments (salvaging gear). 10,000 Fragments converts to 1 Shard.

**Loot** — probabilistic drops per enemy with rarity weighting. Auto-equip for empty slots; four-option modal (Equip / Store / Sell / Salvage) for occupied slots at low level.

**Equipment** — 10 slots. Gear modifiers apply to base attributes, which propagate to all derived combat stats.

**Skills** — class-associated active abilities that consume Focus each round and modify combat stats for that round.

**Imprints** — permanent modifiers purchased with Shards. Modify the combat stat derivation formulas directly.

**Companions** — purchased with setting currency. Fight alongside the player. Enemy targets companion first. Dismissal refunds 100% of currency invested.

---

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Working prototype — character interview through Hello World game screen |
| `feature/updated-markdown` | This readme |
| `feature/game-screen-design` | Static game screen layout and visual direction (in progress) |
