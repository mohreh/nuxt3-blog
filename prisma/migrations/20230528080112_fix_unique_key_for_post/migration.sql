/*
  Warnings:

  - A unique constraint covering the columns `[slug,authorId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Post_title_authorId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_authorId_key" ON "Post"("slug", "authorId");
