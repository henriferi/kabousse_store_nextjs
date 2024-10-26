
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Laptop', price: 1500, description: 'A high-performance laptop', category: 'Electronics' },
      { name: 'Headphones', price: 200, description: 'Noise-cancelling headphones', category: 'Accessories' },
      { name: 'Smartphone', price: 999, description: 'Latest model smartphone', category: 'Electronics' },
      { name: 'Backpack', price: 50, description: 'Durable travel backpack', category: 'Accessories' },
    ],
  });
}

main()
  .then(() => console.log("Seeding completed"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
