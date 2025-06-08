import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        success: false,
        error: 'Запрос должен содержать минимум 2 символа'
      }, { status: 400 })
    }

    const searchTerm = query.trim()

    // Поиск товаров
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { isActive: true },
          {
            OR: [
              {
                name: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              },
              {
                description: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              },
              {
                sku: {
                  contains: searchTerm,
                  mode: 'insensitive'
                }
              },
              {
                category: {
                  name: {
                    contains: searchTerm,
                    mode: 'insensitive'
                  }
                }
              },
              {
                brand: {
                  name: {
                    contains: searchTerm,
                    mode: 'insensitive'
                  }
                }
              }
            ]
          }
        ]
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        brand: {
          select: {
            id: true,
            name: true,
            slug: true
          }
        },
        images: {
          orderBy: {
            sortOrder: 'asc'
          },
          take: 1
        }
      },
      take: 50, // Ограничиваем количество результатов
      orderBy: [
        { isFeatured: 'desc' },
        { name: 'asc' }
      ]
    })

    // Вычисляем рейтинги для найденных товаров
    const productsWithRatings = await Promise.all(
      products.map(async (product) => {
        const reviews = await prisma.review.findMany({
          where: {
            productId: product.id,
            isApproved: true
          },
          select: {
            rating: true
          }
        })

        const averageRating = reviews.length > 0 
          ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
          : 0

        return {
          ...product,
          averageRating: Number(averageRating.toFixed(1)),
          totalReviews: reviews.length
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: productsWithRatings,
      total: productsWithRatings.length,
      query: searchTerm
    })
  } catch (error) {
    console.error('Ошибка поиска:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Внутренняя ошибка сервера' 
      },
      { status: 500 }
    )
  }
} 