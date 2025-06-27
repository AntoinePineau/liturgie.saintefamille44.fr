# Générateur de Trames Liturgiques - Paroisse Sainte Famille

Application web pour générer automatiquement des trames de messe et des diaporamas pour la Paroisse Sainte Famille à Châteaubriant.

## 🚀 Fonctionnalités

### ✅ Déjà implémentées
- **Calcul automatique du temps liturgique** : À partir d'une date, détermination automatique du temps liturgique (Avent, Noël, Carême, Pascal, Ordinaire) et de l'année liturgique (A, B, C)
- **Affichage des lectures du jour** : Première lecture, Psaume, Deuxième lecture, Alleluia, Évangile selon le calendrier liturgique
- **Sélection des chants** : Interface pour choisir les chants par catégorie (entrée, kyrie, gloria, etc.) avec liens vers les partitions Drive
- **Interface responsive** : Design moderne et adaptatif pour tous les appareils

### 🔄 En cours de développement
- **Génération de documents Word** : Export automatique de la trame au format Microsoft Word
- **Génération de diaporamas PowerPoint** : Création automatique des diaporamas avec les chants sélectionnés
- **Amélioration de l'index des chants** : Enrichissement des catégories et métadonnées

## 🛠️ Installation et lancement

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation des dépendances
```bash
npm install
```

### Lancement en mode développement
```bash
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:3000`

### Build pour la production
```bash
npm run build
npm start
```

## 📂 Structure du projet

```
├── app/                          # Application Next.js
│   ├── components/              # Composants React
│   │   ├── DateInput.js        # Saisie de date
│   │   ├── LiturgicalInfo.js   # Affichage des infos liturgiques
│   │   ├── ReadingsDisplay.js  # Affichage des lectures
│   │   └── ChantSelector.js    # Sélecteur de chants
│   ├── api/                    # Routes API
│   │   ├── temps-liturgique/   # Calcul du temps liturgique
│   │   ├── lectures/           # Récupération des lectures
│   │   └── chants/             # Récupération des chants
│   ├── layout.js               # Layout principal
│   ├── page.js                 # Page d'accueil
│   └── globals.css             # Styles globaux
├── functions/                   # Fonctions existantes
│   └── temps-liturgique.js     # Logique de calcul liturgique
├── index/                      # Base de données liturgique
│   ├── lectures.json           # Index des lectures
│   ├── psaumes.json           # Index des psaumes
│   └── chants.json            # Index des chants
└── tools/                      # Outils utilitaires
```

## 🎯 Utilisation

### 1. Sélection de la date
- Choisissez la date de la messe dans le calendrier
- Les informations liturgiques s'affichent automatiquement

### 2. Vérification des lectures
- Les lectures du jour apparaissent selon le calendrier liturgique
- Vérifiez qu'elles correspondent à votre célébration

### 3. Sélection des chants
- Choisissez les chants pour chaque moment de la messe
- Les chants sont filtrés selon le temps liturgique
- Accédez directement aux partitions via les liens Drive

### 4. Export (à venir)
- Générez la trame Word avec toutes les informations
- Créez le diaporama PowerPoint automatiquement

## 🔗 Intégration Drive

L'application utilise votre Google Drive existant pour les partitions :
- **Racine** : `https://drive.google.com/drive/u/0/folders/0APtJnxv12aVRUk9PVA`
- **Diaporamas** : `https://drive.google.com/drive/u/0/folders/1x6SvWbN2qdjf-3qbY-R6jZ86XE6FRuuM`

## 📋 Catégories de chants

L'application prend en charge les catégories suivantes :
- **Chant d'entrée** 🚪
- **Kyrie** 🙏
- **Gloria** ✨
- **Alleluia** 🎵
- **Offertoire** 🍞
- **Sanctus** 👼
- **Anamnèse** ✝️
- **Agnus Dei** 🐑
- **Communion** 🍷
- **Chant à Marie** 🌹 (optionnel)
- **Chant d'envoi** 🚀

## 🎨 Technologies utilisées

- **Next.js 14** : Framework React pour l'interface web
- **React 18** : Bibliothèque d'interface utilisateur
- **Tailwind CSS** : Framework CSS pour le design
- **Node.js** : Runtime JavaScript côté serveur

## 🔧 Configuration Netlify

L'application est configurée pour être déployée sur Netlify avec :
- Build automatique des fonctions serverless
- Redirection des API routes
- Support des fonctions existantes

## 📝 Développement futur

### Prochaines étapes
1. **Génération Word** : Implémentation de l'export au format Microsoft Word
2. **Génération PowerPoint** : Création automatique des diaporamas
3. **Historique** : Sauvegarde des trames précédentes
4. **Templates** : Modèles personnalisables de trames
5. **Synchronisation Drive** : Mise à jour automatique des index chants

### Améliorations possibles
- Mode hors ligne pour les équipes liturgiques
- Système de validation des trames
- Export en multiple formats (PDF, HTML)
- Intégration calendrier Google
- Notifications de préparation

## 🤝 Contribution

Pour contribuer au projet :
1. Vérifiez les issues existantes
2. Créez une nouvelle branche pour vos modifications
3. Testez vos changements
4. Soumettez une pull request

## 📞 Support

Pour toute question ou problème :
- Contactez l'équipe technique de la paroisse
- Consultez la documentation en ligne
- Signaler les bugs via les issues GitHub