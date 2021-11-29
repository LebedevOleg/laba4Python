import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Component,
} from "react";
import { YandexTVPage } from "./yandexTV";

const ChanelListServer = () => {
  return (
    <div>
      <h3>Получение передач из сервиса</h3>
      <div class="collection">
        <a href="/yandexTV:0" class="collection-item">
          Первый канал
        </a>
        <a href="/yandexTV:1" class="collection-item">
          Россия-1
        </a>
        <a href="/yandexTV:2" class="collection-item">
          Матч ТВ
        </a>
        <a href="/yandexTV:3" class="collection-item">
          НТВ
        </a>
        <a href="/yandexTV:4" class="collection-item">
          Пятый канал
        </a>
        <a href="/yandexTV:5" class="collection-item">
          Россия-Культура
        </a>
        <a href="/yandexTV:6" class="collection-item">
          Россия-24
        </a>
        <a href="/yandexTV:7" class="collection-item">
          Карусель
        </a>
        <a href="/yandexTV:8" class="collection-item">
          ОТР
        </a>
        <a href="/yandexTV:9" class="collection-item">
          ТВ Центр
        </a>
        <a href="/yandexTV:10" class="collection-item">
          РЕН ТВ
        </a>
        <a href="/yandexTV:11" class="collection-item">
          Спас
        </a>
        <a href="/yandexTV:12" class="collection-item">
          СТС
        </a>
        <a href="/yandexTV:13" class="collection-item">
          Домашний
        </a>
        <a href="/yandexTV:14" class="collection-item">
          ТВ-3
        </a>
        <a href="/yandexTV:15" class="collection-item">
          Пятница!
        </a>
        <a href="/yandexTV:16" class="collection-item">
          Звезда
        </a>
        <a href="/yandexTV:17" class="collection-item">
          Мир
        </a>
        <a href="/yandexTV:18" class="collection-item">
          ТНТ
        </a>
        <a href="/yandexTV:19" class="collection-item">
          Муз-ТВ
        </a>
      </div>
    </div>
  );
};

export default ChanelListServer;
