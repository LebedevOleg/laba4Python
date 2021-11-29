import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import ChanelListDB from "./pages/ChanelListDB";
import ChanelListServer from "./pages/ChanelListServer";
import DaysPage from "./pages/DaysPage";
import { DBTV } from "./pages/DBTV";
import { YandexTVPage } from "./pages/yandexTV";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/chanelList/server">
        <ChanelListServer />
      </Route>
      <Route path="/yandexTV:id">
        <YandexTVPage />
      </Route>
      <Route path="/chanelList/DB">
        <ChanelListDB />
      </Route>
      <Route path="/daysPage:id">
        <DaysPage />
      </Route>
      <Route path="/DBTV/:id/:date">
        <DBTV />
      </Route>
      <Redirect to="/chanelList/server" />
    </Switch>
  );
};
