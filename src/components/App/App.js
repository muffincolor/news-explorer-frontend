import React from "react";
import {Route, Switch} from 'react-router-dom';
import {UserLoginContext} from '../../contexts/UserLoginContext'
import MainPage from "../MainPage/MainPage";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  const [isActivePopup, setActivePopup] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className={`page__content ${isActivePopup ? "page__content_hidden" : ""}`}>
      <UserLoginContext.Provider value={loggedIn}>
        <Header isActivePopup={isActivePopup} setActivePopup={setActivePopup}
                style={window.location.pathname === "/saved-news" ? "dark" : "light"}/>
        <Switch>
          <Route path="/saved-news">
            <SavedNewsPage/>
          </Route>
          <Route exact path="/">
            <MainPage/>
          </Route>
        </Switch>
        <Footer/>
      </UserLoginContext.Provider>
    </div>
  );
}

export default App;
