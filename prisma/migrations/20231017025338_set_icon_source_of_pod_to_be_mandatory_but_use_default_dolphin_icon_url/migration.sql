/*
  Warnings:

  - Made the column `iconSource` on table `Pod` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Pod" ALTER COLUMN "iconSource" SET NOT NULL;
