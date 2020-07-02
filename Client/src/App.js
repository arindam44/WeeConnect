import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import theme from "./Util/Theme";
import "./App.css";
import { Provider } from "react-redux";
import { SET_AUTHENTICATED } from "./Redux/Types";
import { logoutUser, getUserData } from "./Redux/Actions/userActions";
import store from "./Redux/Store";
import home from "./Pages/home";
import login from "./Pages/login";
import signUp from "./Pages/signUp";
import Navbar from "./Components/NavBar/Navbar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import AuthRoute from "./Util/AuthRoute";

const token = localStorage.IdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path={`${process.env.PUBLIC_URL}/`}
                  component={home}
                />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signUp} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
