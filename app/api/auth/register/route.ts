import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createToken } from '@/lib/auth'
import { isValidEmail, createSlug } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      email, 
      password, 
      username, 
      firstName, 
      lastName, 
      phone 
    } = body

    // Валидация обязательных полей
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: 'Email, password and username are required' },
        { status: 400 }
      )
    }

    // Валидация email
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Валидация пароля
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Валидация username
    if (username.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters long' },
        { status: 400 }
      )
    }

    // Проверка уникальности email
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Проверка уникальности username
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    })

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: 'User with this username already exists' },
        { status: 409 }
      )
    }

    // Хеширование пароля
    const hashedPassword = await hashPassword(password)

    // Создание пользователя
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        password: hashedPassword,
        firstName: firstName || null,
        lastName: lastName || null,
        phone: phone || null,
        isAdmin: false,
        isActive: true,
      }
    })

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
      message: 'Registration successful',
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
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 