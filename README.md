# 🚲 Vélib – Disponibilité en temps réel

Application web qui affiche la disponibilité des stations Vélib en temps réel via l'API Open Data Paris.

## Structure

```
VELIB/
├── public/
│   └── index.html          # Interface principale
├── src/
│   └── components/
│       ├── app.js           # Point d'entrée, gestion des filtres
│       ├── station.js       # Appel API Vélib
│       ├── arrondissement.js # Filtres département & recherche
│       └── stationcontainer.js # Rendu de la liste et du détail
├── package.json
└── README.md
```

## Lancement

```bash
# Avec npx serve (recommandé)
npm start

# Ou simplement ouvrir public/index.html dans un navigateur
# (certains navigateurs bloquent les modules ES sans serveur HTTP)
```

## Fonctionnalités

- 📡 Données en temps réel depuis l'API Open Data Paris
- 🔍 Recherche par nom de station
- 🗺️ Filtre par département (Paris 75, 92, 93, 94)
- 🚲 Détail : vélos méca, électriques, places libres, taux de remplissage
- ✅ Indicateur ouvert / fermé

## API utilisée

[Vélib Métropole – Open Data Paris](https://opendata.paris.fr/explore/dataset/velib-disponibilite-en-temps-reel)
