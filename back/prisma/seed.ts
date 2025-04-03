import { PrismaClient, Role, StatutEvenement, TypeBillet } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
 
    // const organisateur = await prisma.utilisateur.create({
    //     data: {
    //       nom: "Chris Patt",
    //       email: "patt@gmail.com",
    //       motDePasse: "password",
    //       role: Role.ORGANISATEUR,
    //     },
    //   });

  // const event1 = await prisma.evenement.create({
  //   data: {
  //     titre: "Indochine",
  //     description: "Indochine a recemment présenté leur nouvel album 'Babel Babel' lors d'un concert à huis clos devant 300 fans privilégiés dans un lieu secret, près de Paris. Suite à ce concert exceptionnel, Indochine revient en 2025 avec l'Arena Tour, une tournée exceptionnelle en indoor et en arenas, passant par 17 villes en France, Belgique et Suisse, avec deux concerts à l’Accor Arena de Paris les vendredi 20 et samedi 21 juin 2025.",
  //     categorie: "CONCERT - POP ROCK FOLK",
  //     image: "https://www.ticketmaster.fr/statics/vignettes/n_indochine_p.webp",
  //     dateHeure: new Date("2025-10-24T20:00:00Z"),
  //     lieu: "ZENITH TOULOUSE METROPOLE",
  //     statut: StatutEvenement.PUBLIE,
  //     organisateurId: 1, 
  //   },
  // });


    const event1 = await prisma.evenement.create({
    data: {
      titre: "TARIKA BE",
      description: "Indochine a recemment présenté leur nouvel album 'Babel Babel' lors d'un concert à huis clos devant 300 fans privilégiés dans un lieu secret, près de Paris. Suite à ce concert exceptionnel, Indochine revient en 2025 avec l'Arena Tour, une tournée exceptionnelle en indoor et en arenas, passant par 17 villes en France, Belgique et Suisse, avec deux concerts à l’Accor Arena de Paris les vendredi 20 et samedi 21 juin 2025.",
      categorie: "CONCERT - POP ROCK FOLK",
      image: "https://www.ticketmaster.fr/statics/vignettes/n_indochine_p.webp",
      dateHeure: new Date("2025-10-24T20:00:00Z"),
      lieu: "ZENITH TOULOUSE METROPOLE",
      statut: StatutEvenement.PUBLIE,
      organisateurId: 1, 
    },
  });


  const event2 = await prisma.evenement.create({
    data: {
      titre: "24H DU MANS 2024 - ENTREE ESSAIS JEUDI ",
      description: "Grâce au billet Jeudi, vivez une journée d’Essais intense côté piste avec lutte pour l’Hyperpole.",
      categorie: "SPORT - AUTOMOBILE",
      image: "https://www.ticketmaster.fr/statics/vignettes/a_606175_p.webp",
      dateHeure: new Date("2025-06-12T10:00:00Z"),
      lieu: "CIRCUIT DU MANS - PLACE LUIGI CHINETTI",
      statut: StatutEvenement.PUBLIE,
      organisateurId: 1, 
    },
  });

  
  const ticket1 = await prisma.billet.create({
    data: {
      type: TypeBillet.VIP,
      prix: 100.0,
      disponibilite: 50,
      limiteAchat: 10,
      evenementId: event1.id,
    },
  });

  const ticket2 = await prisma.billet.create({
    data: {
      type: TypeBillet.STANDARD,
      prix: 50.0,
      disponibilite: 200,
      limiteAchat: 20,
      evenementId: event2.id,
    },
  });

  

  console.log("Données de test ajoutées !");
}


main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
