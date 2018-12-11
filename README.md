# Отчёты по лабораторным работам по предмету "Організація баз даних та знань" в университет "Державний Університет Телекомунікацій"

Выполнил Владислав Казанцев, студент группы ИСД-31

Репозиторий проекта доступен онлайн по ссылке [https://github.com/specialistvlad/dut-db-organization-and-knowledges](https://github.com/specialistvlad/dut-db-organization-and-knowledges)

## Отчёты работ онлайн
[https://github.com/specialistvlad/dut-db-organization-and-knowledges/blob/master/results/README.md](https://github.com/specialistvlad/dut-db-organization-and-knowledges/blob/master/results/README.md)

### Отчёты работ локально
Доступны в папке `results/index.html`

## Подготовка
### Требованию к окружению:
1. Docker 18(система контейнеризации, обязательно)
2. GIT (для удобной загрузки репозитория, не обязательно)

#### 1. Docker
Список поддерживаемых ОС: windows 10, ubuntu, mac
Или по [ссылке](https://docs.docker.com/install/#supported-platforms)

Инструкция по установке
[https://www.docker.com/get-started](https://www.docker.com/get-started)

Вы можете проверить доступность docker после установки таким командами `docker --version` и `docker-compose --version`

Вы должны будете увидеть:
```
➜  dut-db-organization-and-knowledges git:(master) ✗ docker --version
Docker version 18.09.0, build 4d60db4
➜  dut-db-organization-and-knowledges git:(master) ✗ docker-compose --version
docker-compose version 1.23.2, build 1110ad01
```

#### 2. Загрузка проекта
Для того, чтобы запустить проект вам нужно его загрузить (доступен онлайн):
Скачать проект с помощью команды `git clone git@github.com:specialistvlad/dut-db-organization-and-knowledges.git`

или по адресу используя браузер
[https://github.com/specialistvlad/dut-db-organization-and-knowledges/archive/master.zip](https://github.com/specialistvlad/dut-db-organization-and-knowledges/archive/master.zip)

## Запуск
Перейдите в каталог проекта `cd dut-db-organization-and-knowledges`

Выполните команду `docker-compose up`

Это инициирует загрузку всех зависимостей и сборку проекта.
Дождитесь окончания процесса.

Проект будет доступен по адресу [http://localhost:12345](http://localhost:12345)

## Остановка
Чтобы остановить приложение выполните:
` docker-compose down --remove-orphans --force`

Чтобы освободить пространство HDD выполните:
`docker-compose rm -fsv`
