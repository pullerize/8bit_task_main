# 🚀 Agency Management System

Полнофункциональная система управления агентством с модулями CRM, управления проектами, финансов и задач.

## ✨ Основные функции

- 📋 **Управление задачами** - создание, назначение, отслеживание статуса
- 👥 **CRM пользователей** - управление сотрудниками и ролями  
- 📊 **Управление проектами** - SMM проекты и цифровые услуги
- 💰 **Финансовый модуль** - доходы, расходы, налоги, отчеты
- 📅 **Календарь съемок** - планирование и учет видеопроизводства
- 💾 **Импорт/Экспорт БД** - резервное копирование и миграция данных
- 📈 **Аналитика** - детальные отчеты и графики

## 🚀 Быстрый запуск (Разработка)

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd agency-management

# Запуск для разработки
./start.sh
```

Приложение будет доступно:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8000  
- **API Docs**: http://localhost:8000/docs

## 🐳 Запуск с Docker

### Для разработки
```bash
docker-compose up -d --build
```

### Для продакшена
```bash
./deploy.sh production
```

## 📦 Системные требования

### Разработка
- Docker & Docker Compose
- Python 3.12+ (опционально для локальной разработки)
- Node.js 18+ (опционально для локальной разработки)

### Продакшен
- **ОС**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+
- **RAM**: 2GB минимум, 4GB+ рекомендуется
- **Диск**: 10GB минимум, 20GB+ рекомендуется
- **CPU**: 1 vCPU минимум, 2+ vCPU рекомендуется

## 🔧 Развертывание на сервере

### Автоматическая настройка сервера
```bash
curl -fsSL <your-setup-script-url> | bash
# или
chmod +x setup_server.sh && ./setup_server.sh
```

### Полное развертывание
```bash
# 1. Настройте переменные окружения
cp .env.example .env
nano .env

# 2. Разверните приложение
./deploy.sh production
```

📖 **Подробное руководство**: [DEPLOYMENT.md](DEPLOYMENT.md)

## 🔑 Первый вход

**Логин по умолчанию:**
- **Логин**: `admin`
- **Пароль**: `admin123`

⚠️ **Обязательно смените пароль** после первого входа!

## 🏗️ Архитектура

```
agency-management/
├── agency_backend/     # FastAPI backend
│   ├── app/
│   │   ├── main.py    # Основное приложение
│   │   ├── models.py  # SQLAlchemy модели
│   │   ├── schemas.py # Pydantic схемы
│   │   ├── crud.py    # CRUD операции
│   │   └── auth.py    # Аутентификация
│   └── requirements.txt
├── agency_frontend/    # React frontend
│   ├── src/
│   │   ├── pages/     # Страницы приложения
│   │   ├── components/# Переиспользуемые компоненты
│   │   └── contexts/  # React контексты
│   └── package.json
├── docker-compose.yml  # Разработка
├── docker-compose.production.yml # Продакшен
├── nginx.conf         # Nginx конфигурация
└── deploy.sh          # Скрипт развертывания
```

## 🔄 Управление приложением

```bash
# Просмотр статуса
docker-compose ps

# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Обновление
docker-compose pull && docker-compose up -d
```

## 💾 Резервное копирование

### Автоматическое
- Ежедневные бэкапы настраиваются автоматически
- Хранятся в `/data/agency/backups/`
- Автоудаление старше 30 дней

### Ручное
```bash
# Создать бэкап
/usr/local/bin/agency-backup.sh

# Скачать бэкап через админ-панель
# Настройки → Скачать БД
```

## 🔒 Безопасность

- Аутентификация JWT
- Хеширование паролей bcrypt
- CORS защита
- Валидация данных Pydantic
- Роли пользователей (admin, designer, smm_manager, etc.)

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature-name`
3. Внесите изменения
4. Отправьте pull request

## 📄 Лицензия

[MIT License](LICENSE)

## 🆘 Поддержка

- 📚 [Документация по развертыванию](DEPLOYMENT.md)
- 🐛 [Сообщить о проблеме](https://github.com/your-repo/issues)
- 💬 [Обсуждения](https://github.com/your-repo/discussions)

---

**Made with ❤️ for agency management**