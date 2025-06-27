#!/bin/bash

echo "🚀 Démarrage de l'application Liturgie Sainte Famille"
echo "================================================="

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null
then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Vérifier si npm est installé
if ! command -v npm &> /dev/null
then
    echo "❌ npm n'est pas installé."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Installer les dépendances si nécessaire
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
else
    echo "✅ Dépendances déjà installées"
fi

echo ""
echo "🌐 Lancement de l'application en mode développement..."
echo "📍 L'application sera disponible sur : http://localhost:3000"
echo ""
echo "Pour arrêter l'application, appuyez sur Ctrl+C"
echo ""

# Lancer l'application
npm run dev