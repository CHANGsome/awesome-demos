import React from 'react';
import MusicPlayer from 'pages/MusicPlayer';
import Baymax from 'pages/Baymax';
import Canvas from 'pages/Canvas';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import SortableList from "./pages/SortableList";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/music" />
        </Route>
        <Route exact path="/music">
          <MusicPlayer />
        </Route>
        <Route exact path="/baymax">
          <Baymax />
        </Route>
        <Route exact path="/canvas">
          <Canvas />
        </Route>
        <Route exact path="/list">
          <SortableList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
