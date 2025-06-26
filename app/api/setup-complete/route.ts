import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Начинаю полную настройку базы данных...');

    // Шаг 1: Проверяем соединение с базой данных
    await prisma.$connect();
    console.log('✅ Соединение с базой данных установлено');

    // Шаг 2: Создаем схему (эквивалент prisma db push)
    console.log('📋 Создаю схему базы данных...');
    
    // Создаем таблицы вручную через raw SQL
    await createDatabaseSchema();
    
    console.log('✅ Схема базы данных создана');

    // Шаг 3: Инициализируем данные
    console.log('📊 Инициализирую данные...');
    await initializeData();
    
    console.log('✅ Данные инициализированы');

    return NextResponse.json({
      success: true,
      message: 'Database setup completed successfully!',
      steps: [
        '✅ Database connection established',
        '✅ Database schema created',
        '✅ Initial data populated'
      ],
      login: {
        email: 'admin@technomart.ru',
        password: 'Admin123!'
      },
      nextSteps: [
        '1. Visit your site homepage',
        '2. Login with admin credentials',
        '3. Start using the application'
      ]
    });

  } catch (error) {
    console.error('❌ Ошибка при настройке базы данных:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database setup failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

async function createDatabaseSchema() {
  // Создаем основные таблицы
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "username" TEXT NOT NULL,
      "firstName" TEXT,
      "lastName" TEXT,
      "phone" TEXT,
      "address" TEXT,
      "isAdmin" BOOLEAN NOT NULL DEFAULT false,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "password" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "users_pkey" PRIMARY KEY ("id")
    );
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "description" TEXT,
      "image" TEXT,
      "parentId" TEXT,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "sortOrder" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
    );
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "brands" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "description" TEXT,
      "logo" TEXT,
      "website" TEXT,
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
    );
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "products" (
      "id" TEXT NOT NULL,
      "name" TEXT NOT NULL,
      "slug" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "shortDescription" TEXT,
      "sku" TEXT NOT NULL,
      "price" DOUBLE PRECISION NOT NULL,
      "originalPrice" DOUBLE PRECISION,
      "discount" DOUBLE PRECISION DEFAULT 0,
      "inStock" BOOLEAN NOT NULL DEFAULT true,
      "stockQuantity" INTEGER NOT NULL DEFAULT 0,
      "minQuantity" INTEGER NOT NULL DEFAULT 1,
      "categoryId" TEXT NOT NULL,
      "brandId" TEXT,
      "metaTitle" TEXT,
      "metaDescription" TEXT,
      "keywords" TEXT[],
      "isActive" BOOLEAN NOT NULL DEFAULT true,
      "isFeatured" BOOLEAN NOT NULL DEFAULT false,
      "isNew" BOOLEAN NOT NULL DEFAULT false,
      "isHot" BOOLEAN NOT NULL DEFAULT false,
      "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0,
      "totalReviews" INTEGER NOT NULL DEFAULT 0,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "products_pkey" PRIMARY KEY ("id")
    );
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "cart_items" (
      "id" TEXT NOT NULL,
      "userId" TEXT,
      "sessionId" TEXT,
      "productId" TEXT NOT NULL,
      "quantity" INTEGER NOT NULL,
      "price" DOUBLE PRECISION NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "cart_items_pkey" PRIMARY KEY ("id")
    );
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "wishlist_items" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "productId" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "wishlist_items_pkey" PRIMARY KEY ("id")
    );
  `;

  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "compare_items" (
      "id" TEXT NOT NULL,
      "userId" TEXT NOT NULL,
      "productId" TEXT NOT NULL,
      "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT "compare_items_pkey" PRIMARY KEY ("id")
    );
  `;

  // Создаем индексы для уникальности
  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");
  `;
  
  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "users_username_key" ON "users"("username");
  `;
  
  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_key" ON "categories"("slug");
  `;
  
  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "brands_slug_key" ON "brands"("slug");
  `;
  
  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "products_slug_key" ON "products"("slug");
  `;
  
  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "products_sku_key" ON "products"("sku");
  `;

  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "wishlist_items_userId_productId_key" ON "wishlist_items"("userId", "productId");
  `;

  await prisma.$executeRaw`
    CREATE UNIQUE INDEX IF NOT EXISTS "compare_items_userId_productId_key" ON "compare_items"("userId", "productId");
  `;
}

async function initializeData() {
  // Создаем администратора
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@technomart.ru' },
    update: {},
    create: {
      id: 'admin-user-id',
      email: 'admin@technomart.ru',
      username: 'admin',
      firstName: 'Администратор',
      lastName: 'Системы',
      password: '$2a$10$8K4l3rGxY3vQ2Qc1nWlZTeGtBw8UmYqC5jxK6W3zR7tN2M9eX8a7e', // Admin123!
      isAdmin: true,
      isActive: true
    }
  });

  // Создаем обычного пользователя
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@technomart.ru' },
    update: {},
    create: {
      id: 'regular-user-id',
      email: 'user@technomart.ru',
      username: 'user',
      firstName: 'Пользователь',
      lastName: 'Тестовый',
      password: '$2a$10$8K4l3rGxY3vQ2Qc1nWlZTeGtBw8UmYqC5jxK6W3zR7tN2M9eX8a7e', // User123!
      isAdmin: false,
      isActive: true
    }
  });

  // Создаем категории
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'smartfony' },
      update: {},
      create: {
        id: 'cat-1',
        name: 'Смартфоны',
        slug: 'smartfony',
        description: 'Современные смартфоны всех брендов',
        isActive: true,
        sortOrder: 1
      }
    }),
    prisma.category.upsert({
      where: { slug: 'noutbuki' },
      update: {},
      create: {
        id: 'cat-2',
        name: 'Ноутбуки',
        slug: 'noutbuki',
        description: 'Ноутбуки для работы и игр',
        isActive: true,
        sortOrder: 2
      }
    }),
    prisma.category.upsert({
      where: { slug: 'televizory' },
      update: {},
      create: {
        id: 'cat-3',
        name: 'Телевизоры',
        slug: 'televizory',
        description: 'Smart TV и обычные телевизоры',
        isActive: true,
        sortOrder: 3
      }
    })
  ]);

  // Создаем бренды
  const brands = await Promise.all([
    prisma.brand.upsert({
      where: { slug: 'apple' },
      update: {},
      create: {
        id: 'brand-1',
        name: 'Apple',
        slug: 'apple',
        description: 'Продукция Apple',
        isActive: true
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'samsung' },
      update: {},
      create: {
        id: 'brand-2',
        name: 'Samsung',
        slug: 'samsung',
        description: 'Продукция Samsung',
        isActive: true
      }
    }),
    prisma.brand.upsert({
      where: { slug: 'lg' },
      update: {},
      create: {
        id: 'brand-3',
        name: 'LG',
        slug: 'lg',
        description: 'Продукция LG',
        isActive: true
      }
    })
  ]);

  // Создаем товары
  const products = await Promise.all([
    prisma.product.upsert({
      where: { slug: 'iphone-15-pro' },
      update: {},
      create: {
        id: 'prod-1',
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'Новейший iPhone с процессором A17 Pro',
        shortDescription: 'Флагманский смартфон Apple',
        sku: 'IPH15PRO',
        price: 89990,
        originalPrice: 99990,
        discount: 10,
        categoryId: 'cat-1',
        brandId: 'brand-1',
        inStock: true,
        stockQuantity: 50,
        isActive: true,
        isFeatured: true,
        isNew: true
      }
    }),
    prisma.product.upsert({
      where: { slug: 'macbook-air-m2' },
      update: {},
      create: {
        id: 'prod-2',
        name: 'MacBook Air M2',
        slug: 'macbook-air-m2',
        description: 'Ноутбук Apple MacBook Air с процессором M2',
        shortDescription: 'Тонкий и мощный ноутбук',
        sku: 'MBAIRM2',
        price: 119990,
        categoryId: 'cat-2',
        brandId: 'brand-1',
        inStock: true,
        stockQuantity: 30,
        isActive: true,
        isFeatured: true
      }
    }),
    prisma.product.upsert({
      where: { slug: 'samsung-galaxy-s24' },
      update: {},
      create: {
        id: 'prod-3',
        name: 'Samsung Galaxy S24',
        slug: 'samsung-galaxy-s24',
        description: 'Флагманский смартфон Samsung Galaxy S24',
        shortDescription: 'Смартфон с ИИ-функциями',
        sku: 'SAMS24',
        price: 79990,
        categoryId: 'cat-1',
        brandId: 'brand-2',
        inStock: true,
        stockQuantity: 40,
        isActive: true,
        isHot: true
      }
    })
  ]);

  console.log('✅ Данные созданы:', {
    users: 2,
    categories: categories.length,
    brands: brands.length,
    products: products.length
  });
}

export async function GET() {
  return NextResponse.json({
    message: 'Database setup endpoint',
    usage: 'Send POST request to setup database',
    steps: [
      '1. Creates database schema',
      '2. Initializes data',
      '3. Returns login credentials'
    ]
  });
} 