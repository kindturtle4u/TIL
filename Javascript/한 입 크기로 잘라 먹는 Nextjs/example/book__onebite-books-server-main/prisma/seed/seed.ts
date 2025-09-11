import { PrismaClient } from "@prisma/client";
import { seedData } from "./data";
import { removeWhitespace } from "src/util/remove-whitepsace";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function truncateAllTable() {
  const schema = process.env.SCHEMA || "public";
  const tablenames = await prisma.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname=${schema}`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter((name) => name !== "_prisma_migrations")
    .map((name) => `"${schema}"."${name}"`)
    .join(", ");

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} RESTART IDENTITY;`);
  } catch (error) {
    console.log({ error });
  }
}

async function createSeedData() {
  const reviewSeedData = seedData.reduce((acc, book, idx) => {
    acc.push(...book.reviews.map((review) => ({ ...review, bookId: idx + 1 })));
    return acc;
  }, []);

  const bookSeedData = seedData.map((book) => {
    delete book.reviews;
    book["searchIndex"] = removeWhitespace([book.title, book.author, book.subTitle]);
    return book;
  });

  await prisma.book.createMany({
    data: bookSeedData,
  });

  await prisma.review.createMany({
    data: reviewSeedData,
  });
}

async function main() {
  await truncateAllTable();
  await createSeedData();
}

main();
