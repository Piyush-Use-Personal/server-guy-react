import React from "react";
import List from '../Component/List';
import Detail from '../Component/Detail';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function MainNavigation() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <List />
        </Route>
        <Route path="/detail/{id}" exact>
          <Detail />
        </Route>
 </Switch>
    </Router>
  );
}

export default MainNavigation;
