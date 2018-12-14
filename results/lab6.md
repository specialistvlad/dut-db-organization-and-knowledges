# Практическая работа 6
Онлайн версия доступна по [ссылке](https://github.com/specialistvlad/dut-db-organization-and-knowledges/blob/master/results/lab6.md)

## План отчёта
1. Написание оконечных точек REST сервера.
2. Проверка ответов в браузере.

## Написание оконечных точек REST сервера.

Добавим в файл приложения backend/src/app.js код:
```
app.get('/catalog', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select *, costs::numeric::float8
    from catalog
    where
      model ilike $1 OR
      manufactorer ilike $1 OR
      level ilike $1 OR
      info ilike $1
    ;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/manufactorers', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: 'select * from manufactorers where name ilike $1;',
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/ports', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select * from ports where name ilike $1;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
});

app.get('/levels', async (req, res) => {
  const searchPattern = req.query.search || '';
  const { rows: result } = await query({
    text: `
    select * from levels where name ilike $1;`,
    values: [`%${searchPattern}%`],
  });
  res.json(result);
```
Разберём как это работает:
* `app.get('/catalog', ...function...)` добавляет функцию обработчик, которая будет срабатывать, когда пользователь перейдет по URL /reader
* `const searchPattern = req.query.search || '';` - берет значение, которое было передано в url строке `http://localhost:38562/book?search=блокнот` в параметре search и сохраяет в переменную searchPattern. Если значение нет, то подставляется пустая строка, чтобы приложение корректно работало, когда поискового слова нет. При этом браузер кодирует символы в такой формат `http://localhost:38562/book?search=%D0%B1%D0%BB%D0%BE%D0%BA%D0%BD%D0%BE%D1%82` , а серверный фраемворк 'express' автоматически его декодирует обратно в строку 'блокнот'
* values: `[%${searchPattern}%']` - подставляем строку в шаблон, в результате получится %блокнот%
* ```select *, costs::numeric::float8
  from catalog
  where
    model ilike $1 OR
    manufactorer ilike $1 OR
    level ilike $1 OR
    info ilike $1
;``` - сам запрос, который выполняет поиск по всем текстовым полям с сформированным шаблоном переданным через параметры
* `const { rows: result } = await query({.....запрос и параметры....});` - посколько сама функция query асинхронная то для корректной работы необходимо ключевое слово `await`, jit среда исполнения дождется результата без блокировки очереди событий по этому может быть выполнено множество запросов одновременно. Ограничение только кол-вом одновременных соединений к БД, что тоже настраивается. По этому фактическое ограничение только в RAM памяти. Далее выполняется `const { rows: result }` деструктуризация объекта с присваиванием значения в константу.
* `res.json(result);` - отправляем результат из БД назад клиенту в браузер

## Перезапустим контейнеры
`docker-compose up --build`

## Проверка ответов в браузере.
Перейдем в браузере по адресу `http://localhost:30562/catalog` и увидим список всех маршрутизаторов
![Результат работы](./screenshots/lab6-screen-1.png)
Перейдем в браузере по адресу `http://localhost:30562/catalog?search=LLDP` И увидим отфильтрованый список книг
![Результат работы](./screenshots/lab6-screen-2.png)
Так же лог БД одного из запросов
![Результат работы](./screenshots/lab6-screen-3.png)
