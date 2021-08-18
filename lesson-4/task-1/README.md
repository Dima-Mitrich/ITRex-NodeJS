# Первая версия проекта. 
Проект запускается по команде 
```
node index.js
```
после установки всех зависимостей командой 
``` 
npm install.
```
Хранилище резолюций поддерживает TTL опцию: если Вы хотите чтобы резолюция хранилась некоторое время (default 10sec),
а затем удалялась - поставьте галочку в поле "Add the resolution to storage with TTL?", если добавление без TTL резолюция 
будет храниться до перезагрузки страницы.

Что бы выписать новую резолюцию новому пациенту не забывайте добавить его в очередь и нажать NEXT у доктора.

По любым вопросам касаемо этой стадии проекта пишите мне в дискорд.

## Эндпоинты приложения:

GET : http://localhost:3000/doctor/next - получить следующего пациента;

POST : http://localhost:3000/doctor/new-resolution - создать новую резолюцию от имени доктора;

GET : http://localhost:3000/doctor/resolution/:name - найти резолюцию по имени пациента;

DELETE : http://localhost:3000/doctor/resolution/:name - удалить резолюцию;

POST : http://localhost:3000/queue/add - добавить нового пациента;

GET : http://localhost:3000/queue/resolution/:name - найти резолюцию от имени пациента;


## Ссылка на docker-hub репозиторий с изображением приложения: https://hub.docker.com/repository/docker/dima95/itrex-laba-project

Чтобы запустить докер убедитесь что он установлен на Вашем компьютере, затем потяните изображение из репозитория 
с помощью команды :
```
docker pull dima95/itrex-laba-project:latest
```
а потом создайте контейнер из изображения и запустите его с помощью команды :
```
docker run -p 3000:3000 -d dima95/itrex-laba-project
```
Приложение будет запущенно по адресу: http://localhost:3000/

## Тесты

Для запуска тестов введите в консоль команду:
```
npm test --runInBand
```

## Типы хранилища

Для смены типа хранилища поменяйте в файле config.js с
```
app: {
        port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
        TTL_MILSEC: 10000,
        storageType,
    },
```
на 
```
app: {
        port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
        TTL_MILSEC: 10000,
        storageType: 'redis',
    },
```
или на
```
app: {
        port: parseInt(process.env.DEV_APP_PORT, 10) || 3000,
        TTL_MILSEC: 10000,
        storageType:'inMemory',
    },
```