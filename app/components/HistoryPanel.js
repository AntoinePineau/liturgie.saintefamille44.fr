'use client';

import { useState, useEffect } from 'react';

export default function HistoryPanel({ onLoadTrame }) {
  const [savedTrames, setSavedTrames] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Charger l'historique depuis localStorage
    const saved = localStorage.getItem('liturgie-trames-history');
    if (saved) {
      try {
        setSavedTrames(JSON.parse(saved));
      } catch (error) {
        console.error('Erreur lors du chargement de l\'historique:', error);
      }
    }
  }, []);

  const saveCurrentTrame = (trameData) => {
    const newTrame = {
      id: Date.now(),
      date: trameData.date,
      liturgicalInfo: trameData.liturgical?.tempsLiturgique?.asString || '',
      tempsLiturgique: trameData.liturgical?.tempsLiturgique?.tempsLiturgique || '',
      anneeLiturgique: trameData.liturgical?.tempsLiturgique?.anneeLiturgique || '',
      chantsCount: Object.keys(trameData.chants || {}).length,
      createdAt: new Date().toISOString(),
      data: trameData
    };

    const updatedTrames = [newTrame, ...savedTrames.slice(0, 9)]; // Garder seulement les 10 dernières
    setSavedTrames(updatedTrames);
    localStorage.setItem('liturgie-trames-history', JSON.stringify(updatedTrames));
    
    return newTrame.id;
  };

  const loadTrame = (trame) => {
    if (onLoadTrame) {
      onLoadTrame(trame.data);
    }
    setIsOpen(false);
  };

  const deleteTrame = (id) => {
    const updatedTrames = savedTrames.filter(t => t.id !== id);
    setSavedTrames(updatedTrames);
    localStorage.setItem('liturgie-trames-history', JSON.stringify(updatedTrames));
  };

  const clearHistory = () => {
    setSavedTrames([]);
    localStorage.removeItem('liturgie-trames-history');
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getTempsColor = (temps) => {
    const colors = {
      'Avent': 'bg-purple-100 text-purple-800',
      'Noël': 'bg-yellow-100 text-yellow-800',
      'Carême': 'bg-purple-100 text-purple-800',
      'Pascal': 'bg-yellow-100 text-yellow-800',
      'Ordinaire': 'bg-green-100 text-green-800'
    };
    return colors[temps] || 'bg-gray-100 text-gray-800';
  };

  // Exposer la fonction saveCurrentTrame globalement
  useEffect(() => {
    window.saveCurrentTrame = saveCurrentTrame;
    return () => {
      delete window.saveCurrentTrame;
    };
  }, [savedTrames]);

  return (
    <>
      {/* Bouton historique */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-colors z-50"
        title="Historique des trames"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {savedTrames.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {savedTrames.length}
          </span>
        )}
      </button>

      {/* Modal historique */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  📚 Historique des trames
                </h2>
                <div className="flex items-center space-x-2">
                  {savedTrames.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="text-sm text-red-600 hover:text-red-800 px-3 py-1 border border-red-300 rounded"
                    >
                      Vider l'historique
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {savedTrames.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Aucune trame sauvegardée
                  </h3>
                  <p className="text-gray-600">
                    Les trames que vous exportez seront automatiquement sauvegardées ici.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedTrames.map(trame => (
                    <div key={trame.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">
                              Messe du {formatDate(trame.createdAt)}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTempsColor(trame.tempsLiturgique)}`}>
                              {trame.tempsLiturgique} - Année {trame.anneeLiturgique}
                            </span>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Date liturgique :</strong> {trame.date}
                          </p>
                          
                          {trame.liturgicalInfo && (
                            <p className="text-sm text-gray-600 mb-2">
                              {trame.liturgicalInfo}
                            </p>
                          )}
                          
                          <p className="text-xs text-gray-500">
                            {trame.chantsCount} chant(s) sélectionné(s) • 
                            Créé le {new Date(trame.createdAt).toLocaleDateString('fr-FR')} à {new Date(trame.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            onClick={() => loadTrame(trame)}
                            className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                          >
                            Charger
                          </button>
                          <button
                            onClick={() => deleteTrame(trame.id)}
                            className="text-sm text-red-600 hover:text-red-800 p-1"
                            title="Supprimer"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}