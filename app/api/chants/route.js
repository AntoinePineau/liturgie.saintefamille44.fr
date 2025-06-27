import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Charger l'index des chants
    const chantsPath = path.join(process.cwd(), 'index/chants.json');
    const chantsData = JSON.parse(fs.readFileSync(chantsPath, 'utf8'));
    
    return NextResponse.json(chantsData);
    
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier chants:', error);
    return NextResponse.json({
      error: 'Erreur lors du chargement des chants',
      details: error.message
    }, { status: 500 });
  }
}