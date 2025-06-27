'use client';

import { useState } from 'react';

export default function HelpPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bouton d'aide flottant */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors z-50"
        title="Aide et documentation"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Modal d'aide */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  📚 Guide d'utilisation
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-8">
                {/* Section 1: Démarrage rapide */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    🚀 Démarrage rapide
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                      <li>Sélectionnez la <strong>date de la messe</strong> dans le calendrier</li>
                      <li>Vérifiez les <strong>informations liturgiques</strong> générées automatiquement</li>
                      <li>Consultez les <strong>lectures du jour</strong> proposées</li>
                      <li>Choisissez les <strong>chants</strong> pour chaque moment de la messe</li>
                      <li>Cliquez sur <strong>"Générer la trame Word"</strong> pour exporter</li>
                    </ol>
                  </div>
                </section>

                {/* Section 2: Temps liturgiques */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    📅 Temps liturgiques
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 bg-purple-500 rounded-full"></span>
                        <div>
                          <strong>Avent</strong>
                          <p className="text-sm text-gray-600">4 dimanches avant Noël</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
                        <div>
                          <strong>Noël</strong>
                          <p className="text-sm text-gray-600">25 déc. au Baptême du Seigneur</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 bg-purple-600 rounded-full"></span>
                        <div>
                          <strong>Carême</strong>
                          <p className="text-sm text-gray-600">Mercredi des Cendres à Pâques</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
                        <div>
                          <strong>Pascal</strong>
                          <p className="text-sm text-gray-600">Pâques à la Pentecôte</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                        <div>
                          <strong>Ordinaire</strong>
                          <p className="text-sm text-gray-600">Reste de l'année liturgique</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section 3: Catégories de chants */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    🎵 Catégories de chants
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Ouverture</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>🚪 Chant d'entrée</li>
                        <li>🙏 Kyrie</li>
                        <li>✨ Gloria</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Parole</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>🎵 Alleluia</li>
                        <li>🍞 Offertoire</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900">Eucharistie</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>👼 Sanctus</li>
                        <li>✝️ Anamnèse</li>
                        <li>🐑 Agnus Dei</li>
                        <li>🍷 Communion</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 4: Conseils pratiques */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    💡 Conseils pratiques
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-medium text-yellow-800 mb-2">⚠️ Vérifications importantes</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        <li>• Vérifiez que les lectures correspondent à votre célébration</li>
                        <li>• Adaptez les chants selon votre assemblée et vos musiciens</li>
                        <li>• Consultez les partitions avant la messe</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">✅ Bonnes pratiques</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Préparez vos trames en avance</li>
                        <li>• Communiquez la trame aux équipes liturgiques</li>
                        <li>• Gardez une version papier de secours</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Section 5: Liens utiles */}
                <section>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    🔗 Liens utiles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <a 
                      href="https://drive.google.com/drive/u/0/folders/0APtJnxv12aVRUk9PVA" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span>📁</span>
                      <div>
                        <div className="font-medium text-blue-900">Partitions Drive</div>
                        <div className="text-sm text-blue-700">Accès aux partitions</div>
                      </div>
                    </a>
                    <a 
                      href="https://drive.google.com/drive/u/0/folders/1x6SvWbN2qdjf-3qbY-R6jZ86XE6FRuuM" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                    >
                      <span>📊</span>
                      <div>
                        <div className="font-medium text-orange-900">Diaporamas</div>
                        <div className="text-sm text-orange-700">Modèles PowerPoint</div>
                      </div>
                    </a>
                  </div>
                </section>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Application développée pour la Paroisse Sainte Famille - Châteaubriant
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}