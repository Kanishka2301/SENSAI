/*
  Warnings:

  - You are about to drop the column `jobdescription` on the `CoverLetter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "jobdescription",
ADD COLUMN     "jobDescription" TEXT;
