-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Game" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "round" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL,
    "firstTeamName" TEXT NOT NULL,
    "secondTeamName" TEXT NOT NULL,
    "firstTeamPoint" INTEGER,
    "secondTeamPoint" INTEGER,
    "stadium" TEXT NOT NULL
);
INSERT INTO "new_Game" ("date", "firstTeamCountryCode", "firstTeamName", "firstTeamPoint", "group", "id", "round", "secondTeamCountryCode", "secondTeamName", "secondTeamPoint", "stadium") SELECT "date", "firstTeamCountryCode", "firstTeamName", "firstTeamPoint", "group", "id", "round", "secondTeamCountryCode", "secondTeamName", "secondTeamPoint", "stadium" FROM "Game";
DROP TABLE "Game";
ALTER TABLE "new_Game" RENAME TO "Game";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
