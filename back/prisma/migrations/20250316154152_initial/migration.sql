-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ORGANISATEUR', 'ADMIN');

-- CreateEnum
CREATE TYPE "StatutEvenement" AS ENUM ('BROUILLON', 'PUBLIE', 'ANNULE');

-- CreateEnum
CREATE TYPE "TypeBillet" AS ENUM ('VIP', 'STANDARD', 'EARLY_BIRD');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evenement" (
    "id" SERIAL NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "dateHeure" TIMESTAMP(3) NOT NULL,
    "lieu" TEXT NOT NULL,
    "statut" "StatutEvenement" NOT NULL DEFAULT 'BROUILLON',
    "organisateurId" INTEGER NOT NULL,

    CONSTRAINT "Evenement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billet" (
    "id" SERIAL NOT NULL,
    "type" "TypeBillet" NOT NULL,
    "prix" DOUBLE PRECISION NOT NULL,
    "disponibilite" INTEGER NOT NULL,
    "limiteAchat" INTEGER NOT NULL,
    "venteActive" BOOLEAN NOT NULL DEFAULT true,
    "evenementId" INTEGER NOT NULL,

    CONSTRAINT "Billet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "evenementId" INTEGER NOT NULL,
    "dateReservation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BilletReserve" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "billetId" INTEGER NOT NULL,
    "quantite" INTEGER NOT NULL,

    CONSTRAINT "BilletReserve_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- AddForeignKey
ALTER TABLE "Evenement" ADD CONSTRAINT "Evenement_organisateurId_fkey" FOREIGN KEY ("organisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billet" ADD CONSTRAINT "Billet_evenementId_fkey" FOREIGN KEY ("evenementId") REFERENCES "Evenement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "Utilisateur"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_evenementId_fkey" FOREIGN KEY ("evenementId") REFERENCES "Evenement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilletReserve" ADD CONSTRAINT "BilletReserve_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BilletReserve" ADD CONSTRAINT "BilletReserve_billetId_fkey" FOREIGN KEY ("billetId") REFERENCES "Billet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
