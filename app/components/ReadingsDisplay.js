'use client';

export default function ReadingsDisplay({ readings }) {
  if (!readings || !readings.lectures) {
    return (
      <div className="card">
        <h3 className="text-xl font-semibold mb-4">Lectures du jour</h3>
        <p className="text-gray-500">Aucune lecture trouvée pour cette date.</p>
      </div>
    );
  }

  const getReadingIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'première lecture':
        return '📖';
      case 'psaume':
        return '🎵';
      case 'deuxième lecture':
        return '📜';
      case 'verset':
        return '✨';
      case 'évangile':
        return '✝️';
      default:
        return '📄';
    }
  };

  const getReadingColor = (type) => {
    switch (type.toLowerCase()) {
      case 'première lecture':
        return 'border-l-blue-500 bg-blue-50';
      case 'psaume':
        return 'border-l-green-500 bg-green-50';
      case 'deuxième lecture':
        return 'border-l-purple-500 bg-purple-50';
      case 'verset':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'évangile':
        return 'border-l-red-500 bg-red-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Lectures du jour</h3>
      
      <div className="space-y-4">
        {readings.lectures.map((lecture, index) => (
          <div 
            key={index}
            className={`p-4 border-l-4 rounded-r-lg ${getReadingColor(lecture.type)}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg flex-shrink-0">
                {getReadingIcon(lecture.type)}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {lecture.type}
                </h4>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  {lecture.id}
                </p>
                <p className="text-sm text-gray-600">
                  {lecture.titre}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600">
          💡 Ces lectures sont automatiquement sélectionnées selon le calendrier liturgique.
          Vérifiez qu'elles correspondent bien à votre célébration.
        </p>
      </div>
    </div>
  );
}