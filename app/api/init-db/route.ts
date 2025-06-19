import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🔄 Checking database connection and schema...')
    
    // Попробуем получить количество записей в каждой таблице
    let stats = {
      users: 0,
      categories: 0,
      brands: 0,
      products: 0,
      tables_exist: false
    }
    
    try {
      stats.users = await prisma.user.count()
      stats.categories = await prisma.category.count()  
      stats.brands = await prisma.brand.count()
      stats.products = await prisma.product.count()
      stats.tables_exist = true
      
      return NextResponse.json({
        success: true,
        message: 'Database schema exists and connection successful',
        stats,
        next_step: 'Tables exist! Now you can populate data by calling /api/setup-db'
      })
      
    } catch (error: any) {
      console.log('Tables do not exist or connection failed:', error.message)
      
      return NextResponse.json({
        success: false,
        error: 'Database tables do not exist',
        message: 'Please create tables first through Prisma Data Proxy web interface',
        instructions: [
          '1. Visit your Prisma Accelerate dashboard',
          '2. Go to your database project', 
          '3. Use Schema Editor or import the schema',
          '4. Apply the schema to create tables',
          '5. Then call this endpoint again'
        ],
        connection_test: error.code || 'Unknown error'
      })
    }

  } catch (error: any) {
    console.error('❌ Database check failed:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Database connection failed',
      details: error.message
    }, { status: 500 })
  }
}

export async function POST() {
  return GET() // Same logic for both GET and POST
} 