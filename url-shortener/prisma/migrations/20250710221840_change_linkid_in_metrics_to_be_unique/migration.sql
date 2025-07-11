/*
  Warnings:

  - A unique constraint covering the columns `[linkId]` on the table `metrics` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "metrics_linkId_key" ON "metrics"("linkId");
