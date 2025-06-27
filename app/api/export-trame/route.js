import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Pour l'instant, on retourne un exemple de trame en texte
    // À remplacer par la génération d'un vrai document Word
    
    const trame = generateTrameText(data);
    
    // Créer un blob avec le contenu texte (temporaire)
    const blob = new Blob([trame], { type: 'text/plain' });
    
    return new NextResponse(blob, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="trame_messe_${data.date}.txt"`
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    return NextResponse.json({
      error: 'Erreur lors de la génération du document',
      details: error.message
    }, { status: 500 });
  }
}

function generateTrameText(data) {
  const { date, liturgical, readings, chants } = data;
  
  let trame = `TRAME DE MESSE
===============

Date: ${date}
${liturgical?.tempsLiturgique?.asString || ''}

LECTURES DU JOUR
================
`;

  if (readings?.lectures) {
    readings.lectures.forEach(lecture => {
      trame += `
${lecture.type}
${lecture.id}
${lecture.titre}
`;
    });
  }

  trame += `

CHANTS SÉLECTIONNÉS
==================
`;

  Object.entries(chants).forEach(([category, chant]) => {
    if (chant) {
      trame += `
${category.toUpperCase()}: ${chant.titre}`;
      if (chant.pdf) {
        trame += `
Partition: ${chant.pdf}`;
      }
      trame += `\n`;
    }
  });

  trame += `

DÉROULEMENT DE LA MESSE
=======================

OUVERTURE
---------
• Chant d'entrée: ${chants.entree?.titre || '[À choisir]'}
• Salutation
• Préparation pénitentielle
• Kyrie: ${chants.kyrie?.titre || '[À choisir]'}
• Gloria: ${chants.gloria?.titre || '[À choisir]'}
• Prière d'ouverture

LITURGIE DE LA PAROLE
--------------------
`;

  if (readings?.lectures) {
    const premiereReading = readings.lectures.find(l => l.type === 'Première lecture');
    if (premiereReading) {
      trame += `• Première lecture: ${premiereReading.id}\n`;
    }
    
    const psaume = readings.lectures.find(l => l.type === 'Psaume');
    if (psaume) {
      trame += `• Psaume: ${psaume.id}\n`;
    }
    
    const deuxiemeReading = readings.lectures.find(l => l.type === 'Deuxième lecture');
    if (deuxiemeReading) {
      trame += `• Deuxième lecture: ${deuxiemeReading.id}\n`;
    }
    
    trame += `• Alleluia: ${chants.alleluia?.titre || '[À choisir]'}\n`;
    
    const evangile = readings.lectures.find(l => l.type === 'Évangile');
    if (evangile) {
      trame += `• Évangile: ${evangile.id}\n`;
    }
  }

  trame += `• Homélie
• Profession de foi
• Prière universelle

LITURGIE EUCHARISTIQUE
----------------------
• Préparation des dons
• Chant d'offertoire: ${chants.offertoire?.titre || '[À choisir]'}
• Prière sur les offrandes
• Préface
• Sanctus: ${chants.sanctus?.titre || '[À choisir]'}
• Prière eucharistique
• Anamnèse: ${chants.anamnese?.titre || '[À choisir]'}
• Notre Père
• Geste de paix
• Agnus Dei: ${chants.agnus?.titre || '[À choisir]'}
• Communion
• Chant de communion: ${chants.communion?.titre || '[À choisir]'}
• Prière après la communion

CONCLUSION
----------
`;

  if (chants.marie?.titre) {
    trame += `• Chant à Marie: ${chants.marie.titre}\n`;
  }

  trame += `• Bénédiction
• Chant d'envoi: ${chants.envoi?.titre || '[À choisir]'}

=========================================
Document généré automatiquement
Paroisse Sainte Famille - Châteaubriant
=========================================`;

  return trame;
}