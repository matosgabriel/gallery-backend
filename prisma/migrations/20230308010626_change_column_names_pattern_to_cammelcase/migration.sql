/*
  Warnings:

  - You are about to drop the column `created_at` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `album_id` on the `AlbumFile` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `AlbumFile` table. All the data in the column will be lost.
  - You are about to drop the column `file_id` on the `AlbumFile` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `AlbumFile` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `File` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumId` to the `AlbumFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileId` to the `AlbumFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `AlbumFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AlbumFile" DROP CONSTRAINT "AlbumFile_album_id_fkey";

-- DropForeignKey
ALTER TABLE "AlbumFile" DROP CONSTRAINT "AlbumFile_file_id_fkey";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "AlbumFile" DROP COLUMN "album_id",
DROP COLUMN "created_at",
DROP COLUMN "file_id",
DROP COLUMN "updated_at",
ADD COLUMN     "albumId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "File" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "AlbumFile" ADD CONSTRAINT "AlbumFile_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumFile" ADD CONSTRAINT "AlbumFile_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
