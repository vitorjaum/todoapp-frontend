import {
  BrowserRouter,
  Routes as Switch,
  Route,
  Navigate as Redirect,
} from "react-router-dom";

import { Home } from "pages";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Redirect to={"/"} />} />
      </Switch>
    </BrowserRouter>
  );
};
