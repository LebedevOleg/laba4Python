# laba4Python

DJANGO + REACT

Для установки всех необходимых библиотек для React необходимо прописать команду npm i в папке client

Для запуска клиента нужно прописать команду npm start

Для запуска сервера нужно прописать команду python manage.py runserver в папке где находится manage.py

Список библиотек необходимых для Python находятся по пути 
laba4Python/.laba4/Scripts/laba.txt

Основная часть проекта (Получение информации о телепередачах с сервера) работает без использования БД
Если требуется использование БД то в файле 
laba4Python/django_server/django_server/settings.py
нужно в блоке DATABASES поменять данные под вашу БД

Используемые "Модели" данных лежат в файле laba4Python/django_server/app/models.py
