-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "lvl" INTEGER NOT NULL,
    "xp" INTEGER NOT NULL,
    "gold" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Account_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Planet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "id_account" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Planet_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "Account" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Planet_Block" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_planet" INTEGER NOT NULL,
    "id_block" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Planet_Block_id_planet_fkey" FOREIGN KEY ("id_planet") REFERENCES "Planet" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Planet_Block_id_block_fkey" FOREIGN KEY ("id_block") REFERENCES "Block" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Block" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Building" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Planet_Building" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_planet_block" INTEGER NOT NULL,
    "id_building" INTEGER NOT NULL,
    "crdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Planet_Building_id_planet_block_fkey" FOREIGN KEY ("id_planet_block") REFERENCES "Planet_Block" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Planet_Building_id_building_fkey" FOREIGN KEY ("id_building") REFERENCES "Building" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_id_user_key" ON "Account"("id_user");

-- CreateIndex
CREATE UNIQUE INDEX "Planet_name_key" ON "Planet"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Block_name_key" ON "Block"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Block_image_key" ON "Block"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Building_name_key" ON "Building"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Building_image_key" ON "Building"("image");
