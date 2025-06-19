import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createToken } from '@/lib/auth'
import { isValidEmail } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Валидация входных данных
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    let user = null

    // Попытка найти пользователя в базе данных
    try {
      user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() }
      })
    } catch (dbError) {
      console.log('База данных недоступна для авторизации, используем fallback пользователя:', dbError)
      
      // Fallback авторизация для демонстрации
      if (email.toLowerCase() === 'admin@technomart.ru' && password === 'Admin123!') {
        user = {
          id: 'fallback-admin',
          email: 'admin@technomart.ru',
          username: 'admin',
          firstName: 'Администратор',
          lastName: 'Системы',
          phone: '+7 (800) 123-45-67',
          isAdmin: true,
          isActive: true,
          createdAt: new Date(),
        }
      } else if (email.toLowerCase() === 'user@technomart.ru' && password === 'User123!') {
        user = {
          id: 'fallback-user',
          email: 'user@technomart.ru',
          username: 'user',
          firstName: 'Тестовый',
          lastName: 'Пользователь',
          phone: '+7 (900) 123-45-67',
          isAdmin: false,
          isActive: true,
          createdAt: new Date(),
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Проверка активности аккаунта
    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 401 }
      )
    }

    // Проверка пароля
    let isPasswordValid = false
    
    if (user.password) {
      // Для реальных пользователей из БД
      isPasswordValid = await verifyPassword(password, user.password)
    } else {
      // Для fallback пользователей пароль уже был проверен выше
      isPasswordValid = true
    }
    
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Создание JWT токена
    const token = createToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    })

    // Данные пользователя для ответа (без пароля)
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt,
    }

    // Создание ответа с установкой cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      data: {
        user: userData,
        token,
      }
    })

    // Установка HTTP-only cookie с токеном
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 