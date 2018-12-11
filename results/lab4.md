# Практическая работа 4
Онлайн версия доступна по [ссылке](https://github.com/specialistvlad/dut-db-organization-and-knowledges/blob/master/results/lab4.md)

## План отчёта
1. Наполнение БД данными.
2. Проверка данных в БД.

## Наполнение БД данными.
* Опишем в файле postgres/migration/3-seed-books.sql миграцию книги
```
INSERT INTO book(
  code,
  author,
  name,
  publisher,
  published_at,
  pages,
  topic,
  costs
)
VALUES (....значения....);
```
* Опишем в файле postgres/migration/3-seed-readers.sql миграцию читатели
```
INSERT INTO reader(
  last_name,
  first_name,
  middle_name,
  address,
  home_phone,
  work_phone
)
VALUES (....значения....);
```

* Опишем в файле postgres/migration/3-seed-issue.sql миграцию выдача книг
```
INSERT INTO issue(
  last_name,
  first_name,
  middle_name,
  address,
  home_phone,
  work_phone
)
VALUES (....значения....);
```

## Перезапуск БД
docker образ БД построен таким образом, что при первом запуске он выполняет последовательно все файлы из каталога скриптов. По этому, чтобы применить миграции необходимо перезапустить контейнер.
`docker-compose up --build`

## Проверка данных в БД
* Выполним команду `echo 'select * from book limit 1' | psql -h localhost -p 23395 -U hero -d hero`
![Результат работы](./screenshots/lab4-screen-1.png)
Видим, что миграция сработала и данные присутствуют в таблице book

* Выполним команду `echo 'select * from reader limit 1' | psql -h localhost -p 23395 -U hero -d hero`
![Результат работы](./screenshots/lab4-screen-2.png)
Видим, что миграция сработала и данные присутствуют в таблице reader

* Выполним команду `echo 'select * from issue limit 1' | psql -h localhost -p 23395 -U hero -d hero`
![Результат работы](./screenshots/lab4-screen-3.png)
Видим, что миграция сработала и данные присутствуют в таблице issue
