/*
  Warnings:

  - A unique constraint covering the columns `[website_url]` on the table `companies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `companies_website_url_key` ON `companies`(`website_url`);
