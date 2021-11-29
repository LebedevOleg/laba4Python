import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Component,
} from "react";
import { YandexTVPage } from "./yandexTV";

const ChanelListDB = () => {
  const [update, setUpdate] = useState(false);

  const updateHundler = useCallback(async () => {
    setUpdate(true);
  }, []);

  return (
    <div>
      <h3>Получение передач из Базы данных</h3>
      <div class="collection">
        <a href="/daysPage:0" class="collection-item">
          Первый канал
        </a>
        <a href="/daysPage:1" class="collection-item">
          Россия-1
        </a>
        <a href="/daysPage:2" class="collection-item">
          Матч ТВ
        </a>
        <a href="/daysPage:3" class="collection-item">
          НТВ
        </a>
        <a href="/daysPage:4" class="collection-item">
          Пятый канал
        </a>
        <a href="/daysPage:5" class="collection-item">
          Россия-Культура
        </a>
        <a href="/daysPage:6" class="collection-item">
          Россия-24
        </a>
        <a href="/daysPage:7" class="collection-item">
          Карусель
        </a>
        <a href="/daysPage:8" class="collection-item">
          ОТР
        </a>
        <a href="/daysPage:9" class="collection-item">
          ТВ Центр
        </a>
        <a href="/daysPage:10" class="collection-item">
          РЕН ТВ
        </a>
        <a href="/daysPage:11" class="collection-item">
          Спас
        </a>
        <a href="/daysPage:12" class="collection-item">
          СТС
        </a>
        <a href="/daysPage:13" class="collection-item">
          Домашний
        </a>
        <a href="/daysPage:14" class="collection-item">
          ТВ-3
        </a>
        <a href="/daysPage:15" class="collection-item">
          Пятница!
        </a>
        <a href="/daysPage:16" class="collection-item">
          Звезда
        </a>
        <a href="/daysPage:17" class="collection-item">
          Мир
        </a>
        <a href="/daysPage:18" class="collection-item">
          ТНТ
        </a>
        <a href="/daysPage:19" class="collection-item">
          Муз-ТВ
        </a>
      </div>
    </div>
  );
};

export default ChanelListDB;
