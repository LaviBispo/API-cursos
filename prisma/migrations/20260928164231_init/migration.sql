-- CreateTable
CREATE TABLE "Instrutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instrutorId" INTEGER,
    CONSTRAINT "Cursos_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "Instrutor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Instrutor_email_key" ON "Instrutor"("email");
