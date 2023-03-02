/*
  Warnings:

  - You are about to drop the `AlbumPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlbumPhoto" DROP CONSTRAINT "AlbumPhoto_album_id_fkey";

-- DropForeignKey
ALTER TABLE "AlbumPhoto" DROP CONSTRAINT "AlbumPhoto_file_id_fkey";

-- DropTable
DROP TABLE "AlbumPhoto";

-- CreateTable
CREATE TABLE "AlbumFile" (
    "id" TEXT NOT NULL,
    "album_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlbumFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlbumFile_id_key" ON "AlbumFile"("id");

-- AddForeignKey
ALTER TABLE "AlbumFile" ADD CONSTRAINT "AlbumFile_album_id_fkey" FOREIGN KEY ("album_id") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumFile" ADD CONSTRAINT "AlbumFile_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
