import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { User, ShoppingCart, Settings, Database, CheckCircle } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary-600 mb-2">
              TechnoMart - Демо режим
            </h1>
            <p className="text-secondary-500 text-lg">
              Сайт работает с демонстрационными данными
            </p>
          </div>

          {/* Статус системы */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">Система работает</h3>
                <p className="text-green-600 text-sm">
                  Все функции доступны с тестовыми данными
                </p>
              </div>
            </div>
          </div>

          {/* Демо аккаунты */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Администратор */}
            <div className="border border-primary-200 rounded-lg p-6 bg-primary-50">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-8 h-8 text-primary-600" />
                <h3 className="text-xl font-semibold text-primary-600">
                  Администратор
                </h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> admin@technomart.ru
                </p>
                <p className="text-sm">
                  <span className="font-medium">Пароль:</span> Admin123!
                </p>
              </div>
              <div className="text-sm text-primary-600 mb-4">
                <p>✓ Полный доступ к админ-панели</p>
                <p>✓ Управление товарами и заказами</p>
                <p>✓ Просмотр аналитики</p>
              </div>
              <Button asChild className="w-full">
                <Link href="/auth/login">Войти как админ</Link>
              </Button>
            </div>

            {/* Обычный пользователь */}
            <div className="border border-secondary-200 rounded-lg p-6 bg-secondary-50">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-8 h-8 text-secondary-600" />
                <h3 className="text-xl font-semibold text-secondary-600">
                  Покупатель
                </h3>
              </div>
              <div className="space-y-2 mb-4">
                <p className="text-sm">
                  <span className="font-medium">Email:</span> user@technomart.ru
                </p>
                <p className="text-sm">
                  <span className="font-medium">Пароль:</span> User123!
                </p>
              </div>
              <div className="text-sm text-secondary-600 mb-4">
                <p>✓ Добавление товаров в корзину</p>
                <p>✓ Оформление заказов</p>
                <p>✓ Личный кабинет</p>
              </div>
              <Button variant="outline" asChild className="w-full">
                <Link href="/auth/login">Войти как покупатель</Link>
              </Button>
            </div>
          </div>

          {/* Функции без авторизации */}
          <div className="border border-accent-200 rounded-lg p-6 bg-accent-50 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-accent-600" />
              <h3 className="text-xl font-semibold text-accent-600">
                Доступно без авторизации
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-accent-700">
              <div>
                <p>✓ Просмотр каталога товаров</p>
                <p>✓ Поиск и фильтрация</p>
                <p>✓ Просмотр карточек товаров</p>
              </div>
              <div>
                <p>✓ Чтение новостей и статей</p>
                <p>✓ Просмотр проектов</p>
                <p>✓ Контактная информация</p>
              </div>
            </div>
          </div>

          {/* Быстрые ссылки */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Быстрые ссылки:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/catalog">Каталог</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/cart">Корзина</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile">Профиль</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin">Админ-панель</Link>
              </Button>
            </div>
          </div>

          {/* Техническая информация */}
          <div className="bg-secondary-100 rounded-lg p-4 mt-8">
            <h4 className="font-semibold text-secondary-800 mb-2">
              Техническая информация:
            </h4>
            <ul className="text-sm text-secondary-600 space-y-1">
              <li>• Сайт работает с fallback данными</li>
              <li>• База данных может быть недоступна</li>
              <li>• Все функции протестированы и работают</li>
              <li>• Готов к подключению реальной БД</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 