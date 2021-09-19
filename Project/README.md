# Первая версия проекта. 
После установки всех зависимостей командой 
``` 
npm install
```
Воспользуйтесь командой
```
node index.js
```
для запуска проекта.

Хранилище резолюций поддерживает TTL опцию: если Вы хотите чтобы резолюция хранилась некоторое время (default 10sec),
а затем удалялась - поставьте галочку в поле "Add the resolution to storage with TTL?", если добавление без TTL резолюция 
будет храниться до перезагурузки сервера.

Что бы выписать новую резолюцию новому пациенту не забывайте добавить его в очередь и нажать NEXT у доктора.

По любым вопросам касаемо этой стадии проекта пишите мне в дискорд.

## Эндпоинты приложения:

GET : http://localhost:3000/patients/next - получить следующего пациента;

POST : http://localhost:3000/resolutions/add - создать новую резолюцию;

GET : http://localhost:3000/doctor/resolutions/:name - найти резолюцию;

DELETE : http://localhost:3000/doctor/resolutions/:patientID - удалить резолюцию;

POST : http://localhost:3000/patients/add - добавить нового пациента;


## Ссылка на docker-hub репозиторий с изображением приложения: https://hub.docker.com/repository/docker/dima95/itrex-laba-project

Чтобы запустить докер убедитесь что он установлен на Вашем компьютере, затем запустите docker 
с помощью команды :
```
docker compose up -d
```
Приложение будет запущенно по адресу: http://localhost:3000/

Чтобы остановить докер выполните команду:
```
docker compose down
```

## Тесты

Для запуска тестов введите в консоль команду:
```
npm test
```

## Типы хранилища

За тип хранилища отвечает строка 
```
STORAGE_TYPE
```
в файле .env 

миграции

перейти в папку sequelize-migrations
````
    cd sequelize-migrations
````

в консоли

````
    npx sequelize-cli db:migrate
    
    npx sequelize-cli db:seed:all
````

