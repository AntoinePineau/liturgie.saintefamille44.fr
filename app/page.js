'use client';

import { useState } from 'react';
import DateInput from './components/DateInput';
import LiturgicalInfo from './components/LiturgicalInfo';
import ReadingsDisplay from './components/ReadingsDisplay';
import ChantSelector from './components/ChantSelector';
import HelpPanel from './components/HelpPanel';
import HistoryPanel from './components/HistoryPanel';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState('');
  const [liturgicalData, setLiturgicalData] = useState(null);
  const [readings, setReadings] = useState(null);
  const [selectedChants, setSelectedChants] = useState({});

  const handleDateChange = async (date) => {
    setSelectedDate(date);
    
    if (date) {
      try {
        // Appel à la fonction temps liturgique
        const response = await fetch(`/api/temps-liturgique?date=${date}`);
        const liturgicalInfo = await response.json();
        setLiturgicalData(liturgicalInfo);

        // Recherche des lectures correspondantes
        const readingsResponse = await fetch(`/api/lectures?date=${date}&temps=${liturgicalInfo.tempsLiturgique?.tempsLiturgique}&annee=${liturgicalInfo.tempsLiturgique?.anneeLiturgique}`);
        const readingsData = await readingsResponse.json();
        setReadings(readingsData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données liturgiques:', error);
      }
    }
  };

  const handleLoadTrame = (trameData) => {
    setSelectedDate(trameData.date);
    setLiturgicalData(trameData.liturgical);
    setReadings(trameData.readings);
    setSelectedChants(trameData.chants || {});
  };

  const handleExportTrame = async () => {
    if (!liturgicalData || !readings) {
      alert('Veuillez sélectionner une date et vérifier que les données sont chargées.');
      return;
    }

    try {
      const exportData = {
        date: selectedDate,
        liturgical: liturgicalData,
        readings: readings,
        chants: selectedChants
      };

      // Sauvegarder dans l'historique
      if (window.saveCurrentTrame) {
        window.saveCurrentTrame(exportData);
      }

      const response = await fetch('/api/export-trame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exportData)
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `trame_messe_${selectedDate}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Erreur lors de l\'export');
      }
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      alert('Erreur lors de l\'export du document.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Générateur de Trames Liturgiques
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sélectionnez une date pour générer automatiquement la trame de messe 
          avec les lectures du jour et choisir les chants appropriés.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-xl font-semibold mb-4">Date de la messe</h3>
            <DateInput onDateChange={handleDateChange} />
          </div>

          {liturgicalData && (
            <LiturgicalInfo data={liturgicalData} />
          )}

          {readings && (
            <ReadingsDisplay readings={readings} />
          )}
        </div>

        <div className="space-y-6">
          {liturgicalData && (
            <ChantSelector 
              liturgicalData={liturgicalData}
              onChantsChange={setSelectedChants}
            />
          )}

          {liturgicalData && readings && (
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Export</h3>
              <div className="space-y-3">
                <button 
                  onClick={handleExportTrame}
                  className="btn-primary w-full"
                >
                  📄 Générer la trame Word
                </button>
                <button 
                  onClick={() => alert('Génération PowerPoint en cours de développement')}
                  className="btn-secondary w-full"
                >
                  📊 Générer le diaporama PowerPoint
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Panels d'aide et d'historique */}
      <HelpPanel />
      <HistoryPanel onLoadTrame={handleLoadTrame} />
    </div>
  );
}