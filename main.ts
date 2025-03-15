import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const accountWithProfile = await prisma.account.create({
    data: {
      email: "janna@testemail.com",
      username: "jannabanana2025",
      password: "securepassword",
      profile: {
        create: {
          firstname: "Janna",
          lastname: "Rolls",
          middlename: "M.",
          bio: "A small girl with a big purpose and goal.",
        },
      },
    },
    include: { profile: true },
  });

  console.log("✅ Created Account with Profile:", accountWithProfile);

  const accountId = accountWithProfile.id;
  const newModule = await prisma.module.create({
    data: {
      accountCode: accountId,
      moduleCode: "IT3101",
      moduleDetails: "Prisma",
      moduleDesc: "Basic introduction to Prisma",
    },
  });

  console.log("✅ Added Module:", newModule);

  const accounts = await prisma.account.findMany({
    include: {
      profile: true,
      modules: true,
    },
  });

  console.log("✅ Retrieved Accounts with Profiles & Modules:");
  console.dir(accounts, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
