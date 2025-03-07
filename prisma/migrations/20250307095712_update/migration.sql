/*
  Warnings:

  - The primary key for the `upvotes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `upvotes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "upvotes_pkey" PRIMARY KEY ("issueId", "userId");
