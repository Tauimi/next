# 🚀 Быстрая настройка TechnoMart

## 📋 Шаг 1: Создайте базу данных

### Вариант А: Prisma Cloud (рекомендуется)
1. Перейдите на: https://console.prisma.io/
2. Создайте новый проект с PostgreSQL базой данных
3. Скопируйте строку подключения (DATABASE_URL)

### Вариант Б: Vercel Postgres
1. В проекте Vercel перейдите в Storage → Create → Postgres
2. Скопируйте переменные окружения

## 📋 Шаг 2: Настройте окружение

Создайте файл `.env.local`:

```env
# Замените на вашу строку подключения
DATABASE_URL="postgresql://username:password@host:5432/database"

# Сгенерируйте случайную строку 32+ символов
NEXTAUTH_SECRET="your-random-secret-key-32-chars-minimum"
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