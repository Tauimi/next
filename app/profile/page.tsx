'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit3, Settings, Bell, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAuthStore } from '@/store/auth'

const mockUser = {
  name: 'Алексей Петров',
  email: 'alexey.petrov@example.com',
  phone: '+7 (925) 123-45-67',
  birthDate: '15.03.1990',
  registrationDate: '12.01.2023',
  address: 'г. Москва, ул. Тверская, д. 12, кв. 45',
  totalOrders: 17,
  totalSpent: 245600,
  favoriteItems: 23,
  bonusPoints: 1250
}

const profileSections = [
  {
    title: 'Личная информация',
    icon: User,
    items: [
      { label: 'Имя', value: mockUser.name, editable: true },
      { label: 'Email', value: mockUser.email, editable: true },
      { label: 'Телефон', value: mockUser.phone, editable: true },
      { label: 'Дата рождения', value: mockUser.birthDate, editable: true }
    ]
  },
  {
    title: 'Адрес доставки',
    icon: MapPin,
    items: [
      { label: 'Основной адрес', value: mockUser.address, editable: true },
      { label: 'Дополнительный адрес', value: 'Не указан', editable: true }
    ]
  },
  {
    title: 'Аккаунт',
    icon: Shield,
    items: [
      { label: 'Дата регистрации', value: mockUser.registrationDate, editable: false },
      { label: 'Статус', value: 'Верифицирован', editable: false },
      { label: 'Подписка на новости', value: 'Включена', editable: true }
    ]
  }
]

const quickActions = [
  {
    title: 'Заказы',
    description: 'Посмотреть историю заказов',
    icon: Settings,
    href: '/orders',
    count: mockUser.totalOrders
  },
  {
    title: 'Избранное',
    description: 'Сохраненные товары',
    icon: User,
    href: '/wishlist',
    count: mockUser.favoriteItems
  },
  {
    title: 'Бонусы',
    description: 'Накопленные баллы',
    icon: CreditCard,
    href: '/profile/bonuses',
    count: mockUser.bonusPoints
  },
  {
    title: 'Уведомления',
    description: 'Настройки уведомлений',
    icon: Bell,
    href: '/profile/notifications',
    count: 0
  }
]

export default function ProfilePage() {
  const { user } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth/login?redirect=/profile')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Перенаправление...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Добро пожаловать!</h1>
                <p className="text-xl text-muted-foreground">
                  Управляйте своим профилем и заказами
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockUser.totalOrders}
                </div>
                <div className="text-sm text-muted-foreground">Заказов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockUser.totalSpent.toLocaleString()} ₽
                </div>
                <div className="text-sm text-muted-foreground">Потрачено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockUser.favoriteItems}
                </div>
                <div className="text-sm text-muted-foreground">В избранном</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockUser.bonusPoints}
                </div>
                <div className="text-sm text-muted-foreground">Бонусов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Information */}
              <div className="lg:col-span-2 space-y-6">
                {profileSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-white rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <section.icon className="w-4 h-4 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold">{section.title}</h2>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Редактировать
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-muted/50 last:border-0">
                          <div className="font-medium text-muted-foreground">
                            {item.label}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              {item.value}
                            </div>
                            {item.editable && (
                              <Edit3 className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Password Change */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">Безопасность</h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Текущий пароль</label>
                      <Input type="password" placeholder="Введите текущий пароль" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Новый пароль</label>
                      <Input type="password" placeholder="Введите новый пароль" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Подтвердите пароль</label>
                      <Input type="password" placeholder="Повторите новый пароль" />
                    </div>
                    <Button className="w-full">
                      Изменить пароль
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Быстрые действия</h3>
                  <div className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Link
                        key={index}
                        href={action.href}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <action.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium group-hover:text-primary transition-colors">
                              {action.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {action.description}
                            </div>
                          </div>
                        </div>
                        {action.count > 0 && (
                          <div className="text-sm font-medium text-primary">
                            {action.count}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bonus Card */}
                <div className="bg-gradient-to-br from-primary to-accent text-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">Бонусная карта</h3>
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">
                      {mockUser.bonusPoints.toLocaleString()} баллов
                    </div>
                    <div className="text-sm opacity-90">
                      = {(mockUser.bonusPoints * 1).toLocaleString()} ₽
                    </div>
                    <div className="text-xs opacity-75">
                      Следующий уровень: Premium (осталось 750 баллов)
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-white/20 rounded-full">
                    <div className="h-full bg-white rounded-full w-3/5"></div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4">Нужна помощь?</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Позвонить в поддержку
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Написать сообщение
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 