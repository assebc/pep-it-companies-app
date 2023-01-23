/*
  Warnings:

  - Added the required column `website_url` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `companies` ADD COLUMN `website_url` VARCHAR(191) NOT NULL;
