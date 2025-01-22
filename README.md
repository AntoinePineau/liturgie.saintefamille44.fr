# Site liturgie.saintefamille44.fr

Contient principalement des fonctions serverless pour:
- déterminer le temps liturgique à partir d'une date au format dd-MM-yyyy
```
https://liturgie.netlify.app/.netlify/functions/temps-liturgique?date=02-02-2025
```
- 

## Update search index

```
node plugins/netlify-plugin-lunr-indexer/src/generate-index.js
```
