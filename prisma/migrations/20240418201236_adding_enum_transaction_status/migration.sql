-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('ERRORED', 'COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING';
