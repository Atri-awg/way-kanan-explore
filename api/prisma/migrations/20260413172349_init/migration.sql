-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "TipeMedia" AS ENUM ('IMAGE', 'VIDEO');

-- CreateTable
CREATE TABLE "Pengguna" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "kataSandi" TEXT NOT NULL,
    "nama" TEXT,
    "avatar" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "aktif" BOOLEAN NOT NULL DEFAULT true,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbaruiPada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pengguna_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destinasi" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "lokasi" TEXT NOT NULL,
    "dibuatOlehId" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "diperbaruiPada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destinasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DestinasiKategori" (
    "destinasiId" TEXT NOT NULL,
    "kategoriId" TEXT NOT NULL,

    CONSTRAINT "DestinasiKategori_pkey" PRIMARY KEY ("destinasiId","kategoriId")
);

-- CreateTable
CREATE TABLE "Ulasan" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "komentar" TEXT,
    "penggunaId" TEXT NOT NULL,
    "destinasiId" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ulasan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "penggunaId" TEXT NOT NULL,
    "destinasiId" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipe" "TipeMedia" NOT NULL,
    "destinasiId" TEXT NOT NULL,
    "diunggahOlehId" TEXT NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TokenRefresh" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "penggunaId" TEXT NOT NULL,
    "kadaluarsa" TIMESTAMP(3) NOT NULL,
    "dibuatPada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TokenRefresh_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pengguna_email_key" ON "Pengguna"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_nama_key" ON "Kategori"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_penggunaId_destinasiId_key" ON "Bookmark"("penggunaId", "destinasiId");

-- CreateIndex
CREATE UNIQUE INDEX "TokenRefresh_token_key" ON "TokenRefresh"("token");

-- AddForeignKey
ALTER TABLE "Destinasi" ADD CONSTRAINT "Destinasi_dibuatOlehId_fkey" FOREIGN KEY ("dibuatOlehId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinasiKategori" ADD CONSTRAINT "DestinasiKategori_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "Destinasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DestinasiKategori" ADD CONSTRAINT "DestinasiKategori_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ulasan" ADD CONSTRAINT "Ulasan_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "Destinasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "Destinasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_destinasiId_fkey" FOREIGN KEY ("destinasiId") REFERENCES "Destinasi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_diunggahOlehId_fkey" FOREIGN KEY ("diunggahOlehId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TokenRefresh" ADD CONSTRAINT "TokenRefresh_penggunaId_fkey" FOREIGN KEY ("penggunaId") REFERENCES "Pengguna"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
