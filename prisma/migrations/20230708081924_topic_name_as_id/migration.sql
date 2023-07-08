/*
  Warnings:

  - The primary key for the `Topic` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Topic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_PostToTopic" DROP CONSTRAINT "_PostToTopic_B_fkey";

-- AlterTable
ALTER TABLE "Topic" DROP CONSTRAINT "Topic_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Topic_pkey" PRIMARY KEY ("name");

-- AlterTable
ALTER TABLE "_PostToTopic" ALTER COLUMN "B" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- AddForeignKey
ALTER TABLE "_PostToTopic" ADD CONSTRAINT "_PostToTopic_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("name") ON DELETE CASCADE ON UPDATE CASCADE;
