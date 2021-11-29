import axios from "axios";
import "materialize";
import React, { useContext, useState, useEffect, useCallback } from "react";
import jQuery from "jquery";

const TVCard = (program) => {
  const style = { height: "200px", width: "200px" };
  if ("check" in program) {
    return (
      <div className="col s12 m7">
        <h5 className="header">{program.program.name}</h5>
        <div className="card horizontal">
          <div className="card-image">
            <img src={program.program.image} className="photo" style={style} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>Время начала {program.program.timeStart}</p>
              <p>Время конца {program.program.timeEnd}</p>
              <p>
                {program.check.name === program.program.name
                  ? ""
                  : "По данным mail.ru будет/было показано: " +
                    program.check.name}
              </p>
            </div>
            <div className="card-action"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col s12 m7">
        <h5 className="header">{program.program.name}</h5>
        <div className="card horizontal">
          <div className="card-image">
            <img src={program.program.image} className="photo" style={style} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>Время начала {program.program.timeStart}</p>
              <p>Время конца {program.program.timeEnd}</p>
            </div>
            <div className="card-action"></div>
          </div>
        </div>
      </div>
    );
  }
};

export default TVCard;
