import axios from "axios";
import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  Component,
} from "react";
import { useParams } from "react-router-dom";
import chanelListYa from "../chanelList";
import TVCard from "../pageDetail/TVCard";
import jQuery from "jquery";

export const DBTV = () => {
  const [TVprograms, setPrograms] = useState([]);
  const [load, setLoad] = useState(false);
  const id = useParams().id.replace(":", "");
  const date = useParams().date.replace(":", "");
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

  const getPrograms = useCallback(async (setLoad, adress, chnl, prog) => {
    setLoad(true);
    try {
      var crf_token = getCookie("csrftoken");
      await axios
        .post(
          "/api/DBproramm/",
          { adress, prog, chnl, date },
          { headers: { "X-CSRFToken": crf_token } }
        )
        .then(async (res) => {
          setPrograms(res.data.programs);
        });
      setLoad(false);
    } catch (e) {
      console.debug(e.message);
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    getPrograms(setLoad, adress, chnl, prog);
  }, [getPrograms]);

  if (load) {
    return (
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-red-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {TVprograms.map((program) => (
            <TVCard program={program} />
          ))}
        </p>
      </div>
    );
  }
};
