/*
  Warnings:

  - You are about to drop the column `addrees2` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `addrees2`,
    ADD COLUMN `address2` VARCHAR(191) NULL;
