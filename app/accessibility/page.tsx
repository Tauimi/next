import { Metadata } from 'next'
import { Eye, Type, Volume2, Settings, Monitor, Palette, KeyboardIcon } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Версия для слабовидящих - TechnoMart',
  description: 'Доступная версия сайта TechnoMart для людей с нарушениями зрения. Настройки для комфортного использования.',
}

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Версия для <span className="text-primary">слабовидящих</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Настройки для комфортного использования сайта
            </p>
          </div>
        </div>
      </section>

      {/* Accessibility Controls */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Настройки доступности</h2>
              <p className="text-xl text-muted-foreground">
                Настройте параметры для комфортного просмотра
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Font Size */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Type className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Размер шрифта</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Обычный (16px)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Крупный (20px)
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Очень крупный (24px)
                  </Button>
                </div>
              </div>

              {/* Color Scheme */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Palette className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Цветовая схема</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Обычная
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-black text-white hover:bg-gray-800">
                    Черно-белая
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-yellow-100 text-black hover:bg-yellow-200">
                    Желто-черная
                  </Button>
                </div>
              </div>

              {/* Contrast */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Контрастность</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Обычная
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Повышенная
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Максимальная
                  </Button>
                </div>
              </div>

              {/* Images */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Изображения</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Показывать все
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Скрыть декоративные
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Скрыть все
                  </Button>
                </div>
              </div>

              {/* Sound */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Volume2 className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Звуковые сигналы</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Включить
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Выключить
                  </Button>
                </div>
              </div>

              {/* Keyboard Navigation */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <KeyboardIcon className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">Навигация</h3>
                </div>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Подсветка фокуса
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Быстрые клавиши
                  </Button>
                </div>
              </div>
            </div>

            {/* Apply/Reset Buttons */}
            <div className="text-center mt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  <Settings className="w-5 h-5 mr-2" />
                  Применить настройки
                </Button>
                <Button size="lg" variant="outline">
                  Сбросить к умолчанию
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Горячие клавиши</h2>
              <p className="text-xl text-muted-foreground">
                Быстрая навигация с помощью клавиатуры
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Основная навигация</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Перейти к основному контенту</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Alt + C</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Перейти к меню</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Alt + M</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Перейти к поиску</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Alt + S</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Перейти к корзине</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Alt + K</kbd>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-6">Управление страницей</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Увеличить шрифт</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl + +</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Уменьшить шрифт</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl + -</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Сбросить масштаб</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Ctrl + 0</kbd>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Прокрутка вверх</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-sm">Home</kbd>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WCAG Compliance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Соответствие стандартам</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">WCAG 2.1</h3>
                <p className="text-muted-foreground">
                  Соответствие уровню AA международных стандартов веб-доступности
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Screen Reader</h3>
                <p className="text-muted-foreground">
                  Полная совместимость с программами чтения экрана
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <KeyboardIcon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Keyboard Only</h3>
                <p className="text-muted-foreground">
                  Полная навигация только с помощью клавиатуры
                </p>
              </div>
            </div>

            <div className="mt-12 bg-primary/10 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Нужна помощь?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Если у вас возникли трудности с использованием сайта, 
                свяжитесь с нашей службой поддержки
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg">
                  Телефон: +7 (800) 123-45-67
                </Button>
                <Button size="lg" variant="outline">
                  Email: support@technomart.ru
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 