import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  productId: string
  quantity: number
  product: {
    id: string
    name: string
    slug: string
    price: number
    originalPrice?: number
    discount?: number
    inStock: boolean
    images?: Array<{ url: string; alt?: string }>
    category?: { name: string }
  }
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
  isLoading: boolean

  // Actions
  addItem: (item: CartItem) => void
  addToCart: (productId: string, quantity?: number) => Promise<void>
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  setItems: (items: CartItem[]) => void
  setLoading: (loading: boolean) => void
  
  // Computed
  getItemQuantity: (productId: string) => number
  isInCart: (productId: string) => boolean
}

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  return { totalItems, totalAmount }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalAmount: 0,
      isLoading: false,

      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find(item => item.productId === newItem.productId)

        let updatedItems: CartItem[]

        if (existingItem) {
          // Обновляем количество существующего товара
          updatedItems = items.map(item =>
            item.productId === newItem.productId
              ? { ...item, quantity: item.quantity + newItem.quantity }
              : item
          )
        } else {
          // Добавляем новый товар
          updatedItems = [...items, newItem]
        }

        const { totalItems, totalAmount } = calculateTotals(updatedItems)
        set({ items: updatedItems, totalItems, totalAmount })
      },

      addToCart: async (productId, quantity = 1) => {
        set({ isLoading: true })
        
        try {
          const response = await fetch('/api/cart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ productId, quantity })
          })
          
          const data = await response.json()
          
          if (!response.ok) {
            throw new Error(data.error || 'Ошибка добавления товара в корзину')
          }

          // Обновляем локальное состояние
          if (data.data) {
            get().addItem(data.data)
          }
        } catch (error) {
          console.error('Add to cart error:', error)
          throw error
        } finally {
          set({ isLoading: false })
        }
      },

      removeItem: (productId) => {
        const items = get().items
        const updatedItems = items.filter(item => item.productId !== productId)
        const { totalItems, totalAmount } = calculateTotals(updatedItems)
        set({ items: updatedItems, totalItems, totalAmount })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        const items = get().items
        const updatedItems = items.map(item =>
          item.productId === productId
            ? { ...item, quantity }
            : item
        )

        const { totalItems, totalAmount } = calculateTotals(updatedItems)
        set({ items: updatedItems, totalItems, totalAmount })
      },

      clearCart: () => {
        set({ items: [], totalItems: 0, totalAmount: 0 })
      },

      setItems: (items) => {
        const { totalItems, totalAmount } = calculateTotals(items)
        set({ items, totalItems, totalAmount })
      },

      setLoading: (isLoading) => set({ isLoading }),

      getItemQuantity: (productId) => {
        const item = get().items.find(item => item.productId === productId)
        return item ? item.quantity : 0
      },

      isInCart: (productId) => {
        return get().items.some(item => item.productId === productId)
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        totalAmount: state.totalAmount,
      }),
    }
  )
) 