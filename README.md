# Site liturgie.saintefamille44.fr

Contient principalement des fonctions serverless pour:
- déterminer le temps liturgique à partir d'une date au format dd-MM-yyyy https://liturgie.saintefamille44.fr/.netlify/functions/temps-liturgique?date=02-02-2025

Résultat:
```json
{
    "date": {
        "asString": "02/02/2025",
        "day": "2",
        "month": "2",
        "year": "2025"
    },
    "tempsLiturgique": {
        "asString": "Dimanche, 5e semaine du temps Ordinaire - Année C",
        "jourSemaine": 6,
        "numeroSemaine": 5,
        "tempsLiturgique": "Ordinaire",
        "anneeLiturgique": "C"
    }
}
```

- Récupérer la partition et l'audio du psaume d'un jour liturgique
https://liturgie.saintefamille44.fr/.netlify/functions/psaume?annee=C&temps=Ordinaire&semaine=5&jour=6
```json
[
    {
        "id": "5",
        "type": "psaume",
        "annee": "C",
        "temps": "Ordinaire",
        "date": "5e dimanche du temps ordinaire - Année C",
        "nom": "Psaume 137",
        "titre": "Je te chante, Seigneur, en présence des anges.",
        "pdf": "https://drive.google.com/file/d/1qWhThpGb5mxOxygYVdKvRsNuZmCWBLxm/view?usp=drivesdk",
        "mp3": [
            {
                "nom": "Psaume 137",
                "file": "https://drive.google.com/file/d/1fO6fPv4V_DZQwjA90o3G-NT-UgNbBKd2/view?usp=drivesdk"
            }
        ],
        "text": "   De tout mon cœur, Seigne u r, je te rends grâce : tu as entendu les par o les de ma bouche. Je te chante en prés e nce des anges, vers ton temple sacr é , je me prosterne. Je rends grâce à ton nom pour ton amo u r et ta vérité, car tu élèves, au-dessus de tout, ton n o m et ta parole. Le jour où tu répond i s à mon appel, tu ﬁs grandir en mon  â me la force. Tous les rois de la t e rre te rendent grâce quand ils entendent les par o les de ta bouche. Ils chantent les chem i ns du Seigneur : « Qu’elle est grande, la gl o ire du Seigneur ! » 5 e  dimanche du temps ordinaire Année C  Psaume 137 Ta droite me r e nd vainqueur. Le Seigneur fait to u t pour moi ! Seigneur, étern e l est ton amour : n’arrête pas l’œ u vre de tes mains. www.sos-messe.fr Fa Je te chan te, - Sei Do gneur, - Fa7 en pré Sib sen - ce - des Fa/Do an Do Fa ges. - Fa Do Fa Fa Do Sib/Ré Do/Mi Fa Sol/Sib Do7 Fa Fa Je te chan te, - Sei Do gneur, - Fa7 en pré Sib sen - ce - des Fa/Do an Do Fa ges. - Fa Do Fa Fa Do Sib/Ré Do/Mi Fa Sol/Sib Do7 Fa 3 8 3 8 3 8 & b Paroles : AELF Musique : JFD & b & b b # ? b & b ? b œ œ œ œ œ œ ™ œ œ # J œ œ œ œ œ j œ ™ w w ú w w ú w w ú w w ú œ œ œ œ œ œ œ œ ™ œ œ œ œ ™ œ œ œ J œ j œ œ œ œ œ œ œ œ ™ œ j œ ™ œ ™ œ œ œ œ œ œ œ œ ™ œ œ œ œ ™ œ œ œ J œ j œ œ œ œ œ œ œ œ ™ œ j œ ™ œ ™ w w w w ú ú w w w w ú ú w w w w ú ú w w w w ú ú w w w w ú ú w w w w ú ú w w w w ú ú w w w w ú ú",
        "ref": "5(C)Ordinaire"
    }
]
```

- Obtenir les lectures d'un jour liturgique https://liturgie.saintefamille44.fr/.netlify/functions/lectures?annee=C&temps=Carême&semaine=5&jour=6
```json
[
    {
        "id": 98,
        "annee": "C",
        "temps": "Carême",
        "semaine": 5,
        "couleur": "violet",
        "jour": 6,
        "date": "dimanche, 5ème Semaine de Carême — Année C",
        "originalDate": "2019-04-07",
        "lectures": [
            {
                "type": "Première lecture",
                "id": "Is 43, 16-21",
                "titre": "Voici que je fais une chose nouvelle, je vais désaltérer mon peuple"
            },
            {
                "type": "Psaume",
                "id": "Ps 125 (126), 1-2ab, 2cd-3, 4-5, 6",
                "titre": "Quelles merveilles le Seigneur fit pour nous : nous étions en grande fête !"
            },
            {
                "type": "Deuxième lecture",
                "id": "Ph 3, 8-14",
                "titre": "À cause du Christ, j’ai tout perdu, en devenant semblable à lui dans sa mort"
            },
            {
                "type": "Verset",
                "id": "Jl 2, 12b.13c",
                "titre": "Gloire à toi, Seigneur.Gloire à toi. Maintenant, dit le Seigneur, revenez à moi de tout votre cœur, car je suis tendre et miséricordieux.Gloire à toi, Seigneur.Gloire à toi. "
            },
            {
                "type": "Évangile",
                "id": "Jn 8, 1-11",
                "titre": "Celui d’entre-vous qui est sans péché, qu’il soit le premier à jeter une pierre"
            }
        ],
        "ref": "6,5(C)Carême"
    }
]
```

- Obtenir le texte à partir d'une référence biblique https://liturgie.saintefamille44.fr/.netlify/functions/bible?ref=Jn+8,+1-11
```json
[
    "Evangile de Jésus-Christ selon saint Jean –",
    "Quant à Jésus, il s’en alla au mont des Oliviers.",
    "Dès l’aurore, il retourna au Temple. Comme tout le peuple venait à lui, il s’assit et se mit à enseigner.",
    "Les scribes et les pharisiens lui amènent une femme qu’on avait surprise en situation d’adultère. Ils la mettent au milieu,",
    "et disent à Jésus : « Maître, cette femme a été surprise en flagrant délit d’adultère.",
    "Or, dans la Loi, Moïse nous a ordonné de lapider ces femmes-là. Et toi, que dis-tu ? »",
    "Ils parlaient ainsi pour le mettre à l’épreuve, afin de pouvoir l’accuser. Mais Jésus s’était baissé et, du doigt, il écrivait sur la terre.",
    "Comme on persistait à l’interroger, il se redressa et leur dit : « Celui d’entre vous qui est sans péché, qu’il soit le premier à lui jeter une pierre. »",
    "Il se baissa de nouveau et il écrivait sur la terre.",
    "Eux, après avoir entendu cela, s’en allaient un par un, en commençant par les plus âgés. Jésus resta seul avec la femme toujours là au milieu.",
    "Il se redressa et lui demanda : « Femme, où sont-ils donc ? Personne ne t’a condamnée ? »",
    "Elle répondit : « Personne, Seigneur. » Et Jésus lui dit : « Moi non plus, je ne te condamne pas. Va, et désormais ne pèche plus. »",
    "– Acclamons la Parole de Dieu."
]
```

- Rechercher un chant https://liturgie.saintefamille44.fr/.netlify/functions/chants?texte=Christ+est+ressuscité
```json
[
    {
        "id": 351,
        "tag": [
            "P"
        ],
        "titre": "Criez de joie, Christ est ressuscité",
        "pdf": "https://drive.google.com/file/d/11M3n_g0lYgK8gCN2Hqt8SXzW-zkjyLW4/view?usp=drivesdk",
        "text": " ",
        "ref": 351
    },
    {
        "id": 628,
        "tag": [],
        "titre": "Hosanna, Jésus Christ",
        "pdf": "https://drive.google.com/file/d/13HHPUPSO59aXzP8ag550eXaWvouCHREo/view?usp=drivesdk",
        "text": " HOSANNA, JÉSUS-CHRIST H 185  Auteur : Clau de Bern ard © Studio SM  Comp osite ur : Bertrand Ba yle     VIVE DI EU v olume 1 – L es Presse s d’I le de Fra nce   Mim Mim9 Mim Mim9 Mim Mim9 Mim Mim9 Mim Ré Sol Sol Ré Mim Lam Si7/4 Si7La Si Mi Fam7 Si7/4 Mi La/mi Solm/mi Mi Si7/4 Si7 Mi Mi7 La/mi Solm/mi Mi Fam7 Mi Si7 Mi  VIVE DIEU volume 1 – Les Presses d’Ile de France      1. Voici la Pâque de Jésus, voici ton roi, Jérusalem !  Voici la foule dans les rues, avec des cris, des palmes vertes.  Voici les jours de notre Pâque,  L’heure est venue où Dieu fait grâce.  Rameaux greffés sur le Vivant,  Nous serons l’arbre verdoyant.   Hosanna Jésus Christ !  Hosanna pour ta gloire !  Hosanna Jésus Christ !  Dieu qui nous libères !   2. Voici la Pâque de Jésus, voici l’agneau de notre paix.  Voici la table au pain rompu, le mémorial des chants de fête.  Voici les jours de notre Pâque,  Le vin nouveau pour le partage.  Prenons la coupe du Vivant,  La joie de Dieu est un ferment.   3. Voici la Pâque de Jésus, voici la nuit des oliviers.  Le Fils de l’Homme est mis à nu, Gethsémani est sa prière.  Voici les jours de notre Pâque,  Les trahisons qui nous démasquent.  Te suivrons-nous, toi le Vivant,  Jusqu’au prétoire où tu descends ?   4. Voici la Pâque de Jésus, voici le fouet brûlant sa chair.  Sous le roseau qui frappe dru, le roi du ciel courbe la tête.  Voici les jours de notre Pâque,  Les fronts brisés sous les attaques.  Pitié pour nous, toi le Vivant,  Tu connais bien nos reniements !   5. Voici la Pâque de Jésus, voici le bois du condamné.  Le sang du Christ est répandu au Golgotha de nos ténèbres.  Voici les jours de notre Pâque,  Les croix dressées sont les sarcasmes.  Avec Marie près du Vivant,  Restons debout, Dieu est présent.   6. Voici la Pâque de Jésus, voici le corps dans le tombeau :  Il a rejoint dans l’inconnu ceux qui attendent sa lumière.  Voici les jours de notre Pâque,  L’espoir de vivre un face à face.  Par le baptême du Vivant,  La mort prévient le jour levant.   7. Voici la Pâque du Seigneur, voici l’éveil du Bien-Aimé.  Il se révèle au fond des cœurs, il est soleil pour tous ses frères.  Voici les jours de notre Pâque,  Sur nous l’Esprit a mis sa marque.  Pour l’annoncer, toi le Vivant,  Allume en nous le feu qui prend.   ",
        "ref": 628
    }
]
```

## Update search index

```
node plugins/netlify-plugin-lunr-indexer/src/generate-index.js
```
