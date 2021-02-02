import "./App.css";
import Landing from "./pages/Landing/Landing";
import Profile from "./pages/Profile/Profile";
import { Route, BrowserRouter } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Feed from "./pages/Feed/Feed";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Nav />
          <Route exact path="/" component={Landing} />
          <Route exact path="/profile/:username" component={Profile} />
          <Route exact path="/feed" component={Feed} />
        </BrowserRouter>
      </div>
  );
}

export default App;
