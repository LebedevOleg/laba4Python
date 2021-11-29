import "materialize-css";
import { BrowserRouter } from "react-router-dom";
import { useRoutes } from "./routes";

function App() {
  const routes = useRoutes();
  return (
    <BrowserRouter>
      <nav>
        <div className="nav-wrapper #689f38 light-green darken-2">
          <a className="brand-logo ">Телепрограмма</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down ">
            <li>
              <a href="/chanelList/server"> Получить инофрмацию с сервиса</a>
            </li>
            <li>
              <a href="/chanelList/DB">Получить инофрмацию из базы данных</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container">{routes}</div>
    </BrowserRouter>
  );
}

export default App;
