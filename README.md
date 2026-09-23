# Division 2 Reference

A lightweight, searchable reference web app for selected **Tom Clancy's The Division 2** game data.

The project started as a personal alternative to repeatedly opening a large Google Sheets compendium. The goal is to extract the information I actually use, normalize it into maintainable JSON data, and present it through a cleaner and more interactive interface.

This is also a portfolio project focused on React, TypeScript, structured data, filtering, and static deployment through GitHub Pages.

## Current Scope

The project is intentionally limited to the following data categories:

- Named and Exotic Weapons
- Weapon Talents
- Gear Sets
- Brand Sets
- Named and Exotic Gear
- Gear Talents

Additional datasets may be added later if they are useful.

## Tech Stack

- React
- TypeScript
- Vite
- JSON data files
- CSS
- Git / GitHub
- GitHub Pages

No backend, database, authentication system, Redux, or other large framework is currently required.

## Current Status

The initial project skeleton is complete and builds successfully.

Implemented so far:

- React + TypeScript + Vite project setup
- Dark theme foundation
- Global PvE / PvP mode toggle
- Six reference categories defined
- Named and Exotic weapon data converted into structured JSON
- Weapon cards rendering from JSON
- PvE / PvP values switching correctly
- Support for named weapons with unique talents
- Support for named weapons with fixed stat or special-effect changes
- Support for Exotic weapons
- Exotic mod data retained for future detailed views

The current weapon dataset contains the converted Named and Exotic weapon list from the source spreadsheet.

## Data Design

Game data is stored separately from UI components.

```text
src/
├── components/
├── data/
│   ├── weapons.json
│   ├── weapon-talents.json
│   ├── gearsets.json
│   ├── brandsets.json
│   ├── gear.json
│   └── gear-talents.json
├── styles/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

Each dataset has its own TypeScript model instead of using one generic item type.

### Shared PvE / PvP Values

Some values differ between PvE and PvP.

If no PvP-specific value exists: The UI then falls back to the PvE value.

## Weapon Data Model

Weapons may have different kinds of unique properties.

A typical named weapon may have a fixed perfect talent:

```json
{
  "id": "caretaker",
  "name": "Caretaker",
  "type": "named",
  "weaponType": "assault-rifle",
  "baseVariant": "G36 Enhanced",
  "talent": {
    "name": "Perfect Killer",
    "description": {
      "pve": "Killing an enemy with a critical hit grants 90% critical hit damage for 10 seconds.",
      "pvp": null
    }
  },
  "source": "Special Event Reward"
}
```

Some named weapons instead have a fixed stat or special effect while still allowing a normal weapon talent:

```json
{
  "id": "first-sight",
  "name": "First Sight",
  "type": "named",
  "weaponType": "assault-rifle",
  "baseVariant": "AK-M",
  "specialEffects": [
    {
      "description": {
        "pve": "+30% HSD, +50% reload speed debuff",
        "pvp": null
      }
    }
  ],
  "canUseNormalTalent": true,
  "source": "Special Event Reward"
}
```

## Design Direction

The interface uses a dark, information-focused layout with restrained orange accents inspired by color values already present in the source reference material.

The design goal is:

- Fast lookup
- Clear hierarchy
- Compact but readable presentation
- Minimal visual clutter
- PvE / PvP differences clearly visible
- No reproduction of Ubisoft artwork, icons, or UI assets

The default view should prioritize information useful during quick reference.

Secondary information, such as Exotic weapon mods, can later be placed in an expanded or detailed view.

## Planned Features

### Weapons

Next priorities:

- Search by weapon name
- Search by talent
- Filter by Named / Exotic
- Filter by weapon type
- Result count
- Better display formatting for machine-friendly values such as `assault-rifle`
- Optional detailed weapon view

### Remaining Data

After the weapon feature is stable:

1. Weapon Talents
2. Named and Exotic Gear
3. Gear Talents
4. Gear Sets
5. Brand Sets

### Later Ideas

Possible future additions:

- Favorites
- Item comparison
- URL-persisted filters
- More reference datasets
- Offline / PWA support
- Build-related tools

These are intentionally outside the initial scope.

## Project Principles

This project follows a few simple rules:

- Keep data separate from presentation
- Prefer explicit TypeScript models
- Normalize spreadsheet data instead of reproducing spreadsheet layout
- Preserve PvE / PvP differences only where they exist
- Keep the default interface focused on useful information
- Avoid unnecessary dependencies
- Add complexity only when the project actually requires it

## Source Data

The project is based on manually selected and normalized information from an existing Division 2 community spreadsheet.

The original spreadsheet contains substantially more information than this application intends to expose. Only information considered useful for this reference project is being retained.

Excluded fields include items such as:

- Release columns
- Images
- Spreadsheet-only multiplier metadata
- Flavor text where it is not useful to the reference tool

The JSON files are intended to remain human-editable so individual records can be corrected or updated directly when necessary.

## Disclaimer

This is an unofficial fan-made reference project.

It is not affiliated with, endorsed by, or sponsored by Ubisoft.

Tom Clancy's The Division 2 and related names and trademarks belong to their respective owners.

No Ubisoft icons, artwork, or extracted game assets are used by this project.
