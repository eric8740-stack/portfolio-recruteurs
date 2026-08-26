# portfolio-recruteurs — notes de projet

Site vitrine « candidat » d'Eric Paysant, 100 % statique, publié par **GitHub Pages**
sur https://eric8740-stack.github.io/portfolio-recruteurs/ — branche `main`, pas de build.
Compte GitHub : **eric8740-stack** (skill `git-comptes`).

## ⚠️ Cache-buster obligatoire — `?v=AAAAMMJJ`

`style.css`, `script.js` et les PDF de CV sont liés avec un paramètre `?v=`.
**Il faut l'incrémenter à chaque modification du fichier concerné**, sur *toutes* ses
occurrences dans `index.html`.

Sans ça, GitHub Pages (et le navigateur) resservent l'ancien fichier : le HTML neuf
s'affiche avec le CSS périmé, et **la page apparaît cassée**. Constaté le 26/08/2026 —
`style.css` et `script.js` n'avaient aucun `?v=` alors que les CV en avaient un.

```bash
grep -n "?v=" index.html          # tout doit porter la même date après une évolution
```

## Structure

- `index.html` — page unique. Sections : hero, applications web, profil, parcours,
  compétences, réalisations (filtrées), recommandations, contact.
- `style.css` — variables de thème dans `:root`, thème clair sous `:root[data-theme="light"]`.
  Le thème initial est posé par un script inline **dans le `<head>`** pour éviter le flash.
- `script.js` — modal « Voir le détail », révélation au scroll (`IntersectionObserver`),
  compteurs, bascule de thème, filtres de projets.
- `images/` — chaque visuel existe en `.jpg` **et** `.webp` ; le HTML sert le WebP via
  `<picture>` avec repli JPEG. Ajouter les deux formats pour toute nouvelle image.

## Règles de contenu

- **Dépôt public** : uniquement du contenu destiné à être public (règle `separation-projets`).
- **Captures d'applications** : seulement les **démos à données fictives**. Jamais une
  instance client. Relire chaque capture avant commit — pas de nom de client, pas de
  chiffre réel, pas d'URL interne, pas de donnée administrative personnelle.
  (Le tableau de bord de l'Espace Pro affiche les échéances URSSAF d'Eric : ne pas le capturer.)
- **Export d'un CV en PDF** : jamais de driver d'impression (règle `pdf-hyperliens`), et
  **retirer les emoji du document** — PowerPoint embarque alors la police `SegoeUIEmoji`
  entière et le PDF passe de ~340 Ko à ~4 Mo.

## Vérifier après un push

GitHub Pages met ~1 min. Contrôler sur **la page publiée**, pas en local : rendu, images,
liens de démo qui répondent, modal « Voir le détail » toujours fonctionnel, console sans erreur.
