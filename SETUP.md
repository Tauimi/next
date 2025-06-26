# 🚀 Быстрая настройка TechnoMart

## 📋 Шаг 1: Создайте базу данных

### Вариант А: Vercel Postgres (рекомендуется)
1. Откройте: https://vercel.com/dashboard
2. Выберите/создайте ваш проект
3. Перейдите в **Storage** → **Create Database** → **Postgres**
4. Название: `technomart-db`, выберите регион
5. **Важно:** Скопируйте все переменные окружения из вкладки `.env.local`

### Вариант Б: Prisma Cloud
1. Перейдите на: https://console.prisma.io/
2. Создайте новый проект с PostgreSQL базой данных
3. Скопируйте строку подключения (DATABASE_URL)

## 📋 Шаг 2: Настройте окружение

Создайте файл `.env.local`:

**Для Vercel Postgres** (скопируйте переменные из Vercel Dashboard):
```env
# Vercel Postgres (скопируйте из Dashboard → Storage → ваша БД → .env.local)
POSTGRES_URL="postgres://..."
POSTGRES_PRISMA_URL="postgres://..."
POSTGRES_URL_NON_POOLING="postgres://..."
DATABASE_URL="postgres://..." # Используйте значение POSTGRES_PRISMA_URL

# Authentication
NEXTAUTH_SECRET="your-random-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
```

**Для других провайдеров:**
```env
# Обычная строка подключения
DATABASE_URL="postgresql://username:password@host:5432/database"
NEXTAUTH_SECRET="your-random-secret-32-chars-minimum"
NEXTAUTH_URL="http://localhost:3000"
```

## 📋 Шаг 3: Инициализация

```bash
# Установите зависимости
npm install

# Создайте схему базы данных
npx prisma db push

# Запустите проект
npm run dev
```

## 📋 Шаг 4: Заполните данными

Откройте в браузере: http://localhost:3000/api/force-init

## 🔑 Тестовые аккаунты

**Администратор:**
- Email: `admin@technomart.ru`
- Password: `Admin123!`

**Пользователь:**
- Email: `user@technomart.ru`
- Password: `User123!`

## 🚀 Деплой на Vercel

1. Загрузите проект на GitHub
2. Подключите репозиторий к Vercel
3. Добавьте переменные окружения в настройках Vercel
4. После деплоя откройте: `https://your-app.vercel.app/api/force-init`

## 🔧 Решение проблем

**Ошибки с таблицами:**
```bash
npx prisma db push --force-reset
```

**Переинициализация данных:**
```bash
curl -X POST https://your-app.vercel.app/api/force-init
```

**Проверка состояния базы:**
```bash
npx prisma studio
``` 