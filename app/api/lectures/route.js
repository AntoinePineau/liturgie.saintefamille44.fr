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
    
    // Stratégie de recherche améliorée:
    // 1. Chercher par temps liturgique, année et semaine
    // 2. Chercher par temps liturgique et année seulement
    // 3. Chercher un dimanche dans le temps liturgique pour les lectures principales
    
    // Extraire le numéro de semaine du calcul liturgique
    const tempsInfo = searchParams.get('tempsInfo');
    let semaineLiturgique = null;
    
    if (tempsInfo) {
      try {
        const info = JSON.parse(tempsInfo);
        semaineLiturgique = info.numeroSemaine;
      } catch (e) {
        console.log('Erreur parsing tempsInfo:', e);
      }
    }
    
    // Recherche par temps liturgique, année et jour dimanche (plus précis)
    let matchingReadings = lecturesData.filter(lecture => {
      if (lecture.annee === annee && lecture.temps === temps && lecture.jour === 6) {
        // Pour le temps ordinaire, essayer de matcher la semaine
        if (temps === 'Ordinaire' && semaineLiturgique && typeof semaineLiturgique === 'number') {
          // Approximation : les lectures suivent un cycle dans le temps ordinaire
          return Math.abs(lecture.semaine - semaineLiturgique) <= 1;
        }
        return true;
      }
      return false;
    });
    
    // Si pas trouvé, recherche plus large
    if (matchingReadings.length === 0) {
      matchingReadings = lecturesData.filter(lecture => {
        return lecture.annee === annee && lecture.temps === temps;
      });
    }
    
    // Pour le temps ordinaire, essayer de trouver une lecture avec un numéro de semaine proche
    if (temps === 'Ordinaire' && semaineLiturgique && typeof semaineLiturgique === 'number') {
      const weekReadings = lecturesData.filter(lecture => {
        return lecture.annee === annee && 
               lecture.temps === temps && 
               lecture.semaine >= semaineLiturgique - 2 && 
               lecture.semaine <= semaineLiturgique + 2 &&
               lecture.jour === 6; // Dimanche
      });
      
      if (weekReadings.length > 0) {
        // Prendre la lecture la plus proche de la semaine
        readings = weekReadings.reduce((closest, current) => {
          const closestDiff = Math.abs(closest.semaine - semaineLiturgique);
          const currentDiff = Math.abs(current.semaine - semaineLiturgique);
          return currentDiff < closestDiff ? current : closest;
        });
      }
    }
    
    if (!readings && matchingReadings.length > 0) {
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