'use client';

import { useState, useEffect } from 'react';
import ChantSuggestions from './ChantSuggestions';
import SearchableSelect from './SearchableSelect';

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

  const getCategoryFilter = (categoryKey) => {
    // Mapper les catégories aux filtres appropriés
    const categoryMap = {
      'entree': 'EN',
      'kyrie': 'KYR',
      'gloria': 'GLO', 
      'alleluia': 'ALL',
      'offertoire': 'OFF',
      'sanctus': 'SAN',
      'anamnese': 'ANA',
      'agnus': 'AGN',
      'communion': 'COM',
      'marie': 'MAR',
      'envoi': 'FIN'
    };
    
    return categoryMap[categoryKey] || null;
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
          const selectedChant = selectedChants[category.key];
          const categoryFilter = getCategoryFilter(category.key);
          
          return (
            <div key={category.key} className="border-b border-gray-200 pb-4 last:border-b-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {category.icon} {category.name}
              </label>
              
              <SearchableSelect
                options={chants}
                value={selectedChant?.id || ''}
                onChange={(chant) => handleChantSelection(category.key, chant)}
                placeholder={`Rechercher un chant ${category.name.toLowerCase()}...`}
                categoryFilter={categoryFilter}
                className="w-full"
              />
              
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