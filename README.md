# Signature Web Design

Skill portable pour créer ou refaire une landing premium directement dans un projet existant : Laravel Blade, Livewire, Vue, React ou HTML. Le paquet `skills/signature-web-design/` fonctionne seul, sans dépendances npm.

## Installation

```powershell
node scripts/install-design-skill.mjs --agent claude --project "C:/chemin/mon-projet"
node scripts/install-design-skill.mjs --agent cursor --project "C:/chemin/mon-projet"
node scripts/install-design-skill.mjs --agent codex --project "C:/chemin/mon-projet"
```

Choisir son agent. `--global` cible le dossier personnel ; `--dry-run` affiche la destination. L'installateur refuse d'écraser une installation existante. Node.js est nécessaire pour cet installateur uniquement.

On peut aussi copier le dossier du skill dans `.claude/skills/`, `.cursor/skills/` ou `.agents/skills/`. Redémarrer la session si nécessaire pour le découvrir.

## Utilisation

> Utilise signature-web-design pour refaire la landing de ce projet Laravel. Direction growth-editorial, avec mon identité et mes contenus. Préserve les routes, formulaires et comportements existants. Implémente la refonte puis vérifie le rendu desktop et mobile.

Dans Codex : `$signature-web-design`. L'interface d'invocation dépend de l'agent.

## Organisation

- `skills/signature-web-design/` : paquet autonome et références de design.
- `scripts/install-design-skill.mjs` : installateur sans dépendances.
- `provenance/` : analyses sources et attribution, hors du paquet installé.
- `.claude/skills/`, `.cursor/skills/`, `.agents/skills/` : installations locales du skill.

Première direction : `growth-editorial`. La bibliothèque contient des recettes originales, sans code ni assets source redistribués. Les captures originales ne sont pas incluses. Les références futures peuvent venir de différentes sources.

La structure et l'installation ont été vérifiées. Une refonte complète dans un vrai projet Laravel reste à éprouver.
