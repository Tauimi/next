# 🚀 Руководство по деплою TechnoMart на Vercel

## ✅ Предварительные требования

1. **Аккаунт Vercel** - зарегистрируйтесь на [vercel.com](https://vercel.com)
2. **Prisma Accelerate** - создайте проект на [console.prisma.io](https://console.prisma.io)
3. **База данных PostgreSQL** - через Prisma Data Platform

## 🔧 Пошаговая инструкция

### Шаг 1: Настройка Prisma Accelerate

1. Перейдите на [console.prisma.io](https://console.prisma.io)
2. Создайте новый проект
3. Выберите "Enable Accelerate"
4. Получите Connection String в формате:
   ```
   prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY
   ```

### Шаг 2: Настройка переменных окружения в Vercel

Перейдите в настройки вашего проекта в Vercel и добавьте:

```bash
# Обязательные переменные
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=YOUR_ACCELERATE_KEY"
NEXTAUTH_SECRET="ваш-секретный-ключ-минимум-32-символа"
NEXTAUTH_URL="https://your-app-name.vercel.app"
```

**Как сгенерировать NEXTAUTH_SECRET:**
```bash
# В терминале:
openssl rand -base64 32
```

### Шаг 3: Деплой на Vercel

#### Вариант A: Через Git

1. Залейте код в GitHub/GitLab
2. Подключите репозиторий к Vercel
3. Vercel автоматически запустит деплой

#### Вариант B: Через Vercel CLI

```bash
# Установка CLI
npm i -g vercel

# Деплой
vercel

# Или для production
vercel --prod
```

### Шаг 4: Инициализация базы данных

После успешного деплоя:

1. Перейдите на `https://your-app.vercel.app/api/force-init`
2. Дождитесь создания таблиц и тестовых данных
3. Проверьте `/auth/login` с данными:
   - Email: `admin@technomart.ru`
   - Пароль: `Admin123!`

## 🐛 Решение частых ошибок

### Ошибка: "Prisma Client not found"

**Решение:**
```bash
# В настройках проекта Vercel добавьте Build Command:
npm run vercel-build
```

### Ошибка: "Environment variables missing"

**Решение:**
1. Убедитесь что все переменные добавлены в Vercel
2. Проверьте правильность DATABASE_URL
3. Redeploy проект

### Ошибка: "Database connection failed"

**Решение:**
1. Проверьте Prisma Accelerate настройки
2. Убедитесь что API ключ правильный
3. Проверьте белый список IP в Prisma Console

### Ошибка: TypeScript/ESLint ошибки

**Решение:**
1. Запустите локально: `npm run build`
2. Исправьте все ошибки
3. Залейте изменения

## 📋 Чек-лист перед деплоем

- [ ] Все переменные окружения настроены
- [ ] Prisma Accelerate настроен и работает
- [ ] Локальная сборка проходит без ошибок (`npm run build`)
- [ ] Git репозиторий обновлен
- [ ] Domain настроен (опционально)

## 🔍 Полезные команды

```bash
# Локальная проверка сборки
npm run build

# Проверка TypeScript
npx tsc --noEmit

# Проверка ESLint
npm run lint

# Локальный запуск продакшен версии
npm run start
```

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь что все переменные окружения правильные
3. Проверьте статус Prisma Accelerate

## 🎯 Финальная проверка

После деплоя протестируйте:
- [ ] Главная страница загружается
- [ ] Каталог товаров работает
- [ ] Авторизация работает
- [ ] Корзина функционирует
- [ ] Поиск работает
- [ ] API endpoints отвечают

**Готово! 🎉 Ваш интернет-магазин TechnoMart развернут на Vercel!** 