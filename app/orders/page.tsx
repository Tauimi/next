import { Metadata } from 'next'
import { Package, Clock, CheckCircle, XCircle, Truck, Eye, RotateCcw, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Мои заказы - TechnoMart',
  description: 'История заказов в TechnoMart. Отслеживание статуса, повторные заказы, скачивание документов.',
}

const orderStatuses = {
  pending: { label: 'Обрабатывается', icon: Clock, color: 'text-amber-600 bg-amber-50 border-amber-200' },
  confirmed: { label: 'Подтвержден', icon: CheckCircle, color: 'text-blue-600 bg-blue-50 border-blue-200' },
  shipped: { label: 'Отправлен', icon: Truck, color: 'text-purple-600 bg-purple-50 border-purple-200' },
  delivered: { label: 'Доставлен', icon: CheckCircle, color: 'text-green-600 bg-green-50 border-green-200' },
  cancelled: { label: 'Отменен', icon: XCircle, color: 'text-red-600 bg-red-50 border-red-200' }
}

const mockOrders = [
  {
    id: 'ORD-2024-001234',
    date: '15.01.2024',
    status: 'delivered',
    total: 89990,
    items: [
      { name: 'iPhone 15 Pro 256GB', quantity: 1, price: 89990, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=100&h=100&fit=crop' }
    ],
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-2024-001233',
    date: '10.01.2024',
    status: 'shipped',
    total: 125500,
    items: [
      { name: 'MacBook Air M2', quantity: 1, price: 119990, image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100&h=100&fit=crop' },
      { name: 'Чехол для MacBook', quantity: 1, price: 5510, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=100&h=100&fit=crop' }
    ],
    trackingNumber: 'TRK123456788',
    estimatedDelivery: '18.01.2024'
  },
  {
    id: 'ORD-2024-001232',
    date: '05.01.2024',
    status: 'pending',
    total: 15990,
    items: [
      { name: 'AirPods Pro 2', quantity: 1, price: 15990, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'ORD-2023-001231',
    date: '28.12.2023',
    status: 'delivered',
    total: 45990,
    items: [
      { name: 'iPad Air 64GB', quantity: 1, price: 45990, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=100&h=100&fit=crop' }
    ],
    trackingNumber: 'TRK123456787'
  },
  {
    id: 'ORD-2023-001230',
    date: '20.12.2023',
    status: 'cancelled',
    total: 25990,
    items: [
      { name: 'Apple Watch Series 9', quantity: 1, price: 25990, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=100&h=100&fit=crop' }
    ]
  }
]

const statusFilters = [
  { key: 'all', label: 'Все заказы', count: mockOrders.length },
  { key: 'pending', label: 'В обработке', count: mockOrders.filter(o => o.status === 'pending').length },
  { key: 'shipped', label: 'Отправлены', count: mockOrders.filter(o => o.status === 'shipped').length },
  { key: 'delivered', label: 'Доставлены', count: mockOrders.filter(o => o.status === 'delivered').length }
]

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Мои <span className="text-primary">заказы</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              История покупок и отслеживание доставки
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockOrders.length}
                </div>
                <div className="text-sm text-muted-foreground">Всего заказов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockOrders.reduce((sum, order) => sum + order.total, 0).toLocaleString()} ₽
                </div>
                <div className="text-sm text-muted-foreground">Общая сумма</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockOrders.filter(o => o.status === 'delivered').length}
                </div>
                <div className="text-sm text-muted-foreground">Доставлено</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {mockOrders.filter(o => o.status === 'shipped' || o.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">В процессе</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-3">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.key}
                  variant={filter.key === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className="rounded-full"
                >
                  {filter.label} ({filter.count})
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {mockOrders.map((order) => {
              const status = orderStatuses[order.status as keyof typeof orderStatuses]
              
              return (
                <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
                  {/* Order Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <p className="text-muted-foreground">от {order.date}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`px-3 py-1 rounded-full border text-sm font-medium ${status.color}`}>
                        <status.icon className="w-4 h-4 inline mr-1" />
                        {status.label}
                      </div>
                      <div className="text-lg font-bold">
                        {order.total.toLocaleString()} ₽
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-muted-foreground">Количество: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{item.price.toLocaleString()} ₽</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Info */}
                  {order.trackingNumber && (
                    <div className="bg-muted/30 rounded-lg p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Трек-номер: {order.trackingNumber}</div>
                          {order.estimatedDelivery && (
                            <div className="text-sm text-muted-foreground">
                              Ожидаемая доставка: {order.estimatedDelivery}
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Truck className="w-4 h-4 mr-2" />
                          Отследить
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      Подробнее
                    </Button>
                    
                    {order.status === 'delivered' && (
                      <>
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Повторить заказ
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Скачать чек
                        </Button>
                      </>
                    )}
                    
                    {order.status === 'pending' && (
                      <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                        <XCircle className="w-4 h-4 mr-2" />
                        Отменить
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Empty State - если заказов нет */}
      {mockOrders.length === 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">У вас пока нет заказов</h2>
              <p className="text-muted-foreground mb-8">
                Начните покупки в нашем каталоге
              </p>
              <Button size="lg">
                Перейти в каталог
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  )
} 