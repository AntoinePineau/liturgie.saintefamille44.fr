import './globals.css'

export const metadata = {
  title: 'Liturgie Paroisse Sainte Famille - Châteaubriant',
  description: 'Génération de trames liturgiques et diaporamas pour les messes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-blue-900 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-2xl font-bold">Paroisse Sainte Famille - Châteaubriant</h1>
            <p className="text-blue-200">Génération de trames liturgiques</p>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center py-4 mt-8">
          <p>&copy; 2025 Paroisse Sainte Famille - Châteaubriant</p>
        </footer>
      </body>
    </html>
  )
}