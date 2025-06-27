'use client';

export default function ChantSuggestions({ liturgicalData, onSuggestionApply }) {
  if (!liturgicalData?.tempsLiturgique) {
    return null;
  }

  const { tempsLiturgique, anneeLiturgique } = liturgicalData.tempsLiturgique;

  // Suggestions de chants selon le temps liturgique
  const suggestions = {
    'Avent': {
      theme: 'Attente et préparation',
      color: 'purple',
      chants: {
        entree: ['Viens Jésus', 'Préparons le chemin', 'Venir vers Toi'],
        kyrie: ['Kyrie du temps de l\'Avent'],
        gloria: null, // Pas de Gloria en Avent sauf exceptions
        alleluia: ['Alléluia de l\'Avent'],
        offertoire: ['Viens Emmanuel', 'Maranatha'],
        communion: ['Pain de la route', 'Viens Seigneur'],
        envoi: ['Allez dire à tous les hommes']
      }
    },
    'Noël': {
      theme: 'Joie de la Nativité',
      color: 'yellow',
      chants: {
        entree: ['Il est né le divin enfant', 'Venez divin Messie', 'Peuple fidèle'],
        kyrie: ['Kyrie de la messe de Noël'],
        gloria: ['Gloria de Noël', 'Gloire à Dieu au plus haut des cieux'],
        alleluia: ['Alléluia de Noël'],
        offertoire: ['Minuit chrétien', 'Marie a mis au monde'],
        communion: ['Emmanuel Dieu avec nous', 'Il est né pour nous'],
        envoi: ['Allez dire à tous', 'Joy to the world']
      }
    },
    'Carême': {
      theme: 'Conversion et pénitence',
      color: 'purple',
      chants: {
        entree: ['Vers toi Seigneur', 'Changez vos cœurs'],
        kyrie: ['Kyrie du temps du Carême'],
        gloria: null, // Pas de Gloria en Carême
        alleluia: null, // Remplacé par acclamation
        offertoire: ['Tu es notre Dieu', 'Souviens-toi Seigneur'],
        communion: ['Pain de vie', 'Comme un souffle fragile'],
        envoi: ['Allez dans la paix du Christ']
      }
    },
    'Pascal': {
      theme: 'Résurrection et joie',
      color: 'yellow',
      chants: {
        entree: ['Jésus le Christ', 'Alléluia le Seigneur règne', 'Christ est vivant'],
        kyrie: ['Kyrie pascal'],
        gloria: ['Gloria pascal', 'Gloire à Dieu notre Père'],
        alleluia: ['Triple Alléluia', 'Alléluia pascal'],
        offertoire: ['Jésus ressuscité', 'Pain rompu pour un monde nouveau'],
        communion: ['Pain de vivants', 'Victoire tu régneras'],
        envoi: ['Alléluia Christ est ressuscité']
      }
    },
    'Ordinaire': {
      theme: 'Temps de l\'Église',
      color: 'green',
      chants: {
        entree: ['Peuple de Dieu', 'Rassemblés pour te célébrer'],
        kyrie: ['Kyrie ordinaire'],
        gloria: ['Gloria ordinaire'],
        alleluia: ['Alléluia ordinaire'],
        offertoire: ['Pain partagé', 'Nous t\'offrons Seigneur'],
        communion: ['Nous formons un même corps', 'Un seul pain'],
        envoi: ['Allez par toute la terre']
      }
    }
  };

  const currentSuggestions = suggestions[tempsLiturgique];
  
  if (!currentSuggestions) {
    return null;
  }

  const applySuggestions = () => {
    if (onSuggestionApply) {
      onSuggestionApply(currentSuggestions.chants);
    }
  };

  const getColorClasses = (color) => {
    const colorMap = {
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      green: 'bg-green-50 border-green-200 text-green-800'
    };
    return colorMap[color] || colorMap.green;
  };

  return (
    <div className={`card border-2 ${getColorClasses(currentSuggestions.color)}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          💡 Suggestions pour le temps {tempsLiturgique}
        </h3>
        <button
          onClick={applySuggestions}
          className="text-xs px-3 py-1 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          Appliquer tout
        </button>
      </div>
      
      <p className="text-sm mb-4 opacity-80">
        <strong>Thème :</strong> {currentSuggestions.theme}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
        {Object.entries(currentSuggestions.chants).map(([category, suggestions]) => {
          if (!suggestions) return null;
          
          const categoryNames = {
            entree: 'Entrée',
            kyrie: 'Kyrie',
            gloria: 'Gloria',
            alleluia: 'Alleluia',
            offertoire: 'Offertoire',
            communion: 'Communion',
            envoi: 'Envoi'
          };

          return (
            <div key={category} className="bg-white bg-opacity-50 rounded p-2">
              <div className="font-medium mb-1">{categoryNames[category]}</div>
              <div className="space-y-1">
                {Array.isArray(suggestions) ? (
                  suggestions.map((chant, index) => (
                    <div key={index} className="text-xs opacity-75">• {chant}</div>
                  ))
                ) : (
                  <div className="text-xs opacity-75">• {suggestions}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {tempsLiturgique === 'Carême' && (
        <div className="mt-4 p-2 bg-white bg-opacity-50 rounded text-xs">
          <strong>Note :</strong> Pas de Gloria ni d'Alléluia pendant le Carême
        </div>
      )}

      {tempsLiturgique === 'Avent' && (
        <div className="mt-4 p-2 bg-white bg-opacity-50 rounded text-xs">
          <strong>Note :</strong> Gloria uniquement les dimanches Gaudete et grandes fêtes
        </div>
      )}
    </div>
  );
}