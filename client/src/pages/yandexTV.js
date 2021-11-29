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

export const YandexTVPage = () => {
  const [TVprograms, setPrograms] = useState([]);
  const [load, setLoad] = useState(false);

  const [mailPrograms, setMailPrograms] = useState([]);

  const id = useParams().id.replace(":", "");
  console.debug(id);
  const adress = chanelListYa[parseInt(id)].adress;
  const adressMail = chanelListYa[parseInt(id)].mailAddress;
  const mailProg = chanelListYa[parseInt(id)].mailprog;
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
      axios
        .post(
          "/api/YaApi/",
          { adress, prog, chnl },
          { headers: { "X-CSRFToken": crf_token } }
        )
        .then(async (res) => {
          setPrograms(res.data.programs);
        });
    } catch (e) {
      console.debug(e.message);
    }
  }, []);

  const getProgramsMail = useCallback(async (setLoad, adress, prog) => {
    try {
      var crf_token = getCookie("csrftoken");
      axios
        .post(
          "/api/Getmail/",
          { adress, prog },
          { headers: { "X-CSRFToken": crf_token } }
        )
        .then(async (res) => {
          setMailPrograms(res.data.programs);
        });
      setLoad(false);
    } catch (e) {
      console.debug(e.message);
      setLoad(false);
    }
  }, []);

  const returnProg = () => {
    var TVcard = [];
    for (var i = 0; i < TVprograms.length; i++) {
      if (mailPrograms.length > i) {
        if (TVprograms[i].name.trim() === mailPrograms[i].name.trim()) {
          TVcard.push(<TVCard program={TVprograms[i]} />);
        } else {
          TVcard.push(
            <TVCard program={TVprograms[i]} check={mailPrograms[i]} />
          );
        }
      } else {
        TVcard.push(<TVCard program={TVprograms[i]} />);
      }
    }
    return <p>{TVcard.map((program) => program)}</p>;
  };

  useEffect(() => {
    getPrograms(setLoad, adress, chnl, prog);
    getProgramsMail(setLoad, adressMail, mailProg);
    returnProg();
  }, [getPrograms, getProgramsMail]);

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
        <p>{returnProg()}</p>
      </div>
    );
  }
};
