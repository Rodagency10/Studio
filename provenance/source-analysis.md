# Overtake — Analyse technique de la page d'accueil

> Source analysée : `https://overtake-wbs.framer.website/` (site Framer publié). Fichiers bruts : `/workspace/overtake/home/src/` (HTML SSR, CSS `style0…11.css`, modules JS `js/*.mjs`, `appear.json`, `outline.txt`, `page_rules.txt`).

## Introduction

La page d'accueil est construite avec **Framer**. Elle partage le design system de la page About : mêmes polices, tokens couleur, Navbar, Footer, Smooth Scroll Lenis et composants Badge / Button / BG Item / Client Card. Elle est cependant beaucoup plus riche en interactions :

- 2 bandeaux **ticker** (défilement infini) ;
- un empilement de **cartes sticky** avec une transformation liée au scroll (scale 0,7 et rotation de −6°) ;
- un **carrousel d'étapes en lecture automatique** avec barres de progression codées en `requestAnimationFrame` ;
- un **sélecteur d'onglets** de services ;
- un **carrousel de témoignages** en « roue » verticale, qui avance seul toutes les 5 s ;
- des **hovers zoom** sur les visuels.

La page racine (`.framer-72rtr7`, classe de scope `framer-aNFXp`) mesure `1200px` de large en Desktop, avec une hauteur canvas de `12851px`. En Tablet : `810px` / `12171px`. En Phone : `390px` / `13366px`. Le fond est blanc (`#fff`, injecté aussi sur `html body`).

Ce qui est **déduit** plutôt que lu directement dans le code est signalé par *(déduit)*.

---

## Système global

### Breakpoints

| Nom | Media query | Largeur de design | Classe « hidden » |
|---|---|---|---|
| Desktop | `(min-width: 1200px)` | `1200px` | `hidden-72rtr7` |
| Tablet | `(min-width: 810px) and (max-width: 1199.98px)` | `810px` | `hidden-1ox373u` |
| Phone | `(max-width: 809.98px)` | `390px` | `hidden-x5xztl` |

Chaque composant a des variantes « - Desktop / - Tablet / - Phone ». Elles sont choisies via des `overrides` par breakpoint, et le HTML SSR contient un bloc `ssr-variant` par breakpoint.

### Polices

Identiques à la page About :

- **Switzer** (Fontshare, servie par framerusercontent), graisses 500 / 600 / 700 / 900 : titres et chiffres.
- **Stack Sans Headline** (Google), graisses 400 / 700 : textes courants.
- **Inter** : fallback « bold ».
- **Inter Display 400** : champ email du footer.
- **Geist 700** : bouton flottant « Get It ».
- Des polices *Placeholder* (Arial local avec `size-adjust`) évitent le CLS.
- Features OpenType activées sur Switzer : `"blwf","cv03","cv04","cv09","cv11"`.

### Échelle typographique (presets utilisés sur la home)

Valeurs Desktop / Tablet / Phone :

| Preset | Police | Taille | Interligne | Interlettrage | Usage sur la home |
|---|---|---|---|---|---|
| `11kq6vx` | Switzer 600 | `82 / 70 / 52px` | `1.2em` | `-0.02em` | H1 hero, chiffre « 6.4x » |
| **`18g8ski`** *(nouveau)* | Switzer 600 | `80 / 60 / 50px` | `1.1em` | `-0.02em` | H2 « Same budget. Different math. », compteurs « 40+ / $180M+ / 94% » |
| `17vgi6x` | Switzer 500 | `52 / 42 / 30px` | `1.1em` | `-0.02em` | H2 de sections, chiffres 8.1x / 212% / métriques des case studies |
| **`sypclb`** *(nouveau)* | Switzer 500 | `42 / 32 / 24px` | `1.1em` | `-0.02em` | « How we compound. », chiffre « −41% » |
| `hwyoru` | Switzer 500 | `36 / 26 / 22px` | `1.2em` | `-0.03em` | H3 case studies, titres des Step Cards |
| `28h32y` | Switzer 500 | `28 / 24 / 22px` | `1.2em` | `-0.02em` | H2 de la carte hero, titre de l'article vedette |
| `5e55k2` | Switzer 500 | `22 / 20 / 20px` | `1.4em` (`1.2em` Phone) | `-0.02em` | Citations, titres des Blog Cards |
| `1y3pbfi` | Switzer 600 | `100 / 74 / 36px` | `1.2em` | `-0.02em` | « 10+ », titre CTA du footer |
| `1g0n5pb` | Stack Sans 400 | `18 / 16 / 16px` | `1.2em` | — | Corps de texte, très utilisé (101 occurrences) |
| `1bahxhy` | Stack Sans 400 | `16 / 14 / 14px` | `1.1em` | — | « Trusted by 40+… » |
| `uc5mdc` | Stack Sans 400 | `14px` | `1.2em` | — | Badges, petites mentions |
| `1xxm8sz` / `5kp8qj` / `vdd3gw` | — | — | — | — | Liens Navbar / Footer / crédits (comme sur About) |

### Palette (tokens)

| Token | Valeur | Rôle |
|---|---|---|
| `408afcf4` | `#0b0b0c` | Noir principal (texte, cartes sombres, bouton Black) |
| `976232f3` | `#ffffff` | Fond de page, texte inversé |
| `0075701b` | `#f0f0f0` | Gris clair (fond du hero, cartes claires, badge Light) |
| `6a6e6e` / `75c7b632` | `#6a6e6e` | Gris texte secondaire, puces |
| `266fdce9` | `#b7bcbc` | Gris clair des textes sur fond sombre |
| `cd1aca02` | `#9efc65` | **Vert lime** (accent principal) |
| `9eb7dfcf` | `#9efc6580` | Lime à 50 % (glow du bouton) |
| `f97c1b65` | `#ffbcfc` | **Rose** (accent secondaire) |
| `da92c49c` *(nouveau)* | `#fde589` | **Jaune**, uniquement sur la carte « Peak ROAS » |
| `e2e7ca71` | `#122020` | Vert-noir profond (cartes sombres, footer) |
| `b1316c97` | `#171718` | Noir doux (badge Dark, onglet actif, bloc citation) |
| `cd49e1cd` | `#1e2b2b` | Champ email du footer |
| `da61365e` *(nouveau)* | `rgba(11,11,12,.7)` | Texte secondaire sur fond jaune |
| `81bbbb1c` | `rgba(11,11,12,.09)` | Séparateurs et lignes sur fond clair |
| `b1c2e8b4` | `rgba(11,11,12,.9)` | Dégradé d'overlay sur image |
| `f325164c` | `rgba(255,255,255,.05)` | Lignes BG Item sur fond sombre |
| `d42e784d` | `#ffffff1a` | Bordures fines sur fond sombre |
| `6bbf1f66` | `#fff3`, soit `rgba(255,255,255,.2)` | Bordures, piste des barres de progression |
| `ae19dc46` | `transparent` | Fin des dégradés |

### Rayons

- `30px` est le rayon standard : sections, cartes, images.
- `26px` : panneaux intérieurs (30 − 4 de padding visuel).
- `24px`, `20px` (Phone), `14px` (onglets), `10px` (pastilles et en-têtes), `4px` (puces).
- `100px` / `300px` : forme pilule.
- `50%` : cercles.

### Ombres et effets

- Pas de nouvelle `box-shadow` sur la home. On retrouve celles des boutons partagés :
  - Default (lime) : `0 5px 14px #9efc6580, 0 14px 50px #9efc6580` ;
  - Black : `0 5px 14px #0b0b0c, 0 14px 50px rgba(11,11,12,.5)`.
- La profondeur vient surtout :
  - des **dégradés** (fades blancs sur les bords des tickers, overlay noir sur les images) ;
  - des **bordures internes** `1px` en `::after` (`data-border=true`, technique Framer), en `#ffffff1a` ou `#fff3`.

### Animations et timings globaux

- **Reveal standard** (apparition au chargement et au scroll) : tween `0.45s`, ease `[.44,0,.56,1]`, de `opacity 0 / y 40px` à `opacity 1 / y 0`.
  - Joué une seule fois (`animateOnce: true`), seuil `threshold: 0`.
  - Le reveal au chargement part d'une opacité de `0.001` (variante « appear »).
- **Délais en cascade** : `0` (`Yr`), `0.05s` (`Qr`), `0.1s` (`ei`), `0.15s` (`ni`). Pour les listes CMS, le délai est calculé : `index × 0.1s` ou `index × 0.15s` (fonction `pi`).
- **Transitions de variantes** des composants : tween `0.45s` `[.44,0,.56,1]`. Seul Icon List utilise un spring `bounce .2, 0.4s`.
- **Smooth Scroll** Lenis (intensité 15, soit environ `1.5s`), **Rolling Text** sur les boutons, Navbar et Footer : identiques à About.

#### Observations visuelles
- Audit réalisé dans le navigateur en 1280×800 (mis à l'échelle). Les captures font 1920×1200 et se trouvent dans `home/`.
- Couleurs relevées à l'écran, à titre indicatif seulement. **Les tokens du code font référence** :

  | Relevé écran | Token du code |
  |---|---|
  | lime ≈ `#A3FF5E` | `#9efc65` |
  | rose ≈ `#FFB3F5` | `#ffbcfc` |
  | vert forêt ≈ `#14201D` | `#122020` |
  | jaune ≈ `#FCE28A` | `#fde589` |
  | gris ≈ `#EFEFEF` | `#f0f0f0` |

- Tailles et rayons estimés à l'œil (≈ 28 / 40px) : écart dû à l'échelle de capture. Les valeurs du code (`30px`, etc.) font foi.
- Responsive (Tablet / Phone) non vérifié visuellement.

---

## 1. Navbar

### Mise en page
Composant partagé avec About :

- Desktop : `position: absolute`. Tablet / Phone : `fixed`.
- Logo à gauche, liens au centre, CTA à droite.
- Menu déroulant « Pages » à l'ouverture au survol : panneau flottant `#122020`, rayon `10px`, bordure `rgba(255,255,255,.1)`, décalage `48px`.

### Typographie
Preset `1xxm8sz` (`#6a6e6e`, qui passe à `#0b0b0c` au survol). Rolling Text sur le bouton CTA.

### Couleurs
Fond transparent au-dessus du hero gris `#f0f0f0`.

### Effets & ombres
Menu mobile en overlay avec `backdrop-filter: blur(5px)` sur `rgba(11,11,12,.5)`.

### Images
Logo SVG (identique à About).

### Animations & interactions
- Burger : les barres tournent de ±45°.
- Lettres du CTA en Rolling Text : `.4s`, ease `[.82,.08,.29,1]`, stagger 55 %.
- Pour le détail complet, voir l'analyse de la page About.

#### Observations visuelles
- La barre n'est **pas collante** en Desktop : elle défile avec la page. C'est cohérent avec le `position: absolute` du code.
- L'élément actif (« Home ») est posé sur une pastille gris clair.
- Le menu « Pages » s'ouvre en panneau sombre de 3 lignes (Case Studies, FAQs, Privacy Policy), chacune avec une tuile icône et un sous-titre.

![Navbar et haut du hero](home/section-01.png)

---

## 2. Hero (« Home » — `section.framer-xdxmyj`)

### Mise en page
- **Section** : `padding: 100px 30px`. Tablet : `78px 30px 100px`. Phone : `64px 16px 80px`.
- **Container** `framer-lkqjyb` : `max-width: 1920px`, gap `50px`, coins supérieurs arrondis à `30px`.
- **Content** `framer-1lotcni` :
  - colonne centrée, gap `80px` (`60px` en Phone) ;
  - `padding: 100px 10px 30px` (Phone : `50px 16px 30px`) ;
  - coins supérieurs `30px`.
- **Top** `framer-188x49a` : `max-width: 960px`, colonne centrée, gap `40px`, `z-index: 2`. Ordre :
  1. Badge ;
  2. H1 ;
  3. sous-titre (`max-width: 600px`, flex-wrap, gap `4px 6px`) ;
  4. 2 boutons en ligne (gap `30px`, `20px` en Tablet), `max-width: 1140px`.
- **Bottom** `framer-qct1gx` : ligne de 2 colonnes, gap `30px`.
  - **Left** `9or805` : image, `flex: 1`, `align-self: stretch`, rayon `30px`.
  - **Right** `1indxil` : carte, `max-width: 500px` (`350px` en Tablet).
  - En Phone, les deux passent en colonne, gap `20px`.

### Typographie
- **H1 « What if every [icône] dollar knew exactly where to go? »** (`11kq6vx`, centré).
  - Le titre est **découpé en un `<h1>` par mot**, dans un conteneur flex-wrap (`gap: 0 10px`), pour pouvoir insérer une **image inline** entre « every » et « dollar ».
  - L'image est un SVG de `65px` de haut (`54px` en Phone), avec `padding-top: 6px` en Tablet et `8px` en Phone pour l'aligner sur la ligne de base.
- **Sous-titre** (`1g0n5pb`, 18px), lui aussi découpé mot par mot. Trois expressions sont placées dans des **pastilles colorées** (`padding: 4px 8px`, rayon `10px`) :
  - « Paid media, » : fond rose `#ffbcfc`, texte `#0b0b0c` ;
  - « performance creative, » : fond blanc `#fff`, texte `#0b0b0c` ;
  - « analytics » : fond noir `#0b0b0c`, texte blanc.
- **Carte droite** :
  - « 6.4x » en `11kq6vx` blanc, avec « Blended ROAS » (`1g0n5pb`, `#b7bcbc`, aligné à droite) ;
  - H2 « Built for clarity, control, and compounding growth » (`28h32y`, blanc) ;
  - « CAC in 90 days » en `#b7bcbc` et « −41% » en `sypclb` rose `#ffbcfc`.

### Couleurs
- **Fond du Content** : dégradé vertical `linear-gradient(180deg, #f0f0f0 0%, #f0f0f0 60%, transparent 100%)`. Le gris se fond dans le blanc de la page vers le bas.
- **Carte droite** :
  - extérieur `#122020`, `padding: 10px`, rayon `30px` ;
  - intérieur `framer-1kdu5db` : `#122020`, **bordure 1px `#ffffff1a`**, rayon `26px`, `padding: 30px` (`20px` en Tablet / Phone), gap `40px` ;
  - séparateur horizontal : bordure basse 1px `#ffffff1a` sous la partie haute (`padding-bottom: 40px`).
- **Boutons** :
  - « Black » (`./contact`) : `#0b0b0c`, icône dans un rond blanc ;
  - « Bordered » (`./case-study`) : fond transparent, bordure 1px `#0b0b0c`, `box-shadow: none`.

### Effets & ombres
- Ombre du bouton Black : `0 5px 14px #0b0b0c, 0 14px 50px rgba(11,11,12,.5)`.
- Dans la carte : un composant **BG Item variante « Alt »**, soit 3 lignes verticales de 1px en dégradé `rgba(11,11,12,.09)`, vers transparent à 91,4 %.

### Images
| Image | Dimensions | Rôle |
|---|---|---|
| `https://framerusercontent.com/images/yNPyjuv1mEjpaWjcuU9xcQ1nzU.svg` | 129×56 | Icône inline dans le H1 |
| `https://framerusercontent.com/images/pr5LP28gq8vxR0nW6iM3FW68o.jpg` | 1210×720 | Image hero gauche (2 instances SSR, Desktop et Phone) |
| `https://framerusercontent.com/images/AkZZBAqdUztsrmrpCSQ0pQ5AY.png` | 1004×412 | Décor (courbe ou graphe *(déduit)*) en haut de la carte |
| `https://framerusercontent.com/images/dPXcbqkxBaJt65i4vfTYYGYFbs4.png` | 1000×140 | Décor (barres *(déduit)*) en bas de la carte |
| `https://framerusercontent.com/images/IhB70bIKwahZMOmvTBIBolMs7s.svg` | 11×11 | Flèche des boutons |

### Animations & interactions
**Apparition au chargement** (`appear.json`), toutes en `opacity 0.001 / y 40` vers `1 / 0`, tween `0.45s`, ease `[.44,0,.56,1]` :

| Bloc | Appear id | Délai |
|---|---|---|
| Top | `188x49a` | `0s` |
| Image gauche | `9or805` | `0.05s` |
| Carte droite | `1indxil` | `0.1s` |

Survol des boutons : effet Rolling Text sur le libellé (bouton partagé).

#### Observations visuelles
- **Panneau du hero** : grand panneau gris clair aux coins supérieurs arrondis, avec de fines lignes verticales en fond (BG Item).
  - Badge centré « • Performance marketing studio • ».
  - H1 sur 2 lignes : « What if every [icône] dollar knew exactly where to go? ».
  - L'icône inline est une pilule sombre avec une pièce « $ » lime et un glyphe « >>> ».
- **Sous-titre** : surlignages rose (« Paid media, »), blanc (« performance creative, ») et noir à texte blanc (« analytics »).
- **Boutons** :
  - pilule noire « Book a growth audit », avec rond blanc à flèche et ombre portée ;
  - pilule contour « See our case studies ».
- **Bento** :
  - grande photo (deux jeunes femmes souriantes avec leurs téléphones, ciel bleu), environ 70 % de la largeur ;
  - à droite, la carte vert forêt à liseré fin. On y voit :
    - une grille de points 7×3, dont 8 lime : c'est le PNG décoratif, au-dessus de « 6.4x / Blended ROAS » ;
    - un séparateur, puis le titre ;
    - « CAC in 90 days » et « −41% » en rose ;
    - un graphique de 13 barres dont 3 roses au centre (PNG décoratif).
- **Intro** : tout le hero monte en fondu avec un léger décalage. La cascade badge → H1 → sous-titre → boutons → cartes se joue sur environ 1 s, avec une douce sortie d'easing.
  - Pas de révélation lettre par lettre, pas de parallaxe visible.
  - *Écart* : le code anime 3 blocs (Top / image / carte, délais `0 / 0.05 / 0.1s`, `0.45s` chacun), pas chaque élément séparément. La cascade perçue vient de ces 3 blocs et du chargement des images.
  - L'auditeur estime un départ vers 40 % d'opacité, alors que le code part de `0.001`.

![Hero — vue d'ensemble](home/section-01.png)

![Hero — bento (photo et carte 6.4x)](home/section-02.png)

![Hero — survol du CTA](home/section-02-hover-cta.png)

---

## 3. Bandeau « Ticker » — preuve sociale et logos (fin du hero)

### Mise en page
- Bloc `framer-qt90az` : ligne de `max-width: 1140px`, gap `20px`. En Phone, il passe en colonne.
- **Info** (`14odkeg`, `max-width: 400px`, gap `14px`) :
  - pile de 3 avatars qui se chevauchent : composant Avatar `vadhB` en variante Default, `40×60` avec image `60×60` *(chevauchement déduit de la largeur 40 < 60)* ;
  - texte à côté.
- **Divider** vertical `1px × 82px` en `rgba(11,11,12,.09)`. En Phone, il devient horizontal (`100% × 1px`).
- **Client Marquee** `1jkwwds` : `flex: 1`, `padding: 30px 0`, logos en ligne avec gap `60px`.

### Typographie
« Trusted by 40+ growth teams from seed to 9 figures » en `1bahxhy` (16px).

### Couleurs
- Logos en Client Card (gris *(déduit)*).
- Masques de bord : **Fade Left** `linear-gradient(90deg, #fff, transparent)` sur `109px` et **Fade Right** `linear-gradient(271deg, #fff, transparent)` sur `106px`.
- Les masques sont en position absolue, avec `pointer-events: none` et `z-index: 2`.

### Effets & ombres
Aucune ombre. L'effet de fondu vient uniquement des deux dégradés blancs.

### Images
- **Avatars** (120×120) :
  - `https://framerusercontent.com/images/eZ8inPIozwVXbVStRvddal5ZO84.jpg`
  - `https://framerusercontent.com/images/nuSd8BM1kTHOuMIUAWaixG8WBHc.jpg`
  - `https://framerusercontent.com/images/RfaecSOAwLoEpM5d0m2wamaL7Q.png`
- **Logos** (13 logos, dupliqués pour la boucle). Tous sous `https://framerusercontent.com/images/` :
  - `8YlmHQ6DeSu2sqoakhkKMQnSuQ.svg` (100×24)
  - `3AK7KxQNH7ppyFRSwQBDI3f8o.svg` (129×27)
  - `DHF0voxCUcjFEAyv97qvaX3HVLE.svg` (103×31)
  - `g1UWMIrGG8yG26lxcWec8dFWtwA.svg` (140×24)
  - `f4IlrsMoqnBBanfpbMaX2mRu7E.svg` (119×30)
  - `ixrMK3y6OQfsKnXYVi0raeGyzr0.svg` (81×22)
  - `gr5FR1ur6D0LFO5mGwsz1kkwKsA.svg` (82×26)
  - `Qr6tFNDxPPnhk1QJ8V8g7TfQzo.svg` (133×31)
  - `Nr35cpkJsk84ucWJCUulLR9g8.svg` (156×31)
  - `SImeSdIBL90qXoq2K7XpmFQmHs.svg` (76×26)
  - `8RZwGfryj1qwZKhPkz14lJxt8A.svg` (84×26)
  - `asUrOQQtLkTWQdGdQJH06UhH0c.svg` (106×24)
  - `ZnfT2OdBvt6TAB7N8vgaRPPkc.svg` (175×31)

### Animations & interactions
- **Reveal au scroll** du bloc entier : `y 40` vers `0`, délai `0.15s`.
- **Ticker** Framer natif sur `framer-1hdrm5x` :

  | Paramètre | Valeur |
  |---|---|
  | `tickerEffectVelocity` | `15` (px/s, très lent) |
  | `tickerEffectGap` | `60px` |
  | Direction | `default` (vers la gauche) |
  | `tickerEffectHoverModifier` | `100` (vitesse inchangée au survol) |
  | `tickerEffectDraggable` | `false` |
  | `tickerEffectOverflow` | `clip` |
  | Alignement | `center` |

#### Observations visuelles
- 3 avatars ronds qui se chevauchent, suivis du texte gris « Trusted by 40+ growth teams from seed to 9 figures ».
- À droite, une bande de logos d'environ 500px défile lentement vers la gauche, avec des bords fondus au blanc.
- C'est conforme au ticker du code (vitesse `15`, masques en dégradé blanc).

![Bandeau Trusted by et logos](home/section-03.png)

---

## 4. About and Service (« Our point of view » — `section.framer-b03nr5`)

### Mise en page
- **Section** : `padding: 0 30px` (`0 16px` en Phone).
- **Container** `1rfm1wj` : fond rose `#ffbcfc`, rayon `30px`, `max-width: 1920px`, `overflow: clip`. Il contient la carte noire **Content** `16h1gux` : `#0b0b0c`, rayon `30px`, `padding: 200px 30px` (Tablet : `140px 30px`, Phone : `80px 16px`). Il contient aussi, juste en dessous, le **Client Marquee** `17r53q4` : c'est lui qui laisse voir le rose, sous forme d'un bandeau défilant collé sous la carte noire.
- **Item** `17f0ek6` : `max-width: 1200px`, gap `200px` (Tablet `140px`, Phone `60px`).
- **Top** (gap `80px`) :
  - badge et H2 alignés à gauche ;
  - en dessous, une ligne `max-width: 800px`, gap `30px` : 4 avatars (gap `10px`) suivis d'un paragraphe ;
  - en Phone, ce bloc passe en colonne.
- **Bottom** : composant **Service List Card** `lLvmq`.
  - Ligne de `1080px`, gap `200px` (Tablet : `810px`, gap `50px` ; Phone : colonne `360px`, gap `50px`).
  - Colonne gauche (gap `60px`) : badge, H3 et liste d'onglets 01–04 (`max-width: 800px`, gap `30px`).
  - Colonne droite : `min-height: 600px`, image `flex: 1`, rayon `30px`, et texte descriptif.
- **Client Marquee** `17r53q4`, sous la carte noire et à l'intérieur du conteneur rose : `padding: 30px 0`, rayon `30px`. Wordmarks (logos SVG de plateformes) et icône séparatrice alternés, gap `30px`.

### Typographie
- Badge Dark « Our point of view » (`uc5mdc`).
- H2 (`17vgi6x`, 52px) en `#f0f0f0` : « Most agencies sell activity. We sell outcomes. **Every test we run has a number attached** … ». La phrase en gras ici est un `<span>` coloré en **lime `#9efc65`** (couleur statique).
- Paragraphe `1g0n5pb`.
- Service Card : H3 « Where should your next dollar work? » (`17vgi6x`) ; onglets avec numéro « 01 » en lime (`1g0n5pb`) suivi d'un intitulé.

### Couleurs
- Fond noir `#0b0b0c`.
- Onglets (composant **List Item** `PtOPw`, `234px`, gap `14px`, rayon `14px`) :
  - **Active** : fond `#171718`, `opacity 1`, `padding: 20px` ;
  - inactifs : fond transparent, **`opacity .6`**.
- Badge Dark : `#171718` avec puces blanches.
- Lignes de fond BG Item (Default) : `rgba(255,255,255,.05)`.

### Effets & ombres
Aucune ombre. Contraste uniquement par opacité et fond de l'onglet actif.

### Images
- **Avatars** de l'équipe (variante LG, `100px` de large, rayon `20px`). Tous en 120×120 :
  - `https://framerusercontent.com/images/KuEtYSQHabWs6ko0wwPPWQ2AhRk.jpg`
  - `https://framerusercontent.com/images/KKizJ2noip6Gj9OwvcAKBTFbYzY.jpg`
  - `https://framerusercontent.com/images/KvhUIURwFS1WH5yszhpb6UM42Y.jpg`
  - `https://framerusercontent.com/images/lBiIirNiNexvP5wnqlDLtK0lXk.jpg`
- **Images de service**, une par onglet (800×600) :
  - `https://framerusercontent.com/images/FGp81SUF2Alvpzq13X6femoAHpM.jpg`
  - `gZEh00FHswNrN4EseMQwuWRWkpI.jpg`
  - `llcfiCT4nzZuDIfqVBn2AIyuso.jpg`
  - `uW4KbgjeYk3PK97Vhi6yc1uYU8.jpg`
- **Logos du marquee** :
  - `wIWCqJHG0VYDsPiSnfcgIAPNYE.svg` (67×12, SM)
  - `ey7cucR3ZIKkPBlWLQTVERMPs.svg` (142×21)
  - `f9rOsiBukDw2VGOZDUoqA395M.svg` (31×12, SM)
  - `rbekCYvRlLLZBT7dw54cFzArWI.svg` (49×12, SM)
  - `AS5f5lWo9Pd8MyAqivwEcOKpEQ.svg` (113×21)
  - `I7J5ys9tFaOyXyTxZ9bCBNRItg.svg` (144×21)
- **Séparateur** : `dW7jzFnoHx89g2UMsXx2Cs5Yg.svg` (25×24, affiché en `24px`).

### Animations & interactions
- **Reveals au scroll** : Top délai `0.05s`, Bottom (Service Card) délai `0.1s`.
- **Onglets** :
  - un clic (`onTap`) sur un onglet change la variante de la carte (`01` à `04`, déclinée par breakpoint) ;
  - l'onglet passe en **Active** et l'image et le texte de droite changent ;
  - transition tween `0.45s` `[.44,0,.56,1]`, donc fondu ou morph des couleurs et de l'opacité ;
  - **pas de défilement automatique** ici : seulement des callbacks de clic, sans `delay`.
- **Ticker** sur le marquee de logos `framer-1uaukmu` : vitesse `15`, gap `30px`, direction par défaut. Il a aussi un reveal (délai `0.15s`).

#### Observations visuelles
- **Panneau noir** à lignes de grille discrètes.
  - Badge « Our point of view », H2 blanc sur 4 lignes aligné à gauche, avec la phrase lime « Every test we run has a number attached ».
  - Ligne de 4 portraits carrés arrondis qui se chevauchent, avec une légende grise.
- **Texte qui « s'éclaire »** : à l'écran, le texte paraît terne puis s'éclaire à l'entrée dans la vue.
  - *Écart* : le code ne contient **aucun effet de couleur lié au scroll** sur ce titre. La couleur est statique (`#f0f0f0` et span lime).
  - L'impression vient du reveal en opacité (0 → 1, `0.45s`, délai `0.05s`).
- **Onglets** « 01 Strategy / 02 Paid media / 03 Creative / 04 Analytics » : petit numéro lime, intitulé gris. L'onglet actif est en texte blanc sur une barre gris très foncé à coins arrondis.
  - Au clic, la barre active se déplace, l'image et la légende s'échangent en fondu, et la hauteur de l'image change (le layout se redimensionne).
  - Images observées :
    - Strategy : femme en blazer vert penchée sur des plans ;
    - Creative : femme en costume noir sur fond rouge, avec des papiers qui volent.
  - *Conforme au code* : changement **au clic uniquement** (`onTap`), sans lecture automatique. La capture de survol ne montre pas de changement d'onglet.
- **Bandeau rose** (environ 55px) collé sous le panneau noir, coins bas arrondis.
  - Il défile vers la gauche : « Meta Ads ❖ Programmatic ❖ GA4 ❖ TikTok ❖ Google Ads ❖ Incrementality… ».
  - Mots noirs demi-gras d'environ 20px. Ce sont en fait des wordmarks SVG via Client Card, pas du texte.
  - Le séparateur est une petite feuille dans un cercle.
  - C'est le rose du conteneur `1rfm1wj` visible autour du marquee.

![Our point of view](home/section-04.png)

![Onglets — état initial (Strategy)](home/section-05.png)

![Onglets — survol](home/section-05-hover-tab.png)

![Onglets — clic, état A](home/section-05-click-tab-a.png)

![Onglets — clic, état B (Creative)](home/section-05-click-tab-b.png)

---

## 5. Growth Counter (« Growth you can point at. » — `section.framer-1gni2t`)

### Mise en page
- **Section** : `padding: 200px 0` (Tablet `140px 0`, Phone `80px 0`).
- **Container** : `max-width: 850px`, gap `60px`.
- **Top** : `max-width: 700px`, centré.
- **Grille** `1f6nldu` : **2 colonnes** `repeat(2, minmax(50px, 1fr))`, gap `10px`. Phone : 1 colonne.
  - **Carte 01** : padding `30px`, `justify-content: space-between`.
  - **Carte 02** : padding `30px`, gap `40px`. Ligne du haut avec gap `120px`, en colonne sur Phone.
  - **Carte 03** : **`grid-column: span 2`**, ligne flex, gap `50px`, padding `30px`. À gauche, une image `200px` de haut avec **rayon `100px`** (forme de pilule).

### Typographie
- H2 `17vgi6x` centré et paragraphe `1g0n5pb`.
- Chiffres :
  - « 8.1x » en `17vgi6x` noir ;
  - « −41% » en `sypclb` ;
  - « 212% » en `17vgi6x` **lime** `#9efc65` sur fond sombre.
- Légendes en `1g0n5pb`. Sur la carte jaune : `rgba(11,11,12,.7)`.

### Couleurs
| Carte | Fond | Détails |
|---|---|---|
| 01 « Peak ROAS » | **`#fde589` jaune** | Badge Dark-SM `#171718` |
| 02 « Spending efficiency » | `#f0f0f0` | Badge White-SM « 90-day sprint » |
| 03 « Avg. YoY client revenue growth » | `#122020` | Chiffre lime, bouton White |

### Effets & ombres
- Carte 03 : **overlay** sur l'image `linear-gradient(180deg, transparent 0%, #0b0b0c 100%)`.
- Le logo client est centré en bas de l'image (`bottom: 30px`, `20px` en Phone, `translateX(-50%)`).

### Images
- `https://framerusercontent.com/images/8KW5LhL4tTykKm3fYQWc4IXRY.svg` (305×51) : décor ou graphe de la carte 02, `55px` de haut.
- `https://framerusercontent.com/images/qq5AHsM8YTV2thyfcdg9lkMdAE.jpg` (800×400) : image de la carte 03.
- `https://framerusercontent.com/images/I5nlD8MNqvm6feCJ31hRYBhn3U.svg` (117×20) : logo client.
- `https://framerusercontent.com/images/fwz16wJTN5Rg5RsxBmmMoSp6qy0.svg` (20×20) : flèche du bouton White.

### Animations & interactions
- **Reveals en cascade** : Top `0s`, carte 01 `0.05s`, carte 02 `0.1s`, carte 03 `0.15s`.
- **Pas de compteur animé** : les chiffres sont du texte statique dans le code. Malgré le nom de la section, aucun code de comptage n'est présent.

#### Observations visuelles
- H2 centré, avec un sous-titre gris sur 2 lignes.
- **Bento de 3 cartes** :
  - **jaune** : badge noir « Peak ROAS », « 8.1x », légende ;
  - **gris pâle** : badge blanc « 90-day sprint », « −41% », mini-graphe de 9 barres dont 2 roses, « $68 → $40 blended CAC, outdoor ecommerce » ;
  - **vert forêt pleine largeur** : portrait de femme recadré en pilule avec le logo « Hamilton » en bas, « 212% » lime, « Avg. YoY client revenue growth », pilule blanche « Read the case study » avec rond noir à flèche.
- Les cartes montent en fondu l'une après l'autre (code : `0.05 / 0.1 / 0.15s`).
- Gap et rayons perçus (≈ 12 / 24px) : le code dit `10px` et `30px`.

![Growth you can point at — haut](home/section-06.png)

![Growth — cartes](home/section-07.png)

---

## 6. Project (« Selected work » — `section.framer-pcj6q5`) : cartes empilées sticky

### Mise en page
- **Section** : `padding-bottom: 200px` (Tablet `140px`, Phone `80px`).
- **Container** : `max-width: 1200px`, `padding: 0 30px`, gap `60px`.
- **Top** `ipf7i4` : ligne `space-between` (H2 à gauche, `max-width: 700px` ; bouton Black à droite).
  - **`position: sticky; top: 50px`** (Tablet `top: 100px`).
  - En Phone : `position: relative`, colonne.
- **Trois wrappers** `gu7ic7` / `2m7ht9` / `178aweq` :
  - chacun en **`position: sticky; top: 200px`**, avec gap `50px` ;
  - ils s'empilent donc les uns sur les autres pendant le scroll ;
  - en Phone, sticky est désactivé (`position: relative`).
- Un bloc **« Empty Space »** de `20vh` (`10vh` en Tablet, masqué en Phone) laisse le temps à la dernière carte de rester collée.
- **Case Study Info Card** `3D4c6` (lien) :
  - `1140px` de large (Tablet `810px`, Phone `360px`), `padding: 10px`, rayon `30px` ;
  - image en fond absolu ;
  - panneau **Info** aligné à droite (`align-items: flex-end`) : `max-width: 400px`, `padding: 30px` (Phone `20px`), gap `150px` (Tablet `100px`, Phone `47px`), fond `#0b0b0c`, rayon `26px`.

### Typographie
- H2 « Selected work » (`17vgi6x`).
- Dans la carte :
  - H3 nom du client (`hwyoru`, 36px) ;
  - description `1g0n5pb` ;
  - métrique en **`17vgi6x` lime** (« 8.1x », « 3.1x », « 4.6x ») ;
  - légende alignée à droite en `#b7bcbc` (« ROAS, up from 5.2x », « Subscriber LTV », « First-order ROAS ») ;
  - badges Dark-SM (`uc5mdc`).

### Couleurs
- Panneau `#0b0b0c` : il ne change pas de couleur.
- Bouton « View full case study » `1gdpo7r` : pilule pleine largeur, blanche (`padding: 16px 24px`), avec un rond noir `#0b0b0c` contenant la flèche (`12px`). **Au survol de la carte, la pilule passe au rose `#ffbcfc`.**

### Effets & ombres
Aucune ombre. Profondeur créée par l'empilement sticky et la transformation au scroll.

### Images
Toutes en 1920×850, cadrage `cover` :

| Client | Image |
|---|---|
| Halegrove | `https://framerusercontent.com/images/sP1Fj1fzXlFcMWRVWQJZCvHRO8.jpg` |
| Marrow & Co | `https://framerusercontent.com/images/33AWxfsaBcgNFFdqsPKZbP5XpKA.jpg` |
| Nordhaus | `https://framerusercontent.com/images/7KtYf6hlvxqvYjDaipvIlxaFUcc.jpg` |

### Animations & interactions
- **Données CMS** : chaque carte est une requête CMS (`limit 1`, `offset 0 / 1 / 2`).
- **Reveal** du Top : délai `0s`.
- **Transformation liée au scroll** (`__framer__transformTrigger: "onScrollTarget"`), sur chaque wrapper :
  - quand la carte **suivante** (ref de la cible) entre dans le viewport à 50 % (`transformViewportThreshold: .5`), la carte courante passe de `scale 1, rotate 0` à **`scale 0.7, rotate -6°`** ;
  - la 3e carte vise l'« Empty Space » et reste à `scale 1, rotate 0` ;
  - résultat : un effet de pile de cartes qui rétrécissent et pivotent sous la suivante ;
  - transition **spring** : `stiffness 500`, `damping 60`, `mass 1` (amortie, sans rebond).
- **Survol** de la carte (variante `Desktop-hover`) :
  - l'image de fond passe à **`scale: 1.05`** (zoom) ;
  - la pilule-bouton passe du blanc au rose `#ffbcfc` (le panneau Info reste noir) ;
  - tween `0.45s` ;
  - le survol n'existe qu'en Desktop.

#### Observations visuelles
- En-tête « Selected work » avec la pilule noire « All case studies » à ombre douce. L'en-tête reste épinglé pendant le scroll (`sticky top: 50px`).
- **3 cartes empilées**, chacune avec une photo pleine largeur et un panneau info noir sur le tiers droit : 2 badges, titre blanc, description grise, filet, stat lime et libellé gris, pilule pleine largeur « View full case study » avec rond noir à flèche.
  - **Halegrove** (8.1x) : soin de la peau, teinte bleue ;
  - **Marrow & Co** (3.1x) : gobelet de café sur fond rouge ;
  - **Nordhaus** (4.6x) : fauteuil beige.
- **Empilement** : chaque carte glisse par-dessus la précédente. La carte recouverte rétrécit légèrement, bascule et semble s'estomper.
  - *Valeurs du code (référence)* : `scale 0.7` et **`rotate -6°` en 2D** (pas de rotation 3D ni de perspective : `__perspectiveFX: false`), opacité maintenue à `1`.
  - L'impression de bascule en 3D et de fondu vient du rétrécissement sous la carte suivante.
- **Pilule rose** : sur la capture de survol, la pilule-bouton est rose.
  - *Confirmé par le code* : elle est **blanche au repos et devient `#ffbcfc` au survol** de la carte, et l'image zoome à `1.05`.
  - L'auditeur n'avait pas pu le confirmer.

![Selected work — Halegrove](home/section-08.png)

![Empilement — Marrow & Co par-dessus Halegrove](home/section-09.png)

![Nordhaus](home/section-10.png)

![Survol de la carte (pilule rose)](home/section-10-hover-case-btn.png)

---

## 7. Counter (« The numbers behind the noise » — `section.framer-zgjtys`)

### Mise en page
- **Section** : `padding-bottom: 200px`. Contenu centré, gap `30px`.
- **Grille** `1thv6k1` : **3 colonnes**, gap `100px 130px` (Tablet `50px 40px`).
- **Phone** : 2 colonnes, gap `30px`. L'item 02 « $180M+ » passe en dernier (`order: 2`) et occupe toute la largeur (`grid-column: span 2`).
- Chaque item : colonne centrée, gap `16px` (`10px` en Phone).

### Typographie
- Chiffres en **`18g8ski`** (80 / 60 / 50px, Switzer 600) : « 40 », « $180M », « 94 ».
- Les suffixes **« + » et « % » sont en rose `#ffbcfc`**, dans un `<span>`.
- Légendes `1g0n5pb` : « Brands scaled past $1M/mo », « Media spend managed », « Client retention rate ».

### Couleurs
Fond blanc, badge Light `#f0f0f0`, texte `#0b0b0c`, accent rose.

### Effets & ombres
Aucune.

### Images
Aucune.

### Animations & interactions
- **Reveals** : badge `0s`, item 01 `0.05s`, item 02 `0.1s`, item 03 `0.15s`.
- **Aucun compteur incrémental** : les chiffres sont statiques.

#### Observations visuelles
- Badge centré, puis 3 colonnes de grands chiffres noirs en gras : **40+**, **$180M+**, **94%**. Suffixes roses, libellés gris.
- **Aucune animation de comptage observée.** C'est conforme au code : les chiffres sont statiques, avec seulement un reveal en fondu.

![The numbers behind the noise](home/section-11.png)

---

## 8. How It Work (« How we compound. » — `section.framer-5bt0l7`)

### Mise en page
- **Container** `h225zg` : ligne, gap `30px`, `padding: 0 30px`, `max-width: 1920px`. En Tablet et Phone, il passe en colonne.
- **Left** `15xsjq2` : `#f0f0f0`, rayon `30px`, `padding: 40px` (`30` / `20px`), `max-width: 700px`, ligne gap `50px`.
  - Sous-colonne gauche : titre et image (`max-width: 300px`, rayon `30px`, `20px` en Phone).
  - Sous-colonne droite (`space-between`) : texte en haut, « 10+ » et légende en bas, alignés à droite.
- **Right** `10obdko` : `#122020`, **rayon `300px`** (un stade, `30px` en Phone), `padding: 10px`.
  - À l'intérieur, `f35udp` : **bordure 1px `#fff3`**, rayon `300px`, `padding: 10px`.
  - Contenu centré `max-width: 400px`, `padding: 60px 0`, gap `60px`.
  - On obtient un **double cadre en pilule** autour de la Step Card.
- **Step Card** `PPTu1` (`400px`) :
  - panneau Info : `padding: 40px`, rayon `30px`, gap `30px` ;
  - rond numéroté : `60×60`, `border-radius: 50%` ;
  - 3 barres de progression : `max-width: 252px`, gap `6px`.

### Typographie
- « How we compound. » en `sypclb` (42px).
- « 10+ » en `1y3pbfi` (100px, aligné à droite).
- Textes en `1g0n5pb` / `uc5mdc`.
- Step Card : numéro « 01 » en `1g0n5pb`, titre en `hwyoru` (« Diagnose », « Uncover », « Compound »), description en `1g0n5pb`.
- « 3 Simple steps » en blanc.

### Couleurs
Panneau Info de la Step Card selon la variante :

| Étape | Fond du panneau | Rond numéroté | Texte |
|---|---|---|---|
| 01 | **lime `#9efc65`** | blanc | noir |
| 02 | **rose `#ffbcfc`** | blanc | noir |
| 03 | **noir `#0b0b0c`** | `#122020` | blanc ; numéro en lime |

Barres de progression : piste `rgba(255,255,255,.2)`, remplissage blanc, rayon `10px`, `80×2px`.

### Effets & ombres
Pas d'ombre. Le relief vient du double contour (`#122020` et bordure `#fff3`).

### Images
`https://framerusercontent.com/images/uNldtsbbWb4BZ9PnaNjAPdzubM.jpg` (330×380).

### Animations & interactions
- **Reveals** : Left `0s`, Right `0.05s`.
- **Carrousel d'étapes en lecture automatique**, construit dans Framer avec des « variant delays » :
  - `useOnVariantChange` : à l'entrée dans chaque variante, `delay(() => setVariant(next), 10000)` ;
  - l'ordre tourne en boucle : **01 → 02 → 03 → 01**, **toutes les 10 secondes**.
- **Barre de progression** (composant `YfhD5` avec un code component interne) :
  - un `requestAnimationFrame` calcule `width = (now − start) / timeAnimation × 100 %` ;
  - `timeAnimation` vaut `10000 ms`, donc le remplissage blanc linéaire est synchronisé avec le changement d'étape ;
  - variantes `Playing` (en cours), `100` (pleine, fond blanc) et `0` (vide).
- **Navigation manuelle** : chaque segment de barre est cliquable (`onTap`, `cursor: pointer`) et saute directement à l'étape correspondante.
- Changement de couleur du panneau : tween `0.45s` `[.44,0,.56,1]`.

#### Observations visuelles
- **Gauche** : carte gris pâle avec le titre, la phrase grise « A weekly operating rhythm, not a quarterly report. », une photo arrondie (couple regardant un téléphone) et un très grand « 10+ » avec légende.
- **Droite** : panneau vert forêt en forme de stade, avec un anneau intérieur fin, et « 3 Simple steps ».
  - Au centre, une carte colorée avec un rond blanc numéroté, un titre et une description.
  - Captures : « Uncover » sur fond rose (étape 02) et « Compound » sur fond noir (étape 03). L'étape 01 « Diagnose » est lime d'après le code.
  - 3 fines barres se remplissent de gauche à droite comme un minuteur, puis la carte change : c'est une lecture automatique.
- **Durée** : l'auditeur a estimé environ 3–5 s par étape.
  - *Valeur du code (référence)* : **10 s par étape** (`delay 10000 ms` et barre `timeAnimation 10000 ms`).
  - L'écart vient probablement d'une observation partielle d'un cycle déjà en cours.

![How we compound — étape Uncover](home/section-12.png)

![Étape B](home/section-12-step-b.png)

![Étape C — Compound (fond noir)](home/section-12-step-c.png)

---

## 9. Compare (« Same budget. Different math. » — `section.framer-qm89fe`)

### Mise en page
- Même structure que la section About and Service : conteneur rose `#ffbcfc` contenant une carte noire `#0b0b0c`, rayon `30px`, `padding: 200px 30px` (Tablet `140px`, Phone `80px 16px`).
- **Item** : `max-width: 1200px`, gap `60px`.
- **Badge/Title** : `max-width: 700px`, centré.
- **Comparatif** `sompbj` (gap `100px`, Tablet `80px`, Phone `60px`) :
  - deux colonnes (`zg2zrx` / `1nagdcv`, `flex: 1`, gap `30px`) ;
  - chaque colonne a un en-tête de `72px` de haut, rayon `10px`, puis une liste `max-width: 460px`, gap `30px` (`20px` en Phone) ;
  - entre les deux colonnes, la pastille **« VS »** : rond `54×54`, rayon `50px`, fond `#171718`, bordure 1px `#fff3`, absolue en `top: 9px; left: calc(50% − 27px)`, `z-index: 1`. Elle est masquée en Phone.
- **Bloc citation** `lm3hn5` : `#171718`, rayon `30px` (`20px` en Phone), `max-width: 690px`, `padding: 10px`, ligne gap `30px`.
  - Photo à gauche : `max-width: 160px`, rayon `24px`. En Phone : `340px` de haut, pleine largeur, colonne.

### Typographie
- H2 en **`18g8ski`** (80px) couleur `#f0f0f0`.
- En-têtes et items (composant **Icon List** `6WLvO`, icône `14px`, gap `30px 10px`) en `1g0n5pb` blanc.
- Citation en `5e55k2` (22px), signature « Founder & CEO » en `uc5mdc`, séparée par une puce de `4px` `#b7bcbc`.

### Couleurs
- En-tête « The typical agency » : `#171718`.
- En-tête Overtake : **lime `#9efc65`**, avec le logo de la marque `32px` de haut.
- Fond : `#0b0b0c`.
- BG Item (lignes `rgba(255,255,255,.05)`) en arrière-plan.

### Effets & ombres
Aucune ombre. Hiérarchie par contraste gris foncé / lime.

### Images
- `https://framerusercontent.com/images/t7L8fXaebLopVvVEd9mNS8QAAJY.png` (14×14) : croix (colonne « typical agency »).
- `https://framerusercontent.com/images/n1JjivAxcvgMnkhf9dbrst3YwsQ.svg` (14×11) : coche (colonne Overtake).
- **Logo Overtake** (133×32) :
  - `https://framerusercontent.com/images/1K24VyUPtS0NaXhQ2OnmFCwT5Z4.svg`
  - `https://framerusercontent.com/images/XqblzD6MYE1hxErTWE9dAOPhgY.png` (deux versions, selon le breakpoint *(déduit)*).
- `https://framerusercontent.com/images/orNMF9SCDplKwO6L9By9RckIFQ.jpg` (400×450) : portrait du fondateur.

### Animations & interactions
- **Reveals** : Badge/Title `0s`, comparatif `0.05s`.
- Icon List : transition de variante en spring `bounce .2, 0.4s` (changement de breakpoint uniquement).

#### Observations visuelles
- Panneau noir à lignes de grille, badge « • Why teams switch to us • », H2 blanc centré « Same budget. Different math. ».
- **Deux en-têtes** : « The typical agency » gris foncé, et une barre lime avec le logo Overtake. Un badge rond sombre « VS » chevauche les deux.
- **4 lignes par côté** : à gauche en gris avec ✕, à droite en blanc demi-gras avec ✓ lime.
- **Carte citation** gris très foncé : portrait du fondateur (Alex Carter), citation en gris, nom en blanc, « • Founder & CEO ».
- Les lignes montent en fondu. *Précision du code* : le reveal porte sur deux blocs (titre `0s`, comparatif entier `0.05s`), pas sur chaque ligne.

![Same budget. Different math. — haut](home/section-13.png)

![Comparatif et citation](home/section-14.png)

---

## 10. Testimonials (« Our success stories » — `section.framer-11cgb9m`)

### Mise en page
- **Section** : `padding: 200px 0` (Tablet `140px`, Phone `80px`).
- **Container** : `max-width: 1200px`, gap `60px`.
- **Testimonial Card** `rHkCp` : ligne de `990px`, gap `80px`. En Phone : colonne de `360px`, gap `20px`.
- **Colonne gauche** (`max-width: 150px`) : pile verticale d'avatars (composant `sixxS`, rayon `20px`).
  - Les 3 avatars, plus leurs 3 copies « Reapeated », sont en position absolue : `left: 50%`, avec `bottom: −90 / −180 / −270px` ou `top: −90 / −180 / −270px` selon la variante.
  - Ils forment une **roue verticale** qui défile.
  - Avatar actif : `120px` de large, bordure lime. Inactif : `80px`.
- **Colonne droite** : carte `#f0f0f0`, rayon `30px`, `padding: 40px` (`20px` en Phone), `max-width: 690px`, gap `30px`.

### Typographie
- Citation en `5e55k2` (22px).
- Nom en `1g0n5pb`, puce de `4px` `#6a6e6e`, poste en `uc5mdc`.

### Couleurs
- Fond blanc, carte `#f0f0f0`.
- Avatar **Active** : bordure (via `--border-color`) **lime `#9efc65`**.
- Masques de la colonne d'avatars :
  - **Fade Top** `linear-gradient(181deg, #fff 0%, transparent 100%)`, `59px` de haut ;
  - **Fade Bottom** `linear-gradient(0deg, #fff, transparent)`, `49px` de haut.

### Effets & ombres
Aucune ombre. Effet de profondeur par les fondus haut et bas sur la roue d'avatars.

### Images
- **Avatars** (130×130) :
  - `https://framerusercontent.com/images/QtqJ3J1Tx6YBQFEYNvbIHD57sSU.jpg`
  - `https://framerusercontent.com/images/uu3I1XchobE5rRfbBcMz6QfDTaM.jpg`
  - `https://framerusercontent.com/images/ClbK3DDNQK1qbgNWFeBtPHyErM.jpg`
- **Note 5 étoiles** : `https://framerusercontent.com/images/g17E9R3BbyUvkxVTt8s2eG8Hiq8.svg` (132×24).
- **Logos clients** (100×24, `63×26px` affichés) :
  - `pDNg5RlF4NHIkAS0PDqDFdZe8.svg`
  - `8aO5rGiO51LqbwWPKcdTFjl7yCk.svg`
  - `wqQcEEjHUKcdNgRygIwIlB2Y3Rk.svg`

### Animations & interactions
- **Reveal** du badge, du titre et de la carte : `0s`.
- **Carrousel automatique** :
  - variantes `01 - Desktop` à `07 - Desktop` ;
  - à chaque variante, `delay(() => setVariant(next), 5000)`, donc **changement toutes les 5 secondes** ;
  - la dernière variante renvoie à `01` pour boucler sans saut, grâce aux avatars dupliqués.
- **Mouvement des avatars** : à chaque changement, ils glissent verticalement de `90px` (animation de layout Framer, tween `0.45s` `[.44,0,.56,1]`).
  - L'avatar central devient **Active** : il grossit de `80` à `120px` et prend la bordure lime.
  - Le contenu de la carte (citation, nom, logo) change en fondu.
- **Clic** sur un avatar (`onTap`) : saute au témoignage correspondant.
- **Contenu des 3 témoignages** :
  - Jordan Mitchell (Operations Manager, CloudSync Ltd) ;
  - Emily Nguyen (Growth Director, Northstar Labs) ;
  - Clara Morgan (Growth Director, Brightline Co).
- **Phone** : variante unique `01 - Phone` en colonne, sans auto-play.

#### Observations visuelles
- Badge « • Our customers », H2 « Our success stories ».
- **À gauche**, colonne de 3 portraits carrés arrondis. L'actif est plus grand, avec un contour lime.
- **À droite**, carte gris clair : 5 étoiles orange, citation, « Emily Nguyen • Growth Director, Northstar Labs », wordmark client « oslo. » en bas à droite.
- **Lecture automatique** observée : passage à Jordan Mitchell / CloudSync Ltd, pendant que la colonne d'avatars roule verticalement.
  - *Code (référence)* : changement toutes les **5 s**, glissement de `90px`, actif `80 → 120px` avec bordure `#9efc65`, transition `0.45s`.
  - Les tailles perçues (≈ 70 / 80px) sont dues à l'échelle de capture.

![Our success stories](home/section-15.png)

---

## 11. Blog (« Blog & Insights » — `section.framer-17jmjam`)

### Mise en page
- **Section** : `padding-bottom: 200px`.
- **Container** : `max-width: 1200px`, gap `60px`.
- **Top** `1fkhjkv` : ligne `space-between`, alignée en bas (badge et H2 à gauche, bouton Black « ./blog » à droite). En Phone : colonne, gap `20px`.
- **Bottom** `1q2pfjz` : ligne, gap `30px`.
  - À gauche, l'**article vedette** (`flex: 1`).
  - À droite, un bloc `14n3ft` contenant **2 cartes côte à côte** (gap `30px`).
  - Tablet : colonne. Phone : tout en colonne, gap `40px`.
- **Blog Card** `1bQNv` (lien) :
  - **Default** : colonne, gap `20px`. Image `800×600` (rayon `30px`), puis infos : catégorie • durée de lecture, et titre.
  - **Featured** : `min-height: 430px` (`380px` en Phone). L'image passe en fond absolu, les infos sont superposées en bas (`padding: 40px`, `30px` en Phone, gap `20px`). Badge White « Featured Post » en `top/left: 40px`.

### Typographie
- H2 `17vgi6x`.
- Titre de l'article vedette en `28h32y` (28px, blanc) ; titres des cartes en `5e55k2` (22px).
- Méta (catégorie, « x min read ») en `uc5mdc`. En vedette, ils sont en `#b7bcbc`.
- Le temps de lecture est calculé par le composant code **Article Read Time** (module `RLvsso9mI`).

### Couleurs
- Vedette : **overlay `linear-gradient(0deg, rgba(11,11,12,.9) 0%, transparent 100%)`** sous le texte blanc.
- Puce séparatrice de `4px`.

### Effets & ombres
Aucune ombre. Le contraste vient de l'overlay.

### Images
Toutes en 800×600, rayon `30px` :

| Article | Catégorie | Image |
|---|---|---|
| « Why blended ROAS lies and the cuts we trust instead » (vedette) | Attribution, 4 min | `https://framerusercontent.com/images/923IUV2dF1d8oNULfN2aexIu0.jpg` |
| « The 4-frame hook test that doubled our thumb-stop » | Creative, 4 min | `https://framerusercontent.com/images/CAPyErHnuBtEbZCxasNC34o9sNU.jpg` |
| « How we set budgets so the algorithm stops guessing » | Budgeting, 5 min | `https://framerusercontent.com/images/vOkFq0PV27NnhD0gIQrXsQZnE.jpg` |

### Animations & interactions
- **Données CMS** :
  - Featured : requête `limit 1` ;
  - autres : `limit 2, offset 1`, avec des champs « Featured? », Category, Thumbnail, etc. (collection `SvykXNUeM`).
- **Reveals** :
  - Top : `0s` ;
  - carte vedette : `0.05s` ;
  - cartes de la liste en cascade : délai `index × 0.1s` pour l'une et `index × 0.15s` pour l'autre, via `pi(transition, i × k)`.
- **Survol** (variantes Default-Desktop et Featured-Desktop) : l'image passe à **`scale: 1.05`**, tween `0.45s` `[.44,0,.56,1]`, avec `overflow: hidden` sur le conteneur pour cadrer le zoom.

#### Observations visuelles
- Badge « • The growth playbook », H2 aligné à gauche, pilule noire « View all insights » à droite.
- **Carte vedette** large : photo pleine surface (graphique en barres rouge-jaune) qui se fond vers le noir par le dégradé du bas. Badge blanc « Featured Post », titre blanc « Why blended ROAS lies and the cuts we trust instead ».
- **Deux cartes étroites** : image arrondie, méta grise « Creative • 4 min read », titre sombre.
- **Survol** jugé « peu clair » par l'auditeur. *Code (référence)* : zoom de l'image à **`scale 1.05`** en `0.45s`, un effet subtil, cohérent avec la capture de survol.

![Blog & Insights](home/section-16.png)

![Blog — survol](home/section-16-hover-blog.png)

---

## 12. Footer

### Mise en page
Composant partagé `uo4hh`, identique à la page About :

- conteneur `#122020`, rayon `30px` ;
- grand titre CTA « Ready to outpace your category? » en `1y3pbfi` (100px, `#f0f0f0`) ;
- pilule lime « Book a growth audit » tournée de **−8°** ;
- colonnes de liens, newsletter, crédits (« Webestica », « Framer » en `vdd3gw`) ;
- bouton flottant « Get It » en `position: fixed`, `bottom: 70px; right: 21px`.

### Typographie
Liens en `5kp8qj` (`#b7bcbc`, qui passe à `#9efc65` au survol). Champ email en Inter Display 400.

### Couleurs
`#122020`, `#1e2b2b` (champ email de `60px`, rayon `20px`), accents lime.

### Effets & ombres
Halo de la pilule CTA : `0 5px 14px #9efc6580, 0 14px 50px #9efc6580`.

### Images
Logo, icônes sociales (composant `hSkVt`), comme sur About.

### Animations & interactions
Rolling Text sur les boutons, survol des liens et des icônes sociales, reveal standard. Détails dans l'analyse About.

#### Observations visuelles
- Identique à la page About :
  - bloc vert forêt à lignes de grille ;
  - CTA lime incliné avec halo ;
  - newsletter, réseaux sociaux, colonnes de liens ;
  - très grand wordmark « Overtake » ;
  - badges partenaires.
- Le contenu monte en fondu à l'entrée dans la vue. Le lien « Home » est en lime, comme page active.

![Footer — CTA et liens](home/section-17.png)

![Footer — wordmark et bas de page](home/section-18.png)

---

## Annexe — composants propres à la home

| Composant | ID | Variantes | Interaction |
|---|---|---|---|
| Avatar | `vadhB` | Default (40×60), LG (100px, rayon 20), Phone (30×40) | — |
| List Item (onglet) | `PtOPw` | Desktop (opacité .6), Active (`#171718`, padding 20) | Clic |
| Service List Card | `lLvmq` | 01–04 × Desktop / Tablet / Phone | Clic sur onglet, sans auto-play |
| Progress Bar | `YfhD5` | Playing / 100 / 0 | Remplissage rAF sur 10 000 ms |
| Step Card | `PPTu1` | 01 / 02 / 03 | Auto-play 10 s, clic sur les barres |
| Case Study Info Card | `3D4c6` | Desktop / Tablet / Phone | Survol : image ×1.05 et bouton blanc → rose |
| Testimonial Avatar | `sixxS` | Default 80px / Active 120px avec bordure lime | Clic |
| Testimonial Card | `rHkCp` | 01–07 Desktop, 01 Phone | Auto-play 5 s, roue verticale |
| Blog Card | `1bQNv` | Default / Featured × Desktop / Phone | Survol : image ×1.05 |
| Icon List | `6WLvO` | Desktop / Phone | — |
| Collections CMS | `inu791J09` (Case Studies), `SvykXNUeM` (Blog) | — | — |
