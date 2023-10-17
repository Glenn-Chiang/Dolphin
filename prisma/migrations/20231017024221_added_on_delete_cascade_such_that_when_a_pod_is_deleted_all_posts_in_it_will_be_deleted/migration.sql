-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_podId_fkey";

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_podId_fkey" FOREIGN KEY ("podId") REFERENCES "Pod"("id") ON DELETE CASCADE ON UPDATE CASCADE;
