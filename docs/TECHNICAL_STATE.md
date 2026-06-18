# Forge — Technical State

Last updated from session: June 18, 2026

---

## Repository structure

```
forge/
├── game/
│   └── index.html        — player-facing prototype (working)
├── admin/
│   └── index.html        — setting editor (partially outdated)
├── poc/
│   └── game_screen.html  — game screen layout mockup (in progress)
├── sim/
│   └── index.html        — combat simulator (exists, not recently touched)
├── docs/
│   ├── PROJECT_BRIEF.md
│   └── TECHNICAL_STATE.md
└── README.md
```

---

## game/index.html — current state

**What works:**
- Intro screen with animated emblem and Begin button
- Setting selection screen (two playable settings, one locked placeholder)
- 10-question personality test per setting with back navigation
- Score accumulation and tie detection
- Tie resolution screen (player chooses or randomises)
- Character reveal screen with attributes and flavor text
- Screen transition to a Hello World game screen stub

**What does not work yet:**
- The game screen itself — it is a bare `<div>` with a Hello World heading
- No combat, no economy, no inventory, no companions

**Known issue in the file:**
The `screen-game` div uses `class="class"` instead of `id="screen-game"`. The developer patched `beginGame()` to call `showScreen('screen-game')` directly, which currently works by luck. This should be corrected to `<div class="screen" id="screen-game">` before building on it.

**Known issue in `renderSettings()`:**
The function contains a nested template literal on line 388 that is a parser hazard:
```js
onclick="${locked?'':` selectSetting('${s.id}')`}"
```
This has caused the entire script to silently fail in multiple iterations. It must be replaced with string concatenation before any further edits touch this function. The safe form is:
```js
const click = locked ? '' : ' onclick="selectSetting(\'' + s.id + '\')"';
```

**Flavor key format:**
The game file uses flat keys: `flavors['warrior_human']`. This differs from earlier design notes that described a nested matrix. The flat format is what is implemented and should be treated as canonical.

---

## admin/index.html — current state

**What works:**
- Three-view layout: Editor, Questions, Visualizer
- Sidebar with setting list, active state, badges (official / custom / locked)
- Meta editor (name, description, author, version, lock toggle)
- Class editor — add, edit, remove, attribute contributions
- Species editor — add, edit, remove, attribute contributions
- Question editor — add, remove, expand/collapse, axis selection, answer weights per class and species
- Score visualizer — cumulative weight totals across all questions, permutation matrix showing all class×species attribute combos
- Import / export JSON
- New setting scaffold

**What is missing or outdated:**

Schema fields not yet authored:
- `meta.currency_name` — no field in the editor
- `flavors` — no editor exists; this is a full n×n matrix of text fields
- `tutorial` — no editor; needs fields for enemy_id, guaranteed_win, guaranteed_drop, drop_item_id, drop_rarity, intro_text

Entire sections with no editor yet:
- Skills
- Imprints
- Gear (with slot, disposition, and attribute modifiers)
- Enemies (with attributes and loot table)
- Companions (with cost, upgrade cost, attributes, skill reference)

Data model issues:
- Default settings include a Sci-Fi entry that is not in the game file. Sci-Fi should remain as a locked placeholder only.
- `newSetting()` scaffolds without `flavors`, `tutorial`, `skills`, `imprints`, `gear`, `enemies`, or `companions`. A setting created here would be invalid for the game.
- The import validator checks for `id`, `meta`, `classes`, `species`, `questions` only. It will reject future exports that include new required fields unless updated.
- Schema version is `1.0.0`. The designed schema is `2.0.0`.

---

## poc/ — current state

`game_screen.html` is being built to establish the game screen layout and visual direction before transplanting into `game/index.html`. Three aesthetic directions were produced as inline visualiser mockups but no standalone file exists yet.

The layout is agreed:
- Left column: Character block (top) + Loot/inventory (bottom)
- Center: Arena (combat) + Equipment bar pinned to bottom
- Right inner: Battle Stats (top) + Log (bottom)
- Right outer: Skills / Companions / Imprints stacked vertically
- Topbar: present but no content planned for it yet

Visual direction: not yet chosen.

---

## Setting schema — current canonical version (v2.0.0)

This is the designed target. The admin editor should produce this shape.

```json
{
  "setting": {
    "id": "string",
    "version": "2.0.0",
    "meta": {
      "name": "string",
      "description": "string",
      "author": "string",
      "created": "YYYY-MM-DD",
      "locked": false,
      "thumbnail": "",
      "currency_name": "string"
    },
    "classes": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "attribute_contribution": { "physical": 0, "mental": 0, "supernatural": 0 }
      }
    ],
    "species": [ /* same shape as classes */ ],
    "flavors": {
      "class_id_species_id": "flavor text string"
    },
    "tutorial": {
      "enemy_id": "string",
      "guaranteed_win": true,
      "guaranteed_drop": true,
      "drop_item_id": "string",
      "drop_rarity": "uncommon",
      "intro_text": "string"
    },
    "skills": [
      {
        "id": "string",
        "name": "string",
        "class_id": "string",
        "description": "string",
        "cost": 0,
        "modifiers": {
          "self": { "power_pct": 0, "evade_flat": 0, "block_pct": 0, "soak_flat": 0 },
          "enemy": { "power_pct": 0, "block_pct": 0 }
        }
      }
    ],
    "imprints": [ /* setting-specific additions to base pool, same shape as base imprints */ ],
    "gear": [
      {
        "id": "string",
        "slot": "head|chest|back|hands|right_weapon|right_ring|left_weapon|left_ring|legs|feet",
        "name": "string",
        "description": "string",
        "min_level": 1,
        "disposition": { "base_value": 0, "base_salvage": 0 },
        "modifiers": { "physical": 0, "mental": 0, "supernatural": 0 }
      }
    ],
    "enemies": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "attributes": { "physical": 0, "mental": 0, "supernatural": 0 },
        "loot": {
          "frequency": 0.05,
          "min_value": 0,
          "max_value": 10,
          "min_salvage": 0,
          "max_salvage": 5,
          "min_rarity": "common",
          "max_rarity": "rare"
        }
      }
    ],
    "companions": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "cost": 0,
        "upgrade_cost_base": 0,
        "attributes": { "physical": 0, "mental": 0, "supernatural": 0 },
        "skill_id": "string"
      }
    ],
    "questions": [
      {
        "id": "string",
        "axis": "class|species|both",
        "prompt": "string",
        "answers": [
          {
            "id": "string",
            "text": "string",
            "weights": {
              "class": { "class_id": 0 },
              "species": { "species_id": 0 }
            }
          }
        ]
      }
    ]
  }
}
```

---

## Combat stat formulas

```
vitality = (Physical × 5) + (Supernatural × 2) + (Level × 3)
focus    = (Mental × 5)   + (Supernatural × 3) + (Level × 2)
power    = (highest_attr × 4) + (Physical × 2) + (Level × 2)
evade    = (Mental × 3)   + (Supernatural × 2) + (Level × 1)   // % chance to avoid
block    = (Physical × 3) + (Supernatural × 2) + (Level × 1)   // flat damage reduction
soak     = (Physical × 4) + (Level × 1), capped at 60%         // % damage ignored after block
```

Imprints modify these formulas. Two imprint operations exist:
- `add_attr_pct` — adds `attribute × value` to the stat
- `replace_attr` — replaces one attribute's contribution to a stat with another

---

## Loot system constants

```
BASE_FREQUENCY = 0.5
DROP_CHANCE_OVERKILL = 1.5   // raw_chance >= this triggers overkill
SHARD_FRAGMENT_CONVERSION = 10000

raw_drop_chance = (BASE_FREQUENCY + enemy.loot.frequency) × strength_modifier
overkill = raw_drop_chance >= DROP_CHANCE_OVERKILL
drop_chance = min(raw_drop_chance, 1.0)
```

Strength modifiers: Weak 0.6× / Normal 1.0× / Strong 1.5× / Elite 2.2×

Overkill + legendary rarity roll = Epic tier upgrade.

Rarity multipliers apply to: item stat modifiers, sell value (`base_value × multiplier`), salvage value (`base_salvage × multiplier`).

---

## Base imprints (engine-level, always available regardless of setting)

| ID | Name | Effect |
|---|---|---|
| iron_hide | Iron Hide | Soak gains from Supernatural × 0.02 |
| iron_will | Iron Will | Focus gains from Physical × 1 |
| predator | Predator | Power gains from Mental × 0.25 |
| ghost_step | Ghost Step | Evade gains from Physical × 0.30 |
| undying | Undying | Vitality gains from Supernatural × 3 |
| arcane_body | Arcane Body | Soak Physical contribution replaced by Supernatural |

---

## Active branches (as of end of session)

| Branch | Status |
|---|---|
| `main` | Working — interview flow complete, Hello World game screen |
| `feature/game-screen-design` | Open — poc work, no commits yet |

---

## Immediate next steps (in order)

1. **Fix `screen-game` div** — change `class="class"` to `class="screen" id="screen-game"` in `game/index.html`
2. **Fix `renderSettings()` nested backtick** — replace with string concatenation
3. **Build `poc/game_screen.html`** — static layout with chosen visual direction
4. **Decide visual direction** — three mockup directions exist, none chosen
5. **Transplant game screen into `game/index.html`** — once poc is proven in browser
6. **Update admin editor** — add missing schema fields and new section editors
