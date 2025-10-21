/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Event` DROP FOREIGN KEY `Event_userId_fkey`;

-- AlterTable
ALTER TABLE `Event` ADD COLUMN `eventFeaturesEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `eventPassword` VARCHAR(191) NULL,
    ADD COLUMN `guestlistEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `imageGalleryEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `imageGalleryUrls` TEXT NULL,
    ADD COLUMN `isPasswordProtected` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isRecurringSeries` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `shortSummary` TEXT NULL,
    ADD COLUMN `showOnExplore` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `timezone` VARCHAR(191) NOT NULL DEFAULT 'GMT -5',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `venueName` VARCHAR(191) NULL,
    ADD COLUMN `youtubeVideoEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `youtubeVideoUrl` VARCHAR(191) NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    ADD COLUMN `emailVerified` DATETIME(3) NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id` VARCHAR(191) NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `grossPrice` DOUBLE NOT NULL DEFAULT 0,
    `displayPrice` VARCHAR(191) NOT NULL DEFAULT 'Free',
    `quantity` INTEGER NULL,
    `isUnlimited` BOOLEAN NOT NULL DEFAULT true,
    `limitSalesPeriod` BOOLEAN NOT NULL DEFAULT false,
    `salesStartDate` DATETIME(3) NULL,
    `salesEndDate` DATETIME(3) NULL,
    `limitTicketValidity` BOOLEAN NOT NULL DEFAULT false,
    `validityStartDate` DATETIME(3) NULL,
    `validityEndDate` DATETIME(3) NULL,
    `limitPurchaseQuantity` BOOLEAN NOT NULL DEFAULT false,
    `minPurchaseQuantity` INTEGER NULL,
    `maxPurchaseQuantity` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Ticket_eventId_idx`(`eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
