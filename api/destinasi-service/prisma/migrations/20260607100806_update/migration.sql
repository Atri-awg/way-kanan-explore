-- CreateTable
CREATE TABLE "Destinasi" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "thumbnail" TEXT,
    "categoryId" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Destinasi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Destinasi_slug_key" ON "Destinasi"("slug");

-- CreateIndex
CREATE INDEX "Destinasi_slug_idx" ON "Destinasi"("slug");

-- CreateIndex
CREATE INDEX "Destinasi_categoryId_idx" ON "Destinasi"("categoryId");
