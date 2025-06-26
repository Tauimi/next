#!/usr/bin/env node

/**
 * Скрипт для деплоя с обновлением базы данных
 * Запускает force-init API после деплоя
 */

const https = require('https')

const deploymentUrl = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_APP_URL

if (!deploymentUrl) {
  console.error('❌ URL деплоя не найден. Проверьте переменные VERCEL_URL или NEXT_PUBLIC_APP_URL')
  process.exit(1)
}

const url = deploymentUrl.startsWith('http') ? deploymentUrl : `https://${deploymentUrl}`

console.log('🚀 Инициализируем базу данных после деплоя...')
console.log('🔗 URL:', `${url}/api/force-init`)

https.get(`${url}/api/force-init`, (res) => {
  let data = ''
  
  res.on('data', (chunk) => {
    data += chunk
  })
  
  res.on('end', () => {
    try {
      const result = JSON.parse(data)
      
      if (result.success) {
        console.log('✅ База данных успешно обновлена!')
        console.log('📊 Статистика:', result.stats)
        console.log('🆕 Создано:', result.created)
        console.log('🔑 Логин администратора:', result.login)
        
        if (result.nextSteps) {
          console.log('📝 Дальнейшие шаги:')
          result.nextSteps.forEach((step, i) => {
            console.log(`   ${i + 1}. ${step}`)
          })
        }
      } else {
        console.log('⚠️ Инициализация завершена с предупреждениями:')
        console.log('💬 Сообщение:', result.message)
        if (result.details) {
          console.log('📋 Детали:', result.details)
        }
      }
    } catch (parseError) {
      console.log('📄 Ответ сервера:')
      console.log(data)
    }
  })
}).on('error', (err) => {
  console.error('❌ Ошибка при обновлении базы данных:', err.message)
  console.log('💡 Попробуйте запустить вручную:', `${url}/api/force-init`)
})

console.log('⏳ Ожидание ответа сервера...') 