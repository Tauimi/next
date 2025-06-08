# 🗄️ Настройка базы данных TechnoMart

## 📋 Пошаговая инструкция

### 1. Переименуйте файл окружения
```bash
# Переименуйте env-example.txt в .env.local
mv env-example.txt .env.local
```

### 2. Настройка Vercel Postgres

#### 2.1. Создайте базу данных в Vercel:
1. Откройте [Vercel Dashboard](https://vercel.com/dashboard)
2. Перейдите в ваш проект TechnoMart
3. Откройте вкладку **Storage**
4. Нажмите **Create Database**
5. Выберите **Postgres**
6. Выберите регион (рекомендуется: Frankfurt)
7. Нажмите **Create**

#### 2.2. Скопируйте переменные окружения:
1. В созданной БД откройте вкладку **Settings**
2. Найдите секцию **Environment Variables**
3. Нажмите **Show secret** и скопируйте все переменные
4. Вставьте их в файл `.env.local`

Ваш `.env.local` должен выглядеть так:
```env
# Database (Vercel Postgres)
POSTGRES_URL="postgres://username:password@host:port/database"
POSTGRES_PRISMA_URL="postgres://username:password@host:port/database?pgbouncer=true&connect_timeout=15"
POSTGRES_URL_NON_POOLING="postgres://username:password@host:port/database"
POSTGRES_USER="username"
POSTGRES_HOST="host"
POSTGRES_PASSWORD="password"
POSTGRES_DATABASE="database"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

#### 2.3. Сгенерируйте NEXTAUTH_SECRET:
```bash
# В терминале выполните:
openssl rand -base64 32
# Или используйте онлайн генератор: https://generate-secret.vercel.app/32
```

### 3. Установка зависимостей
```bash
npm install
```

### 4. Генерация Prisma клиента
```bash
npx prisma generate
```

### 5. Применение миграций
```bash
npx prisma db push
```

### 6. Инициализация БД с тестовыми данными

#### Локально:
```bash
# Запустите сервер разработки
npm run dev

# В другом терминале выполните:
curl -X POST http://localhost:3000/api/setup-db
```

#### На Vercel (после деплоя):
```bash
curl -X POST https://your-project.vercel.app/api/setup-db
```

## 📊 Что создастся в БД:

### 👤 Администратор:
- **Email:** admin@technomart.ru
- **Пароль:** Admin123!
- **Роль:** Администратор

### 📁 Категории:
- Смартфоны (smartphones)
- Ноутбуки (laptops)
- Телевизоры (tvs)

### 🏷️ Бренды:
- Apple
- Samsung
- Sony

### 📱 Тестовые товары:
- iPhone 15 Pro (89,990₽)
- MacBook Air M2 (119,990₽)
- Samsung QLED 65" QN90B (159,990₽)

## 🔍 Проверка состояния БД

### Проверить подключение:
```bash
curl http://localhost:3000/api/setup-db
```

Ответ:
```json
{
  "success": true,
  "message": "Database connection successful",
  "stats": {
    "users": 1,
    "products": 3,
    "categories": 3,
    "brands": 3
  }
}
```

## 🛠️ Prisma Studio (для отладки)

Откройте веб-интерфейс для просмотра данных:
```bash
npx prisma studio
```

Откроется по адресу: http://localhost:5555

## 🔄 Сброс БД (если нужно)

```bash
# Удалить все данные
npx prisma db push --force-reset

# Снова инициализировать
curl -X POST http://localhost:3000/api/setup-db
```

## ⚠️ Важные замечания:

1. **Безопасность:** Никогда не коммитьте `.env.local` в Git
2. **Пароли:** Измените пароль администратора после первого входа
3. **Продакшн:** В продакшне используйте сильные пароли
4. **Бэкапы:** Настройте регулярные бэкапы БД в Vercel

## 🐛 Решение проблем:

### Ошибка подключения:
- Проверьте правильность переменных окружения
- Убедитесь, что БД создана в Vercel
- Проверьте права доступа

### Ошибка миграций:
```bash
# Пересоздайте схему
npx prisma db push --force-reset
```

### Ошибка инициализации:
- Проверьте логи в консоли браузера
- Убедитесь, что все зависимости установлены
- Проверьте API маршрут `/api/setup-db`

## 📞 Поддержка:

Если возникли проблемы:
1. Проверьте логи Vercel
2. Откройте Prisma Studio для просмотра данных
3. Проверьте переменные окружения 