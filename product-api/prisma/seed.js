
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Laptop', price: 1500, description: 'A high-performance laptop', category: 'Electronics' },
      { name: 'Headphones', price: 200, description: 'Noise-cancelling headphones', category: 'Accessories' },
      { name: 'Smartphone', price: 999, description: 'Latest model smartphone', category: 'Electronics' },
      { name: 'Backpack', price: 50, description: 'Durable travel backpack', category: 'Accessories' },
      {
        name: 'Smartphone XYZ',
        price: 299.99,
        description: 'Um smartphone com recursos avançados e design moderno.',
        category: 'Electronics',
      },
      {
        name: 'Cabo USB-C',
        price: 19.99,
        description: 'Cabo USB-C de alta qualidade para carregamento e transferência de dados.',
        category: 'Accessories',
      },
      {
        name: 'Fones de Ouvido Bluetooth',
        price: 89.99,
        description: 'Fones de ouvido sem fio com som de alta qualidade.',
        category: 'Accessories',
      },
      {
        name: 'Laptop UltraSlim',
        price: 899.99,
        description: 'Um laptop leve e potente para trabalhar e jogar.',
        category: 'Electronics',
      },
      {
        name: 'Câmera DSLR',
        price: 599.99,
        description: 'Câmera profissional para capturar fotos incríveis.',
        category: 'Electronics',
      },
      {
        name: 'Suporte para Celular',
        price: 14.99,
        description: 'Suporte ajustável para celular, ideal para uso em casa ou escritório.',
        category: 'Accessories',
      },
      {
        name: 'Mouse Gamer',
        price: 49.99,
        description: 'Mouse para gamers com alta precisão e design ergonômico.',
        category: 'Accessories',
      },
      {
        name: 'Teclado Mecânico',
        price: 129.99,
        description: 'Teclado mecânico com retroiluminação RGB.',
        category: 'Accessories',
      },
      {
        name: 'Monitor 4K',
        price: 399.99,
        description: 'Monitor 4K com excelente qualidade de imagem.',
        category: 'Electronics',
      },
      {
        name: 'Carregador Solar',
        price: 29.99,
        description: 'Carregador solar portátil para smartphones e outros dispositivos.',
        category: 'Accessories',
      },
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
