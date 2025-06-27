'use client';

import { useState, useEffect, useRef } from 'react';

export default function SearchableSelect({ 
  options = [], 
  value = '', 
  onChange, 
  placeholder = 'Rechercher ou sélectionner...',
  className = '',
  categoryFilter = null 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  // Filtrer les options en fonction de la recherche et de la catégorie
  useEffect(() => {
    let filtered = options;

    // Filtrer par catégorie si spécifié
    if (categoryFilter) {
      filtered = filtered.filter(option => {
        if (!option.tag || option.tag.length === 0) return true; // Chants génériques
        return option.tag.some(tag => 
          tag.toLowerCase().includes(categoryFilter.toLowerCase()) ||
          categoryFilter.toLowerCase().includes(tag.toLowerCase())
        );
      });
    }

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(option => 
        option.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (option.text && option.text.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredOptions(filtered);
  }, [options, searchTerm, categoryFilter]);

  // Fermer la dropdown en cliquant à l'extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredOptions.length > 0) {
        handleOptionClick(filteredOptions[0]);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const selectedOption = options.find(opt => opt.id === value);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Input de recherche */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchTerm : (selectedOption?.titre || '')}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="input-field w-full pr-10"
        />
        
        {/* Icône dropdown */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Badge de sélection actuelle */}
        {selectedOption && !isOpen && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-600"
            title="Supprimer la sélection"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown des options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm">
              {searchTerm ? `Aucun résultat pour "${searchTerm}"` : 'Aucun chant disponible'}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left p-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                  selectedOption?.id === option.id ? 'bg-blue-100 text-blue-800' : 'text-gray-700'
                }`}
              >
                <div className="font-medium">{option.titre}</div>
                {option.tag && option.tag.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {option.tag.join(', ')}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}