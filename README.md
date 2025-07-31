# Users & Posts API

Проект — сервер для работы с пользователями и постами на TypeScript и Node.js.

## Что было в задании

**Программа минимум:**
- Восстановить работу сервера users (CRUD для пользователей).

**Задача максимум:**
- Добавить функционал для работы с постами:
    - CRUD для сущности Post
    - Получение всех постов по имени пользователя

## Что я сделала

1. **Создала новый модуль Post:**
    - Интерфейс Post
    - PostService + PostServiceEmbeddedImpl
    - PostController
    - postRouter

2. **Подключила новый роутер:**
    - `api/posts` и `api/posts/user`

3. **Использовала generic-функцию parseBody:**
    - Теперь контроллеры получают строго типизированный объект из тела запроса.

4. **Коллекция Postman:**
    - Подготовила коллекцию для проверки всех эндпоинтов.

## API эндпоинты для Posts

- `GET /api/posts` – список всех постов
- `GET /api/posts?postId={id}` – пост по id
- `POST /api/posts` – добавить пост
- `DELETE /api/posts?postId={id}` – удалить пост
- `PUT /api/posts` – обновить пост
- `GET /api/posts/user?userName={username}` – посты по имени пользователя
