-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "instrutorId" INTEGER NOT NULL,
    CONSTRAINT "Cursos_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "Instrutor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cursos" ("description", "id", "instrutorId", "title") SELECT "description", "id", "instrutorId", "title" FROM "Cursos";
DROP TABLE "Cursos";
ALTER TABLE "new_Cursos" RENAME TO "Cursos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
