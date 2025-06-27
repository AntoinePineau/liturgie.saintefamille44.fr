'use client';

import { useState, useEffect } from 'react';
import ChantSuggestions from './ChantSuggestions';

export default function ChantSelector({ liturgicalData, onChantsChange }) {
  const [chants, setChants] = useState([]);
  const [selectedChants, setSelectedChants] = useState({});
  const [loading, setLoading] = useState(true);

  const categories = [
    { key: 'entree', name: 'Chant d\'entrée', icon: '🚪' },
    { key: 'kyrie', name: 'Kyrie', icon: '🙏' },
    { key: 'gloria', name: 'Gloria', icon: '✨' },
    { key: 'alleluia', name: 'Alleluia', icon: '🎵' },
    { key: 'offertoire', name: 'Offertoire', icon: '🍞' },
    { key: 'sanctus', name: 'Sanctus', icon: '👼' },
    { key: 'anamnese', name: 'Anamnèse', icon: '✝️' },
    { key: 'agnus', name: 'Agnus Dei', icon: '🐑' },
    { key: 'communion', name: 'Communion', icon: '🍷' },
    { key: 'marie', name: 'Chant à Marie', icon: '🌹' },
    { key: 'envoi', name: 'Chant d\'envoi', icon: '🚀' }
  ];

  useEffect(() => {
    const loadChants = async () => {
      try {
        const response = await fetch('/api/chants');
        const chantsData = await response.json();
        setChants(chantsData);
      } catch (error) {
        console.error('Erreur lors du chargement des chants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChants();
  }, []);

  useEffect(() => {
    onChantsChange(selectedChants);
  }, [selectedChants, onChantsChange]);

  const handleChantSelection = (category, chant) => {
    setSelectedChants(prev => ({
      ...prev,
      [category]: chant
    }));
  };

  const handleSuggestionApply = (suggestions) => {
    const newSelections = {};
    Object.entries(suggestions).forEach(([category, suggestionList]) => {
      if (suggestionList && suggestionList.length > 0) {
        // Chercher le premier chant correspondant dans notre base
        const suggestion = Array.isArray(suggestionList) ? suggestionList[0] : suggestionList;
        const matchingChant = chants.find(chant => 
          chant.titre.toLowerCase().includes(suggestion.toLowerCase()) ||
          suggestion.toLowerCase().includes(chant.titre.toLowerCase())
        );
        if (matchingChant) {
          newSelections[category] = matchingChant;
        }
      }
    });
    
    setSelectedChants(prev => ({
      ...prev,
      ...newSelections
    }));
  };

  const getFilteredChants = (category) => {
    // Filtrer les chants selon le temps liturgique et la catégorie
    return chants.filter(chant => {
      if (!chant.tag || chant.tag.length === 0) return true;
      
      // Vérifier si le chant correspond au temps liturgique
      const temps = liturgicalData?.tempsLiturgique?.tempsLiturgique;
      if (temps) {
        const tempsTag = temps.toUpperCase().substring(0, 3);
        if (chant.tag.includes(tempsTag)) return true;
      }
      
      // Chants génériques (sans tag spécifique)
      if (chant.tag.includes('GEN')) return true;
      
      return true;
    });
  };

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Sélection des chants</h3>
        <p className="text-gray-500">Chargement des chants...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Suggestions intelligentes */}
      <ChantSuggestions 
        liturgicalData={liturgicalData}
        onSuggestionApply={handleSuggestionApply}
      />

      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Sélection des chants</h3>
        
        <div className="space-y-6">
        {categories.map(category => {
          const filteredChants = getFilteredChants(category.key);
          const selectedChant = selectedChants[category.key];
          
          return (
            <div key={category.key} className="border-b border-gray-200 pb-4 last:border-b-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {category.icon} {category.name}
              </label>
              
              <select
                value={selectedChant?.id || ''}
                onChange={(e) => {
                  const chantId = e.target.value;
                  const chant = filteredChants.find(c => c.id.toString() === chantId);
                  handleChantSelection(category.key, chant);
                }}
                className="input-field w-full"
              >
                <option value="">Sélectionner un chant...</option>
                {filteredChants.map(chant => (
                  <option key={chant.id} value={chant.id}>
                    {chant.titre}
                  </option>
                ))}
              </select>
              
              {selectedChant && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>{selectedChant.titre}</strong>
                  </p>
                  {selectedChant.pdf && (
                    <a
                      href={selectedChant.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
                    >
                      📄 Voir la partition
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

        <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            💡 Les chants sont filtrés automatiquement selon le temps liturgique. 
            Vous pouvez modifier les sélections selon vos préférences.
          </p>
        </div>
      </div>
    </div>
  );
}