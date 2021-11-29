import axios from "axios";
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Component,
} from "react";
import chanelListYa from "../chanelList";
import { useParams } from "react-router-dom";
import jQuery from "jquery";

const DaysPage = () => {
  const [MEGASUPERDATE, setDate] = useState([]);
  const id = useParams().id.replace(":", "");

  const adress = chanelListYa[parseInt(id)].adress;
  const prog = chanelListYa[parseInt(id)].prog;
  const chnl = chanelListYa[parseInt(id)].chnl;

  function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = jQuery.trim(cookies[i]);
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const getDate = useCallback(async (adress, prog) => {
    var crf_token = getCookie("csrftoken");
    await axios
      .post(
        "/api/UPDB/",
        { adress, prog },
        { headers: { "X-CSRFToken": crf_token } }
      )
      .then(async (res) => {
        console.log(res.data.date);
        setDate(res.data.date);
      });
  }, []);

  useEffect(() => {
    getDate(adress, prog);
  }, [getDate]);

  return (
    <div>
      <h3>Получение передач из сервиса</h3>
      <div class="collection">
        {MEGASUPERDATE.map((day) => (
          <a
            href={"/DBTV/:" + id + "/:" + day.day + ""}
            class="collection-item"
          >
            {day.day}
          </a>
        ))}
      </div>
    </div>
  );
};

export default DaysPage;
