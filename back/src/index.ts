import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
    // const createUser = await prisma.utilisateur.createMany({
    //         data: [ {
    //           email: 'admin@mail.com',
    //           nom: 'Admin',
    //           motDePasse: '1234a',
    //           role: 'ADMIN'
               
    //         },

    //         {
    //           email: 'orga@mail.com',
    //           nom: 'Organisateur A',
    //           motDePasse: '1234a',
    //           role: 'ORGANISATEUR'
            
    //         },
          
    //         {
    //           email: 'user@mail.com',
    //           nom: 'User X',
    //           motDePasse: '1234a',
    //           role: 'USER',
            
    //         },
    //       ],
    //       })

    // CREATE EVENT
    // const createEvent = await prisma.evenement.create({
    //         data: {
    //           titre: 'Concert JAZZ',
    //           description: 'Un grand concert JAZZ.',
    //           dateHeure: new Date("2025-06-20T20:00:00Z"),
    //           lieu: 'Paris',
    //           statut: 'PUBLIE',
    //           image: 'https://example.com/concert.jpg',
    //           categorie: 'Spectacle',
    //           organisateurId: 2             
    //         },
    //       })

    // CREATE TICKET
    // const createTicket = await prisma.billet.create({
    //   data: {  
    //     type: 'VIP',
    //     prix: 150.00,
    //     disponibilite: 50,
    //     limiteAchat: 2,
    //     evenementId: 1
    //   },
    // })   
    
    // CREATE RESERVATION
    // const createReservation = await prisma.reservation.create({
    //   data: {  
    //     utilisateurId: 3,
    //     evenementId: 1,
    //     dateReservation: new Date("2025-04-20T10:00:00Z"),
    //   },
    // })   

    // // CREATE BILLET_RESERVE
    // const createbilletReserve = await prisma.billetReserve.create({
    //   data: {  
    //     reservationId: 1,
    //     billetId: 2,
    //     quantite: 1
    //   },
    // })   


    // const deleteUser = await prisma.utilisateur.delete({
    //   where: {
    //      email: 'elsa@prisma.io',
    //   },
    // })      

      // const user = await prisma.utilisateur.findFirst({
      //   where: {
      //     email: "elsa@prisma.io",
      //     role: "ADMIN"
      //   },
      //   select: {
      //     id: true,
      //     nom: true,
      //   },
      // });

      // const updateUser = await prisma.utilisateur.update({
      //     where: {
      //       email: "admin@mail.com",
      //     },
      //     data: {
      //       id: 1,         
      //     },
      //   });


//       const utilisateur = await prisma.utilisateur.findUnique({
//         where: { id: 3 },
//         include: {
//           reservations: {
//             include: {
//               evenement: true, // Inclut les détails de l'événement réservé
//               billetsReserves: {
//                 include: {
//                   billet: true // Inclut les informations du billet
//                 }
//               }
//             }
//           }
//         }
//       });
      
//       const event = await prisma.evenement.findMany()
//       const ticket = await prisma.billet.findMany()
//       console.log(JSON.stringify(utilisateur, null, 2));
//       //console.log(utilisateur);
 }

main()
