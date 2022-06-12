-- CreateEnum
CREATE TYPE "Category" AS ENUM ('ELECTRONICS', 'JEWELLERY', 'WATER_BOTTLE', 'PERSONAL_CARDS', 'STUDENT_CARDS', 'CLOTHING', 'WALLET', 'BAG', 'MISCELLANEOUS');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categories" "Category"[],

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
