# 📚 Инструкция по деплою 8bit-codex

## 🚀 Быстрый старт

```bash
./deploy.sh
```

## 📋 Требования

- Docker и Docker Compose
- Статический IP адрес или DDNS сервис
- Открытые порты на роутере (3000, 8000)
- Linux/Mac/WSL для запуска скриптов

## 🔧 Подготовка к деплою

### 1. Настройка роутера (Port Forwarding)

Откройте веб-интерфейс вашего роутера (обычно 192.168.1.1 или 192.168.0.1) и настройте переадресацию портов:

| Внешний порт | Внутренний IP | Внутренний порт | Протокол | Описание |
|--------------|---------------|------------------|----------|----------|
| 3000 | Ваш_IP | 3000 | TCP | Frontend |
| 8000 | Ваш_IP | 8000 | TCP | Backend API |

### 2. Получение статического IP или настройка DDNS

#### Вариант A: Статический IP
- Обратитесь к вашему провайдеру для получения статического IP
- Стоимость: обычно 100-500 руб/месяц

#### Вариант B: DDNS (Dynamic DNS)
Бесплатные сервисы:
- **No-IP** (noip.com)
- **DuckDNS** (duckdns.org)
- **Dynu** (dynu.com)

Настройка DDNS:
1. Зарегистрируйтесь на выбранном сервисе
2. Создайте домен (например: myapp.ddns.net)
3. Установите DDNS клиент на роутер или компьютер
4. Используйте домен вместо IP в конфигурациях

### 3. Настройка Firewall

#### Windows:
```powershell
# Откройте PowerShell как администратор
New-NetFirewallRule -DisplayName "8bit Backend" -Direction Inbound -LocalPort 8000 -Protocol TCP -Action Allow
New-NetFirewallRule -DisplayName "8bit Frontend" -Direction Inbound -LocalPort 3000 -Protocol TCP -Action Allow
```

#### Linux:
```bash
sudo ufw allow 3000/tcp
sudo ufw allow 8000/tcp
sudo ufw reload
```

## 🛠️ Ручной деплой

### 1. Обновите конфигурации

```bash
# Получите ваш публичный IP
curl ifconfig.me

# Обновите файлы:
# - agency_frontend/.env.production
# - .env.production
# Замените YOUR_PUBLIC_IP на ваш реальный IP
```

### 2. Сборка и запуск

```bash
# Сборка образов
docker-compose -f docker-compose.production.yml build

# Запуск в фоновом режиме
docker-compose -f docker-compose.production.yml up -d

# Проверка статуса
docker-compose -f docker-compose.production.yml ps

# Просмотр логов
docker-compose -f docker-compose.production.yml logs -f
```

### 3. Остановка

```bash
docker-compose -f docker-compose.production.yml down
```

## 🔒 Безопасность

### Рекомендации:
1. **Смените SECRET_KEY** в .env.production
2. **Используйте HTTPS** (см. раздел SSL ниже)
3. **Настройте backup** базы данных
4. **Ограничьте доступ** по IP если нужно
5. **Обновляйте** зависимости регулярно

### Добавление SSL (HTTPS)

#### Вариант 1: Cloudflare (рекомендуется)
1. Зарегистрируйте домен (можно бесплатный на freenom.com)
2. Добавьте сайт в Cloudflare
3. Настройте DNS записи
4. Включите SSL/TLS в режиме "Flexible"

#### Вариант 2: Let's Encrypt
```bash
# Установите certbot
sudo apt-get install certbot

# Получите сертификат
sudo certbot certonly --standalone -d yourdomain.com

# Обновите nginx.conf для использования SSL
```

## 🌐 Настройка домена

### 1. Купите домен
- Namecheap.com (~$10/год)
- GoDaddy.com (~$12/год)
- Reg.ru (~500 руб/год)

### 2. Настройте DNS записи

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| A | @ | Ваш_IP | 3600 |
| A | www | Ваш_IP | 3600 |
| A | api | Ваш_IP | 3600 |

### 3. Обновите конфигурации
Замените IP адреса на домен в:
- agency_frontend/.env.production
- .env.production

## 📊 Мониторинг

### Проверка доступности:
```bash
# Проверка frontend
curl http://ВАШ_IP:3000

# Проверка backend
curl http://ВАШ_IP:8000/docs
```

### Внешние сервисы мониторинга:
- UptimeRobot (бесплатно)
- Pingdom (платно)
- StatusCake (бесплатно с ограничениями)

## 🆘 Решение проблем

### Приложение недоступно извне
1. Проверьте переадресацию портов на роутере
2. Проверьте firewall
3. Убедитесь что используете публичный IP
4. Проверьте что Docker контейнеры запущены

### Ошибка CORS
1. Проверьте CORS_ORIGINS в .env.production
2. Убедитесь что frontend использует правильный API_URL

### База данных не сохраняется
1. Проверьте права на папку с БД
2. Убедитесь что volume примонтирован правильно

## 📱 Мобильный доступ

Для доступа с мобильных устройств:
1. Подключитесь к той же Wi-Fi сети
2. Или используйте публичный IP/домен
3. Добавьте сайт на главный экран для app-like опыта

## 🔄 Обновление

```bash
# Получите последние изменения
git pull

# Пересоберите и перезапустите
docker-compose -f docker-compose.production.yml down
docker-compose -f docker-compose.production.yml build
docker-compose -f docker-compose.production.yml up -d
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `docker-compose -f docker-compose.production.yml logs`
2. Убедитесь что все порты открыты
3. Проверьте конфигурационные файлы

---

✨ Удачного деплоя!