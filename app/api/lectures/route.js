import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const temps = searchParams.get('temps');
  const annee = searchParams.get('annee');
  
  try {
    // Charger l'index des lectures
    const lecturesPath = path.join(process.cwd(), 'index/lectures.json');
    const lecturesData = JSON.parse(fs.readFileSync(lecturesPath, 'utf8'));
    
    // Charger l'index des psaumes
    const psaumesPath = path.join(process.cwd(), 'index/psaumes.json');
    const psaumesData = JSON.parse(fs.readFileSync(psaumesPath, 'utf8'));
    
    // Convertir la date pour la recherche
    const [day, month, year] = date.split('-');
    const searchDate = new Date(year, month - 1, day);
    
    // Rechercher les lectures correspondantes
    let readings = null;
    
    // Stratégie de recherche:
    // 1. Chercher par date exacte
    // 2. Chercher par temps liturgique et année
    // 3. Chercher par jour de la semaine et semaine
    
    // Recherche par temps liturgique et année
    const matchingReadings = lecturesData.filter(lecture => {
      if (lecture.annee === annee && lecture.temps === temps) {
        return true;
      }
      return false;
    });
    
    if (matchingReadings.length > 0) {
      // Prendre la première lecture correspondante
      readings = matchingReadings[0];
    }
    
    // Rechercher le psaume correspondant si on a trouvé des lectures
    let psaume = null;
    if (readings && readings.lectures) {
      const psaumeReading = readings.lectures.find(l => l.type === 'Psaume');
      if (psaumeReading) {
        // Extraire le numéro du psaume
        const psaumeMatch = psaumeReading.id.match(/Ps\s*(\d+)/);
        if (psaumeMatch) {
          const psaumeNum = psaumeMatch[1];
          psaume = psaumesData.find(p => p.nom && p.nom.includes(psaumeNum));
        }
      }
    }
    
    return NextResponse.json({
      readings,
      lectures: readings ? readings.lectures : [],
      psaume: psaume,
      searchCriteria: {
        date,
        temps,
        annee,
        matchingCount: matchingReadings.length
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la lecture des fichiers:', error);
    return NextResponse.json({
      error: 'Erreur lors du chargement des lectures',
      details: error.message
    }, { status: 500 });
  }
}