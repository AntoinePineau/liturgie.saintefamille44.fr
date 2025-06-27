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
  
  // Déterminer la couleur liturgique
  const getCouleurLiturgique = (temps) => {
    switch (temps) {
      case 'Avent':
      case 'Carême':
        return 'violet';
      case 'Noël':
      case 'Pascal':
        return 'blanc';
      case 'Ordinaire':
        return 'vert';
      default:
        return 'vert';
    }
  };

  const couleur = getCouleurLiturgique(liturgical?.tempsLiturgique?.tempsLiturgique);
  const dateFormatted = new Date(date.split('-').reverse().join('-')).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  let trame = `Trame du ${dateFormatted}, ${liturgical?.tempsLiturgique?.asString || ''} (${couleur})


01-Chant d'entrée
${chants.entree ? `${chants.entree.titre} Partition OU Accords` : 'À choisir'}

02-Kyrie
${chants.kyrie ? `${chants.kyrie.titre} Partition OU Accords` : 'Messe de Saint François-Xavier Partition OU Accords'}

03-Gloria
${chants.gloria ? `${chants.gloria.titre} Partition OU Accords` : 'Messe de Saint François-Xavier Partition OU Accords'}
`;

  // Ajouter les lectures dans le bon ordre
  if (readings?.lectures) {
    const premiereReading = readings.lectures.find(l => l.type === 'Première lecture');
    if (premiereReading) {
      trame += `Première lecture: ${premiereReading.titre} (${premiereReading.id})
`;
    }
    
    trame += `04-Psaume
`;
    const psaume = readings.lectures.find(l => l.type === 'Psaume');
    if (psaume) {
      trame += `${psaume.id} - ${psaume.titre}
`;
    }
    
    const deuxiemeReading = readings.lectures.find(l => l.type === 'Deuxième lecture');
    if (deuxiemeReading) {
      trame += `Deuxième lecture: ${deuxiemeReading.titre} (${deuxiemeReading.id})
`;
    }
  }

  trame += `05-Alléluia
${chants.alleluia ? `${chants.alleluia.titre} Partition OU Accords` : 'Messe de Saint François-Xavier Partition OU Accords'}

`;

  // Ajouter le verset et l'évangile
  if (readings?.lectures) {
    const verset = readings.lectures.find(l => l.type === 'Verset');
    if (verset) {
      trame += `Verset: ${verset.titre} (${verset.id})
`;
    }
    
    const evangile = readings.lectures.find(l => l.type === 'Évangile');
    if (evangile) {
      trame += `Évangile: ${evangile.titre} (${evangile.id})
`;
    }
  }

  trame += `Homélie

06-Prière universelle
${chants.priere || 'À choisir'}

07-Offertoire
${chants.offertoire ? `${chants.offertoire.titre} Partition ou Accords` : 'À choisir'}

08-Sanctus
${chants.sanctus ? `${chants.sanctus.titre} Partition OU Accords` : 'Messe de Saint François-Xavier Partition OU Accords'}

09-Anamnèse
${chants.anamnese ? `${chants.anamnese.titre} Partition OU Accords` : 'Messe de Saint François-Xavier Partition OU Accords'}

Notre Père
${chants.notrePere || 'de Glorious Partition'}

10-Agnus
${chants.agnus ? `${chants.agnus.titre} Partition OU Accords` : 'Messe de Saint François-Xavier Partition OU Accords'}

11-Eucharistie
${chants.communion ? `${chants.communion.titre} Partition ou Accords` : 'À choisir'}

${chants.marie ? `Chant à Marie 
${chants.marie.titre} Partition

` : ''}12-Envoi
${chants.envoi ? `${chants.envoi.titre} Partition` : 'À choisir'}


=========================================

1- OUVERTURE DE LA CÉLÉBRATION
 
Chant d'entrée : ${chants.entree?.titre || 'À choisir'}
Prière pénitentielle : Kyrie ${chants.kyrie?.titre || 'Messe de Saint François-Xavier'}
Gloire à Dieu : Gloria ${chants.gloria?.titre || 'Messe de Saint François-Xavier'}
Prière d'ouverture

2- LITURGIE DE LA PAROLE

`;

  // Détail des lectures pour la partie déroulement
  if (readings?.lectures) {
    const premiereReading = readings.lectures.find(l => l.type === 'Première lecture');
    if (premiereReading) {
      trame += `Première lecture : ${premiereReading.titre}
(${premiereReading.id})

`;
    }
    
    const psaume = readings.lectures.find(l => l.type === 'Psaume');
    if (psaume) {
      trame += `Psaume : ${psaume.id}
${psaume.titre}

`;
    }
    
    const deuxiemeReading = readings.lectures.find(l => l.type === 'Deuxième lecture');
    if (deuxiemeReading) {
      trame += `Deuxième lecture : ${deuxiemeReading.titre}
(${deuxiemeReading.id})

`;
    }
    
    const verset = readings.lectures.find(l => l.type === 'Verset');
    const evangile = readings.lectures.find(l => l.type === 'Évangile');
    
    trame += `Alléluia : ${chants.alleluia?.titre || 'Messe de Saint François-Xavier'}
`;
    
    if (verset) {
      trame += `Verset : ${verset.titre}
`;
    }
    
    if (evangile) {
      trame += `
Évangile : ${evangile.titre}
(${evangile.id})

`;
    }
  }

  trame += `Homélie
Profession de foi
Prière universelle : ${chants.priere || 'À choisir'}

3- LITURGIE EUCHARISTIQUE

Préparation des dons
Offertoire : ${chants.offertoire?.titre || 'À choisir'}
Prière sur les offrandes
Préface
Sanctus : ${chants.sanctus?.titre || 'Messe de Saint François-Xavier'}
Prière eucharistique
Anamnèse : ${chants.anamnese?.titre || 'Messe de Saint François-Xavier'}
Notre Père : ${chants.notrePere || 'de Glorious'}
Geste de paix
Agnus Dei : ${chants.agnus?.titre || 'Messe de Saint François-Xavier'}
Communion : ${chants.communion?.titre || 'À choisir'}
Prière après la communion

4- CONCLUSION

${chants.marie ? `Chant à Marie : ${chants.marie.titre}
` : ''}Bénédiction
Envoi : ${chants.envoi?.titre || 'À choisir'}

=========================================
Document généré automatiquement
Paroisse Sainte Famille - Châteaubriant
=========================================`;

  return trame;
}