exports.handler = async function (event, context) {
  const { ref } = event.queryStringParameters;
  if(!ref) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        help: 'aucune référence fournie',
        available_parameters:[
          {ref: 'une référence biblique du type "Mc 6, 7-13"'}
        ]
      })
    };
  }
  const { bookId, chapter, verseRanges } = parseReference(ref);
  console.log(`bookId : ${bookId}, chapter : ${chapter}, verseRanges : ${verseRanges}`);
  
  const books = readJsonFile(path.join(__dirname, '../index/bible/livres.json'));
  let bookInfo = null;
  let sectionName = '';
  
  for (let i = 0; i < 3; i++) {
    for (const [section, bookList] of Object.entries(books[i])) {
      bookInfo = bookList.find(book => book.id === bookId);
      if (bookInfo) {
        sectionName = section;
        break;
      }
    }
    if (sectionName) {
      break;
    }
  }
  
  if (!bookInfo) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'Livre non trouvé' })
    };
  }
  
  // Construire le chemin du fichier JSON du chapitre
  const chapterPath = path.join(__dirname, `../index/bible/${sectionName}/${bookId}/${chapter}.json`);
  console.log(`chapter path : ${chapterPath}`);
  
  if (!fs.existsSync(chapterPath)) {
    return res.status(404).json({ error: 'Chapitre non trouvé' });
  }
  
  // Lire le fichier JSON du chapitre
  const chapterData = readJsonFile(chapterPath);
  
  // Extraire les versets demandés
  const verses = [sectionName !== 'psaumes' ? `${bookInfo.name} –` : `Psaume ${chapter}`];
  for (const [start, end] of verseRanges) {
    for (let i = start; i <= end; i++) {
      const verseKey = i.toString().padStart(2, '0');
      const verse = chapterData.find(v => v[verseKey]);
      if (verse) {
        verses.push(verse[verseKey]);
      }
    }
  }
  
  if (bookInfo.name.startsWith('Evangile')) {
    verses.push('– Acclamons la Parole de Dieu.');
  } else if (sectionName !== 'psaumes') {
    verses.push('– Parole du Seigneur.');
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(verses)
  };
};


// Fonction pour parser la référence biblique
function parseReference(reference) {
  let bookId, chapter, verses;

  if (reference.includes('Ps')) {
    const [, ...verseParts] = reference.split(' ');
    const psalmVerses = verseParts.join(' ');
    const chapterMatch = psalmVerses.match(/\d+/);
    chapter = parseInt(chapterMatch[0]);
    verses = verseParts.join(' ').substring(chapterMatch.index + chapterMatch[0].length).trim();
    bookId = 'Ps';
  } else {
    const [bookIdPart, ...chapterVersesArray] = reference.split(' ');
    const chapterVerses = chapterVersesArray.join(' ');
    const [chapterPart, ...versesPartArray] = chapterVerses.split(/[ ,]/);
    verses = versesPartArray.join(',');
    chapter = parseInt(chapterPart);
    bookId = bookIdPart;
  }
  verses = verses.replace(/ |[A-Z]|\(\d+\)/g,'').replace(/^,/, '');
  console.log(`API bookId : ${bookId}, chapter : ${chapter}, verses : ${verses}`);
  const verseRanges = verses.split(/[.,]/).map(range => {
    range=range.trim();
    if(range.indexOf('-')===-1) {
        range=parseInt(range)
        if(isNaN(range)) return null;
        range=`${range}-${range}`
    }
    return range.split('-').map(Number)
  });
  return { bookId, chapter, verseRanges };
}

// Fonction pour lire un fichier JSON
function readJsonFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}