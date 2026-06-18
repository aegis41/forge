# Forge — Project Brief

## What this is

Forge is a config-driven RPG idle game. Players complete a personality interview to discover their character, then enter an idle combat loop shaped by the world they chose. Settings — the worlds, classes, species, enemies, gear, and everything else — are defined in JSON config files authored in a separate admin tool.

The project has three components:

- `game/index.html` — the player-facing game
- `admin/index.html` — the setting editor / scenario builder !!TODO:PRIORITY-HIGH!!
- `sim/index.html` — a combat simulator which will need some updates soon

---

## How we work

### The cardinal rule

Never generate code and ship it blind. Every previous attempt to write large amounts of code in one pass produced broken files that could not be debugged without a browser. The pattern that works is:

1. Discuss and agree on scope before writing anything
2. Write the smallest possible increment
3. The developer tests it in a real browser
4. Report what happened — what worked, what didn't, what the console says
5. Fix or extend from there

If something isn't working, the first move is always to ask for the browser console output before touching any code.

### Scope discipline

State the scope explicitly before generating code. If the scope is "add a topbar with four economy counters," that is all that gets written — not a topbar plus a combat loop plus loot modals. Each increment should be testable in isolation and produce a visible result.

### File editing approach

The working files use Windows line endings (CRLF). When editing with Python, account for this. When using str_replace, the strings must match exactly including line endings.

Never rewrite a working file from scratch to add a feature. Find the insertion point, make the smallest change, verify the file structure is intact before shipping.

### Proof of concept first

Before adding any new visual section to a working file, build it as a standalone file in `poc/`. Prove it renders. Prove the interactions work. Then transplant it. This is the lesson from the game screen work — building it in isolation first would have saved days.

### Git workflow

- `main` holds the working prototype
- Feature branches follow `feature/short-description`
- Create upstream with `git push -u origin branch-name`
- Merge from command line: `git checkout main && git merge branch-name && git push origin main`
- Clean up: `git branch -d branch-name && git push origin --delete branch-name`

### What the developer handles directly

- All git operations
- Browser testing
- Any edits to working files when the scope is small enough to do by hand
- Design decisions — the developer provides wireframes or mockups, not the other way around

### Communication style

- Lead with the answer, not the process
- No preamble about what you are about to do — just do it
- If something is uncertain, say so directly
- When a task will take multiple steps, list them and confirm scope before starting
- The developer will say when they are done for the day — do not assume sessions end

---

## The aesthetic

The game interview screens use a dark parchment aesthetic: warm ink tones (`#1a1008`), gold accents (`#b8860b`), Cinzel display font, Crimson Pro body font. This is the established visual language for the player-facing game.

The admin tool uses a different aesthetic: dark technical, purple accents (`#7c6af7`), Space Mono and Syne fonts. This is intentional — it is a developer tool, not a player-facing surface.

The game screen visual direction is still being decided. Three mockup directions were explored in the session that produced this document:
1. Dark parchment — carries the interview aesthetic into the game
2. Technical dark — GitHub-style slate with monospace log
3. Slate gold — dark dashboard with gold accents and pill-style stat cards

No direction has been chosen yet.

---

## Design decisions that are final

These were resolved through discussion and should not be re-opened without explicit instruction.

**Character model** — attributes are derived (class contribution + species contribution + gear modifiers). Six combat stats are derived from attributes at runtime via fixed formulas. Stats are never stored, always recalculated. A dirty flag triggers recalculation when anything changes.

**Combat resolution order per round** — player attacks enemy, active companion attacks enemy (if alive), enemy attacks companion first (if alive) else attacks player.

**Economy — four currencies:**
- Essence — earned from combat wins, used for level and skill purchases
- Shards — rare drops (~15% chance), used to buy imprints
- Setting currency (Gold, Infamy, etc.) — from selling loot, used for companions
- Fragments — from salvaging gear, 10,000 auto-converts to 1 Shard with a toast notification

**Loot flow** — empty slot: auto-equip with toast notification. Occupied slot at level 1–4: four-option modal (Equip / Store / Sell / Salvage) with side-by-side stat comparison and sell/salvage values shown. Level 5+: loot automation config (not yet built).

**Flavors** — Needs to be reworked. TODO

**Gear** — flat array with `slot` property embedded in each item, not keyed by slot.

**Companions** — one instance per companion type, one active at a time. Dismissal refunds 100% of `currency_invested`. Enemy attacks companion first; when companion falls, enemy attacks player.

**Skills** — per-setting, class-associated. Fire each round consuming Focus. Modify combat stats for that round only via `modifiers.self` and `modifiers.enemy`.

**Imprints** — base pool defined at engine level, setting-specific additions merge in at load time. Purchased with Shards. Permanently modify the combat stat derivation formulas.

**Tutorial** — special-cased per setting. Guaranteed win, guaranteed drop of a specific item at a specific rarity, custom intro text.

**10 questions** — fixed count. The tie rate at 10 questions is acceptable. Ties are a feature — the tie resolution screen lets the player confirm or randomise their fate.

**Rarity tiers** — Common (0.8×), Uncommon (1.0×), Rare (1.5×), Legendary (3.0×), Epic (5.0×). Epic is a hidden tier reachable only via overkill loot rolls.

**Setting currency name** — stored in `meta.currency_name` per setting. The game uses this string everywhere currency is displayed.
