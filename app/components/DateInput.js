'use client';

import { useState } from 'react';

export default function DateInput({ onDateChange }) {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    
    if (newDate) {
      // Convertir de YYYY-MM-DD vers DD-MM-YYYY pour l'API
      const [year, month, day] = newDate.split('-');
      const formattedDate = `${day}-${month}-${year}`;
      onDateChange(formattedDate);
    } else {
      onDateChange('');
    }
  };

  // Date d'aujourd'hui pour la valeur par défaut
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionnez la date de la messe
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          className="input-field w-full"
          defaultValue={today}
        />
      </div>
      
      <div className="text-sm text-gray-500">
        <p>💡 <strong>Conseil :</strong> La date permet de déterminer automatiquement :</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Le temps liturgique (Avent, Noël, Carême, Pascal, Ordinaire)</li>
          <li>L'année liturgique (A, B ou C)</li>
          <li>Les lectures du jour correspondantes</li>
        </ul>
      </div>
    </div>
  );
}