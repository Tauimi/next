import { NextRequest, NextResponse } from 'next/server'

// Указываем что роут должен быть динамическим
export const dynamic = 'force-dynamic'

export async function GET() {
  console.log('Test API called')
  
  return NextResponse.json({
    success: true,
    message: 'API работает!',
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      hasDatabase: !!process.env.DATABASE_URL,
      hasAuth: !!process.env.NEXTAUTH_SECRET,
      url: process.env.NEXTAUTH_URL
    }
  })
}

export async function POST(request: NextRequest) {
  console.log('Test POST API called')
  
  try {
    const body = await request.json()
    console.log('Received body:', body)
    
    return NextResponse.json({
      success: true,
      message: 'POST запрос обработан успешно',
      received: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test POST error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Ошибка обработки POST запроса',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 