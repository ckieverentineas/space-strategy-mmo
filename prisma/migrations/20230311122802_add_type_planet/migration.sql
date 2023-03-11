/*
  Warnings:

  - You are about to drop the column `id_planet` on the `Planet_Block` table. All the data in the column will be lost.
  - You are about to drop the column `id_account` on the `Planet` table. All the data in the column will be lost.
  - Added the required column `id_planet_owner` to the `Planet_Block` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Planet` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Planet_Owner" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "id_planet" INTEGER NOT NULL,
    "id_account" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Planet_Owner_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Planet_Owner_id_planet_fkey" FOREIGN KEY ("id_planet") REFERENCES "Planet" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Planet_Block" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_planet_owner" INTEGER NOT NULL,
    "id_block" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Planet_Block_id_planet_owner_fkey" FOREIGN KEY ("id_planet_owner") REFERENCES "Planet_Owner" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Planet_Block_id_block_fkey" FOREIGN KEY ("id_block") REFERENCES "Block" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Planet_Block" ("crdate", "id", "id_block") SELECT "crdate", "id", "id_block" FROM "Planet_Block";
DROP TABLE "Planet_Block";
ALTER TABLE "new_Planet_Block" RENAME TO "Planet_Block";
CREATE TABLE "new_Planet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Planet" ("crdate", "id", "name") SELECT "crdate", "id", "name" FROM "Planet";
DROP TABLE "Planet";
ALTER TABLE "new_Planet" RENAME TO "Planet";
CREATE UNIQUE INDEX "Planet_name_key" ON "Planet"("name");
CREATE UNIQUE INDEX "Planet_image_key" ON "Planet"("image");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Planet_Owner_name_key" ON "Planet_Owner"("name");
