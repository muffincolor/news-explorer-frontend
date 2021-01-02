import React from "react";
import {Route, Switch, useHistory} from 'react-router-dom';
import {UserLoginContext} from '../../contexts/UserLoginContext'
import MainPage from "../MainPage/MainPage";
import SavedNewsPage from "../SavedNewsPage/SavedNewsPage";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function App() {
  const history = useHistory();

  const [isActivePopup, setActivePopup] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [style, setStyle] = React.useState("light");

  React.useEffect(() => {
    history.listen(nextLocation => {
      console.log();
      if (document.documentElement.clientWidth < 768) {
        setStyle("light");
      } else {
        setStyle(nextLocation.pathname === "/saved-news" ? "dark" : "light");
      }
    });
  });

  return (
    <div className={`page__content ${isActivePopup ? "page__content_hidden" : ""}`}>
      <UserLoginContext.Provider value={loggedIn}>
        <Header isActivePopup={isActivePopup} setActivePopup={setActivePopup}
                style={style}/>
        <Switch>
          <Route path="/saved-news">
            <SavedNewsPage changeStyle={setStyle}/>
          </Route>
          <Route exact path="/">
            <MainPage changeStyle={setStyle}/>
          </Route>
        </Switch>
        <Footer/>
      </UserLoginContext.Provider>
    </div>
  );
}

export default App;
