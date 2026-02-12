/*
  Warnings:

  - You are about to drop the column `userId` on the `key_stores` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `key_stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "key_stores" DROP CONSTRAINT "key_stores_userId_fkey";

-- AlterTable
ALTER TABLE "key_stores" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "key_stores" ADD CONSTRAINT "key_stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
