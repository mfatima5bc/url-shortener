/*
  Warnings:

  - A unique constraint covering the columns `[originalLink]` on the table `links` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "links_originalLink_key" ON "links"("originalLink");
