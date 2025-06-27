'use client';

export default function LiturgicalInfo({ data }) {
  if (!data || !data.tempsLiturgique) {
    return null;
  }

  const { tempsLiturgique } = data;

  const getTempsColor = (temps) => {
    switch (temps) {
      case 'Avent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Noël':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Carême':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pascal':
        return 'bg-white text-yellow-600 border-yellow-200';
      case 'Ordinaire':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCouleurLiturgique = (temps) => {
    switch (temps) {
      case 'Avent':
      case 'Carême':
        return 'Violet';
      case 'Noël':
      case 'Pascal':
        return 'Blanc';
      case 'Ordinaire':
        return 'Vert';
      default:
        return 'Vert';
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Informations liturgiques</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Date liturgique
          </label>
          <p className="text-lg text-gray-900">
            {data.date?.asString}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Temps liturgique
          </label>
          <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getTempsColor(tempsLiturgique.tempsLiturgique)}`}>
            {tempsLiturgique.tempsLiturgique}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Année liturgique
            </label>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Année {tempsLiturgique.anneeLiturgique}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Couleur liturgique
            </label>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
              {getCouleurLiturgique(tempsLiturgique.tempsLiturgique)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Semaine
            </label>
            <p className="text-sm text-gray-700">
              {tempsLiturgique.numeroSemaine}
            </p>
          </div>
        </div>

        {tempsLiturgique.asString && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 font-medium">
              {tempsLiturgique.asString}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}