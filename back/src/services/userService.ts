import { Role } from '@prisma/client';
import prisma from "../config/prisma";

export async function getUserById(userId: number) {
  return prisma.utilisateur.findUnique({
      where: { id: userId },
      select: {
          nom: true,
          email: true,
          dateCreation: true,
          reservations: {
              select: {  
                  dateReservation: true,
                  evenement: {
                      select: {
                          titre: true,
                          categorie: true,
                          image: true,
                          dateHeure: true,
                          lieu: true
                      }
                  },
                  billetsReserves: {
                      select: { 
                          billetId: true,
                          quantite: true,
                          billet: {
                              select: {
                                  type: true,
                                  prix: true
                              }
                          }
                      }
                  }
              }
          }
      }
  });
}


export async function getAll() {
    return prisma.utilisateur.findMany();
  }

  
export async function createUser(nom: string, email: string, motDePasse: string) {
  return prisma.utilisateur.create({
    data: {
      nom,
      email,
      motDePasse,
    },
  });

}

export async function updateUser(userId: number, data: { nom?: string; email?: string; motDePasse?: string }) {
  return prisma.utilisateur.update({
      where: { id: userId },
      data: {
          nom: data.nom,
          email: data.email,
          motDePasse: data.motDePasse,
      },
      select: { 
          id: true, 
          nom: true, 
          email: true, 
          dateCreation: true 
      }
  });
}

export async function updateRoleUser(userId: number, data: { role?: Role}) {
  return prisma.utilisateur.update({
      where: { id: userId },
      data: {
          role: data.role      
      },
      select: { 
          id: true, 
          nom: true, 
          email: true, 
          role: true,
          dateCreation: true 
      }
  });
}

