-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Review_destinationId_idx" ON "Review"("destinationId");

-- CreateIndex
CREATE INDEX "Review_rating_idx" ON "Review"("rating");
