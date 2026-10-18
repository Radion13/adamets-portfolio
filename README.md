# Port

Пустой проект на Nuxt и Vue с TypeScript.

## Запуск

```sh
npm ci
npm run dev
```

Локальный адрес: http://localhost:3000

## Проверка и сборка

```sh
npm run typecheck
npm run build
npm run preview
```

Код приложения находится в `app/`. Главный компонент — `app/app.vue`.
Версии зависимостей закреплены в `package.json` и `package-lock.json`.

## Версии и проверка

Nuxt 4.6.2, Vue 3.5.44, TypeScript 6.0.3, vue-tsc 3.3.13.
Версии проверены в npm при настройке проекта.
TypeScript 7 пока несовместим с текущим vue-tsc.

Проверки `npm run typecheck` и `npm run build` прошли успешно.
Локальный сервер отвечает HTTP 200.

На момент установки `npm audit` сообщает о 11 high-записях в дереве
зависимостей, связанных с `braces` и `node-forge`.
Исправленные версии этих двух пакетов в npm пока отсутствуют.
